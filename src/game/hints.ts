/**
 * One-time teaching hints (pure, unit-tested). Each hint fires
 * once per player ever — the scene calls take* at the teaching
 * moment and shows UI only when it returns true. Storage is
 * injected so tests use a fake.
 */

export interface HintStore {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export const TRAY_HINT_KEY = 'cozy-tray-hint-v1';

/** True exactly once: the exam tray holds per-disease clues. */
export function takeTrayHint(store: HintStore): boolean {
  try {
    if (store.getItem(TRAY_HINT_KEY) !== null) return false;
    store.setItem(TRAY_HINT_KEY, '1');
    return true;
  } catch {
    return false;
  }
}
