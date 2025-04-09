"use client"

// Mock admin credentials - in a real app, this would be in a secure database
const ADMIN_EMAIL = "admin@pixelate.blog"
const ADMIN_PASSWORD = "admin123"

export interface AuthState {
  isAuthenticated: boolean
  isAdmin: boolean
  user: {
    email: string
    name: string
  } | null
}

// Initialize auth state from localStorage if available
export function getAuthState(): AuthState {
  if (typeof window === "undefined") {
    return {
      isAuthenticated: false,
      isAdmin: false,
      user: null,
    }
  }

  const authData = localStorage.getItem("auth")
  if (!authData) {
    return {
      isAuthenticated: false,
      isAdmin: false,
      user: null,
    }
  }

  try {
    return JSON.parse(authData)
  } catch (error) {
    console.error("Failed to parse auth data:", error)
    return {
      isAuthenticated: false,
      isAdmin: false,
      user: null,
    }
  }
}

// Login function
export async function login(email: string, password: string): Promise<AuthState> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Check credentials
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const authState: AuthState = {
      isAuthenticated: true,
      isAdmin: true,
      user: {
        email: ADMIN_EMAIL,
        name: "Admin User",
      },
    }

    // Save to localStorage
    localStorage.setItem("auth", JSON.stringify(authState))
    return authState
  }

  throw new Error("Invalid credentials")
}

// Logout function
export function logout(): void {
  localStorage.removeItem("auth")
}

