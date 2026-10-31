/**
 * FALLBACK PACK — offline snapshot of the H2 Supabase seed
 * (exported 2026-10-29; 12 patients, 204 nodes; run-20 adds
 * Nina/Kai/Ada/Felix + 68 nodes, 64 edges → 16 patients, 272 nodes).
 * The game reads Supabase first and falls back to this pack with
 * zero network, so the demo path completes fully offline.
 * Regenerate: H2 seed driver + exporter (see PROGRESS.md H2).
 */

export interface FallbackPatient {
  id: string;
  name: string;
  condition_id: string;
  age_band: string;
  age_years: number;
  sex: string;
  persona: string;
  fur_shade: string;
  facial_features: string | null;
  accessories_clothing: string | null;
  start_stage: number;
}

export interface FallbackNode {
  id: string;
  patient_id: string;
  depth: number;
  stage_index: number;
  vitals: { energy: number; comfort: number; breathing: number };
  mood: string;
  narrative: string;
  teaching: string;
  animation_cue: string;
  memory: string;
}

export interface FallbackEdge {
  id: string;
  patient_id: string;
  from_node_id: string;
  to_node_id: string;
  kind: 'decision' | 'time';
  choice_label: string | null;
  grade: 'BEST' | 'NOT_GREAT' | 'WRONG' | 'DANGEROUS' | null;
}

export interface FallbackTreatment {
  id: string;
  class_name: string;
  description: string;
  wording: Record<string, string>;
  conditions: string[];
}

/** Prize-linked quiz: one question per topic, answered in-app. */
export interface FallbackQuiz {
  stem: string;
  choices: [string, string, string];
  /** Index into choices (varied per topic — never guessable). */
  answer: number;
  /** One-line teaching pearl shown after the pick. */
  pearl: string;
}

export interface FallbackResource {
  id: string;
  condition_id: string;
  title: string;
  url: string;
  source: string;
  audience: string;
  /** Pre-cached plain-language summary (the in-app card). */
  summary: string;
  /** Pre-cached quiz (learning_resources.quiz in Supabase). */
  quiz: FallbackQuiz;
}

export interface FallbackHandoff {
  id: string;
  patient_id: string;
  from_handle: string;
  team_tag: string | null;
  preset_id: string;
  encounter_summary: string;
  outcome: string;
  score: number;
  created_at: string;
}

export interface FallbackCheer {
  id: string;
  from_handle: string;
  to_handle: string;
  preset_id: string;
  created_at: string;
}

export type ExamModality = 'look' | 'feel' | 'tap' | 'listen';

export interface FallbackExamFinding {
  condition_id: string;
  modality: ExamModality;
  gentle: string;
  steady: string;
  clinical: string;
  expert: string;
}

export const FALLBACK_PATIENTS: FallbackPatient[] = [
  {
    "id": "fb50f32f-0dd1-4b47-983b-06b76e3ecaa9",
    "name": "Mabel",
    "condition_id": "asthma",
    "age_band": "child",
    "age_years": 8,
    "sex": "F",
    "persona": "our first patient",
    "fur_shade": "#A2766B",
    "facial_features": "larger closer-higher bead eyes, wider gentle smile",
    "accessories_clothing": "nurse cap with cross, care pouch",
    "start_stage": 2
  },
  {
    "id": "1949914c-8e7a-4297-bc6b-d120a45f7df3",
    "name": "Milo",
    "condition_id": "viral-respiratory",
    "age_band": "child",
    "age_years": 7,
    "sex": "M",
    "persona": "curious kid",
    "fur_shade": "#CDB9A8",
    "facial_features": "round glasses, questioning tilt",
    "accessories_clothing": "star sticker, crayon box",
    "start_stage": 1
  },
  {
    "id": "a6a595b5-2f88-4349-80eb-9977a831cb36",
    "name": "Theo",
    "condition_id": "dehydration",
    "age_band": "child",
    "age_years": 3,
    "sex": "M",
    "persona": "sleepy toddler",
    "fur_shade": "#8F7364",
    "facial_features": "droopy ears, heavy-lidded eyes",
    "accessories_clothing": "moon-pattern blanket",
    "start_stage": 2
  },
  {
    "id": "90489b94-866b-415b-a602-dd61a18e638b",
    "name": "Wren",
    "condition_id": "hypertension",
    "age_band": "child",
    "age_years": 10,
    "sex": "F",
    "persona": "brave heart-warrior",
    "fur_shade": "#9C8FA6",
    "facial_features": "determined brows, heart cheek patch",
    "accessories_clothing": "tiny hero cape",
    "start_stage": 2
  },
  {
    "id": "bf387fe0-b314-464e-94ae-1e8cd5b04e8d",
    "name": "June",
    "condition_id": "asthma",
    "age_band": "teen",
    "age_years": 15,
    "sex": "F",
    "persona": "gentle first-timer",
    "fur_shade": "#C4A484",
    "facial_features": "freckles, soft sidelong glance",
    "accessories_clothing": "mint scarf",
    "start_stage": 2
  },
  {
    "id": "3ecf0a2a-0ebf-42be-86cd-ffc87a837199",
    "name": "Otis",
    "condition_id": "viral-respiratory",
    "age_band": "teen",
    "age_years": 16,
    "sex": "M",
    "persona": "joke-telling teen",
    "fur_shade": "#7FA3A0",
    "facial_features": "gap-tooth grin",
    "accessories_clothing": "striped beanie",
    "start_stage": 1
  },
  {
    "id": "5cd059de-fe4d-422f-95c9-084b4474309c",
    "name": "Priya",
    "condition_id": "dehydration",
    "age_band": "teen",
    "age_years": 17,
    "sex": "F",
    "persona": "team captain",
    "fur_shade": "#C2A878",
    "facial_features": "bright focused eyes",
    "accessories_clothing": "coral sport headband",
    "start_stage": 2
  },
  {
    "id": "c538db11-dec0-4905-a5b1-c82e65105229",
    "name": "Sam",
    "condition_id": "hypertension",
    "age_band": "teen",
    "age_years": 16,
    "sex": "M",
    "persona": "quiet reader",
    "fur_shade": "#8B9A7C",
    "facial_features": "calm half-smile",
    "accessories_clothing": "book tote, plant pin",
    "start_stage": 2
  },
  {
    "id": "b045d647-86dd-4c40-8dbc-b5a4bbd2b6a9",
    "name": "Lila",
    "condition_id": "asthma",
    "age_band": "adult",
    "age_years": 41,
    "sex": "F",
    "persona": "warm neighbor",
    "fur_shade": "#B08968",
    "facial_features": "crinkled kind eyes",
    "accessories_clothing": "flower clip, shawl",
    "start_stage": 2
  },
  {
    "id": "03c6aac1-ddc2-4a17-ae0c-ea26f51520ae",
    "name": "Owen",
    "condition_id": "viral-respiratory",
    "age_band": "adult",
    "age_years": 32,
    "sex": "M",
    "persona": "tired new dad",
    "fur_shade": "#9698B8",
    "facial_features": "weary but warm eyes",
    "accessories_clothing": "soft cardigan, coffee mug",
    "start_stage": 1
  },
  {
    "id": "ced9ea83-5b73-4cc2-bc2b-2db579c09640",
    "name": "Rosa",
    "condition_id": "dehydration",
    "age_band": "adult",
    "age_years": 66,
    "sex": "F",
    "persona": "garden lover",
    "fur_shade": "#A67C7C",
    "facial_features": "sun-warmed cheeks",
    "accessories_clothing": "sun hat, apron pocket",
    "start_stage": 2
  },
  {
    "id": "0d28e7ff-7d42-4d1a-a889-063ef908db4f",
    "name": "Ellis",
    "condition_id": "hypertension",
    "age_band": "adult",
    "age_years": 71,
    "sex": "M",
    "persona": "retired sailor",
    "fur_shade": "#8E8A80",
    "facial_features": "slow heavy lids, calm smile",
    "accessories_clothing": "white sailor cap, navy collar",
    "start_stage": 2
  },
  {
    "id": "1c89a34a-8ae5-444d-ba9d-3105f6484113",
    "name": "Nina",
    "condition_id": "strep-throat",
    "age_band": "child",
    "age_years": 7,
    "sex": "F",
    "persona": "chapter-book devourer",
    "fur_shade": "#B08D8A",
    "facial_features": "bright curious bead eyes, small thoughtful smile",
    "accessories_clothing": "cornflower-blue neckerchief",
    "start_stage": 2
  },
  {
    "id": "189ed712-243f-421f-930c-c4e2a6c0919c",
    "name": "Kai",
    "condition_id": "ear-infection",
    "age_band": "child",
    "age_years": 6,
    "sex": "M",
    "persona": "junior drummer",
    "fur_shade": "#9AA08C",
    "facial_features": "wide eager bead eyes, wide cheerful smile",
    "accessories_clothing": "tangerine knit headband",
    "start_stage": 2
  },
  {
    "id": "e8c1a7f5-ccd4-47b0-9cd0-804b1058b686",
    "name": "Ada",
    "condition_id": "eczema",
    "age_band": "teen",
    "age_years": 14,
    "sex": "F",
    "persona": "garden sketch artist",
    "fur_shade": "#A79BAC",
    "facial_features": "calm gentle bead eyes, soft smile",
    "accessories_clothing": "seafoam sun visor",
    "start_stage": 2
  },
  {
    "id": "0803d835-aaa8-47db-84f2-7308feba3541",
    "name": "Felix",
    "condition_id": "pneumonia",
    "age_band": "adult",
    "age_years": 34,
    "sex": "M",
    "persona": "night-shift baker",
    "fur_shade": "#7E8A99",
    "facial_features": "tired kind bead eyes, warm crooked smile",
    "accessories_clothing": "white baker kerchief",
    "start_stage": 2
  },
  {
    "id": "a7ac7cf2-a6c5-407f-aab8-cd5fb085bcd5",
    "name": "Hugo",
    "condition_id": "croup",
    "age_band": "child",
    "age_years": 2,
    "sex": "M",
    "persona": "blanket-fort napper",
    "fur_shade": "#7F9AAE",
    "facial_features": "droopy tired bead eyes, tiny croaky smile",
    "accessories_clothing": "mustard-yellow sleep cap",
    "start_stage": 2
  },
  {
    "id": "a01bc9f5-df58-40cc-a594-43d0133557dd",
    "name": "Ivy",
    "condition_id": "hand-foot-mouth",
    "age_band": "child",
    "age_years": 4,
    "sex": "F",
    "persona": "sticker collector",
    "fur_shade": "#BFA08A",
    "facial_features": "bright bead eyes, small careful smile",
    "accessories_clothing": "daisy hair clip",
    "start_stage": 2
  },
  {
    "id": "bd404ad6-baec-470c-80e3-3be3f93e87b3",
    "name": "Leo",
    "condition_id": "lyme-disease",
    "age_band": "child",
    "age_years": 9,
    "sex": "M",
    "persona": "trail explorer",
    "fur_shade": "#93A284",
    "facial_features": "eager bead eyes, big cheerful closed smile",
    "accessories_clothing": "olive trail vest",
    "start_stage": 2
  },
  {
    "id": "1f12ac0e-fee6-463c-84e7-c09d7ab4b8ed",
    "name": "Ruby",
    "condition_id": "appendicitis",
    "age_band": "teen",
    "age_years": 14,
    "sex": "F",
    "persona": "drama-club lead",
    "fur_shade": "#A87F8E",
    "facial_features": "expressive bead eyes, brave smile",
    "accessories_clothing": "striped rehearsal scarf",
    "start_stage": 2
  },
  {
    "id": "e96de9c5-d4ae-4fd2-986a-7db94d0600dd",
    "name": "Otto",
    "condition_id": "swimmers-ear",
    "age_band": "child",
    "age_years": 8,
    "sex": "M",
    "persona": "swim-team sprinter",
    "fur_shade": "#66808F",
    "facial_features": "bright bead eyes, big splashy smile",
    "accessories_clothing": "blue swim goggles on forehead",
    "start_stage": 2
  },
  {
    "id": "339033ce-6799-40a0-916c-4c3d0d4cf362",
    "name": "Cleo",
    "condition_id": "mono",
    "age_band": "teen",
    "age_years": 16,
    "sex": "F",
    "persona": "choir soloist",
    "fur_shade": "#9B85B5",
    "facial_features": "tired bead eyes, soft patient smile",
    "accessories_clothing": "small golden star barrette",
    "start_stage": 2
  },
  {
    "id": "9350f95f-b258-4caf-8b32-d58b6fb46d36",
    "name": "Remy",
    "condition_id": "nose-bead",
    "age_band": "child",
    "age_years": 3,
    "sex": "M",
    "persona": "button collector",
    "fur_shade": "#C09A6B",
    "facial_features": "curious bead eyes, tiny impish smile",
    "accessories_clothing": "red pocket overalls",
    "start_stage": 2
  },
  {
    "id": "ff94fe93-b87d-4ba7-a058-6a9cc8bcc39c",
    "name": "Willa",
    "condition_id": "gastroenteritis",
    "age_band": "child",
    "age_years": 6,
    "sex": "F",
    "persona": "playground regular",
    "fur_shade": "#A8BFAC",
    "facial_features": "droopy bead eyes, brave little smile",
    "accessories_clothing": "mint polka-dot bow",
    "start_stage": 2
  }
];

export const FALLBACK_NODES: FallbackNode[] = [
  {
    "id": "51752e1b-4e11-41e5-b3b2-46fbce5765d7",
    "patient_id": "fb50f32f-0dd1-4b47-983b-06b76e3ecaa9",
    "depth": 0,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Mabel sits with droopy shoulders. Her breath sounds whistly and wheezy. Her eyes look worried. The cozy clinic feels calm around her.",
    "teaching": "Sitting upright gives lungs more room to move air.",
    "animation_cue": "idle",
    "memory": "First visit: wheezy."
  },
  {
    "id": "8d886c2f-38f8-477d-887d-79f2fd8beb16",
    "patient_id": "fb50f32f-0dd1-4b47-983b-06b76e3ecaa9",
    "depth": 1,
    "stage_index": 1,
    "vitals": {
      "energy": 7,
      "comfort": 8,
      "breathing": 7
    },
    "mood": "perky",
    "narrative": "Mabel sits upright in calm air. Her chest still feels a little tight. She looks perky and rests softly in the cozy room.",
    "teaching": "Calm, clean air has fewer triggers, so tight airways can relax.",
    "animation_cue": "recovery",
    "memory": "First visit: wheezy. Tried \"Sit upright in calm air\" → tight."
  },
  {
    "id": "f101ad90-baef-4ba2-b0da-c8833d66013f",
    "patient_id": "fb50f32f-0dd1-4b47-983b-06b76e3ecaa9",
    "depth": 1,
    "stage_index": 1,
    "vitals": {
      "energy": 7,
      "comfort": 7,
      "breathing": 8
    },
    "mood": "perky",
    "narrative": "Mabel uses her rescue puffer with a spacer. Her chest still feels a little tight. She breathes a little steadier and looks perky.",
    "teaching": "A spacer helps the puff mist reach deep into the airways.",
    "animation_cue": "recovery",
    "memory": "First visit: wheezy. Tried \"Rescue puffer with spacer\" → tight."
  },
  {
    "id": "657f77ac-3861-4815-8e9d-f6a2f2b22b19",
    "patient_id": "fb50f32f-0dd1-4b47-983b-06b76e3ecaa9",
    "depth": 1,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 5
    },
    "mood": "droopy",
    "narrative": "Mabel buries her nose in dusty flowers. Now she struggles hard to breathe. She looks droopy and needs help right now.",
    "teaching": "Dust and pollen can irritate airways and make them tighter.",
    "animation_cue": "sick",
    "memory": "First visit: wheezy. Tried \"Bury nose in dusty flowers\" → struggling."
  },
  {
    "id": "57ae6184-fccf-4d06-bd9d-271ede83a506",
    "patient_id": "fb50f32f-0dd1-4b47-983b-06b76e3ecaa9",
    "depth": 1,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Mabel starts to shake the dusty blanket, but a helper gently stops her. She stays wheezy with whistly breaths. She does not get worse.",
    "teaching": "Shaking dusty cloths fills the air with dust that can tighten airways.",
    "animation_cue": "worried",
    "memory": "First visit: wheezy. A risky idea came up; we steered clear."
  },
  {
    "id": "07f86fa0-95ed-4343-b1e2-08c9d2a99fa7",
    "patient_id": "fb50f32f-0dd1-4b47-983b-06b76e3ecaa9",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 8,
      "comfort": 10,
      "breathing": 8
    },
    "mood": "perky",
    "narrative": "Mabel keeps sitting upright in the calm air. Her breathing feels clear and easy now. She looks perky and cozy.",
    "teaching": "Resting upright in calm air lets breathing stay slow and steady.",
    "animation_cue": "happy",
    "memory": "First visit: wheezy. Tried \"Sit upright in calm air\" → tight. Tried \"Sit upright in calm air\" → clear."
  },
  {
    "id": "7368ebee-4c51-494b-b0aa-b702c8e46a5a",
    "patient_id": "fb50f32f-0dd1-4b47-983b-06b76e3ecaa9",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 8,
      "comfort": 9,
      "breathing": 9
    },
    "mood": "perky",
    "narrative": "Mabel uses her rescue puffer with a spacer. Her breathing feels clear and easy now. She looks perky and calm.",
    "teaching": "A spacer helps more mist travel down to open airways.",
    "animation_cue": "happy",
    "memory": "First visit: wheezy. Tried \"Sit upright in calm air\" → tight. Tried \"Rescue puffer with spacer\" → clear."
  },
  {
    "id": "ff3c9bd6-d7de-4617-bd39-a30812a1d5a8",
    "patient_id": "fb50f32f-0dd1-4b47-983b-06b76e3ecaa9",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 7,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Mabel sniffs the dusty flowers. Her breath turns whistly and wheezy again. Her eyes look worried and droopy.",
    "teaching": "Flower pollen and dust can squeeze airways tighter.",
    "animation_cue": "sick",
    "memory": "First visit: wheezy. Tried \"Sit upright in calm air\" → tight. Tried \"Bury nose in dusty flowers\" → wheezy."
  },
  {
    "id": "868ccb25-67d3-4d4e-a4ef-d67630271b05",
    "patient_id": "fb50f32f-0dd1-4b47-983b-06b76e3ecaa9",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 7,
      "comfort": 8,
      "breathing": 7
    },
    "mood": "perky",
    "narrative": "Mabel starts to shake the dusty blanket, but a helper gently stops her. Her chest stays a little tight. She looks perky and safe.",
    "teaching": "Dusty air can bother airways, so helpers keep the air clean.",
    "animation_cue": "worried",
    "memory": "First visit: wheezy. Tried \"Sit upright in calm air\" → tight. A risky idea came up; we steered clear."
  },
  {
    "id": "adb19cd6-dada-40c4-be21-3a63cb191d89",
    "patient_id": "fb50f32f-0dd1-4b47-983b-06b76e3ecaa9",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 8,
      "comfort": 9,
      "breathing": 9
    },
    "mood": "perky",
    "narrative": "Mabel sits upright in calm air. Her breathing feels clear and easy now. She looks perky and rests softly.",
    "teaching": "Calm sitting helps lungs keep a slow, easy rhythm.",
    "animation_cue": "happy",
    "memory": "First visit: wheezy. Tried \"Rescue puffer with spacer\" → tight. Tried \"Sit upright in calm air\" → clear."
  },
  {
    "id": "0ead2762-6f71-4efe-8c31-0e9d6da47b7f",
    "patient_id": "fb50f32f-0dd1-4b47-983b-06b76e3ecaa9",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 10
    },
    "mood": "perky",
    "narrative": "Mabel uses her rescue puffer with a spacer again. Her breathing feels very clear and easy. She looks perky and bright.",
    "teaching": "Using a spacer helps the puff reach airways instead of the mouth.",
    "animation_cue": "happy",
    "memory": "First visit: wheezy. Tried \"Rescue puffer with spacer\" → tight. Tried \"Rescue puffer with spacer\" → clear."
  },
  {
    "id": "4c1de8b9-222d-451d-9082-f282cdf964ad",
    "patient_id": "fb50f32f-0dd1-4b47-983b-06b76e3ecaa9",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 7,
      "comfort": 7,
      "breathing": 7
    },
    "mood": "droopy",
    "narrative": "Mabel buries her nose in dusty flowers. Her breath sounds whistly and wheezy. She looks droopy and worried.",
    "teaching": "Pollen and dust are common triggers that tighten airways.",
    "animation_cue": "sick",
    "memory": "First visit: wheezy. Tried \"Rescue puffer with spacer\" → tight. Tried \"Bury nose in dusty flowers\" → wheezy."
  },
  {
    "id": "5a00ea4c-ce6d-4d32-93a4-6303e27f6221",
    "patient_id": "fb50f32f-0dd1-4b47-983b-06b76e3ecaa9",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 7,
      "comfort": 7,
      "breathing": 8
    },
    "mood": "perky",
    "narrative": "Mabel starts to shake the dusty blanket, but a helper gently stops her. Her chest stays a little tight. She looks perky.",
    "teaching": "Staying away from dust clouds helps airways stay open.",
    "animation_cue": "worried",
    "memory": "First visit: wheezy. Tried \"Rescue puffer with spacer\" → tight. A risky idea came up; we steered clear."
  },
  {
    "id": "f41f02b2-a798-4cf6-ad1e-7e249a0fecd1",
    "patient_id": "fb50f32f-0dd1-4b47-983b-06b76e3ecaa9",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Mabel sits upright in calm air. She still struggles hard to breathe. She looks droopy and needs help right now.",
    "teaching": "Upright sitting gives lungs room, but badly tight airways still need help.",
    "animation_cue": "worried",
    "memory": "First visit: wheezy. Tried \"Bury nose in dusty flowers\" → struggling. Tried \"Sit upright in calm air\" → struggling."
  },
  {
    "id": "3df3e7e4-67f9-4a0b-9f59-263dec0e4633",
    "patient_id": "fb50f32f-0dd1-4b47-983b-06b76e3ecaa9",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 7,
      "comfort": 7,
      "breathing": 7
    },
    "mood": "perky",
    "narrative": "Mabel uses her rescue puffer with a spacer. She still breathes wheezy with whistly sounds. She looks a little perkier.",
    "teaching": "The rescue puff helps relax tight muscles around airways.",
    "animation_cue": "recovery",
    "memory": "First visit: wheezy. Tried \"Bury nose in dusty flowers\" → struggling. Tried \"Rescue puffer with spacer\" → wheezy."
  },
  {
    "id": "2f14fc46-4245-491b-952a-b9fe0de2a5d1",
    "patient_id": "fb50f32f-0dd1-4b47-983b-06b76e3ecaa9",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 4
    },
    "mood": "droopy",
    "narrative": "Mabel sniffs the dusty flowers again. She struggles very hard to breathe now. She looks droopy and needs help right now.",
    "teaching": "More dust and pollen keeps squeezing airways tighter.",
    "animation_cue": "worried",
    "memory": "First visit: wheezy. Tried \"Bury nose in dusty flowers\" → struggling. Tried \"Bury nose in dusty flowers\" → struggling."
  },
  {
    "id": "c87d893b-c382-4484-83b2-851c21671267",
    "patient_id": "fb50f32f-0dd1-4b47-983b-06b76e3ecaa9",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 5
    },
    "mood": "droopy",
    "narrative": "Mabel starts to shake the dusty blanket, but a helper gently stops her. She stays struggling to breathe. She needs help right now.",
    "teaching": "Dust clouds can quickly tighten airways, so clean air matters.",
    "animation_cue": "worried",
    "memory": "First visit: wheezy. Tried \"Bury nose in dusty flowers\" → struggling. A risky idea came up; we steered clear."
  },
  {
    "id": "2515aa64-3cdc-472e-b2a9-a9ec0bb0ca11",
    "patient_id": "1949914c-8e7a-4297-bc6b-d120a45f7df3",
    "depth": 0,
    "stage_index": 1,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Milo sniffles and sneezes. He feels okay but low on pep. He breathes steady and watches the clinic room with curious eyes.",
    "teaching": "Rest and fluids let the body do its healing work.",
    "animation_cue": "idle",
    "memory": "First visit: sniffly."
  },
  {
    "id": "766da01d-1e2e-4c2d-bc63-99888fd2c57d",
    "patient_id": "1949914c-8e7a-4297-bc6b-d120a45f7df3",
    "depth": 1,
    "stage_index": 0,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Milo rests warm with water nearby. His nose feels clear. He looks perky and bright-eyed as he breathes easy.",
    "teaching": "Drinking water and resting help the body stay comfortable when sick.",
    "animation_cue": "happy",
    "memory": "First visit: sniffly. Tried \"Warm rest + fluids\" → breezy."
  },
  {
    "id": "f3c6603e-638d-4903-9092-5551340d17de",
    "patient_id": "1949914c-8e7a-4297-bc6b-d120a45f7df3",
    "depth": 1,
    "stage_index": 1,
    "vitals": {
      "energy": 6,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Milo sips warm soup. He still sniffles and sneezes. He feels okay and breathes steady while he holds the cozy bowl.",
    "teaching": "Warm soup and steam can soothe a scratchy throat and feel comforting.",
    "animation_cue": "worried",
    "memory": "First visit: sniffly. Tried \"Warm soup break\" → sniffly."
  },
  {
    "id": "4d12e81f-11ea-4c86-884a-9930dd61662a",
    "patient_id": "1949914c-8e7a-4297-bc6b-d120a45f7df3",
    "depth": 1,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Milo shares a cup with a friend. His forehead feels warm. He looks droopy with low pep as he breathes steady.",
    "teaching": "Sharing cups can pass germs from one mouth to another.",
    "animation_cue": "sick",
    "memory": "First visit: sniffly. Tried \"Share a cup with a friend\" → feverish."
  },
  {
    "id": "7cbe2de6-b046-4cd4-bc97-7eedd98a9cc2",
    "patient_id": "1949914c-8e7a-4297-bc6b-d120a45f7df3",
    "depth": 1,
    "stage_index": 1,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Milo stays cozy and sniffly. A helper gently stops the icy plunge. He feels okay and breathes steady, safe and held.",
    "teaching": "An ice bath can chill and scare a sick child, so helpers stop it.",
    "animation_cue": "worried",
    "memory": "First visit: sniffly. A risky idea came up; we steered clear."
  },
  {
    "id": "94817bed-5cfe-4603-a5a1-8dac0916940f",
    "patient_id": "1949914c-8e7a-4297-bc6b-d120a45f7df3",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 9,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "bright",
    "narrative": "Milo rests warm with fluids close by. His nose feels clear. He looks bright and happy as he breathes easy.",
    "teaching": "Rest plus steady sips of water help bodies stay cozy while healing.",
    "animation_cue": "idle",
    "memory": "First visit: sniffly. Tried \"Warm rest + fluids\" → breezy. Tried \"Warm rest + fluids\" → breezy."
  },
  {
    "id": "2a4d20ce-d811-4dcf-9a40-3cc1c0c2c4be",
    "patient_id": "1949914c-8e7a-4297-bc6b-d120a45f7df3",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 8,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "bright",
    "narrative": "Milo enjoys warm soup after rest. His nose feels clear. He looks bright and comfy as he breathes easy.",
    "teaching": "Warm soup adds fluids and comfort, which soothes when sniffly.",
    "animation_cue": "idle",
    "memory": "First visit: sniffly. Tried \"Warm rest + fluids\" → breezy. Tried \"Warm soup break\" → breezy."
  },
  {
    "id": "b7da9bee-83b1-445a-b3cf-fa4d614482fc",
    "patient_id": "1949914c-8e7a-4297-bc6b-d120a45f7df3",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Milo shares a cup with a friend. He sniffles and sneezes again. He feels okay and breathes steady with good energy.",
    "teaching": "Sharing cups can spread germs that travel to friends.",
    "animation_cue": "sick",
    "memory": "First visit: sniffly. Tried \"Warm rest + fluids\" → breezy. Tried \"Share a cup with a friend\" → sniffly."
  },
  {
    "id": "5dd8900b-aaad-4e19-a0c4-88d91921d259",
    "patient_id": "1949914c-8e7a-4297-bc6b-d120a45f7df3",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Milo stays breezy with a clear nose. A helper gently stops the icy plunge. He looks perky and breathes easy, safe and held.",
    "teaching": "Very chilly water can shock a sick body, so helpers keep kids warm.",
    "animation_cue": "worried",
    "memory": "First visit: sniffly. Tried \"Warm rest + fluids\" → breezy. A risky idea came up; we steered clear."
  },
  {
    "id": "882f0015-b20a-48d8-a943-ddf06bd4e763",
    "patient_id": "1949914c-8e7a-4297-bc6b-d120a45f7df3",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 8,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Milo rests warm with water nearby. His nose feels clear. He looks perky and comfy as he breathes easy.",
    "teaching": "Quiet rest and water breaks give the body time to heal.",
    "animation_cue": "happy",
    "memory": "First visit: sniffly. Tried \"Warm soup break\" → sniffly. Tried \"Warm rest + fluids\" → breezy."
  },
  {
    "id": "bd2dbd10-288a-4113-9805-8c920a729ed6",
    "patient_id": "1949914c-8e7a-4297-bc6b-d120a45f7df3",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 6,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Milo sips more warm soup. He still sniffles and sneezes. He feels okay and comfy as he breathes steady.",
    "teaching": "Warm fluids feel soothing and help keep little throats moist.",
    "animation_cue": "worried",
    "memory": "First visit: sniffly. Tried \"Warm soup break\" → sniffly. Tried \"Warm soup break\" → sniffly."
  },
  {
    "id": "cb1b9374-2534-4bf5-82a8-cfa6e5b03716",
    "patient_id": "1949914c-8e7a-4297-bc6b-d120a45f7df3",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Milo shares a cup with a friend. His forehead feels warm. He looks droopy with low pep as he breathes steady.",
    "teaching": "Germs travel in saliva, so friends use their own cups.",
    "animation_cue": "sick",
    "memory": "First visit: sniffly. Tried \"Warm soup break\" → sniffly. Tried \"Share a cup with a friend\" → feverish."
  },
  {
    "id": "8a85287c-6908-4fb5-863e-a708a395ad0d",
    "patient_id": "1949914c-8e7a-4297-bc6b-d120a45f7df3",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 6,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Milo stays sniffly with sniffles and sneezes. A helper gently stops the icy plunge. He feels okay and breathes steady.",
    "teaching": "Icy plunges chill sick kids, so helpers keep them warm.",
    "animation_cue": "worried",
    "memory": "First visit: sniffly. Tried \"Warm soup break\" → sniffly. A risky idea came up; we steered clear."
  },
  {
    "id": "c915e9dc-822d-4f00-b083-03008642a3c2",
    "patient_id": "1949914c-8e7a-4297-bc6b-d120a45f7df3",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Milo rests warm with water nearby. He still sniffles and sneezes. He looks perky and breathes steady.",
    "teaching": "Rest and water help the body feel better after sharing germs.",
    "animation_cue": "recovery",
    "memory": "First visit: sniffly. Tried \"Share a cup with a friend\" → feverish. Tried \"Warm rest + fluids\" → sniffly."
  },
  {
    "id": "9c9b0dee-25c7-482a-a1b0-2b443a34080e",
    "patient_id": "1949914c-8e7a-4297-bc6b-d120a45f7df3",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 7,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Milo sips warm soup. He still sniffles and sneezes. He looks perky and breathes steady with the cozy bowl.",
    "teaching": "Warm soup gives fluids and comfort, which helps when sniffly.",
    "animation_cue": "recovery",
    "memory": "First visit: sniffly. Tried \"Share a cup with a friend\" → feverish. Tried \"Warm soup break\" → sniffly."
  },
  {
    "id": "e218c6c9-347c-4b0a-a823-1182438d6699",
    "patient_id": "1949914c-8e7a-4297-bc6b-d120a45f7df3",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 4,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Milo shares a cup again. He feels wiped out and droopy. He needs blankets and rest as he breathes steady.",
    "teaching": "Sharing cups again and again spreads more germs to friends.",
    "animation_cue": "sick",
    "memory": "First visit: sniffly. Tried \"Share a cup with a friend\" → feverish. Tried \"Share a cup with a friend\" → wiped out."
  },
  {
    "id": "e81b8f42-0b9f-47df-a7fd-a95a533b3a90",
    "patient_id": "1949914c-8e7a-4297-bc6b-d120a45f7df3",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Milo stays feverish with a warm forehead. A helper gently stops the icy plunge. He looks droopy and breathes steady, safe and held.",
    "teaching": "Ice water can chill a feverish child fast, so helpers stop it.",
    "animation_cue": "worried",
    "memory": "First visit: sniffly. Tried \"Share a cup with a friend\" → feverish. A risky idea came up; we steered clear."
  },
  {
    "id": "707e10d8-3435-4ade-8361-7b0e20a31889",
    "patient_id": "a6a595b5-2f88-4349-80eb-9977a831cb36",
    "depth": 0,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Theo sits droopy and very thirsty. He feels dried out and slow, with low energy and low comfort. He needs gentle care now.",
    "teaching": "Small sips of water help replace fluid when a child feels dried out and thirsty.",
    "animation_cue": "idle",
    "memory": "First visit: dried out."
  },
  {
    "id": "c9f88954-918f-42e4-b5ce-9f386feb2446",
    "patient_id": "a6a595b5-2f88-4349-80eb-9977a831cb36",
    "depth": 1,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Theo sips cool water. He still feels a bit thirsty and dry, but he looks perky with better energy and comfort.",
    "teaching": "Small sips of plain water help the body feel better when thirsty.",
    "animation_cue": "recovery",
    "memory": "First visit: dried out. Tried \"Offer cool water\" → thirsty."
  },
  {
    "id": "401b7ef1-b93b-44fe-9091-d93b3e2946a2",
    "patient_id": "a6a595b5-2f88-4349-80eb-9977a831cb36",
    "depth": 1,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Theo rests in cool shade. He still feels a bit thirsty and dry, but he looks perky and a little more comfortable.",
    "teaching": "Resting in cool shade helps the body stay cool and lose less water.",
    "animation_cue": "recovery",
    "memory": "First visit: dried out. Tried \"Rest in the shade\" → thirsty."
  },
  {
    "id": "7f1c2af2-9d5f-4674-8dde-599049fcd064",
    "patient_id": "a6a595b5-2f88-4349-80eb-9977a831cb36",
    "depth": 1,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Theo drinks fizzy soda. He feels parched and all drooped out, with low energy and low comfort. He still needs care.",
    "teaching": "Sugary fizzy drinks do not hydrate like plain water does.",
    "animation_cue": "sick",
    "memory": "First visit: dried out. Tried \"Give fizzy soda\" → parched."
  },
  {
    "id": "b4f309ba-f836-444e-a8fa-690b9e503f99",
    "patient_id": "a6a595b5-2f88-4349-80eb-9977a831cb36",
    "depth": 1,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Theo reaches for a whole salt pouch, but a helper gently steps in and holds it steady. He stays dried out and droopy and very thirsty.",
    "teaching": "Eating plain salt by itself is unsafe and can make thirst worse.",
    "animation_cue": "worried",
    "memory": "First visit: dried out. A risky idea came up; we steered clear."
  },
  {
    "id": "69214798-2f39-4f38-9df1-708376909237",
    "patient_id": "a6a595b5-2f88-4349-80eb-9977a831cb36",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 10,
      "comfort": 10,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Theo sips cool water again. He feels good and bouncy now, looking perky with full energy and comfort.",
    "teaching": "Drinking plain water in small sips helps keep the body hydrated.",
    "animation_cue": "happy",
    "memory": "First visit: dried out. Tried \"Offer cool water\" → thirsty. Tried \"Offer cool water\" → sipped."
  },
  {
    "id": "ae78932a-7979-4fe3-ad18-fc4ce945a95f",
    "patient_id": "a6a595b5-2f88-4349-80eb-9977a831cb36",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 9,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Theo rests in the shade. He still feels a bit thirsty and dry, and he looks just okay with good energy.",
    "teaching": "Shade rest feels nice, but thirst still needs water to get better.",
    "animation_cue": "worried",
    "memory": "First visit: dried out. Tried \"Offer cool water\" → thirsty. Tried \"Rest in the shade\" → thirsty."
  },
  {
    "id": "19f978db-5536-40d6-8936-bc5de67d4e78",
    "patient_id": "a6a595b5-2f88-4349-80eb-9977a831cb36",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Theo drinks fizzy soda. He feels dried out again, droopy and very thirsty, with less comfort.",
    "teaching": "Fizzy sugary drinks do not replace lost body water like plain water does.",
    "animation_cue": "sick",
    "memory": "First visit: dried out. Tried \"Offer cool water\" → thirsty. Tried \"Give fizzy soda\" → dried out."
  },
  {
    "id": "8e4866d9-04f6-4c11-ae5c-3c4d645affc7",
    "patient_id": "a6a595b5-2f88-4349-80eb-9977a831cb36",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Theo reaches for a whole salt pouch, but a helper gently steps in. He stays thirsty and a bit dry, still looking perky.",
    "teaching": "Eating lots of plain salt is unsafe and makes the body thirstier.",
    "animation_cue": "worried",
    "memory": "First visit: dried out. Tried \"Offer cool water\" → thirsty. A risky idea came up; we steered clear."
  },
  {
    "id": "25ebb5a6-be56-4438-af35-8427e4d99b2f",
    "patient_id": "a6a595b5-2f88-4349-80eb-9977a831cb36",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 10,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Theo sips cool water after shade rest. He feels good and bouncy now, looking perky with high energy.",
    "teaching": "Plain water after rest helps the body feel fresh and hydrated.",
    "animation_cue": "happy",
    "memory": "First visit: dried out. Tried \"Rest in the shade\" → thirsty. Tried \"Offer cool water\" → sipped."
  },
  {
    "id": "3edeb209-ef5e-4d28-ad0b-f96db21a4563",
    "patient_id": "a6a595b5-2f88-4349-80eb-9977a831cb36",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 9,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Theo keeps resting in shade. He still feels a bit thirsty and dry, looking just okay.",
    "teaching": "Rest saves energy, but only fluids fix thirst.",
    "animation_cue": "worried",
    "memory": "First visit: dried out. Tried \"Rest in the shade\" → thirsty. Tried \"Rest in the shade\" → thirsty."
  },
  {
    "id": "03d0c10a-fbb9-4e61-8093-55751c196539",
    "patient_id": "a6a595b5-2f88-4349-80eb-9977a831cb36",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 8,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Theo drinks fizzy soda. He feels dried out and droopy and very thirsty, with low comfort.",
    "teaching": "Sugary fizzy drinks do not hydrate the body like water does.",
    "animation_cue": "sick",
    "memory": "First visit: dried out. Tried \"Rest in the shade\" → thirsty. Tried \"Give fizzy soda\" → dried out."
  },
  {
    "id": "802f55a6-6cc0-4ad5-bf00-2c4adb8f69f9",
    "patient_id": "a6a595b5-2f88-4349-80eb-9977a831cb36",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Theo reaches for a whole salt pouch, but a helper gently steps in. He stays thirsty and a bit dry, still perky.",
    "teaching": "Too much plain salt at once is unsafe for children.",
    "animation_cue": "worried",
    "memory": "First visit: dried out. Tried \"Rest in the shade\" → thirsty. A risky idea came up; we steered clear."
  },
  {
    "id": "5d70cec2-dce5-4a74-98ef-ad1ee56d7123",
    "patient_id": "a6a595b5-2f88-4349-80eb-9977a831cb36",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Theo sips cool water. He still feels dried out and very thirsty, but he looks a little perkier with better energy.",
    "teaching": "Small sips of plain water help the body recover after sugary drinks.",
    "animation_cue": "recovery",
    "memory": "First visit: dried out. Tried \"Give fizzy soda\" → parched. Tried \"Offer cool water\" → dried out."
  },
  {
    "id": "bf9936d2-5f53-4173-9f71-f53e75c76625",
    "patient_id": "a6a595b5-2f88-4349-80eb-9977a831cb36",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 7,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Theo rests in shade. He feels parched and all drooped out, with low energy and comfort. He needs care.",
    "teaching": "Cool shade helps the body rest, but thirst still needs water.",
    "animation_cue": "worried",
    "memory": "First visit: dried out. Tried \"Give fizzy soda\" → parched. Tried \"Rest in the shade\" → parched."
  },
  {
    "id": "618572b3-eb14-45d9-811e-53a7e21909cc",
    "patient_id": "a6a595b5-2f88-4349-80eb-9977a831cb36",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 4,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Theo drinks more fizzy soda. He feels parched and all drooped out, with very low energy and comfort.",
    "teaching": "More sugary soda does not help thirst. Plain water hydrates best.",
    "animation_cue": "worried",
    "memory": "First visit: dried out. Tried \"Give fizzy soda\" → parched. Tried \"Give fizzy soda\" → parched."
  },
  {
    "id": "7d94ad4a-d104-44b2-a76c-11ba1d3e7f87",
    "patient_id": "a6a595b5-2f88-4349-80eb-9977a831cb36",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Theo reaches for a whole salt pouch, but a helper gently steps in and holds it steady. He stays parched and drooped out.",
    "teaching": "Eating plain salt is unsafe and can make thirst worse.",
    "animation_cue": "worried",
    "memory": "First visit: dried out. Tried \"Give fizzy soda\" → parched. A risky idea came up; we steered clear."
  },
  {
    "id": "c95cfbe4-2fbd-44bb-ae0e-fb677be73fd6",
    "patient_id": "90489b94-866b-415b-a602-dd61a18e638b",
    "depth": 0,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Wren rests in the cozy clinic chair. Their pressure is running high and needs a steadier routine. They feel droopy today. Their breathing stays even. They move with quiet energy and okay comfort while the brave heart-warrior waits with the team.",
    "teaching": "Steady play, sleep, and less salty food help keep blood pressure in a healthy range.",
    "animation_cue": "idle",
    "memory": "First visit: running high."
  },
  {
    "id": "2e3e38ee-241f-4f2f-9fb3-4fccb0705266",
    "patient_id": "90489b94-866b-415b-a602-dd61a18e638b",
    "depth": 1,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Wren takes a gentle walk by the sunny window. Their pressure is creeping up and feels a little tense. They look perky. Their breathing stays even. They move with good energy and cozy comfort like a brave heart-warrior on a stroll.",
    "teaching": "Daily walks and less salt help the heart and blood vessels keep pressure healthy.",
    "animation_cue": "recovery",
    "memory": "First visit: running high. Tried \"Daily walks, less salt\" → creeping up."
  },
  {
    "id": "92de47c1-528c-4e18-8135-cfce5bcb9cf9",
    "patient_id": "90489b94-866b-415b-a602-dd61a18e638b",
    "depth": 1,
    "stage_index": 1,
    "vitals": {
      "energy": 7,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Wren sits with the nurse for morning medicine time. Their pressure is creeping up and feels a little tense. They look perky. Their breathing stays even. They show steady energy and comfy ease as the brave heart-warrior follows the plan.",
    "teaching": "Taking prescribed blood pressure medicine exactly as told helps keep pressure steady over time.",
    "animation_cue": "recovery",
    "memory": "First visit: running high. Tried \"Take prescribed medicine\" → creeping up."
  },
  {
    "id": "c3e8605d-e677-4100-aaf3-dff3b5d0e744",
    "patient_id": "90489b94-866b-415b-a602-dd61a18e638b",
    "depth": 1,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Wren sits quietly with hands in lap. Their pressure is very high and needs care and a plan. They feel droopy. Their breathing stays even. They move with quiet energy and a little discomfort while the team stays close.",
    "teaching": "Skipping blood pressure medicine lets pressure rise again, even when a child feels fine.",
    "animation_cue": "sick",
    "memory": "First visit: running high. Tried \"Skip meds — feeling fine!\" → very high."
  },
  {
    "id": "04a14d4a-8dea-4988-a94a-7bd60d58e24c",
    "patient_id": "90489b94-866b-415b-a602-dd61a18e638b",
    "depth": 1,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Wren waits in the cozy clinic chair. Their pressure is running high and is held steady for safety. They feel droopy. Their breathing stays even. They rest with quiet energy and okay comfort while the team gently steps in.",
    "teaching": "Extra medicine can make blood pressure drop too low, so only a care team decides changes.",
    "animation_cue": "worried",
    "memory": "First visit: running high. A risky idea came up; we steered clear."
  },
  {
    "id": "2ab6d4f5-dacb-4510-a400-98f9ccf3b8a0",
    "patient_id": "90489b94-866b-415b-a602-dd61a18e638b",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 10,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Wren skips lightly around the play corner. Their pressure is steady, calm and even. They look perky and bright. Their breathing stays even. They buzz with lots of energy and cozy comfort like a brave heart-warrior at play.",
    "teaching": "Daily play and less salty snacks help blood vessels stay relaxed and pressure steady.",
    "animation_cue": "happy",
    "memory": "First visit: running high. Tried \"Daily walks, less salt\" → creeping up. Tried \"Daily walks, less salt\" → steady."
  },
  {
    "id": "6d0d0525-23e7-48af-ba2c-48aa71550ad1",
    "patient_id": "90489b94-866b-415b-a602-dd61a18e638b",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Wren sits calmly for medicine time after a walk. Their pressure is creeping up and feels a little tense. They feel okay. Their breathing stays even. They move with good energy and comfy ease beside the team.",
    "teaching": "Taking prescribed medicine exactly as told helps keep blood pressure steady each day.",
    "animation_cue": "worried",
    "memory": "First visit: running high. Tried \"Daily walks, less salt\" → creeping up. Tried \"Take prescribed medicine\" → creeping up."
  },
  {
    "id": "a3e57873-982a-4bf5-8cf5-4fe9c97f654b",
    "patient_id": "90489b94-866b-415b-a602-dd61a18e638b",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 8,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Wren rests on the soft bench after skipping a dose. Their pressure is running high and needs a steadier routine. They feel droopy. Their breathing stays even. They keep good energy but sit with okay comfort today.",
    "teaching": "Skipping medicine lets pressure climb back up, even when energy still feels good.",
    "animation_cue": "sick",
    "memory": "First visit: running high. Tried \"Daily walks, less salt\" → creeping up. Tried \"Skip meds — feeling fine!\" → running high."
  },
  {
    "id": "54904aca-8395-4e70-b1e5-b9a4c12ca2bb",
    "patient_id": "90489b94-866b-415b-a602-dd61a18e638b",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Wren pauses by the nurse cart. Their pressure is creeping up and is held steady for safety. They look perky. Their breathing stays even. They hold good energy and cozy comfort while the team gently steps in.",
    "teaching": "More medicine is not better and can be unsafe, so the care team keeps the plan steady.",
    "animation_cue": "worried",
    "memory": "First visit: running high. Tried \"Daily walks, less salt\" → creeping up. A risky idea came up; we steered clear."
  },
  {
    "id": "339ebe0c-43bf-4091-a353-61c0ae18be58",
    "patient_id": "90489b94-866b-415b-a602-dd61a18e638b",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 9,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Wren strolls happily with the sunny hallway. Their pressure is steady, calm and even. They look perky. Their breathing stays even. They shine with lots of energy and very cozy comfort as a brave heart-warrior.",
    "teaching": "Regular walks and fruits, vegetables, and lower-salt foods support healthy blood pressure.",
    "animation_cue": "happy",
    "memory": "First visit: running high. Tried \"Take prescribed medicine\" → creeping up. Tried \"Daily walks, less salt\" → steady."
  },
  {
    "id": "95c2083f-6dd7-48c7-ba58-f6484eafaa4d",
    "patient_id": "90489b94-866b-415b-a602-dd61a18e638b",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 7,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Wren sits quietly for another medicine time. Their pressure is creeping up and feels a little tense. They feel okay. Their breathing stays even. They show steady energy and very cozy comfort with the team.",
    "teaching": "Blood pressure medicine works best when taken exactly as prescribed, not extra or skipped.",
    "animation_cue": "worried",
    "memory": "First visit: running high. Tried \"Take prescribed medicine\" → creeping up. Tried \"Take prescribed medicine\" → creeping up."
  },
  {
    "id": "5d9e0707-94f5-4bd5-9bd0-b2e3d7386b16",
    "patient_id": "90489b94-866b-415b-a602-dd61a18e638b",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 7,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Wren curls up in the big chair. Their pressure is running high and needs a steadier routine. They feel droopy. Their breathing stays even. They keep steady energy and cozy comfort while the team watches kindly.",
    "teaching": "Missing medicine lets pressure rise again, even if the day still feels normal.",
    "animation_cue": "sick",
    "memory": "First visit: running high. Tried \"Take prescribed medicine\" → creeping up. Tried \"Skip meds — feeling fine!\" → running high."
  },
  {
    "id": "b004159d-b005-4762-92fc-e7aa7113cf9e",
    "patient_id": "90489b94-866b-415b-a602-dd61a18e638b",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 7,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Wren stands by the medicine tray. Their pressure is creeping up and is held steady for safety. They look perky. Their breathing stays even. They hold steady energy and comfy ease while the team gently steps in.",
    "teaching": "Doubling medicine can be unsafe, so any change always needs the care team first.",
    "animation_cue": "worried",
    "memory": "First visit: running high. Tried \"Take prescribed medicine\" → creeping up. A risky idea came up; we steered clear."
  },
  {
    "id": "4a31b021-204b-4287-af3b-e3880ec8aa79",
    "patient_id": "90489b94-866b-415b-a602-dd61a18e638b",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 7,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Wren takes a slow walk with the helper. Their pressure is very high and needs care and a plan. They feel droopy. Their breathing stays even. They keep steady energy but feel a little uncomfortable today.",
    "teaching": "Gentle daily walks help the heart, but they cannot replace prescribed blood pressure medicine.",
    "animation_cue": "worried",
    "memory": "First visit: running high. Tried \"Skip meds — feeling fine!\" → very high. Tried \"Daily walks, less salt\" → very high."
  },
  {
    "id": "abe80be3-a7a8-4c24-8647-5b0698202e46",
    "patient_id": "90489b94-866b-415b-a602-dd61a18e638b",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 7,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Wren returns for medicine time with the team. Their pressure is running high and needs a steadier routine. They look perky. Their breathing stays even. They show steady energy and cozy comfort as the brave heart-warrior rejoins the plan.",
    "teaching": "Getting back on the prescribed plan helps guide pressure back toward a healthy range.",
    "animation_cue": "recovery",
    "memory": "First visit: running high. Tried \"Skip meds — feeling fine!\" → very high. Tried \"Take prescribed medicine\" → running high."
  },
  {
    "id": "8c374989-fd92-43cb-9659-f55a91dc8d3d",
    "patient_id": "90489b94-866b-415b-a602-dd61a18e638b",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 4,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Wren lies still on the cozy cot. Their pressure is very high and needs care and a plan. They feel droopy. Their breathing stays even. They rest with quiet energy and low comfort while the team stays near.",
    "teaching": "Skipping medicine again and again keeps pressure very high, so the care team must help.",
    "animation_cue": "worried",
    "memory": "First visit: running high. Tried \"Skip meds — feeling fine!\" → very high. Tried \"Skip meds — feeling fine!\" → very high."
  },
  {
    "id": "761a38aa-a3d6-49c2-b00c-27a903bc1fd6",
    "patient_id": "90489b94-866b-415b-a602-dd61a18e638b",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Wren waits sleepily in the chair. Their pressure is very high and is held steady for safety. They feel droopy. Their breathing stays even. They rest with quiet energy and a little discomfort while the team gently steps in.",
    "teaching": "Extra doses do not fix missed doses and can be unsafe, so the team keeps it steady.",
    "animation_cue": "worried",
    "memory": "First visit: running high. Tried \"Skip meds — feeling fine!\" → very high. A risky idea came up; we steered clear."
  },
  {
    "id": "ccb78d98-90e0-42ef-8f27-e66c2e0a8ecc",
    "patient_id": "bf387fe0-b314-464e-94ae-1e8cd5b04e8d",
    "depth": 0,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "June rests with whistly breaths and worried eyes. Her chest feels wheezy and heavy. She looks droopy and tired as kind help stays near her.",
    "teaching": "Sitting upright and staying calm gives airways more room to relax.",
    "animation_cue": "idle",
    "memory": "First visit: wheezy."
  },
  {
    "id": "150f7dd5-8d5c-4e29-8e76-b876a68c6c3e",
    "patient_id": "bf387fe0-b314-464e-94ae-1e8cd5b04e8d",
    "depth": 1,
    "stage_index": 1,
    "vitals": {
      "energy": 7,
      "comfort": 8,
      "breathing": 7
    },
    "mood": "perky",
    "narrative": "June sits upright in calm, clean air. Her chest still feels a little tight, but breaths come a bit easier. She looks perky and more comfortable.",
    "teaching": "Sitting upright and breathing calm air helps keep airways open and relaxed.",
    "animation_cue": "recovery",
    "memory": "First visit: wheezy. Tried \"Sit upright in calm air\" → tight."
  },
  {
    "id": "108babef-e8eb-4f0a-a13a-a4b38912a67f",
    "patient_id": "bf387fe0-b314-464e-94ae-1e8cd5b04e8d",
    "depth": 1,
    "stage_index": 1,
    "vitals": {
      "energy": 7,
      "comfort": 7,
      "breathing": 8
    },
    "mood": "perky",
    "narrative": "June uses her rescue puffer with a spacer. Her chest still feels a little tight, but air moves better. She looks perky and calmer.",
    "teaching": "A spacer helps more mist reach the airways where it can open tight muscles.",
    "animation_cue": "recovery",
    "memory": "First visit: wheezy. Tried \"Rescue puffer with spacer\" → tight."
  },
  {
    "id": "b1e1f471-88d7-4477-ba01-0435cf5f250e",
    "patient_id": "bf387fe0-b314-464e-94ae-1e8cd5b04e8d",
    "depth": 1,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 5
    },
    "mood": "droopy",
    "narrative": "June buries her nose in dusty flowers. Now she struggles hard to breathe and needs help right now. She looks droopy and uncomfortable.",
    "teaching": "Dust and pollen can irritate airways and make them squeeze tighter.",
    "animation_cue": "sick",
    "memory": "First visit: wheezy. Tried \"Bury nose in dusty flowers\" → struggling."
  },
  {
    "id": "cdf7d52f-43b2-4ba7-83ba-b25e8434c7a1",
    "patient_id": "bf387fe0-b314-464e-94ae-1e8cd5b04e8d",
    "depth": 1,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "June stays still as a grown-up gently stops the dusty blanket. Her breaths stay whistly and wheezy. She looks droopy as the room stays calm and safe.",
    "teaching": "Shaking dust indoors can fill the air and quickly tighten sensitive airways.",
    "animation_cue": "worried",
    "memory": "First visit: wheezy. A risky idea came up; we steered clear."
  },
  {
    "id": "cc757a7a-16ed-4c32-88c1-6747f9184ed9",
    "patient_id": "bf387fe0-b314-464e-94ae-1e8cd5b04e8d",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 8,
      "comfort": 10,
      "breathing": 8
    },
    "mood": "perky",
    "narrative": "June keeps resting upright in calm air. Now her breathing feels clear and easy. She looks perky, bright, and very comfortable.",
    "teaching": "Calm, clean air lets airways stay relaxed and open.",
    "animation_cue": "happy",
    "memory": "First visit: wheezy. Tried \"Sit upright in calm air\" → tight. Tried \"Sit upright in calm air\" → clear."
  },
  {
    "id": "a2e241d0-0ea7-4791-a1af-773605b2da03",
    "patient_id": "bf387fe0-b314-464e-94ae-1e8cd5b04e8d",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 8,
      "comfort": 9,
      "breathing": 9
    },
    "mood": "perky",
    "narrative": "June finishes her rescue puffer with a spacer. Now her breathing feels clear and easy. She sits perky and comfortable in the soft light.",
    "teaching": "Using a spacer slows the mist so lungs can breathe in more of it.",
    "animation_cue": "happy",
    "memory": "First visit: wheezy. Tried \"Sit upright in calm air\" → tight. Tried \"Rescue puffer with spacer\" → clear."
  },
  {
    "id": "fcfba0fc-11f8-4a22-803c-b95d151c8634",
    "patient_id": "bf387fe0-b314-464e-94ae-1e8cd5b04e8d",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 7,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "June leans into dusty flowers. Her breaths turn whistly and wheezy, and her eyes look worried. She stays fairly comfortable but looks droopy.",
    "teaching": "Dust and pollen can irritate airways and make breathing whistly.",
    "animation_cue": "sick",
    "memory": "First visit: wheezy. Tried \"Sit upright in calm air\" → tight. Tried \"Bury nose in dusty flowers\" → wheezy."
  },
  {
    "id": "089179a8-13a0-4755-ab6c-c99e159d443e",
    "patient_id": "bf387fe0-b314-464e-94ae-1e8cd5b04e8d",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 7,
      "comfort": 8,
      "breathing": 7
    },
    "mood": "perky",
    "narrative": "A grown-up gently stops June before the dusty blanket shakes. Her chest stays only a little tight. She looks perky and comfortable as clean air stays around her.",
    "teaching": "A dust cloud can quickly tighten airways, so a helper keeps the air clean.",
    "animation_cue": "worried",
    "memory": "First visit: wheezy. Tried \"Sit upright in calm air\" → tight. A risky idea came up; we steered clear."
  },
  {
    "id": "e3fb2d86-e927-4300-8367-ee4b0bb50b0b",
    "patient_id": "bf387fe0-b314-464e-94ae-1e8cd5b04e8d",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 8,
      "comfort": 9,
      "breathing": 9
    },
    "mood": "perky",
    "narrative": "June rests upright in calm air. Her breathing feels clear and easy now. She looks perky and comfortable in the cozy room.",
    "teaching": "Resting upright gives lungs space and helps air move easily.",
    "animation_cue": "happy",
    "memory": "First visit: wheezy. Tried \"Rescue puffer with spacer\" → tight. Tried \"Sit upright in calm air\" → clear."
  },
  {
    "id": "01727f9c-7476-4957-86db-ff0d5dad010b",
    "patient_id": "bf387fe0-b314-464e-94ae-1e8cd5b04e8d",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 10
    },
    "mood": "perky",
    "narrative": "June rests after her puffer with a spacer. Her breathing feels clear, easy, and full. She looks perky and bright.",
    "teaching": "A spacer holds the mist so slow, deep breaths can carry it into airways.",
    "animation_cue": "happy",
    "memory": "First visit: wheezy. Tried \"Rescue puffer with spacer\" → tight. Tried \"Rescue puffer with spacer\" → clear."
  },
  {
    "id": "a9c7b2aa-7604-4044-8176-2a8b7c5214ed",
    "patient_id": "bf387fe0-b314-464e-94ae-1e8cd5b04e8d",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 7,
      "comfort": 7,
      "breathing": 7
    },
    "mood": "droopy",
    "narrative": "June sniffs dusty flowers. Her breaths turn whistly and wheezy, and her eyes look worried. She seems droopy and less at ease.",
    "teaching": "Pollen and dust can bother airways and make them squeeze tighter.",
    "animation_cue": "sick",
    "memory": "First visit: wheezy. Tried \"Rescue puffer with spacer\" → tight. Tried \"Bury nose in dusty flowers\" → wheezy."
  },
  {
    "id": "68aaa212-5883-4f43-978a-2a14855218ab",
    "patient_id": "bf387fe0-b314-464e-94ae-1e8cd5b04e8d",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 7,
      "comfort": 7,
      "breathing": 8
    },
    "mood": "perky",
    "narrative": "A grown-up gently stops the dusty blanket in time. June's chest stays only a little tight. She looks perky as the air stays clean.",
    "teaching": "Dusty air can quickly tighten airways, so clean air keeps breathing safer.",
    "animation_cue": "worried",
    "memory": "First visit: wheezy. Tried \"Rescue puffer with spacer\" → tight. A risky idea came up; we steered clear."
  },
  {
    "id": "54ad0bec-17e6-4c29-9124-f3a69c6180e8",
    "patient_id": "bf387fe0-b314-464e-94ae-1e8cd5b04e8d",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "June sits upright in calm air. She still struggles hard to breathe and needs help right now. She looks droopy, though a touch more comfortable.",
    "teaching": "Sitting upright in calm air gives tight airways the best chance to relax.",
    "animation_cue": "worried",
    "memory": "First visit: wheezy. Tried \"Bury nose in dusty flowers\" → struggling. Tried \"Sit upright in calm air\" → struggling."
  },
  {
    "id": "9367cc3e-cff1-412e-82dd-996afc9c7339",
    "patient_id": "bf387fe0-b314-464e-94ae-1e8cd5b04e8d",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 7,
      "comfort": 7,
      "breathing": 7
    },
    "mood": "perky",
    "narrative": "June uses her rescue puffer with a spacer. Her breaths are still whistly and wheezy. She looks a little perkier as she rests.",
    "teaching": "The rescue puffer helps relax tight muscles around the airways.",
    "animation_cue": "recovery",
    "memory": "First visit: wheezy. Tried \"Bury nose in dusty flowers\" → struggling. Tried \"Rescue puffer with spacer\" → wheezy."
  },
  {
    "id": "ab137cf1-4a0e-4ffe-974e-bde50e106f7d",
    "patient_id": "bf387fe0-b314-464e-94ae-1e8cd5b04e8d",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 4
    },
    "mood": "droopy",
    "narrative": "June sniffs the dusty flowers again. Now she struggles hard to breathe and needs help right now. She looks very droopy and uncomfortable.",
    "teaching": "More dust and pollen can make irritated airways even tighter.",
    "animation_cue": "worried",
    "memory": "First visit: wheezy. Tried \"Bury nose in dusty flowers\" → struggling. Tried \"Bury nose in dusty flowers\" → struggling."
  },
  {
    "id": "4f25170a-391f-4657-823c-eeb805f5ad0b",
    "patient_id": "bf387fe0-b314-464e-94ae-1e8cd5b04e8d",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 5
    },
    "mood": "droopy",
    "narrative": "A grown-up gently stops the dusty blanket before it shakes. June still struggles hard to breathe and needs help now. She stays droopy and still.",
    "teaching": "A big dust cloud can make struggling airways worse, so helpers step in.",
    "animation_cue": "worried",
    "memory": "First visit: wheezy. Tried \"Bury nose in dusty flowers\" → struggling. A risky idea came up; we steered clear."
  },
  {
    "id": "38e22b2b-4314-407a-8b7b-b17cd6d077d2",
    "patient_id": "3ecf0a2a-0ebf-42be-86cd-ffc87a837199",
    "depth": 0,
    "stage_index": 1,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Otis sits in the cozy clinic with sniffles and sneezes. He feels okay but low on pep. He cracks a small joke between sneezes. The blanket is soft around him.",
    "teaching": "Rest and fluids help the body fight germs while it heals.",
    "animation_cue": "idle",
    "memory": "First visit: sniffly."
  },
  {
    "id": "87e9c146-fb1a-4496-a934-eceda31b53cf",
    "patient_id": "3ecf0a2a-0ebf-42be-86cd-ffc87a837199",
    "depth": 1,
    "stage_index": 0,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Otis rests warm with water nearby. His nose is clear and he feels perky. He tells a silly joke and smiles big. His breathing stays steady.",
    "teaching": "Rest and drinking fluids help the body recover when sick.",
    "animation_cue": "happy",
    "memory": "First visit: sniffly. Tried \"Warm rest + fluids\" → breezy."
  },
  {
    "id": "ed9003ff-0a5d-4756-a45c-0ab05830a329",
    "patient_id": "3ecf0a2a-0ebf-42be-86cd-ffc87a837199",
    "depth": 1,
    "stage_index": 1,
    "vitals": {
      "energy": 6,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Otis sips warm soup in bed. He still has sniffles and sneezes. He feels okay and a little comforted. He shares a gentle joke between sips.",
    "teaching": "Warm soup soothes the throat and adds fluids that comfort a sick body.",
    "animation_cue": "worried",
    "memory": "First visit: sniffly. Tried \"Warm soup break\" → sniffly."
  },
  {
    "id": "d60961fe-799f-428c-9549-d7cc9c285051",
    "patient_id": "3ecf0a2a-0ebf-42be-86cd-ffc87a837199",
    "depth": 1,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Otis shares a cup with a friend. Now his forehead feels warm and he has low pep. He feels droopy and quiet. He leans back to rest.",
    "teaching": "Sharing cups can pass germs from mouth to mouth between friends.",
    "animation_cue": "sick",
    "memory": "First visit: sniffly. Tried \"Share a cup with a friend\" → feverish."
  },
  {
    "id": "15197ed3-358c-4a26-b38a-ae2c408e5e9e",
    "patient_id": "3ecf0a2a-0ebf-42be-86cd-ffc87a837199",
    "depth": 1,
    "stage_index": 1,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "The nurse gently stops the ice bath. Otis stays cozy and safe. He still has sniffles and sneezes. He feels okay and cracks a weak joke.",
    "teaching": "A sudden ice plunge can chill and shock a sick body badly.",
    "animation_cue": "worried",
    "memory": "First visit: sniffly. A risky idea came up; we steered clear."
  },
  {
    "id": "f95514bf-bf82-445e-a517-83fe09acaa47",
    "patient_id": "3ecf0a2a-0ebf-42be-86cd-ffc87a837199",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 9,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "bright",
    "narrative": "Otis keeps resting warm with fluids. His nose is clear and he feels bright. He tells jokes with lots of energy. He looks cozy and comfortable.",
    "teaching": "Continued rest and fluids help the body stay strong while healing.",
    "animation_cue": "idle",
    "memory": "First visit: sniffly. Tried \"Warm rest + fluids\" → breezy. Tried \"Warm rest + fluids\" → breezy."
  },
  {
    "id": "c99a2285-09dc-45be-90ef-23a4d0515c0e",
    "patient_id": "3ecf0a2a-0ebf-42be-86cd-ffc87a837199",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 8,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "bright",
    "narrative": "Otis enjoys warm soup after rest. His nose is clear and he feels bright. He jokes happily and feels very comfortable. His breathing stays steady.",
    "teaching": "Warm soup adds fluids and comfort that soothe while resting.",
    "animation_cue": "idle",
    "memory": "First visit: sniffly. Tried \"Warm rest + fluids\" → breezy. Tried \"Warm soup break\" → breezy."
  },
  {
    "id": "77ed9e1d-1432-463e-b1ac-9fac5fb53cae",
    "patient_id": "3ecf0a2a-0ebf-42be-86cd-ffc87a837199",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Otis shares a cup with a friend. He still has sniffles and sneezes. He feels okay with fair energy. He pauses his jokes to blow his nose.",
    "teaching": "Even when feeling better, sharing cups can pass germs and bring sniffles back.",
    "animation_cue": "sick",
    "memory": "First visit: sniffly. Tried \"Warm rest + fluids\" → breezy. Tried \"Share a cup with a friend\" → sniffly."
  },
  {
    "id": "95fe81b2-6fb4-4f71-b0ec-84e5b492b3f7",
    "patient_id": "3ecf0a2a-0ebf-42be-86cd-ffc87a837199",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "The nurse gently stops the ice bath. Otis stays warm and safe. His nose is clear and he feels perky. He tells a joke and smiles.",
    "teaching": "A sudden ice plunge can chill a healing body, so helpers stop it.",
    "animation_cue": "worried",
    "memory": "First visit: sniffly. Tried \"Warm rest + fluids\" → breezy. A risky idea came up; we steered clear."
  },
  {
    "id": "df7c55f1-f3bd-474e-acf6-210ade5297e2",
    "patient_id": "3ecf0a2a-0ebf-42be-86cd-ffc87a837199",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 8,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Otis settles into warm rest with fluids. His nose is clear and he feels perky. He cracks a joke with good energy. He looks cozy and comfortable.",
    "teaching": "Rest and fluids after soup help the body finish healing.",
    "animation_cue": "happy",
    "memory": "First visit: sniffly. Tried \"Warm soup break\" → sniffly. Tried \"Warm rest + fluids\" → breezy."
  },
  {
    "id": "df7ba37d-5a78-4b88-a7d1-587fe9564131",
    "patient_id": "3ecf0a2a-0ebf-42be-86cd-ffc87a837199",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 6,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Otis has another warm soup break. He still has sniffles and sneezes. He feels okay and quite comfortable. He tells a soft joke.",
    "teaching": "Warm soup comforts but extra rest and fluids help healing most.",
    "animation_cue": "worried",
    "memory": "First visit: sniffly. Tried \"Warm soup break\" → sniffly. Tried \"Warm soup break\" → sniffly."
  },
  {
    "id": "b5e3f47b-8a47-4853-a0a7-2ad6fd8ac19a",
    "patient_id": "3ecf0a2a-0ebf-42be-86cd-ffc87a837199",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Otis shares a cup with a friend. Now his forehead feels warm and he has low pep. He feels droopy. He rests quietly without jokes.",
    "teaching": "Sharing cups can pass germs that make fevers and sickness worse.",
    "animation_cue": "sick",
    "memory": "First visit: sniffly. Tried \"Warm soup break\" → sniffly. Tried \"Share a cup with a friend\" → feverish."
  },
  {
    "id": "2ea3fd4e-e0d5-45c4-900f-04d919c43a19",
    "patient_id": "3ecf0a2a-0ebf-42be-86cd-ffc87a837199",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 6,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "The nurse gently stops the ice bath. Otis stays warm and cozy. He still has sniffles and sneezes. He feels okay and sips soup.",
    "teaching": "A sudden ice plunge can harm a sick body, so helpers step in.",
    "animation_cue": "worried",
    "memory": "First visit: sniffly. Tried \"Warm soup break\" → sniffly. A risky idea came up; we steered clear."
  },
  {
    "id": "102fce89-fce4-4b80-9f8a-fe6e48d940ef",
    "patient_id": "3ecf0a2a-0ebf-42be-86cd-ffc87a837199",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Otis gets warm rest with fluids. He still has sniffles and sneezes. He feels perky with better energy. He tries a small joke.",
    "teaching": "Rest and fluids help the body fight germs after sharing germs.",
    "animation_cue": "recovery",
    "memory": "First visit: sniffly. Tried \"Share a cup with a friend\" → feverish. Tried \"Warm rest + fluids\" → sniffly."
  },
  {
    "id": "691cbaa9-6f97-4b71-aca5-4768c4eafb33",
    "patient_id": "3ecf0a2a-0ebf-42be-86cd-ffc87a837199",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 7,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Otis takes a warm soup break. He still has sniffles and sneezes. He feels perky with a little more energy. He tells a gentle joke.",
    "teaching": "Warm soup gives fluids and comfort that soothe sniffles.",
    "animation_cue": "recovery",
    "memory": "First visit: sniffly. Tried \"Share a cup with a friend\" → feverish. Tried \"Warm soup break\" → sniffly."
  },
  {
    "id": "65cb7607-d5ff-42fe-a36d-c6d6809fef53",
    "patient_id": "3ecf0a2a-0ebf-42be-86cd-ffc87a837199",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 4,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Otis shares a cup again. Now he feels wiped out and droopy. He needs blankets and rest. He is too tired for jokes.",
    "teaching": "Sharing cups again and again spreads more germs and worsens sickness.",
    "animation_cue": "sick",
    "memory": "First visit: sniffly. Tried \"Share a cup with a friend\" → feverish. Tried \"Share a cup with a friend\" → wiped out."
  },
  {
    "id": "c100ccc7-c47e-4efc-bbdb-ea0e7745c0ae",
    "patient_id": "3ecf0a2a-0ebf-42be-86cd-ffc87a837199",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "The nurse gently stops the ice bath. Otis stays under blankets and safe. His forehead still feels warm with low pep. He feels droopy.",
    "teaching": "A sudden ice plunge can shock a feverish body, so helpers stop it.",
    "animation_cue": "worried",
    "memory": "First visit: sniffly. Tried \"Share a cup with a friend\" → feverish. A risky idea came up; we steered clear."
  },
  {
    "id": "6b16edba-6d28-4bf5-9e15-1be3df737b82",
    "patient_id": "5cd059de-fe4d-422f-95c9-084b4474309c",
    "depth": 0,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Priya sits on the clinic cot. She looks droopy and very thirsty. Her body feels dried out and low on water. The team captain tries to smile but feels slow.",
    "teaching": "When the body loses water, drinking water in small sips helps it feel better.",
    "animation_cue": "idle",
    "memory": "First visit: dried out."
  },
  {
    "id": "3b265924-68b2-483d-9ada-3e7ac9d094e0",
    "patient_id": "5cd059de-fe4d-422f-95c9-084b4474309c",
    "depth": 1,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Priya sips cool water. She still feels a bit dry and slow and thirsty. She looks perky and a little brighter. She breathes easy and rests.",
    "teaching": "Cool water replaces lost fluid and helps thirst go away.",
    "animation_cue": "recovery",
    "memory": "First visit: dried out. Tried \"Offer cool water\" → thirsty."
  },
  {
    "id": "2f5df489-18af-4239-ba73-c29e7f3b13e7",
    "patient_id": "5cd059de-fe4d-422f-95c9-084b4474309c",
    "depth": 1,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Priya rests in the cool shade. She still feels a bit dry and slow and thirsty. She looks perky as she cools down. She breathes easy.",
    "teaching": "Cool shade helps the body stay cool, but lost fluid still needs water.",
    "animation_cue": "recovery",
    "memory": "First visit: dried out. Tried \"Rest in the shade\" → thirsty."
  },
  {
    "id": "08e86d6d-8c56-4a3e-b9b1-519c005f3857",
    "patient_id": "5cd059de-fe4d-422f-95c9-084b4474309c",
    "depth": 1,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Priya sips fizzy soda. She stays all drooped out and parched. She feels low and uncomfortable and needs care. She looks droopy and breathes easy.",
    "teaching": "Fizzy sodas have lots of sugar and do not replace lost body water like water does.",
    "animation_cue": "sick",
    "memory": "First visit: dried out. Tried \"Give fizzy soda\" → parched."
  },
  {
    "id": "e453d9a0-03e1-4712-a587-7c78cd933b64",
    "patient_id": "5cd059de-fe4d-422f-95c9-084b4474309c",
    "depth": 1,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "The helper gently stops the salt pouch and keeps Priya safe. She still feels dried out and droopy. She holds steady and breathes easy. The team stays close.",
    "teaching": "Eating lots of salt at once is unsafe and makes thirst and water loss worse.",
    "animation_cue": "worried",
    "memory": "First visit: dried out. A risky idea came up; we steered clear."
  },
  {
    "id": "fe7d5003-f712-4132-9012-4e2b885d00ec",
    "patient_id": "5cd059de-fe4d-422f-95c9-084b4474309c",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 10,
      "comfort": 10,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Priya sips more cool water. She feels good and bouncy now. She looks perky and comfy. She breathes easy and smiles.",
    "teaching": "Drinking water over time helps the body stay hydrated and feel strong.",
    "animation_cue": "happy",
    "memory": "First visit: dried out. Tried \"Offer cool water\" → thirsty. Tried \"Offer cool water\" → sipped."
  },
  {
    "id": "7b32eb9c-01e4-4380-a890-ee61cedc0552",
    "patient_id": "5cd059de-fe4d-422f-95c9-084b4474309c",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 9,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Priya rests in the shade. She still feels a bit dry and slow. She looks okay and fairly comfy. She breathes easy.",
    "teaching": "Rest in shade cools the body, but only water replaces lost fluid.",
    "animation_cue": "worried",
    "memory": "First visit: dried out. Tried \"Offer cool water\" → thirsty. Tried \"Rest in the shade\" → thirsty."
  },
  {
    "id": "b6c3cdf2-c270-40ad-a278-e31b8e23c233",
    "patient_id": "5cd059de-fe4d-422f-95c9-084b4474309c",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Priya tries fizzy soda after water. She feels dried out and very thirsty. She looks droopy and less comfy. She breathes easy.",
    "teaching": "Sugary fizzy drinks do not hydrate the body as well as plain water.",
    "animation_cue": "sick",
    "memory": "First visit: dried out. Tried \"Offer cool water\" → thirsty. Tried \"Give fizzy soda\" → dried out."
  },
  {
    "id": "1e78d169-7b1a-46ab-b89b-26f0d24ff2bc",
    "patient_id": "5cd059de-fe4d-422f-95c9-084b4474309c",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "The helper gently stops the salt pouch and keeps Priya safe. She stays thirsty and a bit dry. She looks perky and holds steady. She breathes easy.",
    "teaching": "Eating lots of salt at once is unsafe and makes thirst and water loss worse.",
    "animation_cue": "worried",
    "memory": "First visit: dried out. Tried \"Offer cool water\" → thirsty. A risky idea came up; we steered clear."
  },
  {
    "id": "8cc8c5a9-fe39-4e72-a877-4c2330255a28",
    "patient_id": "5cd059de-fe4d-422f-95c9-084b4474309c",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 10,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Priya sips cool water in the shade. She feels good and bouncy now. She looks perky and comfy. She breathes easy and smiles.",
    "teaching": "Cool water after rest replaces lost fluid and helps the body recover.",
    "animation_cue": "happy",
    "memory": "First visit: dried out. Tried \"Rest in the shade\" → thirsty. Tried \"Offer cool water\" → sipped."
  },
  {
    "id": "6070f6b0-9b8f-41a5-bc9c-db283559960f",
    "patient_id": "5cd059de-fe4d-422f-95c9-084b4474309c",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 9,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Priya keeps resting in the shade. She still feels a bit dry and slow. She looks okay and breathes easy. She waits for water.",
    "teaching": "Shade keeps the body cool, but thirst means the body still needs fluid.",
    "animation_cue": "worried",
    "memory": "First visit: dried out. Tried \"Rest in the shade\" → thirsty. Tried \"Rest in the shade\" → thirsty."
  },
  {
    "id": "5158934d-60b7-419e-b101-6d5cf94ecf25",
    "patient_id": "5cd059de-fe4d-422f-95c9-084b4474309c",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 8,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Priya tries fizzy soda. She feels dried out and very thirsty. She looks droopy and less comfy. She breathes easy.",
    "teaching": "Sugary fizzy drinks do not replace body water and can keep thirst going.",
    "animation_cue": "sick",
    "memory": "First visit: dried out. Tried \"Rest in the shade\" → thirsty. Tried \"Give fizzy soda\" → dried out."
  },
  {
    "id": "617e33b3-e2c5-47f7-a389-bcb1ecc8bdc7",
    "patient_id": "5cd059de-fe4d-422f-95c9-084b4474309c",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "The helper gently stops the salt pouch and keeps Priya safe. She stays thirsty and a bit dry. She looks perky and fairly comfy and holds steady. She breathes easy.",
    "teaching": "Eating lots of salt at once is unsafe and makes thirst and water loss worse.",
    "animation_cue": "worried",
    "memory": "First visit: dried out. Tried \"Rest in the shade\" → thirsty. A risky idea came up; we steered clear."
  },
  {
    "id": "0bcbe97d-1586-465f-8c37-7e20ceb621f6",
    "patient_id": "5cd059de-fe4d-422f-95c9-084b4474309c",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Priya sips cool water. She still feels dried out and thirsty. She looks a little perky now. She breathes easy and rests.",
    "teaching": "Cool water replaces lost fluid and helps the body feel better after thirst.",
    "animation_cue": "recovery",
    "memory": "First visit: dried out. Tried \"Give fizzy soda\" → parched. Tried \"Offer cool water\" → dried out."
  },
  {
    "id": "54674d6a-6906-48ff-96f2-b79209be9390",
    "patient_id": "5cd059de-fe4d-422f-95c9-084b4474309c",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 7,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Priya rests in the shade. She stays parched and all drooped out. She feels low and needs care. She looks droopy and breathes easy.",
    "teaching": "Cool shade rests the body, but parched thirst still needs water to improve.",
    "animation_cue": "worried",
    "memory": "First visit: dried out. Tried \"Give fizzy soda\" → parched. Tried \"Rest in the shade\" → parched."
  },
  {
    "id": "2f3d05f3-a55f-417b-8bc8-d9fa5a541056",
    "patient_id": "5cd059de-fe4d-422f-95c9-084b4474309c",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 4,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Priya sips more fizzy soda. She stays parched and all drooped out. She feels low and uncomfortable and needs care. She looks droopy and breathes easy.",
    "teaching": "Drinking more sugary soda does not hydrate and keeps the body thirsty.",
    "animation_cue": "worried",
    "memory": "First visit: dried out. Tried \"Give fizzy soda\" → parched. Tried \"Give fizzy soda\" → parched."
  },
  {
    "id": "258fcf9a-059a-4dbc-afe4-920d8ba4a4c6",
    "patient_id": "5cd059de-fe4d-422f-95c9-084b4474309c",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "The helper gently stops the salt pouch and keeps Priya safe. She stays parched and droopy. She holds steady and breathes easy. The team stays close.",
    "teaching": "Eating lots of salt at once is unsafe and makes thirst and water loss worse.",
    "animation_cue": "worried",
    "memory": "First visit: dried out. Tried \"Give fizzy soda\" → parched. A risky idea came up; we steered clear."
  },
  {
    "id": "bcc9ca1d-be23-4ed4-982d-9e7f6fe15257",
    "patient_id": "c538db11-dec0-4905-a5b1-c82e65105229",
    "depth": 0,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Sam sits quietly with a book in the lap. Today the pressure is running high. Sam feels droopy, low on energy and comfort, and breathing stays even. The clinic feels calm as Sam waits for a steadier routine to begin.",
    "teaching": "Blood pressure means how hard blood pushes on vessel walls.",
    "animation_cue": "idle",
    "memory": "First visit: running high."
  },
  {
    "id": "f5baa027-14d0-4495-85db-7cf4ca712498",
    "patient_id": "c538db11-dec0-4905-a5b1-c82e65105229",
    "depth": 1,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Sam chooses daily walks and less salt. The pressure is creeping up and feels a little tense lately. Sam looks perky with good energy and comfort, and breathing stays even. A book waits for after the walk.",
    "teaching": "Walking each day and eating less salt help keep blood pressure in a healthy range.",
    "animation_cue": "recovery",
    "memory": "First visit: running high. Tried \"Daily walks, less salt\" → creeping up."
  },
  {
    "id": "efda60bc-0278-405b-81e5-725f529c12e8",
    "patient_id": "c538db11-dec0-4905-a5b1-c82e65105229",
    "depth": 1,
    "stage_index": 1,
    "vitals": {
      "energy": 7,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Sam takes the prescribed medicine as directed. The pressure is creeping up and feels a little tense lately. Sam looks perky with steady energy and comfort, and breathing stays even. Sam holds a book close while waiting.",
    "teaching": "Taking prescribed blood pressure medicine every day keeps it working as the doctor planned.",
    "animation_cue": "recovery",
    "memory": "First visit: running high. Tried \"Take prescribed medicine\" → creeping up."
  },
  {
    "id": "b88b2875-c211-4246-9f83-f7f938442032",
    "patient_id": "c538db11-dec0-4905-a5b1-c82e65105229",
    "depth": 1,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Sam skips the medicine because feeling fine. The pressure is very high and needs care and a plan. Sam feels droopy with low energy and comfort, and breathing stays even. The book sits unopened in the lap.",
    "teaching": "High blood pressure often has no symptoms, so skipping medicine lets pressure stay high.",
    "animation_cue": "sick",
    "memory": "First visit: running high. Tried \"Skip meds — feeling fine!\" → very high."
  },
  {
    "id": "1c26d961-d19e-4bad-8618-db5da397fe04",
    "patient_id": "c538db11-dec0-4905-a5b1-c82e65105229",
    "depth": 1,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Sam wants to double the dose to fix it faster. The care team steps in and holds it steady. The pressure is still running high. Sam feels droopy with low energy and comfort, and breathing stays even.",
    "teaching": "Taking extra blood pressure medicine can drop pressure too low and is unsafe.",
    "animation_cue": "worried",
    "memory": "First visit: running high. A risky idea came up; we steered clear."
  },
  {
    "id": "842a1cdd-26e9-4402-9889-9a44e4e29768",
    "patient_id": "c538db11-dec0-4905-a5b1-c82e65105229",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 10,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Sam keeps up daily walks and less salt. The pressure is steady, calm and even. Sam feels perky with full energy and good comfort, and breathing stays even. Sam reads quietly with a smile.",
    "teaching": "Regular walks and lower-salt foods help blood vessels stay healthy over time.",
    "animation_cue": "happy",
    "memory": "First visit: running high. Tried \"Daily walks, less salt\" → creeping up. Tried \"Daily walks, less salt\" → steady."
  },
  {
    "id": "c23ed3f3-8307-44c8-a68e-82b6e2a9aca5",
    "patient_id": "c538db11-dec0-4905-a5b1-c82e65105229",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Sam takes the prescribed medicine now. The pressure is creeping up and feels a little tense lately. Sam feels okay with good energy and comfort, and breathing stays even. The book rests nearby.",
    "teaching": "Blood pressure medicine works best when taken just as the doctor tells.",
    "animation_cue": "worried",
    "memory": "First visit: running high. Tried \"Daily walks, less salt\" → creeping up. Tried \"Take prescribed medicine\" → creeping up."
  },
  {
    "id": "f4c83a14-f9fe-4480-a7f4-26b2f86efbb7",
    "patient_id": "c538db11-dec0-4905-a5b1-c82e65105229",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 8,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Sam skips the medicine because feeling fine. The pressure is running high and needs a steadier routine. Sam feels droopy with good energy but less comfort, and breathing stays even. The book stays closed.",
    "teaching": "High blood pressure often has no symptoms, so skipping medicine lets pressure stay high.",
    "animation_cue": "sick",
    "memory": "First visit: running high. Tried \"Daily walks, less salt\" → creeping up. Tried \"Skip meds — feeling fine!\" → running high."
  },
  {
    "id": "cb967c3c-7442-45ac-acd9-48520092d41b",
    "patient_id": "c538db11-dec0-4905-a5b1-c82e65105229",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Sam wants to double the dose to fix it faster. The care team steps in and holds it steady. The pressure stays creeping up. Sam looks perky with good energy and comfort, and breathing stays even.",
    "teaching": "Taking extra blood pressure medicine can drop pressure too low and is unsafe.",
    "animation_cue": "worried",
    "memory": "First visit: running high. Tried \"Daily walks, less salt\" → creeping up. A risky idea came up; we steered clear."
  },
  {
    "id": "bc996c2e-ff13-4c55-86c0-0bae3bbd79f1",
    "patient_id": "c538db11-dec0-4905-a5b1-c82e65105229",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 9,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Sam adds daily walks and less salt. The pressure is steady, calm and even. Sam feels perky with strong energy and comfort, and breathing stays even. Sam reads a favorite page.",
    "teaching": "Walking each day and eating less salt help keep blood pressure in a healthy range.",
    "animation_cue": "happy",
    "memory": "First visit: running high. Tried \"Take prescribed medicine\" → creeping up. Tried \"Daily walks, less salt\" → steady."
  },
  {
    "id": "d86d800f-c32f-4321-a19e-194757d52f19",
    "patient_id": "c538db11-dec0-4905-a5b1-c82e65105229",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 7,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Sam keeps taking the prescribed medicine. The pressure is creeping up and feels a little tense lately. Sam feels okay with steady energy and good comfort, and breathing stays even. Sam reads quietly.",
    "teaching": "Taking prescribed blood pressure medicine every day keeps it working as the doctor planned.",
    "animation_cue": "worried",
    "memory": "First visit: running high. Tried \"Take prescribed medicine\" → creeping up. Tried \"Take prescribed medicine\" → creeping up."
  },
  {
    "id": "f1baabeb-c7dd-44f9-9a15-840ec291476b",
    "patient_id": "c538db11-dec0-4905-a5b1-c82e65105229",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 7,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Sam skips the medicine because feeling fine. The pressure is running high and needs a steadier routine. Sam feels droopy with steady energy and comfort, and breathing stays even. The book waits untouched.",
    "teaching": "High blood pressure often has no symptoms, so skipping medicine lets pressure stay high.",
    "animation_cue": "sick",
    "memory": "First visit: running high. Tried \"Take prescribed medicine\" → creeping up. Tried \"Skip meds — feeling fine!\" → running high."
  },
  {
    "id": "883aae2b-4366-4864-8b92-950c52b6c2b4",
    "patient_id": "c538db11-dec0-4905-a5b1-c82e65105229",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 7,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Sam wants to double the dose to fix it faster. The care team steps in and holds it steady. The pressure stays creeping up. Sam looks perky with steady energy and comfort, and breathing stays even.",
    "teaching": "Taking extra blood pressure medicine can drop pressure too low and is unsafe.",
    "animation_cue": "worried",
    "memory": "First visit: running high. Tried \"Take prescribed medicine\" → creeping up. A risky idea came up; we steered clear."
  },
  {
    "id": "97f9805f-0b42-4e2e-815f-ce7a7ffa366f",
    "patient_id": "c538db11-dec0-4905-a5b1-c82e65105229",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 7,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Sam tries daily walks and less salt. The pressure is very high and needs care and a plan. Sam feels droopy with steady energy but low comfort, and breathing stays even. Sam peeks at a book.",
    "teaching": "Walking and less salt help blood pressure, but very high pressure also needs doctor care.",
    "animation_cue": "worried",
    "memory": "First visit: running high. Tried \"Skip meds — feeling fine!\" → very high. Tried \"Daily walks, less salt\" → very high."
  },
  {
    "id": "0aaa28d1-a458-46d6-bc71-8d4e8f04b1bf",
    "patient_id": "c538db11-dec0-4905-a5b1-c82e65105229",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 7,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Sam takes the prescribed medicine again. The pressure is running high and needs a steadier routine. Sam looks perky with steady energy and comfort, and breathing stays even. Sam opens a book again.",
    "teaching": "Taking prescribed blood pressure medicine every day keeps it working as the doctor planned.",
    "animation_cue": "recovery",
    "memory": "First visit: running high. Tried \"Skip meds — feeling fine!\" → very high. Tried \"Take prescribed medicine\" → running high."
  },
  {
    "id": "fe62f4ae-a463-4b64-8636-22344a4edc40",
    "patient_id": "c538db11-dec0-4905-a5b1-c82e65105229",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 4,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Sam skips the medicine again because feeling fine. The pressure is very high and needs care and a plan. Sam feels droopy with low energy and comfort, and breathing stays even. The book stays shut.",
    "teaching": "High blood pressure often has no symptoms, so skipping medicine lets pressure stay high.",
    "animation_cue": "worried",
    "memory": "First visit: running high. Tried \"Skip meds — feeling fine!\" → very high. Tried \"Skip meds — feeling fine!\" → very high."
  },
  {
    "id": "7ebc8c9e-fd08-4094-9569-1bff65f96b05",
    "patient_id": "c538db11-dec0-4905-a5b1-c82e65105229",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Sam wants to double the dose to fix it faster. The care team steps in and holds it steady. The pressure stays very high. Sam feels droopy with low energy and comfort, and breathing stays even.",
    "teaching": "Taking extra blood pressure medicine can drop pressure too low and is unsafe.",
    "animation_cue": "worried",
    "memory": "First visit: running high. Tried \"Skip meds — feeling fine!\" → very high. A risky idea came up; we steered clear."
  },
  {
    "id": "7a5913f9-d72c-456d-93fb-70e39b0e0612",
    "patient_id": "b045d647-86dd-4c40-8dbc-b5a4bbd2b6a9",
    "depth": 0,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Lila sits on the porch bench. She breathes with soft whistles. Her eyes look worried. Her chest moves fast. The kind neighbor needs gentle, calm help right now.",
    "teaching": "Sitting upright helps lungs have more room to breathe.",
    "animation_cue": "idle",
    "memory": "First visit: wheezy."
  },
  {
    "id": "b0a42aca-b06d-4219-9b0b-f26f0a319061",
    "patient_id": "b045d647-86dd-4c40-8dbc-b5a4bbd2b6a9",
    "depth": 1,
    "stage_index": 1,
    "vitals": {
      "energy": 7,
      "comfort": 8,
      "breathing": 7
    },
    "mood": "perky",
    "narrative": "Lila sits upright in fresh calm air. She feels a little tightness in her chest. She looks brighter. Her shoulders rest low. She breathes steadier now.",
    "teaching": "Sitting upright and staying calm keeps airways open and eases breathing.",
    "animation_cue": "recovery",
    "memory": "First visit: wheezy. Tried \"Sit upright in calm air\" → tight."
  },
  {
    "id": "e628eba3-7fdf-4ee7-9869-b3a42264d8de",
    "patient_id": "b045d647-86dd-4c40-8dbc-b5a4bbd2b6a9",
    "depth": 1,
    "stage_index": 1,
    "vitals": {
      "energy": 7,
      "comfort": 7,
      "breathing": 8
    },
    "mood": "perky",
    "narrative": "Lila uses her rescue puffer with a spacer. She still feels a little tightness in her chest. She looks brighter. She breathes steadier now.",
    "teaching": "A spacer helps more mist from a puffer reach tight airways.",
    "animation_cue": "recovery",
    "memory": "First visit: wheezy. Tried \"Rescue puffer with spacer\" → tight."
  },
  {
    "id": "dfeb42bf-35c2-42e9-a48c-55cd56f6bff0",
    "patient_id": "b045d647-86dd-4c40-8dbc-b5a4bbd2b6a9",
    "depth": 1,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 5
    },
    "mood": "droopy",
    "narrative": "Lila buries her nose in dusty flowers. Now she struggles hard to breathe. She gasps. She looks scared. She needs help right now.",
    "teaching": "Dust and pollen can irritate airways and make wheezing worse.",
    "animation_cue": "sick",
    "memory": "First visit: wheezy. Tried \"Bury nose in dusty flowers\" → struggling."
  },
  {
    "id": "2e7bb78f-42dc-46f5-93a4-348dc3cef7cc",
    "patient_id": "b045d647-86dd-4c40-8dbc-b5a4bbd2b6a9",
    "depth": 1,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Lila reaches for a dusty blanket. A helper gently stops her. She stays wheezy with whistly breaths. Her worried eyes watch. No dust fills the air.",
    "teaching": "Shaking dust indoors can slam airways shut, so helpers stop it fast.",
    "animation_cue": "worried",
    "memory": "First visit: wheezy. A risky idea came up; we steered clear."
  },
  {
    "id": "8c5ff1c3-e648-40fa-bf58-8e26759353a2",
    "patient_id": "b045d647-86dd-4c40-8dbc-b5a4bbd2b6a9",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 8,
      "comfort": 10,
      "breathing": 8
    },
    "mood": "perky",
    "narrative": "Lila rests upright in calm air. She breathes clear and easy. She smiles softly. Her chest feels loose. Her energy glows bright.",
    "teaching": "Calm clean air gives irritated airways time to relax and open.",
    "animation_cue": "happy",
    "memory": "First visit: wheezy. Tried \"Sit upright in calm air\" → tight. Tried \"Sit upright in calm air\" → clear."
  },
  {
    "id": "67cee3b9-04fd-49dd-93ed-288e0d8606b0",
    "patient_id": "b045d647-86dd-4c40-8dbc-b5a4bbd2b6a9",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 8,
      "comfort": 9,
      "breathing": 9
    },
    "mood": "perky",
    "narrative": "Lila uses her rescue puffer with a spacer in calm air. She breathes clear and easy now. She smiles. Her chest feels open and soft.",
    "teaching": "A spacer helps more mist from a puffer reach tight airways.",
    "animation_cue": "happy",
    "memory": "First visit: wheezy. Tried \"Sit upright in calm air\" → tight. Tried \"Rescue puffer with spacer\" → clear."
  },
  {
    "id": "ab7e51d0-9b90-4007-9497-48e667144296",
    "patient_id": "b045d647-86dd-4c40-8dbc-b5a4bbd2b6a9",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 7,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Lila sniffs the dusty flowers. Her breath turns whistly again. Her eyes look worried. Her chest feels wobbly and tight.",
    "teaching": "Dust and pollen can irritate airways and bring wheezing back.",
    "animation_cue": "sick",
    "memory": "First visit: wheezy. Tried \"Sit upright in calm air\" → tight. Tried \"Bury nose in dusty flowers\" → wheezy."
  },
  {
    "id": "7a51f061-ab0b-44a2-89ad-45b973aa3fc8",
    "patient_id": "b045d647-86dd-4c40-8dbc-b5a4bbd2b6a9",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 7,
      "comfort": 8,
      "breathing": 7
    },
    "mood": "perky",
    "narrative": "Lila reaches for a dusty blanket. A helper gently stops her in time. She stays a little tight in her chest. She breathes steady. She stays safe.",
    "teaching": "Shaking dust indoors can slam airways shut, so helpers stop it fast.",
    "animation_cue": "worried",
    "memory": "First visit: wheezy. Tried \"Sit upright in calm air\" → tight. A risky idea came up; we steered clear."
  },
  {
    "id": "67317fdd-ab8e-4cfd-9bae-8f69d6398ff0",
    "patient_id": "b045d647-86dd-4c40-8dbc-b5a4bbd2b6a9",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 8,
      "comfort": 9,
      "breathing": 9
    },
    "mood": "perky",
    "narrative": "Lila sits upright in calm air. She breathes clear and easy. She smiles softly. Her chest feels open. She looks bright and restful.",
    "teaching": "Sitting upright and staying calm keeps airways open and eases breathing.",
    "animation_cue": "happy",
    "memory": "First visit: wheezy. Tried \"Rescue puffer with spacer\" → tight. Tried \"Sit upright in calm air\" → clear."
  },
  {
    "id": "6177f891-5cec-4830-8d5e-0d64ad64686c",
    "patient_id": "b045d647-86dd-4c40-8dbc-b5a4bbd2b6a9",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 10
    },
    "mood": "perky",
    "narrative": "Lila rests with her puffer and spacer nearby. She breathes very clear and easy. She beams. Her chest feels soft and open.",
    "teaching": "A spacer helps more mist from a puffer reach tight airways.",
    "animation_cue": "happy",
    "memory": "First visit: wheezy. Tried \"Rescue puffer with spacer\" → tight. Tried \"Rescue puffer with spacer\" → clear."
  },
  {
    "id": "79f5b957-cfbf-4837-ac0b-23adafe04813",
    "patient_id": "b045d647-86dd-4c40-8dbc-b5a4bbd2b6a9",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 7,
      "comfort": 7,
      "breathing": 7
    },
    "mood": "droopy",
    "narrative": "Lila sniffs the dusty flowers. Her breath turns whistly again. Her eyes look worried. Her chest feels tight and wobbly.",
    "teaching": "Dust and pollen can irritate airways and bring wheezing back.",
    "animation_cue": "sick",
    "memory": "First visit: wheezy. Tried \"Rescue puffer with spacer\" → tight. Tried \"Bury nose in dusty flowers\" → wheezy."
  },
  {
    "id": "26b5cefc-f977-4fff-b0e4-6f3c1fa620f9",
    "patient_id": "b045d647-86dd-4c40-8dbc-b5a4bbd2b6a9",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 7,
      "comfort": 7,
      "breathing": 8
    },
    "mood": "perky",
    "narrative": "Lila reaches for a dusty blanket. A helper gently stops her in time. She stays a little tight in her chest. She breathes steady. She stays safe.",
    "teaching": "Shaking dust indoors can slam airways shut, so helpers stop it fast.",
    "animation_cue": "worried",
    "memory": "First visit: wheezy. Tried \"Rescue puffer with spacer\" → tight. A risky idea came up; we steered clear."
  },
  {
    "id": "7188164e-a826-402f-b984-932b081fe36c",
    "patient_id": "b045d647-86dd-4c40-8dbc-b5a4bbd2b6a9",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Lila sits upright in calm air. She still struggles hard to breathe. She gasps for air. She looks tired. She still needs help right now.",
    "teaching": "Sitting upright gives lungs more room, but hard breathing still needs urgent help.",
    "animation_cue": "worried",
    "memory": "First visit: wheezy. Tried \"Bury nose in dusty flowers\" → struggling. Tried \"Sit upright in calm air\" → struggling."
  },
  {
    "id": "2aa7d340-8502-4998-84f0-b61e341e87c8",
    "patient_id": "b045d647-86dd-4c40-8dbc-b5a4bbd2b6a9",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 7,
      "comfort": 7,
      "breathing": 7
    },
    "mood": "perky",
    "narrative": "Lila uses her rescue puffer with a spacer. Her hard gasps soften to whistly breaths. She perks up a little. She still feels wheezy.",
    "teaching": "A spacer helps more mist from a puffer reach tight airways.",
    "animation_cue": "recovery",
    "memory": "First visit: wheezy. Tried \"Bury nose in dusty flowers\" → struggling. Tried \"Rescue puffer with spacer\" → wheezy."
  },
  {
    "id": "3869bc8b-0b43-4bfb-8055-5fcc4f9f7463",
    "patient_id": "b045d647-86dd-4c40-8dbc-b5a4bbd2b6a9",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 4
    },
    "mood": "droopy",
    "narrative": "Lila sniffs the dusty flowers again. She struggles very hard to breathe. Each breath feels short. She looks droopy and scared. She needs help right now.",
    "teaching": "More dust and pollen keeps irritating airways and makes breathing harder.",
    "animation_cue": "worried",
    "memory": "First visit: wheezy. Tried \"Bury nose in dusty flowers\" → struggling. Tried \"Bury nose in dusty flowers\" → struggling."
  },
  {
    "id": "b682e084-52cf-4868-882d-68aa369d09da",
    "patient_id": "b045d647-86dd-4c40-8dbc-b5a4bbd2b6a9",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 5
    },
    "mood": "droopy",
    "narrative": "Lila reaches for a dusty blanket. A helper gently stops her. She stays struggling to breathe. She gasps. No new dust fills the air.",
    "teaching": "Shaking dust indoors can slam airways shut, so helpers stop it fast.",
    "animation_cue": "worried",
    "memory": "First visit: wheezy. Tried \"Bury nose in dusty flowers\" → struggling. A risky idea came up; we steered clear."
  },
  {
    "id": "0a8fc758-0c82-41be-a714-7045779f7247",
    "patient_id": "03c6aac1-ddc2-4a17-ae0c-ea26f51520ae",
    "depth": 0,
    "stage_index": 1,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Owen the tired new dad sits on the clinic cot and sniffles. He sneezes into his elbow and feels just okay. The nurse smiles softly and stays close by.",
    "teaching": "Rest and fluids let the body do its healing work.",
    "animation_cue": "idle",
    "memory": "First visit: sniffly."
  },
  {
    "id": "8822024e-aa63-4104-99c4-ade918c2720c",
    "patient_id": "03c6aac1-ddc2-4a17-ae0c-ea26f51520ae",
    "depth": 1,
    "stage_index": 0,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Owen rests with a warm blanket and sips water. His nose feels clear and his eyes look perky. He smiles as he holds his little one's photo nearby.",
    "teaching": "Rest and drinking water help the body stay strong while it fights germs.",
    "animation_cue": "happy",
    "memory": "First visit: sniffly. Tried \"Warm rest + fluids\" → breezy."
  },
  {
    "id": "922ec421-e65a-4fc8-9172-4330ef419782",
    "patient_id": "03c6aac1-ddc2-4a17-ae0c-ea26f51520ae",
    "depth": 1,
    "stage_index": 1,
    "vitals": {
      "energy": 6,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Owen holds a warm bowl of soup and breathes in the steam. He still sniffles and sneezes and feels just okay. He sips slowly and rests.",
    "teaching": "Warm soup and steam can soothe a scratchy throat and stuffy nose.",
    "animation_cue": "worried",
    "memory": "First visit: sniffly. Tried \"Warm soup break\" → sniffly."
  },
  {
    "id": "0fb4f07b-6d46-4a7e-a2c4-6f5b55e8fed4",
    "patient_id": "03c6aac1-ddc2-4a17-ae0c-ea26f51520ae",
    "depth": 1,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Owen shares a cup with a friend and soon feels droopy. His forehead feels warm and he has low pep. He curls up quietly.",
    "teaching": "Sharing cups can pass germs from one mouth to another.",
    "animation_cue": "sick",
    "memory": "First visit: sniffly. Tried \"Share a cup with a friend\" → feverish."
  },
  {
    "id": "1b573909-e262-4fe3-be06-78438134a497",
    "patient_id": "03c6aac1-ddc2-4a17-ae0c-ea26f51520ae",
    "depth": 1,
    "stage_index": 1,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Owen stays safe on the cot and still sniffles and sneezes. He feels just okay. The kind nurse steps in and stops the icy plunge.",
    "teaching": "An icy plunge can chill and shock the body, so helpers stop it.",
    "animation_cue": "worried",
    "memory": "First visit: sniffly. A risky idea came up; we steered clear."
  },
  {
    "id": "7179c072-7f93-4cd5-a23c-0acc9eca64b4",
    "patient_id": "03c6aac1-ddc2-4a17-ae0c-ea26f51520ae",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 9,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "bright",
    "narrative": "Owen keeps resting and sipping water. His nose feels clear and he looks bright and cozy. He grins softly and relaxes.",
    "teaching": "Quiet rest and water help keep energy up each day.",
    "animation_cue": "idle",
    "memory": "First visit: sniffly. Tried \"Warm rest + fluids\" → breezy. Tried \"Warm rest + fluids\" → breezy."
  },
  {
    "id": "d4c1e014-fe93-455b-a4b7-87f4c18a017e",
    "patient_id": "03c6aac1-ddc2-4a17-ae0c-ea26f51520ae",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 8,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "bright",
    "narrative": "Owen sips warm soup after his rest. His nose feels clear and he looks bright. He sighs happily and feels cozy.",
    "teaching": "Warm fluids can comfort and add gentle nourishment.",
    "animation_cue": "idle",
    "memory": "First visit: sniffly. Tried \"Warm rest + fluids\" → breezy. Tried \"Warm soup break\" → breezy."
  },
  {
    "id": "dabc76af-2e32-4c81-83e9-e5845aff3c00",
    "patient_id": "03c6aac1-ddc2-4a17-ae0c-ea26f51520ae",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Owen shares a cup with a friend. He sniffles and sneezes and feels just okay. He holds his own cup close now.",
    "teaching": "Sharing cups can pass germs from one mouth to another.",
    "animation_cue": "sick",
    "memory": "First visit: sniffly. Tried \"Warm rest + fluids\" → breezy. Tried \"Share a cup with a friend\" → sniffly."
  },
  {
    "id": "c76bcafa-c4e9-419e-a995-fe8dcf841dd3",
    "patient_id": "03c6aac1-ddc2-4a17-ae0c-ea26f51520ae",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Owen stays cozy and safe. His nose feels clear and he looks perky. The kind nurse steps in and stops the icy plunge.",
    "teaching": "An icy plunge can chill and shock the body, so helpers stop it.",
    "animation_cue": "worried",
    "memory": "First visit: sniffly. Tried \"Warm rest + fluids\" → breezy. A risky idea came up; we steered clear."
  },
  {
    "id": "2eeb88f0-4548-4378-b6fa-fc8d5479a4b3",
    "patient_id": "03c6aac1-ddc2-4a17-ae0c-ea26f51520ae",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 8,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Owen rests with water after his soup. His nose feels clear and he looks perky. He cuddles his blanket and smiles.",
    "teaching": "Rest and drinking water help the body stay strong while it fights germs.",
    "animation_cue": "happy",
    "memory": "First visit: sniffly. Tried \"Warm soup break\" → sniffly. Tried \"Warm rest + fluids\" → breezy."
  },
  {
    "id": "1b58d03e-0a12-4381-a7a6-3811536ae356",
    "patient_id": "03c6aac1-ddc2-4a17-ae0c-ea26f51520ae",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 6,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Owen enjoys more warm soup. He still sniffles and sneezes and feels just okay. He holds the warm bowl with care.",
    "teaching": "Warm soup and steam can soothe a scratchy throat and stuffy nose.",
    "animation_cue": "worried",
    "memory": "First visit: sniffly. Tried \"Warm soup break\" → sniffly. Tried \"Warm soup break\" → sniffly."
  },
  {
    "id": "76a7a9b0-da08-4087-adc3-29c0d8827d95",
    "patient_id": "03c6aac1-ddc2-4a17-ae0c-ea26f51520ae",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Owen shares a cup with a friend. His forehead feels warm and he feels droopy with low pep. He rests quietly.",
    "teaching": "Sharing cups can pass germs from one mouth to another.",
    "animation_cue": "sick",
    "memory": "First visit: sniffly. Tried \"Warm soup break\" → sniffly. Tried \"Share a cup with a friend\" → feverish."
  },
  {
    "id": "18a82713-c3f0-4b45-92a9-99b13a08b4dd",
    "patient_id": "03c6aac1-ddc2-4a17-ae0c-ea26f51520ae",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 6,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Owen stays on the cot and still sniffles and sneezes. He feels just okay. The kind nurse steps in and stops the icy plunge.",
    "teaching": "An icy plunge can chill and shock the body, so helpers stop it.",
    "animation_cue": "worried",
    "memory": "First visit: sniffly. Tried \"Warm soup break\" → sniffly. A risky idea came up; we steered clear."
  },
  {
    "id": "31cd510d-fe5d-4497-93fb-8678ec6351f0",
    "patient_id": "03c6aac1-ddc2-4a17-ae0c-ea26f51520ae",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Owen rests and sips water. He still sniffles and sneezes but looks perky. He smiles a little and relaxes.",
    "teaching": "Rest and drinking water help the body stay strong while it fights germs.",
    "animation_cue": "recovery",
    "memory": "First visit: sniffly. Tried \"Share a cup with a friend\" → feverish. Tried \"Warm rest + fluids\" → sniffly."
  },
  {
    "id": "cad844e2-5bc0-4aba-ae90-bc2687f9ebe8",
    "patient_id": "03c6aac1-ddc2-4a17-ae0c-ea26f51520ae",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 7,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Owen sips warm soup slowly. He still sniffles and sneezes but looks perky. He holds the bowl and breathes softly.",
    "teaching": "Warm soup and steam can soothe a scratchy throat and stuffy nose.",
    "animation_cue": "recovery",
    "memory": "First visit: sniffly. Tried \"Share a cup with a friend\" → feverish. Tried \"Warm soup break\" → sniffly."
  },
  {
    "id": "8b810945-7d9f-4300-a8f6-1ea7d3b006a9",
    "patient_id": "03c6aac1-ddc2-4a17-ae0c-ea26f51520ae",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 4,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Owen shares a cup again and feels wiped out. He feels droopy and needs blankets and rest. He curls up tiredly.",
    "teaching": "Sharing cups again and again passes more germs around.",
    "animation_cue": "sick",
    "memory": "First visit: sniffly. Tried \"Share a cup with a friend\" → feverish. Tried \"Share a cup with a friend\" → wiped out."
  },
  {
    "id": "bc2f8550-0b33-47e7-8fc0-62b4547038cd",
    "patient_id": "03c6aac1-ddc2-4a17-ae0c-ea26f51520ae",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Owen stays safe on the cot. His forehead feels warm and he feels droopy with low pep. The kind nurse stops the icy plunge.",
    "teaching": "An icy plunge can chill and shock the body, so helpers stop it.",
    "animation_cue": "worried",
    "memory": "First visit: sniffly. Tried \"Share a cup with a friend\" → feverish. A risky idea came up; we steered clear."
  },
  {
    "id": "d362bdf8-8f78-4329-9043-cdf490da8689",
    "patient_id": "ced9ea83-5b73-4cc2-bc2b-2db579c09640",
    "depth": 0,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Rosa sits by her garden beds. She feels droopy and very thirsty. Her body feels dried out and slow. Her watering can waits nearby.",
    "teaching": "The body needs water every day to stay balanced and work well.",
    "animation_cue": "idle",
    "memory": "First visit: dried out."
  },
  {
    "id": "757d4977-07ed-4f5c-aec6-538563756ad2",
    "patient_id": "ced9ea83-5b73-4cc2-bc2b-2db579c09640",
    "depth": 1,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Rosa sips cool water by her flowers. She looks perky now. She still feels a bit dry and slow.",
    "teaching": "Small sips of water help replace fluid the body loses.",
    "animation_cue": "recovery",
    "memory": "First visit: dried out. Tried \"Offer cool water\" → thirsty."
  },
  {
    "id": "b365d966-d1bd-4445-8ec5-3fe8a52ac6ff",
    "patient_id": "ced9ea83-5b73-4cc2-bc2b-2db579c09640",
    "depth": 1,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Rosa rests in the cool shade near her garden. She looks perky. She still feels a bit dry and slow.",
    "teaching": "Resting in cool shade helps the body stay cool and lose less water.",
    "animation_cue": "recovery",
    "memory": "First visit: dried out. Tried \"Rest in the shade\" → thirsty."
  },
  {
    "id": "c30ca15b-80e1-4699-98cd-27199c5d6205",
    "patient_id": "ced9ea83-5b73-4cc2-bc2b-2db579c09640",
    "depth": 1,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Rosa holds fizzy soda by her garden. She looks all drooped out and parched. She still needs gentle care.",
    "teaching": "Sugary fizzy drinks do not replace body water as well as plain water.",
    "animation_cue": "sick",
    "memory": "First visit: dried out. Tried \"Give fizzy soda\" → parched."
  },
  {
    "id": "db9d8724-4d07-4552-940d-b99dff9fa298",
    "patient_id": "ced9ea83-5b73-4cc2-bc2b-2db579c09640",
    "depth": 1,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Rosa pauses by her garden. She still feels dried out, droopy and very thirsty. The clinic keeps her steady and safe.",
    "teaching": "Eating a lot of salt at once makes thirst worse and harms the body.",
    "animation_cue": "worried",
    "memory": "First visit: dried out. A risky idea came up; we steered clear."
  },
  {
    "id": "0b700fcf-730e-4046-8e45-8963d4c3cfbd",
    "patient_id": "ced9ea83-5b73-4cc2-bc2b-2db579c09640",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 10,
      "comfort": 10,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Rosa sips more cool water among her flowers. She feels good and bouncy. She looks perky and bright.",
    "teaching": "Small, steady sips of water help the body feel lively again.",
    "animation_cue": "happy",
    "memory": "First visit: dried out. Tried \"Offer cool water\" → thirsty. Tried \"Offer cool water\" → sipped."
  },
  {
    "id": "6937f330-c533-418a-bd4c-999b540c2fec",
    "patient_id": "ced9ea83-5b73-4cc2-bc2b-2db579c09640",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 9,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Rosa rests in the shade by her garden. She feels okay. She still feels a bit dry and slow.",
    "teaching": "Shade rests the body, but only fluids replace lost water.",
    "animation_cue": "worried",
    "memory": "First visit: dried out. Tried \"Offer cool water\" → thirsty. Tried \"Rest in the shade\" → thirsty."
  },
  {
    "id": "6feff431-4acd-4766-8b32-6d1e7b66032f",
    "patient_id": "ced9ea83-5b73-4cc2-bc2b-2db579c09640",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Rosa tries fizzy soda near her flowers. She feels droopy and very thirsty. Her body still feels dried out.",
    "teaching": "Fizzy sweet drinks do not give the body the water it needs.",
    "animation_cue": "sick",
    "memory": "First visit: dried out. Tried \"Offer cool water\" → thirsty. Tried \"Give fizzy soda\" → dried out."
  },
  {
    "id": "f88167cb-ec62-4029-bc87-a6b9656c4f0b",
    "patient_id": "ced9ea83-5b73-4cc2-bc2b-2db579c09640",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Rosa pauses by her garden. She looks perky. She stays thirsty, a bit dry and slow. The clinic keeps her steady.",
    "teaching": "A whole pouch of salt at once is unsafe and increases thirst.",
    "animation_cue": "worried",
    "memory": "First visit: dried out. Tried \"Offer cool water\" → thirsty. A risky idea came up; we steered clear."
  },
  {
    "id": "0d654461-dad0-40c2-88c1-9268ca637ac8",
    "patient_id": "ced9ea83-5b73-4cc2-bc2b-2db579c09640",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 10,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Rosa sips cool water in her sunny garden. She feels good and bouncy. She looks perky and happy.",
    "teaching": "Cool water helps the body replace fluid and feel better.",
    "animation_cue": "happy",
    "memory": "First visit: dried out. Tried \"Rest in the shade\" → thirsty. Tried \"Offer cool water\" → sipped."
  },
  {
    "id": "585c5b55-68cb-4293-8fc2-46e835da94d5",
    "patient_id": "ced9ea83-5b73-4cc2-bc2b-2db579c09640",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 9,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Rosa keeps resting in the garden shade. She feels okay. She still feels a bit dry and slow.",
    "teaching": "Cool rest feels nice, but the body still needs fluids to recover.",
    "animation_cue": "worried",
    "memory": "First visit: dried out. Tried \"Rest in the shade\" → thirsty. Tried \"Rest in the shade\" → thirsty."
  },
  {
    "id": "a97b60a1-ad0e-4012-a604-b48401dc82eb",
    "patient_id": "ced9ea83-5b73-4cc2-bc2b-2db579c09640",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 8,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Rosa sips fizzy soda by her roses. She feels droopy and very thirsty. She still feels dried out.",
    "teaching": "Plain water hydrates the body better than sugary soda.",
    "animation_cue": "sick",
    "memory": "First visit: dried out. Tried \"Rest in the shade\" → thirsty. Tried \"Give fizzy soda\" → dried out."
  },
  {
    "id": "9dd106cc-e18e-4f4a-85cb-ee0ca20040f4",
    "patient_id": "ced9ea83-5b73-4cc2-bc2b-2db579c09640",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Rosa pauses near her garden beds. She looks perky. She stays thirsty, a bit dry and slow. The clinic keeps her steady.",
    "teaching": "Too much salt at once harms the body instead of helping.",
    "animation_cue": "worried",
    "memory": "First visit: dried out. Tried \"Rest in the shade\" → thirsty. A risky idea came up; we steered clear."
  },
  {
    "id": "027fee79-2d13-4311-bb75-2cad0a0be736",
    "patient_id": "ced9ea83-5b73-4cc2-bc2b-2db579c09640",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Rosa sips cool water by her garden. She looks a bit perky. She still feels dried out, droopy and very thirsty.",
    "teaching": "Even after a poor choice, clean water helps the body recover.",
    "animation_cue": "recovery",
    "memory": "First visit: dried out. Tried \"Give fizzy soda\" → parched. Tried \"Offer cool water\" → dried out."
  },
  {
    "id": "1422cbd9-ea0b-447b-a330-7f5badcafba8",
    "patient_id": "ced9ea83-5b73-4cc2-bc2b-2db579c09640",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 7,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Rosa rests in the garden shade. She looks all drooped out and parched. She needs gentle care now.",
    "teaching": "Shade cools the body, but it cannot replace lost fluids alone.",
    "animation_cue": "worried",
    "memory": "First visit: dried out. Tried \"Give fizzy soda\" → parched. Tried \"Rest in the shade\" → parched."
  },
  {
    "id": "08d52c6a-4576-4fb0-bd45-a2b37d72f32c",
    "patient_id": "ced9ea83-5b73-4cc2-bc2b-2db579c09640",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 4,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Rosa has more fizzy soda by her flowers. She looks all drooped out and parched. She needs gentle care.",
    "teaching": "More sugary soda keeps the body from getting the water it needs.",
    "animation_cue": "worried",
    "memory": "First visit: dried out. Tried \"Give fizzy soda\" → parched. Tried \"Give fizzy soda\" → parched."
  },
  {
    "id": "9da590da-77f8-4a59-ba50-a521f8c4615e",
    "patient_id": "ced9ea83-5b73-4cc2-bc2b-2db579c09640",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Rosa pauses by her garden. She looks all drooped out and parched. The clinic keeps her steady and safe.",
    "teaching": "A lot of salt at once is unsafe and dries the body more.",
    "animation_cue": "worried",
    "memory": "First visit: dried out. Tried \"Give fizzy soda\" → parched. A risky idea came up; we steered clear."
  },
  {
    "id": "c0a0f31c-9ce4-42a7-a294-b871bee8f924",
    "patient_id": "0d28e7ff-7d42-4d1a-a889-063ef908db4f",
    "depth": 0,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ellis the retired sailor sits in the cozy clinic. His pressure is running high today. He feels droopy and tired, and his comfort is low. His breathing stays even. He needs a steadier routine.",
    "teaching": "Small steady daily habits can help keep blood pressure in a healthy range.",
    "animation_cue": "idle",
    "memory": "First visit: running high."
  },
  {
    "id": "74e3409c-43d1-402a-9068-5925c0086a9f",
    "patient_id": "0d28e7ff-7d42-4d1a-a889-063ef908db4f",
    "depth": 1,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Ellis walks the harbor path and eats less salt. His pressure is creeping up and he feels a little tense. He looks perky with good energy, and his comfort is okay. His breathing stays even.",
    "teaching": "Walking often and eating less salt can help keep blood pressure lower.",
    "animation_cue": "recovery",
    "memory": "First visit: running high. Tried \"Daily walks, less salt\" → creeping up."
  },
  {
    "id": "cdeddc23-7f50-461f-8110-d6245858d5ba",
    "patient_id": "0d28e7ff-7d42-4d1a-a889-063ef908db4f",
    "depth": 1,
    "stage_index": 1,
    "vitals": {
      "energy": 7,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Ellis takes his prescribed medicine as directed. His pressure is creeping up and he feels a little tense. He looks perky, with steady energy and good comfort. His breathing stays even.",
    "teaching": "Taking prescribed blood pressure medicine every day helps keep pressure steady.",
    "animation_cue": "recovery",
    "memory": "First visit: running high. Tried \"Take prescribed medicine\" → creeping up."
  },
  {
    "id": "8320c842-1b5e-45f1-8d70-7fa5f8affec5",
    "patient_id": "0d28e7ff-7d42-4d1a-a889-063ef908db4f",
    "depth": 1,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ellis skips his prescribed medicine because he feels fine. His pressure is very high now. He looks droopy, with low energy and low comfort. His breathing stays even. He needs care and a plan.",
    "teaching": "High blood pressure often has no symptoms, so feeling fine does not mean pressure is low.",
    "animation_cue": "sick",
    "memory": "First visit: running high. Tried \"Skip meds — feeling fine!\" → very high."
  },
  {
    "id": "fac008e1-33db-4d22-a028-a888716e35a3",
    "patient_id": "0d28e7ff-7d42-4d1a-a889-063ef908db4f",
    "depth": 1,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "The nurse gently stops Ellis from taking extra medicine. His pressure stays running high. He feels droopy with low energy and low comfort. His breathing stays even. He stays held steady and safe.",
    "teaching": "Taking more than prescribed can make pressure drop too low and cause falls.",
    "animation_cue": "worried",
    "memory": "First visit: running high. A risky idea came up; we steered clear."
  },
  {
    "id": "dafd4221-ed27-453d-b979-094c6b48d3e9",
    "patient_id": "0d28e7ff-7d42-4d1a-a889-063ef908db4f",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 10,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Ellis keeps up his daily walks and low-salt meals. His pressure is steady, calm and even. He looks perky with bright energy and good comfort. His breathing stays even.",
    "teaching": "Walking often and eating less salt can help keep blood pressure lower.",
    "animation_cue": "happy",
    "memory": "First visit: running high. Tried \"Daily walks, less salt\" → creeping up. Tried \"Daily walks, less salt\" → steady."
  },
  {
    "id": "3f7655a1-afd4-42e8-b9a5-c8c3d8b3d258",
    "patient_id": "0d28e7ff-7d42-4d1a-a889-063ef908db4f",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Ellis takes his prescribed medicine as directed. His pressure is creeping up and he feels a little tense. He seems okay, with good energy and good comfort. His breathing stays even.",
    "teaching": "Taking prescribed blood pressure medicine every day helps keep pressure steady.",
    "animation_cue": "worried",
    "memory": "First visit: running high. Tried \"Daily walks, less salt\" → creeping up. Tried \"Take prescribed medicine\" → creeping up."
  },
  {
    "id": "7c934bd7-6047-437f-8f92-50399623e8d5",
    "patient_id": "0d28e7ff-7d42-4d1a-a889-063ef908db4f",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 8,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ellis skips his prescribed medicine. His pressure is running high. He looks droopy, with good energy but low comfort. His breathing stays even. He needs a steadier routine.",
    "teaching": "High blood pressure often has no symptoms, so feeling fine does not mean pressure is low.",
    "animation_cue": "sick",
    "memory": "First visit: running high. Tried \"Daily walks, less salt\" → creeping up. Tried \"Skip meds — feeling fine!\" → running high."
  },
  {
    "id": "e2223d50-f49b-4c41-a28e-fcb261759ed4",
    "patient_id": "0d28e7ff-7d42-4d1a-a889-063ef908db4f",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "The nurse gently stops Ellis from taking extra medicine. His pressure stays creeping up. He looks perky with good energy and okay comfort. His breathing stays even. He stays held steady.",
    "teaching": "Taking more than prescribed can make pressure drop too low and cause falls.",
    "animation_cue": "worried",
    "memory": "First visit: running high. Tried \"Daily walks, less salt\" → creeping up. A risky idea came up; we steered clear."
  },
  {
    "id": "067fe66a-dd3e-4e5d-b1c2-f9b715839970",
    "patient_id": "0d28e7ff-7d42-4d1a-a889-063ef908db4f",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 9,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Ellis adds daily walks and lower-salt meals. His pressure is steady, calm and even. He looks perky with bright energy and good comfort. His breathing stays even.",
    "teaching": "Walking often and eating less salt can help keep blood pressure lower.",
    "animation_cue": "happy",
    "memory": "First visit: running high. Tried \"Take prescribed medicine\" → creeping up. Tried \"Daily walks, less salt\" → steady."
  },
  {
    "id": "a404fffc-7938-4c69-9f4d-d06822ea8c76",
    "patient_id": "0d28e7ff-7d42-4d1a-a889-063ef908db4f",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 7,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Ellis stays on his prescribed medicine routine. His pressure is creeping up and he feels a little tense. He seems okay, with steady energy and good comfort. His breathing stays even.",
    "teaching": "Taking prescribed blood pressure medicine every day helps keep pressure steady.",
    "animation_cue": "worried",
    "memory": "First visit: running high. Tried \"Take prescribed medicine\" → creeping up. Tried \"Take prescribed medicine\" → creeping up."
  },
  {
    "id": "7e5257e0-3f37-4d3d-8537-5d9f88d2e711",
    "patient_id": "0d28e7ff-7d42-4d1a-a889-063ef908db4f",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 7,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ellis skips his prescribed medicine. His pressure is running high. He looks droopy with steady energy and okay comfort. His breathing stays even. He needs a steadier routine.",
    "teaching": "High blood pressure often has no symptoms, so feeling fine does not mean pressure is low.",
    "animation_cue": "sick",
    "memory": "First visit: running high. Tried \"Take prescribed medicine\" → creeping up. Tried \"Skip meds — feeling fine!\" → running high."
  },
  {
    "id": "c0bbea36-6e01-44ea-9fff-3d7f275ceeb3",
    "patient_id": "0d28e7ff-7d42-4d1a-a889-063ef908db4f",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 7,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "The nurse gently stops Ellis from taking extra medicine. His pressure stays creeping up. He looks perky with steady energy and good comfort. His breathing stays even. He stays held steady.",
    "teaching": "Taking more than prescribed can make pressure drop too low and cause falls.",
    "animation_cue": "worried",
    "memory": "First visit: running high. Tried \"Take prescribed medicine\" → creeping up. A risky idea came up; we steered clear."
  },
  {
    "id": "c8c3bbef-9cce-4b34-a0b2-8d37f16e74ea",
    "patient_id": "0d28e7ff-7d42-4d1a-a889-063ef908db4f",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 7,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ellis tries daily walks and less salt. His pressure is still very high. He looks droopy with steady energy but low comfort. His breathing stays even. He needs care and a plan.",
    "teaching": "Walking often and eating less salt can help keep blood pressure lower.",
    "animation_cue": "worried",
    "memory": "First visit: running high. Tried \"Skip meds — feeling fine!\" → very high. Tried \"Daily walks, less salt\" → very high."
  },
  {
    "id": "d992f217-fc9a-4438-8f2c-cf5c055e4b1a",
    "patient_id": "0d28e7ff-7d42-4d1a-a889-063ef908db4f",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 7,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Ellis starts taking his prescribed medicine again. His pressure is running high. He looks perky with steady energy and okay comfort. His breathing stays even. He needs a steadier routine.",
    "teaching": "Taking prescribed blood pressure medicine every day helps keep pressure steady.",
    "animation_cue": "recovery",
    "memory": "First visit: running high. Tried \"Skip meds — feeling fine!\" → very high. Tried \"Take prescribed medicine\" → running high."
  },
  {
    "id": "baf7e5fc-e179-4776-8dcb-a27865835af8",
    "patient_id": "0d28e7ff-7d42-4d1a-a889-063ef908db4f",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 4,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ellis skips his prescribed medicine again. His pressure stays very high. He looks droopy with low energy and very low comfort. His breathing stays even. He needs care and a plan.",
    "teaching": "High blood pressure often has no symptoms, so feeling fine does not mean pressure is low.",
    "animation_cue": "worried",
    "memory": "First visit: running high. Tried \"Skip meds — feeling fine!\" → very high. Tried \"Skip meds — feeling fine!\" → very high."
  },
  {
    "id": "72e2f4b9-d07d-444e-8a1a-db35586a4822",
    "patient_id": "0d28e7ff-7d42-4d1a-a889-063ef908db4f",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "The nurse gently stops Ellis from taking extra medicine. His pressure stays very high. He looks droopy with low energy and low comfort. His breathing stays even. He stays held steady.",
    "teaching": "Taking more than prescribed can make pressure drop too low and cause falls.",
    "animation_cue": "worried",
    "memory": "First visit: running high. Tried \"Skip meds — feeling fine!\" → very high. A risky idea came up; we steered clear."
  },
  {
    "id": "a499bff2-433b-48c6-b013-279928d97d51",
    "patient_id": "1c89a34a-8ae5-444d-ba9d-3105f6484113",
    "depth": 0,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Nina sits with her book closed. Swallowing hurts and her throat looks very red. The cozy clinic feels calm around her.",
    "teaching": "Sore throats without a cough get a closer look — strep hides there.",
    "animation_cue": "idle",
    "memory": "First visit: strep-sore."
  },
  {
    "id": "b485ed54-15a8-43c3-9523-4c881995b22b",
    "patient_id": "1c89a34a-8ae5-444d-ba9d-3105f6484113",
    "depth": 1,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Nina finishes every dose of the throat medicine. Her throat feels a little scratchy. She looks perky and rests softly in the cozy room.",
    "teaching": "Finishing every antibiotic dose clears the strep germ for good.",
    "animation_cue": "recovery",
    "memory": "First visit: strep-sore. Tried \"Finish all the throat medicine\" → scratchy."
  },
  {
    "id": "56aa12ea-ec52-4312-bb4a-f89f9f39d549",
    "patient_id": "1c89a34a-8ae5-444d-ba9d-3105f6484113",
    "depth": 1,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Nina rests with warm drinks. Her throat is very sore and swallowing hurts. She looks droopy and rests softly in the cozy room.",
    "teaching": "Warm drinks soothe pain while medicine fights the germ.",
    "animation_cue": "worried",
    "memory": "First visit: strep-sore. Tried \"Rest with warm drinks\" → strep-sore."
  },
  {
    "id": "33e7242c-35ec-4fbe-9af8-d92bdff10b58",
    "patient_id": "1c89a34a-8ae5-444d-ba9d-3105f6484113",
    "depth": 1,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Nina stops the medicine early. Her throat burns and she feels feverish. She looks droopy and rests softly in the cozy room.",
    "teaching": "Leftover germs bounce back when doses stop early.",
    "animation_cue": "sick",
    "memory": "First visit: strep-sore. Tried \"Stop medicine once feeling better\" → miserable."
  },
  {
    "id": "ac8cf751-881f-44e5-b4b7-92aa6dd8dbab",
    "patient_id": "1c89a34a-8ae5-444d-ba9d-3105f6484113",
    "depth": 1,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Nina starts to gargle the burning hot sauce, but a helper gently stops her. Her throat is very sore and swallowing hurts. She does not get worse.",
    "teaching": "Scalding drinks burn sore throats instead of healing them.",
    "animation_cue": "worried",
    "memory": "First visit: strep-sore. A risky idea came up; we steered clear."
  },
  {
    "id": "0a88baeb-e51b-492c-9eda-c84f8d41c64a",
    "patient_id": "1c89a34a-8ae5-444d-ba9d-3105f6484113",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 10,
      "comfort": 10,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Nina keeps finishing every dose of throat medicine. Her throat feels comfy and swallowing is easy. She looks perky and cozy.",
    "teaching": "Finishing every antibiotic dose clears the strep germ for good.",
    "animation_cue": "happy",
    "memory": "First visit: strep-sore. Tried \"Finish all the throat medicine\" → scratchy. Tried \"Finish all the throat medicine\" → comfy."
  },
  {
    "id": "4c394f29-70fb-4a01-b6f0-dd0f336f9eef",
    "patient_id": "1c89a34a-8ae5-444d-ba9d-3105f6484113",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Nina keeps resting with warm drinks. Her throat feels a little scratchy. She looks comfortable and cozy.",
    "teaching": "Warm drinks soothe pain while medicine fights the germ.",
    "animation_cue": "worried",
    "memory": "First visit: strep-sore. Tried \"Finish all the throat medicine\" → scratchy. Tried \"Rest with warm drinks\" → scratchy."
  },
  {
    "id": "ab4f2b6d-5d15-4fb9-8772-62c74e3f5ca9",
    "patient_id": "1c89a34a-8ae5-444d-ba9d-3105f6484113",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Nina keeps skipping the rest of the medicine. Her throat is very sore and swallowing hurts. She looks droopy and cozy.",
    "teaching": "Leftover germs bounce back when doses stop early.",
    "animation_cue": "sick",
    "memory": "First visit: strep-sore. Tried \"Finish all the throat medicine\" → scratchy. Tried \"Stop medicine once feeling better\" → strep-sore."
  },
  {
    "id": "2ecfba54-7a25-4e3f-b576-01d93907e147",
    "patient_id": "1c89a34a-8ae5-444d-ba9d-3105f6484113",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Nina starts to gargle the burning hot sauce, but a helper gently stops her. Her throat feels a little scratchy. She does not get worse.",
    "teaching": "Scalding drinks burn sore throats instead of healing them.",
    "animation_cue": "worried",
    "memory": "First visit: strep-sore. Tried \"Finish all the throat medicine\" → scratchy. A risky idea came up; we steered clear."
  },
  {
    "id": "04204f25-9a94-4f35-aea4-be744b5489b4",
    "patient_id": "1c89a34a-8ae5-444d-ba9d-3105f6484113",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Nina keeps finishing every dose of throat medicine. Her throat feels a little scratchy. She looks perky and cozy.",
    "teaching": "Finishing every antibiotic dose clears the strep germ for good.",
    "animation_cue": "recovery",
    "memory": "First visit: strep-sore. Tried \"Rest with warm drinks\" → strep-sore. Tried \"Finish all the throat medicine\" → scratchy."
  },
  {
    "id": "4109b7fa-5c39-4508-9ac9-c533a1c338fd",
    "patient_id": "1c89a34a-8ae5-444d-ba9d-3105f6484113",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Nina keeps resting with warm drinks. Her throat is very sore and swallowing hurts. She looks droopy and cozy.",
    "teaching": "Warm drinks soothe pain while medicine fights the germ.",
    "animation_cue": "worried",
    "memory": "First visit: strep-sore. Tried \"Rest with warm drinks\" → strep-sore. Tried \"Rest with warm drinks\" → strep-sore."
  },
  {
    "id": "9a08487b-761c-4986-91cd-16385202eabd",
    "patient_id": "1c89a34a-8ae5-444d-ba9d-3105f6484113",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Nina keeps skipping the rest of the medicine. Her throat burns and she feels feverish. She looks droopy and cozy.",
    "teaching": "Leftover germs bounce back when doses stop early.",
    "animation_cue": "sick",
    "memory": "First visit: strep-sore. Tried \"Rest with warm drinks\" → strep-sore. Tried \"Stop medicine once feeling better\" → miserable."
  },
  {
    "id": "df7438fa-ddb5-496d-a6d2-5ae9dddd28c5",
    "patient_id": "1c89a34a-8ae5-444d-ba9d-3105f6484113",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Nina starts to gargle the burning hot sauce, but a helper gently stops her. Her throat is very sore and swallowing hurts. She does not get worse.",
    "teaching": "Scalding drinks burn sore throats instead of healing them.",
    "animation_cue": "worried",
    "memory": "First visit: strep-sore. Tried \"Rest with warm drinks\" → strep-sore. A risky idea came up; we steered clear."
  },
  {
    "id": "615f642c-8208-46b6-8c6b-bf11bd301a86",
    "patient_id": "1c89a34a-8ae5-444d-ba9d-3105f6484113",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Nina keeps finishing every dose of throat medicine. Her throat is very sore and swallowing hurts. She looks perky and cozy.",
    "teaching": "Finishing every antibiotic dose clears the strep germ for good.",
    "animation_cue": "recovery",
    "memory": "First visit: strep-sore. Tried \"Stop medicine once feeling better\" → miserable. Tried \"Finish all the throat medicine\" → strep-sore."
  },
  {
    "id": "f5d76a5f-4138-4454-a2e1-fc5565a99554",
    "patient_id": "1c89a34a-8ae5-444d-ba9d-3105f6484113",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Nina keeps resting with warm drinks. Her throat burns and she feels feverish. She looks droopy and cozy.",
    "teaching": "Warm drinks soothe pain while medicine fights the germ.",
    "animation_cue": "worried",
    "memory": "First visit: strep-sore. Tried \"Stop medicine once feeling better\" → miserable. Tried \"Rest with warm drinks\" → miserable."
  },
  {
    "id": "9458d4d7-467f-4396-9ff1-47013d2feeaf",
    "patient_id": "1c89a34a-8ae5-444d-ba9d-3105f6484113",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 4,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Nina keeps skipping the rest of the medicine. Her throat burns and she feels feverish. She looks droopy and cozy.",
    "teaching": "Leftover germs bounce back when doses stop early.",
    "animation_cue": "worried",
    "memory": "First visit: strep-sore. Tried \"Stop medicine once feeling better\" → miserable. Tried \"Stop medicine once feeling better\" → miserable."
  },
  {
    "id": "433c0b9a-7e28-4ec4-bcde-368085f0e847",
    "patient_id": "1c89a34a-8ae5-444d-ba9d-3105f6484113",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Nina starts to gargle the burning hot sauce, but a helper gently stops her. Her throat burns and she feels feverish. She does not get worse.",
    "teaching": "Scalding drinks burn sore throats instead of healing them.",
    "animation_cue": "worried",
    "memory": "First visit: strep-sore. Tried \"Stop medicine once feeling better\" → miserable. A risky idea came up; we steered clear."
  },
  {
    "id": "994c2111-9945-47f4-866a-8b01fce75628",
    "patient_id": "189ed712-243f-421f-930c-c4e2a6c0919c",
    "depth": 0,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Kai holds his toy drum but will not play it. One ear throbs and everything sounds fuzzy. The cozy clinic feels calm around him.",
    "teaching": "Ear tugging plus fever means the scope comes out.",
    "animation_cue": "idle",
    "memory": "First visit: throbby."
  },
  {
    "id": "a3f9b322-93b3-4ca6-94ec-49cb6186f730",
    "patient_id": "189ed712-243f-421f-930c-c4e2a6c0919c",
    "depth": 1,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Kai takes every dose of the ear medicine. One ear aches a little. He looks perky and rests softly in the cozy room.",
    "teaching": "Every finished dose drives the ear germ out.",
    "animation_cue": "recovery",
    "memory": "First visit: throbby. Tried \"Give the ear medicine as directed\" → achy."
  },
  {
    "id": "52148058-ddb9-49ea-bad2-5554a0dac313",
    "patient_id": "189ed712-243f-421f-930c-c4e2a6c0919c",
    "depth": 1,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Kai rests with a warm cloth on the sore ear. His ear throbs and feels full of cotton. He looks droopy and rests softly in the cozy room.",
    "teaching": "Gentle warmth eases ear pain between doses.",
    "animation_cue": "worried",
    "memory": "First visit: throbby. Tried \"Warm cloth + quiet rest\" → throbby."
  },
  {
    "id": "371b9bc3-6886-4743-adb3-9e54e2a48b76",
    "patient_id": "189ed712-243f-421f-930c-c4e2a6c0919c",
    "depth": 1,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Kai pokes the sore ear with a swab. His ear pounds and he feels feverish. He looks droopy and rests softly in the cozy room.",
    "teaching": "Swabs push wax and germs deeper — scopes look, swabs never poke.",
    "animation_cue": "sick",
    "memory": "First visit: throbby. Tried \"Poke inside with a cotton swab\" → miserable."
  },
  {
    "id": "eb62fb5d-2538-43ae-b647-a44ec0b8fcce",
    "patient_id": "189ed712-243f-421f-930c-c4e2a6c0919c",
    "depth": 1,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Kai starts to shout into the sore ear, but a helper gently stops him. His ear throbs and feels full of cotton. He does not get worse.",
    "teaching": "Loud blasts hurt sore ears instead of clearing them.",
    "animation_cue": "worried",
    "memory": "First visit: throbby. A risky idea came up; we steered clear."
  },
  {
    "id": "f223aadc-3481-428c-8b95-91829dacaaab",
    "patient_id": "189ed712-243f-421f-930c-c4e2a6c0919c",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 10,
      "comfort": 10,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Kai keeps taking every dose of ear medicine. His ears feel clear and every giggle comes through. He looks perky and cozy.",
    "teaching": "Every finished dose drives the ear germ out.",
    "animation_cue": "happy",
    "memory": "First visit: throbby. Tried \"Give the ear medicine as directed\" → achy. Tried \"Give the ear medicine as directed\" → clear."
  },
  {
    "id": "788bec82-17a5-4079-a9e0-29d16e5664dd",
    "patient_id": "189ed712-243f-421f-930c-c4e2a6c0919c",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Kai keeps resting with the warm cloth. One ear aches a little. He looks comfortable and cozy.",
    "teaching": "Gentle warmth eases ear pain between doses.",
    "animation_cue": "worried",
    "memory": "First visit: throbby. Tried \"Give the ear medicine as directed\" → achy. Tried \"Warm cloth + quiet rest\" → achy."
  },
  {
    "id": "be56e1af-fc3e-4f10-9840-bfbd9022866b",
    "patient_id": "189ed712-243f-421f-930c-c4e2a6c0919c",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Kai keeps poking the sore ear. His ear throbs and feels full of cotton. He looks droopy and cozy.",
    "teaching": "Swabs push wax and germs deeper — scopes look, swabs never poke.",
    "animation_cue": "sick",
    "memory": "First visit: throbby. Tried \"Give the ear medicine as directed\" → achy. Tried \"Poke inside with a cotton swab\" → throbby."
  },
  {
    "id": "9e25628a-75e3-4609-9e4a-3faeef7ff02b",
    "patient_id": "189ed712-243f-421f-930c-c4e2a6c0919c",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Kai starts to shout into the sore ear, but a helper gently stops him. One ear aches a little. He does not get worse.",
    "teaching": "Loud blasts hurt sore ears instead of clearing them.",
    "animation_cue": "worried",
    "memory": "First visit: throbby. Tried \"Give the ear medicine as directed\" → achy. A risky idea came up; we steered clear."
  },
  {
    "id": "5103b307-4d70-453a-b111-3fd01a9fa64d",
    "patient_id": "189ed712-243f-421f-930c-c4e2a6c0919c",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Kai keeps taking every dose of ear medicine. One ear aches a little. He looks perky and cozy.",
    "teaching": "Every finished dose drives the ear germ out.",
    "animation_cue": "recovery",
    "memory": "First visit: throbby. Tried \"Warm cloth + quiet rest\" → throbby. Tried \"Give the ear medicine as directed\" → achy."
  },
  {
    "id": "7f48768a-88aa-473b-8223-98a7d2546731",
    "patient_id": "189ed712-243f-421f-930c-c4e2a6c0919c",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Kai keeps resting with the warm cloth. His ear throbs and feels full of cotton. He looks droopy and cozy.",
    "teaching": "Gentle warmth eases ear pain between doses.",
    "animation_cue": "worried",
    "memory": "First visit: throbby. Tried \"Warm cloth + quiet rest\" → throbby. Tried \"Warm cloth + quiet rest\" → throbby."
  },
  {
    "id": "de5e08b3-6c61-430e-955c-a423b81ba04c",
    "patient_id": "189ed712-243f-421f-930c-c4e2a6c0919c",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Kai keeps poking the sore ear. His ear pounds and he feels feverish. He looks droopy and cozy.",
    "teaching": "Swabs push wax and germs deeper — scopes look, swabs never poke.",
    "animation_cue": "sick",
    "memory": "First visit: throbby. Tried \"Warm cloth + quiet rest\" → throbby. Tried \"Poke inside with a cotton swab\" → miserable."
  },
  {
    "id": "d1092396-0d39-4045-bafe-061bad58bc79",
    "patient_id": "189ed712-243f-421f-930c-c4e2a6c0919c",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Kai starts to shout into the sore ear, but a helper gently stops him. His ear throbs and feels full of cotton. He does not get worse.",
    "teaching": "Loud blasts hurt sore ears instead of clearing them.",
    "animation_cue": "worried",
    "memory": "First visit: throbby. Tried \"Warm cloth + quiet rest\" → throbby. A risky idea came up; we steered clear."
  },
  {
    "id": "a2df70b0-dc1c-4f37-b9d5-358834c309b0",
    "patient_id": "189ed712-243f-421f-930c-c4e2a6c0919c",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Kai keeps taking every dose of ear medicine. His ear throbs and feels full of cotton. He looks perky and cozy.",
    "teaching": "Every finished dose drives the ear germ out.",
    "animation_cue": "recovery",
    "memory": "First visit: throbby. Tried \"Poke inside with a cotton swab\" → miserable. Tried \"Give the ear medicine as directed\" → throbby."
  },
  {
    "id": "24030b60-7389-4f42-be00-5e970f6fbb0b",
    "patient_id": "189ed712-243f-421f-930c-c4e2a6c0919c",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Kai keeps resting with the warm cloth. His ear pounds and he feels feverish. He looks droopy and cozy.",
    "teaching": "Gentle warmth eases ear pain between doses.",
    "animation_cue": "worried",
    "memory": "First visit: throbby. Tried \"Poke inside with a cotton swab\" → miserable. Tried \"Warm cloth + quiet rest\" → miserable."
  },
  {
    "id": "502f44de-ca6f-4fed-8602-c9c8ee80414e",
    "patient_id": "189ed712-243f-421f-930c-c4e2a6c0919c",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 4,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Kai keeps poking the sore ear. His ear pounds and he feels feverish. He looks droopy and cozy.",
    "teaching": "Swabs push wax and germs deeper — scopes look, swabs never poke.",
    "animation_cue": "worried",
    "memory": "First visit: throbby. Tried \"Poke inside with a cotton swab\" → miserable. Tried \"Poke inside with a cotton swab\" → miserable."
  },
  {
    "id": "f5a23b75-a38e-4ee0-8ca9-e0c157c860a6",
    "patient_id": "189ed712-243f-421f-930c-c4e2a6c0919c",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Kai starts to shout into the sore ear, but a helper gently stops him. His ear pounds and he feels feverish. He does not get worse.",
    "teaching": "Loud blasts hurt sore ears instead of clearing them.",
    "animation_cue": "worried",
    "memory": "First visit: throbby. Tried \"Poke inside with a cotton swab\" → miserable. A risky idea came up; we steered clear."
  },
  {
    "id": "aa39343c-2cc3-4d80-bc80-b1773146f557",
    "patient_id": "e8c1a7f5-ccd4-47b0-9cd0-804b1058b686",
    "depth": 0,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ada sets down her sketchbook. Red itchy patches flare in her elbow bends. The cozy clinic feels calm around her.",
    "teaching": "Itchy crease patches that come and go spell eczema.",
    "animation_cue": "idle",
    "memory": "First visit: flare-up."
  },
  {
    "id": "3000aadf-838d-4b37-affc-ba74af69b130",
    "patient_id": "e8c1a7f5-ccd4-47b0-9cd0-804b1058b686",
    "depth": 1,
    "stage_index": 1,
    "vitals": {
      "energy": 7,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Ada smooths on the gentle moisturizer. Her skin feels dry and a little tickly. She looks perky and rests softly in the cozy room.",
    "teaching": "Daily cream rebuilds the skin wall that keeps itch out.",
    "animation_cue": "recovery",
    "memory": "First visit: flare-up. Tried \"Daily gentle moisturizer\" → tickly."
  },
  {
    "id": "67abd77f-5c10-4a5e-b94f-61148c94af53",
    "patient_id": "e8c1a7f5-ccd4-47b0-9cd0-804b1058b686",
    "depth": 1,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ada keeps her nails short and cool. Red itchy patches are flaring in her bends. She looks droopy and rests softly in the cozy room.",
    "teaching": "Short nails turn scratching from harm into a tickle.",
    "animation_cue": "worried",
    "memory": "First visit: flare-up. Tried \"Keep nails short + cool\" → flare-up."
  },
  {
    "id": "3b8ab05d-0a82-46ec-85ab-5573b8100fe5",
    "patient_id": "e8c1a7f5-ccd4-47b0-9cd0-804b1058b686",
    "depth": 1,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ada scratches the itchy spots hard. Her skin is very sore and scratchy. She looks droopy and rests softly in the cozy room.",
    "teaching": "Scratching breaks skin and lets germs march in.",
    "animation_cue": "sick",
    "memory": "First visit: flare-up. Tried \"Scratch the itchy spots\" → very sore."
  },
  {
    "id": "73d63a9a-2719-4031-af9b-f2c44763ac0b",
    "patient_id": "e8c1a7f5-ccd4-47b0-9cd0-804b1058b686",
    "depth": 1,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ada starts to scrub the patches with the rough brush, but a helper gently stops her. Red itchy patches are flaring in her bends. She does not get worse.",
    "teaching": "Rough scrubbing tears sore skin instead of calming it.",
    "animation_cue": "worried",
    "memory": "First visit: flare-up. A risky idea came up; we steered clear."
  },
  {
    "id": "bf269132-e782-4be1-ac68-9b9a869edf4d",
    "patient_id": "e8c1a7f5-ccd4-47b0-9cd0-804b1058b686",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 8,
      "comfort": 10,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Ada keeps smoothing on moisturizer every day. Her skin feels smooth and calm. She looks perky and cozy.",
    "teaching": "Daily cream rebuilds the skin wall that keeps itch out.",
    "animation_cue": "happy",
    "memory": "First visit: flare-up. Tried \"Daily gentle moisturizer\" → tickly. Tried \"Daily gentle moisturizer\" → smooth."
  },
  {
    "id": "dbabfa19-f735-4d81-b622-32de7af31966",
    "patient_id": "e8c1a7f5-ccd4-47b0-9cd0-804b1058b686",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 7,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Ada keeps tending her short nails. Her skin feels dry and a little tickly. She looks comfortable and cozy.",
    "teaching": "Short nails turn scratching from harm into a tickle.",
    "animation_cue": "worried",
    "memory": "First visit: flare-up. Tried \"Daily gentle moisturizer\" → tickly. Tried \"Keep nails short + cool\" → tickly."
  },
  {
    "id": "9f5340fe-5129-46b4-b115-e9e425d747bd",
    "patient_id": "e8c1a7f5-ccd4-47b0-9cd0-804b1058b686",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 7,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ada keeps scratching the itchy spots. Red itchy patches are flaring in her bends. She looks droopy and cozy.",
    "teaching": "Scratching breaks skin and lets germs march in.",
    "animation_cue": "sick",
    "memory": "First visit: flare-up. Tried \"Daily gentle moisturizer\" → tickly. Tried \"Scratch the itchy spots\" → flare-up."
  },
  {
    "id": "1a115c62-6c82-4d6c-9085-53aa5d4213a7",
    "patient_id": "e8c1a7f5-ccd4-47b0-9cd0-804b1058b686",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 7,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Ada starts to scrub the patches with the rough brush, but a helper gently stops her. Her skin feels dry and a little tickly. She does not get worse.",
    "teaching": "Rough scrubbing tears sore skin instead of calming it.",
    "animation_cue": "worried",
    "memory": "First visit: flare-up. Tried \"Daily gentle moisturizer\" → tickly. A risky idea came up; we steered clear."
  },
  {
    "id": "17bafe3d-6a52-4a11-878b-3c9777400b52",
    "patient_id": "e8c1a7f5-ccd4-47b0-9cd0-804b1058b686",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 7,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Ada keeps smoothing on moisturizer every day. Her skin feels dry and a little tickly. She looks perky and cozy.",
    "teaching": "Daily cream rebuilds the skin wall that keeps itch out.",
    "animation_cue": "recovery",
    "memory": "First visit: flare-up. Tried \"Keep nails short + cool\" → flare-up. Tried \"Daily gentle moisturizer\" → tickly."
  },
  {
    "id": "002b9ab0-e612-44b8-a48f-27cf5b453aff",
    "patient_id": "e8c1a7f5-ccd4-47b0-9cd0-804b1058b686",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ada keeps tending her short nails. Red itchy patches are flaring in her bends. She looks droopy and cozy.",
    "teaching": "Short nails turn scratching from harm into a tickle.",
    "animation_cue": "worried",
    "memory": "First visit: flare-up. Tried \"Keep nails short + cool\" → flare-up. Tried \"Keep nails short + cool\" → flare-up."
  },
  {
    "id": "93b92e9f-b9d3-4153-9aa5-e09556c1865f",
    "patient_id": "e8c1a7f5-ccd4-47b0-9cd0-804b1058b686",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ada keeps scratching the itchy spots. Her skin is very sore and scratchy. She looks droopy and cozy.",
    "teaching": "Scratching breaks skin and lets germs march in.",
    "animation_cue": "sick",
    "memory": "First visit: flare-up. Tried \"Keep nails short + cool\" → flare-up. Tried \"Scratch the itchy spots\" → very sore."
  },
  {
    "id": "d87d1f3f-2c1a-4588-8c2c-3165a80858d7",
    "patient_id": "e8c1a7f5-ccd4-47b0-9cd0-804b1058b686",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ada starts to scrub the patches with the rough brush, but a helper gently stops her. Red itchy patches are flaring in her bends. She does not get worse.",
    "teaching": "Rough scrubbing tears sore skin instead of calming it.",
    "animation_cue": "worried",
    "memory": "First visit: flare-up. Tried \"Keep nails short + cool\" → flare-up. A risky idea came up; we steered clear."
  },
  {
    "id": "dd71e30e-67ce-412b-bf5b-9d3f2b3f1461",
    "patient_id": "e8c1a7f5-ccd4-47b0-9cd0-804b1058b686",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 7,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Ada keeps smoothing on moisturizer every day. Red itchy patches are flaring in her bends. She looks perky and cozy.",
    "teaching": "Daily cream rebuilds the skin wall that keeps itch out.",
    "animation_cue": "recovery",
    "memory": "First visit: flare-up. Tried \"Scratch the itchy spots\" → very sore. Tried \"Daily gentle moisturizer\" → flare-up."
  },
  {
    "id": "24640e6b-ad3f-44ec-818e-276dab05aaac",
    "patient_id": "e8c1a7f5-ccd4-47b0-9cd0-804b1058b686",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ada keeps tending her short nails. Her skin is very sore and scratchy. She looks droopy and cozy.",
    "teaching": "Short nails turn scratching from harm into a tickle.",
    "animation_cue": "worried",
    "memory": "First visit: flare-up. Tried \"Scratch the itchy spots\" → very sore. Tried \"Keep nails short + cool\" → very sore."
  },
  {
    "id": "bb206606-0b8f-4b7b-809d-baa4caf1fcc5",
    "patient_id": "e8c1a7f5-ccd4-47b0-9cd0-804b1058b686",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 4,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ada keeps scratching the itchy spots. Her skin is very sore and scratchy. She looks droopy and cozy.",
    "teaching": "Scratching breaks skin and lets germs march in.",
    "animation_cue": "worried",
    "memory": "First visit: flare-up. Tried \"Scratch the itchy spots\" → very sore. Tried \"Scratch the itchy spots\" → very sore."
  },
  {
    "id": "1b513994-a8d3-4571-986c-c968d288bff9",
    "patient_id": "e8c1a7f5-ccd4-47b0-9cd0-804b1058b686",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ada starts to scrub the patches with the rough brush, but a helper gently stops her. Her skin is very sore and scratchy. She does not get worse.",
    "teaching": "Rough scrubbing tears sore skin instead of calming it.",
    "animation_cue": "worried",
    "memory": "First visit: flare-up. Tried \"Scratch the itchy spots\" → very sore. A risky idea came up; we steered clear."
  },
  {
    "id": "7c29b7e4-c297-4169-b0b8-6492f2ba648d",
    "patient_id": "0803d835-aaa8-47db-84f2-7308feba3541",
    "depth": 0,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Felix leans on the exam bench, flour on his sleeve. A deep cough shakes him and his breathing runs fast. The cozy clinic feels calm around him.",
    "teaching": "Fever plus a deep chesty cough means the lungs get listened to first.",
    "animation_cue": "idle",
    "memory": "First visit: feverish."
  },
  {
    "id": "705ad02b-abac-44d3-ab2b-0399c37ea4ac",
    "patient_id": "0803d835-aaa8-47db-84f2-7308feba3541",
    "depth": 1,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 7
    },
    "mood": "perky",
    "narrative": "Felix starts the lung medicine right away. A deep cough rattles now and then. He looks perky and rests softly in the cozy room.",
    "teaching": "Early antibiotics stop lung infections before they spread.",
    "animation_cue": "recovery",
    "memory": "First visit: feverish. Tried \"Start the lung medicine fast\" → coughy."
  },
  {
    "id": "b4658e30-6d6b-4003-abef-29f2308bfffa",
    "patient_id": "0803d835-aaa8-47db-84f2-7308feba3541",
    "depth": 1,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Felix rests with warm fluids. Fever grips him and the deep cough keeps coming. He looks droopy and rests softly in the cozy room.",
    "teaching": "Rest and fluids support healing while medicine works.",
    "animation_cue": "worried",
    "memory": "First visit: feverish. Tried \"Rest with warm fluids\" → feverish."
  },
  {
    "id": "06b8b04f-8770-449a-9e82-efa80208b32e",
    "patient_id": "0803d835-aaa8-47db-84f2-7308feba3541",
    "depth": 1,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Felix hides the cough and waits alone. He breathes fast and hard, and it costs him. He looks droopy and rests softly in the cozy room.",
    "teaching": "Hidden lung infections only dig in deeper.",
    "animation_cue": "sick",
    "memory": "First visit: feverish. Tried \"Hide it and wait alone\" → breathless."
  },
  {
    "id": "c5d2fc89-043b-4e97-974f-bb7172571bca",
    "patient_id": "0803d835-aaa8-47db-84f2-7308feba3541",
    "depth": 1,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Felix starts to sprint the race to clear his lungs, but a helper gently stops him. Fever grips him and the deep cough keeps coming. He does not get worse.",
    "teaching": "Sprinting on sick lungs steals air instead of clearing it.",
    "animation_cue": "worried",
    "memory": "First visit: feverish. A risky idea came up; we steered clear."
  },
  {
    "id": "bc4cbed6-8027-43df-a7c9-e49010a6b8b7",
    "patient_id": "0803d835-aaa8-47db-84f2-7308feba3541",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 10,
      "comfort": 8,
      "breathing": 8
    },
    "mood": "perky",
    "narrative": "Felix keeps taking the lung medicine on schedule. His breathing feels clear and easy. He looks perky and cozy.",
    "teaching": "Early antibiotics stop lung infections before they spread.",
    "animation_cue": "happy",
    "memory": "First visit: feverish. Tried \"Start the lung medicine fast\" → coughy. Tried \"Start the lung medicine fast\" → clear."
  },
  {
    "id": "0db3a3e2-5efa-488c-9b67-fdc246d51234",
    "patient_id": "0803d835-aaa8-47db-84f2-7308feba3541",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 9,
      "comfort": 9,
      "breathing": 7
    },
    "mood": "perky",
    "narrative": "Felix keeps resting with warm fluids. His breathing feels clear and easy. He looks perky and cozy.",
    "teaching": "Rest and fluids support healing while medicine works.",
    "animation_cue": "happy",
    "memory": "First visit: feverish. Tried \"Start the lung medicine fast\" → coughy. Tried \"Rest with warm fluids\" → clear."
  },
  {
    "id": "89060b3d-b3f5-4fff-9906-b237e75bb151",
    "patient_id": "0803d835-aaa8-47db-84f2-7308feba3541",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 8,
      "comfort": 6,
      "breathing": 7
    },
    "mood": "droopy",
    "narrative": "Felix keeps hiding the cough and waiting. Fever grips him and the deep cough keeps coming. He looks droopy and cozy.",
    "teaching": "Hidden lung infections only dig in deeper.",
    "animation_cue": "sick",
    "memory": "First visit: feverish. Tried \"Start the lung medicine fast\" → coughy. Tried \"Hide it and wait alone\" → feverish."
  },
  {
    "id": "5a4a8f50-6870-4c8d-b750-fa72c0c0e1c4",
    "patient_id": "0803d835-aaa8-47db-84f2-7308feba3541",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 7
    },
    "mood": "perky",
    "narrative": "Felix starts to sprint the race to clear his lungs, but a helper gently stops him. A deep cough rattles now and then. He does not get worse.",
    "teaching": "Sprinting on sick lungs steals air instead of clearing it.",
    "animation_cue": "worried",
    "memory": "First visit: feverish. Tried \"Start the lung medicine fast\" → coughy. A risky idea came up; we steered clear."
  },
  {
    "id": "c8a9bad4-a289-46a1-b083-e79d76e5430d",
    "patient_id": "0803d835-aaa8-47db-84f2-7308feba3541",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 7
    },
    "mood": "perky",
    "narrative": "Felix keeps taking the lung medicine on schedule. A deep cough rattles now and then. He looks perky and cozy.",
    "teaching": "Early antibiotics stop lung infections before they spread.",
    "animation_cue": "recovery",
    "memory": "First visit: feverish. Tried \"Rest with warm fluids\" → feverish. Tried \"Start the lung medicine fast\" → coughy."
  },
  {
    "id": "7eaf029a-057a-4d5b-8213-08c8d563e322",
    "patient_id": "0803d835-aaa8-47db-84f2-7308feba3541",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Felix keeps resting with warm fluids. Fever grips him and the deep cough keeps coming. He looks droopy and cozy.",
    "teaching": "Rest and fluids support healing while medicine works.",
    "animation_cue": "worried",
    "memory": "First visit: feverish. Tried \"Rest with warm fluids\" → feverish. Tried \"Rest with warm fluids\" → feverish."
  },
  {
    "id": "aa20ff3b-71c6-4860-9227-bc1e7acc045b",
    "patient_id": "0803d835-aaa8-47db-84f2-7308feba3541",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Felix keeps hiding the cough and waiting. He breathes fast and hard, and it costs him. He looks droopy and cozy.",
    "teaching": "Hidden lung infections only dig in deeper.",
    "animation_cue": "sick",
    "memory": "First visit: feverish. Tried \"Rest with warm fluids\" → feverish. Tried \"Hide it and wait alone\" → breathless."
  },
  {
    "id": "bfce545f-114e-422d-b485-8e299bc34a47",
    "patient_id": "0803d835-aaa8-47db-84f2-7308feba3541",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Felix starts to sprint the race to clear his lungs, but a helper gently stops him. Fever grips him and the deep cough keeps coming. He does not get worse.",
    "teaching": "Sprinting on sick lungs steals air instead of clearing it.",
    "animation_cue": "worried",
    "memory": "First visit: feverish. Tried \"Rest with warm fluids\" → feverish. A risky idea came up; we steered clear."
  },
  {
    "id": "67f00b3e-734e-40b2-8fd4-229118200f22",
    "patient_id": "0803d835-aaa8-47db-84f2-7308feba3541",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 8,
      "comfort": 6,
      "breathing": 7
    },
    "mood": "perky",
    "narrative": "Felix keeps taking the lung medicine on schedule. Fever grips him and the deep cough keeps coming. He looks perky and cozy.",
    "teaching": "Early antibiotics stop lung infections before they spread.",
    "animation_cue": "recovery",
    "memory": "First visit: feverish. Tried \"Hide it and wait alone\" → breathless. Tried \"Start the lung medicine fast\" → feverish."
  },
  {
    "id": "2387ef0d-d334-463f-884b-6f969fe9c64d",
    "patient_id": "0803d835-aaa8-47db-84f2-7308feba3541",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Felix keeps resting with warm fluids. He breathes fast and hard, and it costs him. He looks droopy and cozy.",
    "teaching": "Rest and fluids support healing while medicine works.",
    "animation_cue": "worried",
    "memory": "First visit: feverish. Tried \"Hide it and wait alone\" → breathless. Tried \"Rest with warm fluids\" → breathless."
  },
  {
    "id": "31d1ec1d-0d5a-4940-9c19-282e34434f63",
    "patient_id": "0803d835-aaa8-47db-84f2-7308feba3541",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 4,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Felix keeps hiding the cough and waiting. He breathes fast and hard, and it costs him. He looks droopy and cozy.",
    "teaching": "Hidden lung infections only dig in deeper.",
    "animation_cue": "worried",
    "memory": "First visit: feverish. Tried \"Hide it and wait alone\" → breathless. Tried \"Hide it and wait alone\" → breathless."
  },
  {
    "id": "c44fd32d-2e81-4eb4-bd2c-a268e0a637c6",
    "patient_id": "0803d835-aaa8-47db-84f2-7308feba3541",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Felix starts to sprint the race to clear his lungs, but a helper gently stops him. He breathes fast and hard, and it costs him. He does not get worse.",
    "teaching": "Sprinting on sick lungs steals air instead of clearing it.",
    "animation_cue": "worried",
    "memory": "First visit: feverish. Tried \"Hide it and wait alone\" → breathless. A risky idea came up; we steered clear."
  },
  {
    "id": "9a5880fc-3a8a-4699-948e-18545cf443e7",
    "patient_id": "a7ac7cf2-a6c5-407f-aab8-cd5fb085bcd5",
    "depth": 0,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Hugo coughs a seal-bark into his blanket fort. Each breath in rasps and rattles. The cozy clinic feels calm around him.",
    "teaching": "A seal-bark cough with noisy breathing in points at croup.",
    "animation_cue": "idle",
    "memory": "First visit: barky."
  },
  {
    "id": "6c0f2c66-47c8-4b7d-a696-7744b1b4c20a",
    "patient_id": "a7ac7cf2-a6c5-407f-aab8-cd5fb085bcd5",
    "depth": 1,
    "stage_index": 1,
    "vitals": {
      "energy": 7,
      "comfort": 8,
      "breathing": 7
    },
    "mood": "perky",
    "narrative": "Hugo takes the special steroid dose. His voice sounds a little croaky. He looks perky and rests softly in the cozy room.",
    "teaching": "One steroid dose melts swollen airways open.",
    "animation_cue": "recovery",
    "memory": "First visit: barky. Tried \"Steroid dose from the doctor\" → hoarse."
  },
  {
    "id": "9f35d7c3-51b6-4cde-8d41-6c476fb08416",
    "patient_id": "a7ac7cf2-a6c5-407f-aab8-cd5fb085bcd5",
    "depth": 1,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Hugo rests calm in the cool night air. The seal-bark cough keeps coming at night. He looks droopy and rests softly in the cozy room.",
    "teaching": "Cool calm air soothes — medicine does the real fixing.",
    "animation_cue": "worried",
    "memory": "First visit: barky. Tried \"Calm rest in cool night air\" → barky."
  },
  {
    "id": "ac17a7ea-b0e8-4e07-8e0a-e8380899aa37",
    "patient_id": "a7ac7cf2-a6c5-407f-aab8-cd5fb085bcd5",
    "depth": 1,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Hugo swallows leftover antibiotics. Each breath in rasps and costs him. He looks droopy and rests softly in the cozy room.",
    "teaching": "Antibiotics cannot touch the croup virus.",
    "animation_cue": "sick",
    "memory": "First visit: barky. Tried \"Give leftover antibiotics\" → struggling."
  },
  {
    "id": "1be50a33-b942-46ee-91f5-dba129a6c751",
    "patient_id": "a7ac7cf2-a6c5-407f-aab8-cd5fb085bcd5",
    "depth": 1,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Hugo starts to lean over the boiling steam pot, but a helper gently stops him. The seal-bark cough keeps coming at night. He does not get worse.",
    "teaching": "Boiling steam scalds instead of soothing.",
    "animation_cue": "worried",
    "memory": "First visit: barky. A risky idea came up; we steered clear."
  },
  {
    "id": "d2f316fb-6536-40b1-a1bc-4114f22bb668",
    "patient_id": "a7ac7cf2-a6c5-407f-aab8-cd5fb085bcd5",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 8,
      "comfort": 10,
      "breathing": 8
    },
    "mood": "perky",
    "narrative": "Hugo keeps taking the steroid dose on schedule. His breathing is quiet and easy. He looks perky and cozy.",
    "teaching": "One steroid dose melts swollen airways open.",
    "animation_cue": "happy",
    "memory": "First visit: barky. Tried \"Steroid dose from the doctor\" → hoarse. Tried \"Steroid dose from the doctor\" → clear."
  },
  {
    "id": "fe5c841b-685d-4589-9582-b174f1ae8e38",
    "patient_id": "a7ac7cf2-a6c5-407f-aab8-cd5fb085bcd5",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 7,
      "comfort": 9,
      "breathing": 7
    },
    "mood": "okay",
    "narrative": "Hugo keeps resting calm in the cool air. His voice sounds a little croaky. He looks comfortable and cozy.",
    "teaching": "Cool calm air soothes — medicine does the real fixing.",
    "animation_cue": "worried",
    "memory": "First visit: barky. Tried \"Steroid dose from the doctor\" → hoarse. Tried \"Calm rest in cool night air\" → hoarse."
  },
  {
    "id": "e94d21ff-9590-4295-b08d-9f3534ec061b",
    "patient_id": "a7ac7cf2-a6c5-407f-aab8-cd5fb085bcd5",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 7,
      "comfort": 7,
      "breathing": 7
    },
    "mood": "droopy",
    "narrative": "Hugo keeps swallowing leftover antibiotics. The seal-bark cough keeps coming at night. He looks droopy and cozy.",
    "teaching": "Antibiotics cannot touch the croup virus.",
    "animation_cue": "sick",
    "memory": "First visit: barky. Tried \"Steroid dose from the doctor\" → hoarse. Tried \"Give leftover antibiotics\" → barky."
  },
  {
    "id": "7c43bac8-3f6b-4f3a-b5e0-ae42b35a1431",
    "patient_id": "a7ac7cf2-a6c5-407f-aab8-cd5fb085bcd5",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 7,
      "comfort": 8,
      "breathing": 7
    },
    "mood": "perky",
    "narrative": "Hugo starts to lean over the boiling steam pot, but a helper gently stops him. His voice sounds a little croaky. He does not get worse.",
    "teaching": "Boiling steam scalds instead of soothing.",
    "animation_cue": "worried",
    "memory": "First visit: barky. Tried \"Steroid dose from the doctor\" → hoarse. A risky idea came up; we steered clear."
  },
  {
    "id": "167d9d58-ced4-4e11-90d6-a820527d9ae2",
    "patient_id": "a7ac7cf2-a6c5-407f-aab8-cd5fb085bcd5",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 7,
      "comfort": 9,
      "breathing": 7
    },
    "mood": "perky",
    "narrative": "Hugo keeps taking the steroid dose on schedule. His voice sounds a little croaky. He looks perky and cozy.",
    "teaching": "One steroid dose melts swollen airways open.",
    "animation_cue": "recovery",
    "memory": "First visit: barky. Tried \"Calm rest in cool night air\" → barky. Tried \"Steroid dose from the doctor\" → hoarse."
  },
  {
    "id": "0d265cfb-66b3-4c9f-ab66-9be3e2dacde4",
    "patient_id": "a7ac7cf2-a6c5-407f-aab8-cd5fb085bcd5",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Hugo keeps resting calm in the cool air. The seal-bark cough keeps coming at night. He looks droopy and cozy.",
    "teaching": "Cool calm air soothes — medicine does the real fixing.",
    "animation_cue": "worried",
    "memory": "First visit: barky. Tried \"Calm rest in cool night air\" → barky. Tried \"Calm rest in cool night air\" → barky."
  },
  {
    "id": "91bd0a23-54de-46d1-8e6f-13a3d1bc4aff",
    "patient_id": "a7ac7cf2-a6c5-407f-aab8-cd5fb085bcd5",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Hugo keeps swallowing leftover antibiotics. Each breath in rasps and costs him. He looks droopy and cozy.",
    "teaching": "Antibiotics cannot touch the croup virus.",
    "animation_cue": "sick",
    "memory": "First visit: barky. Tried \"Calm rest in cool night air\" → barky. Tried \"Give leftover antibiotics\" → struggling."
  },
  {
    "id": "d273ccd3-ded2-4de4-9753-d8b09005f59c",
    "patient_id": "a7ac7cf2-a6c5-407f-aab8-cd5fb085bcd5",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Hugo starts to lean over the boiling steam pot, but a helper gently stops him. The seal-bark cough keeps coming at night. He does not get worse.",
    "teaching": "Boiling steam scalds instead of soothing.",
    "animation_cue": "worried",
    "memory": "First visit: barky. Tried \"Calm rest in cool night air\" → barky. A risky idea came up; we steered clear."
  },
  {
    "id": "b67fe0f1-7727-4e55-8d1c-9345f9051c7d",
    "patient_id": "a7ac7cf2-a6c5-407f-aab8-cd5fb085bcd5",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 7,
      "comfort": 7,
      "breathing": 7
    },
    "mood": "perky",
    "narrative": "Hugo keeps taking the steroid dose on schedule. The seal-bark cough keeps coming at night. He looks perky and cozy.",
    "teaching": "One steroid dose melts swollen airways open.",
    "animation_cue": "recovery",
    "memory": "First visit: barky. Tried \"Give leftover antibiotics\" → struggling. Tried \"Steroid dose from the doctor\" → barky."
  },
  {
    "id": "2ad1ef9a-3a9c-419e-91c1-7a7545596b7d",
    "patient_id": "a7ac7cf2-a6c5-407f-aab8-cd5fb085bcd5",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Hugo keeps resting calm in the cool air. Each breath in rasps and costs him. He looks droopy and cozy.",
    "teaching": "Cool calm air soothes — medicine does the real fixing.",
    "animation_cue": "worried",
    "memory": "First visit: barky. Tried \"Give leftover antibiotics\" → struggling. Tried \"Calm rest in cool night air\" → struggling."
  },
  {
    "id": "5b44fc5e-5e9a-43bb-96ae-b16c924abb27",
    "patient_id": "a7ac7cf2-a6c5-407f-aab8-cd5fb085bcd5",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 4,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Hugo keeps swallowing leftover antibiotics. Each breath in rasps and costs him. He looks droopy and cozy.",
    "teaching": "Antibiotics cannot touch the croup virus.",
    "animation_cue": "worried",
    "memory": "First visit: barky. Tried \"Give leftover antibiotics\" → struggling. Tried \"Give leftover antibiotics\" → struggling."
  },
  {
    "id": "c6678f00-fd2c-46e7-b8fc-90e560b79d61",
    "patient_id": "a7ac7cf2-a6c5-407f-aab8-cd5fb085bcd5",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Hugo starts to lean over the boiling steam pot, but a helper gently stops him. Each breath in rasps and costs him. He does not get worse.",
    "teaching": "Boiling steam scalds instead of soothing.",
    "animation_cue": "worried",
    "memory": "First visit: barky. Tried \"Give leftover antibiotics\" → struggling. A risky idea came up; we steered clear."
  },
  {
    "id": "f2d05a05-9743-4154-b8e5-f7591b3f50b9",
    "patient_id": "a01bc9f5-df58-40cc-a594-43d0133557dd",
    "depth": 0,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ivy pushes her snack away untouched. Mouth sores sting and spots dot her palms. The cozy clinic feels calm around her.",
    "teaching": "Mouth sores plus palm and sole spots spell hand-foot-mouth.",
    "animation_cue": "idle",
    "memory": "First visit: ouchy."
  },
  {
    "id": "adcf21de-cb47-423d-8846-43b5b0496a98",
    "patient_id": "a01bc9f5-df58-40cc-a594-43d0133557dd",
    "depth": 1,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Ivy sips cool drinks with gentle pain relief. Her mouth feels a little ouchy. She looks perky and rests softly in the cozy room.",
    "teaching": "Cool sips and pain relief soothe till the virus fades.",
    "animation_cue": "recovery",
    "memory": "First visit: ouchy. Tried \"Cool sips + gentle pain relief\" → picky."
  },
  {
    "id": "4dac56ce-2147-4919-929a-4643721c0b0d",
    "patient_id": "a01bc9f5-df58-40cc-a594-43d0133557dd",
    "depth": 1,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ivy rests quietly in bed all day. Mouth sores sting and she will not eat. She looks droopy and rests softly in the cozy room.",
    "teaching": "Rest helps, but the sore mouth still needs soothing.",
    "animation_cue": "worried",
    "memory": "First visit: ouchy. Tried \"Quiet bed rest all day\" → ouchy."
  },
  {
    "id": "84e3e066-d1bc-4789-8395-262b2b86d3b9",
    "patient_id": "a01bc9f5-df58-40cc-a594-43d0133557dd",
    "depth": 1,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ivy drinks the antibiotic syrup. Fever grips her and everything hurts. She looks droopy and rests softly in the cozy room.",
    "teaching": "Antibiotics cannot help a virus-caused rash.",
    "animation_cue": "sick",
    "memory": "First visit: ouchy. Tried \"Antibiotic syrup\" → miserable."
  },
  {
    "id": "c8bf1284-ae7c-4894-8645-1825fffd88ef",
    "patient_id": "a01bc9f5-df58-40cc-a594-43d0133557dd",
    "depth": 1,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ivy starts to pop the ouchy blisters, but a helper gently stops her. Mouth sores sting and she will not eat. She does not get worse.",
    "teaching": "Popped blisters invite germs in.",
    "animation_cue": "worried",
    "memory": "First visit: ouchy. A risky idea came up; we steered clear."
  },
  {
    "id": "a7420cb2-6189-4bea-9f45-4b498cdb8636",
    "patient_id": "a01bc9f5-df58-40cc-a594-43d0133557dd",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 10,
      "comfort": 10,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Ivy keeps sipping cool drinks. Her mouth feels comfy and she munches happily. She looks perky and cozy.",
    "teaching": "Cool sips and pain relief soothe till the virus fades.",
    "animation_cue": "happy",
    "memory": "First visit: ouchy. Tried \"Cool sips + gentle pain relief\" → picky. Tried \"Cool sips + gentle pain relief\" → munching."
  },
  {
    "id": "4535816b-bc6b-4e73-8378-2092aaa8fe0c",
    "patient_id": "a01bc9f5-df58-40cc-a594-43d0133557dd",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Ivy keeps resting quietly in bed. Her mouth feels a little ouchy. She looks comfortable and cozy.",
    "teaching": "Rest helps, but the sore mouth still needs soothing.",
    "animation_cue": "worried",
    "memory": "First visit: ouchy. Tried \"Cool sips + gentle pain relief\" → picky. Tried \"Quiet bed rest all day\" → picky."
  },
  {
    "id": "eb4f393c-3092-4de3-8629-ca106859394d",
    "patient_id": "a01bc9f5-df58-40cc-a594-43d0133557dd",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ivy keeps drinking antibiotic syrup. Mouth sores sting and she will not eat. She looks droopy and cozy.",
    "teaching": "Antibiotics cannot help a virus-caused rash.",
    "animation_cue": "sick",
    "memory": "First visit: ouchy. Tried \"Cool sips + gentle pain relief\" → picky. Tried \"Antibiotic syrup\" → ouchy."
  },
  {
    "id": "2e42c27d-1319-4cc0-9834-4add9e9fbf92",
    "patient_id": "a01bc9f5-df58-40cc-a594-43d0133557dd",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Ivy starts to pop the ouchy blisters, but a helper gently stops her. Her mouth feels a little ouchy. She does not get worse.",
    "teaching": "Popped blisters invite germs in.",
    "animation_cue": "worried",
    "memory": "First visit: ouchy. Tried \"Cool sips + gentle pain relief\" → picky. A risky idea came up; we steered clear."
  },
  {
    "id": "9a9bdbaf-75b0-4c68-8702-dd5470a3ce55",
    "patient_id": "a01bc9f5-df58-40cc-a594-43d0133557dd",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Ivy keeps sipping cool drinks. Her mouth feels a little ouchy. She looks perky and cozy.",
    "teaching": "Cool sips and pain relief soothe till the virus fades.",
    "animation_cue": "recovery",
    "memory": "First visit: ouchy. Tried \"Quiet bed rest all day\" → ouchy. Tried \"Cool sips + gentle pain relief\" → picky."
  },
  {
    "id": "7930f7f9-0e8e-455b-b2b1-4444e39b5c81",
    "patient_id": "a01bc9f5-df58-40cc-a594-43d0133557dd",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ivy keeps resting quietly in bed. Mouth sores sting and she will not eat. She looks droopy and cozy.",
    "teaching": "Rest helps, but the sore mouth still needs soothing.",
    "animation_cue": "worried",
    "memory": "First visit: ouchy. Tried \"Quiet bed rest all day\" → ouchy. Tried \"Quiet bed rest all day\" → ouchy."
  },
  {
    "id": "dacd22f2-2617-4e7f-b9b2-e36ff085ca33",
    "patient_id": "a01bc9f5-df58-40cc-a594-43d0133557dd",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ivy keeps drinking antibiotic syrup. Fever grips her and everything hurts. She looks droopy and cozy.",
    "teaching": "Antibiotics cannot help a virus-caused rash.",
    "animation_cue": "sick",
    "memory": "First visit: ouchy. Tried \"Quiet bed rest all day\" → ouchy. Tried \"Antibiotic syrup\" → miserable."
  },
  {
    "id": "a0e37aad-512a-4b69-8b99-6a2970562f6e",
    "patient_id": "a01bc9f5-df58-40cc-a594-43d0133557dd",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ivy starts to pop the ouchy blisters, but a helper gently stops her. Mouth sores sting and she will not eat. She does not get worse.",
    "teaching": "Popped blisters invite germs in.",
    "animation_cue": "worried",
    "memory": "First visit: ouchy. Tried \"Quiet bed rest all day\" → ouchy. A risky idea came up; we steered clear."
  },
  {
    "id": "f14529f7-2c7b-40d1-a766-23cc3660a2ea",
    "patient_id": "a01bc9f5-df58-40cc-a594-43d0133557dd",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Ivy keeps sipping cool drinks. Mouth sores sting and she will not eat. She looks perky and cozy.",
    "teaching": "Cool sips and pain relief soothe till the virus fades.",
    "animation_cue": "recovery",
    "memory": "First visit: ouchy. Tried \"Antibiotic syrup\" → miserable. Tried \"Cool sips + gentle pain relief\" → ouchy."
  },
  {
    "id": "24113db0-facf-4e8a-ae74-6e1a314ffebf",
    "patient_id": "a01bc9f5-df58-40cc-a594-43d0133557dd",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ivy keeps resting quietly in bed. Fever grips her and everything hurts. She looks droopy and cozy.",
    "teaching": "Rest helps, but the sore mouth still needs soothing.",
    "animation_cue": "worried",
    "memory": "First visit: ouchy. Tried \"Antibiotic syrup\" → miserable. Tried \"Quiet bed rest all day\" → miserable."
  },
  {
    "id": "1eca64e9-a88c-4bc8-ba24-62970b3acb1b",
    "patient_id": "a01bc9f5-df58-40cc-a594-43d0133557dd",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 4,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ivy keeps drinking antibiotic syrup. Fever grips her and everything hurts. She looks droopy and cozy.",
    "teaching": "Antibiotics cannot help a virus-caused rash.",
    "animation_cue": "worried",
    "memory": "First visit: ouchy. Tried \"Antibiotic syrup\" → miserable. Tried \"Antibiotic syrup\" → miserable."
  },
  {
    "id": "093d4a9d-d261-4465-bf8d-db3e8d9472f9",
    "patient_id": "a01bc9f5-df58-40cc-a594-43d0133557dd",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ivy starts to pop the ouchy blisters, but a helper gently stops her. Fever grips her and everything hurts. She does not get worse.",
    "teaching": "Popped blisters invite germs in.",
    "animation_cue": "worried",
    "memory": "First visit: ouchy. Tried \"Antibiotic syrup\" → miserable. A risky idea came up; we steered clear."
  },
  {
    "id": "48154f1b-4995-49ad-884b-d7d00d46bb00",
    "patient_id": "bd404ad6-baec-470c-80e3-3be3f93e87b3",
    "depth": 0,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Leo shows the round rash on his arm. The red ring keeps growing past the old tick bite. The cozy clinic feels calm around him.",
    "teaching": "A growing bullseye after a tick bite means Lyme.",
    "animation_cue": "idle",
    "memory": "First visit: bullseye."
  },
  {
    "id": "341e826f-7167-489c-8072-f9e341615822",
    "patient_id": "bd404ad6-baec-470c-80e3-3be3f93e87b3",
    "depth": 1,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Leo starts the full antibiotic course. A small red spot sits at the old bite. He looks perky and rests softly in the cozy room.",
    "teaching": "Every finished dose hunts the tick germ down.",
    "animation_cue": "recovery",
    "memory": "First visit: bullseye. Tried \"Finish the full antibiotic course\" → spotty."
  },
  {
    "id": "19c47980-07fb-446a-9565-9364c9bdd492",
    "patient_id": "bd404ad6-baec-470c-80e3-3be3f93e87b3",
    "depth": 1,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Leo pulls the tick and cleans the bite. The red bullseye ring keeps growing. He looks droopy and rests softly in the cozy room.",
    "teaching": "Tick pulling was right — the rash still needs medicine.",
    "animation_cue": "worried",
    "memory": "First visit: bullseye. Tried \"Pull the tick + clean the bite\" → bullseye."
  },
  {
    "id": "d05121df-1f8e-47c2-a87c-5e28a6a32e18",
    "patient_id": "bd404ad6-baec-470c-80e3-3be3f93e87b3",
    "depth": 1,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Leo rubs steroid cream on the rash. Fever and aches wear him down. He looks droopy and rests softly in the cozy room.",
    "teaching": "Cream cannot reach a germ riding the bloodstream.",
    "animation_cue": "sick",
    "memory": "First visit: bullseye. Tried \"Steroid cream on the rash\" → worn-out."
  },
  {
    "id": "35f2b367-028f-4572-9cfc-0ab6b3408c56",
    "patient_id": "bd404ad6-baec-470c-80e3-3be3f93e87b3",
    "depth": 1,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Leo starts to burn the tick off with a match, but a helper gently stops him. The red bullseye ring keeps growing. He does not get worse.",
    "teaching": "Burning a tick drives germs deeper.",
    "animation_cue": "worried",
    "memory": "First visit: bullseye. A risky idea came up; we steered clear."
  },
  {
    "id": "e3634041-6384-44bd-9ea1-38259b8edfb4",
    "patient_id": "bd404ad6-baec-470c-80e3-3be3f93e87b3",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 10,
      "comfort": 10,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Leo keeps finishing every antibiotic dose. The rash is gone and he roams free. He looks perky and cozy.",
    "teaching": "Every finished dose hunts the tick germ down.",
    "animation_cue": "happy",
    "memory": "First visit: bullseye. Tried \"Finish the full antibiotic course\" → spotty. Tried \"Finish the full antibiotic course\" → exploring."
  },
  {
    "id": "d9b5ddfb-633e-4ca1-b1e1-d9063ed376b8",
    "patient_id": "bd404ad6-baec-470c-80e3-3be3f93e87b3",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Leo keeps tending the clean bite. A small red spot sits at the old bite. He looks comfortable and cozy.",
    "teaching": "Tick pulling was right — the rash still needs medicine.",
    "animation_cue": "worried",
    "memory": "First visit: bullseye. Tried \"Finish the full antibiotic course\" → spotty. Tried \"Pull the tick + clean the bite\" → spotty."
  },
  {
    "id": "2b70bdfc-13ae-496f-b869-b27fd5262383",
    "patient_id": "bd404ad6-baec-470c-80e3-3be3f93e87b3",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Leo keeps rubbing steroid cream on the rash. The red bullseye ring keeps growing. He looks droopy and cozy.",
    "teaching": "Cream cannot reach a germ riding the bloodstream.",
    "animation_cue": "sick",
    "memory": "First visit: bullseye. Tried \"Finish the full antibiotic course\" → spotty. Tried \"Steroid cream on the rash\" → bullseye."
  },
  {
    "id": "8cc04c2f-8f7a-4e9b-a9c5-e7c45f21dff0",
    "patient_id": "bd404ad6-baec-470c-80e3-3be3f93e87b3",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Leo starts to burn the tick off with a match, but a helper gently stops him. A small red spot sits at the old bite. He does not get worse.",
    "teaching": "Burning a tick drives germs deeper.",
    "animation_cue": "worried",
    "memory": "First visit: bullseye. Tried \"Finish the full antibiotic course\" → spotty. A risky idea came up; we steered clear."
  },
  {
    "id": "fcc92e6b-3f48-4600-9a5c-5b03c96b698d",
    "patient_id": "bd404ad6-baec-470c-80e3-3be3f93e87b3",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Leo keeps finishing every antibiotic dose. A small red spot sits at the old bite. He looks perky and cozy.",
    "teaching": "Every finished dose hunts the tick germ down.",
    "animation_cue": "recovery",
    "memory": "First visit: bullseye. Tried \"Pull the tick + clean the bite\" → bullseye. Tried \"Finish the full antibiotic course\" → spotty."
  },
  {
    "id": "4603c798-2f46-454b-9aa5-aac00666c20c",
    "patient_id": "bd404ad6-baec-470c-80e3-3be3f93e87b3",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Leo keeps tending the clean bite. The red bullseye ring keeps growing. He looks droopy and cozy.",
    "teaching": "Tick pulling was right — the rash still needs medicine.",
    "animation_cue": "worried",
    "memory": "First visit: bullseye. Tried \"Pull the tick + clean the bite\" → bullseye. Tried \"Pull the tick + clean the bite\" → bullseye."
  },
  {
    "id": "5e07e168-5cf8-4fbe-99ff-20ed97d6ce66",
    "patient_id": "bd404ad6-baec-470c-80e3-3be3f93e87b3",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Leo keeps rubbing steroid cream on the rash. Fever and aches wear him down. He looks droopy and cozy.",
    "teaching": "Cream cannot reach a germ riding the bloodstream.",
    "animation_cue": "sick",
    "memory": "First visit: bullseye. Tried \"Pull the tick + clean the bite\" → bullseye. Tried \"Steroid cream on the rash\" → worn-out."
  },
  {
    "id": "224515b5-e031-4e0b-90a7-8805722f9d62",
    "patient_id": "bd404ad6-baec-470c-80e3-3be3f93e87b3",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Leo starts to burn the tick off with a match, but a helper gently stops him. The red bullseye ring keeps growing. He does not get worse.",
    "teaching": "Burning a tick drives germs deeper.",
    "animation_cue": "worried",
    "memory": "First visit: bullseye. Tried \"Pull the tick + clean the bite\" → bullseye. A risky idea came up; we steered clear."
  },
  {
    "id": "561b371a-e672-476c-8c36-26f6f1ad23ed",
    "patient_id": "bd404ad6-baec-470c-80e3-3be3f93e87b3",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Leo keeps finishing every antibiotic dose. The red bullseye ring keeps growing. He looks perky and cozy.",
    "teaching": "Every finished dose hunts the tick germ down.",
    "animation_cue": "recovery",
    "memory": "First visit: bullseye. Tried \"Steroid cream on the rash\" → worn-out. Tried \"Finish the full antibiotic course\" → bullseye."
  },
  {
    "id": "1ddba45e-b47d-42a0-8fbf-cedab2243e4e",
    "patient_id": "bd404ad6-baec-470c-80e3-3be3f93e87b3",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Leo keeps tending the clean bite. Fever and aches wear him down. He looks droopy and cozy.",
    "teaching": "Tick pulling was right — the rash still needs medicine.",
    "animation_cue": "worried",
    "memory": "First visit: bullseye. Tried \"Steroid cream on the rash\" → worn-out. Tried \"Pull the tick + clean the bite\" → worn-out."
  },
  {
    "id": "7ad0202f-0747-484f-b7c5-f6c9c5ffa2a9",
    "patient_id": "bd404ad6-baec-470c-80e3-3be3f93e87b3",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 4,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Leo keeps rubbing steroid cream on the rash. Fever and aches wear him down. He looks droopy and cozy.",
    "teaching": "Cream cannot reach a germ riding the bloodstream.",
    "animation_cue": "worried",
    "memory": "First visit: bullseye. Tried \"Steroid cream on the rash\" → worn-out. Tried \"Steroid cream on the rash\" → worn-out."
  },
  {
    "id": "4fee788b-17df-44a3-9ac9-09139f676d00",
    "patient_id": "bd404ad6-baec-470c-80e3-3be3f93e87b3",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Leo starts to burn the tick off with a match, but a helper gently stops him. Fever and aches wear him down. He does not get worse.",
    "teaching": "Burning a tick drives germs deeper.",
    "animation_cue": "worried",
    "memory": "First visit: bullseye. Tried \"Steroid cream on the rash\" → worn-out. A risky idea came up; we steered clear."
  },
  {
    "id": "02c1c484-2a86-4900-bdf2-2d01d034a65e",
    "patient_id": "1f12ac0e-fee6-463c-84e7-c09d7ab4b8ed",
    "depth": 0,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ruby curls around her sore belly. The ache moved from her navel to the lower right. The cozy clinic feels calm around her.",
    "teaching": "Belly pain that moves to the lower right means the appendix.",
    "animation_cue": "idle",
    "memory": "First visit: guarding."
  },
  {
    "id": "827f6ddb-8415-4f8c-84ec-b9fcfe084c35",
    "patient_id": "1f12ac0e-fee6-463c-84e7-c09d7ab4b8ed",
    "depth": 1,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Ruby visits the hospital surgeon right away. Her belly feels a little twingey. She looks perky and rests softly in the cozy room.",
    "teaching": "A sore appendix needs a fast surgeon visit.",
    "animation_cue": "recovery",
    "memory": "First visit: guarding. Tried \"Hospital surgeon visit, now\" → twingey."
  },
  {
    "id": "7c09db31-c2ff-4ca3-a416-0137d9a9ea73",
    "patient_id": "1f12ac0e-fee6-463c-84e7-c09d7ab4b8ed",
    "depth": 1,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ruby lies very still with nothing to eat. Her lower-right belly aches and food disgusts her. She looks droopy and rests softly in the cozy room.",
    "teaching": "Still and empty-tummied is right — the surgeon still must come.",
    "animation_cue": "worried",
    "memory": "First visit: guarding. Tried \"Lie still, nothing to eat\" → guarding."
  },
  {
    "id": "0af98a88-e68c-4cae-a663-2e09b3c38bfa",
    "patient_id": "1f12ac0e-fee6-463c-84e7-c09d7ab4b8ed",
    "depth": 1,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ruby takes painkillers and waits it out. Her belly guards rigid and sore. She looks droopy and rests softly in the cozy room.",
    "teaching": "Painkillers hide a bursting appendix.",
    "animation_cue": "sick",
    "memory": "First visit: guarding. Tried \"Painkillers and wait a week\" → rigid."
  },
  {
    "id": "479a8b59-3c35-47b2-89f7-7f99d17f1eca",
    "patient_id": "1f12ac0e-fee6-463c-84e7-c09d7ab4b8ed",
    "depth": 1,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ruby starts to drink the laxative to flush it out, but a helper gently stops her. Her lower-right belly aches and food disgusts her. She does not get worse.",
    "teaching": "Laxatives can burst a sore appendix.",
    "animation_cue": "worried",
    "memory": "First visit: guarding. A risky idea came up; we steered clear."
  },
  {
    "id": "5630ff91-df52-4b0c-9eb1-a123463e52b7",
    "patient_id": "1f12ac0e-fee6-463c-84e7-c09d7ab4b8ed",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 10,
      "comfort": 10,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Ruby keeps seeing the surgeon team. Her belly feels comfy and calm. She looks perky and cozy.",
    "teaching": "A sore appendix needs a fast surgeon visit.",
    "animation_cue": "happy",
    "memory": "First visit: guarding. Tried \"Hospital surgeon visit, now\" → twingey. Tried \"Hospital surgeon visit, now\" → picnic."
  },
  {
    "id": "7ca1c767-a047-4c3b-9c10-0fd7547572d4",
    "patient_id": "1f12ac0e-fee6-463c-84e7-c09d7ab4b8ed",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Ruby keeps lying still with an empty tummy. Her belly feels a little twingey. She looks comfortable and cozy.",
    "teaching": "Still and empty-tummied is right — the surgeon still must come.",
    "animation_cue": "worried",
    "memory": "First visit: guarding. Tried \"Hospital surgeon visit, now\" → twingey. Tried \"Lie still, nothing to eat\" → twingey."
  },
  {
    "id": "3bd32b50-e172-49fc-ae31-15525507f3a5",
    "patient_id": "1f12ac0e-fee6-463c-84e7-c09d7ab4b8ed",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ruby keeps masking the pain and waiting. Her lower-right belly aches and food disgusts her. She looks droopy and cozy.",
    "teaching": "Painkillers hide a bursting appendix.",
    "animation_cue": "sick",
    "memory": "First visit: guarding. Tried \"Hospital surgeon visit, now\" → twingey. Tried \"Painkillers and wait a week\" → guarding."
  },
  {
    "id": "5cf3568e-ba4a-4896-8ab3-0a1c2881871f",
    "patient_id": "1f12ac0e-fee6-463c-84e7-c09d7ab4b8ed",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Ruby starts to drink the laxative to flush it out, but a helper gently stops her. Her belly feels a little twingey. She does not get worse.",
    "teaching": "Laxatives can burst a sore appendix.",
    "animation_cue": "worried",
    "memory": "First visit: guarding. Tried \"Hospital surgeon visit, now\" → twingey. A risky idea came up; we steered clear."
  },
  {
    "id": "64b4d657-39c8-4076-ac17-8632f0c3cdbe",
    "patient_id": "1f12ac0e-fee6-463c-84e7-c09d7ab4b8ed",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Ruby keeps seeing the surgeon team. Her belly feels a little twingey. She looks perky and cozy.",
    "teaching": "A sore appendix needs a fast surgeon visit.",
    "animation_cue": "recovery",
    "memory": "First visit: guarding. Tried \"Lie still, nothing to eat\" → guarding. Tried \"Hospital surgeon visit, now\" → twingey."
  },
  {
    "id": "1951d6d9-23f4-4b94-aee5-7cfbdb983b67",
    "patient_id": "1f12ac0e-fee6-463c-84e7-c09d7ab4b8ed",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ruby keeps lying still with an empty tummy. Her lower-right belly aches and food disgusts her. She looks droopy and cozy.",
    "teaching": "Still and empty-tummied is right — the surgeon still must come.",
    "animation_cue": "worried",
    "memory": "First visit: guarding. Tried \"Lie still, nothing to eat\" → guarding. Tried \"Lie still, nothing to eat\" → guarding."
  },
  {
    "id": "ad905f0f-f0ba-403d-bb8d-8040baa113b4",
    "patient_id": "1f12ac0e-fee6-463c-84e7-c09d7ab4b8ed",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ruby keeps masking the pain and waiting. Her belly guards rigid and sore. She looks droopy and cozy.",
    "teaching": "Painkillers hide a bursting appendix.",
    "animation_cue": "sick",
    "memory": "First visit: guarding. Tried \"Lie still, nothing to eat\" → guarding. Tried \"Painkillers and wait a week\" → rigid."
  },
  {
    "id": "edf6444c-b7ab-489a-a77a-2d054e7e8f41",
    "patient_id": "1f12ac0e-fee6-463c-84e7-c09d7ab4b8ed",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ruby starts to drink the laxative to flush it out, but a helper gently stops her. Her lower-right belly aches and food disgusts her. She does not get worse.",
    "teaching": "Laxatives can burst a sore appendix.",
    "animation_cue": "worried",
    "memory": "First visit: guarding. Tried \"Lie still, nothing to eat\" → guarding. A risky idea came up; we steered clear."
  },
  {
    "id": "e70d4cf6-240b-410a-ac63-accdb2aff8fa",
    "patient_id": "1f12ac0e-fee6-463c-84e7-c09d7ab4b8ed",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Ruby keeps seeing the surgeon team. Her lower-right belly aches and food disgusts her. She looks perky and cozy.",
    "teaching": "A sore appendix needs a fast surgeon visit.",
    "animation_cue": "recovery",
    "memory": "First visit: guarding. Tried \"Painkillers and wait a week\" → rigid. Tried \"Hospital surgeon visit, now\" → guarding."
  },
  {
    "id": "a4fe29a9-e138-479e-838a-4ac8f5bc2495",
    "patient_id": "1f12ac0e-fee6-463c-84e7-c09d7ab4b8ed",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ruby keeps lying still with an empty tummy. Her belly guards rigid and sore. She looks droopy and cozy.",
    "teaching": "Still and empty-tummied is right — the surgeon still must come.",
    "animation_cue": "worried",
    "memory": "First visit: guarding. Tried \"Painkillers and wait a week\" → rigid. Tried \"Lie still, nothing to eat\" → rigid."
  },
  {
    "id": "8cd995cd-2ec3-499a-9a54-8af4cc2933b0",
    "patient_id": "1f12ac0e-fee6-463c-84e7-c09d7ab4b8ed",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 4,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ruby keeps masking the pain and waiting. Her belly guards rigid and sore. She looks droopy and cozy.",
    "teaching": "Painkillers hide a bursting appendix.",
    "animation_cue": "worried",
    "memory": "First visit: guarding. Tried \"Painkillers and wait a week\" → rigid. Tried \"Painkillers and wait a week\" → rigid."
  },
  {
    "id": "0eb384af-07c1-46a9-9e8e-ac2cae803bb7",
    "patient_id": "1f12ac0e-fee6-463c-84e7-c09d7ab4b8ed",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Ruby starts to drink the laxative to flush it out, but a helper gently stops her. Her belly guards rigid and sore. She does not get worse.",
    "teaching": "Laxatives can burst a sore appendix.",
    "animation_cue": "worried",
    "memory": "First visit: guarding. Tried \"Painkillers and wait a week\" → rigid. A risky idea came up; we steered clear."
  },
  {
    "id": "0da71c2d-f01b-48df-bc0a-c317e3ff1835",
    "patient_id": "e96de9c5-d4ae-4fd2-986a-7db94d0600dd",
    "depth": 0,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Otto drips pool water onto the bench. His outer ear aches and tugging it stings. The cozy clinic feels calm around him.",
    "teaching": "Ear pain worse when tugged, after swimming, means the outer ear.",
    "animation_cue": "idle",
    "memory": "First visit: tug-ouchy."
  },
  {
    "id": "790556ec-eae8-4661-bfa8-4fbea44c2742",
    "patient_id": "e96de9c5-d4ae-4fd2-986a-7db94d0600dd",
    "depth": 1,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Otto gets the antibiotic ear drops. His ear feels a little itchy. He looks perky and rests softly in the cozy room.",
    "teaching": "Ear drops fight the outer-ear germ on the spot.",
    "animation_cue": "recovery",
    "memory": "First visit: tug-ouchy. Tried \"Antibiotic ear drops\" → itchy."
  },
  {
    "id": "c50ee0cb-ca43-4ba6-9f2e-59aff9fc3972",
    "patient_id": "e96de9c5-d4ae-4fd2-986a-7db94d0600dd",
    "depth": 1,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Otto keeps the sore ear dry and rests. His outer ear aches when tugged. He looks droopy and rests softly in the cozy room.",
    "teaching": "Dry rest helps — drops do the real curing.",
    "animation_cue": "worried",
    "memory": "First visit: tug-ouchy. Tried \"Keep the ear dry and rest\" → tug-ouchy."
  },
  {
    "id": "632ed2de-c7a8-4e3b-8ef4-1c3d2864f053",
    "patient_id": "e96de9c5-d4ae-4fd2-986a-7db94d0600dd",
    "depth": 1,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Otto dives back in to swim it out. His ear throbs and feels plugged. He looks droopy and rests softly in the cozy room.",
    "teaching": "More pool water only feeds the outer-ear germ.",
    "animation_cue": "sick",
    "memory": "First visit: tug-ouchy. Tried \"Swim it out at the pool\" → throbbing."
  },
  {
    "id": "897927db-6a54-4023-8a8f-b118670e76c0",
    "patient_id": "e96de9c5-d4ae-4fd2-986a-7db94d0600dd",
    "depth": 1,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Otto starts to dig the ear out with a hairpin, but a helper gently stops him. His outer ear aches when tugged. He does not get worse.",
    "teaching": "Pins puncture ears instead of cleaning them.",
    "animation_cue": "worried",
    "memory": "First visit: tug-ouchy. A risky idea came up; we steered clear."
  },
  {
    "id": "4afbf04f-9e24-4116-8afa-a09be0bbfe09",
    "patient_id": "e96de9c5-d4ae-4fd2-986a-7db94d0600dd",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 10,
      "comfort": 10,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Otto keeps getting the ear drops on schedule. His ears feel comfy and splash-ready. He looks perky and cozy.",
    "teaching": "Ear drops fight the outer-ear germ on the spot.",
    "animation_cue": "happy",
    "memory": "First visit: tug-ouchy. Tried \"Antibiotic ear drops\" → itchy. Tried \"Antibiotic ear drops\" → splashing."
  },
  {
    "id": "bbed339c-d5af-4f3d-b0ad-608231bbeec2",
    "patient_id": "e96de9c5-d4ae-4fd2-986a-7db94d0600dd",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Otto keeps resting with a dry ear. His ear feels a little itchy. He looks comfortable and cozy.",
    "teaching": "Dry rest helps — drops do the real curing.",
    "animation_cue": "worried",
    "memory": "First visit: tug-ouchy. Tried \"Antibiotic ear drops\" → itchy. Tried \"Keep the ear dry and rest\" → itchy."
  },
  {
    "id": "650e2aa1-754c-44fb-8b0c-98c7876ab18e",
    "patient_id": "e96de9c5-d4ae-4fd2-986a-7db94d0600dd",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Otto keeps swimming it out at the pool. His outer ear aches when tugged. He looks droopy and cozy.",
    "teaching": "More pool water only feeds the outer-ear germ.",
    "animation_cue": "sick",
    "memory": "First visit: tug-ouchy. Tried \"Antibiotic ear drops\" → itchy. Tried \"Swim it out at the pool\" → tug-ouchy."
  },
  {
    "id": "6af8fc5c-9eba-48e4-b84c-f81be7326eeb",
    "patient_id": "e96de9c5-d4ae-4fd2-986a-7db94d0600dd",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Otto starts to dig the ear out with a hairpin, but a helper gently stops him. His ear feels a little itchy. He does not get worse.",
    "teaching": "Pins puncture ears instead of cleaning them.",
    "animation_cue": "worried",
    "memory": "First visit: tug-ouchy. Tried \"Antibiotic ear drops\" → itchy. A risky idea came up; we steered clear."
  },
  {
    "id": "01ba7207-94e3-45a1-b97f-182c50d8884c",
    "patient_id": "e96de9c5-d4ae-4fd2-986a-7db94d0600dd",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Otto keeps getting the ear drops on schedule. His ear feels a little itchy. He looks perky and cozy.",
    "teaching": "Ear drops fight the outer-ear germ on the spot.",
    "animation_cue": "recovery",
    "memory": "First visit: tug-ouchy. Tried \"Keep the ear dry and rest\" → tug-ouchy. Tried \"Antibiotic ear drops\" → itchy."
  },
  {
    "id": "b8f79ec8-2736-4df3-92c3-c83a133c5183",
    "patient_id": "e96de9c5-d4ae-4fd2-986a-7db94d0600dd",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Otto keeps resting with a dry ear. His outer ear aches when tugged. He looks droopy and cozy.",
    "teaching": "Dry rest helps — drops do the real curing.",
    "animation_cue": "worried",
    "memory": "First visit: tug-ouchy. Tried \"Keep the ear dry and rest\" → tug-ouchy. Tried \"Keep the ear dry and rest\" → tug-ouchy."
  },
  {
    "id": "26449a07-6396-4664-97bd-8d97d7d6a9ca",
    "patient_id": "e96de9c5-d4ae-4fd2-986a-7db94d0600dd",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Otto keeps swimming it out at the pool. His ear throbs and feels plugged. He looks droopy and cozy.",
    "teaching": "More pool water only feeds the outer-ear germ.",
    "animation_cue": "sick",
    "memory": "First visit: tug-ouchy. Tried \"Keep the ear dry and rest\" → tug-ouchy. Tried \"Swim it out at the pool\" → throbbing."
  },
  {
    "id": "c0c6d949-1cde-4e57-99b8-4eb51d331b86",
    "patient_id": "e96de9c5-d4ae-4fd2-986a-7db94d0600dd",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Otto starts to dig the ear out with a hairpin, but a helper gently stops him. His outer ear aches when tugged. He does not get worse.",
    "teaching": "Pins puncture ears instead of cleaning them.",
    "animation_cue": "worried",
    "memory": "First visit: tug-ouchy. Tried \"Keep the ear dry and rest\" → tug-ouchy. A risky idea came up; we steered clear."
  },
  {
    "id": "d305a78b-74d9-483d-ad90-3b0962527f7b",
    "patient_id": "e96de9c5-d4ae-4fd2-986a-7db94d0600dd",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Otto keeps getting the ear drops on schedule. His outer ear aches when tugged. He looks perky and cozy.",
    "teaching": "Ear drops fight the outer-ear germ on the spot.",
    "animation_cue": "recovery",
    "memory": "First visit: tug-ouchy. Tried \"Swim it out at the pool\" → throbbing. Tried \"Antibiotic ear drops\" → tug-ouchy."
  },
  {
    "id": "861be889-4c6e-4e4b-a44e-1f2d64738c42",
    "patient_id": "e96de9c5-d4ae-4fd2-986a-7db94d0600dd",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Otto keeps resting with a dry ear. His ear throbs and feels plugged. He looks droopy and cozy.",
    "teaching": "Dry rest helps — drops do the real curing.",
    "animation_cue": "worried",
    "memory": "First visit: tug-ouchy. Tried \"Swim it out at the pool\" → throbbing. Tried \"Keep the ear dry and rest\" → throbbing."
  },
  {
    "id": "df265f1a-bdf2-42e6-9b64-735541b11068",
    "patient_id": "e96de9c5-d4ae-4fd2-986a-7db94d0600dd",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 4,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Otto keeps swimming it out at the pool. His ear throbs and feels plugged. He looks droopy and cozy.",
    "teaching": "More pool water only feeds the outer-ear germ.",
    "animation_cue": "worried",
    "memory": "First visit: tug-ouchy. Tried \"Swim it out at the pool\" → throbbing. Tried \"Swim it out at the pool\" → throbbing."
  },
  {
    "id": "71f7714b-cffa-4305-ab54-9325e30f1876",
    "patient_id": "e96de9c5-d4ae-4fd2-986a-7db94d0600dd",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Otto starts to dig the ear out with a hairpin, but a helper gently stops him. His ear throbs and feels plugged. He does not get worse.",
    "teaching": "Pins puncture ears instead of cleaning them.",
    "animation_cue": "worried",
    "memory": "First visit: tug-ouchy. Tried \"Swim it out at the pool\" → throbbing. A risky idea came up; we steered clear."
  },
  {
    "id": "bb49a0a2-dae4-409c-8998-575caf8e4dda",
    "patient_id": "339033ce-6799-40a0-916c-4c3d0d4cf362",
    "depth": 0,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Cleo slumps in the chair, too tired to hum. Her throat aches and her neck glands bulge. The cozy clinic feels calm around her.",
    "teaching": "Weeks wiped out with sore throat and big glands spells mono.",
    "animation_cue": "idle",
    "memory": "First visit: wiped-out."
  },
  {
    "id": "0d499d6b-394a-4c00-a36d-bdcdac6afb8f",
    "patient_id": "339033ce-6799-40a0-916c-4c3d0d4cf362",
    "depth": 1,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Cleo settles into total rest with fluids. She feels tired and draggy. She looks perky and rests softly in the cozy room.",
    "teaching": "Mono only heals with weeks of real rest.",
    "animation_cue": "recovery",
    "memory": "First visit: wiped-out. Tried \"Total rest + fluids for weeks\" → draggy."
  },
  {
    "id": "dd29c5da-b87c-4df3-9b4b-eb3bd4d3fe34",
    "patient_id": "339033ce-6799-40a0-916c-4c3d0d4cf362",
    "depth": 1,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Cleo soothes her throat gently. Exhaustion pins her down; her throat aches. She looks droopy and rests softly in the cozy room.",
    "teaching": "Soothed throats comfort — rest still heals.",
    "animation_cue": "worried",
    "memory": "First visit: wiped-out. Tried \"Soothe the throat gently\" → wiped-out."
  },
  {
    "id": "ad66e208-cb18-4cf9-b880-b864812e5bad",
    "patient_id": "339033ce-6799-40a0-916c-4c3d0d4cf362",
    "depth": 1,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Cleo swallows leftover amoxicillin. She can barely rise from bed. She looks droopy and rests softly in the cozy room.",
    "teaching": "Amoxicillin breaks mono out in a rash.",
    "animation_cue": "sick",
    "memory": "First visit: wiped-out. Tried \"Leftover amoxicillin\" → bedbound."
  },
  {
    "id": "229a957a-3992-454b-af6c-a64d59f4c791",
    "patient_id": "339033ce-6799-40a0-916c-4c3d0d4cf362",
    "depth": 1,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Cleo starts to play tackle football this weekend, but a helper gently stops her. Exhaustion pins her down; her throat aches. She does not get worse.",
    "teaching": "Hard hits can burst a mono-swollen spleen.",
    "animation_cue": "worried",
    "memory": "First visit: wiped-out. A risky idea came up; we steered clear."
  },
  {
    "id": "69cbf070-95ec-4fac-8645-7260c3d5d56f",
    "patient_id": "339033ce-6799-40a0-916c-4c3d0d4cf362",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 10,
      "comfort": 10,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Cleo keeps resting totally with fluids. Her voice is back and she sings again. She looks perky and cozy.",
    "teaching": "Mono only heals with weeks of real rest.",
    "animation_cue": "happy",
    "memory": "First visit: wiped-out. Tried \"Total rest + fluids for weeks\" → draggy. Tried \"Total rest + fluids for weeks\" → singing."
  },
  {
    "id": "cd233608-74b2-479f-a589-8f5500f29e33",
    "patient_id": "339033ce-6799-40a0-916c-4c3d0d4cf362",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Cleo keeps soothing her throat gently. She feels tired and draggy. She looks comfortable and cozy.",
    "teaching": "Soothed throats comfort — rest still heals.",
    "animation_cue": "worried",
    "memory": "First visit: wiped-out. Tried \"Total rest + fluids for weeks\" → draggy. Tried \"Soothe the throat gently\" → draggy."
  },
  {
    "id": "e2c2e0bb-36f8-4613-ae16-07cc26408c86",
    "patient_id": "339033ce-6799-40a0-916c-4c3d0d4cf362",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Cleo keeps swallowing leftover amoxicillin. Exhaustion pins her down; her throat aches. She looks droopy and cozy.",
    "teaching": "Amoxicillin breaks mono out in a rash.",
    "animation_cue": "sick",
    "memory": "First visit: wiped-out. Tried \"Total rest + fluids for weeks\" → draggy. Tried \"Leftover amoxicillin\" → wiped-out."
  },
  {
    "id": "d5475127-4456-4976-b739-8fde3e831d9b",
    "patient_id": "339033ce-6799-40a0-916c-4c3d0d4cf362",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Cleo starts to play tackle football this weekend, but a helper gently stops her. She feels tired and draggy. She does not get worse.",
    "teaching": "Hard hits can burst a mono-swollen spleen.",
    "animation_cue": "worried",
    "memory": "First visit: wiped-out. Tried \"Total rest + fluids for weeks\" → draggy. A risky idea came up; we steered clear."
  },
  {
    "id": "7c7e3119-7213-42f8-95e9-60353004d179",
    "patient_id": "339033ce-6799-40a0-916c-4c3d0d4cf362",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Cleo keeps resting totally with fluids. She feels tired and draggy. She looks perky and cozy.",
    "teaching": "Mono only heals with weeks of real rest.",
    "animation_cue": "recovery",
    "memory": "First visit: wiped-out. Tried \"Soothe the throat gently\" → wiped-out. Tried \"Total rest + fluids for weeks\" → draggy."
  },
  {
    "id": "87a67c84-e2c5-4689-b49a-2cc129b7e9f5",
    "patient_id": "339033ce-6799-40a0-916c-4c3d0d4cf362",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Cleo keeps soothing her throat gently. Exhaustion pins her down; her throat aches. She looks droopy and cozy.",
    "teaching": "Soothed throats comfort — rest still heals.",
    "animation_cue": "worried",
    "memory": "First visit: wiped-out. Tried \"Soothe the throat gently\" → wiped-out. Tried \"Soothe the throat gently\" → wiped-out."
  },
  {
    "id": "aca6bc02-4ac1-4422-9c58-ccb4dcb8aa74",
    "patient_id": "339033ce-6799-40a0-916c-4c3d0d4cf362",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Cleo keeps swallowing leftover amoxicillin. She can barely rise from bed. She looks droopy and cozy.",
    "teaching": "Amoxicillin breaks mono out in a rash.",
    "animation_cue": "sick",
    "memory": "First visit: wiped-out. Tried \"Soothe the throat gently\" → wiped-out. Tried \"Leftover amoxicillin\" → bedbound."
  },
  {
    "id": "b88227ef-324d-4b00-a901-5c1e5a5a8f4c",
    "patient_id": "339033ce-6799-40a0-916c-4c3d0d4cf362",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Cleo starts to play tackle football this weekend, but a helper gently stops her. Exhaustion pins her down; her throat aches. She does not get worse.",
    "teaching": "Hard hits can burst a mono-swollen spleen.",
    "animation_cue": "worried",
    "memory": "First visit: wiped-out. Tried \"Soothe the throat gently\" → wiped-out. A risky idea came up; we steered clear."
  },
  {
    "id": "e4475c23-6512-4ca9-8cc9-5c0d8e2019ab",
    "patient_id": "339033ce-6799-40a0-916c-4c3d0d4cf362",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Cleo keeps resting totally with fluids. Exhaustion pins her down; her throat aches. She looks perky and cozy.",
    "teaching": "Mono only heals with weeks of real rest.",
    "animation_cue": "recovery",
    "memory": "First visit: wiped-out. Tried \"Leftover amoxicillin\" → bedbound. Tried \"Total rest + fluids for weeks\" → wiped-out."
  },
  {
    "id": "e0e45151-e55c-4b61-a602-593d629500ea",
    "patient_id": "339033ce-6799-40a0-916c-4c3d0d4cf362",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Cleo keeps soothing her throat gently. She can barely rise from bed. She looks droopy and cozy.",
    "teaching": "Soothed throats comfort — rest still heals.",
    "animation_cue": "worried",
    "memory": "First visit: wiped-out. Tried \"Leftover amoxicillin\" → bedbound. Tried \"Soothe the throat gently\" → bedbound."
  },
  {
    "id": "b9673ec0-3279-4149-9949-2d7c266abfc2",
    "patient_id": "339033ce-6799-40a0-916c-4c3d0d4cf362",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 4,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Cleo keeps swallowing leftover amoxicillin. She can barely rise from bed. She looks droopy and cozy.",
    "teaching": "Amoxicillin breaks mono out in a rash.",
    "animation_cue": "worried",
    "memory": "First visit: wiped-out. Tried \"Leftover amoxicillin\" → bedbound. Tried \"Leftover amoxicillin\" → bedbound."
  },
  {
    "id": "d51e7222-b9d5-4fda-b41f-ebaa1ac5c695",
    "patient_id": "339033ce-6799-40a0-916c-4c3d0d4cf362",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Cleo starts to play tackle football this weekend, but a helper gently stops her. She can barely rise from bed. She does not get worse.",
    "teaching": "Hard hits can burst a mono-swollen spleen.",
    "animation_cue": "worried",
    "memory": "First visit: wiped-out. Tried \"Leftover amoxicillin\" → bedbound. A risky idea came up; we steered clear."
  },
  {
    "id": "a127e050-f273-4d15-b534-2c08426015e5",
    "patient_id": "9350f95f-b258-4caf-8b32-d58b6fb46d36",
    "depth": 0,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Remy wrinkles his nose at the smell. One nostril oozes stinky goo; the other side is fine. The cozy clinic feels calm around him.",
    "teaching": "Stink from one nostril only means something is stuck inside.",
    "animation_cue": "idle",
    "memory": "First visit: stinky."
  },
  {
    "id": "06d2ec1e-af18-4432-9d5e-60678a660ee3",
    "patient_id": "9350f95f-b258-4caf-8b32-d58b6fb46d36",
    "depth": 1,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Remy visits the doctor to lift it out. One nostril feels a little funny. He looks perky and rests softly in the cozy room.",
    "teaching": "Tiny doctor tools lift beads out safely.",
    "animation_cue": "recovery",
    "memory": "First visit: stinky. Tried \"Doctor visit to lift it out\" → sniffly."
  },
  {
    "id": "fb185a24-1507-4e6f-9004-51cf2162b2d4",
    "patient_id": "9350f95f-b258-4caf-8b32-d58b6fb46d36",
    "depth": 1,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Remy gives one gentle blow. One nostril oozes stinky goo. He looks droopy and rests softly in the cozy room.",
    "teaching": "One gentle blow is fine — then doctors take over.",
    "animation_cue": "worried",
    "memory": "First visit: stinky. Tried \"One gentle blow, then stop\" → stinky."
  },
  {
    "id": "c15da4c0-bf2f-4b59-9b92-3cbe63303541",
    "patient_id": "9350f95f-b258-4caf-8b32-d58b6fb46d36",
    "depth": 1,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Remy fishes with tweezers. His nostril is plugged and sore. He looks droopy and rests softly in the cozy room.",
    "teaching": "Tweezers shove beads deeper inside.",
    "animation_cue": "sick",
    "memory": "First visit: stinky. Tried \"Fish it out with tweezers\" → plugged."
  },
  {
    "id": "5a3e8378-9028-41df-8693-1662e33792d3",
    "patient_id": "9350f95f-b258-4caf-8b32-d58b6fb46d36",
    "depth": 1,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Remy starts to sniff hard to suck it up, but a helper gently stops him. One nostril oozes stinky goo. He does not get worse.",
    "teaching": "Hard sniffing can drag beads toward the lungs.",
    "animation_cue": "worried",
    "memory": "First visit: stinky. A risky idea came up; we steered clear."
  },
  {
    "id": "01c7bb47-1e76-4c3b-901c-7e98998c70e8",
    "patient_id": "9350f95f-b258-4caf-8b32-d58b6fb46d36",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 10,
      "comfort": 10,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Remy keeps letting the doctor lift it out. His nose is clear and sniffing happily. He looks perky and cozy.",
    "teaching": "Tiny doctor tools lift beads out safely.",
    "animation_cue": "happy",
    "memory": "First visit: stinky. Tried \"Doctor visit to lift it out\" → sniffly. Tried \"Doctor visit to lift it out\" → clear."
  },
  {
    "id": "a2e4c6e0-1c1f-4d4d-9a09-ce4dff760848",
    "patient_id": "9350f95f-b258-4caf-8b32-d58b6fb46d36",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Remy keeps resting after the one blow. One nostril feels a little funny. He looks comfortable and cozy.",
    "teaching": "One gentle blow is fine — then doctors take over.",
    "animation_cue": "worried",
    "memory": "First visit: stinky. Tried \"Doctor visit to lift it out\" → sniffly. Tried \"One gentle blow, then stop\" → sniffly."
  },
  {
    "id": "3c18162b-e257-457f-b151-01a5afc2d172",
    "patient_id": "9350f95f-b258-4caf-8b32-d58b6fb46d36",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Remy keeps fishing with tweezers. One nostril oozes stinky goo. He looks droopy and cozy.",
    "teaching": "Tweezers shove beads deeper inside.",
    "animation_cue": "sick",
    "memory": "First visit: stinky. Tried \"Doctor visit to lift it out\" → sniffly. Tried \"Fish it out with tweezers\" → stinky."
  },
  {
    "id": "ddf869c2-e306-496d-bf52-a9a2923108c8",
    "patient_id": "9350f95f-b258-4caf-8b32-d58b6fb46d36",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Remy starts to sniff hard to suck it up, but a helper gently stops him. One nostril feels a little funny. He does not get worse.",
    "teaching": "Hard sniffing can drag beads toward the lungs.",
    "animation_cue": "worried",
    "memory": "First visit: stinky. Tried \"Doctor visit to lift it out\" → sniffly. A risky idea came up; we steered clear."
  },
  {
    "id": "b43107a8-bf98-4840-bb6f-3d3bdd662c44",
    "patient_id": "9350f95f-b258-4caf-8b32-d58b6fb46d36",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Remy keeps letting the doctor lift it out. One nostril feels a little funny. He looks perky and cozy.",
    "teaching": "Tiny doctor tools lift beads out safely.",
    "animation_cue": "recovery",
    "memory": "First visit: stinky. Tried \"One gentle blow, then stop\" → stinky. Tried \"Doctor visit to lift it out\" → sniffly."
  },
  {
    "id": "0cc7c039-1f9b-491c-bd7a-f0594372dca1",
    "patient_id": "9350f95f-b258-4caf-8b32-d58b6fb46d36",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Remy keeps resting after the one blow. One nostril oozes stinky goo. He looks droopy and cozy.",
    "teaching": "One gentle blow is fine — then doctors take over.",
    "animation_cue": "worried",
    "memory": "First visit: stinky. Tried \"One gentle blow, then stop\" → stinky. Tried \"One gentle blow, then stop\" → stinky."
  },
  {
    "id": "657130df-db57-40ac-94c1-5ef0dc6494f6",
    "patient_id": "9350f95f-b258-4caf-8b32-d58b6fb46d36",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Remy keeps fishing with tweezers. His nostril is plugged and sore. He looks droopy and cozy.",
    "teaching": "Tweezers shove beads deeper inside.",
    "animation_cue": "sick",
    "memory": "First visit: stinky. Tried \"One gentle blow, then stop\" → stinky. Tried \"Fish it out with tweezers\" → plugged."
  },
  {
    "id": "330390b8-2a31-4c30-90a7-e34adbe6a88c",
    "patient_id": "9350f95f-b258-4caf-8b32-d58b6fb46d36",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Remy starts to sniff hard to suck it up, but a helper gently stops him. One nostril oozes stinky goo. He does not get worse.",
    "teaching": "Hard sniffing can drag beads toward the lungs.",
    "animation_cue": "worried",
    "memory": "First visit: stinky. Tried \"One gentle blow, then stop\" → stinky. A risky idea came up; we steered clear."
  },
  {
    "id": "77d8ce77-e835-4b04-8555-534e75d6347c",
    "patient_id": "9350f95f-b258-4caf-8b32-d58b6fb46d36",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Remy keeps letting the doctor lift it out. One nostril oozes stinky goo. He looks perky and cozy.",
    "teaching": "Tiny doctor tools lift beads out safely.",
    "animation_cue": "recovery",
    "memory": "First visit: stinky. Tried \"Fish it out with tweezers\" → plugged. Tried \"Doctor visit to lift it out\" → stinky."
  },
  {
    "id": "b6e121bc-4573-4b9a-94c0-fe8c57d59b26",
    "patient_id": "9350f95f-b258-4caf-8b32-d58b6fb46d36",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Remy keeps resting after the one blow. His nostril is plugged and sore. He looks droopy and cozy.",
    "teaching": "One gentle blow is fine — then doctors take over.",
    "animation_cue": "worried",
    "memory": "First visit: stinky. Tried \"Fish it out with tweezers\" → plugged. Tried \"One gentle blow, then stop\" → plugged."
  },
  {
    "id": "0cd38f38-cc3a-4bfa-99a1-d6c7733114bc",
    "patient_id": "9350f95f-b258-4caf-8b32-d58b6fb46d36",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 4,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Remy keeps fishing with tweezers. His nostril is plugged and sore. He looks droopy and cozy.",
    "teaching": "Tweezers shove beads deeper inside.",
    "animation_cue": "worried",
    "memory": "First visit: stinky. Tried \"Fish it out with tweezers\" → plugged. Tried \"Fish it out with tweezers\" → plugged."
  },
  {
    "id": "b2b237c9-00b6-4b3b-96c1-8bef9cf4bddc",
    "patient_id": "9350f95f-b258-4caf-8b32-d58b6fb46d36",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Remy starts to sniff hard to suck it up, but a helper gently stops him. His nostril is plugged and sore. He does not get worse.",
    "teaching": "Hard sniffing can drag beads toward the lungs.",
    "animation_cue": "worried",
    "memory": "First visit: stinky. Tried \"Fish it out with tweezers\" → plugged. A risky idea came up; we steered clear."
  },
  {
    "id": "66b9247e-7a9b-4508-bc94-488a363eabca",
    "patient_id": "ff94fe93-b87d-4ba7-a058-6a9cc8bcc39c",
    "depth": 0,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Willa clutches her gurgly belly. Vomit and watery poops keep coming with cramps. The cozy clinic feels calm around her.",
    "teaching": "Puking plus watery poops with cramps everywhere is a tummy bug.",
    "animation_cue": "idle",
    "memory": "First visit: pukey."
  },
  {
    "id": "6b51bf7b-2539-41b4-90f3-b31d3781e22c",
    "patient_id": "ff94fe93-b87d-4ba7-a058-6a9cc8bcc39c",
    "depth": 1,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Willa takes tiny rehydration sips. Her belly feels a little queasy. She looks perky and rests softly in the cozy room.",
    "teaching": "Tiny sips refill everything puking stole.",
    "animation_cue": "recovery",
    "memory": "First visit: pukey. Tried \"Rehydration sips, tiny + often\" → queasy."
  },
  {
    "id": "89e25fd3-ad4a-4d88-974a-d3840aa27a70",
    "patient_id": "ff94fe93-b87d-4ba7-a058-6a9cc8bcc39c",
    "depth": 1,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Willa nibbles plain crackers in bed. Vomit and watery poops keep coming. She looks droopy and rests softly in the cozy room.",
    "teaching": "Crackers comfort — sips do the refilling.",
    "animation_cue": "worried",
    "memory": "First visit: pukey. Tried \"Plain crackers and rest\" → pukey."
  },
  {
    "id": "f2909ed4-941e-44a8-864b-6ea121fe7e6d",
    "patient_id": "ff94fe93-b87d-4ba7-a058-6a9cc8bcc39c",
    "depth": 1,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Willa eats a big greasy meal. She feels weak and dried out. She looks droopy and rests softly in the cozy room.",
    "teaching": "Grease on a pukey tummy bounces back.",
    "animation_cue": "sick",
    "memory": "First visit: pukey. Tried \"Big greasy meal to settle it\" → drained."
  },
  {
    "id": "c2345638-2676-4bc5-9d4f-8828fa387bc2",
    "patient_id": "ff94fe93-b87d-4ba7-a058-6a9cc8bcc39c",
    "depth": 1,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Willa starts to chug the pure salt water, but a helper gently stops her. Vomit and watery poops keep coming. She does not get worse.",
    "teaching": "Straight salt water poisons instead of hydrating.",
    "animation_cue": "worried",
    "memory": "First visit: pukey. A risky idea came up; we steered clear."
  },
  {
    "id": "b0130af8-abe5-429f-b779-84e5d8d1fa70",
    "patient_id": "ff94fe93-b87d-4ba7-a058-6a9cc8bcc39c",
    "depth": 2,
    "stage_index": 0,
    "vitals": {
      "energy": 10,
      "comfort": 10,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Willa keeps taking tiny sips often. Her belly is calm and snack-ready. She looks perky and cozy.",
    "teaching": "Tiny sips refill everything puking stole.",
    "animation_cue": "happy",
    "memory": "First visit: pukey. Tried \"Rehydration sips, tiny + often\" → queasy. Tried \"Rehydration sips, tiny + often\" → snacky."
  },
  {
    "id": "905093b3-93e7-4aae-a502-8f9c492b4158",
    "patient_id": "ff94fe93-b87d-4ba7-a058-6a9cc8bcc39c",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "okay",
    "narrative": "Willa keeps nibbling crackers and resting. Her belly feels a little queasy. She looks comfortable and cozy.",
    "teaching": "Crackers comfort — sips do the refilling.",
    "animation_cue": "worried",
    "memory": "First visit: pukey. Tried \"Rehydration sips, tiny + often\" → queasy. Tried \"Plain crackers and rest\" → queasy."
  },
  {
    "id": "4dec8d8b-9ea2-4da6-8ade-80b35674143b",
    "patient_id": "ff94fe93-b87d-4ba7-a058-6a9cc8bcc39c",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Willa keeps eating big greasy meals. Vomit and watery poops keep coming. She looks droopy and cozy.",
    "teaching": "Grease on a pukey tummy bounces back.",
    "animation_cue": "sick",
    "memory": "First visit: pukey. Tried \"Rehydration sips, tiny + often\" → queasy. Tried \"Big greasy meal to settle it\" → pukey."
  },
  {
    "id": "59907a8e-72b3-436c-ab1e-52066e19b028",
    "patient_id": "ff94fe93-b87d-4ba7-a058-6a9cc8bcc39c",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Willa starts to chug the pure salt water, but a helper gently stops her. Her belly feels a little queasy. She does not get worse.",
    "teaching": "Straight salt water poisons instead of hydrating.",
    "animation_cue": "worried",
    "memory": "First visit: pukey. Tried \"Rehydration sips, tiny + often\" → queasy. A risky idea came up; we steered clear."
  },
  {
    "id": "1f9e2f3f-b2b5-42bf-b108-fd6b54490a3d",
    "patient_id": "ff94fe93-b87d-4ba7-a058-6a9cc8bcc39c",
    "depth": 2,
    "stage_index": 1,
    "vitals": {
      "energy": 8,
      "comfort": 9,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Willa keeps taking tiny sips often. Her belly feels a little queasy. She looks perky and cozy.",
    "teaching": "Tiny sips refill everything puking stole.",
    "animation_cue": "recovery",
    "memory": "First visit: pukey. Tried \"Plain crackers and rest\" → pukey. Tried \"Rehydration sips, tiny + often\" → queasy."
  },
  {
    "id": "aa7f3c1b-dc6c-4215-b0f5-7a4b6fd00f5d",
    "patient_id": "ff94fe93-b87d-4ba7-a058-6a9cc8bcc39c",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 8,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Willa keeps nibbling crackers and resting. Vomit and watery poops keep coming. She looks droopy and cozy.",
    "teaching": "Crackers comfort — sips do the refilling.",
    "animation_cue": "worried",
    "memory": "First visit: pukey. Tried \"Plain crackers and rest\" → pukey. Tried \"Plain crackers and rest\" → pukey."
  },
  {
    "id": "7ccb30b8-1fb4-40d7-98e4-8f0b10c57687",
    "patient_id": "ff94fe93-b87d-4ba7-a058-6a9cc8bcc39c",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Willa keeps eating big greasy meals. She feels weak and dried out. She looks droopy and cozy.",
    "teaching": "Grease on a pukey tummy bounces back.",
    "animation_cue": "sick",
    "memory": "First visit: pukey. Tried \"Plain crackers and rest\" → pukey. Tried \"Big greasy meal to settle it\" → drained."
  },
  {
    "id": "dfee8f2d-b6d4-4302-8f9e-a8a9cbb69959",
    "patient_id": "ff94fe93-b87d-4ba7-a058-6a9cc8bcc39c",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 6,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Willa starts to chug the pure salt water, but a helper gently stops her. Vomit and watery poops keep coming. She does not get worse.",
    "teaching": "Straight salt water poisons instead of hydrating.",
    "animation_cue": "worried",
    "memory": "First visit: pukey. Tried \"Plain crackers and rest\" → pukey. A risky idea came up; we steered clear."
  },
  {
    "id": "5e3706f4-a95b-4adf-802a-074482afde6d",
    "patient_id": "ff94fe93-b87d-4ba7-a058-6a9cc8bcc39c",
    "depth": 2,
    "stage_index": 2,
    "vitals": {
      "energy": 8,
      "comfort": 7,
      "breathing": 6
    },
    "mood": "perky",
    "narrative": "Willa keeps taking tiny sips often. Vomit and watery poops keep coming. She looks perky and cozy.",
    "teaching": "Tiny sips refill everything puking stole.",
    "animation_cue": "recovery",
    "memory": "First visit: pukey. Tried \"Big greasy meal to settle it\" → drained. Tried \"Rehydration sips, tiny + often\" → pukey."
  },
  {
    "id": "e2532d93-2b1a-49b6-b982-32e032694f3f",
    "patient_id": "ff94fe93-b87d-4ba7-a058-6a9cc8bcc39c",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 6,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Willa keeps nibbling crackers and resting. She feels weak and dried out. She looks droopy and cozy.",
    "teaching": "Crackers comfort — sips do the refilling.",
    "animation_cue": "worried",
    "memory": "First visit: pukey. Tried \"Big greasy meal to settle it\" → drained. Tried \"Plain crackers and rest\" → drained."
  },
  {
    "id": "94d956b8-be80-4c16-8242-a561c95b3eef",
    "patient_id": "ff94fe93-b87d-4ba7-a058-6a9cc8bcc39c",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 4,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Willa keeps eating big greasy meals. She feels weak and dried out. She looks droopy and cozy.",
    "teaching": "Grease on a pukey tummy bounces back.",
    "animation_cue": "worried",
    "memory": "First visit: pukey. Tried \"Big greasy meal to settle it\" → drained. Tried \"Big greasy meal to settle it\" → drained."
  },
  {
    "id": "ce56a14f-77dc-4dc9-97b3-0610f1f1290b",
    "patient_id": "ff94fe93-b87d-4ba7-a058-6a9cc8bcc39c",
    "depth": 2,
    "stage_index": 3,
    "vitals": {
      "energy": 6,
      "comfort": 5,
      "breathing": 6
    },
    "mood": "droopy",
    "narrative": "Willa starts to chug the pure salt water, but a helper gently stops her. She feels weak and dried out. She does not get worse.",
    "teaching": "Straight salt water poisons instead of hydrating.",
    "animation_cue": "worried",
    "memory": "First visit: pukey. Tried \"Big greasy meal to settle it\" → drained. A risky idea came up; we steered clear."
  }
];

export const FALLBACK_EDGES: FallbackEdge[] = [
  {
    "id": "cfce9c86-2775-4d75-a7e9-0c19ed3574a8",
    "patient_id": "fb50f32f-0dd1-4b47-983b-06b76e3ecaa9",
    "from_node_id": "51752e1b-4e11-41e5-b3b2-46fbce5765d7",
    "to_node_id": "8d886c2f-38f8-477d-887d-79f2fd8beb16",
    "kind": "decision",
    "choice_label": "Sit upright in calm air",
    "grade": "BEST"
  },
  {
    "id": "2ab9056d-ae6d-4d13-9dec-35afe4cb1f89",
    "patient_id": "fb50f32f-0dd1-4b47-983b-06b76e3ecaa9",
    "from_node_id": "51752e1b-4e11-41e5-b3b2-46fbce5765d7",
    "to_node_id": "f101ad90-baef-4ba2-b0da-c8833d66013f",
    "kind": "decision",
    "choice_label": "Rescue puffer with spacer",
    "grade": "BEST"
  },
  {
    "id": "e06b4cfb-f584-48cd-9f4b-15e5da286220",
    "patient_id": "fb50f32f-0dd1-4b47-983b-06b76e3ecaa9",
    "from_node_id": "51752e1b-4e11-41e5-b3b2-46fbce5765d7",
    "to_node_id": "657f77ac-3861-4815-8e9d-f6a2f2b22b19",
    "kind": "decision",
    "choice_label": "Bury nose in dusty flowers",
    "grade": "WRONG"
  },
  {
    "id": "897f235e-bb3f-4926-be74-8b122b27c30c",
    "patient_id": "fb50f32f-0dd1-4b47-983b-06b76e3ecaa9",
    "from_node_id": "51752e1b-4e11-41e5-b3b2-46fbce5765d7",
    "to_node_id": "57ae6184-fccf-4d06-bd9d-271ede83a506",
    "kind": "decision",
    "choice_label": "Shake a dusty blanket indoors",
    "grade": "DANGEROUS"
  },
  {
    "id": "495bf802-0de5-45d0-820b-799250fe9b72",
    "patient_id": "fb50f32f-0dd1-4b47-983b-06b76e3ecaa9",
    "from_node_id": "8d886c2f-38f8-477d-887d-79f2fd8beb16",
    "to_node_id": "07f86fa0-95ed-4343-b1e2-08c9d2a99fa7",
    "kind": "decision",
    "choice_label": "Sit upright in calm air",
    "grade": "BEST"
  },
  {
    "id": "4232ff38-eead-4439-8283-7ed1ba5b3f07",
    "patient_id": "fb50f32f-0dd1-4b47-983b-06b76e3ecaa9",
    "from_node_id": "8d886c2f-38f8-477d-887d-79f2fd8beb16",
    "to_node_id": "7368ebee-4c51-494b-b0aa-b702c8e46a5a",
    "kind": "decision",
    "choice_label": "Rescue puffer with spacer",
    "grade": "BEST"
  },
  {
    "id": "12682905-ca89-4c12-852f-255cc6e5bf20",
    "patient_id": "fb50f32f-0dd1-4b47-983b-06b76e3ecaa9",
    "from_node_id": "8d886c2f-38f8-477d-887d-79f2fd8beb16",
    "to_node_id": "ff3c9bd6-d7de-4617-bd39-a30812a1d5a8",
    "kind": "decision",
    "choice_label": "Bury nose in dusty flowers",
    "grade": "WRONG"
  },
  {
    "id": "2731c60b-4802-408f-8af2-926e23d80510",
    "patient_id": "fb50f32f-0dd1-4b47-983b-06b76e3ecaa9",
    "from_node_id": "8d886c2f-38f8-477d-887d-79f2fd8beb16",
    "to_node_id": "868ccb25-67d3-4d4e-a4ef-d67630271b05",
    "kind": "decision",
    "choice_label": "Shake a dusty blanket indoors",
    "grade": "DANGEROUS"
  },
  {
    "id": "5380a5f8-6359-4217-b1f2-4d77755494e1",
    "patient_id": "fb50f32f-0dd1-4b47-983b-06b76e3ecaa9",
    "from_node_id": "f101ad90-baef-4ba2-b0da-c8833d66013f",
    "to_node_id": "adb19cd6-dada-40c4-be21-3a63cb191d89",
    "kind": "decision",
    "choice_label": "Sit upright in calm air",
    "grade": "BEST"
  },
  {
    "id": "26143a95-77bd-4e0c-8ec3-c34380de67ca",
    "patient_id": "fb50f32f-0dd1-4b47-983b-06b76e3ecaa9",
    "from_node_id": "f101ad90-baef-4ba2-b0da-c8833d66013f",
    "to_node_id": "0ead2762-6f71-4efe-8c31-0e9d6da47b7f",
    "kind": "decision",
    "choice_label": "Rescue puffer with spacer",
    "grade": "BEST"
  },
  {
    "id": "a037314a-f273-4f4a-82b6-f0ba90ac8675",
    "patient_id": "fb50f32f-0dd1-4b47-983b-06b76e3ecaa9",
    "from_node_id": "f101ad90-baef-4ba2-b0da-c8833d66013f",
    "to_node_id": "4c1de8b9-222d-451d-9082-f282cdf964ad",
    "kind": "decision",
    "choice_label": "Bury nose in dusty flowers",
    "grade": "WRONG"
  },
  {
    "id": "62454225-3aaf-4f01-925e-e67ff74fb9d8",
    "patient_id": "fb50f32f-0dd1-4b47-983b-06b76e3ecaa9",
    "from_node_id": "f101ad90-baef-4ba2-b0da-c8833d66013f",
    "to_node_id": "5a00ea4c-ce6d-4d32-93a4-6303e27f6221",
    "kind": "decision",
    "choice_label": "Shake a dusty blanket indoors",
    "grade": "DANGEROUS"
  },
  {
    "id": "c6205dd0-ce32-446c-9796-95e3250cb00a",
    "patient_id": "fb50f32f-0dd1-4b47-983b-06b76e3ecaa9",
    "from_node_id": "657f77ac-3861-4815-8e9d-f6a2f2b22b19",
    "to_node_id": "f41f02b2-a798-4cf6-ad1e-7e249a0fecd1",
    "kind": "decision",
    "choice_label": "Sit upright in calm air",
    "grade": "NOT_GREAT"
  },
  {
    "id": "dcb5b6e0-7c6f-4520-b75b-ac42c82bc99e",
    "patient_id": "fb50f32f-0dd1-4b47-983b-06b76e3ecaa9",
    "from_node_id": "657f77ac-3861-4815-8e9d-f6a2f2b22b19",
    "to_node_id": "3df3e7e4-67f9-4a0b-9f59-263dec0e4633",
    "kind": "decision",
    "choice_label": "Rescue puffer with spacer",
    "grade": "BEST"
  },
  {
    "id": "e5a2b06a-3ecb-44b7-b7a9-89f15475952c",
    "patient_id": "fb50f32f-0dd1-4b47-983b-06b76e3ecaa9",
    "from_node_id": "657f77ac-3861-4815-8e9d-f6a2f2b22b19",
    "to_node_id": "2f14fc46-4245-491b-952a-b9fe0de2a5d1",
    "kind": "decision",
    "choice_label": "Bury nose in dusty flowers",
    "grade": "WRONG"
  },
  {
    "id": "d495ea46-6b32-428c-80c4-222f27662b7a",
    "patient_id": "fb50f32f-0dd1-4b47-983b-06b76e3ecaa9",
    "from_node_id": "657f77ac-3861-4815-8e9d-f6a2f2b22b19",
    "to_node_id": "c87d893b-c382-4484-83b2-851c21671267",
    "kind": "decision",
    "choice_label": "Shake a dusty blanket indoors",
    "grade": "DANGEROUS"
  },
  {
    "id": "2d777087-f51c-4835-a9fb-00e0df020bf6",
    "patient_id": "1949914c-8e7a-4297-bc6b-d120a45f7df3",
    "from_node_id": "2515aa64-3cdc-472e-b2a9-a9ec0bb0ca11",
    "to_node_id": "766da01d-1e2e-4c2d-bc63-99888fd2c57d",
    "kind": "decision",
    "choice_label": "Warm rest + fluids",
    "grade": "BEST"
  },
  {
    "id": "6067ef43-56b9-47ba-8970-aab6b951c5cb",
    "patient_id": "1949914c-8e7a-4297-bc6b-d120a45f7df3",
    "from_node_id": "2515aa64-3cdc-472e-b2a9-a9ec0bb0ca11",
    "to_node_id": "f3c6603e-638d-4903-9092-5551340d17de",
    "kind": "decision",
    "choice_label": "Warm soup break",
    "grade": "NOT_GREAT"
  },
  {
    "id": "c305cfaf-26c0-4311-b7f2-4fedba2ea2d2",
    "patient_id": "1949914c-8e7a-4297-bc6b-d120a45f7df3",
    "from_node_id": "2515aa64-3cdc-472e-b2a9-a9ec0bb0ca11",
    "to_node_id": "4d12e81f-11ea-4c86-884a-9930dd61662a",
    "kind": "decision",
    "choice_label": "Share a cup with a friend",
    "grade": "WRONG"
  },
  {
    "id": "2c2e93a6-6efe-4331-b645-47f1b31f4922",
    "patient_id": "1949914c-8e7a-4297-bc6b-d120a45f7df3",
    "from_node_id": "2515aa64-3cdc-472e-b2a9-a9ec0bb0ca11",
    "to_node_id": "7cbe2de6-b046-4cd4-bc97-7eedd98a9cc2",
    "kind": "decision",
    "choice_label": "Plunge into an ice bath",
    "grade": "DANGEROUS"
  },
  {
    "id": "3a3c8efc-9cb5-416e-9ac3-7c98bd8de1bb",
    "patient_id": "1949914c-8e7a-4297-bc6b-d120a45f7df3",
    "from_node_id": "766da01d-1e2e-4c2d-bc63-99888fd2c57d",
    "to_node_id": "94817bed-5cfe-4603-a5a1-8dac0916940f",
    "kind": "decision",
    "choice_label": "Warm rest + fluids",
    "grade": "NOT_GREAT"
  },
  {
    "id": "7dbd372d-17b7-41f0-befe-c27f714837d9",
    "patient_id": "1949914c-8e7a-4297-bc6b-d120a45f7df3",
    "from_node_id": "766da01d-1e2e-4c2d-bc63-99888fd2c57d",
    "to_node_id": "2a4d20ce-d811-4dcf-9a40-3cc1c0c2c4be",
    "kind": "decision",
    "choice_label": "Warm soup break",
    "grade": "NOT_GREAT"
  },
  {
    "id": "e066743b-6721-4651-b361-5bff8e922ecd",
    "patient_id": "1949914c-8e7a-4297-bc6b-d120a45f7df3",
    "from_node_id": "766da01d-1e2e-4c2d-bc63-99888fd2c57d",
    "to_node_id": "b7da9bee-83b1-445a-b3cf-fa4d614482fc",
    "kind": "decision",
    "choice_label": "Share a cup with a friend",
    "grade": "WRONG"
  },
  {
    "id": "699b1cf5-619b-41aa-af28-309509ad95c9",
    "patient_id": "1949914c-8e7a-4297-bc6b-d120a45f7df3",
    "from_node_id": "766da01d-1e2e-4c2d-bc63-99888fd2c57d",
    "to_node_id": "5dd8900b-aaad-4e19-a0c4-88d91921d259",
    "kind": "decision",
    "choice_label": "Plunge into an ice bath",
    "grade": "DANGEROUS"
  },
  {
    "id": "9cf475c1-08fb-4501-869b-0edc36b18cf5",
    "patient_id": "1949914c-8e7a-4297-bc6b-d120a45f7df3",
    "from_node_id": "f3c6603e-638d-4903-9092-5551340d17de",
    "to_node_id": "882f0015-b20a-48d8-a943-ddf06bd4e763",
    "kind": "decision",
    "choice_label": "Warm rest + fluids",
    "grade": "BEST"
  },
  {
    "id": "56a627bd-1c57-4747-ad33-177d9b8ff0e0",
    "patient_id": "1949914c-8e7a-4297-bc6b-d120a45f7df3",
    "from_node_id": "f3c6603e-638d-4903-9092-5551340d17de",
    "to_node_id": "bd2dbd10-288a-4113-9805-8c920a729ed6",
    "kind": "decision",
    "choice_label": "Warm soup break",
    "grade": "NOT_GREAT"
  },
  {
    "id": "f81f750e-1fb5-408a-b9bd-d2795a3ef26a",
    "patient_id": "1949914c-8e7a-4297-bc6b-d120a45f7df3",
    "from_node_id": "f3c6603e-638d-4903-9092-5551340d17de",
    "to_node_id": "cb1b9374-2534-4bf5-82a8-cfa6e5b03716",
    "kind": "decision",
    "choice_label": "Share a cup with a friend",
    "grade": "WRONG"
  },
  {
    "id": "0a7f0069-ab83-4b9a-a83e-321d474af7ea",
    "patient_id": "1949914c-8e7a-4297-bc6b-d120a45f7df3",
    "from_node_id": "f3c6603e-638d-4903-9092-5551340d17de",
    "to_node_id": "8a85287c-6908-4fb5-863e-a708a395ad0d",
    "kind": "decision",
    "choice_label": "Plunge into an ice bath",
    "grade": "DANGEROUS"
  },
  {
    "id": "1d8d20ee-0310-477b-a202-e79d8483f961",
    "patient_id": "1949914c-8e7a-4297-bc6b-d120a45f7df3",
    "from_node_id": "4d12e81f-11ea-4c86-884a-9930dd61662a",
    "to_node_id": "c915e9dc-822d-4f00-b083-03008642a3c2",
    "kind": "decision",
    "choice_label": "Warm rest + fluids",
    "grade": "BEST"
  },
  {
    "id": "e1a03baf-49a7-4340-a294-b6c9367a9476",
    "patient_id": "1949914c-8e7a-4297-bc6b-d120a45f7df3",
    "from_node_id": "4d12e81f-11ea-4c86-884a-9930dd61662a",
    "to_node_id": "9c9b0dee-25c7-482a-a1b0-2b443a34080e",
    "kind": "decision",
    "choice_label": "Warm soup break",
    "grade": "BEST"
  },
  {
    "id": "c0c00d57-0cc2-4c73-b8a3-a8a20bb26d94",
    "patient_id": "1949914c-8e7a-4297-bc6b-d120a45f7df3",
    "from_node_id": "4d12e81f-11ea-4c86-884a-9930dd61662a",
    "to_node_id": "e218c6c9-347c-4b0a-a823-1182438d6699",
    "kind": "decision",
    "choice_label": "Share a cup with a friend",
    "grade": "WRONG"
  },
  {
    "id": "8d336578-afa7-47de-9604-8dab2408c725",
    "patient_id": "1949914c-8e7a-4297-bc6b-d120a45f7df3",
    "from_node_id": "4d12e81f-11ea-4c86-884a-9930dd61662a",
    "to_node_id": "e81b8f42-0b9f-47df-a7fd-a95a533b3a90",
    "kind": "decision",
    "choice_label": "Plunge into an ice bath",
    "grade": "DANGEROUS"
  },
  {
    "id": "8793e70c-d9ff-4607-870b-6095ea420035",
    "patient_id": "a6a595b5-2f88-4349-80eb-9977a831cb36",
    "from_node_id": "707e10d8-3435-4ade-8361-7b0e20a31889",
    "to_node_id": "c9f88954-918f-42e4-b5ce-9f386feb2446",
    "kind": "decision",
    "choice_label": "Offer cool water",
    "grade": "BEST"
  },
  {
    "id": "41b73801-6db5-4edb-ad43-d2f40d31e114",
    "patient_id": "a6a595b5-2f88-4349-80eb-9977a831cb36",
    "from_node_id": "707e10d8-3435-4ade-8361-7b0e20a31889",
    "to_node_id": "401b7ef1-b93b-44fe-9091-d93b3e2946a2",
    "kind": "decision",
    "choice_label": "Rest in the shade",
    "grade": "BEST"
  },
  {
    "id": "a60a66f8-b72e-4be8-ba6e-597948042509",
    "patient_id": "a6a595b5-2f88-4349-80eb-9977a831cb36",
    "from_node_id": "707e10d8-3435-4ade-8361-7b0e20a31889",
    "to_node_id": "7f1c2af2-9d5f-4674-8dde-599049fcd064",
    "kind": "decision",
    "choice_label": "Give fizzy soda",
    "grade": "WRONG"
  },
  {
    "id": "ed2c5d00-1ece-4ddd-be9e-0d9d9d52ea56",
    "patient_id": "a6a595b5-2f88-4349-80eb-9977a831cb36",
    "from_node_id": "707e10d8-3435-4ade-8361-7b0e20a31889",
    "to_node_id": "b4f309ba-f836-444e-a8fa-690b9e503f99",
    "kind": "decision",
    "choice_label": "Feed a whole salt pouch",
    "grade": "DANGEROUS"
  },
  {
    "id": "01b6acea-3f88-4ebc-843c-e4043dc70f6e",
    "patient_id": "a6a595b5-2f88-4349-80eb-9977a831cb36",
    "from_node_id": "c9f88954-918f-42e4-b5ce-9f386feb2446",
    "to_node_id": "69214798-2f39-4f38-9df1-708376909237",
    "kind": "decision",
    "choice_label": "Offer cool water",
    "grade": "BEST"
  },
  {
    "id": "e7e73112-d5ab-4588-ad4a-b092a5a6788c",
    "patient_id": "a6a595b5-2f88-4349-80eb-9977a831cb36",
    "from_node_id": "c9f88954-918f-42e4-b5ce-9f386feb2446",
    "to_node_id": "ae78932a-7979-4fe3-ad18-fc4ce945a95f",
    "kind": "decision",
    "choice_label": "Rest in the shade",
    "grade": "NOT_GREAT"
  },
  {
    "id": "dbc4ae97-00f0-40d1-bb45-6211ab96bdd3",
    "patient_id": "a6a595b5-2f88-4349-80eb-9977a831cb36",
    "from_node_id": "c9f88954-918f-42e4-b5ce-9f386feb2446",
    "to_node_id": "19f978db-5536-40d6-8936-bc5de67d4e78",
    "kind": "decision",
    "choice_label": "Give fizzy soda",
    "grade": "WRONG"
  },
  {
    "id": "56ac2882-65f1-4ece-8dd7-9d0d6c1c2d20",
    "patient_id": "a6a595b5-2f88-4349-80eb-9977a831cb36",
    "from_node_id": "c9f88954-918f-42e4-b5ce-9f386feb2446",
    "to_node_id": "8e4866d9-04f6-4c11-ae5c-3c4d645affc7",
    "kind": "decision",
    "choice_label": "Feed a whole salt pouch",
    "grade": "DANGEROUS"
  },
  {
    "id": "a722f3f5-f7ce-47b7-9638-1f01219f9e43",
    "patient_id": "a6a595b5-2f88-4349-80eb-9977a831cb36",
    "from_node_id": "401b7ef1-b93b-44fe-9091-d93b3e2946a2",
    "to_node_id": "25ebb5a6-be56-4438-af35-8427e4d99b2f",
    "kind": "decision",
    "choice_label": "Offer cool water",
    "grade": "BEST"
  },
  {
    "id": "a41219e2-a99b-4787-b87e-ed687267c061",
    "patient_id": "a6a595b5-2f88-4349-80eb-9977a831cb36",
    "from_node_id": "401b7ef1-b93b-44fe-9091-d93b3e2946a2",
    "to_node_id": "3edeb209-ef5e-4d28-ad0b-f96db21a4563",
    "kind": "decision",
    "choice_label": "Rest in the shade",
    "grade": "NOT_GREAT"
  },
  {
    "id": "91febf4d-e2aa-4286-b195-71fe4a303db0",
    "patient_id": "a6a595b5-2f88-4349-80eb-9977a831cb36",
    "from_node_id": "401b7ef1-b93b-44fe-9091-d93b3e2946a2",
    "to_node_id": "03d0c10a-fbb9-4e61-8093-55751c196539",
    "kind": "decision",
    "choice_label": "Give fizzy soda",
    "grade": "WRONG"
  },
  {
    "id": "aaa9e528-b865-4219-9612-9a74528d51ad",
    "patient_id": "a6a595b5-2f88-4349-80eb-9977a831cb36",
    "from_node_id": "401b7ef1-b93b-44fe-9091-d93b3e2946a2",
    "to_node_id": "802f55a6-6cc0-4ad5-bf00-2c4adb8f69f9",
    "kind": "decision",
    "choice_label": "Feed a whole salt pouch",
    "grade": "DANGEROUS"
  },
  {
    "id": "066f4b1c-8aa2-414b-b89c-4431a4b2148f",
    "patient_id": "a6a595b5-2f88-4349-80eb-9977a831cb36",
    "from_node_id": "7f1c2af2-9d5f-4674-8dde-599049fcd064",
    "to_node_id": "5d70cec2-dce5-4a74-98ef-ad1ee56d7123",
    "kind": "decision",
    "choice_label": "Offer cool water",
    "grade": "BEST"
  },
  {
    "id": "a29adaf7-0647-42b4-b059-bb3cdf0aa68f",
    "patient_id": "a6a595b5-2f88-4349-80eb-9977a831cb36",
    "from_node_id": "7f1c2af2-9d5f-4674-8dde-599049fcd064",
    "to_node_id": "bf9936d2-5f53-4173-9f71-f53e75c76625",
    "kind": "decision",
    "choice_label": "Rest in the shade",
    "grade": "NOT_GREAT"
  },
  {
    "id": "ebe1185e-cf95-4cd0-9dac-a4aa29965099",
    "patient_id": "a6a595b5-2f88-4349-80eb-9977a831cb36",
    "from_node_id": "7f1c2af2-9d5f-4674-8dde-599049fcd064",
    "to_node_id": "618572b3-eb14-45d9-811e-53a7e21909cc",
    "kind": "decision",
    "choice_label": "Give fizzy soda",
    "grade": "WRONG"
  },
  {
    "id": "5578dc7e-b106-4a88-933e-21f84a0ebc2d",
    "patient_id": "a6a595b5-2f88-4349-80eb-9977a831cb36",
    "from_node_id": "7f1c2af2-9d5f-4674-8dde-599049fcd064",
    "to_node_id": "7d94ad4a-d104-44b2-a76c-11ba1d3e7f87",
    "kind": "decision",
    "choice_label": "Feed a whole salt pouch",
    "grade": "DANGEROUS"
  },
  {
    "id": "314c5eac-072a-452d-9a83-1ddb07937599",
    "patient_id": "90489b94-866b-415b-a602-dd61a18e638b",
    "from_node_id": "c95cfbe4-2fbd-44bb-ae0e-fb677be73fd6",
    "to_node_id": "2e3e38ee-241f-4f2f-9fb3-4fccb0705266",
    "kind": "decision",
    "choice_label": "Daily walks, less salt",
    "grade": "BEST"
  },
  {
    "id": "9b356653-652b-41b6-92ab-6e0f80161227",
    "patient_id": "90489b94-866b-415b-a602-dd61a18e638b",
    "from_node_id": "c95cfbe4-2fbd-44bb-ae0e-fb677be73fd6",
    "to_node_id": "92de47c1-528c-4e18-8135-cfce5bcb9cf9",
    "kind": "decision",
    "choice_label": "Take prescribed medicine",
    "grade": "BEST"
  },
  {
    "id": "22e5d971-b3ec-4216-b894-bad78a10df26",
    "patient_id": "90489b94-866b-415b-a602-dd61a18e638b",
    "from_node_id": "c95cfbe4-2fbd-44bb-ae0e-fb677be73fd6",
    "to_node_id": "c3e8605d-e677-4100-aaf3-dff3b5d0e744",
    "kind": "decision",
    "choice_label": "Skip meds — feeling fine!",
    "grade": "WRONG"
  },
  {
    "id": "c877ae6e-01fa-4de5-9969-a091b22bc9c7",
    "patient_id": "90489b94-866b-415b-a602-dd61a18e638b",
    "from_node_id": "c95cfbe4-2fbd-44bb-ae0e-fb677be73fd6",
    "to_node_id": "04a14d4a-8dea-4988-a94a-7bd60d58e24c",
    "kind": "decision",
    "choice_label": "Double the dose to fix it faster",
    "grade": "DANGEROUS"
  },
  {
    "id": "3a8523c2-7cb9-4d11-9f14-d93d90dfd8c6",
    "patient_id": "90489b94-866b-415b-a602-dd61a18e638b",
    "from_node_id": "2e3e38ee-241f-4f2f-9fb3-4fccb0705266",
    "to_node_id": "2ab6d4f5-dacb-4510-a400-98f9ccf3b8a0",
    "kind": "decision",
    "choice_label": "Daily walks, less salt",
    "grade": "BEST"
  },
  {
    "id": "666f76bc-f2ec-409d-8b9b-0eaed0e0b889",
    "patient_id": "90489b94-866b-415b-a602-dd61a18e638b",
    "from_node_id": "2e3e38ee-241f-4f2f-9fb3-4fccb0705266",
    "to_node_id": "6d0d0525-23e7-48af-ba2c-48aa71550ad1",
    "kind": "decision",
    "choice_label": "Take prescribed medicine",
    "grade": "NOT_GREAT"
  },
  {
    "id": "fdb3b59d-0a9a-4aa7-a896-1b1a1f5774a1",
    "patient_id": "90489b94-866b-415b-a602-dd61a18e638b",
    "from_node_id": "2e3e38ee-241f-4f2f-9fb3-4fccb0705266",
    "to_node_id": "a3e57873-982a-4bf5-8cf5-4fe9c97f654b",
    "kind": "decision",
    "choice_label": "Skip meds — feeling fine!",
    "grade": "WRONG"
  },
  {
    "id": "4242640c-a932-4ab0-b1db-8c725ea2f222",
    "patient_id": "90489b94-866b-415b-a602-dd61a18e638b",
    "from_node_id": "2e3e38ee-241f-4f2f-9fb3-4fccb0705266",
    "to_node_id": "54904aca-8395-4e70-b1e5-b9a4c12ca2bb",
    "kind": "decision",
    "choice_label": "Double the dose to fix it faster",
    "grade": "DANGEROUS"
  },
  {
    "id": "aa796931-4db2-4900-8785-490a190e09f1",
    "patient_id": "90489b94-866b-415b-a602-dd61a18e638b",
    "from_node_id": "92de47c1-528c-4e18-8135-cfce5bcb9cf9",
    "to_node_id": "339ebe0c-43bf-4091-a353-61c0ae18be58",
    "kind": "decision",
    "choice_label": "Daily walks, less salt",
    "grade": "BEST"
  },
  {
    "id": "e700e9d4-5df9-4162-8f95-672b38a28387",
    "patient_id": "90489b94-866b-415b-a602-dd61a18e638b",
    "from_node_id": "92de47c1-528c-4e18-8135-cfce5bcb9cf9",
    "to_node_id": "95c2083f-6dd7-48c7-ba58-f6484eafaa4d",
    "kind": "decision",
    "choice_label": "Take prescribed medicine",
    "grade": "NOT_GREAT"
  },
  {
    "id": "85b3275e-b522-4740-b473-91c48ff20720",
    "patient_id": "90489b94-866b-415b-a602-dd61a18e638b",
    "from_node_id": "92de47c1-528c-4e18-8135-cfce5bcb9cf9",
    "to_node_id": "5d9e0707-94f5-4bd5-9bd0-b2e3d7386b16",
    "kind": "decision",
    "choice_label": "Skip meds — feeling fine!",
    "grade": "WRONG"
  },
  {
    "id": "85871357-7180-4505-af85-ff4572eee4cc",
    "patient_id": "90489b94-866b-415b-a602-dd61a18e638b",
    "from_node_id": "92de47c1-528c-4e18-8135-cfce5bcb9cf9",
    "to_node_id": "b004159d-b005-4762-92fc-e7aa7113cf9e",
    "kind": "decision",
    "choice_label": "Double the dose to fix it faster",
    "grade": "DANGEROUS"
  },
  {
    "id": "7a8d23f1-3be7-41d3-a15e-8cfdb3249331",
    "patient_id": "90489b94-866b-415b-a602-dd61a18e638b",
    "from_node_id": "c3e8605d-e677-4100-aaf3-dff3b5d0e744",
    "to_node_id": "4a31b021-204b-4287-af3b-e3880ec8aa79",
    "kind": "decision",
    "choice_label": "Daily walks, less salt",
    "grade": "NOT_GREAT"
  },
  {
    "id": "d0d941b5-e574-4171-9451-1e814f6d7eb8",
    "patient_id": "90489b94-866b-415b-a602-dd61a18e638b",
    "from_node_id": "c3e8605d-e677-4100-aaf3-dff3b5d0e744",
    "to_node_id": "abe80be3-a7a8-4c24-8647-5b0698202e46",
    "kind": "decision",
    "choice_label": "Take prescribed medicine",
    "grade": "BEST"
  },
  {
    "id": "be40a71c-d7c8-416d-a210-519b2dc1ac80",
    "patient_id": "90489b94-866b-415b-a602-dd61a18e638b",
    "from_node_id": "c3e8605d-e677-4100-aaf3-dff3b5d0e744",
    "to_node_id": "8c374989-fd92-43cb-9659-f55a91dc8d3d",
    "kind": "decision",
    "choice_label": "Skip meds — feeling fine!",
    "grade": "WRONG"
  },
  {
    "id": "f3ad4194-9ee7-4237-8b1e-25754826504a",
    "patient_id": "90489b94-866b-415b-a602-dd61a18e638b",
    "from_node_id": "c3e8605d-e677-4100-aaf3-dff3b5d0e744",
    "to_node_id": "761a38aa-a3d6-49c2-b00c-27a903bc1fd6",
    "kind": "decision",
    "choice_label": "Double the dose to fix it faster",
    "grade": "DANGEROUS"
  },
  {
    "id": "48165e54-9d2f-4f1f-a262-7b91eb9807ab",
    "patient_id": "bf387fe0-b314-464e-94ae-1e8cd5b04e8d",
    "from_node_id": "ccb78d98-90e0-42ef-8f27-e66c2e0a8ecc",
    "to_node_id": "150f7dd5-8d5c-4e29-8e76-b876a68c6c3e",
    "kind": "decision",
    "choice_label": "Sit upright in calm air",
    "grade": "BEST"
  },
  {
    "id": "bc7c59c1-75ff-471a-a301-47d89cc1f37a",
    "patient_id": "bf387fe0-b314-464e-94ae-1e8cd5b04e8d",
    "from_node_id": "ccb78d98-90e0-42ef-8f27-e66c2e0a8ecc",
    "to_node_id": "108babef-e8eb-4f0a-a13a-a4b38912a67f",
    "kind": "decision",
    "choice_label": "Rescue puffer with spacer",
    "grade": "BEST"
  },
  {
    "id": "1f60f9a5-bd7d-4d9e-bbc3-d2b3deea9485",
    "patient_id": "bf387fe0-b314-464e-94ae-1e8cd5b04e8d",
    "from_node_id": "ccb78d98-90e0-42ef-8f27-e66c2e0a8ecc",
    "to_node_id": "b1e1f471-88d7-4477-ba01-0435cf5f250e",
    "kind": "decision",
    "choice_label": "Bury nose in dusty flowers",
    "grade": "WRONG"
  },
  {
    "id": "365f62a9-91aa-41bb-9418-9889ae994744",
    "patient_id": "bf387fe0-b314-464e-94ae-1e8cd5b04e8d",
    "from_node_id": "ccb78d98-90e0-42ef-8f27-e66c2e0a8ecc",
    "to_node_id": "cdf7d52f-43b2-4ba7-83ba-b25e8434c7a1",
    "kind": "decision",
    "choice_label": "Shake a dusty blanket indoors",
    "grade": "DANGEROUS"
  },
  {
    "id": "fe26a92a-2da8-4df0-8f3b-24b4a36115c2",
    "patient_id": "bf387fe0-b314-464e-94ae-1e8cd5b04e8d",
    "from_node_id": "150f7dd5-8d5c-4e29-8e76-b876a68c6c3e",
    "to_node_id": "cc757a7a-16ed-4c32-88c1-6747f9184ed9",
    "kind": "decision",
    "choice_label": "Sit upright in calm air",
    "grade": "BEST"
  },
  {
    "id": "8db58a0c-1b2c-43a1-b611-29e6e4c0001f",
    "patient_id": "bf387fe0-b314-464e-94ae-1e8cd5b04e8d",
    "from_node_id": "150f7dd5-8d5c-4e29-8e76-b876a68c6c3e",
    "to_node_id": "a2e241d0-0ea7-4791-a1af-773605b2da03",
    "kind": "decision",
    "choice_label": "Rescue puffer with spacer",
    "grade": "BEST"
  },
  {
    "id": "1280ba6b-4991-4267-adfc-f9ef89515432",
    "patient_id": "bf387fe0-b314-464e-94ae-1e8cd5b04e8d",
    "from_node_id": "150f7dd5-8d5c-4e29-8e76-b876a68c6c3e",
    "to_node_id": "fcfba0fc-11f8-4a22-803c-b95d151c8634",
    "kind": "decision",
    "choice_label": "Bury nose in dusty flowers",
    "grade": "WRONG"
  },
  {
    "id": "9322e50a-017d-434c-975a-5d8389112f13",
    "patient_id": "bf387fe0-b314-464e-94ae-1e8cd5b04e8d",
    "from_node_id": "150f7dd5-8d5c-4e29-8e76-b876a68c6c3e",
    "to_node_id": "089179a8-13a0-4755-ab6c-c99e159d443e",
    "kind": "decision",
    "choice_label": "Shake a dusty blanket indoors",
    "grade": "DANGEROUS"
  },
  {
    "id": "8c434590-8f7d-4a9d-90be-b38eba33e664",
    "patient_id": "bf387fe0-b314-464e-94ae-1e8cd5b04e8d",
    "from_node_id": "108babef-e8eb-4f0a-a13a-a4b38912a67f",
    "to_node_id": "e3fb2d86-e927-4300-8367-ee4b0bb50b0b",
    "kind": "decision",
    "choice_label": "Sit upright in calm air",
    "grade": "BEST"
  },
  {
    "id": "aa2dd7c0-5ee0-454e-b1ad-3cb29ad3e2e9",
    "patient_id": "bf387fe0-b314-464e-94ae-1e8cd5b04e8d",
    "from_node_id": "108babef-e8eb-4f0a-a13a-a4b38912a67f",
    "to_node_id": "01727f9c-7476-4957-86db-ff0d5dad010b",
    "kind": "decision",
    "choice_label": "Rescue puffer with spacer",
    "grade": "BEST"
  },
  {
    "id": "895327e4-053d-411f-a061-1865a78a95a6",
    "patient_id": "bf387fe0-b314-464e-94ae-1e8cd5b04e8d",
    "from_node_id": "108babef-e8eb-4f0a-a13a-a4b38912a67f",
    "to_node_id": "a9c7b2aa-7604-4044-8176-2a8b7c5214ed",
    "kind": "decision",
    "choice_label": "Bury nose in dusty flowers",
    "grade": "WRONG"
  },
  {
    "id": "fb7e799e-a0a1-4e74-a92b-012a279a38fa",
    "patient_id": "bf387fe0-b314-464e-94ae-1e8cd5b04e8d",
    "from_node_id": "108babef-e8eb-4f0a-a13a-a4b38912a67f",
    "to_node_id": "68aaa212-5883-4f43-978a-2a14855218ab",
    "kind": "decision",
    "choice_label": "Shake a dusty blanket indoors",
    "grade": "DANGEROUS"
  },
  {
    "id": "b5dd4099-1c07-480c-9306-ba94f7a15936",
    "patient_id": "bf387fe0-b314-464e-94ae-1e8cd5b04e8d",
    "from_node_id": "b1e1f471-88d7-4477-ba01-0435cf5f250e",
    "to_node_id": "54ad0bec-17e6-4c29-9124-f3a69c6180e8",
    "kind": "decision",
    "choice_label": "Sit upright in calm air",
    "grade": "NOT_GREAT"
  },
  {
    "id": "6343cac2-19ba-4d85-9956-bee448176432",
    "patient_id": "bf387fe0-b314-464e-94ae-1e8cd5b04e8d",
    "from_node_id": "b1e1f471-88d7-4477-ba01-0435cf5f250e",
    "to_node_id": "9367cc3e-cff1-412e-82dd-996afc9c7339",
    "kind": "decision",
    "choice_label": "Rescue puffer with spacer",
    "grade": "BEST"
  },
  {
    "id": "0e34a135-235e-4b2f-8159-5ea0196ec3a3",
    "patient_id": "bf387fe0-b314-464e-94ae-1e8cd5b04e8d",
    "from_node_id": "b1e1f471-88d7-4477-ba01-0435cf5f250e",
    "to_node_id": "ab137cf1-4a0e-4ffe-974e-bde50e106f7d",
    "kind": "decision",
    "choice_label": "Bury nose in dusty flowers",
    "grade": "WRONG"
  },
  {
    "id": "a446fbf2-e0f7-4201-ae46-3be878d8ecbc",
    "patient_id": "bf387fe0-b314-464e-94ae-1e8cd5b04e8d",
    "from_node_id": "b1e1f471-88d7-4477-ba01-0435cf5f250e",
    "to_node_id": "4f25170a-391f-4657-823c-eeb805f5ad0b",
    "kind": "decision",
    "choice_label": "Shake a dusty blanket indoors",
    "grade": "DANGEROUS"
  },
  {
    "id": "3b44c712-3ae8-40d4-99ff-1ed447d00bc8",
    "patient_id": "3ecf0a2a-0ebf-42be-86cd-ffc87a837199",
    "from_node_id": "38e22b2b-4314-407a-8b7b-b17cd6d077d2",
    "to_node_id": "87e9c146-fb1a-4496-a934-eceda31b53cf",
    "kind": "decision",
    "choice_label": "Warm rest + fluids",
    "grade": "BEST"
  },
  {
    "id": "7a4ff06f-abeb-44b7-a83f-50818d4ef733",
    "patient_id": "3ecf0a2a-0ebf-42be-86cd-ffc87a837199",
    "from_node_id": "38e22b2b-4314-407a-8b7b-b17cd6d077d2",
    "to_node_id": "ed9003ff-0a5d-4756-a45c-0ab05830a329",
    "kind": "decision",
    "choice_label": "Warm soup break",
    "grade": "NOT_GREAT"
  },
  {
    "id": "b632dac8-03e5-446c-9fce-a219330bd17b",
    "patient_id": "3ecf0a2a-0ebf-42be-86cd-ffc87a837199",
    "from_node_id": "38e22b2b-4314-407a-8b7b-b17cd6d077d2",
    "to_node_id": "d60961fe-799f-428c-9549-d7cc9c285051",
    "kind": "decision",
    "choice_label": "Share a cup with a friend",
    "grade": "WRONG"
  },
  {
    "id": "e4a213bd-89f0-4e93-a27c-e2dcac46fb8c",
    "patient_id": "3ecf0a2a-0ebf-42be-86cd-ffc87a837199",
    "from_node_id": "38e22b2b-4314-407a-8b7b-b17cd6d077d2",
    "to_node_id": "15197ed3-358c-4a26-b38a-ae2c408e5e9e",
    "kind": "decision",
    "choice_label": "Plunge into an ice bath",
    "grade": "DANGEROUS"
  },
  {
    "id": "7fefafae-590c-48a7-8fd1-e12e5ca70dd5",
    "patient_id": "3ecf0a2a-0ebf-42be-86cd-ffc87a837199",
    "from_node_id": "87e9c146-fb1a-4496-a934-eceda31b53cf",
    "to_node_id": "f95514bf-bf82-445e-a517-83fe09acaa47",
    "kind": "decision",
    "choice_label": "Warm rest + fluids",
    "grade": "NOT_GREAT"
  },
  {
    "id": "0cee394e-f599-413f-b140-733306626da5",
    "patient_id": "3ecf0a2a-0ebf-42be-86cd-ffc87a837199",
    "from_node_id": "87e9c146-fb1a-4496-a934-eceda31b53cf",
    "to_node_id": "c99a2285-09dc-45be-90ef-23a4d0515c0e",
    "kind": "decision",
    "choice_label": "Warm soup break",
    "grade": "NOT_GREAT"
  },
  {
    "id": "25e7db5e-6521-4e76-87eb-61d099668a30",
    "patient_id": "3ecf0a2a-0ebf-42be-86cd-ffc87a837199",
    "from_node_id": "87e9c146-fb1a-4496-a934-eceda31b53cf",
    "to_node_id": "77ed9e1d-1432-463e-b1ac-9fac5fb53cae",
    "kind": "decision",
    "choice_label": "Share a cup with a friend",
    "grade": "WRONG"
  },
  {
    "id": "d40e6348-1c1d-4df7-bafc-63bb707f9201",
    "patient_id": "3ecf0a2a-0ebf-42be-86cd-ffc87a837199",
    "from_node_id": "87e9c146-fb1a-4496-a934-eceda31b53cf",
    "to_node_id": "95fe81b2-6fb4-4f71-b0ec-84e5b492b3f7",
    "kind": "decision",
    "choice_label": "Plunge into an ice bath",
    "grade": "DANGEROUS"
  },
  {
    "id": "7d8a6471-6d6b-4a8a-8387-69164edea9af",
    "patient_id": "3ecf0a2a-0ebf-42be-86cd-ffc87a837199",
    "from_node_id": "ed9003ff-0a5d-4756-a45c-0ab05830a329",
    "to_node_id": "df7c55f1-f3bd-474e-acf6-210ade5297e2",
    "kind": "decision",
    "choice_label": "Warm rest + fluids",
    "grade": "BEST"
  },
  {
    "id": "e74a7343-7dd3-4782-b3ea-ef9ba4a5c701",
    "patient_id": "3ecf0a2a-0ebf-42be-86cd-ffc87a837199",
    "from_node_id": "ed9003ff-0a5d-4756-a45c-0ab05830a329",
    "to_node_id": "df7ba37d-5a78-4b88-a7d1-587fe9564131",
    "kind": "decision",
    "choice_label": "Warm soup break",
    "grade": "NOT_GREAT"
  },
  {
    "id": "b6ccb3d7-59cf-47f9-a2a9-a9ce5fbda553",
    "patient_id": "3ecf0a2a-0ebf-42be-86cd-ffc87a837199",
    "from_node_id": "ed9003ff-0a5d-4756-a45c-0ab05830a329",
    "to_node_id": "b5e3f47b-8a47-4853-a0a7-2ad6fd8ac19a",
    "kind": "decision",
    "choice_label": "Share a cup with a friend",
    "grade": "WRONG"
  },
  {
    "id": "9ff887cc-b73f-4f28-8616-f8c5c806d2c6",
    "patient_id": "3ecf0a2a-0ebf-42be-86cd-ffc87a837199",
    "from_node_id": "ed9003ff-0a5d-4756-a45c-0ab05830a329",
    "to_node_id": "2ea3fd4e-e0d5-45c4-900f-04d919c43a19",
    "kind": "decision",
    "choice_label": "Plunge into an ice bath",
    "grade": "DANGEROUS"
  },
  {
    "id": "b59dd681-68f2-43cb-afc4-59ca7aa75059",
    "patient_id": "3ecf0a2a-0ebf-42be-86cd-ffc87a837199",
    "from_node_id": "d60961fe-799f-428c-9549-d7cc9c285051",
    "to_node_id": "102fce89-fce4-4b80-9f8a-fe6e48d940ef",
    "kind": "decision",
    "choice_label": "Warm rest + fluids",
    "grade": "BEST"
  },
  {
    "id": "d3d14a8f-3ba8-40a5-8652-85c28f122e70",
    "patient_id": "3ecf0a2a-0ebf-42be-86cd-ffc87a837199",
    "from_node_id": "d60961fe-799f-428c-9549-d7cc9c285051",
    "to_node_id": "691cbaa9-6f97-4b71-aca5-4768c4eafb33",
    "kind": "decision",
    "choice_label": "Warm soup break",
    "grade": "BEST"
  },
  {
    "id": "77991d65-3c53-43bf-9eca-e9bb49ac4707",
    "patient_id": "3ecf0a2a-0ebf-42be-86cd-ffc87a837199",
    "from_node_id": "d60961fe-799f-428c-9549-d7cc9c285051",
    "to_node_id": "65cb7607-d5ff-42fe-a36d-c6d6809fef53",
    "kind": "decision",
    "choice_label": "Share a cup with a friend",
    "grade": "WRONG"
  },
  {
    "id": "1d675d7e-3574-4491-8f22-705955b11c9b",
    "patient_id": "3ecf0a2a-0ebf-42be-86cd-ffc87a837199",
    "from_node_id": "d60961fe-799f-428c-9549-d7cc9c285051",
    "to_node_id": "c100ccc7-c47e-4efc-bbdb-ea0e7745c0ae",
    "kind": "decision",
    "choice_label": "Plunge into an ice bath",
    "grade": "DANGEROUS"
  },
  {
    "id": "ad55ebfb-93ea-4fd9-a11f-e76f4fe098da",
    "patient_id": "5cd059de-fe4d-422f-95c9-084b4474309c",
    "from_node_id": "6b16edba-6d28-4bf5-9e15-1be3df737b82",
    "to_node_id": "3b265924-68b2-483d-9ada-3e7ac9d094e0",
    "kind": "decision",
    "choice_label": "Offer cool water",
    "grade": "BEST"
  },
  {
    "id": "0ec417c4-90c5-48b9-af8c-3e6d9390cab0",
    "patient_id": "5cd059de-fe4d-422f-95c9-084b4474309c",
    "from_node_id": "6b16edba-6d28-4bf5-9e15-1be3df737b82",
    "to_node_id": "2f5df489-18af-4239-ba73-c29e7f3b13e7",
    "kind": "decision",
    "choice_label": "Rest in the shade",
    "grade": "BEST"
  },
  {
    "id": "25418e3c-9b89-45d9-a6b7-108ba50b8583",
    "patient_id": "5cd059de-fe4d-422f-95c9-084b4474309c",
    "from_node_id": "6b16edba-6d28-4bf5-9e15-1be3df737b82",
    "to_node_id": "08e86d6d-8c56-4a3e-b9b1-519c005f3857",
    "kind": "decision",
    "choice_label": "Give fizzy soda",
    "grade": "WRONG"
  },
  {
    "id": "5c74455f-8641-467d-9924-29105b91763b",
    "patient_id": "5cd059de-fe4d-422f-95c9-084b4474309c",
    "from_node_id": "6b16edba-6d28-4bf5-9e15-1be3df737b82",
    "to_node_id": "e453d9a0-03e1-4712-a587-7c78cd933b64",
    "kind": "decision",
    "choice_label": "Feed a whole salt pouch",
    "grade": "DANGEROUS"
  },
  {
    "id": "715d4ff1-2b49-42be-81f8-4c1f6740599d",
    "patient_id": "5cd059de-fe4d-422f-95c9-084b4474309c",
    "from_node_id": "3b265924-68b2-483d-9ada-3e7ac9d094e0",
    "to_node_id": "fe7d5003-f712-4132-9012-4e2b885d00ec",
    "kind": "decision",
    "choice_label": "Offer cool water",
    "grade": "BEST"
  },
  {
    "id": "0567a12d-87e3-4544-b37f-b5dc0e9c0149",
    "patient_id": "5cd059de-fe4d-422f-95c9-084b4474309c",
    "from_node_id": "3b265924-68b2-483d-9ada-3e7ac9d094e0",
    "to_node_id": "7b32eb9c-01e4-4380-a890-ee61cedc0552",
    "kind": "decision",
    "choice_label": "Rest in the shade",
    "grade": "NOT_GREAT"
  },
  {
    "id": "2a1f5e05-0a64-4d06-ab3e-06bc84f75da6",
    "patient_id": "5cd059de-fe4d-422f-95c9-084b4474309c",
    "from_node_id": "3b265924-68b2-483d-9ada-3e7ac9d094e0",
    "to_node_id": "b6c3cdf2-c270-40ad-a278-e31b8e23c233",
    "kind": "decision",
    "choice_label": "Give fizzy soda",
    "grade": "WRONG"
  },
  {
    "id": "abe658c6-73b1-4fda-a4cb-580f1d3589ff",
    "patient_id": "5cd059de-fe4d-422f-95c9-084b4474309c",
    "from_node_id": "3b265924-68b2-483d-9ada-3e7ac9d094e0",
    "to_node_id": "1e78d169-7b1a-46ab-b89b-26f0d24ff2bc",
    "kind": "decision",
    "choice_label": "Feed a whole salt pouch",
    "grade": "DANGEROUS"
  },
  {
    "id": "92a853c6-766f-44e6-89bd-de84e2b76d92",
    "patient_id": "5cd059de-fe4d-422f-95c9-084b4474309c",
    "from_node_id": "2f5df489-18af-4239-ba73-c29e7f3b13e7",
    "to_node_id": "8cc8c5a9-fe39-4e72-a877-4c2330255a28",
    "kind": "decision",
    "choice_label": "Offer cool water",
    "grade": "BEST"
  },
  {
    "id": "38be090d-ab84-43c1-ba35-e301bc1c5fd3",
    "patient_id": "5cd059de-fe4d-422f-95c9-084b4474309c",
    "from_node_id": "2f5df489-18af-4239-ba73-c29e7f3b13e7",
    "to_node_id": "6070f6b0-9b8f-41a5-bc9c-db283559960f",
    "kind": "decision",
    "choice_label": "Rest in the shade",
    "grade": "NOT_GREAT"
  },
  {
    "id": "65920947-e12d-4196-85f5-dcc52561f18d",
    "patient_id": "5cd059de-fe4d-422f-95c9-084b4474309c",
    "from_node_id": "2f5df489-18af-4239-ba73-c29e7f3b13e7",
    "to_node_id": "5158934d-60b7-419e-b101-6d5cf94ecf25",
    "kind": "decision",
    "choice_label": "Give fizzy soda",
    "grade": "WRONG"
  },
  {
    "id": "a44df744-43ca-440b-9649-7a93f138e35b",
    "patient_id": "5cd059de-fe4d-422f-95c9-084b4474309c",
    "from_node_id": "2f5df489-18af-4239-ba73-c29e7f3b13e7",
    "to_node_id": "617e33b3-e2c5-47f7-a389-bcb1ecc8bdc7",
    "kind": "decision",
    "choice_label": "Feed a whole salt pouch",
    "grade": "DANGEROUS"
  },
  {
    "id": "83ee9162-0135-4a93-bbea-8a08c31e1dd1",
    "patient_id": "5cd059de-fe4d-422f-95c9-084b4474309c",
    "from_node_id": "08e86d6d-8c56-4a3e-b9b1-519c005f3857",
    "to_node_id": "0bcbe97d-1586-465f-8c37-7e20ceb621f6",
    "kind": "decision",
    "choice_label": "Offer cool water",
    "grade": "BEST"
  },
  {
    "id": "c32448ca-427b-4819-988f-b88df4dba01b",
    "patient_id": "5cd059de-fe4d-422f-95c9-084b4474309c",
    "from_node_id": "08e86d6d-8c56-4a3e-b9b1-519c005f3857",
    "to_node_id": "54674d6a-6906-48ff-96f2-b79209be9390",
    "kind": "decision",
    "choice_label": "Rest in the shade",
    "grade": "NOT_GREAT"
  },
  {
    "id": "88bc50d5-43c8-4c33-ad73-b9075d9f9468",
    "patient_id": "5cd059de-fe4d-422f-95c9-084b4474309c",
    "from_node_id": "08e86d6d-8c56-4a3e-b9b1-519c005f3857",
    "to_node_id": "2f3d05f3-a55f-417b-8bc8-d9fa5a541056",
    "kind": "decision",
    "choice_label": "Give fizzy soda",
    "grade": "WRONG"
  },
  {
    "id": "d248138d-7326-424f-9488-8984ff72a093",
    "patient_id": "5cd059de-fe4d-422f-95c9-084b4474309c",
    "from_node_id": "08e86d6d-8c56-4a3e-b9b1-519c005f3857",
    "to_node_id": "258fcf9a-059a-4dbc-afe4-920d8ba4a4c6",
    "kind": "decision",
    "choice_label": "Feed a whole salt pouch",
    "grade": "DANGEROUS"
  },
  {
    "id": "edab0fec-3ff4-48d8-b418-342a39762e25",
    "patient_id": "c538db11-dec0-4905-a5b1-c82e65105229",
    "from_node_id": "bcc9ca1d-be23-4ed4-982d-9e7f6fe15257",
    "to_node_id": "f5baa027-14d0-4495-85db-7cf4ca712498",
    "kind": "decision",
    "choice_label": "Daily walks, less salt",
    "grade": "BEST"
  },
  {
    "id": "793770b9-39b6-4c67-ad0e-e15c61923de5",
    "patient_id": "c538db11-dec0-4905-a5b1-c82e65105229",
    "from_node_id": "bcc9ca1d-be23-4ed4-982d-9e7f6fe15257",
    "to_node_id": "efda60bc-0278-405b-81e5-725f529c12e8",
    "kind": "decision",
    "choice_label": "Take prescribed medicine",
    "grade": "BEST"
  },
  {
    "id": "23381789-c819-4066-98bb-d40285e0cc20",
    "patient_id": "c538db11-dec0-4905-a5b1-c82e65105229",
    "from_node_id": "bcc9ca1d-be23-4ed4-982d-9e7f6fe15257",
    "to_node_id": "b88b2875-c211-4246-9f83-f7f938442032",
    "kind": "decision",
    "choice_label": "Skip meds — feeling fine!",
    "grade": "WRONG"
  },
  {
    "id": "9c83d726-a068-4482-ae57-9f2fce20d04e",
    "patient_id": "c538db11-dec0-4905-a5b1-c82e65105229",
    "from_node_id": "bcc9ca1d-be23-4ed4-982d-9e7f6fe15257",
    "to_node_id": "1c26d961-d19e-4bad-8618-db5da397fe04",
    "kind": "decision",
    "choice_label": "Double the dose to fix it faster",
    "grade": "DANGEROUS"
  },
  {
    "id": "66b0cf9a-65d1-4842-a7ea-8f17015d71df",
    "patient_id": "c538db11-dec0-4905-a5b1-c82e65105229",
    "from_node_id": "f5baa027-14d0-4495-85db-7cf4ca712498",
    "to_node_id": "842a1cdd-26e9-4402-9889-9a44e4e29768",
    "kind": "decision",
    "choice_label": "Daily walks, less salt",
    "grade": "BEST"
  },
  {
    "id": "799e0b2b-8cf9-49c5-89f7-ecfdfca2acd4",
    "patient_id": "c538db11-dec0-4905-a5b1-c82e65105229",
    "from_node_id": "f5baa027-14d0-4495-85db-7cf4ca712498",
    "to_node_id": "c23ed3f3-8307-44c8-a68e-82b6e2a9aca5",
    "kind": "decision",
    "choice_label": "Take prescribed medicine",
    "grade": "NOT_GREAT"
  },
  {
    "id": "0a206b98-bc18-4eec-a348-1ff81643d475",
    "patient_id": "c538db11-dec0-4905-a5b1-c82e65105229",
    "from_node_id": "f5baa027-14d0-4495-85db-7cf4ca712498",
    "to_node_id": "f4c83a14-f9fe-4480-a7f4-26b2f86efbb7",
    "kind": "decision",
    "choice_label": "Skip meds — feeling fine!",
    "grade": "WRONG"
  },
  {
    "id": "8c72fe55-0dc5-4ec6-b069-18291c60c9e6",
    "patient_id": "c538db11-dec0-4905-a5b1-c82e65105229",
    "from_node_id": "f5baa027-14d0-4495-85db-7cf4ca712498",
    "to_node_id": "cb967c3c-7442-45ac-acd9-48520092d41b",
    "kind": "decision",
    "choice_label": "Double the dose to fix it faster",
    "grade": "DANGEROUS"
  },
  {
    "id": "04482ac6-3cdc-4989-81bc-09ce4419e451",
    "patient_id": "c538db11-dec0-4905-a5b1-c82e65105229",
    "from_node_id": "efda60bc-0278-405b-81e5-725f529c12e8",
    "to_node_id": "bc996c2e-ff13-4c55-86c0-0bae3bbd79f1",
    "kind": "decision",
    "choice_label": "Daily walks, less salt",
    "grade": "BEST"
  },
  {
    "id": "28034fb6-20ad-4c2a-8c72-4b6ca0955209",
    "patient_id": "c538db11-dec0-4905-a5b1-c82e65105229",
    "from_node_id": "efda60bc-0278-405b-81e5-725f529c12e8",
    "to_node_id": "d86d800f-c32f-4321-a19e-194757d52f19",
    "kind": "decision",
    "choice_label": "Take prescribed medicine",
    "grade": "NOT_GREAT"
  },
  {
    "id": "e53447be-e572-4bbd-a0e6-5d5f4d36fec5",
    "patient_id": "c538db11-dec0-4905-a5b1-c82e65105229",
    "from_node_id": "efda60bc-0278-405b-81e5-725f529c12e8",
    "to_node_id": "f1baabeb-c7dd-44f9-9a15-840ec291476b",
    "kind": "decision",
    "choice_label": "Skip meds — feeling fine!",
    "grade": "WRONG"
  },
  {
    "id": "11fd29ff-2782-4c1d-bc00-4605875c23c4",
    "patient_id": "c538db11-dec0-4905-a5b1-c82e65105229",
    "from_node_id": "efda60bc-0278-405b-81e5-725f529c12e8",
    "to_node_id": "883aae2b-4366-4864-8b92-950c52b6c2b4",
    "kind": "decision",
    "choice_label": "Double the dose to fix it faster",
    "grade": "DANGEROUS"
  },
  {
    "id": "48d6a7cf-54af-4be6-83cc-c26774638d31",
    "patient_id": "c538db11-dec0-4905-a5b1-c82e65105229",
    "from_node_id": "b88b2875-c211-4246-9f83-f7f938442032",
    "to_node_id": "97f9805f-0b42-4e2e-815f-ce7a7ffa366f",
    "kind": "decision",
    "choice_label": "Daily walks, less salt",
    "grade": "NOT_GREAT"
  },
  {
    "id": "929bb97f-b5ed-4b5c-a110-d33cd21efd56",
    "patient_id": "c538db11-dec0-4905-a5b1-c82e65105229",
    "from_node_id": "b88b2875-c211-4246-9f83-f7f938442032",
    "to_node_id": "0aaa28d1-a458-46d6-bc71-8d4e8f04b1bf",
    "kind": "decision",
    "choice_label": "Take prescribed medicine",
    "grade": "BEST"
  },
  {
    "id": "79128bc0-b03d-4e1b-95b2-6c5454da1661",
    "patient_id": "c538db11-dec0-4905-a5b1-c82e65105229",
    "from_node_id": "b88b2875-c211-4246-9f83-f7f938442032",
    "to_node_id": "fe62f4ae-a463-4b64-8636-22344a4edc40",
    "kind": "decision",
    "choice_label": "Skip meds — feeling fine!",
    "grade": "WRONG"
  },
  {
    "id": "1bfee678-0f71-4188-80fb-d3d40019d19f",
    "patient_id": "c538db11-dec0-4905-a5b1-c82e65105229",
    "from_node_id": "b88b2875-c211-4246-9f83-f7f938442032",
    "to_node_id": "7ebc8c9e-fd08-4094-9569-1bff65f96b05",
    "kind": "decision",
    "choice_label": "Double the dose to fix it faster",
    "grade": "DANGEROUS"
  },
  {
    "id": "644d2356-7fa5-41f6-bd85-5e179ee5b27b",
    "patient_id": "b045d647-86dd-4c40-8dbc-b5a4bbd2b6a9",
    "from_node_id": "7a5913f9-d72c-456d-93fb-70e39b0e0612",
    "to_node_id": "b0a42aca-b06d-4219-9b0b-f26f0a319061",
    "kind": "decision",
    "choice_label": "Sit upright in calm air",
    "grade": "BEST"
  },
  {
    "id": "b5580eab-5635-4bbf-968a-c6f3efaecb4a",
    "patient_id": "b045d647-86dd-4c40-8dbc-b5a4bbd2b6a9",
    "from_node_id": "7a5913f9-d72c-456d-93fb-70e39b0e0612",
    "to_node_id": "e628eba3-7fdf-4ee7-9869-b3a42264d8de",
    "kind": "decision",
    "choice_label": "Rescue puffer with spacer",
    "grade": "BEST"
  },
  {
    "id": "9adbf890-f3d0-46a4-9657-91838b413027",
    "patient_id": "b045d647-86dd-4c40-8dbc-b5a4bbd2b6a9",
    "from_node_id": "7a5913f9-d72c-456d-93fb-70e39b0e0612",
    "to_node_id": "dfeb42bf-35c2-42e9-a48c-55cd56f6bff0",
    "kind": "decision",
    "choice_label": "Bury nose in dusty flowers",
    "grade": "WRONG"
  },
  {
    "id": "724070e3-73ef-4548-9f47-34084c13aa0b",
    "patient_id": "b045d647-86dd-4c40-8dbc-b5a4bbd2b6a9",
    "from_node_id": "7a5913f9-d72c-456d-93fb-70e39b0e0612",
    "to_node_id": "2e7bb78f-42dc-46f5-93a4-348dc3cef7cc",
    "kind": "decision",
    "choice_label": "Shake a dusty blanket indoors",
    "grade": "DANGEROUS"
  },
  {
    "id": "deb6a00f-ac96-4486-9eba-eaf0f111f29c",
    "patient_id": "b045d647-86dd-4c40-8dbc-b5a4bbd2b6a9",
    "from_node_id": "b0a42aca-b06d-4219-9b0b-f26f0a319061",
    "to_node_id": "8c5ff1c3-e648-40fa-bf58-8e26759353a2",
    "kind": "decision",
    "choice_label": "Sit upright in calm air",
    "grade": "BEST"
  },
  {
    "id": "9a47b48a-21f1-4b82-80bf-177ceabff01a",
    "patient_id": "b045d647-86dd-4c40-8dbc-b5a4bbd2b6a9",
    "from_node_id": "b0a42aca-b06d-4219-9b0b-f26f0a319061",
    "to_node_id": "67cee3b9-04fd-49dd-93ed-288e0d8606b0",
    "kind": "decision",
    "choice_label": "Rescue puffer with spacer",
    "grade": "BEST"
  },
  {
    "id": "7ca7a464-e79c-49e9-a55e-b5c8a8b523d9",
    "patient_id": "b045d647-86dd-4c40-8dbc-b5a4bbd2b6a9",
    "from_node_id": "b0a42aca-b06d-4219-9b0b-f26f0a319061",
    "to_node_id": "ab7e51d0-9b90-4007-9497-48e667144296",
    "kind": "decision",
    "choice_label": "Bury nose in dusty flowers",
    "grade": "WRONG"
  },
  {
    "id": "c6aa9831-859c-4c21-b3b5-b6aa8ad5b0e2",
    "patient_id": "b045d647-86dd-4c40-8dbc-b5a4bbd2b6a9",
    "from_node_id": "b0a42aca-b06d-4219-9b0b-f26f0a319061",
    "to_node_id": "7a51f061-ab0b-44a2-89ad-45b973aa3fc8",
    "kind": "decision",
    "choice_label": "Shake a dusty blanket indoors",
    "grade": "DANGEROUS"
  },
  {
    "id": "9f129b5e-11f9-4a8c-9a54-1247135ddf05",
    "patient_id": "b045d647-86dd-4c40-8dbc-b5a4bbd2b6a9",
    "from_node_id": "e628eba3-7fdf-4ee7-9869-b3a42264d8de",
    "to_node_id": "67317fdd-ab8e-4cfd-9bae-8f69d6398ff0",
    "kind": "decision",
    "choice_label": "Sit upright in calm air",
    "grade": "BEST"
  },
  {
    "id": "186f89f3-c4d9-49ab-990a-2b236db14a83",
    "patient_id": "b045d647-86dd-4c40-8dbc-b5a4bbd2b6a9",
    "from_node_id": "e628eba3-7fdf-4ee7-9869-b3a42264d8de",
    "to_node_id": "6177f891-5cec-4830-8d5e-0d64ad64686c",
    "kind": "decision",
    "choice_label": "Rescue puffer with spacer",
    "grade": "BEST"
  },
  {
    "id": "bc836841-583a-4451-a531-1370930e9018",
    "patient_id": "b045d647-86dd-4c40-8dbc-b5a4bbd2b6a9",
    "from_node_id": "e628eba3-7fdf-4ee7-9869-b3a42264d8de",
    "to_node_id": "79f5b957-cfbf-4837-ac0b-23adafe04813",
    "kind": "decision",
    "choice_label": "Bury nose in dusty flowers",
    "grade": "WRONG"
  },
  {
    "id": "382b736e-48c7-4a52-9e24-5b431b4d8115",
    "patient_id": "b045d647-86dd-4c40-8dbc-b5a4bbd2b6a9",
    "from_node_id": "e628eba3-7fdf-4ee7-9869-b3a42264d8de",
    "to_node_id": "26b5cefc-f977-4fff-b0e4-6f3c1fa620f9",
    "kind": "decision",
    "choice_label": "Shake a dusty blanket indoors",
    "grade": "DANGEROUS"
  },
  {
    "id": "bc14e836-de29-4e57-abc0-8ee2046e7988",
    "patient_id": "b045d647-86dd-4c40-8dbc-b5a4bbd2b6a9",
    "from_node_id": "dfeb42bf-35c2-42e9-a48c-55cd56f6bff0",
    "to_node_id": "7188164e-a826-402f-b984-932b081fe36c",
    "kind": "decision",
    "choice_label": "Sit upright in calm air",
    "grade": "NOT_GREAT"
  },
  {
    "id": "73731531-ff8b-4cf8-841c-3ad613e768a9",
    "patient_id": "b045d647-86dd-4c40-8dbc-b5a4bbd2b6a9",
    "from_node_id": "dfeb42bf-35c2-42e9-a48c-55cd56f6bff0",
    "to_node_id": "2aa7d340-8502-4998-84f0-b61e341e87c8",
    "kind": "decision",
    "choice_label": "Rescue puffer with spacer",
    "grade": "BEST"
  },
  {
    "id": "11f4c268-d208-4e32-bb18-a95532861828",
    "patient_id": "b045d647-86dd-4c40-8dbc-b5a4bbd2b6a9",
    "from_node_id": "dfeb42bf-35c2-42e9-a48c-55cd56f6bff0",
    "to_node_id": "3869bc8b-0b43-4bfb-8055-5fcc4f9f7463",
    "kind": "decision",
    "choice_label": "Bury nose in dusty flowers",
    "grade": "WRONG"
  },
  {
    "id": "34c79035-d065-4026-91bb-6f52fa3749e7",
    "patient_id": "b045d647-86dd-4c40-8dbc-b5a4bbd2b6a9",
    "from_node_id": "dfeb42bf-35c2-42e9-a48c-55cd56f6bff0",
    "to_node_id": "b682e084-52cf-4868-882d-68aa369d09da",
    "kind": "decision",
    "choice_label": "Shake a dusty blanket indoors",
    "grade": "DANGEROUS"
  },
  {
    "id": "e46ef397-a9d5-4ee5-9641-c0f041ddb0bf",
    "patient_id": "03c6aac1-ddc2-4a17-ae0c-ea26f51520ae",
    "from_node_id": "0a8fc758-0c82-41be-a714-7045779f7247",
    "to_node_id": "8822024e-aa63-4104-99c4-ade918c2720c",
    "kind": "decision",
    "choice_label": "Warm rest + fluids",
    "grade": "BEST"
  },
  {
    "id": "42f636ba-5e96-42f3-925e-c4a1193cd1cb",
    "patient_id": "03c6aac1-ddc2-4a17-ae0c-ea26f51520ae",
    "from_node_id": "0a8fc758-0c82-41be-a714-7045779f7247",
    "to_node_id": "922ec421-e65a-4fc8-9172-4330ef419782",
    "kind": "decision",
    "choice_label": "Warm soup break",
    "grade": "NOT_GREAT"
  },
  {
    "id": "621bf916-4d33-48b4-a580-4ae3da47c50b",
    "patient_id": "03c6aac1-ddc2-4a17-ae0c-ea26f51520ae",
    "from_node_id": "0a8fc758-0c82-41be-a714-7045779f7247",
    "to_node_id": "0fb4f07b-6d46-4a7e-a2c4-6f5b55e8fed4",
    "kind": "decision",
    "choice_label": "Share a cup with a friend",
    "grade": "WRONG"
  },
  {
    "id": "279f1c80-5dac-4990-ba7c-e1a9956d1723",
    "patient_id": "03c6aac1-ddc2-4a17-ae0c-ea26f51520ae",
    "from_node_id": "0a8fc758-0c82-41be-a714-7045779f7247",
    "to_node_id": "1b573909-e262-4fe3-be06-78438134a497",
    "kind": "decision",
    "choice_label": "Plunge into an ice bath",
    "grade": "DANGEROUS"
  },
  {
    "id": "49e462a2-dcf4-4eaf-9460-d7b547f4e615",
    "patient_id": "03c6aac1-ddc2-4a17-ae0c-ea26f51520ae",
    "from_node_id": "8822024e-aa63-4104-99c4-ade918c2720c",
    "to_node_id": "7179c072-7f93-4cd5-a23c-0acc9eca64b4",
    "kind": "decision",
    "choice_label": "Warm rest + fluids",
    "grade": "NOT_GREAT"
  },
  {
    "id": "8c53e918-44a5-4f47-be1d-4ddd233582c0",
    "patient_id": "03c6aac1-ddc2-4a17-ae0c-ea26f51520ae",
    "from_node_id": "8822024e-aa63-4104-99c4-ade918c2720c",
    "to_node_id": "d4c1e014-fe93-455b-a4b7-87f4c18a017e",
    "kind": "decision",
    "choice_label": "Warm soup break",
    "grade": "NOT_GREAT"
  },
  {
    "id": "150244f8-f1fe-4c24-8d86-e9684badb22b",
    "patient_id": "03c6aac1-ddc2-4a17-ae0c-ea26f51520ae",
    "from_node_id": "8822024e-aa63-4104-99c4-ade918c2720c",
    "to_node_id": "dabc76af-2e32-4c81-83e9-e5845aff3c00",
    "kind": "decision",
    "choice_label": "Share a cup with a friend",
    "grade": "WRONG"
  },
  {
    "id": "b5e40fe8-1d3b-4939-872e-ab6dc99847fb",
    "patient_id": "03c6aac1-ddc2-4a17-ae0c-ea26f51520ae",
    "from_node_id": "8822024e-aa63-4104-99c4-ade918c2720c",
    "to_node_id": "c76bcafa-c4e9-419e-a995-fe8dcf841dd3",
    "kind": "decision",
    "choice_label": "Plunge into an ice bath",
    "grade": "DANGEROUS"
  },
  {
    "id": "0a0d305d-7b0c-42e2-b9e3-810c926a79eb",
    "patient_id": "03c6aac1-ddc2-4a17-ae0c-ea26f51520ae",
    "from_node_id": "922ec421-e65a-4fc8-9172-4330ef419782",
    "to_node_id": "2eeb88f0-4548-4378-b6fa-fc8d5479a4b3",
    "kind": "decision",
    "choice_label": "Warm rest + fluids",
    "grade": "BEST"
  },
  {
    "id": "9e1ce7ae-8e80-4f3e-b5e4-bb76b53c907a",
    "patient_id": "03c6aac1-ddc2-4a17-ae0c-ea26f51520ae",
    "from_node_id": "922ec421-e65a-4fc8-9172-4330ef419782",
    "to_node_id": "1b58d03e-0a12-4381-a7a6-3811536ae356",
    "kind": "decision",
    "choice_label": "Warm soup break",
    "grade": "NOT_GREAT"
  },
  {
    "id": "5d4d1243-4dd4-4525-8b56-a9e1cf63cf3d",
    "patient_id": "03c6aac1-ddc2-4a17-ae0c-ea26f51520ae",
    "from_node_id": "922ec421-e65a-4fc8-9172-4330ef419782",
    "to_node_id": "76a7a9b0-da08-4087-adc3-29c0d8827d95",
    "kind": "decision",
    "choice_label": "Share a cup with a friend",
    "grade": "WRONG"
  },
  {
    "id": "8c59b423-4310-42cc-b2e7-772a271744bd",
    "patient_id": "03c6aac1-ddc2-4a17-ae0c-ea26f51520ae",
    "from_node_id": "922ec421-e65a-4fc8-9172-4330ef419782",
    "to_node_id": "18a82713-c3f0-4b45-92a9-99b13a08b4dd",
    "kind": "decision",
    "choice_label": "Plunge into an ice bath",
    "grade": "DANGEROUS"
  },
  {
    "id": "e13f271c-ecf4-40d5-8290-dadf95e4d9ee",
    "patient_id": "03c6aac1-ddc2-4a17-ae0c-ea26f51520ae",
    "from_node_id": "0fb4f07b-6d46-4a7e-a2c4-6f5b55e8fed4",
    "to_node_id": "31cd510d-fe5d-4497-93fb-8678ec6351f0",
    "kind": "decision",
    "choice_label": "Warm rest + fluids",
    "grade": "BEST"
  },
  {
    "id": "0c3f230b-ecbe-4ffd-a528-2e04a4167fed",
    "patient_id": "03c6aac1-ddc2-4a17-ae0c-ea26f51520ae",
    "from_node_id": "0fb4f07b-6d46-4a7e-a2c4-6f5b55e8fed4",
    "to_node_id": "cad844e2-5bc0-4aba-ae90-bc2687f9ebe8",
    "kind": "decision",
    "choice_label": "Warm soup break",
    "grade": "BEST"
  },
  {
    "id": "9969d055-dceb-4c63-81fc-6fc94f669b1d",
    "patient_id": "03c6aac1-ddc2-4a17-ae0c-ea26f51520ae",
    "from_node_id": "0fb4f07b-6d46-4a7e-a2c4-6f5b55e8fed4",
    "to_node_id": "8b810945-7d9f-4300-a8f6-1ea7d3b006a9",
    "kind": "decision",
    "choice_label": "Share a cup with a friend",
    "grade": "WRONG"
  },
  {
    "id": "8b7bc77e-d47d-4761-aa4b-92f9c9847f03",
    "patient_id": "03c6aac1-ddc2-4a17-ae0c-ea26f51520ae",
    "from_node_id": "0fb4f07b-6d46-4a7e-a2c4-6f5b55e8fed4",
    "to_node_id": "bc2f8550-0b33-47e7-8fc0-62b4547038cd",
    "kind": "decision",
    "choice_label": "Plunge into an ice bath",
    "grade": "DANGEROUS"
  },
  {
    "id": "e54addc9-4d93-4666-80a0-d7fd6181d1ff",
    "patient_id": "ced9ea83-5b73-4cc2-bc2b-2db579c09640",
    "from_node_id": "d362bdf8-8f78-4329-9043-cdf490da8689",
    "to_node_id": "757d4977-07ed-4f5c-aec6-538563756ad2",
    "kind": "decision",
    "choice_label": "Offer cool water",
    "grade": "BEST"
  },
  {
    "id": "cf175cdf-fec4-45b9-ab83-e7102196ad21",
    "patient_id": "ced9ea83-5b73-4cc2-bc2b-2db579c09640",
    "from_node_id": "d362bdf8-8f78-4329-9043-cdf490da8689",
    "to_node_id": "b365d966-d1bd-4445-8ec5-3fe8a52ac6ff",
    "kind": "decision",
    "choice_label": "Rest in the shade",
    "grade": "BEST"
  },
  {
    "id": "7357f7a1-b009-4f0c-89f2-e911520299f5",
    "patient_id": "ced9ea83-5b73-4cc2-bc2b-2db579c09640",
    "from_node_id": "d362bdf8-8f78-4329-9043-cdf490da8689",
    "to_node_id": "c30ca15b-80e1-4699-98cd-27199c5d6205",
    "kind": "decision",
    "choice_label": "Give fizzy soda",
    "grade": "WRONG"
  },
  {
    "id": "aace5a2a-55ad-4d17-b33a-61c424b78757",
    "patient_id": "ced9ea83-5b73-4cc2-bc2b-2db579c09640",
    "from_node_id": "d362bdf8-8f78-4329-9043-cdf490da8689",
    "to_node_id": "db9d8724-4d07-4552-940d-b99dff9fa298",
    "kind": "decision",
    "choice_label": "Feed a whole salt pouch",
    "grade": "DANGEROUS"
  },
  {
    "id": "31447870-1b93-4529-bf35-8ae8845180bb",
    "patient_id": "ced9ea83-5b73-4cc2-bc2b-2db579c09640",
    "from_node_id": "757d4977-07ed-4f5c-aec6-538563756ad2",
    "to_node_id": "0b700fcf-730e-4046-8e45-8963d4c3cfbd",
    "kind": "decision",
    "choice_label": "Offer cool water",
    "grade": "BEST"
  },
  {
    "id": "3c80ab6d-34bf-4725-a1d1-dd08fc2838c4",
    "patient_id": "ced9ea83-5b73-4cc2-bc2b-2db579c09640",
    "from_node_id": "757d4977-07ed-4f5c-aec6-538563756ad2",
    "to_node_id": "6937f330-c533-418a-bd4c-999b540c2fec",
    "kind": "decision",
    "choice_label": "Rest in the shade",
    "grade": "NOT_GREAT"
  },
  {
    "id": "8d752cef-3908-4097-9064-7616295d6066",
    "patient_id": "ced9ea83-5b73-4cc2-bc2b-2db579c09640",
    "from_node_id": "757d4977-07ed-4f5c-aec6-538563756ad2",
    "to_node_id": "6feff431-4acd-4766-8b32-6d1e7b66032f",
    "kind": "decision",
    "choice_label": "Give fizzy soda",
    "grade": "WRONG"
  },
  {
    "id": "00d7ab2c-95a6-4c20-9ca5-69deb9abf969",
    "patient_id": "ced9ea83-5b73-4cc2-bc2b-2db579c09640",
    "from_node_id": "757d4977-07ed-4f5c-aec6-538563756ad2",
    "to_node_id": "f88167cb-ec62-4029-bc87-a6b9656c4f0b",
    "kind": "decision",
    "choice_label": "Feed a whole salt pouch",
    "grade": "DANGEROUS"
  },
  {
    "id": "9172271e-e4ac-4162-8723-932a63e3e076",
    "patient_id": "ced9ea83-5b73-4cc2-bc2b-2db579c09640",
    "from_node_id": "b365d966-d1bd-4445-8ec5-3fe8a52ac6ff",
    "to_node_id": "0d654461-dad0-40c2-88c1-9268ca637ac8",
    "kind": "decision",
    "choice_label": "Offer cool water",
    "grade": "BEST"
  },
  {
    "id": "ffa65ec6-c615-4882-88cf-e6fc77bea812",
    "patient_id": "ced9ea83-5b73-4cc2-bc2b-2db579c09640",
    "from_node_id": "b365d966-d1bd-4445-8ec5-3fe8a52ac6ff",
    "to_node_id": "585c5b55-68cb-4293-8fc2-46e835da94d5",
    "kind": "decision",
    "choice_label": "Rest in the shade",
    "grade": "NOT_GREAT"
  },
  {
    "id": "a99a6fd3-eb4c-4e7d-a627-8935f3dfb45e",
    "patient_id": "ced9ea83-5b73-4cc2-bc2b-2db579c09640",
    "from_node_id": "b365d966-d1bd-4445-8ec5-3fe8a52ac6ff",
    "to_node_id": "a97b60a1-ad0e-4012-a604-b48401dc82eb",
    "kind": "decision",
    "choice_label": "Give fizzy soda",
    "grade": "WRONG"
  },
  {
    "id": "30ae0d5a-e824-49f7-89ba-48084b2f100c",
    "patient_id": "ced9ea83-5b73-4cc2-bc2b-2db579c09640",
    "from_node_id": "b365d966-d1bd-4445-8ec5-3fe8a52ac6ff",
    "to_node_id": "9dd106cc-e18e-4f4a-85cb-ee0ca20040f4",
    "kind": "decision",
    "choice_label": "Feed a whole salt pouch",
    "grade": "DANGEROUS"
  },
  {
    "id": "001c23c1-4fad-4daa-9d0b-1127353b9619",
    "patient_id": "ced9ea83-5b73-4cc2-bc2b-2db579c09640",
    "from_node_id": "c30ca15b-80e1-4699-98cd-27199c5d6205",
    "to_node_id": "027fee79-2d13-4311-bb75-2cad0a0be736",
    "kind": "decision",
    "choice_label": "Offer cool water",
    "grade": "BEST"
  },
  {
    "id": "ce15d63a-99ba-4c52-a560-47c77824cbf2",
    "patient_id": "ced9ea83-5b73-4cc2-bc2b-2db579c09640",
    "from_node_id": "c30ca15b-80e1-4699-98cd-27199c5d6205",
    "to_node_id": "1422cbd9-ea0b-447b-a330-7f5badcafba8",
    "kind": "decision",
    "choice_label": "Rest in the shade",
    "grade": "NOT_GREAT"
  },
  {
    "id": "dddddc57-f758-41c5-999e-1aa282873ada",
    "patient_id": "ced9ea83-5b73-4cc2-bc2b-2db579c09640",
    "from_node_id": "c30ca15b-80e1-4699-98cd-27199c5d6205",
    "to_node_id": "08d52c6a-4576-4fb0-bd45-a2b37d72f32c",
    "kind": "decision",
    "choice_label": "Give fizzy soda",
    "grade": "WRONG"
  },
  {
    "id": "0fcad04e-7ab0-4a2a-a88b-8fce432cde43",
    "patient_id": "ced9ea83-5b73-4cc2-bc2b-2db579c09640",
    "from_node_id": "c30ca15b-80e1-4699-98cd-27199c5d6205",
    "to_node_id": "9da590da-77f8-4a59-ba50-a521f8c4615e",
    "kind": "decision",
    "choice_label": "Feed a whole salt pouch",
    "grade": "DANGEROUS"
  },
  {
    "id": "1742930e-c878-415a-af7e-0235824ea849",
    "patient_id": "0d28e7ff-7d42-4d1a-a889-063ef908db4f",
    "from_node_id": "c0a0f31c-9ce4-42a7-a294-b871bee8f924",
    "to_node_id": "74e3409c-43d1-402a-9068-5925c0086a9f",
    "kind": "decision",
    "choice_label": "Daily walks, less salt",
    "grade": "BEST"
  },
  {
    "id": "1ea4ca51-9368-4fcf-9044-ed4b1c4a57b4",
    "patient_id": "0d28e7ff-7d42-4d1a-a889-063ef908db4f",
    "from_node_id": "c0a0f31c-9ce4-42a7-a294-b871bee8f924",
    "to_node_id": "cdeddc23-7f50-461f-8110-d6245858d5ba",
    "kind": "decision",
    "choice_label": "Take prescribed medicine",
    "grade": "BEST"
  },
  {
    "id": "4260511d-0a42-4d65-9175-4af7193220b8",
    "patient_id": "0d28e7ff-7d42-4d1a-a889-063ef908db4f",
    "from_node_id": "c0a0f31c-9ce4-42a7-a294-b871bee8f924",
    "to_node_id": "8320c842-1b5e-45f1-8d70-7fa5f8affec5",
    "kind": "decision",
    "choice_label": "Skip meds — feeling fine!",
    "grade": "WRONG"
  },
  {
    "id": "d5972920-940d-4357-8959-4bb77a2c723e",
    "patient_id": "0d28e7ff-7d42-4d1a-a889-063ef908db4f",
    "from_node_id": "c0a0f31c-9ce4-42a7-a294-b871bee8f924",
    "to_node_id": "fac008e1-33db-4d22-a028-a888716e35a3",
    "kind": "decision",
    "choice_label": "Double the dose to fix it faster",
    "grade": "DANGEROUS"
  },
  {
    "id": "2ab889c5-c7dc-4ca0-b4cd-dc1918824bf1",
    "patient_id": "0d28e7ff-7d42-4d1a-a889-063ef908db4f",
    "from_node_id": "74e3409c-43d1-402a-9068-5925c0086a9f",
    "to_node_id": "dafd4221-ed27-453d-b979-094c6b48d3e9",
    "kind": "decision",
    "choice_label": "Daily walks, less salt",
    "grade": "BEST"
  },
  {
    "id": "90936e86-225e-449a-a1ba-c9c587b4f396",
    "patient_id": "0d28e7ff-7d42-4d1a-a889-063ef908db4f",
    "from_node_id": "74e3409c-43d1-402a-9068-5925c0086a9f",
    "to_node_id": "3f7655a1-afd4-42e8-b9a5-c8c3d8b3d258",
    "kind": "decision",
    "choice_label": "Take prescribed medicine",
    "grade": "NOT_GREAT"
  },
  {
    "id": "a4ffc16c-bf7b-4ffa-a5a0-60334e11d103",
    "patient_id": "0d28e7ff-7d42-4d1a-a889-063ef908db4f",
    "from_node_id": "74e3409c-43d1-402a-9068-5925c0086a9f",
    "to_node_id": "7c934bd7-6047-437f-8f92-50399623e8d5",
    "kind": "decision",
    "choice_label": "Skip meds — feeling fine!",
    "grade": "WRONG"
  },
  {
    "id": "d3739e31-f29a-472d-98cd-394fec342fb3",
    "patient_id": "0d28e7ff-7d42-4d1a-a889-063ef908db4f",
    "from_node_id": "74e3409c-43d1-402a-9068-5925c0086a9f",
    "to_node_id": "e2223d50-f49b-4c41-a28e-fcb261759ed4",
    "kind": "decision",
    "choice_label": "Double the dose to fix it faster",
    "grade": "DANGEROUS"
  },
  {
    "id": "30d7833c-b6a7-4447-b92b-0a58725d594d",
    "patient_id": "0d28e7ff-7d42-4d1a-a889-063ef908db4f",
    "from_node_id": "cdeddc23-7f50-461f-8110-d6245858d5ba",
    "to_node_id": "067fe66a-dd3e-4e5d-b1c2-f9b715839970",
    "kind": "decision",
    "choice_label": "Daily walks, less salt",
    "grade": "BEST"
  },
  {
    "id": "cabed3fb-3263-4a27-8d35-ad743f962083",
    "patient_id": "0d28e7ff-7d42-4d1a-a889-063ef908db4f",
    "from_node_id": "cdeddc23-7f50-461f-8110-d6245858d5ba",
    "to_node_id": "a404fffc-7938-4c69-9f4d-d06822ea8c76",
    "kind": "decision",
    "choice_label": "Take prescribed medicine",
    "grade": "NOT_GREAT"
  },
  {
    "id": "04b0d0d9-0cb6-436e-a90d-5169f3cdc454",
    "patient_id": "0d28e7ff-7d42-4d1a-a889-063ef908db4f",
    "from_node_id": "cdeddc23-7f50-461f-8110-d6245858d5ba",
    "to_node_id": "7e5257e0-3f37-4d3d-8537-5d9f88d2e711",
    "kind": "decision",
    "choice_label": "Skip meds — feeling fine!",
    "grade": "WRONG"
  },
  {
    "id": "263ce9c3-72a8-4767-8cc1-984c710acb3e",
    "patient_id": "0d28e7ff-7d42-4d1a-a889-063ef908db4f",
    "from_node_id": "cdeddc23-7f50-461f-8110-d6245858d5ba",
    "to_node_id": "c0bbea36-6e01-44ea-9fff-3d7f275ceeb3",
    "kind": "decision",
    "choice_label": "Double the dose to fix it faster",
    "grade": "DANGEROUS"
  },
  {
    "id": "912f8d91-5a13-46fc-99d8-163d2dbc880d",
    "patient_id": "0d28e7ff-7d42-4d1a-a889-063ef908db4f",
    "from_node_id": "8320c842-1b5e-45f1-8d70-7fa5f8affec5",
    "to_node_id": "c8c3bbef-9cce-4b34-a0b2-8d37f16e74ea",
    "kind": "decision",
    "choice_label": "Daily walks, less salt",
    "grade": "NOT_GREAT"
  },
  {
    "id": "978289c5-4162-499c-b58e-8bec8c75e186",
    "patient_id": "0d28e7ff-7d42-4d1a-a889-063ef908db4f",
    "from_node_id": "8320c842-1b5e-45f1-8d70-7fa5f8affec5",
    "to_node_id": "d992f217-fc9a-4438-8f2c-cf5c055e4b1a",
    "kind": "decision",
    "choice_label": "Take prescribed medicine",
    "grade": "BEST"
  },
  {
    "id": "efcc02b3-c787-41ac-a433-af0003f38e5f",
    "patient_id": "0d28e7ff-7d42-4d1a-a889-063ef908db4f",
    "from_node_id": "8320c842-1b5e-45f1-8d70-7fa5f8affec5",
    "to_node_id": "baf7e5fc-e179-4776-8dcb-a27865835af8",
    "kind": "decision",
    "choice_label": "Skip meds — feeling fine!",
    "grade": "WRONG"
  },
  {
    "id": "9ad88db7-4034-4fd5-870e-f6c7846e2271",
    "patient_id": "0d28e7ff-7d42-4d1a-a889-063ef908db4f",
    "from_node_id": "8320c842-1b5e-45f1-8d70-7fa5f8affec5",
    "to_node_id": "72e2f4b9-d07d-444e-8a1a-db35586a4822",
    "kind": "decision",
    "choice_label": "Double the dose to fix it faster",
    "grade": "DANGEROUS"
  },
  {
    "id": "429b8162-cbc1-4ca1-ba78-befa9798d504",
    "patient_id": "1c89a34a-8ae5-444d-ba9d-3105f6484113",
    "from_node_id": "a499bff2-433b-48c6-b013-279928d97d51",
    "to_node_id": "b485ed54-15a8-43c3-9523-4c881995b22b",
    "kind": "decision",
    "choice_label": "Finish all the throat medicine",
    "grade": "BEST"
  },
  {
    "id": "a8187e58-2ce1-4082-981b-696d7ee0b18f",
    "patient_id": "1c89a34a-8ae5-444d-ba9d-3105f6484113",
    "from_node_id": "a499bff2-433b-48c6-b013-279928d97d51",
    "to_node_id": "56aa12ea-ec52-4312-bb4a-f89f9f39d549",
    "kind": "decision",
    "choice_label": "Rest with warm drinks",
    "grade": "NOT_GREAT"
  },
  {
    "id": "b271074b-8f94-411b-960c-2a3b41ecbc5f",
    "patient_id": "1c89a34a-8ae5-444d-ba9d-3105f6484113",
    "from_node_id": "a499bff2-433b-48c6-b013-279928d97d51",
    "to_node_id": "33e7242c-35ec-4fbe-9af8-d92bdff10b58",
    "kind": "decision",
    "choice_label": "Stop medicine once feeling better",
    "grade": "WRONG"
  },
  {
    "id": "70c968fa-423f-40fb-9c93-7d12f23884d2",
    "patient_id": "1c89a34a-8ae5-444d-ba9d-3105f6484113",
    "from_node_id": "a499bff2-433b-48c6-b013-279928d97d51",
    "to_node_id": "ac8cf751-881f-44e5-b4b7-92aa6dd8dbab",
    "kind": "decision",
    "choice_label": "Gargle burning hot sauce",
    "grade": "DANGEROUS"
  },
  {
    "id": "bf886a74-14d4-4670-8bfd-7176f540b420",
    "patient_id": "1c89a34a-8ae5-444d-ba9d-3105f6484113",
    "from_node_id": "b485ed54-15a8-43c3-9523-4c881995b22b",
    "to_node_id": "0a88baeb-e51b-492c-9eda-c84f8d41c64a",
    "kind": "decision",
    "choice_label": "Finish all the throat medicine",
    "grade": "BEST"
  },
  {
    "id": "8431c91d-f2ad-49c6-971a-92048170c17a",
    "patient_id": "1c89a34a-8ae5-444d-ba9d-3105f6484113",
    "from_node_id": "b485ed54-15a8-43c3-9523-4c881995b22b",
    "to_node_id": "4c394f29-70fb-4a01-b6f0-dd0f336f9eef",
    "kind": "decision",
    "choice_label": "Rest with warm drinks",
    "grade": "NOT_GREAT"
  },
  {
    "id": "eff8edb6-0ae2-412a-92df-ee7c202c507e",
    "patient_id": "1c89a34a-8ae5-444d-ba9d-3105f6484113",
    "from_node_id": "b485ed54-15a8-43c3-9523-4c881995b22b",
    "to_node_id": "ab4f2b6d-5d15-4fb9-8772-62c74e3f5ca9",
    "kind": "decision",
    "choice_label": "Stop medicine once feeling better",
    "grade": "WRONG"
  },
  {
    "id": "cafd0b7e-e13b-437b-8f59-0d0480aad550",
    "patient_id": "1c89a34a-8ae5-444d-ba9d-3105f6484113",
    "from_node_id": "b485ed54-15a8-43c3-9523-4c881995b22b",
    "to_node_id": "2ecfba54-7a25-4e3f-b576-01d93907e147",
    "kind": "decision",
    "choice_label": "Gargle burning hot sauce",
    "grade": "DANGEROUS"
  },
  {
    "id": "55aa52d9-b883-41bd-915a-c334e2fb40ba",
    "patient_id": "1c89a34a-8ae5-444d-ba9d-3105f6484113",
    "from_node_id": "56aa12ea-ec52-4312-bb4a-f89f9f39d549",
    "to_node_id": "04204f25-9a94-4f35-aea4-be744b5489b4",
    "kind": "decision",
    "choice_label": "Finish all the throat medicine",
    "grade": "BEST"
  },
  {
    "id": "beab17f4-07b2-47d7-8379-c3afd196af78",
    "patient_id": "1c89a34a-8ae5-444d-ba9d-3105f6484113",
    "from_node_id": "56aa12ea-ec52-4312-bb4a-f89f9f39d549",
    "to_node_id": "4109b7fa-5c39-4508-9ac9-c533a1c338fd",
    "kind": "decision",
    "choice_label": "Rest with warm drinks",
    "grade": "NOT_GREAT"
  },
  {
    "id": "6dd37527-73e6-4844-82f9-e6df240a0849",
    "patient_id": "1c89a34a-8ae5-444d-ba9d-3105f6484113",
    "from_node_id": "56aa12ea-ec52-4312-bb4a-f89f9f39d549",
    "to_node_id": "9a08487b-761c-4986-91cd-16385202eabd",
    "kind": "decision",
    "choice_label": "Stop medicine once feeling better",
    "grade": "WRONG"
  },
  {
    "id": "c09d42c5-7ad7-4e94-8c42-887dea7d85ac",
    "patient_id": "1c89a34a-8ae5-444d-ba9d-3105f6484113",
    "from_node_id": "56aa12ea-ec52-4312-bb4a-f89f9f39d549",
    "to_node_id": "df7438fa-ddb5-496d-a6d2-5ae9dddd28c5",
    "kind": "decision",
    "choice_label": "Gargle burning hot sauce",
    "grade": "DANGEROUS"
  },
  {
    "id": "3cdc602e-d6d9-449f-84f7-4431eefe1c8b",
    "patient_id": "1c89a34a-8ae5-444d-ba9d-3105f6484113",
    "from_node_id": "33e7242c-35ec-4fbe-9af8-d92bdff10b58",
    "to_node_id": "615f642c-8208-46b6-8c6b-bf11bd301a86",
    "kind": "decision",
    "choice_label": "Finish all the throat medicine",
    "grade": "BEST"
  },
  {
    "id": "29175697-9231-4381-a271-49abcb3e0ba7",
    "patient_id": "1c89a34a-8ae5-444d-ba9d-3105f6484113",
    "from_node_id": "33e7242c-35ec-4fbe-9af8-d92bdff10b58",
    "to_node_id": "f5d76a5f-4138-4454-a2e1-fc5565a99554",
    "kind": "decision",
    "choice_label": "Rest with warm drinks",
    "grade": "NOT_GREAT"
  },
  {
    "id": "ccaa91ef-d300-4875-8c65-a5304e05966b",
    "patient_id": "1c89a34a-8ae5-444d-ba9d-3105f6484113",
    "from_node_id": "33e7242c-35ec-4fbe-9af8-d92bdff10b58",
    "to_node_id": "9458d4d7-467f-4396-9ff1-47013d2feeaf",
    "kind": "decision",
    "choice_label": "Stop medicine once feeling better",
    "grade": "WRONG"
  },
  {
    "id": "954580d2-3c28-43fd-9773-c90a5fe33a8e",
    "patient_id": "1c89a34a-8ae5-444d-ba9d-3105f6484113",
    "from_node_id": "33e7242c-35ec-4fbe-9af8-d92bdff10b58",
    "to_node_id": "433c0b9a-7e28-4ec4-bcde-368085f0e847",
    "kind": "decision",
    "choice_label": "Gargle burning hot sauce",
    "grade": "DANGEROUS"
  },
  {
    "id": "635b0e3f-6bea-4ed7-bb0e-141bb530b26c",
    "patient_id": "189ed712-243f-421f-930c-c4e2a6c0919c",
    "from_node_id": "994c2111-9945-47f4-866a-8b01fce75628",
    "to_node_id": "a3f9b322-93b3-4ca6-94ec-49cb6186f730",
    "kind": "decision",
    "choice_label": "Give the ear medicine as directed",
    "grade": "BEST"
  },
  {
    "id": "f132e6f9-c831-438e-824a-908246d00a91",
    "patient_id": "189ed712-243f-421f-930c-c4e2a6c0919c",
    "from_node_id": "994c2111-9945-47f4-866a-8b01fce75628",
    "to_node_id": "52148058-ddb9-49ea-bad2-5554a0dac313",
    "kind": "decision",
    "choice_label": "Warm cloth + quiet rest",
    "grade": "NOT_GREAT"
  },
  {
    "id": "21c1fa6f-6449-4bbe-8b9a-094d4948905c",
    "patient_id": "189ed712-243f-421f-930c-c4e2a6c0919c",
    "from_node_id": "994c2111-9945-47f4-866a-8b01fce75628",
    "to_node_id": "371b9bc3-6886-4743-adb3-9e54e2a48b76",
    "kind": "decision",
    "choice_label": "Poke inside with a cotton swab",
    "grade": "WRONG"
  },
  {
    "id": "e9f443f8-b221-4a7e-a962-052f0fb0d9cc",
    "patient_id": "189ed712-243f-421f-930c-c4e2a6c0919c",
    "from_node_id": "994c2111-9945-47f4-866a-8b01fce75628",
    "to_node_id": "eb62fb5d-2538-43ae-b647-a44ec0b8fcce",
    "kind": "decision",
    "choice_label": "Shout into the sore ear",
    "grade": "DANGEROUS"
  },
  {
    "id": "ef06e67a-69f8-406e-95af-96a0a45f886a",
    "patient_id": "189ed712-243f-421f-930c-c4e2a6c0919c",
    "from_node_id": "a3f9b322-93b3-4ca6-94ec-49cb6186f730",
    "to_node_id": "f223aadc-3481-428c-8b95-91829dacaaab",
    "kind": "decision",
    "choice_label": "Give the ear medicine as directed",
    "grade": "BEST"
  },
  {
    "id": "9a22377a-0d83-45f0-a1d3-9b85d998f51d",
    "patient_id": "189ed712-243f-421f-930c-c4e2a6c0919c",
    "from_node_id": "a3f9b322-93b3-4ca6-94ec-49cb6186f730",
    "to_node_id": "788bec82-17a5-4079-a9e0-29d16e5664dd",
    "kind": "decision",
    "choice_label": "Warm cloth + quiet rest",
    "grade": "NOT_GREAT"
  },
  {
    "id": "f136c159-4b20-4e94-a995-ad816a23652e",
    "patient_id": "189ed712-243f-421f-930c-c4e2a6c0919c",
    "from_node_id": "a3f9b322-93b3-4ca6-94ec-49cb6186f730",
    "to_node_id": "be56e1af-fc3e-4f10-9840-bfbd9022866b",
    "kind": "decision",
    "choice_label": "Poke inside with a cotton swab",
    "grade": "WRONG"
  },
  {
    "id": "ee568ae4-3923-45e4-8acd-74a1b4021d3d",
    "patient_id": "189ed712-243f-421f-930c-c4e2a6c0919c",
    "from_node_id": "a3f9b322-93b3-4ca6-94ec-49cb6186f730",
    "to_node_id": "9e25628a-75e3-4609-9e4a-3faeef7ff02b",
    "kind": "decision",
    "choice_label": "Shout into the sore ear",
    "grade": "DANGEROUS"
  },
  {
    "id": "ea7547a9-15a3-4243-9d71-2230392773b5",
    "patient_id": "189ed712-243f-421f-930c-c4e2a6c0919c",
    "from_node_id": "52148058-ddb9-49ea-bad2-5554a0dac313",
    "to_node_id": "5103b307-4d70-453a-b111-3fd01a9fa64d",
    "kind": "decision",
    "choice_label": "Give the ear medicine as directed",
    "grade": "BEST"
  },
  {
    "id": "b1069f76-19e3-474e-918f-435ef35d77a9",
    "patient_id": "189ed712-243f-421f-930c-c4e2a6c0919c",
    "from_node_id": "52148058-ddb9-49ea-bad2-5554a0dac313",
    "to_node_id": "7f48768a-88aa-473b-8223-98a7d2546731",
    "kind": "decision",
    "choice_label": "Warm cloth + quiet rest",
    "grade": "NOT_GREAT"
  },
  {
    "id": "2366bc86-e1ed-4462-ab7d-bf151ee7e8af",
    "patient_id": "189ed712-243f-421f-930c-c4e2a6c0919c",
    "from_node_id": "52148058-ddb9-49ea-bad2-5554a0dac313",
    "to_node_id": "de5e08b3-6c61-430e-955c-a423b81ba04c",
    "kind": "decision",
    "choice_label": "Poke inside with a cotton swab",
    "grade": "WRONG"
  },
  {
    "id": "d95631a5-7896-4adf-828d-cf7e4ef790e4",
    "patient_id": "189ed712-243f-421f-930c-c4e2a6c0919c",
    "from_node_id": "52148058-ddb9-49ea-bad2-5554a0dac313",
    "to_node_id": "d1092396-0d39-4045-bafe-061bad58bc79",
    "kind": "decision",
    "choice_label": "Shout into the sore ear",
    "grade": "DANGEROUS"
  },
  {
    "id": "c96f7c54-96fc-4f69-b8bc-9927a3bcca73",
    "patient_id": "189ed712-243f-421f-930c-c4e2a6c0919c",
    "from_node_id": "371b9bc3-6886-4743-adb3-9e54e2a48b76",
    "to_node_id": "a2df70b0-dc1c-4f37-b9d5-358834c309b0",
    "kind": "decision",
    "choice_label": "Give the ear medicine as directed",
    "grade": "BEST"
  },
  {
    "id": "0d16b87a-9b83-4323-bde5-611941813534",
    "patient_id": "189ed712-243f-421f-930c-c4e2a6c0919c",
    "from_node_id": "371b9bc3-6886-4743-adb3-9e54e2a48b76",
    "to_node_id": "24030b60-7389-4f42-be00-5e970f6fbb0b",
    "kind": "decision",
    "choice_label": "Warm cloth + quiet rest",
    "grade": "NOT_GREAT"
  },
  {
    "id": "df7266c7-0068-44cc-be85-d6a7fe4befac",
    "patient_id": "189ed712-243f-421f-930c-c4e2a6c0919c",
    "from_node_id": "371b9bc3-6886-4743-adb3-9e54e2a48b76",
    "to_node_id": "502f44de-ca6f-4fed-8602-c9c8ee80414e",
    "kind": "decision",
    "choice_label": "Poke inside with a cotton swab",
    "grade": "WRONG"
  },
  {
    "id": "7d700571-24b8-4c22-b497-d0a537e0de78",
    "patient_id": "189ed712-243f-421f-930c-c4e2a6c0919c",
    "from_node_id": "371b9bc3-6886-4743-adb3-9e54e2a48b76",
    "to_node_id": "f5a23b75-a38e-4ee0-8ca9-e0c157c860a6",
    "kind": "decision",
    "choice_label": "Shout into the sore ear",
    "grade": "DANGEROUS"
  },
  {
    "id": "e888121e-f3f1-4b57-a98a-5873bd94a770",
    "patient_id": "e8c1a7f5-ccd4-47b0-9cd0-804b1058b686",
    "from_node_id": "aa39343c-2cc3-4d80-bc80-b1773146f557",
    "to_node_id": "3000aadf-838d-4b37-affc-ba74af69b130",
    "kind": "decision",
    "choice_label": "Daily gentle moisturizer",
    "grade": "BEST"
  },
  {
    "id": "ba3788f7-ea4f-4f3a-bec8-02806075a082",
    "patient_id": "e8c1a7f5-ccd4-47b0-9cd0-804b1058b686",
    "from_node_id": "aa39343c-2cc3-4d80-bc80-b1773146f557",
    "to_node_id": "67abd77f-5c10-4a5e-b94f-61148c94af53",
    "kind": "decision",
    "choice_label": "Keep nails short + cool",
    "grade": "NOT_GREAT"
  },
  {
    "id": "01d66523-c097-411d-9027-084988cf8ee7",
    "patient_id": "e8c1a7f5-ccd4-47b0-9cd0-804b1058b686",
    "from_node_id": "aa39343c-2cc3-4d80-bc80-b1773146f557",
    "to_node_id": "3b8ab05d-0a82-46ec-85ab-5573b8100fe5",
    "kind": "decision",
    "choice_label": "Scratch the itchy spots",
    "grade": "WRONG"
  },
  {
    "id": "c0aaefad-552e-44e3-ad46-3a261a55ec80",
    "patient_id": "e8c1a7f5-ccd4-47b0-9cd0-804b1058b686",
    "from_node_id": "aa39343c-2cc3-4d80-bc80-b1773146f557",
    "to_node_id": "73d63a9a-2719-4031-af9b-f2c44763ac0b",
    "kind": "decision",
    "choice_label": "Scrub with a rough brush",
    "grade": "DANGEROUS"
  },
  {
    "id": "0832ee85-78f9-423b-96ab-51ae10e6be37",
    "patient_id": "e8c1a7f5-ccd4-47b0-9cd0-804b1058b686",
    "from_node_id": "3000aadf-838d-4b37-affc-ba74af69b130",
    "to_node_id": "bf269132-e782-4be1-ac68-9b9a869edf4d",
    "kind": "decision",
    "choice_label": "Daily gentle moisturizer",
    "grade": "BEST"
  },
  {
    "id": "64c541a6-c64f-49f4-abc2-b35a61b96f32",
    "patient_id": "e8c1a7f5-ccd4-47b0-9cd0-804b1058b686",
    "from_node_id": "3000aadf-838d-4b37-affc-ba74af69b130",
    "to_node_id": "dbabfa19-f735-4d81-b622-32de7af31966",
    "kind": "decision",
    "choice_label": "Keep nails short + cool",
    "grade": "NOT_GREAT"
  },
  {
    "id": "218b6778-da73-4b4e-8f70-863864810635",
    "patient_id": "e8c1a7f5-ccd4-47b0-9cd0-804b1058b686",
    "from_node_id": "3000aadf-838d-4b37-affc-ba74af69b130",
    "to_node_id": "9f5340fe-5129-46b4-b115-e9e425d747bd",
    "kind": "decision",
    "choice_label": "Scratch the itchy spots",
    "grade": "WRONG"
  },
  {
    "id": "8aef2425-a8a3-4858-b44b-1499fa3ebc2c",
    "patient_id": "e8c1a7f5-ccd4-47b0-9cd0-804b1058b686",
    "from_node_id": "3000aadf-838d-4b37-affc-ba74af69b130",
    "to_node_id": "1a115c62-6c82-4d6c-9085-53aa5d4213a7",
    "kind": "decision",
    "choice_label": "Scrub with a rough brush",
    "grade": "DANGEROUS"
  },
  {
    "id": "0018211b-7928-4891-997c-3ee7fa5bc1f8",
    "patient_id": "e8c1a7f5-ccd4-47b0-9cd0-804b1058b686",
    "from_node_id": "67abd77f-5c10-4a5e-b94f-61148c94af53",
    "to_node_id": "17bafe3d-6a52-4a11-878b-3c9777400b52",
    "kind": "decision",
    "choice_label": "Daily gentle moisturizer",
    "grade": "BEST"
  },
  {
    "id": "a76921c1-2149-450e-bc21-b4e7d7155ed9",
    "patient_id": "e8c1a7f5-ccd4-47b0-9cd0-804b1058b686",
    "from_node_id": "67abd77f-5c10-4a5e-b94f-61148c94af53",
    "to_node_id": "002b9ab0-e612-44b8-a48f-27cf5b453aff",
    "kind": "decision",
    "choice_label": "Keep nails short + cool",
    "grade": "NOT_GREAT"
  },
  {
    "id": "5142b8dc-db9e-43e7-85ff-e90e2f7d75c2",
    "patient_id": "e8c1a7f5-ccd4-47b0-9cd0-804b1058b686",
    "from_node_id": "67abd77f-5c10-4a5e-b94f-61148c94af53",
    "to_node_id": "93b92e9f-b9d3-4153-9aa5-e09556c1865f",
    "kind": "decision",
    "choice_label": "Scratch the itchy spots",
    "grade": "WRONG"
  },
  {
    "id": "6aef538b-d5cb-41af-861a-c02425b3fabc",
    "patient_id": "e8c1a7f5-ccd4-47b0-9cd0-804b1058b686",
    "from_node_id": "67abd77f-5c10-4a5e-b94f-61148c94af53",
    "to_node_id": "d87d1f3f-2c1a-4588-8c2c-3165a80858d7",
    "kind": "decision",
    "choice_label": "Scrub with a rough brush",
    "grade": "DANGEROUS"
  },
  {
    "id": "6e70d28e-d47a-459c-8154-5d1e09bf2490",
    "patient_id": "e8c1a7f5-ccd4-47b0-9cd0-804b1058b686",
    "from_node_id": "3b8ab05d-0a82-46ec-85ab-5573b8100fe5",
    "to_node_id": "dd71e30e-67ce-412b-bf5b-9d3f2b3f1461",
    "kind": "decision",
    "choice_label": "Daily gentle moisturizer",
    "grade": "BEST"
  },
  {
    "id": "0cf3429f-220b-48f5-832b-52001c570fb5",
    "patient_id": "e8c1a7f5-ccd4-47b0-9cd0-804b1058b686",
    "from_node_id": "3b8ab05d-0a82-46ec-85ab-5573b8100fe5",
    "to_node_id": "24640e6b-ad3f-44ec-818e-276dab05aaac",
    "kind": "decision",
    "choice_label": "Keep nails short + cool",
    "grade": "NOT_GREAT"
  },
  {
    "id": "3655debe-1134-47e0-9630-c35c6d3bc159",
    "patient_id": "e8c1a7f5-ccd4-47b0-9cd0-804b1058b686",
    "from_node_id": "3b8ab05d-0a82-46ec-85ab-5573b8100fe5",
    "to_node_id": "bb206606-0b8f-4b7b-809d-baa4caf1fcc5",
    "kind": "decision",
    "choice_label": "Scratch the itchy spots",
    "grade": "WRONG"
  },
  {
    "id": "5d270cd0-b2be-46f4-b91e-ff63801a6da0",
    "patient_id": "e8c1a7f5-ccd4-47b0-9cd0-804b1058b686",
    "from_node_id": "3b8ab05d-0a82-46ec-85ab-5573b8100fe5",
    "to_node_id": "1b513994-a8d3-4571-986c-c968d288bff9",
    "kind": "decision",
    "choice_label": "Scrub with a rough brush",
    "grade": "DANGEROUS"
  },
  {
    "id": "0c303a84-96ac-4ccf-8988-1d39972e1bf1",
    "patient_id": "0803d835-aaa8-47db-84f2-7308feba3541",
    "from_node_id": "7c29b7e4-c297-4169-b0b8-6492f2ba648d",
    "to_node_id": "705ad02b-abac-44d3-ab2b-0399c37ea4ac",
    "kind": "decision",
    "choice_label": "Start the lung medicine fast",
    "grade": "BEST"
  },
  {
    "id": "f04dee07-7b03-4954-8d5c-14c60c547b0c",
    "patient_id": "0803d835-aaa8-47db-84f2-7308feba3541",
    "from_node_id": "7c29b7e4-c297-4169-b0b8-6492f2ba648d",
    "to_node_id": "b4658e30-6d6b-4003-abef-29f2308bfffa",
    "kind": "decision",
    "choice_label": "Rest with warm fluids",
    "grade": "NOT_GREAT"
  },
  {
    "id": "f7090225-9b64-4887-8ce2-36fa2286078e",
    "patient_id": "0803d835-aaa8-47db-84f2-7308feba3541",
    "from_node_id": "7c29b7e4-c297-4169-b0b8-6492f2ba648d",
    "to_node_id": "06b8b04f-8770-449a-9e82-efa80208b32e",
    "kind": "decision",
    "choice_label": "Hide it and wait alone",
    "grade": "WRONG"
  },
  {
    "id": "004b72a2-f590-4218-85cb-bfadf2e240d2",
    "patient_id": "0803d835-aaa8-47db-84f2-7308feba3541",
    "from_node_id": "7c29b7e4-c297-4169-b0b8-6492f2ba648d",
    "to_node_id": "c5d2fc89-043b-4e97-974f-bb7172571bca",
    "kind": "decision",
    "choice_label": "Sprint a race to clear lungs",
    "grade": "DANGEROUS"
  },
  {
    "id": "30aff7bf-6c3c-47e7-ade3-f9d6d8ed2432",
    "patient_id": "0803d835-aaa8-47db-84f2-7308feba3541",
    "from_node_id": "705ad02b-abac-44d3-ab2b-0399c37ea4ac",
    "to_node_id": "bc4cbed6-8027-43df-a7c9-e49010a6b8b7",
    "kind": "decision",
    "choice_label": "Start the lung medicine fast",
    "grade": "BEST"
  },
  {
    "id": "bdb4c742-d2e9-41a6-aa02-5bb6165bb7b4",
    "patient_id": "0803d835-aaa8-47db-84f2-7308feba3541",
    "from_node_id": "705ad02b-abac-44d3-ab2b-0399c37ea4ac",
    "to_node_id": "0db3a3e2-5efa-488c-9b67-fdc246d51234",
    "kind": "decision",
    "choice_label": "Rest with warm fluids",
    "grade": "BEST"
  },
  {
    "id": "f023c4ac-7671-4fb6-ae64-670e7e610912",
    "patient_id": "0803d835-aaa8-47db-84f2-7308feba3541",
    "from_node_id": "705ad02b-abac-44d3-ab2b-0399c37ea4ac",
    "to_node_id": "89060b3d-b3f5-4fff-9906-b237e75bb151",
    "kind": "decision",
    "choice_label": "Hide it and wait alone",
    "grade": "WRONG"
  },
  {
    "id": "420523a9-c12e-469b-95b4-d99b37218d4d",
    "patient_id": "0803d835-aaa8-47db-84f2-7308feba3541",
    "from_node_id": "705ad02b-abac-44d3-ab2b-0399c37ea4ac",
    "to_node_id": "5a4a8f50-6870-4c8d-b750-fa72c0c0e1c4",
    "kind": "decision",
    "choice_label": "Sprint a race to clear lungs",
    "grade": "DANGEROUS"
  },
  {
    "id": "f634c988-b67f-445b-92be-518d992dbe02",
    "patient_id": "0803d835-aaa8-47db-84f2-7308feba3541",
    "from_node_id": "b4658e30-6d6b-4003-abef-29f2308bfffa",
    "to_node_id": "c8a9bad4-a289-46a1-b083-e79d76e5430d",
    "kind": "decision",
    "choice_label": "Start the lung medicine fast",
    "grade": "BEST"
  },
  {
    "id": "751607c2-4ce0-4872-baea-bade54af5333",
    "patient_id": "0803d835-aaa8-47db-84f2-7308feba3541",
    "from_node_id": "b4658e30-6d6b-4003-abef-29f2308bfffa",
    "to_node_id": "7eaf029a-057a-4d5b-8213-08c8d563e322",
    "kind": "decision",
    "choice_label": "Rest with warm fluids",
    "grade": "NOT_GREAT"
  },
  {
    "id": "fd708b6e-15b8-485d-82a0-ad76efb0579b",
    "patient_id": "0803d835-aaa8-47db-84f2-7308feba3541",
    "from_node_id": "b4658e30-6d6b-4003-abef-29f2308bfffa",
    "to_node_id": "aa20ff3b-71c6-4860-9227-bc1e7acc045b",
    "kind": "decision",
    "choice_label": "Hide it and wait alone",
    "grade": "WRONG"
  },
  {
    "id": "de9675b7-34d9-41df-a264-b7c9697a546c",
    "patient_id": "0803d835-aaa8-47db-84f2-7308feba3541",
    "from_node_id": "b4658e30-6d6b-4003-abef-29f2308bfffa",
    "to_node_id": "bfce545f-114e-422d-b485-8e299bc34a47",
    "kind": "decision",
    "choice_label": "Sprint a race to clear lungs",
    "grade": "DANGEROUS"
  },
  {
    "id": "1567585d-5bb5-42e5-b515-ab3d9f3e61ef",
    "patient_id": "0803d835-aaa8-47db-84f2-7308feba3541",
    "from_node_id": "06b8b04f-8770-449a-9e82-efa80208b32e",
    "to_node_id": "67f00b3e-734e-40b2-8fd4-229118200f22",
    "kind": "decision",
    "choice_label": "Start the lung medicine fast",
    "grade": "BEST"
  },
  {
    "id": "37f05260-cd7e-4bed-b28b-9f41d9e393ef",
    "patient_id": "0803d835-aaa8-47db-84f2-7308feba3541",
    "from_node_id": "06b8b04f-8770-449a-9e82-efa80208b32e",
    "to_node_id": "2387ef0d-d334-463f-884b-6f969fe9c64d",
    "kind": "decision",
    "choice_label": "Rest with warm fluids",
    "grade": "NOT_GREAT"
  },
  {
    "id": "c6971692-4ce8-4c6b-a79e-1a218bb26213",
    "patient_id": "0803d835-aaa8-47db-84f2-7308feba3541",
    "from_node_id": "06b8b04f-8770-449a-9e82-efa80208b32e",
    "to_node_id": "31d1ec1d-0d5a-4940-9c19-282e34434f63",
    "kind": "decision",
    "choice_label": "Hide it and wait alone",
    "grade": "WRONG"
  },
  {
    "id": "5fb4c4ea-bba9-45f3-8339-f668ee746525",
    "patient_id": "0803d835-aaa8-47db-84f2-7308feba3541",
    "from_node_id": "06b8b04f-8770-449a-9e82-efa80208b32e",
    "to_node_id": "c44fd32d-2e81-4eb4-bd2c-a268e0a637c6",
    "kind": "decision",
    "choice_label": "Sprint a race to clear lungs",
    "grade": "DANGEROUS"
  },
  {
    "id": "10c815e5-9fac-46b6-a6c5-f797d3951e0c",
    "patient_id": "a7ac7cf2-a6c5-407f-aab8-cd5fb085bcd5",
    "from_node_id": "9a5880fc-3a8a-4699-948e-18545cf443e7",
    "to_node_id": "6c0f2c66-47c8-4b7d-a696-7744b1b4c20a",
    "kind": "decision",
    "choice_label": "Steroid dose from the doctor",
    "grade": "BEST"
  },
  {
    "id": "0769621f-1cc7-43de-99cf-8d9ff26bc6b1",
    "patient_id": "a7ac7cf2-a6c5-407f-aab8-cd5fb085bcd5",
    "from_node_id": "9a5880fc-3a8a-4699-948e-18545cf443e7",
    "to_node_id": "9f35d7c3-51b6-4cde-8d41-6c476fb08416",
    "kind": "decision",
    "choice_label": "Calm rest in cool night air",
    "grade": "NOT_GREAT"
  },
  {
    "id": "12c3f520-7c69-4d92-9ed5-844d9e68c5e3",
    "patient_id": "a7ac7cf2-a6c5-407f-aab8-cd5fb085bcd5",
    "from_node_id": "9a5880fc-3a8a-4699-948e-18545cf443e7",
    "to_node_id": "ac17a7ea-b0e8-4e07-8e0a-e8380899aa37",
    "kind": "decision",
    "choice_label": "Give leftover antibiotics",
    "grade": "WRONG"
  },
  {
    "id": "44ca65f9-f12a-46ca-8d88-3b6f668cf4a0",
    "patient_id": "a7ac7cf2-a6c5-407f-aab8-cd5fb085bcd5",
    "from_node_id": "9a5880fc-3a8a-4699-948e-18545cf443e7",
    "to_node_id": "1be50a33-b942-46ee-91f5-dba129a6c751",
    "kind": "decision",
    "choice_label": "Lean over boiling steam",
    "grade": "DANGEROUS"
  },
  {
    "id": "ff73a7f4-93eb-4017-92e1-70415e4dc4a1",
    "patient_id": "a7ac7cf2-a6c5-407f-aab8-cd5fb085bcd5",
    "from_node_id": "6c0f2c66-47c8-4b7d-a696-7744b1b4c20a",
    "to_node_id": "d2f316fb-6536-40b1-a1bc-4114f22bb668",
    "kind": "decision",
    "choice_label": "Steroid dose from the doctor",
    "grade": "BEST"
  },
  {
    "id": "2c617f45-136d-48a9-ae7f-602d6d2ab60f",
    "patient_id": "a7ac7cf2-a6c5-407f-aab8-cd5fb085bcd5",
    "from_node_id": "6c0f2c66-47c8-4b7d-a696-7744b1b4c20a",
    "to_node_id": "fe5c841b-685d-4589-9582-b174f1ae8e38",
    "kind": "decision",
    "choice_label": "Calm rest in cool night air",
    "grade": "NOT_GREAT"
  },
  {
    "id": "03cec13e-c8e1-4527-9a93-ed8093ba23ed",
    "patient_id": "a7ac7cf2-a6c5-407f-aab8-cd5fb085bcd5",
    "from_node_id": "6c0f2c66-47c8-4b7d-a696-7744b1b4c20a",
    "to_node_id": "e94d21ff-9590-4295-b08d-9f3534ec061b",
    "kind": "decision",
    "choice_label": "Give leftover antibiotics",
    "grade": "WRONG"
  },
  {
    "id": "569efb15-1718-4b5c-88e4-1a22207bb52b",
    "patient_id": "a7ac7cf2-a6c5-407f-aab8-cd5fb085bcd5",
    "from_node_id": "6c0f2c66-47c8-4b7d-a696-7744b1b4c20a",
    "to_node_id": "7c43bac8-3f6b-4f3a-b5e0-ae42b35a1431",
    "kind": "decision",
    "choice_label": "Lean over boiling steam",
    "grade": "DANGEROUS"
  },
  {
    "id": "bf163565-3005-49bb-bd2c-119115e767fb",
    "patient_id": "a7ac7cf2-a6c5-407f-aab8-cd5fb085bcd5",
    "from_node_id": "9f35d7c3-51b6-4cde-8d41-6c476fb08416",
    "to_node_id": "167d9d58-ced4-4e11-90d6-a820527d9ae2",
    "kind": "decision",
    "choice_label": "Steroid dose from the doctor",
    "grade": "BEST"
  },
  {
    "id": "a4ccf284-2b90-4a41-817a-7f6ffe32a705",
    "patient_id": "a7ac7cf2-a6c5-407f-aab8-cd5fb085bcd5",
    "from_node_id": "9f35d7c3-51b6-4cde-8d41-6c476fb08416",
    "to_node_id": "0d265cfb-66b3-4c9f-ab66-9be3e2dacde4",
    "kind": "decision",
    "choice_label": "Calm rest in cool night air",
    "grade": "NOT_GREAT"
  },
  {
    "id": "0f938c63-3891-4c2a-8819-08b52ca1f1e1",
    "patient_id": "a7ac7cf2-a6c5-407f-aab8-cd5fb085bcd5",
    "from_node_id": "9f35d7c3-51b6-4cde-8d41-6c476fb08416",
    "to_node_id": "91bd0a23-54de-46d1-8e6f-13a3d1bc4aff",
    "kind": "decision",
    "choice_label": "Give leftover antibiotics",
    "grade": "WRONG"
  },
  {
    "id": "13ede0b6-cc0e-495b-bbe5-2d01c34739bf",
    "patient_id": "a7ac7cf2-a6c5-407f-aab8-cd5fb085bcd5",
    "from_node_id": "9f35d7c3-51b6-4cde-8d41-6c476fb08416",
    "to_node_id": "d273ccd3-ded2-4de4-9753-d8b09005f59c",
    "kind": "decision",
    "choice_label": "Lean over boiling steam",
    "grade": "DANGEROUS"
  },
  {
    "id": "01623554-e2eb-4755-ba82-cedbf4e0e12c",
    "patient_id": "a7ac7cf2-a6c5-407f-aab8-cd5fb085bcd5",
    "from_node_id": "ac17a7ea-b0e8-4e07-8e0a-e8380899aa37",
    "to_node_id": "b67fe0f1-7727-4e55-8d1c-9345f9051c7d",
    "kind": "decision",
    "choice_label": "Steroid dose from the doctor",
    "grade": "BEST"
  },
  {
    "id": "7db12081-6428-446d-b6d0-aa1f95a6aa29",
    "patient_id": "a7ac7cf2-a6c5-407f-aab8-cd5fb085bcd5",
    "from_node_id": "ac17a7ea-b0e8-4e07-8e0a-e8380899aa37",
    "to_node_id": "2ad1ef9a-3a9c-419e-91c1-7a7545596b7d",
    "kind": "decision",
    "choice_label": "Calm rest in cool night air",
    "grade": "NOT_GREAT"
  },
  {
    "id": "dcd9afe6-5ddd-4542-ac12-5579e2e343b6",
    "patient_id": "a7ac7cf2-a6c5-407f-aab8-cd5fb085bcd5",
    "from_node_id": "ac17a7ea-b0e8-4e07-8e0a-e8380899aa37",
    "to_node_id": "5b44fc5e-5e9a-43bb-96ae-b16c924abb27",
    "kind": "decision",
    "choice_label": "Give leftover antibiotics",
    "grade": "WRONG"
  },
  {
    "id": "fc1ada72-63e3-4ad8-84e4-a05615af7540",
    "patient_id": "a7ac7cf2-a6c5-407f-aab8-cd5fb085bcd5",
    "from_node_id": "ac17a7ea-b0e8-4e07-8e0a-e8380899aa37",
    "to_node_id": "c6678f00-fd2c-46e7-b8fc-90e560b79d61",
    "kind": "decision",
    "choice_label": "Lean over boiling steam",
    "grade": "DANGEROUS"
  },
  {
    "id": "9d24d25f-84a7-48be-9239-dc1cb76c37f5",
    "patient_id": "a01bc9f5-df58-40cc-a594-43d0133557dd",
    "from_node_id": "f2d05a05-9743-4154-b8e5-f7591b3f50b9",
    "to_node_id": "adcf21de-cb47-423d-8846-43b5b0496a98",
    "kind": "decision",
    "choice_label": "Cool sips + gentle pain relief",
    "grade": "BEST"
  },
  {
    "id": "eba4c273-bbfe-4e5c-9b88-f4e30a4730e2",
    "patient_id": "a01bc9f5-df58-40cc-a594-43d0133557dd",
    "from_node_id": "f2d05a05-9743-4154-b8e5-f7591b3f50b9",
    "to_node_id": "4dac56ce-2147-4919-929a-4643721c0b0d",
    "kind": "decision",
    "choice_label": "Quiet bed rest all day",
    "grade": "NOT_GREAT"
  },
  {
    "id": "7e3e93cc-3ba7-4a3b-8fdc-b65ed511987b",
    "patient_id": "a01bc9f5-df58-40cc-a594-43d0133557dd",
    "from_node_id": "f2d05a05-9743-4154-b8e5-f7591b3f50b9",
    "to_node_id": "84e3e066-d1bc-4789-8395-262b2b86d3b9",
    "kind": "decision",
    "choice_label": "Antibiotic syrup",
    "grade": "WRONG"
  },
  {
    "id": "800a7fe4-470c-4686-8680-778a1a5e8a6e",
    "patient_id": "a01bc9f5-df58-40cc-a594-43d0133557dd",
    "from_node_id": "f2d05a05-9743-4154-b8e5-f7591b3f50b9",
    "to_node_id": "c8bf1284-ae7c-4894-8645-1825fffd88ef",
    "kind": "decision",
    "choice_label": "Pop the blisters",
    "grade": "DANGEROUS"
  },
  {
    "id": "e74cb266-a15c-4aa4-910b-a1c27041284a",
    "patient_id": "a01bc9f5-df58-40cc-a594-43d0133557dd",
    "from_node_id": "adcf21de-cb47-423d-8846-43b5b0496a98",
    "to_node_id": "a7420cb2-6189-4bea-9f45-4b498cdb8636",
    "kind": "decision",
    "choice_label": "Cool sips + gentle pain relief",
    "grade": "BEST"
  },
  {
    "id": "c00e922e-517e-460f-af94-f7d85ac9389d",
    "patient_id": "a01bc9f5-df58-40cc-a594-43d0133557dd",
    "from_node_id": "adcf21de-cb47-423d-8846-43b5b0496a98",
    "to_node_id": "4535816b-bc6b-4e73-8378-2092aaa8fe0c",
    "kind": "decision",
    "choice_label": "Quiet bed rest all day",
    "grade": "NOT_GREAT"
  },
  {
    "id": "4c95ab8a-0c89-4406-be87-5e5c74a853fb",
    "patient_id": "a01bc9f5-df58-40cc-a594-43d0133557dd",
    "from_node_id": "adcf21de-cb47-423d-8846-43b5b0496a98",
    "to_node_id": "eb4f393c-3092-4de3-8629-ca106859394d",
    "kind": "decision",
    "choice_label": "Antibiotic syrup",
    "grade": "WRONG"
  },
  {
    "id": "a74749bf-8e45-4901-b5ec-c6ea8b4d7f0f",
    "patient_id": "a01bc9f5-df58-40cc-a594-43d0133557dd",
    "from_node_id": "adcf21de-cb47-423d-8846-43b5b0496a98",
    "to_node_id": "2e42c27d-1319-4cc0-9834-4add9e9fbf92",
    "kind": "decision",
    "choice_label": "Pop the blisters",
    "grade": "DANGEROUS"
  },
  {
    "id": "eb505345-82ea-4a78-b220-c98ab6e1ba51",
    "patient_id": "a01bc9f5-df58-40cc-a594-43d0133557dd",
    "from_node_id": "4dac56ce-2147-4919-929a-4643721c0b0d",
    "to_node_id": "9a9bdbaf-75b0-4c68-8702-dd5470a3ce55",
    "kind": "decision",
    "choice_label": "Cool sips + gentle pain relief",
    "grade": "BEST"
  },
  {
    "id": "4285f020-6203-4255-9c5f-31b7fbade5b7",
    "patient_id": "a01bc9f5-df58-40cc-a594-43d0133557dd",
    "from_node_id": "4dac56ce-2147-4919-929a-4643721c0b0d",
    "to_node_id": "7930f7f9-0e8e-455b-b2b1-4444e39b5c81",
    "kind": "decision",
    "choice_label": "Quiet bed rest all day",
    "grade": "NOT_GREAT"
  },
  {
    "id": "945ee878-35df-49ae-9ed1-31ec660903bd",
    "patient_id": "a01bc9f5-df58-40cc-a594-43d0133557dd",
    "from_node_id": "4dac56ce-2147-4919-929a-4643721c0b0d",
    "to_node_id": "dacd22f2-2617-4e7f-b9b2-e36ff085ca33",
    "kind": "decision",
    "choice_label": "Antibiotic syrup",
    "grade": "WRONG"
  },
  {
    "id": "959bfc49-8cc5-4a86-82ad-3ceae524e82b",
    "patient_id": "a01bc9f5-df58-40cc-a594-43d0133557dd",
    "from_node_id": "4dac56ce-2147-4919-929a-4643721c0b0d",
    "to_node_id": "a0e37aad-512a-4b69-8b99-6a2970562f6e",
    "kind": "decision",
    "choice_label": "Pop the blisters",
    "grade": "DANGEROUS"
  },
  {
    "id": "7097730c-4e27-4a4c-82f3-6b32c09686fa",
    "patient_id": "a01bc9f5-df58-40cc-a594-43d0133557dd",
    "from_node_id": "84e3e066-d1bc-4789-8395-262b2b86d3b9",
    "to_node_id": "f14529f7-2c7b-40d1-a766-23cc3660a2ea",
    "kind": "decision",
    "choice_label": "Cool sips + gentle pain relief",
    "grade": "BEST"
  },
  {
    "id": "35d80719-0ec2-4856-94a6-18dcbcda2ead",
    "patient_id": "a01bc9f5-df58-40cc-a594-43d0133557dd",
    "from_node_id": "84e3e066-d1bc-4789-8395-262b2b86d3b9",
    "to_node_id": "24113db0-facf-4e8a-ae74-6e1a314ffebf",
    "kind": "decision",
    "choice_label": "Quiet bed rest all day",
    "grade": "NOT_GREAT"
  },
  {
    "id": "fb8a1e9e-c6de-4f38-aa49-5f56b206fa6e",
    "patient_id": "a01bc9f5-df58-40cc-a594-43d0133557dd",
    "from_node_id": "84e3e066-d1bc-4789-8395-262b2b86d3b9",
    "to_node_id": "1eca64e9-a88c-4bc8-ba24-62970b3acb1b",
    "kind": "decision",
    "choice_label": "Antibiotic syrup",
    "grade": "WRONG"
  },
  {
    "id": "705c6089-25fc-482e-ae83-635efc48cd3c",
    "patient_id": "a01bc9f5-df58-40cc-a594-43d0133557dd",
    "from_node_id": "84e3e066-d1bc-4789-8395-262b2b86d3b9",
    "to_node_id": "093d4a9d-d261-4465-bf8d-db3e8d9472f9",
    "kind": "decision",
    "choice_label": "Pop the blisters",
    "grade": "DANGEROUS"
  },
  {
    "id": "39047a19-6afe-4977-97e8-373a3421ce8e",
    "patient_id": "bd404ad6-baec-470c-80e3-3be3f93e87b3",
    "from_node_id": "48154f1b-4995-49ad-884b-d7d00d46bb00",
    "to_node_id": "341e826f-7167-489c-8072-f9e341615822",
    "kind": "decision",
    "choice_label": "Finish the full antibiotic course",
    "grade": "BEST"
  },
  {
    "id": "77a5cca7-519a-4c7f-9330-5bbe6997028c",
    "patient_id": "bd404ad6-baec-470c-80e3-3be3f93e87b3",
    "from_node_id": "48154f1b-4995-49ad-884b-d7d00d46bb00",
    "to_node_id": "19c47980-07fb-446a-9565-9364c9bdd492",
    "kind": "decision",
    "choice_label": "Pull the tick + clean the bite",
    "grade": "NOT_GREAT"
  },
  {
    "id": "b41fb9e3-3e6b-4583-8c82-d0f9e595da08",
    "patient_id": "bd404ad6-baec-470c-80e3-3be3f93e87b3",
    "from_node_id": "48154f1b-4995-49ad-884b-d7d00d46bb00",
    "to_node_id": "d05121df-1f8e-47c2-a87c-5e28a6a32e18",
    "kind": "decision",
    "choice_label": "Steroid cream on the rash",
    "grade": "WRONG"
  },
  {
    "id": "8a295b8f-65e0-46ae-91a0-9625be9fb0ca",
    "patient_id": "bd404ad6-baec-470c-80e3-3be3f93e87b3",
    "from_node_id": "48154f1b-4995-49ad-884b-d7d00d46bb00",
    "to_node_id": "35f2b367-028f-4572-9cfc-0ab6b3408c56",
    "kind": "decision",
    "choice_label": "Burn the tick off with a match",
    "grade": "DANGEROUS"
  },
  {
    "id": "37e54513-3fec-4ce2-8d04-c2b9e09c9cca",
    "patient_id": "bd404ad6-baec-470c-80e3-3be3f93e87b3",
    "from_node_id": "341e826f-7167-489c-8072-f9e341615822",
    "to_node_id": "e3634041-6384-44bd-9ea1-38259b8edfb4",
    "kind": "decision",
    "choice_label": "Finish the full antibiotic course",
    "grade": "BEST"
  },
  {
    "id": "72efabb9-e06e-4040-b8d4-31f2aebecbad",
    "patient_id": "bd404ad6-baec-470c-80e3-3be3f93e87b3",
    "from_node_id": "341e826f-7167-489c-8072-f9e341615822",
    "to_node_id": "d9b5ddfb-633e-4ca1-b1e1-d9063ed376b8",
    "kind": "decision",
    "choice_label": "Pull the tick + clean the bite",
    "grade": "NOT_GREAT"
  },
  {
    "id": "476cdea5-54f1-40d5-8dd2-577d8adb0e8a",
    "patient_id": "bd404ad6-baec-470c-80e3-3be3f93e87b3",
    "from_node_id": "341e826f-7167-489c-8072-f9e341615822",
    "to_node_id": "2b70bdfc-13ae-496f-b869-b27fd5262383",
    "kind": "decision",
    "choice_label": "Steroid cream on the rash",
    "grade": "WRONG"
  },
  {
    "id": "7faf38a9-9492-4f24-bc10-7139729584ff",
    "patient_id": "bd404ad6-baec-470c-80e3-3be3f93e87b3",
    "from_node_id": "341e826f-7167-489c-8072-f9e341615822",
    "to_node_id": "8cc04c2f-8f7a-4e9b-a9c5-e7c45f21dff0",
    "kind": "decision",
    "choice_label": "Burn the tick off with a match",
    "grade": "DANGEROUS"
  },
  {
    "id": "e824b894-4921-49ca-b264-db4cb7171ae2",
    "patient_id": "bd404ad6-baec-470c-80e3-3be3f93e87b3",
    "from_node_id": "19c47980-07fb-446a-9565-9364c9bdd492",
    "to_node_id": "fcc92e6b-3f48-4600-9a5c-5b03c96b698d",
    "kind": "decision",
    "choice_label": "Finish the full antibiotic course",
    "grade": "BEST"
  },
  {
    "id": "db6bb320-7adb-4e78-95dd-38cf81d9c233",
    "patient_id": "bd404ad6-baec-470c-80e3-3be3f93e87b3",
    "from_node_id": "19c47980-07fb-446a-9565-9364c9bdd492",
    "to_node_id": "4603c798-2f46-454b-9aa5-aac00666c20c",
    "kind": "decision",
    "choice_label": "Pull the tick + clean the bite",
    "grade": "NOT_GREAT"
  },
  {
    "id": "36da6e67-b1dd-47f4-a615-ecb4d93a3b9b",
    "patient_id": "bd404ad6-baec-470c-80e3-3be3f93e87b3",
    "from_node_id": "19c47980-07fb-446a-9565-9364c9bdd492",
    "to_node_id": "5e07e168-5cf8-4fbe-99ff-20ed97d6ce66",
    "kind": "decision",
    "choice_label": "Steroid cream on the rash",
    "grade": "WRONG"
  },
  {
    "id": "5fc104af-2eb0-4c72-87a1-9d9665a94d9d",
    "patient_id": "bd404ad6-baec-470c-80e3-3be3f93e87b3",
    "from_node_id": "19c47980-07fb-446a-9565-9364c9bdd492",
    "to_node_id": "224515b5-e031-4e0b-90a7-8805722f9d62",
    "kind": "decision",
    "choice_label": "Burn the tick off with a match",
    "grade": "DANGEROUS"
  },
  {
    "id": "1bbff5a1-a661-4ee9-81af-8b8bfe4d0d3c",
    "patient_id": "bd404ad6-baec-470c-80e3-3be3f93e87b3",
    "from_node_id": "d05121df-1f8e-47c2-a87c-5e28a6a32e18",
    "to_node_id": "561b371a-e672-476c-8c36-26f6f1ad23ed",
    "kind": "decision",
    "choice_label": "Finish the full antibiotic course",
    "grade": "BEST"
  },
  {
    "id": "4e883d05-5a9d-40ed-b7e4-4a61529246a2",
    "patient_id": "bd404ad6-baec-470c-80e3-3be3f93e87b3",
    "from_node_id": "d05121df-1f8e-47c2-a87c-5e28a6a32e18",
    "to_node_id": "1ddba45e-b47d-42a0-8fbf-cedab2243e4e",
    "kind": "decision",
    "choice_label": "Pull the tick + clean the bite",
    "grade": "NOT_GREAT"
  },
  {
    "id": "1a7df847-a7d3-4863-874a-15a3d54b9372",
    "patient_id": "bd404ad6-baec-470c-80e3-3be3f93e87b3",
    "from_node_id": "d05121df-1f8e-47c2-a87c-5e28a6a32e18",
    "to_node_id": "7ad0202f-0747-484f-b7c5-f6c9c5ffa2a9",
    "kind": "decision",
    "choice_label": "Steroid cream on the rash",
    "grade": "WRONG"
  },
  {
    "id": "072ffd87-89f9-4db8-9b28-1fea08511b0e",
    "patient_id": "bd404ad6-baec-470c-80e3-3be3f93e87b3",
    "from_node_id": "d05121df-1f8e-47c2-a87c-5e28a6a32e18",
    "to_node_id": "4fee788b-17df-44a3-9ac9-09139f676d00",
    "kind": "decision",
    "choice_label": "Burn the tick off with a match",
    "grade": "DANGEROUS"
  },
  {
    "id": "f6ae8e78-3e8d-4694-b333-d59795e5bf1d",
    "patient_id": "1f12ac0e-fee6-463c-84e7-c09d7ab4b8ed",
    "from_node_id": "02c1c484-2a86-4900-bdf2-2d01d034a65e",
    "to_node_id": "827f6ddb-8415-4f8c-84ec-b9fcfe084c35",
    "kind": "decision",
    "choice_label": "Hospital surgeon visit, now",
    "grade": "BEST"
  },
  {
    "id": "93b8e947-2503-48db-bf06-944fa256e84a",
    "patient_id": "1f12ac0e-fee6-463c-84e7-c09d7ab4b8ed",
    "from_node_id": "02c1c484-2a86-4900-bdf2-2d01d034a65e",
    "to_node_id": "7c09db31-c2ff-4ca3-a416-0137d9a9ea73",
    "kind": "decision",
    "choice_label": "Lie still, nothing to eat",
    "grade": "NOT_GREAT"
  },
  {
    "id": "4cbf03a3-2b6d-44ba-8363-f3620d28a547",
    "patient_id": "1f12ac0e-fee6-463c-84e7-c09d7ab4b8ed",
    "from_node_id": "02c1c484-2a86-4900-bdf2-2d01d034a65e",
    "to_node_id": "0af98a88-e68c-4cae-a663-2e09b3c38bfa",
    "kind": "decision",
    "choice_label": "Painkillers and wait a week",
    "grade": "WRONG"
  },
  {
    "id": "801223a2-36bb-4d93-b797-11fc3bf1e74d",
    "patient_id": "1f12ac0e-fee6-463c-84e7-c09d7ab4b8ed",
    "from_node_id": "02c1c484-2a86-4900-bdf2-2d01d034a65e",
    "to_node_id": "479a8b59-3c35-47b2-89f7-7f99d17f1eca",
    "kind": "decision",
    "choice_label": "Laxative to flush it out",
    "grade": "DANGEROUS"
  },
  {
    "id": "e487ee55-5bec-4edf-9f68-9425cc6b2ec1",
    "patient_id": "1f12ac0e-fee6-463c-84e7-c09d7ab4b8ed",
    "from_node_id": "827f6ddb-8415-4f8c-84ec-b9fcfe084c35",
    "to_node_id": "5630ff91-df52-4b0c-9eb1-a123463e52b7",
    "kind": "decision",
    "choice_label": "Hospital surgeon visit, now",
    "grade": "BEST"
  },
  {
    "id": "a819d87c-84fc-4f1f-907e-c18031202ab5",
    "patient_id": "1f12ac0e-fee6-463c-84e7-c09d7ab4b8ed",
    "from_node_id": "827f6ddb-8415-4f8c-84ec-b9fcfe084c35",
    "to_node_id": "7ca1c767-a047-4c3b-9c10-0fd7547572d4",
    "kind": "decision",
    "choice_label": "Lie still, nothing to eat",
    "grade": "NOT_GREAT"
  },
  {
    "id": "3486e7d8-ebbb-4466-8695-9ceda8fd604e",
    "patient_id": "1f12ac0e-fee6-463c-84e7-c09d7ab4b8ed",
    "from_node_id": "827f6ddb-8415-4f8c-84ec-b9fcfe084c35",
    "to_node_id": "3bd32b50-e172-49fc-ae31-15525507f3a5",
    "kind": "decision",
    "choice_label": "Painkillers and wait a week",
    "grade": "WRONG"
  },
  {
    "id": "6a9c9392-3765-4802-b4d3-61d82b4bf14c",
    "patient_id": "1f12ac0e-fee6-463c-84e7-c09d7ab4b8ed",
    "from_node_id": "827f6ddb-8415-4f8c-84ec-b9fcfe084c35",
    "to_node_id": "5cf3568e-ba4a-4896-8ab3-0a1c2881871f",
    "kind": "decision",
    "choice_label": "Laxative to flush it out",
    "grade": "DANGEROUS"
  },
  {
    "id": "f71e1cd4-e726-418f-b628-444f203af617",
    "patient_id": "1f12ac0e-fee6-463c-84e7-c09d7ab4b8ed",
    "from_node_id": "7c09db31-c2ff-4ca3-a416-0137d9a9ea73",
    "to_node_id": "64b4d657-39c8-4076-ac17-8632f0c3cdbe",
    "kind": "decision",
    "choice_label": "Hospital surgeon visit, now",
    "grade": "BEST"
  },
  {
    "id": "8f09946d-f571-4726-bf03-4e78395e92bb",
    "patient_id": "1f12ac0e-fee6-463c-84e7-c09d7ab4b8ed",
    "from_node_id": "7c09db31-c2ff-4ca3-a416-0137d9a9ea73",
    "to_node_id": "1951d6d9-23f4-4b94-aee5-7cfbdb983b67",
    "kind": "decision",
    "choice_label": "Lie still, nothing to eat",
    "grade": "NOT_GREAT"
  },
  {
    "id": "a3d92624-7bd1-4f47-bf13-f6238984c605",
    "patient_id": "1f12ac0e-fee6-463c-84e7-c09d7ab4b8ed",
    "from_node_id": "7c09db31-c2ff-4ca3-a416-0137d9a9ea73",
    "to_node_id": "ad905f0f-f0ba-403d-bb8d-8040baa113b4",
    "kind": "decision",
    "choice_label": "Painkillers and wait a week",
    "grade": "WRONG"
  },
  {
    "id": "140fee61-ac80-40e7-b8fb-ab5027818763",
    "patient_id": "1f12ac0e-fee6-463c-84e7-c09d7ab4b8ed",
    "from_node_id": "7c09db31-c2ff-4ca3-a416-0137d9a9ea73",
    "to_node_id": "edf6444c-b7ab-489a-a77a-2d054e7e8f41",
    "kind": "decision",
    "choice_label": "Laxative to flush it out",
    "grade": "DANGEROUS"
  },
  {
    "id": "17f54650-1ac5-47e5-ad61-d5dfabf3a0aa",
    "patient_id": "1f12ac0e-fee6-463c-84e7-c09d7ab4b8ed",
    "from_node_id": "0af98a88-e68c-4cae-a663-2e09b3c38bfa",
    "to_node_id": "e70d4cf6-240b-410a-ac63-accdb2aff8fa",
    "kind": "decision",
    "choice_label": "Hospital surgeon visit, now",
    "grade": "BEST"
  },
  {
    "id": "20424d8f-7450-478b-9420-64d90e7c8324",
    "patient_id": "1f12ac0e-fee6-463c-84e7-c09d7ab4b8ed",
    "from_node_id": "0af98a88-e68c-4cae-a663-2e09b3c38bfa",
    "to_node_id": "a4fe29a9-e138-479e-838a-4ac8f5bc2495",
    "kind": "decision",
    "choice_label": "Lie still, nothing to eat",
    "grade": "NOT_GREAT"
  },
  {
    "id": "881907ab-c223-43e8-85e4-8ccb173c29d6",
    "patient_id": "1f12ac0e-fee6-463c-84e7-c09d7ab4b8ed",
    "from_node_id": "0af98a88-e68c-4cae-a663-2e09b3c38bfa",
    "to_node_id": "8cd995cd-2ec3-499a-9a54-8af4cc2933b0",
    "kind": "decision",
    "choice_label": "Painkillers and wait a week",
    "grade": "WRONG"
  },
  {
    "id": "615fbcda-5129-4f84-8ae1-2e8be3507a5a",
    "patient_id": "1f12ac0e-fee6-463c-84e7-c09d7ab4b8ed",
    "from_node_id": "0af98a88-e68c-4cae-a663-2e09b3c38bfa",
    "to_node_id": "0eb384af-07c1-46a9-9e8e-ac2cae803bb7",
    "kind": "decision",
    "choice_label": "Laxative to flush it out",
    "grade": "DANGEROUS"
  },
  {
    "id": "a8636cea-2e83-4df3-a0dd-51208d32b55b",
    "patient_id": "e96de9c5-d4ae-4fd2-986a-7db94d0600dd",
    "from_node_id": "0da71c2d-f01b-48df-bc0a-c317e3ff1835",
    "to_node_id": "790556ec-eae8-4661-bfa8-4fbea44c2742",
    "kind": "decision",
    "choice_label": "Antibiotic ear drops",
    "grade": "BEST"
  },
  {
    "id": "39e2ebb0-a525-492b-a1e2-95af2e80a8ad",
    "patient_id": "e96de9c5-d4ae-4fd2-986a-7db94d0600dd",
    "from_node_id": "0da71c2d-f01b-48df-bc0a-c317e3ff1835",
    "to_node_id": "c50ee0cb-ca43-4ba6-9f2e-59aff9fc3972",
    "kind": "decision",
    "choice_label": "Keep the ear dry and rest",
    "grade": "NOT_GREAT"
  },
  {
    "id": "6ee23783-ae20-43d2-b209-ea264ba60b83",
    "patient_id": "e96de9c5-d4ae-4fd2-986a-7db94d0600dd",
    "from_node_id": "0da71c2d-f01b-48df-bc0a-c317e3ff1835",
    "to_node_id": "632ed2de-c7a8-4e3b-8ef4-1c3d2864f053",
    "kind": "decision",
    "choice_label": "Swim it out at the pool",
    "grade": "WRONG"
  },
  {
    "id": "ac59c4a5-9655-4088-b244-c6e7e545dc56",
    "patient_id": "e96de9c5-d4ae-4fd2-986a-7db94d0600dd",
    "from_node_id": "0da71c2d-f01b-48df-bc0a-c317e3ff1835",
    "to_node_id": "897927db-6a54-4023-8a8f-b118670e76c0",
    "kind": "decision",
    "choice_label": "Dig it out with a hairpin",
    "grade": "DANGEROUS"
  },
  {
    "id": "9f297386-7e2e-468e-a3fd-6aaf8a1a785b",
    "patient_id": "e96de9c5-d4ae-4fd2-986a-7db94d0600dd",
    "from_node_id": "790556ec-eae8-4661-bfa8-4fbea44c2742",
    "to_node_id": "4afbf04f-9e24-4116-8afa-a09be0bbfe09",
    "kind": "decision",
    "choice_label": "Antibiotic ear drops",
    "grade": "BEST"
  },
  {
    "id": "13d81d2f-8fbb-445b-8ae7-58a915edad7f",
    "patient_id": "e96de9c5-d4ae-4fd2-986a-7db94d0600dd",
    "from_node_id": "790556ec-eae8-4661-bfa8-4fbea44c2742",
    "to_node_id": "bbed339c-d5af-4f3d-b0ad-608231bbeec2",
    "kind": "decision",
    "choice_label": "Keep the ear dry and rest",
    "grade": "NOT_GREAT"
  },
  {
    "id": "c943f6e2-c39f-45b7-85c0-c867d566f746",
    "patient_id": "e96de9c5-d4ae-4fd2-986a-7db94d0600dd",
    "from_node_id": "790556ec-eae8-4661-bfa8-4fbea44c2742",
    "to_node_id": "650e2aa1-754c-44fb-8b0c-98c7876ab18e",
    "kind": "decision",
    "choice_label": "Swim it out at the pool",
    "grade": "WRONG"
  },
  {
    "id": "d5a68008-1620-4c06-87c9-7d024b83e4a0",
    "patient_id": "e96de9c5-d4ae-4fd2-986a-7db94d0600dd",
    "from_node_id": "790556ec-eae8-4661-bfa8-4fbea44c2742",
    "to_node_id": "6af8fc5c-9eba-48e4-b84c-f81be7326eeb",
    "kind": "decision",
    "choice_label": "Dig it out with a hairpin",
    "grade": "DANGEROUS"
  },
  {
    "id": "881bb268-8dd2-4249-972f-0281db6a7ad6",
    "patient_id": "e96de9c5-d4ae-4fd2-986a-7db94d0600dd",
    "from_node_id": "c50ee0cb-ca43-4ba6-9f2e-59aff9fc3972",
    "to_node_id": "01ba7207-94e3-45a1-b97f-182c50d8884c",
    "kind": "decision",
    "choice_label": "Antibiotic ear drops",
    "grade": "BEST"
  },
  {
    "id": "60e8138d-0923-4e91-99e6-e9d1cc6b9e9c",
    "patient_id": "e96de9c5-d4ae-4fd2-986a-7db94d0600dd",
    "from_node_id": "c50ee0cb-ca43-4ba6-9f2e-59aff9fc3972",
    "to_node_id": "b8f79ec8-2736-4df3-92c3-c83a133c5183",
    "kind": "decision",
    "choice_label": "Keep the ear dry and rest",
    "grade": "NOT_GREAT"
  },
  {
    "id": "87fdae5c-6e28-4e35-a242-19d1942c5970",
    "patient_id": "e96de9c5-d4ae-4fd2-986a-7db94d0600dd",
    "from_node_id": "c50ee0cb-ca43-4ba6-9f2e-59aff9fc3972",
    "to_node_id": "26449a07-6396-4664-97bd-8d97d7d6a9ca",
    "kind": "decision",
    "choice_label": "Swim it out at the pool",
    "grade": "WRONG"
  },
  {
    "id": "5c2d29dc-8e68-4b7d-b682-1ba3bf308540",
    "patient_id": "e96de9c5-d4ae-4fd2-986a-7db94d0600dd",
    "from_node_id": "c50ee0cb-ca43-4ba6-9f2e-59aff9fc3972",
    "to_node_id": "c0c6d949-1cde-4e57-99b8-4eb51d331b86",
    "kind": "decision",
    "choice_label": "Dig it out with a hairpin",
    "grade": "DANGEROUS"
  },
  {
    "id": "a548f95b-61b8-4dc7-825f-4917f9966873",
    "patient_id": "e96de9c5-d4ae-4fd2-986a-7db94d0600dd",
    "from_node_id": "632ed2de-c7a8-4e3b-8ef4-1c3d2864f053",
    "to_node_id": "d305a78b-74d9-483d-ad90-3b0962527f7b",
    "kind": "decision",
    "choice_label": "Antibiotic ear drops",
    "grade": "BEST"
  },
  {
    "id": "7a01ecab-6c6d-4212-abeb-56a8d6361843",
    "patient_id": "e96de9c5-d4ae-4fd2-986a-7db94d0600dd",
    "from_node_id": "632ed2de-c7a8-4e3b-8ef4-1c3d2864f053",
    "to_node_id": "861be889-4c6e-4e4b-a44e-1f2d64738c42",
    "kind": "decision",
    "choice_label": "Keep the ear dry and rest",
    "grade": "NOT_GREAT"
  },
  {
    "id": "9e1e8367-47d6-4132-8863-ff72bc47d43f",
    "patient_id": "e96de9c5-d4ae-4fd2-986a-7db94d0600dd",
    "from_node_id": "632ed2de-c7a8-4e3b-8ef4-1c3d2864f053",
    "to_node_id": "df265f1a-bdf2-42e6-9b64-735541b11068",
    "kind": "decision",
    "choice_label": "Swim it out at the pool",
    "grade": "WRONG"
  },
  {
    "id": "65f814a3-b7bd-439a-b488-adb4112af30e",
    "patient_id": "e96de9c5-d4ae-4fd2-986a-7db94d0600dd",
    "from_node_id": "632ed2de-c7a8-4e3b-8ef4-1c3d2864f053",
    "to_node_id": "71f7714b-cffa-4305-ab54-9325e30f1876",
    "kind": "decision",
    "choice_label": "Dig it out with a hairpin",
    "grade": "DANGEROUS"
  },
  {
    "id": "f2c2194d-ffb7-4b59-90c9-85070b8cc9ed",
    "patient_id": "339033ce-6799-40a0-916c-4c3d0d4cf362",
    "from_node_id": "bb49a0a2-dae4-409c-8998-575caf8e4dda",
    "to_node_id": "0d499d6b-394a-4c00-a36d-bdcdac6afb8f",
    "kind": "decision",
    "choice_label": "Total rest + fluids for weeks",
    "grade": "BEST"
  },
  {
    "id": "520e47dc-2a31-4454-8677-9fb5e34c27cf",
    "patient_id": "339033ce-6799-40a0-916c-4c3d0d4cf362",
    "from_node_id": "bb49a0a2-dae4-409c-8998-575caf8e4dda",
    "to_node_id": "dd29c5da-b87c-4df3-9b4b-eb3bd4d3fe34",
    "kind": "decision",
    "choice_label": "Soothe the throat gently",
    "grade": "NOT_GREAT"
  },
  {
    "id": "c0d0bfe1-54bb-47e2-a4bd-e90bb75c27c1",
    "patient_id": "339033ce-6799-40a0-916c-4c3d0d4cf362",
    "from_node_id": "bb49a0a2-dae4-409c-8998-575caf8e4dda",
    "to_node_id": "ad66e208-cb18-4cf9-b880-b864812e5bad",
    "kind": "decision",
    "choice_label": "Leftover amoxicillin",
    "grade": "WRONG"
  },
  {
    "id": "0b4f6308-bbd4-471f-b8dd-42583b95a9ba",
    "patient_id": "339033ce-6799-40a0-916c-4c3d0d4cf362",
    "from_node_id": "bb49a0a2-dae4-409c-8998-575caf8e4dda",
    "to_node_id": "229a957a-3992-454b-af6c-a64d59f4c791",
    "kind": "decision",
    "choice_label": "Tackle football this weekend",
    "grade": "DANGEROUS"
  },
  {
    "id": "311480b3-44cc-4977-8059-403e1a61cfdc",
    "patient_id": "339033ce-6799-40a0-916c-4c3d0d4cf362",
    "from_node_id": "0d499d6b-394a-4c00-a36d-bdcdac6afb8f",
    "to_node_id": "69cbf070-95ec-4fac-8645-7260c3d5d56f",
    "kind": "decision",
    "choice_label": "Total rest + fluids for weeks",
    "grade": "BEST"
  },
  {
    "id": "cdb1ef8e-c0bf-420d-bc72-ffa7d10cb872",
    "patient_id": "339033ce-6799-40a0-916c-4c3d0d4cf362",
    "from_node_id": "0d499d6b-394a-4c00-a36d-bdcdac6afb8f",
    "to_node_id": "cd233608-74b2-479f-a589-8f5500f29e33",
    "kind": "decision",
    "choice_label": "Soothe the throat gently",
    "grade": "NOT_GREAT"
  },
  {
    "id": "f35f4810-beb4-4324-aa81-b186cc5266c9",
    "patient_id": "339033ce-6799-40a0-916c-4c3d0d4cf362",
    "from_node_id": "0d499d6b-394a-4c00-a36d-bdcdac6afb8f",
    "to_node_id": "e2c2e0bb-36f8-4613-ae16-07cc26408c86",
    "kind": "decision",
    "choice_label": "Leftover amoxicillin",
    "grade": "WRONG"
  },
  {
    "id": "b2379a96-baaf-4ef0-8cec-1cb75005d190",
    "patient_id": "339033ce-6799-40a0-916c-4c3d0d4cf362",
    "from_node_id": "0d499d6b-394a-4c00-a36d-bdcdac6afb8f",
    "to_node_id": "d5475127-4456-4976-b739-8fde3e831d9b",
    "kind": "decision",
    "choice_label": "Tackle football this weekend",
    "grade": "DANGEROUS"
  },
  {
    "id": "3e8b212d-7bf3-4233-852e-007f51fbbccc",
    "patient_id": "339033ce-6799-40a0-916c-4c3d0d4cf362",
    "from_node_id": "dd29c5da-b87c-4df3-9b4b-eb3bd4d3fe34",
    "to_node_id": "7c7e3119-7213-42f8-95e9-60353004d179",
    "kind": "decision",
    "choice_label": "Total rest + fluids for weeks",
    "grade": "BEST"
  },
  {
    "id": "da5d9595-506d-4b6a-a0b8-606f86a9a9f1",
    "patient_id": "339033ce-6799-40a0-916c-4c3d0d4cf362",
    "from_node_id": "dd29c5da-b87c-4df3-9b4b-eb3bd4d3fe34",
    "to_node_id": "87a67c84-e2c5-4689-b49a-2cc129b7e9f5",
    "kind": "decision",
    "choice_label": "Soothe the throat gently",
    "grade": "NOT_GREAT"
  },
  {
    "id": "e48a5aa1-9635-434c-8ae3-28c6195afb9b",
    "patient_id": "339033ce-6799-40a0-916c-4c3d0d4cf362",
    "from_node_id": "dd29c5da-b87c-4df3-9b4b-eb3bd4d3fe34",
    "to_node_id": "aca6bc02-4ac1-4422-9c58-ccb4dcb8aa74",
    "kind": "decision",
    "choice_label": "Leftover amoxicillin",
    "grade": "WRONG"
  },
  {
    "id": "20df0a17-c18a-49d1-aae4-3ee684836f9f",
    "patient_id": "339033ce-6799-40a0-916c-4c3d0d4cf362",
    "from_node_id": "dd29c5da-b87c-4df3-9b4b-eb3bd4d3fe34",
    "to_node_id": "b88227ef-324d-4b00-a901-5c1e5a5a8f4c",
    "kind": "decision",
    "choice_label": "Tackle football this weekend",
    "grade": "DANGEROUS"
  },
  {
    "id": "f024663a-10cf-4303-8b7f-90b1a501d0f3",
    "patient_id": "339033ce-6799-40a0-916c-4c3d0d4cf362",
    "from_node_id": "ad66e208-cb18-4cf9-b880-b864812e5bad",
    "to_node_id": "e4475c23-6512-4ca9-8cc9-5c0d8e2019ab",
    "kind": "decision",
    "choice_label": "Total rest + fluids for weeks",
    "grade": "BEST"
  },
  {
    "id": "ad76486a-3047-41f7-9e6f-1f65ae31574e",
    "patient_id": "339033ce-6799-40a0-916c-4c3d0d4cf362",
    "from_node_id": "ad66e208-cb18-4cf9-b880-b864812e5bad",
    "to_node_id": "e0e45151-e55c-4b61-a602-593d629500ea",
    "kind": "decision",
    "choice_label": "Soothe the throat gently",
    "grade": "NOT_GREAT"
  },
  {
    "id": "fb99a5a7-3bb0-49fd-af5d-f83b1ab7eafb",
    "patient_id": "339033ce-6799-40a0-916c-4c3d0d4cf362",
    "from_node_id": "ad66e208-cb18-4cf9-b880-b864812e5bad",
    "to_node_id": "b9673ec0-3279-4149-9949-2d7c266abfc2",
    "kind": "decision",
    "choice_label": "Leftover amoxicillin",
    "grade": "WRONG"
  },
  {
    "id": "b0b56417-d6b9-4060-9cec-2df2010b3d39",
    "patient_id": "339033ce-6799-40a0-916c-4c3d0d4cf362",
    "from_node_id": "ad66e208-cb18-4cf9-b880-b864812e5bad",
    "to_node_id": "d51e7222-b9d5-4fda-b41f-ebaa1ac5c695",
    "kind": "decision",
    "choice_label": "Tackle football this weekend",
    "grade": "DANGEROUS"
  },
  {
    "id": "8df47c8c-27ec-4d59-a0eb-b1d8d583b730",
    "patient_id": "9350f95f-b258-4caf-8b32-d58b6fb46d36",
    "from_node_id": "a127e050-f273-4d15-b534-2c08426015e5",
    "to_node_id": "06d2ec1e-af18-4432-9d5e-60678a660ee3",
    "kind": "decision",
    "choice_label": "Doctor visit to lift it out",
    "grade": "BEST"
  },
  {
    "id": "a68e6e27-69b0-4164-b0a2-08191e667d08",
    "patient_id": "9350f95f-b258-4caf-8b32-d58b6fb46d36",
    "from_node_id": "a127e050-f273-4d15-b534-2c08426015e5",
    "to_node_id": "fb185a24-1507-4e6f-9004-51cf2162b2d4",
    "kind": "decision",
    "choice_label": "One gentle blow, then stop",
    "grade": "NOT_GREAT"
  },
  {
    "id": "3836072d-185d-41d1-ade0-739d7f178e24",
    "patient_id": "9350f95f-b258-4caf-8b32-d58b6fb46d36",
    "from_node_id": "a127e050-f273-4d15-b534-2c08426015e5",
    "to_node_id": "c15da4c0-bf2f-4b59-9b92-3cbe63303541",
    "kind": "decision",
    "choice_label": "Fish it out with tweezers",
    "grade": "WRONG"
  },
  {
    "id": "50b11dc8-2a65-419b-80b5-077b0ca2440d",
    "patient_id": "9350f95f-b258-4caf-8b32-d58b6fb46d36",
    "from_node_id": "a127e050-f273-4d15-b534-2c08426015e5",
    "to_node_id": "5a3e8378-9028-41df-8693-1662e33792d3",
    "kind": "decision",
    "choice_label": "Sniff hard to suck it up",
    "grade": "DANGEROUS"
  },
  {
    "id": "9fb7e256-93e2-4641-88c4-6a20e4d0d25d",
    "patient_id": "9350f95f-b258-4caf-8b32-d58b6fb46d36",
    "from_node_id": "06d2ec1e-af18-4432-9d5e-60678a660ee3",
    "to_node_id": "01c7bb47-1e76-4c3b-901c-7e98998c70e8",
    "kind": "decision",
    "choice_label": "Doctor visit to lift it out",
    "grade": "BEST"
  },
  {
    "id": "7ee6510c-91b1-4e55-8f9a-aecd4a868b41",
    "patient_id": "9350f95f-b258-4caf-8b32-d58b6fb46d36",
    "from_node_id": "06d2ec1e-af18-4432-9d5e-60678a660ee3",
    "to_node_id": "a2e4c6e0-1c1f-4d4d-9a09-ce4dff760848",
    "kind": "decision",
    "choice_label": "One gentle blow, then stop",
    "grade": "NOT_GREAT"
  },
  {
    "id": "6baa5975-03c4-4c12-bc17-ed188fae02d5",
    "patient_id": "9350f95f-b258-4caf-8b32-d58b6fb46d36",
    "from_node_id": "06d2ec1e-af18-4432-9d5e-60678a660ee3",
    "to_node_id": "3c18162b-e257-457f-b151-01a5afc2d172",
    "kind": "decision",
    "choice_label": "Fish it out with tweezers",
    "grade": "WRONG"
  },
  {
    "id": "27ed8a50-1865-4017-8a6a-ac82e3ed6f72",
    "patient_id": "9350f95f-b258-4caf-8b32-d58b6fb46d36",
    "from_node_id": "06d2ec1e-af18-4432-9d5e-60678a660ee3",
    "to_node_id": "ddf869c2-e306-496d-bf52-a9a2923108c8",
    "kind": "decision",
    "choice_label": "Sniff hard to suck it up",
    "grade": "DANGEROUS"
  },
  {
    "id": "a9a68c9f-77ab-4656-96e9-e72c8c263d2d",
    "patient_id": "9350f95f-b258-4caf-8b32-d58b6fb46d36",
    "from_node_id": "fb185a24-1507-4e6f-9004-51cf2162b2d4",
    "to_node_id": "b43107a8-bf98-4840-bb6f-3d3bdd662c44",
    "kind": "decision",
    "choice_label": "Doctor visit to lift it out",
    "grade": "BEST"
  },
  {
    "id": "7bda2a4b-7e1e-403e-912c-f7635bd421ed",
    "patient_id": "9350f95f-b258-4caf-8b32-d58b6fb46d36",
    "from_node_id": "fb185a24-1507-4e6f-9004-51cf2162b2d4",
    "to_node_id": "0cc7c039-1f9b-491c-bd7a-f0594372dca1",
    "kind": "decision",
    "choice_label": "One gentle blow, then stop",
    "grade": "NOT_GREAT"
  },
  {
    "id": "c3021cce-b84e-4c63-a621-fd9648c1339e",
    "patient_id": "9350f95f-b258-4caf-8b32-d58b6fb46d36",
    "from_node_id": "fb185a24-1507-4e6f-9004-51cf2162b2d4",
    "to_node_id": "657130df-db57-40ac-94c1-5ef0dc6494f6",
    "kind": "decision",
    "choice_label": "Fish it out with tweezers",
    "grade": "WRONG"
  },
  {
    "id": "2e5c3d72-079f-4133-a444-0b3412437070",
    "patient_id": "9350f95f-b258-4caf-8b32-d58b6fb46d36",
    "from_node_id": "fb185a24-1507-4e6f-9004-51cf2162b2d4",
    "to_node_id": "330390b8-2a31-4c30-90a7-e34adbe6a88c",
    "kind": "decision",
    "choice_label": "Sniff hard to suck it up",
    "grade": "DANGEROUS"
  },
  {
    "id": "8e5799b5-6f9e-49c2-a3ee-b728d695a3fe",
    "patient_id": "9350f95f-b258-4caf-8b32-d58b6fb46d36",
    "from_node_id": "c15da4c0-bf2f-4b59-9b92-3cbe63303541",
    "to_node_id": "77d8ce77-e835-4b04-8555-534e75d6347c",
    "kind": "decision",
    "choice_label": "Doctor visit to lift it out",
    "grade": "BEST"
  },
  {
    "id": "1ae2c12c-857f-4576-accc-fea9414e0702",
    "patient_id": "9350f95f-b258-4caf-8b32-d58b6fb46d36",
    "from_node_id": "c15da4c0-bf2f-4b59-9b92-3cbe63303541",
    "to_node_id": "b6e121bc-4573-4b9a-94c0-fe8c57d59b26",
    "kind": "decision",
    "choice_label": "One gentle blow, then stop",
    "grade": "NOT_GREAT"
  },
  {
    "id": "12447c1a-b390-4562-92df-cc3888ebac97",
    "patient_id": "9350f95f-b258-4caf-8b32-d58b6fb46d36",
    "from_node_id": "c15da4c0-bf2f-4b59-9b92-3cbe63303541",
    "to_node_id": "0cd38f38-cc3a-4bfa-99a1-d6c7733114bc",
    "kind": "decision",
    "choice_label": "Fish it out with tweezers",
    "grade": "WRONG"
  },
  {
    "id": "88a431f7-5ca3-4105-a437-d303322bcb59",
    "patient_id": "9350f95f-b258-4caf-8b32-d58b6fb46d36",
    "from_node_id": "c15da4c0-bf2f-4b59-9b92-3cbe63303541",
    "to_node_id": "b2b237c9-00b6-4b3b-96c1-8bef9cf4bddc",
    "kind": "decision",
    "choice_label": "Sniff hard to suck it up",
    "grade": "DANGEROUS"
  },
  {
    "id": "5f19ffa6-32a5-43da-8155-d6f83604c59b",
    "patient_id": "ff94fe93-b87d-4ba7-a058-6a9cc8bcc39c",
    "from_node_id": "66b9247e-7a9b-4508-bc94-488a363eabca",
    "to_node_id": "6b51bf7b-2539-41b4-90f3-b31d3781e22c",
    "kind": "decision",
    "choice_label": "Rehydration sips, tiny + often",
    "grade": "BEST"
  },
  {
    "id": "afc0d343-411a-4173-abef-80766f1fbb61",
    "patient_id": "ff94fe93-b87d-4ba7-a058-6a9cc8bcc39c",
    "from_node_id": "66b9247e-7a9b-4508-bc94-488a363eabca",
    "to_node_id": "89e25fd3-ad4a-4d88-974a-d3840aa27a70",
    "kind": "decision",
    "choice_label": "Plain crackers and rest",
    "grade": "NOT_GREAT"
  },
  {
    "id": "be96c153-5655-4372-9ae2-15be59a81c67",
    "patient_id": "ff94fe93-b87d-4ba7-a058-6a9cc8bcc39c",
    "from_node_id": "66b9247e-7a9b-4508-bc94-488a363eabca",
    "to_node_id": "f2909ed4-941e-44a8-864b-6ea121fe7e6d",
    "kind": "decision",
    "choice_label": "Big greasy meal to settle it",
    "grade": "WRONG"
  },
  {
    "id": "8b2d50d1-399b-426f-b7c6-5886a5a67141",
    "patient_id": "ff94fe93-b87d-4ba7-a058-6a9cc8bcc39c",
    "from_node_id": "66b9247e-7a9b-4508-bc94-488a363eabca",
    "to_node_id": "c2345638-2676-4bc5-9d4f-8828fa387bc2",
    "kind": "decision",
    "choice_label": "Chug pure salt water",
    "grade": "DANGEROUS"
  },
  {
    "id": "2abd0fe0-163b-4356-8883-aa0440a7de13",
    "patient_id": "ff94fe93-b87d-4ba7-a058-6a9cc8bcc39c",
    "from_node_id": "6b51bf7b-2539-41b4-90f3-b31d3781e22c",
    "to_node_id": "b0130af8-abe5-429f-b779-84e5d8d1fa70",
    "kind": "decision",
    "choice_label": "Rehydration sips, tiny + often",
    "grade": "BEST"
  },
  {
    "id": "a5948596-8f78-446b-8dac-e20fd43f5d9e",
    "patient_id": "ff94fe93-b87d-4ba7-a058-6a9cc8bcc39c",
    "from_node_id": "6b51bf7b-2539-41b4-90f3-b31d3781e22c",
    "to_node_id": "905093b3-93e7-4aae-a502-8f9c492b4158",
    "kind": "decision",
    "choice_label": "Plain crackers and rest",
    "grade": "NOT_GREAT"
  },
  {
    "id": "6b2b3138-0174-4e1d-bd7a-dec9883f5a6e",
    "patient_id": "ff94fe93-b87d-4ba7-a058-6a9cc8bcc39c",
    "from_node_id": "6b51bf7b-2539-41b4-90f3-b31d3781e22c",
    "to_node_id": "4dec8d8b-9ea2-4da6-8ade-80b35674143b",
    "kind": "decision",
    "choice_label": "Big greasy meal to settle it",
    "grade": "WRONG"
  },
  {
    "id": "ed488244-89ed-4884-89ff-405866886477",
    "patient_id": "ff94fe93-b87d-4ba7-a058-6a9cc8bcc39c",
    "from_node_id": "6b51bf7b-2539-41b4-90f3-b31d3781e22c",
    "to_node_id": "59907a8e-72b3-436c-ab1e-52066e19b028",
    "kind": "decision",
    "choice_label": "Chug pure salt water",
    "grade": "DANGEROUS"
  },
  {
    "id": "38ce2d50-0c9f-40a5-b716-354600ee263d",
    "patient_id": "ff94fe93-b87d-4ba7-a058-6a9cc8bcc39c",
    "from_node_id": "89e25fd3-ad4a-4d88-974a-d3840aa27a70",
    "to_node_id": "1f9e2f3f-b2b5-42bf-b108-fd6b54490a3d",
    "kind": "decision",
    "choice_label": "Rehydration sips, tiny + often",
    "grade": "BEST"
  },
  {
    "id": "8f1b6650-93fd-41b5-b38a-b133cdf2625c",
    "patient_id": "ff94fe93-b87d-4ba7-a058-6a9cc8bcc39c",
    "from_node_id": "89e25fd3-ad4a-4d88-974a-d3840aa27a70",
    "to_node_id": "aa7f3c1b-dc6c-4215-b0f5-7a4b6fd00f5d",
    "kind": "decision",
    "choice_label": "Plain crackers and rest",
    "grade": "NOT_GREAT"
  },
  {
    "id": "fa33c0a0-9c92-4229-98b2-408a1ceec6da",
    "patient_id": "ff94fe93-b87d-4ba7-a058-6a9cc8bcc39c",
    "from_node_id": "89e25fd3-ad4a-4d88-974a-d3840aa27a70",
    "to_node_id": "7ccb30b8-1fb4-40d7-98e4-8f0b10c57687",
    "kind": "decision",
    "choice_label": "Big greasy meal to settle it",
    "grade": "WRONG"
  },
  {
    "id": "6e63123f-0b33-45cd-a330-7b1a9546f581",
    "patient_id": "ff94fe93-b87d-4ba7-a058-6a9cc8bcc39c",
    "from_node_id": "89e25fd3-ad4a-4d88-974a-d3840aa27a70",
    "to_node_id": "dfee8f2d-b6d4-4302-8f9e-a8a9cbb69959",
    "kind": "decision",
    "choice_label": "Chug pure salt water",
    "grade": "DANGEROUS"
  },
  {
    "id": "a6cd9357-d9e9-4ac0-a1ff-701dc81b65e4",
    "patient_id": "ff94fe93-b87d-4ba7-a058-6a9cc8bcc39c",
    "from_node_id": "f2909ed4-941e-44a8-864b-6ea121fe7e6d",
    "to_node_id": "5e3706f4-a95b-4adf-802a-074482afde6d",
    "kind": "decision",
    "choice_label": "Rehydration sips, tiny + often",
    "grade": "BEST"
  },
  {
    "id": "0d8bf595-8858-454e-a76e-51cbeb4a55c8",
    "patient_id": "ff94fe93-b87d-4ba7-a058-6a9cc8bcc39c",
    "from_node_id": "f2909ed4-941e-44a8-864b-6ea121fe7e6d",
    "to_node_id": "e2532d93-2b1a-49b6-b982-32e032694f3f",
    "kind": "decision",
    "choice_label": "Plain crackers and rest",
    "grade": "NOT_GREAT"
  },
  {
    "id": "bcf305ed-80e0-4707-9ef9-e5ae43166639",
    "patient_id": "ff94fe93-b87d-4ba7-a058-6a9cc8bcc39c",
    "from_node_id": "f2909ed4-941e-44a8-864b-6ea121fe7e6d",
    "to_node_id": "94d956b8-be80-4c16-8242-a561c95b3eef",
    "kind": "decision",
    "choice_label": "Big greasy meal to settle it",
    "grade": "WRONG"
  },
  {
    "id": "2a15ff19-3cdb-4bc3-8d6a-b2e747c92f00",
    "patient_id": "ff94fe93-b87d-4ba7-a058-6a9cc8bcc39c",
    "from_node_id": "f2909ed4-941e-44a8-864b-6ea121fe7e6d",
    "to_node_id": "ce56a14f-77dc-4dc9-97b3-0610f1f1290b",
    "kind": "decision",
    "choice_label": "Chug pure salt water",
    "grade": "DANGEROUS"
  }
];

export const FALLBACK_TREATMENTS: FallbackTreatment[] = [
  {
    "id": "acd5b642-8201-4ef1-bce5-4b1e0a051e89",
    "class_name": "Blood-pressure medicines",
    "description": "Daily pills that keep blood pressure on its leash.",
    "wording": {
      "plain": "blood-pressure pill",
      "gentle": "pressure stay-down medicine",
      "clinical": "antihypertensive therapy"
    },
    "conditions": [
      "hypertension"
    ]
  },
  {
    "id": "47b08b95-598d-4143-920e-c0589e6f62eb",
    "class_name": "Daily preventive medicines",
    "description": "Small daily doses that keep a condition quiet over time.",
    "wording": {
      "plain": "daily preventive",
      "gentle": "everyday stay-well medicine",
      "clinical": "maintenance pharmacotherapy"
    },
    "conditions": [
      "asthma",
      "hypertension"
    ]
  },
  {
    "id": "ad544e3b-28b4-40fc-a049-b2bbf5bb389e",
    "class_name": "Rescue bronchodilators",
    "description": "Quick-relief puffers that relax tight airways during breathing trouble.",
    "wording": {
      "plain": "rescue inhaler",
      "gentle": "puffer that opens airways fast",
      "clinical": "short-acting bronchodilator"
    },
    "conditions": [
      "asthma"
    ]
  },
  {
    "id": "6f026061-9d1a-469f-a0ff-41415e529a51",
    "class_name": "Supportive fluids and rest",
    "description": "Water, rest, and time — the body does the healing work.",
    "wording": {
      "plain": "fluids and rest",
      "gentle": "water and cozy rest",
      "clinical": "supportive hydration and rest"
    },
    "conditions": [
      "dehydration",
      "viral-respiratory"
    ]
  },
  {
    "id": "a31f0c2d-9b4a-4e8d-b7c1-2e5f6a7b8c01",
    "class_name": "Throat antibiotics",
    "description": "Germ-killing medicines that clear strep throat when every dose is finished.",
    "wording": {
      "plain": "strep antibiotics",
      "gentle": "finish-all-the-doses throat medicine",
      "clinical": "oral antibiotics for streptococcal pharyngitis"
    },
    "conditions": [
      "strep-throat"
    ]
  },
  {
    "id": "b42a1d3e-8c5b-4f9e-c8d2-3f6a7b8c9d02",
    "class_name": "Ear-infection medicines",
    "description": "Prescribed medicines that clear middle-ear infections, with rest for comfort.",
    "wording": {
      "plain": "ear-infection medicine",
      "gentle": "sore-ear medicine",
      "clinical": "antibiotics for acute otitis media"
    },
    "conditions": [
      "ear-infection"
    ]
  },
  {
    "id": "c53b2e4f-9d6c-4a8d-d9e3-4a7b8c9d0e03",
    "class_name": "Skin barrier creams",
    "description": "Gentle daily moisturizers that keep itchy eczema skin calm and strong.",
    "wording": {
      "plain": "moisturizer",
      "gentle": "everyday skin cream",
      "clinical": "emollient therapy"
    },
    "conditions": [
      "eczema"
    ]
  },
  {
    "id": "d64c3f5a-8e7d-4b9e-e8f4-5b8c9d0e1f04",
    "class_name": "Lung-infection antibiotics",
    "description": "Fast-start medicines that stop pneumonia early, with rest while lungs heal.",
    "wording": {
      "plain": "pneumonia antibiotics",
      "gentle": "lung-healing medicine",
      "clinical": "antibiotics for community-acquired pneumonia"
    },
    "conditions": [
      "pneumonia"
    ]
  },
  {
    "id": "c25c0a01-0000-4000-8000-000000000001",
    "class_name": "Steroid medicines",
    "description": "Quick doses that melt swelling inside airways.",
    "wording": {
      "plain": "steroid dose",
      "gentle": "swelling-melting medicine",
      "clinical": "systemic corticosteroids"
    },
    "conditions": [
      "croup"
    ]
  },
  {
    "id": "c25c0a01-0000-4000-8000-000000000002",
    "class_name": "Cool fluids and rest",
    "description": "Gentle sips and quiet days that carry viral illnesses through.",
    "wording": {
      "plain": "fluids and rest",
      "gentle": "cool sips and naps",
      "clinical": "supportive hydration and rest"
    },
    "conditions": [
      "hand-foot-mouth"
    ]
  },
  {
    "id": "c25c0a01-0000-4000-8000-000000000003",
    "class_name": "Tick-germ antibiotics",
    "description": "Full courses that hunt down the Lyme germ.",
    "wording": {
      "plain": "antibiotic course",
      "gentle": "tick-germ medicine",
      "clinical": "antibiotic therapy for borreliosis"
    },
    "conditions": [
      "lyme-disease"
    ]
  },
  {
    "id": "c25c0a01-0000-4000-8000-000000000004",
    "class_name": "Surgeon care",
    "description": "Fast operations that remove a sore appendix.",
    "wording": {
      "plain": "surgeon visit",
      "gentle": "belly-fixing operation",
      "clinical": "surgical consultation"
    },
    "conditions": [
      "appendicitis"
    ]
  },
  {
    "id": "e26c0a01-0000-4000-8000-000000000001",
    "class_name": "Ear drops",
    "description": "Antibiotic drops that fight outer-ear germs on the spot.",
    "wording": {
      "plain": "ear drops",
      "gentle": "ear-germ drops",
      "clinical": "topical otic antibiotics"
    },
    "conditions": [
      "swimmers-ear"
    ]
  },
  {
    "id": "e26c0a01-0000-4000-8000-000000000002",
    "class_name": "Weeks of rest",
    "description": "Long rest and fluids that let mono burn out.",
    "wording": {
      "plain": "rest and fluids",
      "gentle": "lots of rest and sips",
      "clinical": "supportive rest and hydration"
    },
    "conditions": [
      "mono"
    ]
  },
  {
    "id": "e26c0a01-0000-4000-8000-000000000003",
    "class_name": "Clinician removal",
    "description": "Special tools that lift stuck objects out safely.",
    "wording": {
      "plain": "doctor removal",
      "gentle": "bead-lifting tools",
      "clinical": "instrumented removal"
    },
    "conditions": [
      "nose-bead"
    ]
  },
  {
    "id": "e26c0a01-0000-4000-8000-000000000004",
    "class_name": "Oral rehydration",
    "description": "Salty-sweet sips that refill lost fluids.",
    "wording": {
      "plain": "rehydration sips",
      "gentle": "special salty-sweet water",
      "clinical": "oral rehydration therapy"
    },
    "conditions": [
      "gastroenteritis"
    ]
  }
];

export const FALLBACK_RESOURCES: FallbackResource[] = [
  {
    "id": "bfa0757e-a1c1-4c74-97ad-3b4f7a940d89",
    "condition_id": "asthma",
    "title": "Asthma",
    "url": "https://medlineplus.gov/asthma.html",
    "source": "NIH MedlinePlus",
    "audience": "layperson",
    "summary": "Asthma makes the airways twitchy and narrow, so breathing out gets whistly and hard — especially with colds, dust, or exercise. Quick-relief puffers open airways fast; daily controller medicines keep them calm. A spacer helps every puff count.",
    "quiz": {
      "stem": "Asthma makes breaths whistly because the airways…",
      "choices": ["Tighten and narrow", "Stretch wide open", "Fill with water"],
      "answer": 0,
      "pearl": "Twitchy, narrow airways whistle — puffers open them fast."
    }
  },
  {
    "id": "243353a2-7af8-455d-ab9f-28d99316e517",
    "condition_id": "dehydration",
    "title": "Dehydration",
    "url": "https://medlineplus.gov/dehydration.html",
    "source": "NIH MedlinePlus",
    "audience": "layperson",
    "summary": "When the body loses more water than it takes in — vomiting, diarrhea, sweat — it dries out: great thirst, dry lips, sunken eyes, dark pee. Small frequent sips of water or oral rehydration salts fix most cases; sleepiness or no pee needs urgent care.",
    "quiz": {
      "stem": "A dried-out friend needs what first?",
      "choices": ["Fizzy soda", "A whole salt pouch", "Small sips of water"],
      "answer": 2,
      "pearl": "Small frequent sips fix most cases — soda waits."
    }
  },
  {
    "id": "522bc126-66de-49e9-bcff-8d47739bcb1c",
    "condition_id": "viral-respiratory",
    "title": "Common Cold",
    "url": "https://medlineplus.gov/commoncold.html",
    "source": "NIH MedlinePlus",
    "audience": "layperson",
    "summary": "Colds come from viruses, not cold air — that is why antibiotics cannot fix them. Runny nose, sneezing, and a scratchy throat usually clear in about a week. Rest, fluids, and honey (age 1 and up) soothe; trouble breathing or no pee needs a doctor.",
    "quiz": {
      "stem": "A cold with cough and runny nose is usually…",
      "choices": ["Strep — needs antibiotics", "A virus — rest and fluids", "A blanket allergy"],
      "answer": 1,
      "pearl": "Colds are viruses; antibiotics cannot fix them."
    }
  },
  {
    "id": "6ad0d399-7c13-4174-95fa-959031ad84a0",
    "condition_id": "hypertension",
    "title": "High Blood Pressure",
    "url": "https://medlineplus.gov/highbloodpressure.html",
    "source": "NIH MedlinePlus",
    "audience": "layperson",
    "summary": "Blood pressure is how hard blood pushes on artery walls — high pressure usually has no symptoms, which is why cuffs check it. Less salt, daily walks, healthy weight, and prescribed medicines bring it down. Never stop pressure medicines suddenly.",
    "quiz": {
      "stem": "High blood pressure usually…",
      "choices": ["Always brings headaches", "Only visits grown-ups", "Has no symptoms"],
      "answer": 2,
      "pearl": "No symptoms — that is why cuffs check it."
    }
  },
  {
    "id": "32bc0643-db9e-4768-a35a-da0ebb0d3c59",
    "condition_id": "strep-throat",
    "title": "Strep Throat",
    "url": "https://medlineplus.gov/streptococcalinfections.html",
    "source": "NIH MedlinePlus",
    "audience": "layperson",
    "summary": "Strep throat is a bacterial sore throat — pain on swallowing, fever, red tonsils with white patches, and NO cough or runny nose. A quick throat test confirms it; antibiotics clear it fast and prevent complications. Finish every dose even after feeling better.",
    "quiz": {
      "stem": "Strep throat differs from a cold because there is…",
      "choices": ["Lots of coughing", "No cough, white patches", "A stuffy nose"],
      "answer": 1,
      "pearl": "No cough + white patches means test for strep."
    }
  },
  {
    "id": "5374fdf0-a4b7-4a2f-8abf-1dceb66f5b2e",
    "condition_id": "ear-infection",
    "title": "Ear Infections",
    "url": "https://medlineplus.gov/earinfections.html",
    "source": "NIH MedlinePlus",
    "audience": "layperson",
    "summary": "Middle-ear infections follow colds in kids: ear tugging, pain, fever, trouble hearing. The eardrum looks red and bulging through the scope. Many mild cases improve with rest and pain relief; doctors prescribe medicine for severe ones. Never poke anything inside the ear.",
    "quiz": {
      "stem": "The best way to check a sore ear is to…",
      "choices": ["Peek inside with a scope", "Poke it with a swab", "Shout into it"],
      "answer": 0,
      "pearl": "A scope shows the red, bulging eardrum."
    }
  },
  {
    "id": "85af6aa7-662d-4979-a819-2e619d68e05a",
    "condition_id": "eczema",
    "title": "Eczema",
    "url": "https://medlineplus.gov/eczema.html",
    "source": "NIH MedlinePlus",
    "audience": "layperson",
    "summary": "Eczema is dry, itchy skin that flares in elbow and knee creases, then calms for a while. Daily fragrance-free moisturizer is the foundation; short nails and cool cotton limit damage. Scratching breaks skin and invites infection, so hands stay busy instead.",
    "quiz": {
      "stem": "Daily care for itchy eczema starts with…",
      "choices": ["A rough scrub brush", "Scratching the spots", "Gentle moisturizer"],
      "answer": 2,
      "pearl": "Daily cream keeps the skin wall strong."
    }
  },
  {
    "id": "670a3b6e-cf04-4831-9773-24a1c88c7774",
    "condition_id": "pneumonia",
    "title": "Pneumonia",
    "url": "https://medlineplus.gov/pneumonia.html",
    "source": "NIH MedlinePlus",
    "audience": "layperson",
    "summary": "Pneumonia is a lung infection — fever with a deep cough, fast breathing, and crackly lung sounds. Doctors listen for crackles and confirm with a chest image. Antibiotics plus rest treat most cases; fast hard breathing needs urgent care.",
    "quiz": {
      "stem": "Pneumonia differs from a cold because of…",
      "choices": ["A runny nose", "Fever with crackly lungs", "Itchy eyes"],
      "answer": 1,
      "pearl": "Fever + crackles means the lungs need a doctor."
    }
  },
  {
    "id": "d25c0a01-0000-4000-8000-000000000001",
    "condition_id": "croup",
    "title": "Croup",
    "url": "https://medlineplus.gov/croup.html",
    "source": "NIH MedlinePlus",
    "audience": "layperson",
    "summary": "Croup turns a cold into a seal-bark cough with noisy breathing in, usually at night — swelling just below the vocal cords. One steroid dose plus calm, cool air settles most cases; struggling to breathe in needs urgent care.",
    "quiz": {
      "stem": "Croup sounds scary because the cough is…",
      "choices": [
        "A seal-like bark, worse at night",
        "A quiet sniffle",
        "A happy giggle"
      ],
      "answer": 0,
      "pearl": "Seal-bark cough + noisy breathing in: croup."
    }
  },
  {
    "id": "d25c0a01-0000-4000-8000-000000000002",
    "condition_id": "hand-foot-mouth",
    "title": "Hand-Foot-Mouth Disease",
    "url": "https://medlineplus.gov/ency/article/000965.htm",
    "source": "NIH MedlinePlus",
    "audience": "layperson",
    "summary": "Hand-foot-mouth spreads easily among young kids: fever, mouth sores that make eating hurt, and spots on palms and soles. Cool fluids and pain relief carry them through; antibiotics cannot help because a virus causes it.",
    "quiz": {
      "stem": "Hand-foot-mouth spots show up on…",
      "choices": [
        "Elbows and knees only",
        "Palms, soles, and mouth",
        "The nose and ears"
      ],
      "answer": 1,
      "pearl": "Mouth sores + palm/sole spots: HFMD."
    }
  },
  {
    "id": "d25c0a01-0000-4000-8000-000000000003",
    "condition_id": "lyme-disease",
    "title": "Lyme Disease",
    "url": "https://medlineplus.gov/lymedisease.html",
    "source": "NIH MedlinePlus",
    "audience": "layperson",
    "summary": "A tick bite can leave Lyme disease: an expanding round bullseye rash, sometimes with fever and aches. Early antibiotics cure it completely; without treatment it can later reach joints, heart, or nerves.",
    "quiz": {
      "stem": "The Lyme rash looks like…",
      "choices": [
        "Tiny water blisters",
        "Dry flaky patches",
        "A growing bullseye ring"
      ],
      "answer": 2,
      "pearl": "Growing bullseye after a tick bite: Lyme."
    }
  },
  {
    "id": "d25c0a01-0000-4000-8000-000000000004",
    "condition_id": "appendicitis",
    "title": "Appendicitis",
    "url": "https://medlineplus.gov/appendicitis.html",
    "source": "NIH MedlinePlus",
    "audience": "layperson",
    "summary": "Appendicitis starts as a vague ache near the belly button, then moves to the lower right with loss of appetite and often vomiting. It needs a prompt surgeon visit — waiting risks a burst appendix.",
    "quiz": {
      "stem": "Appendicitis pain classically…",
      "choices": [
        "Stays all over with diarrhea",
        "Moves to the lower right",
        "Comes only after meals"
      ],
      "answer": 1,
      "pearl": "Migrating pain + no appetite: appendix."
    }
  },
  {
    "id": "f26c0a01-0000-4000-8000-000000000001",
    "condition_id": "swimmers-ear",
    "title": "Swimmer's Ear",
    "url": "https://medlineplus.gov/ency/article/000622.htm",
    "source": "NIH MedlinePlus",
    "audience": "layperson",
    "summary": "Swimmer's ear infects the outer ear canal — often after swimming — so tugging the ear or pressing the bump in front hurts sharply. Antibiotic ear drops plus keeping water out cure most cases; digging with pins or swabs makes it worse.",
    "quiz": {
      "stem": "Tugging the sore ear hurts most with…",
      "choices": [
        "A middle-ear cold",
        "Swimmer's ear",
        "An itchy scalp"
      ],
      "answer": 1,
      "pearl": "Tug-hurts ear + pool: outer ear."
    }
  },
  {
    "id": "f26c0a01-0000-4000-8000-000000000002",
    "condition_id": "mono",
    "title": "Mononucleosis",
    "url": "https://medlineplus.gov/infectiousmononucleosis.html",
    "source": "NIH MedlinePlus",
    "audience": "layperson",
    "summary": "Mono brings weeks of crushing tiredness with sore throat, fever, and big neck glands — kissing and shared cups spread it among teens. Rest and fluids heal it; amoxicillin causes a rash, and contact sports wait until the spleen shrinks.",
    "quiz": {
      "stem": "Mono patients must avoid…",
      "choices": [
        "Rest and fluids",
        "Honey tea",
        "Amoxicillin and tackle football"
      ],
      "answer": 2,
      "pearl": "Amoxicillin rashes mono; spleens need rest."
    }
  },
  {
    "id": "f26c0a01-0000-4000-8000-000000000003",
    "condition_id": "nose-bead",
    "title": "Foreign Body in the Nose",
    "url": "https://medlineplus.gov/ency/article/000037.htm",
    "source": "NIH MedlinePlus",
    "audience": "layperson",
    "summary": "A bead or toy up the nose causes a stinky discharge from ONE nostril while the other stays clear. Doctors lift it out with tiny tools; tweezers and hard sniffing push it deeper or toward the lungs.",
    "quiz": {
      "stem": "One stinky nostril, other fine means…",
      "choices": [
        "A common cold",
        "Something stuck inside",
        "An ear infection"
      ],
      "answer": 1,
      "pearl": "One-sided stink: peek inside."
    }
  },
  {
    "id": "f26c0a01-0000-4000-8000-000000000004",
    "condition_id": "gastroenteritis",
    "title": "Gastroenteritis",
    "url": "https://medlineplus.gov/gastroenteritis.html",
    "source": "NIH MedlinePlus",
    "audience": "layperson",
    "summary": "Stomach bugs cause vomiting plus watery diarrhea with cramps all over — but no single sore spot like appendicitis. Tiny frequent rehydration sips refill losses; most cases clear in days without antibiotics.",
    "quiz": {
      "stem": "A tummy bug needs first…",
      "choices": [
        "Tiny rehydration sips",
        "A big greasy meal",
        "Pure salt water"
      ],
      "answer": 0,
      "pearl": "Tiny sips refill what puking stole."
    }
  }
];

export const FALLBACK_HANDOFFS: FallbackHandoff[] = [
  {
    "id": "handoff-fb-milo-01",
    "patient_id": "1949914c-8e7a-4297-bc6b-d120a45f7df3",
    "from_handle": "Wren",
    "team_tag": "Moon",
    "preset_id": "rest-up",
    "encounter_summary": "Sick visit · 2 of 4 right",
    "outcome": "struggling",
    "score": 2,
    "created_at": "2026-10-28T12:00:00.000Z"
  },
  {
    "id": "handoff-fb-mabel-01",
    "patient_id": "fb50f32f-0dd1-4b47-983b-06b76e3ecaa9",
    "from_handle": "Fox",
    "team_tag": "Sun",
    "preset_id": "recheck-breathing",
    "encounter_summary": "Follow-up · 3 of 4 right",
    "outcome": "recovered",
    "score": 3,
    "created_at": "2026-10-27T12:00:00.000Z"
  }
];

export const FALLBACK_CHEERS: FallbackCheer[] = [
  {
    "id": "cheer-fb-01",
    "from_handle": "Wren",
    "to_handle": "Fox",
    "preset_id": "Great catch!",
    "created_at": "2026-10-28T12:00:00.000Z"
  }
];

/** Offline mirror of exam_findings (4 conditions x 4 modalities). */
export const FALLBACK_EXAM_FINDINGS: FallbackExamFinding[] = [
  { condition_id: 'asthma', modality: 'look', gentle: 'Breathing fast and working hard — shoulders lift with each breath.', steady: 'Fast breathing with accessory muscle use.', clinical: 'Tachypneic; accessory-muscle use.', expert: 'Tachypnea with accessory muscle recruitment; possible tripoding.' },
  { condition_id: 'asthma', modality: 'feel', gentle: 'Chest moving fast; skin a little sweaty.', steady: 'Racing pulse; chest moves evenly on both sides.', clinical: 'Tachycardic; chest expansion symmetric.', expert: 'Tachycardia; symmetric expansion; fremitus normal.' },
  { condition_id: 'asthma', modality: 'tap', gentle: 'Chest sounds hollow, like a little drum.', steady: 'A bit overfull with air — mildly hyperresonant.', clinical: 'Hyperresonant; lungs overexpanded.', expert: 'Hyperresonance from hyperinflation.' },
  { condition_id: 'asthma', modality: 'listen', gentle: 'Whistly breaths, mostly while breathing out.', steady: 'Wheezes when breathing out, all over.', clinical: 'Diffuse expiratory wheezes.', expert: 'Diffuse polyphonic expiratory wheezes; prolonged expiratory phase.' },
  { condition_id: 'viral-respiratory', modality: 'look', gentle: 'Runny nose and watery eyes; lots of sneezing.', steady: 'Runny nose, red eyes, frequent sneezing.', clinical: 'Clear rhinorrhea; injected conjunctivae.', expert: 'Profuse clear rhinorrhea; conjunctival injection; paroxysmal sneezing.' },
  { condition_id: 'viral-respiratory', modality: 'feel', gentle: 'Forehead feels warm — a small fever.', steady: 'Low-grade fever; sinuses a little tender.', clinical: 'Low-grade fever; sinus tenderness.', expert: 'Low-grade pyrexia; mild sinus tenderness.' },
  { condition_id: 'viral-respiratory', modality: 'tap', gentle: 'Chest taps sound normal.', steady: 'Chest sounds normal — this cold lives in the nose.', clinical: 'Chest resonant; upper-airway findings only.', expert: 'Resonant throughout; no consolidation.' },
  { condition_id: 'viral-respiratory', modality: 'listen', gentle: 'Chest sounds clear — the sniffles stay in the nose.', steady: 'Lungs clear; only sniffly nose sounds from above.', clinical: 'Lungs clear; transmitted nasal sounds.', expert: 'Vesicular, no crackles or wheeze.' },
  { condition_id: 'dehydration', modality: 'look', gentle: 'Very thirsty, droopy, with sleepy eyes.', steady: 'Lethargic with sunken eyes and dry lips.', clinical: 'Lethargic; sunken eyes, dry lips.', expert: 'Lethargy; sunken eyes; dry mucous membranes.' },
  { condition_id: 'dehydration', modality: 'feel', gentle: 'Pinched skin stays peaked instead of springing back.', steady: 'Slow skin recoil — the tent stays up.', clinical: 'Poor skin turgor; rapid pulse.', expert: 'Delayed skin-turgor recoil; thready rapid pulse.' },
  { condition_id: 'dehydration', modality: 'tap', gentle: 'Belly taps sound normal — this check shows little here.', steady: 'Belly unremarkable; percussion adds nothing here.', clinical: 'Abdomen benign; percussion unhelpful.', expert: 'No percussive abnormality; this is an inspection diagnosis.' },
  { condition_id: 'dehydration', modality: 'listen', gentle: 'Heartbeat is fast, like after running.', steady: 'Fast heart rate; pressure a little low.', clinical: 'Tachycardia; low-normal pressure.', expert: 'Sinus tachycardia; borderline hypotension.' },
  { condition_id: 'hypertension', modality: 'look', gentle: 'Looks fine outside — high pressure hides inside.', steady: 'No outward signs; pressure problems often hide.', clinical: 'No outward signs; asymptomatic.', expert: 'Asymptomatic at rest; no distress.' },
  { condition_id: 'hypertension', modality: 'feel', gentle: 'Pulse feels strong and bouncy.', steady: 'Bounding pulses; ankles look fine.', clinical: 'Bounding pulses; no edema.', expert: 'Bounding pulses; no peripheral edema.' },
  { condition_id: 'hypertension', modality: 'tap', gentle: 'Chest taps sound normal.', steady: 'Percussion normal.', clinical: 'Resonant; no abnormality.', expert: 'No percussive abnormality.' },
  { condition_id: 'hypertension', modality: 'listen', gentle: 'The arm cuff squeezes and reads a big number — too high!', steady: 'Cuff reads high even after quiet rest.', clinical: 'Cuff high after 5 minutes rest.', expert: 'Stage-2-range cuff readings after 5 minutes rest.' },
  { condition_id: 'strep-throat', modality: 'look', gentle: 'Throat very red with white patches — and no cough at all.', steady: 'Red throat with white patches; no cough or runny nose.', clinical: 'Erythematous pharynx with exudates; no cough.', expert: 'Marked pharyngeal erythema with tonsillar exudates; cough absent.' },
  { condition_id: 'strep-throat', modality: 'feel', gentle: 'Neck glands feel sore and puffy; forehead warm.', steady: 'Tender neck glands; feverish forehead.', clinical: 'Tender anterior nodes; febrile.', expert: 'Tender anterior cervical adenopathy; febrile.' },
  { condition_id: 'strep-throat', modality: 'tap', gentle: 'Chest taps sound normal — the trouble is all in the throat.', steady: 'Chest normal; percussion adds nothing here.', clinical: 'Chest resonant; findings localize to the pharynx.', expert: 'No percussive abnormality; pharynx-localized findings.' },
  { condition_id: 'strep-throat', modality: 'listen', gentle: 'Chest sounds clear — only the throat is sore.', steady: 'Lungs clear; no cough to hear.', clinical: 'Lungs clear; cough absent.', expert: 'Vesicular, no crackles; cough absent.' },
  { condition_id: 'ear-infection', modality: 'look', gentle: 'One ear tugged red; the eardrum glows red through the scope.', steady: 'Tugging one ear; scope shows a red, bulging eardrum.', clinical: 'Bulging erythematous TM on otoscopy.', expert: 'Otoscopy: bulging erythematous TM, landmarks effaced.' },
  { condition_id: 'ear-infection', modality: 'feel', gentle: 'The sore ear feels hot; forehead warm with fever.', steady: 'Tender around the sore ear; low fever.', clinical: 'Periauricular tenderness; febrile.', expert: 'Periauricular tenderness; low-grade pyrexia.' },
  { condition_id: 'ear-infection', modality: 'tap', gentle: 'Head taps tell nothing — the scope does the finding.', steady: 'Percussion unhelpful for ears.', clinical: 'Percussion unhelpful here.', expert: 'No percussive role; this is an otoscopic diagnosis.' },
  { condition_id: 'ear-infection', modality: 'listen', gentle: 'Hearing is fuzzy on the sore side, like cotton inside.', steady: 'Muffled hearing on the sore side.', clinical: 'Conductive hearing loss, affected side.', expert: 'Unilateral conductive loss; TM immobile on insufflation.' },
  { condition_id: 'eczema', modality: 'look', gentle: 'Dry red patches hiding in the elbow and knee bends.', steady: 'Dry red patches in the elbow and knee creases.', clinical: 'Xerotic flexural plaques, symmetric.', expert: 'Symmetric flexural lichenified plaques; excoriations absent.' },
  { condition_id: 'eczema', modality: 'feel', gentle: 'Patches feel rough and dry, like thirsty skin.', steady: 'Rough, dry plaques; skin warm, not hot.', clinical: 'Dry rough plaques; afebrile.', expert: 'Coarse dry plaques; no warmth to suggest superinfection.' },
  { condition_id: 'eczema', modality: 'tap', gentle: 'Taps sound normal everywhere — skin tells this story.', steady: 'Percussion normal; this is a look-and-feel diagnosis.', clinical: 'Percussion unremarkable.', expert: 'No percussive abnormality; inspection diagnosis.' },
  { condition_id: 'eczema', modality: 'listen', gentle: 'Heart and lungs sound fine — only the skin is unhappy.', steady: 'Heart and lungs normal.', clinical: 'Cardiopulmonary exam normal.', expert: 'No cardiopulmonary abnormality.' },
  { condition_id: 'pneumonia', modality: 'look', gentle: 'Breathing fast and hard, cheeks flushed with fever.', steady: 'Fast hard breathing with fever flush.', clinical: 'Tachypneic and febrile; mild distress.', expert: 'Tachypnea with fever; accessory-muscle use emerging.' },
  { condition_id: 'pneumonia', modality: 'feel', gentle: 'Chest moving fast; forehead hot with fever.', steady: 'Fast pulse; chest moves a little unevenly.', clinical: 'Tachycardic; asymmetric expansion.', expert: 'Tachycardia; asymmetric expansion; increased fremitus.' },
  { condition_id: 'pneumonia', modality: 'tap', gentle: 'One chest spot thuds dull instead of hollow.', steady: 'One spot sounds dull — fluid where air should be.', clinical: 'Focal dullness to percussion.', expert: 'Focal dullness; consolidation pattern.' },
  { condition_id: 'pneumonia', modality: 'listen', gentle: 'Crackly sounds in one lung spot, like bubble wrap.', steady: 'Crackles in one lung area.', clinical: 'Focal crackles.', expert: 'Focal late-inspiratory crackles; bronchial breath sounds.' },
  { condition_id: 'croup', modality: 'look', gentle: 'Breathing in looks noisy and hard — neck pulls with each breath.', steady: 'Labored breathing in; neck muscles pull.', clinical: 'Inspiratory effort; accessory-muscle use.', expert: 'Inspiratory distress; accessory recruitment; no drooling.' },
  { condition_id: 'croup', modality: 'feel', gentle: 'Chest moves fast; forehead a little warm.', steady: 'Fast pulse; mild fever.', clinical: 'Tachycardic; low-grade fever.', expert: 'Tachycardia; low-grade pyrexia.' },
  { condition_id: 'croup', modality: 'tap', gentle: 'Chest taps sound normal — the trouble sits higher up.', steady: 'Chest normal; obstruction is above the chest.', clinical: 'Chest resonant; upper-airway obstruction.', expert: 'Resonant; subglottic process, no consolidation.' },
  { condition_id: 'croup', modality: 'listen', gentle: 'Harsh raspy noise breathing IN — not out.', steady: 'Harsh inspiratory stridor.', clinical: 'Inspiratory stridor; barking cough.', expert: 'Inspiratory stridor; barky cough; no wheeze.' },
  { condition_id: 'hand-foot-mouth', modality: 'look', gentle: 'Drooly and feverish; will not touch snacks.', steady: 'Feverish, drooling, refusing food.', clinical: 'Febrile; drooling; refusing intake.', expert: 'Febrile; sialorrhea; anorexia.' },
  { condition_id: 'hand-foot-mouth', modality: 'feel', gentle: 'Forehead feels hot; tiny bumps on palms.', steady: 'Fever; small bumps on palms and soles.', clinical: 'Febrile; palmar and plantar papules.', expert: 'Febrile; palmar/plantar papulovesicles.' },
  { condition_id: 'hand-foot-mouth', modality: 'tap', gentle: 'Belly and chest taps sound normal.', steady: 'Percussion normal throughout.', clinical: 'Percussion unremarkable.', expert: 'No percussive abnormality.' },
  { condition_id: 'hand-foot-mouth', modality: 'listen', gentle: 'Chest sounds clear — spots are the story.', steady: 'Lungs clear; findings are skin and mouth.', clinical: 'Lungs clear; cutaneous and oral findings.', expert: 'Vesicular; disease is mucocutaneous.' },
  { condition_id: 'lyme-disease', modality: 'look', gentle: 'A round red ring on the skin, getting bigger.', steady: 'Expanding red ring rash with a clear center.', clinical: 'Expanding annular rash, central clearing.', expert: 'Expanding annular EM; central clearing.' },
  { condition_id: 'lyme-disease', modality: 'feel', gentle: 'The ring feels flat and warm, not scaly.', steady: 'Flat warm ring; no scale or crust.', clinical: 'Non-scaly annular plaque.', expert: 'Non-scaly expanding annular plaque.' },
  { condition_id: 'lyme-disease', modality: 'tap', gentle: 'Taps sound normal everywhere.', steady: 'Percussion normal.', clinical: 'Percussion unremarkable.', expert: 'No percussive abnormality.' },
  { condition_id: 'lyme-disease', modality: 'listen', gentle: 'Chest sounds clear; heart sounds normal.', steady: 'Lungs and heart sound normal.', clinical: 'Heart and lungs normal.', expert: 'Normal cardiopulmonary exam.' },
  { condition_id: 'appendicitis', modality: 'look', gentle: 'Curled up very still; moving hurts.', steady: 'Lying still; movement worsens pain.', clinical: 'Motionless; movement aggravates pain.', expert: 'Lies motionless; peritoneal posturing.' },
  { condition_id: 'appendicitis', modality: 'feel', gentle: 'Lower-right belly jumps when gently pressed.', steady: 'Marked lower-right tenderness; guarding.', clinical: 'Lower-right tenderness with guarding.', expert: 'McBurney point, guarding + rebound.' },
  { condition_id: 'appendicitis', modality: 'tap', gentle: 'Tapping the belly hurts — even bumps in the road.', steady: 'Percussion tenderness over the lower right.', clinical: 'Percussion tenderness, lower right.', expert: 'Percussion tenderness; peritoneal irritation.' },
  { condition_id: 'appendicitis', modality: 'listen', gentle: 'Belly sounds are extra quiet.', steady: 'Bowel sounds quiet.', clinical: 'Hypoactive bowel sounds.', expert: 'Hypoactive bowel sounds; ileus pattern.' },
  { condition_id: 'swimmers-ear', modality: 'look', gentle: 'Outer ear red and puffy; a little ooze.', steady: 'Red swollen outer ear with discharge.', clinical: 'Erythematous edematous canal; otorrhea.', expert: 'Canal edema/erythema; purulent otorrhea.' },
  { condition_id: 'swimmers-ear', modality: 'feel', gentle: 'Tugging the ear REALLY hurts — ouch!', steady: 'Sharp pain when the ear is tugged.', clinical: 'Exquisite traction tenderness.', expert: 'Exquisite pinna/tragus tenderness.' },
  { condition_id: 'swimmers-ear', modality: 'tap', gentle: 'Head taps sound normal.', steady: 'Percussion normal.', clinical: 'Percussion unremarkable.', expert: 'No percussive abnormality.' },
  { condition_id: 'swimmers-ear', modality: 'listen', gentle: 'Hearing a bit muffled on that side.', steady: 'Muffled hearing on the sore side.', clinical: 'Conductive muffling, sore side.', expert: 'Unilateral conductive loss; canal edema.' },
  { condition_id: 'mono', modality: 'look', gentle: 'Droopy, pale, and SO tired looking.', steady: 'Pale and exhausted; throat red.', clinical: 'Pale, fatigued; pharyngeal erythema.', expert: 'Pallor, lassitude; exudative pharyngitis.' },
  { condition_id: 'mono', modality: 'feel', gentle: 'Neck glands HUGE and sore, both sides.', steady: 'Huge tender neck glands, both sides.', clinical: 'Bulky bilateral tender nodes.', expert: 'Bulky posterior nodes; splenic tip.' },
  { condition_id: 'mono', modality: 'tap', gentle: 'Belly taps sound normal.', steady: 'Percussion normal.', clinical: 'Percussion unremarkable.', expert: 'No percussive abnormality.' },
  { condition_id: 'mono', modality: 'listen', gentle: 'Chest sounds clear — tiredness is the story.', steady: 'Lungs clear; fatigue dominates.', clinical: 'Lungs clear; systemic fatigue.', expert: 'Vesicular; no focal findings.' },
  { condition_id: 'nose-bead', modality: 'look', gentle: 'Stinky goo from one nostril only.', steady: 'One-sided foul discharge; other clear.', clinical: 'Unilateral foul rhinorrhea.', expert: 'Unilateral fetid rhinorrhea.' },
  { condition_id: 'nose-bead', modality: 'feel', gentle: 'Nose a little tender on the oozy side.', steady: 'Mild tenderness over the oozy side.', clinical: 'Mild unilateral nasal tenderness.', expert: 'Mild unilateral tenderness; afebrile.' },
  { condition_id: 'nose-bead', modality: 'tap', gentle: 'Face taps sound normal.', steady: 'Sinus percussion normal.', clinical: 'Sinuses non-tender.', expert: 'No sinus tenderness.' },
  { condition_id: 'nose-bead', modality: 'listen', gentle: 'Breathing sounds clear on both sides.', steady: 'Lungs clear; nose whistles on one side.', clinical: 'Lungs clear; unilateral nasal whistle.', expert: 'Vesicular; unilateral nasal obstruction.' },
  { condition_id: 'gastroenteritis', modality: 'look', gentle: 'Pale and droopy; tongue looks dry.', steady: 'Pale, droopy, dry lips.', clinical: 'Pale; dry lips; mild distress.', expert: 'Pallor; dry mucosae; mild distress.' },
  { condition_id: 'gastroenteritis', modality: 'feel', gentle: 'Belly soft and gurgly all over.', steady: 'Soft belly, gurgly everywhere.', clinical: 'Soft diffuse tenderness; gurgly.', expert: 'Soft diffuse abdomen; non-focal.' },
  { condition_id: 'gastroenteritis', modality: 'tap', gentle: 'Belly taps sound hollow and gassy.', steady: 'Gassy hollow taps all over.', clinical: 'Diffuse tympany.', expert: 'Diffuse tympany; no focal dullness.' },
  { condition_id: 'gastroenteritis', modality: 'listen', gentle: 'Belly grumbles and gurgles loudly.', steady: 'Loud gurgly bowel sounds.', clinical: 'Hyperactive bowel sounds.', expert: 'Hyperactive rushing bowel sounds.' }
];
