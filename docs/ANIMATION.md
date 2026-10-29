# ANIMATION.md — Little Lives: Cozy Clinic

Motion law. Key poses come from the image model; ALL motion is built
in code. Jolly mascots read through small motions — modest is the bar:
idle bob, blink, one-bounce happy. Numbers below are exact and match
the shipped `ClinicScene.ts` implementation.

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

Future poses (worried, sick, walk frames) follow the same rules when
ordered; they are NOT this run.

## Code-motion spec (exact numbers)

Idle bob:

- Wave: `y = baseY + sin(t * 1.8) * 3` — amplitude 3 px,
  angular speed 1.8 rad/s (period ≈ 3.49 s).
- Runs every frame in `update()`; owns `mochi.y` exclusively —
  no other tween may touch y.
- Shadow ellipse stays fixed (it is the grounding reference).

Blink:

- Cadence: randomized 3000–5000 ms (`3000 + Math.random() * 2000`),
  rescheduled after every blink so a cast never blinks in unison.
- Closed duration: exactly 120 ms (`delayedCall(120)`).
- Swap rule: idle→blink only when happy is NOT showing AND the
  current texture is `mochi-idle`; restore blink→idle only if blink
  still owns the texture (a tap during the 120 ms window wins).

Happy tap-react bounce (squash-stretch + overshoot):

- Step 1 — squash: `scaleY -= 0.06`, `scaleX += 0.06`,
  110 ms, yoyo, `Sine.easeInOut`, scale-only (no y-tween).
- Step 2 — overshoot: `scaleY += 0.03`, `scaleX -= 0.03`,
  80 ms, yoyo, `Sine.easeInOut`, chained in step 1's onComplete.
- Texture sequencing: set `mochi-happy` at tap; restore
  `mochi-idle` in step 2's onComplete. A monotonic `happyToken`
  guards both onCompletes so a stale bounce never clears a newer
  happy on rapid re-taps; the blink swap is suspended while
  `showingHappy` is true.
- Total: one small celebratory bounce (~380 ms incl. yoyos),
  then settle to idle. Always returns to idle.

Bubble:

- Open: fade alpha 0→1, 180 ms, `Sine.easeOut`.
- Close: fade alpha 1→0, 150 ms, then hide.

Principles: subtle squash and stretch (≤6%), ease-in/out on
everything (`Sine.easeInOut` / `Sine.easeOut`), one emotion at a
time, always return to idle.
