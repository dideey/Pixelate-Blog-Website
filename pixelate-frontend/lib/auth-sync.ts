"use client"

import { useEffect } from "react"
import { useAuth } from "@/context/auth-context"

// This component syncs the auth state with cookies for middleware
export function AuthSync() {
  const { auth } = useAuth()

  useEffect(() => {
    // When auth state changes, update the cookies for middleware
    if (auth.isAuthenticated && auth.token && auth.user) {
      // Set token cookie
      document.cookie = `token=${auth.token}; path=/; max-age=${60 * 60 * 24 * 7}`
      // Set user cookie with isAdmin flag
      document.cookie = `user=${JSON.stringify(auth.user)}; path=/; max-age=${60 * 60 * 24 * 7}`
    } else {
      // Clear cookies when logged out
      document.cookie = "token=; path=/; max-age=0"
      document.cookie = "user=; path=/; max-age=0"
    }
  }, [auth])

  return null
}

