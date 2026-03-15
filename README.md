# EasySiteStudio Portal

Full-stack web portal with:
- Frontend: React + Vite + TypeScript + Tailwind
- Backend: Node.js + Express

## Folder Structure

```txt
backend/
dist/
docs/
node_modules/
prisma/
public/
src/
tmp_prisma_config/
```

## Prerequisites

- Node.js 20+ (recommended)
- npm 10+

## Install

```sh
npm install
```

## Run (Frontend + Backend)

```sh
npm run dev
```

This starts:
- React frontend at `http://localhost:5173`
- Node API backend at `http://localhost:4000`

Vite dev server proxies `/api/*` to the backend.

## Production Build

```sh
npm run build
npm run start
```

`npm run start` runs backend from `backend/server.js` and serves static frontend from `dist/`.

## API Endpoints

- `GET /api/health`
- `GET /api/site-config`
- `GET /api/portfolio-products`
- `POST /api/contact`
- `POST /api/admin/login` (body: `id`, `password`)
- `GET /api/admin/contacts` (requires admin token)
- `GET /api/admin/portfolio-products` (requires admin token)
- `POST /api/admin/portfolio-products` (requires admin token, multipart `imageFile`)
- `PUT /api/admin/portfolio-products/:id` (requires admin token, multipart `imageFile`)
- `DELETE /api/admin/portfolio-products/:id` (requires admin token)

## Admin Page

- URL: `/admin`
- Login backend menggunakan `id` + `password` admin
- Fitur:
  - Kelola product portfolio website (tambah/edit/hapus + upload gambar)
  - Lihat data kontak masuk dari form contact

## Environment Variables

- `DATABASE_URL` (Postgres connection string)
- `BACKEND_PORT` (default: `3001`)
- `CORS_ORIGIN` (contoh: `http://localhost:5173,http://localhost:3000`)
- `ADMIN_AUTH_JWT_SECRET` (required for admin endpoints)
- `ADMIN_AUTH_COOKIE_NAME` (default: `berkah_admin_token`)
- `ADMIN_AUTH_TTL_HOURS` (default: `24`)
- `VITE_API_BASE_URL` (contoh: `http://localhost:4000`)
- `ADMIN_DEFAULT_ID` (default seed admin: `admin`)
- `ADMIN_DEFAULT_PASSWORD` (default seed admin: `admin12345`)
- `ADMIN_DEFAULT_NAME` (default seed admin: `Administrator`)
