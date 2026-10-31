import { THEME } from './chromeTheme';

/**
 * About page: a full-page modal behind the Profile About link —
 * the pitch, how to play, the hackathon context, credits, and
 * the education-only disclaimer — offline-safe (no links out).
 * The sound + terminal toggles live at the bottom, next to the
 * project they belong to. Modal over Profile (depth 30);
 * backdrop tap or the × closes it.
 */

const TITLE = 'About Cozy Clinic';

const BODY: readonly string[] = [
  'Cozy Clinic is a cozy game about caring for patients who remember you. Meet Milo, Mabel, June, and 27 more friends who remember you — ask, examine, diagnose, and treat them across visits while your Living Chart follows every friend.',
  "How to play: clear each visit's four quiz rounds, earn Care Coins, read Learn topics to get sharper, and spend coins in the Shop. Slide the reading level from Gentle to Expert.",
  'Made for the Meta AI Developer Hackathon, Indie track. Muse Spark pre-computes patient futures and paraphrases greetings; Muse Image drew the cast; Muse Code built the game.',
  'Educational simulation only — never medical advice, never real patient data.',
];

export class AboutSheet {
  private root: Phaser.GameObjects.Container;
  private isOpen = false;
  private soundBg: Phaser.GameObjects.Graphics;
  private soundText: Phaser.GameObjects.Text;
  private terminalBg: Phaser.GameObjects.Graphics;
  private terminalText: Phaser.GameObjects.Text;
  private muted = false;
  private tickerOn = true;
  onSoundToggle: (muted: boolean) => void = () => {};
  onTickerToggle: (on: boolean) => void = () => {};

  constructor(private scene: Phaser.Scene) {
    const backdrop = this.scene.add
      .zone(270, 480, 540, 960)
      .setInteractive({ useHandCursor: false });
    backdrop.on('pointerdown', () => this.hide());
    const card = this.scene.add.graphics();
    card.fillStyle(THEME.cardFill, THEME.glassSheet);
    card.lineStyle(3, THEME.outline, 1);
    card.fillRoundedRect(24, 136, 492, 712, 24);
    card.strokeRoundedRect(24, 136, 492, 712, 24);
    const title = this.scene.add
      .text(56, 174, TITLE, {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '26px',
        color: THEME.cocoa,
      })
      .setOrigin(0, 0.5);
    const close = this.scene.add
      .text(484, 174, '×', {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '28px',
        color: THEME.secondary,
      })
      .setOrigin(0.5, 0.5);
    const closeZone = this.scene.add
      .zone(484, 174, 56, 56)
      .setInteractive({ useHandCursor: true });
    closeZone.on('pointerdown', () => this.hide());
    const body = this.scene.add
      .text(56, 214, BODY.join('\n\n'), {
        fontFamily: THEME.font,
        fontSize: '16px',
        color: THEME.secondary,
        wordWrap: { width: 428 },
        lineSpacing: 6,
      })
      .setOrigin(0, 0);
    const soundLabel = this.scene.add
      .text(56, 756, 'Sound', {
        fontFamily: THEME.font,
        fontSize: '17px',
        color: THEME.secondary,
      })
      .setOrigin(0, 0.5);
    this.soundBg = this.scene.add.graphics();
    this.soundText = this.scene.add
      .text(420, 756, '', {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '17px',
        color: THEME.cocoa,
      })
      .setOrigin(0.5, 0.5);
    const soundZone = this.scene.add
      .zone(420, 756, 110, 52)
      .setInteractive({ useHandCursor: true });
    soundZone.on('pointerdown', () => this.onSoundToggle(!this.muted));
    const terminalLabel = this.scene.add
      .text(56, 812, 'Terminal', {
        fontFamily: THEME.font,
        fontSize: '17px',
        color: THEME.secondary,
      })
      .setOrigin(0, 0.5);
    this.terminalBg = this.scene.add.graphics();
    this.terminalText = this.scene.add
      .text(420, 812, '', {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '17px',
        color: THEME.cocoa,
      })
      .setOrigin(0.5, 0.5);
    const terminalZone = this.scene.add
      .zone(420, 812, 110, 52)
      .setInteractive({ useHandCursor: true });
    terminalZone.on('pointerdown', () => this.onTickerToggle(!this.tickerOn));
    this.paintToggles();
    this.root = this.scene.add.container(0, 0, [
      backdrop,
      card,
      title,
      close,
      closeZone,
      body,
      soundLabel,
      this.soundBg,
      this.soundText,
      soundZone,
      terminalLabel,
      this.terminalBg,
      this.terminalText,
      terminalZone,
    ]);
    this.root.setDepth(30).setVisible(false).setAlpha(0);
  }

  /** Repaints the toggles (the scene owns the persisted values). */
  syncSound(muted: boolean): void {
    this.muted = muted;
    this.paintToggles();
  }

  syncTicker(on: boolean): void {
    this.tickerOn = on;
    this.paintToggles();
  }

  private paintToggle(
    bg: Phaser.GameObjects.Graphics,
    text: Phaser.GameObjects.Text,
    y: number,
    on: boolean,
  ): void {
    bg.clear();
    bg.fillStyle(on ? THEME.sage : THEME.cardFill, 1);
    bg.lineStyle(2, THEME.outline, 1);
    bg.fillRoundedRect(372, y, 96, 44, 22);
    bg.strokeRoundedRect(372, y, 96, 44, 22);
    text.setText(on ? 'On' : 'Off');
    text.setColor(on ? '#ffffff' : THEME.cocoa);
  }

  private paintToggles(): void {
    this.paintToggle(this.soundBg, this.soundText, 734, !this.muted);
    this.paintToggle(this.terminalBg, this.terminalText, 790, this.tickerOn);
  }

  show(muted: boolean, tickerOn: boolean): void {
    this.syncSound(muted);
    this.syncTicker(tickerOn);
    this.isOpen = true;
    this.root.setVisible(true).setAlpha(0);
    this.scene.tweens.killTweensOf(this.root);
    this.scene.tweens.add({
      targets: this.root,
      alpha: 1,
      duration: 180,
      ease: 'Sine.easeOut',
    });
  }

  hide(): void {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.scene.tweens.killTweensOf(this.root);
    this.root.setVisible(false).setAlpha(0);
  }

  get open(): boolean {
    return this.isOpen;
  }
}
