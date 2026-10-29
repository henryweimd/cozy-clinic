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

async function rest<T>(table: string): Promise<T[]> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*`, {
    headers: {
      apikey: SUPABASE_ANON_KEY ?? '',
      Authorization: `Bearer ${SUPABASE_ANON_KEY ?? ''}`,
    },
  });
  if (!res.ok) throw new Error(`${table}: ${res.status}`);
  return (await res.json()) as T[];
}

export async function loadCast(): Promise<CastData> {
  if (SUPABASE_URL === undefined || SUPABASE_ANON_KEY === undefined) {
    return FALLBACK_CAST;
  }
  try {
    const [patients, nodes, edges] = await Promise.all([
      rest<FallbackPatient>('patients'),
      rest<FallbackNode>('trajectory_nodes'),
      rest<FallbackEdge>('trajectory_edges'),
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
): Promise<{ nodes: FallbackNode[]; edges: FallbackEdge[] } | null> {
  if (SUPABASE_URL === undefined || SUPABASE_ANON_KEY === undefined) return null;
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/extend-trajectory`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ patientId, fromNodeId, children }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { nodeIds?: string[] };
    if (!Array.isArray(data.nodeIds) || data.nodeIds.length === 0) return null;
    // Read the fresh rows back over REST (ids -> rows).
    const fresh = await Promise.all(
      data.nodeIds.map(async (id) => {
        const r = await fetch(
          `${SUPABASE_URL}/rest/v1/trajectory_nodes?id=eq.${id}&select=*`,
          {
            headers: {
              apikey: SUPABASE_ANON_KEY ?? '',
              Authorization: `Bearer ${SUPABASE_ANON_KEY ?? ''}`,
            },
          },
        );
        if (!r.ok) return null;
        const rows = (await r.json()) as FallbackNode[];
        return rows[0] ?? null;
      }),
    );
    const nodes = fresh.filter((n): n is FallbackNode => n !== null);
    if (nodes.length === 0) return null;
    const eRes = await fetch(
      `${SUPABASE_URL}/rest/v1/trajectory_edges?from_node_id=eq.${fromNodeId}&select=*`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY ?? '',
          Authorization: `Bearer ${SUPABASE_ANON_KEY ?? ''}`,
        },
      },
    );
    const edges = eRes.ok ? ((await eRes.json()) as FallbackEdge[]) : [];
    return { nodes, edges };
  } catch {
    return null;
  }
}
