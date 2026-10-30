/**
 * FALLBACK PACK — offline snapshot of the H2 Supabase seed
 * (exported 2026-10-29; 12 patients, 204 nodes).
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
  }
];

export const FALLBACK_HANDOFFS: FallbackHandoff[] = [
  {
    "id": "handoff-fb-milo-01",
    "patient_id": "1949914c-8e7a-4297-bc6b-d120a45f7df3",
    "from_handle": "Wren",
    "team_tag": "Moon",
    "preset_id": "rest-up",
    "encounter_summary": "Sick visit · 2 of 3 right",
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
    "encounter_summary": "Follow-up · 3 of 3 right",
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
  { condition_id: 'asthma', modality: 'look', gentle: 'Breathing fast and working hard — shoulders lift with each breath.', steady: 'Fast breathing with accessory muscle use.', expert: 'Tachypnea with accessory muscle recruitment; possible tripoding.' },
  { condition_id: 'asthma', modality: 'feel', gentle: 'Chest moving fast; skin a little sweaty.', steady: 'Racing pulse; chest moves evenly on both sides.', expert: 'Tachycardia; symmetric expansion; fremitus normal.' },
  { condition_id: 'asthma', modality: 'tap', gentle: 'Chest sounds hollow, like a little drum.', steady: 'A bit overfull with air — mildly hyperresonant.', expert: 'Hyperresonance from hyperinflation.' },
  { condition_id: 'asthma', modality: 'listen', gentle: 'Whistly breaths, mostly while breathing out.', steady: 'Wheezes when breathing out, all over.', expert: 'Diffuse polyphonic expiratory wheezes; prolonged expiratory phase.' },
  { condition_id: 'viral-respiratory', modality: 'look', gentle: 'Runny nose and watery eyes; lots of sneezing.', steady: 'Runny nose, red eyes, frequent sneezing.', expert: 'Profuse clear rhinorrhea; conjunctival injection; paroxysmal sneezing.' },
  { condition_id: 'viral-respiratory', modality: 'feel', gentle: 'Forehead feels warm — a small fever.', steady: 'Low-grade fever; sinuses a little tender.', expert: 'Low-grade pyrexia; mild sinus tenderness.' },
  { condition_id: 'viral-respiratory', modality: 'tap', gentle: 'Chest taps sound normal.', steady: 'Chest sounds normal — this cold lives in the nose.', expert: 'Resonant throughout; no consolidation.' },
  { condition_id: 'viral-respiratory', modality: 'listen', gentle: 'Chest sounds clear — the sniffles stay in the nose.', steady: 'Lungs clear; only sniffly nose sounds from above.', expert: 'Vesicular, no crackles or wheeze.' },
  { condition_id: 'dehydration', modality: 'look', gentle: 'Very thirsty, droopy, with sleepy eyes.', steady: 'Lethargic with sunken eyes and dry lips.', expert: 'Lethargy; sunken eyes; dry mucous membranes.' },
  { condition_id: 'dehydration', modality: 'feel', gentle: 'Pinched skin stays peaked instead of springing back.', steady: 'Slow skin recoil — the tent stays up.', expert: 'Delayed skin-turgor recoil; thready rapid pulse.' },
  { condition_id: 'dehydration', modality: 'tap', gentle: 'Belly taps sound normal — this check shows little here.', steady: 'Belly unremarkable; percussion adds nothing here.', expert: 'No percussive abnormality; this is an inspection diagnosis.' },
  { condition_id: 'dehydration', modality: 'listen', gentle: 'Heartbeat is fast, like after running.', steady: 'Fast heart rate; pressure a little low.', expert: 'Sinus tachycardia; borderline hypotension.' },
  { condition_id: 'hypertension', modality: 'look', gentle: 'Looks fine outside — high pressure hides inside.', steady: 'No outward signs; pressure problems often hide.', expert: 'Asymptomatic at rest; no distress.' },
  { condition_id: 'hypertension', modality: 'feel', gentle: 'Pulse feels strong and bouncy.', steady: 'Bounding pulses; ankles look fine.', expert: 'Bounding pulses; no peripheral edema.' },
  { condition_id: 'hypertension', modality: 'tap', gentle: 'Chest taps sound normal.', steady: 'Percussion normal.', expert: 'No percussive abnormality.' },
  { condition_id: 'hypertension', modality: 'listen', gentle: 'The arm cuff squeezes and reads a big number — too high!', steady: 'Cuff reads high even after quiet rest.', expert: 'Stage-2-range cuff readings after 5 minutes rest.' },
];
