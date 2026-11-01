import { describe, expect, it } from 'vitest';
import {
  awardConsult,
  buyConsult,
  CONSULT_CAP,
  CONSULT_COST,
  CONSULT_START,
  isConsultState,
  useConsult,
} from './consults';

describe('consult economy', () => {
  it('starts new doctors with two consults', () => {
    expect(CONSULT_START).toBe(2);
    expect(CONSULT_CAP).toBe(3);
    expect(CONSULT_COST).toBe(8);
  });

  it('spends one consult per use', () => {
    expect(useConsult(2)).toBe(1);
    expect(useConsult(1)).toBe(0);
    expect(useConsult(0)).toBeNull();
  });

  it('buys below the cap with enough coins', () => {
    expect(buyConsult(1, 12)).toEqual({ count: 2, balance: 4 });
    expect(buyConsult(3, 100)).toBeNull();
    expect(buyConsult(1, 7)).toBeNull();
  });

  it('awards surprise consults up to the cap', () => {
    expect(awardConsult(1)).toEqual({ count: 2, granted: true });
    expect(awardConsult(3)).toEqual({ count: 3, granted: false });
  });
});

describe('isConsultState', () => {
  it('accepts saved counts, rejects junk', () => {
    expect(isConsultState(2)).toBe(true);
    expect(isConsultState(0)).toBe(true);
    expect(isConsultState(-1)).toBe(false);
    expect(isConsultState(4)).toBe(false);
    expect(isConsultState('2')).toBe(false);
    expect(isConsultState(null)).toBe(false);
  });
});
