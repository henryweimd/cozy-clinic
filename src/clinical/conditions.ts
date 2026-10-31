import type { ConditionDef, ConditionId } from './types';

/** Exam-round finding when the pick isn't the revealing one. */
export const EXAM_OTHER_FINDING = 'That exam finds nothing new.';

/** History-round answer when the question leads nowhere. */
export const HX_OTHER_FINDING = 'They shrug and change the subject — that question leads nowhere.';

/** Display label for one action at one reading tier. */
export function actionLabel(
  action: {
    label: string;
    labels: { gentle: string; steady: string; clinical: string; expert: string };
  },
  tier: 'gentle' | 'steady' | 'clinical' | 'expert',
): string {
  return action.labels[tier];
}

/** Condition display names per tier (diagnose-round options). */
export const CONDITION_TIER_NAMES: Record<
  ConditionId,
  { gentle: string; steady: string; clinical: string; expert: string }
> = {
  dehydration: { gentle: 'Dried Out', steady: 'Dehydration', clinical: 'Dehydration', expert: 'Dehydration' },
  'viral-respiratory': { gentle: 'Sniffly Cold', steady: 'Common Cold', clinical: 'Viral URI', expert: 'Viral URI' },
  asthma: { gentle: 'Asthma', steady: 'Asthma', clinical: 'Asthma flare', expert: 'Asthma Exacerbation' },
  hypertension: { gentle: 'High Blood Pressure', steady: 'High Blood Pressure', clinical: 'Hypertension', expert: 'Hypertension' },
  'strep-throat': { gentle: 'Strep Sore Throat', steady: 'Strep Throat', clinical: 'Strep pharyngitis', expert: 'Group A strep pharyngitis' },
  'ear-infection': { gentle: 'Sore Ear', steady: 'Ear Infection', clinical: 'Otitis media', expert: 'Acute otitis media' },
  eczema: { gentle: 'Itchy Skin', steady: 'Eczema', clinical: 'Atopic dermatitis', expert: 'Atopic dermatitis' },
  pneumonia: { gentle: 'Lung Infection', steady: 'Pneumonia', clinical: 'Pneumonia', expert: 'Community-acquired pneumonia' },
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
      { id: 'throat-swab', label: 'Throat swab' },
      { id: 'skin-spring', label: 'Skin spring-back' },
      { id: 'belly-sounds', label: 'Belly sounds' },
    ],
    examBestId: 'skin-spring',
    bestFinding: {
      gentle: 'Lifted skin stays peaked — very dry inside.',
      steady: 'Lifted skin stays peaked — poor turgor, very dry inside.',
      clinical: 'Sustained tenting — poor turgor, volume depleted.',
      expert: 'Sustained skin tenting; poor turgor, volume depletion.',
    },
    historyOptions: [
      { id: 'less-pee', label: 'Peeing less than usual?' },
      { id: 'headaches', label: 'Any headaches lately?' },
      { id: 'bad-sleep', label: 'Been sleeping badly?' },
    ],
    historyBestId: 'less-pee',
    bestHistory: {
      gentle: 'Barely peeing, and it is dark — fluids are really low.',
      steady: 'Barely peeing, dark urine — fluid really low.',
      clinical: 'Oliguria with dark urine — volume depleted.',
      expert: 'Oliguria, dark urine; volume depletion.',
    },
    historyQuiz: {
      gentle: '{name} is droopy and SO thirsty. What do you ask first?',
      steady: 'Droopy and very thirsty. What do you ask first?',
      clinical: 'Droopy, thirsty. First history question?',
      expert: '{demo} with suspected volume depletion. First history question?',
    },
    dxOptions: ['asthma', 'dehydration', 'viral-respiratory'],
    dxPearl: {
      right: 'Droopy + very thirsty: fluids will perk them up.',
      wrong: 'Droopy and thirsty means drying out inside.',
    },
    visitPearl: 'Small sips of water fix drying out',
    examQuiz: {
      gentle: '{name} is all droopy and very thirsty. Which check shows how dry they are?',
      steady: 'Droopy and very thirsty. Which bedside check shows fluid loss best?',
      clinical: 'Droopy, very thirsty. Which bedside check shows fluid loss?',
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
        labels: { gentle: 'Give cool sips of water', steady: 'Offer cool water', clinical: 'Give oral fluids', expert: 'Oral rehydration' },
        gradeByStage: ['NOT_GREAT', 'BEST', 'BEST', 'BEST'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: { energy: 1, comfort: 1 },
        hootLine: 'Water first — small sips wake the body up.',
      },
      {
        id: 'rest-shade',
        label: 'Rest in the shade',
        labels: { gentle: 'Rest somewhere shady', steady: 'Rest in the shade', clinical: 'Rest and observe', expert: 'Monitor at rest' },
        gradeByStage: ['NOT_GREAT', 'NOT_GREAT', 'BEST', 'NOT_GREAT'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: { energy: 1 },
        hootLine: 'Rest helps, but fluids do the real fixing.',
      },
      {
        id: 'fizzy-soda',
        label: 'Give fizzy soda',
        labels: { gentle: 'Share a fizzy soda', steady: 'Give fizzy soda', clinical: 'Give a sugary soda', expert: 'Sugary carbonated drink' },
        gradeByStage: ['WRONG', 'WRONG', 'WRONG', 'WRONG'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: { comfort: -1 },
        hootLine: "Fizzy drinks don't hydrate — water does.",
      },
      {
        id: 'salt-pouch',
        label: 'Feed a whole salt pouch',
        labels: { gentle: 'Eat a whole salt packet', steady: 'Feed a whole salt pouch', clinical: 'Give a salt load', expert: 'Acute sodium load' },
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
      { id: 'skin-spring', label: 'Skin spring-back' },
      { id: 'belly-sounds', label: 'Belly sounds' },
    ],
    examBestId: 'neck-glands',
    bestFinding: {
      gentle: 'Neck feels fine, no white spots — this is not strep. Just a cold.',
      steady: 'Neck glands feel normal with no white spots — zero Centor points. A virus, not strep.',
      clinical: 'Nodes normal, no exudates — Centor 0. A virus, not strep.',
      expert: 'Cervical nodes normal, no exudates — Centor 0, viral.',
    },
    historyOptions: [
      { id: 'sick-contacts', label: 'Anyone around you sick?' },
      { id: 'tummy', label: 'Any stomach aches?' },
      { id: 'loud', label: 'Been near loud noises?' },
    ],
    historyBestId: 'sick-contacts',
    bestHistory: {
      gentle: 'Half the class is sneezing too — a cold is going around!',
      steady: 'Classmates all have colds — it is going around.',
      clinical: 'Multiple sick contacts — community URI spread.',
      expert: 'Sick contacts positive; community URI circulation.',
    },
    historyQuiz: {
      gentle: '{name} is sniffly and sneezy. What do you ask first?',
      steady: 'Sniffles and sneezes. What do you ask first?',
      clinical: 'Rhinorrhea and sneezing. First history question?',
      expert: '{demo} with URI symptoms. First history question?',
    },
    dxOptions: ['viral-respiratory', 'hypertension', 'asthma'],
    dxPearl: {
      right: 'Cough and sniffles with no strep signs — just a cold.',
      wrong: 'Cough and sniffles point to a cold — what fits those?',
    },
    visitPearl: 'Cough + sniffles, no strep signs: a cold',
    examQuiz: {
      gentle: '{name} has a scratchy throat AND lots of cough and sniffles. What shows it is just a cold?',
      steady: 'Sore throat with cough and runny nose. Which check rules out strep?',
      clinical: 'Sore throat with cough and rhinorrhea. Which check excludes strep?',
      expert: 'Pharyngitis with cough and rhinorrhea. Which bedside check rules out strep?',
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
        labels: { gentle: 'Snuggle, rest and sip', steady: 'Warm rest + fluids', clinical: 'Rest with fluids', expert: 'Supportive care + PO fluids' },
        gradeByStage: ['NOT_GREAT', 'BEST', 'BEST', 'BEST'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: { energy: 1, comfort: 1 },
        hootLine: 'Rest and fluids let the body do its healing work.',
      },
      {
        id: 'warm-soup',
        label: 'Warm soup break',
        labels: { gentle: 'Have some warm soup', steady: 'Warm soup break', clinical: 'Offer warm fluids', expert: 'Warm fluids for comfort' },
        gradeByStage: ['NOT_GREAT', 'NOT_GREAT', 'BEST', 'NOT_GREAT'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: { comfort: 1 },
        hootLine: 'Soup soothes — comfort is care too.',
      },
      {
        id: 'share-cup',
        label: 'Share a cup with a friend',
        labels: { gentle: 'Share sips with a friend', steady: 'Share a cup with a friend', clinical: 'Share drinking cups', expert: 'Share drinking vessels' },
        gradeByStage: ['WRONG', 'WRONG', 'WRONG', 'WRONG'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: { comfort: -1 },
        hootLine: 'Sharing cups shares colds — friends keep their own cups.',
      },
      {
        id: 'ice-bath',
        label: 'Plunge into an ice bath',
        labels: { gentle: 'Jump in an ice bath', steady: 'Plunge into an ice bath', clinical: 'Cold bath plunge', expert: 'Cold-water immersion' },
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
      { id: 'throat-swab', label: 'Throat swab' },
      { id: 'ankle-check', label: 'Ankle check' },
      { id: 'wheeze-listen', label: 'Listen for the whistle' },
    ],
    examBestId: 'wheeze-listen',
    bestFinding: {
      gentle: 'Soft whistles on breathing out — the classic asthma sound.',
      steady: 'Soft whistles on breathing out — the classic asthma sound.',
      clinical: 'Expiratory wheezes — classic asthma.',
      expert: 'Polyphonic expiratory wheezes — obstructive pattern.',
    },
    historyOptions: [
      { id: 'triggers', label: 'Does running or dust make it worse?' },
      { id: 'earaches', label: 'Any earaches?' },
      { id: 'thirsty', label: 'Been thirsty lately?' },
    ],
    historyBestId: 'triggers',
    bestHistory: {
      gentle: 'Running and dusty rooms always set it off — twitchy airways!',
      steady: 'Exercise and dust always trigger it — twitchy airways.',
      clinical: 'Exercise and dust triggers — reactive airways.',
      expert: 'Exercise/dust triggers; reactive airway pattern.',
    },
    historyQuiz: {
      gentle: "{name}'s chest feels tight and whistly. What do you ask first?",
      steady: 'Tight whistly chest. What do you ask first?',
      clinical: 'Chest tightness, wheeze. First history question?',
      expert: '{demo} with wheeze. First history question?',
    },
    dxOptions: ['viral-respiratory', 'asthma', 'dehydration'],
    dxPearl: {
      right: 'Whistly breaths + tight chest: classic asthma.',
      wrong: 'Whistles when breathing out are the giveaway.',
    },
    visitPearl: 'Whistly airways need puffer + spacer',
    examQuiz: {
      gentle: "{name}'s chest feels tight and funny. What do you check first?",
      steady: 'Tight chest, hard to breathe. What do you check first?',
      clinical: 'Chest tightness, short of breath. Priority assessment?',
      expert: '{demo} with chest tightness. Which finding confirms obstruction?',
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
        labels: { gentle: 'Sit up in calm air', steady: 'Sit upright in calm air', clinical: 'Sit upright, stay calm', expert: 'Upright positioning, calm air' },
        gradeByStage: ['NOT_GREAT', 'BEST', 'BEST', 'NOT_GREAT'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: { breathing: 1, comfort: 1 },
        hootLine: 'Upright and calm gives airways room to relax.',
      },
      {
        id: 'rescue-puffer',
        label: 'Rescue puffer with spacer',
        labels: { gentle: 'Use the rescue puffer', steady: 'Rescue puffer with spacer', clinical: 'Puffer with spacer', expert: 'Albuterol via spacer' },
        gradeByStage: ['NOT_GREAT', 'BEST', 'BEST', 'BEST'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: { breathing: 2 },
        hootLine: 'The puffer opens tight airways — with a spacer, every puff counts.',
      },
      {
        id: 'flower-sniff',
        label: 'Bury nose in dusty flowers',
        labels: { gentle: 'Sniff the dusty flowers', steady: 'Bury nose in dusty flowers', clinical: 'Breathe in flower dust', expert: 'Allergen exposure' },
        gradeByStage: ['WRONG', 'WRONG', 'WRONG', 'WRONG'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: { breathing: -1 },
        hootLine: 'Dust and pollen squeeze airways tighter.',
      },
      {
        id: 'dusty-blanket',
        label: 'Shake a dusty blanket indoors',
        labels: { gentle: 'Shake a dusty blanket', steady: 'Shake a dusty blanket indoors', clinical: 'Shake out dusty bedding', expert: 'Indoor dust aerosol' },
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
      { id: 'ear-peek', label: 'Ear peek' },
      { id: 'recuff', label: 'Re-check the cuff' },
      { id: 'throat-swab', label: 'Throat swab' },
    ],
    examBestId: 'recuff',
    bestFinding: {
      gentle: 'After five quiet minutes the cuff still reads high — it counts.',
      steady: 'After five quiet minutes the cuff still reads high — it counts.',
      clinical: 'Cuff still high after 5 minutes rest.',
      expert: 'Persistent stage-2-range cuff readings.',
    },
    historyOptions: [
      { id: 'salt-meds', label: 'Salty foods or missed medicines?' },
      { id: 'pets', label: 'Any pet allergies?' },
      { id: 'swim', label: 'Been swimming lately?' },
    ],
    historyBestId: 'salt-meds',
    bestHistory: {
      gentle: 'Extra salty snacks, and doses missed twice this week.',
      steady: 'Salty diet plus missed doses this week.',
      clinical: 'High sodium intake; missed doses this week.',
      expert: 'Sodium load + nonadherence this week.',
    },
    historyQuiz: {
      gentle: "{name}'s numbers are running high. What do you ask first?",
      steady: 'Blood pressure running high. What do you ask first?',
      clinical: 'Elevated BP. First history question?',
      expert: '{demo} with elevated BP. First history question?',
    },
    dxOptions: ['dehydration', 'asthma', 'hypertension'],
    dxPearl: {
      right: 'High twice after quiet rest — it counts.',
      wrong: 'Two high readings after rest: trust the cuff.',
    },
    visitPearl: 'No symptoms? Cuffs still catch it early',
    examQuiz: {
      gentle: "{name}'s numbers are running high. What do you do first?",
      steady: 'Blood pressure running high. Which step comes first?',
      clinical: 'Elevated BP on repeat. Which step comes first?',
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
        labels: { gentle: 'Walk daily, less salty food', steady: 'Daily walks, less salt', clinical: 'Daily walks, cut salt', expert: 'Exercise + sodium restriction' },
        gradeByStage: ['BEST', 'BEST', 'BEST', 'NOT_GREAT'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: { energy: 1 },
        hootLine: 'Small steady habits move big numbers.',
      },
      {
        id: 'prescribed-meds',
        label: 'Take prescribed medicine',
        labels: { gentle: 'Take the daily medicine', steady: 'Take prescribed medicine', clinical: 'Take meds as prescribed', expert: 'Continue antihypertensives' },
        gradeByStage: ['NOT_GREAT', 'NOT_GREAT', 'BEST', 'BEST'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: { comfort: 1 },
        hootLine: 'The daily dose keeps pressure on its leash.',
      },
      {
        id: 'skip-meds',
        label: 'Skip meds — feeling fine!',
        labels: { gentle: 'Skip it — feeling great!', steady: 'Skip meds — feeling fine!', clinical: 'Skip meds, feeling well', expert: 'Nonadherence (asymptomatic)' },
        gradeByStage: ['NOT_GREAT', 'WRONG', 'WRONG', 'WRONG'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: { comfort: -1 },
        hootLine: 'Feeling fine is the medicine working — keep taking it.',
      },
      {
        id: 'double-dose',
        label: 'Double the dose to fix it faster',
        labels: { gentle: 'Take double to fix it fast', steady: 'Double the dose to fix it faster', clinical: 'Double the dose', expert: 'Double the antihypertensive dose' },
        gradeByStage: ['DANGEROUS', 'DANGEROUS', 'DANGEROUS', 'DANGEROUS'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: {},
        hootLine: 'Extra doses can drop pressure too far — you set the extras aside!',
      },
    ],
  },

  /**
   * Run-20 pack — DRAFT, pending operator medical review. The
   * cold-contrast pair: Milo's viral cold is Centor 0; Nina's
   * strep is Centor high. No cough + white patches + tender
   * glands → test and treat.
   */
  'strep-throat': {
    id: 'strep-throat',
    name: 'Strep Throat',
    plainWords: 'A throat germ that makes swallowing hurt — no cough, white patches.',
    examOptions: [
      { id: 'throat-look', label: 'Look at the throat' },
      { id: 'neck-glands', label: 'Neck glands' },
      { id: 'belly-sounds', label: 'Belly sounds' },
    ],
    examBestId: 'throat-look',
    bestFinding: {
      gentle: 'White patches on a very red throat, no cough — strep signs.',
      steady: 'White patches, no cough — Centor climbs toward strep.',
      clinical: 'Exudates + tender nodes, no cough — Centor 3-4.',
      expert: 'Exudates, tender nodes, no cough — Centor 3-4: test.',
    },
    historyOptions: [
      { id: 'strep-contact', label: 'Anyone home with strep throat?' },
      { id: 'itchy', label: 'Any itchy skin?' },
      { id: 'rain', label: 'Been out in the rain?' },
    ],
    historyBestId: 'strep-contact',
    bestHistory: {
      gentle: 'Big sibling just had strep — same sore throat, same week!',
      steady: 'A sibling just had strep this week.',
      clinical: 'Household strep contact this week.',
      expert: 'Household GAS contact; exposure positive.',
    },
    historyQuiz: {
      gentle: '{name} has a sore throat but NO cough. What do you ask first?',
      steady: 'Sore throat, no cough. What do you ask first?',
      clinical: 'Pharyngitis, no cough. First history question?',
      expert: '{demo} with pharyngitis, no cough. First history question?',
    },
    dxOptions: ['strep-throat', 'viral-respiratory', 'ear-infection'],
    dxPearl: {
      right: 'No cough + white patches + tender glands: strep.',
      wrong: 'White patches with NO cough? Think strep, not cold.',
    },
    visitPearl: 'No cough + white patches: test for strep',
    examQuiz: {
      gentle: '{name} has a sore throat but NO cough or sniffles. What proves strep?',
      steady: 'Sore throat, no cough, no runny nose. Which check points to strep?',
      clinical: 'Pharyngitis without cough or rhinorrhea. Which check supports strep?',
      expert: '{demo} with pharyngitis, no cough. Which finding raises Centor most?',
    },
    stages: [
      { id: 'comfy', label: 'Comfy', blurb: 'Throat comfy, swallowing easy.', says: "Just here for my check-in — my throat feels comfy!" },
      { id: 'scratchy', label: 'Scratchy', blurb: 'Throat a little scratchy.', says: 'My throat feels a little scratchy when I swallow.' },
      { id: 'strep-sore', label: 'Strep-sore', blurb: 'Throat very sore, hurts to swallow.', says: 'My throat hurts SO much to swallow. Can you help it feel better?' },
      { id: 'miserable', label: 'Miserable', blurb: 'Throat on fire, feverish, needs care now.', says: 'My throat is on fire and I feel feverish. I really need your help.' },
    ],
    presentsAt: 2,
    actions: [
      {
        id: 'finish-antibiotics',
        label: 'Finish all the throat medicine',
        labels: { gentle: 'Finish ALL the throat medicine', steady: 'Finish all the throat medicine', clinical: 'Complete the antibiotic course', expert: 'Complete amoxicillin course' },
        gradeByStage: ['NOT_GREAT', 'BEST', 'BEST', 'BEST'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: { energy: 1, comfort: 1 },
        hootLine: 'Antibiotics only work when you finish every dose.',
      },
      {
        id: 'warm-drinks',
        label: 'Rest with warm drinks',
        labels: { gentle: 'Rest and sip warm drinks', steady: 'Rest with warm drinks', clinical: 'Rest with warm fluids', expert: 'Supportive rest + fluids' },
        gradeByStage: ['NOT_GREAT', 'NOT_GREAT', 'NOT_GREAT', 'NOT_GREAT'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: { comfort: 1 },
        hootLine: 'Rest soothes the throat, but the germ needs medicine.',
      },
      {
        id: 'stop-early',
        label: 'Stop medicine once feeling better',
        labels: { gentle: 'Quit medicine once feeling better', steady: 'Stop medicine once feeling better', clinical: 'Stop antibiotics when improved', expert: 'Truncate course when improved' },
        gradeByStage: ['WRONG', 'WRONG', 'WRONG', 'WRONG'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: { comfort: -1 },
        hootLine: 'Stopping early lets the strep germ bounce back.',
      },
      {
        id: 'hot-sauce',
        label: 'Gargle burning hot sauce',
        labels: { gentle: 'Gargle burning hot sauce', steady: 'Gargle burning hot sauce', clinical: 'Gargle scalding hot sauce', expert: 'Scalding capsaicin gargle' },
        gradeByStage: ['DANGEROUS', 'DANGEROUS', 'DANGEROUS', 'DANGEROUS'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: {},
        hootLine: 'Hot sauce would scald a sore throat — you stop it just in time!',
      },
    ],
  },

  /** Run-20 pack — DRAFT, pending operator medical review. */
  'ear-infection': {
    id: 'ear-infection',
    name: 'Ear Infection',
    plainWords: 'A sore, puffy middle ear — tugging, fever, and muffled hearing.',
    examOptions: [
      { id: 'ear-scope', label: 'Peek inside the ear' },
      { id: 'neck-glands', label: 'Neck glands' },
      { id: 'belly-sounds', label: 'Belly sounds' },
    ],
    examBestId: 'ear-scope',
    bestFinding: {
      gentle: 'Eardrum red and bulging — the sore ear, found.',
      steady: 'Red, bulging eardrum — a middle-ear infection.',
      clinical: 'Bulging erythematous TM — acute otitis media.',
      expert: 'Bulging erythematous TM; AOM.',
    },
    historyOptions: [
      { id: 'cold-first', label: 'Cold or runny nose first?' },
      { id: 'teeth', label: 'Any toothaches?' },
      { id: 'breakfast', label: 'Been skipping breakfast?' },
    ],
    historyBestId: 'cold-first',
    bestHistory: {
      gentle: 'A runny cold all last week — then the ear started throbbing.',
      steady: 'A cold last week, then the ear began throbbing.',
      clinical: 'Viral URI last week, then otalgia — post-URI AOM.',
      expert: 'URI prodrome then otalgia; post-viral AOM pattern.',
    },
    historyQuiz: {
      gentle: '{name} keeps tugging a sore ear. What do you ask first?',
      steady: 'Tugging a sore ear. What do you ask first?',
      clinical: 'Otalgia, ear tugging. First history question?',
      expert: '{demo} with otalgia. First history question?',
    },
    dxOptions: ['ear-infection', 'strep-throat', 'viral-respiratory'],
    dxPearl: {
      right: 'Ear tugging + fever + red eardrum: ear infection.',
      wrong: 'Tugging the ear + fever? Look inside the ear.',
    },
    visitPearl: 'Red bulging eardrum: ear infection',
    examQuiz: {
      gentle: '{name} keeps tugging one sore ear. What shows the infection?',
      steady: 'Ear tugging with fever. Which check finds the infection?',
      clinical: 'Otalgia with fever in a child. Most revealing check?',
      expert: '{demo} with otalgia and fever. Which finding confirms AOM?',
    },
    stages: [
      { id: 'clear', label: 'Clear', blurb: 'Ears comfy, hearing every giggle.', says: "Just here for my check-in — my ears feel clear!" },
      { id: 'achy', label: 'Achy', blurb: 'One ear aches a little.', says: 'One of my ears aches a little, especially at bedtime.' },
      { id: 'throbby', label: 'Throbby', blurb: 'Ear throbs and feels full.', says: 'My ear is throbbing and everything sounds fuzzy. Can you help?' },
      { id: 'miserable', label: 'Miserable', blurb: 'Ear pounding, feverish, needs care now.', says: 'My ear is pounding and I feel feverish. I really need your help.' },
    ],
    presentsAt: 2,
    actions: [
      {
        id: 'ear-medicine',
        label: 'Give the ear medicine as directed',
        labels: { gentle: 'Give ALL the ear medicine', steady: 'Give the ear medicine as directed', clinical: 'Give prescribed ear therapy', expert: 'Complete AOM antibiotic course' },
        gradeByStage: ['NOT_GREAT', 'BEST', 'BEST', 'BEST'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: { energy: 1, comfort: 1 },
        hootLine: 'Finishing every dose clears the ear germ.',
      },
      {
        id: 'warm-compress',
        label: 'Warm cloth + quiet rest',
        labels: { gentle: 'Warm cloth on the sore ear', steady: 'Warm cloth + quiet rest', clinical: 'Warm compress, quiet rest', expert: 'Warm compress + rest' },
        gradeByStage: ['NOT_GREAT', 'NOT_GREAT', 'NOT_GREAT', 'NOT_GREAT'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: { comfort: 1 },
        hootLine: 'Warmth soothes the ache while medicine does the curing.',
      },
      {
        id: 'cotton-swab',
        label: 'Poke inside with a cotton swab',
        labels: { gentle: 'Poke the ear with a swab', steady: 'Poke inside with a cotton swab', clinical: 'Probe the canal with a swab', expert: 'Instrument the canal' },
        gradeByStage: ['WRONG', 'WRONG', 'WRONG', 'WRONG'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: { comfort: -1 },
        hootLine: 'Nothing pokes inside ears — swabs push germs deeper.',
      },
      {
        id: 'shout-ear',
        label: 'Shout into the sore ear',
        labels: { gentle: 'Yell into the sore ear', steady: 'Shout into the sore ear', clinical: 'Shout into the sore ear', expert: 'Blast sound into the canal' },
        gradeByStage: ['DANGEROUS', 'DANGEROUS', 'DANGEROUS', 'DANGEROUS'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: {},
        hootLine: 'A shout would blast a sore ear — you stop it just in time!',
      },
    ],
  },

  /** Run-20 pack — DRAFT, pending operator medical review. */
  eczema: {
    id: 'eczema',
    name: 'Eczema',
    plainWords: 'Dry, itchy skin patches that flare in the creases.',
    examOptions: [
      { id: 'skin-look', label: 'Look at the itchy patches' },
      { id: 'neck-glands', label: 'Neck glands' },
      { id: 'belly-sounds', label: 'Belly sounds' },
    ],
    examBestId: 'skin-look',
    bestFinding: {
      gentle: 'Dry red patches in the elbow bends — classic itchy skin.',
      steady: 'Dry red patches in the flexures — classic eczema.',
      clinical: 'Xerotic flexural plaques — atopic dermatitis.',
      expert: 'Flexural lichenified plaques; atopic pattern.',
    },
    historyOptions: [
      { id: 'come-go', label: 'Do they come and go?' },
      { id: 'fevers', label: 'Any fevers?' },
      { id: 'shoes', label: 'New shoes lately?' },
    ],
    historyBestId: 'come-go',
    bestHistory: {
      gentle: 'Flares every few weeks, then calms — the classic on-and-off!',
      steady: 'Flares every few weeks, then calms down.',
      clinical: 'Relapsing-remitting course — classic atopic pattern.',
      expert: 'Relapsing-remitting flexural course; atopic.',
    },
    historyQuiz: {
      gentle: '{name} has itchy red patches. What do you ask first?',
      steady: 'Itchy red patches. What do you ask first?',
      clinical: 'Pruritic plaques. First history question?',
      expert: '{demo} with pruritic plaques. First history question?',
    },
    dxOptions: ['eczema', 'ear-infection', 'viral-respiratory'],
    dxPearl: {
      right: 'Itchy crease patches that come and go: eczema.',
      wrong: 'Itchy patches in the bends? Think itchy skin.',
    },
    visitPearl: 'Itchy crease patches: eczema care',
    examQuiz: {
      gentle: '{name} has itchy red patches in the elbow bends. What are they?',
      steady: 'Itchy red patches in the elbow and knee bends. What fits?',
      clinical: 'Pruritic flexural plaques, relapsing. What fits?',
      expert: '{demo} with pruritic flexural plaques. Diagnosis?',
    },
    stages: [
      { id: 'smooth', label: 'Smooth', blurb: 'Skin smooth and calm.', says: "Just here for my check-in — my skin feels smooth!" },
      { id: 'tickly', label: 'Tickly', blurb: 'Skin a bit dry and tickly.', says: 'My skin feels dry and a little tickly today.' },
      { id: 'flare', label: 'Flare-up', blurb: 'Red itchy patches flaring.', says: 'My itchy patches are flaring up. Can you help calm them?' },
      { id: 'raw', label: 'Very sore', blurb: 'Skin very sore and scratchy, needs care now.', says: 'My skin is so sore and scratchy. I really need your help.' },
    ],
    presentsAt: 2,
    actions: [
      {
        id: 'moisturize',
        label: 'Daily gentle moisturizer',
        labels: { gentle: 'Cream the skin every day', steady: 'Daily gentle moisturizer', clinical: 'Daily emollient routine', expert: 'Daily emollient + trigger control' },
        gradeByStage: ['NOT_GREAT', 'BEST', 'BEST', 'BEST'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: { comfort: 1 },
        hootLine: 'Daily cream keeps the skin wall strong.',
      },
      {
        id: 'short-nails',
        label: 'Keep nails short + cool',
        labels: { gentle: 'Keep nails short', steady: 'Keep nails short + cool', clinical: 'Trim nails; keep cool', expert: 'Short nails; cool cotton' },
        gradeByStage: ['NOT_GREAT', 'NOT_GREAT', 'NOT_GREAT', 'NOT_GREAT'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: { comfort: 1 },
        hootLine: 'Short nails make scratching less harmful.',
      },
      {
        id: 'scratch-itch',
        label: 'Scratch the itchy spots',
        labels: { gentle: 'Scratch the itch hard', steady: 'Scratch the itchy spots', clinical: 'Scratch the plaques', expert: 'Excoriate the plaques' },
        gradeByStage: ['WRONG', 'WRONG', 'WRONG', 'WRONG'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: { comfort: -1 },
        hootLine: 'Scratching breaks skin and invites infection.',
      },
      {
        id: 'scrub-brush',
        label: 'Scrub with a rough brush',
        labels: { gentle: 'Scrub with a rough brush', steady: 'Scrub with a rough brush', clinical: 'Scrub plaques with a brush', expert: 'Abrasive scrub of plaques' },
        gradeByStage: ['DANGEROUS', 'DANGEROUS', 'DANGEROUS', 'DANGEROUS'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: {},
        hootLine: 'A rough brush would tear sore skin — stopped just in time!',
      },
    ],
  },

  /** Run-20 pack — DRAFT, pending operator medical review. */
  pneumonia: {
    id: 'pneumonia',
    name: 'Pneumonia',
    plainWords: 'A lung infection — deep cough, fever, and fast hard breathing.',
    examOptions: [
      { id: 'lung-listen', label: 'Listen to the lungs' },
      { id: 'ankle-check', label: 'Ankle check' },
      { id: 'throat-swab', label: 'Throat swab' },
    ],
    examBestId: 'lung-listen',
    bestFinding: {
      gentle: 'Crackly lungs + fast breathing — the lungs need help.',
      steady: 'Lung crackles with fast breathing — pneumonia.',
      clinical: 'Focal crackles, tachypnea — pneumonia.',
      expert: 'Focal crackles + tachypnea; CAP pattern.',
    },
    historyOptions: [
      { id: 'breathe-hard', label: 'Hard to breathe or breathing fast?' },
      { id: 'rash', label: 'Any rashes?' },
      { id: 'reading', label: 'Been reading late?' },
    ],
    historyBestId: 'breathe-hard',
    bestHistory: {
      gentle: 'Breathing fast, and every breath is work — the lungs are struggling!',
      steady: 'Breathing fast; every breath is work.',
      clinical: 'Tachypnea with increased work of breathing.',
      expert: 'Tachypnea, increased WOB; lower-airway involvement.',
    },
    historyQuiz: {
      gentle: '{name} has fever and a deep cough. What do you ask first?',
      steady: 'Fever and deep cough. What do you ask first?',
      clinical: 'Fever, productive cough. First history question?',
      expert: '{demo} with fever, productive cough. First history question?',
    },
    dxOptions: ['pneumonia', 'asthma', 'viral-respiratory'],
    dxPearl: {
      right: 'Fever + deep cough + crackles: lung infection.',
      wrong: 'Fever with crackly lungs? Think lung infection.',
    },
    visitPearl: 'Fever + crackles: lung infection',
    examQuiz: {
      gentle: '{name} has fever and a deep chesty cough. What checks the lungs?',
      steady: 'Fever with a deep chesty cough. Which check finds it?',
      clinical: 'Fever, productive cough, tachypnea. Key check?',
      expert: '{demo} with fever and productive cough. Key finding?',
    },
    stages: [
      { id: 'clear', label: 'Clear', blurb: 'Breathing easy, lungs clear.', says: "Just here for my check-in — I'm breathing easy!" },
      { id: 'coughy', label: 'Coughy', blurb: 'A deep cough starting.', says: 'A deep cough started yesterday. Should I worry?' },
      { id: 'feverish', label: 'Feverish', blurb: 'Fever with a deep chesty cough.', says: 'I have a fever and this deep chesty cough. Can you help me breathe easy?' },
      { id: 'breathless', label: 'Breathless', blurb: 'Breathing fast and hard, needs care now.', says: "I'm breathing fast and it's hard work. I really need your help." },
    ],
    presentsAt: 2,
    actions: [
      {
        id: 'lung-medicine',
        label: 'Start the lung medicine fast',
        labels: { gentle: 'Start lung medicine right away', steady: 'Start the lung medicine fast', clinical: 'Start prescribed antibiotics', expert: 'Prompt CAP antibiotics' },
        gradeByStage: ['NOT_GREAT', 'BEST', 'BEST', 'BEST'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: { breathing: 1, energy: 1 },
        hootLine: 'Fast treatment stops lung infections early.',
      },
      {
        id: 'rest-fluids',
        label: 'Rest with warm fluids',
        labels: { gentle: 'Rest and sip warm drinks', steady: 'Rest with warm fluids', clinical: 'Bed rest with fluids', expert: 'Supportive rest + fluids' },
        gradeByStage: ['NOT_GREAT', 'BEST', 'NOT_GREAT', 'NOT_GREAT'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: { comfort: 1 },
        hootLine: 'Early rest helps — but fever + crackles need medicine.',
      },
      {
        id: 'wait-silent',
        label: 'Hide it and wait alone',
        labels: { gentle: 'Hide it and wait it out', steady: 'Hide it and wait alone', clinical: 'Delay care; wait alone', expert: 'Watchful waiting alone' },
        gradeByStage: ['WRONG', 'WRONG', 'WRONG', 'WRONG'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: { comfort: -1 },
        hootLine: 'Lung infections need a doctor, not hiding.',
      },
      {
        id: 'race-lungs',
        label: 'Sprint a race to clear lungs',
        labels: { gentle: 'Run a race to clear the lungs', steady: 'Sprint a race to clear lungs', clinical: 'Sprint to clear the lungs', expert: 'Exertional lung clearance' },
        gradeByStage: ['DANGEROUS', 'DANGEROUS', 'DANGEROUS', 'DANGEROUS'],
        stageDeltaByGrade: { BEST: -1, NOT_GREAT: 0, WRONG: 1, DANGEROUS: 0 },
        vitalsDelta: {},
        hootLine: 'A sprint would gasp sick lungs — stopped just in time!',
      },
    ],
  },
};
