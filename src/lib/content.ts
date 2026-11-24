import { getCollection, type CollectionEntry } from 'astro:content';

export function isVisible(entry: { data: { draft?: boolean } }): boolean {
  if (import.meta.env.PROD) {
    return !entry.data.draft;
  }
  return true;
}

export async function getPublishedPosts(
  includeDraftsInDev = true
): Promise<CollectionEntry<'posts'>[]> {
  const posts = await getCollection('posts', (entry) => {
    if (includeDraftsInDev) {
      return isVisible(entry);
    }
    return !entry.data.draft;
  });
  return posts.sort((a, b) => a.data.weight - b.data.weight || a.slug.localeCompare(b.slug));
}

export async function getPublishedProjects(
  includeDraftsInDev = true
): Promise<CollectionEntry<'projects'>[]> {
  const projects = await getCollection('projects', (entry) => {
    if (includeDraftsInDev) {
      return isVisible(entry);
    }
    return !entry.data.draft;
  });
  return projects.sort((a, b) => a.data.weight - b.data.weight || a.slug.localeCompare(b.slug));
}

export function isEhrSeriesPost(slug: string): boolean {
  return slug === 'how-to-build-an-ehr' || slug.startsWith('how-to-build-an-ehr/');
}
