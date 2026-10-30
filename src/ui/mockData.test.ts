import { describe, expect, it } from 'vitest';
import { MOCK_ROSTER, moveWaiting, waitingNames } from './mockData';

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
