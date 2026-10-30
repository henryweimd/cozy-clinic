import { describe, expect, it } from 'vitest';
import { buyItem, itemsFor, SHOP_CATALOG } from './shop';

describe('shop catalog', () => {
  it('carries honest, unique, priced stock', () => {
    const ids = SHOP_CATALOG.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const item of SHOP_CATALOG) {
      expect(item.name.length).toBeGreaterThan(0);
      expect(item.blurb.length).toBeGreaterThan(0);
      expect(item.cost).toBeGreaterThan(0);
    }
    expect(itemsFor('tools').length).toBeGreaterThanOrEqual(3);
    expect(itemsFor('medicines').length).toBeGreaterThanOrEqual(3);
    expect(itemsFor('practice').length).toBeGreaterThanOrEqual(3);
  });
});

describe('buyItem', () => {
  it('deducts and marks owned', () => {
    const item = SHOP_CATALOG.find((i) => i.id === 'bandages')!;
    const out = buyItem(12, [], item);
    expect(out).toEqual({ balance: 7, owned: ['bandages'] });
  });

  it('refuses soon, owned, and broke', () => {
    const soon = SHOP_CATALOG.find((i) => i.soon)!;
    expect(buyItem(100, [], soon)).toBeNull();
    const item = SHOP_CATALOG.find((i) => i.id === 'bandages')!;
    expect(buyItem(100, ['bandages'], item)).toBeNull();
    expect(buyItem(3, [], item)).toBeNull();
  });
});
