"use client"

import Link from "next/link"

const services = [
  {
    number: "1",
    title: "Volledige Boekhouding & Administratie",
    description: "Wij verwerken al jouw financiële gegevens snel en nauwkeurig, zodat jij altijd overzicht hebt én voldoet aan alle wettelijke verplichtingen."
  },
  {
    number: "2",
    title: "BTW-Aangiftes & Kwartaalrapportages",
    description: "Tijdige BTW-aangiftes en duidelijke rapportages die je inzicht geven in de financiële gezondheid van jouw bedrijf."
  },
  {
    number: "3",
    title: "Jaarrekening & Financiële Overzichten",
    description: "Professionele jaarrekeningen, winst- en verliesoverzichten en balansen, afgestemd op jouw onderneming."
  },
  {
    number: "4",
    title: "Salarisadministratie",
    description: "Van loonstroken tot aangiftes: wij verzorgen complete en foutloze salarisadministratie voor bedrijven."
  },
  {
    number: "5",
    title: "Facturatie, Declaraties & Uitgavenbeheer",
    description: "We helpen de facturatie te structureren en ondersteunen bij het beheren van kosten, budgetten en uitgaven."
  },
  {
    number: "6",
    title: "Belastingaangiftes (Zakelijk & Privé)",
    description: "Van ondernemersaftrek tot inkomstenbelasting — wij begeleiden en adviseren je in elke fiscale stap."
  },
  {
    number: "7",
    title: "Financieel Advies op Maat",
    description: "Slimme strategieën, inzicht en begeleiding die jou helpen bij financiële groei en belangrijke keuzes."
  },
  {
    number: "8",
    title: "Startersbegeleiding",
    description: "Voor nieuwe ondernemers bieden wij ondersteuning bij administratie, inschrijvingen, belastingregistratie en financiële opbouw."
  },
]

export default function DienstenPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 lg:py-28 bg-gradient-to-b from-white via-primary-50 to-white">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxMDJhNDMiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')]"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-4 md:mb-6 animate-fade-in">
            <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-gold-50 border border-gold-200 text-gold-700 text-xs md:text-sm font-semibold tracking-wide uppercase">
              Onze Diensten
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary-900 mb-4 md:mb-6 animate-fade-in-slow font-display tracking-tight">
            Wat MARCOFIC voor jou kan betekenen
          </h1>
          <div className="w-16 md:w-24 h-0.5 md:h-1 bg-gold-600 mx-auto mb-6 md:mb-8"></div>
          <p className="text-lg md:text-xl lg:text-2xl text-body max-w-3xl mx-auto font-light leading-relaxed px-4">
            Onze diensten zijn ontworpen om jou volledig te ontzorgen. Met professionele systemen, zorgvuldige verwerking en een persoonlijke aanpak bieden wij een totaalpakket voor jouw financiële administratie.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="luxury-card-hover p-6 md:p-8 lg:p-10 animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-primary-800 text-white rounded-sm flex items-center justify-center font-bold text-lg md:text-xl font-display">
                      {service.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-primary-800 mb-3 md:mb-4 font-display">
                      {service.title}
                    </h3>
                    <div className="w-10 md:w-12 h-0.5 bg-gold-600 mb-3 md:mb-4"></div>
                    <p className="text-body text-sm md:text-base leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-12 md:py-20 lg:py-28 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="luxury-card p-6 md:p-10 lg:p-16 animate-slide-up">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-primary-800 mb-3 md:mb-4 font-display">
                Waarom kiezen voor onze diensten?
              </h2>
              <div className="w-16 md:w-24 h-0.5 md:h-1 bg-gold-600 mx-auto mb-4 md:mb-6"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-primary-800 mb-3 font-display">✓ Volledige Ontzorging</h3>
                <p className="text-body text-sm md:text-base">
                  Jij focust op je onderneming, wij zorgen voor je administratie. Volledig, accuraat en op tijd.
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-primary-800 mb-3 font-display">✓ Moderne Systemen</h3>
                <p className="text-body text-sm md:text-base">
                  We werken met de nieuwste technologieën en software voor efficiënte en nauwkeurige verwerking.
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-primary-800 mb-3 font-display">✓ Persoonlijke Aanpak</h3>
                <p className="text-body text-sm md:text-base">
                  Elke klant krijgt persoonlijke aandacht en maatwerk oplossingen die passen bij jouw situatie.
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-primary-800 mb-3 font-display">✓ Transparantie</h3>
                <p className="text-body text-sm md:text-base">
                  Duidelijke communicatie, heldere rapportages en altijd inzicht in waar je staat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 lg:py-28 bg-primary-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6 font-display px-4">
            Klaar om te starten?
          </h2>
          <div className="w-16 md:w-24 h-0.5 md:h-1 bg-gold-600 mx-auto mb-6 md:mb-8"></div>
          <p className="text-lg md:text-xl text-white/90 mb-8 md:mb-10 font-light leading-relaxed px-4">
            Boek een afspraak en ontdek hoe wij jouw administratie kunnen ontzorgen
          </p>
          <Link href="/book" className="btn-gold text-sm sm:text-base inline-block w-full sm:w-auto">
            Boek Nu Je Afspraak
          </Link>
        </div>
      </section>
    </div>
  )
}

