from typing import List, Dict
from app.models.scan import Vulnerability, SeverityLevel
from bs4 import BeautifulSoup
import re

class VulnerabilityAnalyzer:
    """Analyseur de vulnérabilités"""
    
    def __init__(self):
        self.checks = [
            self._check_security_headers,
            self._check_eval_usage,
            self._check_insecure_forms,
            self._check_mixed_content,
            self._check_outdated_libraries,
            self._check_exposed_api_keys,
            self._check_sql_injection_prone,
            self._check_xss_vulnerabilities
        ]
    
    async def analyze(self, scan_data: Dict) -> List[Vulnerability]:
        """
        Analyse les données scannées pour détecter les vulnérabilités
        
        Args:
            scan_data: Données du scan (HTML, headers, etc.)
            
        Returns:
            Liste des vulnérabilités détectées
        """
        vulnerabilities = []
        
        for check in self.checks:
            vulns = await check(scan_data)
            vulnerabilities.extend(vulns)
            
        return vulnerabilities
    
    async def _check_security_headers(self, scan_data: Dict) -> List[Vulnerability]:
        """Vérifie les en-têtes de sécurité"""
        vulnerabilities = []
        headers = scan_data.get("headers", {})
        
        # Content-Security-Policy
        if "content-security-policy" not in headers:
            vulnerabilities.append(Vulnerability(
                id="missing-csp",
                name="Content-Security-Policy manquant",
                description="L'en-tête CSP n'est pas défini, ce qui peut permettre des attaques XSS",
                severity=SeverityLevel.HIGH,
                category="Headers",
                recommendation="Définir une politique CSP stricte"
            ))
        
        # X-Frame-Options
        if "x-frame-options" not in headers:
            vulnerabilities.append(Vulnerability(
                id="missing-xfo",
                name="X-Frame-Options manquant",
                description="Le site peut être vulnérable au clickjacking",
                severity=SeverityLevel.MEDIUM,
                category="Headers",
                recommendation="Ajouter l'en-tête X-Frame-Options: DENY"
            ))
        
        # Strict-Transport-Security
        if "strict-transport-security" not in headers:
            vulnerabilities.append(Vulnerability(
                id="missing-hsts",
                name="HSTS non configuré",
                description="Le site n'impose pas l'utilisation de HTTPS",
                severity=SeverityLevel.HIGH,
                category="Headers",
                recommendation="Activer HSTS avec une durée d'au moins 1 an"
            ))
        
        return vulnerabilities
    
    async def _check_eval_usage(self, scan_data: Dict) -> List[Vulnerability]:
        """Détecte l'utilisation dangereuse d'eval()"""
        vulnerabilities = []
        html = scan_data.get("html", "")
        
        # Recherche de patterns dangereux
        eval_patterns = [
            r'eval\s*\(',
            r'new\s+Function\s*\(',
            r'setTimeout\s*\([\'"].*[\'"]',
            r'setInterval\s*\([\'"].*[\'"]'
        ]
        
        for pattern in eval_patterns:
            if re.search(pattern, html, re.IGNORECASE):
                vulnerabilities.append(Vulnerability(
                    id="dangerous-eval",
                    name="Utilisation dangereuse d'eval()",
                    description="Le code utilise eval() ou équivalent, ce qui peut permettre l'exécution de code arbitraire",
                    severity=SeverityLevel.CRITICAL,
                    category="JavaScript",
                    evidence=pattern,
                    recommendation="Éviter eval() et utiliser des alternatives sûres comme JSON.parse()"
                ))
                break
        
        return vulnerabilities
    
    async def _check_insecure_forms(self, scan_data: Dict) -> List[Vulnerability]:
        """Vérifie la sécurité des formulaires"""
        vulnerabilities = []
        html = scan_data.get("html", "")
        soup = BeautifulSoup(html, "html.parser")
        
        forms = soup.find_all("form")
        for form in forms:
            # Vérification HTTPS sur les formulaires sensibles
            action = form.get("action", "")
            if action and action.startswith("http://"):
                vulnerabilities.append(Vulnerability(
                    id="insecure-form",
                    name="Formulaire non sécurisé",
                    description="Un formulaire envoie des données via HTTP non chiffré",
                    severity=SeverityLevel.HIGH,
                    category="Forms",
                    evidence=f"Action: {action}",
                    recommendation="Utiliser HTTPS pour tous les formulaires"
                ))
            
            # Vérification de l'absence de CSRF token
            csrf_indicators = ["csrf", "token", "_token", "authenticity_token"]
            has_csrf = any(
                form.find("input", {"name": re.compile(indicator, re.I)})
                for indicator in csrf_indicators
            )
            
            if not has_csrf and form.get("method", "").upper() == "POST":
                vulnerabilities.append(Vulnerability(
                    id="missing-csrf",
                    name="Protection CSRF manquante",
                    description="Le formulaire POST ne semble pas avoir de protection CSRF",
                    severity=SeverityLevel.MEDIUM,
                    category="Forms",
                    recommendation="Implémenter des tokens CSRF pour tous les formulaires POST"
                ))
                
        return vulnerabilities
    
    async def _check_mixed_content(self, scan_data: Dict) -> List[Vulnerability]:
        """Détecte le contenu mixte (HTTP dans HTTPS)"""
        vulnerabilities = []
        html = scan_data.get("html", "")
        url = scan_data.get("url", "")
        
        if url.startswith("https://"):
            # Recherche de ressources HTTP
            http_resources = re.findall(r'(src|href)=["\']http://[^"\']+["\']', html)
            if http_resources:
                vulnerabilities.append(Vulnerability(
                    id="mixed-content",
                    name="Contenu mixte détecté",
                    description="Le site HTTPS charge des ressources via HTTP",
                    severity=SeverityLevel.MEDIUM,
                    category="HTTPS",
                    evidence=f"{len(http_resources)} ressources HTTP trouvées",
                    recommendation="Charger toutes les ressources via HTTPS"
                ))
        
        return vulnerabilities
    
    async def _check_outdated_libraries(self, scan_data: Dict) -> List[Vulnerability]:
        """Détecte les bibliothèques JavaScript obsolètes"""
        vulnerabilities = []
        html = scan_data.get("html", "")
        
        # Détection de versions obsolètes connues
        outdated_patterns = {
            "jQuery": {
                "pattern": r'jquery[/-](\d+\.\d+\.\d+)',
                "vulnerable_versions": ["1.", "2.0", "2.1"],
                "severity": SeverityLevel.MEDIUM
            },
            "Angular": {
                "pattern": r'angular[/-](\d+\.\d+\.\d+)',
                "vulnerable_versions": ["1."],
                "severity": SeverityLevel.HIGH
            }
        }
        
        for lib_name, config in outdated_patterns.items():
            match = re.search(config["pattern"], html, re.IGNORECASE)
            if match:
                version = match.group(1)
                for vuln_version in config["vulnerable_versions"]:
                    if version.startswith(vuln_version):
                        vulnerabilities.append(Vulnerability(
                            id=f"outdated-{lib_name.lower()}",
                            name=f"{lib_name} obsolète",
                            description=f"Version vulnérable de {lib_name} détectée: {version}",
                            severity=config["severity"],
                            category="Libraries",
                            evidence=f"Version: {version}",
                            recommendation=f"Mettre à jour {lib_name} vers la dernière version stable"
                        ))
                        break
        
        return vulnerabilities
    
    async def _check_exposed_api_keys(self, scan_data: Dict) -> List[Vulnerability]:
        """Recherche des clés API exposées"""
        vulnerabilities = []
        html = scan_data.get("html", "")
        
        # Patterns de clés API courantes
        api_patterns = {
            "Google Maps": r'AIza[0-9A-Za-z\-_]{35}',
            "AWS": r'AKIA[0-9A-Z]{16}',
            "GitHub": r'[a-zA-Z0-9_-]{40}',
            "Stripe": r'(pk|sk)_(test|live)_[0-9a-zA-Z]{24,}'
        }
        
        for service, pattern in api_patterns.items():
            if re.search(pattern, html):
                vulnerabilities.append(Vulnerability(
                    id=f"exposed-api-key-{service.lower().replace(' ', '-')}",
                    name=f"Clé API {service} potentiellement exposée",
                    description=f"Une clé API {service} semble être exposée dans le code source",
                    severity=SeverityLevel.CRITICAL,
                    category="API Keys",
                    recommendation="Retirer les clés API du code client et utiliser un proxy backend"
                ))
        
        return vulnerabilities
    
    async def _check_sql_injection_prone(self, scan_data: Dict) -> List[Vulnerability]:
        """Détecte les indicateurs de vulnérabilité SQL Injection"""
        vulnerabilities = []
        html = scan_data.get("html", "")
        
        # Recherche d'indicateurs d'erreurs SQL
        sql_error_patterns = [
            r'SQL syntax.*MySQL',
            r'Warning.*mysql_.*',
            r'PostgreSQL.*ERROR',
            r'ORA-[0-9]{5}',
            r'Microsoft.*ODBC.*SQL Server',
            r'SQLite.*error'
        ]
        
        for pattern in sql_error_patterns:
            if re.search(pattern, html, re.IGNORECASE):
                vulnerabilities.append(Vulnerability(
                    id="sql-error-exposed",
                    name="Messages d'erreur SQL exposés",
                    description="Des messages d'erreur SQL sont visibles, indiquant une possible vulnérabilité",
                    severity=SeverityLevel.HIGH,
                    category="SQL",
                    evidence=pattern,
                    recommendation="Masquer les messages d'erreur en production et valider toutes les entrées"
                ))
                break
        
        return vulnerabilities
    
    async def _check_xss_vulnerabilities(self, scan_data: Dict) -> List[Vulnerability]:
        """Détecte les vulnérabilités XSS potentielles"""
        vulnerabilities = []
        html = scan_data.get("html", "")
        soup = BeautifulSoup(html, "html.parser")
        
        # Recherche d'attributs dangereux
        dangerous_attrs = ["onload", "onerror", "onclick", "onmouseover"]
        elements_with_events = soup.find_all(attrs={attr: True for attr in dangerous_attrs})
        
        if elements_with_events:
            vulnerabilities.append(Vulnerability(
                id="inline-event-handlers",
                name="Gestionnaires d'événements inline",
                description="Des gestionnaires d'événements inline peuvent faciliter les attaques XSS",
                severity=SeverityLevel.MEDIUM,
                category="XSS",
                evidence=f"{len(elements_with_events)} éléments avec événements inline",
                recommendation="Utiliser addEventListener() au lieu d'attributs inline"
            ))
        
        # Recherche de document.write
        if "document.write" in html:
            vulnerabilities.append(Vulnerability(
                id="document-write-usage",
                name="Utilisation de document.write()",
                description="document.write() peut être exploité pour des attaques XSS",
                severity=SeverityLevel.MEDIUM,
                category="XSS",
                recommendation="Remplacer document.write() par des méthodes DOM sûres"
            ))
        
        return vulnerabilities

