FROM python:3.11-slim

WORKDIR /app

# Installation des dépendances
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copie du code
COPY . .

ENV PYTHONPATH=/app

# Commande de démarrage
CMD ["python", "run.py"]
