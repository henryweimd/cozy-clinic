import {
  FALLBACK_EDGES,
  FALLBACK_NODES,
  FALLBACK_PATIENTS,
} from './fallbackPack';
import type {
  FallbackEdge,
  FallbackNode,
  FallbackPatient,
} from './fallbackPack';
import type { ChoiceGrade, ClinicalEngine, PatientState } from '../clinical';
import { getJson } from './net';

/**
 * G4 live-read layer: Supabase first, fallback pack offline.
 * The game NEVER waits on the network mid-tap — loadCast runs
 * once at boot; resolves read the loaded trees instantly. Raw
 * REST (no client dep); missing env or any fetch failure falls
 * back silently with source: 'fallback'.
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as
  | string
  | undefined;

export interface CastData {
  patients: FallbackPatient[];
  nodes: FallbackNode[];
  edges: FallbackEdge[];
  source: 'live' | 'fallback';
}

const FALLBACK_CAST: CastData = {
  patients: FALLBACK_PATIENTS,
  nodes: FALLBACK_NODES,
  edges: FALLBACK_EDGES,
  source: 'fallback',
};

export interface FetchOpts {
  url?: string;
  key?: string;
  timeoutMs?: number;
}

async function rest<T>(
  table: string,
  url: string,
  key: string,
  timeoutMs: number,
): Promise<T[]> {
  return getJson<T[]>(`/rest/v1/${table}?select=*`, key, url, timeoutMs);
}

export async function loadCast(opts: FetchOpts = {}): Promise<CastData> {
  const url = opts.url ?? SUPABASE_URL;
  const key = opts.key ?? SUPABASE_ANON_KEY;
  if (url === undefined || key === undefined) {
    return FALLBACK_CAST;
  }
  try {
    const timeoutMs = opts.timeoutMs ?? 10000;
    const [patients, nodes, edges] = await Promise.all([
      rest<FallbackPatient>('patients', url, key, timeoutMs),
      rest<FallbackNode>('trajectory_nodes', url, key, timeoutMs),
      rest<FallbackEdge>('trajectory_edges', url, key, timeoutMs),
    ]);
    if (patients.length === 0 || nodes.length === 0) throw new Error('empty');
    return { patients, nodes, edges, source: 'live' };
  } catch {
    return FALLBACK_CAST;
  }
}

/** Pure lookups over a loaded cast (unit-tested). */
export function patientByName(cast: CastData, name: string): FallbackPatient | null {
  return cast.patients.find((p) => p.name === name) ?? null;
}

export function rootNode(cast: CastData, patientId: string): FallbackNode | null {
  return (
    cast.nodes.find((n) => n.patient_id === patientId && n.depth === 0) ?? null
  );
}

export function childFor(
  cast: CastData,
  fromNodeId: string,
  choiceLabel: string,
): { node: FallbackNode; edge: FallbackEdge } | null {
  const edge = cast.edges.find(
    (e) => e.from_node_id === fromNodeId && e.choice_label === choiceLabel,
  );
  if (!edge) return null;
  const node = cast.nodes.find((n) => n.id === edge.to_node_id);
  if (!node) return null;
  return { node, edge };
}

/** Pure node lookup by id (unit-tested). */
export function nodeById(cast: CastData, id: string): FallbackNode | null {
  return cast.nodes.find((n) => n.id === id) ?? null;
}

/** Pure: the children of one node, in edge order (unit-tested). */
export function childrenOf(
  cast: CastData,
  fromNodeId: string,
): { node: FallbackNode; edge: FallbackEdge }[] {
  const out: { node: FallbackNode; edge: FallbackEdge }[] = [];
  for (const e of cast.edges) {
    if (e.from_node_id !== fromNodeId) continue;
    const node = nodeById(cast, e.to_node_id);
    if (node) out.push({ node, edge: e });
  }
  return out;
}

/**
 * Pure: the trail from the root to the cursor, oldest-first
 * (unit-tested). Walks parent links with a step cap so a bad
 * edge cycle ends the walk instead of hanging the chart.
 */
export function trailToRoot(cast: CastData, nodeId: string): FallbackNode[] {
  const trail: FallbackNode[] = [];
  let at = nodeById(cast, nodeId);
  for (let steps = 0; steps < 32 && at !== null; steps += 1) {
    trail.unshift(at);
    if (at.depth === 0) break;
    const parent = cast.edges.find((e) => e.to_node_id === at?.id) ?? null;
    at = parent ? nodeById(cast, parent.from_node_id) : null;
  }
  return trail;
}

/** Persisted arc cursors: patient name -> node id. */
export type ArcMap = Record<string, string>;

