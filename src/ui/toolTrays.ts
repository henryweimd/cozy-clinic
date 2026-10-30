import Phaser from 'phaser';
import { RAIL_SLOTS, RAIL_X, TAB_H, TAB_W } from './chartDrawer';
import { THEME } from './chromeTheme';

/**
 * T1 exam tool tray: a translucent tray sliding from the right
 * edge with the four real physical-exam maneuvers — inspection
 * (look, incl. ears/nose/throat), palpation (feel), percussion
 * (tap + listen), auscultation (listen with stethoscope). Middle
 * tab of the right-edge rail: tap the tab to slide open/closed;
 * tap a maneuver to reveal its disease-specific finding in the
 * panel (this module only reports the pick — the scene reads
 * exam_findings).
 *
 * Geometry: the TAB is 52x56 at x488 (slot y426, depth 23) and
 * docks to x296 when open; the PANEL slides from x540 (closed)
 * to x348 (open, 192 wide, y300-560, depth 22). Visit-only
 * chrome: exam tools make no sense through a video call.
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

const PANEL_W = 192;
const PANEL_CLOSED_X = 540;
const PANEL_OPEN_X = 540 - PANEL_W;
const DOCK_X = PANEL_OPEN_X - TAB_W;
const TRAY_TOP = 300;
const TRAY_H = 260;

export class ToolTray {
  private panel: Phaser.GameObjects.Container;
  private panelBg: Phaser.GameObjects.Graphics;
  private tab: Phaser.GameObjects.Container;
  private open = false;
  onPick: (tool: ToolDef) => void = () => {};
  onToggle: (open: boolean) => void = () => {};

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

    // Rail tab: docks to the panel's leading edge when open.
    const tabBg = this.scene.add.graphics();
    tabBg.fillStyle(THEME.cream, THEME.glassPanel);
    tabBg.lineStyle(3, THEME.outline, 1);
    tabBg.fillRoundedRect(RAIL_X, RAIL_SLOTS.exam, TAB_W, TAB_H, {
      tl: 14,
      tr: 0,
      bl: 14,
      br: 0,
    });
    tabBg.strokeRoundedRect(RAIL_X, RAIL_SLOTS.exam, TAB_W, TAB_H, {
      tl: 14,
      tr: 0,
      bl: 14,
      br: 0,
    });
    // Magnifier icon: lens + handle (look closer).
    const icon = this.scene.add.graphics();
    const cx = RAIL_X + TAB_W / 2;
    const cy = RAIL_SLOTS.exam + TAB_H / 2;
    icon.lineStyle(3, THEME.outline, 1);
    icon.fillStyle(THEME.cardFill, 1);
    icon.fillCircle(cx - 3, cy - 3, 10);
    icon.strokeCircle(cx - 3, cy - 3, 10);
    icon.lineBetween(cx + 4, cy + 4, cx + 12, cy + 12);
    const zone = this.scene.add
      .zone(cx, cy, TAB_W, TAB_H)
      .setInteractive({ useHandCursor: true });
    zone.on('pointerdown', () => this.toggle());
    this.tab = this.scene.add.container(0, 0, [tabBg, icon, zone]);
    this.tab.setDepth(23);
  }

  private buildRow(tool: ToolDef, i: number): void {
    // Rows live in the panel's left 168px; the tab docks to the
    // panel's leading (left) edge when open.
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
    this.setOpen(!this.open);
  }

  setOpen(open: boolean, instant = false): void {
    const changed = open !== this.open;
    this.open = open;
    if (changed) this.onToggle(open);
    const tabX = open ? DOCK_X - RAIL_X : 0;
    this.scene.tweens.killTweensOf([this.panel, this.tab]);
    if (instant) {
      this.panel.setX(open ? PANEL_OPEN_X : PANEL_CLOSED_X);
      this.tab.setX(tabX);
      return;
    }
    this.scene.tweens.add({
      targets: this.panel,
      x: open ? PANEL_OPEN_X : PANEL_CLOSED_X,
      duration: 220,
      ease: 'Sine.easeInOut',
    });
    this.scene.tweens.add({
      targets: this.tab,
      x: tabX,
      duration: 220,
      ease: 'Sine.easeInOut',
    });
  }

  get isOpen(): boolean {
    return this.open;
  }

  setVisible(visible: boolean): void {
    this.panel.setVisible(visible);
    this.tab.setVisible(visible);
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
