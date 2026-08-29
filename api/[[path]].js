/**
 * Zynex Studio — Serverless Backend API untuk Vercel.
 *
 * Endpoint (semua di bawah /api):
 *   GET  /api/health     → status layanan
 *   POST /api/login      → { username, password } → { token }
 *   POST /api/logout     → hapus sesi (Bearer token)
 *   GET  /api/me         → cek sesi (Bearer token)
 *   PUT  /api/password   → ganti password (Bearer token)
 *   GET  /api/catalog    → ambil katalog { products, settings, orders }
 *   PUT  /api/catalog    → simpan katalog (Bearer token)
 *
 * Storage:
 *   - Vercel KV (opsional): set env KV_REST_API_URL & KV_REST_API_TOKEN.
 *   - Tanpa KV: fallback ke file /tmp (bertahan selama instance hangat)
 *     lalu memory. Untuk penyimpanan permanen disarankan mengaktifkan KV.
 *
 * Autentikasi:
 *   - Default: username "admin", password "zynex2026"
 *   - Override via env ADMIN_USERNAME / ADMIN_PASSWORD
 *   - Token stateless HMAC-SHA256 (env AUTH_SECRET), kedaluwarsa 7 hari.
 */

import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const DEFAULT_USERNAME = 'admin';
const DEFAULT_PASSWORD = 'zynex2026';

const username = () => process.env.ADMIN_USERNAME || DEFAULT_USERNAME;
const password = () => process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;
const secret = () => process.env.AUTH_SECRET || 'zynex-dev-secret-change-me';
const SESSION_MS = 1000 * 60 * 60 * 24 * 7;

const KV_URL = process.env.KV_REST_API_URL || '';
const KV_TOKEN = process.env.KV_REST_API_TOKEN || '';
const CATALOG_KEY = 'zynex:catalog:v1';
const AUTH_KEY = 'zynex:auth:v1';

const memory = new Map(); // token -> { username, expires }
const TMP_FILE = path.join(os.tmpdir(), 'zynex-catalog.json');

function hash(value) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function sign(payload) {
  return crypto.createHmac('sha256', secret()).update(payload).digest('hex');
}

function createToken(user) {
  const expires = Date.now() + SESSION_MS;
  const payload = `${user}.${expires}`;
  return `${payload}.${sign(payload)}`;
}

function verifyToken(token) {
  const parts = String(token || '').split('.');
  if (parts.length !== 3) return null;
  const [user, expStr, sig] = parts;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || Date.now() > exp) return null;
  if (sign(`${user}.${expStr}`) !== sig) return null;
  return { username: user, expires: exp };
}

function bearer(req) {
  const header = req.headers.authorization || '';
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : '';
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

/* ---------- storage helpers ---------- */

async function kvGet(key) {
  if (!KV_URL) return null;
  try {
    const r = await fetch(`${KV_URL}/get/${key}`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
    });
    if (!r.ok) return null;
    const j = await r.json();
    return j?.result ?? null;
  } catch {
    return null;
  }
}

