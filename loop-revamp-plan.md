# Game-loop revamp: implementation plan

* Date: 2026-11-01. Status: drafted, awaiting readiness gate.
* Rollback point: tag `pre-loop-revamp-20261101` on `b2e4951`
  (tests green, 430 passed). Rollback is `git checkout
  pre-loop-revamp-20261101`. Untracked files are outside the tag
  and untouched: `src/data/maneuvers.ts` + test (exam-content
  work in progress, owned outside this task),
  `appstore-mechanics-notes.md` (brainstorm notes), `art/__pycache__/`
  (generated cache, never commit).
* Governing law: AGENTS.md (one phase per run, each phase ends with
  CHECKPOINT.md and STOP; production only when acceptance ticks;
  playtest each chunk at phone size; demo path fully offline).

## Goal

Shift the visit loop from quiz feel to care feel, where the fun
itself teaches. Keep graduated choices, the clinical engine veto,
and the Living Chart pitch. Ship nothing before feature freeze
(Nov 3, noon ET); this plan is a post-freeze roadmap.

## Decisions locked (from operator, 2026-11-01)

* D1 Daily Rituals leads. Resembles real practice. Game time runs
  faster than real time. New players get short gentle days, never
  a full realistic clinic day up front.
* D2 Branching patient stories confirmed. Multi-visit arcs played
  from the pre-simulated futures.
* D3 Async co-op handoffs confirmed. Preset notes, no free chat.
* D4 Patient meters yes, Sims-like no. Physical health and
  emotional health meters on the patient summary in the left tray.
* D5 Spiral review deferred. Not now.
* D6 Saga-style progress map yes (Duolingo/Candy shape, varied
  node types), drawn from completed cases.
* D7 Call a Consult is new: an expendable power-up (start with 1
  or 2) that summons a much stronger doctor to guide one choice.
  Bought with Care Coins, kept in inventory, sometimes awarded
  as a surprise.
* D8 Rule-out board deferred. Too hard to build yet.
* D9 Quiz feel drops through these mechanics, not by removing
  choices. Choice sets stay graduated per project law.

## Success Criteria

* A returning patient opens the demo with a follow-up shaped by
  the last visit, not a fresh quiz.
* A first-time player finishes day one in minutes and can name
  one thing their care changed.
* Every new mechanic teaches inside the play (see per-phase
  teaching checks). Anything that fails that check is cut.
* Demo path still completes fully offline. No new network
  dependency on the demo path.
* All existing tests keep passing; each phase adds tests for its
  new transitions.

## Approach

Six phases, strict order, one phase per run. Each phase: declare
file ownership in PROGRESS.md, build, unit-test new rules,
playtest at phone size on a preview URL first, then CHECKPOINT.md
and STOP. Production only when that phase's acceptance ticks.

### P1 Daily Rituals core (first: reshapes feel fastest)

* Game-day clock, faster than real time. Morning/afternoon/evening
  beats; follow-up slots between new visits.
* Follow-up visit type: one open clinical question carried from
  the last visit, greeting drawn from memory.
* Gentle onboarding ramp: day one is two short visits, then the
  day opens up. New players never face a full clinic day first.
* Surfaces: `src/game/visit.ts` (new follow-up shape),
  `src/game/memory.ts` (extend VisitMemory: last open question,
  last choice; version the persisted map, migrate old saves),
  `src/scenes/ClinicScene.ts` (day beats), `src/game/career.ts`
  if day length ties to career.
* Teaching check: the player must use last visit's outcome to
  handle this visit.
* Acceptance: demo opens on a returning patient; day-one session
  completes in minutes; old saves migrate without loss.

### P2 Branching stories surfacing

* Futures engine output shown as living arcs: what past choices
  set in motion, what visit three may bring.
* Surfaces: `src/clinical/engine.ts` (read-only surfacing),
  `src/ui/livingChart.ts`, `src/ui/chartDrawer.ts`,
  `src/data/fallbackPack.ts` (offline arcs).
