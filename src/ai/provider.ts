import type { ChoiceGrade, ConditionId } from '../clinical';

/**
 * Request the game sends toward the runtime AI path. Structured game state
 * ONLY — never free text, never a key. The Edge Function builds the model
 * prompt server-side from these validated fields.
 */
export interface EncounterRequest {
  patientName: string;
  conditionId: ConditionId;
  stageIndex: number;
  vitals: { energy: number; comfort: number; breathing: number };
  visitNumber: number;
  previousChoiceLabels: string[];
}

/** One choice card offered to the player. */
export interface EncounterChoice {
  id: string;
  label: string;
  grade: ChoiceGrade;
}

/** What the encounter provider returns for one decision point. */
export interface EncounterResponse {
  intro: string;
  choices: EncounterChoice[];
  provider: 'mock' | 'live';
}

/** Minimal shape every provider response must satisfy before use. */
export function validateEncounterResponse(raw: unknown): raw is EncounterResponse {
  if (typeof raw !== 'object' || raw === null) return false;
  const r = raw as Record<string, unknown>;
  if (typeof r.intro !== 'string' || r.intro.length === 0) return false;
  if (!Array.isArray(r.choices)) return false;
  if (r.choices.length < 2 || r.choices.length > 5) return false;
  const grades: ChoiceGrade[] = ['BEST', 'NOT_GREAT', 'WRONG', 'DANGEROUS'];
  return (r.choices as unknown[]).every((c) => {
    if (typeof c !== 'object' || c === null) return false;
    const o = c as Record<string, unknown>;
    return typeof o.id === 'string' && typeof o.label === 'string' && grades.includes(o.grade as ChoiceGrade);
  });
}

export interface AIProvider {
  readonly name: 'mock' | 'live';
  getEncounter(req: EncounterRequest): Promise<EncounterResponse>;
}
