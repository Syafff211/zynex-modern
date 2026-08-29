import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Plugin } from 'vite';

/**
 * Zynex Studio — Backend API (mode development / local server).
 *
 * Middleware Vite yang menyediakan endpoint /api/* di server dev & preview,
 * sehingga frontend bisa memakai backend yang sama persis dengan production
 * (lihat api/[[path]].js untuk serverless Vercel).
 *
 * Storage lokal: file JSON di folder ./data (jangan di-commit — sudah di .gitignore).
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, '../data');
const CATALOG_FILE = path.join(DATA_DIR, 'catalog.json');
const AUTH_FILE = path.join(DATA_DIR, 'auth.json');

type AuthFile = { username: string; passwordHash: string };
type Session = { username: string; expires: number };

const DEFAULT_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || 'zynex2026';

const sessions = new Map<string, Session>();
const SESSION_MS = 1000 * 60 * 60 * 24 * 7;

function hash(value: string) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function ensureDir() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function ensureAuth(): AuthFile {
  ensureDir();
  if (!fs.existsSync(AUTH_FILE)) {
    const auth: AuthFile = {
      username: DEFAULT_USERNAME,
      passwordHash: hash(DEFAULT_PASSWORD),
    };
    fs.writeFileSync(AUTH_FILE, JSON.stringify(auth, null, 2));
    return auth;
  }
  return JSON.parse(fs.readFileSync(AUTH_FILE, 'utf8')) as AuthFile;
}

function readCatalogRaw(): unknown {
  ensureDir();
  if (!fs.existsSync(CATALOG_FILE)) return null;
  try {
    return JSON.parse(fs.readFileSync(CATALOG_FILE, 'utf8'));
  } catch {
    return null;
  }
}

function writeCatalog(data: unknown) {
  ensureDir();
  fs.writeFileSync(CATALOG_FILE, JSON.stringify(data, null, 2));
}

function send(res: ServerResponse, status: number, body: unknown) {
  const json = JSON.stringify(body);
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(json);
}

function readBody(req: IncomingMessage) {
  return new Promise<string>((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk) =>
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
    );
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function bearer(req: IncomingMessage) {
  const header = req.headers.authorization ?? '';
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() ?? '';
}

function sessionOf(req: IncomingMessage) {
  const token = bearer(req);
  if (!token) return null;
  const session = sessions.get(token);
  if (!session) return null;
  if (Date.now() > session.expires) {
    sessions.delete(token);
    return null;
  }
  return session;
}

async function handle(req: IncomingMessage, res: ServerResponse) {
  const url = (req.url ?? '').split('?')[0];
  const method = (req.method ?? 'GET').toUpperCase();

  if (url === '/api/health' && method === 'GET') {
    send(res, 200, { ok: true, service: 'zynex-api', mode: 'vite-plugin', store: 'file' });
    return;
  }

  if (url === '/api/login' && method === 'POST') {
    const auth = ensureAuth();
    const raw = await readBody(req);
    let payload: { username?: string; password?: string } = {};
    try {
      payload = JSON.parse(raw || '{}');
    } catch {
      send(res, 400, { error: 'JSON tidak valid' });
      return;
    }
    const username = String(payload.username ?? '').trim();
    const password = String(payload.password ?? '');
    if (username !== auth.username || hash(password) !== auth.passwordHash) {
      send(res, 401, { error: 'Username atau password salah' });
      return;
    }
    const token = crypto.randomBytes(24).toString('hex');
    sessions.set(token, { username, expires: Date.now() + SESSION_MS });
    send(res, 200, { token, username });
    return;
  }

  if (url === '/api/logout' && method === 'POST') {
    const token = bearer(req);
    if (token) sessions.delete(token);
    send(res, 200, { ok: true });
    return;
  }

  if (url === '/api/me' && method === 'GET') {
    const session = sessionOf(req);
    if (!session) {
      send(res, 401, { error: 'Unauthorized' });
      return;
    }
    send(res, 200, { username: session.username });
    return;
  }

  if (url === '/api/password' && method === 'PUT') {
    const session = sessionOf(req);
    if (!session) {
      send(res, 401, { error: 'Unauthorized' });
      return;
    }
    const raw = await readBody(req);
    let payload: { current?: string; next?: string } = {};
    try {
      payload = JSON.parse(raw || '{}');
    } catch {
      send(res, 400, { error: 'JSON tidak valid' });
      return;
    }
    const auth = ensureAuth();
    if (hash(String(payload.current ?? '')) !== auth.passwordHash) {
      send(res, 400, { error: 'Password saat ini salah' });
      return;
    }
    const next = String(payload.next ?? '');
    if (next.length < 6) {
      send(res, 400, { error: 'Password baru minimal 6 karakter' });
      return;
    }
    fs.writeFileSync(
      AUTH_FILE,
      JSON.stringify({ username: auth.username, passwordHash: hash(next) }, null, 2)
    );
    send(res, 200, { ok: true });
    return;
  }

  if (url === '/api/catalog' && method === 'GET') {
    send(res, 200, readCatalogRaw() ?? { empty: true });
    return;
  }

  if (url === '/api/catalog' && method === 'PUT') {
    const session = sessionOf(req);
    if (!session) {
      send(res, 401, { error: 'Unauthorized' });
      return;
    }
    const raw = await readBody(req);
    let payload: unknown;
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
    writeCatalog(payload);
    send(res, 200, { ok: true });
    return;
  }

  send(res, 404, { error: 'Not found' });
}

type ConnectLike = {
  use: (fn: (req: IncomingMessage, res: ServerResponse, next: () => void) => void) => void;
};

export function catalogApi(): Plugin {
  const attach = (middlewares: ConnectLike) => {
    middlewares.use((req: IncomingMessage, res: ServerResponse, next: () => void) => {
      const url = (req.url ?? '').split('?')[0];
      if (!url.startsWith('/api/')) {
        next();
        return;
      }
      handle(req, res).catch((err: unknown) => {
        console.error(err);
        send(res, 500, { error: 'Server error' });
      });
    });
  };

  return {
    name: 'zynex-catalog-api',
    configureServer(server) {
      attach(server.middlewares);
    },
    configurePreviewServer(server) {
      attach(server.middlewares);
    },
  };
}
