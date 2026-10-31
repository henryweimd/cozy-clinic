# CHECKPOINT — Run 32: knottin-lab content pack (2026-11-01)

Phase: gut content pack + trial scaffolding on
`feat/knottin-lab`. First of the knottin batch; `main`
untouched (still run 31, still shippable for freeze).

Files changed: types, conditions (+4 defs), fallbackPack
(+4/+68/+64/+5/+4/+16) + test counts, mockData, sprites,
ClinicScene (Speaker/guard/headers/trial toast), aboutSheet
(roll-call cap), art pipeline + manifest + 24 sprites +
4 headers + 5 plates, Supabase rows, bible, playbook,
PROGRESS, CHECKPOINT.

Test result: auditor 0 findings; `npm test` 408/408; tsc
clean; build green; Supabase 36/612/576/28/112/29,
0 dangling.

Deployment URL: branch preview (see push output); prod
`https://cozy-clinic.vercel.app/` unchanged on main.

Playtest result: NOT operator-playtested — programmatic
verification only. Operator owes: medical pen (all 4 new
conditions DRAFT), trial-grade review, preview playtest.

Image spend this run: $0.35 (ledger ~$2.62 cumulative,
STOP at $120).

STOP.

# CHECKPOINT — Run 31: submission prep (2026-11-01)

Phase: agent-side submission truth (counts only). Last of
operator's 4-phase batch.

Files changed: 5 (SUBMISSION_CHECKLIST, DEMO_SCRIPT,
README, PROGRESS, CHECKPOINT). Docs-only commit on main.

Test result: auditor 0 findings; `npm test` 368/368; tsc
clean; build green (pre-commit state; docs-only change).

Deployment URL: `https://cozy-clinic.vercel.app/` (unchanged
bundle; live 200 confirmed in run 30).

Playtest result: NOT operator-playtested — programmatic
verification only.

Image spend this run: $0 (ledger ~$2.27 cumulative, STOP at $120).

STOP.

# CHECKPOINT — Run 30: hardening (2026-11-01)

Phase: network hardening — abort timeouts everywhere.
Third of operator's 4-phase batch.

Files changed: 8 (net+test new; patients, sharedCare,
examFindings + tests). Commit `68b5838` on main.

Test result: auditor 0 findings; `npm test` 368/368; tsc
clean; build green.

Deployment URL: `https://cozy-clinic.vercel.app/` (live-polled
200 after push).

Playtest result: NOT operator-playtested this run —
programmatic verification only.

Image spend this run: $0 (ledger ~$2.27 cumulative, STOP at $120).

STOP.

# CHECKPOINT — Run 29: judging-rubric loop (2026-11-01)

Phase: judging-surface honesty (Indie rubric). Second of
operator's 4-phase batch.

Files changed: 2 (ClinicScene DEMO step, PROGRESS).
Commit `159578d` on main. Auditor E10/E11 cleaned (scratch).

Test result: auditor 0 findings; `npm test` 358/358; tsc
clean; build green.

Deployment URL: `https://cozy-clinic.vercel.app/` (live-polled
200 after push).

Playtest result: NOT operator-playtested this run —
programmatic verification only.

Image spend this run: $0 (ledger ~$2.27 cumulative, STOP at $120).

STOP.

# CHECKPOINT — Run 28: content pack 5 (2026-11-01)

Phase: 4 MSD-grounded conditions (chickenpox, UTI, stye,
nosebleed) + Poppy/Maya/Eli/Max via SCENARIO_PLAYBOOK
pipeline. First of operator's 4-phase batch.

Files changed: 47 (types, conditions, fallbackPack+tests,
mockData, sprites, ClinicScene Speaker/guard/preload,
aboutSheet cast, CHARACTER_BIBLE, playbook §1, manifest,
process_character, contact sheets x5, 24 sprites, 4 headers,
README/docs counts, PROGRESS). Commit `456aa5c` on main.

Test result: auditor 0 findings (pins 20→24); `npm test`
358/358; tsc clean; build green. Supabase: 32/544/512,
resources 24, findings 96, treatments 24, 0 dangling.

Deployment URL: `https://cozy-clinic.vercel.app/` (live-polled
200 + new assets 200 after push).

Playtest result: NOT operator-playtested this run —
programmatic verification only.

