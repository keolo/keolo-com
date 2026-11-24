# keolo.com

Personal website for **Keolo**, Managing Partner & Fractional CTO at [Aliveness Ventures](https://aliveness.ventures), built with [Astro](https://astro.build/), [Tailwind CSS v4](https://tailwindcss.com/), and build-time [Mermaid v13 Alpha](https://mermaid.js.org/) SVG rendering.

## Prerequisites

- **Node.js** 22+
- **pnpm**

## Developer Workflow

```bash
# Install dependencies
pnpm install

# Start local Astro dev server (includes draft: true posts)
alv run
# or: make run

# Run full maintenance suite (astro check, ESLint, Prettier, Vitest, audit, astro build)
alv maintain
# or: make maintain

# Run unit & integration tests
pnpm test

# Production build (outputs to dist/)
make build

# Clean generated artifacts
make clean
```

## Content Authoring

- **Posts**: `src/content/posts/` (standalone articles + multi-part `how-to-build-an-ehr/` series)
- **Projects**: `src/content/projects/` (case studies with interactive `<Carousel />` galleries)
- **Drafts**: Set `draft: true` in frontmatter to preview locally in `alv run` while automatically excluding the entry from production builds, `sitemap-index.xml`, `rss.xml`, `llms.txt`, and `llms-full.txt`.

## Build-Time Mermaid v13 SVG Pipeline

All fenced ` ```mermaid ` blocks are rendered DOM-free at build/dev time via `src/lib/mermaid-v13.ts` (`mermaid@13.0.0-alpha.3`) into inline `<svg>` elements. Zero client-side Mermaid JavaScript is shipped to the browser, and invalid or unsupported diagrams fail the build fast with the offending file path.

## SEO & LLM Outputs

Production builds generate:

- `dist/sitemap-index.xml` and `dist/rss.xml`
- `dist/robots.txt` and `dist/CNAME` (`keolo.com`)
- `dist/llms.txt` (structured site index for AI agents)
- `dist/llms-full.txt` (complete plain-text/Markdown content bundle)
- Per-page canonical URLs, OpenGraph/Twitter meta tags, and JSON-LD structured data.
