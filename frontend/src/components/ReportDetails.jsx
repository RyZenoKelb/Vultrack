import React from 'react';
import { Shield, Globe, Clock, FileText, Download } from 'lucide-react';
import VulnerabilityCard from './VulnerabilityCard';

const ReportDetails = ({ report }) => {
  const getGradeColor = (grade) => {
    const colors = {
      'A+': 'text-green-600 bg-green-50',
      'A': 'text-green-600 bg-green-50',
      'B': 'text-lime-600 bg-lime-50',
      'C': 'text-yellow-600 bg-yellow-50',
      'D': 'text-orange-600 bg-orange-50',
      'F': 'text-red-600 bg-red-50'
    };
    return colors[grade] || 'text-gray-600 bg-gray-50';
  };

  const gradeStyle = getGradeColor(report.grade);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Rapport de sécurité</h1>
              <p className="mt-1 text-sm text-gray-600">{report.url}</p>
            </div>
            <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
              <Download className="h-4 w-4 mr-2" />
              Télécharger PDF
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${gradeStyle}`}>
                <span className="text-4xl font-bold">{report.grade}</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">Grade de sécurité</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-50">
                <span className="text-4xl font-bold text-gray-900">{report.score}</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">Score sur 100</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-50">
                <span className="text-4xl font-bold text-gray-900">{report.vulnerabilities.length}</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">Vulnérabilités</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scan Info */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations du scan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <Globe className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-600">URL analysée</p>
              <p className="font-medium text-gray-900">{report.url}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Date du scan</p>
              <p className="font-medium text-gray-900">
                {new Date(report.timestamp).toLocaleString('fr-FR')}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Headers analysés</p>
              <p className="font-medium text-gray-900">{Object.keys(report.headers_analyzed).length}</p>
            </div>
          </div>
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Durée du scan</p>
              <p className="font-medium text-gray-900">{report.duration.toFixed(2)} secondes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Headers Analysis */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">En-têtes HTTP analysés</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  En-tête
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valeur
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(report.headers_analyzed).map(([key, value]) => (
                <tr key={key}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {key}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">{value}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vulnerabilities */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Vulnérabilités détectées ({report.vulnerabilities.length})
        </h2>
        {report.vulnerabilities.length > 0 ? (
          <div className="space-y-4">
            {report.vulnerabilities.map((vuln, index) => (
              <VulnerabilityCard key={index} vulnerability={vuln} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 py-8">
            Aucune vulnérabilité détectée
          </p>
        )}
      </div>
    </div>
  );
};

export default ReportDetails;