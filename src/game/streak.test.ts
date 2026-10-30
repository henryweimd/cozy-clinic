import { describe, expect, it } from 'vitest';
import { EMPTY_STREAK, earnsDailyBonus, nextStreak, streakBonus } from './streak';

describe('daily streak', () => {
  it('starts at day 1 on the first visit ever', () => {
    const s = nextStreak(EMPTY_STREAK, '2026-10-30', '2026-10-29');
    expect(s).toEqual({ lastDay: '2026-10-30', streak: 1 });
    expect(earnsDailyBonus(EMPTY_STREAK, '2026-10-30')).toBe(true);
  });

  it('extends on consecutive days, ignores repeats same-day', () => {
    const day1 = nextStreak(EMPTY_STREAK, '2026-10-30', '2026-10-29');
    expect(earnsDailyBonus(day1, '2026-10-30')).toBe(false);
    expect(nextStreak(day1, '2026-10-30', '2026-10-29')).toBe(day1);
    const day2 = nextStreak(day1, '2026-10-31', '2026-10-30');
    expect(day2.streak).toBe(2);
  });

  it('resets after a missed day', () => {
    const day2 = { lastDay: '2026-10-31', streak: 2 };
    const back = nextStreak(day2, '2026-11-02', '2026-11-01');
    expect(back).toEqual({ lastDay: '2026-11-02', streak: 1 });
  });

  it('pays +1..+5, capped', () => {
    expect(streakBonus(1)).toBe(1);
    expect(streakBonus(3)).toBe(3);
    expect(streakBonus(5)).toBe(5);
    expect(streakBonus(30)).toBe(5);
    expect(streakBonus(0)).toBe(1);
  });
});
