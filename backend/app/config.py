from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    """Configuration de l'application"""
    APP_NAME: str = "Vultrack"
    DEBUG: bool = False
    
    # CORS
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000"]
    
    # Limites
    MAX_SCAN_DURATION: int = 30  # secondes
    MAX_URL_LENGTH: int = 2048
    
    # Redis (pour le cache)
    REDIS_URL: str = "redis://localhost:6379"
    
    # Rate limiting
    RATE_LIMIT_PER_MINUTE: int = 10
    
    class Config:
        env_file = ".env"

settings = Settings()