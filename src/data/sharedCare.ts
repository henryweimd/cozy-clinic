import { FALLBACK_CHEERS, FALLBACK_HANDOFFS } from './fallbackPack';
import type { FallbackHandoff } from './fallbackPack';
import { getJson, postJson } from './net';
import type { NetOpts } from './net';

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

export type CareTier = 'gentle' | 'steady' | 'clinical' | 'expert';

/** One handoff preset, tier-worded (unit-tested). */
export interface HandoffPreset {
  id: string;
  gentle: string;
  steady: string;
  clinical: string;
  expert: string;
}

export const HANDOFF_PRESETS: readonly HandoffPreset[] = [
  { id: 'keep-fluids', gentle: 'Keep up the fluids', steady: 'Keep pushing fluids', clinical: 'Encourage oral fluids', expert: 'Maintain PO hydration' },
  { id: 'recheck-breathing', gentle: 'Listen to the breathing again tomorrow', steady: 'Recheck breathing tomorrow', clinical: 'Recheck respirations tomorrow', expert: 'Reassess respiratory status daily' },
  { id: 'watch-fever', gentle: 'Watch the warm forehead', steady: 'Watch the fever', clinical: 'Monitor temperature', expert: 'Monitor the temperature trend' },
  { id: 'rest-up', gentle: 'Lots of rest and cuddles', steady: 'Rest until the recheck', clinical: 'Rest, activity as tolerated', expert: 'Rest emphasized; activity as tolerated' },
  { id: 'finish-meds', gentle: 'Finish all the yucky medicine', steady: 'Finish the full course', clinical: 'Finish all prescribed doses', expert: 'Complete the prescribed course' },
  { id: 'all-clear', gentle: 'All clear — hooray!', steady: 'All clear — great teamwork', clinical: 'Resolved — good teamwork', expert: 'Resolved — closing the loop' },
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

/**
 * Pure: the care-notes sheet is incoming mail — your own
 * notes are already known, so covering yourself is never
 * offered. Filters by author handle only.
 */
export function incomingOnly(
  notes: readonly HandoffNote[],
  selfHandle: string,
): HandoffNote[] {
  return notes.filter((n) => n.from_handle !== selfHandle);
}

/** One note rendered as a real SBAR handoff (unit-tested). */
export interface SbarLines {
  situation: string;
  background: string;
  assessment: string;
  recommendation: string;
}

/**
 * Pure: SBAR lines from a stored note — Situation (who +
 * which visit), Background (how they've been doing),
 * Assessment (recovering or needs watching),
 * Recommendation (the preset, tier-worded). The game
 * authors every line; players only pick the preset.
 */
export function sbarLines(
  note: HandoffNote,
  patientName: string,
  tier: CareTier,
): SbarLines {
  const clipped = tier === 'clinical' || tier === 'expert';
  const better = note.outcome === 'recovered';
  return {
    situation: `${patientName} · ${note.encounter_summary}`,
    background: better
      ? clipped
        ? `Improving — ${note.score}/4 last visit`
        : `Getting better — ${note.score} of 4 right last time`
      : clipped
        ? `Not improving — ${note.score}/4 last visit`
        : `Still poorly — ${note.score} of 4 right last time`,
    assessment: better
      ? clipped
        ? 'Recovering'
        : 'Recovering well'
      : clipped
        ? 'Watch closely'
        : 'Needs watching',
    recommendation: handoffText(note.preset_id, tier),
  };
}

/**
 * The AI colleague's handle — outside the player presets so
 * Alder's overnight notes never collide with your own.
 */
export const AI_COLLEAGUE_HANDLE = 'Alder';

/**
 * Pure: Alder's overnight recommendation. Rotates sensible
 * picks by outcome; every third note is the lovable miss —
 * always in the SAFE direction (extra caution, never false
 * reassurance): rest for the struggling, fluids for the
 * recovering. Colleagues miss things — you still check.
 */
export function alderPresetFor(
  outcome: 'recovered' | 'struggling',
  noteIndex: number,
): string {
  const slot = ((noteIndex % 3) + 3) % 3;
  if (outcome === 'recovered') {
    return ['all-clear', 'finish-meds', 'keep-fluids'][slot] ?? 'all-clear';
  }
  return ['recheck-breathing', 'watch-fever', 'rest-up'][slot] ?? 'watch-fever';
}

/** Shape guard for persisted notes (Alder's live locally). */
export function isHandoffNote(v: unknown): v is HandoffNote {
  if (typeof v !== 'object' || v === null || Array.isArray(v)) return false;
  const n = v as Record<string, unknown>;
  return (
    typeof n.id === 'string' &&
    typeof n.patient_id === 'string' &&
    typeof n.from_handle === 'string' &&
    (typeof n.team_tag === 'string' || n.team_tag === null) &&
    typeof n.preset_id === 'string' &&
    typeof n.encounter_summary === 'string' &&
    (n.outcome === 'recovered' || n.outcome === 'struggling') &&
    typeof n.score === 'number' &&
    typeof n.created_at === 'string'
  );
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
export async function loadCheers(
  toHandle: string,
  opts: NetOpts = {},
): Promise<CheerInbox> {
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
  const url = opts.url ?? SUPABASE_URL;
  const key = opts.key ?? SUPABASE_ANON_KEY;
  if (url === undefined || key === undefined) {
    return fallback();
  }
  try {
    const rows = await getJson<Cheer[]>(
      `/rest/v1/encouragements?select=*&to_handle=eq.${encodeURIComponent(toHandle)}&order=created_at.desc&limit=10`,
      key,
      url,
      opts.timeoutMs ?? 10000,
    );
    return { cheers: rows, source: 'live' };
  } catch {
    return fallback();
  }
}

/**
 * Sends one cheer (throws offline/unauthorized — the caller
 * queues it and retries later).
 */
export async function sendCheer(
  draft: CheerDraft,
  opts: NetOpts = {},
): Promise<void> {
  const url = opts.url ?? SUPABASE_URL;
  const key = opts.key ?? SUPABASE_ANON_KEY;
  if (url === undefined || key === undefined) {
    throw new Error('offline');
  }
  await postJson<unknown>(
    '/rest/v1/encouragements',
    draft,
    key,
    url,
    opts.timeoutMs ?? 10000,
  );
}

export interface HandoffInbox {
  notes: HandoffNote[];
  source: 'live' | 'fallback';
}

/** Newest-first handoffs (live, else the fallback pack's samples). */
export async function loadHandoffs(
  opts: NetOpts = {},
): Promise<HandoffInbox> {
  const fallback = (): HandoffInbox => ({
    notes: FALLBACK_HANDOFFS.map(toNote),
    source: 'fallback',
  });
  const url = opts.url ?? SUPABASE_URL;
  const key = opts.key ?? SUPABASE_ANON_KEY;
  if (url === undefined || key === undefined) {
    return fallback();
  }
  try {
    const rows = await getJson<FallbackHandoff[]>(
      '/rest/v1/handoffs?select=*&order=created_at.desc&limit=50',
      key,
      url,
      opts.timeoutMs ?? 10000,
    );
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

/**
 * Pure: the outcome preset for a finished cover (unit-tested).
 * Recovery closes the loop; struggling echoes the colleague's
 * ask with the new score attached.
 */
export function coverOutcomePreset(
  outcome: 'recovered' | 'struggling',
  incomingPresetId: string,
): string {
  return outcome === 'recovered' ? 'all-clear' : incomingPresetId;
}

/** Pure: auto-written encounter summary (unit-tested). */
export function handoffSummary(visitNo: number, score: number, ended: boolean): string {
  return ended
    ? `Visit #${visitNo} · ${score} of 4 right`
    : `Visit #${visitNo} · ${score} of 4 so far`;
}

/**
 * Shares one handoff (throws offline/unauthorized — the caller
 * queues it in the local outbox and retries later).
 */
export async function sendHandoff(
  draft: HandoffDraft,
  opts: NetOpts = {},
): Promise<void> {
  const url = opts.url ?? SUPABASE_URL;
  const key = opts.key ?? SUPABASE_ANON_KEY;
  if (url === undefined || key === undefined) {
    throw new Error('offline');
  }
  await postJson<unknown>(
    '/rest/v1/handoffs',
    draft,
    key,
    url,
    opts.timeoutMs ?? 10000,
  );
}

/** One read-back receipt: who closed the loop on which note. */
export interface ReadReceipt {
  id: string;
  note_id: string;
  reader_handle: string;
  created_at: string;
}

export interface ReadInbox {
  reads: ReadReceipt[];
  source: 'live' | 'fallback';
}

/**
 * Newest-first read-back receipts (live; offline there are
 * none — read-back is a live closed loop, never queued).
 */
export async function loadReads(opts: NetOpts = {}): Promise<ReadInbox> {
  const url = opts.url ?? SUPABASE_URL;
  const key = opts.key ?? SUPABASE_ANON_KEY;
  if (url === undefined || key === undefined) {
    return { reads: [], source: 'fallback' };
  }
  try {
    const rows = await getJson<ReadReceipt[]>(
      '/rest/v1/handoff_reads?select=*&order=created_at.desc&limit=100',
      key,
      url,
      opts.timeoutMs ?? 10000,
    );
    return { reads: rows, source: 'live' };
  } catch {
    return { reads: [], source: 'fallback' };
  }
}

export interface ReadDraft {
  note_id: string;
  reader_handle: string;
}

/** Shares one read-back (throws offline — the caller toasts). */
export async function sendRead(
  draft: ReadDraft,
  opts: NetOpts = {},
): Promise<void> {
  const url = opts.url ?? SUPABASE_URL;
  const key = opts.key ?? SUPABASE_ANON_KEY;
  if (url === undefined || key === undefined) {
    throw new Error('offline');
  }
  await postJson<unknown>(
    '/rest/v1/handoff_reads',
    draft,
    key,
    url,
    opts.timeoutMs ?? 10000,
  );
}