async function kvSet(key, value) {
  if (!KV_URL) return false;
  try {
    const r = await fetch(`${KV_URL}/set/${key}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${KV_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    });
    return r.ok;
  } catch {
    return false;
  }
}

async function readStore() {
  // 1) Vercel KV
  const kv = await kvGet(CATALOG_KEY);
  if (kv) {
    try {
      return JSON.parse(kv);
    } catch {
      /* lanjut ke fallback */
    }
  }
  // 2) file /tmp (instance hangat)
  try {
    return JSON.parse(fs.readFileSync(TMP_FILE, 'utf8'));
  } catch {
    /* lanjut ke memory */
  }
  return null;
}

async function writeStore(data) {
  const json = JSON.stringify(data);
  let persistent = false;
  if (KV_URL) {
    persistent = await kvSet(CATALOG_KEY, json);
  }
  try {
    fs.writeFileSync(TMP_FILE, json);
  } catch {
    /* /tmp tidak tersedia */
  }
  return persistent;
}

async function readAuthOverride() {
  const kv = await kvGet(AUTH_KEY);
  if (!kv) return null;
  try {
    return JSON.parse(kv);
  } catch {
    return null;
  }
}

async function writeAuthOverride(data) {
  if (!KV_URL) return false;
  return kvSet(AUTH_KEY, JSON.stringify(data));
}

/* ---------- handler ---------- */

export default async function handler(req, res) {
  const url = (req.url || '').split('?')[0];
  const method = (req.method || 'GET').toUpperCase();

  try {
    if (url === '/api/health' && method === 'GET') {
      send(res, 200, {
        ok: true,
        service: 'zynex-api',
        mode: 'vercel-serverless',
        store: KV_URL ? 'vercel-kv' : 'tmp+memory',
      });
      return;
    }

    if (url === '/api/login' && method === 'POST') {
      const raw = await readBody(req);
      let payload = {};
      try {
        payload = JSON.parse(raw || '{}');
      } catch {
        send(res, 400, { error: 'JSON tidak valid' });
        return;
      }
      const user = String(payload.username || '').trim();
      const pass = String(payload.password || '');
      const override = await readAuthOverride();
      const validUser = override ? override.username : username();
      const validHash = override ? override.passwordHash : hash(password());
      if (user !== validUser || hash(pass) !== validHash) {
        send(res, 401, { error: 'Username atau password salah' });
        return;
      }
      const token = createToken(user);
      memory.set(token, { username: user, expires: Date.now() + SESSION_MS });
      send(res, 200, { token, username: user });
      return;
    }

    if (url === '/api/logout' && method === 'POST') {
      memory.delete(bearer(req));
      send(res, 200, { ok: true });
      return;
    }

    if (url === '/api/me' && method === 'GET') {
      const session = verifyToken(bearer(req));
      if (!session) {
        send(res, 401, { error: 'Unauthorized' });
        return;
      }
      send(res, 200, { username: session.username });
      return;
    }

    if (url === '/api/password' && method === 'PUT') {
      const session = verifyToken(bearer(req));
      if (!session) {
        send(res, 401, { error: 'Unauthorized' });
        return;
      }
      const raw = await readBody(req);
      let payload = {};
      try {
        payload = JSON.parse(raw || '{}');
      } catch {
        send(res, 400, { error: 'JSON tidak valid' });
        return;
      }
      const current = String(payload.current || '');
      const next = String(payload.next || '');
      const override = await readAuthOverride();
      const currentHash = override ? override.passwordHash : hash(password());
      if (hash(current) !== currentHash) {
        send(res, 400, { error: 'Password saat ini salah' });
        return;
      }
      if (next.length < 6) {
        send(res, 400, { error: 'Password baru minimal 6 karakter' });
        return;
      }
      const persistent = await writeAuthOverride({
        username: session.username,
        passwordHash: hash(next),
      });
      send(res, 200, {
        ok: true,
        persistent,
        note: persistent
          ? 'Password disimpan permanen di Vercel KV'
          : 'Password tersimpan sementara (aktifkan Vercel KV untuk permanen)',
      });
      return;
    }

    if (url === '/api/catalog' && method === 'GET') {
      const data = await readStore();
      send(res, 200, data ?? { empty: true });
      return;
    }

    if (url === '/api/catalog' && method === 'PUT') {
      const session = verifyToken(bearer(req));
      if (!session) {
        send(res, 401, { error: 'Unauthorized' });
        return;
      }
      const raw = await readBody(req);
      let payload;
      try {
        payload = JSON.parse(raw || '{}');
      } catch {
        send(res, 400, { error: 'JSON tidak valid' });
        return;
      }
      if (!payload || typeof payload !== 'object') {
        send(res, 400, { error: 'Katalog tidak valid' });
        return;
      }
      const persistent = await writeStore(payload);
      send(res, 200, { ok: true, persistent });
      return;
    }

    send(res, 404, { error: 'Not found' });
  } catch (err) {
    console.error(err);
    send(res, 500, { error: 'Server error' });
  }
}
