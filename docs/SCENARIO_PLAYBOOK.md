# SCENARIO_PLAYBOOK.md — how Cozy Clinic cases get made

> Every scenario teaches real medicine through a 4-round visit:
> **ask → examine → diagnose → treat**. This playbook is the
> recipe for authoring new scenarios — by hand today, by
> model-assisted generation tomorrow (returning patients, new
> conditions, future trajectories). The engine vetoes anything
> that breaks the budgets below; the operator's pen is final.

## 1. Source hierarchy

1. **MSD Manual, Professional Edition** — the primary source for
   history/exam/diagnosis content. Read the condition's
   *Symptoms and Signs* + *Diagnosis* sections before writing a
   word. Current sourcing:
   - dehydration → Volume Depletion
   - cold → Common Cold
   - asthma → Asthma
   - hypertension → Hypertension
   - strep → Streptococcal Infections + Sore Throat table
   - ear → Otitis Media (Acute)
   - eczema → Atopic Dermatitis (Eczema)
   - pneumonia → Community-Acquired Pneumonia
   - croup → Croup
   - hand-foot-mouth → Hand-Foot-and-Mouth Disease
   - lyme-disease → Lyme Disease
   - appendicitis → Appendicitis
   - swimmers-ear → Otitis Externa (Acute)
   - mono → Epstein-Barr Virus Infections
   - nose-bead → Nasal Foreign Bodies
   - gastroenteritis → Gastroenteritis
   - hay-fever → Allergic Rhinitis
   - ringworm → Tinea Corporis
   - pink-eye → Conjunctivitis Overview
   - ankle-sprain → Sprains Overview
   - chickenpox → Chickenpox (Varicella)
   - uti → UTI in Children
   - stye → Chalazion and Hordeolum
   - nosebleed → Epistaxis
   (all at `msdmanuals.com/professional/…`)
2. **NIH MedlinePlus** — patient-facing links for Learn cards only.
3. **Operator (physician) pen** — final review; new content ships
   as DRAFT until reviewed.

## 2. The history round (the discriminator)

The history question must **discriminate**, not merely describe.
A player who asks well should be able to rule something in or
out before touching the patient. Mine these MSD patterns:

- **Onset + sequence** (cold: scratchy throat → sneezes →
  runny nose; strep: abrupt + fever; AOM: acute <48h)
- **Course** (asthma: varies over time/intensity; eczema:
  chronic/relapsing; HTN: silent — the *absence* is the clue)
- **Provocation** (asthma triggers; pleurisy on deep breath;
  AOM worse recumbent)
- **Negatives that rule out** (strep: cough absent; cold:
  afebrile; pneumonia: no sneezing — trouble is below the nose)
- **Atopy/personal/family history** (eczema: family atopy)

Rules:

- Exactly 3 options, ids unique per condition, labels ≤40 chars,
  plain words (options are NOT tiered — a Gentle kid must be
  able to pick the best from the presentation).
- The best answer's finding is tiered ×4 (see §5) and must name
  the feature + why it matters.
- Distractors must be **absent in this patient** (the dead-end
  line is a head-shake: "nope, none of that"). Never a true
  distractor, never pure silliness — plausible-but-absent, and
  ideally educational in itself (toothache for ear pain:
  referred pain considered; high fever for a cold: flu ruled
  out).
- History and exam must **complement, never duplicate**: history
  is what the patient reports (onset, course, pain, exposures);
  exam is what the doctor finds (the drum, the wheeze, the cuff).

## 3. The exam round

- 3 case-specific bedside checks + best id (never the generic
  Look/Feel/Tap/Listen row — that lives in the exam tray).
- The best check's finding is tiered ×4 and must be the
  **textbook sign**: bulging erythematous TM, expiratory
  wheeze, exudates + no cough, focal crackles, cuff after
  rest, skin turgor, flexural plaques, Centor-0 neck glands.
- The exam quiz question is tiered ×4 with `{name}` (gentle)
  and `{demo}` (expert) tokens.

## 4. Diagnose + treat

