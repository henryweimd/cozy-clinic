import Phaser from 'phaser';
import { HANDOFF_PRESETS, doctorByline, handoffText } from '../data/sharedCare';
import type { CareTier, HandoffNote } from '../data/sharedCare';
import { THEME } from './chromeTheme';

/**
 * M4 care-notes sheet: incoming handoff notes for one patient
 * (memory continuity — what the last doctor told them) plus a
 * preset picker to leave a note for the next doctor. No typing
 * anywhere: presets only, summary auto-written by the game.
 *
 * Geometry: full sheet x24-516, y136-876 like Waiting/Learn.
 * Incoming shows the newest 2; 6 preset rows; Send button.
 * Depth 24.
 */

export interface HandoffSheetState {
  patientName: string;
  /** Newest-first notes for this patient. */
  notes: HandoffNote[];
  tier: CareTier;
  /** Selected preset id (null = none yet). */
  selected: string | null;
  /** True when the notes are offline fallback samples. */
  offline: boolean;
}

export class HandoffSheet {
  private root: Phaser.GameObjects.Container;
  private sheet: Phaser.GameObjects.Graphics;
  private title: Phaser.GameObjects.Text;
  private body: Phaser.GameObjects.Container;
  private isOpen = false;
  onSelect: (presetId: string) => void = () => {};
  onSend: () => void = () => {};
  onCheer: (toHandle: string) => void = () => {};
  /** Fired only by the × button (programmatic hide() stays silent). */
  onClose: () => void = () => {};

  constructor(private scene: Phaser.Scene) {
    this.sheet = this.scene.add.graphics();
    this.sheet.fillStyle(THEME.cream, THEME.glassSheet);
    this.sheet.lineStyle(3, THEME.outline, 1);
    this.sheet.fillRoundedRect(24, 136, 492, 740, 24);
    this.sheet.strokeRoundedRect(24, 136, 492, 740, 24);
    this.title = this.scene.add
      .text(48, 172, 'Care notes', {
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

  show(state: HandoffSheetState): void {
    this.body.removeAll(true);
    this.title.setText(
      state.offline ? `Care notes — ${state.patientName} (offline)` : `Care notes — ${state.patientName}`,
    );
    let y = 208;
    // Incoming: newest 2 (each up to 2 lines at 15px).
    const incoming = state.notes.slice(0, 2);
    if (incoming.length === 0) {
      this.body.add(
        this.scene.add
          .text(48, y + 14, 'No notes yet — you go first.', {
            fontFamily: THEME.font,
            fontSize: '15px',
            color: THEME.secondary,
          })
          .setOrigin(0, 0),
      );
      y += 44;
    }
    for (const n of incoming) {
      const bg = this.scene.add.graphics();
      bg.fillStyle(THEME.cardFill, 1);
      bg.lineStyle(2, THEME.outline, 1);
      bg.fillRoundedRect(48, y, 444, 84, 14);
      bg.strokeRoundedRect(48, y, 444, 84, 14);
      const line = this.scene.add
        .text(64, y + 8, `${doctorByline(n.from_handle, n.team_tag)}: ${handoffText(n.preset_id, state.tier)}`, {
          fontFamily: THEME.font,
          fontStyle: 'bold',
          fontSize: '15px',
          color: THEME.cocoa,
          wordWrap: { width: 292 },
        })
        .setOrigin(0, 0);
      const sub = this.scene.add
        .text(64, y + 58, n.encounter_summary, {
          fontFamily: THEME.font,
          fontSize: '13px',
          color: THEME.secondary,
        })
        .setOrigin(0, 0);
      const cheerBg = this.scene.add.graphics();
      cheerBg.fillStyle(THEME.amber, 1);
      cheerBg.fillRoundedRect(372, y + 22, 108, 40, 20);
      const cheerText = this.scene.add
        .text(426, y + 42, 'Cheer!', {
          fontFamily: THEME.font,
          fontStyle: 'bold',
          fontSize: '15px',
          color: '#ffffff',
        })
        .setOrigin(0.5, 0.5);
      const cheerZone = this.scene.add
        .zone(426, y + 42, 108, 40)
        .setInteractive({ useHandCursor: true });
      cheerZone.on('pointerdown', () => this.onCheer(n.from_handle));
      this.body.add([bg, line, sub, cheerBg, cheerText, cheerZone]);
      y += 94;
    }
    // Compose header.
    this.body.add(
      this.scene.add
        .text(48, y + 8, 'Leave a note for the next doctor:', {
          fontFamily: THEME.font,
          fontStyle: 'bold',
          fontSize: '16px',
          color: THEME.cocoa,
        })
        .setOrigin(0, 0),
    );
    y += 36;
    // Preset rows (compact single-line).
    for (const p of HANDOFF_PRESETS) {
      const picked = state.selected === p.id;
      const bg = this.scene.add.graphics();
      bg.fillStyle(picked ? THEME.sage : THEME.cardFill, picked ? 0.5 : 1);
      bg.lineStyle(2, THEME.outline, 1);
      bg.fillRoundedRect(48, y, 444, 44, 12);
      bg.strokeRoundedRect(48, y, 444, 44, 12);
      const label = this.scene.add
        .text(64, y + 22, handoffText(p.id, state.tier), {
          fontFamily: THEME.font,
          fontSize: '15px',
          color: THEME.cocoa,
        })
        .setOrigin(0, 0.5);
      const zone = this.scene.add
        .zone(270, y + 22, 444, 44)
        .setInteractive({ useHandCursor: true });
      zone.on('pointerdown', () => this.onSelect(p.id));
      this.body.add([bg, label, zone]);
      y += 50;
    }
    // Send button (needs a selected preset).
    const ready = state.selected !== null;
    const sendBg = this.scene.add.graphics();
    sendBg.fillStyle(ready ? THEME.sage : THEME.cardFill, 1);
    sendBg.lineStyle(2, THEME.outline, 1);
    sendBg.fillRoundedRect(150, y + 6, 240, 48, 24);
    sendBg.strokeRoundedRect(150, y + 6, 240, 48, 24);
    const sendText = this.scene.add
      .text(270, y + 30, ready ? 'Send note' : 'Pick one above', {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '17px',
        color: ready ? '#ffffff' : THEME.secondary,
      })
      .setOrigin(0.5, 0.5);
    const sendZone = this.scene.add
      .zone(270, y + 30, 240, 48)
      .setInteractive({ useHandCursor: true });
    sendZone.on('pointerdown', () => {
      if (state.selected !== null) this.onSend();
    });
    this.body.add([sendBg, sendText, sendZone]);

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
