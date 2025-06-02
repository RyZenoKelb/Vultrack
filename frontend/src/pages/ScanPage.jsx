import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScanForm from '../components/ScanForm';
import ScanResults from '../components/ScanResults';
import { scanWebsite } from '../services/api';
import toast from 'react-hot-toast';
import { Shield, Zap, FileText } from 'lucide-react';

const ScanPage = () => {
  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleScan = async (url) => {
    setLoading(true);
    setScanResult(null);

    try {
      const result = await scanWebsite(url);
      
      if (result.success) {
        setScanResult(result.data);
        toast.success('Analyse terminée avec succès !');
      } else {
        toast.error(result.error || 'Une erreur est survenue');
      }
    } catch (error) {
      toast.error('Impossible de contacter le serveur');
    } finally {
      setLoading(false);
    }
  };

  const handleViewFullReport = (scanId) => {
    navigate(`/report/${scanId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 to-pink-900 py-16">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6 inline-flex items-center rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-800">
            <Zap className="mr-2 h-4 w-4" />
            Analyse instantanée • Résultats en temps réel
          </div>
          <h1 className="text-4xl font-bold text-white sm:text-5xl mb-4">
            Scanner un site web
          </h1>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Entrez l'URL de votre site pour une analyse complète de sécurité. 
            Détectez les vulnérabilités en moins de 30 secondes.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative -mt-8 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Scan Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12">
          <ScanForm onSubmit={handleScan} loading={loading} />
        </div>

        {/* Features Preview */}
        {!scanResult && !loading && (
          <div className="grid gap-6 md:grid-cols-3 mb-12">
            {[
              {
                icon: Shield,
                title: 'Headers de sécurité',
                description: 'Vérification complète des en-têtes HTTP critiques',
                color: 'bg-blue-500'
              },
              {
                icon: Zap,
                title: 'Analyse rapide',
                description: 'Résultats disponibles en moins de 30 secondes',
                color: 'bg-purple-500'
              },
              {
                icon: FileText,
                title: 'Rapport détaillé',
                description: 'Recommandations actionables et score de sécurité',
                color: 'bg-green-500'
              }
            ].map((feature) => (
              <div key={feature.title} className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 ${feature.color} rounded-lg text-white mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-2xl p-12 text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6 animate-pulse">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Analyse en cours...</h3>
            <p className="text-slate-600 mb-6">Vérification de la sécurité de votre site web</p>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full animate-pulse w-3/4"></div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {scanResult && (
          <div className="mb-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800 mb-4">
                <Shield className="mr-2 h-4 w-4" />
                Analyse terminée avec succès
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Résultats de l'analyse</h2>
              <p className="text-slate-600">Voici un aperçu des vulnérabilités détectées sur votre site</p>
            </div>
            <ScanResults 
              result={scanResult} 
              onViewFullReport={handleViewFullReport}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanPage;