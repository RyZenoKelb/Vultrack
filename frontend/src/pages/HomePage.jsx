import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Code, FileText, ArrowRight, CheckCircle, Zap, Users, TrendingUp, Star, Play } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: Shield,
      title: 'Analyse de sécurité avancée',
      description: 'Scan complet des vulnérabilités avec vérification des en-têtes HTTP, CSP, HSTS et X-Frame-Options',
      color: 'bg-blue-500'
    },
    {
      icon: Code,
      title: 'Détection de code malveillant',
      description: 'Identification automatique de code dangereux, fonctions eval() et bibliothèques obsolètes',
      color: 'bg-purple-500'
    },
    {
      icon: FileText,
      title: 'Rapports professionnels',
      description: 'Génération de rapports PDF détaillés avec recommandations actionables et scoring de sécurité',
      color: 'bg-green-500'
    }
  ];

  const stats = [
    { label: 'Sites analysés', value: '10,000+' },
    { label: 'Vulnérabilités détectées', value: '50,000+' },
    { label: 'Temps moyen d\'analyse', value: '< 30s' },
    { label: 'Score de précision', value: '99.8%' }
  ];

  const benefits = [
    'Analyse en moins de 30 secondes',
    'Détection de 50+ types de vulnérabilités',
    'Rapports PDF professionnels',
    'API REST pour intégration CI/CD',
    'Support 24/7 et documentation complète'
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section with Animated Background */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
            <div className="shape shape-5"></div>
          </div>
          <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8 inline-flex items-center rounded-full bg-purple-100/10 backdrop-blur-sm border border-purple-300/20 px-6 py-3 text-sm font-medium text-purple-200">
              <Zap className="mr-2 h-4 w-4" />
              Analyse en temps réel • Rapports instantanés
            </div>
            
            <h1 className="text-6xl font-black tracking-tight text-white sm:text-7xl lg:text-8xl">
              Sécurisez votre
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent animate-gradient">
                site web
              </span>
            </h1>
            
            <p className="mx-auto mt-8 max-w-3xl text-xl text-slate-300 leading-relaxed">
              Détectez instantanément les vulnérabilités critiques, protégez vos utilisateurs et 
              améliorez votre posture de sécurité avec notre plateforme d'analyse avancée alimentée par l'IA.
            </p>
            
            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
              <Link
                to="/scan"
                className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-2xl shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 animate-pulse-glow"
              >
                <Shield className="mr-3 h-6 w-6" />
                Analyser maintenant
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </Link>
              
              <Link
                to="/about"
                className="group inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-white border-2 border-slate-600 rounded-2xl hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300"
              >
                <Play className="mr-3 h-5 w-5" />
                Voir la démo
              </Link>
            </div>

            {/* Social Proof */}
            <div className="mt-16 flex items-center justify-center space-x-6">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-slate-300">Noté 4.9/5 par 2,000+ développeurs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section Floating */}
      <section className="relative -mt-32 z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50 p-8 lg:p-12">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center group">
                  <div className="text-4xl lg:text-5xl font-black text-slate-900 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm lg:text-base text-slate-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with 3D Cards */}
      <section className="py-32 bg-gradient-to-br from-slate-50 to-purple-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-black text-slate-900 mb-6">
              Analyse de sécurité
              <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                nouvelle génération
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-slate-600 leading-relaxed">
              Notre technologie d'analyse avancée alimentée par l'IA détecte les vulnérabilités 
              que les autres outils manquent, en temps réel.
            </p>
          </div>

          <div className="grid gap-8 lg:gap-12 md:grid-cols-3">
            {features.map((feature, index) => (
              <div key={feature.title} className="group perspective-1000">
                <div className="relative overflow-hidden rounded-3xl bg-white p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform-gpu hover:-translate-y-4 hover:rotate-y-5 card-3d">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className={`inline-flex items-center justify-center w-20 h-20 ${feature.color} rounded-2xl text-white mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <feature.icon className="h-10 w-10" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 group-hover:text-purple-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                  
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section with Interactive Elements */}
      <section className="py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-20 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-5xl font-black text-slate-900 mb-10">
                Pourquoi choisir
                <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Vultrack ?
                </span>
              </h2>
              
              <div className="space-y-6">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center group cursor-pointer">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mr-6 group-hover:scale-125 transition-transform duration-300">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-lg text-slate-700 group-hover:text-slate-900 font-medium transition-colors duration-300">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-3xl bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 p-10 dashboard-preview">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                      <span className="font-semibold text-slate-900">Scan en cours...</span>
                    </div>
                    <div className="text-sm text-slate-500">85%</div>
                  </div>
                  
                  <div className="grid gap-4">
                    <div className="h-4 bg-gradient-to-r from-purple-200 to-purple-300 rounded-full animate-pulse"></div>
                    <div className="h-4 bg-gradient-to-r from-pink-200 to-pink-300 rounded-full w-3/4 animate-pulse delay-100"></div>
                    <div className="h-4 bg-gradient-to-r from-orange-200 to-orange-300 rounded-full w-1/2 animate-pulse delay-200"></div>
                  </div>
                  
                  <div className="p-6 bg-white rounded-xl shadow-lg">
                    <div className="flex items-center mb-4">
                      <Shield className="h-6 w-6 text-green-500 mr-3" />
                      <span className="font-bold text-slate-900 text-lg">Analyse terminée</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Score de sécurité</span>
                      <span className="text-2xl font-bold text-green-600">A+</span>
                    </div>
                    <div className="mt-3 text-sm text-slate-500">
                      5 vulnérabilités détectées et corrigées
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Particles */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900">
        <div className="absolute inset-0">
          <div className="particles">
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
            <div className="particle particle-4"></div>
            <div className="particle particle-5"></div>
            <div className="particle particle-6"></div>
          </div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-8">
              Prêt à sécuriser
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                votre site ?
              </span>
            </h2>
            
            <p className="mx-auto max-w-3xl text-xl text-purple-100 mb-12 leading-relaxed">
              Rejoignez plus de 10,000 développeurs qui font confiance à Vultrack pour 
              protéger leurs applications web. Commencez votre analyse gratuite dès maintenant.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                to="/scan"
                className="group inline-flex items-center justify-center px-12 py-5 text-xl font-bold bg-white text-purple-900 rounded-2xl shadow-2xl hover:shadow-white/50 transform hover:scale-105 transition-all duration-300"
              >
                <Shield className="mr-3 h-6 w-6" />
                Commencer l'analyse gratuite
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>
            
            <div className="mt-8 text-purple-200 text-sm">
              ✓ Aucune carte de crédit requise ✓ Résultats en 30 secondes ✓ Rapport PDF gratuit
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;