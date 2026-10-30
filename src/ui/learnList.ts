import Phaser from 'phaser';
import { FALLBACK_RESOURCES } from '../data/fallbackPack';
import type { FallbackResource } from '../data/fallbackPack';
import { EARN_QUIZ_PASS } from '../game/economy';
import { THEME } from './chromeTheme';
import { drawCoin } from './icons';

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
 * Card x48-492 y208-870 (fixed): art header, summary, then the
 * prize quiz inline at the bottom — answer, read more, or back.
 * Depth 24.
 */

/** Pure: the card's art key from its condition (preload contract). */
export function learnArtKey(conditionId: string): string {
  return `learn-${conditionId}`;
}

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

/** Quiz pill state: read first (locked), then prize (open), then done. */
export type QuizState = 'locked' | 'open' | 'passed';

/** Pure: quiz availability from read + passed sets (unit-tested). */
export function quizState(read: boolean, passed: boolean): QuizState {
  if (passed) return 'passed';
  return read ? 'open' : 'locked';
}

export class LearnList {
  private root: Phaser.GameObjects.Container;
  private sheet: Phaser.GameObjects.Graphics;
  private title: Phaser.GameObjects.Text;
  private body: Phaser.GameObjects.Container;
  private isOpen = false;
  private lastFiled: { id: string; name: string }[] = [];
  private lastOpened: ReadonlySet<string> = new Set();
  /** Local pass marks (the scene's set is truth on next show). */
  private localPassed = new Set<string>();
  onOpen: (resource: FallbackResource) => void = () => {};
  /** "Read more" inside a card (the ONLY external link). */
  onExternal: (resource: FallbackResource) => void = () => {};
  /**
   * Correct quiz pick: the scene pays the prize (once per
   * topic — it owns the passed set) and returns the coins so
   * the result card can name them.
   */
  onQuizPass: (resource: FallbackResource) => number = () => 0;
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
   * spent); unread rows offer it. `passed` marks quizzed
   * topics; read-but-unpassed rows offer the prize pill.
   */
  show(
    filed: { id: string; name: string }[],
    opened: ReadonlySet<string>,
    passed: ReadonlySet<string> = new Set(),
  ): void {
    this.lastFiled = filed;
    this.lastOpened = opened;
    this.localPassed = new Set(passed);
    this.body.removeAll(true);
    this.title.setText('Learning List');
    const rows = filedTopics(filed);
    rows.forEach(({ resource: r, conditionName }, i) => {
      const y = 216 + i * 108;
      const read = opened.has(r.id);
      const quiz = quizState(read, this.localPassed.has(r.id));
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
      if (quiz === 'open') {
        // Prize pill: sits above the row zone (topOnly gives it
        // the tap) and opens the quiz, not the card.
        // Prize pill: a coin +5, never the word "quiz" (work
        // words stay out of the list). Opens the card — the
        // quiz lives at the card's bottom.
        const pillBg = this.scene.add.graphics();
        pillBg.fillStyle(THEME.sage, 1);
        pillBg.lineStyle(2, THEME.outline, 1);
        pillBg.fillRoundedRect(376, y + 24, 100, 48, 24);
        pillBg.strokeRoundedRect(376, y + 24, 100, 48, 24);
        drawCoin(pillBg, 400, y + 48, 9);
        const pillText = this.scene.add
          .text(440, y + 48, `+${EARN_QUIZ_PASS}`, {
            fontFamily: THEME.font,
            fontStyle: 'bold',
            fontSize: '16px',
            color: '#ffffff',
          })
          .setOrigin(0.5, 0.5);
        const pillZone = this.scene.add
          .zone(426, y + 48, 100, 48)
          .setInteractive({ useHandCursor: true });
        pillZone.on('pointerdown', () => this.showCard(r));
        row.add([pillBg, pillText, pillZone]);
      } else if (quiz === 'passed') {
        const stamp = this.scene.add
          .text(476, y + 48, 'Passed', {
            fontFamily: THEME.font,
            fontStyle: 'bold',
            fontSize: '15px',
            color: THEME.leaf,
          })
          .setOrigin(1, 0.5);
        row.add(stamp);
      }
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

  /**
   * Collector card: art header, cached summary, then the prize
   * quiz INLINE at the bottom — answer it, read more, or back.
   * Fixed geometry (the auditor budgets every string): art
   * 224..384, summary 444..570, quiz head 582, stem 604, picks
   * 662/706/750, pearl slot 772, buttons 826..862.
   */
  showCard(r: FallbackResource): void {
    this.body.removeAll(true);
    const bg = this.scene.add.graphics();
    bg.fillStyle(THEME.cardFill, 1);
    bg.lineStyle(3, THEME.outline, 1);
    bg.fillRoundedRect(48, 208, 444, 662, 24);
    bg.strokeRoundedRect(48, 208, 444, 662, 24);
    this.body.add(bg);
    // Art header (missing texture degrades to a sage panel —
    // the card never shows a broken image).
    const artKey = learnArtKey(r.condition_id);
    if (this.scene.textures.exists(artKey)) {
      const art = this.scene.add.image(270, 304, artKey).setDisplaySize(412, 160);
      const frame = this.scene.add.graphics();
      frame.lineStyle(2, THEME.outline, 1);
      frame.strokeRect(64, 224, 412, 160);
      this.body.add([art, frame]);
    } else {
      const panel = this.scene.add.graphics();
      panel.fillStyle(THEME.sage, 1);
      panel.fillRect(64, 224, 412, 160);
      this.body.add(panel);
    }
    const title = this.scene.add
      .text(72, 400, r.title, {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '21px',
        color: THEME.cocoa,
      })
      .setOrigin(0, 0.5);
    this.body.add(title);
    if (this.lastOpened.has(r.id)) {
      const stamp = this.scene.add
        .text(468, 400, 'Collected', {
          fontFamily: THEME.font,
          fontStyle: 'bold',
          fontSize: '15px',
          color: THEME.leaf,
        })
        .setOrigin(1, 0.5);
      this.body.add(stamp);
    }
    const src = this.scene.add
      .text(72, 430, `${r.source} · pre-read summary`, {
        fontFamily: THEME.font,
        fontSize: '14px',
        color: THEME.secondary,
      })
      .setOrigin(0, 0.5);
    this.body.add(src);
    const body = this.scene.add
      .text(72, 444, r.summary, {
        fontFamily: THEME.font,
        fontSize: '14px',
        color: THEME.secondary,
        wordWrap: { width: 396 },
        lineSpacing: 2,
      })
      .setOrigin(0, 0);
    this.body.add(body);
    // Quiz head: coin + prize, then the stem — no "quiz" word.
    const head = this.scene.add.graphics();
    drawCoin(head, 82, 582, 8);
    this.body.add(head);
    const prize = this.scene.add
      .text(96, 582, `+${EARN_QUIZ_PASS}`, {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '14px',
        color: THEME.leaf,
      })
      .setOrigin(0, 0.5);
    this.body.add(prize);
    const stem = this.scene.add
      .text(72, 604, r.quiz.stem, {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '15px',
        color: THEME.cocoa,
        wordWrap: { width: 396 },
      })
      .setOrigin(0, 0);
    this.body.add(stem);
    // Picks + pearl slot. Wrong taps mark and invite retry;
    // the right one pays (scene-guarded, once) and teaches.
    const pickBgs: Phaser.GameObjects.Graphics[] = [];
    let done = this.localPassed.has(r.id);
    const slot = this.scene.add
      .text(72, 772, '', {
        fontFamily: THEME.font,
        fontSize: '14px',
        color: THEME.secondary,
        wordWrap: { width: 396 },
      })
      .setOrigin(0, 0);
    const mark = (i: number, good: boolean): void => {
      const g = pickBgs[i];
      const cy = 662 + i * 44;
      g.clear();
      g.fillStyle(good ? THEME.sage : 0xe8a0a0, 1);
      g.lineStyle(2, THEME.outline, 1);
      g.fillRoundedRect(72, cy - 20, 396, 40, 20);
      g.strokeRoundedRect(72, cy - 20, 396, 40, 20);
    };
    r.quiz.choices.forEach((choice, i) => {
      const cy = 662 + i * 44;
      const cbg = this.scene.add.graphics();
      const correct = i === r.quiz.answer;
      cbg.fillStyle(correct && done ? THEME.sage : THEME.cardFill, 1);
      cbg.lineStyle(2, THEME.outline, 1);
      cbg.fillRoundedRect(72, cy - 20, 396, 40, 20);
      cbg.strokeRoundedRect(72, cy - 20, 396, 40, 20);
      pickBgs.push(cbg);
      const clabel = this.scene.add
        .text(92, cy, choice, {
          fontFamily: THEME.font,
          fontStyle: 'bold',
          fontSize: '16px',
          color: correct && done ? '#ffffff' : THEME.cocoa,
        })
        .setOrigin(0, 0.5);
      const czone = this.scene.add
        .zone(270, cy, 396, 40)
        .setInteractive({ useHandCursor: true });
      czone.on('pointerdown', () => {
        if (done) return;
        if (correct) {
          done = true;
          this.localPassed.add(r.id);
          mark(i, true);
          clabel.setColor('#ffffff');
          slot.setText(r.quiz.pearl);
          this.onQuizPass(r);
        } else {
          mark(i, false);
          slot.setText('Not quite — try again.');
        }
      });
      this.body.add([cbg, clabel, czone]);
    });
    if (done) slot.setText(r.quiz.pearl);
    else slot.setText(`Answer above to earn +${EARN_QUIZ_PASS} coins`);
    this.body.add(slot);
    // Back + Read more ride the card's bottom edge.
    const backBg = this.scene.add.graphics();
    backBg.fillStyle(THEME.cardFill, 1);
    backBg.lineStyle(2, THEME.outline, 1);
    backBg.fillRoundedRect(72, 826, 188, 36, 18);
    backBg.strokeRoundedRect(72, 826, 188, 36, 18);
    const back = this.scene.add
      .text(166, 844, 'Back', {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '17px',
        color: THEME.cocoa,
      })
      .setOrigin(0.5, 0.5);
    const backZone = this.scene.add
      .zone(166, 844, 188, 36)
      .setInteractive({ useHandCursor: true });
    backZone.on('pointerdown', () => {
      this.show(this.lastFiled, this.lastOpened, this.localPassed);
    });
    const moreBg = this.scene.add.graphics();
    moreBg.fillStyle(THEME.cardFill, 1);
    moreBg.lineStyle(2, THEME.outline, 1);
    moreBg.fillRoundedRect(276, 826, 192, 36, 18);
    moreBg.strokeRoundedRect(276, 826, 192, 36, 18);
    const more = this.scene.add
      .text(372, 844, 'Read more', {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '17px',
        color: THEME.cocoa,
      })
      .setOrigin(0.5, 0.5);
    const moreZone = this.scene.add
      .zone(372, 844, 192, 36)
      .setInteractive({ useHandCursor: true });
    moreZone.on('pointerdown', () => this.onExternal(r));
    this.body.add([backBg, back, backZone, moreBg, more, moreZone]);
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
