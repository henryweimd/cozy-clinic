import Phaser from 'phaser';
import { THEME } from './chromeTheme';

/**
 * V1 dev asset browser: a staff-terminal tab for reviewing
 * ALTERNATE graphic assets on-device. Two tabs (PLATES = the 8
 * backdrop plates with live thumbnails, FACES = the active
 * patient's 6 expression frames); tap any thumb for a large
 * preview plus the exact paste-back snippet that applies it
 * (the operator pastes the snippet into the main Muse Code
 * session). Dev-only, depth 32, follows the monitor.
 */

export type BrowserTab = 'plates' | 'faces';

interface BrowserItem {
  /** Short label under the thumb. */
  label: string;
  /** Loaded texture key to render. */
  texture: string;
  /** Verbatim paste-back snippet (empty = informational). */
  snippet: string;
  /** One-line note under the snippet. */
  note: string;
}

const PLATE_VIEWS: Record<string, string> = {
  'exam-a': 'visit',
  'exam-b': 'visit',
  'waiting-a': 'waiting',
  'waiting-b': 'waiting',
  'telemed-a': 'telemed',
  'telemed-b': 'telemed',
  'portal-a': 'portal',
  'portal-b': 'portal',
};

export function plateItems(): BrowserItem[] {
  return Object.keys(PLATE_VIEWS).map((slug) => {
    const view = PLATE_VIEWS[slug] ?? 'visit';
    return {
      label: slug,
      texture: `plate-${slug}`,
      snippet: `PLATE_PIN = { ${view}: '${slug}' }`,
      note: `ClinicScene.ts PLATE_PIN; or tell me: use ${slug} for ${view}`,
    };
  });
}

export function faceItems(prefix: string, name: string): BrowserItem[] {
  const frames: [string, string][] = [
    ['idle', 'resting face'],
    ['blink', '120ms blink'],
    ['happy', 'tap bounce'],
    ['sick', 'steady stage 2'],
    ['pained', 'steady stage 3 / flash'],
    ['relieved', 'steady stage 0 / flash'],
  ];
  return frames.map(([frame, use]) => ({
    label: frame,
    texture: `${prefix}-${frame}`,
    snippet: '',
    note: `${name} ${frame}: ${use} (steady map; no snippet)`,
  }));
}

export class AssetBrowser {
  private root: Phaser.GameObjects.Container;
  private body: Phaser.GameObjects.Container;
  private previewImg: Phaser.GameObjects.Image | null = null;
  private snippetText: Phaser.GameObjects.Text;
  private noteText: Phaser.GameObjects.Text;
  private tabTexts: Record<BrowserTab, Phaser.GameObjects.Text> = {} as Record<
    BrowserTab,
    Phaser.GameObjects.Text
  >;
  private tab: BrowserTab = 'plates';
  private isOpen = false;
  onBack: () => void = () => {};

  constructor(private scene: Phaser.Scene) {
    const frame = this.scene.add.graphics();
    frame.fillStyle(0x6b4a2f, 1);
    frame.fillRoundedRect(36, 150, 468, 550, 16);
    frame.fillStyle(0x0e1b14, 1);
    frame.fillRoundedRect(42, 156, 456, 538, 12);
    const title = this.scene.add
      .text(64, 178, 'ASSET BROWSER', {
        fontFamily: THEME.mono,
        fontStyle: 'bold',
        fontSize: '17px',
        color: '#e8c96a',
      })
      .setOrigin(0, 0);
    const mkTab = (label: string, x: number, tab: BrowserTab): void => {
      const t = this.scene.add
        .text(x, 178, label, {
          fontFamily: THEME.mono,
          fontStyle: 'bold',
          fontSize: '15px',
          color: '#9fe8b8',
        })
        .setOrigin(0, 0);
      this.tabTexts[tab] = t;
      const z = this.scene.add.zone(x + 34, 186, 76, 28).setInteractive({ useHandCursor: true });
      z.on('pointerdown', () => this.showTab(tab));
      this.root.add([t, z]);
    };
    this.body = this.scene.add.container(0, 0, []);
    this.snippetText = this.scene.add
      .text(200, 540, 'tap a thumb to preview', {
        fontFamily: THEME.mono,
        fontSize: '13px',
        color: '#eaf5e9',
        wordWrap: { width: 280 },
      })
      .setOrigin(0, 0);
    this.noteText = this.scene.add
      .text(200, 596, '', {
        fontFamily: THEME.mono,
        fontSize: '12px',
        color: '#9fe8b8',
        wordWrap: { width: 280 },
      })
      .setOrigin(0, 0);
    const back = this.scene.add
      .text(476, 656, '‹ BACK', {
        fontFamily: THEME.mono,
        fontStyle: 'bold',
        fontSize: '15px',
        color: '#e8c96a',
      })
      .setOrigin(1, 0);
    const backZone = this.scene.add
      .zone(444, 664, 80, 32)
      .setInteractive({ useHandCursor: true });
    backZone.on('pointerdown', () => this.hide());
    this.root = this.scene.add.container(0, 0, [
      frame,
      title,
      this.body,
      this.snippetText,
      this.noteText,
      back,
      backZone,
    ]);
    this.root.setDepth(32).setVisible(false);
    // Tabs need root to exist — build after.
    mkTab('[PLATES]', 300, 'plates');
    mkTab('[FACES]', 392, 'faces');
  }

