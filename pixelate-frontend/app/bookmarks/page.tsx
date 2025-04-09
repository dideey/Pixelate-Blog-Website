"use client"

import { useEffect, useState } from "react"
import { getPosts } from "@/lib/posts"
import { getBookmarkedPosts } from "@/lib/bookmarks"
import PostCard from "@/components/post-card"
import { Bookmark } from "lucide-react"
import type { Post } from "@/lib/posts"

export default function BookmarksPage() {
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadBookmarkedPosts() {
      setIsLoading(true)
      const allPosts = await getPosts()
      const bookmarked = await getBookmarkedPosts(allPosts)
      setBookmarkedPosts(bookmarked)
      setIsLoading(false)
    }

    loadBookmarkedPosts()
  }, [])

  // Listen for storage events to update bookmarks when changed in another tab
  useEffect(() => {
    const handleStorageChange = async () => {
      const allPosts = await getPosts()
      const bookmarked = await getBookmarkedPosts(allPosts)
      setBookmarkedPosts(bookmarked)
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="flex items-center space-x-2">
          <Bookmark className="h-8 w-8" />
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Your Bookmarks</h1>
        </div>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Posts you've saved for later reading.
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : bookmarkedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No bookmarks yet</h2>
          <p className="text-muted-foreground">Start bookmarking posts you'd like to read later.</p>
        </div>
      )}
    </div>
  )
}

