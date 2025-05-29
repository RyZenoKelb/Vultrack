import React from 'react';
import { Shield, Code, FileText, Globe } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">À propos de Vultrack</h1>
          <p className="mt-4 text-lg text-gray-600">
            Outil professionnel d'analyse de sécurité web
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Notre mission</h2>
            <p className="mt-4 text-gray-600">
              Vultrack est conçu pour aider les développeurs et les équipes de sécurité à identifier 
              rapidement les vulnérabilités courantes dans leurs applications web. Notre objectif est 
              de rendre l'analyse de sécurité accessible et compréhensible pour tous.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">Fonctionnalités</h2>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li className="flex items-start">
                <Shield className="h-5 w-5 text-primary-600 mr-2 mt-0.5" />
                <span>Analyse des en-têtes de sécurité HTTP</span>
              </li>
              <li className="flex items-start">
                <Code className="h-5 w-5 text-primary-600 mr-2 mt-0.5" />
                <span>Détection de code JavaScript dangereux</span>
              </li>
              <li className="flex items-start">
                <FileText className="h-5 w-5 text-primary-600 mr-2 mt-0.5" />
                <span>Rapports PDF détaillés avec recommandations</span>
              </li>
              <li className="flex items-start">
                <Globe className="h-5 w-5 text-primary-600 mr-2 mt-0.5" />
                <span>API REST et bot Discord disponibles</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 rounded-lg bg-gray-50 p-8">
          <h2 className="text-2xl font-bold text-gray-900">Technologies utilisées</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="font-semibold text-gray-900">Backend</h3>
              <p className="mt-2 text-gray-600">Python, FastAPI, BeautifulSoup4</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Frontend</h3>
              <p className="mt-2 text-gray-600">React, Tailwind CSS, Vite</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Bot Discord</h3>
              <p className="mt-2 text-gray-600">Discord.py, Slash Commands</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;