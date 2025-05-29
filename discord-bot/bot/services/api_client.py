import aiohttp
from typing import Dict, Optional
import logging

logger = logging.getLogger('vultrack-bot')

class APIClient:
    """Client pour l'API Vultrack"""
    
    def __init__(self, base_url: str):
        self.base_url = base_url.rstrip('/')
        self.session = None
    
    async def __aenter__(self):
        self.session = aiohttp.ClientSession()
        return self
    
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    async def scan_website(self, url: str) -> Dict:
        """
        Lance un scan via l'API
        
        Args:
            url: URL à scanner
            
        Returns:
            Résultats du scan
        """
        try:
            async with self.session.post(
                f"{self.base_url}/api/v1/scan",
                json={"url": url},
                timeout=aiohttp.ClientTimeout(total=35)
            ) as response:
                return await response.json()
        except Exception as e:
            logger.error(f"Erreur API scan: {str(e)}")
            raise
    
    async def get_scan_result(self, scan_id: str) -> Optional[Dict]:
        """
        Récupère les résultats d'un scan
        
        Args:
            scan_id: ID du scan
            
        Returns:
            Résultats du scan ou None
        """
        try:
            async with self.session.get(
                f"{self.base_url}/api/v1/scan/{scan_id}",
                timeout=aiohttp.ClientTimeout(total=10)
            ) as response:
                if response.status == 200:
                    return await response.json()
                return None
        except Exception as e:
            logger.error(f"Erreur API get_scan: {str(e)}")
            return None
    
    async def get_stats(self) -> Optional[Dict]:
        """
        Récupère les statistiques de l'API
        
        Returns:
            Statistiques ou None
        """
        try:
            async with self.session.get(
                f"{self.base_url}/api/v1/stats",
                timeout=aiohttp.ClientTimeout(total=5)
            ) as response:
                if response.status == 200:
                    return await response.json()
                return None
        except Exception as e:
            logger.error(f"Erreur API stats: {str(e)}")
            return None
