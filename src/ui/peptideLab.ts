import Phaser from 'phaser';
import { designPeptide } from '../game/knottin';
import type { KnottinDesign } from '../game/knottin';
import { THEME } from './chromeTheme';

/**
 * Peptide Lab: the full-screen trial screen behind the
 * "Custom Knottin Probiotic" treatment arm (opensLab). A
 * SCREEN, not an overlay: consent first (experimental,
 * trial-ruled, proven-care-first, fictional future), then
 * the four-stage design pipeline (live via the proxy or the
 * cached demo design offline), then the result with an
 * external window onto the real Cozy Peptide site.
 *
 * Geometry: full sheet x24-516, y136-876 like Learn.
 * Consent: title, patient line, consent body, target box,
 * Design + external-link + Back. Designing: 4 stage rows
 * with status dots. Result: live/cached badge, sequence,
 * stats, provenance, external + Back. Depth 24.
 */

export const PEPTIDE_SITE = 'https://cozy-peptide.vercel.app/';

/** Pure: the consent body (unit-audited line budget). */
export function consentBody(): readonly string[] {
  return [
    'This is an experiment — not a cure. Real trials test new treatments under strict rules, and proven care always comes first.',
    'In this future story, scientists design tiny defender proteins and brew them inside gentle gut yeast. Your design helps your patient only inside the trial.',
  ];
}

const STAGES: readonly { name: string; sub: string }[] = [
  { name: 'Semantic proposal', sub: 'Muse Spark dreams candidates' },
  { name: 'Grammar + audit', sub: 'the compiler checks each one' },
  { name: 'Compiler repair', sub: 'fixing loops until it proves' },
  { name: 'Lab handoff', sub: 'a yeast cassette ships' },
];

type LabPhase = 'consent' | 'designing' | 'result';

export class PeptideLab {
  private root: Phaser.GameObjects.Container;
  private title: Phaser.GameObjects.Text;
  private body: Phaser.GameObjects.Container;
  private isOpen = false;
  private target = '';
  private patientName = '';
  private reducedMotion = false;
  private runId = 0;
  /** Fired by × / Back (programmatic hide() stays silent). */
  onClose: () => void = () => {};
  /** Ticker fodder for live runs (the scene guards visibility). */
  onTick: (line: string) => void = () => {};
  /** The ONLY external link: the real Cozy Peptide site. */
  onExternal: () => void = () => {};

  constructor(private scene: Phaser.Scene) {
    const sheet = this.scene.add.graphics();
    sheet.fillStyle(THEME.cream, THEME.glassSheet);
    sheet.lineStyle(3, THEME.outline, 1);
    sheet.fillRoundedRect(24, 136, 492, 740, 24);
    sheet.strokeRoundedRect(24, 136, 492, 740, 24);
    this.title = this.scene.add
      .text(48, 172, 'Peptide Lab', {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '26px',
        color: THEME.cocoa,
      })
      .setOrigin(0, 0.5);
    const close = this.scene.add
      .text(492, 172, '×', {
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
      sheet,
      this.title,
      close,
      closeZone,
      this.body,
    ]);
    this.root.setDepth(24).setVisible(false).setAlpha(0);
  }

  show(target: string, patientName: string, reducedMotion: boolean): void {
    this.target = target;
    this.patientName = patientName;
    this.reducedMotion = reducedMotion;
    this.runId += 1;
    this.isOpen = true;
    this.render('consent');
    this.root.setVisible(true).setAlpha(1);
  }

  hide(): void {
    this.runId += 1;
    this.isOpen = false;
    this.body.removeAll(true);
    this.root.setVisible(false).setAlpha(0);
  }

  get open(): boolean {
    return this.isOpen;
  }

  private render(phase: LabPhase, design?: KnottinDesign, live?: boolean): void {
    this.body.removeAll(true);
    if (phase === 'consent') this.renderConsent();
    else if (phase === 'designing') this.renderDesigning();
    else if (design !== undefined) this.renderResult(design, live === true);
  }

  private patientLine(): Phaser.GameObjects.Text {
    return this.scene.add
      .text(48, 212, `A clinical trial for ${this.patientName}`, {
        fontFamily: THEME.font,
        fontSize: '17px',
        color: THEME.secondary,
      })
      .setOrigin(0, 0.5);
  }

