import { notFound } from "next/navigation";
import { format } from "date-fns";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug } });
  
  if (!post) {
    return { title: "Post Not Found | H4Ai" };
  }
  
  return {
    title: post.seo_title || `${post.title} | H4Ai Blog`,
    description: post.seo_description || post.excerpt || `Read ${post.title} on the H4Ai blog.`,
    keywords: post.seo_keywords || undefined,
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

  return (
    <article className="py-24 sm:py-32 bg-background relative">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to blog
        </Link>
        
        <header className="mb-12 border-b border-border pb-8">
          <div className="flex items-center gap-x-4 text-sm text-muted-foreground mb-4">
            <time dateTime={post.published_at?.toISOString()} className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {post.published_at ? format(post.published_at, "MMMM d, yyyy") : ""}
            </time>
            <span className="flex items-center gap-1.5 border-l border-border pl-4">
              <User className="w-4 h-4" />
              H4Ai Team
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

        {post.seo_schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: post.seo_schema }}
          />
        )}

        <div 
          className="prose prose-lg dark:prose-invert prose-headings:font-sora prose-a:text-primary max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </article>
  );
}
