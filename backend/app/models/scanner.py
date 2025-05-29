import httpx
import asyncio
from typing import Dict, Optional
from bs4 import BeautifulSoup
from app.models.scan import ScanResult, Vulnerability, SeverityLevel
import uuid
from datetime import datetime

class WebScanner:
    """Service de scan de sites web"""
    
    def __init__(self):
        self.timeout = httpx.Timeout(10.0, connect=5.0)
        
    async def scan_website(self, url: str) -> Dict:
        """
        Effectue un scan complet du site web
        
        Args:
            url: URL à scanner
            
        Returns:
            Dictionnaire contenant HTML, headers, et métadonnées
        """
        async with httpx.AsyncClient(timeout=self.timeout, follow_redirects=True) as client:
            try:
                response = await client.get(url)
                response.raise_for_status()
                
                return {
                    "url": str(response.url),
                    "status_code": response.status_code,
                    "headers": dict(response.headers),
                    "html": response.text,
                    "response_time": response.elapsed.total_seconds()
                }
            except httpx.RequestError as e:
                raise Exception(f"Erreur lors du scan: {str(e)}")
