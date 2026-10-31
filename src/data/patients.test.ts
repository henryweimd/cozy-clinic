import { afterEach, describe, expect, it, vi } from 'vitest';
import { ClinicalEngine } from '../clinical';
import {
  FALLBACK_EDGES,
  FALLBACK_NODES,
  FALLBACK_PATIENTS,
} from './fallbackPack';
import {
  childFor,
  childSpecs,
  extendTree,
  loadCast,
  mergeExtension,
  patientByName,
  rootNode,
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
