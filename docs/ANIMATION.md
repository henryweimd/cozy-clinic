# ANIMATION.md — Little Lives: Cozy Clinic

Motion law. Key poses come from the image model; ALL motion is built
in code. Jolly mascots read through small motions — modest is the bar:
idle bob, blink, one-bounce happy. Numbers in the code-motion spec
are exact and match the shipped `ClinicScene.ts` implementation;
the expression state machine above it is FINAL DESIGN awaiting
art (sick/pained/relieved) + integration — not yet in the build.

## Poses from the image model (minimum set)

| Pose | File | Description |
|---|---|---|
| idle | `<name>-idle.png` | Neutral: bead eyes open, gentle smile, baseline blush. The anchor pose — every other pose matches its bbox within 2 px per side. |
| blink | `<name>-blink.png` | Eyes-closed variant of idle; everything else identical. |
| happy | `<name>-happy.png` | Joyful tap-react: closed `^ ^` happy eyes, bigger smile, rosier blush. Same silhouette/pouch as idle. |

Rules: 192×192 class, Block C verbatim, transparent bg, ≥8 px pad,
foot anchor bottom-center, opaque ratio within 0.01 of idle. A pose
that shifts the silhouette fails validation — expression changes
only (eyes, mouth, blush).

Expression set (see `CHARACTER_BIBLE.md` for the normative face
specs): idle, blink, happy (shipped) + sick, pained, relieved
(ORDERED — art pending, rules below are final). Future poses
(walk frames) follow the same rules when ordered; they are NOT
this run. No `worried` face is ordered — the engine's `worried`
cue maps to HOLDING the steady state (face reflects state, and
a no-change decision leaves state unchanged).

## Expression state machine (normative)

Mabel's face is a pure function of clinical state plus brief
transient flashes. Terms: the STEADY face is where Mabel rests;
a FLASH is a temporary face shown on a decision resolve, which
always settles back to steady. One emotion at a time; every
flash is token-guarded like the shipped happy bounce so a stale
flash never clears a newer one.

Steady-state map (stage → face; stage 0 = healthiest):

| Stage | Face | Why |
|---|---|---|
| 0 (recovered: sipped / breezy / clear / steady) | relieved | Better — color back in the cheeks |
| 1 | idle (neutral) | Okay — the resting face |
| 2 (where fresh cases present) | sick | Unwell — Mabel opens the demo sick |
| 3 (worst) | pained | Hurting — cozy bounds, droopy never grim |

Vitals modifier (one rule): if ANY vital is ≤ 2, shift one step
worse along relieved → idle → sick → pained (floor at pained).
Vitals never shift upward — recovery reads from the stage
ladder, not the chips.

Mood/cue alignment (engine `mood` + `animationCue` stay the
implementation's inputs; this table is the binding readout):

| Engine signal | Expression readout |
|---|---|
| mood `bright` / cue `happy` (reached stage 0) | happy flash → settle relieved |
| mood `perky` / cue `recovery` (improved, stage > 0) | relieved flash + standard bounce → settle per map |
| cue `sick` (worsened) | pained flash → settle per map |
| cue `worried` (no change / DANGEROUS blocked) | HOLD steady — no flash, no bounce (state didn't move) |
| cue `idle` (resting at stage 0) | relieved |

Transient response rules (decision resolves):

- Correct (BEST, improved, stage > 0): flash relieved for the
  bounce window, WITH the standard bounce (scale-only, same
  110 ms squash + 80 ms overshoot timings as happy), then
  settle to the steady map. Relief earns the bounce; only
  full recovery earns the happy face.
- Full recovery (reached stage 0): happy + standard bounce
  (the shipped tap-react motion, unchanged), then settle to
  relieved. happy is RESERVED for full-recovery moments and
  the tap-hello greeting — never for partial improvement.
- Incorrect (WRONG, worsened): flash pained for 600 ms, NO
  bounce, NO shake on Mabel (scale stays 1 — pain reads in
  the face, not the body), then settle to the steady map.
- No-change (NOT_GREAT): hold steady, no flash. Nora's line
  teaches; the face stays honest.
- Blocked (DANGEROUS veto): hold steady, no flash, no bounce
  (shipped card dim + shake + Nora line unchanged — the face
  reflects state, and a blocked move changes no state).
- Tap-hello on Mabel: happy + standard bounce, unchanged from
  the shipped behavior (greeting, not a clinical signal).
- Flash duration: pained 600 ms fixed; relieved/happy flashes
  last exactly the bounce window (~380 ms incl. yoyos) and
  clear in the overshoot onComplete. Rapid re-taps / re-cards:
  newest flash wins via the monotonic token; stale
  onCompletes return early and touch nothing.

## Code-motion spec (exact numbers)

Idle bob:

- Wave: `y = baseY + sin(t * 1.8) * 3` — amplitude 3 px,
  angular speed 1.8 rad/s (period ≈ 3.49 s).
- Runs every frame in `update()`; owns `mabel.y` exclusively —
  no other tween may touch y.
- Shadow ellipse stays fixed (it is the grounding reference).

Blink:

- Cadence: randomized 3000–5000 ms (`3000 + Math.random() * 2000`),
  rescheduled after every blink so a cast never blinks in unison.
- Closed duration: exactly 120 ms (`delayedCall(120)`).
- Theo exception (sleepy toddler): 220 ms closed, 2000–3500 ms
  gap — heavier, drowsier blinks (`src/game/sprites.ts`).
- Ellis exception (elder): 160 ms closed, standard gap —
  slower lids, same rhythm.
- Bob-rate exceptions: Priya 2.3 rad/s (eager bounce),
  Ellis 1.4 rad/s (calm sway); amplitude stays 3 px.
- Swap rule (simplest robust rule — no blink variants are ever
  ordered for sick/pained/relieved): the timer fires ONLY when
  the steady face is idle AND no flash is showing AND the
  current texture is `mabel-idle`; otherwise it reschedules
  without swapping. Restore blink→idle only if blink still
  owns the texture (a tap/flash during the 120 ms window wins).
  Sick (droopy lids) and pained (shut eyes) already read
  heavy-eyed without blinking; relieved holds its bright open
  gaze.

Standard bounce (squash-stretch + overshoot) — shared by the
happy tap-react AND the relieved flash:

- Step 1 — squash: `scaleY -= 0.06`, `scaleX += 0.06`,
  110 ms, yoyo, `Sine.easeInOut`, scale-only (no y-tween —
  the update() bob owns `mabel.y`, so the bounce NEVER
  touches y on any expression).
- Step 2 — overshoot: `scaleY += 0.03`, `scaleX -= 0.03`,
  80 ms, yoyo, `Sine.easeInOut`, chained in step 1's onComplete.
- Texture sequencing: set the flash face (`mabel-happy` or
  `mabel-relieved`) at trigger; settle to the STEADY-map face
  (not hard-coded idle) in step 2's onComplete. A monotonic
  token guards both onCompletes so a stale bounce never clears
  a newer flash on rapid re-triggers; the blink swap is
  suspended while any flash is showing.
- Total: one small celebratory bounce (~380 ms incl. yoyos),
  then settle to steady. The pained flash never bounces
  (600 ms still hold, scale stays 1).

Bubble:

- Open: fade alpha 0→1, 180 ms, `Sine.easeOut`.
- Close: fade alpha 1→0, 150 ms, then hide.

Principles: subtle squash and stretch (≤6%), ease-in/out on
everything (`Sine.easeInOut` / `Sine.easeOut`), one emotion at a
time, always settle to the steady-map face (idle is one steady
state, not the universal home — a sick Mabel rests sick).
