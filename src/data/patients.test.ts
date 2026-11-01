import { afterEach, describe, expect, it, vi } from 'vitest';
import { ClinicalEngine } from '../clinical';
import {
  FALLBACK_EDGES,
  FALLBACK_NODES,
  FALLBACK_PATIENTS,
} from './fallbackPack';
import {
  childFor,
  childrenOf,
  childSpecs,
  extendTree,
  isArcMap,
  loadCast,
  mergeExtension,
  nodeById,
  patientByName,
  resumeCursor,
  rootNode,
  trailToRoot,
} from './patients';
import type { CastData } from './patients';

const CAST: CastData = {
  patients: FALLBACK_PATIENTS,
  nodes: FALLBACK_NODES,
  edges: FALLBACK_EDGES,
  source: 'fallback',
};

/** G4 live-read lookups (offline-safe: tested on the pack). */
describe('patients live-read layer', () => {
  it('finds Mabel and her root node', () => {
    const mabel = patientByName(CAST, 'Mabel');
    expect(mabel).not.toBeNull();
    const root = rootNode(CAST, mabel?.id ?? '');
    expect(root).not.toBeNull();
    expect(root?.depth).toBe(0);
    expect(rootNode(CAST, 'missing')).toBeNull();
    expect(patientByName(CAST, 'Nobody')).toBeNull();
  });

  it('walks root -> choice -> stored child', () => {
    const mabel = patientByName(CAST, 'Mabel');
    const root = rootNode(CAST, mabel?.id ?? '');
    const edge = CAST.edges.find((e) => e.from_node_id === root?.id);
    expect(edge?.choice_label).toBeTruthy();
    const found = childFor(CAST, root?.id ?? '', edge?.choice_label ?? '');
    expect(found?.node.id).toBe(edge?.to_node_id);
    expect(childFor(CAST, root?.id ?? '', 'no such choice')).toBeNull();
  });

  it('merges extensions without duplicating rows', () => {
    const extra = { ...FALLBACK_NODES[0], id: 'new-node' };
    const merged = mergeExtension(CAST, [extra, FALLBACK_NODES[0]], []);
    expect(merged.nodes).toHaveLength(FALLBACK_NODES.length + 1);
    expect(merged.source).toBe('fallback');
  });

  it('builds engine-true child specs for every action', () => {
    const engine = new ClinicalEngine();
    const state = engine.initialState('asthma');
    const specs = childSpecs(engine, state, 3);
    expect(specs).toHaveLength(engine.listActions('asthma').length);
    for (const s of specs) {
      expect(s.depth).toBe(3);
      expect(s.stageIndex).toBeGreaterThanOrEqual(0);
      expect(s.stageIndex).toBeLessThanOrEqual(3);
      expect(s.engineNarrative.length).toBeGreaterThan(0);
    }
  });
});

describe('patients network hardening', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('loadCast falls back when the backend hangs', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn((_url: string, init?: { signal?: AbortSignal }) => {
        // Hangs until aborted, like a dead backend.
        return new Promise((_resolve, reject) => {
          init?.signal?.addEventListener('abort', () =>
            reject(new Error('aborted')),
          );
        });
      }),
    );
    const cast = await loadCast({
      url: 'https://down.example',
      key: 'k',
      timeoutMs: 20,
    });
    expect(cast.source).toBe('fallback');
    expect(cast.patients.length).toBeGreaterThan(0);
  });

  it('loadCast falls back on HTTP errors', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({ ok: false, status: 500 }) as Response),
    );
    const cast = await loadCast({
      url: 'https://down.example',
      key: 'k',
      timeoutMs: 50,
    });
    expect(cast.source).toBe('fallback');
  });

  it('extendTree returns null when the function hangs', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn((_url: string, init?: { signal?: AbortSignal }) => {
        return new Promise((_resolve, reject) => {
          init?.signal?.addEventListener('abort', () =>
            reject(new Error('aborted')),
          );
        });
      }),
    );
    const engine = new ClinicalEngine();
    const specs = childSpecs(engine, engine.initialState('asthma'), 3);
    const out = await extendTree('p', 'n', specs, {
      url: 'https://down.example',
      key: 'k',
      timeoutMs: 20,
    });
    expect(out).toBeNull();
  });
});

/** P2 arc resume + trail (offline-safe: tested on the pack). */
describe('arc cursors', () => {
  const mabelId = patientByName(CAST, 'Mabel')?.id ?? '';
  const root = rootNode(CAST, mabelId);

  it('looks nodes up by id', () => {
    expect(nodeById(CAST, root?.id ?? '')?.depth).toBe(0);
    expect(nodeById(CAST, 'missing')).toBeNull();
  });

  it('lists children, empty at leaves', () => {
    const kids = childrenOf(CAST, root?.id ?? '');
    expect(kids).toHaveLength(4);
    const grandkids = childrenOf(CAST, kids[0].node.id);
    expect(grandkids.length).toBeGreaterThan(0);
    const leaf = grandkids[0].node;
    expect(childrenOf(CAST, leaf.id)).toEqual([]);
  });

  it('walks the trail from the root to the cursor', () => {
    expect(trailToRoot(CAST, root?.id ?? '').map((n) => n.depth)).toEqual([0]);
    const kid = childrenOf(CAST, root?.id ?? '')[0].node;
    expect(trailToRoot(CAST, kid.id).map((n) => n.depth)).toEqual([0, 1]);
    const leaf = childrenOf(CAST, kid.id)[0].node;
    expect(trailToRoot(CAST, leaf.id)).toHaveLength(3);
    expect(trailToRoot(CAST, 'missing')).toEqual([]);
  });

  it('starts fresh arcs at the root', () => {
    expect(resumeCursor(CAST, mabelId, undefined)).toEqual({ node: root, resumed: false });
    expect(resumeCursor(CAST, mabelId, 'missing')).toEqual({ node: root, resumed: false });
    expect(resumeCursor(CAST, 'nobody', undefined)).toBeNull();
  });

  it('resumes mid-arc cursors, restarts finished leaves', () => {
    const kid = childrenOf(CAST, root?.id ?? '')[0].node;
    expect(resumeCursor(CAST, mabelId, kid.id)).toEqual({ node: kid, resumed: true });
    const leaf = childrenOf(CAST, kid.id)[0].node;
    expect(resumeCursor(CAST, mabelId, leaf.id)).toEqual({ node: root, resumed: false });
  });

  it('rejects cursors from another patient', () => {
    const foreign = FALLBACK_NODES.find((n) => n.depth === 1 && n.patient_id !== mabelId);
    expect(foreign).toBeDefined();
    if (foreign) {
      expect(resumeCursor(CAST, mabelId, foreign.id)).toEqual({ node: root, resumed: false });
    }
  });
});

describe('isArcMap', () => {
  it('accepts saved shapes, rejects junk', () => {
    expect(isArcMap({})).toBe(true);
    expect(isArcMap({ Bram: 'node-1' })).toBe(true);
    expect(isArcMap(null)).toBe(false);
    expect(isArcMap([])).toBe(false);
    expect(isArcMap({ Bram: 7 })).toBe(false);
  });
});
