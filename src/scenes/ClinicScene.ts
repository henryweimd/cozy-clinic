import Phaser from 'phaser';
import { ClinicalEngine, CONDITIONS } from '../clinical';
import type { ChoiceGrade, PatientState, TrajectoryNode } from '../clinical';
import {
  CARD_ROW_IDS,
  CHOOSE_PROMPT_WORDING,
  CHROME_TIER_BY_DIFFICULTY,
  CHROME_TIER_LABEL,
  MOCK_ROSTER,
  MOCK_THREADS,
  PROTOTYPE_SEEDS,
  moveWaiting,
  quoteIfSpoken,
  waitingNames,
} from '../ui/mockData';
import type { ChromeTier, VisitContext } from '../ui/mockData';
import { BackendTicker } from '../ui/ticker';
import { ToolTray } from '../ui/toolTrays';
import type { ToolDef } from '../ui/toolTrays';
import {
  DEMO_HANDLE,
  DOCTOR_HANDLES,
  TEAM_TAGS,
  cleanHandle,
  cleanTeam,
  teammatesFirst,
} from '../data/sharedCare';
import {
  doctorByline,
  handoffSummary,
  loadCheers,
  loadHandoffs,
  nextCheer,
  pushOutbox,
  sendCheer,
  sendHandoff,
  shiftOutbox,
} from '../data/sharedCare';
import type { Cheer, CheerDraft, HandoffDraft, HandoffNote } from '../data/sharedCare';
import { HandoffSheet } from '../ui/handoffSheet';
import { LivingChart } from '../ui/livingChart';
import { signoutLines } from '../ui/signout';
import { examQuestion, isPerfectVisit, resultCopy, roundQuestion, scoreCount, visitOutcome } from '../game/visit';
import type { RoundScore, VisitOutcome } from '../game/visit';
import { actionLabel, CONDITION_TIER_NAMES, EXAM_OTHER_FINDING } from '../clinical/conditions';
import type { ConditionId } from '../clinical/types';
import { LearnList } from '../ui/learnList';
import { AssetBrowser } from '../ui/assetBrowser';
import { RAIL_SLOTS, RAIL_X, TAB_H, TAB_W, ChartDrawer } from '../ui/chartDrawer';
import {
  childFor,
  childSpecs,
  extendTree,
  loadCast,
  mergeExtension,
  patientByName,
  rootNode,
} from '../data/patients';
import type { CastData } from '../data/patients';
import { FALLBACK_EXAM_FINDINGS, FALLBACK_PATIENTS } from '../data/fallbackPack';
import type { ExamModality, FallbackExamFinding } from '../data/fallbackPack';
import { findingFor, loadExamFindings } from '../data/examFindings';
import {
  EARN_BEST,
  EARN_LEARN_FIRST,
  EARN_PERFECT,
  EARN_QUIZ_PASS,
  deserializeWallet,
  earn,
  emptyWallet,
  serializeWallet,
  spend,
} from '../game/economy';
import type { Wallet } from '../game/economy';
import { buyItem, learnBonus, nurseBonus, perfectBonus, toolBonus } from '../game/shop';
import type { ShopItem } from '../game/shop';
import { AboutSheet } from '../ui/aboutSheet';
import { ProfileEditor } from '../ui/profileEditor';
import type { ProfileKind } from '../ui/profileEditor';
import { ShopSheet } from '../ui/shopSheet';
import { blinkCloseMs, blinkGapMs, bobRate, SPRITE_PREFIX } from '../game/sprites';
import { takeFirstQuizHint, takeTrayHint, takeUndoHint } from '../game/hints';
import { clearUndo, emptyUndo, pushMove, undoDepth, undoLabel, undoMove } from '../game/undo';
import type { UndoStack } from '../game/undo';

/**
 * Milestone 1 clinic scene: a cozy clinic room and Mabel, the first
 * patient. She greets you herself on arrival.
 *
 * ART-DIRECTION REBOOT (2026-10-29): the room shell is the
 * photorealistic minimal clinic plate
 * `assets/room/clinic-shell-reboot-01.png` (1080x1920, Block B;
 * see art/manifest.json backgrounds[] reboot entry), and Mabel
 * is the Jolly-style redesign (`mochi-reboot-idle/blink/happy.png`,
 * 192px class, Block C; rev-2 refinement 2026-10-29: same files,
 * same geometry, owned rose-taupe identity + smooth edges — no
 * layout change). Texture keys (`mabel-idle`, `plate-<slug>`,
 * ...) follow the Mochi→Mabel rename; file paths (the
 * `mochi-reboot-*.png` slugs) are unchanged for stability. The old
 * plush room-shell + plush Mabel + plush props are SUPERSEDED
 * (files left on disk, manifest-flagged); old plush-room constants
 * are retired (see the reboot landmark survey below).
 * Motion implements docs/ANIMATION.md exactly (bob 3px @ 1.8
 * rad/s; blink 120ms per 3-5s randomized, idle-only (Theo: 220ms
 * per 2-3.5s, sleepy cadence); tap bounce
 * 110ms squash +-0.06 + 80ms overshoot +-0.03, Sine easings,
 * token-guarded). Expression state machine is LIVE: Mabel rests
 * on the steady face for the live stage/vitals (sick/pained/
 * relieved/idle) and flashes happy/relieved/pained on resolves.
 *
 * UI PROTOTYPE (2026-10-29, docs/UI_PROTOTYPE.md): container
 * overlays on the ONE clinic scene — conversation panel, decision
 * card row, 4-view nav (Waiting/Visit/Telemed/Portal), secret
 * title-5x trigger + MABEL code pad + wall monitor. Mabel's
 * geometry (212px at (270,614)), motion, and tap-resolve behavior
 * are IDENTICAL in Visit; the happy bounce is one shared method
 * used by Mabel taps and card taps. The old bottom bubble is
 * RETIRED per spec — the upper conversation panel is its new home
 * (same complaint copy, same 180/150ms fades, same toggle).
 * LIVE vs MOCK: vitals, condition, stage, grades, and consequence
 * text read live from the ClinicalEngine/patient state; only the
 * roster, portal inbox, and visit-session seeds come from the
 * clearly-marked MOCK module (`src/ui/mockData.ts`).
 *
 * CHROME-2 (2026-10-29, docs/UI_PROTOTYPE.md): subtle translucent
 * chrome — a slim top bar (mock profile chip + mock difficulty
 * dots, middle left empty for future controls) and a translucent
 * bottom toolbar (same 4 tabs, quieter); the conversation-panel
 * tail is solid outline-color tucked under the panel; MABEL and
 * Patient lines render quoted (YOU/narration unquoted); a
 * Visit-only progress HUD (mock care-coins pill, display-only
 * mm:ss timer, tier-worded visit-context label). Only the two bar
 * strips are translucent; every pill and every text stays opaque.
 * Mabel geometry/motion/expressions, panel fades, admin stack,
 * and offline behavior are untouched.
 *
 * CHROME-3 (2026-10-29, docs/UI_PROTOTYPE.md): icon-led
 * simplification per operator feedback. (1) SAY vs TELL: the
 * panel takes a LineKind — 'say' renders quoted + tagged direct
 * speech, 'tell' renders unquoted narration with NO tag when
 * its subject is on screen (Mabel). Veto hold-backs speak as
 * YOU (no NPC doctors yet). (2) The progress HUD moves
 * OFF the mid-screen band into the slim top strip (coin cluster
 * left, context center, clock cluster right; Visit-faded, strip
 * persistent). The profile chip + difficulty pill leave the main
 * screen for a future submenu. (3) Code-drawn icon set ($0,
 * pixel-crisp at any DPI, offline-safe): coin+ and clock-hands
 * in the top strip, cross / queue-dots / video / envelope
 * tab icons replacing the text glyphs. Title, panel fades,
 * admin stack, plates, and offline behavior untouched.
 *
 * G4 INTEGRATION (2026-10-29): the G3 modules join the scene —
 * backend ticker (1 row, everywhere except Telemed), exam tool
 * tray (Visit only), Living Chart (nametag tap), Learning
 * List (strip book button, Waiting/Portal). The cast loads live
 * (Supabase, fallback offline): the opener is the patient's own
 * first-person greeting, and resolves read stored children —
 * engine state stays authoritative, words come from pre-computed
 * futures, and walking off the tree grows it in the background.
 * Geometry:
 * nametag 740, chips 758, cards y788 h74, toast to the freed
 * y368 band — all gaps re-audited (auditor: 0 findings).
 *
 * CHOOSE-NUDGE (2026-10-29): the card row carries a tier-worded
 * "Choose…" tab straddling its top edge (display-only, rides
 * with the row), and after 6s idle the cards lift in a stagger
 * + the tab swells once (no glow, taste law). Round-type
 * content variety (diagnose/ask/examine/watchful-waiting) is a
 * queued encounter-variety phase, not this fix.
 *
 * ROSTER (2026-10-29): Mabel/June/Milo are all playable. The
 * scene runs an active patient (name -> sprite prefix + speaker
 * + cast row); tapping a playable waiting row switches the
 * visit (fresh engine state for THEIR condition, stored root,
 * rebuilt cards, live nametag). Asthma keeps the fixed demo
 * card row; other conditions show their first 3 live actions.
 * Same geometry, same motion, same 212px stage for everyone.
 *
 * UNCLUTTER (2026-10-29): vitals chips REMOVED from the main view
 * (dev-facing values) — replaced by a Medical Chart rail tab
 * (name, visit type + #, condition + stage, one-line blurb),
 * auto-open on each patient's first appearance, handle toggles.
 * The Choose tab is replaced by a decision CORRAL: an outline
 * frame around the card row with a fieldset label in a top-edge
 * gap, left-aligned (also fixes the old tab's scale-about-origin
 * jump). Nav bar is Waiting Room + Visit only (Telemed/Portal
 * parked, views dormant but intact). Geometry: nametag 736,
 * cards y772 h74, corral y764-856, label y756-772 from x44.
 *
 * Reboot landmark survey (re-measured from
 * art/contact-sheets/bg-reboot-contact-sheet.png + pixel scans
 * of the plate, 540x960 space): baseboard/wall-floor ~696 at
 * center; rug top ~712, rug widest ~x40-500 (y~800); bench left
 * x0-160, seat y~620-660, legs to ~700 (right-leg sliver
 * x189-197 sits behind Mabel's left edge — accepted depth, per
 * asset artist); plant mass x~415+, cabinet x~465+; window glass
 * x490+ y95-199 (title stays centered); title zone + bubble zone
 * clear. GROUND = 724 kept: Mabel feet at 720 land ~8px inside
 * the rug, shadow ellipse at 724 on the rug.
 *
 * Layout contract (fix-layout-01 spacing system, survives the
 * reboot): SIDE = 24, GROUND = 724, Mabel 212px at (270, 614).
 */
/**
 * P4: the one plush face for every text object — Baloo 2 (vendored
 * offline, boot-gated in main.ts) over a rounded-system fallback
 * stack, so text stays friendly even if the font file ever fails.
 * (The staff monitor is the one exception: monospace, by spec.)
 */
const FONT_FAMILY =
  '"Baloo 2", "Comic Sans MS", "Chalkboard SE", system-ui, sans-serif';
const MONO_FONT = '"Courier New", ui-monospace, monospace';

// Prototype palette (docs/UI_PROTOTYPE.md shared chrome).
// UI-POLISH SPACING SYSTEM (one system, all chrome): M_EDGE = 24
// canvas→sheet/panel/cards; M_NEST = 16 sheet→inset-rows and
// panel→body; G_MD = 12 sibling gaps (card/card, row/row,
// cards/nav, sheet/nav); G_SM = 8 dense-stack minimum
// (nametag→chips→cards, tag→body, prompt→dots — nothing < 8).
// Radii step down per nesting depth: R0 = 24 top sheets/panels,
// R1 = 16 cards/rows, R2 = 12 bubbles/keys, PILL = h/2 tags/chips;
// a nested rect never shares its parent's edge (>= M_NEST inset).
// Baloo slack: fixed pill h >= fontSize + 8, pill horizontal pad
// >= 12px/side, card pad >= 8px/side, wrap width = rectW - 2*inset.
const CREAM = 0xfff3e2;
const CARD_FILL = 0xfff9ef;
const OUTLINE = 0x8a5a3b;
const SAGE = 0xa9c6a2;
const SKY = 0xa9cce3;
const AMBER = 0xd9a441;
const ROSE = 0xc9706b;
const COCOA = '#5c4633';
const SECONDARY = '#8a6f52';
// Chrome-2: bar-strip translucency only — pills + text stay opaque.
const CHROME_ALPHA = 0.8;
// Glass law: large surfaces go translucent, light-shaded so the
// opaque text pops; small pills + glyphs stay solid.
const GLASS_PANEL = 0.86;
const GLASS_CARD = 0.9;

const GRADE_COLOR: Record<ChoiceGrade, number> = {
  BEST: SAGE,
  NOT_GREAT: SKY,
  WRONG: AMBER,
  DANGEROUS: ROSE,
};

type ViewName = 'waiting' | 'visit' | 'telemed' | 'portal' | 'learn' | 'profile';
type Speaker = 'MABEL' | 'JUNE' | 'MILO' | 'THEO' | 'PRIYA' | 'ELLIS' | 'YOU';



function speakerFor(patientName: string): Speaker {
  const key = patientName.trim().toUpperCase();
  if (
    key === 'JUNE' || key === 'MILO' || key === 'MABEL' || key === 'THEO' ||
    key === 'PRIYA' || key === 'ELLIS'
  )
    return key;
  return 'MABEL';
}

/** Pre-move snapshot for the 10-move undo stack. */
interface UndoSnapshot {
  state: PatientState;
  nodeId: string | null;
  depth: number;
  coins: number;
  visitEarned: number;
  reveals: (ChoiceGrade | null)[];
  round: VisitRound;
  score: RoundScore;
}

const WALLET_STORAGE_KEY = 'cozy-wallet-v1';
const SHOP_STORAGE_KEY = 'cozy-shop-v1';
const LEARN_FILED_KEY = 'cozy-learn-filed-v1';
const LEARN_OPENED_KEY = 'cozy-learn-opened-v1';
const LEARN_PASSED_KEY = 'cozy-learn-passed-v1';
const DIFFICULTY_KEY = 'cozy-difficulty-v1';
const HANDLE_STORAGE_KEY = 'cozy-doctor-handle-v1';
const TEAM_STORAGE_KEY = 'cozy-team-tag-v1';
const OUTBOX_STORAGE_KEY = 'cozy-handoff-outbox-v1';
const CHEER_OUTBOX_KEY = 'cozy-cheer-outbox-v1';
/**
 * SAY vs TELL (chrome-3): 'say' = direct speech in the speaker's
 * own voice (quoted + tagged); 'tell' = third-person narration
 * ABOUT the subject (unquoted, untagged).
 */
type LineKind = 'say' | 'tell';

const TAB_X: Record<ViewName, number> = {
  waiting: 68,
  visit: 202,
  learn: 338,
  profile: 472,
  // Telemed + Portal tabs are parked (views kept dormant, code
  // intact) — the bar is Waiting + Visit + Learn + Profile.
  telemed: 337,
  portal: 472,
};

// Backdrop plate library (ART_BIBLE.md appendix: 4 settings x 2
// variants). Texture keys are `plate-<slug>`; all files are local
// so the demo path stays fully offline. `exam-a` is the SHIPPED
// plate (same file, same pixels); the other 7 are new.
const PLATE_FILE: Record<string, string> = {
  'exam-a': 'assets/room/clinic-shell-reboot-01.png',
  'exam-b': 'assets/room/clinic-exam-b.png',
  'waiting-a': 'assets/room/clinic-waiting-a.png',
  'waiting-b': 'assets/room/clinic-waiting-b.png',
  'telemed-a': 'assets/room/clinic-telemed-a.png',
  'telemed-b': 'assets/room/clinic-telemed-b.png',
  'portal-a': 'assets/room/clinic-portal-a.png',
  'portal-b': 'assets/room/clinic-portal-b.png',
};
const PLATE_SETTING: Record<ViewName, string> = {
  waiting: 'waiting',
  visit: 'exam',
  telemed: 'telemed',
  portal: 'portal',
  learn: 'exam',
  profile: 'exam',
};
// One-line pin: pin any view to any plate slug (e.g. { visit:
// 'exam-b' }); empty = parity rule below. Unpinned views keep
// rotating; unknown slugs are ignored (parity rule applies).
const PLATE_PIN: Partial<Record<ViewName, string>> = { visit: 'exam-b' };
/**
 * Per-view wiring rule: each view shows its setting plate; the A/B
 * variant rotates by visit-count parity (even visitNo -> A, odd ->
 * B), so the opener (visitNo 4) shows all A and visit 5 shows all
 * B. A PLATE_PIN entry wins for its view.
 */
function plateForView(view: ViewName, visitNo: number): string {
  const pin = PLATE_PIN[view];
  if (pin !== undefined && PLATE_FILE[pin] !== undefined) return pin;
  return `${PLATE_SETTING[view]}-${visitNo % 2 === 0 ? 'a' : 'b'}`;
}

interface CardWidgets {
  root: Phaser.GameObjects.Container;
  face: Phaser.GameObjects.Graphics;
  spine: Phaser.GameObjects.Graphics;
  stamp: Phaser.GameObjects.Graphics;
  /** Card width (156 for 3-card rounds, 114 for future 4–5 rows). */
  w: number;
  actionId: string;
  revealed: ChoiceGrade | null;
}

/** Visit rounds: every case is a 3-beat mini-story. */
type VisitRound = 'examine' | 'diagnose' | 'treat';

/** Tray maneuver -> exam_findings modality. */
const TOOL_MODALITY: Record<ToolDef['id'], ExamModality> = {
  inspection: 'look',
  palpation: 'feel',
  percussion: 'tap',
  auscultation: 'listen',
};

interface ThreadWidgets {
  root: Phaser.GameObjects.Container;
  bg: Phaser.GameObjects.Graphics;
  extras: Phaser.GameObjects.Container;
  zone: Phaser.GameObjects.Zone;
  collapsedH: number;
  expandedH: number;
}

export class ClinicScene extends Phaser.Scene {
  private roomBg!: Phaser.GameObjects.Image;
  private patient!: Phaser.GameObjects.Image;
  private patientShadow!: Phaser.GameObjects.Ellipse;
  private patientBaseY = 0;
  /** Active playable patient (Milo leads the onboarding). */
  private activeName = 'Milo';
  private blinkAt = 0;
  private sneezeAt = 0;
  private sneezeText!: Phaser.GameObjects.Text;
  private showingFlash = false;
  private flashToken = 0;
  private engine = new ClinicalEngine();
  /** Live patient state — the single source the monitor reads. */
  private patientState!: PatientState;
  private lastNodeId = 'n0';

  private devTrigger!: Phaser.GameObjects.Container;
  private nametag!: Phaser.GameObjects.Text;

  // Conversation panel (the retired bubble's new home, upper dock).
  private panel!: Phaser.GameObjects.Container;
  private panelBg!: Phaser.GameObjects.Graphics;
  private panelTag!: Phaser.GameObjects.Graphics;
  private panelTagText!: Phaser.GameObjects.Text;
  private panelBody!: Phaser.GameObjects.Text;
  private panelOpen = false;

  // Decision card row + corral legend.
  private cardRow!: Phaser.GameObjects.Container;
  private cards: CardWidgets[] = [];
  private revealedStage = -1;
  private round: VisitRound = 'examine';
  private roundScore: RoundScore = { examBest: false, dxCorrect: false, txBest: false };
  /** Monotonic guard: stale delayed advances never fire. */
  private roundToken = 0;
  private legend!: Phaser.GameObjects.Container;
  private lastCardTapMs = 0;
  private nudging = false;
  private chartDrawer!: ChartDrawer;

