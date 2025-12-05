"use client"

import { useState, useEffect } from "react"

interface BookingFormProps {
  date: string
  time: string
  onSuccess: () => void
  onCancel: () => void
}

export default function BookingForm({ date, time, onSuccess, onCancel }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
  })
  const [showConfetti, setShowConfetti] = useState(false)

  // Validation
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validatePhone = (phone: string) => {
    if (!phone) return true // Optional
    if (!/^[\d\s\+\-\(\)]+$/.test(phone)) return false
    const digitsOnly = phone.replace(/\D/g, "")
    return digitsOnly.length >= 10
  }

  const errors = {
    name: touched.name && !formData.name.trim() ? "Naam is verplicht" : "",
    email: touched.email && !formData.email.trim()
      ? "E-mail is verplicht"
      : touched.email && formData.email && !validateEmail(formData.email)
      ? "Ongeldig e-mailadres"
      : "",
    phone: touched.phone && formData.phone && !validatePhone(formData.phone)
      ? "Ongeldig telefoonnummer"
      : "",
  }

  const isValid = formData.name.trim() && formData.email.trim() && validateEmail(formData.email) && (!formData.phone || validatePhone(formData.phone))

  const validateTimeSlot = async (): Promise<{ valid: boolean; error?: string }> => {
    try {
      // Check if time slot is still available
      const response = await fetch(`/api/appointments?date=${date}`)
      const appointments = await response.json()
      
      const isBooked = appointments
        .filter((x: any) => x.status !== "rejected")
        .some((x: any) => x.time === time)
      
      if (isBooked) {
        return { valid: false, error: "Dit tijdvak is al geboekt. Kies een ander tijdstip." }
      }
      
      // Check if date/time hasn't passed
      const appointmentDate = new Date(date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      appointmentDate.setHours(0, 0, 0, 0)
      
      if (appointmentDate.getTime() === today.getTime()) {
        const [startTime] = time.split("-")
        const [hours, minutes] = startTime.split(":").map(Number)
        const slotTime = new Date()
        slotTime.setHours(hours, minutes, 0, 0)
        
        if (slotTime <= new Date()) {
          return { valid: false, error: "Dit tijdslot is al verstreken" }
        }
      }
      
      return { valid: true }
    } catch (err) {
      console.error("Time validation error:", err)
      // Don't block submission if validation check fails, let server handle it
      return { valid: true }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    // Mark all fields as touched
    setTouched({ name: true, email: true, phone: true })

    if (!isValid) {
      setError("Controleer je gegevens en probeer het opnieuw.")
      return
    }

    // Validate time slot before submission
    const timeValidation = await validateTimeSlot()
    if (!timeValidation.valid) {
      setError(timeValidation.error || "Tijdslot validatie mislukt")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          date,
          time,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 409) {
          setError("Dit tijdvak is al geboekt. Kies een ander tijdstip.")
        } else {
          setError(data.error || "Er ging iets mis. Probeer het opnieuw.")
        }
        setLoading(false)
        return
      }

      setSuccess(true)
      setShowConfetti(true)
      setTimeout(() => {
        setShowConfetti(false)
      }, 5000)
      setTimeout(() => {
        onSuccess()
      }, 4000)
    } catch (err) {
      setError("Er ging iets mis. Controleer je internetverbinding en probeer het opnieuw.")
      setLoading(false)
    }
  }

  useEffect(() => {
    // Scroll to form when it appears
    const timer = setTimeout(() => {
      const formElement = document.getElementById("booking-form")
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  if (success) {
    return (
      <div className="relative luxury-card p-10 text-center animate-fade-in border-2 border-gold-300 bg-gradient-to-br from-gold-50 to-white overflow-hidden">
        {/* Confetti effect */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: ['#f59e0b', '#d97706', '#fbbf24', '#fcd34d'][Math.floor(Math.random() * 4)],
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        )}

        <div className="relative z-10">
          <div className="inline-block mb-6 animate-scale-in">
            <div className="w-20 h-20 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center shadow-luxury mx-auto">
              <svg className="w-10 h-10 text-white animate-checkmark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <div className="text-primary-800 font-bold text-3xl mb-4 font-display animate-slide-up">
            Aanvraag Ontvangen!
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold-600 to-transparent mx-auto mb-6 animate-expand"></div>
          <p className="text-body text-lg mb-6 animate-fade-in-slow">
            Je aanvraag is succesvol verzonden. De admin zal deze bevestigen en je per e-mail
            informeren.
          </p>
          <div className="mt-8 pt-6 border-t border-gold-200 animate-fade-in-slow">
            <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Je ontvangt binnenkort een bevestigingsmail op je e-mailadres.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form id="booking-form" onSubmit={handleSubmit} className="space-y-4 md:space-y-6 animate-slide-up">
      {/* Selected appointment info */}
      <div className="luxury-card p-5 md:p-6 mb-6 md:mb-8 border-l-4 border-l-gold-500 bg-gradient-to-r from-gold-50/50 to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold-200/20 rounded-full blur-3xl"></div>
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xs font-semibold text-primary-600 uppercase tracking-wide">
              Geselecteerde Afspraak
            </p>
          </div>
          <p className="text-lg md:text-xl font-bold text-primary-800 mb-2 font-display">
            {new Date(date).toLocaleDateString("nl-NL", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-primary-700 font-semibold text-base md:text-lg">{time}</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="luxury-card p-4 md:p-5 border-2 border-red-400 bg-gradient-to-br from-red-50 to-red-100 animate-shake shadow-elegant">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <p className="text-red-800 font-semibold text-sm md:text-base flex-1">{error}</p>
          </div>
        </div>
      )}

      <div className="space-y-5 md:space-y-6">
        <div>
          <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-primary-800 mb-2 tracking-wide uppercase flex items-center gap-1">
            Naam <span className="text-red-500">*</span>
            {errors.name && <span className="text-red-500 text-xs normal-case font-normal">({errors.name})</span>}
          </label>
          <div className="relative">
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value })
                setTouched({ ...touched, name: true })
              }}
              onBlur={() => setTouched({ ...touched, name: true })}
              className={`input-modern transition-all duration-200 ${
                errors.name ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""
              } ${formData.name && !errors.name ? "border-green-400 focus:border-green-500" : ""}`}
              placeholder="Jouw volledige naam"
            />
            {formData.name && !errors.name && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-primary-800 mb-2 tracking-wide uppercase flex items-center gap-1">
            E-mail <span className="text-red-500">*</span>
            {errors.email && <span className="text-red-500 text-xs normal-case font-normal">({errors.email})</span>}
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value })
                setTouched({ ...touched, email: true })
              }}
              onBlur={() => setTouched({ ...touched, email: true })}
              className={`input-modern transition-all duration-200 ${
                errors.email ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""
              } ${formData.email && !errors.email ? "border-green-400 focus:border-green-500" : ""}`}
              placeholder="jouw@email.nl"
            />
            {formData.email && !errors.email && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold text-primary-800 mb-2 tracking-wide uppercase flex items-center gap-1">
            Telefoon <span className="text-xs font-normal text-gray-500 ml-2 normal-case">(optioneel)</span>
            {errors.phone && <span className="text-red-500 text-xs normal-case font-normal">({errors.phone})</span>}
          </label>
          <div className="relative">
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value })
                setTouched({ ...touched, phone: true })
              }}
              onBlur={() => setTouched({ ...touched, phone: true })}
              className={`input-modern transition-all duration-200 ${
                errors.phone ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""
              } ${formData.phone && !errors.phone ? "border-green-400 focus:border-green-500" : ""}`}
              placeholder="06 12345678"
            />
            {formData.phone && !errors.phone && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-xs sm:text-sm font-semibold text-primary-800 mb-2 tracking-wide uppercase">
            Bericht <span className="text-xs font-normal text-gray-500 ml-2 normal-case">(optioneel)</span>
          </label>
          <textarea
            id="message"
            rows={4}
            maxLength={500}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="input-modern resize-none transition-all duration-200 focus:ring-2 focus:ring-primary-100"
            placeholder="Eventuele opmerkingen of vragen..."
          />
          <p className="text-xs text-gray-500 mt-1 text-right">{formData.message.length} / 500</p>
        </div>
      </div>

      {/* Privacy notice */}
      <div className="luxury-card p-5 bg-gradient-to-br from-primary-50 to-white border-primary-200">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <p className="text-xs text-gray-700 leading-relaxed">
            <strong className="font-semibold text-primary-800">Privacy:</strong> Met het maken van deze afspraak ga je akkoord dat wij je gegevens gebruiken
            voor het uitvoeren en bevestigen van de afspraak. We behandelen je gegevens vertrouwelijk en volgens de AVG.
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 md:pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary flex-1 text-sm sm:text-base group relative overflow-hidden"
          disabled={loading}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Annuleren
          </span>
        </button>
        <button
          type="submit"
          disabled={loading || !isValid}
          className="btn-primary flex-1 flex items-center justify-center text-sm sm:text-base group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative z-10 flex items-center justify-center gap-2">
            {loading ? (
              <>
                <span className="inline-block animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent"></span>
                Verzenden...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Verzenden
              </>
            )}
          </span>
        </button>
      </div>
    </form>
  )
}

