import { describe, expect, it } from 'vitest';
import { actionLabel, CONDITIONS, CONDITION_TIER_NAMES } from './conditions';
import type { ConditionId } from './types';

/**
 * Gentle dx names must teach real medicine: simple words WITH
 * the real term (hook + parenthetical), never baby-talk, never
 * colliding (c-diff vs. stomach bug read different). The card-fit
 * geometry (2 wrapped lines) is mirrored in the layout auditor.
 */
describe('gentle dx names', () => {
  const BABY_TALK = [
    'Dried Out', 'Sniffly Cold', 'Sore Ear', 'Itchy Skin', 'Lung Infection',
    'Seal-Bark Cough', 'Spotty Hands-Feet-Mouth', 'Tick-Bite Bullseye Rash',
    'Sore Appendix', 'Pool Ear Ouch', 'Wiped-Out Sickness', 'Runny Tummy Bug',
    "Traveler's Tummy Runs", 'Milky Tummy Aches', 'Hard Poops Ouch',
    'Bleedy Nose Drip', 'Gooey Pink Eyes', 'Itchy Spotty Pox',
    'Burning Pee Ouch', 'Sore Eyelid Bump', 'Pollen Sniffles',
    'Ring-Shaped Rash', 'Twisted Ankle', 'Ouch', 'ouchie',
  ];

  it('keeps every tier name in the 34-char card budget', () => {
    for (const id of CONDITION_IDS) {
      for (const tier of ['gentle', 'steady', 'clinical', 'expert'] as const) {
        const text = CONDITION_TIER_NAMES[id][tier];
        expect(text.length).toBeGreaterThan(0);
        expect(text.length).toBeLessThanOrEqual(34);
      }
    }
  });

  it('keeps gentle names pairwise distinct (no collisions)', () => {
    const seen = new Map<string, string>();
    for (const id of CONDITION_IDS) {
      const text = CONDITION_TIER_NAMES[id].gentle;
      expect(seen.has(text)).toBe(false);
      seen.set(text, id);
    }
  });

  it('carries no baby-talk in gentle names or canonical names', () => {
    for (const id of CONDITION_IDS) {
      const hay = `${CONDITION_TIER_NAMES[id].gentle} ${CONDITIONS[id].name}`;
      for (const banned of BABY_TALK) {
        expect(hay.includes(banned)).toBe(false);
      }
    }
    for (const id of CONDITION_IDS) {
      for (const action of CONDITIONS[id].actions) {
        expect(action.labels.gentle.includes('ouchie')).toBe(false);
      }
    }
  });
});

const CONDITION_IDS = Object.keys(CONDITIONS) as ConditionId[];

/**
 * The engine's veto on Muse-drafted wording: tiers reword the
 * DISPLAY only. Canonical labels (engine memory, choice
 * records, trajectory matching) never move, every variant fits
 * the 2-line card budget, and switching tiers can't change the
 * right answer (structural — grades key on ids, not words).
 */
describe.each(CONDITION_IDS)('treatment wording %s', (condition) => {
  it('keeps steady === canonical and every tier in budget', () => {
    for (const action of CONDITIONS[condition].actions) {
      expect(action.labels.steady).toBe(action.label);
      for (const tier of ['gentle', 'steady', 'clinical', 'expert'] as const) {
        const text = actionLabel(action, tier);
        expect(text.length).toBeGreaterThan(0);
        // Card budget: 2 wrapped lines max (auditor mirrors).
        expect(text.length).toBeLessThanOrEqual(34);
      }
    }
  });

  it('varies gentle/expert from steady (a tier switch reads different)', () => {
    for (const action of CONDITIONS[condition].actions) {
      expect(
        action.labels.gentle !== action.label || action.labels.expert !== action.label,
      ).toBe(true);
    }
  });

  it('teaches per-choice: bounded dx pearls + a one-line visit pearl', () => {
    const def = CONDITIONS[condition];
    expect(def.dxPearl.right.length).toBeGreaterThan(10);
    expect(def.dxPearl.right.length).toBeLessThanOrEqual(70);
    expect(def.dxPearl.wrong.length).toBeGreaterThan(10);
    expect(def.dxPearl.wrong.length).toBeLessThanOrEqual(70);
    expect(def.visitPearl.length).toBeGreaterThan(10);
    expect(def.visitPearl.length).toBeLessThanOrEqual(40);
  });

  it('opens with a 3-question history round + tiered clue', () => {
    const def = CONDITIONS[condition];
    expect(def.historyOptions).toHaveLength(3);
    const ids = def.historyOptions.map((o) => o.id);
    expect(new Set(ids).size).toBe(3);
    expect(ids).toContain(def.historyBestId);
    for (const o of def.historyOptions) {
      expect(o.label.length).toBeGreaterThan(0);
      expect(o.label.length).toBeLessThanOrEqual(40);
    }
    for (const tier of ['gentle', 'steady', 'clinical', 'expert'] as const) {
      expect(def.bestHistory[tier].length).toBeGreaterThan(10);
      expect(def.historyQuiz[tier].length).toBeGreaterThan(10);
    }
    expect(def.historyQuiz.gentle).toContain('{name}');
    expect(def.historyQuiz.expert).toContain('{demo}');
  });
});
