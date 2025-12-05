export interface Appointment {
  id: string
  name: string
  email: string
  phone: string | null
  date: string
  time: string
  status: "pending" | "approved" | "rejected"
  message: string | null
  created_at: string
}

export interface BookingRequest {
  name: string
  email: string
  phone?: string
  date: string
  time: string
  message?: string
}

