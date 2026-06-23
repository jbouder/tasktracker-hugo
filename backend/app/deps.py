from typing import Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db

# Use DbSession as a type annotation in route handlers for clean DI:
#   async def my_route(db: DbSession) -> ...:
DbSession = Annotated[AsyncSession, Depends(get_db)]
