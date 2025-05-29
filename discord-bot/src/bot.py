# bot.py
import discord
from discord import app_commands
from discord.ext import commands
import aiohttp
import os
from typing import Optional
import logging
from datetime import datetime
import asyncio

# Configuration du logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger('vultrack-bot')

class VultrackBot(commands.Bot):
    """Bot Discord Vultrack"""
    
    def __init__(self):
        intents = discord.Intents.default()
        intents.message_content = True
        
        super().__init__(
            command_prefix='!',
            intents=intents,
            description='Bot d\'analyse de sécurité web'
        )
        
        self.api_base_url = os.getenv('API_BASE_URL', 'http://localhost:8000')
        self.website_url = os.getenv('WEBSITE_URL', 'https://vultrack.tech')
        
    async def setup_hook(self):
        """Configuration initiale du bot"""
        # Chargement des commandes
        await self.load_extension('commands.scan')
        await self.load_extension('commands.help')
        await self.load_extension('commands.stats')
        
        # Synchronisation des commandes slash
        await self.tree.sync()
        logger.info(f"Synchronisé {len(self.tree.get_commands())} commandes slash")
        
    async def on_ready(self):
        """Événement déclenché quand le bot est prêt"""
        logger.info(f'{self.user} est connecté et prêt!')
        
        # Définir le statut du bot
        await self.change_presence(
            activity=discord.Activity(
                type=discord.ActivityType.watching,
                name="la sécurité du web"
            )
        )

# Initialisation du bot
bot = VultrackBot()





