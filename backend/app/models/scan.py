from pydantic import BaseModel, HttpUrl, Field
from typing import List, Optional
from datetime import datetime
from enum import Enum

class SeverityLevel(str, Enum):
    """Niveaux de sévérité des vulnérabilités"""
    CRITICAL = "critical"
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"
    INFO = "info"

class ScanRequest(BaseModel):
    """Modèle de requête de scan"""
    url: HttpUrl
    depth: int = Field(default=1, ge=1, le=3)
    
class Vulnerability(BaseModel):
    """Modèle de vulnérabilité détectée"""
    id: str
    name: str
    description: str
    severity: SeverityLevel
    category: str
    evidence: Optional[str] = None
    recommendation: str
    
class ScanResult(BaseModel):
    """Modèle de résultat de scan"""
    scan_id: str
    url: str
    timestamp: datetime
    duration: float
    score: int = Field(ge=0, le=100)
    grade: str  # A+, A, B, C, D, F
    vulnerabilities: List[Vulnerability]
    headers_analyzed: dict
    technologies_detected: List[str]
    
class ScanResponse(BaseModel):
    """Réponse API pour un scan"""
    success: bool
    data: Optional[ScanResult] = None
    error: Optional[str] = None
    pdf_url: Optional[str] = None