  // Chrome-2 progress HUD (Visit only; coins + context are MOCK, the
  // timer is a display-only readout — nothing gameplay reads it).
  private hud!: Phaser.GameObjects.Container;
  private coinsText!: Phaser.GameObjects.Text;
  private contextText!: Phaser.GameObjects.Text;
  private undoPill!: Phaser.GameObjects.Container;
  private undoText!: Phaser.GameObjects.Text;
  private undoZone!: Phaser.GameObjects.Zone;
  private wallet: Wallet = emptyWallet();
  private shop!: ShopSheet;
  private about!: AboutSheet;
  private editor!: ProfileEditor;
  private ownedIds: string[] = [];
  private undoStack: UndoStack<UndoSnapshot> = emptyUndo();
  // (visitStartMs returns with the speed element.)

  // G4 live-read + modules (wired in wireModules, below).
  private ticker!: BackendTicker;
  private tray!: ToolTray;
  private chart!: LivingChart;
  private learnList!: LearnList;
  /** M4 shared care: inbox, compose state, offline outbox. */
  private handoffSheet!: HandoffSheet;
  private inbox: HandoffNote[] = [];
  private inboxSource: 'live' | 'fallback' = 'fallback';
  private refreshingInbox = false;
  private selectedPreset: string | null = null;
  private outbox: HandoffDraft[] = [];
  private seenNoteIds = new Set<string>();
  /** M4c teams + cheers. */
  private teamTag = TEAM_TAGS[0] ?? 'Sun';
  private cheers: Cheer[] = [];
  private cheerOutbox: CheerDraft[] = [];
  private seenCheerIds = new Set<string>();
  private cheerCursor = 0;
  private cheering = false;
  private notesHandle!: Phaser.GameObjects.Container;
  private notesBadge!: Phaser.GameObjects.Graphics;
  /** Filed conditions (visit order — the list accumulates). */
  private filedConds: { id: string; name: string }[] = [];
  /** Opened resource ids (their +2 is spent). */
  private openedRes = new Set<string>();
  private passedQuiz = new Set<string>();
  /** Live reading level (1 Gentle → 3 Expert), Profile-owned. */
  private difficulty: 1 | 2 | 3 = PROTOTYPE_SEEDS.difficulty;
  /** Tier the card row was last built with (rebuild on switch). */
  private cardTier: ChromeTier | null = null;
  private cast: CastData | null = null;
  /** Exam findings: fallback until the live rows land (boot-only). */
  private examFindings: FallbackExamFinding[] = FALLBACK_EXAM_FINDINGS;
  private activePatientId: string | null = null;
  private currentNodeId: string | null = null;
  private currentDepth = 0;
  private extending = false;
  // Views + nav.
  private currentView: ViewName = 'visit';
  private waitingView!: Phaser.GameObjects.Container;
  private profileView!: Phaser.GameObjects.Container;
  private profileRows!: Phaser.GameObjects.Container;
  private segRow!: Phaser.GameObjects.Container;
  private waitingRows!: Phaser.GameObjects.Container;
  /** Queue order (names); the player reorders with the chevrons. */
  private waitingOrder: string[] = MOCK_ROSTER.map((e) => e.name);
  private telemedView!: Phaser.GameObjects.Container;
  private portalView!: Phaser.GameObjects.Container;
  private threads: ThreadWidgets[] = [];
  private openThread = -1;
  private navPill!: Phaser.GameObjects.Container;
  private tabTexts: Record<ViewName, Phaser.GameObjects.Text[]> = {
    waiting: [],
    visit: [],
    telemed: [],
    portal: [],
    learn: [],
    profile: [],
  };
  private tabIcons: Record<ViewName, Phaser.GameObjects.Graphics | null> = {
    waiting: null,
    visit: null,
    telemed: null,
    portal: null,
    profile: null,
    learn: null,
  };
  private muteOn = true;
  private camOn = true;

  // Admin stack.
  private devTaps = 0;
  private devResetTimer?: Phaser.Time.TimerEvent;
  private adminOpen = false;
  private pad!: Phaser.GameObjects.Container;
  private padDots!: Phaser.GameObjects.Graphics;
  private padEntry = '';
  private monitor!: Phaser.GameObjects.Container;
  private monitorBackdrop!: Phaser.GameObjects.Container;
  private monitorContent!: Phaser.GameObjects.Container;
  /** Staff terminal page: live state, or the guided demo script. */
  private monitorPage: 'staff' | 'demo' = 'staff';
  private assetBrowser!: AssetBrowser;

  // Toast.
  private toast!: Phaser.GameObjects.Container;
  private toastBg!: Phaser.GameObjects.Graphics;
  private toastText!: Phaser.GameObjects.Text;
  private toastTimer?: Phaser.Time.TimerEvent;

  // Visit-end result overlay + Learn badge.
  private visitEnded = false;
  /** Coins earned by THIS visit's rounds (never net-of-spend). */
  private visitEarned = 0;
  /** Last round quiz asked (tray close re-surfaces it). */
  private lastQuestion: string | null = null;
  private resultRoot!: Phaser.GameObjects.Container;
  private resultTitle!: Phaser.GameObjects.Text;
  private resultLines!: Phaser.GameObjects.Text;
  private resultPrimary!: Phaser.GameObjects.Container;
  private resultPrimaryBg!: Phaser.GameObjects.Graphics;
  private resultPrimaryText!: Phaser.GameObjects.Text;
  private resultSecondary!: Phaser.GameObjects.Container;
  private resultSecondaryText!: Phaser.GameObjects.Text;
  private learnBadge!: Phaser.GameObjects.Container;
  private resultOutcome: VisitOutcome | null = null;
  /** Last finished outcome (re-shows the modal on return trips). */
  private lastOutcome: VisitOutcome | null = null;

  constructor() {
    super('clinic');
  }

  preload(): void {
    // Reboot: Jolly-style Mabel + photoreal plate.
    this.load.image('mabel-idle', 'assets/characters/mochi-reboot-idle.png');
    this.load.image('mabel-blink', 'assets/characters/mochi-reboot-blink.png');
    this.load.image('mabel-happy', 'assets/characters/mochi-reboot-happy.png');
    this.load.image('mabel-sick', 'assets/characters/mochi-reboot-sick.png');
    this.load.image('mabel-pained', 'assets/characters/mochi-reboot-pained.png');
    this.load.image('mabel-relieved', 'assets/characters/mochi-reboot-relieved.png');
    // Roster phase: every SPRITE_PREFIX but Mabel preloads its
    // own-named set (derived, so the roster can't skew).
    for (const slug of Object.values(SPRITE_PREFIX)) {
      if (slug === 'mabel') continue;
      for (const frame of ['idle', 'blink', 'happy', 'sick', 'pained', 'relieved']) {
        this.load.image(`${slug}-${frame}`, `assets/characters/${slug}-${frame}.png`);
      }
    }
    // Backdrop plate library: all 8 plates preload locally
    // (offline-safe); keys `plate-<slug>`.
    for (const [slug, file] of Object.entries(PLATE_FILE)) {
      this.load.image(`plate-${slug}`, file);
    }
    // No prop preloads: the plush P2 props clash with the photoreal
    // plate (which paints its own bench/plant/cabinet) — removed,
    // not re-pointed. See drawRoom.
  }

