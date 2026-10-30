import { describe, expect, it } from 'vitest';
import { FALLBACK_EXAM_FINDINGS } from './fallbackPack';
import { findingFor, MODALITIES } from './examFindings';

const CONDITIONS = ['asthma', 'viral-respiratory', 'dehydration', 'hypertension'];

describe('exam findings', () => {
  it('covers every condition x modality with all three tiers', () => {
    for (const conditionId of CONDITIONS) {
      for (const modality of MODALITIES) {
        for (const tier of ['gentle', 'steady', 'expert'] as const) {
          const text = findingFor(FALLBACK_EXAM_FINDINGS, conditionId, modality, tier);
          expect(text, `${conditionId}/${modality}/${tier}`).toBeTruthy();
        }
      }
    }
  });

  it('climbs reading level from gentle to expert', () => {
    // Spot-check: the expert line uses the clinical term the
    // gentle line paraphrases.
    const wheeze = findingFor(FALLBACK_EXAM_FINDINGS, 'asthma', 'listen', 'expert')!;
    expect(wheeze).toMatch(/expiratory/i);
    expect(findingFor(FALLBACK_EXAM_FINDINGS, 'asthma', 'listen', 'gentle')!).toMatch(/whistl/i);
    const turgor = findingFor(FALLBACK_EXAM_FINDINGS, 'dehydration', 'feel', 'expert')!;
    expect(turgor).toMatch(/turgor/i);
  });

  it('returns null for unknown rows (scene guards)', () => {
    expect(findingFor(FALLBACK_EXAM_FINDINGS, 'nope', 'look', 'gentle')).toBeNull();
    expect(findingFor([], 'asthma', 'look', 'gentle')).toBeNull();
  });
});
