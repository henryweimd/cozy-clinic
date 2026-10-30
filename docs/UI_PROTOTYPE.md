# UI_PROTOTYPE.md — Little Lives: Cozy Clinic

Interactive UI prototype spec, operator-ordered BEFORE backend work.
Playtest this on a phone and answer the questionnaire at the end —
your answers shape the real implementation.

Constraints: 540x960 portrait canvas (Phaser FIT). NO game-code edits,
NO images, NO backend calls in this pass — all content below is
MOCK/LOCAL and the demo path stays fully offline. Dev code below
(`MABEL`) is a documented prototype convenience, NOT a real secret.

Source geometry this spec builds on (`ClinicScene.ts` today): title
"Cozy Clinic" centered (270,56), Mabel 212px at (270,614) —
sprite box x164–376, y508–720 — nametag y736, conversation panel
492 wide up top (the old subtitle lead-in + bottom complaint
bubble are gone). SIDE=24 margins, Baloo 2 face,
cream `#FFF3E2` panels + warm-brown `#8A5A3B` accents. Reboot
landmarks: wall/floor ~696, rug top ~712, window glass only x490+
y95–199 (title zone clear), bench left x0–160, plant/cabinet right
x415+.

## Architecture decision: container overlays, not Phaser scenes

ONE scene (`clinic`) owns everything; each view is a toggled
`Phaser.GameObjects.Container` overlaying the shared room plate +
Mabel. Rationale (smallest robust option):

- The room plate and Mabel are identical across views — scenes would
  re-preload/re-layout the same assets for zero gain.
- Overlays keep Mabel's bob/blink/update loop running untouched;
  scenes would restart it (blink-timer fights, texture resets).
- Offline fallback is trivial: mock data is a local const, no loader.
- Transitions are container alpha/y tweens — the codebase already
  speaks this language (bubble fade 180/150ms, Sine easings).

Rule: exactly one view container visible at a time (+ nav bar always
visible + admin stack above all). Depth order: room(0) < Mabel(5) <
view containers(10) < nav bar(20) < code pad(30) < admin monitor(31)
< toast/hint(40).

## Shared chrome

Palette: panel cream `#FFF3E2`, text cocoa `#5C4633`, secondary
`#8A6F52`, outline warm-brown `#8A5A3B` 3px, accent sage `#A9C6A2`,
accent sky `#A9CCE3`, danger muted rose `#C9706B`. Font: Baloo 2
everywhere EXCEPT the admin monitor (monospace, see below). Corner
radius 24 (panels), 16 (cards), full-pill (tabs/pills). All tap
targets ≥ 48px in their smallest dimension unless noted.

Spacing system (one system, all chrome — UI polish 2026-10-29):
M_EDGE = 24 canvas→sheet/panel/cards; M_NEST = 16 sheet→inset-rows
and panel→body (nested rects never share the parent edge); G_MD = 12
sibling gaps (card/card, row/row, cards/nav, sheet/nav); G_SM = 8
dense-stack minimum (nametag→chips→cards, tag→body, prompt→dots).
Radii step down per nesting depth: 24 sheets/panels, 16 cards/rows,
12 bubbles/keys, h/2 pills. Baloo slack: pill h ≥ fontSize + 8,
pill side pad ≥ 12px, card side pad ≥ 8px.

Motion language (extends `docs/ANIMATION.md`): fades 180ms in /
150ms out `Sine.easeOut`; slides 250ms `Sine.easeInOut`; card tap =
scale 0.97 90ms yoyo + the existing tap-resolve path (happy bounce
+ bubble), so prototype taps feel like the shipped game.

## (B) PLAYER CHROME

### Top bar (persistent strip; chrome-3)

- Geometry: slim full-width strip, x0–540, y0–32. Cream fill at
  80% alpha so the room shows softly through + 2px whisper
  divider `#8A5A3B` at 25% alpha. Display-only (no tap zones),
  so title taps pass through. Depth 19, under the HUD contents
  (20). Clear of the title (top ~y40) and the admin trigger zone.
