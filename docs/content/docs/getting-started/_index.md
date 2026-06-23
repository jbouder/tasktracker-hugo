---
title: Getting Started
weight: 1
prev: /docs
next: /docs/backend
---

Get TaskTracker running locally. You'll start the backend API and the frontend
dev server side by side.

## Prerequisites

- **Docker** (for PostgreSQL)
- **Python 3.12** and [`uv`](https://docs.astral.sh/uv/)
- **Node.js** (for the frontend) and `npm`

## Backend

```bash
cd backend
docker-compose up -d            # Postgres (dev: 5432, test: 5433)
uv sync                         # install deps
uv run alembic upgrade head     # run migrations
uv run uvicorn app.main:app --reload --port 8000
```

The API runs at <http://localhost:8000>.

{{< callout type="info" >}}
Health check: `GET /health` should return `{"status": "ok"}`.
{{< /callout >}}

## Frontend

```bash
cd frontend
npm install        # install deps
npm run dev        # http://localhost:5173
```

The Vite dev server proxies `/api` → `http://localhost:8000`, so run the backend
alongside the frontend during development.

## Next steps

{{< cards >}}
  {{< card link="../backend" title="Backend architecture" icon="server" >}}
  {{< card link="../frontend" title="Frontend structure" icon="desktop-computer" >}}
{{< /cards >}}
