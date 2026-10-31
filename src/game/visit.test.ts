import { describe, expect, it } from 'vitest';
import { chooseFrame, examQuestion, isPerfectVisit, resultCopy, roundQuestion, scoreCount, visitOutcome } from './visit';

describe('chooseFrame', () => {
  it('names the choice type ahead at every round and tier', () => {
    expect(chooseFrame('history', 'gentle')).toContain('question');
    expect(chooseFrame('examine', 'gentle')).toContain('check');
    expect(chooseFrame('diagnose', 'gentle')).toContain('diagnosis');
    expect(chooseFrame('treat', 'gentle')).toContain('care');
    for (const tier of ['gentle', 'steady', 'clinical', 'expert'] as const) {
      for (const round of ['history', 'examine', 'diagnose', 'treat'] as const) {
        const frame = chooseFrame(round, tier);
        expect(frame.length).toBeGreaterThan(0);
        expect(frame).toMatch(/^(Choose|Select) the /);
      }
    }
  });

  it('speaks expert at the expert tier', () => {
    expect(chooseFrame('history', 'expert')).toContain('highest-yield');
    expect(chooseFrame('treat', 'expert')).toContain('intervention');
  });
});

describe('visitOutcome', () => {
  it('takes the right diagnosis AND the right treatment', () => {
    expect(visitOutcome({ hxBest: true, examBest: true, dxCorrect: true, txBest: true })).toBe('recovered');
    expect(visitOutcome({ hxBest: false, examBest: false, dxCorrect: true, txBest: true })).toBe('recovered');
    expect(visitOutcome({ hxBest: true, examBest: true, dxCorrect: false, txBest: true })).toBe('struggling');
    expect(visitOutcome({ hxBest: true, examBest: true, dxCorrect: true, txBest: false })).toBe('struggling');
  });

  it('counts the set', () => {
    expect(scoreCount({ hxBest: true, examBest: true, dxCorrect: false, txBest: true })).toBe(3);
  });
});

describe('isPerfectVisit', () => {
  it('needs all four rounds right', () => {
    expect(isPerfectVisit({ hxBest: true, examBest: true, dxCorrect: true, txBest: true })).toBe(true);
    expect(isPerfectVisit({ hxBest: false, examBest: true, dxCorrect: true, txBest: true })).toBe(false);
    expect(isPerfectVisit({ hxBest: true, examBest: true, dxCorrect: false, txBest: true })).toBe(false);
    expect(isPerfectVisit({ hxBest: true, examBest: true, dxCorrect: true, txBest: false })).toBe(false);
  });
});

describe('round questions', () => {
  it('asks every round at every tier with the name filled in', () => {
    for (const tier of ['gentle', 'steady', 'clinical', 'expert'] as const) {
      expect(roundQuestion('diagnose', tier, 'Milo')).not.toContain('{name}');
      expect(roundQuestion('treat', tier, 'Milo')).not.toContain('{name}');
      expect(roundQuestion('diagnose', tier, 'Milo').length).toBeGreaterThan(0);
    }
    expect(roundQuestion('diagnose', 'gentle', 'Milo')).toContain('Milo');
  });

  it('fills exam templates', () => {
    expect(examQuestion('{name} + {demo}?', 'Milo', '7yM')).toBe('Milo + 7yM?');
  });
});

describe('resultCopy', () => {
  it('praises the player, never the patient state', () => {
    const copy = resultCopy({
      outcome: 'recovered',
      visitNo: 2,
      coinsEarned: 3,
      score: { hxBest: true, examBest: true, dxCorrect: true, txBest: true },
      condition: 'Sniffly Cold',
      pearl: 'Cough + sniffles, zero Centor: a virus',
    });
    expect(copy.title).toBe('Flawless visit, Doctor!');
    expect(copy.lines).toEqual([
      'Visit #2 complete',
      '4 of 4 right',
      'Cough + sniffles, zero Centor: a virus',
      '+3 Care Coins earned',
    ]);
    expect(copy.title + copy.lines.join(' ')).not.toMatch(/better|worse|cured|healed/i);
    expect(copy.primary).toBe('Next patient');
  });

  it('keeps the standard headline for a 3/4 recovery', () => {
    const copy = resultCopy({
      outcome: 'recovered',
      visitNo: 2,
      coinsEarned: 2,
      score: { hxBest: true, examBest: false, dxCorrect: true, txBest: true },
      condition: 'Sniffly Cold',
      pearl: 'Cough + sniffles, zero Centor: a virus',
    });
    expect(copy.title).toBe('Great work, Doctor!');
    expect(copy.lines[1]).toBe('3 of 4 right');
  });

  it('keeps struggling cozy and never obliges learning', () => {
    const copy = resultCopy({
      outcome: 'struggling',
      visitNo: 2,
      coinsEarned: 1,
      score: { hxBest: true, examBest: false, dxCorrect: false, txBest: true },
      condition: 'Sniffly Cold',
      pearl: 'Cough + sniffles, zero Centor: a virus',
    });
    expect(copy.title).toBe('Tough case — keep going!');
    expect(copy.lines).toEqual([
      'Visit #2',
      '2 of 4 right',
      'Cough + sniffles, zero Centor: a virus',
      'Every doctor keeps learning.',
    ]);
    expect(copy.primary).toBe('Next patient');
    expect(copy.secondary).toBe('Try again');
  });
});
