import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');
const contentDir = path.join(rootDir, 'src', 'content');

function walkFiles(dir: string, ext?: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkFiles(full, ext));
    } else if (!ext || full.endsWith(ext)) {
      results.push(full);
    }
  }
  return results;
}

describe('migrated content integrity', () => {
  it('contains zero raw Hugo shortcodes in src/content', () => {
    const mdFiles = walkFiles(contentDir, '.md');
    expect(mdFiles.length).toBeGreaterThan(15);
    for (const file of mdFiles) {
      const content = fs.readFileSync(file, 'utf8');
      expect(content, `Hugo shortcode found in ${file}`).not.toContain('{{<');
    }
  });
});

describe('Evolve case study sanitization', () => {
  it('ensures Evolve case study exists and is free of confidential strings', () => {
    const evolvePath = path.join(contentDir, 'projects', 'evolve.md');
    expect(fs.existsSync(evolvePath)).toBe(true);

    const content = fs.readFileSync(evolvePath, 'utf8');

    // Frontmatter checks
    expect(content).toContain("title: 'Evolve'");

    // Prohibited identities
    const confidentialNames = ['Lyle', 'Jon', 'Lauren', 'Larry', 'Michal'];
    for (const name of confidentialNames) {
      expect(content).not.toContain(name);
    }

    // Prohibited financials
    const confidentialFinancials = ['$50M', '$15M', '$10M'];
    for (const amt of confidentialFinancials) {
      expect(content).not.toContain(amt);
    }

    // Prohibited platforms/docs
    const confidentialDocs = ['Google Docs', 'JIRA', 'Jira'];
    for (const doc of confidentialDocs) {
      expect(content).not.toContain(doc);
    }
  });
});

