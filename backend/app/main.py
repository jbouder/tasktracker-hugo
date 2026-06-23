from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.config import settings
from app.routers import health


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: initialize resources (cache warm-up, connection pool checks, etc.)
    yield
    # Shutdown: clean up resources


def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.app_name,
        version="0.1.0",
        lifespan=lifespan,
    )

    app.include_router(health.router, prefix="/health", tags=["health"])

    return app


app = create_app()
