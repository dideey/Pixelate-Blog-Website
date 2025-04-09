import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getPosts } from "@/lib/posts"
import Link from "next/link"
import { PenLine, Plus } from "lucide-react"

export default async function AdminPage() {
  const posts = await getPosts()

  return (
    <div className="container py-12">
      <div className="flex flex-col space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <Link href="/admin/new-post">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="posts" className="mt-6">
            <div className="grid gap-6">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardHeader className="pb-2">
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>
                      Published on {post.date} by {post.author.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                    <Link href={`/admin/edit-post/${post.id}`}>
                      <Button size="sm">
                        <PenLine className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Blog Analytics</CardTitle>
                <CardDescription>View statistics and performance metrics for your blog.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-lg border p-4">
                    <div className="text-sm font-medium text-muted-foreground">Total Views</div>
                    <div className="text-2xl font-bold">1,234</div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="text-sm font-medium text-muted-foreground">Total Reactions</div>
                    <div className="text-2xl font-bold">567</div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="text-sm font-medium text-muted-foreground">Published Posts</div>
                    <div className="text-2xl font-bold">{posts.length}</div>
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="text-sm font-medium text-muted-foreground">Avg. Time on Page</div>
                    <div className="text-2xl font-bold">2m 45s</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

