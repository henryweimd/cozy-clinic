/**
 * WS-E Care Coins wallet: the spendable economy behind the mock
 * counter. Earn-only today (+1/BEST, matching the scene); spend
 * hooks (second chances, hints, stickers) arrive with the shop
 * submenu. Pure + serializable — the scene wires it at the next
 * integration; the `coin_ledger` table replaces local storage.
 */

export interface WalletEntry {
  /** Running sequence (0-based). */
  seq: number;
  /** Signed coin delta. */
  delta: number;
  /** Machine reason (earn:best-resolve, spend:hint, ...). */
  reason: string;
  /** Balance after this entry. */
  balance: number;
}

export interface Wallet {
  balance: number;
  entries: WalletEntry[];
}

export const WALLET_START = 12;
export const EARN_BEST = 1;
/** First open of a Learning List topic (reading pays, once each). */
export const EARN_LEARN_FIRST = 2;
/** Base perfect-visit bonus (3/3 rounds right), before shop boosts. */
export const EARN_PERFECT = 2;

export function emptyWallet(start = WALLET_START): Wallet {
  return { balance: start, entries: [] };
}

/** Earn coins (always succeeds). Returns the new wallet. */
export function earn(wallet: Wallet, amount: number, reason: string): Wallet {
  if (!Number.isInteger(amount) || amount <= 0) return wallet;
  const balance = wallet.balance + amount;
  const entry: WalletEntry = {
    seq: wallet.entries.length,
    delta: amount,
    reason,
    balance,
  };
  return { balance, entries: [...wallet.entries, entry] };
}

/**
 * Spend coins. Returns null when the wallet cannot cover the
 * cost (no partial spends, no debt) — the caller shows the
 * "not enough coins" beat instead.
 */
export function spend(wallet: Wallet, amount: number, reason: string): Wallet | null {
  if (!Number.isInteger(amount) || amount <= 0) return wallet;
  if (wallet.balance < amount) return null;
  const balance = wallet.balance - amount;
  const entry: WalletEntry = {
    seq: wallet.entries.length,
    delta: -amount,
    reason,
    balance,
  };
  return { balance, entries: [...wallet.entries, entry] };
}

export function canAfford(wallet: Wallet, amount: number): boolean {
  return Number.isInteger(amount) && amount > 0 && wallet.balance >= amount;
}

/** Serialize for local persistence (supabase ledger later). */
export function serializeWallet(wallet: Wallet): string {
  return JSON.stringify({ balance: wallet.balance, entries: wallet.entries });
}

export function deserializeWallet(raw: string): Wallet {
  try {
    const data = JSON.parse(raw) as Partial<Wallet>;
    if (
      typeof data.balance !== 'number' || !Number.isInteger(data.balance) ||
      data.balance < 0 || !Array.isArray(data.entries)
    ) {
      return emptyWallet();
    }
    const entries: WalletEntry[] = [];
    for (const e of data.entries) {
      if (
        typeof e?.seq !== 'number' || typeof e?.delta !== 'number' ||
        typeof e?.reason !== 'string' || typeof e?.balance !== 'number'
      ) {
        return emptyWallet();
      }
      entries.push({ seq: e.seq, delta: e.delta, reason: e.reason, balance: e.balance });
    }
    return { balance: data.balance, entries };
  } catch {
    return emptyWallet();
  }
}
