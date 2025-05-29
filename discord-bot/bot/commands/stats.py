import discord
from discord import app_commands
from discord.ext import commands
import aiohttp
import psutil
import platform
from datetime import datetime

class StatsCog(commands.Cog):
    """Commandes de statistiques"""
    
    def __init__(self, bot):
        self.bot = bot
        self.start_time = datetime.utcnow()
    
    @app_commands.command(name="stats", description="Affiche les statistiques du bot")
    async def stats_command(self, interaction: discord.Interaction):
        """Commande de statistiques"""
        # Calcul de l'uptime
        uptime = datetime.utcnow() - self.start_time
        hours, remainder = divmod(int(uptime.total_seconds()), 3600)
        minutes, seconds = divmod(remainder, 60)
        
        embed = discord.Embed(
            color=0x3b82f6,
            title="Statistiques Vultrack",
            timestamp=datetime.utcnow()
        )
        
        # Statistiques du bot
        embed.add_field(
            name="Bot",
            value=(
                f"**Serveurs:** {len(self.bot.guilds)}\n"
                f"**Utilisateurs:** {sum(g.member_count for g in self.bot.guilds)}\n"
                f"**Uptime:** {hours}h {minutes}m {seconds}s\n"
                f"**Latence:** {round(self.bot.latency * 1000)}ms"
            ),
            inline=True
        )
        
        # Statistiques système
        cpu_percent = psutil.cpu_percent(interval=1)
        memory = psutil.virtual_memory()
        
        embed.add_field(
            name="Système",
            value=(
                f"**OS:** {platform.system()} {platform.release()}\n"
                f"**CPU:** {cpu_percent}%\n"
                f"**RAM:** {memory.percent}%\n"
                f"**Python:** {platform.python_version()}"
            ),
            inline=True
        )
        
        # Statistiques API (si disponible)
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(
                    f"{self.bot.api_base_url}/api/v1/stats",
                    timeout=aiohttp.ClientTimeout(total=5)
                ) as response:
                    if response.status == 200:
                        api_stats = await response.json()
                        embed.add_field(
                            name="API",
                            value=(
                                f"**Status:** En ligne\n"
                                f"**Scans totaux:** {api_stats.get('total_scans', 'N/A')}\n"
                                f"**Scans aujourd'hui:** {api_stats.get('scans_today', 'N/A')}"
                            ),
                            inline=True
                        )
                    else:
                        embed.add_field(
                            name="API",
                            value="**Status:** Hors ligne",
                            inline=True
                        )
        except:
            embed.add_field(
                name="API",
                value="**Status:** Indisponible",
                inline=True
            )
        
        embed.set_footer(text="Vultrack Security Scanner")
        await interaction.response.send_message(embed=embed)

async def setup(bot):
    """Charge le cog"""
    await bot.add_cog(StatsCog(bot))
