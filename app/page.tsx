"use client"

import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Classic Luxury */}
      <section className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-primary-50 to-white">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxMDJhNDMiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 text-center">
          <div className="animate-fade-in-slow">
            <div className="mb-4 md:mb-6">
              <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-gold-50 border border-gold-200 text-gold-700 text-xs md:text-sm font-semibold tracking-wide uppercase">
                Sinds 2019
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-900 mb-4 md:mb-6 max-w-4xl mx-auto font-display tracking-tight">
              MARCOFIC
            </h1>
            <div className="w-16 md:w-24 h-0.5 md:h-1 bg-gold-600 mx-auto mb-6 md:mb-8"></div>
            <p className="text-lg sm:text-xl md:text-2xl text-body max-w-2xl mx-auto mb-3 md:mb-4 font-light px-4">
              Professionele boekhouding met meer dan
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-800 mb-8 md:mb-12 px-4">
              <span className="gold-accent">200 tevreden klanten</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
              <Link href="/book" className="btn-primary text-sm sm:text-base w-full sm:w-auto">
                Boek Een Afspraak
              </Link>
              <Link href="/about" className="btn-secondary text-sm sm:text-base w-full sm:w-auto">
                Meer Informatie
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Elegant */}
      <section className="py-12 md:py-20 lg:py-28 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center animate-fade-in">
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary-800 mb-2 md:mb-3 font-display">200+</div>
              <div className="text-body font-medium uppercase tracking-wide text-xs sm:text-sm">Tevreden Klanten</div>
              <div className="w-12 sm:w-16 h-0.5 bg-gold-600 mx-auto mt-3 md:mt-4"></div>
            </div>
            <div className="text-center animate-fade-in">
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary-800 mb-2 md:mb-3 font-display">5+</div>
              <div className="text-body font-medium uppercase tracking-wide text-xs sm:text-sm">Jaar Ervaring</div>
              <div className="w-12 sm:w-16 h-0.5 bg-gold-600 mx-auto mt-3 md:mt-4"></div>
            </div>
            <div className="text-center animate-fade-in">
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary-800 mb-2 md:mb-3 font-display">100%</div>
              <div className="text-body font-medium uppercase tracking-wide text-xs sm:text-sm">Betrouwbaarheid</div>
              <div className="w-12 sm:w-16 h-0.5 bg-gold-600 mx-auto mt-3 md:mt-4"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Professional */}
      <section className="py-12 md:py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-primary-800 mb-3 md:mb-4 font-display tracking-tight">
              Waarom MARCOFIC?
            </h2>
            <div className="w-16 md:w-24 h-0.5 md:h-1 bg-gold-600 mx-auto mb-4 md:mb-6"></div>
            <p className="text-body text-base md:text-lg max-w-2xl mx-auto px-4">
              Wij bieden professionele boekhouding met aandacht voor detail en persoonlijke service
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Ervaren Team",
                description: "Meer dan 5 jaar ervaring in de branche met bewezen resultaten en expertise"
              },
              {
                title: "Persoonlijke Aanpak",
                description: "Elke klant krijgt persoonlijke aandacht en maatwerk oplossingen op maat"
              },
              {
                title: "Professioneel",
                description: "Betrouwbaar, punctueel en altijd met de hoogste standaarden"
              },
              {
                title: "Efficiënte Service",
                description: "Snelle en effectieve werkwijze zonder in te boeten op kwaliteit"
              },
              {
                title: "200+ Klanten",
                description: "Een groeiende community van tevreden klanten die op ons vertrouwen"
              },
              {
                title: "Kwaliteit",
                description: "We streven naar perfectie en excellentie in alles wat we doen"
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="luxury-card-hover p-6 md:p-8 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-lg md:text-xl font-semibold text-primary-800 mb-2 md:mb-3 font-display">{feature.title}</h3>
                <div className="w-10 md:w-12 h-0.5 bg-gold-600 mb-3 md:mb-4"></div>
                <p className="text-body text-sm md:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Elegant */}
      <section className="py-12 md:py-20 lg:py-28 bg-primary-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6 font-display px-4">
            Klaar om te beginnen?
          </h2>
          <div className="w-16 md:w-24 h-0.5 md:h-1 bg-gold-600 mx-auto mb-6 md:mb-8"></div>
          <p className="text-lg md:text-xl text-white/90 mb-8 md:mb-10 font-light leading-relaxed px-4">
            Boek vandaag nog je afspraak en ervaar het verschil van professionele boekhouding
          </p>
          <Link href="/book" className="btn-gold text-sm sm:text-base inline-block w-full sm:w-auto">
            Boek Nu Je Afspraak
          </Link>
        </div>
      </section>

    </div>
  )
}
