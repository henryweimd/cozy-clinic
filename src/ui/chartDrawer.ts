import Phaser from 'phaser';
import { THEME } from './chromeTheme';

/**
 * Medical Chart drawer: the patient's SIGNOUT (tier-aware lines
 * from signout.ts — visit/who, complaint, history + meds,
 * observation; the name lives only on the nametag). Top tab of
 * the left-edge rail. Tap the tab to slide open/closed; the
 * scene auto-opens it on each patient's first appearance. Lines
 * stack by measured height (wrapping-safe), not fixed slots.
 *
 * Geometry: the TAB is 52x56 at x0 (slot y362, depth 23) and
 * docks to x192 when open; the PANEL slides from x-192
 * (closed) to x0 (open, 192 wide, y300-560, depth 22).
 * Visit-only.
 */

export const TAB_W = 52;
export const TAB_H = 56;
export const RAIL_X = 0;
const PANEL_W = 192;
const PANEL_CLOSED_X = -PANEL_W;
const PANEL_OPEN_X = 0;
const DOCK_X = PANEL_OPEN_X + PANEL_W;
const DRAWER_TOP = 300;
const DRAWER_H = 260;
/** Rail slot tops: chart, exam, notes (below the panel, 8px gaps). */
export const RAIL_SLOTS = { chart: 362, exam: 426, notes: 490 } as const;

export interface ChartContent {
  /** Signout lines (visit/who, complaint, history+meds, observation). */
  lines: string[];
}

export class ChartDrawer {
  private panel: Phaser.GameObjects.Container;
  private tab: Phaser.GameObjects.Container;
  private tabIcon: Phaser.GameObjects.Graphics;
  private lineTexts: Phaser.GameObjects.Text[] = [];
  private open = false;
  onToggle: (open: boolean) => void = () => {};

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
    // No name line — the patient's name lives ONLY on the
    // bottom nametag. Four signout lines, positioned by measured
    // height in setContent (visit line bold, the rest regular).
    for (let i = 0; i < 4; i += 1) {
      this.lineTexts.push(
        mk(DRAWER_TOP + 60, '14px', i === 0, i === 0 ? THEME.secondary : THEME.cocoa),
      );
    }
    this.panel = this.scene.add.container(PANEL_CLOSED_X, 0, [bg, ...this.lineTexts]);
    this.panel.setDepth(22);

    const tabBg = this.scene.add.graphics();
    tabBg.fillStyle(THEME.cream, THEME.glassPanel);
    tabBg.lineStyle(3, THEME.outline, 1);
    tabBg.fillRoundedRect(RAIL_X, RAIL_SLOTS.chart, TAB_W, TAB_H, {
      tl: 0,
      tr: 14,
      bl: 0,
      br: 14,
    });
    tabBg.strokeRoundedRect(RAIL_X, RAIL_SLOTS.chart, TAB_W, TAB_H, {
      tl: 0,
      tr: 14,
      bl: 0,
      br: 14,
    });
    // Clipboard icon: board + clip + two text lines.
    this.tabIcon = this.scene.add.graphics();
    const cx = RAIL_X + TAB_W / 2;
    const cy = RAIL_SLOTS.chart + TAB_H / 2;
    this.tabIcon.lineStyle(2.5, THEME.outline, 1);
    this.tabIcon.fillStyle(THEME.cardFill, 1);
    this.tabIcon.fillRoundedRect(cx - 9, cy - 11, 18, 24, 3);
    this.tabIcon.strokeRoundedRect(cx - 9, cy - 11, 18, 24, 3);
    this.tabIcon.fillStyle(THEME.sage, 1);
    this.tabIcon.fillRoundedRect(cx - 5, cy - 14, 10, 6, 2);
    this.tabIcon.strokeRoundedRect(cx - 5, cy - 14, 10, 6, 2);
    this.tabIcon.lineStyle(2, THEME.outline, 1);
    this.tabIcon.lineBetween(cx - 5, cy - 2, cx + 5, cy - 2);
    this.tabIcon.lineBetween(cx - 5, cy + 4, cx + 5, cy + 4);
    const zone = this.scene.add
      .zone(cx, cy, TAB_W, TAB_H)
      .setInteractive({ useHandCursor: true });
    zone.on('pointerdown', () => this.toggle());
    this.tab = this.scene.add.container(0, 0, [tabBg, this.tabIcon, zone]);
    this.tab.setDepth(23);
  }

  setContent(content: ChartContent): void {
    let y = DRAWER_TOP + 24;
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
    const changed = open !== this.open;
    this.open = open;
    if (changed) this.onToggle(open);
    // The tab docks to the panel's leading edge when open.
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
