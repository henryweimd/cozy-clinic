import { describe, expect, it } from 'vitest';
import {
  bodyWord,
  EASE_START,
  easeOf,
  easeOnGrade,
  heartWord,
  meterPips,
  physicalHealth,
  updateEase,
} from './meters';

describe('physicalHealth', () => {
  it('averages vitals and penalizes later stages', () => {
    expect(physicalHealth({ energy: 8, comfort: 8, breathing: 8 }, 0)).toBe(8);
    expect(physicalHealth({ energy: 8, comfort: 8, breathing: 8 }, 2)).toBe(6);
    expect(physicalHealth({ energy: 5, comfort: 7, breathing: 6 }, 1)).toBe(5);
    expect(physicalHealth({ energy: 0, comfort: 0, breathing: 0 }, 3)).toBe(0);
    expect(physicalHealth({ energy: 10, comfort: 10, breathing: 10 }, 0)).toBe(10);
  });
});

describe('meterPips', () => {
  it('maps 0-10 onto 0-5 pips', () => {
    expect(meterPips(0)).toBe(0);
    expect(meterPips(1)).toBe(1);
    expect(meterPips(5)).toBe(3);
    expect(meterPips(9)).toBe(5);
    expect(meterPips(10)).toBe(5);
  });
});

describe('meter words', () => {
  it('names body bands in plain words', () => {
    expect(bodyWord(0)).toBe('Weak');
    expect(bodyWord(3)).toBe('Poor');
    expect(bodyWord(5)).toBe('Fair');
    expect(bodyWord(7)).toBe('Good');
    expect(bodyWord(10)).toBe('Strong');
  });

  it('names heart bands in plain words', () => {
    expect(heartWord(1)).toBe('Scared');
    expect(heartWord(2)).toBe('Unsure');
    expect(heartWord(4)).toBe('Okay');
    expect(heartWord(7)).toBe('Happy');
    expect(heartWord(9)).toBe('Glad');
  });
});

describe('ease', () => {
  it('starts newcomers at ease', () => {
    expect(EASE_START).toBe(6);
    expect(easeOf(undefined)).toBe(6);
    expect(easeOf({})).toBe(6);
    expect(easeOf({ ease: 4 })).toBe(4);
  });

  it('moves on grades within 0-10', () => {
    expect(easeOnGrade(6, 'BEST')).toBe(7);
    expect(easeOnGrade(10, 'BEST')).toBe(10);
    expect(easeOnGrade(6, 'WRONG')).toBe(4);
    expect(easeOnGrade(1, 'WRONG')).toBe(0);
    expect(easeOnGrade(6, 'NOT_GREAT')).toBe(6);
    expect(easeOnGrade(6, 'DANGEROUS')).toBe(6);
  });

  it('updates immutably per patient, keeping scores', () => {
    const map = updateEase({}, 'Bram', 7);
    expect(map).toEqual({ Bram: { score: 0, perfect: false, ease: 7 } });
    const kept = updateEase(
      { Bram: { score: 4, perfect: true, pearl: 'a virus', ease: 7 } },
      'Bram',
      8,
    );
    expect(kept.Bram).toEqual({ score: 4, perfect: true, pearl: 'a virus', ease: 8 });
    expect(map).toEqual({ Bram: { score: 0, perfect: false, ease: 7 } });
  });
});
