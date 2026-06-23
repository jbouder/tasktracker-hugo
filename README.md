# tasktracker

A full-stack monorepo with a React + TypeScript frontend and a Python FastAPI backend.

## Layout

```
tasktracker/
├── backend/     FastAPI · PostgreSQL · async SQLAlchemy 2 · Alembic · uv
└── frontend/    React 19 · TypeScript · Vite · Tailwind v4 · shadcn/ui
```

Each package has its own `README.md` and `AGENTS.md` with full conventions.

## Quick start

### Backend (`backend/`)

```bash
cd backend
docker-compose up -d            # Postgres (dev: 5432, test: 5433)
uv sync                         # install deps
uv run alembic upgrade head     # run migrations
uv run uvicorn app.main:app --reload --port 8000
```

API runs at http://localhost:8000 (health check: `GET /health`).

### Frontend (`frontend/`)

```bash
cd frontend
npm install        # install deps
npm run dev        # http://localhost:5173
```

The Vite dev server proxies `/api` → `http://localhost:8000`, so run the
backend alongside the frontend during development.

## Conventions

- `backend/AGENTS.md` — FastAPI layered architecture (router → service → repository).
- `frontend/AGENTS.md` — React component/page structure, TanStack Query, Jotai, shadcn/ui.
