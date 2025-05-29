import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Code, FileText, ArrowRight, CheckCircle } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: Shield,
      title: 'Headers de sécurité',
      description: 'Vérification des en-têtes HTTP essentiels comme CSP, HSTS, X-Frame-Options'
    },
    {
      icon: Code,
      title: 'Analyse du code',
      description: 'Détection de code dangereux, eval() et bibliothèques obsolètes'
    },
    {
      icon: FileText,
      title: 'Rapports détaillés',
      description: 'Génération de rapports PDF professionnels avec recommandations'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Analysez la sécurité de votre site web
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-100">
              Détectez les vulnérabilités, protégez vos utilisateurs et améliorez votre score de sécurité avec Vultrack.
            </p>
            <div className="mt-10 flex justify-center gap-x-6">
              <Link
                to="/scan"
                className="rounded-lg bg-white px-6 py-3 text-base font-semibold text-primary-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Commencer l'analyse
                <ArrowRight className="ml-2 -mr-1 inline h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="rounded-lg px-6 py-3 text-base font-semibold text-white ring-1 ring-inset ring-white/20 hover:bg-white/10"
              >
                En savoir plus
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Analyse complète de sécurité
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Vultrack analyse en profondeur votre site web pour identifier les vulnérabilités potentielles
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="relative">
                <div className="absolute flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600 text-white">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-base text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-primary-600 px-6 py-16 sm:px-12 sm:py-20 lg:flex lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Prêt à sécuriser votre site ?
              </h2>
              <p className="mt-3 max-w-xl text-lg text-primary-100">
                Lancez une analyse gratuite dès maintenant et obtenez un rapport détaillé en quelques secondes.
              </p>
            </div>
            <div className="mt-8 lg:mt-0">
              <Link
                to="/scan"
                className="rounded-lg bg-white px-6 py-3 text-base font-semibold text-primary-600 shadow-sm hover:bg-gray-100"
              >
                Scanner maintenant
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;