from reportlab.lib import colors
from reportlab.lib.pagesizes import letter, A4
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from app.models.scan import ScanResult
import io
from datetime import datetime

class PDFReportGenerator:
    """Générateur de rapports PDF"""
    
    def __init__(self):
        self.styles = getSampleStyleSheet()
        self._create_custom_styles()
    
    def _create_custom_styles(self):
        """Crée des styles personnalisés pour le PDF"""
        self.styles.add(ParagraphStyle(
            name='CustomTitle',
            parent=self.styles['Heading1'],
            fontSize=24,
            textColor=colors.HexColor('#1f2937'),
            spaceAfter=30
        ))
        
        self.styles.add(ParagraphStyle(
            name='SectionTitle',
            parent=self.styles['Heading2'],
            fontSize=16,
            textColor=colors.HexColor('#374151'),
            spaceAfter=12
        ))
    
    async def generate_report(self, scan_result: ScanResult) -> bytes:
        """
        Génère un rapport PDF à partir des résultats de scan
        
        Args:
            scan_result: Résultats du scan
            
        Returns:
            Bytes du fichier PDF
        """
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=A4)
        story = []
        
        # Titre
        story.append(Paragraph("Rapport d'Analyse de Sécurité - Vultrack", self.styles['CustomTitle']))
        story.append(Spacer(1, 12))
        
        # Informations générales
        story.append(Paragraph("Résumé du Scan", self.styles['SectionTitle']))
        
        info_data = [
            ["URL analysée:", scan_result.url],
            ["Date du scan:", scan_result.timestamp.strftime("%d/%m/%Y %H:%M")],
            ["Durée du scan:", f"{scan_result.duration:.2f} secondes"],
            ["Score de sécurité:", f"{scan_result.score}/100"],
            ["Grade:", scan_result.grade]
        ]
        
        info_table = Table(info_data, colWidths=[3*inch, 4*inch])
        info_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#f3f4f6')),
            ('TEXTCOLOR', (0, 0), (-1, -1), colors.HexColor('#1f2937')),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
            ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#e5e7eb'))
        ]))
        
        story.append(info_table)
        story.append(Spacer(1, 20))
        
        # Vulnérabilités détectées
        story.append(Paragraph("Vulnérabilités Détectées", self.styles['SectionTitle']))
        
        if scan_result.vulnerabilities:
            for vuln in scan_result.vulnerabilities:
                # Titre de la vulnérabilité avec couleur selon sévérité
                severity_colors = {
                    "critical": "#dc2626",
                    "high": "#ea580c",
                    "medium": "#f59e0b",
                    "low": "#84cc16",
                    "info": "#06b6d4"
                }
                
                vuln_title = f"<font color='{severity_colors.get(vuln.severity, '#000000')}'>" \
                           f"[{vuln.severity.upper()}]</font> {vuln.name}"
                
                story.append(Paragraph(vuln_title, self.styles['Heading3']))
                story.append(Paragraph(f"<b>Description:</b> {vuln.description}", self.styles['Normal']))
                story.append(Paragraph(f"<b>Catégorie:</b> {vuln.category}", self.styles['Normal']))
                story.append(Paragraph(f"<b>Recommandation:</b> {vuln.recommendation}", self.styles['Normal']))
                story.append(Spacer(1, 12))
        else:
            story.append(Paragraph("Aucune vulnérabilité détectée.", self.styles['Normal']))
        
        # Construction du PDF
        doc.build(story)
        buffer.seek(0)
        return buffer.getvalue()