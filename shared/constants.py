"""Constantes partagées entre les différents composants"""

# Niveaux de sévérité
SEVERITY_LEVELS = {
    "CRITICAL": {
        "value": "critical",
        "score_impact": 15,
        "color": "#dc2626"
    },
    "HIGH": {
        "value": "high",
        "score_impact": 10,
        "color": "#ea580c"
    },
    "MEDIUM": {
        "value": "medium",
        "score_impact": 5,
        "color": "#f59e0b"
    },
    "LOW": {
        "value": "low",
        "score_impact": 2,
        "color": "#84cc16"
    },
    "INFO": {
        "value": "info",
        "score_impact": 0,
        "color": "#06b6d4"
    }
}

# Grades de sécurité
SECURITY_GRADES = {
    "A+": {"min_score": 90, "color": "#22c55e"},
    "A": {"min_score": 80, "color": "#22c55e"},
    "B": {"min_score": 70, "color": "#84cc16"},
    "C": {"min_score": 60, "color": "#f59e0b"},
    "D": {"min_score": 50, "color": "#f97316"},
    "F": {"min_score": 0, "color": "#ef4444"}
}

# Headers de sécurité à vérifier
SECURITY_HEADERS = [
    "content-security-policy",
    "x-frame-options",
    "x-content-type-options",
    "strict-transport-security",
    "x-xss-protection",
    "referrer-policy",
    "permissions-policy"
]

# Patterns de code dangereux
DANGEROUS_PATTERNS = {
    "eval": r'eval\s*\(',
    "new_function": r'new\s+Function\s*\(',
    "settimeout_string": r'setTimeout\s*\([\'"].*[\'"]',
    "setinterval_string": r'setInterval\s*\([\'"].*[\'"]',
    "document_write": r'document\.write\s*\(',
    "innerhtml": r'\.innerHTML\s*=',
    "outerhtml": r'\.outerHTML\s*='
}