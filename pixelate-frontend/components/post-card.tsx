import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import type { Post } from "@/lib/posts"

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/blog/${post.slug}`}>
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={post.coverImage || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
        <CardHeader className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{post.date}</span>
            </div>
            {post.featured && <Badge className="bg-highlight text-highlight-foreground">Featured</Badge>}
          </div>
          <h3 className="font-bold text-lg mt-2 line-clamp-2">{post.title}</h3>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center">
          <div className="flex items-center space-x-2">
            <div className="relative h-8 w-8 rounded-full overflow-hidden">
              <Image
                src={post.author.image || "/placeholder.svg"}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-sm font-medium">{post.author.name}</span>
          </div>
        </CardFooter>
      </Link>
    </Card>
  )
}

