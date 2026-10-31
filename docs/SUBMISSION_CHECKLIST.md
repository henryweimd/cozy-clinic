# SUBMISSION_CHECKLIST.md — Meta AI Developer Hackathon, Indie track

> Freeze: **Nov 3, noon ET** (feature freeze — after that, demo,
> video, README, submission only). Judging: **Nov 4–8**.
> Track judging rewards creativity, technical ambition, and
> whether it works. Owner: operator, unless marked agent.

## Done (agent, verified on `main`, production live)

- [x] Branch preview green every run; live build at
  <https://cozy-clinic.vercel.app/> (200 on `main`; offline
  fallback plays the full demo path on both)
- [x] 28 conditions × 4-round visits (24 MSD + 4 MedlinePlus
  gut); 30 playable patients with 6-expression sprite sets
  (419/419 tests, `tsc` clean, layout auditor 0 findings,
  build green)
- [x] Living Chart persistence, shared care (handoffs/cheers),
  Learn cards with prize quizzes, Shop economy, 10-move undo,
  4 reading tiers, streaks/combos, About repo link + date
- [x] Trial path + Peptide Lab: consent → live/cached 4-stage
  pipeline → result → back; `knottin-design` proxy DEPLOYED
  and live-verified (fresh design in 51s; secret promoted
  Vault → function secret by agent)
- [x] Runtime Muse path: `muse-reword` Edge Function (server-side
  key, engine veto); seed/extend functions in repo
- [x] README current (419 tests, 36/612 fallback, lab + tooling
  rows); demo script in-repo + in-game (`› DEMO`, lab beat)
- [x] No secrets in repo (`.env` local-only; model key in
  Supabase secrets as `META_API_KEY`, peptide key as
  `COZY_PEPTIDE_KEY`)
- [x] Merge-ready: branch fast-forwards onto `main`
  (zero-conflict); merge call recorded below

## Operator-only (needs a human)

- [x] **Merge call**: operator said push it — fast-forwarded
  to `main` @ `bca75d6`, production verified serving the new
  bundle ("Exam Room" markers live).
- [x] **Proxy deploy**: done by agent (CLI + secret
  promotion + live verify) — no operator action needed.
- [ ] **Medical review pen**: runs 20–32 content is DRAFT —
  all 28 conditions' history/exam/dx/treat + Learn summaries
  (24 MSD + 4 MedlinePlus gut) + trial grades. Nothing ships
  as final without this.
- [ ] **Firsthand README paragraph**: the operator's
  domain paragraph (placeholder in README) — needs approval.
- [ ] **Demo video** (2 min): record [DEMO_SCRIPT.md](./DEMO_SCRIPT.md)
  on a phone at the live URL; capture Bram visit + Nina
  contrast + Learn card + Peptide Lab + arch page.
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
