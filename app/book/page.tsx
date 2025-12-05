"use client"

import { useState, useEffect } from "react"
import TimeSlots from "@/components/TimeSlots"
import BookingForm from "@/components/BookingForm"
import Calendar from "@/components/Calendar"

export default function BookPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const today = new Date().toISOString().split("T")[0]

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    setSelectedTime(null)
    setShowForm(false)
    setCurrentStep(2)
    // Smooth scroll to time slots
    setTimeout(() => {
      const timeSlotsElement = document.getElementById("time-slots")
      if (timeSlotsElement) {
        timeSlotsElement.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 300)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
    setShowForm(true)
    setCurrentStep(3)
    // Smooth scroll to form
    setTimeout(() => {
      const formElement = document.getElementById("booking-form")
      if (formElement) {
        formElement.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 300)
  }

  const handleBookingSuccess = () => {
    setSelectedDate(null)
    setSelectedTime(null)
    setShowForm(false)
    setCurrentStep(1)
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleCancel = () => {
    setSelectedTime(null)
    setShowForm(false)
    setCurrentStep(2)
  }

  useEffect(() => {
    // Update step based on state
    if (selectedDate && !selectedTime) {
      setCurrentStep(2)
    } else if (selectedDate && selectedTime && showForm) {
      setCurrentStep(3)
    } else if (!selectedDate) {
      setCurrentStep(1)
    }
  }, [selectedDate, selectedTime, showForm])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-200/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-20">
        {/* Header */}
        <header className="text-center mb-8 md:mb-12 animate-fade-in">
          <div className="mb-4 md:mb-6">
            <span className="inline-block px-4 py-2 md:px-5 md:py-2.5 bg-gradient-to-r from-gold-50 to-gold-100 border border-gold-300 text-gold-700 text-xs md:text-sm font-semibold tracking-wide uppercase rounded-full shadow-elegant">
              ✨ Afspraak Boeken
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 bg-clip-text text-transparent mb-4 md:mb-6 font-display tracking-tight px-4">
            Boek Je Afspraak
          </h1>
          <div className="w-20 md:w-32 h-1 bg-gradient-to-r from-transparent via-gold-600 to-transparent mx-auto mb-6 md:mb-8 animate-expand"></div>
          <p className="text-body text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-4 leading-relaxed">
            Kies een datum en tijdstip dat jou uitkomt. We nemen binnen 24 uur contact met je op.
          </p>
        </header>

        {/* Main content card */}
        <div className="luxury-card p-6 md:p-8 lg:p-12 animate-slide-up shadow-luxury-lg relative overflow-hidden">
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-gold-100/30 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-primary-100/30 to-transparent rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            {/* Enhanced Step indicator */}
            <div className="flex items-center justify-center mb-10 md:mb-12 overflow-x-auto pb-4">
              <div className="flex items-center space-x-2 sm:space-x-6 min-w-max">
                {/* Step 1 */}
                <div className={`flex flex-col items-center transition-all duration-500 ${currentStep >= 1 ? 'text-primary-800' : 'text-gray-400'}`}>
                  <div className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-bold border-2 text-base sm:text-lg transition-all duration-300 ${
                    currentStep >= 1 
                      ? 'bg-gradient-to-br from-primary-700 to-primary-900 text-white border-primary-800 shadow-luxury scale-110' 
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}>
                    {currentStep > 1 ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      "1"
                    )}
                  </div>
                  <span className="mt-2 font-medium text-xs sm:text-sm tracking-wide hidden sm:inline">Datum</span>
                </div>
                
                <div className={`w-12 sm:w-20 md:w-24 h-1 rounded-full transition-all duration-500 ${
                  currentStep >= 2 ? 'bg-gradient-to-r from-primary-600 to-primary-400' : 'bg-gray-200'
                }`}></div>
                
                {/* Step 2 */}
                <div className={`flex flex-col items-center transition-all duration-500 ${currentStep >= 2 ? 'text-primary-800' : 'text-gray-400'}`}>
                  <div className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-bold border-2 text-base sm:text-lg transition-all duration-300 ${
                    currentStep >= 2 
                      ? 'bg-gradient-to-br from-primary-700 to-primary-900 text-white border-primary-800 shadow-luxury scale-110' 
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}>
                    {currentStep > 2 ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      "2"
                    )}
                  </div>
                  <span className="mt-2 font-medium text-xs sm:text-sm tracking-wide hidden sm:inline">Tijd</span>
                </div>
                
                <div className={`w-12 sm:w-20 md:w-24 h-1 rounded-full transition-all duration-500 ${
                  currentStep >= 3 ? 'bg-gradient-to-r from-primary-600 to-primary-400' : 'bg-gray-200'
                }`}></div>
                
                {/* Step 3 */}
                <div className={`flex flex-col items-center transition-all duration-500 ${currentStep >= 3 ? 'text-primary-800' : 'text-gray-400'}`}>
                  <div className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center font-bold border-2 text-base sm:text-lg transition-all duration-300 ${
                    currentStep >= 3 
                      ? 'bg-gradient-to-br from-primary-700 to-primary-900 text-white border-primary-800 shadow-luxury scale-110' 
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}>
                    3
                  </div>
                  <span className="mt-2 font-medium text-xs sm:text-sm tracking-wide hidden sm:inline">Gegevens</span>
                </div>
              </div>
            </div>

            {/* Calendar */}
            {currentStep === 1 && (
              <div className="mb-8 md:mb-10 animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary-800 font-display">
                    Kies een datum
                  </h2>
                  <span className="text-red-500 text-sm font-semibold">*</span>
                </div>
                <div className="w-16 md:w-20 h-0.5 bg-gradient-to-r from-gold-600 to-gold-400 mb-6"></div>
                <Calendar
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                  minDate={today}
                />
              </div>
            )}

            {/* Time slots */}
            {selectedDate && currentStep === 2 && (
              <div id="time-slots" className="mb-8 md:mb-10 animate-slide-up">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary-800 font-display">
                    Kies een tijdstip
                  </h2>
                  <button
                    onClick={() => {
                      setSelectedDate(null)
                      setCurrentStep(1)
                    }}
                    className="text-sm text-primary-600 hover:text-primary-800 font-medium flex items-center gap-1 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Wijzig datum
                  </button>
                </div>
                <div className="w-16 md:w-20 h-0.5 bg-gradient-to-r from-gold-600 to-gold-400 mb-6"></div>
                <TimeSlots
                  date={selectedDate}
                  onSelect={handleTimeSelect}
                  selectedTime={selectedTime}
                />
              </div>
            )}

            {/* Booking form */}
            {showForm && selectedDate && selectedTime && (
              <div className="mb-8 md:mb-10 animate-slide-up">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary-800 font-display">
                    Vul je gegevens in
                  </h2>
                  <button
                    onClick={handleCancel}
                    className="text-sm text-primary-600 hover:text-primary-800 font-medium flex items-center gap-1 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Wijzig tijd
                  </button>
                </div>
                <div className="w-16 md:w-20 h-0.5 bg-gradient-to-r from-gold-600 to-gold-400 mb-6"></div>
                <BookingForm
                  date={selectedDate}
                  time={selectedTime}
                  onSuccess={handleBookingSuccess}
                  onCancel={handleCancel}
                />
              </div>
            )}

            {/* Welcome message */}
            {!selectedDate && currentStep === 1 && (
              <div className="text-center py-20 animate-fade-in">
                <div className="inline-block mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-gold-100 rounded-full flex items-center justify-center shadow-elegant">
                    <svg className="w-12 h-12 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <p className="text-3xl font-bold text-primary-800 mb-4 font-display">Welkom bij MARCOFIC</p>
                <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold-600 to-transparent mx-auto mb-6"></div>
                <p className="text-body text-lg max-w-md mx-auto leading-relaxed">
                  Kies een datum hierboven om te beginnen met het boeken van je afspraak.
                  Het is snel, eenvoudig en veilig.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
