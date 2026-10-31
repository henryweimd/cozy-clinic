import { afterEach, describe, expect, it, vi } from 'vitest';
import { CACHED_DESIGN, designPeptide, isKnottinResponse } from './knottin';

const LIVE = { fallback: false, design: CACHED_DESIGN };

describe('isKnottinResponse', () => {
  it('accepts the live shape and the veto echo', () => {
    expect(isKnottinResponse(LIVE)).toBe(true);
    expect(isKnottinResponse({ fallback: true })).toBe(true);
    expect(isKnottinResponse({ fallback: true, reason: 'no key' })).toBe(true);
  });

  it('rejects malformed payloads', () => {
    expect(isKnottinResponse(null)).toBe(false);
    expect(isKnottinResponse('ok')).toBe(false);
    expect(isKnottinResponse({ fallback: false })).toBe(false);
    expect(
      isKnottinResponse({
        fallback: false,
        design: { ...CACHED_DESIGN, sequence: 'NOT-PEPTIDE!!' },
      }),
    ).toBe(false);
    expect(
      isKnottinResponse({
        fallback: false,
        design: { ...CACHED_DESIGN, charge: '4' },
      }),
    ).toBe(false);
  });
});

describe('designPeptide', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('falls back cached when env is missing or the proxy is unreachable', async () => {
    const opts = { url: 'http://127.0.0.1:1', key: 'k' };
    await expect(designPeptide('C. diff', opts)).resolves.toEqual({
      design: CACHED_DESIGN,
      live: false,
      latencyMs: expect.any(Number),
      note: 'down',
    });
  });

  it('returns the live design on success', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({ ok: true, json: async () => LIVE })),
    );
    await expect(
      designPeptide('C. diff', { url: 'https://x.test', key: 'k' }),
    ).resolves.toEqual({
      design: CACHED_DESIGN,
      live: true,
      latencyMs: expect.any(Number),
      note: 'ok',
    });
  });

  it('falls back cached on veto echo, http error, or throw', async () => {
    const opts = { url: 'https://x.test', key: 'k' };
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({
        ok: true,
        json: async () => ({ fallback: true, reason: 'no key' }),
      })),
    );
    const echoed = await designPeptide('C. diff', opts);
    expect(echoed).toMatchObject({ live: false, note: 'no key' });
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: false, status: 500 })));
    const failed = await designPeptide('C. diff', opts);
    expect(failed).toMatchObject({ live: false, note: 'http 500' });
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new Error('down');
      }),
    );
    const thrown = await designPeptide('C. diff', opts);
    expect(thrown).toMatchObject({ live: false, note: 'down' });
  });
});
