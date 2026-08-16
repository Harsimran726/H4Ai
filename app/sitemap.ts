import { MetadataRoute } from 'next'
import { prisma } from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://h4ai.in';

  // Fetch all published blog posts
  const posts = await prisma.blogPost.findMany({
    where: { is_published: true },
    select: { slug: true, updated_at: true },
  });

  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updated_at,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const routes = [
    '',
    '/services',
    '/services/social-media-management',
    '/services/website-development',
    '/services/ai-integration-development',
    '/services/ai-voice-agents',
    '/services/agentic-ai-systems',
    '/about',
    '/contact',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes, ...blogRoutes];
}
