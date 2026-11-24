import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const coverSchema = z
  .object({
    image: z.string(),
    alt: z.string().optional(),
  })
  .optional();

const galleryItemSchema = z.object({
  src: z.string(),
  alt: z.string(),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
    weight: z.number().default(100),
    tags: z.array(z.string()).default([]),
    cover: coverSchema,
    hiddenInHomeList: z.boolean().optional(),
    showtoc: z.boolean().optional(),
    ShowBreadCrumbs: z.boolean().optional(),
    series: z.string().optional(),
    pubDate: z.coerce.date().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    draft: z.boolean().default(false),
    weight: z.number().default(100),
    tags: z.array(z.string()).default([]),
    cover: coverSchema,
    gallery: z.array(galleryItemSchema).default([]),
    showtoc: z.boolean().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
    cover: coverSchema,
    showtoc: z.boolean().optional(),
    ShowBreadCrumbs: z.boolean().optional(),
  }),
});

export const collections = {
  posts,
  projects,
  pages,
};
