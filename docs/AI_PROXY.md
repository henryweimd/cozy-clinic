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