describe('production dist output (when built)', () => {
  const hasDist = fs.existsSync(path.join(distDir, 'index.html'));

  it.skipIf(!hasDist)('emits required SEO, CNAME, RSS, sitemap, and LLM artifacts', () => {
    const requiredFiles = [
      'index.html',
      'about/index.html',
      'posts/index.html',
      'projects/index.html',
      'sitemap-index.xml',
      'rss.xml',
      'robots.txt',
      'CNAME',
      'llms.txt',
      'llms-full.txt',
    ];
    for (const rel of requiredFiles) {
      const full = path.join(distDir, rel);
      expect(fs.existsSync(full), `Missing dist/${rel}`).toBe(true);
      expect(fs.readFileSync(full, 'utf8').trim().length).toBeGreaterThan(0);
    }

    expect(fs.readFileSync(path.join(distDir, 'CNAME'), 'utf8').trim()).toBe('keolo.com');
    expect(fs.readFileSync(path.join(distDir, 'robots.txt'), 'utf8')).toContain(
      'https://keolo.com/sitemap-index.xml'
    );
  });

  it.skipIf(!hasDist)(
    'excludes draft posts from HTML routes, sitemap, RSS, and LLM indexes',
    () => {
      const draftSlugs = ['ui-ux-design', 'how-to-hire-and-nurture-a-high-performing-team'];

      for (const slug of draftSlugs) {
        expect(fs.existsSync(path.join(distDir, 'posts', slug, 'index.html'))).toBe(false);
        expect(
          fs.existsSync(path.join(distDir, 'posts', 'how-to-build-an-ehr', slug, 'index.html'))
        ).toBe(false);
      }

      const indexFiles = ['rss.xml', 'llms.txt', 'llms-full.txt', 'sitemap-0.xml'].filter((f) =>
        fs.existsSync(path.join(distDir, f))
      );
      for (const rel of indexFiles) {
        const body = fs.readFileSync(path.join(distDir, rel), 'utf8');
        for (const slug of draftSlugs) {
          expect(body, `Draft slug ${slug} leaked into dist/${rel}`).not.toContain(slug);
        }
      }
    }
  );

  it.skipIf(!hasDist)('renders inline Mermaid SVGs with zero client-side Mermaid scripts', () => {
    const aboutHtml = fs.readFileSync(path.join(distDir, 'about', 'index.html'), 'utf8');
    expect(aboutHtml).toContain('<figure class="mermaid-diagram"');
    expect(aboutHtml).toContain('<svg');
    expect(aboutHtml.toLowerCase()).not.toMatch(/<script[^>]*mermaid/);
  });

  it.skipIf(!hasDist)('verifies Evolve case study in LLM indexes and metadata', () => {
    const llmsTxt = fs.readFileSync(path.join(distDir, 'llms.txt'), 'utf8');
    expect(llmsTxt).toContain('Evolve');
    expect(llmsTxt).toContain('projects/evolve/');

    const llmsFullTxt = fs.readFileSync(path.join(distDir, 'llms-full.txt'), 'utf8');
    expect(llmsFullTxt).toContain('Evolve');
    expect(llmsFullTxt).toContain('projects/evolve/');
    expect(llmsFullTxt).toContain('Multimodal closed-loop biosensing and spatial computing');

    const evolveHtml = fs.readFileSync(
      path.join(distDir, 'projects', 'evolve', 'index.html'),
      'utf8'
    );
    expect(evolveHtml).toContain('rel="canonical"');
    expect(evolveHtml).toContain('property="og:title"');
    expect(evolveHtml).toContain('name="twitter:card"');
    expect(evolveHtml).toContain('application/ld+json');
    expect(evolveHtml).toContain('Evolve');
  });

  it.skipIf(!hasDist)('includes canonical, OG, Twitter, and JSON-LD metadata on HTML pages', () => {
    const htmlFiles = walkFiles(distDir, '.html');
    expect(htmlFiles.length).toBeGreaterThan(10);
    for (const file of htmlFiles) {
      const html = fs.readFileSync(file, 'utf8');
      expect(html, `Missing canonical in ${file}`).toContain('rel="canonical"');
      expect(html, `Missing og:title in ${file}`).toContain('property="og:title"');
      expect(html, `Missing twitter:card in ${file}`).toContain('name="twitter:card"');
      expect(html, `Missing JSON-LD in ${file}`).toContain('application/ld+json');
    }
  });

  it.skipIf(!hasDist)('verifies homepage hero tokens and header placement', () => {
    const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

    // Verifying hero tokens
    expect(indexHtml).toContain('min-h-[100dvh]');
    expect(indexHtml).toContain('bg-graphite-950');

    // Verifying header is below hero
    const heroIndex = indexHtml.indexOf('min-h-[100dvh]');
    const headerIndex = indexHtml.indexOf('<header');
    expect(heroIndex).toBeGreaterThan(-1);
    expect(headerIndex).toBeGreaterThan(heroIndex);
  });

  it.skipIf(!hasDist)('verifies header placement at the top on subpages', () => {
    const subpages = ['about/index.html', 'projects/index.html', 'posts/index.html'];

    for (const subpage of subpages) {
      const html = fs.readFileSync(path.join(distDir, subpage), 'utf8');

      const bodyIndex = html.indexOf('<body');
      const headerIndex = html.indexOf('<header');
      const mainIndex = html.indexOf('<main');

      expect(bodyIndex).toBeGreaterThan(-1);
      expect(headerIndex).toBeGreaterThan(bodyIndex);
      expect(mainIndex).toBeGreaterThan(headerIndex);
    }
  });

  it.skipIf(!hasDist)(
    'renders animated typewriter decipher hero text with accessibility and fallback',
    () => {
      const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

      expect(indexHtml).toContain('data-decipher-text');
      expect(indexHtml).toContain('decipher-char');
      expect(indexHtml).toContain('decipher-cursor');
      expect(indexHtml).toContain('Aliveness Ventures');
      expect(indexHtml).toContain('revenue-generating products');
      expect(indexHtml).toContain('https://aliveness.ventures');
      expect(indexHtml).toContain('sr-only');
      expect(indexHtml).toContain('<noscript>');
    }
  );

  it.skipIf(!hasDist)(
    'verifies HeroAsciiBackground canvas component is mounted in index.html',
    () => {
      const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

      expect(indexHtml).toContain('<canvas');
      expect(indexHtml).toContain('id="hero-ascii-bg"');
      expect(indexHtml).toContain('aria-hidden="true"');
    }
  );

  it.skipIf(!hasDist)(
    'verifies data-highlight-root and text-highlighter-toolbar on relevant pages',
    () => {
      const pages = [
        'about/index.html',
        'posts/building-an-engineering-culture/index.html',
        'projects/evolve/index.html',
      ];

      for (const page of pages) {
        const fullPath = path.join(distDir, page);
        if (fs.existsSync(fullPath)) {
          const html = fs.readFileSync(fullPath, 'utf8');
          expect(html, `Missing data-highlight-root in ${page}`).toContain('data-highlight-root');
          expect(html, `Missing text-highlighter-toolbar in ${page}`).toContain(
            'id="text-highlighter-toolbar"'
          );
        }
      }
    }
  );
});
