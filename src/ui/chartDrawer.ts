import Phaser from 'phaser';
import { THEME } from './chromeTheme';

/**
 * Medical Chart drawer: the patient's SIGNOUT (name + tier-aware
 * signout lines from signout.ts — visit/who, complaint, history
 * + meds, observation) in a left drawer mirroring the exam tray.
 * Tap the handle to slide open/closed; the scene auto-opens it
 * on each patient's first appearance for the visit. Lines stack
 * by measured height (wrapping-safe), not fixed slots.
 *
 * Geometry: the HANDLE is fixed at x0-24 (24px tab, y300-560,
 * depth 23); the PANEL slides from x-192 (fully off-screen,
 * closed) to x0 (open, 192 wide, depth 22). Visit-only chrome.
 */

const HANDLE_W = 24;
const PANEL_W = 192;
const PANEL_CLOSED_X = -PANEL_W;
const PANEL_OPEN_X = 0;
const DRAWER_TOP = 300;
const DRAWER_H = 260;

export interface ChartContent {
  name: string;
  /** Signout lines (visit/who, complaint, history+meds, observation). */
  lines: string[];
}

export class ChartDrawer {
  private panel: Phaser.GameObjects.Container;
  private handle: Phaser.GameObjects.Container;
  private handleGlyph: Phaser.GameObjects.Text;
  private nameText: Phaser.GameObjects.Text;
  private lineTexts: Phaser.GameObjects.Text[] = [];
  private open = false;

  constructor(private scene: Phaser.Scene) {
    const bg = this.scene.add.graphics();
    bg.fillStyle(THEME.cream, THEME.glassPanel);
    bg.lineStyle(3, THEME.outline, 1);
    bg.fillRoundedRect(0, DRAWER_TOP, PANEL_W, DRAWER_H, {
      tl: 0,
      tr: 20,
      bl: 0,
      br: 20,
    });
    bg.strokeRoundedRect(0, DRAWER_TOP, PANEL_W, DRAWER_H, {
      tl: 0,
      tr: 20,
      bl: 0,
      br: 20,
    });
    const mk = (
      y: number,
      size: string,
      bold: boolean,
      color: string,
    ): Phaser.GameObjects.Text =>
      this.scene.add
        .text(40, y, '', {
          fontFamily: THEME.font,
          fontStyle: bold ? 'bold' : 'normal',
          fontSize: size,
          color,
          wordWrap: { width: 128 },
          lineSpacing: 4,
        })
        .setOrigin(0, 0);
    this.nameText = mk(DRAWER_TOP + 24, '20px', true, THEME.cocoa);
    // Four signout lines, positioned by measured height in
    // setContent (visit line bold, the rest regular).
    for (let i = 0; i < 4; i += 1) {
      this.lineTexts.push(
        mk(DRAWER_TOP + 60, '14px', i === 0, i === 0 ? THEME.secondary : THEME.cocoa),
      );
    }
    this.panel = this.scene.add.container(PANEL_CLOSED_X, 0, [
      bg,
      this.nameText,
      ...this.lineTexts,
    ]);
    this.panel.setDepth(22);

    const tab = this.scene.add.graphics();
    tab.fillStyle(THEME.cream, THEME.glassPanel);
    tab.lineStyle(3, THEME.outline, 1);
    tab.fillRoundedRect(0, DRAWER_TOP, HANDLE_W, DRAWER_H, { tl: 0, tr: 8, bl: 0, br: 8 });
    tab.strokeRoundedRect(0, DRAWER_TOP, HANDLE_W, DRAWER_H, { tl: 0, tr: 8, bl: 0, br: 8 });
    this.handleGlyph = this.scene.add
      .text(HANDLE_W / 2, DRAWER_TOP + DRAWER_H / 2, '\u203a', {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '28px',
        color: THEME.cocoa,
      })
      .setOrigin(0.5, 0.5);
    const zone = this.scene.add
      .zone(HANDLE_W / 2, DRAWER_TOP + DRAWER_H / 2, HANDLE_W, DRAWER_H)
      .setInteractive({ useHandCursor: true });
    zone.on('pointerdown', () => this.toggle());
    this.handle = this.scene.add.container(0, 0, [tab, this.handleGlyph, zone]);
    this.handle.setDepth(23);
  }

  setContent(content: ChartContent): void {
    this.nameText.setText(content.name);
    let y = DRAWER_TOP + 24 + this.nameText.height + 10;
    this.lineTexts.forEach((text, i) => {
      text.setText(content.lines[i] ?? '');
      text.setY(y);
      y += text.height + 6;
    });
  }

  toggle(): void {
    this.setOpen(!this.open);
  }

  setOpen(open: boolean, instant = false): void {
    this.open = open;
    this.handleGlyph.setText(this.open ? '\u2039' : '\u203a');
    this.scene.tweens.killTweensOf(this.panel);
    if (instant) {
      this.panel.setX(this.open ? PANEL_OPEN_X : PANEL_CLOSED_X);
      return;
    }
    this.scene.tweens.add({
      targets: this.panel,
      x: this.open ? PANEL_OPEN_X : PANEL_CLOSED_X,
      duration: 220,
      ease: 'Sine.easeInOut',
    });
  }

  get isOpen(): boolean {
    return this.open;
  }

  setVisible(visible: boolean): void {
    this.panel.setVisible(visible);
    this.handle.setVisible(visible);
  }
}
