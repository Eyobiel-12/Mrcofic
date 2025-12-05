"use client"

import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 lg:py-28 bg-gradient-to-b from-white via-primary-50 to-white">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxMDJhNDMiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')]"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="mb-4 md:mb-6 animate-fade-in">
                <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-gold-50 border border-gold-200 text-gold-700 text-xs md:text-sm font-semibold tracking-wide uppercase">
                  Sinds 2019
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary-900 mb-4 md:mb-6 animate-fade-in-slow font-display tracking-tight">
                Over MARCOFIC
              </h1>
              <div className="w-16 md:w-24 h-0.5 md:h-1 bg-gold-600 mb-6 md:mb-8 mx-auto lg:mx-0"></div>
              <p className="text-lg md:text-xl lg:text-2xl text-body max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed px-4 lg:px-0">
                Professional Boekhouding — Modern, betrouwbaar en persoonlijk
              </p>
            </div>
            
            {/* Image */}
            <div className="animate-slide-up order-1 lg:order-2">
              <div className="luxury-card overflow-hidden">
                <Image
                  src="/marco.jpeg"
                  alt="MARCOFIC Professional Boekhouding"
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 md:py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="luxury-card p-6 md:p-10 lg:p-16 animate-slide-up">
            <div className="mb-6 md:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-primary-800 mb-3 md:mb-4 font-display">Over MARCOFIC Professional Boekhouding</h2>
              <div className="w-12 md:w-16 h-0.5 bg-gold-600 mb-4 md:mb-6"></div>
            </div>
            <div className="prose prose-lg max-w-none text-body space-y-4 md:space-y-6 leading-relaxed">
              <p className="text-base md:text-lg">
                MARCOFIC Professional Boekhouding is een modern en betrouwbaar boekhoudkantoor dat ondernemers, 
                freelancers en bedrijven ondersteunt met duidelijke, nauwkeurige en professionele financiële 
                dienstverlening. Wij geloven dat goede administratie verder gaat dan cijfers: het geeft rust, 
                structuur en ruimte om te groeien.
              </p>
              <p>
                Ons team combineert premium service met persoonlijke aandacht. We luisteren écht naar jouw 
                situatie, denken mee met je onderneming en zorgen ervoor dat je financiële administratie 
                altijd correct, transparant en up-to-date is. Met een hoogwaardige, moderne aanpak — en oog 
                voor detail — maken wij boekhouden begrijpelijk, toegankelijk en efficiënt.
              </p>
              <p>
                Bij MARCOFIC staan vertrouwen, kwaliteit en open communicatie centraal. Of je nu start of al 
                jaren onderneemt: wij bieden advies op maat, heldere uitleg en ondersteuning die jouw 
                onderneming sterker en financieel stabieler maakt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 md:py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Mission */}
            <div className="luxury-card-hover p-6 md:p-8 lg:p-10 animate-slide-up">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary-800 mb-3 md:mb-4 font-display">Onze Missie</h3>
              <div className="w-10 md:w-12 h-0.5 bg-gold-600 mb-4 md:mb-6"></div>
              <p className="text-body text-sm md:text-base leading-relaxed">
                Onze missie is om uitzonderlijke boekhoudkundige dienstverlening te bieden die onze klanten helpt 
                hun doelen te bereiken. We streven ernaar om in elke interactie waarde toe te voegen, 
                vertrouwen op te bouwen en langdurige relaties te creëren gebaseerd op wederzijds respect 
                en excellentie.
              </p>
            </div>

            {/* Vision */}
            <div className="luxury-card-hover p-6 md:p-8 lg:p-10 animate-slide-up">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary-800 mb-3 md:mb-4 font-display">Onze Visie</h3>
              <div className="w-10 md:w-12 h-0.5 bg-gold-600 mb-4 md:mb-6"></div>
              <p className="text-body text-sm md:text-base leading-relaxed">
                We streven ernaar de meest vertrouwde en gerespecteerde boekhoudkantoor te zijn in onze 
                branche. Door continu te innoveren, te leren en onze diensten te verbeteren, willen we 
                een blijvende impact maken op de levens en bedrijven van onze klanten.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-primary-800 mb-3 md:mb-4 font-display tracking-tight">
              Onze Waarden
            </h2>
            <div className="w-16 md:w-24 h-0.5 md:h-1 bg-gold-600 mx-auto mb-4 md:mb-6"></div>
            <p className="text-body text-base md:text-lg max-w-2xl mx-auto px-4">
              De principes die ons werk sturen en onze cultuur definiëren
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                title: "Kwaliteit",
                description: "We streven naar perfectie in alles wat we doen. Geen compromissen, alleen de hoogste standaarden."
              },
              {
                title: "Betrouwbaarheid",
                description: "Je kunt op ons rekenen, altijd. We doen wat we beloven, wanneer we het beloven."
              },
              {
                title: "Integriteit",
                description: "Eerlijkheid en transparantie staan centraal in alles wat we doen. We handelen altijd met integriteit."
              },
              {
                title: "Klantgerichtheid",
                description: "De klant staat altijd centraal. We luisteren, begrijpen en leveren oplossingen die echt werken."
              },
              {
                title: "Innovatie",
                description: "We blijven voorop lopen met nieuwe ontwikkelingen en technologieën die waarde toevoegen."
              },
              {
                title: "Professionaliteit",
                description: "We handelen altijd professioneel, met respect en aandacht voor detail in elke interactie."
              },
              {
                title: "Resultaatgerichtheid",
                description: "We focussen op concrete resultaten die meetbaar zijn en waarde toevoegen aan jouw situatie."
              },
              {
                title: "Partnerschap",
                description: "We zien onszelf niet alleen als dienstverleners, maar als strategische partners in jouw succes."
              },
            ].map((value, index) => (
              <div
                key={index}
                className="luxury-card-hover p-6 md:p-8 animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <h3 className="text-lg md:text-xl font-semibold text-primary-800 mb-2 md:mb-3 font-display">{value.title}</h3>
                <div className="w-10 md:w-12 h-0.5 bg-gold-600 mb-3 md:mb-4"></div>
                <p className="text-body text-xs md:text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-primary-800 mb-3 md:mb-4 font-display tracking-tight">
              Waarom MARCOFIC?
            </h2>
            <div className="w-16 md:w-24 h-0.5 md:h-1 bg-gold-600 mx-auto mb-4 md:mb-6"></div>
            <p className="text-body text-base md:text-lg max-w-2xl mx-auto px-4">
              Wat ons onderscheidt van anderen
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Ervaring & Expertise",
                description: "Meer dan 5 jaar bewezen ervaring met honderden succesvolle projecten en tevreden klanten."
              },
              {
                title: "Persoonlijke Aanpak",
                description: "Elke klant krijgt persoonlijke aandacht. Geen standaardoplossingen, maar maatwerk voor jouw situatie."
              },
              {
                title: "Transparantie",
                description: "Duidelijke communicatie, geen verborgen kosten. Je weet altijd waar je aan toe bent."
              },
              {
                title: "Snelle Response",
                description: "We reageren snel op vragen en zorgen ervoor dat je altijd op de hoogte bent van de voortgang."
              },
              {
                title: "Resultaatgericht",
                description: "We focussen op concrete, meetbare resultaten die waarde toevoegen aan jouw organisatie of situatie."
              },
              {
                title: "Langdurige Relaties",
                description: "We bouwen aan langdurige partnerships gebaseerd op vertrouwen, niet alleen eenmalige transacties."
              },
            ].map((item, index) => (
              <div
                key={index}
                className="luxury-card-hover p-6 md:p-8 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-lg md:text-xl font-semibold text-primary-800 mb-2 md:mb-3 font-display">{item.title}</h3>
                <div className="w-10 md:w-12 h-0.5 bg-gold-600 mb-3 md:mb-4"></div>
                <p className="text-body text-sm md:text-base leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-20 lg:py-28 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center animate-fade-in">
              <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-primary-800 mb-3 md:mb-4 font-display">200+</div>
              <h3 className="text-xl sm:text-2xl font-semibold text-primary-800 mb-2 md:mb-3 font-display">Tevreden Klanten</h3>
              <div className="w-12 sm:w-16 h-0.5 bg-gold-600 mx-auto mb-3 md:mb-4"></div>
              <p className="text-body text-sm md:text-base px-4">
                Een groeiende community van tevreden klanten die op ons vertrouwen voor hun boekhouding
              </p>
            </div>
            <div className="text-center animate-fade-in">
              <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-primary-800 mb-3 md:mb-4 font-display">5+</div>
              <h3 className="text-xl sm:text-2xl font-semibold text-primary-800 mb-2 md:mb-3 font-display">Jaar Ervaring</h3>
              <div className="w-12 sm:w-16 h-0.5 bg-gold-600 mx-auto mb-3 md:mb-4"></div>
              <p className="text-body text-sm md:text-base px-4">
                Bewezen expertise en track record in de branche met consistente kwaliteit
              </p>
            </div>
            <div className="text-center animate-fade-in">
              <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-primary-800 mb-3 md:mb-4 font-display">100%</div>
              <h3 className="text-xl sm:text-2xl font-semibold text-primary-800 mb-2 md:mb-3 font-display">Toewijding</h3>
              <div className="w-12 sm:w-16 h-0.5 bg-gold-600 mx-auto mb-3 md:mb-4"></div>
              <p className="text-body text-sm md:text-base px-4">
                Volledige inzet en toewijding aan elk project en elke klantrelatie
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 lg:py-28 bg-primary-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6 font-display px-4">
            Klaar om samen te werken?
          </h2>
          <div className="w-16 md:w-24 h-0.5 md:h-1 bg-gold-600 mx-auto mb-6 md:mb-8"></div>
          <p className="text-lg md:text-xl text-white/90 mb-8 md:mb-10 font-light leading-relaxed px-4">
            Boek vandaag nog je afspraak en ervaar het MARCOFIC verschil. 
            Laten we samen kijken hoe we jou kunnen helpen.
          </p>
          <Link href="/book" className="btn-gold text-sm sm:text-base inline-block w-full sm:w-auto">
            Boek Nu Je Afspraak
          </Link>
        </div>
      </section>
    </div>
  )
}
