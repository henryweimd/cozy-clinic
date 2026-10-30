import { FALLBACK_EXAM_FINDINGS } from './fallbackPack';
import type { ExamModality, FallbackExamFinding } from './fallbackPack';

/**
 * Exam-findings live-read layer: Supabase first, fallback offline.
 * Same rules as the cast loader — boot-time fetch only, never
 * mid-tap; missing env or any failure falls back silently.
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as
  | string
  | undefined;

export interface ExamFindingsData {
  findings: FallbackExamFinding[];
  source: 'live' | 'fallback';
}

export const MODALITIES: readonly ExamModality[] = ['look', 'feel', 'tap', 'listen'];

export const MODALITY_LABEL: Record<ExamModality, string> = {
  look: 'Look',
  feel: 'Feel',
  tap: 'Tap',
  listen: 'Listen',
};

export async function loadExamFindings(): Promise<ExamFindingsData> {
  if (SUPABASE_URL === undefined || SUPABASE_ANON_KEY === undefined) {
    return { findings: FALLBACK_EXAM_FINDINGS, source: 'fallback' };
  }
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/exam_findings?select=*`, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });
    if (!res.ok) throw new Error(`exam_findings: ${res.status}`);
    const findings = (await res.json()) as FallbackExamFinding[];
    if (findings.length === 0) throw new Error('empty');
    return { findings, source: 'live' };
  } catch {
    return { findings: FALLBACK_EXAM_FINDINGS, source: 'fallback' };
  }
}

export type ExamTier = 'gentle' | 'steady' | 'expert';

/** Pure lookup: the tiered finding, or null when the row is missing. */
export function findingFor(
  findings: readonly FallbackExamFinding[],
  conditionId: string,
  modality: ExamModality,
  tier: ExamTier,
): string | null {
  const row = findings.find((f) => f.condition_id === conditionId && f.modality === modality);
  return row ? row[tier] : null;
}