Image spend this run: $0.28 (ledger ~$2.27 cumulative, STOP at $120).

STOP.

# CHECKPOINT — Run 27: content pack 4 (2026-11-01)

Phase: 4 MSD-grounded conditions (hay fever, ringworm,
pink eye, ankle sprain) + Willow/Jasper/Hazel/Finn via
SCENARIO_PLAYBOOK pipeline, per operator sleep-shift
go-ahead. Plus: guided-tour removal (`a569894`).

Files changed: 47 (types, conditions, fallbackPack+tests,
mockData, sprites, ClinicScene Speaker/guard/preload,
aboutSheet cast, CHARACTER_BIBLE, playbook §1, manifest,
process_character, contact sheets x5, 24 sprites, 4 headers,
README/docs counts, PROGRESS). Commit `26be4f8` on main.

Test result: auditor 0 findings (pins 16→20, regex fix);
`npm test` 318/318; tsc clean; build green. Supabase:
28/476/448, resources 20, findings 80, treatments 20,
0 dangling.

Deployment URL: `https://cozy-clinic.vercel.app/` (live-polled
200 + new assets 200 after push).

Playtest result: NOT operator-playtested this run —
programmatic verification only.

Image spend this run: $0.28 (ledger ~$1.99 cumulative, STOP at $120).

STOP.

# CHECKPOINT — Run 26: content pack 3 (2026-10-31)

Phase: 4 reverse-mimicker conditions (swimmer's ear, mono,
nose-bead, gastroenteritis) + Otto/Cleo/Remy/Willa via
SCENARIO_PLAYBOOK pipeline, MSD-grounded, per operator
pack-3 go-ahead.

Files changed: 47 (types, conditions, fallbackPack+tests,
mockData, sprites, ClinicScene Speaker/guard/preload,
aboutSheet cast, CHARACTER_BIBLE, playbook §1, manifest,
process_character, contact sheets x5, 24 sprites, 4 headers,
README/docs counts, PROGRESS). Commit `1af42b8` on main.

Test result: auditor 0 findings (pins 12→16); `npm test`
278/278; tsc clean; build green. Supabase: 24/408/384,
resources 16, findings 64, treatments 16, 0 dangling.

Deployment URL: `https://cozy-clinic.vercel.app/` (live-polled
200 + new assets 200 after push).

Playtest result: NOT operator-playtested this run —
programmatic verification only.

Image spend this run: $0.29 (ledger ~$1.71 cumulative, STOP at $120).

STOP.

# CHECKPOINT — Run 3: hook, rewind, prizes, tiers, pearls, loops (2026-10-30)

Phase: plan list (hook, undo UI, prize quizzes) + autonomous
Muse/delight loop (tiers, pearls, retention) per operator
"keep moving along your plan."

Files: hints(+test), undo(+test), learnList(+test),
fallbackPack(+test), economy, conditions(+test, new),
types, visit(+test), streak(+test, new), ClinicScene, README.

Test result: auditor 0 findings; `npm test` 131/131 (17
files); tsc clean; build green. Supabase:
learning_resources.quiz 4/4 backfilled.

Deployment URL: `https://cozy-clinic.vercel.app/` (live-polled
200 after every push — 6 chunks).

Playtest result: NOT operator-playtested this run —
programmatic verification only (operator: playtest acceptable
through run 2; coin icon still unloved but parked).

Image spend this run: $0 (ledger ~$0.74 cumulative, STOP at $120).

STOP.

## Run 6 — tiers-4 (2026-10-30)

Phase: 4 reading levels (Gentle/Steady/Clinical/Expert) + Profile
slider UI + exam_findings.finding_clinical migration.

Files changed: 16 (mockData, types, conditions, visit,
sharedCare, examFindings, fallbackPack, signout + tests,
ClinicScene, README). Commit `0e116ec` on main.

Test result: auditor 0 findings; `npm test` 138/138 (18
files); tsc clean; build green. Supabase:
exam_findings.finding_clinical 16/16.

Deployment URL: `https://cozy-clinic.vercel.app/` (live-polled
200 with fresh bundle after push).

Playtest result: NOT operator-playtested this run —
programmatic verification only (operator: playtest acceptable
through run 5; coin icon still unloved but parked).

