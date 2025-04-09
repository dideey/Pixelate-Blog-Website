import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the token from cookies
  const token = request.cookies.get("token")?.value

  // Get user data from cookies
  const userCookie = request.cookies.get("user")?.value
  const user = userCookie ? JSON.parse(userCookie) : null

  // Check if user is authenticated and is an admin
  const isAuthenticated = !!token
  const isAdmin = user?.isAdmin === true

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!isAuthenticated || !isAdmin) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}

