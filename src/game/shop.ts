/**
 * Clinic Shop catalog + pure purchase rules (unit-tested). Coins
 * buy Tools, Medicines, and Practice goods — every blurb teaches
 * one real-practice fact, and every EFFECT line states exactly
 * what the purchase does to payouts. Tools make right taps pay
 * more, Medicines make reading pay more, Practice goods sweeten
 * perfect visits, and Nurse Birch (the first staff hire) cheers
 * every right tap into +1 more.
 */

export type ShopCategory = 'tools' | 'medicines' | 'practice';

export interface ShopItem {
  id: string;
  category: ShopCategory;
  name: string;
  cost: number;
  blurb: string;
  /** One display line (<=44 chars) stating the payout effect. */
  effect: string;
  /** Shown greyed with a Soon tag (never purchasable yet). */
  soon?: boolean;
}

export const SHOP_CATALOG: readonly ShopItem[] = [
  { id: 'bandages', category: 'tools', name: 'Bandage Box', cost: 5, blurb: 'Clean covers for scrapes and small cuts.', effect: 'Right taps pay +1 more' },
  { id: 'thermometer', category: 'tools', name: 'Thermometer', cost: 8, blurb: 'Finds fevers in seconds.', effect: 'Right taps pay +1 more' },
  { id: 'otoscope', category: 'tools', name: 'Otoscope', cost: 14, blurb: 'Peeks safely inside ears.', effect: 'Right taps pay +1 more' },
  { id: 'stethoscope', category: 'tools', name: 'Stethoscope', cost: 18, blurb: 'Hears hearts and lungs at work.', effect: 'Right taps pay +1 more' },
  { id: 'saline-spray', category: 'medicines', name: 'Saline Spray', cost: 6, blurb: 'Salty water that rinses stuffy noses.', effect: 'Reading pays +1 more' },
  { id: 'calamine', category: 'medicines', name: 'Calamine Lotion', cost: 7, blurb: 'Pink lotion that calms itchy skin.', effect: 'Reading pays +1 more' },
  { id: 'rehydration-salts', category: 'medicines', name: 'Rehydration Salts', cost: 10, blurb: 'Special salts + water for dried-out bodies.', effect: 'Reading pays +1 more' },
  { id: 'spacer', category: 'medicines', name: 'Puffer Spacer', cost: 12, blurb: 'Helps every puffer puff count.', effect: 'Reading pays +1 more' },
  { id: 'growth-chart', category: 'practice', name: 'Growth Chart', cost: 15, blurb: 'Track how tall friends grow.', effect: 'Perfect visits pay +2 more' },
  { id: 'cozy-rug', category: 'practice', name: 'Cozy Rug', cost: 20, blurb: 'A soft rug for the waiting room.', effect: 'Perfect visits pay +2 more' },
  { id: 'fish-tank', category: 'practice', name: 'Fish Tank', cost: 32, blurb: 'Calm fish for nervous waiters.', effect: 'Perfect visits pay +2 more' },
  { id: 'nurse-birch', category: 'practice', name: 'Nurse Birch', cost: 50, blurb: 'Your first hire: a gentle nurse who loves charts.', effect: 'Right taps pay +1, she cheers you on' },
];

export function itemsFor(category: ShopCategory): ShopItem[] {
  return SHOP_CATALOG.filter((i) => i.category === category);
}

/** Pure purchase: null when soon, owned, or unaffordable. */
export function buyItem(
  balance: number,
  owned: readonly string[],
  item: ShopItem,
): { balance: number; owned: string[] } | null {
  if (item.soon) return null;
  if (owned.includes(item.id)) return null;
  if (!Number.isInteger(item.cost) || balance < item.cost) return null;
  return { balance: balance - item.cost, owned: [...owned, item.id] };
}

const TOOL_IDS = new Set(['bandages', 'thermometer', 'otoscope', 'stethoscope']);
const MED_IDS = new Set(['saline-spray', 'calamine', 'rehydration-salts', 'spacer']);
const COZY_IDS = new Set(['growth-chart', 'cozy-rug', 'fish-tank']);

/** +1 per owned tool on every correct (BEST) tap. */
export function toolBonus(owned: readonly string[]): number {
  return owned.filter((id) => TOOL_IDS.has(id)).length;
}

/** +1 when Nurse Birch is on staff, on every correct tap. */
export function nurseBonus(owned: readonly string[]): number {
  return owned.includes('nurse-birch') ? 1 : 0;
}

/** +1 per stocked medicine on every first-open Learn payout. */
export function learnBonus(owned: readonly string[]): number {
  return owned.filter((id) => MED_IDS.has(id)).length;
}

/** +2 per cozy practice good on the perfect-visit bonus. */
export function perfectBonus(owned: readonly string[]): number {
  return owned.filter((id) => COZY_IDS.has(id)).length * 2;
}
