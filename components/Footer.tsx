import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white border-t-4 border-gold-600">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src="/logo.jpg"
                  alt="MARCOFIC Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold font-display">MARCOFIC</h3>
            </div>
            <div className="w-16 h-0.5 bg-gold-600 mb-4"></div>
            <p className="text-gray-300 leading-relaxed">
              Professional Boekhouding met meer dan 200 tevreden klanten.
              Betrouwbaar, professioneel en altijd met de hoogste standaarden.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gold-400 uppercase tracking-wide text-sm">Snelle Links</h4>
            <div className="w-12 h-0.5 bg-gold-600 mb-4"></div>
            <ul className="space-y-3 text-gray-300">
              <li><a href="/" className="hover:text-gold-400 transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-gold-400 transition-colors">Over Ons</a></li>
              <li><a href="/diensten" className="hover:text-gold-400 transition-colors">Diensten</a></li>
              <li><a href="/book" className="hover:text-gold-400 transition-colors">Boek Afspraak</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-gold-400 uppercase tracking-wide text-sm">Contact</h4>
            <div className="w-12 h-0.5 bg-gold-600 mb-4"></div>
            <ul className="space-y-3 text-gray-300">
              <li>
                <a href="mailto:marcofic2010@gmail.com" className="hover:text-gold-400 transition-colors">
                  Email: marcofic2010@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:0624995871" className="hover:text-gold-400 transition-colors">
                  Telefoon: 06-24995871
                </a>
              </li>
              <li>Kantooruren: Ma-Vr 09:00-17:00, Za 11:00-15:00</li>
              <li className="pt-2">
                <a href="/about#location" className="hover:text-gold-400 transition-colors text-sm">
                  📍 Bekijk op kaart
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} MARCOFIC. Alle rechten voorbehouden.</p>
          <p className="mt-2">
            <a href="/privacy" className="hover:text-gold-400 transition-colors">Privacybeleid</a>
            {" • "}
            <a href="/admin" className="hover:text-gold-400 transition-colors">Admin</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
