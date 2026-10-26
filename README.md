# Porchlight Apartment — Website & Management System

Modern public website and admin dashboard for **Porchlight Apartment** (furnished apartments in Bole, Addis Ababa, Ethiopia).

- **Public site:** browse apartments, amenities, inquiries, contact
- **Admin (`/admin`):** JWT-protected dashboard, apartments, customers, inquiries
- **Stack:** npm workspaces, React (Vite), Express, Prisma, PostgreSQL

## Prerequisites

- Node.js 20+
- Docker Desktop (for local PostgreSQL)

## Quick start

```bash
# Install dependencies (from repo root)
npm install

# Start PostgreSQL
npm run db:up

# API environment
copy apps\api\.env.example apps\api\.env

# Web environment (optional — defaults proxy /api to localhost:4000)
copy apps\web\.env.example apps\web\.env

# Database migrate + seed
npm run db:migrate
npm run db:seed

# Run API + web (two terminals, or use npm run dev with concurrently)
npm run dev:api
npm run dev:web
```

- **Website:** http://localhost:5173  
- **API health:** http://localhost:4000/api/health  
- **Admin login:** http://localhost:5173/admin/login  

Default admin (from `apps/api/.env.example`): `admin@porchlight.com` / `ChangeMe123!`

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | API + web together |
| `npm run dev:api` | Express API only |
| `npm run dev:web` | Vite frontend only |
| `npm run build` | Build all workspaces |
| `npm run lint` | ESLint all workspaces |
| `npm run db:up` | Docker Postgres |
| `npm run db:migrate` | Prisma migrate dev |
| `npm run db:seed` | Seed amenities, sample apartments, admin |
| `npm run db:studio` | Prisma Studio |

## Project layout

```
apps/web/     React public site + admin UI
apps/api/     Express REST API + Prisma
packages/shared/  Shared types and constants
```

## Environment variables

See `apps/api/.env.example` and `apps/web/.env.example`. Never commit real secrets.

## Production notes

- Set strong `JWT_SECRET` and admin credentials
- Run `npm run db:deploy` in API workspace for migrations
- Serve the Vite build behind your reverse proxy; configure `VITE_API_URL` if API is on another host
- Replace placeholder legal copy and map placeholders before launch
