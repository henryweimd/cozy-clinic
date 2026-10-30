/**
 * Daily streak: consecutive days with >=1 completed visit earn
 * an escalating bonus (+1 .. +5, capped). Pure + date-injected
 * (unit-tested) — the scene supplies today/yesterday strings
 * and persists the state. The retention hook: coming back
 * tomorrow is always worth more than grinding today.
 */

export interface StreakState {
  /** YYYY-MM-DD of the last bonus, null before the first visit. */
  lastDay: string | null;
  /** Current consecutive-day count. */
  streak: number;
}

export const EMPTY_STREAK: StreakState = { lastDay: null, streak: 0 };

/** First completion of the day extends (or starts) the streak. */
export function nextStreak(prev: StreakState, today: string, yesterday: string): StreakState {
  if (prev.lastDay === today) return prev;
  if (prev.lastDay === yesterday) return { lastDay: today, streak: prev.streak + 1 };
  return { lastDay: today, streak: 1 };
}

/** True when this completion earns the daily bonus. */
export function earnsDailyBonus(prev: StreakState, today: string): boolean {
  return prev.lastDay !== today;
}

/** Escalating bonus, capped so grinding never beats returning. */
export function streakBonus(streak: number): number {
  return Math.max(1, Math.min(streak, 5));
}
