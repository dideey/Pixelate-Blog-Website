"use client"

import type { Post } from "./posts"

// Function to get all bookmarked post IDs from localStorage
export function getBookmarkedPostIds(): string[] {
  if (typeof window === "undefined") return []

  const bookmarks = localStorage.getItem("bookmarkedPosts")
  return bookmarks ? JSON.parse(bookmarks) : []
}

// Function to check if a post is bookmarked
export function isPostBookmarked(postId: string): boolean {
  const bookmarkedPosts = getBookmarkedPostIds()
  return bookmarkedPosts.includes(postId)
}

// Function to toggle bookmark status for a post
export function toggleBookmark(postId: string): boolean {
  const bookmarkedPosts = getBookmarkedPostIds()
  const isBookmarked = bookmarkedPosts.includes(postId)

  let updatedBookmarks: string[]

  if (isBookmarked) {
    updatedBookmarks = bookmarkedPosts.filter((id) => id !== postId)
  } else {
    updatedBookmarks = [...bookmarkedPosts, postId]
  }

  localStorage.setItem("bookmarkedPosts", JSON.stringify(updatedBookmarks))
  return !isBookmarked
}

// Function to get all bookmarked posts
export async function getBookmarkedPosts(allPosts: Post[]): Promise<Post[]> {
  const bookmarkedIds = getBookmarkedPostIds()
  return allPosts.filter((post) => bookmarkedIds.includes(post.id))
}

