import { THEME } from './chromeTheme';

export type ProfileKind = 'doctor' | 'team';

/**
 * Profile editor: preset chips + one typed name. Tap a preset to
 * save instantly; "Write your own…" opens a real keyboard input
 * (the ONLY typed text in the game — profile identity, never
 * clinical). The DOM input floats over the canvas bed, positioned
 * from the canvas rect each show (FIT scaling safe).
 *
 * Geometry: card x48-492; pick card y220-500 (doctor) / y220-444
 * (team); write card y220-500 both. Depth 30. The scene owns
 * persistence + toasts via onSave/onError.
 */

const TITLE: Record<ProfileKind, string> = {
  doctor: 'Your Doctor',
  team: 'Your Practice',
};

const PROMPT: Record<ProfileKind, string> = {
  doctor: 'Type a name for your doctor:',
  team: 'Type a name for your practice:',
};

const PLACEHOLDER: Record<ProfileKind, string> = {
  doctor: 'e.g. Amir',
  team: 'e.g. Sunnyvale',
};

const MAXLEN: Record<ProfileKind, number> = { doctor: 16, team: 20 };

// Input bed in game coords (DOM input covers this exactly).
const BED = { x: 72, y: 336, w: 396, h: 52 };

export class ProfileEditor {
  onSave: (kind: ProfileKind, value: string) => void = () => {};
  private root: Phaser.GameObjects.Container;
  private card: Phaser.GameObjects.Graphics;
  private title: Phaser.GameObjects.Text;
  private body: Phaser.GameObjects.Container;
  private kind: ProfileKind = 'doctor';
  private current = '';
  private presets: readonly string[] = [];
  private isOpen = false;
  private input: HTMLInputElement | null = null;

  constructor(private scene: Phaser.Scene) {
    const backdrop = this.scene.add
      .zone(270, 480, 540, 960)
      .setInteractive({ useHandCursor: false });
    backdrop.on('pointerdown', () => this.hide());
    this.card = this.scene.add.graphics();
    this.title = this.scene.add
      .text(72, 260, '', {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '24px',
        color: THEME.cocoa,
      })
      .setOrigin(0, 0.5);
    const close = this.scene.add
      .text(468, 260, '×', {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '28px',
        color: THEME.secondary,
      })
      .setOrigin(0.5, 0.5);
    const closeZone = this.scene.add
      .zone(468, 260, 56, 56)
      .setInteractive({ useHandCursor: true });
    closeZone.on('pointerdown', () => this.hide());
    this.body = this.scene.add.container(0, 0, []);
    this.root = this.scene.add.container(0, 0, [
      backdrop,
      this.card,
      this.title,
      close,
      closeZone,
      this.body,
    ]);
    this.root.setDepth(30).setVisible(false).setAlpha(0);
    window.addEventListener('resize', this.reposition);
  }

  show(kind: ProfileKind, current: string, presets: readonly string[]): void {
    this.kind = kind;
    this.current = current;
    this.presets = presets;
    this.title.setText(TITLE[kind]);
    this.renderPick(current);
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
    this.hideInput();
    if (!this.isOpen) return;
    this.isOpen = false;
    this.scene.tweens.killTweensOf(this.root);
    this.root.setVisible(false).setAlpha(0);
  }

  get open(): boolean {
    return this.isOpen;
  }

  private drawCard(y0: number, y1: number): void {
    this.card.clear();
    this.card.fillStyle(THEME.cardFill, THEME.glassSheet);
    this.card.lineStyle(3, THEME.outline, 1);
    this.card.fillRoundedRect(48, y0, 444, y1 - y0, 24);
    this.card.strokeRoundedRect(48, y0, 444, y1 - y0, 24);
  }

  private renderPick(current: string): void {
    this.hideInput();
    this.body.removeAll(true);
    const rows = Math.ceil(this.presets.length / 3);
    const chipsEnd = 300 + rows * 52;
    this.drawCard(220, chipsEnd + 100);
    this.presets.forEach((preset, i) => {
      const cx = 48 + (i % 3) * 148;
      const cy = 300 + Math.floor(i / 3) * 52;
      const picked = preset === current;
      const bg = this.scene.add.graphics();
      bg.fillStyle(picked ? THEME.sage : THEME.cardFill, 1);
      bg.lineStyle(2, THEME.outline, 1);
      bg.fillRoundedRect(cx, cy, 140, 44, 22);
      bg.strokeRoundedRect(cx, cy, 140, 44, 22);
      const label = this.scene.add
        .text(cx + 70, cy + 22, preset, {
          fontFamily: THEME.font,
          fontStyle: 'bold',
          fontSize: '17px',
          color: picked ? '#ffffff' : THEME.cocoa,
        })
        .setOrigin(0.5, 0.5);
      const zone = this.scene.add
        .zone(cx + 70, cy + 22, 140, 44)
        .setInteractive({ useHandCursor: true });
      zone.on('pointerdown', () => this.onSave(this.kind, preset));
      this.body.add([bg, label, zone]);
    });
    const wy = chipsEnd + 16;
    const wbg = this.scene.add.graphics();
    wbg.fillStyle(THEME.cardFill, 1);
    wbg.lineStyle(2, THEME.outline, 1);
    wbg.fillRoundedRect(48, wy, 444, 48, 24);
    wbg.strokeRoundedRect(48, wy, 444, 48, 24);
    const wlabel = this.scene.add
      .text(270, wy + 24, 'Write your own…', {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '17px',
        color: THEME.cocoa,
      })
      .setOrigin(0.5, 0.5);
    const wzone = this.scene.add
      .zone(270, wy + 24, 444, 48)
      .setInteractive({ useHandCursor: true });
    wzone.on('pointerdown', () => this.renderWrite());
    this.body.add([wbg, wlabel, wzone]);
  }

