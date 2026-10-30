/**
 * Clinic Shop catalog + pure purchase rules (unit-tested). Coins
 * buy Tools, Medicines, and Practice goods — every blurb teaches
 * one real-practice fact. Staff arrive with the practice-upgrade
 * system; their rows show honestly as Soon.
 */

export type ShopCategory = 'tools' | 'medicines' | 'practice';

export interface ShopItem {
  id: string;
  category: ShopCategory;
  name: string;
  cost: number;
  blurb: string;
  /** Shown greyed with a Soon tag (never purchasable yet). */
  soon?: boolean;
}

export const SHOP_CATALOG: readonly ShopItem[] = [
  { id: 'bandages', category: 'tools', name: 'Bandage Box', cost: 5, blurb: 'Clean covers for scrapes and small cuts.' },
  { id: 'thermometer', category: 'tools', name: 'Thermometer', cost: 8, blurb: 'Finds fevers in seconds.' },
  { id: 'otoscope', category: 'tools', name: 'Otoscope', cost: 14, blurb: 'Peeks safely inside ears.' },
  { id: 'stethoscope', category: 'tools', name: 'Stethoscope', cost: 18, blurb: 'Hears hearts and lungs at work.' },
  { id: 'saline-spray', category: 'medicines', name: 'Saline Spray', cost: 6, blurb: 'Salty water that rinses stuffy noses.' },
  { id: 'calamine', category: 'medicines', name: 'Calamine Lotion', cost: 7, blurb: 'Pink lotion that calms itchy skin.' },
  { id: 'rehydration-salts', category: 'medicines', name: 'Rehydration Salts', cost: 10, blurb: 'Special salts + water for dried-out bodies.' },
  { id: 'spacer', category: 'medicines', name: 'Puffer Spacer', cost: 12, blurb: 'Helps every puffer puff count.' },
  { id: 'growth-chart', category: 'practice', name: 'Growth Chart', cost: 15, blurb: 'Track how tall friends grow.' },
  { id: 'cozy-rug', category: 'practice', name: 'Cozy Rug', cost: 20, blurb: 'A soft rug for the waiting room.' },
  { id: 'fish-tank', category: 'practice', name: 'Fish Tank', cost: 32, blurb: 'Calm fish for nervous waiters.' },
  { id: 'helper-desk', category: 'practice', name: "Helper's Desk", cost: 50, blurb: 'Staff helpers arrive in a later update.', soon: true },
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
