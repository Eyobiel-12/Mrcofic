"use client"

import { useState } from "react"

interface CalendarProps {
  selectedDate: string | null
  onDateSelect: (date: string) => void
  minDate?: string
}

export default function Calendar({ selectedDate, onDateSelect, minDate }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [viewMode, setViewMode] = useState<"month" | "year">("month")

  const today = new Date()
  const min = minDate ? new Date(minDate) : today

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    return { daysInMonth, startingDayOfWeek, year, month }
  }

  const isDateDisabled = (date: Date) => {
    // Create date objects at midnight for accurate comparison
    const checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const minDate = new Date(min.getFullYear(), min.getMonth(), min.getDate())
    
    // Disable if date is before minimum date
    if (checkDate < minDate) {
      return true
    }
    
    // Disable Sundays (day 0)
    if (date.getDay() === 0) {
      return true
    }
    
    return false
  }

  const formatDateString = (date: Date): string => {
    const y = date.getFullYear()
    const m = date.getMonth() + 1 // getMonth() is 0-indexed
    const d = date.getDate()
    return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`
  }

  const isDateSelected = (date: Date) => {
    if (!selectedDate) return false
    const dateStr = formatDateString(date)
    return dateStr === selectedDate
  }

  const isToday = (date: Date) => {
    const todayStr = formatDateString(today)
    const dateStr = formatDateString(date)
    return dateStr === todayStr
  }

  const handleDateClick = (day: number) => {
    const { year, month } = getDaysInMonth(currentMonth)
    const date = new Date(year, month, day)
    if (!isDateDisabled(date)) {
      // Format date string directly to avoid timezone conversion issues
      // Don't use toISOString() as it converts to UTC and can shift the date
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
      onDateSelect(dateStr)
    }
  }

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const goToPreviousYear = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear() - 1, currentMonth.getMonth(), 1))
  }

  const goToNextYear = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear() + 1, currentMonth.getMonth(), 1))
  }

  const selectMonth = (month: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), month, 1))
    setViewMode("month")
  }

  const selectYear = (year: number) => {
    setCurrentMonth(new Date(year, currentMonth.getMonth(), 1))
    setViewMode("month")
  }

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth)
  const monthNames = [
    "Januari", "Februari", "Maart", "April", "Mei", "Juni",
    "Juli", "Augustus", "September", "Oktober", "November", "December"
  ]
  const dayNames = ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"]

  const days = []
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null)
  }
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day)
  }

  // Year view
  if (viewMode === "year") {
    const currentYear = currentMonth.getFullYear()
    const years = []
    const startYear = Math.floor(currentYear / 10) * 10
    for (let y = startYear - 1; y <= startYear + 10; y++) {
      years.push(y)
    }

    return (
      <div className="luxury-card p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={goToPreviousYear}
            className="p-2 hover:bg-primary-50 rounded-lg transition-all duration-200 hover:scale-110"
            aria-label="Vorige jaar"
          >
            <svg className="w-5 h-5 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h3 className="text-xl font-bold text-primary-800 font-display">
            {startYear} - {startYear + 10}
          </h3>
          <button
            onClick={goToNextYear}
            className="p-2 hover:bg-primary-50 rounded-lg transition-all duration-200 hover:scale-110"
            aria-label="Volgende jaar"
          >
            <svg className="w-5 h-5 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {years.map((y) => (
            <button
              key={y}
              onClick={() => selectYear(y)}
              className={`p-4 rounded-lg font-semibold transition-all duration-200 ${
                y === currentYear
                  ? "bg-primary-800 text-white shadow-luxury scale-105"
                  : "bg-white hover:bg-primary-50 text-primary-800 hover:shadow-elegant"
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="luxury-card p-6 animate-fade-in overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-primary-50 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label="Vorige maand"
        >
          <svg className="w-5 h-5 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("year")}
            className="text-xl font-bold text-primary-800 font-display hover:text-primary-600 transition-colors px-3 py-1 rounded-lg hover:bg-primary-50"
          >
            {monthNames[month]}
          </button>
          <button
            onClick={() => setViewMode("year")}
            className="text-xl font-bold text-primary-800 font-display hover:text-primary-600 transition-colors px-3 py-1 rounded-lg hover:bg-primary-50"
          >
            {year}
          </button>
        </div>
        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-primary-50 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
          aria-label="Volgende maand"
        >
          <svg className="w-5 h-5 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-2 mb-3">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-primary-600 uppercase tracking-wide py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="aspect-square" />
          }

          const date = new Date(year, month, day)
          const disabled = isDateDisabled(date)
          const selected = isDateSelected(date)
          const isTodayDate = isToday(date)
          
          // Get day name for tooltip
          const dayNames = ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"]
          const dayName = dayNames[date.getDay()]
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`

          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              disabled={disabled}
              title={`${dayName}, ${dateStr}`}
              className={`
                aspect-square rounded-lg font-semibold text-sm transition-all duration-300
                relative group
                ${disabled
                  ? "bg-gray-50 text-gray-300 cursor-not-allowed"
                  : selected
                  ? "bg-primary-800 text-white shadow-luxury scale-105 ring-2 ring-primary-300 ring-offset-2"
                  : isTodayDate
                  ? "bg-gold-100 text-gold-800 border-2 border-gold-400 hover:bg-gold-200 hover:shadow-elegant"
                  : "bg-white text-primary-800 hover:bg-primary-50 hover:shadow-elegant hover:scale-105"
                }
                ${!disabled && !selected ? "hover:border-2 hover:border-primary-300" : ""}
                active:scale-95
              `}
              style={{
                animationDelay: `${index * 20}ms`,
              }}
            >
              <span className="relative z-10">{day}</span>
              {selected && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary-700 to-primary-900 rounded-lg opacity-90" />
              )}
              {!disabled && !selected && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
            </button>
          )
        })}
      </div>

      {/* Quick actions */}
      <div className="mt-6 pt-6 border-t border-gray-200 flex gap-2">
        <button
          onClick={() => {
            const todayStr = today.toISOString().split("T")[0]
            if (!isDateDisabled(today)) {
              onDateSelect(todayStr)
            }
          }}
          className="flex-1 px-4 py-2 text-sm font-medium text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-lg transition-all duration-200 hover:scale-105"
        >
          Vandaag
        </button>
        <button
          onClick={() => {
            const tomorrow = new Date(today)
            tomorrow.setDate(tomorrow.getDate() + 1)
            const tomorrowStr = tomorrow.toISOString().split("T")[0]
            if (!isDateDisabled(tomorrow)) {
              onDateSelect(tomorrowStr)
            }
          }}
          className="flex-1 px-4 py-2 text-sm font-medium text-primary-700 bg-primary-50 hover:bg-primary-100 rounded-lg transition-all duration-200 hover:scale-105"
        >
          Morgen
        </button>
      </div>
    </div>
  )
}

