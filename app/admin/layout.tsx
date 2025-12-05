import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard - MARCOFIC",
  description: "Admin dashboard voor MARCOFIC",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

