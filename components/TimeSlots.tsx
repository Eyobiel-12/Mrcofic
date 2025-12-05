"use client"

import { useState, useEffect } from "react"
import { generateTimeSlots } from "@/utils/generateSlots"
import { openingHours } from "@/utils/openingHours"

interface TimeSlotsProps {
  date: string | null
  onSelect: (time: string) => void
  selectedTime?: string | null
}

export default function TimeSlots({ date, onSelect, selectedTime }: TimeSlotsProps) {
  const [booked, setBooked] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [hoveredSlot, setHoveredSlot] = useState<string | null>(null)

  useEffect(() => {
    if (!date) {
      setBooked([])
      return
    }

    setLoading(true)
    fetch(`/api/appointments?date=${date}`)
      .then((r) => r.json())
      .then((data) => {
        const taken = data
          .filter((x: any) => x.status !== "rejected")
          .map((x: any) => x.time)
        setBooked(taken)
      })
      .catch((err) => {
        console.error("Failed to fetch appointments:", err)
      })
      .finally(() => setLoading(false))
  }, [date])

  if (!date) {
    return (
      <div className="text-gray-600 text-center py-12 animate-fade-in">
        <div className="text-6xl mb-4 animate-bounce">📅</div>
        <p className="text-lg font-medium">Kies eerst een datum</p>
      </div>
    )
  }

  // Parse date string (YYYY-MM-DD) in local timezone to avoid day shift
  const [year, month, day] = date.split("-").map(Number)
  
  // Create date in local timezone (not UTC)
  const d = new Date(year, month - 1, day) // month is 0-indexed
  const dayOfWeek = d.getDay()
  const hours = openingHours[dayOfWeek]

  if (!hours) {
    return (
      <div className="text-center py-16 bg-gradient-to-br from-red-50 to-red-100 rounded-2xl border-2 border-red-300 animate-slide-up shadow-elegant">
        <div className="text-7xl mb-6 animate-pulse">🚫</div>
        <p className="text-xl font-bold text-red-800 mb-2 font-display">Gesloten op deze dag</p>
        <p className="text-sm text-red-600 mt-2">Kies een andere datum</p>
      </div>
    )
  }

  const slots = generateTimeSlots(hours.open, hours.close)

  // Check if selected date is today to disable past time slots
  const isToday = (() => {
    const today = new Date()
    const selectedDateObj = new Date(date)
    return (
      today.getFullYear() === selectedDateObj.getFullYear() &&
      today.getMonth() === selectedDateObj.getMonth() &&
      today.getDate() === selectedDateObj.getDate()
    )
  })()

  const isTimeSlotPast = (slot: string): boolean => {
    if (!isToday) return false
    const [startTime] = slot.split("-")
    const [hours, minutes] = startTime.split(":").map(Number)
    const slotTime = new Date()
    slotTime.setHours(hours, minutes, 0, 0)
    return slotTime <= new Date()
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-primary-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
          <div className="relative inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary-600 border-t-transparent"></div>
        </div>
        <p className="text-body font-medium text-primary-700">Tijdslots laden...</p>
        <div className="mt-4 flex justify-center gap-1">
          <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-primary-600 uppercase tracking-wide">Openingstijden</p>
          <p className="text-lg font-bold text-primary-800 mt-1">
            {hours.open} - {hours.close}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">
            <span className="font-bold text-primary-800">{slots.length - booked.length}</span> beschikbaar
          </p>
          <p className="text-xs text-gray-500">
            van {slots.length} tijdslots
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
        {slots.map((slot, index) => {
          const isBooked = booked.includes(slot)
          const isPast = isTimeSlotPast(slot)
          const isDisabled = isBooked || isPast
          const isSelected = selectedTime === slot
          const isHovered = hoveredSlot === slot

          return (
            <button
              key={slot}
              disabled={isDisabled}
              onClick={() => !isDisabled && onSelect(slot)}
              onMouseEnter={() => !isDisabled && setHoveredSlot(slot)}
              onMouseLeave={() => setHoveredSlot(null)}
              className={`
                group relative p-4 sm:p-5 rounded-xl border-2 transition-all duration-300
                transform-gpu
                ${isDisabled
                  ? "bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-60"
                  : isSelected
                  ? "bg-gradient-to-br from-primary-700 to-primary-900 border-primary-600 text-white shadow-luxury scale-105 ring-4 ring-primary-200 ring-offset-2"
                  : "bg-white border-gray-200 hover:border-primary-500 hover:bg-gradient-to-br hover:from-primary-50 hover:to-white text-primary-900 hover:shadow-luxury hover:scale-105 hover:-translate-y-1"
                }
                ${!isDisabled ? "active:scale-95" : ""}
              `}
              style={{
                animationDelay: `${index * 30}ms`,
              }}
              aria-disabled={isDisabled}
              aria-label={isDisabled ? (isPast ? `${slot} - Verstreken` : `${slot} - Bezet`) : slot}
            >
              {/* Selected indicator */}
              {isSelected && (
                <>
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-gold-500 rounded-full flex items-center justify-center shadow-lg animate-scale-in z-10">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-transparent rounded-xl"></div>
                </>
              )}

              {/* Hover effect */}
              {isHovered && !isSelected && !isBooked && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary-100/50 to-transparent rounded-xl animate-pulse-slow"></div>
              )}

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center">
                <span className="font-bold text-lg sm:text-xl md:text-2xl tracking-tight mb-1">
                  {slot.split('-')[0]}
                </span>
                <span className="text-xs sm:text-sm opacity-70 font-medium">
                  {slot.split('-')[1]}
                </span>
              </div>

              {/* Disabled overlay (booked or past) */}
              {isDisabled && (
                <>
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900/10 rounded-xl">
                    <div className="flex flex-col items-center">
                      <svg className="w-6 h-6 text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        {isPast ? "Verstreken" : "Bezet"}
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-1 right-1 w-2 h-2 bg-gray-300 rounded-full"></div>
                </>
              )}

              {/* Shine effect on hover */}
              {!isDisabled && (
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

