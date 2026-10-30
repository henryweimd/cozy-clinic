import { describe, expect, it } from 'vitest';
import { resultCopy, scoreCount, visitOutcome } from './visit';

describe('visitOutcome', () => {
  it('takes the right diagnosis AND the right treatment', () => {
    expect(visitOutcome({ examBest: true, dxCorrect: true, txBest: true })).toBe('recovered');
    expect(visitOutcome({ examBest: false, dxCorrect: true, txBest: true })).toBe('recovered');
    expect(visitOutcome({ examBest: true, dxCorrect: false, txBest: true })).toBe('struggling');
    expect(visitOutcome({ examBest: true, dxCorrect: true, txBest: false })).toBe('struggling');
  });

  it('counts the set', () => {
    expect(scoreCount({ examBest: true, dxCorrect: false, txBest: true })).toBe(2);
  });
});

describe('resultCopy', () => {
  it('praises the player, never the patient state', () => {
    const copy = resultCopy({
      outcome: 'recovered',
      visitNo: 2,
      coinsEarned: 3,
      score: { examBest: true, dxCorrect: true, txBest: true },
      condition: 'Sniffly Cold',
    });
    expect(copy.title).toBe('Great work, Doctor!');
    expect(copy.lines).toEqual(['Visit #2 complete', '3 of 3 right', '+3 Care Coins earned']);
    expect(copy.title + copy.lines.join(' ')).not.toMatch(/better|worse|cured|healed/i);
    expect(copy.primary).toBe('Next patient');
  });

  it('keeps struggling cozy and routes to learning first', () => {
    const copy = resultCopy({
      outcome: 'struggling',
      visitNo: 2,
      coinsEarned: 1,
      score: { examBest: false, dxCorrect: false, txBest: true },
      condition: 'Sniffly Cold',
    });
    expect(copy.title).toBe('Tough case — keep going!');
    expect(copy.lines).toEqual(['Visit #2', '1 of 3 right', 'Every doctor keeps learning.']);
    expect(copy.primary).toBe('Learn about Sniffly Cold');
    expect(copy.secondary).toBe('Try again');
  });
});
