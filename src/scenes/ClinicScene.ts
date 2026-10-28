import Phaser from 'phaser';
import { ClinicalEngine, CONDITIONS } from '../clinical';

/** The one thin warm-brown outline on everything (ART_BIBLE.md). */
const INK = 0x8a5a3b;

/**
 * Milestone 1 clinic scene: a cozy, finished clinic room and Mochi,
 * the first patient. Tap Mochi to see the complaint.
 *
 * Room art is code-drawn finished art in the bible's plush language:
 * cream forms, one warm-brown outline, matte pastels, soft grounding
 * shadows. Mochi is the finished AI-generated sprite (see ART_BIBLE.md).
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

  // -- room (finished art: perspectival walls/floor, plush furniture) --

  private drawRoom(): void {
    this.drawWallsAndFloor();
    this.drawWindow();
    this.drawCabinet();
    this.drawExamBed();
    this.drawPlant();
    this.drawRug();
  }

  /** Wall with faint wallpaper dots, baseboard, and a plank floor. */
  private drawWallsAndFloor(): void {
    const g = this.add.graphics();

    // Wall: warm pale cream, ending well above the character.
    g.fillStyle(0xfcebd6, 1);
    g.fillRect(0, 0, 540, 440);
    // Soft light wash from the upper left (bible lighting).
    g.fillStyle(0xffffff, 0.16);
    g.fillEllipse(120, 60, 420, 260);
    // Wallpaper: faint dots, never busy. Rows stop above the dado
    // line so the reveal strip (352-440) stays clean cream.
    g.fillStyle(0xe9cfa8, 0.5);
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 9; col++) {
        const x = 30 + col * 60 + (row % 2 === 0 ? 0 : 30);
        const y = 150 + row * 58;
        if (x > 510) continue;
        g.fillCircle(x, y, 5);
      }
    }

    // Floor: warm wood plane the characters stand on.
    g.fillStyle(0xe8c9a0, 1);
    g.fillRect(0, 466, 540, 494);
    // Plank seams: horizontal boards plus staggered joints.
    g.lineStyle(3, 0xd9a86c, 0.55);
    for (const y of [560, 656, 758, 866]) {
      g.lineBetween(0, y, 540, y);
    }
    g.lineStyle(3, 0xd9a86c, 0.45);
    const joints: Array<[number, number]> = [
      [80, 560], [300, 560], [470, 560],
      [190, 656], [420, 656],
      [120, 758], [360, 758],
      [240, 866], [450, 866],
    ];
    for (const [x, y] of joints) {
      g.lineBetween(x, y, x, y + 34);
    }

    // Dado trim line at the shared sill baseline (WALL_BASE = 352):
    // window sill and cabinet sit on it; the strip below reads as
    // an intentional wainscot reveal, not leftover space.
    g.lineStyle(4, INK, 1);
    g.lineBetween(0, 352, 540, 352);

    // Baseboard where wall meets floor.
    g.fillStyle(0xfff3e2, 1);
    g.fillRect(0, 440, 540, 26);
    g.lineStyle(4, INK, 1);
    g.lineBetween(0, 442, 540, 442);
  }

  /**
   * Finished window: panes, sill, curtains on a rod, clouds and sun.
   * Left wall anchor (SIDE = 24); sill bottom sits on WALL_BASE = 352.
   */
  private drawWindow(): void {
    const g = this.add.graphics();

    // Curtain rod with finials.
    g.fillStyle(0xd9a86c, 1);
    g.fillRoundedRect(24, 132, 204, 14, 7);
    g.fillCircle(24, 139, 9);
    g.fillCircle(228, 139, 9);
    g.lineStyle(4, INK, 1);
    g.strokeRoundedRect(24, 132, 204, 14, 7);
    g.strokeCircle(24, 139, 9);
    g.strokeCircle(228, 139, 9);

    // Curtains flank the frame, tied back.
    for (const cx of [32, 182]) {
      g.fillStyle(0xf5a0ac, 1);
      g.fillRoundedRect(cx, 146, 38, 196, 12);
      g.lineStyle(5, INK, 1);
      g.strokeRoundedRect(cx, 146, 38, 196, 12);
      g.fillStyle(0xd98e73, 1);
      g.fillRoundedRect(cx, 236, 38, 16, 8);
      g.lineStyle(3, INK, 1);
      g.strokeRoundedRect(cx, 236, 38, 16, 8);
    }

    // Sky glass.
    g.fillStyle(0xa9cce3, 1);
    g.fillRoundedRect(56, 164, 150, 170, 14);
    // Clouds in the top-left pane.
    g.fillStyle(0xffffff, 1);
    g.fillCircle(82, 206, 12);
    g.fillCircle(96, 200, 16);
    g.fillCircle(110, 207, 11);
    // Sun in the top-right pane.
    g.fillStyle(0xf9dc8a, 1);
    g.fillCircle(174, 196, 16);
    g.fillStyle(0xffffff, 0.9);
    g.fillCircle(168, 190, 5);
    // Small cloud in the bottom-right pane.
    g.fillStyle(0xffffff, 1);
    g.fillCircle(156, 296, 10);
    g.fillCircle(168, 292, 13);
    g.fillCircle(180, 297, 9);
    // Crossbars.
    g.fillStyle(0xfff3e2, 1);
    g.fillRect(127, 164, 8, 170);
    g.fillRect(56, 245, 150, 8);
    g.lineStyle(3, INK, 1);
    g.strokeRect(127, 164, 8, 170);
    g.strokeRect(56, 245, 150, 8);
    // Frame outline.
    g.lineStyle(6, INK, 1);
    g.strokeRoundedRect(56, 164, 150, 170, 14);

    // Sill with a soft shadow on the wall beneath it.
    g.fillStyle(INK, 0.15);
    g.fillRoundedRect(50, 346, 162, 12, 6);
    g.fillStyle(0xfff3e2, 1);
    g.fillRoundedRect(44, 334, 174, 18, 9);
    g.lineStyle(5, INK, 1);
    g.strokeRoundedRect(44, 334, 174, 18, 9);
  }

  /**
   * Finished wall cabinet: open shelf with bottles, double doors.
   * Right wall anchor (right margin SIDE = 24); base sits on
   * WALL_BASE = 352 within 2px.
   */
  private drawCabinet(): void {
    const g = this.add.graphics();

    // Soft drop shadow on the wall.
    g.fillStyle(INK, 0.15);
    g.fillRoundedRect(400, 194, 124, 164, 14);

    // Body.
    g.fillStyle(0xfdf6ec, 1);
    g.fillRoundedRect(392, 186, 124, 164, 14);

    // Open shelf with three pastel bottles.
    g.fillStyle(0xf3e2c9, 1);
    g.fillRoundedRect(400, 194, 108, 56, 8);
    const bottles: Array<[number, number]> = [
      [420, 0xa9c6a2],
      [450, 0xa9cce3],
      [480, 0xf5a0ac],
    ];
    for (const [bx, color] of bottles) {
      g.fillStyle(color, 1);
      g.fillRoundedRect(bx - 9, 222, 18, 28, 5);
      g.fillRoundedRect(bx - 5, 214, 10, 8, 3);
      g.lineStyle(3, INK, 1);
      g.strokeRoundedRect(bx - 9, 222, 18, 28, 5);
    }
    // Shelf board.
    g.fillStyle(0xd9a86c, 1);
    g.fillRoundedRect(400, 250, 108, 10, 5);
    g.lineStyle(3, INK, 1);
    g.strokeRoundedRect(400, 250, 108, 10, 5);

    // Double doors with seam and handles — all inside the frame.
    g.fillStyle(0xfff3e2, 1);
    g.fillRoundedRect(400, 268, 108, 74, 8);
    g.lineStyle(4, INK, 1);
    g.strokeRoundedRect(400, 268, 108, 74, 8);
    g.lineStyle(3, INK, 1);
    g.lineBetween(454, 272, 454, 338);
    g.fillStyle(0xd98e73, 1);
    g.fillCircle(444, 305, 6);
    g.fillCircle(464, 305, 6);

    // Body outline.
    g.lineStyle(6, INK, 1);
    g.strokeRoundedRect(392, 186, 124, 164, 14);
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
