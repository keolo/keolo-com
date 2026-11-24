import type { APIContext } from 'astro';
import { getPublishedPosts, getPublishedProjects, isEhrSeriesPost } from '../lib/content';

export async function GET(context: APIContext) {
  const baseUrl = (context.site?.toString() ?? 'https://keolo.com').replace(/\/$/, '');
  const posts = await getPublishedPosts(false);
  const projects = await getPublishedProjects(false);

  const standalonePosts = posts.filter((p) => !isEhrSeriesPost(p.slug));
  const ehrPosts = posts.filter((p) => isEhrSeriesPost(p.slug));

  const lines: string[] = [
    '# Keolo',
    '',
    '> Tech leadership for high-stakes startups. Managing Partner & Fractional CTO at Aliveness Ventures (AI, HealthTech & FinTech).',
    '',
    '## Core Pages',
    `- [Home](${baseUrl}/): Overview, leadership highlights, projects, and latest writing.`,
    `- [About](${baseUrl}/about/): Leadership style, engagement models, and key capabilities.`,
    `- [Projects](${baseUrl}/projects/): Venture studio and Fractional CTO case studies.`,
    `- [Posts](${baseUrl}/posts/): Essays on AI engineering, architecture, and leadership.`,
    `- [Full Content Bundle](${baseUrl}/llms-full.txt): Complete plain-text Markdown aggregation of all published pages.`,
    '',
    '## Projects',
    ...projects.map(
      (p) => `- [${p.data.title}](${baseUrl}/projects/${p.slug}/): ${p.data.description}`
    ),
    '',
    '## Posts',
    ...standalonePosts.map(
      (p) =>
        `- [${p.data.title}](${baseUrl}/posts/${p.slug}/)${p.data.description ? `: ${p.data.description}` : ''}`
    ),
    '',
    '## How to Build an EHR Series',
    ...ehrPosts.map((p) => `- [${p.data.title}](${baseUrl}/posts/${p.slug}/)`),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
