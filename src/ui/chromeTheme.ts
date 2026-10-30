/**
 * chromeTheme: the one palette/font source for NEW UI modules
 * (G3+). Values mirror the ClinicScene chrome palette exactly;
 * the scene keeps its own consts until G4 migrates it (avoiding
 * churn in the shipped layout). Taste law: palette-only fills,
 * no gradients, no glow, no emoji.
 */
export const THEME = {
  cream: 0xfff3e2,
  cardFill: 0xfff9ef,
  outline: 0x8a5a3b,
  sage: 0xa9c6a2,
  sky: 0xa9cce3,
  amber: 0xd9a441,
  rose: 0xc9706b,
  cocoa: '#5c4633',
  secondary: '#8a6f52',
  /** Benefit lines (shop effects): flat leaf green, opaque text. */
  leaf: '#4e7a51',
  /** Bar-strip translucency only — pills + text stay opaque. */
  chromeAlpha: 0.8,
  /** Glass law: trays/drawers (narrow, more glass) + modal sheets. */
  glassPanel: 0.8,
  glassSheet: 0.85,
  /** Terminal surfaces (ticker, dev monitor): dark + muted green. */
  terminalBg: 0x1a1410,
  terminalBgAlpha: 0.72,
  terminalInk: '#8fae94',
  font: '"Baloo 2", "Comic Sans MS", "Chalkboard SE", system-ui, sans-serif',
  mono: '"Courier New", ui-monospace, monospace',
} as const;