  create(): void {
    // Difficulty first: cards build at the live tier (no
    // boot-time rebuild flicker for returning Steady/Expert).
    this.loadDifficulty();
    this.patientState = this.engine.initialState(PROTOTYPE_SEEDS.conditionId);
    this.revealedStage = this.patientState.stageIndex;
    this.drawRoom();
    this.drawLightOverlays();
    this.drawTitle();
    this.drawPatient();
    this.drawConversationPanel();
    this.drawCardRow();
    this.drawCorral();
    this.drawHud();
    this.drawWaitingView();
    this.drawTelemedChrome();
    this.drawPortalView();
    this.drawProfileView();
    this.drawNotesHandle();
    this.drawNavBar();
    this.drawTopBar();
    this.wireModules();
    this.drawCodePad();
    this.drawMonitor();
    this.drawToast();
    this.drawResultCard();
    this.drawSneeze();
    this.scheduleBlink();
    this.lastCardTapMs = this.time.now;
    this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => this.maybeNudge(),
    });
    this.loadWallet();
    this.visitEarned = 0;
    this.showView('visit', true);
    // The chart defaults OPEN on the patient's first appearance.
    this.chartDrawer.setOpen(true);
    // Boot-only: the cards pulse on the first tick so the first
    // action is obvious immediately (later arrivals keep the 6s
    // grace showView grants).
    this.lastCardTapMs = this.time.now - 6000;
  }

  update(_time: number, delta: number): void {
    // Idle bob: ANIMATION.md — 3px @ the roster's rad/s rate,
    // owns the patient's y.
    const t = this.time.now / 1000;
    this.patient.y = this.patientBaseY + Math.sin(t * bobRate(this.activeName)) * 3;

    // (Visit clock removed until the speed element returns.)

    // Blink: ANIMATION.md — eyes closed 120ms every 3–5s,
    // randomized (Theo's sleepy cadence is slower + longer).
    // Fires ONLY when the steady face is idle AND no flash is showing
    // AND the current texture is the idle frame; otherwise
    // reschedules without swapping, so a flash never fights the
    // blink timer.
    if (this.time.now >= this.blinkAt) {
      if (
        !this.showingFlash &&
        this.steadyFace() === `${this.prefix()}-idle` &&
        this.patient.texture.key === `${this.prefix()}-idle`
      ) {
        this.patient.setTexture(`${this.prefix()}-blink`);
        this.time.delayedCall(blinkCloseMs(this.activeName), () => {
          // A tap/flash during the blink window wins; only restore
          // when blink still owns the texture.
          if (this.patient.texture.key === `${this.prefix()}-blink`) {
            this.settleToSteady();
          }
          this.scheduleBlink();
        });
      } else {
        this.scheduleBlink();
      }
    }

    // Sneeze: sniffly colds sneeze — a quick wiggle + a rising
    // "Achoo!" every 9–16s while a viral case sits at stage 1+
    // in the visit, flashes and endings excepted. Milo's charm.
    if (this.time.now >= this.sneezeAt) {
      this.sneezeAt = this.time.now + 9000 + Math.random() * 7000;
      if (
        this.currentView === 'visit' &&
        !this.visitEnded &&
        !this.showingFlash &&
        this.patientState.conditionId === 'viral-respiratory' &&
        this.patientState.stageIndex >= 1
      ) {
        this.tweens.add({
          targets: this.patient,
          x: '-=5',
          duration: 55,
          yoyo: true,
          repeat: 3,
          ease: 'Sine.easeInOut',
        });
        this.sneezeText.setAlpha(1).setY(480);
        this.tweens.add({
          targets: this.sneezeText,
          y: 436,
          alpha: 0,
          duration: 900,
          ease: 'Sine.easeOut',
        });
      }
    }
    void delta;
  }

  // -- room (reboot photoreal plate; NO prop sprites) --

  private drawRoom(): void {
    // Room shell: photorealistic minimal clinic plate, 1080x1920
    // (2x), centered to fill the 540x960 canvas exactly. The live
    // plate follows the per-view wiring rule (plateForView);
    // showView swaps it per view — bg-only change, Mabel/chrome
    // untouched.
    // Per-asset prop call (reboot): the P2 plush props are GONE —
    // the plate paints its own bench (left), plant + cabinet
    // (right), window, and rug, so plush furniture would clash in
    // style AND double up every piece. drawProps() deleted with
    // the P2 pass; nothing is re-pointed.
    this.roomBg = this.add
      .image(270, 480, this.plateKey(this.currentView))
      .setDisplaySize(540, 960)
      .setDepth(0);
  }

  /**
   * Texture key for a view's plate; a plate that failed to load
   * falls back to `plate-exam-a` (the shipped plate), so the demo
   * path stays fully offline even with a missing file.
   */
  private plateKey(view: ViewName): string {
    const key = `plate-${plateForView(view, this.visitNo())}`;
    return this.textures.exists(key) ? key : 'plate-exam-a';
  }

  /** Bg swap rides the existing 180/150 view-fade durations. */
  private swapPlate(next: ViewName, instant: boolean): void {
    const key = this.plateKey(next);
    if (this.roomBg.texture.key === key) return;
    this.tweens.killTweensOf(this.roomBg);
    if (instant) {
      this.roomBg.setTexture(key).setAlpha(1);
      return;
    }
    this.tweens.add({
      targets: this.roomBg,
      alpha: 0,
      duration: 150,
      ease: 'Sine.easeOut',
      onComplete: () => {
        this.roomBg.setTexture(key);
        this.tweens.add({
          targets: this.roomBg,
          alpha: 1,
          duration: 180,
          ease: 'Sine.easeOut',
        });
      },
    });
  }

  /**
   * Code-only warmth: a window-light gradient plus a warm
   * vignette, both pure Graphics fills ($0.00 spend). Called after
   * drawRoom and before title/Mabel/bubble, so the overlays tint
   * only the room — text and Mabel render above and cannot wash
   * out. Reboot re-tune vs the photo plate (which carries its own
   * sunlight): light 0.12 -> 0.07 max, vignette 0.10 -> 0.07,
   * so the photo keeps its clean minimal read. Cozy, not hazy.
   */
  private drawLightOverlays(): void {
    // Window light: full-screen gradient, strongest upper-left
    // (plate light dir) in warm cream.
    const light = this.add.graphics();
    light.fillGradientStyle(
      0xfcebd6,
      0xfcebd6,
      0xfff3e2,
      0xfff3e2,
      0.07,
      0.03,
      0.03,
      0.0,
    );
    light.fillRect(0, 0, 540, 960);
    light.setDepth(1);

    // Warm vignette: four feathered edge strips in warm-brown,
    // 0.07 at the screen edge fading to 0 inward over a 56px
    // band. Corners double up slightly, as a real vignette
    // should.
    const edge = 0x8a5a3b;
    const band = 56;
    const v = this.add.graphics();
    v.fillGradientStyle(edge, edge, edge, edge, 0.07, 0.07, 0.0, 0.0);
    v.fillRect(0, 0, 540, band);
    v.fillGradientStyle(edge, edge, edge, edge, 0.0, 0.0, 0.07, 0.07);
    v.fillRect(0, 960 - band, 540, band);
    v.fillGradientStyle(edge, edge, edge, edge, 0.07, 0.0, 0.07, 0.0);
    v.fillRect(0, 0, band, 960);
    v.fillGradientStyle(edge, edge, edge, edge, 0.0, 0.07, 0.0, 0.07);
    v.fillRect(540 - band, 0, band, 960);
    v.setDepth(1);
  }

  /**
   * Wall sign: "Cozy Clinic" hangs ON the clinic wall (a plaque
   * with hanger rods in the calm wall band y36–92) instead of
   * floating text. Children are RELATIVE so the admin-tap wiggle
   * scales about the sign center. Shown on wall-plate views
   * (waiting/visit/learn), hidden on telemed/portal.
   */
  private drawTitle(): void {
    // The Cozy Clinic sign is PAINTED into the plates now (art
    // bible appendix) — no code-drawn plaque. This keeps only
    // the secret admin trigger: an invisible zone sitting on the
    // painted sign's screen band (y58–122), still 5 taps, still
    // no visible hint.
    const trigger = this.add.zone(0, 0, 240, 64);
    trigger.setInteractive({ useHandCursor: false });
    trigger.on('pointerdown', () => this.onDevTrigger());
    this.devTrigger = this.add.container(270, 90, [trigger]);
    this.devTrigger.setDepth(4);
  }

  private drawPatient(): void {
    // Mabel stands fully on the painted rug: feet at 720 (~8px
    // inside the rug top ~712) and the fixed shadow ellipse just
    // under GROUND = 724 on the rug, body clear of the baseboard (~696)
    // above. At 212px Mabel is still the largest visual weight,
    // with clear walking space to the bench (left) and the
    // plant/cabinet lane (right). Same 212px@(270,614) geometry
    // the reboot contact-sheet composite validated.
    this.patientShadow = this.add.ellipse(270, 722, 150, 24, 0x8a5a3b, 0.18);
    this.patientShadow.setDepth(4);

    // Mabel opens on her steady face for the live state (sick at the
    // stage-2 asthma opener) — idle is one steady state, not the home.
    this.patient = this.add.image(270, 614, this.steadyFace());
    this.patient.setDisplaySize(212, 212);
    this.patient.setDepth(5);
    this.patientBaseY = this.patient.y;
    this.patient.setInteractive({ useHandCursor: true });

    const bootEntry = MOCK_ROSTER.find((e) => e.name === this.activeName);
    this.nametag = this.add
      .text(270, 736, `${this.activeName} · ${bootEntry?.persona ?? 'first patient'}`, {
        fontFamily: FONT_FAMILY,
        fontSize: '22px',
        color: COCOA,
      })
      .setOrigin(0.5)
      .setDepth(5);

    this.patient.on('pointerdown', () => this.onPatientTap());
  }

  // -- conversation panel (Visit + Telemed; the retired bubble's home) --

  private drawConversationPanel(): void {
    this.panelBg = this.add.graphics();
    this.panelTag = this.add.graphics();
    this.panelTagText = this.add.text(0, 0, '', {
      fontFamily: FONT_FAMILY,
      fontStyle: 'bold',
      fontSize: '14px',
      color: COCOA,
    });
    this.panelBody = this.add.text(0, 0, '', {
      fontFamily: FONT_FAMILY,
      fontSize: '20px',
      color: COCOA,
      wordWrap: { width: 460 },
    });
    this.panel = this.add.container(0, 0, [
      this.panelBg,
      this.panelTag,
      this.panelTagText,
      this.panelBody,
    ]);
    this.panel.setDepth(10).setVisible(false).setAlpha(0);
  }

  private renderPanel(speaker: Speaker, text: string, kind: LineKind): void {
    const top = 136;
    const w = 492;
    const x = 270;
    // SAY vs TELL (chrome-3): 'say' quotes + tags direct speech;
    // 'tell' shows narration bare, and hides the tag when the
    // subject is on screen (Mabel). Quoting happens BEFORE the
    // truncate pass so the "…" rule measures the shown string.
    const spoken = kind === 'say' ? quoteIfSpoken(speaker, false, text) : text;
    this.panelBody.setText(spoken);
    this.truncateToHeight(this.panelBody, 110);
    // The patient's name lives ONLY on the bottom nametag — patient
    // 'say' lines carry quotes, not a tag. YOU keeps its tag so the
    // player always knows the hold-back voice is theirs.
    const showTag = kind === 'say' && speaker === 'YOU';
    const bodyTop = showTag ? top + 48 : top + 16;
    const h = Math.min(220, Math.max(96, bodyTop - top + this.panelBody.height + 20));
    const bottom = top + h;

    this.panelBg.clear();
    // Tail first: SOLID full-outline-color triangle, its top edge
    // tucked under the panel bg (chrome-2 operator direction —
    // replaces the old outlined tail). Same tail both kinds: the
    // panel always talks about the patient on screen.
    this.panelBg.fillStyle(OUTLINE, 1);
    this.panelBg.fillTriangle(250, bottom - 2, 290, bottom - 2, 270, bottom + 14);
    this.panelBg.fillStyle(CREAM, GLASS_PANEL);
    this.panelBg.lineStyle(3, OUTLINE, 1);
    this.panelBg.fillRoundedRect(x - w / 2, top, w, h, 24);
    this.panelBg.strokeRoundedRect(x - w / 2, top, w, h, 24);

    this.panelTag.clear();
    this.panelTagText.setText('');
    if (showTag) {
      const tagFill = speaker === 'YOU' ? CARD_FILL : SAGE;
      this.panelTagText.setText(speaker);
      const tagW = this.panelTagText.width + 28;
      this.panelTag.fillStyle(tagFill, 1);
      this.panelTag.lineStyle(2, OUTLINE, 1);
      this.panelTag.fillRoundedRect(40, top + 12, tagW, 28, 14);
      this.panelTag.strokeRoundedRect(40, top + 12, tagW, 28, 14);
      this.panelTagText.setPosition(40 + 14, top + 12 + 14).setOrigin(0, 0.5);
    }

    this.panelBody.setPosition(40, bodyTop).setOrigin(0, 0);
  }

  private setConversation(speaker: Speaker, text: string, kind: LineKind): void {
    this.tweens.killTweensOf(this.panel);
    if (!this.panelOpen) {
      this.panelOpen = true;
      this.renderPanel(speaker, text, kind);
      this.syncPanelVisibility();
      this.panel.setAlpha(0);
      this.tweens.add({
        targets: this.panel,
        alpha: 1,
        duration: 180,
        ease: 'Sine.easeOut',
      });
      return;
    }
    this.tweens.add({
      targets: this.panel,
      alpha: 0,
      duration: 150,
      ease: 'Sine.easeOut',
      onComplete: () => {
        this.renderPanel(speaker, text, kind);
        this.tweens.add({
          targets: this.panel,
          alpha: 1,
          duration: 180,
          ease: 'Sine.easeOut',
        });
      },
    });
  }

  private closeConversation(): void {
    this.tweens.killTweensOf(this.panel);
    this.tweens.add({
      targets: this.panel,
      alpha: 0,
      duration: 150,
      ease: 'Sine.easeOut',
      onComplete: () => {
        this.panelOpen = false;
        this.syncPanelVisibility();
      },
    });
  }

  private syncPanelVisibility(): void {
    const inScene = this.currentView === 'visit' || this.currentView === 'telemed';
    this.panel.setVisible(this.panelOpen && inScene);
  }

  /**
   * Patient opener: the FIRST-PERSON 'say' line for the live
   * condition+stage ("my breaths sound whistly…"). The patient
   * greets YOU, the doctor — never "the doctor will see you
   * now". Always local (voice-consistent); stored narratives stay
   * third-person for consequence lines.
   */
  private openerText(): string {
    const def = CONDITIONS[this.patientState.conditionId];
    return def.stages[this.patientState.stageIndex]?.says ?? 'Hello!';
  }

  /** Doctor handle (preset identity until login ships). */
  private doctorHandle = DEMO_HANDLE;

  /** M4 outbox persistence (offline-written handoffs). */
  private loadOutbox(): void {
    try {
      const raw = window.localStorage.getItem(OUTBOX_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as HandoffDraft[];
      if (Array.isArray(parsed)) {
        this.outbox = parsed.filter(
          (d) => typeof d?.patient_id === 'string' && typeof d?.preset_id === 'string',
        );
      }
    } catch {
      this.outbox = [];
    }
  }

  private saveOutbox(): void {
    try {
      window.localStorage.setItem(OUTBOX_STORAGE_KEY, JSON.stringify(this.outbox));
    } catch {
      /* private-mode play keeps the session outbox */
    }
  }

  private loadTeam(): void {
    try {
      const raw = window.localStorage.getItem(TEAM_STORAGE_KEY);
      const clean = raw ? cleanTeam(raw) : null;
      this.teamTag = clean ?? (TEAM_TAGS[0] ?? 'Sun');
      if (!clean) this.saveTeam();
    } catch {
      /* fresh session keeps the default */
    }
  }

  private saveTeam(): void {
    try {
      window.localStorage.setItem(TEAM_STORAGE_KEY, this.teamTag);
    } catch {
      /* private-mode play keeps the session tag */
    }
  }

  private loadCheerOutbox(): void {
    try {
      const raw = window.localStorage.getItem(CHEER_OUTBOX_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as CheerDraft[];
      if (Array.isArray(parsed)) {
        this.cheerOutbox = parsed.filter(
          (d) => typeof d?.to_handle === 'string' && typeof d?.preset_id === 'string',
        );
      }
    } catch {
      this.cheerOutbox = [];
    }
  }

  private saveCheerOutbox(): void {
    try {
      window.localStorage.setItem(CHEER_OUTBOX_KEY, JSON.stringify(this.cheerOutbox));
    } catch {
      /* private-mode play keeps the session outbox */
    }
  }

  private loadHandle(): void {
    try {
      const raw = window.localStorage.getItem(HANDLE_STORAGE_KEY);
      const clean = raw ? cleanHandle(raw) : null;
      this.doctorHandle = clean ?? DEMO_HANDLE;
      if (!clean) this.saveHandle();
    } catch {
      /* fresh session keeps the default */
    }
  }

  private saveHandle(): void {
    try {
      window.localStorage.setItem(HANDLE_STORAGE_KEY, this.doctorHandle);
    } catch {
      /* private-mode play keeps the session handle */
    }
  }

  /** Learning List persistence (filed topics + opened ids). */
  private loadLearn(): void {
    try {
      const filed = window.localStorage.getItem(LEARN_FILED_KEY);
      if (filed) {
        const parsed = JSON.parse(filed) as { id: string; name: string }[];
        if (Array.isArray(parsed)) this.filedConds = parsed.filter((c) => c?.id && c?.name);
      }
      const opened = window.localStorage.getItem(LEARN_OPENED_KEY);
      if (opened) {
        const parsed = JSON.parse(opened) as string[];
        if (Array.isArray(parsed)) this.openedRes = new Set(parsed);
      }
      const passed = window.localStorage.getItem(LEARN_PASSED_KEY);
      if (passed) {
        const parsed = JSON.parse(passed) as string[];
        if (Array.isArray(parsed)) this.passedQuiz = new Set(parsed);
      }
    } catch {
      this.filedConds = [];
      this.openedRes = new Set();
      this.passedQuiz = new Set();
    }
  }

  private saveLearn(): void {
    try {
      window.localStorage.setItem(LEARN_FILED_KEY, JSON.stringify(this.filedConds));
      window.localStorage.setItem(LEARN_OPENED_KEY, JSON.stringify([...this.openedRes]));
      window.localStorage.setItem(LEARN_PASSED_KEY, JSON.stringify([...this.passedQuiz]));
    } catch {
      /* private-mode play: the session list still accumulates */
    }
  }

  /** Live wording tier (every tiered surface reads this). */
  private tier(): ChromeTier {
    return CHROME_TIER_BY_DIFFICULTY[this.difficulty];
  }

  private loadDifficulty(): void {
    try {
      const raw = window.localStorage.getItem(DIFFICULTY_KEY);
      if (raw === '2') this.difficulty = 2;
      else if (raw === '3') this.difficulty = 3;
      else this.difficulty = 1;
    } catch {
      this.difficulty = 1;
    }
  }

  private saveDifficulty(): void {
    try {
      window.localStorage.setItem(DIFFICULTY_KEY, `${this.difficulty}`);
    } catch {
      /* private-mode play: the session keeps the switch */
    }
  }

  /** Profile segmented control: rewords the visit on return. */
  private setDifficulty(next: 1 | 2 | 3): void {
    if (next === this.difficulty) return;
    this.difficulty = next;
    this.saveDifficulty();
    this.refreshProfileRows();
    this.showToast(`Reading level: ${CHROME_TIER_LABEL[this.tier()]}`);
  }

  /** Wallet persistence (local; coin_ledger replaces it later). */
  private loadWallet(): void {
    try {
      const raw = window.localStorage.getItem(WALLET_STORAGE_KEY);
      if (raw) this.wallet = deserializeWallet(raw);
    } catch {
      this.wallet = emptyWallet();
    }
  }

  private saveWallet(): void {
    try {
      window.localStorage.setItem(WALLET_STORAGE_KEY, serializeWallet(this.wallet));
    } catch {
      // Private mode et al: play on without saving.
    }
  }

  /** Shop owned-set persistence (local; backend locker later). */
  private loadShop(): void {
    try {
      const raw = window.localStorage.getItem(SHOP_STORAGE_KEY);
      const ids = raw ? (JSON.parse(raw) as unknown) : [];
      this.ownedIds = Array.isArray(ids) ? ids.filter((id): id is string => typeof id === 'string') : [];
    } catch {
      this.ownedIds = [];
    }
  }

  private saveShop(): void {
    try {
      window.localStorage.setItem(SHOP_STORAGE_KEY, JSON.stringify(this.ownedIds));
    } catch {
      // Play on without saving.
    }
  }

  /** Correct-tap payout: base + owned tools + Nurse Birch. */
  private correctPayout(): number {
    return EARN_BEST + toolBonus(this.ownedIds) + nurseBonus(this.ownedIds);
  }

  private coinWord(n: number): string {
    return n === 1 ? 'Care Coin' : 'Care Coins';
  }

  /** Nurse Birch cheers correct taps aloud when she's on staff. */
  private cheerSuffix(): string {
    return nurseBonus(this.ownedIds) > 0 ? ' — Birch cheers!' : '';
  }

  /**
   * Restore one undone move (HUD Rewind pill + dev monitor):
   * engine state, trajectory cursor, coins, and card spines all
   * rewind together.
   */
  private doUndo(): void {
    const undone = undoMove(this.undoStack);
    if (!undone) {
      this.showToast('Nothing to undo yet.');
      return;
    }
    this.undoStack = undone.stack;
    const snap = undone.snapshot;
    this.patientState = snap.state;
    this.currentNodeId = snap.nodeId;
    this.currentDepth = snap.depth;
    this.revealedStage = snap.state.stageIndex;
    // Rounds rewind too: restore the round + score, rebuild the row.
    this.roundToken += 1;
    this.round = snap.round;
    this.roundScore = { ...snap.score };
    this.visitEarned = snap.visitEarned;
    this.visitEnded = false;
    this.hideResult();
    this.cardRow.removeAll(true);
    this.buildCards();
    this.drawCorral();
    // Coins rewind by rebuilding the wallet WITHOUT a ledger lie:
    // undo is its own entry kind, not a delete.
    const diff = this.wallet.balance - snap.coins;
    if (diff !== 0) {
      this.wallet = {
        balance: snap.coins,
        entries: [
          ...this.wallet.entries,
          {
            seq: this.wallet.entries.length,
            delta: -diff,
            reason: 'adjust:undo',
            balance: snap.coins,
          },
        ],
      };
      this.saveWallet();
    }
    this.cards.forEach((card, i) => {
      card.revealed = snap.reveals[i] ?? null;
      this.drawSpine(card, card.revealed);
      this.drawStamp(card, card.revealed);
    });
    this.patient.setTexture(this.steadyFace());
    this.refreshChart();
    this.refreshHud();
    this.closeConversation();
    this.setConversation(
      speakerFor(this.activeName),
      'Back a step — no harm done. What will you try instead?',
      'tell',
    );
    this.showToast(`Undone (${undoDepth(this.undoStack)} left).`);
  }

  /** Chop words until the text fits maxH (prototype rule: …). */
  private truncateToHeight(textObj: Phaser.GameObjects.Text, maxH: number): void {
    if (textObj.height <= maxH) return;
    const words = textObj.text.split(' ');
    while (words.length > 1 && textObj.height > maxH) {
      words.pop();
      textObj.setText(`${words.join(' ')}…`);
    }
  }

  // -- decision card row (Visit + Telemed; REAL tap-resolve path) --

  /** Card ids for the active condition: the fixed asthma demo row, else the first 3 live actions. */
  private cardRowIds(): readonly string[] {
    if (this.patientState.conditionId === 'asthma') return CARD_ROW_IDS;
    return this.engine
      .listActions(this.patientState.conditionId)
      .slice(0, 3)
      .map((a) => a.id);
  }

  private drawCardRow(): void {
    this.cardRow = this.add.container(0, 0, []).setDepth(10);
    this.buildCards();
  }

  /**
   * Card defs for the live round: the 4 exam maneuvers (clinical
   * names — the round teaches vocabulary), the 3 diagnosis
   * options, or the treatment actions.
   */
  private roundCardDefs(): { id: string; label: string }[] {
    const def = CONDITIONS[this.patientState.conditionId];
    if (this.round === 'examine') {
      // Case-specific bedside checks (never the generic 4-step
      // row — Look/Feel/Tap/Listen live in the exam tray).
      return def.examOptions.map((opt) => ({ id: `exam:${opt.id}`, label: opt.label }));
    }
    if (this.round === 'diagnose') {
      const tier = this.tier();
      return def.dxOptions.map((opt) => ({ id: `dx:${opt}`, label: CONDITION_TIER_NAMES[opt][tier] }));
    }
    const tier = this.tier();
    return this.cardRowIds().map((actionId) => {
      const action = def.actions.find((a) => a.id === actionId);
      return { id: actionId, label: action ? actionLabel(action, tier) : actionId };
    });
  }

  /**
   * Rebuilds the row at the live tier (doUndo's pattern):
   * reveals survive, labels reword. Called on visit return
   * after a Profile tier switch.
   */
  private rebuildCardsForTier(): void {
    const saved = this.cards.map((c) => c.revealed);
    this.cardRow.removeAll(true);
    this.buildCards();
    this.drawCorral();
    this.cards.forEach((card, i) => {
      card.revealed = saved[i] ?? null;
      this.drawSpine(card, card.revealed);
      this.drawStamp(card, card.revealed);
    });
  }

  /** (Re)builds the tappable cards; the corral is re-added by drawCorral. */
  private buildCards(): void {
    this.cards = [];
    this.cardTier = this.tier();
    const defs = this.roundCardDefs();
    // 3 cards → w156 step 168; 4–5 (later difficulty) → w114 step 126.
    // Both span x24–516. Every live round deals 3.
    const w = defs.length === 4 ? 114 : 156;
    const step = defs.length === 4 ? 126 : 168;
    defs.forEach(({ id: actionId, label }, i) => {
      const cx = 24 + i * step + w / 2;
      const cy = 772 + 37;
      const face = this.add.graphics();
      face.fillStyle(CARD_FILL, GLASS_CARD);
      const stamp = this.add.graphics();
      face.lineStyle(3, OUTLINE, 1);
      face.fillRoundedRect(-w / 2, -37, w, 74, 16);
      face.strokeRoundedRect(-w / 2, -37, w, 74, 16);
      const spine = this.add.graphics();
      const labelText = this.add
        .text(0, 0, label, {
          fontFamily: FONT_FAMILY,
          fontStyle: 'bold',
          fontSize: '15px',
          color: COCOA,
          align: 'center',
          wordWrap: { width: w - 12 },
        })
        .setOrigin(0.5, 0.5);
      this.truncateToHeight(labelText, 44);
      const root = this.add.container(cx, cy, [face, spine, labelText, stamp]);
      const zone = this.add.zone(0, 0, w, 74).setInteractive({ useHandCursor: true });
      zone.on('pointerdown', () => this.onCardTap(i));
      root.add(zone);
      this.cardRow.add(root);
      this.cards.push({ root, face, spine, stamp, w, actionId, revealed: null });
    });
  }

  /**
   * Decision corral: an outline frame around the card row (x16-524,
   * y764-856) that reads "these are your choices". The top edge has
   * a gap at the left holding a small tier-worded label IN the
   * border (fieldset pattern, left-aligned — never centered, so it
   * can't read as pointing at the middle card). The label sits on a
   * frosted strip (card-fill 32%: part of the border, not a chip).
   * Lives inside cardRow: fades + shifts with the row. The label
   * container keeps RELATIVE children so the nudge swell grows
   * about its own center (the old tab scaled about 0,0 and jumped
   * — fixed here).
   */
  private drawCorral(): void {
    const tier = this.tier();
    // The legend names the live round + its step (examine and
    // diagnose are tier-free teaching words; treat keeps the
    // tier wording).
    const wording =
      this.round === 'examine'
        ? '1 · Examine…'
        : this.round === 'diagnose'
          ? '2 · Diagnose…'
          : `3 · ${CHOOSE_PROMPT_WORDING[tier]}`;
    const label = this.add
      .text(0, 0, wording, {
        fontFamily: FONT_FAMILY,
        fontStyle: 'bold',
        fontSize: '12px',
        color: COCOA,
      })
      .setOrigin(0.5, 0.5);
    const strip = this.add.graphics();
    strip.fillStyle(CARD_FILL, 0.32);
    strip.fillRoundedRect(-label.width / 2 - 8, -8, label.width + 16, 16, 8);
    // Left-aligned: label left edge at x42, clear of the corner
    // arc, ending left of the middle card at every wording.
    this.legend = this.add.container(42 + label.width / 2, 764, [strip, label]);
    const gapX1 = 42 + label.width + 8 + 2;
    const frame = this.add.graphics();
    frame.lineStyle(3, OUTLINE, 1);
    frame.beginPath();
    frame.arc(34, 782, 18, Math.PI, Math.PI * 1.5, false);
    frame.strokePath();
    frame.lineBetween(gapX1, 764, 506, 764);
    frame.beginPath();
    frame.arc(506, 782, 18, Math.PI * 1.5, Math.PI * 2, false);
    frame.strokePath();
    frame.lineBetween(524, 782, 524, 838);
    frame.beginPath();
    frame.arc(506, 838, 18, 0, Math.PI * 0.5, false);
    frame.strokePath();
    frame.lineBetween(506, 856, 34, 856);
    frame.beginPath();
    frame.arc(34, 838, 18, Math.PI * 0.5, Math.PI, false);
    frame.strokePath();
    frame.lineBetween(16, 838, 16, 782);
    this.cardRow.add([frame, this.legend]);
  }

  /**
   * Idle nudge: after 6s without a card tap (Visit/Telemed, cards
   * visible, no admin), the cards lift in a stagger + the legend
   * swells once — a glimmer with no glow (taste law). Re-arms
   * every 6s until the player taps. Y-only tweens, so the press
   * squash (scale) never fights them.
   */
  private maybeNudge(): void {
    if (this.adminOpen || this.nudging) return;
    if (this.currentView !== 'visit' && this.currentView !== 'telemed') return;
    if (!this.cardRow.visible || this.cardRow.alpha < 1) return;
    if (this.time.now - this.lastCardTapMs < 6000) return;
    this.nudging = true;
    this.lastCardTapMs = this.time.now;
    this.cards.forEach((card, i) => {
      this.tweens.add({
        targets: card.root,
        y: '-=8',
        duration: 160,
        yoyo: true,
        delay: i * 130,
        ease: 'Sine.easeInOut',
      });
    });
    this.tweens.add({
      targets: this.legend,
      scaleX: 1.06,
      scaleY: 1.06,
      duration: 200,
      yoyo: true,
      ease: 'Sine.easeInOut',
    });
    this.time.delayedCall(700, () => {
      this.nudging = false;
    });
  }

  private drawSpine(card: CardWidgets, grade: ChoiceGrade | null): void {
    card.spine.clear();
    if (!grade) return;
    card.spine.fillStyle(GRADE_COLOR[grade], 1);
    // 8px left spine inside the card's rounded corner.
    card.spine.fillRoundedRect(-card.w / 2, -37, 8, 74, { tl: 16, tr: 0, bl: 16, br: 0 });
  }

  private clearReveals(): void {
    for (const card of this.cards) {
      card.revealed = null;
      card.root.setAlpha(1);
      this.drawSpine(card, null);
      this.drawStamp(card, null);
    }
  }

  /**
   * Grade stamp: a sticker on the tapped card's top-right corner
   * (r13) so right/wrong reads instantly —
   * BEST check, NOT_GREAT dash, WRONG/DANGEROUS cross, all in
   * the grade color with a cream glyph. Cleared with reveals.
   */
  private drawStamp(card: CardWidgets, grade: ChoiceGrade | null): void {
    card.stamp.clear();
    if (!grade) return;
    const cx = card.w / 2 - 20;
    const cy = -19;
    card.stamp.fillStyle(GRADE_COLOR[grade], 1);
    card.stamp.lineStyle(2, OUTLINE, 1);
    card.stamp.fillCircle(cx, cy, 13);
    card.stamp.strokeCircle(cx, cy, 13);
    card.stamp.lineStyle(3, 0xfff9ef, 1);
    if (grade === 'BEST') {
      card.stamp.lineBetween(cx - 6, cy, cx - 1, cy + 5);
      card.stamp.lineBetween(cx - 1, cy + 5, cx + 6, cy - 5);
    } else if (grade === 'NOT_GREAT') {
      card.stamp.lineBetween(cx - 5, cy, cx + 5, cy);
    } else {
      card.stamp.lineBetween(cx - 4, cy - 4, cx + 4, cy + 4);
      card.stamp.lineBetween(cx - 4, cy + 4, cx + 4, cy - 4);
    }
  }

  private onCardTap(i: number): void {
    if (this.adminOpen) return;
    if (this.visitEnded) return;
    if (this.currentView !== 'visit' && this.currentView !== 'telemed') return;
    const card = this.cards[i];
    if (!card) return;
    // Single pick per round: any revealed card ends input. Kills
    // two-finger double resolves (double payouts, double engine
    // applies). Blocked vetoes don't set revealed, so the player
    // can always pick again after one.
    if (this.cards.some((c) => c.revealed !== null)) return;
    this.lastCardTapMs = this.time.now;
    this.tweens.add({
      targets: card.root,
      scaleX: 0.97,
      scaleY: 0.97,
      duration: 90,
      yoyo: true,
      ease: 'Sine.easeInOut',
      onComplete: () => {
        if (this.round === 'examine') this.resolveExam(i);
        else if (this.round === 'diagnose') this.resolveDx(i);
        else this.resolveCard(i);
      },
    });
  }

  /** Captures the pre-move snapshot (every round pushes undo). */
  private snapPreMove(): UndoSnapshot {
    return {
      state: structuredClone(this.patientState),
      nodeId: this.currentNodeId,
      depth: this.currentDepth,
      coins: this.wallet.balance,
      visitEarned: this.visitEarned,
      reveals: this.cards.map((c) => c.revealed),
      round: this.round,
      score: { ...this.roundScore },
    };
  }

  /** Rebuilds the row for a new round (fresh cards + legend + quiz). */
  private advanceRound(next: VisitRound): void {
    this.roundToken += 1;
    this.round = next;
    this.cardRow.removeAll(true);
    this.buildCards();
    this.drawCorral();
    this.showQuestion(next);
  }

  /** Demo tag for expert wording (8yF-style), live or fallback. */
  private demoTag(): string {
    const row = this.cast ? patientByName(this.cast, this.activeName) : null;
    const fb = row ?? FALLBACK_PATIENTS.find((p) => p.name === this.activeName);
    return `${fb?.age_years ?? 8}y${fb?.sex ?? 'F'}`;
  }

  /**
   * Round quiz question in the panel (untagged narration — the
   * game asking YOU). Examine's is per-condition; diagnose/treat
   * are tier templates. This is the explicit Choose cue.
   */
  /** Visit + telemed: the only views with cards, tray, and quiz. */
  private isQuizView(): boolean {
    return this.currentView === 'visit' || this.currentView === 'telemed';
  }

  private showQuestion(round: VisitRound): void {
    const def = CONDITIONS[this.patientState.conditionId];
    const tier = this.tier();
    const q =
      round === 'examine'
        ? examQuestion(def.examQuiz[tier], this.activeName, this.demoTag())
        : roundQuestion(round, tier, this.activeName);
    this.lastQuestion = q;
    this.setConversation(speakerFor(this.activeName), q, 'tell');
    // One-shot coaches, at most one toast per question (the
    // toast replaces, so ordering is the priority). First quiz
    // ever: teach the tap. First question with a rewindable
    // move: point at the Undo pill. First examine quiz after
    // that (second visit): point at the tray (options make more
    // sense after the findings). View-gated: resolve beats can
    // land while the player is away, and the tray exists only
    // here. Storage-guarded: blocked browsers stay quiet
    // instead of throwing.
    if (this.isQuizView()) {
      try {
        if (takeFirstQuizHint(window.localStorage)) {
          this.showToast('Tap the best answer below');
        } else if (
          undoDepth(this.undoStack) > 0 &&
          takeUndoHint(window.localStorage)
        ) {
          this.showToast('Changed your mind? Undo is top-right');
        } else if (round === 'examine' && takeTrayHint(window.localStorage)) {
          this.showToast('Stuck? The exam tray (right edge) holds clues');
        }
      } catch {
        // Private-mode play skips the hint silently.
      }
    }
  }

  /** Tray close re-asks the live round's quiz (findings cover it). */
  private resurfaceQuestion(): void {
    if (this.lastQuestion === null || this.visitEnded) return;
    if (!this.isQuizView()) return;
    this.setConversation(speakerFor(this.activeName), this.lastQuestion, 'tell');
  }

  /**
   * Greeting beat: the opener first, then the live round's quiz
   * slides in 2s later (token-guarded — a fast tap, switch, or
   * tab change cancels the handoff). Re-asking on return trips
   * re-orients the player mid-visit.
   */
  private greetThenQuiz(returning: boolean): void {
    const token = this.roundToken;
    const askLive = (): void => {
      if (token !== this.roundToken) return;
      if (this.currentView !== 'visit' && this.currentView !== 'telemed') return;
      this.showQuestion(this.round);
    };
    this.time.delayedCall(2000, () => {
      if (token !== this.roundToken) return;
      if (this.currentView !== 'visit' && this.currentView !== 'telemed') return;
      if (!returning) {
        this.showQuestion(this.round);
        return;
      }
      // Returning patients: recognition first, then the symptom
      // opener, then the quiz (each beat token-guarded).
      this.setConversation(speakerFor(this.activeName), this.openerText(), 'say');
      this.time.delayedCall(2000, askLive);
    });
  }

  /**
   * EXAMINE round: pick a maneuver. The revealing one pays BEST
   * (+coin) and a real finding; the rest find nothing new
   * (NOT_GREAT, no harm). Then the diagnosis round.
   */
  private resolveExam(i: number): void {
    const card = this.cards[i];
    if (!card) return;
    const def = CONDITIONS[this.patientState.conditionId];
    this.undoStack = pushMove(this.undoStack, this.snapPreMove());
    const pickId = card.actionId.replace('exam:', '');
    const best = pickId === def.examBestId;
    const grade: ChoiceGrade = best ? 'BEST' : 'NOT_GREAT';
    card.revealed = grade;
    this.drawSpine(card, grade);
    this.drawStamp(card, grade);
    if (best) {
      this.roundScore.examBest = true;
      const examPay = this.correctPayout();
      this.wallet = earn(this.wallet, examPay, 'earn:best-exam');
      this.visitEarned += examPay;
      this.saveWallet();
      this.showToast(`Great exam! +${examPay} ${this.coinWord(examPay)}${this.cheerSuffix()}`);
    } else {
      this.showToast('Hmm, nothing new');
    }
    this.refreshChart();
    this.refreshHud();
    // The finding reads, then the next quiz lands (both beats
    // token-guarded so switches/undos cancel the chain).
    const token = this.roundToken;
    this.time.delayedCall(900, () => {
      if (token !== this.roundToken) return;
      // Panel beats stay in the visit (the advance always runs —
      // the return trip re-asks the live quiz).
      if (this.isQuizView()) {
        this.setConversation(
          speakerFor(this.activeName),
          best ? def.bestFinding : EXAM_OTHER_FINDING,
          'tell',
        );
      }
      this.time.delayedCall(1800, () => {
        if (token !== this.roundToken) return;
        this.advanceRound('diagnose');
      });
    });
  }

  /**
   * DIAGNOSE round: name the condition. Right pays BEST (+coin);
   * wrong costs the ending (but the visit goes on — treat
   * what's in front of you). Then the treatment round.
   */
  private resolveDx(i: number): void {
    const card = this.cards[i];
    if (!card) return;
    const def = CONDITIONS[this.patientState.conditionId];
    this.undoStack = pushMove(this.undoStack, this.snapPreMove());
    const pick = card.actionId.replace('dx:', '') as ConditionId;
    const correct = pick === def.id;
    const tier = this.tier();
    const pickLabel = CONDITION_TIER_NAMES[pick]?.[tier] ?? pick;
    const grade: ChoiceGrade = correct ? 'BEST' : 'WRONG';
    card.revealed = grade;
    this.drawSpine(card, grade);
    this.drawStamp(card, grade);
    if (correct) {
      this.roundScore.dxCorrect = true;
      const dxPay = this.correctPayout();
      this.wallet = earn(this.wallet, dxPay, 'earn:best-dx');
      this.visitEarned += dxPay;
      this.saveWallet();
      this.showToast(`Correct diagnosis! +${dxPay} ${this.coinWord(dxPay)}${this.cheerSuffix()}`);
    } else {
      this.showToast("Hmm — that doesn't fit");
    }
    this.refreshChart();
    this.refreshHud();
    const token = this.roundToken;
    // 1.5s to read the stamp + confirmation, then the next quiz.
    this.time.delayedCall(1500, () => {
      if (token !== this.roundToken) return;
      if (this.isQuizView()) {
        this.setConversation(
          speakerFor(this.activeName),
          correct
            ? `${pickLabel} it is. Now choose the treatment.`
            : `${pickLabel} doesn't fit — but the visit goes on. Treat what's in front of you.`,
          'tell',
        );
      }
      // The confirmation reads briefly, then the treat quiz lands.
      this.time.delayedCall(1600, () => {
        if (token !== this.roundToken) return;
        this.advanceRound('treat');
      });
    });
  }

  private resolveCard(i: number): void {
    const card = this.cards[i];
    if (!card) return;
    const def = CONDITIONS[this.patientState.conditionId];
    const action = def.actions.find((a) => a.id === card.actionId);
    if (!action) return;
    const grade = this.engine.gradeAction(this.patientState, card.actionId);
    // Undo: capture the PRE-move snapshot (skipped for blocked moves,
    // which change nothing and would make undo a no-op step).
    const preMove = this.snapPreMove();
    const result = this.engine.applyAction(this.patientState, card.actionId);
    if (!result.blocked) {
      this.undoStack = pushMove(this.undoStack, preMove);
    }
    if (result.blocked) {
      // Engine veto: your training stops you. Dim + shake + the
      // hold-back line — no happy bounce on a blocked move.
      // Revealed stays null (stamp only): the round stays open.
      this.drawSpine(card, grade);
      this.drawStamp(card, grade);
      card.root.setAlpha(0.55);
      this.tweens.add({
        targets: card.root,
        x: '+=6',
        duration: 30,
        yoyo: true,
        repeat: 3,
        ease: 'Sine.easeInOut',
      });
      this.setConversation('YOU', result.blockReason ?? action.hootLine, 'say');
      this.holdSteady();
      return;
    }
    this.patientState = result.node.state;
    this.lastNodeId = result.node.id;
    if (this.patientState.stageIndex !== this.revealedStage) {
      // Grades move with the stage — fresh discovery, clear spines.
      this.revealedStage = this.patientState.stageIndex;
      this.clearReveals();
    }
    card.revealed = grade;
    this.drawSpine(card, grade);
    this.drawStamp(card, grade);
    // Right/wrong reads three ways: stamp + face + toast.
    const txPay = this.correctPayout();
    if (grade === 'BEST') {
      this.showToast(`Great choice! +${txPay} ${this.coinWord(txPay)}${this.cheerSuffix()}`);
    }
    else if (grade === 'NOT_GREAT') this.showToast('Okay — no harm done');
    else this.showToast('Oh no — that made things worse');
    this.refreshChart();
    if (grade === 'BEST') {
      // Care Coins wallet: correct (BEST) resolves pay the shop-
      // boosted payout. Blocked moves and lesser grades pay
      // nothing. Persisted locally; the coin_ledger table
      // replaces local saves later.
      this.wallet = earn(this.wallet, txPay, 'earn:best-resolve');
      this.visitEarned += txPay;
      this.saveWallet();
    }
    this.refreshHud();
    // G4 encounter rounds on REAL trajectories: the engine still
    // computes state (physics), but the words come from the
    // pre-computed stored child when one exists. A miss grows
    // the tree in the background (never mid-tap waiting).
    const stored =
      this.cast && this.currentNodeId
        ? childFor(this.cast, this.currentNodeId, action.label)
        : null;
    if (stored) {
      this.currentNodeId = stored.node.id;
      this.currentDepth = stored.node.depth;
      this.setConversation(
        speakerFor(this.activeName),
        `${stored.node.narrative} ${stored.node.teaching}`,
        'tell',
      );
    } else {
      this.setConversation(
        speakerFor(this.activeName),
        `${result.node.narrative} ${result.node.teaching}`,
        'tell',
      );
      void this.growTree();
    }
    this.playResolveFlash(result.node.animationCue);
    this.maybeEndVisit(grade === 'BEST');
  }

  /**
   * The TREAT round ends the visit: the set of choices decides
   * the ending (right diagnosis + right treatment recovers).
   */
  private maybeEndVisit(txBest: boolean): void {
    if (this.visitEnded) return;
    this.roundScore.txBest = txBest;
    if (isPerfectVisit(this.roundScore)) {
      // Flawless 3/3: the perfect-visit bonus lands before the
      // ending modal so its coins-earned line includes it.
      const perfectPay = EARN_PERFECT + perfectBonus(this.ownedIds);
      this.wallet = earn(this.wallet, perfectPay, 'earn:perfect-visit');
      this.visitEarned += perfectPay;
      this.saveWallet();
    }
    const outcome = visitOutcome(this.roundScore);
    this.visitEnded = true;
    this.showResult(outcome);
  }

  /**
   * Background growth: when play walks off the pre-computed tree,
   * compute children with the REAL engine and extend server-side.
   * Best-effort (null offline) — play never waits on it.
   */
  private async growTree(): Promise<void> {
    if (this.extending) return;
    if (!this.cast || !this.activePatientId || !this.currentNodeId) return;
    this.extending = true;
    try {
      const children = childSpecs(this.engine, this.patientState, this.currentDepth + 1);
      const grown = await extendTree(this.activePatientId, this.currentNodeId, children);
      if (grown) {
        this.cast = mergeExtension(this.cast, grown.nodes, grown.edges);
        this.ticker.setLines([
          `grew ${grown.nodes.length} futures at depth ${this.currentDepth + 1}`,
          'trajectories: instant reads continue',
        ]);
      }
    } finally {
      this.extending = false;
    }
  }

  /**
   * Switch the visit to another playable patient (roster phase):
   * fresh engine state for THEIR condition, fresh trajectory
   * cursor, fresh face/cards/nametag. Mabel/June/Milo only —
   * anyone else never reaches here (waiting tap guards).
   */
  private switchPatient(name: string): void {
    if (SPRITE_PREFIX[name] === undefined) return;
    this.activeName = name;
    // Fresh visit: clock + coins baseline restart, result clears.
    this.visitEnded = false;
    this.lastOutcome = null;
    this.hideResult();
    this.selectedPreset = null;
    this.handoffSheet.hide();
    void this.refreshInbox('switch');
    this.visitEarned = 0;
    this.lastQuestion = null;
    this.roundToken += 1;
    this.round = 'examine';
    this.roundScore = { examBest: false, dxCorrect: false, txBest: false };
    const row = this.cast ? patientByName(this.cast, name) : null;
    // Live row first, fallback second (never the previous
    // patient's disease when the cast is slow or missing).
    const fb = FALLBACK_PATIENTS.find((p) => p.name === name);
    const cond = row?.condition_id ?? fb?.condition_id;
    if (
      cond === 'asthma' || cond === 'viral-respiratory' ||
      cond === 'dehydration' || cond === 'hypertension'
    ) {
      this.patientState = this.engine.initialState(cond);
    } else {
      this.patientState = this.engine.initialState(this.patientState.conditionId);
    }
    this.revealedStage = this.patientState.stageIndex;
    this.undoStack = clearUndo();
    this.activePatientId = row?.id ?? null;
    const root = row && this.cast ? rootNode(this.cast, row.id) : null;
    this.currentNodeId = root?.id ?? null;
    this.currentDepth = 0;
    this.patient.setTexture(this.steadyFace());
    this.nametag.setText(`${name} · ${row?.persona ?? fb?.persona ?? 'first patient'}`);
    this.cardRow.removeAll(true);
    this.buildCards();
    this.drawCorral();
    this.closeConversation();
    this.refreshChart();
    this.refreshHud();
    this.showView('visit');
    this.chartDrawer.setOpen(true);
    this.showToast(`${name} is with you!`);
  }

  // -- expression state machine (ANIMATION.md normative) --

  /** Sprite texture prefix for the active patient. */
  private prefix(): string {
    return SPRITE_PREFIX[this.activeName] ?? 'mabel';
  }

  /** Steady face for the LIVE state: stage map + vitals shift. */
  private steadyFace(): string {
    const p = this.prefix();
    const ladder = [`${p}-relieved`, `${p}-idle`, `${p}-sick`, `${p}-pained`];
    let idx = Math.min(3, Math.max(0, this.patientState.stageIndex));
    const v = this.patientState.vitals;
    // One rule: ANY vital <= 2 shifts one step worse (floor pained).
    if (v.energy <= 2 || v.comfort <= 2 || v.breathing <= 2) {
      idx = Math.min(3, idx + 1);
    }
    return ladder[idx] ?? `${p}-idle`;
  }

  /** Every flash settles here — the steady map, never hard-coded idle. */
  private settleToSteady(): void {
    this.patient.setTexture(this.steadyFace());
  }

  /** HOLD steady: no flash, no bounce — the face reflects state. */
  private holdSteady(): void {
    if (this.showingFlash) return;
    if (this.patient.texture.key === `${this.prefix()}-blink`) return;
    this.settleToSteady();
  }

  /** Transient flash on a decision resolve, driven by the engine cue. */
  private playResolveFlash(cue: TrajectoryNode['animationCue']): void {
    if (cue === 'happy') {
      // Full recovery: happy + standard bounce, then settle relieved.
      this.playBounceFlash(`${this.prefix()}-happy`);
      return;
    }
    if (cue === 'recovery') {
      // Partial improvement: relieved flash + standard bounce.
      this.playBounceFlash(`${this.prefix()}-relieved`);
      return;
    }
    if (cue === 'sick') {
      // Worsened: pained 600ms still hold, no bounce.
      this.playPainedFlash();
      return;
    }
    // 'worried' (no change) and 'idle' (resting at stage 0): hold.
    this.holdSteady();
  }

  // -- shared tap-resolve motion (ANIMATION.md exact, both tap paths) --

  private onPatientTap(): void {
    if (this.adminOpen) return;
    if (this.currentView !== 'visit' && this.currentView !== 'telemed') return;
    if (!this.panelOpen) {
      this.setConversation(speakerFor(this.activeName), this.openerText(), 'say');
      // Happy tap-react: show the happy pose for the bounce, then
      // settle to steady. The token guards rapid re-taps so a stale
      // bounce never clears a newer flash.
      this.playHappyBounce();
    } else {
      this.closeConversation();
    }
  }

  private playHappyBounce(): void {
    this.playBounceFlash(`${this.prefix()}-happy`);
  }

  /**
   * Standard bounce shared by the happy tap-react AND the relieved
   * flash, ANIMATION.md exact: 110ms squash yoyo (+-0.06) then a
   * chained 80ms overshoot yoyo (+-0.03), Sine.easeInOut,
   * scale-only (the update() bob owns mabel.y, so no y-tween).
   * Settles to the STEADY-map face; the monotonic token guards
   * both onCompletes so a stale bounce never clears a newer flash.
   */
  private playBounceFlash(face: string): void {
    this.flashToken += 1;
    const token = this.flashToken;
    this.showingFlash = true;
    this.patient.setTexture(face);
    this.tweens.add({
      targets: this.patient,
      scaleY: '-=0.06',
      scaleX: '+=0.06',
      duration: 110,
      yoyo: true,
      ease: 'Sine.easeInOut',
      onComplete: () => {
        if (token !== this.flashToken) return;
        this.tweens.add({
          targets: this.patient,
          scaleY: '+=0.03',
          scaleX: '-=0.03',
          duration: 80,
          yoyo: true,
          ease: 'Sine.easeInOut',
          onComplete: () => {
            if (token !== this.flashToken) return;
            this.showingFlash = false;
            if (this.patient.texture.key === face) {
              this.settleToSteady();
            }
          },
        });
      },
    });
  }

  /**
   * Pained flash: 600ms still hold, NO bounce, NO shake on Mabel
   * (scale stays 1 — pain reads in the face, not the body), then
   * settle to the steady map. Same token guard as the bounce.
   */
  private playPainedFlash(): void {
    this.flashToken += 1;
    const token = this.flashToken;
    this.showingFlash = true;
    this.patient.setTexture(`${this.prefix()}-pained`);
    this.time.delayedCall(600, () => {
      if (token !== this.flashToken) return;
      if (this.patient.texture.key !== `${this.prefix()}-pained`) return;
      this.showingFlash = false;
      this.settleToSteady();
    });
  }

  // -- progress HUD (Visit only; chrome-3: lives IN the top strip) --

  private drawHud(): void {
    // Chrome-3: the mid-screen band (was y376-412) is RETIRED —
    // the HUD now lives inside the slim top strip (y0-32, pill
    // h24 at y4, centerline y16), above the title (top ~y40).
    // Coin cluster left, bare context words center. Visit-only:
    // fades with the visit view (showView),
    // while the strip itself stays persistent. Icons are
    // code-drawn ($0, crisp, offline-safe): coin+ and clock-hands.
    // Pills + text stay opaque; translucency is the strip's only.
    const coinsBg = this.add.graphics();
    coinsBg.fillStyle(CARD_FILL, 1);
    coinsBg.lineStyle(2, OUTLINE, 1);
    coinsBg.fillRoundedRect(24, 4, 100, 24, 12);
    coinsBg.strokeRoundedRect(24, 4, 100, 24, 12);
    // Care Coin: metallic gold disc — dark rim, amber face,
    // pale-gold inner ring, shine dot, embossed C.
    const coin = this.add.graphics();
    coin.fillStyle(AMBER, 1);
    coin.lineStyle(2, OUTLINE, 1);
    coin.fillCircle(44, 16, 9);
    coin.strokeCircle(44, 16, 9);
    coin.lineStyle(1, 0xf2c66d, 1);
    coin.strokeCircle(44, 16, 6);
    coin.fillStyle(0xfff3d6, 1);
    coin.fillCircle(41, 13, 2);
    const coinC = this.add
      .text(44, 16, 'C', {
        fontFamily: FONT_FAMILY,
        fontStyle: 'bold',
        fontSize: '11px',
        color: COCOA,
      })
      .setOrigin(0.5, 0.5);
    this.coinsText = this.add
      .text(58, 16, '', {
        fontFamily: FONT_FAMILY,
        fontStyle: 'bold',
        fontSize: '14px',
        color: COCOA,
      })
      .setOrigin(0, 0.5);

    // Context: bare bold words, no pill — the strip is the frame.
    this.contextText = this.add
      .text(270, 16, '', {
        fontFamily: FONT_FAMILY,
        fontStyle: 'bold',
        fontSize: '14px',
        color: COCOA,
      })
      .setOrigin(0.5, 0.5);

    // No clock until the speed element returns (playtest: the
    // timer reads as pressure without purpose). visitStartMs is
    // kept for its comeback.

    // Tapping the coin meter opens the Clinic Shop.
    const coinZone = this.add
      .zone(74, 16, 100, 24)
      .setInteractive({ useHandCursor: true });
    coinZone.on('pointerdown', () => {
      if (this.shop.open) this.shop.hide();
      else this.shop.show(this.wallet.balance, this.ownedIds);
    });
    // Rewind pill, right end of the strip: the player-facing
    // face of the 10-move undo stack. Appears only once there
    // is a move to rewind (refreshHud owns visibility), so the
    // strip stays clean at first sight.
    const undoBg = this.add.graphics();
    undoBg.fillStyle(CARD_FILL, 1);
    undoBg.lineStyle(2, OUTLINE, 1);
    undoBg.fillRoundedRect(428, 4, 88, 24, 12);
    undoBg.strokeRoundedRect(428, 4, 88, 24, 12);
    this.undoText = this.add
      .text(472, 16, '', {
        fontFamily: FONT_FAMILY,
        fontStyle: 'bold',
        fontSize: '13px',
        color: COCOA,
      })
      .setOrigin(0.5, 0.5);
    this.undoZone = this.add.zone(472, 16, 88, 24).setInteractive({ useHandCursor: true });
    this.undoZone.on('pointerdown', () => {
      if (undoDepth(this.undoStack) > 0) this.doUndo();
    });
    this.undoPill = this.add.container(0, 0, [undoBg, this.undoText, this.undoZone]);
    this.hud = this.add.container(0, 0, [
      coinsBg,
      coin,
      coinC,
      this.coinsText,
      this.contextText,
      coinZone,
      this.undoPill,
    ]);
    // Depth 20 = above the strip bg (19), level with the nav bar
    // (a different band, so no conflict).
    this.hud.setDepth(20);
    this.refreshHud();
  }

  /**
   * Per-patient visit numbers (mock until the backend owns
   * visits): Milo is an existing patient here sick (2), Mabel a
   * returning follow-up (4), June a true first-timer (1).
   */
  private visitNo(): number {
    if (this.activeName === 'Mabel') return 4;
    if (this.activeName === 'June') return 1;
    return 2;
  }

  /** Mock context derivation: first visit → new, stage 2+ → sick. */
  private visitContext(): VisitContext {
    if (this.visitNo() <= 1) return 'new-patient';
    if (this.patientState.stageIndex >= 2) return 'sick-visit';
    return 'follow-up';
  }

  /** Medical Chart contents: the tier-aware signout. */
  private refreshChart(): void {
    const def = CONDITIONS[this.patientState.conditionId];
    const stage = def.stages[this.patientState.stageIndex];
    const tier = this.tier();
    const row = this.cast ? patientByName(this.cast, this.activeName) : null;
    const fb = row ?? FALLBACK_PATIENTS.find((p) => p.name === this.activeName);
    const lines = signoutLines(
      {
        visitNo: this.visitNo(),
        visitKind: this.visitContext(),
        name: this.activeName,
        ageYears: fb?.age_years ?? 8,
        sex: fb?.sex ?? 'F',
        complaint: stage.label,
        condition: def.name,
        observation: `${stage.blurb} ${def.plainWords}`,
        meds: [],
      },
      tier,
    );
    this.chartDrawer.setContent({ lines });
  }

  private refreshHud(): void {
    this.coinsText.setText(`${this.wallet.balance}`);
    // Center strip stays blank: reserved real estate for future
    // real status messages (operator note 2026-10-29).
    this.contextText.setText('');
    // Rewind pill: present only while a move can rewind (the
    // hud container already gates the visit view).
    const depth = undoDepth(this.undoStack);
    this.undoText.setText(undoLabel(depth));
    this.undoPill.setVisible(depth > 0);
    // Visibility alone doesn't release taps: disable the zone too.
    if (this.undoZone.input) this.undoZone.input.enabled = depth > 0;
  }

  // -- VIEW 2: waiting room (a list, not a room) --

  private drawWaitingView(): void {
    // A washed sheet over the plate: the furniture recedes and
    // the queue reads as a plain list on a nice backdrop. Same
    // sheet geometry as the Learning List.
    const sheet = this.add.graphics();
    sheet.fillStyle(CREAM, CHROME_ALPHA);
    sheet.lineStyle(3, OUTLINE, 1);
    sheet.fillRoundedRect(24, 136, 492, 740, 24);
    sheet.strokeRoundedRect(24, 136, 492, 740, 24);
    const title = this.add
      .text(48, 172, 'Waiting Room', {
        fontFamily: FONT_FAMILY,
        fontStyle: 'bold',
        fontSize: '26px',
        color: COCOA,
      })
      .setOrigin(0, 0.5);
    const hint = this.add
      .text(48, 202, 'Tap a friend to visit · arrows reorder', {
        fontFamily: FONT_FAMILY,
        fontSize: '15px',
        color: SECONDARY,
      })
      .setOrigin(0, 0.5);
    this.waitingRows = this.add.container(0, 0, []);
    this.waitingView = this.add.container(0, 0, [sheet, title, hint, this.waitingRows]);
    this.waitingView.setDepth(10).setVisible(false).setAlpha(0);
  }

  /**
   * Rebuilds the waiting LIST for whoever is NOT in the exam
   * room, in queue order: mini + name + complaint + visit kind
   * per row, NEXT on the head, chevrons to reorder. Called on
   * every arrival in Waiting so a switch never shows stale rows.
   * Nothing from the exam room leaks in: no patient sprite (see
   * showView), no cards, no tray, no drawer.
   */
  private refreshWaitingRows(): void {
    this.waitingRows.removeAll(true);
    const names = waitingNames(this.waitingOrder, this.activeName);
    names.forEach((rowName, i) => {
      const entry = MOCK_ROSTER.find((e) => e.name === rowName);
      if (!entry) return;
      const y = 232 + i * 116;
      const parts: Phaser.GameObjects.GameObject[] = [];
      // Row card (the head row carries a sage tint = NEXT).
      const bg = this.add.graphics();
      bg.fillStyle(i === 0 ? SAGE : CARD_FILL, i === 0 ? 0.35 : 1);
      bg.lineStyle(2, OUTLINE, 1);
      bg.fillRoundedRect(48, y, 444, 104, 16);
      bg.strokeRoundedRect(48, y, 444, 104, 16);
      parts.push(bg);
      const prefix = SPRITE_PREFIX[entry.name];
      if (prefix !== undefined) {
        const face = this.add.image(108, y + 52, `${prefix}-idle`);
        face.setDisplaySize(64, 64);
        parts.push(face);
      } else {
        // Elegant placeholder: soft concentric rings + monogram
        // (never a bare oval) until the sprite ships.
        const rings = this.add.graphics();
        rings.fillStyle(SAGE, 0.3);
        rings.fillCircle(108, y + 52, 32);
        rings.fillStyle(CARD_FILL, 1);
        rings.fillCircle(108, y + 52, 25);
        rings.lineStyle(2, OUTLINE, 1);
        rings.strokeCircle(108, y + 52, 25);
        const initial = this.add
          .text(108, y + 52, entry.name.charAt(0), {
            fontFamily: FONT_FAMILY,
            fontStyle: 'bold',
            fontSize: '26px',
            color: COCOA,
          })
          .setOrigin(0.5, 0.5);
        parts.push(rings, initial);
      }
      const who = this.add
        .text(152, y + 22, entry.name, {
          fontFamily: FONT_FAMILY,
          fontStyle: 'bold',
          fontSize: '19px',
          color: COCOA,
        })
        .setOrigin(0, 0);
      const what = this.add
        .text(152, y + 50, `${entry.complaint} · ${entry.visitKind}`, {
          fontFamily: FONT_FAMILY,
          fontSize: '15px',
          color: SECONDARY,
        })
        .setOrigin(0, 0);
      parts.push(who, what);
      // Shared-care flag: another doctor left a note here.
      const rowNotes = this.notesFor(entry.name);
      const shared = rowNotes.find((n) => n.from_handle !== this.doctorHandle);
      if (shared) {
        const flag = this.add
          .text(152, y + 72, `Note from ${doctorByline(shared.from_handle, shared.team_tag)}`, {
            fontFamily: FONT_FAMILY,
            fontSize: '13px',
            color: SECONDARY,
          })
          .setOrigin(0, 0);
        parts.push(flag);
      }
      if (i === 0) {
        const tag = this.add.graphics();
        tag.fillStyle(SAGE, 1);
        tag.fillRoundedRect(352, y + 16, 58, 26, 13);
        const tagText = this.add
          .text(381, y + 29, 'NEXT', {
            fontFamily: FONT_FAMILY,
            fontStyle: 'bold',
            fontSize: '13px',
            color: '#ffffff',
          })
          .setOrigin(0.5, 0.5);
        parts.push(tag, tagText);
      }
      // Reorder chevrons (right column; the row tap owns the rest).
      const chev = this.add.graphics();
      chev.fillStyle(OUTLINE, 0.65);
      chev.fillTriangle(444, y + 24, 476, y + 24, 460, y + 8);
      chev.fillTriangle(444, y + 80, 476, y + 80, 460, y + 96);
      parts.push(chev);
      const row = this.add.container(0, 0, parts);
      const tapZone = this.add
        .zone(239, y + 52, 382, 104)
        .setInteractive({ useHandCursor: true });
      tapZone.on('pointerdown', () => {
        this.tweens.add({
          targets: row,
          scaleX: 0.98,
          scaleY: 0.98,
          duration: 90,
          yoyo: true,
          ease: 'Sine.easeInOut',
        });
        if (prefix !== undefined) {
          this.switchPatient(entry.name);
        } else {
          this.showToast(`${entry.name} is still napping`);
        }
      });
      row.add(tapZone);
      const upZone = this.add
        .zone(460, y + 26, 52, 48)
        .setInteractive({ useHandCursor: true });
      upZone.on('pointerdown', () => {
        this.waitingOrder = moveWaiting(this.waitingOrder, rowName, -1);
        this.refreshWaitingRows();
      });
      const downZone = this.add
        .zone(460, y + 78, 52, 48)
        .setInteractive({ useHandCursor: true });
      downZone.on('pointerdown', () => {
        this.waitingOrder = moveWaiting(this.waitingOrder, rowName, 1);
        this.refreshWaitingRows();
      });
      row.add([upZone, downZone]);
      this.waitingRows.add(row);
    });
  }

  // -- VIEW 3: telemedicine call frame (Visit geometry + frame) --

  private drawTelemedChrome(): void {
    const frame = this.add.graphics();
    frame.lineStyle(12, 0x2b2622, 1);
    frame.strokeRoundedRect(16, 128, 508, 748, 28);
    const liveBg = this.add.graphics();
    liveBg.fillStyle(0xb34a45, 1);
    liveBg.fillRoundedRect(28, 380, 110, 36, 18);
    const live = this.add
      .text(83, 398, '• LIVE', {
        fontFamily: FONT_FAMILY,
        fontStyle: 'bold',
        fontSize: '16px',
        color: '#ffffff',
      })
      .setOrigin(0.5, 0.5);
    const peerBg = this.add.graphics();
    peerBg.fillStyle(SKY, 1);
    peerBg.fillRoundedRect(344, 380, 168, 36, 18);
    const peer = this.add
      .text(428, 398, 'Clinic › observing', {
        fontFamily: FONT_FAMILY,
        fontSize: '14px',
        color: COCOA,
      })
      .setOrigin(0.5, 0.5);
    this.telemedView = this.add.container(0, 0, [frame, liveBg, live, peerBg, peer]);
    this.telemedView.setDepth(11).setVisible(false).setAlpha(0);

    const mkCallButton = (
      cx: number,
      label: string,
      get: () => boolean,
      set: (v: boolean) => void,
    ): void => {
      const bg = this.add.graphics();
      bg.fillStyle(0xe3f0f8, 1);
      bg.lineStyle(2, OUTLINE, 1);
      bg.fillCircle(cx, 850, 24);
      bg.strokeCircle(cx, 850, 24);
      const text = this.add
        .text(cx, 850, label, {
          fontFamily: FONT_FAMILY,
          fontStyle: 'bold',
          fontSize: '13px',
          color: COCOA,
        })
        .setOrigin(0.5, 0.5);
      const slash = this.add.graphics();
      slash.lineStyle(4, 0xb34a45, 1);
      slash.lineBetween(cx - 14, 850 + 14, cx + 14, 850 - 14);
      slash.setVisible(false);
      const zone = this.add.zone(cx, 850, 48, 48).setInteractive({ useHandCursor: true });
      zone.on('pointerdown', () => {
        set(!get());
        slash.setVisible(!get());
        this.showToast(`${label} is pretend in this prototype (mock)`);
      });
      this.telemedView.add([bg, text, slash, zone]);
    };
    mkCallButton(90, 'MIC', () => this.muteOn, (v) => {
      this.muteOn = v;
    });
    mkCallButton(150, 'CAM', () => this.camOn, (v) => {
      this.camOn = v;
    });

    const pillBg = this.add.graphics();
    pillBg.fillStyle(0x5e9c6b, 1);
    pillBg.fillRoundedRect(200, 826, 312, 48, 24);
    const pillText = this.add
      .text(356, 850, 'Visit in person →', {
        fontFamily: FONT_FAMILY,
        fontStyle: 'bold',
        fontSize: '17px',
        color: '#ffffff',
      })
      .setOrigin(0.5, 0.5);
    const pillZone = this.add
      .zone(356, 850, 312, 48)
      .setInteractive({ useHandCursor: true });
    pillZone.on('pointerdown', () => this.showView('visit'));
    this.telemedView.add([pillBg, pillText, pillZone]);
  }

  // -- VIEW 4: portal inbox (MOCK threads) --

  private drawPortalView(): void {
    const sheet = this.add.graphics();
    sheet.fillStyle(CREAM, 1);
    sheet.lineStyle(3, OUTLINE, 1);
    sheet.fillRoundedRect(24, 136, 492, 740, 24);
    sheet.strokeRoundedRect(24, 136, 492, 740, 24);
    const title = this.add
      .text(40, 160, 'Patient Portal', {
        fontFamily: FONT_FAMILY,
        fontStyle: 'bold',
        fontSize: '26px',
        color: COCOA,
      })
      .setOrigin(0, 0.5);
    const lock = this.add
      .text(500, 160, 'mock inbox — stays on this device', {
        fontFamily: FONT_FAMILY,
        fontSize: '14px',
        color: SECONDARY,
      })
      .setOrigin(1, 0.5);
    const footnote = this.add
      .text(270, 826, 'No real messages — everything here is pretend.', {
        fontFamily: FONT_FAMILY,
        fontSize: '14px',
        color: SECONDARY,
      })
      .setOrigin(0.5, 0.5);
    this.portalView = this.add.container(0, 0, [sheet, title, lock, footnote]);
    this.portalView.setDepth(10).setVisible(false).setAlpha(0);

    MOCK_THREADS.forEach((thread, idx) => {
      const collapsedH = 92;
      const bg = this.add.graphics();
      const line1 = this.add
        .text(56, 16, `${thread.from} — ${thread.subject}`, {
          fontFamily: FONT_FAMILY,
          fontStyle: 'bold',
          fontSize: '19px',
          color: COCOA,
        })
        .setOrigin(0, 0);
      const line2 = this.add
        .text(56, 46, thread.snippet, {
          fontFamily: FONT_FAMILY,
          fontSize: '16px',
          color: SECONDARY,
        })
        .setOrigin(0, 0);
      const chevron = this.add
        .text(478, 46, '›', {
          fontFamily: FONT_FAMILY,
          fontSize: '28px',
          color: SECONDARY,
        })
        .setOrigin(0.5, 0.5);
      const extras = this.add.container(0, 0, []);
      // Expanded extras are measured now, shown on tap.
      let ey = 76;
      const bubbleBg = this.add.graphics();
      extras.add(bubbleBg);
      for (const msg of thread.messages) {
        // Quoted speech (mock copy): patient lines wrap in quotes;
        // player replies + Clinic system lines stay unquoted. Snippets
        // stay bare (truncated previews, never full lines).
        const bubble = this.add.text(msg.me ? 484 : 56, ey + 8, quoteIfSpoken(thread.from, msg.me, msg.text), {
          fontFamily: FONT_FAMILY,
          fontSize: '17px',
          color: COCOA,
          wordWrap: { width: 368 },
        });
        bubble.setOrigin(msg.me ? 1 : 0, 0);
        const bw = bubble.width + 24;
        const bh = bubble.height + 16;
        const bx = msg.me ? 484 - bw : 56;
        bubbleBg.fillStyle(msg.me ? CARD_FILL : 0xe3f0f8, 1);
        bubbleBg.lineStyle(2, OUTLINE, 0.6);
        bubbleBg.fillRoundedRect(bx, ey, bw, bh, 12);
        bubbleBg.strokeRoundedRect(bx, ey, bw, bh, 12);
        extras.add(bubble);
        ey += bh + 8;
      }
      const replyBg = this.add.graphics();
      replyBg.fillStyle(0xefe6d8, 1);
      replyBg.fillRoundedRect(56, ey, 428, 44, 12);
      const reply = this.add
        .text(270, ey + 22, 'Replies open after the visit (mock)', {
          fontFamily: FONT_FAMILY,
          fontSize: '15px',
          color: SECONDARY,
        })
        .setOrigin(0.5, 0.5);
      extras.add([replyBg, reply]);
      ey += 44;
      const expandedH = ey + 16;
      extras.setVisible(false);

      const rowTop = 196 + idx * (collapsedH + 12);
      const root = this.add.container(0, rowTop, [bg, line1, line2, chevron, extras]);
      const zone = this.add
        .zone(270, collapsedH / 2, 460, collapsedH)
        .setInteractive({ useHandCursor: true });
      zone.on('pointerdown', () => this.toggleThread(idx));
      root.add(zone);
      this.drawThreadBg(bg, collapsedH);
      // Unread dot (sage 12px) + count, right side.
      if (thread.unread > 0) {
        const dot = this.add.graphics();
        dot.fillStyle(SAGE, 1);
        dot.fillCircle(432, 28, 6);
        const count = this.add
          .text(444, 28, `${thread.unread} new`, {
            fontFamily: FONT_FAMILY,
            fontSize: '14px',
            color: SECONDARY,
          })
          .setOrigin(0, 0.5);
        root.add([dot, count]);
      }
      this.portalView.add(root);
      this.threads.push({ root, bg, extras, zone, collapsedH, expandedH });
    });
  }

  private drawThreadBg(bg: Phaser.GameObjects.Graphics, h: number): void {
    bg.clear();
    bg.fillStyle(CARD_FILL, 1);
    bg.lineStyle(3, OUTLINE, 1);
    bg.fillRoundedRect(40, 0, 460, h, 16);
    bg.strokeRoundedRect(40, 0, 460, h, 16);
  }

  private toggleThread(idx: number): void {
    this.openThread = this.openThread === idx ? -1 : idx;
    let rowTop = 196;
    this.threads.forEach((thread, i) => {
      const open = i === this.openThread;
      const h = open ? thread.expandedH : thread.collapsedH;
      this.drawThreadBg(thread.bg, h);
      thread.extras.setVisible(open);
      thread.zone.setSize(460, h).setPosition(270, h / 2);
      this.tweens.killTweensOf(thread.root);
      this.tweens.add({
        targets: thread.root,
        y: rowTop,
        duration: 250,
        ease: 'Sine.easeInOut',
      });
      rowTop += h + 12;
    });
  }

  // -- VIEW 5: player profile (placeholder; the players table waits) --

  private drawProfileView(): void {
    // Same washed-sheet geometry as Waiting/Learn. The stats
    // are LIVE (wallet + Learn progress); identity + login
    // ship after the freeze on the `players` table.
    const sheet = this.add.graphics();
    sheet.fillStyle(CREAM, CHROME_ALPHA);
    sheet.lineStyle(3, OUTLINE, 1);
    sheet.fillRoundedRect(24, 136, 492, 740, 24);
    sheet.strokeRoundedRect(24, 136, 492, 740, 24);
    const title = this.add
      .text(48, 172, 'Profile', {
        fontFamily: FONT_FAMILY,
        fontStyle: 'bold',
        fontSize: '26px',
        color: COCOA,
      })
      .setOrigin(0, 0.5);
    const hint = this.add
      .text(48, 202, 'Tap Doctor or Team to edit · login later', {
        fontFamily: FONT_FAMILY,
        fontSize: '15px',
        color: SECONDARY,
      })
      .setOrigin(0, 0.5);
    // Reading-level segmented control (header right — the
    // sheet's 7 row slots are full). Pills right-align to the
    // rows (x492); zones oversize the visuals for touch.
    const segLabel = this.add
      .text(314, 180, 'Reading level', {
        fontFamily: FONT_FAMILY,
        fontSize: '13px',
        color: SECONDARY,
      })
      .setOrigin(1, 0.5);
    this.segRow = this.add.container(0, 0, []);
    this.profileRows = this.add.container(0, 0, []);
    this.profileView = this.add.container(0, 0, [sheet, title, hint, segLabel, this.segRow, this.profileRows]);
    this.profileView.setDepth(10).setVisible(false).setAlpha(0);
  }

  /** Rebuilds the live stat rows on every Profile arrival. */
  private refreshProfileRows(): void {
    this.segRow.removeAll(true);
    const segDefs: (1 | 2 | 3)[] = [1, 2, 3];
    segDefs.forEach((d, i) => {
      const x = 322 + i * 58;
      const selected = d === this.difficulty;
      const bg = this.add.graphics();
      bg.fillStyle(selected ? SAGE : CARD_FILL, 1);
      bg.lineStyle(2, OUTLINE, 1);
      bg.fillRoundedRect(x, 166, 54, 28, 14);
      bg.strokeRoundedRect(x, 166, 54, 28, 14);
      const label = this.add
        .text(x + 27, 180, CHROME_TIER_LABEL[CHROME_TIER_BY_DIFFICULTY[d]], {
          fontFamily: FONT_FAMILY,
          fontStyle: 'bold',
          fontSize: '12px',
          color: selected ? '#ffffff' : COCOA,
        })
        .setOrigin(0.5, 0.5);
      const zone = this.add
        .zone(x + 27, 180, 54, 44)
        .setInteractive({ useHandCursor: true });
      zone.on('pointerdown', () => this.setDifficulty(d));
      this.segRow.add([bg, label, zone]);
    });
    this.profileRows.removeAll(true);
    const stats: [string, string][] = [
      ['Care Coins', `${this.wallet.balance}`],
      ['Topics filed', `${this.filedConds.length}`],
      ['Topics read', `${this.openedRes.size}`],
      ['Doctor', `Doctor ${this.doctorHandle}`],
      ['Team', `Team ${this.teamTag}`],
      ['Cheers', `${this.cheers.length}`],
    ];
    stats.forEach(([label, value], i) => {
      const y = 232 + i * 84;
      const bg = this.add.graphics();
      bg.fillStyle(CARD_FILL, 1);
      bg.lineStyle(2, OUTLINE, 1);
      bg.fillRoundedRect(48, y, 444, 72, 16);
      bg.strokeRoundedRect(48, y, 444, 72, 16);
      const left = this.add
        .text(68, y + 36, label, {
          fontFamily: FONT_FAMILY,
          fontSize: '17px',
          color: SECONDARY,
        })
        .setOrigin(0, 0.5);
      const right = this.add
        .text(472, y + 36, value, {
          fontFamily: FONT_FAMILY,
          fontStyle: 'bold',
          fontSize: '19px',
          color: COCOA,
        })
        .setOrigin(1, 0.5);
      this.profileRows.add([bg, left, right]);
    });
    // The Doctor row opens the identity editor (presets + typed).
    const swapZone = this.add
      .zone(270, 232 + 3 * 84 + 36, 444, 72)
      .setInteractive({ useHandCursor: true });
    swapZone.on('pointerdown', () => {
      this.editor.show('doctor', this.doctorHandle, DOCTOR_HANDLES);
    });
    this.profileRows.add(swapZone);
    // The Team row opens the practice editor (presets + typed).
    const teamZone = this.add
      .zone(270, 232 + 4 * 84 + 36, 444, 72)
      .setInteractive({ useHandCursor: true });
    teamZone.on('pointerdown', () => {
      this.editor.show('team', this.teamTag, TEAM_TAGS);
    });
    this.profileRows.add(teamZone);
    // The About row opens the project sheet (7th row, same card).
    const aboutY = 232 + 6 * 84;
    const aboutBg = this.add.graphics();
    aboutBg.fillStyle(CARD_FILL, 1);
    aboutBg.lineStyle(2, OUTLINE, 1);
    aboutBg.fillRoundedRect(48, aboutY, 444, 72, 16);
    aboutBg.strokeRoundedRect(48, aboutY, 444, 72, 16);
    const aboutLeft = this.add
      .text(68, aboutY + 36, 'About', {
        fontFamily: FONT_FAMILY,
        fontSize: '17px',
        color: SECONDARY,
      })
      .setOrigin(0, 0.5);
    const aboutRight = this.add
      .text(472, aboutY + 36, 'Cozy Clinic', {
        fontFamily: FONT_FAMILY,
        fontStyle: 'bold',
        fontSize: '19px',
        color: COCOA,
      })
      .setOrigin(1, 0.5);
    const aboutZone = this.add
      .zone(270, aboutY + 36, 444, 72)
      .setInteractive({ useHandCursor: true });
    aboutZone.on('pointerdown', () => {
      if (this.about.open) this.about.hide();
      else this.about.show();
    });
    this.profileRows.add([aboutBg, aboutLeft, aboutRight, aboutZone]);
  }

  // -- M4 shared care (inbox, notes handle, compose) --

  /** Live + fallback ids for one roster name (inbox matching). */
  private patientIdsFor(name: string): string[] {
    const ids: string[] = [];
    const live = this.cast ? patientByName(this.cast, name) : null;
    if (live) ids.push(live.id);
    const fb = FALLBACK_PATIENTS.find((p) => p.name === name);
    if (fb && !ids.includes(fb.id)) ids.push(fb.id);
    return ids;
  }

  private patientNameFor(id: string): string | null {
    const live = this.cast?.patients.find((p) => p.id === id);
    if (live) return live.name;
    return FALLBACK_PATIENTS.find((p) => p.id === id)?.name ?? null;
  }

  /** Newest-first inbox notes for one roster name. */
  private notesFor(name: string): HandoffNote[] {
    const ids = this.patientIdsFor(name);
    // Own-practice notes head the list (cheers ride along).
    return teammatesFirst(
      this.inbox.filter((n) => ids.includes(n.patient_id)),
      this.teamTag,
    );
  }

  /**
   * Pulls the inbox + cheers (live, else fallback samples),
   * toasts the first unseen item from another doctor, flushes
   * both outboxes on live reads, and re-syncs the badge +
   * waiting rows. Overlap-guarded: polls never stack.
   */
  private async refreshInbox(reason: 'boot' | 'poll' | 'switch'): Promise<void> {
    if (this.refreshingInbox) return;
    this.refreshingInbox = true;
    try {
      const [{ notes, source }, cheerInbox] = await Promise.all([
        loadHandoffs(),
        loadCheers(this.doctorHandle),
      ]);
      this.inbox = notes;
      this.inboxSource = source;
      this.cheers = cheerInbox.cheers;
      if (reason !== 'boot') {
        const fresh = notes.find(
          (n) => !this.seenNoteIds.has(n.id) && n.from_handle !== this.doctorHandle,
        );
        if (fresh) {
          const who = this.patientNameFor(fresh.patient_id);
          const byline = doctorByline(fresh.from_handle, fresh.team_tag);
          this.showToast(`New note from ${byline}${who ? ` on ${who}` : ''}`);
        }
        const freshCheer = this.cheers.find((c) => !this.seenCheerIds.has(c.id));
        if (freshCheer) {
          this.showToast(`${doctorByline(freshCheer.from_handle, null)}: ${freshCheer.preset_id}`);
        }
      }
      for (const n of notes) this.seenNoteIds.add(n.id);
      for (const c of this.cheers) this.seenCheerIds.add(c.id);
      if (source === 'live') await this.flushOutbox();
      this.syncNotesBadge();
      if (this.currentView === 'waiting') this.refreshWaitingRows();
      if (this.currentView === 'profile') this.refreshProfileRows();
      if (this.handoffSheet.open) this.showHandoffSheet();
    } finally {
      this.refreshingInbox = false;
    }
  }

  /** Sends queued drafts in order; stops at the first failure. */
  private async flushOutbox(): Promise<void> {
    let sent = 0;
    for (const draft of this.outbox) {
      try {
        await sendHandoff(draft);
        sent += 1;
      } catch {
        break;
      }
    }
    if (sent > 0) {
      this.outbox = shiftOutbox(this.outbox, sent);
      this.saveOutbox();
      this.showToast(sent === 1 ? 'Queued note sent' : `${sent} queued notes sent`);
      const { notes } = await loadHandoffs();
      this.inbox = notes;
      for (const n of notes) this.seenNoteIds.add(n.id);
    }
    let cheered = 0;
    for (const draft of this.cheerOutbox) {
      try {
        await sendCheer(draft);
        cheered += 1;
      } catch {
        break;
      }
    }
    if (cheered > 0) {
      this.cheerOutbox = shiftOutbox(this.cheerOutbox, cheered);
      this.saveCheerOutbox();
      this.showToast(cheered === 1 ? 'Queued cheer sent' : `${cheered} queued cheers sent`);
    }
    this.syncNotesBadge();
  }

  /** Sends the next rotating cheer to a colleague (or queues it). */
  private async sendCheerTo(toHandle: string): Promise<void> {
    if (toHandle === this.doctorHandle) {
      this.showToast('Cheer a colleague, not yourself!');
      return;
    }
    // One flight at a time: rapid re-taps don't double-send.
    if (this.cheering) return;
    this.cheering = true;
    try {
      const { cheer, next } = nextCheer(this.cheerCursor);
      this.cheerCursor = next;
      const draft: CheerDraft = {
        from_handle: this.doctorHandle,
        to_handle: toHandle,
        preset_id: cheer,
      };
      try {
        await sendCheer(draft);
        this.showToast(`Sent "${cheer}" to Doctor ${toHandle}`);
      } catch {
        this.cheerOutbox = pushOutbox(this.cheerOutbox, draft);
        this.saveCheerOutbox();
        this.showToast('Cheer saved — sends when online');
      }
    } finally {
      this.cheering = false;
    }
  }

  /** Badge dots the handle when another doctor wrote here. */
  private syncNotesBadge(): void {
    const notes = this.notesFor(this.activeName);
    const shared = notes.some((n) => n.from_handle !== this.doctorHandle);
    this.notesBadge.setVisible(shared);
  }

  private drawNotesHandle(): void {
    // Bottom tab of the right-edge rail (slot y490): care notes.
    // Same 52x56 glass tab language, envelope glyph, amber badge
    // dot when another doctor left a note. Opens the note sheet
    // (a modal, not a slider) and parks both drawers.
    const cx = RAIL_X + TAB_W / 2;
    const cy = RAIL_SLOTS.notes + TAB_H / 2;
    const tab = this.add.graphics();
    tab.fillStyle(CREAM, CHROME_ALPHA);
    tab.lineStyle(3, OUTLINE, 1);
    tab.fillRoundedRect(RAIL_X, RAIL_SLOTS.notes, TAB_W, TAB_H, {
      tl: 14,
      tr: 0,
      bl: 14,
      br: 0,
    });
    tab.strokeRoundedRect(RAIL_X, RAIL_SLOTS.notes, TAB_W, TAB_H, {
      tl: 14,
      tr: 0,
      bl: 14,
      br: 0,
    });
    const glyph = this.add.graphics();
    glyph.lineStyle(2.5, OUTLINE, 1);
    glyph.strokeRoundedRect(cx - 11, cy - 8, 22, 16, 3);
    glyph.lineBetween(cx - 11, cy - 7, cx, cy + 1);
    glyph.lineBetween(cx + 11, cy - 7, cx, cy + 1);
    this.notesBadge = this.add.graphics();
    this.notesBadge.fillStyle(AMBER, 1);
    this.notesBadge.lineStyle(2, OUTLINE, 1);
    this.notesBadge.fillCircle(RAIL_X + TAB_W - 8, RAIL_SLOTS.notes + 10, 7);
    this.notesBadge.strokeCircle(RAIL_X + TAB_W - 8, RAIL_SLOTS.notes + 10, 7);
    this.notesBadge.setVisible(false);
    const zone = this.add
      .zone(cx, cy, TAB_W, TAB_H)
      .setInteractive({ useHandCursor: true });
    zone.on('pointerdown', () => this.showHandoffSheet());
    this.notesHandle = this.add.container(0, 0, [tab, glyph, this.notesBadge, zone]);
    this.notesHandle.setDepth(23);
  }

  /** (Re)builds the sheet for the active patient + live tier. */
  private showHandoffSheet(): void {
    // The sheet is modal: park both sliders behind it.
    this.chartDrawer.setOpen(false, true);
    this.tray.setOpen(false, true);
    const tier = this.tier();
    this.handoffSheet.show({
      patientName: this.activeName,
      notes: this.notesFor(this.activeName),
      tier,
      selected: this.selectedPreset,
      offline: this.inboxSource === 'fallback',
    });
  }

  /** Sends the picked preset (or queues it offline). */
  private async sendActiveNote(): Promise<void> {
    const preset = this.selectedPreset;
    const ids = this.patientIdsFor(this.activeName);
    const patientId = ids[0] ?? null;
    if (preset === null || patientId === null) return;
    const score = scoreCount(this.roundScore);
    const draft: HandoffDraft = {
      patient_id: patientId,
      from_handle: this.doctorHandle,
      team_tag: this.teamTag,
      preset_id: preset,
      encounter_summary: handoffSummary(this.visitNo(), score, this.visitEnded),
      outcome: visitOutcome(this.roundScore),
      score,
    };
    this.selectedPreset = null;
    this.handoffSheet.hide();
    try {
      await sendHandoff(draft);
      this.showToast('Note sent to the next doctor');
    } catch {
      this.outbox = pushOutbox(this.outbox, draft);
      this.saveOutbox();
      this.showToast('Saved — sends when online');
    }
    void this.refreshInbox('switch');
  }

  // -- nav bar (persistent, all views) --

  private drawNavBar(): void {
    const bg = this.add.graphics();
    // Chrome-2 quieter toolbar: translucent fill lets the room show
    // softly through; the divider thins to a 2px whisper line. Tabs
    // + pill + text stay fully opaque.
    bg.fillStyle(CREAM, CHROME_ALPHA);
    bg.fillRect(0, 888, 540, 72);
    bg.fillStyle(OUTLINE, 0.25);
    bg.fillRect(0, 888, 540, 2);
    const pillFace = this.add.graphics();
    pillFace.fillStyle(SAGE, 1);
    pillFace.fillRoundedRect(-59, -30, 118, 60, 30);
    this.navPill = this.add.container(TAB_X.visit, 924, [pillFace]);
    const nav = this.add.container(0, 0, [bg, this.navPill]);
    nav.setDepth(20);

    const tabs: { view: ViewName; label: string }[] = [
      { view: 'waiting', label: 'Waiting' },
      { view: 'visit', label: 'Visit' },
      { view: 'learn', label: 'Learn' },
      { view: 'profile', label: 'Profile' },
    ];
    for (const tab of tabs) {
      const cx = TAB_X[tab.view];
      // Chrome-3: drawn icon (not a text glyph) + short label.
      const icon = this.drawTabIcon(tab.view, cx, 910);
      this.tabIcons[tab.view] = icon;
      const label = this.add
        .text(cx, 938, tab.label, {
          fontFamily: FONT_FAMILY,
          fontStyle: 'bold',
          fontSize: '15px',
          color: COCOA,
        })
        .setOrigin(0.5, 0.5);
      this.tabTexts[tab.view] = [label];
      // 132 wide: 4 tabs at 138 spacing, 6px gutters, no overlap.
      const zone = this.add
        .zone(cx, 924, 132, 72)
        .setInteractive({ useHandCursor: true });
      zone.on('pointerdown', () => this.showView(tab.view));
      nav.add([icon, label, zone]);
    }
    // Learn badge: amber dot that pulses until a struggling visit
    // sends the player to Learn. Hidden until earned.
    const badge = this.add.graphics();
    badge.fillStyle(AMBER, 1);
    badge.lineStyle(2, OUTLINE, 1);
    badge.fillCircle(0, 0, 8);
    badge.strokeCircle(0, 0, 8);
    this.learnBadge = this.add.container(TAB_X.learn + 22, 900, [badge]);
    this.learnBadge.setVisible(false);
    nav.add(this.learnBadge);
    // Waiting badge: how many friends are waiting (roster minus
    // the visit — 3 with the fixed cast, drawn once).
    const waitingBadge = this.add.graphics();
    waitingBadge.fillStyle(SAGE, 1);
    waitingBadge.lineStyle(2, OUTLINE, 1);
    waitingBadge.fillCircle(0, 0, 10);
    waitingBadge.strokeCircle(0, 0, 10);
    const waitingCount = this.add
      .text(0, 0, `${MOCK_ROSTER.length - 1}`, {
        fontFamily: FONT_FAMILY,
        fontStyle: 'bold',
        fontSize: '13px',
        color: COCOA,
      })
      .setOrigin(0.5, 0.5);
    nav.add(this.add.container(TAB_X.waiting + 28, 900, [waitingBadge, waitingCount]));
  }

  /**
   * Chrome-3 tab icon set, code-drawn ($0, crisp at any DPI,
   * offline-safe): waiting = queue dots, visit = care cross,
   * learn = book, telemed = video play, portal = envelope.
   * Palette-only fills (ART_BIBLE taste law: no gradients, no
   * glow).
   */
  private drawTabIcon(view: ViewName, cx: number, cy: number): Phaser.GameObjects.Graphics {
    const g = this.add.graphics();
    if (view === 'waiting') {
      g.fillStyle(OUTLINE, 1);
      g.fillCircle(cx - 12, cy, 4);
      g.fillCircle(cx, cy, 4);
      g.fillCircle(cx + 12, cy, 4);
    } else if (view === 'visit') {
      g.fillStyle(SAGE, 1);
      g.lineStyle(2, OUTLINE, 1);
      g.fillRoundedRect(cx - 10, cy - 10, 20, 20, 6);
      g.strokeRoundedRect(cx - 10, cy - 10, 20, 20, 6);
      g.fillStyle(0xfff9ef, 1);
      g.fillRect(cx - 6, cy - 2, 12, 4);
      g.fillRect(cx - 2, cy - 6, 4, 12);
    } else if (view === 'telemed') {
      g.lineStyle(2, OUTLINE, 1);
      g.strokeRoundedRect(cx - 16, cy - 11, 32, 22, 4);
      g.fillStyle(OUTLINE, 1);
      g.fillTriangle(cx - 4, cy - 6, cx - 4, cy + 6, cx + 7, cy);
    } else if (view === 'learn') {
      g.fillStyle(CARD_FILL, 1);
      g.lineStyle(2, OUTLINE, 1);
      g.fillRoundedRect(cx - 10, cy - 12, 20, 24, 3);
      g.strokeRoundedRect(cx - 10, cy - 12, 20, 24, 3);
      g.lineBetween(cx - 5, cy - 12, cx - 5, cy + 12);
    } else if (view === 'profile') {
      g.fillStyle(CARD_FILL, 1);
      g.lineStyle(2, OUTLINE, 1);
      g.fillCircle(cx, cy - 5, 7);
      g.strokeCircle(cx, cy - 5, 7);
      g.fillTriangle(cx - 13, cy + 12, cx + 13, cy + 12, cx, cy - 2);
    } else {
      g.lineStyle(2, OUTLINE, 1);
      g.strokeRoundedRect(cx - 15, cy - 10, 30, 20, 3);
      g.lineBetween(cx - 15, cy - 9, cx, cy);
      g.lineBetween(cx + 15, cy - 9, cx, cy);
    }
    return g;
  }

  // -- top bar (persistent strip; chrome-3: HUD owns the contents) --

  private drawTopBar(): void {
    // Slim strip y0–32: translucent fill + whisper divider, depth
    // 19 so the HUD contents (depth 20) sit on it. Chrome-3: the
    // profile chip + difficulty pill LEFT the main screen for a
    // future submenu (operator direction) — the strip now frames
    // the Visit HUD (drawHud), and rests empty on other views.
    // Display-only: no zones, so title taps pass through.
    const bg = this.add.graphics();
    bg.fillStyle(CREAM, CHROME_ALPHA);
    bg.fillRect(0, 0, 540, 32);
    bg.fillStyle(OUTLINE, 0.25);
    bg.fillRect(0, 32, 540, 2);

    const bar = this.add.container(0, 0, [bg]);
    bar.setDepth(19);
  }

  // -- G4 module wiring (ticker, tray, chart, learn list, live cast) --

  private wireModules(): void {
    // Ticker: persistent chrome, 1 row by default (2-row expand
    // arrives with the submenu toggle). Hidden in Telemed (the
    // call buttons own the bottom band) and managed per view.
    this.ticker = new BackendTicker(this);
    this.ticker.setCollapsed(true);
    this.ticker.setLines(['connecting…', '']);
    this.time.addEvent({
      delay: 4000,
      loop: true,
      callback: () => this.ticker.tickMock(),
    });

    // Tray: Visit-only exam chrome. The tray IS the physical
    // exam — each maneuver reveals its disease-specific finding
    // (Supabase, tier-worded). Free and ungraded, always
    // available; the main cards keep only real choices.
    this.tray = new ToolTray(this);
    this.tray.onPick = (tool) => {
      const tier = this.tier();
      const finding =
        findingFor(
          this.examFindings,
          this.patientState.conditionId,
          TOOL_MODALITY[tool.id],
          tier,
        ) ?? EXAM_OTHER_FINDING;
      this.setConversation(speakerFor(this.activeName), finding, 'tell');
    };
    // Radio + resurface wiring lives with the chart construction
    // below (both sliders must exist first).

    // Chart drawer: succinct Medical Chart, top rail tab. Radio
    // rule: at most one slider open — opening one parks the other.
    this.chartDrawer = new ChartDrawer(this);
    this.chartDrawer.onToggle = (open) => {
      if (open) this.tray.setOpen(false);
    };
    this.tray.onToggle = (open) => {
      if (open) this.chartDrawer.setOpen(false);
      else this.resurfaceQuestion();
    };
    this.refreshChart();

    // Living Chart: tap the nametag to open.
    this.chart = new LivingChart(this);
    const nametagZone = this.add
      .zone(270, 736, 220, 30)
      .setInteractive({ useHandCursor: true });
    nametagZone.on('pointerdown', () => {
      if (this.adminOpen) return;
      if (this.currentView !== 'visit') return;
      if (this.chart.open) this.chart.hide();
      else this.chart.show(this.activeName, this.patientState.memory);
    });

    // Learning List: full-screen behind the Learn tab (the old
    // strip book button is gone — the tab owns learning now).
    this.learnList = new LearnList(this);
    this.loadLearn();
    this.loadHandle();
    this.loadOutbox();
    this.loadTeam();
    this.loadCheerOutbox();
    // Care-notes sheet: incoming continuity + preset compose.
    this.handoffSheet = new HandoffSheet(this);
    this.handoffSheet.onSelect = (presetId) => {
      this.selectedPreset = presetId;
      this.showHandoffSheet();
    };
    this.handoffSheet.onSend = () => {
      void this.sendActiveNote();
    };
    this.handoffSheet.onCheer = (toHandle) => {
      void this.sendCheerTo(toHandle);
    };
    // Inbox: boot read + 20s poll (two doctors share a patient).
    void this.refreshInbox('boot');
    this.time.addEvent({
      delay: 20000,
      loop: true,
      callback: () => {
        void this.refreshInbox('poll');
      },
    });
    this.learnList.onOpen = (r) => {
      // The card opens in-app (no tab leaves the game); the
      // authoritative link hides inside it as "Read more".
      if (this.openedRes.has(r.id)) {
        this.showToast('Happy re-reading!');
        return;
      }
      this.openedRes.add(r.id);
      this.saveLearn();
      const readPay = EARN_LEARN_FIRST + learnBonus(this.ownedIds);
      this.wallet = earn(this.wallet, readPay, 'earn:learn-first');
      this.saveWallet();
      this.refreshHud();
      this.showToast(`Good reading! +${readPay} ${this.coinWord(readPay)}`);
    };
    this.learnList.onExternal = (r) => {
      window.open(r.url, '_blank', 'noopener');
    };
    this.learnList.onQuizPass = (r) => {
      // One prize per topic: a stale double-tap reaps nothing.
      if (this.passedQuiz.has(r.id)) return EARN_QUIZ_PASS;
      this.passedQuiz.add(r.id);
      this.saveLearn();
      this.wallet = earn(this.wallet, EARN_QUIZ_PASS, 'earn:quiz-pass');
      this.saveWallet();
      this.refreshHud();
      this.showToast(`Quiz whiz! +${EARN_QUIZ_PASS} ${this.coinWord(EARN_QUIZ_PASS)}`);
      return EARN_QUIZ_PASS;
    };
    this.learnList.onClose = () => {
      if (this.currentView === 'learn') this.showView('visit');
    };

    // Clinic Shop: the coin meter opens it (visit-only HUD).
    this.shop = new ShopSheet(this);
    // About sheet: the Profile About row opens it.
    this.about = new AboutSheet(this);
    // Profile editor: Doctor + Practice rows open it.
    this.editor = new ProfileEditor(this);
    this.editor.onSave = (kind: ProfileKind, value: string) => {
      if (kind === 'doctor') {
        const clean = cleanHandle(value);
        if (!clean) {
          this.showToast('Names need 2+ letters — try again');
          return;
        }
        this.doctorHandle = clean;
        this.saveHandle();
        this.editor.hide();
        this.showToast(`You are Doctor ${clean}`);
        this.refreshProfileRows();
        // A new handle means a new cheer address.
        void this.refreshInbox('switch');
      } else {
        const clean = cleanTeam(value);
        if (!clean) {
          this.showToast('Names need 2+ letters — try again');
          return;
        }
        this.teamTag = clean;
        this.saveTeam();
        this.editor.hide();
        this.showToast(
          (TEAM_TAGS as readonly string[]).includes(clean)
            ? `You are on Team ${clean}`
            : `Your practice is ${clean}`,
        );
        this.refreshProfileRows();
      }
    };
    this.loadShop();
    this.shop.onBuy = (item: ShopItem) => {
      const res = buyItem(this.wallet.balance, this.ownedIds, item);
      if (!res) {
        this.showToast('Not enough coins yet — earn more in visits');
        return;
      }
      const paid = spend(this.wallet, item.cost, `spend:${item.id}`);
      if (!paid) {
        this.showToast('Not enough coins yet — earn more in visits');
        return;
      }
      this.wallet = paid;
      this.saveWallet();
      this.ownedIds = res.owned;
      this.saveShop();
      this.refreshHud();
      this.shop.refresh(this.wallet.balance, this.ownedIds);
      this.showToast(
        item.id === 'nurse-birch' ? 'Nurse Birch joined your clinic!' : `${item.name} is yours!`,
      );
    };

    // Live exam findings ride alongside the cast (same rules).
    void loadExamFindings().then((data) => {
      this.examFindings = data.findings;
    });
    // Live cast: Supabase first, fallback offline. Resolves read
    // the loaded trees instantly — never mid-tap network.
    void loadCast().then((cast) => {
      this.cast = cast;
      const me = patientByName(cast, this.activeName);
      this.activePatientId = me?.id ?? null;
      const root = me ? rootNode(cast, me.id) : null;
      this.currentNodeId = root?.id ?? null;
      this.currentDepth = 0;
      this.ticker.setLines([
        `${cast.source}: ${cast.patients.length} patients \u00b7 ${cast.nodes.length} nodes`,
        'trajectories: 2 turns ahead \u00b7 instant reads',
      ]);
      // The opener re-reads live once the cast lands.
      if (this.panelOpen) {
        this.setConversation(speakerFor(this.activeName), this.openerText(), 'say');
        this.greetThenQuiz(false);
      }
    });
  }

  private showView(next: ViewName, instant = false): void {
    if (next === this.currentView && !instant) return;
    if (this.adminOpen && !instant) return;
    this.currentView = next;
    this.swapPlate(next, instant);
    // Fresh 6s grace before the idle nudge may fire here.
    if (next === 'visit' || next === 'telemed') this.lastCardTapMs = this.time.now;
    if (instant) {
      this.navPill.setX(TAB_X[next]);
    } else {
      this.tweens.add({
        targets: this.navPill,
        x: TAB_X[next],
        duration: 200,
        ease: 'Sine.easeInOut',
      });
    }
    (Object.keys(this.tabTexts) as ViewName[]).forEach((view) => {
      const active = view === next;
      for (const text of this.tabTexts[view]) text.setAlpha(active ? 1 : 0.6);
      this.tabIcons[view]?.setAlpha(active ? 1 : 0.6);
    });

    this.fadeSwap(this.waitingView, next === 'waiting', instant);
    this.fadeSwap(this.portalView, next === 'portal', instant);
    this.fadeSwap(this.telemedView, next === 'telemed', instant);
    this.fadeSwap(this.profileView, next === 'profile', instant);
    this.fadeSwap(this.cardRow, next === 'visit' || next === 'telemed', instant);
    this.fadeSwap(this.hud, next === 'visit', instant);
    // The patient greets you on arrival — the opener is already
    // showing, no tap-teaching needed — then the live quiz
    // follows. (Boot lands here too.)
    if (next === 'visit' || next === 'telemed') {
      // A Profile tier switch rewords the live visit on return:
      // cards rebuild (stamps preserved), chart + quiz re-ask.
      if (this.cardTier !== null && this.cardTier !== this.tier()) {
        this.rebuildCardsForTier();
      }
      this.refreshChart();
      if (this.visitEnded && this.lastOutcome) {
        // A finished visit re-offers its ending (never dead cards).
        this.showResult(this.lastOutcome);
      } else {
        // Returning patients (visit #2+) recognize you first —
        // the hook lands in the opening seconds, not minutes.
        const entry = MOCK_ROSTER.find((e) => e.name === this.activeName);
        const returning = this.visitNo() >= 2 && entry !== undefined;
        const greet = returning && entry ? entry.welcomeBack : this.openerText();
        this.setConversation(speakerFor(this.activeName), greet, 'say');
        this.greetThenQuiz(returning);
      }
    }
    // Waiting rows rebuild every arrival (never stale faces).
    if (next === 'waiting') this.refreshWaitingRows();
    // Profile stats rebuild every arrival (never stale coins).
    if (next === 'profile') this.refreshProfileRows();
    // G4 module visibility: ticker everywhere except Telemed (call
    // buttons own that bottom band); tray + chart drawer Visit-only
    // (no hands through a video call).
    this.ticker.setVisible(next !== 'telemed');
    this.tray.setVisible(next === 'visit');
    this.chartDrawer.setVisible(next === 'visit');
    this.notesHandle.setVisible(next === 'visit');
    // Fresh arrivals re-check the shared inbox (cheap, guarded).
    if (next === 'waiting' || next === 'visit') void this.refreshInbox('switch');
    // Overlays close on any view change (all no-op when shut) —
    // except Learn, which IS the Learning List full-screen.
    this.chart.hide();
    this.shop.hide();
    this.about.hide();
    this.editor.hide();
    this.handoffSheet.hide();
    if (next === 'learn') {
      this.learnList.show(this.filedConds, this.openedRes, this.passedQuiz);
      this.clearLearnBadge();
    } else {
      this.learnList.hide();
    }
    this.nametag.setVisible(next === 'visit');
    // The exam patient never leaks into Waiting/Learn/Profile.
    this.patient.setVisible(next === 'visit' || next === 'telemed');
    this.patientShadow.setVisible(next === 'visit' || next === 'telemed');
    this.devTrigger.setVisible(
      next === 'waiting' || next === 'visit' || next === 'learn' || next === 'profile',
    );
    this.syncPanelVisibility();
    const cardY = next === 'telemed' ? -60 : 0;
    if (instant) {
      this.cardRow.setY(cardY);
    } else {
      this.tweens.killTweensOf(this.cardRow);
      this.tweens.add({
        targets: this.cardRow,
        y: cardY,
        duration: 250,
        ease: 'Sine.easeInOut',
      });
    }
    this.syncPatientInput();
  }

  private fadeSwap(
    obj: Phaser.GameObjects.Container,
    show: boolean,
    instant: boolean,
  ): void {
    this.tweens.killTweensOf(obj);
    if (show) {
      obj.setVisible(true);
      if (instant) {
        obj.setAlpha(1);
      } else {
        this.tweens.add({
          targets: obj,
          alpha: 1,
          duration: 180,
          ease: 'Sine.easeOut',
        });
      }
      return;
    }
    if (!obj.visible) return;
    if (instant || obj.alpha === 0) {
      obj.setVisible(false);
      obj.setAlpha(0);
      return;
    }
    this.tweens.add({
      targets: obj,
      alpha: 0,
      duration: 150,
      ease: 'Sine.easeOut',
      onComplete: () => obj.setVisible(false),
    });
  }

  private syncPatientInput(): void {
    const want =
      !this.adminOpen && (this.currentView === 'visit' || this.currentView === 'telemed');
    if (want && !this.patient.input) {
      this.patient.setInteractive({ useHandCursor: true });
    } else if (!want && this.patient.input) {
      this.patient.disableInteractive();
    }
  }

  // -- DEV ADMIN: secret trigger + code pad + wall monitor --

  private onDevTrigger(): void {
    if (this.adminOpen) return;
    this.devTaps += 1;
    this.devResetTimer?.remove();
    this.devResetTimer = this.time.delayedCall(3000, () => {
      this.devTaps = 0;
    });
    if (this.devTaps >= 5) {
      this.devTaps = 0;
      this.openPad();
    }
  }

  private drawCodePad(): void {
    const dim = this.add.graphics();
    dim.fillStyle(0x000000, 0.45);
    dim.fillRect(0, 0, 540, 960);
    const dimZone = this.add.zone(270, 480, 540, 960).setInteractive();
    const sheet = this.add.graphics();
    sheet.fillStyle(CREAM, 1);
    sheet.lineStyle(3, OUTLINE, 1);
    sheet.fillRoundedRect(90, 296, 360, 368, 24);
    sheet.strokeRoundedRect(90, 296, 360, 368, 24);
    const prompt = this.add
      .text(270, 316, 'Staff only', {
        fontFamily: FONT_FAMILY,
        fontSize: '18px',
        color: SECONDARY,
      })
      .setOrigin(0.5, 0.5);
    this.padDots = this.add.graphics();
    const cancel = this.add
      .text(270, 640, '‹ back', {
        fontFamily: FONT_FAMILY,
        fontSize: '18px',
        color: SECONDARY,
      })
      .setOrigin(0.5, 0.5);
    const cancelZone = this.add
      .zone(270, 640, 360, 48)
      .setInteractive({ useHandCursor: true });
    cancelZone.on('pointerdown', () => this.closePad(false));
    this.pad = this.add.container(0, 0, [dim, dimZone, sheet, prompt, this.padDots, cancel, cancelZone]);
    this.pad.setDepth(30).setVisible(false).setAlpha(0);
    this.updatePadDots();

    // Letter grid A–M minus J (12 keys; the spec's A–L had no M, so
    // the MABEL code was untypable — corrected, see PROGRESS.md).
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M'];
    letters.forEach((letter, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const cx = 204 + col * 66;
      const cy = 392 + row * 66;
      const face = this.add.graphics();
      face.fillStyle(0xf7e8d2, 1);
      face.lineStyle(2, OUTLINE, 1);
      face.fillRoundedRect(-28, -28, 56, 56, 12);
      face.strokeRoundedRect(-28, -28, 56, 56, 12);
      const glyph = this.add
        .text(0, 0, letter, {
          fontFamily: FONT_FAMILY,
          fontStyle: 'bold',
          fontSize: '24px',
          color: COCOA,
        })
        .setOrigin(0.5, 0.5);
      const key = this.add.container(cx, cy, [face, glyph]);
      const zone = this.add.zone(0, 0, 56, 56).setInteractive({ useHandCursor: true });
      zone.on('pointerdown', () => this.onPadKey(letter));
      key.add(zone);
      this.pad.add(key);
    });
  }

  private updatePadDots(): void {
    this.padDots.clear();
    for (let i = 0; i < 5; i += 1) {
      const cx = 202 + i * 34;
      if (i < this.padEntry.length) {
        this.padDots.fillStyle(OUTLINE, 1);
        this.padDots.fillCircle(cx, 342, 9);
      } else {
        this.padDots.lineStyle(2, OUTLINE, 1);
        this.padDots.strokeCircle(cx, 342, 9);
      }
    }
  }

  private onPadKey(letter: string): void {
    if (!this.adminOpen || this.padEntry.length >= 5) return;
    this.padEntry += letter;
    this.updatePadDots();
    if (this.padEntry.length !== 5) return;
    this.time.delayedCall(120, () => {
      if (!this.pad.visible) return;
      if (this.padEntry === PROTOTYPE_SEEDS.devCode) {
        this.closePad(true);
        this.openMonitor();
      } else {
        this.tweens.add({
          targets: this.pad,
          x: '+=6',
          duration: 30,
          yoyo: true,
          repeat: 3,
          ease: 'Sine.easeInOut',
        });
        this.padEntry = '';
        this.updatePadDots();
      }
    });
  }

  private openPad(): void {
    if (this.adminOpen) return;
    this.adminOpen = true;
    this.padEntry = '';
    this.updatePadDots();
    this.syncPatientInput();
    this.pad.setVisible(true).setAlpha(0);
    this.tweens.add({
      targets: this.pad,
      alpha: 1,
      duration: 180,
      ease: 'Sine.easeOut',
    });
  }

  private closePad(toMonitor: boolean): void {
    this.tweens.killTweensOf(this.pad);
    this.tweens.add({
      targets: this.pad,
      alpha: 0,
      duration: 150,
      ease: 'Sine.easeOut',
      onComplete: () => {
        this.pad.setVisible(false);
        if (!toMonitor) {
          this.adminOpen = false;
          this.syncPatientInput();
        }
      },
    });
  }

  private drawMonitor(): void {
    const backdropZone = this.add
      .zone(270, 480, 540, 960)
      .setInteractive({ useHandCursor: false });
    backdropZone.on('pointerdown', () => this.closeMonitor());
    this.monitorBackdrop = this.add.container(0, 0, [backdropZone]);
    this.monitorBackdrop.setDepth(30).setVisible(false);

    const mount = this.add.graphics();
    mount.fillStyle(0x6b4a2f, 1);
    mount.fillRoundedRect(220, 132, 100, 18, 4);
    const frame = this.add.graphics();
    frame.fillStyle(0x6b4a2f, 1);
    frame.fillRoundedRect(36, 150, 468, 550, 16);
    frame.fillStyle(0x0e1b14, 1);
    frame.fillRoundedRect(42, 156, 456, 538, 12);
    const scan = this.add.graphics();
    scan.lineStyle(1, 0xffffff, 0.05);
    for (let y = 158; y < 692; y += 4) {
      scan.lineBetween(44, y, 496, y);
    }
    const glare = this.add.graphics();
    glare.fillStyle(0xffffff, 0.06);
    glare.fillPoints(
      [
        { x: 330, y: 156 },
        { x: 390, y: 156 },
        { x: 230, y: 694 },
        { x: 170, y: 694 },
      ],
      true,
    );
    const xBtn = this.add.graphics();
    xBtn.fillStyle(0x3e2a1e, 1);
    xBtn.fillCircle(476, 178, 20);
    const xGlyph = this.add
      .text(476, 178, '×', {
        fontFamily: FONT_FAMILY,
        fontStyle: 'bold',
        fontSize: '22px',
        color: '#fff9ef',
      })
      .setOrigin(0.5, 0.5);
    const xZone = this.add.zone(476, 178, 48, 48).setInteractive({ useHandCursor: true });
    xZone.on('pointerdown', () => this.closeMonitor());
    this.monitorContent = this.add.container(0, 0, []);
    this.monitor = this.add.container(0, -750, [
      mount,
      frame,
      scan,
      glare,
      this.monitorContent,
      xBtn,
      xGlyph,
      xZone,
    ]);
    this.monitor.setDepth(31).setVisible(false);
    // V1 asset browser: same terminal, depth 32, follows the monitor.
    this.assetBrowser = new AssetBrowser(this);
  }

  /** Rebuilt on every open — every value below is a LIVE read. */
  private buildMonitorContent(): void {
    this.monitorContent.removeAll(true);
    // Demo overlay (hidden during ordinary gameplay): the guided
    // 90-second path + the tooling table, per the brief.
    if (this.monitorPage === 'demo') {
      this.buildDemoContent();
      return;
    }
    const def = CONDITIONS[this.patientState.conditionId];
    const stage = def.stages[this.patientState.stageIndex];
    const title = this.add
      .text(64, 184, 'COZY CLINIC — STAFF TERMINAL', {
        fontFamily: MONO_FONT,
        fontStyle: 'bold',
        fontSize: '17px',
        color: '#e8c96a',
      })
      .setOrigin(0, 0);
    this.monitorContent.add(title);
    const rows: [string, string][] = [
      ['patient:', this.activeName],
      ['condition:', `${def.name} (${def.id})`],
      ['stage:', `[${this.patientState.stageIndex}] ${stage.label} (${stage.id})`],
      [
        'vitals:',
        `energy ${this.patientState.vitals.energy} · comfort ${this.patientState.vitals.comfort} · breath ${this.patientState.vitals.breathing}`,
      ],
      ['visit:', `#${this.visitNo()} · node: ${this.lastNodeId}`],
      ['wording:', `${PROTOTYPE_SEEDS.wordingTier} · difficulty: ${this.difficulty}/3 (${this.tier()})`],
    ];
    let y = 224;
    for (const [key, value] of rows) {
      const keyText = this.add
        .text(64, y, key, {
          fontFamily: MONO_FONT,
          fontSize: '17px',
          color: '#9fe8b8',
        })
        .setOrigin(0, 0);
      const valueText = this.add
        .text(64 + keyText.width + 8, y, value, {
          fontFamily: MONO_FONT,
          fontSize: '17px',
          color: '#eaf5e9',
          wordWrap: { width: 412 - keyText.width },
        })
        .setOrigin(0, 0);
      this.monitorContent.add([keyText, valueText]);
      y += Math.max(32, valueText.height + 10);
    }
    const memories = this.patientState.memory.split('. ').filter(Boolean);
    const lastMemory = memories.length > 0 ? memories[memories.length - 1] : '—';
    const memKey = this.add
      .text(64, y, 'remembers:', {
        fontFamily: MONO_FONT,
        fontSize: '17px',
        color: '#9fe8b8',
      })
      .setOrigin(0, 0);
    const memValue = this.add
      .text(64, y + 26, `"${lastMemory}"`, {
        fontFamily: MONO_FONT,
        fontSize: '17px',
        color: '#eaf5e9',
        wordWrap: { width: 404 },
      })
      .setOrigin(0, 0);
    const hint = this.add
      .text(64, 648, 'tap outside or × to close', {
        fontFamily: MONO_FONT,
        fontSize: '14px',
        color: '#9fe8b8',
      })
      .setOrigin(0, 0);
    const assetsBtn = this.add
      .text(476, 648, '› ASSETS', {
        fontFamily: MONO_FONT,
        fontStyle: 'bold',
        fontSize: '14px',
        color: '#e8c96a',
      })
      .setOrigin(1, 0);
    const assetsZone = this.add
      .zone(440, 656, 80, 28)
      .setInteractive({ useHandCursor: true });
    assetsZone.on('pointerdown', () => {
      this.assetBrowser.show('plates', this.prefix(), this.activeName);
    });
    const undoLine = this.add
      .text(64, 616, `undo: ${undoDepth(this.undoStack)}/10 — tap to rewind`, {
        fontFamily: MONO_FONT,
        fontSize: '14px',
        color: '#e8c96a',
      })
      .setOrigin(0, 0);
    const undoZone = this.add
      .zone(200, 624, 280, 28)
      .setInteractive({ useHandCursor: true });
    undoZone.on('pointerdown', () => {
      this.doUndo();
      this.buildMonitorContent();
    });
    const demoBtn = this.add
      .text(376, 648, '› DEMO', {
        fontFamily: MONO_FONT,
        fontStyle: 'bold',
        fontSize: '14px',
        color: '#e8c96a',
      })
      .setOrigin(1, 0);
    const demoZone = this.add
      .zone(340, 656, 80, 28)
      .setInteractive({ useHandCursor: true });
    demoZone.on('pointerdown', () => {
      this.monitorPage = 'demo';
      this.buildMonitorContent();
    });
    this.monitorContent.add([memKey, memValue, undoLine, undoZone, hint, assetsBtn, assetsZone, demoBtn, demoZone]);
  }

  /** Guided demo path + tooling table (judges' overlay). */
  private buildDemoContent(): void {
    const title = this.add
      .text(64, 184, 'COZY CLINIC — DEMO SCRIPT', {
        fontFamily: MONO_FONT,
        fontStyle: 'bold',
        fontSize: '17px',
        color: '#e8c96a',
      })
      .setOrigin(0, 0);
    this.monitorContent.add(title);
    const line = (x: number, y: number, text: string, color: string, bold = false): void => {
      this.monitorContent.add(
        this.add
          .text(x, y, text, {
            fontFamily: MONO_FONT,
            fontStyle: bold ? 'bold' : 'normal',
            fontSize: '14px',
            color,
          })
          .setOrigin(0, 0),
      );
    };
    let y = 220;
    line(64, y, 'GUIDED PATH (90s, all playable now):', '#9fe8b8', true);
    y += 26;
    // Every step below works on the deployed build today —
    // nothing aspirational ships in this list.
    const steps = [
      '1 Meet Milo — visit #2, he remembers you',
      '2 Examine quiz, then dx/treat rounds',
      '3 Next patient (6 now); tray = exam',
      '4 Leave a care note (2nd tab = doctor 2)',
      '5 Learn (+2), Shop boosts, Profile, About',
      '6 Cheer a colleague from any care note',
    ];
    for (const step of steps) {
      line(64, y, step, '#eaf5e9');
      y += 24;
    }
    y += 8;
    line(64, y, 'TOOLING (model → does → breaks):', '#9fe8b8', true);
    y += 26;
    const tools: [string, string][] = [
      ['Spark 1.3 edge fns: pre-computed futures;', 'else fallback pack only'],
      ['Muse Image (mcp): mascots + plates;', 'else placeholders'],
      ['Muse Code: build + tests + art pipeline;', 'else no PROGRESS story'],
    ];
    for (const [a, b] of tools) {
      line(64, y, a, '#eaf5e9');
      line(84, y + 20, b, '#eaf5e9');
      y += 46;
    }
    const hint = this.add
      .text(64, 648, 'tap outside or × to close', {
        fontFamily: MONO_FONT,
        fontSize: '14px',
        color: '#9fe8b8',
      })
      .setOrigin(0, 0);
    const backBtn = this.add
      .text(476, 648, '‹ BACK', {
        fontFamily: MONO_FONT,
        fontStyle: 'bold',
        fontSize: '14px',
        color: '#e8c96a',
      })
      .setOrigin(1, 0);
    const backZone = this.add
      .zone(440, 656, 80, 28)
      .setInteractive({ useHandCursor: true });
    backZone.on('pointerdown', () => {
      this.monitorPage = 'staff';
      this.buildMonitorContent();
    });
    this.monitorContent.add([hint, backBtn, backZone]);
  }

  private openMonitor(): void {
    this.monitorPage = 'staff';
    this.buildMonitorContent();
    this.monitorBackdrop.setVisible(true);
    this.monitor.setVisible(true).setY(-750);
    this.tweens.add({
      targets: this.monitor,
      y: 0,
      duration: 350,
      ease: 'Sine.easeOut',
    });
  }

  private closeMonitor(): void {
    if (!this.monitor.visible) return;
    if (this.assetBrowser.open) this.assetBrowser.hide();
    this.tweens.killTweensOf(this.monitor);
    this.tweens.add({
      targets: this.monitor,
      y: -750,
      duration: 250,
      ease: 'Sine.easeInOut',
      onComplete: () => {
        this.monitor.setVisible(false);
        this.monitorBackdrop.setVisible(false);
        this.adminOpen = false;
        this.syncPatientInput();
      },
    });
  }

  // -- toast / hint (topmost) --

  private drawToast(): void {
    this.toastBg = this.add.graphics();
    this.toastText = this.add
      .text(270, 390, '', {
        fontFamily: FONT_FAMILY,
        fontSize: '17px',
        color: '#fff9ef',
      })
      .setOrigin(0.5, 0.5);
    this.toast = this.add.container(0, 0, [this.toastBg, this.toastText]);
    // Display-only (no zone), so topmost-above-all is safe —
    // result modal (44) included.
    this.toast.setDepth(46).setVisible(false).setAlpha(0);
  }

  private showToast(message: string): void {
    this.toastTimer?.remove();
    this.tweens.killTweensOf(this.toast);
    this.toastText.setText(message);
    const w = Math.min(492, this.toastText.width + 48);
    this.toastBg.clear();
    this.toastBg.fillStyle(0x3e2e22, 0.92);
    this.toastBg.fillRoundedRect(270 - w / 2, 368, w, 44, 22);
    this.toast.setVisible(true).setAlpha(0);
    this.tweens.add({
      targets: this.toast,
      alpha: 1,
      duration: 150,
      ease: 'Sine.easeOut',
    });
    this.toastTimer = this.time.delayedCall(1200, () => {
      this.tweens.add({
        targets: this.toast,
        alpha: 0,
        duration: 150,
        ease: 'Sine.easeOut',
        onComplete: () => this.toast.setVisible(false),
      });
    });
  }

  // -- visit-end result overlay (depth 44, topmost) --

  private drawResultCard(): void {
    // Fullscreen dim zone FIRST (bottom): swallows every tap
    // outside the two buttons — the visit is over, choose.
    const dim = this.add.zone(270, 480, 540, 960).setInteractive({ useHandCursor: false });
    const shade = this.add.graphics();
    shade.fillStyle(0x000000, 0.45);
    shade.fillRect(0, 0, 540, 960);
    const card = this.add.graphics();
    card.fillStyle(CREAM, GLASS_PANEL);
    card.lineStyle(3, OUTLINE, 1);
    card.fillRoundedRect(48, 340, 444, 280, 24);
    card.strokeRoundedRect(48, 340, 444, 280, 24);
    this.resultTitle = this.add
      .text(270, 372, '', {
        fontFamily: FONT_FAMILY,
        fontStyle: 'bold',
        fontSize: '26px',
        color: COCOA,
        align: 'center',
      })
      .setOrigin(0.5, 0.5);
    this.resultLines = this.add
      .text(270, 404, '', {
        fontFamily: FONT_FAMILY,
        fontSize: '17px',
        color: COCOA,
        align: 'center',
        lineSpacing: 6,
      })
      .setOrigin(0.5, 0);
    // Buttons carry RELATIVE children so the struggling pulse
    // scales about the button center (never 0,0).
    this.resultPrimaryBg = this.add.graphics();
    this.resultPrimaryText = this.add
      .text(0, 0, '', {
        fontFamily: FONT_FAMILY,
        fontStyle: 'bold',
        fontSize: '19px',
        color: COCOA,
      })
      .setOrigin(0.5, 0.5);
    const primaryZone = this.add
      .zone(0, 0, 380, 52)
      .setInteractive({ useHandCursor: true });
    primaryZone.on('pointerdown', () => this.onResultPrimary());
    this.resultPrimary = this.add.container(270, 518, [
      this.resultPrimaryBg,
      this.resultPrimaryText,
      primaryZone,
    ]);
    const secondaryBg = this.add.graphics();
    secondaryBg.lineStyle(2, OUTLINE, 1);
    secondaryBg.strokeRoundedRect(-190, -22, 380, 44, 22);
    this.resultSecondaryText = this.add
      .text(0, 0, '', {
        fontFamily: FONT_FAMILY,
        fontStyle: 'bold',
        fontSize: '17px',
        color: COCOA,
      })
      .setOrigin(0.5, 0.5);
    const secondaryZone = this.add
      .zone(0, 0, 380, 44)
      .setInteractive({ useHandCursor: true });
    secondaryZone.on('pointerdown', () => this.onResultSecondary());
    this.resultSecondary = this.add.container(270, 570, [
      secondaryBg,
      this.resultSecondaryText,
      secondaryZone,
    ]);
    this.resultRoot = this.add.container(0, 0, [
      dim,
      shade,
      card,
      this.resultTitle,
      this.resultLines,
      this.resultPrimary,
      this.resultSecondary,
    ]);
    this.resultRoot.setDepth(44).setVisible(false).setAlpha(0);
  }

  private showResult(outcome: VisitOutcome): void {
    this.resultOutcome = outcome;
    this.lastOutcome = outcome;
    const def = CONDITIONS[this.patientState.conditionId];
    // File the visit's topics (deduped — the list accumulates).
    if (!this.filedConds.some((c) => c.id === def.id)) {
      this.filedConds.push({ id: def.id, name: def.name });
      this.saveLearn();
    }
    const copy = resultCopy({
      outcome,
      visitNo: this.visitNo(),
      coinsEarned: this.visitEarned,
      score: { ...this.roundScore },
      condition: def.name,
    });
    this.resultTitle.setText(copy.title);
    this.resultLines.setText(copy.lines.join('\n'));
    this.resultPrimaryText.setText(copy.primary);
    this.resultSecondaryText.setText(copy.secondary);
    this.resultPrimaryBg.clear();
    this.resultPrimaryBg.fillStyle(outcome === 'recovered' ? SAGE : AMBER, 1);
    this.resultPrimaryBg.fillRoundedRect(-190, -26, 380, 52, 26);
    this.resultRoot.setVisible(true).setAlpha(0);
    this.tweens.killTweensOf([this.resultRoot, this.resultPrimary]);
    this.resultPrimary.setScale(1);
    this.tweens.add({
      targets: this.resultRoot,
      alpha: 1,
      duration: 200,
      ease: 'Sine.easeOut',
    });
    if (outcome === 'struggling') {
      // Struggling invites learning (pulsing badge) while the
      // primary leads onward to the next patient, never obliged.
      this.tweens.killTweensOf(this.learnBadge);
      this.learnBadge.setScale(1).setVisible(true);
      this.tweens.add({
        targets: this.learnBadge,
        scaleX: 1.3,
        scaleY: 1.3,
        duration: 450,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
      this.tweens.add({
        targets: this.resultPrimary,
        scaleX: 1.03,
        scaleY: 1.03,
        duration: 500,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      });
    }
  }

  private hideResult(): void {
    this.tweens.killTweensOf([this.resultRoot, this.resultPrimary]);
    this.resultPrimary.setScale(1);
    this.resultRoot.setVisible(false).setAlpha(0);
    this.resultOutcome = null;
  }

  private onResultPrimary(): void {
    // 'Next patient' on both endings — the visit always moves on.
    this.hideResult();
    this.showView('waiting');
  }

  private onResultSecondary(): void {
    if (this.resultOutcome === 'recovered') {
      this.hideResult();
      this.showView('learn');
    } else {
      this.retryVisit();
    }
  }

  private retryVisit(): void {
    this.hideResult();
    this.switchPatient(this.activeName);
  }

  private clearLearnBadge(): void {
    this.tweens.killTweensOf(this.learnBadge);
    this.learnBadge.setScale(1).setVisible(false);
  }

  private scheduleBlink(): void {
    // Randomized gap so the cast never blinks in unison (art
    // bible); Theo's sleepy cadence comes from the roster.
    const [lo, hi] = blinkGapMs(this.activeName);
    this.blinkAt = this.time.now + lo + Math.random() * (hi - lo);
  }

  private drawSneeze(): void {
    this.sneezeText = this.add
      .text(270, 480, 'Achoo!', {
        fontFamily: FONT_FAMILY,
        fontStyle: 'bold',
        fontSize: '24px',
        color: COCOA,
      })
      .setOrigin(0.5, 0.5)
      .setAlpha(0)
      .setDepth(6);
    this.sneezeAt = this.time.now + 6000 + Math.random() * 4000;
  }
}
