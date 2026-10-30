import { describe, expect, it } from 'vitest';
import { takeTrayHint, TRAY_HINT_KEY } from './hints';
import type { HintStore } from './hints';

function fakeStore(broken = false): HintStore & { data: Record<string, string> } {
  const data: Record<string, string> = {};
  return {
    data,
    getItem(k: string) {
      if (broken) throw new Error('no storage');
      return data[k] ?? null;
    },
    setItem(k: string, v: string) {
      if (broken) throw new Error('no storage');
      data[k] = v;
    },
  };
}

describe('takeTrayHint', () => {
  it('fires exactly once per store', () => {
    const store = fakeStore();
    expect(takeTrayHint(store)).toBe(true);
    expect(store.data[TRAY_HINT_KEY]).toBe('1');
    expect(takeTrayHint(store)).toBe(false);
  });

  it('stays silent when storage is broken', () => {
    expect(takeTrayHint(fakeStore(true))).toBe(false);
  });
});
