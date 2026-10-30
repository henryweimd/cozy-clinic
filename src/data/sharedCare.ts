import { FALLBACK_CHEERS, FALLBACK_HANDOFFS } from './fallbackPack';
import type { FallbackHandoff } from './fallbackPack';

/**
 * M4 shared care: handoff notes + preset encouragements between
 * player-doctors. No free chat: notes reference preset ids and
 * the encounter summary is auto-written by the game. Typed text
 * exists ONLY for profile identity (doctor + practice names);
 * everything clinical stays preset-only. Supabase first,
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
  team_tag: string | null;
  preset_id: string;
  encounter_summary: string;
  outcome: 'recovered' | 'struggling';
  score: number;
  created_at: string;
}

/** Demo default until the player names their doctor. */
export const DEMO_HANDLE = 'Demo';

/**
 * Clean a typed doctor name: trims, collapses spaces, strips a
 * leading Dr/Doctor (the byline adds it), allows letters,
 * digits, space, dot, hyphen, apostrophe, 2–16 chars with a
 * letter. Null when unusable — the editor keeps prompting.
 */
export function cleanHandle(raw: string): string | null {
  const s = raw.trim().replace(/\s+/g, ' ').replace(/^(doctor|dr\.?)\s+/i, '');
  if (!/^[A-Za-z0-9 .'-]{2,16}$/.test(s)) return null;
  if (!/[A-Za-z]/.test(s)) return null;
  return s;
}

/** Clean a typed practice name: same spirit, 2–20 chars + &. */
export function cleanTeam(raw: string): string | null {
  const s = raw.trim().replace(/\s+/g, ' ');
  if (!/^[A-Za-z0-9 .&'-]{2,20}$/.test(s)) return null;
  if (!/[A-Za-z]/.test(s)) return null;
  return s;
}

/** Pure: "Doctor Wren · Moon" (tag omitted when absent). */
export function doctorByline(fromHandle: string, teamTag: string | null): string {
  return teamTag ? `Doctor ${fromHandle} · ${teamTag}` : `Doctor ${fromHandle}`;
}

/**
 * Pure: teammates-first inbox order — notes from the player's
 * own practice head the list (cheers ride along on the same
 * notes), newest-first within each group.
 */
export function teammatesFirst(
  notes: readonly HandoffNote[],
  teamTag: string,
): HandoffNote[] {
  return [...notes].sort((a, b) => {
    const am = a.team_tag === teamTag ? 0 : 1;
    const bm = b.team_tag === teamTag ? 0 : 1;
    if (am !== bm) return am - bm;
    return a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : 0;
  });
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
    team_tag: row.team_tag ?? null,
    preset_id: row.preset_id,
    encounter_summary: row.encounter_summary,
    outcome: row.outcome === 'recovered' ? 'recovered' : 'struggling',
    score: row.score,
    created_at: row.created_at,
  };
}

export interface CheerInbox {
  cheers: Cheer[];
  source: 'live' | 'fallback';
}

/** Cheers addressed to one handle (live, else fallback samples). */
export async function loadCheers(toHandle: string): Promise<CheerInbox> {
  const fallback = (): CheerInbox => ({
    cheers: FALLBACK_CHEERS.filter((c) => c.to_handle === toHandle).map((c) => ({
      id: c.id,
      from_handle: c.from_handle,
      to_handle: c.to_handle,
      preset_id: c.preset_id,
      created_at: c.created_at,
    })),
    source: 'fallback',
  });
  if (SUPABASE_URL === undefined || SUPABASE_ANON_KEY === undefined) {
    return fallback();
  }
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/encouragements?select=*&to_handle=eq.${encodeURIComponent(toHandle)}&order=created_at.desc&limit=10`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      },
    );
    if (!res.ok) throw new Error(`encouragements: ${res.status}`);
    const rows = (await res.json()) as Cheer[];
    return { cheers: rows, source: 'live' };
  } catch {
    return fallback();
  }
}

/**
 * Sends one cheer (throws offline/unauthorized — the caller
 * queues it and retries later).
 */
export async function sendCheer(draft: CheerDraft): Promise<void> {
  if (SUPABASE_URL === undefined || SUPABASE_ANON_KEY === undefined) {
    throw new Error('offline');
  }
  const res = await fetch(`${SUPABASE_URL}/rest/v1/encouragements`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(draft),
  });
  if (!res.ok) throw new Error(`encouragements: ${res.status}`);
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
  team_tag: string | null;
  preset_id: string;
  encounter_summary: string;
  outcome: 'recovered' | 'struggling';
  score: number;
}

/** Preset team tags (tap-only teams until tags/handles ship fully). */
export const TEAM_TAGS: readonly string[] = ['Sun', 'Moon', 'Star'];

export interface Cheer {
  id: string;
  from_handle: string;
  to_handle: string;
  preset_id: string;
  created_at: string;
}

export interface CheerDraft {
  from_handle: string;
  to_handle: string;
  preset_id: string;
}

/** Pure: next cheer in rotation + the following cursor (unit-tested). */
export function nextCheer(cursor: number): { cheer: string; next: number } {
  const cheer = CHEER_PRESETS[cursor % CHEER_PRESETS.length] ?? 'Great catch!';
  return { cheer, next: cursor + 1 };
}

/** Pure: outbox queue ops, generic over draft kinds (unit-tested). */
export function pushOutbox<T>(outbox: readonly T[], draft: T): T[] {
  return [...outbox, draft];
}

/** Pure: drop the first n flushed drafts (unit-tested). */
export function shiftOutbox<T>(outbox: readonly T[], n: number): T[] {
  return outbox.slice(Math.max(0, n));
}

/** Pure: auto-written encounter summary (unit-tested). */
export function handoffSummary(visitNo: number, score: number, ended: boolean): string {
  return ended
    ? `Visit #${visitNo} · ${score} of 3 right`
    : `Visit #${visitNo} · ${score} of 3 so far`;
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
