import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://h4ai.in';

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
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
