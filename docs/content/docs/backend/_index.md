---
title: Backend
weight: 2
prev: /docs/getting-started
next: /docs/frontend
---

The backend is a **FastAPI** service with a layered architecture.

| Item | Value |
|------|-------|
| Framework | FastAPI |
| Runtime | Python 3.12 |
| Database | PostgreSQL 16 (async via asyncpg) |
| ORM | SQLAlchemy 2 (async) |
| Migrations | Alembic |
| Validation | Pydantic v2 |
| Testing | pytest + pytest-asyncio + httpx |
| Linting | Ruff |
| Package manager | uv |
| Dev port | 8000 |

## Architecture

Requests flow through three layers, each with a single responsibility:

```
router  →  service  →  repository
(HTTP)     (logic)     (DB queries)
```

- **Routers** (`app/routers/`) — HTTP concerns only: parse/validate input, call a
  service, shape the response.
- **Services** (`app/services/`) — business logic. No direct database access;
  they call repositories.
- **Repositories** (`app/repositories/`) — all SQLAlchemy queries live here.

{{< callout type="info" >}}
This separation keeps business logic testable in isolation and confines every DB
query to one layer.
{{< /callout >}}

## Project structure

```
backend/
├── app/
│   ├── main.py              # FastAPI app factory (create_app)
│   ├── config.py            # Settings via pydantic-settings
│   ├── database.py          # Async engine, session factory, get_db
│   ├── deps.py              # Typed FastAPI dependency annotations
│   ├── models/              # SQLAlchemy models (DeclarativeBase + TimestampMixin)
│   ├── schemas/             # Pydantic request/response models
│   ├── routers/             # HTTP endpoints
│   ├── services/            # Business logic
│   └── repositories/        # DB queries
├── migrations/              # Alembic versions + env.py
├── tests/                   # pytest (conftest fixtures, factories)
├── pyproject.toml
├── alembic.ini
└── docker-compose.yml
```

## Migrations

```bash
# create a new migration after changing models
uv run alembic revision --autogenerate -m "describe change"

# apply migrations
uv run alembic upgrade head
```

## Tests

```bash
uv run pytest
```
