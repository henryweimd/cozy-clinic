import Phaser from 'phaser';
import { FALLBACK_RESOURCES } from '../data/fallbackPack';
import type { FallbackResource } from '../data/fallbackPack';
import { THEME } from './chromeTheme';

/**
 * E1 Learning List: the formal-education submenu (submenu ONLY —
 * never on the main screen, per the uncluttered-main law). Rows
 * link conditions to authoritative layperson sources; the
 * backend cache (learning_resources) feeds it, Supabase first
 * with the fallback pack offline. Tapping a row reports out;
 * the integration decides what opens (later: in-game reader).
 *
 * Geometry: full sheet x24-516, y136-876 like Waiting/Portal.
 * Depth 24.
 */

/** Pure: resources for one condition (unit-tested). */
export function resourcesFor(conditionId: string): FallbackResource[] {
  return FALLBACK_RESOURCES.filter((r) => r.condition_id === conditionId);
}

export class LearnList {
  private root: Phaser.GameObjects.Container;
  private sheet: Phaser.GameObjects.Graphics;
  private title: Phaser.GameObjects.Text;
  private body: Phaser.GameObjects.Container;
  private isOpen = false;
  onOpen: (resource: FallbackResource) => void = () => {};

  constructor(private scene: Phaser.Scene) {
    this.sheet = this.scene.add.graphics();
    this.sheet.fillStyle(THEME.cream, 1);
    this.sheet.lineStyle(3, THEME.outline, 1);
    this.sheet.fillRoundedRect(24, 136, 492, 740, 24);
    this.sheet.strokeRoundedRect(24, 136, 492, 740, 24);
    this.title = this.scene.add
      .text(48, 172, 'Learning List', {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '26px',
        color: THEME.cocoa,
      })
      .setOrigin(0, 0.5);
    const close = this.scene.add
      .text(492, 172, '\u00d7', {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '30px',
        color: THEME.secondary,
      })
      .setOrigin(0.5, 0.5);
    const closeZone = this.scene.add
      .zone(492, 172, 56, 56)
      .setInteractive({ useHandCursor: true });
    closeZone.on('pointerdown', () => this.hide());
    this.body = this.scene.add.container(0, 0, []);
    this.root = this.scene.add.container(0, 0, [
      this.sheet,
      this.title,
      close,
      closeZone,
      this.body,
    ]);
    this.root.setDepth(24).setVisible(false).setAlpha(0);
  }

  show(conditionId: string, conditionName: string): void {
    this.body.removeAll(true);
    this.title.setText(`Learning: ${conditionName}`);
    const rows = resourcesFor(conditionId);
    rows.forEach((r, i) => {
      const y = 216 + i * 108;
      const bg = this.scene.add.graphics();
      bg.fillStyle(THEME.cardFill, 1);
      bg.lineStyle(2, THEME.outline, 1);
      bg.fillRoundedRect(48, y, 444, 96, 16);
      bg.strokeRoundedRect(48, y, 444, 96, 16);
      const name = this.scene.add
        .text(68, y + 20, r.title, {
          fontFamily: THEME.font,
          fontStyle: 'bold',
          fontSize: '19px',
          color: THEME.cocoa,
        })
        .setOrigin(0, 0);
      const src = this.scene.add
        .text(68, y + 50, `${r.source} \u00b7 ${r.audience === 'pro' ? 'pro' : 'everyone'}`, {
          fontFamily: THEME.font,
          fontSize: '15px',
          color: THEME.secondary,
        })
        .setOrigin(0, 0);
      const row = this.scene.add.container(0, 0, [bg, name, src]);
      const zone = this.scene.add
        .zone(270, y + 48, 444, 96)
        .setInteractive({ useHandCursor: true });
      zone.on('pointerdown', () => this.onOpen(r));
      row.add(zone);
      this.body.add(row);
    });
    if (rows.length === 0) {
      const empty = this.scene.add
        .text(270, 300, 'Nothing filed here yet.', {
          fontFamily: THEME.font,
          fontSize: '17px',
          color: THEME.secondary,
        })
        .setOrigin(0.5, 0.5);
      this.body.add(empty);
    }
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
