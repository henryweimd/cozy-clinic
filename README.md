# Little Lives: Cozy Clinic

**A cozy clinic game where patients remember you** — every encounter changes
a persistent patient, and that patient's story follows them across clinicians.

- **Play it live:** <https://cozy-clinic.vercel.app/> (mobile-first, 540×960 portrait)
- **Theme:** Build for Your World — clinical education is a domain where practice is scarce, dry, and intimidating, and a game that teaches clinical reasoning through attachment to patients is a real answer to it.
- **Track:** Indie developer, Meta AI Developer Hackathon.

## Who it is for

Cozy Clinic is a game for everyone — kids discovering what medicine is,
adults who never got a clear explanation of their own health. It exists
because low health literacy and medical misinformation cause real harm:
people refuse vaccines, delay care, and trust rumors over clinicians, often
because medicine was never made understandable or approachable. This game
teaches real medicine the way it actually sticks: by caring for patients you
grow attached to, making real clinical decisions, and living with the
consequences — growing future doctors and a public that can recognize good
health information when it sees it.

The intent is **machine learning for human learning**: if Muse models can
simulate patients at near-zero cost, they can 1000x the supply of educated
patients — people who understand their own health because they have lived it
in play — and, hopefully, help grow educated doctors and health professionals
too.

> Operator's firsthand-domain paragraph: to be written by the operator
> before submission — never shipped without their approval.

## What it is — and what it is not

An **educational simulation with fictional patients** and a deterministic
clinical engine. It is **not** a medical advice tool, **not** a diagnostic
tool for real people, and **not** a chatbot: there is no free-text clinical
input, ever — every decision is a small tap-only choice set (3 options per
round). Real conditions are taught through gentle consequences
with cozy bounds; patients never die and setbacks always carry a recovery
path. Never real patient data.

## Run it

```bash
npm install
npm test        # full suite — must pass (238 tests, green at last update)
npm run dev     # serves at http://localhost:5173 — open in a browser
npm run build   # production build into dist/
```

Copy `.env.example` to `.env` for live Supabase reads; the operator creates
the real `.env` locally — it is never committed. Without it (or without the
same two vars on Vercel), the game silently runs on its offline fallback pack,
so the demo path completes with zero network.

## Guided demo (90 seconds)

Playable today on the live build; every step works, nothing staged:

1. Meet Milo — visit #2, he recognizes you in the opening seconds.
2. Clear the 4-round visit: ask a history question, examine,
   diagnose, then treat — clues accumulate across rounds.
3. Tap Next patient into a 10-strong roster (sleepy Theo to elder
   Ellis to new Nina, Kai, Ada, Felix); reorder the Waiting queue.
   The left-edge exam tray holds Look / Feel / Tap / Listen with
   per-disease findings.
4. Leave a care note (open a 2nd tab as another doctor to see it land).
5. Open a Learn card (art header, pre-read summary, inline prize
   quiz): +2 coins per first read, +5 per quiz pass. Spend coins
   in the Shop (every item boosts payouts); check Profile + About.
6. Slide Reading level (Gentle/Steady/Clinical/Expert) in Profile — the live
   visit rewords on return, same right answers.
7. Cheer a colleague from any care note.
8. Chain straight correct picks for combo pay; finish a visit daily
   for the escalating streak bonus.

Judges' overlay: tap the COZY CLINIC header 5 times (visit wordmark or waiting wall sign), enter
the documented code `MABEL`, then `› DEMO` in the staff terminal for
this script plus the tooling table in-game.

## How it works

- **The Living Chart (signature mechanic).** Patient memory is the core loop:
  patients return, reference what happened last time, and respond differently
  because of it. The demo opens with a returning patient recognizing the player.
- **Pre-computed trajectories.** Patient futures are simulated *ahead of time*
  and stored (nodes = full patient states, edges = player decisions), so
  gameplay traverses already-reviewed futures instantly — no waiting on a live
  model mid-encounter, no mid-play improvisation. Rolling horizon: 2–3 depths
  ahead plus time-advance outcomes, extended as play advances.
- **The clinical engine is authoritative** (`src/clinical/`). Every option is
  engine-graded before it is shown — BEST / NOT GREAT / WRONG / DANGEROUS —
  and all model output passes schema validation plus the engine's veto.
  DANGEROUS choices never land: the game pauses with a rescue (what would have
  gone wrong and why) and returns the choice to the player.
- **Runtime AI path:** browser game → Supabase Edge Function → Meta Model API.
  The browser NEVER calls Meta directly and NEVER holds a model key.