Image spend this run: $0 (ledger ~$0.74 cumulative, STOP at $120).

STOP.

## Run 7 — proxy (2026-10-30)

Phase: live muse-reword Edge Function + greeting pre-warm
client + ticker/terminal transparency.

Files changed: 6 (function source, reword client + test,
ClinicScene, ticker, AI_PROXY). Commit `1124d17` on main.

Test result: auditor 0 findings; `npm test` 143/143 (19
files); tsc clean; build green. Live curl: gentle + expert
paraphrases, fallback:false, veto holding.

Deployment URL: `https://cozy-clinic.vercel.app/` (live-polled
200 with fresh bundle after push).

Playtest result: NOT operator-playtested this run —
programmatic verification only (operator: playtest acceptable
through run 5; coin icon still unloved but parked).

Image spend this run: $0 (ledger ~$0.74 cumulative, STOP at $120).

STOP.

## Run 8 — loop-coin (2026-10-30)

Phase: metallic Care Coin icon at Profile + Shop + result.

Files changed: 3 (coin.ts new, shopSheet, ClinicScene).
Commit `d7da59d` on main.

Test result: auditor 0 findings; `npm test` 143/143 (19
files); tsc clean; build green.

Deployment URL: `https://cozy-clinic.vercel.app/` (live-polled
200 with fresh bundle after push).

Playtest result: NOT operator-playtested this run —
programmatic verification only.

Image spend this run: $0 (ledger ~$0.74 cumulative, STOP at $120).

STOP.

## Run 9 — loop-docs (2026-10-30)

Phase: coin design-lock test + README freshness + live-bundle
wiring proof.

Files changed: 2 (coin.test.ts new, README). Commit `779ba1f`
on main (+ docs commit).

Test result: auditor 0 findings; `npm test` 145/145 (20
files); tsc clean; build green. Live bundle verified to carry
Supabase env + both function paths.

Deployment URL: `https://cozy-clinic.vercel.app/` (live-polled
200 with fresh bundle after push).

Playtest result: NOT operator-playtested this run —
programmatic verification only.

Image spend this run: $0 (ledger ~$0.74 cumulative, STOP at $120).

STOP.

## Run 10 — profile-panels (2026-10-30)

Phase: Profile rows -> identity cards + panels; About row ->
full About page.

Files changed: 7 (ClinicScene, icons + test replace coin.*,
shopSheet import, aboutSheet). Commits `513b860` + docs on main.

Test result: auditor 0 findings; `npm test` 146/146 (20
files); tsc clean; build green.

Deployment URL: `https://cozy-clinic.vercel.app/` (live-polled
200 with fresh bundle after push).

Playtest result: NOT operator-playtested this run —
programmatic verification only.

Image spend this run: $0 (ledger ~$0.74 cumulative, STOP at $120).

STOP.

## Run 11 — harden (2026-10-30)

Phase: pre-freeze verification pass (no product changes).

Files changed: docs only (PROGRESS + CHECKPOINT).

Test result: auditor 0 findings; `npm test` 146/146 (20
files); tsc clean; build green. RLS, links (4/4), plates
(7/7), proxy (live), and bundle wiring all re-proven.

Deployment URL: `https://cozy-clinic.vercel.app/` (live-polled
200; bundle hash `B5Iv8z7Y` carries Supabase + functions).

Playtest result: operator playtest still pending — this run is
programmatic verification only.

Image spend this run: $0 (ledger ~$0.74 cumulative, STOP at $120).

STOP.

## Run 12 — sign-swap (2026-10-30)

Phase: exam-b depainted; UI wordmark header in visit.

Files changed: 4 (exam-b plate, ClinicScene, README,
manifest). Commit `713f865` on main.

Test result: auditor 0 findings; `npm test` 146/146 (20
files); tsc clean; build green.

Deployment URL: `https://cozy-clinic.vercel.app/` (live-polled
200 with fresh bundle after push).

Playtest result: NOT operator-playtested this run —
programmatic verification only.

Image spend this run: $0 (ledger ~$0.74 cumulative, STOP at $120).

STOP.

## Run 13 — profile2 (2026-10-30)

Phase: full-screen Profile, team badge, panel lockups, editor
insets, font bumps.

