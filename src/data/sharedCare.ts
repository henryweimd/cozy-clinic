import { FALLBACK_HANDOFFS } from './fallbackPack';
import type { FallbackHandoff } from './fallbackPack';

/**
 * M4 shared care: handoff notes + preset encouragements between
 * player-doctors. No free chat, no typed text anywhere: doctors
 * pick preset handles, notes reference preset ids, and the
 * encounter summary is auto-written by the game. Supabase first,
 * fallback pack offline (same law as the cast layer).
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as
  | string
  | undefined;

/** Preset doctor handles (tap-only identity until login ships). */
export const DOCTOR_HANDLES: readonly string[] = [
  'Fox',
  'Owl',
  'Fern',
  'Reed',
  'Wren',
  'Moss',
];

export type CareTier = 'gentle' | 'steady' | 'expert';

/** One handoff preset, tier-worded (unit-tested). */
export interface HandoffPreset {
  id: string;
  gentle: string;
  steady: string;
  expert: string;
}

export const HANDOFF_PRESETS: readonly HandoffPreset[] = [
  { id: 'keep-fluids', gentle: 'Keep up the fluids', steady: 'Keep pushing fluids', expert: 'Maintain PO hydration' },
  { id: 'recheck-breathing', gentle: 'Listen to the breathing again tomorrow', steady: 'Recheck breathing tomorrow', expert: 'Reassess respiratory status daily' },
  { id: 'watch-fever', gentle: 'Watch the warm forehead', steady: 'Watch the fever', expert: 'Monitor the temperature trend' },
  { id: 'rest-up', gentle: 'Lots of rest and cuddles', steady: 'Rest until the recheck', expert: 'Rest emphasized; activity as tolerated' },
  { id: 'finish-meds', gentle: 'Finish all the yucky medicine', steady: 'Finish the full course', expert: 'Complete the prescribed course' },
  { id: 'all-clear', gentle: 'All clear — hooray!', steady: 'All clear — great teamwork', expert: 'Resolved — closing the loop' },
];

/** Preset encouragements (short enough to read at every tier). */
export const CHEER_PRESETS: readonly string[] = [
  'Great catch!',
  'Nice save!',
  'Kind care!',
  'Sharp eyes!',
];

export interface HandoffNote {
  id: string;
  patient_id: string;
  from_handle: string;
  preset_id: string;
  encounter_summary: string;
  outcome: 'recovered' | 'struggling';
  score: number;
  created_at: string;
}

/** Pure: tier wording for a preset (kind fallback for unknown ids). */
export function handoffText(presetId: string, tier: CareTier): string {
  return (
    HANDOFF_PRESETS.find((p) => p.id === presetId)?.[tier] ??
    'A note from your colleague'
  );
}

/** Pure: newest note for one patient (null when nobody wrote). */
export function latestHandoff(
  notes: readonly HandoffNote[],
  patientId: string,
): HandoffNote | null {
  const mine = notes.filter((n) => n.patient_id === patientId);
  mine.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  return mine[0] ?? null;
}

function toNote(row: FallbackHandoff): HandoffNote {
  return {
    id: row.id,
    patient_id: row.patient_id,
    from_handle: row.from_handle,
    preset_id: row.preset_id,
    encounter_summary: row.encounter_summary,
    outcome: row.outcome === 'recovered' ? 'recovered' : 'struggling',
    score: row.score,
    created_at: row.created_at,
  };
}

export interface HandoffInbox {
  notes: HandoffNote[];
  source: 'live' | 'fallback';
}

/** Newest-first handoffs (live, else the fallback pack's samples). */
export async function loadHandoffs(): Promise<HandoffInbox> {
  const fallback = (): HandoffInbox => ({
    notes: FALLBACK_HANDOFFS.map(toNote),
    source: 'fallback',
  });
  if (SUPABASE_URL === undefined || SUPABASE_ANON_KEY === undefined) {
    return fallback();
  }
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/handoffs?select=*&order=created_at.desc&limit=50`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      },
    );
    if (!res.ok) throw new Error(`handoffs: ${res.status}`);
    const rows = (await res.json()) as FallbackHandoff[];
    return { notes: rows.map(toNote), source: 'live' };
  } catch {
    return fallback();
  }
}

export interface HandoffDraft {
  patient_id: string;
  from_handle: string;
  preset_id: string;
  encounter_summary: string;
  outcome: 'recovered' | 'struggling';
  score: number;
}

/**
 * Shares one handoff (throws offline/unauthorized — the caller
 * queues it in the local outbox and retries later).
 */
export async function sendHandoff(draft: HandoffDraft): Promise<void> {
  if (SUPABASE_URL === undefined || SUPABASE_ANON_KEY === undefined) {
    throw new Error('offline');
  }
  const res = await fetch(`${SUPABASE_URL}/rest/v1/handoffs`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(draft),
  });
  if (!res.ok) throw new Error(`handoffs: ${res.status}`);
}
