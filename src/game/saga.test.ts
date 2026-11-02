import { describe, expect, it } from 'vitest';
import {
  bumpSaga,
  EMPTY_SAGA,
  isSagaProgress,
  newlyDone,
  nodeStates,
  SAGA_NODES,
} from './saga';
import type { SagaInput } from './saga';

const FRESH: SagaInput = {
  saga: EMPTY_SAGA,
  gladAny: false,
  filed: 0,
  recovered: 0,
};

describe('saga nodes', () => {
  it('lists 8 nodes ending in a co-op teaser', () => {
    expect(SAGA_NODES).toHaveLength(8);
    expect(SAGA_NODES[0].id).toBe('first-visit');
    expect(SAGA_NODES[7].id).toBe('shared-care');
    const ids = SAGA_NODES.map((n) => n.id);
    expect(new Set(ids).size).toBe(8);
    for (const n of SAGA_NODES) {
      expect(n.label.length).toBeGreaterThan(0);
      expect(n.need.length).toBeGreaterThan(0);
    }
  });

  it('unlocks linearly: done, then one current, then locked', () => {
    const fresh = nodeStates(FRESH);
    expect(fresh.map((s) => s.state)).toEqual([
      'current',
      'locked',
      'locked',
      'locked',
      'locked',
      'locked',
      'locked',
      'locked',
    ]);
    const mid = nodeStates({
      ...FRESH,
      saga: { visits: 2, flawless: 1, followups: 1, consultsUsed: 1, covers: 0 },
    });
    expect(mid.map((s) => s.state)).toEqual([
      'done',
      'done',
      'done',
      'done',
      'current',
      'locked',
      'locked',
      'locked',
    ]);
  });

  it('reads glad hearts, filed topics, and recoveries', () => {
    const input: SagaInput = {
      saga: { visits: 9, flawless: 2, followups: 3, consultsUsed: 2, covers: 0 },
      gladAny: true,
      filed: 3,
      recovered: 9,
    };
    const states = nodeStates(input);
    expect(states.slice(0, 7).every((s) => s.state === 'done')).toBe(true);
    expect(states[7].state).toBe('current');
    const covered = nodeStates({ ...input, saga: { ...input.saga, covers: 1 } });
    expect(covered.every((s) => s.state === 'done')).toBe(true);
  });

  it('names newly finished nodes for the fanfare', () => {
    const before = nodeStates(FRESH);
    const after = nodeStates({ ...FRESH, saga: { ...EMPTY_SAGA, visits: 1 } });
    expect(newlyDone(before, after)).toEqual(['first-visit']);
    expect(newlyDone(after, after)).toEqual([]);
  });
});

describe('bumpSaga', () => {
  it('counts visits, flawless, followups, consults, and covers (immutable)', () => {
    expect(bumpSaga(EMPTY_SAGA, 'visit')).toEqual({
      visits: 1,
      flawless: 0,
      followups: 0,
      consultsUsed: 0,
      covers: 0,
    });
    expect(EMPTY_SAGA).toEqual({
      visits: 0,
      flawless: 0,
      followups: 0,
      consultsUsed: 0,
      covers: 0,
    });
    const s = { visits: 2, flawless: 1, followups: 1, consultsUsed: 0, covers: 0 };
    expect(bumpSaga(s, 'flawless').flawless).toBe(2);
    expect(bumpSaga(s, 'followup').followups).toBe(2);
    expect(bumpSaga(s, 'consult').consultsUsed).toBe(1);
    expect(bumpSaga(s, 'cover').covers).toBe(1);
  });
});

describe('isSagaProgress', () => {
  it('accepts saved shapes, rejects junk', () => {
    expect(isSagaProgress(EMPTY_SAGA)).toBe(true);
    expect(
      isSagaProgress({ visits: 3, flawless: 1, followups: 0, consultsUsed: 2, covers: 1 }),
    ).toBe(true);
    expect(isSagaProgress({ visits: 3, flawless: 1, followups: 0, consultsUsed: 2 })).toBe(true);
    expect(isSagaProgress(null)).toBe(false);
    expect(isSagaProgress({})).toBe(false);
    expect(
      isSagaProgress({ visits: -1, flawless: 0, followups: 0, consultsUsed: 0, covers: 0 }),
    ).toBe(false);
    expect(
      isSagaProgress({ visits: 1, flawless: 0, followups: 0, consultsUsed: 'x', covers: 0 }),
    ).toBe(false);
  });
});
