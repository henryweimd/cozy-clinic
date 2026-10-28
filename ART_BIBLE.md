# ART_BIBLE.md — Little Lives: Cozy Clinic

The law for every asset. No asset enters the game unless it matches this
file and its character's master reference, and has passed validation
(transparency, dimensions, alignment, contact sheet, in-game render check).

## Vision (operator's words, locked for this chunk and all later phases)

- Room STRUCTURE like Animal Crossing: a coherent, lived-in room with
  real floor/wall perspective and grounded furniture — not a flat card,
  not a prop catalog.
- Visual AESTHETIC of Muse Jolly's character applied to EVERYTHING:
  background and props in the same soft sculpted plush language as
  Mochi (cream-rounded forms, thin warm-brown outline, matte texture,
  restrained pastels). The character and the room must look like one game.
- Clean, obvious, minimal: every graphic instantly readable at phone
  size, generous negative space, and only objects in the character's
  vicinity or of relevance to the scene. Minimalism is deliberate — the
  focus stays on the character and the relevant objects. Empty space is
  fine; flat, mismatched, unfinished space is not.
- Finish quality is the bar: consistent outline weight, soft grounding
  shadows, clean silhouettes, nothing floating, overflowing, or
  straddling lines. Nothing ships looking placeholder or amateur.

## Fixed style block (verbatim in EVERY image prompt)

> Soft sculpted plush-toy character, cream-colored rounded body, small
> dark bead eyes, pink blush cheeks, simple gentle smile, thin warm-brown
> outline, matte fabric texture, warm pastel palette, clean uncluttered
> design, full body, plain solid pale background, centered, game sprite.
> No text, no busy background, no extra limbs, no photorealism, no neon
> colors, no clutter.

## Palette (exact hex)

| Swatch | Hex | Use |
|---|---|---|
| Cream base | `#FFF3E2` | Character bodies, plush forms |
| Warm background pale | `#FCEBD6` | Source-art backdrops, room walls light |
| Bead-eye dark | `#3A2E2A` | Eyes (near-black warm brown) |
| Outline warm brown | `#8A5A3B` | The one thin outline on everything |
| Blush pink | `#F5A0AC` | Cheeks, recovery warmth |
| Soft sage | `#A9C6A2` | Scrubs, plants, calm accents |
| Sky blue | `#A9CCE3` | UI, blankets, daytime accents |
| Butter yellow | `#F9DC8A` | Stars, lamps, happy accents |
| Terracotta | `#D98E73` | Pots, roofs, warm accents |
| Floor warm wood | `#E8C9A0` | Clinic floor |
| Text cocoa | `#5C4633` | All in-game text |

Nothing neon, nothing dark or moody, nothing high-contrast or loud.

## Character proportions

- Plump, rounded, toy-like. No sharp angles, no spindly limbs.
- Roughly 1:1.5 head-to-body; short limbs; plump torso.
- Outfit is part of the silhouette and must not change between views.

## Face rules

- Small dark bead eyes (`#3A2E2A`), round, glossy single highlight dot.
- Pink blush cheeks (`#F5A0AC`), soft circles, always present.
- Simple gentle smile, one curve.
- Faces carry almost all expression; one small change (eyes, mouth,
  blush) must read instantly at phone size.

## Outline

- One thin consistent warm-brown (`#8A5A3B`) outline on every character
  and object. Never heavy black, never varying thickness between assets.
- At 192 px sprites: ~3 px outline; at 128 px: ~2 px.

## Camera, lighting, composition

- Camera: slightly elevated 2.5D (front view with a hint of floor).
- Lighting: soft, upper left, one gentle highlight per form.
- Composition: one focal character per shot, plain or very simple
  background in source art, generous negative space. If a scene feels
  busy, remove something.

## Sprite spec

- Sizes: 128×128 or 192×192 px per frame; consistent foot anchor
  (feet at bottom-center, grounded); consistent scale per character.
- Frame padding: ≥8 px clear space inside the frame on all sides.
- Transparent background in game-ready exports (alpha verified
  programmatically, never trusted from the generator).
- Naming: `public/assets/characters/<name>-<state>.png`
  (e.g. `mochi-idle.png`).

## Modest-animation frame budgets (maximums, animated in code)

| State | Budget | Spec |
|---|---|---|
| Idle | 3–4 frames, loop | Gentle breathing bob (a few px), calm enough to watch for minutes |
| Blink | 1 frame swapped in | Eyes closed ~120 ms every 3–5 s, randomized per character (never in unison) |
| Walk | 4 frames, loop | Gentle bounce gait, feet alternate, body bobs per step, no sliding |
| Worried | code pose | 1–2 px tremble, worried eyes, slight posture droop — readable, not distressing |
| Happy | code bounce | One small celebratory bounce (squash, rise, tiny overshoot), then settle |
| Sick | code pose | Drooped posture, half-closed eyes, slower bob, paler blush — cozy, not alarming |
| Recovery | code transition | Posture lifts, smile returns, blush warms — not a dance |
| Examine | code pose | Clinician leans in, patient holds still, one gentle tool motion, then settle |

Principles: subtle squash and stretch (a few percent), tiny anticipation
dip before a bounce, follow-through on ears/tails/caps, ease-in/out on
everything, one emotion at a time, always return to Idle.

## Pipeline (summary; brief Section 5 is canonical)

Concepts → master reference per character (studio folder only) →
turnaround with reference attached → key poses → SAM 3.1 cutout →
programmatic validation → contact sheet → in-game render check.
Key poses only from the image model; all motion is built in code.
Masters live in the studio folder (`art/source/`); the repo holds
game-ready exports only, under `public/assets/`.