- Dx: 3 options (truth + 2 neighbors, one a *close* mimicker:
  strep↔cold, pneumonia↔asthma). Pearls 11–70 chars; the wrong
  pearl must re-teach the discriminator ("White patches with
  NO cough? Think strep, not cold"). Visit pearl 11–40 chars.
- Treat: 4 actions (BEST / NOT_GREAT / WRONG / DANGEROUS) with
  per-stage grades. BEST = the MSD first-line, in plain words.
  WRONG = the classic patient error (stop antibiotics early,
  scratch, poke the ear, hide and wait). DANGEROUS = absurd
  and blocked, always rescued ("stopped just in time").
- Labels tiered ×4; steady === canonical (engine memory keys
  on it); every tier ≤34 chars; gentle or expert must differ.
- 4 stages (0 well → 3 needs-care-now), `presentsAt` usually 2.
  Stage 3 is droopy, never grim.

## 5. Tier-writing rules

- **Gentle**: grade-school words, exclamation welcome, no
  abbreviations, no Latin. "Zero cough", "yucky mucus".
- **Steady**: educated adult, plain clinical words. Canonical.
- **Clinical**: healthcare-worker vocabulary, **spelled out**
  (rhinorrhea fine, URI ok only if standard; never cryptic
  abbreviations).
- **Expert**: terse physician phrasing; standard abbreviations
  ok (AOM, GAS, WOB, ECF, CAP).

## 6. Anti-patterns (from real revisions)

- **Soft calls**: "salty diet" for HTN, "sick contacts" for a
  cold — true but non-discriminating. Ask: would this answer
  change the differential? If no, rewrite.
- **True distractors**: every non-best option must be absent,
  or the dead-end line lies.
- **Duplicated rounds**: if history already said "no cough",
  exam must *show* it (white patches on the throat), not say
  it again.
- **Myth reinforcement**: never imply headaches warn of HTN,
  cold air causes colds, or antibiotics treat viruses.
- **Grim stage 3**: "needs care now" is the ceiling.

## 7. Budgets (engine-vetoed)

- History labels ≤40 chars; action labels ≤34 chars.
- dxPearl 11–70 chars; visitPearl 11–40 chars.
- Tier names ≤34 chars; gentle quiz has `{name}`, expert has
  `{demo}`.
- Learn summary ≤6 card lines; quiz stem ≤2 lines; choices fit
  the card; pearl ≤2 lines (see layout auditor E5/E6).
- Stages move ≤1 per move; DANGEROUS never moves state.

## 8. Generation prompt (future use)

Use for model-assisted drafting of a NEW condition. The draft
always ships as DRAFT for operator review, then passes the
engine veto + tests + auditor before it plays.

```text
You are drafting a Cozy Clinic scenario for CONDITION.
First read the MSD Manual Professional Edition page for this
condition (Symptoms and Signs + Diagnosis sections) and name
the single most discriminating history feature, the single
most textbook exam sign, the closest mimicker, and the
first-line treatment.

Then write, in the repo's ConditionDef shape:
1. historyOptions (3, labels ≤40 chars, plain words) +
   historyBestId + bestHistory ×4 tiers + historyQuiz ×4
   tiers (gentle uses {name}, expert uses {demo}).
2. examOptions (3) + examBestId + bestFinding ×4 + examQuiz ×4.
3. dxOptions (3, truth first, one close mimicker) + dxPearl
   right/wrong (11–70 chars) + visitPearl (11–40 chars).
4. 4 stages (labels + 1-line blurbs + patient says-lines),
   presentsAt 2.
5. 4 actions (BEST/NOT_GREAT/WRONG/DANGEROUS) with labels ×4
   tiers (steady canonical, ≤34 chars) + gradeByStage +
   hootLine teaching.

Rules: follow SCENARIO_PLAYBOOK §§2–7 exactly (discriminating
history, absent distractors, no duplicated rounds, no myths,
tier vocabulary). Tier names ≤34 chars. Reply with the
TypeScript block plus the MSD facts each choice is grounded
in, one line per choice.
```

## 9. Trajectories for returning patients

Pre-computed futures stay engine-authored: new trees are
generated by driving `ClinicalEngine` (see `/tmp/h2/gen-trees.ts`
recipe in PROGRESS run 20), narratives in the Mabel style
(action echo + stage state + cozy room), every edge passing
`vetoEdge`. Stored trees mirror to Supabase; the game never
waits on generation mid-tap.
