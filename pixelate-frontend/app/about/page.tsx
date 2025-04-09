import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Pixelate Blog</h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Our mission and the team behind the blog.
        </p>
      </div>

      <div className="grid gap-12 md:gap-16">
        <section className="grid items-center gap-6 md:grid-cols-2 md:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-muted-foreground">
              At Pixelate Blog, we're passionate about sharing knowledge, insights, and ideas that inspire and educate.
              Our mission is to create a platform where readers can discover thoughtful content on a variety of topics,
              from technology and design to culture and beyond.
            </p>
            <p className="text-muted-foreground">
              We believe in the power of well-crafted content to spark curiosity, foster understanding, and drive
              meaningful conversations. Through our blog, we aim to contribute to a more informed and connected
              community.
            </p>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image src="/placeholder.svg?height=600&width=600" alt="Our mission" fill className="object-cover" />
          </div>
        </section>

        <section className="grid items-center gap-6 md:grid-cols-2 md:gap-12">
          <div className="relative aspect-square overflow-hidden rounded-lg md:order-last">
            <Image src="/placeholder.svg?height=600&width=600" alt="Our values" fill className="object-cover" />
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="text-3xl font-bold">Our Values</h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary p-1.5 mt-1"></div>
                <div>
                  <p className="font-medium">Quality</p>
                  <p className="text-muted-foreground">
                    We prioritize well-researched, thoughtfully written content that provides genuine value to our
                    readers.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-accent p-1.5 mt-1"></div>
                <div>
                  <p className="font-medium">Integrity</p>
                  <p className="text-muted-foreground">
                    We maintain high ethical standards in our content creation and publishing practices.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-highlight p-1.5 mt-1"></div>
                <div>
                  <p className="font-medium">Inclusivity</p>
                  <p className="text-muted-foreground">
                    We strive to create content that is accessible and relevant to diverse audiences.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Meet Our Team</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "John Doe",
                role: "Founder & Editor-in-Chief",
                image: "/placeholder.svg?height=400&width=400",
                bio: "John has over 10 years of experience in digital publishing and content creation.",
              },
              {
                name: "Jane Smith",
                role: "Senior Writer",
                image: "/placeholder.svg?height=400&width=400",
                bio: "Jane specializes in technology and design topics, with a background in UX research.",
              },
              {
                name: "Alex Johnson",
                role: "Content Strategist",
                image: "/placeholder.svg?height=400&width=400",
                bio: "Alex helps shape our content direction and ensures we're meeting our readers' needs.",
              },
            ].map((member) => (
              <div key={member.name} className="flex flex-col items-center text-center">
                <div className="relative h-40 w-40 overflow-hidden rounded-full mb-4">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-sm text-primary">{member.role}</p>
                <p className="mt-2 text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

