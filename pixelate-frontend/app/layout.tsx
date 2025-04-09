import type React from "react"
import type { Metadata } from "next/types"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import { AuthProvider } from "@/context/auth-context"
import { AuthSync } from "@/lib/auth-sync"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pixelate Blog",
  description: "A modern blog with admin-only publishing",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <AuthProvider>
          <AuthSync />
          <Header />
          <main className="min-h-screen">{children}</main>
          <footer className="py-6 border-t bg-primary text-primary-foreground">
            <div className="container flex flex-col items-center justify-center gap-2 md:flex-row md:justify-between">
              <p className="text-sm text-primary-foreground/70">
                © {new Date().getFullYear()} Pixelate Blog. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="text-sm text-primary-foreground/70 hover:text-highlight">
                  Privacy
                </a>
                <a href="#" className="text-sm text-primary-foreground/70 hover:text-highlight">
                  Terms
                </a>
                <a href="#" className="text-sm text-primary-foreground/70 hover:text-highlight">
                  Contact
                </a>
              </div>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'