import Phaser from 'phaser';
import { ClinicalEngine, CONDITIONS } from '../clinical';
import type { ChoiceGrade, PatientState, TrajectoryNode } from '../clinical';
import {
  CARD_ROW_IDS,
  CHROME_TIER_BY_DIFFICULTY,
  MOCK_CARE_COINS_START,
  MOCK_ROSTER,
  MOCK_THREADS,
  PROTOTYPE_SEEDS,
  VISIT_CONTEXT_WORDING,
  quoteIfSpoken,
} from '../ui/mockData';
import type { VisitContext } from '../ui/mockData';

/**
 * Milestone 1 clinic scene: a cozy clinic room and Mabel, the first
 * patient. Tap Mabel to see the complaint.
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
 * rad/s; blink 120ms per 3-5s randomized, idle-only; tap bounce
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
 * DR. NORA lines render quoted (YOU/narration unquoted); a
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
 * its subject is on screen (Mabel); Nora's off-screen
 * interventions keep her sky tag so the player knows who
 * stepped in. All current engine copy is third-person narrator
 * voice, so every panel caller passes 'tell' — quotes return
 * when first-person trajectory dialogue ships (portal Nora
 * bubbles already quote correctly). (2) The progress HUD moves
 * OFF the mid-screen band into the slim top strip (coin cluster
 * left, context center, clock cluster right; Visit-faded, strip
 * persistent). The profile chip + difficulty pill leave the main
 * screen for a future submenu. (3) Code-drawn icon set ($0,
 * pixel-crisp at any DPI, offline-safe): coin+ and clock-hands
 * in the top strip, cross / queue-dots / video / envelope
 * tab icons replacing the text glyphs. Title, panel fades,
 * admin stack, plates, and offline behavior untouched.
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

const GRADE_COLOR: Record<ChoiceGrade, number> = {
  BEST: SAGE,
  NOT_GREAT: SKY,
  WRONG: AMBER,
  DANGEROUS: ROSE,
};

type ViewName = 'waiting' | 'visit' | 'telemed' | 'portal';
type Speaker = 'MABEL' | 'DR. NORA' | 'YOU';
/**
 * SAY vs TELL (chrome-3): 'say' = direct speech in the speaker's
 * own voice (quoted + tagged); 'tell' = third-person narration
 * ABOUT the subject (unquoted; tag hidden when the subject is on
 * screen, kept for Nora's off-screen interventions).
 */
type LineKind = 'say' | 'tell';

