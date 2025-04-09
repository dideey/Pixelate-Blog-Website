"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SearchBar() {
  const router = useRouter()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const searchInputRef = useRef<HTMLInputElement>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
    }
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  // Focus the search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isSearchOpen])

  // Close search on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false)
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [])

  return (
    <div className="relative">
      {isSearchOpen ? (
        <form onSubmit={handleSearch} className="flex items-center">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              ref={searchInputRef}
              type="search"
              placeholder="Search posts..."
              className="w-full pl-9 md:w-[300px] bg-background text-foreground"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="ml-1 hover:bg-primary-foreground/10"
            onClick={toggleSearch}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close search</span>
          </Button>
        </form>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSearch}
          className="text-primary-foreground/80 hover:text-highlight hover:bg-primary-foreground/10"
        >
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
      )}
    </div>
  )
}

