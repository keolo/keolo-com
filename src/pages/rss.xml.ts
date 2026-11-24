import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedPosts } from '../lib/content';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts(false);

  return rss({
    title: 'Keolo',
    description:
      'Tech leadership for high-stakes startups. Articles on AI harnesses, spec-driven development, and HealthTech architecture.',
    site: context.site ?? 'https://keolo.com',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description ?? post.data.title,
      link: `/posts/${post.slug}/`,
      pubDate: post.data.pubDate ?? new Date('2025-01-01'),
    })),
    customData: '<language>en-us</language>',
  });
}
