import type { ChoiceGrade, ConditionId } from '../clinical';

/**
 * MOCK DATA — UI PROTOTYPE ONLY.
 *
 * Everything in this module is LOCAL pretend content for the
 * `docs/UI_PROTOTYPE.md` playtest. There are no fetches, no backend
 * calls, and no real patient data here — the demo path stays fully
 * offline.
 *
 * Row shapes mirror the future Supabase contract so the backend
 * plan can swap this module for real queries without touching the
 * scene layout:
 *   MockRosterEntry  -> future `patients` row (id, name, persona,
 *                       fur_shade, status + the CHARACTER_BIBLE
 *                       roster columns facial_features,
 *                       accessories_clothing when they ship).
 *   MockThread       -> future `portal_threads` row (id, from,
 *                       subject, snippet, unread) with
 *                       `portal_messages` rows (thread_id, from_me,
 *                       body).
 *   PrototypeSeeds   -> future `visits` / session fields (visit_no,
 *                       wording_tier, difficulty) until the backend
 *                       owns them.
 *
 * LIVE vs MOCK split (parent-task law): vitals, condition, stage,
 * grades, and consequence text are NEVER mocked — the scene reads
 * them live from the ClinicalEngine. Only the roster, the portal
 * inbox, and the visit-session seeds below are mock.
 *
 * CHROME-2 MOCK (same law): the top-bar profile/difficulty chips,
 * the care-coins counter, the visit timer start, and the
 * visit-context wordings below are ALL mock display seeds. The
 * real Care Coins economy (docs/PROGRESSION.md) and the real
 * wording system ship later and will replace this module's
 * chrome-2 section without touching scene layout.
 */

export type MockGrade = ChoiceGrade;

/** Future `patients` row shape (mock seed). */
export interface MockRosterEntry {
  /** Stable mock id (future: uuid primary key). */
  id: string;
  name: string;
  persona: string;
  /** Future Supabase column: fur_shade. */
  furShade: string;
  status: string;
  /** Waiting-list line: chief complaint in lay words. */
  complaint: string;
  /** Waiting-list line: new patient / sick visit / follow-up. */
  visitKind: string;
  /** Returning-patient recognition (first greeting beat, visit #2+). */
  welcomeBack: string;
}

/** Pure: whoever is NOT in the exam room, in queue order. */
export function waitingNames(order: readonly string[], activeName: string): string[] {
  return order.filter((n) => n !== activeName);
}

/**
 * Pure: swap one step toward the front (-1) or back (+1).
 * Out-of-range moves return the order unchanged (new array).
 */
export function moveWaiting(
  order: readonly string[],
  name: string,
  dir: -1 | 1,
): string[] {
  const next = [...order];
  const i = next.indexOf(name);
  const j = i + dir;
  if (i < 0 || j < 0 || j >= next.length) return next;
  const a = next[i] as string;
  next[i] = next[j] as string;
  next[j] = a;
  return next;
}

/** Future `portal_threads` + `portal_messages` row shapes (mock seed). */
export interface MockThreadMessage {
  me: boolean;
  text: string;
}

export interface MockThread {
  /** Stable mock id (future: uuid primary key). */
  id: string;
  from: string;
  subject: string;
  snippet: string;
  unread: number;
  messages: MockThreadMessage[];
}

/**
 * Single-source prototype session seeds. The scene reads these AND
 * the live engine state; nothing is hard-coded twice.
 */
export interface PrototypeSeeds {
  patientName: string;
  conditionId: ConditionId;
  /** Mock visit counter until the backend owns visits. */
  visitNo: number;
  wordingTier: 'gentle' | 'plain' | 'clinical';
  /** 1 = early (2-3 choices), 3 = late (4-5). */
  difficulty: 1 | 2 | 3;
  /** Prototype gate only, NOT a real secret (spec documents it). */
  devCode: string;
}

export const PROTOTYPE_SEEDS: PrototypeSeeds = {
  patientName: 'Milo',
  conditionId: 'viral-respiratory',
  visitNo: 2,
  wordingTier: 'gentle',
  difficulty: 1,
  devCode: 'MABEL',
};

/**
 * Prototype card-row SELECTION (fixed for the playtest so the
 * DANGEROUS veto demos every session — spec tradeoff 5). Labels,
 * grades, and results resolve LIVE from the engine at tap time.
 */
export const CARD_ROW_IDS: readonly string[] = [
  'calm-air',
  'rescue-puffer',
  'dusty-blanket',
];

/** Waiting-room roster (Milo leads; minis show whoever is waiting). */
export const MOCK_ROSTER: readonly MockRosterEntry[] = [
  {
    id: 'mock-patient-milo',
    name: 'Milo',
    persona: 'curious kid',
    furShade: '#CDB9A8',
    status: 'VISIT 2 • here',
    complaint: 'sneezy, runny nose',
    visitKind: 'sick visit',
    welcomeBack: 'Doctor! You came back!',
  },
  {
    id: 'mock-patient-mabel',
    name: 'Mabel',
    persona: 'our first patient',
    furShade: '#A2766B',
    status: 'VISIT 4 • follow-up',
    complaint: 'wheezy breaths',
    visitKind: 'follow-up',
    welcomeBack: 'Oh good — my doctor is here!',
  },
  {
    id: 'mock-patient-june',
    name: 'June',
    persona: 'gentle first-timer',
    furShade: '#C4A484',
    status: 'waiting',
    complaint: 'first check-up',
    visitKind: 'new patient',
    welcomeBack: 'Hello! I am new here!',
  },
  {
    id: 'mock-patient-theo',
    name: 'Theo',
    persona: 'sleepy toddler',
    furShade: '#8F7364',
    status: 'napping',
    complaint: 'sleepy + warm',
    visitKind: 'sick visit',
    welcomeBack: 'Mmm… oh! Doctor!',
  },
  {
    id: 'mock-patient-priya',
    name: 'Priya',
    persona: 'team captain',
    furShade: '#C2A878',
    status: 'waiting',
    complaint: 'tired + thirsty',
    visitKind: 'sick visit',
    welcomeBack: 'Practice wiped me out!',
  },
  {
    id: 'mock-patient-ellis',
    name: 'Ellis',
    persona: 'retired sailor',
    furShade: '#8E8A80',
    status: 'waiting',
    complaint: 'headachy',
    visitKind: 'new patient',
    welcomeBack: 'Ahoy, Doctor. My head aches.',
  },
];

