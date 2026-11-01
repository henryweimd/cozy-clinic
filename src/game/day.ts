/**
 * Clinic day: the Daily Rituals clock (pure, unit-tested).
 * Game time runs faster than real time — a day is a few
 * visits, not hours. Day one is the gentle onboarding day
 * (two visits); later days run four. Beats (morning /
 * afternoon / evening) come from progress through the day.
 * The scene persists the state and advances it once per
 * completed visit (never on a re-shown result).
 */

export type DayBeat = 'morning' | 'afternoon' | 'evening';

export interface DayState {
  /** 1-based clinic day. */
  day: number;
  /** Completed visits so far today. */
  visitsToday: number;
}

export const EMPTY_DAY: DayState = { day: 1, visitsToday: 0 };

/** Pure: visits per day — gentle day one, full days after. */
export function dayLength(day: number): number {
  return day <= 1 ? 2 : 4;
}

/** Pure: the beat for progress through the day. */
export function beatFor(visitsToday: number, day: number): DayBeat {
  const len = dayLength(day);
  const frac = len <= 0 ? 0 : visitsToday / len;
  if (frac < 1 / 3) return 'morning';
  if (frac < 2 / 3) return 'afternoon';
  return 'evening';
}

/** Pure: the player-facing day line. */
export function dayLabel(state: DayState): string {
  const beat = beatFor(state.visitsToday, state.day);
  return `Day ${state.day} · ${beat.charAt(0).toUpperCase() + beat.slice(1)}`;
}

/** Pure: one completed visit later (immutable update). */
export function advanceDay(prev: DayState): DayState {
  const next = prev.visitsToday + 1;
  if (next >= dayLength(prev.day)) return { day: prev.day + 1, visitsToday: 0 };
  return { day: prev.day, visitsToday: next };
}

/**
 * Pure: the queue for the day — day one shows the first two
 * (gentle onboarding), later days the full queue. Always a
 * copy, never the live order.
 */
export function queueForDay(order: readonly string[], day: number): string[] {
  if (day <= 1) return [...order].slice(0, 2);
  return [...order];
}

/** Shape guard for the persisted day (unit-tested). */
export function isDayState(v: unknown): v is DayState {
  if (typeof v !== 'object' || v === null || Array.isArray(v)) return false;
  const { day, visitsToday } = v as { day?: unknown; visitsToday?: unknown };
  return (
    typeof day === 'number' &&
    Number.isInteger(day) &&
    day >= 1 &&
    typeof visitsToday === 'number' &&
    Number.isInteger(visitsToday) &&
    visitsToday >= 0
  );
}
