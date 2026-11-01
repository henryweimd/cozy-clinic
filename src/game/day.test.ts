import { describe, expect, it } from 'vitest';
import {
  advanceDay,
  beatFor,
  dayLabel,
  dayLength,
  EMPTY_DAY,
  isDayState,
  queueForDay,
} from './day';

describe('dayLength', () => {
  it('keeps day one gentle, full days after', () => {
    expect(dayLength(1)).toBe(2);
    expect(dayLength(2)).toBe(4);
    expect(dayLength(9)).toBe(4);
  });
});

describe('beatFor', () => {
  it('walks morning to evening across a gentle day one', () => {
    expect(beatFor(0, 1)).toBe('morning');
    expect(beatFor(1, 1)).toBe('afternoon');
    expect(beatFor(2, 1)).toBe('evening');
  });

  it('walks morning to evening across a full day', () => {
    expect(beatFor(0, 2)).toBe('morning');
    expect(beatFor(1, 2)).toBe('morning');
    expect(beatFor(2, 2)).toBe('afternoon');
    expect(beatFor(3, 2)).toBe('evening');
  });
});

describe('dayLabel', () => {
  it('names the day and beat for the player', () => {
    expect(dayLabel(EMPTY_DAY)).toBe('Day 1 · Morning');
    expect(dayLabel({ day: 2, visitsToday: 3 })).toBe('Day 2 · Evening');
  });
});

describe('advanceDay', () => {
  it('counts visits, then turns the day over (immutable)', () => {
    expect(advanceDay(EMPTY_DAY)).toEqual({ day: 1, visitsToday: 1 });
    expect(EMPTY_DAY).toEqual({ day: 1, visitsToday: 0 });
    expect(advanceDay({ day: 1, visitsToday: 1 })).toEqual({ day: 2, visitsToday: 0 });
    expect(advanceDay({ day: 2, visitsToday: 3 })).toEqual({ day: 3, visitsToday: 0 });
    expect(advanceDay({ day: 2, visitsToday: 1 })).toEqual({ day: 2, visitsToday: 2 });
  });
});

describe('queueForDay', () => {
  it('caps day one at two friends, full queue after', () => {
    const order = ['Bram', 'Pearl', 'Lena', 'Cole'];
    expect(queueForDay(order, 1)).toEqual(['Bram', 'Pearl']);
    expect(queueForDay(order, 2)).toEqual(order);
    expect(queueForDay(['Bram'], 1)).toEqual(['Bram']);
  });

  it('returns a copy, never the live order', () => {
    const order = ['Bram', 'Pearl'];
    const capped = queueForDay(order, 2);
    expect(capped).not.toBe(order);
    capped.push('June');
    expect(order).toEqual(['Bram', 'Pearl']);
  });
});

describe('isDayState', () => {
  it('accepts saved shapes, rejects junk', () => {
    expect(isDayState(EMPTY_DAY)).toBe(true);
    expect(isDayState({ day: 3, visitsToday: 2 })).toBe(true);
    expect(isDayState(null)).toBe(false);
    expect(isDayState({})).toBe(false);
    expect(isDayState({ day: 0, visitsToday: 0 })).toBe(false);
    expect(isDayState({ day: 1, visitsToday: -1 })).toBe(false);
    expect(isDayState({ day: '2', visitsToday: 0 })).toBe(false);
  });
});
