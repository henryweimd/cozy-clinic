# PROGRESS.md — Little Lives: Cozy Clinic

## Done (Phase 01, this chunk)

- Repo hygiene: `AGENTS.md` present, `.gitignore` expanded, `.env.example`
  placeholders only, `git check-ignore` confirms `.env` ignored.
- Vite + TypeScript + Phaser scaffold, 540×960 FIT portrait, `index.html`.
- Clinical engine (`src/clinical/`): 4 conditions, grading, trajectory-ready
  node/edge shapes, engine veto; 28 vitest tests pass; `npm run build` green.
- `docs/PROGRESSION.md` schema sketch; `docs/AI_PROXY.md` Edge Function
  contract (recorded only, not implemented).
- `ART_BIBLE.md` with verbatim style block, exact hex palette, budgets.
- Mochi idle + blink sprites: Muse Image MCP (style block verbatim),
  programmatic key-out + verification (bboxes identical, opaque ratios
  within 0.007), contact sheet, masters in studio `art/source/mochi/`,
  exports in `public/assets/characters/`. SAM 3.1 was unavailable (no SAM
  tool in session) — fallback recorded in `art/manifest.json`.
- Clinic scene: warm room (code-drawn TEMPORARY geometry, marked), Mochi
  sprite with idle bob + randomized blink, tap-to-see-complaint + happy
  bounce. Headless playtest: 60.3 FPS, zero console errors.
- Improvement loop: bubble-cutoff/shadow-gap/favicon-404 fixed, re-tested.

## Not done

- Production deploy + URL playtest (no Vercel linkage/CLI in this session;
  operator deploys: import repo on Vercel, Vite preset, push `main`).
- Operator MVP feel-gate playtest (their step after deploy).
- Everything out of scope: encounter UI beyond tap, Supabase, Edge
  Function implementation, audio, more characters.

## Next (superseded — layout chunk below is the active work)

Operator: open production URL at phone size, confirm the scene feels
cute/friendly/inviting/professional (feel gate), then launch Phase 02.

## Active chunk: layout & composition pass (fix-layout-01)

- File ownership this chunk: single agent. Only files touched:
  `src/scenes/ClinicScene.ts`, `PROGRESS.md`, `CHECKPOINT.md`.
- Spend: ledger cumulative before this chunk $0.0544
  ($0.0304 phase-01 + $0.024 fix-art-01). Next $20 gate is far off.
  At >= $120, STOP — not reached. Image spend this chunk $0.00
  (recomposition only, no generations).
- No phase-02 work. No new patients, conditions, features, or art
  assets beyond recomposition glue.

### Step-1 spacing/composition audit (LIVE deploy, 540x960, before edits)

Screenshots: live `https://cozy-clinic.vercel.app/` at 540x960,
idle + tapped states, zero console errors. Element-by-element
(screen x/y in px, screen is 540 wide / 960 tall):

- Title "Cozy Clinic" (y56, 44px) + subtitle (y100, 22px): top-edge
  anchored, centered. HELP the composition. No change.
- Window (wall, x8-212 incl. rod finial, y118-338): rod finial
  circle at x8 r9 OVERFLOWS the left screen edge by ~1px. Left
  margin 8 vs cabinet right margin 48 — ASYMMETRIC margins. Hurts.
- Cabinet (wall, x368-492, y186-350): right margin 48, floats with
  no shared baseline (bottom 350 vs window sill bottom 338, 12px
  off) and no shared top (186 vs rod 118). Hurts.
- Dead band A (wall strip y~350-440, full width): ~90px of bare
  dots between furniture bottoms and baseboard. No purpose. Hurts.
- Baseboard (y440-466): fine, keep.
- Bed (floor left, x12-150, y520-716): left margin 12. Reads
  doll-sized next to 240px Mochi (bed height 196 < Mochi 240;
  mattress top y576 sits at Mochi's chest but the 138px width
  reads like a crib). Hurts scale. Position helps (left anchor).
