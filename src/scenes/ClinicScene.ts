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
      // Happy tap-react: show the happy pose for the bounce, then
      // restore idle. The token guards rapid re-taps so a stale
      // bounce never clears a newer happy.
      this.happyToken += 1;
      const token = this.happyToken;
      this.showingHappy = true;
      this.mochi.setTexture('mochi-happy');
      // One small happy bounce (squash, rise, tiny overshoot), then settle.
      this.tweens.add({
        targets: this.mochi,
        scaleY: '-=0.06',
        scaleX: '+=0.06',
        duration: 110,
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
