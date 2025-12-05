"use client"

import { useState, useEffect } from "react"
import AdminLogin from "@/components/AdminLogin"
import AdminDashboard from "@/components/AdminDashboard"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      setMounted(true)
      // Check if user is already authenticated
      try {
        const auth = sessionStorage.getItem("admin_auth")
        if (auth === "true") {
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error("Error checking auth:", error)
      }
    }
  }, [])

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    try {
      sessionStorage.removeItem("admin_auth")
    } catch (error) {
      console.error("Error removing auth:", error)
    }
    setIsAuthenticated(false)
  }

  // Show loading only briefly while checking mount state
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent mb-4"></div>
          <p className="text-gray-600">Laden...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AdminLogin onSuccess={handleLoginSuccess} />
  }

  return <AdminDashboard onLogout={handleLogout} />
}
