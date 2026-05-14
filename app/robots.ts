import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://paulmutz.dev/sitemap.xml',
    host: 'https://paulmutz.dev',
  }
}
