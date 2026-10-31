import { describe, expect, it } from 'vitest';
import {
  LEVEL_STOP_X,
  MOCK_ROSTER,
  PROTOTYPE_SEEDS,
  TIER_DESCRIBE,
  introNames,
  moveWaiting,
  nearestLevelStop,
  quoteIfSpoken,
  waitingNames,
} from './mockData';

describe('roster lead', () => {
  it('opens with the gut pack for testing: Bram, Pearl, Lena, Cole', () => {
    const names = MOCK_ROSTER.map((e) => e.name);
    expect(names.slice(0, 4)).toEqual(['Bram', 'Pearl', 'Lena', 'Cole']);
  });

  it('boots Bram on the c-diff case', () => {
    expect(PROTOTYPE_SEEDS.patientName).toBe('Bram');
    expect(PROTOTYPE_SEEDS.conditionId).toBe('c-diff-colitis');
  });
});

describe('waitingNames', () => {
  it('excludes whoever is in the exam room, keeping queue order', () => {
    const order = MOCK_ROSTER.map((e) => e.name);
    expect(waitingNames(order, 'Milo')).toEqual(order.filter((n) => n !== 'Milo'));
    expect(waitingNames(order, 'June')).toEqual(order.filter((n) => n !== 'June'));
    expect(waitingNames(order, 'Milo')).not.toContain('Milo');
  });

  it('gives every entry a complaint + visit kind for the list line', () => {
    for (const e of MOCK_ROSTER) {
      expect(e.complaint.length).toBeGreaterThan(0);
      expect(e.visitKind.length).toBeGreaterThan(0);
      expect(e.welcomeBack.length).toBeGreaterThan(0);
    }
  });
});

describe('quoteIfSpoken', () => {
  it('quotes every rostered patient, bares narration + me', () => {
    for (const e of MOCK_ROSTER) {
      expect(quoteIfSpoken(e.name, false, 'hi')).toBe('"hi"');
    }
    expect(quoteIfSpoken('Clinic', false, 'hi')).toBe('hi');
    expect(quoteIfSpoken('Milo', true, 'hi')).toBe('hi');
  });
});

describe('moveWaiting', () => {
  const order = ['Milo', 'Mabel', 'June', 'Theo'];

  it('swaps one step toward the front or back', () => {
    expect(moveWaiting(order, 'June', -1)).toEqual(['Milo', 'June', 'Mabel', 'Theo']);
    expect(moveWaiting(order, 'Mabel', 1)).toEqual(['Milo', 'June', 'Mabel', 'Theo']);
  });

  it('leaves the order unchanged at the edges or for strangers', () => {
    expect(moveWaiting(order, 'Milo', -1)).toEqual(order);
    expect(moveWaiting(order, 'Theo', 1)).toEqual(order);
    expect(moveWaiting(order, 'Stranger', 1)).toEqual(order);
  });

  it('never mutates the input', () => {
    moveWaiting(order, 'June', -1);
    expect(order).toEqual(['Milo', 'Mabel', 'June', 'Theo']);
  });
});

describe('TIER_DESCRIBE', () => {
  it('says what each level means, easiest to most technical', () => {
    expect(TIER_DESCRIBE.gentle).toContain('easiest');
    expect(TIER_DESCRIBE.expert).toContain('technical');
    for (const tier of ['gentle', 'steady', 'clinical', 'expert'] as const) {
      expect(TIER_DESCRIBE[tier].length).toBeGreaterThan(0);
    }
  });
});

describe('nearestLevelStop', () => {
  it('snaps each stop center to its own level', () => {
    LEVEL_STOP_X.forEach((x, i) => {
      expect(nearestLevelStop(x)).toBe(i + 1);
    });
  });

  it('splits midpoints toward the left stop and clamps off-track taps', () => {
    const mid = (LEVEL_STOP_X[0] + LEVEL_STOP_X[1]) / 2;
    expect(nearestLevelStop(mid)).toBe(1);
    expect(nearestLevelStop(0)).toBe(1);
    expect(nearestLevelStop(9999)).toBe(4);
  });
});

describe('introNames', () => {
  it('holds Mabel out of the intro set, keeping queue order', () => {
    const order = MOCK_ROSTER.map((e) => e.name);
    const intro = introNames(order);
    expect(intro).not.toContain('Mabel');
    expect(intro).toContain('Milo');
    expect(intro).toEqual(order.filter((n) => n !== 'Mabel'));
  });
});