- Mochi (center x270, sprite 240px => x150-390, y480-720):
  largest weight, clearly focal. HELPS. But sprite box touches
  bed's right edge (150) with 0px gap and nearly touches stool
  (6px) — ears have ~20px transparent pad so visual gap is
  ~20-30px, still tight. Hurts (crowded focal point).
- Stool (floor, x396-456, y636-730): 6px gap to Mochi sprite,
  6-12px gap to plant pot. Forms a CLUSTER with the plant; blocks
  the right walking lane. Hurts. Verdict: REMOVE (art bible:
  "if a scene feels busy, remove something"; chunk brief permits
  removing what crowds). No gameplay depends on it.
- Plant (floor right, pot x468-530, leaves to x544, y572-720):
  right leaf edge x544 OVERFLOWS the screen by ~4px. Pot right
  margin 10. Clustered with stool. Hurts (overflow + cluster).
- Rug (x90-450, y706-790): centered under Mochi. HELPS. Slightly
  wide on the right once the stool is gone; shrink to 340 wide.
- Nametag (y766, on rug): readable, HELPS. Keep on rug.
- Bubble (open state: top y798, width 460, extends to ~960):
  text fits (no regression of the bubble-text fix) and content
  HELPS, but the box BLEEDS to the bottom screen edge (0px
  bottom margin) and spans margins 40/40. Hurts framing.
- Dead band B (floor foreground y~800-960 when bubble closed):
  bare planks. Reframed as deliberate WALKING SPACE (genre bar:
  "walking space stays clear") — kept empty on purpose, not a
  defect once band A is fixed and edges are anchored.
- Floor plank joints: fine, keep.
- Misalignments: (1) wall left/right margins 8 vs 48;
  (2) sill/cabinet bottoms 338 vs 350; (3) bubble side margins
  40 vs room margins; (4) bubble bottom margin 0.

### Fix plan (one spacing system, applied to every element)

- SIDE = 24 outer margins; GUT = ~24 min sprite-box gap around
  Mochi; WALL_BASE = 352 shared sill baseline; GROUND = 724 kept.
- Window: shift +16x (margins 24/24-class; finial no longer
  clipped) and +14y (sill bottom lands on 352).
- Cabinet: shift +24x (right margin 24). Bottom 350 ~ baseline
  (2px, accepted). Tops intentionally differ (different pieces).
- Dado trim line at y352 full wall width (one 4px INK line, drawn
  in walls pass): converts dead band A into an intentional
  wainscot reveal; sill and cabinet sit on it. Recomposition
  glue, not new furniture.
- Wallpaper dots: drop the y382 row so the reveal strip stays
  clean cream.
- Bed: keep position (left floor anchor, margin 12 tolerance for
  grounded corner furniture). Gains relative scale from Mochi
  shrink (below).
- Mochi: 240 -> 212 display size, recentered (270, 614) so feet
  stay on GROUND. Still the largest visual weight; grows gaps:
  ~14px sprite (~34 visual) to bed, ~78 to plant pot. Mattress
  top now reads at hip height — believable scale.
- Stool: REMOVED (see audit). Right lane becomes walking space.
- Plant: shift -14x (pot 454-516, right margin 24; leaves no
  longer overflow). Solo corner anchor with 78px walking gap.
- Rug: 360x84 -> 340x80, stroke 320x60 -> 300x56. Nametag stays
  on rug (y752 after rug recenter check).
- Bubble: width 460 -> 492 (side margins 24, matches SIDE);
  bottom-docked at 936 (bottom margin 24): top = 936 - height,
  so any text length stays framed. Sizes to text (no regression).
- Door considered and REJECTED: center-wall gap becomes breathing
  room above the focal point once band A is a designed reveal;
  a door at x~250-370 would sit 20-40px off Mochi's axis and add
  noise behind the focal point. Not required by acceptance.

