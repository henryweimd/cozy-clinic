import { SHOP_CATALOG } from './shop';
import type { ShopItem } from './shop';

/**
 * Career: the compulsion loop's spine. Recovered visits earn
 * rank XP (+1 each; struggling visits earn nothing — wrong
 * scenarios never advance you). Ranks run Pre-Med to
 * Attending; each level-up pays a coin bonus. The shop side:
 * `newlyAffordable` spots what this visit's earnings just
 * unlocked, so the game can nudge (never nag) toward it.
 */

export interface CareerRank {
  level: number;
  title: string;
  /** Short form for the exam-room chip. */
  short: string;
  /** Career recovered visits needed to reach this rank. */
  xp: number;
}

export const CAREER_RANKS: readonly CareerRank[] = [
  { level: 1, title: 'Pre-Med', short: 'Pre-Med', xp: 0 },
  { level: 2, title: 'Medical Student', short: 'Med Student', xp: 2 },
  { level: 3, title: 'Intern', short: 'Intern', xp: 5 },
  { level: 4, title: 'Resident', short: 'Resident', xp: 9 },
  { level: 5, title: 'Fellow', short: 'Fellow', xp: 14 },
  { level: 6, title: 'Attending', short: 'Attending', xp: 20 },
];

/** Pure: the rank for a career recovered count (unit-tested). */
export function rankFor(recovered: number): CareerRank {
  let rank = CAREER_RANKS[0];
  for (const r of CAREER_RANKS) {
    if (recovered >= r.xp) rank = r;
  }
  return rank;
}

/** Coins paid on each level-up (milestone joy, once per rank). */
export const LEVEL_BONUS = 10;

/** Pure: the exam-room chip line (unit-tested). */
export function rankChip(rank: CareerRank): string {
  return `Lv ${rank.level} · ${rank.short}`;
}

/**
 * Pure: unowned, purchasable items this visit's earnings just
 * unlocked (cost above the old balance, at/below the new one),
 * cheapest first (unit-tested).
 */
export function newlyAffordable(
  owned: readonly string[],
  balanceBefore: number,
  balanceAfter: number,
): ShopItem[] {
  return SHOP_CATALOG.filter(
    (item) =>
      !item.soon &&
      !owned.includes(item.id) &&
      item.cost > balanceBefore &&
      item.cost <= balanceAfter,
  ).sort((a, b) => a.cost - b.cost);
}
