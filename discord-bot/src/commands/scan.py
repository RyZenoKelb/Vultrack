import discord
from discord import app_commands
from discord.ext import commands
import aiohttp
import re
from typing import Optional
import asyncio
from datetime import datetime, timedelta

class ScanCog(commands.Cog):
    """Commandes de scan de sécurité"""
    
    def __init__(self, bot):
        self.bot = bot
        # Cooldown: {user_id: last_scan_time}
        self.cooldowns = {}
        self.cooldown_duration = 60  # secondes
        
    def _create_embed(self, color: int, title: str, description: str) -> discord.Embed:
        """Crée un embed standardisé"""
        embed = discord.Embed(
            color=color,
            title=title,
            description=description,
            timestamp=datetime.utcnow()
        )
        embed.set_footer(text="Vultrack Security Scanner")
        return embed
    
    def _check_cooldown(self, user_id: int) -> Optional[int]:
        """Vérifie le cooldown d'un utilisateur"""
        if user_id in self.cooldowns:
            last_scan = self.cooldowns[user_id]
            elapsed = (datetime.utcnow() - last_scan).total_seconds()
            
            if elapsed < self.cooldown_duration:
                return int(self.cooldown_duration - elapsed)
        
        return None
    
    def _validate_url(self, url: str) -> bool:
        """Valide le format de l'URL"""
        url_pattern = re.compile(
            r'^https?://'  # http:// ou https://
            r'(?:(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+[A-Z]{2,6}\.?|'  # domaine
            r'localhost|'  # localhost
            r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})'  # IP
            r'(?::\d+)?'  # port optionnel
            r'(?:/?|[/?]\S+)$', re.IGNORECASE
        )
        return url_pattern.match(url) is not None
    
    @app_commands.command(name="scan", description="Analyse la sécurité d'un site web")
    @app_commands.describe(url="L'URL du site web à analyser")
    async def scan_command(self, interaction: discord.Interaction, url: str):
        """
        Commande slash pour scanner un site web
        
        Args:
            interaction: Interaction Discord
            url: URL à scanner
        """
        # Vérification du cooldown
        cooldown_remaining = self._check_cooldown(interaction.user.id)
        if cooldown_remaining:
            embed = self._create_embed(
                color=0xf59e0b,  # Orange
                title="Cooldown actif",
                description=f"Veuillez attendre {cooldown_remaining} secondes avant de lancer un nouveau scan."
            )
            await interaction.response.send_message(embed=embed, ephemeral=True)
            return
        
        # Validation de l'URL
        if not self._validate_url(url):
            embed = self._create_embed(
                color=0xef4444,  # Rouge
                title="URL invalide",
                description="Veuillez fournir une URL valide (ex: https://example.com)"
            )
            await interaction.response.send_message(embed=embed, ephemeral=True)
            return
        
        # Envoi du message initial
        embed = self._create_embed(
            color=0x3b82f6,  # Bleu
            title="Scan en cours...",
            description=f"Analyse de sécurité de `{url}` en cours..."
        )
        await interaction.response.send_message(embed=embed)
        
        # Mise à jour du cooldown
        self.cooldowns[interaction.user.id] = datetime.utcnow()
        
        try:
            # Appel à l'API
            async with aiohttp.ClientSession() as session:
                async with session.post(
                    f"{self.bot.api_base_url}/api/v1/scan",
                    json={"url": url},
                    timeout=aiohttp.ClientTimeout(total=35)
                ) as response:
                    data = await response.json()
            
            if data.get("success"):
                scan_result = data["data"]
                
                # Création de l'embed de résultat
                embed = self._create_embed(
                    color=self._get_grade_color(scan_result["grade"]),
                    title=f"Résultats du scan - {scan_result['grade']}",
                    description=f"**Site:** {url}\n**Score:** {scan_result['score']}/100"
                )
                
                # Ajout des informations de scan
                embed.add_field(
                    name="Informations",
                    value=f"**ID:** `{scan_result['scan_id']}`\n"
                          f"**Durée:** {scan_result['duration']:.2f}s\n"
                          f"**Technologies:** {len(scan_result['technologies_detected'])}",
                    inline=True
                )
                
                # Résumé des vulnérabilités
                vuln_summary = self._get_vulnerability_summary(scan_result["vulnerabilities"])
                embed.add_field(
                    name="Vulnérabilités",
                    value=vuln_summary,
                    inline=True
                )
                
                # Top 3 des vulnérabilités critiques
                critical_vulns = [v for v in scan_result["vulnerabilities"] if v["severity"] == "critical"]
                if critical_vulns:
                    critical_text = "\n".join([f"• {v['name']}" for v in critical_vulns[:3]])
                    embed.add_field(
                        name="Vulnérabilités Critiques",
                        value=critical_text,
                        inline=False
                    )
                
                # Lien vers le rapport complet
                report_url = f"{self.bot.website_url}/scan/{scan_result['scan_id']}"
                embed.add_field(
                    name="Rapport Complet",
                    value=f"[Voir le rapport détaillé]({report_url})",
                    inline=False
                )
                
                # Boutons d'action
                view = ScanResultView(scan_result["scan_id"], data.get("pdf_url"))
                
                await interaction.edit_original_response(embed=embed, view=view)
                
            else:
                # Erreur lors du scan
                embed = self._create_embed(
                    color=0xef4444,  # Rouge
                    title="Erreur lors du scan",
                    description=f"Impossible d'analyser le site:\n```{data.get('error', 'Erreur inconnue')}```"
                )
                await interaction.edit_original_response(embed=embed)
                
        except asyncio.TimeoutError:
            embed = self._create_embed(
                color=0xef4444,
                title="Timeout",
                description="Le scan a pris trop de temps. Veuillez réessayer."
            )
            await interaction.edit_original_response(embed=embed)
            
        except Exception as e:
            logger.error(f"Erreur lors du scan: {str(e)}")
            embed = self._create_embed(
                color=0xef4444,
                title="Erreur",
                description="Une erreur inattendue s'est produite."
            )
            await interaction.edit_original_response(embed=embed)
    
    def _get_grade_color(self, grade: str) -> int:
        """Retourne la couleur correspondant au grade"""
        colors = {
            "A+": 0x22c55e,  # Vert
            "A": 0x22c55e,
            "B": 0x84cc16,   # Vert clair
            "C": 0xf59e0b,   # Orange
            "D": 0xf97316,   # Orange foncé
            "F": 0xef4444    # Rouge
        }
        return colors.get(grade, 0x6b7280)  # Gris par défaut
    
    def _get_vulnerability_summary(self, vulnerabilities: list) -> str:
        """Crée un résumé des vulnérabilités"""
        counts = {
            "critical": 0,
            "high": 0,
            "medium": 0,
            "low": 0,
            "info": 0
        }
        
        for vuln in vulnerabilities:
            counts[vuln["severity"]] += 1
        
        summary_parts = []
        if counts["critical"] > 0:
            summary_parts.append(f"**{counts['critical']}** Critiques")
        if counts["high"] > 0:
            summary_parts.append(f"**{counts['high']}** Élevées")
        if counts["medium"] > 0:
            summary_parts.append(f"**{counts['medium']}** Moyennes")
        if counts["low"] > 0:
            summary_parts.append(f"**{counts['low']}** Faibles")
        if counts["info"] > 0:
            summary_parts.append(f"**{counts['info']}** Info")
        
        return "\n".join(summary_parts) if summary_parts else "Aucune vulnérabilité détectée"

