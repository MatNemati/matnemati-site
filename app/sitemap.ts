
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: 'https://matnemati.ir/en', lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: 'https://matnemati.ir/fa', lastModified: now, changeFrequency: 'monthly', priority: 1 },
  ]
}
