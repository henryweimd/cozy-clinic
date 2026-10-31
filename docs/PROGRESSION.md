# Progression Data Model (schema sketch — economy is a later iteration)

Milestones 1–3 implement **schema + accrual counters only**. The full shop,
pricing, and balance tuning come later and must never delay the playable core.
In-game currency only; no real-money purchases in hackathon scope.

## Currencies & XP

- **Care Coins** (`coins` for short): earned from completed encounters and
  patient recoveries. Spent on staff, equipment, rooms (later iteration).
- **XP / level**: per-player-doctor growth. Unlocks harder tiers by
  *timeline progress* (completed encounters), never by grinding coins.

## Entities (future Supabase tables, Milestone 3+)

| Entity | Key fields | Notes |
|---|---|---|
| `doctor_profile` | id, handle/tag, xp, level, coins | One row per player doctor |
| `staff` | id, role (nurse/doctor), skill rating, cost, hired flag | NPC doctors + nurses |
| `equipment` | id, kind, room, effect, cost, owned flag | Better tools gate harder cases |
| `credentials` | id, name, unlock rule | Unlock gates for tiers (2C) and tools |
| `coin_ledger` | id, doctor id, amount, reason, encounter id | Append-only accrual log |

## Accrual rules (sketch)

- Completed encounter: +coins by tier (T1 < T2 < T3), scaled by outcome
  (BEST > NOT_GREAT > WRONG; rescues still pay a small kindness wage).
- Full patient recovery: bonus + timeline progress toward the next tier.
- First unlock path (default): **hire a nurse**. The operator may swap it.

## Unlock gates

- Tier 2 opens after N Tier-1 timeline completions; Tier 3 after M Tier-2.
- Equipment/credentials gate specific harder cases and better tools.
- Hoot's scaffolding fades as tiers rise (hints early, rescue-only later).

Nothing here is enforced in code yet — this file is the contract the
Milestone 3 schema migration will implement.

## LIVE (run 43): career ranks + loop nudges

Shipped in `src/game/career.ts` (pure + tested), persisted
locally (`cozy-career-v1`); the `doctor_profile` row waits.

- **Rank XP**: +1 per **recovered** visit (dx + tx right);
  struggling visits earn zero — wrong scenarios never
  advance you.
- **Ranks**: Pre-Med (0), Medical Student (2), Intern (5),
  Resident (9), Fellow (14), Attending (20). Shown on the
  exam-room chip (`Lv N · short`) + the Profile identity
  card; full title in the level-up toast.
- **Level-up**: +10 Care Coins (`earn:level-up`, inside the
  visit's earnings line) + fanfare + toast over the ending
  modal. Recovered-but-same-rank coins the moment; perfect
  keeps its single fanfare.
- **Affordability nudge**: when a visit's earnings unlock a
  first shop item, one toast names it; the Profile coin
  card carries an amber dot while anything is in reach.
- **Acquisition joy**: purchases coin (gear) or fanfare
  (Nurse Birch, the first hire).
