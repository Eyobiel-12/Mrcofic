import { openingHours } from "./openingHours"
import { generateTimeSlots } from "./generateSlots"

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validateTimeFormat(time: string): boolean {
  // Format: HH:MM-HH:MM (e.g., "11:00-11:30")
  return /^([0-1][0-9]|2[0-3]):[0-5][0-9]-([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(time)
}

export function validatePhone(phone: string): boolean {
  if (!phone || phone.trim().length === 0) return true // Optional
  // Basic phone validation - allow digits, spaces, +, -, (, )
  if (!/^[\d\s\+\-\(\)]+$/.test(phone)) return false
  // Remove all non-digits to check minimum length
  const digitsOnly = phone.replace(/\D/g, "")
  return digitsOnly.length >= 10
}

export function validateDate(dateStr: string): { valid: boolean; error?: string } {
  const date = new Date(dateStr)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return { valid: false, error: "Ongeldige datum" }
  }
  
  // Check if date is in the past
  const checkDate = new Date(dateStr)
  checkDate.setHours(0, 0, 0, 0)
  if (checkDate < today) {
    return { valid: false, error: "Datum kan niet in het verleden zijn" }
  }
  
  // Check if date is Sunday (day 0)
  if (date.getDay() === 0) {
    return { valid: false, error: "Zondag is gesloten" }
  }
  
  return { valid: true }
}

export function validateTimeSlot(dateStr: string, timeSlot: string): { valid: boolean; error?: string } {
  // Validate time format
  if (!validateTimeFormat(timeSlot)) {
    return { valid: false, error: "Ongeldig tijdformaat" }
  }
  
  // Parse date string (YYYY-MM-DD) in local timezone to avoid day shift
  const [year, month, day] = dateStr.split("-").map(Number)
  const date = new Date(year, month - 1, day) // month is 0-indexed
  const dayOfWeek = date.getDay()
  const hours = openingHours[dayOfWeek]
  
  // Check if business is open on this day
  if (!hours) {
    return { valid: false, error: "Gesloten op deze dag" }
  }
  
  // Parse time slot
  const [startTime, endTime] = timeSlot.split("-")
  const [startH, startM] = startTime.split(":").map(Number)
  const [endH, endM] = endTime.split(":").map(Number)
  const [openH, openM] = hours.open.split(":").map(Number)
  const [closeH, closeM] = hours.close.split(":").map(Number)
  
  // Convert to minutes for easier comparison
  const startMinutes = startH * 60 + startM
  const endMinutes = endH * 60 + endM
  const openMinutes = openH * 60 + openM
  const closeMinutes = closeH * 60 + closeM
  
  // Check if time slot is within opening hours
  if (startMinutes < openMinutes || endMinutes > closeMinutes) {
    return { valid: false, error: "Tijdslot valt buiten openingstijden" }
  }
  
  // Check if time slot is 30 minutes
  if (endMinutes - startMinutes !== 30) {
    return { valid: false, error: "Tijdslot moet 30 minuten zijn" }
  }
  
  // Check if time slot hasn't passed (for today)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const appointmentDate = new Date(dateStr)
  appointmentDate.setHours(0, 0, 0, 0)
  
  if (appointmentDate.getTime() === today.getTime()) {
    const now = new Date()
    const currentMinutes = now.getHours() * 60 + now.getMinutes()
    if (startMinutes <= currentMinutes) {
      return { valid: false, error: "Dit tijdslot is al verstreken" }
    }
  }
  
  // Check if time slot is in valid list
  const validSlots = generateTimeSlots(hours.open, hours.close)
  if (!validSlots.includes(timeSlot)) {
    return { valid: false, error: "Ongeldig tijdslot" }
  }
  
  return { valid: true }
}

