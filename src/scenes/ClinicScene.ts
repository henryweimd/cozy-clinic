import Phaser from 'phaser';
import { ClinicalEngine, CONDITIONS } from '../clinical';

/**
 * Milestone 1 clinic scene: a cozy clinic room and Mochi, the first
 * patient. Tap Mochi to see the complaint.
 *
 * P1: the room shell (walls, floor, window, cabinet) is the
 * AI-generated background `assets/room/room-shell-01.png` in the
 * bible's plush language (see art/manifest.json backgrounds[0]).
 * P2: furniture is plush prop sprites
 * (`assets/props/exam-bed.png`, `assets/props/plant.png`, see
 * art/manifest.json props[]) feet-anchored to GROUND; the code rug
 * is deleted (the painted bg rug suffices). Mochi is the
 * finished AI-generated sprite (see ART_BIBLE.md).
 * P3: tap-react shows the happy pose
 * (`assets/characters/mochi-happy.png`, see art/manifest.json
 * assets[2]) during the bounce, then restores idle; blink swaps
 * idle<->blink only while happy is not showing.
 * P4: all text in Baloo 2 (OFL, vendored offline at
 * `assets/fonts/Baloo2.ttf`, boot-gated in main.ts); the bubble
 * is a plush rounded panel in palette cream with the one thin
 * warm-brown outline — same w492/dockBottom936 sizing-upward
 * geometry and same clinical copy.
 * P5: code-only warmth — a window-light gradient overlay plus a
 * warm vignette (see drawLightOverlays), drawn above the room
 * but below title/Mochi/bubble so text and Mochi cannot wash
 * out; the happy bounce gains a tiny scale overshoot (bible:
 * squash, rise, tiny overshoot, settle). No layout, copy, or
 * other behavior change.
 *
 * Layout contract (fix-layout-01 spacing system): SIDE = 24,
 * GROUND = 724, Mochi 212px at (270, 614), bubble 492 wide docked
 * at 936. The old WALL_BASE = 352 / code-floor-466 geometry left
 * with the deleted code passes; only Mochi/bubble geometry must
 * still fit the painted room.
 */
/**
 * P4: the one plush face for every text object — Baloo 2 (vendored
 * offline, boot-gated in main.ts) over a rounded-system fallback
 * stack, so text stays friendly even if the font file ever fails.
 */
const FONT_FAMILY =
  '"Baloo 2", "Comic Sans MS", "Chalkboard SE", system-ui, sans-serif';

export class ClinicScene extends Phaser.Scene {
  private mochi!: Phaser.GameObjects.Image;
  private mochiBaseY = 0;
  private blinkAt = 0;
  private showingHappy = false;
  private happyToken = 0;
  private bubble!: Phaser.GameObjects.Container;
  private bubbleOpen = false;
  private engine = new ClinicalEngine();

  constructor() {
    super('clinic');
  }

  preload(): void {
    this.load.image('mochi-idle', 'assets/characters/mochi-idle.png');
    this.load.image('mochi-blink', 'assets/characters/mochi-blink.png');
    this.load.image('mochi-happy', 'assets/characters/mochi-happy.png');
    this.load.image('room-shell', 'assets/room/room-shell-01.png');
    this.load.image('prop-bed', 'assets/props/exam-bed.png');
    this.load.image('prop-plant', 'assets/props/plant.png');
  }

  create(): void {
    this.drawRoom();
    this.drawLightOverlays();
    this.drawTitle();
    this.drawMochi();
    this.drawBubble();
    this.scheduleBlink();
  }

  update(_time: number, delta: number): void {
    // Idle bob: a few pixels, calm enough to watch for minutes.
    const t = this.time.now / 1000;
    this.mochi.y = this.mochiBaseY + Math.sin(t * 1.8) * 3;

    // Blink: eyes closed ~120ms every 3–5s, randomized (art bible).
    // Swaps idle<->blink only when the happy pose is not showing, so a
    // tap-react never fights the blink timer.
    if (
      this.time.now >= this.blinkAt &&
      !this.showingHappy &&
      this.mochi.texture.key === 'mochi-idle'
    ) {
      this.mochi.setTexture('mochi-blink');
      this.time.delayedCall(120, () => {
        // A tap during the 120ms window swaps in happy; only restore
        // idle when blink still owns the texture.
        if (this.mochi.texture.key === 'mochi-blink') {
          this.mochi.setTexture('mochi-idle');
        }
        this.scheduleBlink();
      });
    }
    void delta;
  }

