import React from 'react';
import { Shield, Code, FileText, Globe, Users, Award, Zap, Lock } from 'lucide-react';

const AboutPage = () => {
  const features = [
    {
      icon: Shield,
      title: 'Analyse de sécurité avancée',
      description: 'Détection automatique de 50+ types de vulnérabilités avec algorithmes de pointe'
    },
    {
      icon: Code,
      title: 'Analyse de code statique',
      description: 'Inspection approfondie du JavaScript pour détecter les patterns dangereux'
    },
    {
      icon: FileText,
      title: 'Rapports professionnels',
      description: 'Documentation PDF complète avec recommandations et plan de remédiation'
    },
    {
      icon: Globe,
      title: 'API REST complète',
      description: 'Intégration facile dans vos workflows CI/CD et outils existants'
    }
  ];

  const technologies = [
    {
      category: 'Backend',
      items: ['Python 3.11', 'FastAPI', 'BeautifulSoup4', 'Requests', 'ReportLab'],
      color: 'bg-green-500'
    },
    {
      category: 'Frontend',
      items: ['React 18', 'Tailwind CSS', 'Vite', 'React Router', 'Lucide Icons'],
      color: 'bg-blue-500'
    },
    {
      category: 'Bot Discord',
      items: ['Discord.py', 'Slash Commands', 'Embeds', 'Async/Await'],
      color: 'bg-purple-500'
    },
    {
      category: 'Sécurité',
      items: ['OWASP Top 10', 'CSP Analysis', 'Header Validation', 'SSL/TLS Check'],
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8 inline-flex items-center rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-800">
              <Award className="mr-2 h-4 w-4" />
              Solution de sécurité nouvelle génération
            </div>
            <h1 className="text-5xl font-bold text-white sm:text-6xl mb-6">
              À propos de
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Vultrack</span>
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-slate-300 leading-8">
              Plateforme d'analyse de sécurité web conçue pour les développeurs, 
              équipes DevOps et professionnels de la cybersécurité.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-8">Notre mission</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Vultrack démocratise l'analyse de sécurité web en rendant les outils de cybersécurité 
                professionnels accessibles à tous. Notre objectif est de créer un web plus sûr en 
                aidant les développeurs à identifier et corriger les vulnérabilités rapidement.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Avec plus de 10,000 sites analysés et 50,000 vulnérabilités détectées, nous continuons 
                d'innover pour offrir les outils de sécurité les plus avancés du marché.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">10K+</div>
                  <div className="text-sm text-slate-600">Sites analysés</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">50K+</div>
                  <div className="text-sm text-slate-600">Vulnérabilités</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">99.8%</div>
                  <div className="text-sm text-slate-600">Précision</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 p-8">
                <div className="grid gap-4">
                  {[
                    { icon: Lock, text: 'Sécurité renforcée' },
                    { icon: Zap, text: 'Analyse ultra-rapide' },
                    { icon: Users, text: 'Support 24/7' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow">
                      <item.icon className="h-6 w-6 text-purple-600 mr-4" />
                      <span className="font-medium text-slate-900">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 sm:text-5xl mb-6">
              Fonctionnalités
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> avancées</span>
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-slate-600">
              Des outils puissants pour une sécurité web optimale
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={feature.title} className="group">
                <div className="relative overflow-hidden rounded-2xl bg-slate-50 p-8 h-full hover:bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white mb-6">
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">Technologies utilisées</h2>
            <p className="mx-auto max-w-2xl text-xl text-slate-600">
              Stack technologique moderne et robuste pour des performances optimales
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {technologies.map((tech) => (
              <div key={tech.category} className="bg-white rounded-2xl shadow-lg p-8">
                <div className={`inline-flex items-center justify-center w-12 h-12 ${tech.color} rounded-lg text-white mb-6`}>
                  <Code className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{tech.category}</h3>
                <ul className="space-y-2">
                  {tech.items.map((item) => (
                    <li key={item} className="text-slate-600 flex items-center">
                      <div className="w-2 h-2 bg-slate-300 rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;