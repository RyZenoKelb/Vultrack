import React from 'react';
import { Shield, AlertCircle, CheckCircle, Download, ExternalLink } from 'lucide-react';
import VulnerabilityCard from './VulnerabilityCard';

const ScanResults = ({ result, onViewFullReport }) => {
  const getGradeColor = (grade) => {
    const colors = {
      'A+': 'text-green-600',
      'A': 'text-green-600',
      'B': 'text-lime-600',
      'C': 'text-yellow-600',
      'D': 'text-orange-600',
      'F': 'text-red-600'
    };
    return colors[grade] || 'text-gray-600';
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 px-6 py-4 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Résultats de l'analyse</h2>
            <p className="text-sm text-gray-600 mt-1">{result.url}</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getGradeColor(result.grade)}`}>
                {result.grade}
              </div>
              <div className="text-sm text-gray-600">Grade</div>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-bold ${getScoreColor(result.score)}`}>
                {result.score}
              </div>
              <div className="text-sm text-gray-600">Score /100</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50">
        <div className="text-center">
          <div className="text-2xl font-semibold text-gray-900">{result.duration.toFixed(2)}s</div>
          <div className="text-sm text-gray-600">Durée</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-semibold text-gray-900">
            {Object.keys(result.headers_analyzed).length}
          </div>
          <div className="text-sm text-gray-600">Headers</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-semibold text-gray-900">
            {result.technologies_detected.length}
          </div>
          <div className="text-sm text-gray-600">Technologies</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-semibold text-gray-900">
            {result.vulnerabilities.length}
          </div>
          <div className="text-sm text-gray-600">Vulnérabilités</div>
        </div>
      </div>

      {/* Vulnerabilities */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Vulnérabilités détectées ({result.vulnerabilities.length})
        </h3>
        
        {result.vulnerabilities.length > 0 ? (
          <div className="space-y-4">
            {result.vulnerabilities.slice(0, 5).map((vuln, index) => (
              <VulnerabilityCard key={index} vulnerability={vuln} />
            ))}
            {result.vulnerabilities.length > 5 && (
              <p className="text-center text-gray-600 pt-4">
                Et {result.vulnerabilities.length - 5} autres vulnérabilités...
              </p>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <p className="text-lg text-gray-600">Aucune vulnérabilité détectée!</p>
            <p className="text-sm text-gray-500 mt-2">Votre site semble bien sécurisé.</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="bg-gray-50 px-6 py-4 border-t">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            ID: <code className="bg-gray-200 px-2 py-1 rounded text-xs">{result.scan_id}</code>
          </p>
          <div className="flex space-x-4">
            <button 
              onClick={() => onViewFullReport(result.scan_id)}
              className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Rapport complet
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanResults;