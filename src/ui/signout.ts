import { VISIT_CONTEXT_WORDING } from './mockData';
import type { ChromeTier, VisitContext } from './mockData';

/**
 * Tier-aware signout composer for the Medical Chart drawer.
 * Expert reads like a real doctor's signout ("Acute visit #4 ·
 * 8yF / c/o \"wheezy\" / PMH Asthma · Meds: none"); steady
 * expands the abbreviations; gentle stays plain sentences a
 * kid can follow. The complaint label is always QUOTED, never
 * conjugated, so awkward labels ("running high") stay clean.
 * Pure + unit-tested; the drawer only stacks the lines.
 */

export interface SignoutInput {
  visitNo: number;
  visitKind: VisitContext;
  name: string;
  ageYears: number;
  /** 'F' | 'M' (patients.sex). */
  sex: string;
  /** Stage label, any case — lowercased + quoted. */
  complaint: string;
  /** Condition name, e.g. 'Asthma'. */
  condition: string;
  /** One-line observation (stage blurb + condition note). */
  observation: string;
  /** Prescribed meds, display strings (empty = none yet). */
  meds: readonly string[];
}

/** Gentle-tier visit words: plain visit types, kid-readable. */
const GENTLE_VISIT: Record<VisitContext, string> = {
  'new-patient': 'First visit',
  'sick-visit': 'Sick visit',
  'follow-up': 'Check-in visit',
};

export function signoutLines(input: SignoutInput, tier: ChromeTier): string[] {
  const c = input.complaint.toLowerCase();
  const condLow = input.condition.toLowerCase();
  const medsStr = input.meds.length === 0 ? 'none' : input.meds.join(', ');
  if (tier === 'expert') {
    const visit = VISIT_CONTEXT_WORDING[input.visitKind].expert;
    return [
      `${visit} #${input.visitNo} · ${input.ageYears}y${input.sex}`,
      `c/o "${c}"`,
      `PMH ${input.condition} · Meds: ${medsStr}`,
      input.observation,
    ];
  }
  if (tier === 'steady') {
    const visit = VISIT_CONTEXT_WORDING[input.visitKind].steady;
    return [
      `${visit} #${input.visitNo} · ${input.name}, ${input.ageYears}${input.sex}`,
      `Here for "${c}"`,
      `History: ${input.condition} · Meds: ${medsStr}`,
      input.observation,
    ];
  }
  const medsGentle =
    input.meds.length === 0 ? 'No medicines yet.' : `Takes ${medsStr.toLowerCase()}.`;
  return [
    `${GENTLE_VISIT[input.visitKind]} · #${input.visitNo}`,
    `Feeling "${c}".`,
    `Has ${condLow}. ${medsGentle}`,
    input.observation,
  ];
}
