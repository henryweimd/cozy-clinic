import Phaser from 'phaser';
import { THEME } from './chromeTheme';

/**
 * T1 exam tool tray: a translucent tray sliding from the right
 * edge with the four real physical-exam maneuvers — inspection
 * (look, incl. ears/nose/throat), palpation (feel), percussion
 * (tap + listen), auscultation (listen with stethoscope). Tap the
 * handle to slide open/closed; tap a maneuver to begin it (the
 * exam loops wire sounds, illustrations, and result lines — this
 * module only reports the pick).
 *
 * Geometry: the HANDLE is fixed at x516-540 (24px tab,
 * y300-560, depth 23); the PANEL slides behind it from x540
 * (fully off-screen, closed) to x348 (open, 192 wide, depth 22).
 * Closed shows the tab only; open keeps the tab riding the
 * panel's right edge. Visit-only chrome: exam tools make no
 * sense through a video call.
 */

export interface ToolDef {
  id: 'inspection' | 'palpation' | 'percussion' | 'auscultation';
  /** Gentle verb (tap target). */
  label: string;
  /** Clinical term (education line). */
  hint: string;
}

export const EXAM_TOOLS: readonly ToolDef[] = [
  { id: 'inspection', label: 'Look', hint: 'inspection' },
  { id: 'palpation', label: 'Feel', hint: 'palpation' },
  { id: 'percussion', label: 'Tap', hint: 'percussion' },
  { id: 'auscultation', label: 'Listen', hint: 'auscultation' },
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
    this.panelBg.fillStyle(THEME.cream, THEME.glassPanel);
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
    tab.fillStyle(THEME.cream, THEME.glassPanel);
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
  if (id === 'inspection') {
    // Eye: almond outline + pupil + highlight.
    g.fillStyle(THEME.cardFill, 1);
    g.fillEllipse(cx, cy, 30, 18);
    g.strokeEllipse(cx, cy, 30, 18);
    g.fillStyle(THEME.outline, 1);
    g.fillCircle(cx, cy, 5);
    g.fillStyle(0xfff9ef, 1);
    g.fillCircle(cx - 1.5, cy - 1.5, 1.8);
  } else if (id === 'palpation') {
    // Pressing hand: palm + finger bumps + pressure ticks.
    g.fillStyle(THEME.cardFill, 1);
    g.fillRoundedRect(cx - 11, cy - 6, 22, 16, 8);
    g.strokeRoundedRect(cx - 11, cy - 6, 22, 16, 8);
    g.fillStyle(THEME.cardFill, 1);
    for (const dx of [-7, 0, 7]) {
      g.fillCircle(cx + dx, cy - 8, 5);
      g.strokeCircle(cx + dx, cy - 8, 5);
    }
    g.lineStyle(2, THEME.outline, 0.7);
    for (const dx of [-8, 0, 8]) {
      g.lineBetween(cx + dx, cy + 14, cx + dx, cy + 19);
    }
  } else if (id === 'percussion') {
    // Tapping fingers + radiating sound arcs.
    g.lineStyle(4, THEME.outline, 1);
    g.lineBetween(cx - 8, cy - 18, cx - 5, cy - 2);
    g.lineBetween(cx + 2, cy - 18, cx + 5, cy - 2);
    g.lineStyle(2.5, THEME.outline, 0.85);
    for (const r of [10, 16, 22]) {
      g.strokeCircle(cx, cy + 2, r);
    }
  } else {
    // Auscultation: chest piece + Y tube, abstract-cozy.
    g.fillStyle(THEME.sky, 1);
    g.fillCircle(cx, cy + 8, 9);
    g.strokeCircle(cx, cy + 8, 9);
    g.lineBetween(cx, cy - 1, cx, cy - 12);
    g.lineBetween(cx, cy - 12, cx - 8, cy - 20);
    g.lineBetween(cx, cy - 12, cx + 8, cy - 20);
  }
}
