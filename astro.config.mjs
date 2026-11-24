import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import remarkMermaidV13 from './src/lib/mermaid-v13';

export default defineConfig({
  site: 'https://keolo.com',
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkMermaidV13],
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
