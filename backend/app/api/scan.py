from fastapi import APIRouter, HTTPException, BackgroundTasks
from app.models.scan import ScanRequest, ScanResponse, ScanResult
from app.models.scanner import WebScanner
from app.services.analyzer import VulnerabilityAnalyzer
from app.services.pdf_generator import PDFReportGenerator
from datetime import datetime
import uuid
import time

router = APIRouter()

@router.post("/scan", response_model=ScanResponse)
async def scan_website(request: ScanRequest, background_tasks: BackgroundTasks):
    """
    Lance un scan de sécurité sur l'URL fournie
    
    Args:
        request: Requête contenant l'URL à scanner
        
    Returns:
        Résultats du scan avec score et vulnérabilités
    """
    try:
        start_time = time.time()
        
        # Initialisation des services
        scanner = WebScanner()
        analyzer = VulnerabilityAnalyzer()
        
        # Scan du site
        scan_data = await scanner.scan_website(str(request.url))
        
        # Analyse des vulnérabilités
        vulnerabilities = await analyzer.analyze(scan_data)
        
        # Calcul du score (100 - 10 points par vulnérabilité critique, -5 pour high, etc.)
        score = 100
        for vuln in vulnerabilities:
            if vuln.severity == "critical":
                score -= 15
            elif vuln.severity == "high":
                score -= 10
            elif vuln.severity == "medium":
                score -= 5
            elif vuln.severity == "low":
                score -= 2
        
        score = max(0, score)  # Le score ne peut pas être négatif
        
        # Détermination du grade
        if score >= 90:
            grade = "A+"
        elif score >= 80:
            grade = "A"
        elif score >= 70:
            grade = "B"
        elif score >= 60:
            grade = "C"
        elif score >= 50:
            grade = "D"
        else:
            grade = "F"
        
        # Création du résultat
        scan_result = ScanResult(
            scan_id=str(uuid.uuid4()),
            url=str(request.url),
            timestamp=datetime.utcnow(),
            duration=time.time() - start_time,
            score=score,
            grade=grade,
            vulnerabilities=vulnerabilities,
            headers_analyzed=scan_data["headers"],
            technologies_detected=[]  # TODO: Implémenter la détection de technos
        )
        
        # Génération du PDF en arrière-plan
        # TODO: Implémenter la génération et le stockage du PDF
        pdf_url = f"/api/v1/reports/{scan_result.scan_id}.pdf"
        
        return ScanResponse(
            success=True,
            data=scan_result,
            pdf_url=pdf_url
        )
        
    except Exception as e:
        return ScanResponse(
            success=False,
            error=str(e)
        )

@router.get("/scan/{scan_id}")
async def get_scan_result(scan_id: str):
    """
    Récupère les résultats d'un scan précédent
    
    Args:
        scan_id: Identifiant du scan
        
    Returns:
        Résultats du scan
    """
    # TODO: Implémenter la récupération depuis le cache/base de données
    raise HTTPException(status_code=404, detail="Scan non trouvé")

@router.get("/reports/{scan_id}.pdf")
async def download_report(scan_id: str):
    """
    Télécharge le rapport PDF d'un scan
    
    Args:
        scan_id: Identifiant du scan
        
    Returns:
        Fichier PDF
    """
    # TODO: Implémenter le téléchargement du PDF
    raise HTTPException(status_code=404, detail="Rapport non trouvé")