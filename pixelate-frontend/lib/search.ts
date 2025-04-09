import type { Post } from "./posts"

export function searchPosts(posts: Post[], query: string): Post[] {
  if (!query || query.trim() === "") {
    return []
  }

  const searchTerms = query.toLowerCase().trim().split(/\s+/)

  return posts.filter((post) => {
    const title = post.title.toLowerCase()
    const excerpt = post.excerpt.toLowerCase()
    const content = post.content.toLowerCase()
    const author = post.author.name.toLowerCase()

    // Check if all search terms are found in at least one of the fields
    return searchTerms.every(
      (term) => title.includes(term) || excerpt.includes(term) || content.includes(term) || author.includes(term),
    )
  })
}

