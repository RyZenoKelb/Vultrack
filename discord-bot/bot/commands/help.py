import discord
from discord import app_commands
from discord.ext import commands

class HelpCog(commands.Cog):
    """Commandes d'aide"""
    
    def __init__(self, bot):
        self.bot = bot
    
    @app_commands.command(name="help", description="Affiche les informations d'aide")
    async def help_command(self, interaction: discord.Interaction):
        """Commande d'aide"""
        embed = discord.Embed(
            color=0x3b82f6,
            title="Vultrack - Aide",
            description="Bot d'analyse de sécurité web"
        )
        
        # Commandes disponibles
        embed.add_field(
            name="Commandes",
            value=(
                "**/scan <url>** - Analyse la sécurité d'un site web\n"
                "**/help** - Affiche ce message d'aide\n"
                "**/stats** - Affiche les statistiques du bot\n"
                "**/about** - Informations sur Vultrack"
            ),
            inline=False
        )
        
        # Utilisation
        embed.add_field(
            name="Utilisation",
            value=(
                "1. Utilisez `/scan https://example.com` pour analyser un site\n"
                "2. Attendez que l'analyse se termine (max 30 secondes)\n"
                "3. Consultez les résultats et téléchargez le rapport PDF"
            ),
            inline=False
        )
        
        # Limites
        embed.add_field(
            name="Limites",
            value=(
                "• 1 scan par minute par utilisateur\n"
                "• Timeout de 30 secondes par scan\n"
                "• Seuls les sites publics peuvent être scannés"
            ),
            inline=False
        )
        
        # Liens
        embed.add_field(
            name="Liens",
            value=(
                "[Site Web](https://vultrack.tech) | "
                "[Documentation](https://vultrack.tech/docs) | "
                "[Support](https://vultrack.tech/support)"
            ),
            inline=False
        )
        
        embed.set_footer(text="Vultrack Security Scanner")
        await interaction.response.send_message(embed=embed, ephemeral=True)
    
    @app_commands.command(name="about", description="Informations sur Vultrack")
    async def about_command(self, interaction: discord.Interaction):
        """Commande about"""
        embed = discord.Embed(
            color=0x3b82f6,
            title="À propos de Vultrack",
            description=(
                "Vultrack est un outil professionnel d'analyse de sécurité web "
                "qui détecte les vulnérabilités courantes dans les sites web."
            )
        )
        
        embed.add_field(
            name="Fonctionnalités",
            value=(
                "• Analyse des en-têtes de sécurité\n"
                "• Détection de code dangereux\n"
                "• Vérification des formulaires\n"
                "• Identification des bibliothèques obsolètes\n"
                "• Recherche de clés API exposées"
            ),
            inline=True
        )
        
        embed.add_field(
            name="Technologies",
            value=(
                "• Backend: Python (FastAPI)\n"
                "• Frontend: React + Tailwind\n"
                "• Bot: Discord.py\n"
                "• Rapports: PDF professionnels"
            ),
            inline=True
        )
        
        embed.set_footer(text="Vultrack Security Scanner - Version 1.0.0")
        await interaction.response.send_message(embed=embed)

async def setup(bot):
    """Charge le cog"""
    await bot.add_cog(HelpCog(bot))