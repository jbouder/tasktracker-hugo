# tasktracker

A FastAPI backend with PostgreSQL.

## Stack

- Python 3.12 + FastAPI + Uvicorn
- PostgreSQL 16 + SQLAlchemy 2 (async) + asyncpg
- Alembic (migrations)
- Pydantic v2 + pydantic-settings
- pytest + pytest-asyncio + httpx
- Ruff (lint + format)
- uv (package manager)

## Prerequisites

- Python 3.12+
- [uv](https://docs.astral.sh/uv/) — `curl -LsSf https://astral.sh/uv/install.sh | sh`
- Docker + Docker Compose

## Setup

```bash
docker-compose up -d          # start Postgres (dev: 5432, test: 5433)
uv sync                       # install dependencies
uv run alembic upgrade head   # run migrations
```

## Commands

```bash
uv run uvicorn app.main:app --reload --port 8000   # dev server
uv run pytest                                       # run tests
uv run pytest --cov=app --cov-report=term-missing  # with coverage
uv run ruff check .                                 # lint
uv run ruff format .                                # format
uv run alembic revision --autogenerate -m "msg"    # new migration
uv run alembic upgrade head                         # apply migrations
uv run alembic downgrade -1                         # roll back one
```

See [AGENTS.md](./AGENTS.md) for full conventions and coding standards.
