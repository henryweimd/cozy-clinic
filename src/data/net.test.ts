import { afterEach, describe, expect, it, vi } from 'vitest';
import { getJson, postJson } from './net';

function hangOnAbort() {
  return vi.fn((_url: string, init?: { signal?: AbortSignal }) => {
    return new Promise<never>((_resolve, reject) => {
      init?.signal?.addEventListener('abort', () =>
        reject(new Error('aborted')),
      );
    });
  });
}

describe('net timeouts', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('getJson parses ok responses', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({ ok: true, json: async () => [1] }) as Response),
    );
    await expect(getJson('/t', 'k', 'https://x', 50)).resolves.toEqual([1]);
  });

  it('getJson throws on HTTP errors', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({ ok: false, status: 500 }) as Response),
    );
    await expect(getJson('/t', 'k', 'https://x', 50)).rejects.toThrow();
  });

  it('getJson aborts a hung backend', async () => {
    vi.stubGlobal('fetch', hangOnAbort());
    await expect(getJson('/t', 'k', 'https://x', 20)).rejects.toThrow();
  });

  it('postJson aborts a hung backend', async () => {
    vi.stubGlobal('fetch', hangOnAbort());
    await expect(postJson('/t', {}, 'k', 'https://x', 20)).rejects.toThrow();
  });

  it('postJson resolves on empty 201 bodies (Supabase insert)', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(
        async () =>
          ({
            ok: true,
            status: 201,
            json: async () => {
              throw new SyntaxError('Unexpected end of JSON input');
            },
            text: async () => '',
          }) as unknown as Response,
      ),
    );
    await expect(
      postJson('/rest/v1/handoffs', {}, 'k', 'https://x', 50),
    ).resolves.toBeUndefined();
  });

  it('postJson still parses JSON bodies when present', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(
        async () =>
          ({
            ok: true,
            status: 201,
            text: async () => '{"a":1}',
          }) as unknown as Response,
      ),
    );
    await expect(postJson('/t', {}, 'k', 'https://x', 50)).resolves.toEqual({
      a: 1,
    });
  });
});
