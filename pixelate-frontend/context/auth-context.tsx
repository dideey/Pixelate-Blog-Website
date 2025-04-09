"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

export interface User {
  id: string
  email: string
  name: string
  isAdmin: boolean
}

export interface AuthState {
  isAuthenticated: boolean
  user: User | null
  token: string | null
}

interface AuthContextType {
  auth: AuthState
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Initialize auth state from localStorage
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")

    if (token && user) {
      try {
        setAuth({
          isAuthenticated: true,
          user: JSON.parse(user),
          token,
        })
      } catch (error) {
        console.error("Failed to parse user data:", error)
        // Clear invalid data
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      }
    }

    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Login failed")
      }

      const data = await response.json()

      // Assuming your API returns { token, user } where user has isAdmin property
      const authState = {
        isAuthenticated: true,
        user: data.user,
        token: data.token,
      }

      // Save to localStorage
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))

      setAuth(authState)
    } catch (error) {
      console.error("Login error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    // Clear auth data from localStorage
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    // Update state
    setAuth({
      isAuthenticated: false,
      user: null,
      token: null,
    })
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

