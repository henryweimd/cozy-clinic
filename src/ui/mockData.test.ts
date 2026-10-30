import { describe, expect, it } from 'vitest';
import {
  LEVEL_STOP_X,
  MOCK_ROSTER,
  moveWaiting,
  nearestLevelStop,
  quoteIfSpoken,
  waitingNames,
} from './mockData';

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
