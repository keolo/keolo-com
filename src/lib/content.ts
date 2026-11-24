import { getCollection, type CollectionEntry } from 'astro:content';

export function isVisible(entry: { data: { draft?: boolean } }): boolean {
  if (import.meta.env.PROD) {
    return !entry.data.draft;
  }
  return true;
}

export type PostEntry = CollectionEntry<'posts'> & { slug: string };
export type ProjectEntry = CollectionEntry<'projects'> & { slug: string };

export async function getPublishedPosts(includeDraftsInDev = true): Promise<PostEntry[]> {
  const posts = await getCollection('posts', (entry) => {
    if (includeDraftsInDev) {
      return isVisible(entry);
    }
    return !entry.data.draft;
  });
  return posts
    .map((post) => ({ ...post, slug: post.id }))
    .sort((a, b) => a.data.weight - b.data.weight || a.slug.localeCompare(b.slug));
}

export async function getPublishedProjects(includeDraftsInDev = true): Promise<ProjectEntry[]> {
  const projects = await getCollection('projects', (entry) => {
    if (includeDraftsInDev) {
      return isVisible(entry);
    }
    return !entry.data.draft;
  });
  return projects
    .map((project) => ({ ...project, slug: project.id }))
    .sort((a, b) => a.data.weight - b.data.weight || a.slug.localeCompare(b.slug));
}

export function isEhrSeriesPost(slug: string): boolean {
  return slug === 'how-to-build-an-ehr' || slug.startsWith('how-to-build-an-ehr/');
}
