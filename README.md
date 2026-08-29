# Zynex Studio — Modern Store & Admin Panel

Landing page glassmorphism modern, katalog produk digital, Pterodactyl configurator,
domain search, QRIS payment manager, dan hidden `/admin` control panel.

## Stack

- React 18 + TypeScript + Vite
- Tailwind CSS
- Backend serverless: Vercel Functions (`/api/*`) + Vite dev plugin

## Menjalankan Lokal

```bash
npm install
npm run dev
```

Server dev sudah menyertakan backend API (via `server/catalogApi.ts`):
- `http://localhost:5173` — storefront
- `http://localhost:5173/admin` — admin panel
- `http://localhost:5173/api/health` — cek backend

## Backend API (Serverless)

Endpoint `/api/*` tersedia di production (Vercel) maupun dev (plugin Vite):

| Method | Endpoint          | Deskripsi                              | Auth |
| ------ | ----------------- | -------------------------------------- | ---- |
| GET    | `/api/health`     | Status layanan                         | -    |
| POST   | `/api/login`      | Login → `{ token }`                    | -    |
| POST   | `/api/logout`     | Hapus sesi                             | Bearer |
| GET    | `/api/me`         | Cek sesi aktif                         | Bearer |
| PUT    | `/api/password`   | Ganti password                         | Bearer |
| GET    | `/api/catalog`    | Ambil `{ products, settings, orders }` | -    |
| PUT    | `/api/catalog`    | Simpan katalog                         | Bearer |

### Kredensial default admin server

- Username: `admin`
- Password: `zynex2026`

Override di Vercel dengan env vars: `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `AUTH_SECRET`.

### Storage

- **Vercel KV** (disarankan): set env `KV_REST_API_URL` & `KV_REST_API_TOKEN` agar
  katalog & password tersimpan permanen.
- Tanpa KV: fallback ke file `/tmp` + memory (data bertahan selama instance hangat).

## Deploy ke Vercel

1. Push repo ke GitHub, import di [vercel.com](https://vercel.com).
2. Build otomatis: `npm run build` (output `dist`), framework preset Vite.
3. `vercel.json` sudah mengatur SPA rewrite — rute `/admin` dan halaman lain
   tidak akan 404 saat di-refresh.
4. (Opsional) Aktifkan Vercel KV dan set env di atas.

### Mode login admin

- **PIN Lokal** — `123456` / `zynex123` / `admin` (data di browser).
- **Server Login** — username & password backend `/api` (sinkron lintas perangkat).

## Scripts

```bash
npm run dev      # dev server + API plugin
npm run build    # type-check + production build
npm run preview  # preview production build
```
