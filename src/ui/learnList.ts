import Phaser from 'phaser';
import { FALLBACK_RESOURCES } from '../data/fallbackPack';
import type { FallbackResource } from '../data/fallbackPack';
import { THEME } from './chromeTheme';

/**
 * E1 Learning List: the formal-education submenu (submenu ONLY —
 * never on the main screen, per the uncluttered-main law). Rows
 * open in-app COLLECTOR CARDS: a pre-cached plain-language
 * summary (learning_resources.summary, Supabase + fallback)
 * with the authoritative link tucked inside as "Read more" —
 * players never leave the game to read. Read rows flip to
 * "read"; their card carries a Collected stamp.
 *
 * Geometry: full sheet x24-516, y136-876 like Waiting/Portal.
 * Card x48-492 y216-600; buttons placed by measured text.
 * Depth 24.
 */

/** Pure: resources for one condition (unit-tested). */
export function resourcesFor(conditionId: string): FallbackResource[] {
  return FALLBACK_RESOURCES.filter((r) => r.condition_id === conditionId);
}

/** One filed topic: its resource + the condition that filed it. */
export interface FiledTopic {
  resource: FallbackResource;
  conditionName: string;
}

/**
 * Pure: flatten filed conditions (visit order) into topics
 * (unit-tested). The list accumulates — it never drops a topic
 * for a newer one.
 */
export function filedTopics(filed: { id: string; name: string }[]): FiledTopic[] {
  return filed.flatMap((c) =>
    resourcesFor(c.id).map((resource) => ({ resource, conditionName: c.name })),
  );
}

export class LearnList {
  private root: Phaser.GameObjects.Container;
  private sheet: Phaser.GameObjects.Graphics;
  private title: Phaser.GameObjects.Text;
  private body: Phaser.GameObjects.Container;
  private isOpen = false;
  private lastFiled: { id: string; name: string }[] = [];
  private lastOpened: ReadonlySet<string> = new Set();
  onOpen: (resource: FallbackResource) => void = () => {};
  /** "Read more" inside a card (the ONLY external link). */
  onExternal: (resource: FallbackResource) => void = () => {};
  /** Fired only by the × button (programmatic hide() stays silent). */
  onClose: () => void = () => {};

  constructor(private scene: Phaser.Scene) {
    this.sheet = this.scene.add.graphics();
    this.sheet.fillStyle(THEME.cream, THEME.glassSheet);
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
    closeZone.on('pointerdown', () => {
      this.hide();
      this.onClose();
    });
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

  /**
   * The accumulated list: every filed condition's topics in
   * visit order. `opened` marks read topics (their +2 is
   * spent); unread rows offer it.
   */
  show(filed: { id: string; name: string }[], opened: ReadonlySet<string>): void {
    this.lastFiled = filed;
    this.lastOpened = opened;
    this.body.removeAll(true);
    this.title.setText('Learning List');
    const rows = filedTopics(filed);
    rows.forEach(({ resource: r, conditionName }, i) => {
      const y = 216 + i * 108;
      const read = opened.has(r.id);
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
        .text(
          68,
          y + 50,
          `${r.source} \u00b7 ${conditionName} \u00b7 ${read ? 'read' : '+2 on first read'}`,
          {
            fontFamily: THEME.font,
            fontSize: '15px',
            color: THEME.secondary,
          },
        )
        .setOrigin(0, 0);
      const row = this.scene.add.container(0, 0, [bg, name, src]);
      const zone = this.scene.add
        .zone(270, y + 48, 444, 96)
        .setInteractive({ useHandCursor: true });
      zone.on('pointerdown', () => {
        this.onOpen(r);
        this.showCard(r);
      });
      row.add(zone);
      this.body.add(row);
    });
    if (rows.length === 0) {
      const empty = this.scene.add
        .text(270, 300, 'Finish a visit to file topics here.', {
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

  /** Collector card: the cached summary + tucked-in web link. */
  showCard(r: FallbackResource): void {
    this.body.removeAll(true);
    this.title.setText('Learning List');
    const bg = this.scene.add.graphics();
    bg.fillStyle(THEME.cardFill, 1);
    bg.lineStyle(2, THEME.outline, 1);
    bg.fillRoundedRect(48, 216, 444, 384, 16);
    bg.strokeRoundedRect(48, 216, 444, 384, 16);
    const name = this.scene.add
      .text(72, 236, r.title, {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '21px',
        color: THEME.cocoa,
      })
      .setOrigin(0, 0);
    const collected = this.lastOpened.has(r.id);
    if (collected) {
      const stamp = this.scene.add
        .text(468, 240, 'Collected', {
          fontFamily: THEME.font,
          fontStyle: 'bold',
          fontSize: '15px',
          color: THEME.leaf,
        })
        .setOrigin(1, 0);
      this.body.add(stamp);
    }
    const src = this.scene.add
      .text(72, 268, `${r.source} · pre-read summary`, {
        fontFamily: THEME.font,
        fontSize: '14px',
        color: THEME.secondary,
      })
      .setOrigin(0, 0);
    const summary = this.scene.add
      .text(72, 296, r.summary, {
        fontFamily: THEME.font,
        fontSize: '16px',
        color: THEME.cocoa,
        wordWrap: { width: 396 },
        lineSpacing: 4,
      })
      .setOrigin(0, 0);
    // Buttons ride below the measured summary (summaries vary).
    const by = 296 + summary.height + 20;
    const backBg = this.scene.add.graphics();
    backBg.fillStyle(THEME.cardFill, 1);
    backBg.lineStyle(2, THEME.outline, 1);
    backBg.fillRoundedRect(72, by, 188, 48, 24);
    backBg.strokeRoundedRect(72, by, 188, 48, 24);
    const backText = this.scene.add
      .text(166, by + 24, 'Back', {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '17px',
        color: THEME.cocoa,
      })
      .setOrigin(0.5, 0.5);
    const backZone = this.scene.add
      .zone(166, by + 24, 188, 48)
      .setInteractive({ useHandCursor: true });
    backZone.on('pointerdown', () => this.show(this.lastFiled, this.lastOpened));
    const moreBg = this.scene.add.graphics();
    moreBg.fillStyle(THEME.sage, 1);
    moreBg.lineStyle(2, THEME.outline, 1);
    moreBg.fillRoundedRect(276, by, 192, 48, 24);
    moreBg.strokeRoundedRect(276, by, 192, 48, 24);
    const moreText = this.scene.add
      .text(372, by + 24, 'Read more', {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '17px',
        color: '#ffffff',
      })
      .setOrigin(0.5, 0.5);
    const moreZone = this.scene.add
      .zone(372, by + 24, 192, 48)
      .setInteractive({ useHandCursor: true });
    moreZone.on('pointerdown', () => this.onExternal(r));
    this.body.add([bg, name, src, summary, backBg, backText, backZone, moreBg, moreText, moreZone]);
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