/**
 * CHROME-2 display tiers, gentle → expert. Keyed by the mock
 * `difficulty` seed (1 → gentle, 2 → steady, 3 → expert). These
 * names match the future wording system's planned tiers; the
 * legacy `wordingTier` seed (gentle/plain/clinical) still feeds
 * the staff monitor until the backend owns wording.
 */
export type ChromeTier = 'gentle' | 'steady' | 'expert';

export const CHROME_TIER_BY_DIFFICULTY: Record<1 | 2 | 3, ChromeTier> = {
  1: 'gentle',
  2: 'steady',
  3: 'expert',
};

export const CHROME_TIER_LABEL: Record<ChromeTier, string> = {
  gentle: 'Gentle',
  steady: 'Steady',
  expert: 'Expert',
};

/**
 * Card-row prompt wordings, one per chrome tier (MOCK — the real
 * wording system replaces this table). The object varies by round
 * type later (diagnose/ask/examine/watchful-waiting); today every
 * round is an action round.
 */
export const CHOOSE_PROMPT_WORDING: Record<ChromeTier, string> = {
  gentle: 'Choose care…',
  steady: 'Choose an action…',
  expert: 'Select intervention…',
};

/** Visit-context kinds for the HUD label (mock derivation in scene). */
export type VisitContext = 'new-patient' | 'sick-visit' | 'follow-up';

/**
 * Visit-context label wordings: 3 cached wordings per context (one
 * per chrome tier). Generic copy — no patient names, so the same
 * table serves every patient when the roster grows. MOCK: the real
 * wording system replaces this table later.
 */
export const VISIT_CONTEXT_WORDING: Record<VisitContext, Record<ChromeTier, string>> = {
  'new-patient': {
    gentle: 'A first hello',
    steady: 'New Patient',
    expert: 'New intake',
  },
  'sick-visit': {
    gentle: 'Feeling poorly',
    steady: 'Sick Visit',
    expert: 'Acute visit',
  },
  'follow-up': {
    gentle: 'Back for a check-in',
    steady: 'Follow-Up Visit',
    expert: 'Follow-up',
  },
};

/**
 * Mock care-coins stash at scene start. Ticks +1 per BEST resolve
 * (scene-owned counter). MOCK — the real `coin_ledger` accrual
 * (docs/PROGRESSION.md) replaces this later.
 */
export const MOCK_CARE_COINS_START = 12;

/** Mock top-bar profile chip label (no real profile yet). */
export const MOCK_PROFILE_LABEL = 'You';

/**
 * QUOTED-SPEECH RULE (chrome-2 display law): spoken lines by named
 * patient cast (Mabel, June, Milo) render wrapped in straight
 * double quotes; narration, player, and system (Clinic) lines
 * stay unquoted — talking vs describing unmistakable. Applied at
 * RENDER time (conversation panel + portal bubbles), never baked
 * into row data, so future real Supabase rows inherit the rule.
 * (No NPC doctors yet — Dr. Nora is parked until the practice
 * upgrade system ships.)
 */
export function quoteIfSpoken(from: string, me: boolean, text: string): string {
  if (me) return text;
  const key = from.trim().toUpperCase();
  if (key === 'MABEL' || key === 'JUNE' || key === 'MILO') {
    return `"${text}"`;
  }
  return text;
}

/** Portal inbox threads, top to bottom (all pretend, stays on device). */
export const MOCK_THREADS: readonly MockThread[] = [
  {
    id: 'mock-thread-visit-notes',
    from: 'Clinic',
    subject: "Mabel's visit notes",
    snippet: 'Slow breaths, puffer close…',
    unread: 2,
    messages: [
      { me: false, text: 'Mabel did so well today!' },
      { me: false, text: 'Keep the puffer with its spacer close — calm air and slow breaths.' },
      { me: true, text: 'We will! Thank you!' },
    ],
  },
  {
    id: 'mock-thread-reminder',
    from: 'Clinic',
    subject: 'Appointment reminder',
    snippet: 'See you Thursday at 10…',
    unread: 0,
    messages: [
      { me: false, text: "Friendly reminder: Mabel's check-in is Thursday at 10 AM." },
      { me: true, text: "We'll be there!" },
    ],
  },
  {
    id: 'mock-thread-sip-tips',
    from: 'Clinic',
    subject: 'Breathe-easy plan',
    snippet: 'Three cozy tricks for…',
    unread: 1,
    messages: [
      { me: false, text: 'Three cozy tricks for wheezy days: calm air, puffer with spacer, and patience.' },
    ],
  },
];