### Outcome (verified on the LIVE deploy, 540x960, idle + tapped)

- Every audit defect resolved: window/cabinet margins 24/24, no
  edge overflow (finial + canopy inside screen), sill and cabinet
  sit on the shared dado line, dead band A reads as a wainscot
  reveal, stool cluster gone (right lane is open walking space),
  Mochi focal with clear gaps both sides, bubble docked with
  24px margins on three sides and sized to its text (wording
  unchanged — no clinical-copy change).
- Round-1 local screenshots + round-2 live-deploy screenshots both
  confirm; zero console errors in all four captures. Tap opens the
  complaint bubble with correct text; no overlap with Mochi,
  nametag, rug, or edges.
- Improvement-loop pass on the deployed URL: played (tap path),
  no new defect found, no redeploy needed.
- `npm test` 29/29 pass; `npm run build` green. Commit `d004960`,
  pushed to `main` (Vercel auto-deploy verified live).
- Remaining feel risks for the operator: (1) floor foreground is
  intentionally empty walking space — operator judges whether it
  reads deliberate or empty; (2) bed still compact vs Mochi but
  now at believable hip-height scale; (3) no phone-in-hand test by
  the builder (headless screenshots only).

## Done (art & feel chunk)

- File ownership this chunk: single agent, all files above.
- Room redraw (`src/scenes/ClinicScene.ts`): perspectival room —
  wallpaper-dot wall, baseboard, plank floor; finished window
  (panes, sill, curtains, clouds + sun), cabinet (open shelf with
  bottles, double doors, handles; pink band fixed inside frame),
  plant grounded on floor (stems, leaves, soil, shadow); new exam
  bed, doctor's stool, rug. Mochi stands fully on the floor
  (feet/shadow on rug, body clear of wall line). Palette unchanged.
- Dialogue fix: `dehydration.plainWords` no longer names Maple;
  new `engine.test.ts` guard fails on any patient name in shipped
  clinical copy. No other shipped line named a patient (grep audit).
- Vision section recorded in `ART_BIBLE.md` for all later phases.
- Tests: `npm test` 29/29 pass; `npm run build` green.
- Playtest (local prod build, phone viewport, real tap): room reads
  cozy and unified, bubble opens with correct text, zero console
  errors. One loop fix applied: bubble hint no longer overlaps the
  complaint (bubble now sizes to its text).

## Active chunk: P1 AI room shell (bg artist workstream)

- P1 OWNERSHIP (declared BEFORE generating, per AGENTS.md workflow
  law): the P1 bg-artist agent owns `art/source/room/*`,
  `public/assets/room/*`, `art/contact-sheets/room-*`, and
  `art/manifest.json` room-bg additions ONLY. Nobody else writes
  those paths this run. The P1 bg artist makes NO scene-code edits
  (`src/scenes/ClinicScene.ts` belongs to the integrator).
- Scope: generate ONE 540x960 (or 2x 1080x1920) cozy clinic
  room-shell background, validate it, write master + export +
  contact sheet, update manifest with prompt hash + spend.
- Layout contract preserved for the integrator: SIDE=24,
  WALL_BASE=352, GROUND=724, Mochi 212px at (270,614), bubble
  492 wide docked at 936 (see fix-layout-01 spacing system above).
- P1 RESULT (bg artist): generated ONE room shell, 1 image x $0.01
  = $0.01 spend this workstream (ledger was $0.0544 before P1).
  Master `art/source/room/room-shell-01-master.png` (1152x2048),
  export `public/assets/room/room-shell-01.png` (1080x1920 2x),
  contact sheet `art/contact-sheets/room-shell-contact-sheet.png`
  (plain + Mochi-composite panels), manifest `backgrounds[0]`
  entry with prompt hash + validation + fallback note.
  Validation: exact 9:16, no characters/text, plush match to
  Mochi, Mochi footprint clear, feet at painted floor edge.
  Integrator notes: (1) code rug ellipse y708-788 overlaps the
  painted rug (y735-897) — hide the code rug or accept a double
  rug until P2; (2) window is right / cabinet is left in the bg
  (mirrored vs code passes, which are deleted anyway);
  (3) in-game render check still needs the integrator's deploy +
  operator phone playtest; (4) bg style-block variant for
  ART_BIBLE.md still owned by the spec author (roadmap D3).

