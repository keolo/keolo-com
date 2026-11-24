import type { APIContext } from 'astro';
import { getEntry } from 'astro:content';
import { getPublishedPosts, getPublishedProjects } from '../lib/content';

export async function GET(context: APIContext) {
  const baseUrl = (context.site?.toString() ?? 'https://keolo.com').replace(/\/$/, '');
  const about = await getEntry('pages', 'about');
  const projects = await getPublishedProjects(false);
  const posts = await getPublishedPosts(false);

  const sections: string[] = [
    '# Keolo — Full Published Site Content',
    '',
    `Source: ${baseUrl}`,
    '',
    '---',
    '',
  ];

  if (about) {
    sections.push(`# About (${baseUrl}/about/)`, '', about.body.trim(), '', '---', '');
  }

  for (const project of projects) {
    sections.push(
      `# Project: ${project.data.title} (${baseUrl}/projects/${project.slug}/)`,
      '',
      project.data.description,
      '',
      project.body.trim(),
      '',
      '---',
      ''
    );
  }

  for (const post of posts) {
    sections.push(
      `# Post: ${post.data.title} (${baseUrl}/posts/${post.slug}/)`,
      '',
      post.data.description ? `${post.data.description}\n` : '',
      post.body.trim(),
      '',
      '---',
      ''
    );
  }

  return new Response(sections.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