  show(tab: BrowserTab, facePrefix = 'mabel', faceName = 'Mabel'): void {
    this.body.setData('prefix', facePrefix);
    this.body.setData('name', faceName);
    this.showTab(tab);
    this.isOpen = true;
    this.root.setVisible(true);
  }

  hide(): void {
    this.isOpen = false;
    this.root.setVisible(false);
    this.onBack();
  }

  get open(): boolean {
    return this.isOpen;
  }

  private showTab(tab: BrowserTab): void {
    this.tab = tab;
    (Object.keys(this.tabTexts) as BrowserTab[]).forEach((t) => {
      this.tabTexts[t].setColor(t === tab ? '#e8c96a' : '#9fe8b8');
    });
    // Prefix/name persist via the last rebuild's stored labels.
    const prefix = this.body.getData('prefix') as string | undefined;
    const name = this.body.getData('name') as string | undefined;
    this.rebuild(prefix ?? 'mabel', name ?? 'Mabel');
  }

  private rebuild(facePrefix: string, faceName: string): void {
    this.body.removeAll(true);
    this.body.setData('prefix', facePrefix);
    this.body.setData('name', faceName);
    const items = this.tab === 'plates' ? plateItems() : faceItems(facePrefix, faceName);
    // Thumb grid: 4 across, y212-500.
    items.forEach((item, i) => {
      const col = i % 4;
      const row = Math.floor(i / 4);
      const cx = 110 + col * 106;
      const cy = 268 + row * 140;
      const bg = this.scene.add.graphics();
      bg.fillStyle(0x1d2b22, 1);
      bg.fillRoundedRect(cx - 48, cy - 56, 96, 112, 8);
      const img = this.scene.add.image(cx, cy - 8, item.texture);
      // Plates are 9:16, faces square.
      if (this.tab === 'plates') img.setDisplaySize(72, 96);
      else img.setDisplaySize(72, 72);
      const label = this.scene.add
        .text(cx, cy + 42, item.label, {
          fontFamily: THEME.mono,
          fontSize: '11px',
          color: '#9fe8b8',
        })
        .setOrigin(0.5, 0.5);
      const zone = this.scene.add
        .zone(cx, cy, 96, 112)
        .setInteractive({ useHandCursor: true });
      zone.on('pointerdown', () => this.preview(item));
      this.body.add([bg, img, label, zone]);
    });
    // Preview pane: image left (x92-188), snippet right.
    this.snippetText.setText('tap a thumb to preview');
    this.noteText.setText('');
    const stale = this.previewImg;
    this.previewImg = null;
    if (stale) stale.destroy();
  }

  private preview(item: BrowserItem): void {
    const stale = this.previewImg;
    this.previewImg = null;
    if (stale) stale.destroy();
    this.previewImg = this.scene.add.image(140, 586, item.texture);
    if (this.tab === 'plates') this.previewImg.setDisplaySize(72, 96);
    else this.previewImg.setDisplaySize(88, 88);
    this.root.add(this.previewImg);
    this.snippetText.setText(item.snippet === '' ? '(no snippet — steady map)' : item.snippet);
    this.noteText.setText(item.note);
  }
}
