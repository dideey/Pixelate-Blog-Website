import { getPostBySlug } from "@/lib/posts"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Calendar } from "lucide-react"
import type { Metadata } from "next"
import PostReactions from "@/components/post-reactions"
import ShareButtons from "@/components/share-buttons"
import { Separator } from "@/components/ui/separator"
import ReactMarkdown from "react-markdown"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="container py-12 max-w-4xl">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{post.title}</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="relative h-10 w-10 rounded-full overflow-hidden">
              <Image
                src={post.author.image || "/placeholder.svg"}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-sm font-medium">{post.author.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{post.date}</span>
          </div>
        </div>
      </div>

      <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
        <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-16 md:order-first order-last">
          <div className="md:sticky md:top-24 flex md:flex-col gap-2 md:gap-4">
            <ShareButtons title={post.title} slug={params.slug} />
          </div>
        </div>

        <div className="flex-1">
          <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          <Separator className="my-8" />

          <PostReactions postId={post.id} />
        </div>
      </div>
    </article>
  )
}