- Chrome-3: the profile chip ("You") + difficulty pill ("Gentle"
  + dots) LEFT the main screen for a future submenu (operator
  direction — the submenu will read "Gentle Mode" etc.). The
  strip now frames the Visit HUD contents (coin cluster left,
  context words center — see Visit; the clock left until the
  speed element returns); on other views it rests empty.

### Nav bar (persistent, all views)

- Geometry: full-width dock, x0–540, y888–960 (h72). Cream fill
  at 80% alpha, 2px top divider `#8A5A3B` at 25% alpha.
- Three tabs, 180px cells: Waiting (cx90, queue-dots icon +
  sage count badge: 3 friends waiting) + Visit (cx270, care
  cross) + Learn (cx450, book icon). Code-drawn icons ($0) +
  Baloo 2 15px semibold labels stacked; icon + label dim
  together (inactive 60%, active 100% on a sage pill w118 h60).
  Telemed + Portal tabs are PARKED (views dormant but intact)
  until they earn fun — their icons stay in the icon set for
  the return. A struggling visit lights an amber badge on Learn
  (pulsing until visited).
- Behavior: tap = fade current view out 150ms, fade new view in
  180ms; tab pill slides 200ms `Sine.easeInOut`. Default view: Visit.

### Conversation panel (Visit + Telemed)

- Geometry: x24–516 (w492), top y136, height sizes to text UP TO
  max-h 220 (y136–356), min-h 96. Never overlaps the title
  (ends ~y78) or Mabel (top y508): guaranteed clear band. (The
  old "Tap Mabel" lead-in is gone — the opener greets you.)
- Style: cream GLASS panel r24 (0.86, light-shaded so the opaque
  text pops) + 3px warm-brown outline + small tail triangle
  pointing down toward Mabel (apex at (270, panel bottom +14)),
  SOLID full-outline-color tucked under the panel (chrome-2
  operator direction; was an outlined cream tail). Same tail
  both line kinds — the panel always talks about the patient
  on screen.
- SAY vs TELL (chrome-3 display law, replaces the chrome-2
  quote rule for the panel): every line declares a LineKind.
  'say' = direct speech in the speaker's own voice — quoted +
  tagged ("MILO" etc. sage / "YOU" cream, 14px bold). 'tell' =
  third-person narration ABOUT the subject — unquoted,
  untagged. Untagged narration starts at top+16 (tagged body
  stays top+48); panel height follows. Quoting applies at
  render time, BEFORE the "…" truncate pass.
  Voice split: the patient OPENER is first-person 'say' (quoted
  + tagged, auto-shown on arrival — boot, nav, patient switch);
  consequence + teaching lines stay third-person narrator
  'tell'; veto hold-backs speak as YOU (no NPC doctors yet —
  Dr. Nora is parked until practice upgrades ship). The Medical
  Chart carries the condition note (blurb + plainWords,
  spoiler-free: what it IS, never what fixes it). Portal rule:
  patient bubbles quote, Clinic system lines + snippets stay
  bare.
- Body: Baloo 2 20px cocoa, left-aligned, max 4 lines at 20px
  within max-h; longer copy truncates with "…" (prototype rule —
  flag it in feedback if real copy ever needs scroll).
- Transition: content swap = 150ms fade out, swap text, 180ms fade
  in. Panel itself persists per view (no slide on every line).

### Decision / action card row (Visit + Telemed)

- Geometry: x24–516 (w492), y772–846 (h74). Every visit is a
  3-round mini-story, one 3-card row each (w156): EXAMINE (3
  bedside checks UNIQUE to the case — the best step reveals
  THE distinctive finding worth teaching, e.g. a Centor-node
  neck-gland check for sore throat or turgor for dehydration,
  with clearly-wrong distractors — never a generic maneuver
  list), DIAGNOSE (3 tier-worded condition names), TREAT (3
  action cards). Tap target = full card. Undo rewinds rounds
  too (round + score in the snapshot).
- Decision corral: an outline frame around the row (x16–524,
  y764–856, r18) that reads "these are your choices". The top
  edge has a gap at the left holding a small tier-worded label
  IN the border (12px bold on a frosted card-fill strip —
  part of the border, not a chip), left-aligned so it never
  hints at the middle card. The label names the live round +
  step: "1 · Examine…" / "2 · Diagnose…" / "3 · Choose care…"
  (tier-worded) etc.
  Corral + label ride inside the card row container (fade +
  Telemed shift together).
