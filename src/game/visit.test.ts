import { describe, expect, it } from 'vitest';
import { resultCopy, visitOutcome } from './visit';

describe('visitOutcome', () => {
  it('ends recovered at stage 0, struggling at the last stage', () => {
    expect(visitOutcome(0, 4)).toBe('recovered');
    expect(visitOutcome(3, 4)).toBe('struggling');
  });

  it('keeps mid-ladder stages open', () => {
    expect(visitOutcome(1, 4)).toBeNull();
    expect(visitOutcome(2, 4)).toBeNull();
  });
});

describe('resultCopy', () => {
  it('celebrates recovery and routes onward', () => {
    const copy = resultCopy({
      outcome: 'recovered',
      name: 'Mabel',
      condition: 'Asthma',
      visitNo: 4,
      coinsEarned: 3,
    });
    expect(copy.title).toBe('Mabel is all better!');
    expect(copy.lines).toEqual(['Visit #4 complete', '+3 Care Coins earned']);
    expect(copy.primary).toBe('Next patient');
    expect(copy.secondary).toBe('Learn about Asthma');
  });

  it('keeps struggling cozy and routes to learning first', () => {
    const copy = resultCopy({
      outcome: 'struggling',
      name: 'Milo',
      condition: 'Sniffly Cold',
      visitNo: 2,
      coinsEarned: 1,
    });
    expect(copy.title).toBe('Milo still needs help');
    expect(copy.primary).toBe('Learn about Sniffly Cold');
    expect(copy.secondary).toBe('Try again');
    expect(copy.lines.join(' ')).toContain('sniffly cold');
  });
});