Files changed: 4 (ClinicScene, icons + test, profileEditor).
Commit `3dbe0c2` on main.

Test result: auditor 0 findings; `npm test` 148/148 (20
files); tsc clean; build green.

Deployment URL: `https://cozy-clinic.vercel.app/` (live-polled
200 with fresh bundle after push).

Playtest result: NOT operator-playtested this run —
programmatic verification only.

Image spend this run: $0 (ledger ~$0.74 cumulative, STOP at $120).

STOP.

## Run 14 — webapp (2026-10-30)

Phase: canvas centering, PWA installability, reduced motion.

Files changed: 6 (index.html, manifest, 3 icons, ClinicScene).
Commit `f5548ef` on main.

Test result: auditor 0 findings; `npm test` 148/148 (20
files); tsc clean; build green.

Deployment URL: `https://cozy-clinic.vercel.app/` (live-polled
200; manifest + icons re-polled 200 after push).

Playtest result: NOT operator-playtested this run —
programmatic verification only.

Image spend this run: $0 (ledger ~$0.74 cumulative, STOP at $120).

STOP.

## Run 15 — undo-home + ticklive (2026-10-30)

Phase: undo pill off visit into Profile bottom card; live-AI
ribbon narration.

Files changed: 4 (ClinicScene, reword + test, ticker).
Commits `7f5e059` + `56a61d1` on main.

Test result: auditor 0 findings; `npm test` 148/148 (20
files); tsc clean; build green.

Deployment URL: `https://cozy-clinic.vercel.app/` (live-polled
200 with fresh bundle after push).

Playtest result: NOT operator-playtested this run —
programmatic verification only.

Image spend this run: $0 (ledger ~$0.74 cumulative, STOP at $120).

STOP.

## Run 16 — judges-arch (2026-10-30)

Phase: live architecture readout + demo RESET for judges.

Files changed: 1 (ClinicScene). Commit `bcc7d91` on main.

Test result: auditor 0 findings; `npm test` 148/148 (20
files); tsc clean; build green.

Deployment URL: `https://cozy-clinic.vercel.app/` (live-polled
200 with fresh bundle after push).

Playtest result: NOT operator-playtested this run —
programmatic verification only.

Image spend this run: $0 (ledger ~$0.74 cumulative, STOP at $120).

STOP.

## Run 17 — alive (2026-10-30)

Phase: memory beats, skippable onboard, waiting-2, Mabel held.

Files changed: 5 (memory + test, mockData + test, ClinicScene).
Commit `7ec7339` on main.

Test result: auditor 0 findings; `npm test` 153/153 (21
files); tsc clean; build green.

Deployment URL: `https://cozy-clinic.vercel.app/` (live-polled
200 with fresh bundle after push).

Playtest result: NOT operator-playtested this run —
programmatic verification only.

Image spend this run: $0 (ledger ~$0.74 cumulative, STOP at $120).

STOP.

## Run 19 — learncard: art headers + inline quiz + coin pill (2026-10-30)

Phase: learning-list card overhaul per operator — Meta Image art
header per condition, quiz inline at card bottom, prize as coin
icon +5 pill (no "Quiz" wording in rows).

