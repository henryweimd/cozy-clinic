import { describe, expect, it } from 'vitest';
import { actionLabel, CONDITIONS } from './conditions';
import type { ConditionId } from './types';

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
      for (const tier of ['gentle', 'steady', 'expert'] as const) {
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
});