- **Offline by design.** A fallback snapshot (20 patients, 340 nodes,
  48 tiered exam findings, 12 Learn topics) ships in
  `src/data/fallbackPack.ts`; live reads fall back to it seamlessly.

## Meta AI tooling

| Model / tool | What it does in this game | What breaks without it |
|---|---|---|
| Muse Spark (`muse-spark-1.3`) via Edge Functions | Trajectory seed/extend functions in `supabase/functions/` + live tiered greeting paraphrases at runtime (`muse-reword`, deployed, vetoed) | Stored futures + local greetings; the game runs fully on them with zero network |
| Muse Image (community `muse-image-mcp`, not Meta-official) | All character mascots, clinic backdrops, Learn-card headers | No finished look; placeholders instead |
| Built with Muse Code (Contributor tier) | The agentic build itself: game code, clinical modeling, art pipeline, tests | The documented craft story in `PROGRESS.md` |

No other Meta models are claimed: SAM segmentation was evaluated and
unavailable in-session, so sprites ship with programmatic key-out verified by
bbox/alpha checks instead (recorded in `art/manifest.json`).

## Built on Muse, runs on Muse

This entry is built *by* the Muse family and runs *on* it. Muse Code is the
build agent behind every system in this repo — game code, clinical modeling,
art pipeline, tests — with the multi-day reasoning, self-review, and recovery
from failures all logged in [`PROGRESS.md`](./PROGRESS.md). Muse Spark
simulates the patient futures, Muse Image drew the cast. Most entries use the
sponsor's models; this one was raised by them: the agentic build log is a
second demonstration of the model family, not just process documentation.

Simulation at this scale is only sustainable because of Contributor-tier
economics. Seeding a 20-patient persistent world with 340 pre-reviewed futures
costs cents, and gameplay traverses stored nodes instead of billing per
decision in the hot loop. Persistent patients with real branching futures —
the core of the game — are only possible because generation is this cheap.

## Current build

- **14 playable patients** (Mabel, June, Milo, Theo, Priya, Ellis, Nina,
  Kai, Ada, Felix, Hugo, Ivy, Leo, Ruby — each with a 6-expression set,
  per-patient visits and quotes) plus a waiting-room list with queue
  reorder; Milo opens onboarding as an existing-patient sick visit.
- **4-round quiz visits:** ask → examine → diagnose → treat, each round
  asking its question first (tier-worded Gentle/Steady/Clinical/Expert);
  endings praise the player with an N-of-4 score line, never claiming
  the patient better/worse.
- **12 conditions** as tested state transitions, sourced from the MSD
  Manual Professional Edition: asthma, sniffly cold (viral
  respiratory), dehydration, hypertension, strep throat, ear
  infection, eczema, pneumonia, croup, hand-foot-mouth disease,
  Lyme disease, appendicitis.
- **Living Chart** memory beads, **Learning List** (accumulating
  art-header cards, MedlinePlus-backed, +2 coins per first read, +5
  inline prize quiz each), **Clinic Shop** (Care Coins
  wallet, Tools/Medicines/Practice), **10-move undo**, exam tool trays,
  chart drawer, signout handoff, dev asset browser, **Profile** tab
  (preset doctor handle over the `players` table; shared-care
  live both ways — handoffs, team tags, preset cheers, loads live
  on open, offline outboxes).
- **Art:** Jolly-style 3D mascots on clean photorealistic clinic plates
  (8 backdrops, painted wall signs in waiting, UI wordmark in visit), Baloo 2 vendored offline;
  art law in [`ART_BIBLE.md`](./ART_BIBLE.md).
- **Quality gates:** full test suite green, `tsc` clean, production build
  green, programmatic layout audit at 0 findings, live deployment verified.

Docs map: [`docs/UI_PROTOTYPE.md`](./docs/UI_PROTOTYPE.md) (interface spec),
[`docs/CHARACTER_BIBLE.md`](./docs/CHARACTER_BIBLE.md),
[`docs/ANIMATION.md`](./docs/ANIMATION.md),
[`docs/AI_PROXY.md`](./docs/AI_PROXY.md) (Edge Function contract),
[`docs/PROGRESSION.md`](./docs/PROGRESSION.md) (economy),
[`docs/SCENARIO_PLAYBOOK.md`](./docs/SCENARIO_PLAYBOOK.md) (case authoring),
[`docs/DEMO_SCRIPT.md`](./docs/DEMO_SCRIPT.md) (judge demo path),
[`PROGRESS.md`](./PROGRESS.md) (build log).

---
*Last verified 2026-10-31 against `main` @ `RUN25HASH` (238/238 tests, build green,
live URL up).*
