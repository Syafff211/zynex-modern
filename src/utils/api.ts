import { Product, StoreSettings, Order } from '../types';

/**
 * API client untuk backend serverless Zynex (Vercel /api/* atau dev plugin).
 * Selalu memakai URL relatif agar bekerja di domain mana pun (Vercel, preview, lokal).
 */

export interface CatalogPayload {
  products: Product[];
  settings: StoreSettings;
  orders: Order[];
}

export const API_TOKEN_KEY = 'zynex_admin_token_v1';

let apiOnlineCache: boolean | null = null;

export function getApiToken(): string | null {
  try {
    return localStorage.getItem(API_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setApiToken(token: string | null) {
  try {
    if (token) {
      localStorage.setItem(API_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(API_TOKEN_KEY);
    }
  } catch {
    /* storage tidak tersedia */
  }
}

export async function checkApi(): Promise<boolean> {
  if (apiOnlineCache !== null) return apiOnlineCache;
  try {
    const res = await fetch('/api/health', { cache: 'no-store' });
    apiOnlineCache = res.ok;
  } catch {
    apiOnlineCache = false;
  }
  return apiOnlineCache;
}

export async function apiLogin(
  username: string,
  password: string
): Promise<{ token: string; username: string } | null> {
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function apiLogout(): Promise<void> {
  const token = getApiToken();
  if (!token) return;
  try {
    await fetch('/api/logout', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {
    /* best-effort */
  }
  setApiToken(null);
}

export async function apiFetchCatalog(): Promise<CatalogPayload | null> {
  try {
    const res = await fetch('/api/catalog', { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data || data.empty) return null;
    return data as CatalogPayload;
  } catch {
    return null;
  }
}

export async function apiSaveCatalog(payload: CatalogPayload): Promise<boolean> {
  const token = getApiToken();
  if (!token) return false;
  try {
    const res = await fetch('/api/catalog', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}
