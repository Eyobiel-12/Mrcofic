"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState } from "react"

export default function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "Over Ons" },
    { href: "/diensten", label: "Diensten" },
    { href: "/book", label: "Boek Afspraak" },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-white fixed top-0 left-0 right-0 z-50 border-b border-gray-200 shadow-elegant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
              <Image
                src="/logo.jpg"
                alt="MARCOFIC Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="text-xl md:text-2xl font-bold text-primary-900 font-display tracking-wide hidden sm:block">MARCOFIC</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 font-medium transition-all duration-300 tracking-wide ${
                  isActive(item.href)
                    ? "text-primary-900 border-b-2 border-gold-600"
                    : "text-gray-700 hover:text-primary-800 hover:border-b-2 hover:border-primary-300"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-primary-800 hover:text-primary-900 p-2"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 bg-white animate-slide-up">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 font-medium transition-all duration-300 ${
                  isActive(item.href)
                    ? "text-primary-900 bg-primary-50 border-l-4 border-gold-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-primary-800"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

