import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Nav } from "@/components/marketing/nav";
import { Footer } from "@/components/marketing/footer";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  
  if (!post) {
    return { title: "Post Not Found" };
  }
  
  const title = post.seo_title || post.title;
  const description = post.seo_description || post.excerpt || `Read ${post.title} on the H4Ai blog.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: `${title} | H4Ai`,
      description,
      url: `https://www.h4ai.in/blog/${slug}`,
      type: 'article',
      publishedTime: post.published_at?.toISOString(),
      authors: ['Harsimran Singh'],
      images: [
        {
          url: post.cover_image || '/og-image.webp',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | H4Ai`,
      description,
      images: [post.cover_image || '/og-image.webp'],
    },
  };
}

async function renderMarkdown(markdown: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkHtml, { sanitize: false })
    .process(markdown);
  return String(file);
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const post = await prisma.blogPost.findUnique({
    where: { slug }
  });

  if (!post || !post.is_published) {
    notFound();
  }

  const htmlContent = await renderMarkdown(post.content);

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://www.h4ai.in/blog/${post.slug}#article`,
    "headline": post.title,
    "description": post.excerpt || post.title,
    "image": post.cover_image || "https://www.h4ai.in/og-image.webp",
    "datePublished": post.published_at ? post.published_at.toISOString() : undefined,
    "dateModified": post.updated_at ? post.updated_at.toISOString() : undefined,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.h4ai.in/blog/${post.slug}`
    },
    "author": {
      "@type": "Person",
      "name": "Harsimran Singh",
      "jobTitle": "Founder & AI Engineer",
      "url": "https://www.h4ai.in/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "H4Ai",
      "url": "https://www.h4ai.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.h4ai.in/logo.png"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      {post.seo_schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: post.seo_schema }}
        />
      )}
      <Nav />
      <main className="flex-1 bg-background pt-24 pb-32">
        <article className="mx-auto max-w-3xl px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: "Blog", href: "/blog" },
              { name: post.title, href: `/blog/${post.slug}` },
            ]}
          />
          
          <header className="mb-12 border-b border-border pb-8">
            <div className="flex items-center gap-x-4 text-sm text-muted-foreground mb-4">
              <time dateTime={post.published_at?.toISOString()} className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {post.published_at ? format(post.published_at, "MMMM d, yyyy") : ""}
              </time>
              <span className="flex items-center gap-1.5 border-l border-border pl-4">
                <User className="w-4 h-4" />
                Harsimran Singh
              </span>
            </div>
            
            <h1 className="text-3xl font-sora font-bold tracking-tight text-foreground sm:text-5xl mb-6 leading-[1.2]">
              {post.title}
            </h1>
            
            {post.excerpt && (
              <p className="text-lg text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </header>

          <div 
            className="prose prose-lg dark:prose-invert prose-headings:font-sora prose-headings:text-foreground prose-a:text-primary max-w-none leading-relaxed"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              <ArrowLeft className="w-4 h-4" /> Back to all articles
            </Link>
            <Link href="/book-a-call" className="inline-flex items-center gap-2 text-sm font-semibold bg-primary text-primary-foreground px-4 py-2 rounded-lg">
              Book a Strategy Call
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
