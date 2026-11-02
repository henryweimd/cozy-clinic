/**
 * Journey map: the saga progress path (pure, unit-tested).
 * Eight nodes unlock linearly; each names one way of
 * caring (visits, consults, returners, flawless care,
 * glad hearts, filed topics). The last node is an honest
 * locked teaser for shared care (P6). The scene owns the
 * store and fans the completion fanfare.
 */

export interface SagaProgress {
  visits: number;
  flawless: number;
  followups: number;
  consultsUsed: number;
  covers: number;
}

export const EMPTY_SAGA: SagaProgress = {
  visits: 0,
  flawless: 0,
  followups: 0,
  consultsUsed: 0,
  covers: 0,
};

export interface SagaInput {
  saga: SagaProgress;
  /** Any patient at ease 8+ (a glad heart). */
  gladAny: boolean;
  /** Chart topics filed. */
  filed: number;
  /** Career recovered visits. */
  recovered: number;
}

export interface SagaNode {
  id: string;
  label: string;
  blurb: string;
  /** Plain requirement words (shown on the map). */
  need: string;
  check: (input: SagaInput) => boolean;
}

export const SAGA_NODES: readonly SagaNode[] = [
  {
    id: 'first-visit',
    label: 'First Steps',
    blurb: 'Every doctor starts with one hello.',
    need: 'See 1 patient',
    check: (p) => p.saga.visits >= 1,
  },
  {
    id: 'helping-hand',
    label: 'Helping Hand',
    blurb: 'Senior doctors ask for help too.',
    need: 'Call 1 consult',
    check: (p) => p.saga.consultsUsed >= 1,
  },
  {
    id: 'familiar-face',
    label: 'Familiar Face',
    blurb: 'They came back — and they remember you.',
    need: 'Welcome 1 returner',
    check: (p) => p.saga.followups >= 1,
  },
  {
    id: 'flawless',
    label: 'Flawless Care',
    blurb: 'Four rounds, all heart.',
    need: 'One flawless visit',
    check: (p) => p.saga.flawless >= 1,
  },
  {
    id: 'regular',
    label: 'Clinic Regular',
    blurb: 'The waiting room knows your name.',
    need: 'Care for 5 visits',
    check: (p) => p.saga.visits >= 5,
  },
  {
    id: 'glad-heart',
    label: 'Glad Hearts',
    blurb: 'Gentle care shows on faces.',
    need: 'Help someone feel glad',
    check: (p) => p.gladAny,
  },
  {
    id: 'scholar',
    label: 'Chart Scholar',
    blurb: 'Reading makes the next visit kinder.',
    need: 'File 3 topics',
    check: (p) => p.filed >= 3,
  },
  {
    id: 'shared-care',
    label: 'Shared Care',
    blurb: 'Cover a teammate\u2019s patient, loop closed.',
    need: 'Cover 1 visit',
    check: (p) => p.saga.covers >= 1,
  },
];

export type SagaNodeState = 'done' | 'current' | 'locked';

/** Pure: linear unlock — done, one current, the rest locked. */
export function nodeStates(input: SagaInput): { node: SagaNode; state: SagaNodeState }[] {
  let opened = false;
  return SAGA_NODES.map((node) => {
    if (node.check(input)) return { node, state: 'done' as const };
    if (!opened) {
      opened = true;
      return { node, state: 'current' as const };
    }
    return { node, state: 'locked' as const };
  });
}

/** Pure: ids finished between two snapshots (the fanfare list). */
export function newlyDone(
  before: readonly { node: SagaNode; state: SagaNodeState }[],
  after: readonly { node: SagaNode; state: SagaNodeState }[],
): string[] {
  const was = new Set(before.filter((s) => s.state === 'done').map((s) => s.node.id));
  return after
    .filter((s) => s.state === 'done' && !was.has(s.node.id))
    .map((s) => s.node.id);
}

export type SagaEvent = 'visit' | 'flawless' | 'followup' | 'consult' | 'cover';

/** Pure: count one event (immutable update). */
export function bumpSaga(prev: SagaProgress, event: SagaEvent): SagaProgress {
  switch (event) {
    case 'visit':
      return { ...prev, visits: prev.visits + 1 };
    case 'flawless':
      return { ...prev, flawless: prev.flawless + 1 };
    case 'followup':
      return { ...prev, followups: prev.followups + 1 };
    case 'consult':
      return { ...prev, consultsUsed: prev.consultsUsed + 1 };
    case 'cover':
      return { ...prev, covers: prev.covers + 1 };
  }
}

/** Shape guard for the persisted store (unit-tested). */
export function isSagaProgress(v: unknown): v is SagaProgress {
  if (typeof v !== 'object' || v === null || Array.isArray(v)) return false;
  const { visits, flawless, followups, consultsUsed, covers } = v as Record<string, unknown>;
  // Covers arrived in P6: older saves without the key load as 0.
  const rest = covers === undefined ? 0 : covers;
  return [visits, flawless, followups, consultsUsed, rest].every(
    (n) => typeof n === 'number' && Number.isInteger(n) && n >= 0,
  );
}
