"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Bookmark, LogOut, LogIn } from "lucide-react"
import { useState } from "react"
import SearchBar from "./search-bar"
import { useAuth } from "@/context/auth-context"

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { auth, logout } = useAuth()

  const isActive = (path: string) => {
    return pathname === path
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary text-primary-foreground">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-highlight to-accent">
            Pixelate
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-highlight ${
              isActive("/") ? "text-highlight" : "text-primary-foreground/80"
            }`}
          >
            Home
          </Link>
          <Link
            href="/blog"
            className={`text-sm font-medium transition-colors hover:text-highlight ${
              isActive("/blog") ? "text-highlight" : "text-primary-foreground/80"
            }`}
          >
            Blog
          </Link>
          <Link
            href="/bookmarks"
            className={`text-sm font-medium transition-colors hover:text-highlight ${
              isActive("/bookmarks") ? "text-highlight" : "text-primary-foreground/80"
            }`}
          >
            <div className="flex items-center gap-1">
              <Bookmark className="h-4 w-4" />
              <span>Bookmarks</span>
            </div>
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium transition-colors hover:text-highlight ${
              isActive("/about") ? "text-highlight" : "text-primary-foreground/80"
            }`}
          >
            About
          </Link>
          <SearchBar />

          {auth.isAuthenticated ? (
            <>
              {auth.user?.isAdmin && (
                <Link href="/admin">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary-foreground/20 hover:bg-primary-foreground/10"
                  >
                    Admin
                  </Button>
                </Link>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="text-primary-foreground/80 hover:text-highlight hover:bg-primary-foreground/10"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button
                variant="outline"
                size="sm"
                className="border-primary-foreground/20 hover:bg-primary-foreground/10 text-highlight font-medium"
              >
                <LogIn className="h-4 w-4 mr-2 text-highlight" />
                Admin Login
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <SearchBar />
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="hover:bg-primary-foreground/10">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-primary-foreground/10 bg-primary">
          <nav className="container flex flex-col py-4 gap-4">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-highlight ${
                isActive("/") ? "text-highlight" : "text-primary-foreground/80"
              }`}
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="/blog"
              className={`text-sm font-medium transition-colors hover:text-highlight ${
                isActive("/blog") ? "text-highlight" : "text-primary-foreground/80"
              }`}
              onClick={toggleMenu}
            >
              Blog
            </Link>
            <Link
              href="/bookmarks"
              className={`text-sm font-medium transition-colors hover:text-highlight ${
                isActive("/bookmarks") ? "text-highlight" : "text-primary-foreground/80"
              }`}
              onClick={toggleMenu}
            >
              <div className="flex items-center gap-1">
                <Bookmark className="h-4 w-4" />
                <span>Bookmarks</span>
              </div>
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium transition-colors hover:text-highlight ${
                isActive("/about") ? "text-highlight" : "text-primary-foreground/80"
              }`}
              onClick={toggleMenu}
            >
              About
            </Link>

            {auth.isAuthenticated ? (
              <>
                {auth.user?.isAdmin && (
                  <Link href="/admin" onClick={toggleMenu}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-primary-foreground/20 hover:bg-primary-foreground/10"
                    >
                      Admin
                    </Button>
                  </Link>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary-foreground/80 hover:text-highlight hover:bg-primary-foreground/10 justify-start"
                  onClick={() => {
                    handleLogout()
                    toggleMenu()
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login" onClick={toggleMenu}>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary-foreground/20 hover:bg-primary-foreground/10 w-full justify-start text-highlight font-medium"
                >
                  <LogIn className="h-4 w-4 mr-2 text-highlight" />
                  Admin Login
                </Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}