/** Shape guard for the persisted arc map (unit-tested). */
export function isArcMap(v: unknown): v is ArcMap {
  if (typeof v !== 'object' || v === null || Array.isArray(v)) return false;
  return Object.values(v as Record<string, unknown>).every((id) => typeof id === 'string');
}

/**
 * Pure: where a visit starts (unit-tested). A saved cursor for
 * THIS patient with paths still ahead resumes mid-arc; a
 * finished leaf, a foreign node, or anything missing starts a
 * fresh arc at the root. Null when the patient has no tree.
 */
export function resumeCursor(
  cast: CastData,
  patientId: string,
  savedId: string | undefined,
): { node: FallbackNode; resumed: boolean } | null {
  const root = rootNode(cast, patientId);
  if (!root) return null;
  const fresh = { node: root, resumed: false };
  if (savedId === undefined) return fresh;
  const saved = nodeById(cast, savedId);
  if (!saved || saved.patient_id !== patientId) return fresh;
  if (childrenOf(cast, saved.id).length === 0) return fresh;
  return { node: saved, resumed: true };
}

/** Merge extended nodes/edges into a loaded cast (pure). */
export function mergeExtension(
  cast: CastData,
  nodes: FallbackNode[],
  edges: FallbackEdge[],
): CastData {
  const knownNodes = new Set(cast.nodes.map((n) => n.id));
  const knownEdges = new Set(cast.edges.map((e) => e.id));
  return {
    ...cast,
    nodes: [...cast.nodes, ...nodes.filter((n) => !knownNodes.has(n.id))],
    edges: [...cast.edges, ...edges.filter((e) => !knownEdges.has(e.id))],
  };
}

/** Child structure for extend-trajectory, computed by the engine. */
export interface ChildSpec {
  key: string;
  depth: number;
  stageIndex: number;
  vitals: { energy: number; comfort: number; breathing: number };
  mood: string;
  memory: string;
  animationCue: string;
  kind: 'decision' | 'time';
  choiceLabel?: string;
  grade?: ChoiceGrade;
  blocked?: boolean;
  engineNarrative: string;
  engineTeaching: string;
}

/**
 * Build extend specs for every action from a live engine state.
 * Pure engine reads — the function adds flesh server-side.
 */
export function childSpecs(
  engine: ClinicalEngine,
  state: PatientState,
  depth: number,
): ChildSpec[] {
  return engine.listActions(state.conditionId).map((action) => {
    const grade = engine.gradeAction(state, action.id);
    const result = engine.applyAction(state, action.id);
    return {
      key: action.id,
      depth,
      stageIndex: result.node.state.stageIndex,
      vitals: { ...result.node.state.vitals },
      mood: result.node.state.mood,
      memory: result.node.state.memory,
      animationCue: result.node.animationCue,
      kind: 'decision',
      choiceLabel: action.label,
      grade,
      blocked: result.blocked,
      engineNarrative: result.node.narrative,
      engineTeaching: result.node.teaching,
    };
  });
}

/** Call extend-trajectory; null when offline/unconfigured. */
export async function extendTree(
  patientId: string,
  fromNodeId: string,
  children: ChildSpec[],
  opts: FetchOpts = {},
): Promise<{ nodes: FallbackNode[]; edges: FallbackEdge[] } | null> {
  const url = opts.url ?? SUPABASE_URL;
  const key = opts.key ?? SUPABASE_ANON_KEY;
  if (url === undefined || key === undefined) return null;
  const timeoutMs = opts.timeoutMs ?? 15000;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`${url}/functions/v1/extend-trajectory`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ patientId, fromNodeId, children }),
      signal: ctrl.signal,
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { nodeIds?: string[] };
    if (!Array.isArray(data.nodeIds) || data.nodeIds.length === 0) return null;
    // Read the fresh rows back over REST (ids -> rows).
    const fresh = await Promise.all(
      data.nodeIds.map(async (id) => {
        try {
          const rows = await getJson<FallbackNode[]>(
            `/rest/v1/trajectory_nodes?id=eq.${id}&select=*`,
            key,
            url,
            timeoutMs,
          );
          return rows[0] ?? null;
        } catch {
          return null;
        }
      }),
    );
    const nodes = fresh.filter((n): n is FallbackNode => n !== null);
    if (nodes.length === 0) return null;
    let edges: FallbackEdge[] = [];
    try {
      edges = await getJson<FallbackEdge[]>(
        `/rest/v1/trajectory_edges?from_node_id=eq.${fromNodeId}&select=*`,
        key,
        url,
        timeoutMs,
      );
    } catch {
      edges = [];
    }
    return { nodes, edges };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
