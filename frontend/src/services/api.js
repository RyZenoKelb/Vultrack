import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60 secondes
  headers: {
    'Content-Type': 'application/json',
  },
});

export const scanWebsite = async (url) => {
  try {
    const response = await api.post('/api/v1/scan', { url });
    return response.data;
  } catch (error) {
    console.error('Erreur lors du scan:', error);
    throw error;
  }
};

export const getScanResult = async (scanId) => {
  try {
    const response = await api.get(`/api/v1/scan/${scanId}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du scan:', error);
    return null;
  }
};

export const downloadReport = async (scanId) => {
  try {
    const response = await api.get(`/api/v1/reports/${scanId}.pdf`, {
      responseType: 'blob',
    });
    
    // Créer un lien pour télécharger le fichier
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `vultrack-report-${scanId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('Erreur lors du téléchargement du rapport:', error);
  }
};