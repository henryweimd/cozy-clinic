import { THEME } from './chromeTheme';

/**
 * About sheet: a small modal behind the Profile About row. Three
 * short paragraphs on what Cozy Clinic is — offline-safe (no
 * links out). Modal over Profile (depth 30); backdrop tap or
 * the × closes it.
 */

const TITLE = 'About Cozy Clinic';

const BODY: readonly string[] = [
  'A cozy clinic game where patients remember you. Your Living Chart follows every friend across visits and doctors.',
  'Educational simulation only — never medical advice, never real patient data.',
  'Made for the Meta AI Developer Hackathon, Indie track.',
];

export class AboutSheet {
  private root: Phaser.GameObjects.Container;
  private isOpen = false;

  constructor(private scene: Phaser.Scene) {
    const backdrop = this.scene.add
      .zone(270, 480, 540, 960)
      .setInteractive({ useHandCursor: false });
    backdrop.on('pointerdown', () => this.hide());
    const card = this.scene.add.graphics();
    card.fillStyle(THEME.cardFill, THEME.glassSheet);
    card.lineStyle(3, THEME.outline, 1);
    card.fillRoundedRect(48, 300, 444, 360, 24);
    card.strokeRoundedRect(48, 300, 444, 360, 24);
    const title = this.scene.add
      .text(72, 340, TITLE, {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '24px',
        color: THEME.cocoa,
      })
      .setOrigin(0, 0.5);
    const close = this.scene.add
      .text(468, 340, '×', {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '28px',
        color: THEME.secondary,
      })
      .setOrigin(0.5, 0.5);
    const closeZone = this.scene.add
      .zone(468, 340, 56, 56)
      .setInteractive({ useHandCursor: true });
    closeZone.on('pointerdown', () => this.hide());
    const body = this.scene.add
      .text(72, 376, BODY.join('\n\n'), {
        fontFamily: THEME.font,
        fontSize: '16px',
        color: THEME.secondary,
        wordWrap: { width: 396 },
        lineSpacing: 6,
      })
      .setOrigin(0, 0);
    this.root = this.scene.add.container(0, 0, [backdrop, card, title, close, closeZone, body]);
    this.root.setDepth(30).setVisible(false).setAlpha(0);
  }

  show(): void {
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