## Active chunk: P1 AI room shell (integrator workstream)

- P1 OWNERSHIP (integrator): owns `src/scenes/ClinicScene.ts`,
  `PROGRESS.md`, `CHECKPOINT.md` this run. No `art/*` edits
  (bg artist owns those paths); sequential after art, no
  concurrent writers.
- P1 RESULT (integrator): real background file existed
  (`public/assets/room/room-shell-01.png`, 1080x1920 RGB verified),
  so integrated it as the room shell: preload `room-shell` +
  centered 540x960 image at (270,480) as the first drawRoom draw;
  DELETED the replaced procedural passes `drawWallsAndFloor`
  (wall/dots/baseboard/floor), `drawWindow`, `drawCabinet`
  (~174 lines). Header comment fixed (no longer claims code-drawn
  "finished art"; records P1 bg + P2 furniture plan + layout
  contract). KEPT byte-identical in behavior: Mochi 212px at
  (270,614) + nametag, code rug ellipse (P2 scope; accepted soft
  overlap with the painted rug per artist note — code rug reads
  as Mochi's standing pad, painted rug as the room rug),
  bubble 492 wide docked at 936 sizing upward, tap-to-complaint
  + happy bounce, blink/bob. No clinical-copy change.
- Tests/build: `npm test` 29/29 pass; `npm run build` green
  (room-shell-01.png bundled into `dist/assets/room/`).
- Spend: integrator image spend $0.00 (no generations); P1 total
  stays $0.01 (bg artist's one generation). Ledger ~$0.0644.
  Next $20 gate far off; at >= $120, STOP — not reached.
- Not done by integrator: deploy + operator phone playtest
  (headless screenshot impossible in sandbox per prior audit;
  render check needs the deployed URL on a phone); P2 props,
  P3 poses, P4 font, P5 fx all out of scope. STOP after
  CHECKPOINT.md.

## Active chunk: P2 prop sprites (prop-artist workstream)

- P2 OWNERSHIP (declared BEFORE generating, per AGENTS.md workflow
  law): the P2 prop-artist agent owns `art/source/props/*`,
  `public/assets/props/*`, `art/contact-sheets/props-*`, and
  `art/manifest.json` props additions ONLY. Nobody else writes
  those paths this run. The P2 prop artist makes NO scene-code
  edits (`src/scenes/ClinicScene.ts` belongs to the integrator).
- Scope: exam-bed + potted-plant plush prop sprites (transparent
  PNG, foot-anchored, GROUND=724 aligned), validation + contact
  sheet + manifest props[] entries with FULL PROMPT TEXT.
- Rug verdict (from bg inspection): the painted rug in
  room-shell-01.png (large cream scalloped oval, centered) suffices
  — NO rug prop will be generated (avoids double-rug).
- P2 RESULT (prop artist): 2 sprites shipped, 5 images x $0.01 =
  $0.05 this workstream (2 gen + 2 fix edits + 1 probe after
  tool-arg failures; ledger ~$0.1144, $120 STOP far off).
  Exports `public/assets/props/exam-bed.png` (560x320, empty bed,
  headboard-left) + `plant.png` (418x560, faceless pot);
  masters in studio `art/source/props/` (git-ignored, correct);
  contact sheet `art/contact-sheets/props-contact-sheet.png`
  (checker cutout panels + room composite, feet at GROUND=724);
  manifest `props[]` with FULL PROMPT TEXT + hashes (P1 lesson).
  Fixes applied: bed gen had a sleeper (removed via edit — bed
  must be empty, patients are Mochi/future cast); plant gen had
  a pot face (removed via edit — props stay faceless furniture).
  Validation: border flood-fill keyout, assert bbox/padding(24px)/
  corners, foot-anchor bottom-center, composite alignment pass.
  Integrator notes: (1) bed 140x80 @cx82 reads small next to
  212px Mochi — may playtest up to ~170w, verify Mochi gap;
  (2) bed sits in front of bg cabinet lower-left, confirm on
  device; (3) plant 110x147 @cx461 corner-anchored, right
  margin 24; (4) delete code drawExamBed/drawPlant/drawRug on
  integration (painted rug replaces code rug — no double-rug).

## Active chunk: P2 prop sprites (integrator workstream)

- P2 OWNERSHIP (integrator): owns `src/scenes/ClinicScene.ts`,
  `PROGRESS.md`, `CHECKPOINT.md` this run. No `art/*` or
  `public/assets/*` edits (prop artist owns those paths);
  sequential after art, no concurrent writers.
- P2 RESULT (integrator): real prop files existed
  (`public/assets/props/exam-bed.png` 560x320 RGBA +
  `plant.png` 418x560 RGBA, verified on disk), so integrated
  them: preload `prop-bed` + `prop-plant`; new `drawProps()`
  places both feet-anchored to GROUND=724 via origin (0.5,1) —
  bed 160 wide at cx88 (left floor anchor; middle ground between
  the artist's 140 composite and the ~170 playtest suggestion,
  keeps a clear visual gap to Mochi's 212px box at x164+),
  plant 110 wide at cx461 (right corner anchor, box right
  margin 24). DELETED the replaced procedural passes
  `drawExamBed`/`drawPlant`/`drawRug` (~107 lines) plus the
  now-unused `INK` constant (build fix); code rug gone so no
  double rug with the painted bg rug. Header + drawRoom
  comments updated (P2 sprites + layout note). KEPT
  byte-identical in behavior: Mochi shadow ellipse + Mochi
  212px at (270,614) + nametag, bubble 492 wide docked at 936
  sizing upward, tap-to-complaint + happy bounce, blink/bob.
  No clinical-copy change.
- Tests/build: `npm test` 29/29 pass; `npm run build` green
  (tsc + vite; both props bundled into `dist/assets/props/`).
  One P2 regression fixed: `INK` unused after the pass
  deletions broke tsc — removed the constant (Mochi/bubble
  use the same hex as literals, behavior unchanged).
- Spend: integrator image spend $0.00 (no generations); P2
  total stays $0.05 (prop artist's 2 gen + 2 fix edits +
  1 probe). Ledger ~$0.1144. Next $20 gate far off; at >=
  $120, STOP — not reached.
- Not done by integrator: deploy + operator phone playtest
  (headless screenshot impossible in sandbox per prior audit;
  render check needs the deployed URL on a phone — confirm
  bed scale vs Mochi, bed-vs-bg-cabinet overlap lower-left,
  plant corner fit); P3 poses, P4 font, P5 fx out of scope.
  STOP after CHECKPOINT.md.

## Active chunk: P3 Mochi poses (character-artist workstream)

- P3 OWNERSHIP (declared BEFORE generating, per AGENTS.md workflow
  law): the P3 character-artist agent owns
  `public/assets/characters/mochi-<pose>.png` ADDITIONS ONLY
  (never modifies `mochi-idle.png` / `mochi-blink.png`),
  `art/contact-sheets/mochi-poses-*`, and `art/manifest.json`
  character additions ONLY. Nobody else writes those paths this
  run. The P3 character artist makes NO scene-code edits
  (`src/scenes/ClinicScene.ts` belongs to the integrator).
- Scope: at most TWO key poses via edit_image from mochi-idle.png
  (edits preserve identity): mochi-happy (joyful tap-react) and
  ONLY a second pose if the demo needs it. Transparent bg,
  192x192, same foot anchor/padding class. Style block verbatim
  in every prompt. Ledger was ~$0.1144 after P2; STOP at >=$120.
- P2 LESSON applied: manifest entry carries FULL PROMPT TEXT +
  prompt sha256 + export sha256 (no hash-only entries).
- P3 RESULT (character artist): ONE pose shipped — no second
  pose, the demo only needs the happy tap-react. 1 image x
  $0.01 = $0.01 this workstream (ledger ~$0.1244, $120 STOP
  far off). Export `public/assets/characters/mochi-happy.png`
  (192x192 RGBA, ^ ^ closed eyes, bigger smile, rosier blush);
  master in studio `art/source/mochi/` (git-ignored, correct);
  contact sheet `art/contact-sheets/mochi-poses-happy.png`
  (idle/blink/happy + alpha-checker row); manifest `assets[2]`
  with FULL PROMPT TEXT + hashes + validation + fallback.
  Validation: bbox [20,32,168,184] within 2px of idle on all
  sides, opaque ratio 0.335 vs 0.336, corners transparent,
  pad >= 8px all sides, identity match by eye. Minor noted:
  happy's pouch carries a small white cross emblem (idle
  pouch reads plain) — same pink pouch shape, accepted.
  Integrator notes: (1) preload `mochi-happy` + swap texture
  during the tap bounce, then restore `mochi-idle` on settle;
  (2) same 212px display size + (270,614) center as idle (bbox
  matched, no re-layout); (3) blink timer should not fight
  the happy swap — skip/suspend blink while happy shows;
  (4) in-game render check needs deploy + operator phone
  playtest; (5) `mochi-idle.png` / `mochi-blink.png` untouched
  (byte-identical, never rewritten).

## Active chunk: P3 Mochi poses (integrator workstream)

- P3 OWNERSHIP (integrator): owns `src/scenes/ClinicScene.ts`,
  `PROGRESS.md`, `CHECKPOINT.md` this run. No `art/*` or
  `public/assets/*` edits (character artist owns those paths);
  sequential after art, no concurrent writers.
- P3 RESULT (integrator): real pose file existed
  (`public/assets/characters/mochi-happy.png` 192x192 RGBA,
  bbox (20,32,169,184) within 2px of idle on all sides,
  verified on disk), so integrated it: preload `mochi-happy`;
  tap-react sets the happy texture for the bounce and restores
  `mochi-idle` on the bounce tween's onComplete (token-guarded
  so a stale bounce never clears a newer happy on rapid
  re-taps); blink now swaps idle<->blink ONLY when happy is
  not showing (`showingHappy` flag + texture-key guards both
  ways, so a tap during the 120ms blink window keeps happy and
  a blink never cuts happy short). Header comment records P3.
  KEPT byte-identical in behavior: idle bob, Mochi shadow
  ellipse + Mochi 212px at (270,614) + nametag, bubble 492
  wide docked at 936 sizing upward, tap-to-complaint toggle.
  No clinical-copy change.
- Tests/build: `npm test` 29/29 pass; `npm run build` green
  (tsc + vite; mochi-happy.png bundled into
  `dist/assets/characters/`). Zero P3 regressions — no fixes
  needed.
- Spend: integrator image spend $0.00 (no generations); P3
  total stays $0.01 (character artist's one edit). Ledger
  ~$0.1244. Next $20 gate far off; at >= $120, STOP — not
  reached.
- Not done by integrator: deploy + operator phone playtest
  (headless screenshot impossible in sandbox per prior audit;
  render check needs the deployed URL on a phone — confirm
  happy face reads joyful mid-bounce, no flicker vs blink);
  P4 font, P5 fx out of scope. STOP after CHECKPOINT.md.
