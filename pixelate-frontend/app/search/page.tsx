"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { getPosts } from "@/lib/posts"
import { searchPosts } from "@/lib/search"
import PostCard from "@/components/post-card"
import { Search } from "lucide-react"
import type { Post } from "@/lib/posts"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const [searchResults, setSearchResults] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function performSearch() {
      setIsLoading(true)
      const allPosts = await getPosts()
      const results = searchPosts(allPosts, query)
      setSearchResults(results)
      setIsLoading(false)
    }

    performSearch()
  }, [query])

  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <div className="flex items-center space-x-2">
          <Search className="h-8 w-8" />
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Search Results</h1>
        </div>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          {query ? (
            <>
              Showing results for <span className="font-medium text-foreground">"{query}"</span>
            </>
          ) : (
            "Enter a search term to find posts"
          )}
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No results found</h2>
          <p className="text-muted-foreground">Try different keywords or check your spelling</p>
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">Enter a search term</h2>
          <p className="text-muted-foreground">Use the search bar above to find posts</p>
        </div>
      )}
    </div>
  )
}

