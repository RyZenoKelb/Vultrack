import asyncio
import os
from dotenv import load_dotenv
from bot.core import bot

# Chargement des variables d'environnement
load_dotenv()

async def main():
    """Point d'entrée principal"""
    # Token du bot
    token = os.getenv('DISCORD_TOKEN')
    if not token:
        raise ValueError("DISCORD_TOKEN non défini dans .env")
    
    # Démarrage du bot
    async with bot:
        await bot.start(token)

if __name__ == "__main__":
    asyncio.run(main())