  private button(
    y: number,
    label: string,
    fill: number | null,
    onTap: () => void,
  ): Phaser.GameObjects.Container {
    const g = this.scene.add.graphics();
    if (fill === null) {
      g.lineStyle(3, THEME.outline, 1);
      g.strokeRoundedRect(48, y, 444, 56, 28);
    } else {
      g.fillStyle(fill, 1);
      g.fillRoundedRect(48, y, 444, 60, 30);
    }
    const h = fill === null ? 56 : 60;
    const t = this.scene.add
      .text(270, y + h / 2, label, {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: fill === null ? '18px' : '20px',
        color: THEME.cocoa,
      })
      .setOrigin(0.5, 0.5);
    const zone = this.scene.add
      .zone(270, y + h / 2, 444, h)
      .setInteractive({ useHandCursor: true });
    zone.on('pointerdown', onTap);
    return this.scene.add.container(0, 0, [g, t, zone]);
  }

  private backButton(y: number): Phaser.GameObjects.Container {
    return this.button(y, 'Back to visit', null, () => {
      this.hide();
      this.onClose();
    });
  }

  private externalLink(y: number, label: string): Phaser.GameObjects.Container {
    const t = this.scene.add
      .text(270, y, label, {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '16px',
        color: THEME.cocoa,
      })
      .setOrigin(0.5, 0.5);
    const zone = this.scene.add
      .zone(270, y, 444, 32)
      .setInteractive({ useHandCursor: true });
    zone.on('pointerdown', () => {
      window.open(PEPTIDE_SITE, '_blank', 'noopener');
      this.onExternal();
    });
    return this.scene.add.container(0, 0, [t, zone]);
  }

  private renderConsent(): void {
    const kids: Phaser.GameObjects.GameObject[] = [this.patientLine()];
    const bodyText = this.scene.add
      .text(48, 244, consentBody().join('\n\n'), {
        fontFamily: THEME.font,
        fontSize: '16px',
        color: THEME.secondary,
        wordWrap: { width: 412 },
        lineSpacing: 6,
      })
      .setOrigin(0, 0);
    const targetLabel = this.scene.add
      .text(48, 484, 'TRIAL TARGET', {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '14px',
        color: THEME.secondary,
      })
      .setOrigin(0, 0);
    const targetText = this.scene.add
      .text(48, 506, this.target, {
        fontFamily: THEME.font,
        fontSize: '16px',
        color: THEME.cocoa,
        wordWrap: { width: 412 },
        lineSpacing: 2,
      })
      .setOrigin(0, 0);
    kids.push(
      bodyText,
      targetLabel,
      targetText,
      this.button(580, 'Design a peptide', THEME.sage, () => this.startDesign()),
      this.externalLink(668, 'Open the real Cozy Peptide site'),
      this.backButton(720),
    );
    const hint = this.scene.add
      .text(270, 810, 'Designs stay fictional until trials prove them.', {
        fontFamily: THEME.font,
        fontSize: '14px',
        color: THEME.secondary,
      })
      .setOrigin(0.5, 0.5);
    kids.push(hint);
    this.body.add(kids);
  }

  private startDesign(): void {
    const id = this.runId;
    this.render('designing');
    this.onTick('peptide pipeline: proposal running');
    void designPeptide(this.target).then((res) => {
      if (!this.isOpen || id !== this.runId) return;
      this.onTick(
        res.live
          ? `peptide design live in ${res.latencyMs}ms`
          : `peptide design cached (${res.note})`,
      );
      this.render('result', res.design, res.live);
    });
  }

