import { describe, expect, it } from 'vitest';
import { takeFirstQuizHint, takeTrayHint, FIRST_QUIZ_HINT_KEY, TRAY_HINT_KEY } from './hints';
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

describe('takeFirstQuizHint', () => {
  it('fires exactly once per store, independent of the tray hint', () => {
    const store = fakeStore();
    expect(takeFirstQuizHint(store)).toBe(true);
    expect(store.data[FIRST_QUIZ_HINT_KEY]).toBe('1');
    expect(takeFirstQuizHint(store)).toBe(false);
    // The tray hint is a separate one-shot on the same store.
    expect(takeTrayHint(store)).toBe(true);
  });

  it('stays silent when storage is broken', () => {
    expect(takeFirstQuizHint(fakeStore(true))).toBe(false);
  });
});
