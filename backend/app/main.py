# app/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import uvicorn
from app.api import scan
from app.config import settings

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Gestion du cycle de vie de l'application"""
    # Démarrage
    print("🚀 Vultrack API démarrée")
    yield
    # Arrêt
    print("🛑 Vultrack API arrêtée")

app = FastAPI(
    title="Vultrack API",
    description="API d'analyse de vulnérabilités web",
    version="1.0.0",
    lifespan=lifespan
)

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclusion des routes
app.include_router(scan.router, prefix="/api/v1")

@app.get("/")
async def root():
    """Point d'entrée de l'API"""
    return {
        "name": "Vultrack API",
        "version": "1.0.0",
        "status": "operational"
    }