  private renderDesigning(): void {
    const id = this.runId;
    const kids: Phaser.GameObjects.GameObject[] = [this.patientLine()];
    const status = this.scene.add
      .text(48, 244, 'Designing a defender protein…', {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '18px',
        color: THEME.cocoa,
      })
      .setOrigin(0, 0);
    kids.push(status);
    const dots: Phaser.GameObjects.Graphics[] = [];
    STAGES.forEach((s, i) => {
      const y = 310 + i * 84;
      const dot = this.scene.add.graphics();
      dot.lineStyle(3, THEME.outline, 1);
      dot.strokeCircle(80, y, 12);
      const name = this.scene.add
        .text(110, y - 12, s.name, {
          fontFamily: THEME.font,
          fontStyle: 'bold',
          fontSize: '18px',
          color: THEME.cocoa,
        })
        .setOrigin(0, 0);
      const sub = this.scene.add
        .text(110, y + 12, s.sub, {
          fontFamily: THEME.font,
          fontSize: '14px',
          color: THEME.secondary,
        })
        .setOrigin(0, 0);
      dots.push(dot);
      kids.push(dot, name, sub);
    });
    const note = this.scene.add
      .text(48, 660, 'Live AI via the Cozy Peptide API — or the demo design offline.', {
        fontFamily: THEME.font,
        fontSize: '14px',
        color: THEME.secondary,
        wordWrap: { width: 412 },
      })
      .setOrigin(0, 0);
    kids.push(note, this.backButton(740));
    this.body.add(kids);
    if (this.reducedMotion) return;
    // Staged progress: the first three dots fill on a beat
    // (the fourth lands with the result, whenever it lands).
    dots.forEach((dot, i) => {
      if (i >= 3) return;
      this.scene.time.delayedCall(900 * (i + 1), () => {
        if (!this.isOpen || id !== this.runId) return;
        dot.clear();
        dot.fillStyle(i === 2 ? THEME.amber : THEME.sage, 1);
        dot.fillCircle(80, 310 + i * 84, 12);
      });
    });
  }

  private renderResult(design: KnottinDesign, live: boolean): void {
    // Live topologies are free text: cap the display row (the
    // cached demo fits untouched; the lab is flavor, not data).
    const topo =
      design.topology.length > 44 ? `${design.topology.slice(0, 43)}…` : design.topology;
    const kids: Phaser.GameObjects.GameObject[] = [this.patientLine()];
    const badge = this.scene.add
      .text(48, 244, live ? 'Live AI design' : 'Demo design · shown offline', {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '16px',
        color: live ? THEME.leaf : THEME.secondary,
      })
      .setOrigin(0, 0);
    const seqLabel = this.scene.add
      .text(48, 276, 'DEFENDER PROTEIN', {
        fontFamily: THEME.font,
        fontStyle: 'bold',
        fontSize: '14px',
        color: THEME.secondary,
      })
      .setOrigin(0, 0);
    const seq = this.scene.add
      .text(48, 298, design.sequence, {
        fontFamily: THEME.mono,
        fontSize: '18px',
        color: THEME.cocoa,
        wordWrap: { width: 412 },
      })
      .setOrigin(0, 0);
    kids.push(badge, seqLabel, seq);
    const stats = [
      `Shape: ${topo}`,
      `Charge: +${design.charge}`,
      `Therapy score: ${design.therapeutic_index === null ? '—' : Math.round(design.therapeutic_index)}   Safety score: ${design.safety_index === null ? '—' : Math.round(design.safety_index)}`,
      'Brewed in: gentle gut yeast (S. boulardii)',
    ];
    stats.forEach((s, i) => {
      kids.push(
        this.scene.add
          .text(48, 372 + i * 30, s, {
            fontFamily: THEME.font,
            fontSize: '16px',
            color: THEME.cocoa,
          })
          .setOrigin(0, 0),
      );
    });
    const prov = this.scene.add
      .text(48, 508, 'Dreamed by Meta Spark 1.3 · proven by the compiler.', {
        fontFamily: THEME.font,
        fontSize: '14px',
        color: THEME.secondary,
        wordWrap: { width: 412 },
      })
      .setOrigin(0, 0);
    kids.push(
      prov,
      this.button(580, 'Open cozy-peptide.vercel.app', THEME.sky, () => {
        window.open(PEPTIDE_SITE, '_blank', 'noopener');
        this.onExternal();
      }),
      this.backButton(660),
    );
    const hint = this.scene.add
      .text(270, 810, 'A trial adjunct — proven care did the curing.', {
        fontFamily: THEME.font,
        fontSize: '14px',
        color: THEME.secondary,
      })
      .setOrigin(0.5, 0.5);
    kids.push(hint);
    this.body.add(kids);
  }
}
