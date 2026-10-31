# SUBMISSION_CHECKLIST.md — Meta AI Developer Hackathon, Indie track

> Freeze: **Nov 3, noon ET** (feature freeze — after that, demo,
> video, README, submission only). Judging: **Nov 4–8**.
> Track judging rewards creativity, technical ambition, and
> whether it works. Owner: operator, unless marked agent.

## Done (agent, verified on `main`)

- [x] Live build at <https://cozy-clinic.vercel.app/> (200, fresh
  bundle each run; offline fallback plays the full demo path)
- [x] 24 MSD-sourced conditions × 4-round visits; 26 playable
  patients with 6-expression sprite sets (368/368 tests, `tsc`
  clean, layout auditor 0 findings, build green)
- [x] Living Chart persistence, shared care (handoffs/cheers),
  Learn cards with prize quizzes, Shop economy, 10-move undo,
  4 reading tiers, streaks/combos
- [x] Runtime Muse path: `muse-reword` Edge Function (server-side
  key, engine veto); seed/extend functions in repo
- [x] README current (368 tests, 4 rounds, 26 patients, honest
  tooling table); demo script in-repo + in-game (`› DEMO`)
- [x] No secrets in repo (`.env` local-only; model key in
  Supabase secrets as `META_API_KEY`)

## Operator-only (needs a human)

- [ ] **Medical review pen**: runs 20–28 content is DRAFT —
  all 24 conditions' history/exam/dx/treat + Learn summaries.
  Nothing ships as final without this.
- [ ] **Firsthand README paragraph**: the operator's
  domain paragraph (placeholder in README) — needs approval.
- [ ] **Demo video** (2 min): record [DEMO_SCRIPT.md](./DEMO_SCRIPT.md)
  on a phone at the live URL; capture Bram visit + Nina
  contrast + Learn card + arch page.
- [ ] **Screenshots**: visit round, Learn card, Profile, waiting —
  from the live build, phone size.
- [ ] **Submission form**: title, tagline, live URL, video URL,
  track (Indie), Muse usage description (README § Meta AI
  tooling is the source of truth — copy it, don't paraphrase).
- [ ] **Vercel env check**: `VITE_SUPABASE_URL` +
  `VITE_SUPABASE_ANON_KEY` set on production (else silent
  fallback — playable, but judges should see live shared care).

## Agent can still do (say the word)

- [ ] Freeze-time final pass: re-run full suite + auditor, fresh
  live confirm, tag the submission commit.
- [ ] Any operator playtest fixes (top batch only after freeze).
- [ ] Copy tweaks from medical review (mechanical edits).