class ScanResultView(discord.ui.View):
    """Vue avec boutons pour les résultats de scan"""
    
    def __init__(self, scan_id: str, pdf_url: Optional[str] = None):
        super().__init__(timeout=300)  # 5 minutes
        self.scan_id = scan_id
        self.pdf_url = pdf_url
        
        # Bouton PDF si disponible
        if pdf_url:
            self.add_item(discord.ui.Button(
                label="Télécharger PDF",
                style=discord.ButtonStyle.primary,
                url=pdf_url,
                row=0
            ))
        
        # Bouton rapport web
        self.add_item(discord.ui.Button(
            label="Rapport Complet",
            style=discord.ButtonStyle.link,
            url=f"https://vultrack.tech/scan/{scan_id}",
            row=0
        ))
    
    @discord.ui.button(label="Partager", style=discord.ButtonStyle.secondary, row=1)
    async def share_button(self, interaction: discord.Interaction, button: discord.ui.Button):
        """Partage le rapport dans le canal"""
        embed = discord.Embed(
            color=0x3b82f6,
            title="Rapport de Scan Partagé",
            description=f"**Partagé par:** {interaction.user.mention}\n"
                       f"**Lien:** https://vultrack.tech/scan/{self.scan_id}"
        )
        await interaction.response.send_message(embed=embed)
    
    @discord.ui.button(label="Fermer", style=discord.ButtonStyle.danger, row=1)
    async def close_button(self, interaction: discord.Interaction, button: discord.ui.Button):
        """Supprime le message"""
        await interaction.message.delete()

async def setup(bot):
    """Charge le cog"""
    await bot.add_cog(ScanCog(bot))