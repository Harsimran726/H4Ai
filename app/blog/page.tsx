import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight, Calendar, User } from "lucide-react";
import { prisma } from "@/lib/db";
import { Nav } from "@/components/marketing/nav";
import { Footer } from "@/components/marketing/footer";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Insights — AI Voice Agents, Automation & Web Guides",
  description: "Read the latest engineering insights, practical tutorials, and case studies on AI voice agents, agentic multi-agent systems, and modern web development from H4Ai.",
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: "Blog & Insights — AI Voice Agents, Automation & Web Guides | H4Ai",
    description: "Read the latest engineering insights, tutorials, and case studies on AI voice agents, agentic AI, and modern web development.",
    url: 'https://www.h4ai.in/blog',
  },
};

export const dynamic = "force-dynamic";

export default async function BlogIndexPage() {
  const posts = await prisma.blogPost.findMany({
    where: { is_published: true },
    orderBy: { published_at: "desc" },
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://www.h4ai.in/blog#blog",
    "name": "H4Ai Blog & Technical Insights",
    "description": "Insights, guides, and architectural breakdowns on Agentic AI, AI Voice Calling Agents, and Modern Web Systems.",
    "url": "https://www.h4ai.in/blog",
    "publisher": {
      "@type": "Organization",
      "name": "H4Ai",
      "@id": "https://www.h4ai.in/#localbusiness"
    },
    "blogPost": posts.map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt || post.title,
      "url": `https://www.h4ai.in/blog/${post.slug}`,
      "datePublished": post.published_at ? post.published_at.toISOString() : undefined,
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main className="flex-1 bg-background pt-24 pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <Breadcrumbs items={[{ name: "Blog", href: "/blog" }]} />
          
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-sora font-semibold tracking-tight text-foreground sm:text-5xl">
              Latest Insights &amp; Guides
            </h1>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Practical guides on Agentic AI, Voice Calling Agents, and high-converting web architecture for growing businesses.
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="mt-16 text-center text-muted-foreground">
              <p>No posts published yet. Check back soon!</p>
            </div>
          ) : (
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {posts.map((post) => (
                <article key={post.id} className="flex flex-col items-start justify-between bg-card p-6 rounded-2xl border border-border/50 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={post.published_at?.toISOString()} className="text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.published_at ? format(post.published_at, "MMM d, yyyy") : "Draft"}
                    </time>
                  </div>
                  <div className="group relative">
                    <h2 className="mt-3 text-xl font-sora font-semibold leading-6 text-foreground group-hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </Link>
                    </h2>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-muted-foreground">
                      {post.excerpt || post.content.substring(0, 150) + "..."}
                    </p>
                  </div>
                  <div className="mt-8 flex items-center gap-x-4">
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-foreground flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        H4Ai Team
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
