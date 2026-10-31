import { describe, expect, it } from 'vitest';
import { CAREER_RANKS, LEVEL_BONUS, newlyAffordable, rankChip, rankFor } from './career';

describe('rankFor', () => {
  it('climbs Pre-Med to Attending on recovered visits', () => {
    expect(rankFor(0).title).toBe('Pre-Med');
    expect(rankFor(1).title).toBe('Pre-Med');
    expect(rankFor(2).title).toBe('Medical Student');
    expect(rankFor(5).title).toBe('Intern');
    expect(rankFor(9).title).toBe('Resident');
    expect(rankFor(14).title).toBe('Fellow');
    expect(rankFor(20).title).toBe('Attending');
    expect(rankFor(99).title).toBe('Attending');
  });

  it('keeps six ordered ranks with positive xp steps', () => {
    expect(CAREER_RANKS).toHaveLength(6);
    CAREER_RANKS.forEach((r, i) => {
      expect(r.level).toBe(i + 1);
      if (i > 0) expect(r.xp).toBeGreaterThan(CAREER_RANKS[i - 1].xp);
    });
    expect(LEVEL_BONUS).toBeGreaterThan(0);
  });

  it('chips the level short for the exam room', () => {
    expect(rankChip(rankFor(0))).toBe('Lv 1 · Pre-Med');
    expect(rankChip(rankFor(2))).toBe('Lv 2 · Med Student');
    expect(rankChip(rankFor(20))).toBe('Lv 6 · Attending');
  });
});

describe('newlyAffordable', () => {
  it('spots just-unlocked items, cheapest first', () => {
    // Wallet 12 start: Bandage Box (5) was already in reach.
    const unlocked = newlyAffordable([], 4, 12);
    expect(unlocked.length).toBeGreaterThan(0);
    expect(unlocked[0].id).toBe('bandages');
    expect(unlocked.map((i) => i.cost)).toEqual(
      [...unlocked.map((i) => i.cost)].sort((a, b) => a - b),
    );
  });

  it('ignores owned, soon, and still-unaffordable items', () => {
    const unlocked = newlyAffordable(['bandages'], 4, 6);
    expect(unlocked.some((i) => i.id === 'bandages')).toBe(false);
    expect(unlocked.every((i) => !i.soon)).toBe(true);
    expect(newlyAffordable([], 12, 12)).toEqual([]);
    expect(newlyAffordable([], 12, 500).length).toBeGreaterThan(0);
  });
});
