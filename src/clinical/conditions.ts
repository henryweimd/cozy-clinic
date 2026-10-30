import type { ConditionDef, ConditionId } from './types';

/** Exam-round finding when the pick isn't the revealing one. */
export const EXAM_OTHER_FINDING = 'That exam finds nothing new.';

/** Condition display names per tier (diagnose-round options). */
export const CONDITION_TIER_NAMES: Record<ConditionId, { gentle: string; steady: string; expert: string }> = {
  dehydration: { gentle: 'Dried Out', steady: 'Dehydration', expert: 'Dehydration' },
  'viral-respiratory': { gentle: 'Sniffly Cold', steady: 'Common Cold', expert: 'Viral URI' },
  asthma: { gentle: 'Asthma', steady: 'Asthma', expert: 'Asthma Exacerbation' },
  hypertension: { gentle: 'High Blood Pressure', steady: 'High Blood Pressure', expert: 'Hypertension' },
};

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
    plainWords: 'Not enough water in the body. Everything feels dry and slow.',
    examOptions: [
      { id: 'lung-sounds', label: 'Lung sounds' },
      { id: 'skin-spring', label: 'Skin spring-back' },
      { id: 'ear-peek', label: 'Ear peek' },
    ],
    examBestId: 'skin-spring',
    bestFinding: 'Lifted skin stays peaked — poor turgor, very dry inside.',
    dxOptions: ['asthma', 'dehydration', 'viral-respiratory'],
    examQuiz: {
      gentle: '{name} is all droopy and very thirsty. Which check shows dryness best?',
      steady: 'Droopy and very thirsty. Which bedside check shows fluid loss best?',
      expert: '{demo} with suspected volume depletion. Most revealing bedside check?',
    },
    stages: [
      { id: 'sipped', label: 'Sipped', blurb: 'Feeling good and bouncy.', says: "Just here for my check-in — I'm feeling good and bouncy!" },
      { id: 'thirsty', label: 'Thirsty', blurb: 'A bit dry and slow.', says: "My mouth feels dry and I'm moving a little slow today." },
      { id: 'dried-out', label: 'Dried out', blurb: 'Droopy and very thirsty.', says: 'I feel all droopy and SO thirsty. Can you help me perk up?' },
      { id: 'parched', label: 'Parched', blurb: 'Drooped right out — needs care now.', says: 'I feel drooped out and shaky. I really need your help.' },
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
        hootLine: "Fizzy drinks don't hydrate — water does.",
      },
      {
        id: 'salt-pouch',
        label: 'Feed a whole salt pouch',
        gradeByStage: ['DANGEROUS', 'DANGEROUS', 'DANGEROUS', 'DANGEROUS'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: {},
        hootLine: 'Too much salt at once would make things worse — you hold back just in time!',
      },
    ],
  },

  'viral-respiratory': {
    id: 'viral-respiratory',
    name: 'Sniffly Cold',
    plainWords: 'A common cold: sniffles, sneezes, and a worn-out feeling.',
    examOptions: [
      { id: 'neck-glands', label: 'Neck glands' },
      { id: 'runny-nose', label: 'Runny nose' },
      { id: 'belly-sounds', label: 'Belly sounds' },
    ],
    examBestId: 'neck-glands',
    bestFinding: 'The neck glands are sore and swollen — a Centor point toward strep.',
    dxOptions: ['viral-respiratory', 'hypertension', 'asthma'],
    examQuiz: {
      gentle: "{name}'s throat is scratchy and there is no cough. What do you check first?",
      steady: 'Scratchy throat, no cough. Which check best sorts strep from virus?',
      expert: 'Sore throat without cough. Which bedside check earns a Centor point?',
    },
    stages: [
      { id: 'breezy', label: 'Breezy', blurb: 'Nose clear, feeling bouncy.', says: "Just here for my check-in — my nose is clear and I feel bouncy!" },
      { id: 'sniffly', label: 'Sniffly', blurb: 'Sniffles and sneezes.', says: 'My nose is sniffly and I keep sneezing. Achoo!' },
      { id: 'feverish', label: 'Feverish', blurb: 'Warm forehead, low pep.', says: 'My forehead feels warm and I have no pep at all.' },
      { id: 'wiped-out', label: 'Wiped out', blurb: 'All worn out, wants blankets.', says: 'I feel all worn out. Can you help me get better?' },
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
        hootLine: 'An ice plunge would shock a feverish body — you stop it just in time!',
      },
    ],
  },

  asthma: {
    id: 'asthma',
    name: 'Asthma',
    plainWords: 'Tight, twitchy airways that turn breaths whistly.',
    examOptions: [
      { id: 'temperature', label: 'Temperature' },
      { id: 'ear-peek', label: 'Ear peek' },
      { id: 'peak-flow', label: 'Peak-flow blows' },
    ],
    examBestId: 'peak-flow',
    bestFinding: 'The blow number is low — air is leaving the lungs slowly.',
    dxOptions: ['viral-respiratory', 'asthma', 'dehydration'],
    examQuiz: {
      gentle: "{name}'s breaths sound whistly. What do you measure first?",
      steady: 'Whistly breaths and a tight chest. What do you measure first?',
      expert: '{demo} with wheeze. Which bedside measure tracks the flare?',
    },
    stages: [
      { id: 'clear', label: 'Clear', blurb: 'Breathing easy.', says: "Just here for my check-in — I'm breathing easy!" },
      { id: 'tight', label: 'Tight', blurb: 'Chest feels a bit tight.', says: 'My chest feels a little tight today.' },
      { id: 'wheezy', label: 'Wheezy', blurb: 'Whistly breaths, worried eyes.', says: 'My breaths sound whistly and my chest feels tight. Can you help me breathe easy?' },
      { id: 'struggling', label: 'Struggling', blurb: 'Hard to breathe, needs help now.', says: "It's hard to breathe and I'm scared. Please help me!" },
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
        label: 'Shake a dusty blanket indoors',
        gradeByStage: ['DANGEROUS', 'DANGEROUS', 'DANGEROUS', 'DANGEROUS'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: {},
        hootLine: 'A dust cloud could slam airways shut — you hold the blanket still!',
      },
    ],
  },

  hypertension: {
    id: 'hypertension',
    name: 'High Blood Pressure',
    plainWords: 'Blood pressure running higher than it should be.',
    examOptions: [
      { id: 'temperature', label: 'Temperature' },
      { id: 'recuff', label: 'Re-check the cuff' },
      { id: 'ankle-check', label: 'Ankle check' },
    ],
    examBestId: 'recuff',
    bestFinding: 'After five quiet minutes the cuff still reads high — it counts.',
    dxOptions: ['dehydration', 'asthma', 'hypertension'],
    examQuiz: {
      gentle: "{name}'s numbers are running high. What do you do first?",
      steady: 'Blood pressure running high. Which step comes first?',
      expert: '{demo} with elevated office BP. Which bedside step comes first?',
    },
    stages: [
      { id: 'steady', label: 'Steady', blurb: 'Calm and even.', says: "Just here for my check-in — I'm feeling steady!" },
      { id: 'creeping', label: 'Creeping up', blurb: 'A little tense lately.', says: "I've been feeling a little tense lately. Are my numbers okay?" },
      { id: 'high', label: 'Running high', blurb: 'Numbers running high.', says: 'My numbers are running high — what should I do?' },
      { id: 'very-high', label: 'Very high', blurb: 'Needs care and a plan.', says: "My pressure is very high and I'm worried. I need a plan." },
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
        hootLine: 'Extra doses can drop pressure too far — you set the extras aside!',
      },
    ],
  },
};
