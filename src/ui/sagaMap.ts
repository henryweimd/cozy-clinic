import Phaser from 'phaser';
import { THEME } from './chromeTheme';
import type { SagaNode, SagaNodeState } from '../game/saga';

/**
 * Journey map sheet: the saga path as a winding trail of 8
 * nodes (done / current / locked). Read-only plus toasts —
 * tapping a node tells its story, never routes anywhere.
 * Modal over Profile (depth 30); the scene owns progress.
 */

export interface SagaMapState {
  node: SagaNode;
  state: SagaNodeState;
}

const NODE_R = 20;

export class SagaMap {
  onNode: (node: SagaNode, state: SagaNodeState) => void = () => {};
  onClose: () => void = () => {};

  private root: Phaser.GameObjects.Container;
  private rows: Phaser.GameObjects.Container;
  private titleText: Phaser.GameObjects.Text;
  private isOpen = false;

  constructor(private scene: Phaser.Scene) {
    const backdrop = this.scene.add
      .zone(270, 480, 540, 960)
      .setInteractive({ useHandCursor: false });
    backdrop.on('pointerdown', () => this.closeViaX());
    const sheet = this.scene.add.graphics();
    sheet.fillStyle(THEME.cream, THEME.glassSheet);
    sheet.lineStyle(3, THEME.outline, 1);
    sheet.fillRoundedRect(24, 136, 492, 740, 24);
    sheet.strokeRoundedRect(24, 136, 492, 740, 24);
    this.titleText = this.scene.add
      .text(48, 172, 'Your Journey', {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '24px',
        color: THEME.cocoa,
      })
      .setOrigin(0, 0.5);
    const close = this.scene.add
      .text(492, 172, '×', {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '28px',
        color: THEME.secondary,
      })
      .setOrigin(0.5, 0.5);
    const closeZone = this.scene.add
      .zone(492, 172, 56, 56)
      .setInteractive({ useHandCursor: true });
    closeZone.on('pointerdown', () => this.closeViaX());
    this.rows = this.scene.add.container(0, 0, []);
    this.root = this.scene.add.container(0, 0, [
      backdrop,
      sheet,
      this.titleText,
      close,
      closeZone,
      this.rows,
    ]);
    this.root.setDepth(30).setVisible(false).setAlpha(0);
  }

  show(states: readonly SagaMapState[]): void {
    const done = states.filter((s) => s.state === 'done').length;
    this.titleText.setText(`Your Journey · ${done} of ${states.length}`);
    this.renderMap(states);
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

  private closeViaX(): void {
    this.hide();
    this.onClose();
  }

  /** Pure node slot (unit-verified by geometry review). */
  private slot(i: number): { x: number; y: number } {
    return { x: i % 2 === 0 ? 150 : 390, y: 252 + i * 76 };
  }

  private renderMap(states: readonly SagaMapState[]): void {
    this.rows.removeAll(true);
    const line = this.scene.add.graphics();
    line.lineStyle(2, THEME.outline, 0.35);
    for (let i = 1; i < states.length; i += 1) {
      const a = this.slot(i - 1);
      const b = this.slot(i);
      line.lineBetween(a.x, a.y, b.x, b.y);
    }
    this.rows.add(line);
    states.forEach((s, i) => {
      const { x, y } = this.slot(i);
      const dot = this.scene.add.graphics();
      if (s.state === 'done') {
        dot.fillStyle(THEME.sage, 1);
        dot.fillCircle(x, y, NODE_R);
        dot.lineStyle(3, THEME.outline, 1);
        dot.strokeCircle(x, y, NODE_R);
        dot.lineStyle(3, 0xffffff, 1);
        dot.lineBetween(x - 8, y + 1, x - 2, y + 7);
        dot.lineBetween(x - 2, y + 7, x + 9, y - 6);
      } else if (s.state === 'current') {
        dot.fillStyle(THEME.cardFill, 1);
        dot.fillCircle(x, y, NODE_R);
        dot.lineStyle(3, THEME.outline, 1);
        dot.strokeCircle(x, y, NODE_R);
        dot.lineStyle(2, THEME.sage, 1);
        dot.strokeCircle(x, y, NODE_R + 5);
      } else {
        dot.fillStyle(THEME.cardFill, 1);
        dot.fillCircle(x, y, NODE_R);
        dot.lineStyle(2, THEME.outline, 0.5);
        dot.strokeCircle(x, y, NODE_R);
      }
      const leftSide = x < 270;
      const name = this.scene.add
        .text(leftSide ? x + 30 : x - 30, y - 12, s.node.label, {
          fontFamily: THEME.font,
          fontStyle: 'bold',
          fontSize: '15px',
          color: s.state === 'locked' ? THEME.secondary : THEME.cocoa,
        })
        .setOrigin(leftSide ? 0 : 1, 0.5);
      const need = this.scene.add
        .text(leftSide ? x + 30 : x - 30, y + 10, s.node.need, {
          fontFamily: THEME.font,
          fontSize: '12px',
          color: THEME.secondary,
        })
        .setOrigin(leftSide ? 0 : 1, 0.5);
      const row = this.scene.add.container(0, 0, [dot, name, need]);
      const zone = this.scene.add
        .zone(x, y, 120, 56)
        .setInteractive({ useHandCursor: true });
      zone.on('pointerdown', () => this.onNode(s.node, s.state));
      row.add(zone);
      this.rows.add(row);
    });
  }
}
