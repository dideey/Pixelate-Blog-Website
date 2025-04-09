"use client"

import type React from "react"

import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { auth, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!auth.isAuthenticated || !auth.user?.isAdmin)) {
      router.push("/login")
    }
  }, [auth.isAuthenticated, auth.user?.isAdmin, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!auth.isAuthenticated || !auth.user?.isAdmin) {
    return null // Will redirect in the useEffect
  }

  return <>{children}</>
}

