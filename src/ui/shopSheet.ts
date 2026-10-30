import { THEME } from './chromeTheme';
import { itemsFor } from '../game/shop';
import type { ShopCategory, ShopItem } from '../game/shop';

/**
 * Clinic Shop sheet: tabbed Tools / Medicines / Practice store
 * behind the HUD coin meter. Every row teaches one real-practice
 * fact; Soon rows are honest placeholders for the staff system.
 * Modal over the visit (depth 30); scene owns wallet + owned set.
 */

const TABS: { id: ShopCategory; label: string }[] = [
  { id: 'tools', label: 'Tools' },
  { id: 'medicines', label: 'Medicines' },
  { id: 'practice', label: 'Practice' },
];

export class ShopSheet {
  onBuy: (item: ShopItem) => void = () => {};
  onClose: () => void = () => {};

  private root: Phaser.GameObjects.Container;
  private rows: Phaser.GameObjects.Container;
  private balanceText: Phaser.GameObjects.Text;
  private tabButtons: Phaser.GameObjects.Container[] = [];
  private tab: ShopCategory = 'tools';
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
    const title = this.scene.add
      .text(48, 172, 'Clinic Shop', {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '24px',
        color: THEME.cocoa,
      })
      .setOrigin(0, 0.5);
    this.balanceText = this.scene.add
      .text(492, 172, '', {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '16px',
        color: THEME.secondary,
      })
      .setOrigin(1, 0.5);
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
      title,
      this.balanceText,
      close,
      closeZone,
      this.rows,
    ]);
    this.root.setDepth(30).setVisible(false).setAlpha(0);
    TABS.forEach((t, i) => this.buildTab(t, 48 + i * 148));
    this.root.add(this.tabButtons);
  }

  private buildTab(t: { id: ShopCategory; label: string }, x: number): void {
    const bg = this.scene.add.graphics();
    const label = this.scene.add
      .text(x + 70, 228, t.label, {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '15px',
        color: THEME.cocoa,
      })
      .setOrigin(0.5, 0.5);
    const zone = this.scene.add
      .zone(x + 70, 228, 140, 36)
      .setInteractive({ useHandCursor: true });
    zone.on('pointerdown', () => {
      this.tab = t.id;
      this.paintTabs();
      this.renderRows();
    });
    const btn = this.scene.add.container(0, 0, [bg, label, zone]);
    btn.setData('bg', bg);
    btn.setData('tabId', t.id);
    this.tabButtons.push(btn);
  }

  private paintTabs(): void {
    this.tabButtons.forEach((btn, i) => {
      const bg = btn.getData('bg') as Phaser.GameObjects.Graphics;
      const active = btn.getData('tabId') === this.tab;
      bg.clear();
      bg.fillStyle(active ? THEME.sage : THEME.cardFill, 1);
      bg.lineStyle(2, THEME.outline, 1);
      bg.fillRoundedRect(48 + i * 148, 210, 140, 36, 18);
      bg.strokeRoundedRect(48 + i * 148, 210, 140, 36, 18);
    });
  }

  private balance = 0;
  private owned: readonly string[] = [];

  show(balance: number, owned: readonly string[]): void {
    this.balance = balance;
    this.owned = owned;
    this.paintTabs();
    this.renderRows();
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

  refresh(balance: number, owned: readonly string[]): void {
    this.balance = balance;
    this.owned = owned;
    if (this.isOpen) this.renderRows();
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

  private renderRows(): void {
    this.rows.removeAll(true);
    this.balanceText.setText(`${this.balance} coins`);
    // (balance nudges left of the ×.)
    this.balanceText.setX(452);
    itemsFor(this.tab).forEach((item, i) => {
      const y = 272 + i * 112;
      const owned = this.owned.includes(item.id);
      const name = this.scene.add
        .text(48, y, item.name, {
          fontFamily: THEME.font,
          fontStyle: 'bold',
          fontSize: '18px',
          color: owned ? THEME.secondary : THEME.cocoa,
        })
        .setOrigin(0, 0);
      const blurb = this.scene.add
        .text(48, y + 26, item.blurb, {
          fontFamily: THEME.font,
          fontSize: '14px',
          color: THEME.secondary,
          wordWrap: { width: 300 },
        })
        .setOrigin(0, 0);
      const btnLabel = item.soon ? 'Soon' : owned ? 'Owned' : `${item.cost} coins`;
      const btnBg = this.scene.add.graphics();
      btnBg.fillStyle(item.soon || owned ? THEME.cardFill : THEME.sage, 1);
      btnBg.lineStyle(2, THEME.outline, 1);
      btnBg.fillRoundedRect(382, y, 110, 36, 18);
      btnBg.strokeRoundedRect(382, y, 110, 36, 18);
      const btnText = this.scene.add
        .text(437, y + 18, btnLabel, {
          fontFamily: THEME.font,
          fontStyle: 'bold',
          fontSize: '14px',
          color: THEME.cocoa,
        })
        .setOrigin(0.5, 0.5);
      const row = this.scene.add.container(0, 0, [name, blurb, btnBg, btnText]);
      if (!item.soon && !owned) {
        const zone = this.scene.add
          .zone(437, y + 18, 110, 36)
          .setInteractive({ useHandCursor: true });
        zone.on('pointerdown', () => this.onBuy(item));
        row.add(zone);
      }
      this.rows.add(row);
    });
  }
}
