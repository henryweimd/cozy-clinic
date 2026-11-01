/**
 * Call a Consult: expendable senior-doctor power-ups (pure,
 * unit-tested). New doctors start with two and hold at most
 * three; more come from the shop (coins) or flawless-visit
 * surprise awards. Using one is the scene's job (highlight
 * + why-line); this module owns counts and coins only.
 */

export const CONSULT_START = 2;
export const CONSULT_CAP = 3;
export const CONSULT_COST = 8;

/** Pure: spend one consult, or null when empty. */
export function useConsult(count: number): number | null {
  if (!Number.isInteger(count) || count <= 0) return null;
  return count - 1;
}

/** Pure: buy one consult below the cap with enough coins. */
export function buyConsult(
  count: number,
  balance: number,
): { count: number; balance: number } | null {
  if (!Number.isInteger(count) || count < 0 || count >= CONSULT_CAP) return null;
  if (!Number.isInteger(balance) || balance < CONSULT_COST) return null;
  return { count: count + 1, balance: balance - CONSULT_COST };
}

/** Pure: surprise award — granted false at the cap (no toast). */
export function awardConsult(count: number): { count: number; granted: boolean } {
  if (!Number.isInteger(count) || count < 0) return { count: CONSULT_START, granted: false };
  if (count >= CONSULT_CAP) return { count, granted: false };
  return { count: count + 1, granted: true };
}

/** Shape guard for the persisted count (unit-tested). */
export function isConsultState(v: unknown): v is number {
  return typeof v === 'number' && Number.isInteger(v) && v >= 0 && v <= CONSULT_CAP;
}
