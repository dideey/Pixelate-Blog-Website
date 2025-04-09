export interface Post {
  id: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  date: string
  author: {
    name: string
    image: string
  }
  featured?: boolean
  slug: string
}

// Mock data for posts
const posts: Post[] = [
  {
    id: "1",
    title: "Getting Started with Next.js",
    excerpt: "Learn how to build modern web applications with Next.js and React.",
    content: `
# Getting Started with Next.js

Next.js is a React framework that enables server-side rendering, static site generation, and more. It's a great choice for building modern web applications.

## Why Next.js?

- **Server-side rendering**: Next.js renders your pages on the server, which can improve performance and SEO.
- **Static site generation**: Next.js can generate static HTML files at build time, which can be served from a CDN.
- **API routes**: Next.js allows you to create API endpoints as part of your application.
- **File-based routing**: Next.js uses a file-based routing system, which makes it easy to create new pages.

## Getting Started

To create a new Next.js application, run the following command:

\`\`\`bash
npx create-next-app@latest my-app
\`\`\`

This will create a new Next.js application in the \`my-app\` directory.

## Creating Pages

In Next.js, pages are React components exported from files in the \`pages\` directory. For example, to create a page at \`/about\`, you would create a file at \`pages/about.js\`:

\`\`\`jsx
export default function About() {
  return <h1>About Us</h1>;
}
\`\`\`

## Conclusion

Next.js is a powerful framework for building modern web applications. It provides a great developer experience and enables you to build fast, SEO-friendly applications.
    `,
    coverImage: "/placeholder.svg?height=600&width=800",
    date: "2023-04-18",
    author: {
      name: "John Doe",
      image: "/placeholder.svg?height=100&width=100",
    },
    featured: true,
    slug: "getting-started-with-nextjs",
  },
  {
    id: "2",
    title: "Mastering Tailwind CSS",
    excerpt: "Discover how to use Tailwind CSS to create beautiful, responsive designs.",
    content: `
# Mastering Tailwind CSS

Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML. It's a great choice for building modern web applications.

## Why Tailwind CSS?

- **Utility-first**: Tailwind CSS provides low-level utility classes that let you build custom designs without writing CSS.
- **Responsive**: Tailwind CSS makes it easy to create responsive designs with built-in responsive variants.
- **Customizable**: Tailwind CSS is highly customizable, allowing you to tailor it to your project's needs.

## Getting Started

To add Tailwind CSS to your project, run the following commands:

\`\`\`bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

Then, configure your template paths in \`tailwind.config.js\`:

\`\`\`js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
\`\`\`

Finally, add the Tailwind directives to your CSS:

\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;
\`\`\`

## Using Tailwind CSS

With Tailwind CSS, you can style your elements directly in your HTML:

\`\`\`jsx
<div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
  <div className="flex-shrink-0">
    <img className="h-12 w-12" src="/img/logo.svg" alt="Logo" />
  </div>
  <div>
    <div className="text-xl font-medium text-black">ChitChat</div>
    <p className="text-gray-500">You have a new message!</p>
  </div>
</div>
\`\`\`

## Conclusion

Tailwind CSS is a powerful framework for building custom designs. It provides a great developer experience and enables you to build beautiful, responsive applications.
    `,
    coverImage: "/placeholder.svg?height=600&width=800",
    date: "2023-05-22",
    author: {
      name: "Jane Smith",
      image: "/placeholder.svg?height=100&width=100",
    },
    featured: true,
    slug: "mastering-tailwind-css",
  },
  {
    id: "3",
    title: "The Future of Web Development",
    excerpt: "Explore the latest trends and technologies shaping the future of web development.",
    content: `
# The Future of Web Development

Web development is constantly evolving, with new technologies and approaches emerging all the time. In this post, we'll explore some of the trends and technologies that are shaping the future of web development.

## Server Components

React Server Components allow you to render components on the server, reducing the amount of JavaScript sent to the client and improving performance.

## Edge Computing

Edge computing brings computation closer to the user, reducing latency and improving performance. Platforms like Vercel and Cloudflare Workers make it easy to deploy your applications to the edge.

## AI-Powered Development

AI tools like GitHub Copilot are making developers more productive by suggesting code and helping with common tasks.

## Web Assembly

Web Assembly (WASM) allows you to run high-performance code in the browser, opening up new possibilities for web applications.

## Conclusion

The future of web development is exciting, with new technologies and approaches making it easier to build fast, reliable, and user-friendly applications.
    `,
    coverImage: "/placeholder.svg?height=600&width=800",
    date: "2023-06-15",
    author: {
      name: "Alex Johnson",
      image: "/placeholder.svg?height=100&width=100",
    },
    featured: true,
    slug: "future-of-web-development",
  },
]

export async function getPosts() {
  // In a real application, you would fetch posts from a database or API
  return posts
}

export async function getFeaturedPosts() {
  // In a real application, you would fetch featured posts from a database or API
  return posts.filter((post) => post.featured)
}

export async function getPostBySlug(slug: string) {
  // In a real application, you would fetch a post by slug from a database or API
  return posts.find((post) => post.slug === slug)
}

