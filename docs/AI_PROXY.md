# AI Proxy Contract — Edge Function `encounter` (Milestone 3 wires it)

This phase records the contract only. The live Edge Function call is
**not implemented** in this phase — `MockAIProvider` is the provider in
use, and the demo path completes fully offline.

## Path

Browser game → Supabase Edge Function → Meta Model API.
The browser NEVER calls Meta directly and NEVER holds a model key.

## Function

- Name: `encounter`
- Secret: reads its key from the Supabase secret `META_API_KEY`
  (server-side only; never in browser code, repo files, or Vercel env).
- Model: Muse Spark (`muse-spark-1.3`).

## Request (structured game state only — never free text)

Built server-side from validated fields: patient identity, personality,
condition id, stage, vitals (0–10), visit number, previous choice labels.
No free-text clinical input in either direction, ever.

## Response (intro + graduated choice set)

- `intro`: short encounter beat for the current patient state.
- `choices`: 2–3 choices early (Tier 1), up to 4–5 in later tiers
  (brief Section 2C); each carries an engine-assigned grade
  (BEST / NOT_GREAT / WRONG / DANGEROUS).

## Guarantees on every response

1. **Schema validation** — shape checked before anything renders
   (see `validateEncounterResponse` in `src/ai/provider.ts`).
2. **Engine veto** — choices must be clinically valid for the patient's
   state; the clinical engine's `vetoEdge` rejects anything incoherent
   (stages in order, vitals clamped, DANGEROUS never applied).
3. **Fallback** — invalid output is discarded and regenerated once, then
   the deterministic fallback fills in. Any failure falls back to
   `MockAIProvider`, so the game always runs.

## What this phase does NOT do

No live fetch exists in `src/ai/` yet. Endpoint URLs, auth headers, and
deploy steps for the function belong to Milestone 3, which will record
the real contract version from Meta's docs before implementing.

## H2 LIVE (2026-10-29): seed-patients + extend-trajectory

The real Meta contract, recorded from dev.meta.ai/docs before
implementing: `POST https://api.meta.ai/v1/chat/completions`,
`Authorization: Bearer <META_API_KEY>`, OpenAI-compatible JSON,
model `muse-spark-1.3`, `response_format: { type: 'json_object' }`.

- `seed-patients` (deployed, verify_jwt on): caller sends roster +
  engine-computed tree STRUCTURE (stages/vitals/moods/grades/
  edges); the model authors ONLY per-node flesh (narrative +
  teaching). One patient per call (multi-patient calls hit
  WORKER_RESOURCE_LIMIT). Veto: missing/empty flesh falls back
  to engine copy per node; dangling edges dropped; model never
  touches structure.
- `extend-trajectory` (deployed, verify_jwt on): same law for
  growing one tree forward (`patientId` + `fromNodeId` +
  engine-computed children) after a visit.
- Secrets: `META_API_KEY` + auto-injected `SUPABASE_URL` /
  `SUPABASE_SERVICE_ROLE_KEY`, server-side only. RLS: anon
  SELECT on all 6 tables (synthetic data), writes via functions.
- Audit: `supabase/seed/audit-h2.md` (0/204 vetoes). Offline
  snapshot: `src/data/fallbackPack.ts` (+ shape tests).

## PROXY RUN (2026-10-30): muse-reword

- `muse-reword` (deployed, verify_jwt on): runtime paraphrase of
  visit greetings at the live reading level. Source of truth:
  `supabase/functions/muse-reword/index.ts` (deployed via CLI —
  the MCP token lacks `edge_functions_write`).
- Request: `{ text (≤500), tier, keep (≤8 terms), context }`.
  The model rewords ONLY: vetoed server-side (shape, length,
  kept terms verbatim, one line, no markup, no new medical
  claims). Any failure echoes the input with `fallback: true`.
- Model notes (recorded from live debugging): Muse always
  reasons and bills it against `max_tokens` — the first builds
  died with `finish_reason: length` and null content. Fix:
  `reasoning_effort: "minimal"` + `max_tokens: 2048`.
- Client: `src/game/reword.ts` (shape guard + 8s timeout; any
  failure resolves local with `live: false`). The scene
  pre-warms one variant per patient:tier in the background and
  shows it on a LATER visit — local shows instantly, never a
  mid-read swap. The ticker notes liveness once; grades never
  depend on this output.
