import Phaser from 'phaser';
import { ClinicalEngine, CONDITIONS } from '../clinical';

/**
 * Milestone 1 clinic scene: a cozy clinic room and Mochi, the first
 * patient. Tap Mochi to see the complaint.
 *
 * ART-DIRECTION REBOOT (2026-10-29): the room shell is the
 * photorealistic minimal clinic plate
 * `assets/room/clinic-shell-reboot-01.png` (1080x1920, Block B;
 * see art/manifest.json backgrounds[] reboot entry), and Mochi
 * is the Jolly-style redesign (`mochi-reboot-idle/blink/happy.png`,
 * 192px class, Block C; rev-2 refinement 2026-10-29: same files,
 * same geometry, owned rose-taupe identity + smooth edges — no
 * layout change). Texture keys (`mochi-idle`, `room-shell`,
 * ...) are unchanged — only the file paths moved. The old plush
 * room-shell + plush Mochi + plush props are SUPERSEDED (files
 * left on disk, manifest-flagged); old plush-room constants are
 * retired (see the reboot landmark survey below).
 * Motion implements docs/ANIMATION.md exactly (bob 3px @ 1.8
 * rad/s; blink 120ms per 3-5s randomized; tap bounce 110ms squash
 * +-0.06 + 80ms overshoot +-0.03, Sine easings, token-guarded).
 * Bubble behavior + clinical copy identical to P4.
 *
 * Reboot landmark survey (re-measured from
 * art/contact-sheets/bg-reboot-contact-sheet.png + pixel scans
 * of the plate, 540x960 space): baseboard/wall-floor ~696 at
 * center; rug top ~712, rug widest ~x40-500 (y~800); bench left
 * x0-160, seat y~620-660, legs to ~700 (right-leg sliver
 * x189-197 sits behind Mochi's left edge — accepted depth, per
 * asset artist); plant mass x~415+, cabinet x~465+; window glass
 * x490+ y95-199 (title stays centered); title zone + bubble zone
 * clear. GROUND = 724 kept: Mochi feet at 720 land ~8px inside
 * the rug, shadow ellipse at 724 on the rug.
 *
 * Layout contract (fix-layout-01 spacing system, survives the
 * reboot): SIDE = 24, GROUND = 724, Mochi 212px at (270, 614),
 * bubble 492 wide docked at 936.
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
    // Reboot: Jolly-style Mochi + photoreal plate. Keys unchanged.
    this.load.image('mochi-idle', 'assets/characters/mochi-reboot-idle.png');
    this.load.image('mochi-blink', 'assets/characters/mochi-reboot-blink.png');
    this.load.image('mochi-happy', 'assets/characters/mochi-reboot-happy.png');
    this.load.image('room-shell', 'assets/room/clinic-shell-reboot-01.png');
    // No prop preloads: the plush P2 props clash with the photoreal
    // plate (which paints its own bench/plant/cabinet) — removed,
    // not re-pointed. See drawRoom.
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
    // Idle bob: ANIMATION.md — 3px @ 1.8 rad/s, owns mochi.y.
    const t = this.time.now / 1000;
    this.mochi.y = this.mochiBaseY + Math.sin(t * 1.8) * 3;

    // Blink: ANIMATION.md — eyes closed 120ms every 3–5s, randomized.
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

  // -- room (reboot photoreal plate; NO prop sprites) --

  private drawRoom(): void {
    // Room shell: photorealistic minimal clinic plate, 1080x1920
    // (2x), centered to fill the 540x960 canvas exactly.
    // Per-asset prop call (reboot): the P2 plush props are GONE —
    // the plate paints its own bench (left), plant + cabinet
    // (right), window, and rug, so plush furniture would clash in
    // style AND double up every piece. drawProps() deleted with
    // the P2 pass; nothing is re-pointed.
    this.add.image(270, 480, 'room-shell').setDisplaySize(540, 960);
  }

  /**
   * Code-only warmth: a window-light gradient plus a warm
   * vignette, both pure Graphics fills ($0.00 spend). Called after
   * drawRoom and before title/Mochi/bubble, so the overlays tint
   * only the room — text and Mochi render above and cannot wash
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
    // Mochi stands fully on the painted rug: feet at 720 (~8px
    // inside the rug top ~712) and the fixed shadow ellipse at
    // GROUND = 724 on the rug, body clear of the baseboard (~696)
    // above. At 212px Mochi is still the largest visual weight,
    // with clear walking space to the bench (left) and the
    // plant/cabinet lane (right). Same 212px@(270,614) geometry
    // the reboot contact-sheet composite validated.
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
      // Happy bounce, ANIMATION.md exact: 110ms squash yoyo
      // (+-0.06) then a chained 80ms overshoot yoyo (+-0.03),
      // Sine.easeInOut, scale-only (the update() bob owns
      // mochi.y, so no y-tween). Same token guard on both steps.
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
