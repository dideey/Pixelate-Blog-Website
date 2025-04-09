"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Heart, ThumbsUp, Bookmark } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { isPostBookmarked, toggleBookmark } from "@/lib/bookmarks"

interface PostReactionsProps {
  postId: string
}

type ReactionType = "like" | "love"
type EmojiReactionType = "👍" | "❤️" | "😂" | "😮" | "😢" | "😡" | "🎉" | "🤔"

interface Reaction {
  type: ReactionType
  label: string
  icon: React.ReactNode
  count: number
}

interface EmojiReaction {
  emoji: EmojiReactionType
  label: string
  count: number
}

export default function PostReactions({ postId }: PostReactionsProps) {
  const [reactions, setReactions] = useState<Record<ReactionType, Reaction>>({
    like: {
      type: "like",
      label: "Like",
      icon: <ThumbsUp className="h-4 w-4" />,
      count: 12,
    },
    love: {
      type: "love",
      label: "Love",
      icon: <Heart className="h-4 w-4" />,
      count: 8,
    },
  })

  const [emojiReactions, setEmojiReactions] = useState<EmojiReaction[]>([
    { emoji: "👍", label: "Thumbs Up", count: 15 },
    { emoji: "❤️", label: "Heart", count: 10 },
    { emoji: "😂", label: "Laugh", count: 8 },
    { emoji: "😮", label: "Wow", count: 5 },
    { emoji: "😢", label: "Sad", count: 3 },
    { emoji: "😡", label: "Angry", count: 2 },
    { emoji: "🎉", label: "Celebrate", count: 7 },
    { emoji: "🤔", label: "Thinking", count: 6 },
  ])

  const [userReactions, setUserReactions] = useState<Record<ReactionType, boolean>>({
    like: false,
    love: false,
  })

  const [isBookmarked, setIsBookmarked] = useState(false)
  const [userEmojiReaction, setUserEmojiReaction] = useState<EmojiReactionType | null>(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  // Initialize bookmark state from localStorage
  useEffect(() => {
    setIsBookmarked(isPostBookmarked(postId))
  }, [postId])

  const handleReaction = (type: ReactionType) => {
    // In a real app, you would send this to your API
    setUserReactions((prev) => {
      const newState = { ...prev }
      newState[type] = !prev[type]
      return newState
    })

    setReactions((prev) => {
      const newReactions = { ...prev }
      newReactions[type] = {
        ...newReactions[type],
        count: userReactions[type] ? newReactions[type].count - 1 : newReactions[type].count + 1,
      }
      return newReactions
    })
  }

  const handleEmojiReaction = (emoji: EmojiReactionType) => {
    // In a real app, you would send this to your API
    setShowEmojiPicker(false)

    // If user clicks the same emoji, toggle it off
    if (userEmojiReaction === emoji) {
      setEmojiReactions((prev) =>
        prev.map((reaction) => (reaction.emoji === emoji ? { ...reaction, count: reaction.count - 1 } : reaction)),
      )
      setUserEmojiReaction(null)
      return
    }

    // If user had a previous emoji reaction, decrement its count
    if (userEmojiReaction) {
      setEmojiReactions((prev) =>
        prev.map((reaction) =>
          reaction.emoji === userEmojiReaction ? { ...reaction, count: reaction.count - 1 } : reaction,
        ),
      )
    }

    // Add the new reaction
    setEmojiReactions((prev) =>
      prev.map((reaction) => (reaction.emoji === emoji ? { ...reaction, count: reaction.count + 1 } : reaction)),
    )

    setUserEmojiReaction(emoji)
  }

  const handleBookmark = () => {
    const newBookmarkState = toggleBookmark(postId)
    setIsBookmarked(newBookmarkState)
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Reactions</h3>
        <Button
          variant={isBookmarked ? "default" : "outline"}
          size="sm"
          className={`flex items-center space-x-2 ${isBookmarked ? "bg-highlight text-highlight-foreground" : ""}`}
          onClick={handleBookmark}
        >
          <Bookmark className="h-4 w-4 mr-2" />
          {isBookmarked ? "Bookmarked" : "Bookmark"}
        </Button>
      </div>

      <div className="flex flex-col space-y-4">
        {/* Emoji Reactions */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Express with Emoji</h4>
            <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                  {userEmojiReaction || "Add Reaction"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2">
                <div className="grid grid-cols-4 gap-2">
                  {emojiReactions.map((reaction) => (
                    <Button
                      key={reaction.emoji}
                      variant="ghost"
                      size="sm"
                      className="text-xl p-2 h-auto"
                      onClick={() => handleEmojiReaction(reaction.emoji as EmojiReactionType)}
                    >
                      {reaction.emoji}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-wrap gap-2">
            {emojiReactions.map((reaction) => (
              <div
                key={reaction.emoji}
                className={`flex items-center space-x-1 rounded-full px-3 py-1 text-sm border ${
                  userEmojiReaction === reaction.emoji ? "border-primary bg-primary/10" : "border-border"
                }`}
              >
                <span className="text-base">{reaction.emoji}</span>
                <span className="font-medium">{reaction.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Standard Reactions */}
        <div className="flex flex-wrap gap-2">
          <TooltipProvider>
            {Object.values(reactions).map((reaction) => (
              <Tooltip key={reaction.type}>
                <TooltipTrigger asChild>
                  <Button
                    variant={userReactions[reaction.type] ? "default" : "outline"}
                    size="sm"
                    className={`flex items-center space-x-2 ${
                      userReactions[reaction.type] ? "bg-primary text-primary-foreground" : ""
                    }`}
                    onClick={() => handleReaction(reaction.type)}
                  >
                    {reaction.icon}
                    <span>{reaction.count}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{reaction.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>
    </div>
  )
}

