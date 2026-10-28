import Phaser from 'phaser';
import { ClinicalEngine, CONDITIONS } from '../clinical';

/**
 * Milestone 1 clinic scene: warm room, Mochi arrives, tap to see complaint.
 *
 * TEMPORARY stand-ins (clearly marked): the room itself — wall, floor,
 * window, plant, cabinet — is code-drawn placeholder geometry, NOT finished
 * art. It must not read as finished art. Mochi is the finished AI-generated
 * sprite (see ART_BIBLE.md); only the room is temporary.
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
    this.drawRoom(); // TEMPORARY room geometry (see note above)
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

  // -- room (TEMPORARY stand-in geometry; replaced by finished art later) --

  private drawRoom(): void {
    // TEMPORARY: flat wall + floor bands stand in for the finished clinic room.
    this.add.rectangle(270, 330, 540, 660, 0xfcebd6).setOrigin(0.5);
    this.add.rectangle(270, 810, 540, 300, 0xe8c9a0).setOrigin(0.5);
    this.add.rectangle(270, 662, 540, 10, 0xd9a86c).setOrigin(0.5);

    // TEMPORARY: window with sun.
    const wx = 90;
    const wy = 200;
    this.add.rectangle(wx, wy, 150, 170, 0xa9cce3).setStrokeStyle(10, 0x8a5a3b);
    this.add.circle(wx + 35, wy - 30, 26, 0xf9dc8a);

    // TEMPORARY: potted plant.
    this.add.rectangle(452, 560, 64, 70, 0xd98e73);
    this.add.circle(452, 500, 44, 0xa9c6a2);
    this.add.circle(424, 516, 30, 0xa9c6a2);
    this.add.circle(480, 516, 30, 0xa9c6a2);

    // TEMPORARY: medicine cabinet.
    this.add.rectangle(452, 300, 110, 150, 0xfdf6ec).setStrokeStyle(6, 0x8a5a3b);
    this.add.rectangle(452, 270, 110, 26, 0xf5a0ac);
    this.add.rectangle(452, 320, 110, 4, 0x8a5a3b);
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
    // Soft ground shadow so Mochi sits IN the room, grounded at the feet.
    this.add.ellipse(270, 716, 190, 34, 0x8a5a3b, 0.18);

    this.mochi = this.add.image(270, 590, 'mochi-idle');
    this.mochi.setDisplaySize(240, 240);
    this.mochiBaseY = this.mochi.y;
    this.mochi.setInteractive({ useHandCursor: true });

    this.add
      .text(270, 762, 'Mochi · first patient', {
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

    const w = 460;
    const h = 150;
    const x = 270;
    const y = 866;
    const bg = this.add.rectangle(x, y, w, h, 0xfdf6ec).setStrokeStyle(4, 0x8a5a3b);
    const label = this.add
      .text(x, y, complaint, {
        fontFamily: 'Georgia, serif',
        fontSize: '21px',
        color: '#5c4633',
        align: 'center',
        wordWrap: { width: w - 40 },
      })
      .setOrigin(0.5);
    const hint = this.add
      .text(x, y + h / 2 - 30, 'The doctor will see you now.', {
        fontFamily: 'Georgia, serif',
        fontSize: '18px',
        color: '#8a6f52',
      })
      .setOrigin(0.5);
    this.bubble = this.add.container(0, 0, [bg, label, hint]);
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
