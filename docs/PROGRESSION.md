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
