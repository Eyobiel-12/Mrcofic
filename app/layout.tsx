import type { Metadata } from "next"
import "./globals.css"
import ConditionalLayout from "@/components/ConditionalLayout"

export const metadata: Metadata = {
  title: "MARCOFIC - Professional Boekhouding",
  description: "MARCOFIC Professional Boekhouding - Meer dan 200 tevreden klanten. Modern, betrouwbaar en persoonlijk.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  )
}

