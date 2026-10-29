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
  patientName: 'Mabel',
  conditionId: 'asthma',
  visitNo: 4,
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

/** Waiting-room roster, top to bottom (spec geometry order). */
export const MOCK_ROSTER: readonly MockRosterEntry[] = [
  {
    id: 'mock-patient-mabel',
    name: 'Mabel',
    persona: 'our first patient',
    furShade: '#A2766B',
    status: 'VISIT 4 • here',
  },
  {
    id: 'mock-patient-june',
    name: 'June',
    persona: 'gentle first-timer',
    furShade: '#C4A484',
    status: 'waiting',
  },
  {
    id: 'mock-patient-milo',
    name: 'Milo',
    persona: 'curious kid',
    furShade: '#CDB9A8',
    status: 'checked in',
  },
  {
    id: 'mock-patient-theo',
    name: 'Theo',
    persona: 'sleepy toddler',
    furShade: '#8F7364',
    status: 'napping',
  },
];

/** Portal inbox threads, top to bottom (all pretend, stays on device). */
export const MOCK_THREADS: readonly MockThread[] = [
  {
    id: 'mock-thread-visit-notes',
    from: 'Dr. Nora',
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
    from: 'Dr. Nora',
    subject: 'Breathe-easy plan',
    snippet: 'Three cozy tricks for…',
    unread: 1,
    messages: [
      { me: false, text: 'Three cozy tricks for wheezy days: calm air, puffer with spacer, and patience.' },
    ],
  },
];
