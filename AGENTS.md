# AGENTS.md — Little Lives: Cozy Clinic (public project rules)

> Loaded automatically by Muse Code in every session. This is the
> public version kept in the shared repo; private studio rules
> (budget law, internal tooling) live outside this repo.

## Project

Little Lives: Cozy Clinic — mobile-first 2.5D medical simulation game
(Phaser + TypeScript + Vite, browser) for the Meta AI Developer
Hackathon, Indie track. Fictional characters, real medical
conditions, graduated choice sets (2–3 early, up to 4–5 later),
no chatbot, no free-text
clinical input, persistent patients, shared care with handoff
notes, imperfect AI colleague doctors, teams by tags, preset
encouragements (no free chat). Audience: anyone curious about
caring for patients, kids and adults. Care Coins progression data model from the
start; full economy later. Educational simulation only —
never a medical advice or diagnostic tool, never real patient data.

## Pitch

A cozy clinic game where patients remember you. The signature
mechanic is the Living Chart — persistent patient memory across
encounters and clinicians. The demo opens with a returning patient.
Patients' futures are simulated ahead of time and stored, so
gameplay traverses real, reviewed futures instantly: the fun is
living through consequences.
Every feature must serve the pitch or it is cut.

## Art law

- Clean, cozy design language: soft sculpted plush forms, cream base,
  small dark bead eyes, pink blush cheeks, simple gentle smile, one
  thin warm-brown outline, matte texture, restrained pastel palette,
  generous negative space. Original characters only — never copy a
  protected character.
- Every image prompt carries the fixed style block from the project
  brief, verbatim, and every character generation carries that
  character's master reference. Key poses only from the image model;
  animation is built in code (modest motion: idle bob, blink,
  4-frame walk, one-bounce happy).
- No asset enters the game unless it matches `ART_BIBLE.md` and its
  master reference, and has passed validation (transparency,
  dimensions, alignment, contact sheet, in-game render check).

## Workflow law

- One worktree per parallel workstream; merges go through the main
  agent only. No two agents write the same file concurrently; file
  ownership is declared in `PROGRESS.md` before work starts.
- One phase per run. Every phase ends with `CHECKPOINT.md` (phase,
  files changed, test result, deployment URL, playtest result) and a
  STOP.
- After every milestone, run the improvement loop: playtest the
  deployed build, rank defects by player impact, fix the top batch,
  redeploy, re-playtest. The loop polishes; it never adds features
  after freeze.
- MVP feel gate: after Milestone 1, the operator playtests the
  deployed build on a phone; Milestone 2 does not start until the
  operator confirms cute, friendly, inviting feel.
- Every chunk ends deployed and playtested: commit, push, Vercel
  deploy, open the deployment URL, playtest at phone size.
  Production (`main`) only when acceptance criteria tick; risky work
  playtests on preview URLs first.
- A task that fails the same way 3 times stops: record failure,
  evidence, and next hypothesis, then move on.
- A phase that fails its acceptance criteria does not merge and does
  not deploy to production.
- `PROGRESS.md` always states what is done, what is not, and what is
  next. Never conceal unfinished work. Never claim live multiplayer,
  AI-generated assets, or Muse integration beyond what actually
  exists and was playtested.
- Secrets live in environment variables only, never in the repo.

## Engineering law

- The clinical engine is authoritative; all model output passes
  schema validation and the engine's veto. Runtime AI calls go
  through a server-side proxy; the browser never holds a model key.
- Discover real capabilities before assigning tasks. Never invent a
  tool, API, or contract.
- Tests cover every condition's state transitions. A milestone is not
  done until its acceptance criteria tick.
- The demo path must complete fully offline (local fallback dataset).
  Feature freeze Nov 3, noon ET; after that, demo, video, README,
  and submission only.
