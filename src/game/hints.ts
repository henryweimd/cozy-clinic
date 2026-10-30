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
export const FIRST_QUIZ_HINT_KEY = 'cozy-first-quiz-hint-v1';
export const UNDO_HINT_KEY = 'cozy-undo-hint-v1';

/** True exactly once: the exam tray holds per-disease clues. */
export function takeTrayHint(store: HintStore): boolean {
  return takeHint(store, TRAY_HINT_KEY);
}

/** True exactly once: the first quiz ever coaches the tap. */
export function takeFirstQuizHint(store: HintStore): boolean {
  return takeHint(store, FIRST_QUIZ_HINT_KEY);
}

/** True exactly once: the Undo pill appears after a first move. */
export function takeUndoHint(store: HintStore): boolean {
  return takeHint(store, UNDO_HINT_KEY);
}

function takeHint(store: HintStore, key: string): boolean {
  try {
    if (store.getItem(key) !== null) return false;
    store.setItem(key, '1');
    return true;
  } catch {
    return false;
  }
}