  // -- room (P1 AI room-shell bg + P2 plush prop sprites) --

  private drawRoom(): void {
    // Room shell: AI-generated 1080x1920 (2x) background, centered to
    // fill the 540x960 canvas exactly. Replaces the deleted
    // drawWallsAndFloor/drawWindow/drawCabinet code passes.
    this.add.image(270, 480, 'room-shell').setDisplaySize(540, 960);
    this.drawProps();
  }

  /**
   * P2 plush prop sprites, feet-anchored to GROUND = 724 via
   * origin (0.5, 1). Replaces the deleted drawExamBed/drawPlant/
   * drawRug code passes; the painted bg rug suffices (no double rug).
   * Bed 160 wide at cx88 (left floor anchor, clear of Mochi's 212px
   * box at x164+); plant 110 wide at cx461 (right corner anchor,
   * box right margin 24). Both keep the P1 composition and Mochi's
   * focal gaps.
   */
  private drawProps(): void {
    const bed = this.add.image(88, 724, 'prop-bed').setOrigin(0.5, 1);
    bed.setScale(160 / bed.width);
    const plant = this.add.image(461, 724, 'prop-plant').setOrigin(0.5, 1);
    plant.setScale(110 / plant.width);
  }

  /**
   * P5 code-only warmth: a window-light gradient plus a warm
   * vignette, both pure Graphics fills in palette colors (no
   * generated images, $0.00 spend). Called after drawRoom and
   * before title/Mochi/bubble, so the overlays tint only the
   * room and props — text and Mochi render above and cannot
   * wash out. Alphas stay <= 0.12: cozy, not hazy.
   */
  private drawLightOverlays(): void {
    // Window light: full-screen gradient, strongest upper-left
    // (bible: soft light from upper left) in palette cream.
    const light = this.add.graphics();
    light.fillGradientStyle(
      0xfcebd6,
      0xfcebd6,
      0xfff3e2,
      0xfff3e2,
      0.12,
      0.05,
      0.05,
      0.0,
    );
    light.fillRect(0, 0, 540, 960);

    // Warm vignette: four feathered edge strips in the one thin
    // outline warm-brown, ~0.10 at the screen edge fading to 0
    // inward over a 56px band. Corners double up slightly, as a
    // real vignette should.
    const edge = 0x8a5a3b;
    const band = 56;
    const v = this.add.graphics();
    v.fillGradientStyle(edge, edge, edge, edge, 0.1, 0.1, 0.0, 0.0);
    v.fillRect(0, 0, 540, band);
    v.fillGradientStyle(edge, edge, edge, edge, 0.0, 0.0, 0.1, 0.1);
    v.fillRect(0, 960 - band, 540, band);
    v.fillGradientStyle(edge, edge, edge, edge, 0.1, 0.0, 0.1, 0.0);
    v.fillRect(0, 0, band, 960);
    v.fillGradientStyle(edge, edge, edge, edge, 0.0, 0.1, 0.0, 0.1);
    v.fillRect(540 - band, 0, band, 960);
  }

  private drawTitle(): void {
    this.add
      .text(270, 56, 'Cozy Clinic', {
        fontFamily: FONT_FAMILY,
        fontStyle: 'bold',
        fontSize: '44px',
        color: '#5c4633',
      })
      .setOrigin(0.5);
    this.add
      .text(270, 100, 'Tap Mochi to say hello', {
        fontFamily: FONT_FAMILY,
        fontSize: '22px',
        color: '#8a6f52',
      })
      .setOrigin(0.5);
  }

  private drawMochi(): void {
    // Mochi stands fully on the floor: feet and shadow on the rug,
    // body clear of the wall/baseboard line above. At 212px Mochi is
    // still the largest visual weight, with clear walking space to
    // the bed (left) and the plant lane (right).
    this.add.ellipse(270, 724, 170, 30, 0x8a5a3b, 0.18);

    this.mochi = this.add.image(270, 614, 'mochi-idle');
    this.mochi.setDisplaySize(212, 212);
    this.mochiBaseY = this.mochi.y;
    this.mochi.setInteractive({ useHandCursor: true });

    this.add
      .text(270, 748, 'Mochi · first patient', {
        fontFamily: FONT_FAMILY,
        fontSize: '24px',
        color: '#5c4633',
      })
      .setOrigin(0.5);

    this.mochi.on('pointerdown', () => this.onMochiTap());
  }

