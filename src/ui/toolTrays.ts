import Phaser from 'phaser';
import { THEME } from './chromeTheme';

/**
 * T1 exam tool tray: a translucent tray sliding from the right
 * edge with common in-office tools (stethoscope, otoscope,
 * thermometer, penlight). Tap the handle to slide open/closed;
 * tap a tool to pick it up (the integration wires sounds, exam
 * loops, and result lines — this module only reports the pick).
 *
 * Geometry: the HANDLE is fixed at x516-540 (24px tab,
 * y300-560, depth 23); the PANEL slides behind it from x540
 * (fully off-screen, closed) to x348 (open, 192 wide, depth 22).
 * Closed shows the tab only; open keeps the tab riding the
 * panel's right edge. Visit-only chrome: exam tools make no
 * sense through a video call.
 */

export interface ToolDef {
  id: 'stethoscope' | 'otoscope' | 'thermometer' | 'penlight';
  label: string;
  hint: string;
}

export const EXAM_TOOLS: readonly ToolDef[] = [
  { id: 'stethoscope', label: 'Listen', hint: 'chest sounds' },
  { id: 'otoscope', label: 'Look', hint: 'ears + throat' },
  { id: 'thermometer', label: 'Temp', hint: 'quick check' },
  { id: 'penlight', label: 'Light', hint: 'eyes + throat' },
];

const HANDLE_X = 516;
const HANDLE_W = 24;
const PANEL_W = 192;
const PANEL_CLOSED_X = 540;
const PANEL_OPEN_X = 540 - PANEL_W;
const TRAY_TOP = 300;
const TRAY_H = 260;

export class ToolTray {
  private panel: Phaser.GameObjects.Container;
  private panelBg: Phaser.GameObjects.Graphics;
  private handle: Phaser.GameObjects.Container;
  private handleGlyph: Phaser.GameObjects.Text;
  private open = false;
  onPick: (tool: ToolDef) => void = () => {};

  constructor(private scene: Phaser.Scene) {
    // Sliding panel: starts fully off-screen right.
    this.panelBg = this.scene.add.graphics();
    this.panelBg.fillStyle(THEME.cream, 0.92);
    this.panelBg.lineStyle(3, THEME.outline, 1);
    this.panelBg.fillRoundedRect(0, TRAY_TOP, PANEL_W, TRAY_H, {
      tl: 20,
      tr: 0,
      bl: 20,
      br: 0,
    });
    this.panelBg.strokeRoundedRect(0, TRAY_TOP, PANEL_W, TRAY_H, {
      tl: 20,
      tr: 0,
      bl: 20,
      br: 0,
    });
    this.panel = this.scene.add.container(PANEL_CLOSED_X, 0, [this.panelBg]);
    this.panel.setDepth(22);
    EXAM_TOOLS.forEach((tool, i) => this.buildRow(tool, i));

    // Fixed handle tab: always anchored at the right edge, above
    // the panel so it stays tappable open or closed.
    const tab = this.scene.add.graphics();
    tab.fillStyle(THEME.cream, 0.92);
    tab.lineStyle(3, THEME.outline, 1);
    tab.fillRoundedRect(0, TRAY_TOP, HANDLE_W, TRAY_H, { tl: 8, tr: 0, bl: 8, br: 0 });
    tab.strokeRoundedRect(0, TRAY_TOP, HANDLE_W, TRAY_H, { tl: 8, tr: 0, bl: 8, br: 0 });
    this.handleGlyph = this.scene.add
      .text(HANDLE_W / 2, TRAY_TOP + TRAY_H / 2, '\u2039', {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '28px',
        color: THEME.cocoa,
      })
      .setOrigin(0.5, 0.5);
    const zone = this.scene.add
      .zone(HANDLE_W / 2, TRAY_TOP + TRAY_H / 2, HANDLE_W, TRAY_H)
      .setInteractive({ useHandCursor: true });
    zone.on('pointerdown', () => this.toggle());
    this.handle = this.scene.add.container(HANDLE_X, 0, [tab, this.handleGlyph, zone]);
    this.handle.setDepth(23);
  }

