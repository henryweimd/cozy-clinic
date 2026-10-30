import Phaser from 'phaser';
import { THEME } from './chromeTheme';

/**
 * L1 Living Chart: the signature mechanic's face — a compact
 * sheet showing what the patient remembers across encounters.
 * Beads + one-line each, newest last; tap outside to close.
 * Succinct by law: at most 5 lines, no scrolling, no clutter.
 *
 * Geometry: sheet x24-516, y548-752 (above the G4-shifted card
 * row). Depth 24 (above tray, below admin).
 */

/** Pure: last N memory sentences, oldest-first (unit-tested). */
export function memoryBeads(memory: string, max = 5): string[] {
  const lines = memory
    .split('. ')
    .map((s) => s.trim().replace(/\.+$/, ''))
    .filter((s) => s.length > 0);
  return lines.slice(Math.max(0, lines.length - max));
}

export class LivingChart {
  private root: Phaser.GameObjects.Container;
  private sheet: Phaser.GameObjects.Graphics;
  private title: Phaser.GameObjects.Text;
  private beads: Phaser.GameObjects.Graphics;
  private lines: Phaser.GameObjects.Text;
  private isOpen = false;

  constructor(private scene: Phaser.Scene) {
    const backdrop = this.scene.add
      .zone(270, 480, 540, 960)
      .setInteractive({ useHandCursor: false });
    backdrop.on('pointerdown', () => this.hide());
    this.sheet = this.scene.add.graphics();
    this.sheet.fillStyle(THEME.cream, THEME.glassSheet);
    this.sheet.lineStyle(3, THEME.outline, 1);
    this.sheet.fillRoundedRect(24, 548, 492, 204, 24);
    this.sheet.strokeRoundedRect(24, 548, 492, 204, 24);
    this.title = this.scene.add
      .text(48, 572, '', {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '20px',
        color: THEME.cocoa,
      })
      .setOrigin(0, 0.5);
    this.beads = this.scene.add.graphics();
    this.lines = this.scene.add
      .text(84, 600, '', {
        fontFamily: THEME.font,
        fontSize: '15px',
        color: THEME.cocoa,
        wordWrap: { width: 408 },
        lineSpacing: 6,
      })
      .setOrigin(0, 0);
    this.root = this.scene.add.container(0, 0, [
      backdrop,
      this.sheet,
      this.title,
      this.beads,
      this.lines,
    ]);
    this.root.setDepth(24).setVisible(false).setAlpha(0);
  }

  show(patientName: string, memory: string): void {
    const beads = memoryBeads(memory);
    this.title.setText(`${patientName} remembers`);
    this.lines.setText(beads.map((b) => `\u2022  ${b}`).join('\n'));
    this.beads.clear();
    beads.forEach((_, i) => {
      this.beads.fillStyle(i === beads.length - 1 ? THEME.sage : THEME.sky, 1);
      this.beads.lineStyle(2, THEME.outline, 1);
      this.beads.fillCircle(60, 610 + i * 27, 7);
      this.beads.strokeCircle(60, 610 + i * 27, 7);
    });
    this.isOpen = true;
    this.root.setVisible(true);
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
    this.scene.tweens.add({
      targets: this.root,
      alpha: 0,
      duration: 150,
      ease: 'Sine.easeOut',
      onComplete: () => this.root.setVisible(false),
    });
  }

  get open(): boolean {
    return this.isOpen;
  }
}
