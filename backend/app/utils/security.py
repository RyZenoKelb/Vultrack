from functools import wraps
from fastapi import HTTPException, Request
import time
from typing import Dict
import re

# Stockage en mémoire pour le rate limiting (remplacer par Redis en production)
rate_limit_storage: Dict[str, list] = {}

def rate_limit(max_requests: int = 10, window_seconds: int = 60):
    """
    Décorateur pour limiter le nombre de requêtes par IP
    
    Args:
        max_requests: Nombre maximum de requêtes
        window_seconds: Fenêtre de temps en secondes
    """
    def decorator(func):
        @wraps(func)
        async def wrapper(request: Request, *args, **kwargs):
            # Obtenir l'IP du client
            client_ip = request.client.host
            current_time = time.time()
            
            # Initialiser ou nettoyer l'historique des requêtes
            if client_ip not in rate_limit_storage:
                rate_limit_storage[client_ip] = []
            
            # Nettoyer les anciennes requêtes
            rate_limit_storage[client_ip] = [
                timestamp for timestamp in rate_limit_storage[client_ip]
                if current_time - timestamp < window_seconds
            ]
            
            # Vérifier la limite
            if len(rate_limit_storage[client_ip]) >= max_requests:
                raise HTTPException(
                    status_code=429,
                    detail=f"Trop de requêtes. Limite: {max_requests} par {window_seconds} secondes"
                )
            
            # Ajouter la requête actuelle
            rate_limit_storage[client_ip].append(current_time)
            
            return await func(request, *args, **kwargs)
        
        return wrapper
    return decorator

def validate_url(url: str) -> bool:
    """
    Valide qu'une URL est bien formée et accessible
    
    Args:
        url: URL à valider
        
    Returns:
        True si l'URL est valide, False sinon
    """
    # Pattern pour valider l'URL
    url_pattern = re.compile(
        r'^https?://'  # http:// ou https://
        r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,6}\.?|'  # domaine
        r'localhost|'  # localhost
        r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'  # IP
        r'(?::\d+)?'  # port optionnel
        r'(?:/?|[/?]\S+)$', re.IGNORECASE
    )
    
    return bool(url_pattern.match(url))
