import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getScanResult } from '../services/api';
import ReportDetails from '../components/ReportDetails';
import LoadingSpinner from '../components/LoadingSpinner';

const ReportPage = () => {
  const { scanId } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const result = await getScanResult(scanId);
        if (result) {
          setReport(result);
        } else {
          setError('Rapport non trouvé');
        }
      } catch (err) {
        setError('Erreur lors du chargement du rapport');
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [scanId]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center py-12 text-red-600">{error}</div>;
  if (!report) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ReportDetails report={report} />
      </div>
    </div>
  );
};

export default ReportPage;