"use client"

import { useState, useEffect, useMemo, useRef } from "react"

interface Appointment {
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

interface AdminDashboardProps {
  onLogout: () => void
}

type SortOption = "newest" | "oldest" | "date-asc" | "date-desc" | "name-asc" | "name-desc"

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [allAppointments, setAllAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all")
  const [dateFilter, setDateFilter] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("newest")
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [showBulkActions, setShowBulkActions] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [dateRange, setDateRange] = useState<"today" | "week" | "month" | "all">("all")
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set())
  const processingRef = useRef<Set<string>>(new Set())
  const lastActionRef = useRef<{ id: string; action: string; timestamp: number } | null>(null)

  // Statistics
  const stats = useMemo(() => {
    const total = allAppointments.length
    const pending = allAppointments.filter(a => a.status === "pending").length
    const approved = allAppointments.filter(a => a.status === "approved").length
    const rejected = allAppointments.filter(a => a.status === "rejected").length
    const today = new Date().toISOString().split("T")[0]
    const todayCount = allAppointments.filter(a => a.date === today && a.status !== "rejected").length
    const thisWeek = allAppointments.filter(a => {
      const aptDate = new Date(a.date)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return aptDate >= weekAgo && a.status !== "rejected"
    }).length

    return { total, pending, approved, rejected, todayCount, thisWeek }
  }, [allAppointments])

