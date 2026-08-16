import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://h4ai.in';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/admin/', '/book-a-call', '/cancel-booking', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