  private drawBubble(): void {
    const def = CONDITIONS['dehydration'];
    const state = this.engine.initialState('dehydration');
    const stage = def.stages[state.stageIndex];
    const complaint = `Mochi feels ${stage.label.toLowerCase()}: ${stage.blurb} ${def.plainWords}`;

    // Bottom-edge-anchored dialogue card: side margins match SIDE,
    // bottom docks at 936 (24px margin), and the card always sizes
    // to its text upward — never overlapping Mochi or the edges.
    const w = 492;
    const x = 270;
    const dockBottom = 936;
    const padTop = 20;
    const gapMid = 16;
    const padBottom = 20;
    const label = this.add
      .text(x, padTop, complaint, {
        fontFamily: FONT_FAMILY,
        fontSize: '20px',
        color: '#5c4633',
        align: 'center',
        wordWrap: { width: w - 40 },
      })
      .setOrigin(0.5, 0);
    const hint = this.add
      .text(x, padTop + label.height + gapMid, 'The doctor will see you now.', {
        fontFamily: FONT_FAMILY,
        fontSize: '18px',
        color: '#8a6f52',
      })
      .setOrigin(0.5, 0);
    const totalH = padTop + label.height + gapMid + hint.height + padBottom;
    // P4 plush panel: palette cream fill + the one thin warm-brown
    // outline (bible), with soft rounded corners. Same box (w 492,
    // docked bottom 936, sizing upward) — only the finish changed.
    const bg = this.add.graphics();
    bg.fillStyle(0xfff3e2, 1);
    bg.lineStyle(3, 0x8a5a3b, 1);
    bg.fillRoundedRect(x - w / 2, 0, w, totalH, 24);
    bg.strokeRoundedRect(x - w / 2, 0, w, totalH, 24);
    this.bubble = this.add.container(0, dockBottom - totalH, [bg, label, hint]);
    this.bubble.setVisible(false);
    this.bubble.setAlpha(0);
  }

  private onMochiTap(): void {
    this.bubbleOpen = !this.bubbleOpen;
    if (this.bubbleOpen) {
      this.bubble.setVisible(true);
      this.tweens.add({ targets: this.bubble, alpha: 1, duration: 180, ease: 'Sine.easeOut' });
      // Happy tap-react: show the happy pose for the bounce, then
      // restore idle. The token guards rapid re-taps so a stale
      // bounce never clears a newer happy.
      this.happyToken += 1;
      const token = this.happyToken;
      this.showingHappy = true;
      this.mochi.setTexture('mochi-happy');
      // One small happy bounce (squash, rise, tiny overshoot), then settle.
      // P5 tuning: the squash keeps its 110ms yoyo, then a tiny
      // scale overshoot (bible follow-through) before restoring
      // idle. Scale-only — the update() bob owns mochi.y, so no
      // y-tween. Same token guard on both steps.
      this.tweens.add({
        targets: this.mochi,
        scaleY: '-=0.06',
        scaleX: '+=0.06',
        duration: 110,
        yoyo: true,
        ease: 'Sine.easeInOut',
        onComplete: () => {
          if (token !== this.happyToken) return;
          this.tweens.add({
            targets: this.mochi,
            scaleY: '+=0.03',
            scaleX: '-=0.03',
            duration: 80,
            yoyo: true,
            ease: 'Sine.easeInOut',
            onComplete: () => {
              if (token !== this.happyToken) return;
              this.showingHappy = false;
              if (this.mochi.texture.key === 'mochi-happy') {
                this.mochi.setTexture('mochi-idle');
              }
            },
          });
        },
      });
    } else {
      this.tweens.add({
        targets: this.bubble,
        alpha: 0,
        duration: 150,
        onComplete: () => this.bubble.setVisible(false),
      });
    }
  }

  private scheduleBlink(): void {
    // Randomized 3–5s so the cast never blinks in unison (art bible).
    this.blinkAt = this.time.now + 3000 + Math.random() * 2000;
  }
}