  private buildRow(tool: ToolDef, i: number): void {
    // Rows live in the panel's left 168px (the handle covers the
    // right 24px when open).
    const cy = TRAY_TOP + 40 + i * 60;
    const icon = this.scene.add.graphics();
    drawToolIcon(icon, tool.id, 44, cy);
    const label = this.scene.add
      .text(76, cy - 12, tool.label, {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '17px',
        color: THEME.cocoa,
      })
      .setOrigin(0, 0);
    const hint = this.scene.add
      .text(76, cy + 8, tool.hint, {
        fontFamily: THEME.font,
        fontSize: '13px',
        color: THEME.secondary,
      })
      .setOrigin(0, 0);
    const row = this.scene.add.container(0, 0, [icon, label, hint]);
    const zone = this.scene.add
      .zone(82, cy, 164, 56)
      .setInteractive({ useHandCursor: true });
    zone.on('pointerdown', () => this.onPick(tool));
    row.add(zone);
    this.panel.add(row);
  }

  toggle(): void {
    this.open = !this.open;
    this.handleGlyph.setText(this.open ? '\u203a' : '\u2039');
    this.scene.tweens.killTweensOf(this.panel);
    this.scene.tweens.add({
      targets: this.panel,
      x: this.open ? PANEL_OPEN_X : PANEL_CLOSED_X,
      duration: 220,
      ease: 'Sine.easeInOut',
    });
  }

  setVisible(visible: boolean): void {
    this.panel.setVisible(visible);
    this.handle.setVisible(visible);
  }
}

/** Code-drawn tool glyphs (palette only, no emoji). */
export function drawToolIcon(
  g: Phaser.GameObjects.Graphics,
  id: ToolDef['id'],
  cx: number,
  cy: number,
): void {
  g.lineStyle(3, THEME.outline, 1);
  if (id === 'stethoscope') {
    // Chest piece + Y tube, abstract-cozy.
    g.fillStyle(THEME.sky, 1);
    g.fillCircle(cx, cy + 8, 9);
    g.strokeCircle(cx, cy + 8, 9);
    g.lineBetween(cx, cy - 1, cx, cy - 12);
    g.lineBetween(cx, cy - 12, cx - 8, cy - 20);
    g.lineBetween(cx, cy - 12, cx + 8, cy - 20);
  } else if (id === 'otoscope') {
    // Cone head + handle.
    g.fillStyle(THEME.cardFill, 1);
    g.fillTriangle(cx - 10, cy - 14, cx + 10, cy - 14, cx, cy + 2);
    g.strokeTriangle(cx - 10, cy - 14, cx + 10, cy - 14, cx, cy + 2);
    g.fillStyle(THEME.sage, 1);
    g.fillRoundedRect(cx - 5, cy + 2, 10, 18, 4);
    g.strokeRoundedRect(cx - 5, cy + 2, 10, 18, 4);
  } else if (id === 'thermometer') {
    // Bulb + stem.
    g.fillStyle(THEME.cardFill, 1);
    g.fillRoundedRect(cx - 5, cy - 20, 10, 30, 5);
    g.strokeRoundedRect(cx - 5, cy - 20, 10, 30, 5);
    g.fillStyle(THEME.rose, 1);
    g.fillCircle(cx, cy + 13, 7);
    g.strokeCircle(cx, cy + 13, 7);
    g.fillRect(cx - 1.5, cy - 14, 3, 24);
  } else {
    // Penlight body + beam.
    g.fillStyle(THEME.amber, 1);
    g.fillRoundedRect(cx - 12, cy - 5, 18, 10, 5);
    g.strokeRoundedRect(cx - 12, cy - 5, 18, 10, 5);
    g.fillStyle(THEME.amber, 0.35);
    g.fillTriangle(cx + 6, cy - 5, cx + 6, cy + 5, cx + 20, cy);
  }
}
