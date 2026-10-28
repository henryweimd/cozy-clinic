import Phaser from 'phaser';
import { ClinicalEngine, CONDITIONS } from '../clinical';

/** The one thin warm-brown outline on everything (ART_BIBLE.md). */
const INK = 0x8a5a3b;

/**
 * Milestone 1 clinic scene: a cozy clinic room and Mochi, the first
 * patient. Tap Mochi to see the complaint.
 *
 * P1: the room shell (walls, floor, window, cabinet) is the
 * AI-generated background `assets/room/room-shell-01.png` in the
 * bible's plush language (see art/manifest.json backgrounds[0]).
 * Furniture still on canvas (exam bed, plant, rug) stays code-drawn
 * until P2 replaces it with plush prop sprites. Mochi is the
 * finished AI-generated sprite (see ART_BIBLE.md).
 *
 * Layout contract (fix-layout-01 spacing system): SIDE = 24,
 * GROUND = 724, Mochi 212px at (270, 614), bubble 492 wide docked
 * at 936. The old WALL_BASE = 352 / code-floor-466 geometry left
 * with the deleted code passes; only Mochi/bubble geometry must
 * still fit the painted room.
 */
export class ClinicScene extends Phaser.Scene {
  private mochi!: Phaser.GameObjects.Image;
  private mochiBaseY = 0;
  private blinkAt = 0;
  private bubble!: Phaser.GameObjects.Container;
  private bubbleOpen = false;
  private engine = new ClinicalEngine();

  constructor() {
    super('clinic');
  }

  preload(): void {
    this.load.image('mochi-idle', 'assets/characters/mochi-idle.png');
    this.load.image('mochi-blink', 'assets/characters/mochi-blink.png');
    this.load.image('room-shell', 'assets/room/room-shell-01.png');
  }

  create(): void {
    this.drawRoom();
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
    if (this.time.now >= this.blinkAt && this.mochi.texture.key !== 'mochi-blink') {
      this.mochi.setTexture('mochi-blink');
      this.time.delayedCall(120, () => {
        this.mochi.setTexture('mochi-idle');
        this.scheduleBlink();
      });
    }
    void delta;
  }

  // -- room (P1: AI room-shell bg + code-drawn furniture until P2) --

  private drawRoom(): void {
    // Room shell: AI-generated 1080x1920 (2x) background, centered to
    // fill the 540x960 canvas exactly. Replaces the deleted
    // drawWallsAndFloor/drawWindow/drawCabinet code passes.
    this.add.image(270, 480, 'room-shell').setDisplaySize(540, 960);
    this.drawExamBed();
    this.drawPlant();
    this.drawRug();
  }

  /** Plush examination bed with headboard, pillow, and folded blanket. */
  private drawExamBed(): void {
    const g = this.add.graphics();

    g.fillStyle(INK, 0.18);
    g.fillEllipse(85, 724, 150, 24);

    // Legs and crossbar stand on the floor.
    g.fillStyle(0xd9a86c, 1);
    g.fillRoundedRect(28, 628, 14, 88, 6);
    g.fillRoundedRect(122, 628, 14, 88, 6);
    g.fillRoundedRect(28, 676, 108, 12, 6);
    g.lineStyle(4, INK, 1);
    g.strokeRoundedRect(28, 628, 14, 88, 6);
    g.strokeRoundedRect(122, 628, 14, 88, 6);
    g.strokeRoundedRect(28, 676, 108, 12, 6);

    // Headboard with a small care badge.
    g.fillStyle(0xfff3e2, 1);
    g.fillRoundedRect(12, 520, 32, 140, 12);
    g.lineStyle(5, INK, 1);
    g.strokeRoundedRect(12, 520, 32, 140, 12);
    g.fillStyle(0xf5a0ac, 1);
    g.fillCircle(28, 548, 10);
    g.fillStyle(0xffffff, 1);
    g.fillRect(25, 542, 6, 12);
    g.fillRect(22, 545, 12, 6);

    // Mattress.
    g.fillStyle(0xfff3e2, 1);
    g.fillRoundedRect(20, 576, 130, 52, 14);
    g.lineStyle(5, INK, 1);
    g.strokeRoundedRect(20, 576, 130, 52, 14);

    // Pillow at the head end.
    g.fillStyle(0xffffff, 1);
    g.fillRoundedRect(28, 556, 52, 36, 12);
    g.lineStyle(4, INK, 1);
    g.strokeRoundedRect(28, 556, 52, 36, 12);

    // Folded sage blanket over the foot half.
    g.fillStyle(0xa9c6a2, 1);
    g.fillRoundedRect(70, 560, 80, 50, 12);
    g.lineStyle(5, INK, 1);
    g.strokeRoundedRect(70, 560, 80, 50, 12);
    g.lineStyle(3, INK, 0.7);
    g.lineBetween(78, 568, 78, 602);
  }

