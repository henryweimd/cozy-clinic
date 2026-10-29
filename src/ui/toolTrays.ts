import Phaser from 'phaser';
import { THEME } from './chromeTheme';

/**
 * T1 exam tool tray: a translucent tray sliding from the right
 * edge with common in-office tools (stethoscope, otoscope,
 * thermometer, penlight). Tap the handle to slide open/closed;
 * tap a tool to pick it up (the integration wires sounds, exam
 * loops, and result lines — this module only reports the pick).
 *
 * Geometry: closed = 28px handle at x512-540, y300-560; open =
 * panel x348-540. Depth 22 (above views, below admin).
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

const CLOSED_X = 512;
const OPEN_X = 348;
const TRAY_TOP = 300;
const TRAY_H = 260;

export class ToolTray {
  private root: Phaser.GameObjects.Container;
  private panel: Phaser.GameObjects.Graphics;
  private handleText: Phaser.GameObjects.Text;
  private toolRows: Phaser.GameObjects.Container[] = [];
  private open = false;
  onPick: (tool: ToolDef) => void = () => {};

  constructor(private scene: Phaser.Scene) {
    this.panel = this.scene.add.graphics();
    this.handleText = this.scene.add
      .text(0, 0, '\u2039', {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '28px',
        color: THEME.cocoa,
      })
      .setOrigin(0.5, 0.5);
    this.root = this.scene.add.container(CLOSED_X, 0, [this.panel, this.handleText]);
    this.root.setDepth(22);
    this.paint();
    EXAM_TOOLS.forEach((tool, i) => this.buildRow(tool, i));
    const zone = this.scene.add
      .zone(14, TRAY_TOP + TRAY_H / 2, 28, TRAY_H)
      .setInteractive({ useHandCursor: true });
    zone.on('pointerdown', () => this.toggle());
    this.root.add(zone);
  }

  private paint(): void {
    // Panel spans the full open width left of the handle; the
    // handle tab always shows (translucent cream, opaque glyph).
    this.panel.clear();
    this.panel.fillStyle(THEME.cream, 0.92);
    this.panel.lineStyle(3, THEME.outline, 1);
    this.panel.fillRoundedRect(OPEN_X - CLOSED_X, TRAY_TOP, CLOSED_X - OPEN_X + 28, TRAY_H, {
      tl: 20,
      tr: 0,
      bl: 20,
      br: 0,
    });
    this.panel.strokeRoundedRect(OPEN_X - CLOSED_X, TRAY_TOP, CLOSED_X - OPEN_X + 28, TRAY_H, {
      tl: 20,
      tr: 0,
      bl: 20,
      br: 0,
    });
    this.handleText.setPosition(14, TRAY_TOP + TRAY_H / 2);
    this.handleText.setText(this.open ? '\u203a' : '\u2039');
  }

  private buildRow(tool: ToolDef, i: number): void {
    const cy = TRAY_TOP + 40 + i * 60;
    const icon = this.scene.add.graphics();
    drawToolIcon(icon, tool.id, OPEN_X - CLOSED_X + 44, cy);
    const label = this.scene.add
      .text(OPEN_X - CLOSED_X + 76, cy - 12, tool.label, {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '17px',
        color: THEME.cocoa,
      })
      .setOrigin(0, 0);
    const hint = this.scene.add
      .text(OPEN_X - CLOSED_X + 76, cy + 8, tool.hint, {
        fontFamily: THEME.font,
        fontSize: '13px',
        color: THEME.secondary,
      })
      .setOrigin(0, 0);
    const row = this.scene.add.container(0, 0, [icon, label, hint]);
    const zone = this.scene.add
      .zone(OPEN_X - CLOSED_X + 82, cy, 164, 56)
      .setInteractive({ useHandCursor: true });
    zone.on('pointerdown', () => this.onPick(tool));
    row.add(zone);
    this.root.add(row);
    this.toolRows.push(row);
  }

  toggle(): void {
    this.open = !this.open;
    this.paint();
    this.scene.tweens.killTweensOf(this.root);
    this.scene.tweens.add({
      targets: this.root,
      x: this.open ? OPEN_X : CLOSED_X,
      duration: 220,
      ease: 'Sine.easeInOut',
    });
  }

  setVisible(visible: boolean): void {
    this.root.setVisible(visible);
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
