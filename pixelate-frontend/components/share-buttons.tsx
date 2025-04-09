"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Twitter, Facebook, Linkedin, Mail, Copy, Check, MessageCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ShareButtonsProps {
  title: string
  slug: string
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [currentUrl, setCurrentUrl] = useState("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Set the current URL when component mounts
    setCurrentUrl(window.location.href)
  }, [])

  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(currentUrl)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    reddit: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=Check%20out%20this%20article:%20${encodedUrl}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy URL: ", err)
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-lg font-semibold">Share this post</h3>
      <div className="flex flex-wrap gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-[#1DA1F2] text-white hover:bg-[#1DA1F2]/90"
                onClick={() => window.open(shareLinks.twitter, "_blank")}
              >
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Share on Twitter</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share on Twitter</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-[#1877F2] text-white hover:bg-[#1877F2]/90"
                onClick={() => window.open(shareLinks.facebook, "_blank")}
              >
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Share on Facebook</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share on Facebook</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90"
                onClick={() => window.open(shareLinks.linkedin, "_blank")}
              >
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">Share on LinkedIn</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share on LinkedIn</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-[#FF4500] text-white hover:bg-[#FF4500]/90"
                onClick={() => window.open(shareLinks.reddit, "_blank")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                </svg>
                <span className="sr-only">Share on Reddit</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share on Reddit</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-[#25D366] text-white hover:bg-[#25D366]/90"
                onClick={() => window.open(shareLinks.whatsapp, "_blank")}
              >
                <MessageCircle className="h-4 w-4" />
                <span className="sr-only">Share on WhatsApp</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share on WhatsApp</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-secondary text-white hover:bg-secondary/90"
                onClick={() => window.open(shareLinks.email, "_blank")}
              >
                <Mail className="h-4 w-4" />
                <span className="sr-only">Share via Email</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share via Email</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full" onClick={copyToClipboard}>
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">Copy Link</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{copied ? "Copied!" : "Copy Link"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}

