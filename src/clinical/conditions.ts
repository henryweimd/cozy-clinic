import type { ConditionDef } from './types';

/**
 * The four launch conditions (brief Section 6).
 *
 * Tone law: cozy bounds always — setbacks are droopy, never grim.
 * Medicine stays real (stages, what helps vs. harms); only the
 * darkness of the stakes is softened (brief Section 2C).
 */
export const CONDITIONS: Record<string, ConditionDef> = {
  dehydration: {
    id: 'dehydration',
    name: 'Dehydration',
    plainWords: 'Not enough water in the body — Maple perks up with fluids.',
    stages: [
      { id: 'sipped', label: 'Sipped', blurb: 'Feeling good and bouncy.' },
      { id: 'thirsty', label: 'Thirsty', blurb: 'A bit dry and slow.' },
      { id: 'dried-out', label: 'Dried out', blurb: 'Droopy and very thirsty.' },
      { id: 'parched', label: 'Parched', blurb: 'All drooped out, needs care.' },
    ],
    presentsAt: 2,
    actions: [
      {
        id: 'offer-water',
        label: 'Offer cool water',
        gradeByStage: ['NOT_GREAT', 'BEST', 'BEST', 'BEST'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: { energy: 1, comfort: 1 },
        hootLine: 'Water first — small sips wake the body up.',
      },
      {
        id: 'rest-shade',
        label: 'Rest in the shade',
        gradeByStage: ['NOT_GREAT', 'NOT_GREAT', 'BEST', 'NOT_GREAT'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: { energy: 1 },
        hootLine: 'Rest helps, but fluids do the real fixing.',
      },
      {
        id: 'fizzy-soda',
        label: 'Give fizzy soda',
        gradeByStage: ['WRONG', 'WRONG', 'WRONG', 'WRONG'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: { comfort: -1 },
        hootLine: 'Fizzy drinks do not hydrate — water does.',
      },
      {
        id: 'salt-pouch',
        label: 'Feed a whole salt pouch',
        gradeByStage: ['DANGEROUS', 'DANGEROUS', 'DANGEROUS', 'DANGEROUS'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: {},
        hootLine: 'Too much salt at once would make things worse — stepped in!',
      },
    ],
  },

  'viral-respiratory': {
    id: 'viral-respiratory',
    name: 'Sniffly Cold',
    plainWords: 'A common cold — rest and fluids while the body fights it off.',
    stages: [
      { id: 'breezy', label: 'Breezy', blurb: 'Nose clear, tail wagging.' },
      { id: 'sniffly', label: 'Sniffly', blurb: 'Sniffles and sneezes.' },
      { id: 'feverish', label: 'Feverish', blurb: 'Warm forehead, low pep.' },
      { id: 'wiped-out', label: 'Wiped out', blurb: 'Needs blankets and rest.' },
    ],
    presentsAt: 1,
    actions: [
      {
        id: 'rest-fluids',
        label: 'Warm rest + fluids',
        gradeByStage: ['NOT_GREAT', 'BEST', 'BEST', 'BEST'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: { energy: 1, comfort: 1 },
        hootLine: 'Rest and fluids let the body do its healing work.',
      },
      {
        id: 'warm-soup',
        label: 'Warm soup break',
        gradeByStage: ['NOT_GREAT', 'NOT_GREAT', 'BEST', 'NOT_GREAT'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: { comfort: 1 },
        hootLine: 'Soup soothes — comfort is care too.',
      },
      {
        id: 'share-cup',
        label: 'Share a cup with a friend',
        gradeByStage: ['WRONG', 'WRONG', 'WRONG', 'WRONG'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: { comfort: -1 },
        hootLine: 'Sharing cups shares colds — friends keep their own cups.',
      },
      {
        id: 'ice-bath',
        label: 'Plunge into an ice bath',
        gradeByStage: ['DANGEROUS', 'DANGEROUS', 'DANGEROUS', 'DANGEROUS'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: {},
        hootLine: 'An ice plunge would shock a feverish body — stepped in!',
      },
    ],
  },

  asthma: {
    id: 'asthma',
    name: 'Asthma',
    plainWords: 'Tight airways — calm air and the right puffer open them up.',
    stages: [
      { id: 'clear', label: 'Clear', blurb: 'Breathing easy.' },
      { id: 'tight', label: 'Tight', blurb: 'Chest feels a bit tight.' },
      { id: 'wheezy', label: 'Wheezy', blurb: 'Whistly breaths, worried eyes.' },
      { id: 'struggling', label: 'Struggling', blurb: 'Hard to breathe, needs help now.' },
    ],
    presentsAt: 2,
    actions: [
      {
        id: 'calm-air',
        label: 'Sit upright in calm air',
        gradeByStage: ['NOT_GREAT', 'BEST', 'BEST', 'NOT_GREAT'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: { breathing: 1, comfort: 1 },
        hootLine: 'Upright and calm gives airways room to relax.',
      },
      {
        id: 'rescue-puffer',
        label: 'Rescue puffer with spacer',
        gradeByStage: ['NOT_GREAT', 'BEST', 'BEST', 'BEST'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: { breathing: 2 },
        hootLine: 'The puffer opens tight airways — with a spacer, every puff counts.',
      },
      {
        id: 'flower-sniff',
        label: 'Bury nose in dusty flowers',
        gradeByStage: ['WRONG', 'WRONG', 'WRONG', 'WRONG'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: { breathing: -1 },
        hootLine: 'Dust and pollen squeeze airways tighter.',
      },
      {
        id: 'dusty-blanket',
        label: 'Shake out a dusty blanket indoors',
        gradeByStage: ['DANGEROUS', 'DANGEROUS', 'DANGEROUS', 'DANGEROUS'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: {},
        hootLine: 'A dust cloud could slam airways shut — stepped in!',
      },
    ],
  },

  hypertension: {
    id: 'hypertension',
    name: 'High Blood Pressure',
    plainWords: 'Pressure running high — steady habits bring it down over visits.',
    stages: [
      { id: 'steady', label: 'Steady', blurb: 'Calm and even.' },
      { id: 'creeping', label: 'Creeping up', blurb: 'A little tense lately.' },
      { id: 'high', label: 'Running high', blurb: 'Needs a steadier routine.' },
      { id: 'very-high', label: 'Very high', blurb: 'Needs care and a plan.' },
    ],
    presentsAt: 2,
    actions: [
      {
        id: 'daily-walk',
        label: 'Daily walks, less salt',
        gradeByStage: ['BEST', 'BEST', 'BEST', 'NOT_GREAT'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: { energy: 1 },
        hootLine: 'Small steady habits move big numbers.',
      },
      {
        id: 'prescribed-meds',
        label: 'Take prescribed medicine',
        gradeByStage: ['NOT_GREAT', 'NOT_GREAT', 'BEST', 'BEST'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: { comfort: 1 },
        hootLine: 'The daily dose keeps pressure on its leash.',
      },
      {
        id: 'skip-meds',
        label: 'Skip meds — feeling fine!',
        gradeByStage: ['NOT_GREAT', 'WRONG', 'WRONG', 'WRONG'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: { comfort: -1 },
        hootLine: 'Feeling fine is the medicine working — keep taking it.',
      },
      {
        id: 'double-dose',
        label: 'Double the dose to fix it faster',
        gradeByStage: ['DANGEROUS', 'DANGEROUS', 'DANGEROUS', 'DANGEROUS'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: {},
        hootLine: 'Extra doses can drop pressure too far — stepped in!',
      },
    ],
  },
};
