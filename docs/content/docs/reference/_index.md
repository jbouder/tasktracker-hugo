---
title: Reference
weight: 4
prev: /docs/frontend
---

Quick reference for configuration and conventions.

## Ports

| Service | Port |
|---------|------|
| Backend API | 8000 |
| Frontend dev server | 5173 |
| PostgreSQL (dev) | 5432 |
| PostgreSQL (test) | 5433 |

## Backend environment

Configuration is loaded via `pydantic-settings` from `.env` (see `.env.example`).
Key variables:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Async PostgreSQL connection string |
| `ENVIRONMENT` | `development` / `production` |

## Conventions

- **Backend** — layered `router → service → repository`; all DB queries in
  repositories. Ruff for linting, pytest for tests. See
  [Backend](../backend).
- **Frontend** — components from the `@nebari` shadcn registry, TanStack Query
  for server state, Jotai for client state, Biome for linting. See
  [Frontend](../frontend).

{{< callout type="warning" >}}
Never commit a real `.env`. Copy `.env.example` and fill in local values.
{{< /callout >}}
