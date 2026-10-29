# UI_PROTOTYPE.md — Little Lives: Cozy Clinic

Interactive UI prototype spec, operator-ordered BEFORE backend work.
Playtest this on a phone and answer the questionnaire at the end —
your answers shape the real implementation.

Constraints: 540x960 portrait canvas (Phaser FIT). NO game-code edits,
NO images, NO backend calls in this pass — all content below is
MOCK/LOCAL and the demo path stays fully offline. Dev code below
(`MABEL`) is a documented prototype convenience, NOT a real secret.

Source geometry this spec builds on (`ClinicScene.ts` today): title
"Cozy Clinic" centered (270,56), subtitle (270,100), Mabel 212px at
(270,614) — sprite box x164–376, y508–720 — nametag y748, complaint
bubble 492 wide docked at bottom 936. SIDE=24 margins, Baloo 2 face,
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
  context words center, clock cluster right — see Visit); on
  other views it rests empty.

### Nav bar (persistent, all views)

- Geometry: full-width dock, x0–540, y888–960 (h72). Cream fill
  at 80% alpha (chrome-2: was opaque), 2px top divider
  `#8A5A3B` at 25% alpha (was 3px at 40%). Quieter styling,
  same 4 tabs. Safe: sits below today's
  bubble dock (936) — the Visit view re-docks the bubble higher
  (see Visit).
- Four tabs, each 135 wide x 72 tall (tap target 135x72):
  Waiting (center x67), Visit (x202), Telemed (x337), Portal (x472).
- Each tab: code-drawn icon (chrome-3, $0 — waiting = queue
  dots, visit = care cross on sage, telemed = video play,
  portal = envelope) + short label (Baloo 2 15px semibold)
  stacked; icon + label dim together (inactive 60%, active 100%
  on a sage pill w118 h60 centered in the tab cell). Icons do
  the lifting, words anchor.
- Behavior: tap = fade current view out 150ms, fade new view in
  180ms; tab pill slides 200ms `Sine.easeInOut`. Default view: Visit.

### Conversation panel (Visit + Telemed)

- Geometry: x24–516 (w492), top y136, height sizes to text UP TO
  max-h 220 (y136–356), min-h 96. Never overlaps the subtitle
  (ends ~y118) or Mabel (top y508): guaranteed clear band.
- Style: cream panel r24 + 3px warm-brown outline + small tail
  triangle pointing down toward Mabel (apex at (270, panel bottom
  +14)), SOLID full-outline-color tucked under the panel
  (chrome-2 operator direction; was an outlined cream tail).
  Same tail both line kinds — the panel always talks about the
  patient on screen.
- SAY vs TELL (chrome-3 display law, replaces the chrome-2
  quote rule for the panel): every line declares a LineKind.
  'say' = direct speech in the speaker's own voice — quoted +
  tagged ("MABEL" sage / "DR. NORA" sky / "YOU" cream, 14px
  bold). 'tell' = third-person narration ABOUT the subject —
  unquoted, and the tag hides when the subject is on screen
  (Mabel); Nora's off-screen interventions keep her tag so the
  player knows who stepped in. Untagged narration starts at
  top+16 (tagged body stays top+48); panel height follows.
  Quoting applies at render time, BEFORE the "…" truncate pass.
  All current engine copy (complaint, narrative, teaching,
  blocked reasons) is narrator voice, so every panel caller
  passes 'tell' — quotes return with first-person trajectory
  dialogue. Portal rule unchanged: Nora's message bubbles quote,
  player replies + Clinic system lines + snippets stay bare.
- Body: Baloo 2 20px cocoa, left-aligned, max 4 lines at 20px
  within max-h; longer copy truncates with "…" (prototype rule —
  flag it in feedback if real copy ever needs scroll).
- Transition: content swap = 150ms fade out, swap text, 180ms fade
  in. Panel itself persists per view (no slide on every line).

### Decision / action card row (Visit + Telemed)

- Geometry (G4): x24–516 (w492), y788–862 (h74). Two cards:
  each w240, gap 12. Three cards: each w156, gaps 12. Tap
  target = full card (≥156x74 — generous). Shifted up to clear
  the F1 ticker row (y870–888).
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
  dims to 55% + shake 60ms x2 + Dr. Nora "stepped in" line —
  mirrors the shipped `hootLine` veto copy.

### The four views

