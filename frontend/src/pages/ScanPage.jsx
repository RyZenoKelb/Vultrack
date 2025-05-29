import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScanForm from '../components/ScanForm';
import ScanResults from '../components/ScanResults';
import { scanWebsite } from '../services/api';
import toast from 'react-hot-toast';

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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Scanner un site web</h1>
          <p className="mt-2 text-lg text-gray-600">
            Entrez l'URL du site à analyser pour détecter les vulnérabilités
          </p>
        </div>

        <div className="mt-8 mx-auto max-w-2xl">
          <ScanForm onSubmit={handleScan} loading={loading} />
        </div>

        {scanResult && (
          <div className="mt-12">
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