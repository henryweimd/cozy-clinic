/**
 * WS-E 10-move undo: a capped snapshot stack. The scene pushes
 * one snapshot per resolved move (engine state + UI cursor bits)
 * and pops to rewind; the 11th push drops the oldest. Generic
 * over the snapshot type so the scene owns the shape. Pure —
 * the scene wires it at the next integration.
 */

export const UNDO_CAP = 10;

export interface UndoStack<T> {
  past: T[];
}

export function emptyUndo<T>(): UndoStack<T> {
  return { past: [] };
}

/** Push a snapshot AFTER a move resolves. Drops oldest past 10. */
export function pushMove<T>(stack: UndoStack<T>, snapshot: T): UndoStack<T> {
  const past = [...stack.past, snapshot];
  while (past.length > UNDO_CAP) past.shift();
  return { past };
}

/**
 * Undo one move: returns the snapshot to restore plus the
 * reduced stack, or null when there is nothing to undo.
 */
export function undoMove<T>(
  stack: UndoStack<T>,
): { stack: UndoStack<T>; snapshot: T } | null {
  if (stack.past.length === 0) return null;
  const past = stack.past.slice(0, -1);
  const snapshot = stack.past[stack.past.length - 1] as T;
  return { stack: { past }, snapshot };
}

export function undoDepth<T>(stack: UndoStack<T>): number {
  return stack.past.length;
}

export function canUndo<T>(stack: UndoStack<T>): boolean {
  return stack.past.length > 0;
}

/** Clear history (new patient, new visit). */
export function clearUndo<T>(): UndoStack<T> {
  return { past: [] };
}