- Grade stamps: the tapped card earns a sticker (r13, grade
  color, cream glyph — check / dash / cross) on its top-right
  corner plus a reinforcing toast ("Great choice! +1 Care
  Coin" / "Okay — no harm done" / "Oh no — that made things
  worse"), so right/wrong reads three ways (stamp + face +
  toast). Stamps clear with reveals on stage moves.
- Visit end: the TREAT round ends the visit; the SET decides
  (right diagnosis + right treatment = recovered — pure rules
  in `src/game/visit.ts`). A dim + result card (x48–492,
  y340–620) congratulates the PLAYER, never claims the patient
  is better/worse ("Great work, Doctor!" / "Tough case — keep
  going!"), shows visit # + score ("N of 3 right") + coins
  earned, and offers two buttons: recovered → Next patient /
  Learn; struggling → Learn (amber, pulsing) / Try again. The
  card blocks all other taps. Retry resets coins baseline,
  rounds, undo, and state.
- VIEW 5 — LEARN (full-screen): the Learning List sheet behind
  the Learn tab (condition-linked authoritative resources; the
  old strip book button is gone). × returns to Visit; switching
  tabs hides it. A struggling result routes here first.
- Style: white-cream `#FFF9EF` card r16, 3px outline; grade-tinted
  left spine 8px (BEST sage, NOT_GREAT sky, WRONG amber `#D9A441`,
  DANGEROUS rose — prototype shows the spine ONLY after tap, so
  grading stays a discovery, not a giveaway). Label Baloo 2 15px
  semibold cocoa, centered, 2 lines max.
- Behavior: tap = card squash (scale 0.97, 90ms yoyo) then the
  EXISTING tap-resolve path (happy bounce + result line in the
  conversation panel + mock vitals tick). No new resolution logic.
  Chrome-2: a BEST resolve also ticks the mock care-coins pill +1
  (lesser grades and blocked moves pay nothing).
- Disabled state (e.g. DANGEROUS blocked by the engine): card
  dims to 55% + shake 60ms x2 + YOUR hold-back line ("you hold
  back just in time!") — mirrors the shipped `hootLine` veto
  copy, second person, no NPC.

### The four views

VIEW 1 — VISIT (default; today's Mabel scene):

- Keeps the shipped scene visible: wall sign, Milo, nametag
  all as today (no subtitle — the opener greets you).
- Adds: conversation panel (y136+, replaces the old bottom bubble
  — the old bubble dock is RETIRED in this prototype; its content
  moves up so the card row + nav own the bottom), decision card
  row (y796–876), nav bar (y888–960).
- Nametag (y736 — tap it for the Living Chart). The old vitals
  chip row (breath/comfort/visit#) is REMOVED from the main view
  (unclutter: dev-facing values) — its content moves into the
  Medical Chart drawer: top tab of the right-edge rail (radio with exam)
  (handle x0–24, panel x0–192, y300–560), auto-open on each
  patient's first appearance, handle toggles. Contents: the
  patient's SIGNOUT (signout.ts, tier-aware): expert reads like
  a real signout ("Acute visit #4 · 8yF" / 'c/o "wheezy"' /
  "PMH Asthma · Meds: none"), steady expands the abbreviations,
  gentle stays plain sentences; the complaint label is always
  quoted, never conjugated. Lines stack by measured height.
  Visit-only; refreshes on resolve/switch.
- Progress HUD (moved OFF the mid-screen band INTO the top
  strip; Visit-faded, strip persistent). Coin cluster left
  (pill x24–124, h24 r12): metallic gold Care Coin (dark rim,
  amber face, inner ring, shine dot, embossed C) + live count
  14px bold, starts at 12, +1 per BEST round; TAPPING the
  meter opens the Clinic Shop. Context center: BARE bold words
  14px, no pill — the strip is the frame; worded per
  gentle/steady/expert tier from the mock difficulty seed —
  new-patient ("A first hello" / "New Patient" / "New intake"),
  sick-visit ("Feeling poorly" / "Sick Visit" / "Acute visit"),
  follow-up ("Back for a check-in" / "Follow-Up Visit" /
  "Follow-up"); mock derivation (first visit → new, stage 2+ →
  sick, else follow-up), re-derived per resolve. No clock (left
  until the speed element returns). Pills + text opaque;
  translucency stays on the strip.
- Clinic Shop (behind the Profile Care Coins row): tabbed Tools / Medicines
  / Practice sheet (x24–516, y136–876), 4 rows a tab — every
  row teaches one real-practice fact ("Saline Spray — salty
  water that rinses stuffy noses"). Buy buttons spend live
  coins (owned persists locally); the Helper's Desk row reads
  honestly as Soon until staff ship. Closes on view change.

VIEW 2 — WAITING ROOM (minis on the plate):

- No sheet: the waiting plate IS the room. "Waiting Room" 26px
  bold floats on the wall band (x40, y160) + hint "Tap a friend
  to visit" 16px secondary (y194).
- Three minis for whoever is NOT in the visit (slots x120/270/
  420, feet y696): sprite owners stand as 76px minis with name
  16px bold + status 13px below; Theo naps as a code-drawn
  bundle (sky mound + "z") until he gets a sprite. Each mini
  bobs gently (phased), grounds on a faint ellipse, and
  tap-squashes: sprite minis SWITCH the visit (fresh rounds,
  rebuilt cards); Theo toasts "is napping". Rebuilt every
  arrival — never stale faces.
- Milo leads the onboarding (existing-patient sick visit #2);
  Mabel is the returning follow-up (#4), June the true
  first-timer (#1). Per-patient numbers until the backend owns
  visits.

VIEW 3 — TELEMEDICINE (video-call frame) — PARKED (unclutter):

- Same live scene as Visit (Mabel, panel, cards, nav all keep
  their Visit geometry) PLUS a call frame: dark rounded rect
  border (12px `#2B2622`) inset x16–524, y128–876 (r28) drawn
  AROUND the scene — Mabel at (270,614) sits naturally inside.
- Call chrome: red-dot "• LIVE" pill left (x28, y380, w110
  h36, 16px bold white on `#B34A45`); "Clinic › observing"
  pill right (x344–512, y380–416, sky fill, 14px) — both sit
  BELOW the conversation panel (panel bottom ≤370), so they
  never cover the speaker tag; bottom
  call bar inside the frame y828–872: mute/camera "buttons"
  (mock toggles, 48px circles) + green "Visit in person →"
  pill switching back to Visit. The decision card row shifts up
  to y736–816 in this view to clear the call bar (nametag/vitals
  chips hidden in Telemed — the frame owns the bottom).
- Scanline/vignette: none (keep the photo plate clean); the frame
  + pills alone must sell "video call".

VIEW 4 — PORTAL (secure messages) — PARKED (unclutter):

- Opaque cream sheet x24–516, y136–876 (r24), same shell as
  Waiting. Header y136–184: "Patient Portal" 26px bold + lock
  note "mock inbox — stays on this device" 14px secondary.
- Three thread rows, each w460 (x40–500) h92, gaps 12, from y196:
  "Clinic — Mabel's visit notes" (2 new), "Clinic — Appointment
  reminder", "Clinic — Breathe-easy plan". Row: sender 19px
  bold, snippet 16px secondary (1 line), unread dot sage 12px,
  chevron "›" 28px right. Tap target full row.
- Tap row = expands inline (row grows to h~220 pushing others
  down, 250ms slide; only one open at a time): shows 2–3 mock
  bubbles (incoming sky-tint left, outgoing cream right, 17px)
  + a disabled reply field "Replies open after the visit (mock)"
  44px tall. Collapse on second tap.
- Footnote y826: "No real messages — everything here is pretend."

### Mock-data shapes (local consts, no fetch)

```ts
type Grade = 'BEST' | 'NOT_GREAT' | 'WRONG' | 'DANGEROUS';

interface MockVitals { pep: number; comfort: number; breathing: number; }

interface MockPatientProfile {
  name: string;            // 'Mabel'
  conditionId: string;     // 'asthma' (matches CONDITIONS key)
  conditionName: string;   // 'Asthma'
  stageIndex: number;      // 2
  stageId: string;         // 'wheezy'
  stageLabel: string;      // 'Wheezy'
  vitals: MockVitals;      // { pep: 2, comfort: 2, breathing: 1 }
  visitNo: number;         // 4
  nodeId: string;          // 'asthma-v4-n07' (trajectory node)
  wordingTier: string;     // 'gentle' | 'plain' | 'clinical'
  difficulty: 1 | 2 | 3;   // 1 = early (2-3 choices), 3 = late (4-5)
}

interface MockChoiceCard {
  id: string;              // 'calm-air' (matches CONDITIONS action id)
  label: string;           // 'Sit upright in calm air'
  grade: Grade;            // mock-resolved; DANGEROUS demos the veto
  resultLine: string;      // conversation-panel line after tap
}

interface MockRosterEntry {
  name: string; persona: string; furShade: string; status: string;
}

interface MockThread { id: string; from: string; subject: string;
  snippet: string; unread: number; messages: { me: boolean; text: string }[]; }

// Chrome-2 mock chrome (mockData.ts; real economy/wording later):
type ChromeTier = 'gentle' | 'steady' | 'expert';  // from difficulty 1/2/3
type VisitContext = 'new-patient' | 'sick-visit' | 'follow-up';
const VISIT_CONTEXT_WORDING: Record<VisitContext, Record<ChromeTier, string>>;
const MOCK_CARE_COINS_START = 12;
const MOCK_PROFILE_LABEL = 'You';
// quoteIfSpoken(from, me, text): patient speech ("Milo" etc.)
// wraps in "..." at render; player/system bare.
```

Seed values: Mabel / asthma @ stageIndex 2 ('wheezy') /
visit #4 / node `asthma-v4-n07` / wording 'gentle' / difficulty 1;
cards: calm-air (BEST), rescue-puffer (BEST),
dusty-blanket (DANGEROUS → veto demo).

## (A) DEV ADMIN VIEW

Reads as part of the clinic world: a wall-mounted monitor behind
glass, not a debug dump.

- Wall sign: "Cozy Clinic" hangs ON the wall (cream plaque
  320x56 at x110–430, y36–92 + hanger rods + sage cross chip),
  shown on waiting/visit/learn. No floating title anywhere.
- SECRET TRIGGER: tap the wall sign 5 times within 3s.
  Sign zone 240x64 centered (270,64). Feedback: each tap tiny
  sign scale pulse (0.98, 60ms); 5th tap
  opens the code pad. No visible hint anywhere in player UI.
  Counter resets after 3s of no title taps.
- CODE PAD: centered sheet x90–450 (w360), y296–664 (r24, cream,
  dim behind at 45%). Prompt "Staff only" 18px secondary + 5
  dot slots (M·A·B·E·L). Letter grid: 3 cols x 4 rows of 56px
  keys (A–M minus J: A B C / D E F / G H I / K L M — corrected
  2026-10-29 by the UI builder, the spec's A–L had no M so the
  MABEL code was untypable) — tap target 56x56, gaps 10.
  DEV CODE: `MABEL`. Correct = pad fades 150ms, monitor slides
  in. Wrong = shake 60ms x2 + dots clear. Cancel "‹ back" 48px
  tall. (NOT a real secret — prototype gate only, documented
  here by design.)
- MONITOR: wall-mounted terminal, x36–504 (w468), y150–700
  (h550, r16), dark phosphor `#0E1B14` fill + 6px walnut frame
  `#6B4A2F` + glass glare (white 6% diagonal stripe) + tiny
  wall-mount bar above (x220–320, y132–150). Slides down from
  y-600 to y150 over 350ms `Sine.easeOut`; close reverses 250ms.
  Scanline hint: 1px horizontal lines every 4px at 5% white —
  cheap Graphics pass, static (no animation cost).
- SCREEN CONTENT (monospace 17px, phosphor green `#9FE8B8`,
  headers amber `#E8C96A`, values cream `#EAF5E9`):
  `COZY CLINIC — STAFF TERMINAL`, `patient: Mabel`,
  `condition: Asthma (asthma)`,
  `stage: [2] Wheezy (wheezy)`,
  `vitals: energy 6 · comfort 6 · breath 6`,
  `visit: #4 · node: asthma-v4-n07`,
  `wording: gentle · difficulty: 1/3`,
  plus a 1-line Living Chart note:
  `"remembers: used the puffer like a champ!"`.
  Values are LIVE reads of the same mock state the Visit view
  uses (tap a choice card, reopen, numbers moved) — mocked, but
  single-sourced, never hard-coded twice.
- CLOSE: "×" button top-right of the frame, 48x48 tap target
  (x452–500, y154–202), cream on walnut. Also closes on
  backdrop tap outside the monitor. Neither control is reachable
  without the code — the monitor never peeks otherwise.
- V1 ASSET BROWSER: "› ASSETS" button bottom-right of the screen
  opens a same-frame overlay (depth 32): PLATES tab (8 plates,
  live thumbs) + FACES tab (active patient's 6 frames); tap a
  thumb for a large preview + the verbatim paste-back snippet
  (e.g. `PLATE_PIN = { visit: 'exam-b' }`). BACK returns to the
  monitor; monitor close hides both.

## Responsive / edge notes

- 540x960 is the ONLY canvas (Phaser FIT letterboxes elsewhere);
  all coords above are canvas px. No orientation change (portrait).
- Text overflow rule: conversation 4 lines, card labels 2 lines,
  thread snippets 1 line — truncate with "…", never wrap into
  Mabel or the nav. Baloo 2 metrics differ from Georgia; verify
  on device.
- Mabel stays interactive in Visit/Telemed (tap = happy bounce);
  in Waiting/Portal/overlay states Mabel is covered and
  non-interactive (input disabled with the view swap, not just
  visually hidden).
- Admin stack locks the nav (tabs disabled while pad/monitor
  open) so a view swap can't strand the monitor.

## Open tradeoffs (chosen; push back in feedback)

1. Overlays over scenes — fastest, offline-trivial, keeps Mabel's
   motion loop alive; costs some container-spaghetti later.
2. Old bottom bubble RETIRED — conversation moves to the upper
   panel so cards + nav own the bottom. Reversible if you loved it.
3. Waiting/Portal sheets COVER Mabel — simpler than re-laying the
   room per view, but Mabel vanishes twice. Alternative: shrink
   Mabel to a corner buddy (extra layout work).
4. Grading spines hidden until AFTER tap — preserves discovery;
   alternative is always-visible difficulty coloring.
5. DANGEROUS card always present in the mock row — demos the veto
   every session; ship may randomize the row instead.
6. Telemed reuses Visit geometry + frame — cheapest "video call"
   sell; a dedicated camera-crop layout would read stronger.
7. Dev code is a word (MABEL) not digits — thematic, thumbable;
   digits would look more "terminal".

## Feedback questionnaire (operator — playtest on a phone first)

1. Feel: does the Visit screen still read cute/friendly/inviting
   with the panel + cards + nav added, or did the chrome eat the
   coziness? What would you cut first?
2. Conversation panel: is the upper placement (above Mabel) easy
   to read while tapping cards at the bottom, or does your thumb
   cover Mabel at the key moment?
3. Card row: 2 cards or 3 — which count felt right, and did any
   label need a second line? Did tapping feel like the old
   tap-Mabel resolve?
4. Waiting Room: did Mabel vanishing behind the roster sheet feel
   fine, jarring, or unnoticed? Would you rather she stay visible?
5. Telemed: did the frame + LIVE pill sell "video call", or did it
   read as Visit with a border? What one element would sell it?
6. Portal: did the inline-expanding thread feel good, or would you
   rather a full thread screen? Was the mock-reply field clear?
7. Admin: trigger discoverable enough for staff yet invisible to
   players? Does the monitor read as clinic furniture or a debug
   dump? Is `MABEL` too guessable for a prototype gate?
8. Cut/keep: if we ship only TWO of the four nav views for the
   demo, which two — and what is missing that the demo cannot
   live without?