VIEW 1 — VISIT (default; today's Mabel scene):

- Keeps the shipped scene visible: title, subtitle, Mabel,
  nametag all as today.
- Adds: conversation panel (y136+, replaces the old bottom bubble
  — the old bubble dock is RETIRED in this prototype; its content
  moves up so the card row + nav own the bottom), decision card
  row (y796–876), nav bar (y888–960).
- Nametag (y740, G4 — tap it for the Living Chart) gains a
  mock vitals chip row beneath it: y758–780, three pills (w~120
  h~22, 14px): e.g. "• breath 3", "• comfort 2", "visit #4".
  Decorative mock, ticks on resolve.
- Progress HUD (chrome-3: moved OFF the mid-screen band INTO the
  top strip; Visit-faded, strip persistent). Coin cluster left
  (pill x24–124, h24 r12): code-drawn coin+ icon + mock count
  14px bold, starts at 12, +1 per BEST resolve (mock — real
  `coin_ledger` accrual later). Context center: BARE bold words
  14px, no pill — the strip is the frame; worded per
  gentle/steady/expert tier from the mock difficulty seed —
  new-patient ("A first hello" / "New Patient" / "New intake"),
  sick-visit ("Feeling poorly" / "Sick Visit" / "Acute visit"),
  follow-up ("Back for a check-in" / "Follow-Up Visit" /
  "Follow-up"); mock derivation (first visit → new, stage 2+ →
  sick, else follow-up), re-derived per resolve. Clock cluster
  right (pill x416–516, h24 r12): code-drawn clock-hands icon +
  mm:ss 14px bold from scene start, display-only — urgency feel,
  no rewards/penalties wired. Pills + text opaque; translucency
  stays on the strip. The old y376–412 band is clear (Telemed's
  LIVE pills keep their y380 home).

VIEW 2 — WAITING ROOM (roster):

- Opaque cream sheet x24–516, y136–876 (r24, covers Mabel —
  deliberate: roster-picking is its own moment; Mabel returns on
  Visit). Title row y136–184: "Waiting Room" 26px bold + mock
  clock pill "10:24 AM".
- Four roster rows, each w460 (x40–500) h120, gaps 12, starting
  y196: Mabel y196–316, June y328–448, Milo y460–580, Theo
  y592–712. (Bottom y712–876 left as breathing room + "Dr. Nora
  is with a patient…" footnote at y826.)
- Each row: 84px avatar circle (initial letter in fur-shade fill
  — Mabel `#A2766B`, June `#C4A484`, Milo `#CDB9A8`, Theo
  `#8F7364`; NO generated faces this pass), name 22px bold +
  persona 16px secondary (two lines, x130–400), status pill
  right (w~110 h36, 15px): Mabel "VISIT 4 • here", June "waiting",
  Milo "checked in", Theo "napping". Tap row = squash, then
  (roster phase): Mabel/June/Milo rows SWITCH the visit to that
  patient (fresh state, stored root, rebuilt cards); re-tapping
  the active patient toasts "already with you"; Theo stays mock.
- Tap target: full row 460x120.

VIEW 3 — TELEMEDICINE (video-call frame):

- Same live scene as Visit (Mabel, panel, cards, nav all keep
  their Visit geometry) PLUS a call frame: dark rounded rect
  border (12px `#2B2622`) inset x16–524, y128–876 (r28) drawn
  AROUND the scene — Mabel at (270,614) sits naturally inside.
- Call chrome: red-dot "• LIVE" pill left (x28, y380, w110
  h36, 16px bold white on `#B34A45`); "Dr. Nora › observing"
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

VIEW 4 — PORTAL (secure messages):

- Opaque cream sheet x24–516, y136–876 (r24), same shell as
  Waiting. Header y136–184: "Patient Portal" 26px bold + lock
  note "mock inbox — stays on this device" 14px secondary.
- Three thread rows, each w460 (x40–500) h92, gaps 12, from y196:
  "Dr. Nora — Mabel's visit notes" (2 new), "Clinic — Appointment
  reminder", "Dr. Nora — Breathe-easy plan". Row: sender 19px
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
// quoteIfSpoken(from, me, text): named-cast speech ("Mabel",
// "Dr. Nora") wraps in "..." at render; me/system bare.
```

Seed values: Mabel / asthma @ stageIndex 2 ('wheezy') /
visit #4 / node `asthma-v4-n07` / wording 'gentle' / difficulty 1;
cards: calm-air (BEST), rescue-puffer (BEST),
dusty-blanket (DANGEROUS → veto demo).

## (A) DEV ADMIN VIEW

Reads as part of the clinic world: a wall-mounted monitor behind
glass, not a debug dump.

- SECRET TRIGGER: tap the "Cozy Clinic" title 5 times within 3s.
  Title zone x150–390, y28–84 (generous around the 44px text).
  Feedback: each tap tiny title scale pulse (0.98, 60ms); 5th tap
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