  const fetchAppointments = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/appointments")
      const data = await response.json()
      setAllAppointments(data)
    } catch (err) {
      console.error("Failed to fetch appointments:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  // Smart date range filter
  const getDateRangeFilter = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    switch (dateRange) {
      case "today":
        return today.toISOString().split("T")[0]
      case "week": {
        const weekAgo = new Date(today)
        weekAgo.setDate(weekAgo.getDate() - 7)
        return weekAgo.toISOString().split("T")[0]
      }
      case "month": {
        const monthAgo = new Date(today)
        monthAgo.setMonth(monthAgo.getMonth() - 1)
        return monthAgo.toISOString().split("T")[0]
      }
      default:
        return null
    }
  }

  // Filter and sort appointments
  const filteredAndSortedAppointments = useMemo(() => {
    let filtered = [...allAppointments]

    // Status filter
    if (filter !== "all") {
      filtered = filtered.filter(a => a.status === filter)
    }

    // Date range filter (smart)
    const dateRangeStart = getDateRangeFilter()
    if (dateRangeStart && dateRange !== "all") {
      filtered = filtered.filter(a => {
        const aptDate = new Date(a.date)
        aptDate.setHours(0, 0, 0, 0)
        const rangeStart = new Date(dateRangeStart)
        rangeStart.setHours(0, 0, 0, 0)
        return aptDate >= rangeStart
      })
    }

    // Specific date filter (overrides date range)
    if (dateFilter) {
      filtered = filtered.filter(a => a.date === dateFilter)
    }

    // Smart search (searches in all fields)
    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter(a =>
        a.name.toLowerCase().includes(query) ||
        a.email.toLowerCase().includes(query) ||
        (a.phone && a.phone.replace(/\s/g, "").includes(query.replace(/\s/g, ""))) ||
        a.date.includes(query) ||
        a.time.includes(query) ||
        (a.message && a.message.toLowerCase().includes(query)) ||
        a.id.toLowerCase().includes(query)
      )
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        case "oldest":
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        case "date-asc":
          return a.date.localeCompare(b.date) || a.time.localeCompare(b.time)
        case "date-desc":
          return b.date.localeCompare(a.date) || b.time.localeCompare(a.time)
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        default:
          return 0
      }
    })

    return filtered
  }, [allAppointments, filter, dateFilter, dateRange, searchQuery, sortBy])

  useEffect(() => {
    setAppointments(filteredAndSortedAppointments)
  }, [filteredAndSortedAppointments])

  // Reset date range when specific date is selected
  useEffect(() => {
    if (dateFilter) {
      setDateRange("all")
    }
  }, [dateFilter])

  const handleApprove = async (id: string) => {
    const now = Date.now()
    
    // Prevent duplicate calls within 2 seconds (React Strict Mode protection)
    if (lastActionRef.current && 
        lastActionRef.current.id === id && 
        lastActionRef.current.action === "approve" &&
        now - lastActionRef.current.timestamp < 2000) {
      console.log("⚠️ Approve blocked - duplicate call within 2s:", id)
      return
    }

    // Prevent double-clicks with both state and ref
    if (processingIds.has(id) || processingRef.current.has(id)) {
      console.log("⚠️ Approve already processing for:", id)
      return
    }

    // Check if appointment is already approved
    const appointment = appointments.find(a => a.id === id)
    if (appointment && appointment.status === "approved") {
      console.log("⚠️ Appointment already approved:", id)
      return
    }

    // Record this action
    lastActionRef.current = { id, action: "approve", timestamp: now }

    // Add to both state and ref
    processingRef.current.add(id)
    setProcessingIds(prev => new Set(prev).add(id))
    
    try {
      console.log("🚀 Calling approve API for:", id)
      const response = await fetch("/api/admin/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      if (response.ok) {
        console.log("✅ Approve successful for:", id)
        fetchAppointments()
        setSelectedIds(new Set())
      } else {
        console.error("❌ Approve failed for:", id)
        alert("Fout bij goedkeuren")
      }
    } catch (err) {
      console.error("❌ Approve error for:", id, err)
      alert("Fout bij goedkeuren")
    } finally {
      // Clear after delay to prevent rapid re-clicks
      setTimeout(() => {
        processingRef.current.delete(id)
        setProcessingIds(prev => {
          const newSet = new Set(prev)
          newSet.delete(id)
          return newSet
        })
      }, 1000)
    }
  }

  const handleReject = async (id: string) => {
    const now = Date.now()
    
    // Prevent duplicate calls within 2 seconds (React Strict Mode protection)
    if (lastActionRef.current && 
        lastActionRef.current.id === id && 
        lastActionRef.current.action === "reject" &&
        now - lastActionRef.current.timestamp < 2000) {
      console.log("⚠️ Reject blocked - duplicate call within 2s:", id)
      return
    }

    // Prevent double-clicks with both state and ref
    if (processingIds.has(id) || processingRef.current.has(id)) {
      console.log("⚠️ Reject already processing for:", id)
      return
    }

    // Check if appointment is already rejected
    const appointment = appointments.find(a => a.id === id)
    if (appointment && appointment.status === "rejected") {
      console.log("⚠️ Appointment already rejected:", id)
      return
    }

    if (!confirm("Weet je zeker dat je deze afspraak wilt afwijzen?")) {
      return
    }

    // Record this action
    lastActionRef.current = { id, action: "reject", timestamp: now }

    // Add to both state and ref
    processingRef.current.add(id)
    setProcessingIds(prev => new Set(prev).add(id))

    try {
      console.log("🚀 Calling reject API for:", id)
      const response = await fetch("/api/admin/reject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      if (response.ok) {
        console.log("✅ Reject successful for:", id)
        fetchAppointments()
        setSelectedIds(new Set())
      } else {
        console.error("❌ Reject failed for:", id)
        alert("Fout bij afwijzen")
      }
    } catch (err) {
      console.error("❌ Reject error for:", id, err)
      alert("Fout bij afwijzen")
    } finally {
      // Clear after delay to prevent rapid re-clicks
      setTimeout(() => {
        processingRef.current.delete(id)
        setProcessingIds(prev => {
          const newSet = new Set(prev)
          newSet.delete(id)
          return newSet
        })
      }, 1000)
    }
  }

  const handleBulkApprove = async () => {
    if (selectedIds.size === 0) return
    if (!confirm(`Weet je zeker dat je ${selectedIds.size} afspraak(en) wilt goedkeuren?`)) return

    try {
      const promises = Array.from(selectedIds).map(id => handleApprove(id))
      await Promise.all(promises)
      setSelectedIds(new Set())
      setShowBulkActions(false)
    } catch (err) {
      alert("Fout bij bulk goedkeuren")
    }
  }

  const handleBulkReject = async () => {
    if (selectedIds.size === 0) return
    if (!confirm(`Weet je zeker dat je ${selectedIds.size} afspraak(en) wilt afwijzen?`)) return

    try {
      const promises = Array.from(selectedIds).map(id => handleReject(id))
      await Promise.all(promises)
      setSelectedIds(new Set())
      setShowBulkActions(false)
    } catch (err) {
      alert("Fout bij bulk afwijzen")
    }
  }

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedIds(newSelected)
    setShowBulkActions(newSelected.size > 0)
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === appointments.length) {
      setSelectedIds(new Set())
      setShowBulkActions(false)
    } else {
      setSelectedIds(new Set(appointments.map(a => a.id)))
      setShowBulkActions(true)
    }
  }

  const exportToCSV = () => {
    const headers = ["Naam", "E-mail", "Telefoon", "Datum", "Tijd", "Status", "Bericht", "Aangemaakt"]
    const rows = appointments.map(a => [
      a.name,
      a.email,
      a.phone || "",
      a.date,
      a.time,
      a.status,
      a.message || "",
      new Date(a.created_at).toLocaleString("nl-NL")
    ])

    const csv = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n")

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `afspraken-${new Date().toISOString().split("T")[0]}.csv`
    link.click()
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      approved: "bg-green-100 text-green-800 border-green-300",
      rejected: "bg-red-100 text-red-800 border-red-300",
    }
    const labels = {
      pending: "In afwachting",
      approved: "Goedgekeurd",
      rejected: "Afgewezen",
    }

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status as keyof typeof styles]}`}
      >
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="w-full">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 shadow-elegant sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 bg-clip-text text-transparent font-display truncate">
                  Admin Dashboard
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Beheer alle afspraken en boekingen</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={fetchAppointments}
                  className="p-2 text-gray-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                  disabled={loading}
                  title="Ververs"
                >
                  <svg className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
                <button
                  onClick={exportToCSV}
                  className="p-2 text-gray-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                  disabled={appointments.length === 0}
                  title="Export CSV"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>
                <button
                  onClick={onLogout}
                  className="px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="hidden sm:inline">Uitloggen</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="luxury-card p-4 bg-gradient-to-br from-primary-50 to-white border-primary-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-primary-600 uppercase tracking-wide">Totaal</p>
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-primary-800">{stats.total}</p>
            </div>

            <div className="luxury-card p-4 bg-gradient-to-br from-yellow-50 to-white border-yellow-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-yellow-600 uppercase tracking-wide">In Afwachting</p>
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-yellow-800">{stats.pending}</p>
            </div>

            <div className="luxury-card p-4 bg-gradient-to-br from-green-50 to-white border-green-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">Goedgekeurd</p>
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-green-800">{stats.approved}</p>
            </div>

            <div className="luxury-card p-4 bg-gradient-to-br from-red-50 to-white border-red-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-red-600 uppercase tracking-wide">Afgewezen</p>
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-red-800">{stats.rejected}</p>
            </div>

            <div className="luxury-card p-4 bg-gradient-to-br from-blue-50 to-white border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">Vandaag</p>
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-blue-800">{stats.todayCount}</p>
            </div>

            <div className="luxury-card p-4 bg-gradient-to-br from-purple-50 to-white border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide">Deze Week</p>
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-2xl md:text-3xl font-bold text-purple-800">{stats.thisWeek}</p>
            </div>
          </div>

          {/* Smart Filters */}
          <div className="luxury-card p-3 sm:p-4 mb-4 sm:mb-6">
            {/* Mobile filter toggle */}
            <div className="flex items-center justify-between mb-3 sm:hidden">
              <h3 className="text-sm font-semibold text-primary-800">Filters</h3>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 text-gray-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
              >
                <svg className={`w-5 h-5 transition-transform ${showFilters ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <div className={`${showFilters ? "block" : "hidden"} sm:block space-y-4`}>
              {/* Search Bar */}
              <div className="w-full">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Zoek op naam, e-mail, telefoon, datum..."
                    className="input-modern pl-10 pr-4 py-2.5 text-sm w-full"
                  />
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Quick Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setDateRange("today")
                    setDateFilter("")
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    dateRange === "today" && !dateFilter
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Vandaag
                </button>
                <button
                  onClick={() => {
                    setDateRange("week")
                    setDateFilter("")
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    dateRange === "week" && !dateFilter
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Deze Week
                </button>
                <button
                  onClick={() => {
                    setDateRange("month")
                    setDateFilter("")
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    dateRange === "month" && !dateFilter
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Deze Maand
                </button>
                <button
                  onClick={() => {
                    setFilter("pending")
                    setDateRange("all")
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    filter === "pending"
                      ? "bg-yellow-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  In Afwachting
                </button>
                <button
                  onClick={() => {
                    setDateRange("all")
                    setDateFilter("")
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    dateRange === "all" && !dateFilter
                      ? "bg-gray-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Alles
                </button>
              </div>

              {/* Filter Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Status Filter */}
                <div>
                  <label className="block text-xs font-semibold text-primary-800 mb-1.5 uppercase tracking-wide">Status</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
                    className="input-modern py-2 text-sm w-full"
            >
                    <option value="all">Alle status</option>
              <option value="pending">In afwachting</option>
              <option value="approved">Goedgekeurd</option>
              <option value="rejected">Afgewezen</option>
            </select>
          </div>

                {/* Date Range Filter */}
                <div>
                  <label className="block text-xs font-semibold text-primary-800 mb-1.5 uppercase tracking-wide">Periode</label>
                  <select
                    value={dateRange}
                    onChange={(e) => {
                      setDateRange(e.target.value as any)
                      setDateFilter("")
                    }}
                    className="input-modern py-2 text-sm w-full"
                  >
                    <option value="all">Alle datums</option>
                    <option value="today">Vandaag</option>
                    <option value="week">Deze week</option>
                    <option value="month">Deze maand</option>
                  </select>
                </div>

                {/* Specific Date Filter */}
                <div>
                  <label className="block text-xs font-semibold text-primary-800 mb-1.5 uppercase tracking-wide">Specifieke datum</label>
            <input
              type="date"
              value={dateFilter}
                    onChange={(e) => {
                      setDateFilter(e.target.value)
                      if (e.target.value) setDateRange("all")
                    }}
                    className="input-modern py-2 text-sm w-full"
                  />
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-xs font-semibold text-primary-800 mb-1.5 uppercase tracking-wide">Sorteren</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="input-modern py-2 text-sm w-full"
                  >
                    <option value="newest">Nieuwste eerst</option>
                    <option value="oldest">Oudste eerst</option>
                    <option value="date-asc">Datum ↑</option>
                    <option value="date-desc">Datum ↓</option>
                    <option value="name-asc">Naam A-Z</option>
                    <option value="name-desc">Naam Z-A</option>
                  </select>
                </div>
              </div>

              {/* Active Filters Chips */}
              {(filter !== "all" || searchQuery || dateFilter || dateRange !== "all") && (
                <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-200">
                  <span className="text-xs font-semibold text-gray-600">Actieve filters:</span>
                  {filter !== "all" && (
                    <span className="px-2.5 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium flex items-center gap-1.5">
                      Status: {filter === "pending" ? "In afwachting" : filter === "approved" ? "Goedgekeurd" : "Afgewezen"}
                      <button onClick={() => setFilter("all")} className="hover:text-primary-900">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  )}
                  {searchQuery && (
                    <span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1.5">
                      Zoek: "{searchQuery}"
                      <button onClick={() => setSearchQuery("")} className="hover:text-blue-900">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  )}
                  {dateFilter && (
                    <span className="px-2.5 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium flex items-center gap-1.5">
                      Datum: {new Date(dateFilter).toLocaleDateString("nl-NL")}
                      <button onClick={() => setDateFilter("")} className="hover:text-purple-900">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  )}
                  {dateRange !== "all" && !dateFilter && (
                    <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1.5">
                      Periode: {dateRange === "today" ? "Vandaag" : dateRange === "week" ? "Deze week" : "Deze maand"}
                      <button onClick={() => setDateRange("all")} className="hover:text-green-900">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  )}
                  <button
                    onClick={() => {
                      setDateFilter("")
                      setSearchQuery("")
                      setFilter("all")
                      setDateRange("all")
                    }}
                    className="px-2.5 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-medium hover:bg-gray-300 transition-colors"
                  >
                    Wis alles
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Bulk Actions */}
          {showBulkActions && (
            <div className="luxury-card p-3 sm:p-4 mb-4 sm:mb-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-primary-700 font-medium">{selectedIds.size} geselecteerd</span>
                <button onClick={handleBulkApprove} className="px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-xs flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Goedkeuren
                </button>
                <button onClick={handleBulkReject} className="px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold text-xs flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Afwijzen
                </button>
                <button onClick={() => { setSelectedIds(new Set()); setShowBulkActions(false) }} className="px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold text-xs">
                  Deselecteren
                </button>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="mb-4">
            <p className="text-sm text-gray-600">{appointments.length} afspraak{appointments.length !== 1 ? "en" : ""} gevonden</p>
      </div>

          {/* Appointments List */}
      {loading ? (
            <div className="text-center py-20">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-primary-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <div className="relative inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary-600 border-t-transparent"></div>
              </div>
              <p className="text-body font-medium text-primary-700">Laden...</p>
        </div>
      ) : appointments.length === 0 ? (
            <div className="text-center py-20 luxury-card">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-lg font-semibold text-primary-800 mb-2">Geen afspraken gevonden</p>
              <p className="text-body text-sm">Probeer andere filters of zoektermen</p>
        </div>
      ) : (
        <div className="space-y-4">
              {appointments.map((apt, index) => {
                const isPending = apt.status === "pending"
                const isApproved = apt.status === "approved"
                const isRejected = apt.status === "rejected"
                
                return (
            <div
              key={apt.id}
                    className={`group luxury-card p-0 overflow-hidden transition-all duration-300 hover:shadow-luxury-lg hover:-translate-y-1 ${
                      isPending
                        ? "border-l-4 border-l-yellow-500 bg-gradient-to-br from-yellow-50 via-white to-white"
                        : isApproved
                        ? "border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 via-white to-white"
                        : "border-l-4 border-l-red-500 bg-gradient-to-br from-red-50 via-white to-white"
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    {/* Status indicator bar */}
                    <div className={`h-1 w-full ${
                      isPending ? "bg-gradient-to-r from-yellow-400 to-yellow-600" :
                      isApproved ? "bg-gradient-to-r from-green-400 to-green-600" :
                      "bg-gradient-to-r from-red-400 to-red-600"
                    }`}></div>

                    <div className="p-5 md:p-6">
                      <div className="flex flex-col lg:flex-row gap-5">
                        {/* Left side - Content */}
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          {/* Checkbox */}
                          <div className="mt-1">
                            <input
                              type="checkbox"
                              checked={selectedIds.has(apt.id)}
                              onChange={() => toggleSelect(apt.id)}
                              className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 cursor-pointer transition-all"
                            />
                          </div>

                          {/* Main content */}
                <div className="flex-1 min-w-0">
                            {/* Header with name and status */}
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                              <div className="flex-1">
                                <h3 className="text-xl md:text-2xl font-bold text-primary-900 font-display mb-2 group-hover:text-primary-700 transition-colors">
                                  {apt.name}
                                </h3>
                                <div className="flex items-center gap-2">
                    {getStatusBadge(apt.status)}
                                  <span className="text-xs text-gray-500">
                                    ID: {apt.id.slice(0, 8)}...
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Info grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                              {/* Email */}
                              <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg border border-gray-100 hover:border-primary-200 transition-colors group/item">
                                <div className="p-2 bg-primary-100 rounded-lg flex-shrink-0">
                                  <svg className="w-5 h-5 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                  </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">E-mail</p>
                                  <a href={`mailto:${apt.email}`} className="text-primary-700 hover:text-primary-900 hover:underline break-all font-medium transition-colors">
                                    {apt.email}
                                  </a>
                                </div>
                  </div>

                              {/* Phone */}
                    {apt.phone && (
                                <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg border border-gray-100 hover:border-primary-200 transition-colors group/item">
                                  <div className="p-2 bg-primary-100 rounded-lg flex-shrink-0">
                                    <svg className="w-5 h-5 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Telefoon</p>
                                    <a href={`tel:${apt.phone}`} className="text-primary-700 hover:text-primary-900 hover:underline font-medium transition-colors">
                                      {apt.phone}
                                    </a>
                                  </div>
                                </div>
                              )}

                              {/* Date */}
                              <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg border border-gray-100 hover:border-primary-200 transition-colors group/item">
                                <div className="p-2 bg-gold-100 rounded-lg flex-shrink-0">
                                  <svg className="w-5 h-5 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Datum</p>
                                  <p className="text-primary-800 font-semibold">
                      {new Date(apt.date).toLocaleDateString("nl-NL", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                                </div>
                              </div>

                              {/* Time */}
                              <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg border border-gray-100 hover:border-primary-200 transition-colors group/item">
                                <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                                  <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Tijd</p>
                                  <p className="text-primary-800 font-semibold text-lg">{apt.time}</p>
                                </div>
                              </div>
                            </div>

                            {/* Message */}
                    {apt.message && (
                              <div className="mb-4 p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 shadow-sm">
                                <div className="flex items-center gap-2 mb-2">
                                  <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                  </svg>
                                  <p className="text-xs font-semibold text-primary-800 uppercase tracking-wide">Bericht</p>
                                </div>
                                <p className="text-sm text-body break-words leading-relaxed">{apt.message}</p>
                              </div>
                            )}

                            {/* Footer with created date */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Aangemaakt: {new Date(apt.created_at).toLocaleString("nl-NL")}</span>
                              </div>
                              {isPending && (
                                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full animate-pulse">
                                  Actie vereist
                                </span>
                              )}
                            </div>
                  </div>
                </div>

                        {/* Right side - Actions */}
                        {isPending && (
                          <div className="flex flex-row sm:flex-col gap-3 lg:flex-shrink-0 lg:w-48 w-full sm:w-auto">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        if (!processingIds.has(apt.id) && !processingRef.current.has(apt.id)) {
                          handleApprove(apt.id)
                        }
                      }}
                      disabled={processingIds.has(apt.id)}
                      type="button"
                              className="group/btn relative overflow-hidden px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-elegant hover:shadow-luxury transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                              <span className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-800 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                              {processingIds.has(apt.id) ? (
                                <span className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent relative z-10"></span>
                              ) : (
                                <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                              <span className="relative z-10">{processingIds.has(apt.id) ? "Verwerken..." : "Goedkeuren"}</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        if (!processingIds.has(apt.id) && !processingRef.current.has(apt.id)) {
                          handleReject(apt.id)
                        }
                      }}
                      disabled={processingIds.has(apt.id)}
                      type="button"
                              className="group/btn relative overflow-hidden px-6 py-3 bg-white border-2 border-red-300 text-red-700 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-red-50 hover:border-red-400 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                              {processingIds.has(apt.id) ? (
                                <span className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-red-700 border-t-transparent"></span>
                              ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              )}
                              <span>{processingIds.has(apt.id) ? "Verwerken..." : "Afwijzen"}</span>
                    </button>
                          </div>
                        )}

                        {/* Status indicators for approved/rejected */}
                        {(isApproved || isRejected) && (
                          <div className="flex items-center justify-center lg:w-48">
                            <div className={`p-4 rounded-xl ${
                              isApproved ? "bg-green-50 border-2 border-green-200" : "bg-red-50 border-2 border-red-200"
                            }`}>
                              <div className="flex flex-col items-center gap-2">
                                {isApproved ? (
                                  <>
                                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                      </svg>
                                    </div>
                                    <p className="text-xs font-semibold text-green-700 uppercase tracking-wide">Goedgekeurd</p>
                                  </>
                                ) : (
                                  <>
                                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                      </svg>
                                    </div>
                                    <p className="text-xs font-semibold text-red-700 uppercase tracking-wide">Afgewezen</p>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {appointments.length > 0 && (
            <div className="mt-6 flex items-center justify-center">
              <button onClick={toggleSelectAll} className="text-sm text-primary-600 hover:text-primary-800 font-medium flex items-center gap-2">
                {selectedIds.size === appointments.length ? (
                  <>Alles deselecteren</>
                ) : (
                  <>Alles selecteren</>
                )}
              </button>
            </div>
          )}
        </main>
        </div>
    </div>
  )
}
