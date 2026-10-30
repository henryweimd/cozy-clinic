import { afterEach, describe, expect, it, vi } from 'vitest';
import { isRewordResponse, reword } from './reword';

describe('isRewordResponse', () => {
  it('accepts the live shape and the veto echo', () => {
    expect(isRewordResponse({ text: 'hi', fallback: false })).toBe(true);
    expect(isRewordResponse({ text: 'hi', fallback: true })).toBe(true);
  });

  it('rejects malformed payloads', () => {
    expect(isRewordResponse(null)).toBe(false);
    expect(isRewordResponse('hi')).toBe(false);
    expect(isRewordResponse({ text: 'hi' })).toBe(false);
    expect(isRewordResponse({ text: 7, fallback: false })).toBe(false);
  });
});

describe('reword', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('falls back local when the proxy is unreachable', async () => {
    // Unroutable URL: connection refuses fast, no network touched.
    await expect(
      reword('hi', 'gentle', [], 'greeting', { url: 'http://127.0.0.1:1', key: 'k' }),
    ).resolves.toEqual({ text: 'hi', live: false });
  });

  it('returns the live paraphrase on success', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({
        ok: true,
        json: async () => ({ text: 'Hey, Doc!', fallback: false }),
      })),
    );
    await expect(
      reword('hi', 'gentle', [], 'greeting', { url: 'https://x.test', key: 'k' }),
    ).resolves.toEqual({ text: 'Hey, Doc!', live: true });
  });

  it('falls back local on veto echo, http error, or throw', async () => {
    const echo = vi.fn(async () => ({
      ok: true,
      json: async () => ({ text: 'hi', fallback: true }),
    }));
    vi.stubGlobal('fetch', echo);
    const opts = { url: 'https://x.test', key: 'k' };
    await expect(reword('hi', 'gentle', [], 'greeting', opts)).resolves.toEqual({
      text: 'hi',
      live: false,
    });
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: false })));
    await expect(reword('hi', 'gentle', [], 'greeting', opts)).resolves.toEqual({
      text: 'hi',
      live: false,
    });
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new Error('down');
      }),
    );
    await expect(reword('hi', 'gentle', [], 'greeting', opts)).resolves.toEqual({
      text: 'hi',
      live: false,
    });
  });
});
