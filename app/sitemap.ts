import { MetadataRoute } from 'next'
import { chapters } from '@/data/chapters'
import { krishnaStories } from '@/data/krishna-stories'
import { gitaStories } from '@/data/gita-stories'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gitamitra.vercel.app'

  // Static routes
  const routes = [
    '',
    '/chapters',
    '/daily-lesson',
    '/about-gita',
    '/quiz',
    '/stories/krishna',
    '/stories/gita',
    '/donate',
    '/contact',
    '/faq',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamic routes - Chapters
  const chapterRoutes = chapters.map((chapter) => ({
    url: `${baseUrl}/chapters/${chapter.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  // Dynamic routes - Krishna Stories
  const krishnaStoryRoutes = krishnaStories.map((story) => ({
    url: `${baseUrl}/stories/krishna/${story.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Dynamic routes - Gita Stories
  const gitaStoryRoutes = gitaStories.map((story) => ({
    url: `${baseUrl}/stories/gita/${story.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...routes, ...chapterRoutes, ...krishnaStoryRoutes, ...gitaStoryRoutes]
}
