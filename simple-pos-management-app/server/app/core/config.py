from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    # API
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Backoffice POS System"
    DESCRIPTION: str = "Backend API for Backoffice POS System"
    VERSION: str = "1.0.0"

    # Database
    DATABASE_URL: str

    class Config:
        case_sensitive = True
        env_file = ".env"


settings = Settings()
