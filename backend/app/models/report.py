from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ReportModel(BaseModel):
    """Modèle pour les rapports PDF"""
    scan_id: str
    url: str
    generated_at: datetime
    pdf_path: Optional[str] = None
    pdf_url: Optional[str] = None