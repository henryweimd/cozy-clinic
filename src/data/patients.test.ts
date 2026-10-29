import { describe, expect, it } from 'vitest';
import { ClinicalEngine } from '../clinical';
import {
  FALLBACK_EDGES,
  FALLBACK_NODES,
  FALLBACK_PATIENTS,
} from './fallbackPack';
import {
  childFor,
  childSpecs,
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