* Teaching check: the player can say what their last choice caused.
* Acceptance: one condition shows a full three-visit arc offline;
  branch budget per condition written down and held.

### P3 Call a Consult

* New consumable inventory (counts, not own-once): start with 1-2,
  buy more with coins, occasional surprise awards.
* Using one summons a senior doctor who narrows the round to the
  strong pick and says why in one plain line. The why is the
  teaching; the pick alone would be a cheat button.
* Surfaces: new `src/game/consults.ts` (pure rules + tests),
  `src/game/economy.ts` (spend reason `spend:consult`),
  `src/game/shop.ts` + `src/ui/shopSheet.ts` (catalog entry;
  note: shop buys are own-once today, consults need counts),
  `src/scenes/ClinicScene.ts` (round wiring).
* Teaching check: after a consult, the player can repeat the why.
* Acceptance: buy, hold, spend, and award paths all work offline;
  wallet ledger stays balanced; no consult on the demo path
  unless the demo script calls for it.

### P4 Patient meters in the left tray

* Physical health and emotional health meters on the patient
  summary. Choices move them; the scene reads them for endings
  copy (congratulate the player, never claim the patient state
  as fact beyond the meter).
* Surface: verify first (candidates `src/ui/chartDrawer.ts`,
  `src/ui/livingChart.ts`); wire through `ClinicScene.ts`.
* Teaching check: the player adjusts a rushed pick after seeing
  trust slide.
* Acceptance: meters render at phone size, readable next to the
  summary; color never the only signal (icons + words for kids).

### P5 Saga progress map

* Duolingo/Candy shape: a path of case nodes, varied node types
  (new visit, follow-up, consult-allowed, team case), each
  completed node unlocking the next.
* Surfaces: new map UI module under `src/ui/`, reads
  `src/game/career.ts` + memory for progress.
* Teaching check: node variety maps to skill variety (asking,
  examining, follow-through), not reskins of one quiz.
* Acceptance: full path completable offline; progress persists
  across sessions.

### P6 Async co-op (last: infra-heavy)

* Cover a teammate's patient for one visit, leave a preset
  handoff note, receive the outcome. Teams by tags, preset
  encouragements only.
* Surfaces: `src/data/sharedCare.ts`, `src/ui/handoffSheet.ts`,
  `supabase/` (sync + `coin_ledger` if payouts cross players),
  offline queue for the demo path.
* Teaching check: a handoff note must change what the covering
  player does.
* Acceptance: full co-op round trip with one partner; offline
  demo unaffected when sync is down (degraded state shown
  honestly in UI, never silent zeros).

## Validation Plan

* Every phase: `npm test` (vitest, today 430 passed), `npx tsc
  --noEmit` via `npm run build`, plus new unit tests for each new
  rule and transition. No phase merges while any test is red.
* Every chunk: commit, push, Vercel preview deploy, open the URL,
  playtest at phone size. Production only when acceptance ticks.
* Offline check per phase: airplane-mode run of the demo path.
* Feel check per phase: one patient, one visit, judged on care
  feel versus quiz feel.

## Risks / Open Questions

* Scope versus team size: six phases with authored arcs (P2) and
  backend sync (P6) is heavy. Cut order if needed: P6, then P5,
  then P2 scope (fewer arcs). Never cut P1.
* Memory migration: extending VisitMemory must version and
  migrate old saves; the shape guard exists for this.
* Untracked `maneuvers.ts` WIP sits outside the checkpoint. Its
  owner must commit or coordinate before any phase touches exam
  content.
* Consult tuning: a consult that hands over the pick without the
  why becomes a skip button. The why-line is load-bearing.
* Assumption: patient summary surface named in P4 needs one
  verification read before P4 starts.
* Freeze: nothing here ships before Nov 3 noon ET. If the
  operator wants any slice earlier, say which slice and the plan
  gets re-cut around it.

## Non-goals

* Spiral review and rule-out board: deferred by operator decision.
* Free chat, live multiplayer, ranked ladders, timers, energy:
  excluded by project law and the mapping rejects.
* Case-authoring tools and UGC: non-goal.