const TAB_X: Record<ViewName, number> = {
  waiting: 67,
  visit: 202,
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
};
// One-line pin: pin any view to any plate slug (e.g. { visit:
// 'exam-b' }); empty = parity rule below. Unpinned views keep
// rotating; unknown slugs are ignored (parity rule applies).
const PLATE_PIN: Partial<Record<ViewName, string>> = {};
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
  actionId: string;
  revealed: ChoiceGrade | null;
}

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
  private mabel!: Phaser.GameObjects.Image;
  private mabelBaseY = 0;
  private blinkAt = 0;
  private showingFlash = false;
  private flashToken = 0;
  private engine = new ClinicalEngine();
  /** Live patient state — the single source the monitor reads. */
  private patientState!: PatientState;
  private lastNodeId = 'n0';

  private titleText!: Phaser.GameObjects.Text;
  private nametag!: Phaser.GameObjects.Text;

  // Conversation panel (the retired bubble's new home, upper dock).
  private panel!: Phaser.GameObjects.Container;
  private panelBg!: Phaser.GameObjects.Graphics;
  private panelTag!: Phaser.GameObjects.Graphics;
  private panelTagText!: Phaser.GameObjects.Text;
  private panelBody!: Phaser.GameObjects.Text;
  private panelOpen = false;

  // Decision card row + vitals chips.
  private cardRow!: Phaser.GameObjects.Container;
  private cards: CardWidgets[] = [];
  private revealedStage = -1;
  private chips!: Phaser.GameObjects.Container;
  private chipTexts: Phaser.GameObjects.Text[] = [];

  // Chrome-2 progress HUD (Visit only; coins + context are MOCK, the
  // timer is a display-only readout — nothing gameplay reads it).
  private hud!: Phaser.GameObjects.Container;
  private coinsText!: Phaser.GameObjects.Text;
  private contextText!: Phaser.GameObjects.Text;
  private timerText!: Phaser.GameObjects.Text;
  private careCoins = MOCK_CARE_COINS_START;
  private visitStartMs = 0;
  private lastTimerSecond = -1;

  // Views + nav.
  private currentView: ViewName = 'visit';
  private waitingView!: Phaser.GameObjects.Container;
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
  };
  private tabIcons: Record<ViewName, Phaser.GameObjects.Graphics | null> = {
    waiting: null,
    visit: null,
    telemed: null,
    portal: null,
  };
  private muteOn = true;
  private camOn = true;

  // Admin stack.
  private titleTaps = 0;
  private titleResetTimer?: Phaser.Time.TimerEvent;
  private adminOpen = false;
  private pad!: Phaser.GameObjects.Container;
  private padDots!: Phaser.GameObjects.Graphics;
  private padEntry = '';
  private monitor!: Phaser.GameObjects.Container;
  private monitorBackdrop!: Phaser.GameObjects.Container;
  private monitorContent!: Phaser.GameObjects.Container;

  // Toast.
  private toast!: Phaser.GameObjects.Container;
  private toastBg!: Phaser.GameObjects.Graphics;
  private toastText!: Phaser.GameObjects.Text;
  private toastTimer?: Phaser.Time.TimerEvent;

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
    this.patientState = this.engine.initialState(PROTOTYPE_SEEDS.conditionId);
    this.revealedStage = this.patientState.stageIndex;
    this.visitStartMs = this.time.now;
    this.drawRoom();
    this.drawLightOverlays();
    this.drawTitle();
    this.drawMabel();
    this.drawConversationPanel();
    this.drawCardRow();
    this.drawVitalsChips();
    this.drawHud();
    this.drawWaitingView();
    this.drawTelemedChrome();
    this.drawPortalView();
    this.drawNavBar();
    this.drawTopBar();
    this.drawCodePad();
    this.drawMonitor();
    this.drawToast();
    this.scheduleBlink();
    this.showView('visit', true);
  }

  update(_time: number, delta: number): void {
    // Idle bob: ANIMATION.md — 3px @ 1.8 rad/s, owns mabel.y.
    const t = this.time.now / 1000;
    this.mabel.y = this.mabelBaseY + Math.sin(t * 1.8) * 3;

    // Visit timer: display-only mm:ss readout, urgency feel only —
    // no rewards or penalties read it. Text updates once per second.
    const elapsedS = Math.floor((this.time.now - this.visitStartMs) / 1000);
    if (elapsedS !== this.lastTimerSecond) {
      this.lastTimerSecond = elapsedS;
      const mm = String(Math.floor(elapsedS / 60)).padStart(2, '0');
      const ss = String(elapsedS % 60).padStart(2, '0');
      this.timerText.setText(`${mm}:${ss}`);
    }

    // Blink: ANIMATION.md — eyes closed 120ms every 3–5s, randomized.
    // Fires ONLY when the steady face is idle AND no flash is showing
    // AND the current texture is mabel-idle; otherwise reschedules
    // without swapping, so a flash never fights the blink timer.
    if (this.time.now >= this.blinkAt) {
      if (
        !this.showingFlash &&
        this.steadyFace() === 'mabel-idle' &&
        this.mabel.texture.key === 'mabel-idle'
      ) {
        this.mabel.setTexture('mabel-blink');
        this.time.delayedCall(120, () => {
          // A tap/flash during the 120ms window wins; only restore
          // when blink still owns the texture.
          if (this.mabel.texture.key === 'mabel-blink') {
            this.settleToSteady();
          }
          this.scheduleBlink();
        });
      } else {
        this.scheduleBlink();
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
    const key = `plate-${plateForView(view, PROTOTYPE_SEEDS.visitNo)}`;
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

  private drawTitle(): void {
    this.titleText = this.add
      .text(270, 56, 'Cozy Clinic', {
        fontFamily: FONT_FAMILY,
        fontStyle: 'bold',
        fontSize: '44px',
        color: COCOA,
      })
      .setOrigin(0.5)
      .setDepth(4);
    this.add
      .text(270, 100, 'Tap Mabel to say hello', {
        fontFamily: FONT_FAMILY,
        fontSize: '22px',
        color: SECONDARY,
      })
      .setOrigin(0.5)
      .setDepth(4);
    // Secret admin trigger zone: x150–390, y28–84. No visible hint.
    const trigger = this.add.zone(270, 56, 240, 56).setDepth(4);
    trigger.setInteractive({ useHandCursor: false });
    trigger.on('pointerdown', () => this.onTitleTap());
  }

  private drawMabel(): void {
    // Mabel stands fully on the painted rug: feet at 720 (~8px
    // inside the rug top ~712) and the fixed shadow ellipse just
    // under GROUND = 724 on the rug, body clear of the baseboard (~696)
    // above. At 212px Mabel is still the largest visual weight,
    // with clear walking space to the bench (left) and the
    // plant/cabinet lane (right). Same 212px@(270,614) geometry
    // the reboot contact-sheet composite validated.
    this.add.ellipse(270, 722, 150, 24, 0x8a5a3b, 0.18).setDepth(4);

    // Mabel opens on her steady face for the live state (sick at the
    // stage-2 asthma opener) — idle is one steady state, not the home.
    this.mabel = this.add.image(270, 614, this.steadyFace());
    this.mabel.setDisplaySize(212, 212);
    this.mabel.setDepth(5);
    this.mabelBaseY = this.mabel.y;
    this.mabel.setInteractive({ useHandCursor: true });

    this.nametag = this.add
      .text(270, 744, 'Mabel · first patient', {
        fontFamily: FONT_FAMILY,
        fontSize: '22px',
        color: COCOA,
      })
      .setOrigin(0.5)
      .setDepth(5);

    this.mabel.on('pointerdown', () => this.onMabelTap());
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
    // subject is on screen (Mabel) — Nora's off-screen
    // interventions keep her tag so the player knows who stepped
    // in. Quoting happens BEFORE the truncate pass so the "…"
    // rule measures the shown string.
    const spoken = kind === 'say' ? quoteIfSpoken(speaker, false, text) : text;
    this.panelBody.setText(spoken);
    this.truncateToHeight(this.panelBody, 110);
    const showTag = kind === 'say' || speaker === 'DR. NORA';
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
    this.panelBg.fillStyle(CREAM, 1);
    this.panelBg.lineStyle(3, OUTLINE, 1);
    this.panelBg.fillRoundedRect(x - w / 2, top, w, h, 24);
    this.panelBg.strokeRoundedRect(x - w / 2, top, w, h, 24);

    this.panelTag.clear();
    this.panelTagText.setText('');
    if (showTag) {
      const tagFill = speaker === 'MABEL' ? SAGE : speaker === 'DR. NORA' ? SKY : CARD_FILL;
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

  /** Live complaint: today's formula, today's copy, live stage. */
  private complaintText(): string {
    const def = CONDITIONS[this.patientState.conditionId];
    const stage = def.stages[this.patientState.stageIndex];
    const complaint =
      `Mabel feels ${stage.label.toLowerCase()}: ${stage.blurb} ${def.plainWords}`;
    return `${complaint}\nThe doctor will see you now.`;
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

  private drawCardRow(): void {
    this.cardRow = this.add.container(0, 0, []).setDepth(10);
    CARD_ROW_IDS.forEach((actionId, i) => {
      const def = CONDITIONS[this.patientState.conditionId];
      const action = def.actions.find((a) => a.id === actionId);
      const label = action ? action.label : actionId;
      const cx = 24 + i * 168 + 78;
      const cy = 796 + 40;
      const face = this.add.graphics();
      face.fillStyle(CARD_FILL, 1);
      face.lineStyle(3, OUTLINE, 1);
      face.fillRoundedRect(-78, -40, 156, 80, 16);
      face.strokeRoundedRect(-78, -40, 156, 80, 16);
      const spine = this.add.graphics();
      const labelText = this.add
        .text(0, 0, label, {
          fontFamily: FONT_FAMILY,
          fontStyle: 'bold',
          fontSize: '15px',
          color: COCOA,
          align: 'center',
          wordWrap: { width: 144 },
        })
        .setOrigin(0.5, 0.5);
      this.truncateToHeight(labelText, 46);
      const root = this.add.container(cx, cy, [face, spine, labelText]);
      const zone = this.add.zone(0, 0, 156, 80).setInteractive({ useHandCursor: true });
      zone.on('pointerdown', () => this.onCardTap(i));
      root.add(zone);
      this.cardRow.add(root);
      this.cards.push({ root, face, spine, actionId, revealed: null });
    });
  }

  private drawSpine(card: CardWidgets, grade: ChoiceGrade | null): void {
    card.spine.clear();
    if (!grade) return;
    card.spine.fillStyle(GRADE_COLOR[grade], 1);
    // 8px left spine inside the card's rounded corner.
    card.spine.fillRoundedRect(-78, -40, 8, 80, { tl: 16, tr: 0, bl: 16, br: 0 });
  }

  private clearReveals(): void {
    for (const card of this.cards) {
      card.revealed = null;
      card.root.setAlpha(1);
      this.drawSpine(card, null);
    }
  }

  private onCardTap(i: number): void {
    if (this.adminOpen) return;
    if (this.currentView !== 'visit' && this.currentView !== 'telemed') return;
    const card = this.cards[i];
    if (!card) return;
    this.tweens.add({
      targets: card.root,
      scaleX: 0.97,
      scaleY: 0.97,
      duration: 90,
      yoyo: true,
      ease: 'Sine.easeInOut',
      onComplete: () => this.resolveCard(i),
    });
  }

  private resolveCard(i: number): void {
    const card = this.cards[i];
    if (!card) return;
    const def = CONDITIONS[this.patientState.conditionId];
    const action = def.actions.find((a) => a.id === card.actionId);
    if (!action) return;
    const grade = this.engine.gradeAction(this.patientState, card.actionId);
    const result = this.engine.applyAction(this.patientState, card.actionId);
    if (result.blocked) {
      // Engine veto: Nora stepped in. Dim + shake + her line —
      // no happy bounce on a blocked move.
      card.revealed = grade;
      this.drawSpine(card, grade);
      card.root.setAlpha(0.55);
      this.tweens.add({
        targets: card.root,
        x: '+=6',
        duration: 30,
        yoyo: true,
        repeat: 3,
        ease: 'Sine.easeInOut',
      });
      this.setConversation('DR. NORA', result.blockReason ?? action.hootLine, 'tell');
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
    this.refreshChips();
    if (grade === 'BEST') {
      // Mock coins: +1 per correct (BEST) resolve. Blocked moves and
      // lesser grades pay nothing. Real coin_ledger accrual later.
      this.careCoins += 1;
    }
    // Stage may have moved — the context label re-derives (mock).
    this.refreshHud();
    this.setConversation('MABEL', `${result.node.narrative} ${result.node.teaching}`, 'tell');
    this.playResolveFlash(result.node.animationCue);
  }

  // -- expression state machine (ANIMATION.md normative) --

  /** Steady face for the LIVE state: stage map + vitals shift. */
  private steadyFace(): string {
    const ladder = ['mabel-relieved', 'mabel-idle', 'mabel-sick', 'mabel-pained'];
    let idx = Math.min(3, Math.max(0, this.patientState.stageIndex));
    const v = this.patientState.vitals;
    // One rule: ANY vital <= 2 shifts one step worse (floor pained).
    if (v.energy <= 2 || v.comfort <= 2 || v.breathing <= 2) {
      idx = Math.min(3, idx + 1);
    }
    return ladder[idx] ?? 'mabel-idle';
  }

  /** Every flash settles here — the steady map, never hard-coded idle. */
  private settleToSteady(): void {
    this.mabel.setTexture(this.steadyFace());
  }

  /** HOLD steady: no flash, no bounce — the face reflects state. */
  private holdSteady(): void {
    if (this.showingFlash) return;
    if (this.mabel.texture.key === 'mabel-blink') return;
    this.settleToSteady();
  }

  /** Transient flash on a decision resolve, driven by the engine cue. */
  private playResolveFlash(cue: TrajectoryNode['animationCue']): void {
    if (cue === 'happy') {
      // Full recovery: happy + standard bounce, then settle relieved.
      this.playBounceFlash('mabel-happy');
      return;
    }
    if (cue === 'recovery') {
      // Partial improvement: relieved flash + standard bounce.
      this.playBounceFlash('mabel-relieved');
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

  private onMabelTap(): void {
    if (this.adminOpen) return;
    if (this.currentView !== 'visit' && this.currentView !== 'telemed') return;
    if (!this.panelOpen) {
      this.setConversation('MABEL', this.complaintText(), 'tell');
      // Happy tap-react: show the happy pose for the bounce, then
      // settle to steady. The token guards rapid re-taps so a stale
      // bounce never clears a newer flash.
      this.playHappyBounce();
    } else {
      this.closeConversation();
    }
  }

  private playHappyBounce(): void {
    this.playBounceFlash('mabel-happy');
  }

  /**
   * Standard bounce shared by the happy tap-react AND the relieved
   * flash, ANIMATION.md exact: 110ms squash yoyo (+-0.06) then a
   * chained 80ms overshoot yoyo (+-0.03), Sine.easeInOut,
   * scale-only (the update() bob owns mabel.y, so no y-tween).
   * Settles to the STEADY-map face; the monotonic token guards
   * both onCompletes so a stale bounce never clears a newer flash.
   */
  private playBounceFlash(face: 'mabel-happy' | 'mabel-relieved'): void {
    this.flashToken += 1;
    const token = this.flashToken;
    this.showingFlash = true;
    this.mabel.setTexture(face);
    this.tweens.add({
      targets: this.mabel,
      scaleY: '-=0.06',
      scaleX: '+=0.06',
      duration: 110,
      yoyo: true,
      ease: 'Sine.easeInOut',
      onComplete: () => {
        if (token !== this.flashToken) return;
        this.tweens.add({
          targets: this.mabel,
          scaleY: '+=0.03',
          scaleX: '-=0.03',
          duration: 80,
          yoyo: true,
          ease: 'Sine.easeInOut',
          onComplete: () => {
            if (token !== this.flashToken) return;
            this.showingFlash = false;
            if (this.mabel.texture.key === face) {
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
    this.mabel.setTexture('mabel-pained');
    this.time.delayedCall(600, () => {
      if (token !== this.flashToken) return;
      if (this.mabel.texture.key !== 'mabel-pained') return;
      this.showingFlash = false;
      this.settleToSteady();
    });
  }

  // -- vitals chips (Visit only; LIVE values) --

  private drawVitalsChips(): void {
    this.chips = this.add.container(0, 0, []).setDepth(10);
    const centers = [138, 270, 402];
    for (const cx of centers) {
      const bg = this.add.graphics();
      bg.fillStyle(CARD_FILL, 1);
      bg.lineStyle(2, OUTLINE, 1);
      bg.fillRoundedRect(cx - 60, 766, 120, 22, 11);
      bg.strokeRoundedRect(cx - 60, 766, 120, 22, 11);
      const label = this.add
        .text(cx, 777, '', {
          fontFamily: FONT_FAMILY,
          fontSize: '14px',
          color: COCOA,
        })
        .setOrigin(0.5, 0.5);
      this.chips.add([bg, label]);
      this.chipTexts.push(label);
    }
    this.refreshChips();
  }

  private refreshChips(): void {
    // Breath leads: the asthma opener moves breathing on every card.
    const texts = [
      `• breath ${this.patientState.vitals.breathing}`,
      `• comfort ${this.patientState.vitals.comfort}`,
      `visit #${PROTOTYPE_SEEDS.visitNo}`,
    ];
    this.chipTexts.forEach((label, i) => {
      const text = texts[i];
      if (text !== undefined) label.setText(text);
    });
  }

  // -- progress HUD (Visit only; chrome-3: lives IN the top strip) --

  private drawHud(): void {
    // Chrome-3: the mid-screen band (was y376-412) is RETIRED —
    // the HUD now lives inside the slim top strip (y0-32, pill
    // h24 at y4, centerline y16), above the title (top ~y40).
    // Coin cluster left, bare context words center, clock cluster
    // right. Visit-only: fades with the visit view (showView),
    // while the strip itself stays persistent. Icons are
    // code-drawn ($0, crisp, offline-safe): coin+ and clock-hands.
    // Pills + text stay opaque; translucency is the strip's only.
    const coinsBg = this.add.graphics();
    coinsBg.fillStyle(CARD_FILL, 1);
    coinsBg.lineStyle(2, OUTLINE, 1);
    coinsBg.fillRoundedRect(24, 4, 100, 24, 12);
    coinsBg.strokeRoundedRect(24, 4, 100, 24, 12);
    const coin = this.add.graphics();
    coin.fillStyle(AMBER, 1);
    coin.lineStyle(2, OUTLINE, 1);
    coin.fillCircle(44, 16, 8);
    coin.strokeCircle(44, 16, 8);
    coin.fillStyle(OUTLINE, 1);
    coin.fillRect(43, 12, 2, 8);
    coin.fillRect(40, 15, 8, 2);
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

    const timerBg = this.add.graphics();
    timerBg.fillStyle(CARD_FILL, 1);
    timerBg.lineStyle(2, OUTLINE, 1);
    timerBg.fillRoundedRect(416, 4, 100, 24, 12);
    timerBg.strokeRoundedRect(416, 4, 100, 24, 12);
    const clock = this.add.graphics();
    clock.fillStyle(CARD_FILL, 1);
    clock.lineStyle(2, OUTLINE, 1);
    clock.fillCircle(436, 16, 8);
    clock.strokeCircle(436, 16, 8);
    clock.lineStyle(2, OUTLINE, 1);
    clock.lineBetween(436, 16, 436, 11);
    clock.lineBetween(436, 16, 440, 16);
    this.timerText = this.add
      .text(450, 16, '00:00', {
        fontFamily: FONT_FAMILY,
        fontStyle: 'bold',
        fontSize: '14px',
        color: COCOA,
      })
      .setOrigin(0, 0.5);

    this.hud = this.add.container(0, 0, [
      coinsBg,
      coin,
      this.coinsText,
      this.contextText,
      timerBg,
      clock,
      this.timerText,
    ]);
    // Depth 20 = above the strip bg (19), level with the nav bar
    // (a different band, so no conflict).
    this.hud.setDepth(20);
    this.refreshHud();
  }

  /** Mock context derivation: first visit → new, stage 2+ → sick. */
  private visitContext(): VisitContext {
    if (PROTOTYPE_SEEDS.visitNo <= 1) return 'new-patient';
    if (this.patientState.stageIndex >= 2) return 'sick-visit';
    return 'follow-up';
  }

  private refreshHud(): void {
    this.coinsText.setText(`${this.careCoins}`);
    const tier = CHROME_TIER_BY_DIFFICULTY[PROTOTYPE_SEEDS.difficulty];
    this.contextText.setText(VISIT_CONTEXT_WORDING[this.visitContext()][tier]);
  }

  // -- VIEW 2: waiting room (MOCK roster) --

  private drawWaitingView(): void {
    const sheet = this.add.graphics();
    sheet.fillStyle(CREAM, 1);
    sheet.lineStyle(3, OUTLINE, 1);
    sheet.fillRoundedRect(24, 136, 492, 740, 24);
    sheet.strokeRoundedRect(24, 136, 492, 740, 24);
    const title = this.add
      .text(40, 160, 'Waiting Room', {
        fontFamily: FONT_FAMILY,
        fontStyle: 'bold',
        fontSize: '26px',
        color: COCOA,
      })
      .setOrigin(0, 0.5);
    const clockLabel = this.add
      .text(0, 0, '10:24 AM', {
        fontFamily: FONT_FAMILY,
        fontSize: '15px',
        color: COCOA,
      })
      .setOrigin(0.5, 0.5);
    const clockBg = this.add.graphics();
    const clockW = clockLabel.width + 28;
    clockBg.fillStyle(CARD_FILL, 1);
    clockBg.lineStyle(2, OUTLINE, 1);
    clockBg.fillRoundedRect(500 - clockW, 142, clockW, 36, 18);
    clockBg.strokeRoundedRect(500 - clockW, 142, clockW, 36, 18);
    clockLabel.setPosition(500 - clockW / 2, 160);
    const footnote = this.add
      .text(270, 826, 'Dr. Nora is with a patient…', {
        fontFamily: FONT_FAMILY,
        fontSize: '16px',
        color: SECONDARY,
      })
      .setOrigin(0.5, 0.5);
    this.waitingView = this.add.container(0, 0, [
      sheet,
      title,
      clockBg,
      clockLabel,
      footnote,
    ]);
    this.waitingView.setDepth(10).setVisible(false).setAlpha(0);

    MOCK_ROSTER.forEach((entry, i) => {
      const yc = 196 + i * 132 + 60;
      const bg = this.add.graphics();
      bg.fillStyle(CARD_FILL, 1);
      bg.lineStyle(3, OUTLINE, 1);
      bg.fillRoundedRect(-230, -60, 460, 120, 16);
      bg.strokeRoundedRect(-230, -60, 460, 120, 16);
      const fur = Phaser.Display.Color.HexStringToColor(entry.furShade).color;
      const avatar = this.add.graphics();
      avatar.fillStyle(fur, 1);
      avatar.fillCircle(-172, 0, 42);
      const initial = this.add
        .text(-172, 0, entry.name.charAt(0), {
          fontFamily: FONT_FAMILY,
          fontStyle: 'bold',
          fontSize: '32px',
          color: '#fff9ef',
        })
        .setOrigin(0.5, 0.5);
      const name = this.add
        .text(-116, -28, entry.name, {
          fontFamily: FONT_FAMILY,
          fontStyle: 'bold',
          fontSize: '22px',
          color: COCOA,
        })
        .setOrigin(0, 0);
      const persona = this.add
        .text(-116, 4, entry.persona, {
          fontFamily: FONT_FAMILY,
          fontSize: '16px',
          color: SECONDARY,
        })
        .setOrigin(0, 0);
      const statusLabel = this.add
        .text(0, 0, entry.status, {
          fontFamily: FONT_FAMILY,
          fontSize: '15px',
          color: COCOA,
        })
        .setOrigin(0.5, 0.5);
      const statusW = Math.max(110, statusLabel.width + 24);
      const statusBg = this.add.graphics();
      const here = entry.id === 'mock-patient-mabel';
      statusBg.fillStyle(here ? SAGE : CARD_FILL, 1);
      statusBg.lineStyle(2, OUTLINE, 1);
      statusBg.fillRoundedRect(218 - statusW, -18, statusW, 36, 18);
      statusBg.strokeRoundedRect(218 - statusW, -18, statusW, 36, 18);
      statusLabel.setPosition(218 - statusW / 2, 0);
      const row = this.add.container(270, yc, [
        bg,
        avatar,
        initial,
        name,
        persona,
        statusBg,
        statusLabel,
      ]);
      const zone = this.add.zone(0, 0, 460, 120).setInteractive({ useHandCursor: true });
      zone.on('pointerdown', () => {
        this.tweens.add({
          targets: row,
          scaleX: 0.97,
          scaleY: 0.97,
          duration: 90,
          yoyo: true,
          ease: 'Sine.easeInOut',
        });
        this.showToast(
          here ? 'Mabel is already with you!' : `${entry.name} isn't playable yet (mock)`,
        );
      });
      row.add(zone);
      this.waitingView.add(row);
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
    const noraBg = this.add.graphics();
    noraBg.fillStyle(SKY, 1);
    noraBg.fillRoundedRect(344, 380, 168, 36, 18);
    const nora = this.add
      .text(428, 398, 'Dr. Nora › observing', {
        fontFamily: FONT_FAMILY,
        fontSize: '14px',
        color: COCOA,
      })
      .setOrigin(0.5, 0.5);
    this.telemedView = this.add.container(0, 0, [frame, liveBg, live, noraBg, nora]);
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
        // Quoted speech (mock copy): Dr. Nora's lines wrap in quotes;
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
      { view: 'telemed', label: 'Telemed' },
      { view: 'portal', label: 'Portal' },
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
      const zone = this.add
        .zone(cx, 924, 135, 72)
        .setInteractive({ useHandCursor: true });
      zone.on('pointerdown', () => this.showView(tab.view));
      nav.add([icon, label, zone]);
    }
  }

  /**
   * Chrome-3 tab icon set, code-drawn ($0, crisp at any DPI,
   * offline-safe): waiting = queue dots, visit = care cross,
   * telemed = video play, portal = envelope. Palette-only fills
   * (ART_BIBLE taste law: no gradients, no glow).
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

  private showView(next: ViewName, instant = false): void {
    if (next === this.currentView && !instant) return;
    if (this.adminOpen && !instant) return;
    this.currentView = next;
    this.swapPlate(next, instant);
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
    this.fadeSwap(this.cardRow, next === 'visit' || next === 'telemed', instant);
    this.fadeSwap(this.chips, next === 'visit', instant);
    this.fadeSwap(this.hud, next === 'visit', instant);
    this.nametag.setVisible(next === 'visit');
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
    this.syncMabelInput();
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

  private syncMabelInput(): void {
    const want =
      !this.adminOpen && (this.currentView === 'visit' || this.currentView === 'telemed');
    if (want && !this.mabel.input) {
      this.mabel.setInteractive({ useHandCursor: true });
    } else if (!want && this.mabel.input) {
      this.mabel.disableInteractive();
    }
  }

  // -- DEV ADMIN: secret trigger + code pad + wall monitor --

  private onTitleTap(): void {
    if (this.adminOpen) return;
    this.titleTaps += 1;
    this.tweens.killTweensOf(this.titleText);
    this.titleText.setScale(1);
    this.tweens.add({
      targets: this.titleText,
      scaleX: 0.98,
      scaleY: 0.98,
      duration: 60,
      yoyo: true,
    });
    this.titleResetTimer?.remove();
    this.titleResetTimer = this.time.delayedCall(3000, () => {
      this.titleTaps = 0;
    });
    if (this.titleTaps >= 5) {
      this.titleTaps = 0;
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
    this.syncMabelInput();
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
          this.syncMabelInput();
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
  }

  /** Rebuilt on every open — every value below is a LIVE read. */
  private buildMonitorContent(): void {
    this.monitorContent.removeAll(true);
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
      ['patient:', PROTOTYPE_SEEDS.patientName],
      ['condition:', `${def.name} (${def.id})`],
      ['stage:', `[${this.patientState.stageIndex}] ${stage.label} (${stage.id})`],
      [
        'vitals:',
        `energy ${this.patientState.vitals.energy} · comfort ${this.patientState.vitals.comfort} · breath ${this.patientState.vitals.breathing}`,
      ],
      ['visit:', `#${PROTOTYPE_SEEDS.visitNo} · node: ${this.lastNodeId}`],
      ['wording:', `${PROTOTYPE_SEEDS.wordingTier} · difficulty: ${PROTOTYPE_SEEDS.difficulty}/3`],
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
    this.monitorContent.add([memKey, memValue, hint]);
  }

  private openMonitor(): void {
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
        this.syncMabelInput();
      },
    });
  }

  // -- toast / hint (topmost) --

  private drawToast(): void {
    this.toastBg = this.add.graphics();
    this.toastText = this.add
      .text(270, 770, '', {
        fontFamily: FONT_FAMILY,
        fontSize: '17px',
        color: '#fff9ef',
      })
      .setOrigin(0.5, 0.5);
    this.toast = this.add.container(0, 0, [this.toastBg, this.toastText]);
    this.toast.setDepth(40).setVisible(false).setAlpha(0);
  }

  private showToast(message: string): void {
    this.toastTimer?.remove();
    this.tweens.killTweensOf(this.toast);
    this.toastText.setText(message);
    const w = Math.min(492, this.toastText.width + 48);
    this.toastBg.clear();
    this.toastBg.fillStyle(0x3e2e22, 0.92);
    this.toastBg.fillRoundedRect(270 - w / 2, 748, w, 44, 22);
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

  private scheduleBlink(): void {
    // Randomized 3–5s so the cast never blinks in unison (art bible).
    this.blinkAt = this.time.now + 3000 + Math.random() * 2000;
  }
}