Files: learnList(+test), ClinicScene (art preload), 4 new
public/assets/learn/*.png + contact sheet, ART_BIBLE (Block U
locked), art/manifest.

Test result: auditor 0 findings; `npm test` 154/154; tsc
clean; build green; live 200 + art 200 (bundle D8uW9PZM).

Playtest result: NOT operator-playtested — programmatic only.

Image spend this run: $0.04 (ledger ~$0.85 cumulative — note:
manifest ledger was $0.81, supersedes $0.74 in older CHECKPOINT
notes; STOP at $120).

STOP.

## Run 20 — content pack: 4 conditions + patients + art (2026-10-30)

Phase: operator-ordered new conditions/patients/trajectories/art
(strep-throat, ear-infection, eczema, pneumonia; Nina/Kai/Ada/
Felix). All content DRAFT pending operator medical review.

Files: types, conditions, fallbackPack(+test counts), ClinicScene
(gate/preload/speaker), sprites, mockData, CHARACTER_BIBLE,
manifest, process_character (4 CHARACTERS rows), 24 sprites,
4 headers, 5 contact sheets.

Test result: auditor 0 findings; `npm test` 190/190; tsc
clean; build green; live 200 + sprite/header 200 (bundle
DAE7aPL3). Supabase: 16/272/256/8/32/8, 0 dangling.

Playtest result: NOT operator-playtested — programmatic only.

Image spend this run: $0.29 (ledger ~$1.14 cumulative, cap $10;
STOP at $120).

STOP.

## Run 21 — 4-round visits + history content (2026-10-30)

Phase: operator revision — scenarios were single-choice; now a
4-round arc (ask/examine/diagnose/treat) with progressive
disclosure + self-reviewed medical accuracy (still DRAFT
pending operator pen).

Files: types, conditions(+test), visit(+test), memory(+test),
economy, sharedCare(+test), ClinicScene, aboutSheet,
fallbackPack seeds. Supabase: handoffs_score_check 0-4.

Test result: auditor 0 findings; `npm test` 198/198; tsc
clean; build green; live 200 (bundle BObUrrx2).

Playtest result: NOT operator-playtested — programmatic only.

Image spend this run: $0 (ledger ~$1.14 cumulative, cap $10;
STOP at $120).

STOP.

## Run 22 — discriminating history content (2026-10-30)

Phase: operator revision — history clinchers were soft calls;
rewrote all 8 around pathognomonic-leaning, educational history
(silent HTN, Centor history, pleurisy, atopic triad, recumbent
AOM, nocturnal asthma, cold onset, oliguria). DRAFT pending pen.

Files: conditions.ts only (+PROGRESS ownership note).

Test result: auditor 0 findings; `npm test` 198/198; tsc
clean; build green; live 200 (bundle B-_iCDyc).

Playtest result: NOT operator-playtested — programmatic only.

Image spend this run: $0 (ledger ~$1.14 cumulative, cap $10;
STOP at $120).

STOP.

## Run 23 — MSD-sourced history + playbook (2026-10-30)

Phase: operator revision — history content grounded in MSD
Manual Professional Edition per condition, plus a durable
scenario-generation playbook with a future-use prompt.

Files: conditions.ts (history blocks), SCENARIO_PLAYBOOK.md.

Test result: auditor 0 findings; `npm test` 198/198; tsc
clean; build green; live 200 (bundle BPwMSfc5).

Playtest result: NOT operator-playtested — programmatic only.

Image spend this run: $0 (ledger ~$1.14 cumulative, cap $10;
STOP at $120).

STOP.

## Run 24 — demo packaging (2026-10-30)

Phase: operator "go" — demo packaging with every claim
verified against code (README + demo script + submission
checklist). Treat-4 scoped and rejected (label geometry +
frozen canonical labels).

Files: README, DEMO_SCRIPT.md, SUBMISSION_CHECKLIST.md,
ClinicScene demo steps (2 lines).

Test result: auditor 0 findings; `npm test` 198/198; tsc
clean; build green; live 200 (bundle D2AGxf0_).

Playtest result: NOT operator-playtested — programmatic only.

Image spend this run: $0 (ledger ~$1.14 cumulative, cap $10;
STOP at $120).

STOP.

## Run 25 — content pack 2 (2026-10-31)

Phase: operator "do add more content" — 4 MSD-sourced
conditions + 4 patients + full art via the SCENARIO_PLAYBOOK
pipeline (croup/Hugo, hand-foot-mouth/Ivy, Lyme/Leo,
appendicitis/Ruby).

Files: types, conditions(+test auto-covers ×4), fallbackPack
(+test), mockData, sprites, ClinicScene (Speaker + guard +
learn preload), aboutSheet, CHARACTER_BIBLE, playbook §1,
manifest, process_character (4 CHARACTERS rows), README, demo
script, checklist, 24 sprites + 4 headers + 5 contact sheets.

Test result: auditor 0 findings (pins bumped 8→12); `npm
test` 238/238; tsc clean; build green. Supabase: 20/340/320,
resources 12, findings 48, treatments 12, CHECK widened, 0
dangling edges.

Deployment URL: `https://cozy-clinic.vercel.app/` (live 200;
new sprites + headers 200).

Playtest result: NOT operator-playtested — programmatic only.

Image spend this run: $0.28 (ledger ~$1.42 cumulative, cap
$10; STOP at $120).

STOP.
