import { describe, expect, it } from 'vitest';
import { signoutLines } from './signout';
import type { SignoutInput } from './signout';

const MABEL: SignoutInput = {
  visitNo: 4,
  visitKind: 'sick-visit',
  name: 'Mabel',
  ageYears: 8,
  sex: 'F',
  complaint: 'wheezy',
  condition: 'Asthma',
  observation: 'Whistly breaths, worried eyes. Tight, twitchy airways.',
  meds: [],
};

describe('signoutLines', () => {
  it('writes a real signout at expert tier', () => {
    expect(signoutLines(MABEL, 'expert')).toEqual([
      'Acute visit #4 · 8yF',
      'c/o "wheezy"',
      'PMH Asthma · Meds: none',
      MABEL.observation,
    ]);
  });

  it('expands abbreviations at steady tier', () => {
    expect(signoutLines(MABEL, 'steady')).toEqual([
      'Sick Visit #4 · 8F',
      'Here for "wheezy"',
      'History: Asthma · Meds: none',
      MABEL.observation,
    ]);
  });

  it('stays plain sentences at gentle tier', () => {
    expect(signoutLines(MABEL, 'gentle')).toEqual([
      'Sick visit · #4',
      'Feeling "wheezy".',
      'Has asthma. No medicines yet.',
      MABEL.observation,
    ]);
  });

  it('spells everything out at clinical tier', () => {
    expect(signoutLines(MABEL, 'clinical')).toEqual([
      'Acute visit #4 · 8 year old F',
      'Reports "wheezy"',
      'History: Asthma · Medicines: none',
      MABEL.observation,
    ]);
  });

  it('handles awkward labels by quoting, not conjugating', () => {
    const high = { ...MABEL, complaint: 'Running High', condition: 'High Blood Pressure' };
    const [, gentleComplaint] = signoutLines(high, 'gentle');
    expect(gentleComplaint).toBe('Feeling "running high".');
  });

  it('lists meds when present', () => {
    const medded = { ...MABEL, meds: ['daily controller'] };
    expect(signoutLines(medded, 'expert')[2]).toBe('PMH Asthma · Meds: daily controller');
    expect(signoutLines(medded, 'gentle')[2]).toBe('Has asthma. Takes daily controller.');
  });

  it('never repeats the patient name (the nametag owns it)', () => {
    for (const tier of ['gentle', 'steady', 'clinical', 'expert'] as const) {
      for (const line of signoutLines(MABEL, tier)) {
        expect(line).not.toContain('Mabel');
      }
    }
  });

  it('fits the drawer budget', () => {
    for (const tier of ['gentle', 'steady', 'clinical', 'expert'] as const) {
      const lines = signoutLines(MABEL, tier);
      expect(lines).toHaveLength(4);
      expect(lines.every((l) => l.length > 0)).toBe(true);
      expect(lines.join(' ').length).toBeLessThanOrEqual(200);
    }
  });
});