  /**
   * Leafy plant, solo right-corner floor anchor (pot right margin
   * >= SIDE = 24, canopy inside the screen). The stool that used to
   * crowd this corner is gone — this lane is walking space now.
   */
  private drawPlant(): void {
    const g = this.add.graphics();

    g.fillStyle(INK, 0.18);
    g.fillEllipse(478, 722, 76, 16);

    // Stems.
    g.lineStyle(5, INK, 1);
    g.lineBetween(478, 660, 460, 596);
    g.lineBetween(478, 660, 478, 588);
    g.lineBetween(478, 660, 496, 600);

    // Leaves.
    g.fillStyle(0xa9c6a2, 1);
    const leaves: Array<[number, number, number, number]> = [
      [452, 590, 44, 34],
      [478, 572, 48, 38],
      [504, 592, 44, 34],
      [464, 620, 46, 32],
      [494, 622, 44, 30],
    ];
    for (const [x, y, w, h] of leaves) {
      g.fillEllipse(x, y, w, h);
    }
    g.lineStyle(3, INK, 1);
    for (const [x, y, w, h] of leaves) {
      g.strokeEllipse(x, y, w, h);
    }
    g.fillStyle(0xffffff, 0.5);
    g.fillCircle(470, 562, 4);
    g.fillCircle(496, 584, 3);

    // Pot with rim, planted on the floor.
    g.fillStyle(0xd98e73, 1);
    g.fillRoundedRect(450, 672, 56, 48, 10);
    g.fillRoundedRect(444, 656, 68, 20, 8);
    g.lineStyle(5, INK, 1);
    g.strokeRoundedRect(450, 672, 56, 48, 10);
    g.strokeRoundedRect(444, 656, 68, 20, 8);
    // Soil.
    g.fillStyle(0x5c4633, 1);
    g.fillRoundedRect(452, 652, 52, 12, 6);
  }

  /** Soft round rug Mochi stands on, centered under the focal point. */
  private drawRug(): void {
    const g = this.add.graphics();
    g.fillStyle(0xf5a0ac, 0.45);
    g.fillEllipse(270, 748, 340, 80);
    g.lineStyle(4, 0xf5a0ac, 0.8);
    g.strokeEllipse(270, 748, 300, 56);
  }

  private drawTitle(): void {
    this.add
      .text(270, 56, 'Cozy Clinic', {
        fontFamily: 'Georgia, serif',
        fontSize: '44px',
        color: '#5c4633',
      })
      .setOrigin(0.5);
    this.add
      .text(270, 100, 'Tap Mochi to say hello', {
        fontFamily: 'Georgia, serif',
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
        fontFamily: 'Georgia, serif',
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
        fontFamily: 'Georgia, serif',
        fontSize: '20px',
        color: '#5c4633',
        align: 'center',
        wordWrap: { width: w - 40 },
      })
      .setOrigin(0.5, 0);
    const hint = this.add
      .text(x, padTop + label.height + gapMid, 'The doctor will see you now.', {
        fontFamily: 'Georgia, serif',
        fontSize: '18px',
        color: '#8a6f52',
      })
      .setOrigin(0.5, 0);
    const totalH = padTop + label.height + gapMid + hint.height + padBottom;
    const bg = this.add
      .rectangle(x, totalH / 2, w, totalH, 0xfdf6ec)
      .setStrokeStyle(4, 0x8a5a3b);
    this.bubble = this.add.container(0, dockBottom - totalH, [bg, label, hint]);
    this.bubble.setVisible(false);
    this.bubble.setAlpha(0);
  }

  private onMochiTap(): void {
    this.bubbleOpen = !this.bubbleOpen;
    if (this.bubbleOpen) {
      this.bubble.setVisible(true);
      this.tweens.add({ targets: this.bubble, alpha: 1, duration: 180, ease: 'Sine.easeOut' });
      // One small happy bounce (squash, rise, tiny overshoot), then settle.
      this.tweens.add({
        targets: this.mochi,
        scaleY: '-=0.06',
        scaleX: '+=0.06',
        duration: 110,
        yoyo: true,
        ease: 'Sine.easeInOut',
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