  private renderWrite(): void {
    this.body.removeAll(true);
    this.drawCard(220, 500);
    const prompt = this.scene.add
      .text(72, 306, PROMPT[this.kind], {
        fontFamily: THEME.font,
        fontSize: '16px',
        color: THEME.secondary,
      })
      .setOrigin(0, 0);
    // Canvas bed under the DOM input (reads as an input row
    // even in the split second before the input positions).
    const bed = this.scene.add.graphics();
    bed.fillStyle(0xffffff, 1);
    bed.lineStyle(3, THEME.outline, 1);
    bed.fillRoundedRect(BED.x, BED.y, BED.w, BED.h, 14);
    bed.strokeRoundedRect(BED.x, BED.y, BED.w, BED.h, 14);
    const saveBg = this.scene.add.graphics();
    saveBg.fillStyle(THEME.sage, 1);
    saveBg.lineStyle(2, THEME.outline, 1);
    saveBg.fillRoundedRect(72, 408, 192, 48, 24);
    saveBg.strokeRoundedRect(72, 408, 192, 48, 24);
    const saveText = this.scene.add
      .text(168, 432, 'Save', {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '17px',
        color: '#ffffff',
      })
      .setOrigin(0.5, 0.5);
    const saveZone = this.scene.add
      .zone(168, 432, 192, 48)
      .setInteractive({ useHandCursor: true });
    saveZone.on('pointerdown', () => this.saveTyped());
    const backBg = this.scene.add.graphics();
    backBg.fillStyle(THEME.cardFill, 1);
    backBg.lineStyle(2, THEME.outline, 1);
    backBg.fillRoundedRect(276, 408, 192, 48, 24);
    backBg.strokeRoundedRect(276, 408, 192, 48, 24);
    const backText = this.scene.add
      .text(372, 432, 'Back', {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '17px',
        color: THEME.cocoa,
      })
      .setOrigin(0.5, 0.5);
    const backZone = this.scene.add
      .zone(372, 432, 192, 48)
      .setInteractive({ useHandCursor: true });
    backZone.on('pointerdown', () => this.renderPick(this.current));
    this.body.add([prompt, bed, saveBg, saveText, saveZone, backBg, backText, backZone]);
    this.showInput();
  }

  private saveTyped(): void {
    const value = this.input?.value ?? '';
    this.onSave(this.kind, value);
  }

  private ensureInput(): HTMLInputElement {
    if (this.input) return this.input;
    const el = document.createElement('input');
    el.type = 'text';
    el.autocomplete = 'off';
    el.autocapitalize = 'words';
    el.spellcheck = false;
    el.style.position = 'fixed';
    el.style.display = 'none';
    el.style.zIndex = '40';
    el.style.boxSizing = 'border-box';
    el.style.background = '#ffffff';
    el.style.border = '3px solid #8a5a3b';
    el.style.color = '#5c4633';
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.saveTyped();
      else if (e.key === 'Escape') this.renderPick(this.current);
    });
    document.body.appendChild(el);
    this.input = el;
    return el;
  }

  private showInput(): void {
    const el = this.ensureInput();
    el.maxLength = MAXLEN[this.kind];
    el.placeholder = PLACEHOLDER[this.kind];
    el.setAttribute('aria-label', PROMPT[this.kind]);
    el.value = '';
    el.style.display = 'block';
    this.reposition();
    // Focus after the sheet fade so the keyboard lands on content.
    window.setTimeout(() => el.focus({ preventScroll: true }), 200);
  }

  private hideInput(): void {
    if (this.input) {
      this.input.style.display = 'none';
      this.input.blur();
    }
  }

  /** Map the game-coord bed onto the scaled canvas. Idempotent. */
  private reposition = (): void => {
    if (!this.input || this.input.style.display === 'none') return;
    const canvas = this.scene.game.canvas;
    const rect = canvas.getBoundingClientRect();
    const sx = rect.width / 540;
    const sy = rect.height / 960;
    this.input.style.left = `${rect.left + BED.x * sx}px`;
    this.input.style.top = `${rect.top + BED.y * sy}px`;
    this.input.style.width = `${BED.w * sx}px`;
    this.input.style.height = `${BED.h * sy}px`;
    this.input.style.borderRadius = `${14 * Math.min(sx, sy)}px`;
    this.input.style.fontSize = `${18 * Math.min(sx, sy)}px`;
    this.input.style.padding = `0 ${12 * sx}px`;
    this.input.style.fontFamily = '"Baloo 2", system-ui, sans-serif';
  };
}
