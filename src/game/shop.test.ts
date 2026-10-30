import { describe, expect, it } from 'vitest';
import {
  buyItem,
  itemsFor,
  learnBonus,
  nurseBonus,
  perfectBonus,
  SHOP_CATALOG,
  toolBonus,
} from './shop';

describe('shop catalog', () => {
  it('carries honest, unique, priced stock with stated effects', () => {
    const ids = SHOP_CATALOG.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const item of SHOP_CATALOG) {
      expect(item.name.length).toBeGreaterThan(0);
      expect(item.blurb.length).toBeGreaterThan(0);
      expect(item.effect.length).toBeGreaterThan(0);
      // One 13px line in a 300px wrap (auditor mirrors this cap).
      expect(item.effect.length).toBeLessThanOrEqual(44);
      expect(item.cost).toBeGreaterThan(0);
    }
    expect(itemsFor('tools').length).toBeGreaterThanOrEqual(3);
    expect(itemsFor('medicines').length).toBeGreaterThanOrEqual(3);
    expect(itemsFor('practice').length).toBeGreaterThanOrEqual(3);
    // Four rows per tab max (sheet geometry: 272 + 3*112 + 88).
    for (const tab of ['tools', 'medicines', 'practice'] as const) {
      expect(itemsFor(tab).length).toBeLessThanOrEqual(4);
    }
    // The first staff hire is real stock, not a Soon row.
    const nurse = SHOP_CATALOG.find((i) => i.id === 'nurse-birch')!;
    expect(nurse.soon).toBeUndefined();
    expect(buyItem(60, [], nurse)).toEqual({ balance: 10, owned: ['nurse-birch'] });
  });
});

describe('buyItem', () => {
  it('deducts and marks owned', () => {
    const item = SHOP_CATALOG.find((i) => i.id === 'bandages')!;
    const out = buyItem(12, [], item);
    expect(out).toEqual({ balance: 7, owned: ['bandages'] });
  });

  it('refuses soon, owned, and broke', () => {
    const item = SHOP_CATALOG.find((i) => i.id === 'bandages')!;
    expect(buyItem(100, [], { ...item, soon: true })).toBeNull();
    expect(buyItem(100, ['bandages'], item)).toBeNull();
    expect(buyItem(3, [], item)).toBeNull();
  });
});

describe('shop payout bonuses', () => {
  it('stacks tools, nurse, medicines, and cozy goods separately', () => {
    expect(toolBonus([])).toBe(0);
    expect(toolBonus(['bandages', 'stethoscope', 'spacer'])).toBe(2);
    expect(nurseBonus([])).toBe(0);
    expect(nurseBonus(['nurse-birch'])).toBe(1);
    expect(learnBonus(['saline-spray', 'calamine', 'bandages'])).toBe(2);
    expect(perfectBonus([])).toBe(0);
    expect(perfectBonus(['growth-chart', 'fish-tank', 'nurse-birch'])).toBe(4);
  });
});
