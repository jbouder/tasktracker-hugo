from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "tasktracker"
    database_url: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/tasktracker"
    echo_sql: bool = False
    environment: str = "development"


settings = Settings()
