import { afterEach, describe, expect, it, vi } from 'vitest';
import { FALLBACK_EXAM_FINDINGS } from './fallbackPack';
import { findingFor, loadExamFindings, MODALITIES } from './examFindings';

const CONDITIONS = ['asthma', 'viral-respiratory', 'dehydration', 'hypertension'];

describe('exam findings', () => {
  it('covers every condition x modality at all four tiers', () => {
    for (const conditionId of CONDITIONS) {
      for (const modality of MODALITIES) {
        for (const tier of ['gentle', 'steady', 'clinical', 'expert'] as const) {
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

describe('exam-findings network hardening', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('loadExamFindings falls back when the backend hangs', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn((_url: string, init?: { signal?: AbortSignal }) => {
        return new Promise<never>((_resolve, reject) => {
          init?.signal?.addEventListener('abort', () =>
            reject(new Error('aborted')),
          );
        });
      }),
    );
    const data = await loadExamFindings({
      url: 'https://down.example',
      key: 'k',
      timeoutMs: 20,
    });
    expect(data.source).toBe('fallback');
    expect(data.findings.length).toBeGreaterThan(0);
  });
});
