---
id: "tasks:2026-11-24-convert-from-hugo-to-astro"
title: "Tasks: Convert keolo.com from Hugo to Astro"
status: "draft"
tier: "standard"
created: "2026-11-24"
owner: "keolo"
parent: "none"
related: []
---

# Execution Tasks: Convert keolo.com from Hugo to Astro

## Task T1: Initialize Astro + Tailwind v4 + pnpm Scaffold & ALV Makefile Targets
- blocked_by: []
- blocks: [T2, T3, T4, T5]
- **Spec Scenarios**: Scenario 1, Scenario 2
- **Description**:
  Scaffold a latest-version Astro + TypeScript + Tailwind CSS v4 project using `pnpm` (Node.js 22+), configure ESLint + Prettier + `astro check`, wire up `Makefile` targets `run` (`alv run`), `maintain` (`alv maintain`), `build`, and `clean`, and remove obsolete Hugo/PaperMod files (`hugo.yaml`, `.hugo_build.lock`, `.gitmodules`, `themes/`, `archetypes/`, `layouts/`, `resources/`).
- **Acceptance Criteria**:
  - `pnpm install`, `alv run` (starts Astro dev server), and `alv maintain` (runs `astro check`, lint, format check, audit, and `astro build`) succeed cleanly.
  - `.gitignore` updated for Astro (`dist/`, `.astro/`, `node_modules/`).
  - Zero Hugo/PaperMod toolchain files remain.

## Task T2: Implement Build-Time Mermaid v13 Alpha DOM-Free SVG Pipeline
- blocked_by: [T1]
- blocks: [T4, T6]
- **Spec Scenarios**: Scenario 3, Scenario 4
- **Description**:
  Install and pin `mermaid@v13-alpha` and build `src/lib/mermaid-v13.ts` as a Remark/Rehype plugin registered in `astro.config.mjs` that compiles ` ```mermaid ` fenced blocks directly to accessible inline `<svg>` elements during both `astro dev` and `astro build`, with in-memory content-hash caching for dev speed and fail-fast error reporting for invalid or unsupported diagrams.
- **Acceptance Criteria**:
  - Unit/integration tests verify both `flowchart`/`graph` and `timeline` diagrams render to valid `<svg>` markup without a browser DOM.
  - Unit test verifies an unsupported diagram (e.g., `zenuml`) or invalid syntax throws a descriptive error including the source file path.
  - Built HTML contains `<svg>` output and zero `<script>` tags referencing Mermaid.

## Task T3: Build Graphite-Inspired Astro Layout System, Navigation & Interactions
- blocked_by: [T1]
- blocks: [T4, T5]
- **Spec Scenarios**: Scenario 6
- **Description**:
  Recreate the AeroLaunch Graphite (`https://aerolaunch.app/demo/graphite/`) aesthetic, layout structure, typography, color system, smooth scroll/reveal animations (respecting `prefers-reduced-motion`), responsive navigation, footer, interactive `Carousel.astro` component, and Google Calendar "Book a Call" CTA natively in Astro + Tailwind CSS.
- **Acceptance Criteria**:
  - `BaseLayout.astro`, `PostLayout.astro`, `ProjectLayout.astro`, `Header.astro`, `Footer.astro`, `Carousel.astro`, and `SeriesNav.astro` implemented and verified on desktop and mobile viewports.
  - Google Calendar Appointment Scheduling CTA works cleanly with Graphite styling.
  - `alv maintain` passes with zero TypeScript, lint, or formatting errors.

## Task T4: Migrate Content Collections, EHR Series, Project Case Studies & Static Assets
- blocked_by: [T1, T2, T3]
- blocks: [T5, T6]
- **Spec Scenarios**: Scenario 3, Scenario 5, Scenario 6
- **Description**:
  Define Zod-validated Astro Content Collections (`src/content/config.ts`), migrate all content from `content/` (Home, About, 7 standalone posts, 8-part `how-to-build-an-ehr` series, 3 project case studies) and static assets from `static/` (`CNAME`, favicons, `k-mark.svg`, cover images, project/EHR images), convert Hugo `{{< ref >}}` shortcodes and broken internal links to valid Astro routes, replace inline carousel HTML with `Carousel.astro`, and wire up all dynamic routes (`index.astro`, `about.astro`, `posts/`, `projects/`).
- **Acceptance Criteria**:
  - All 19 existing Mermaid diagrams across `about.md`, `posts/`, and `projects/` compile cleanly to inline SVGs via Mermaid v13 Alpha.
  - All published content renders with zero broken images, zero raw Hugo shortcodes, and working project carousels and EHR series navigation.
  - `draft: true` posts (`ui-ux-design.md`, `how-to-hire-and-nurture-a-high-performing-team.md`) appear in `alv run` dev mode and are excluded from production `astro build`.
  - Legacy `content/` and `static/` directories removed after migration is verified.

## Task T5: Implement SEO & LLM-Friendly Outputs (`sitemap`, `rss`, JSON-LD, `llms.txt`, `llms-full.txt`)
- blocked_by: [T3, T4]
- blocks: [T6]
- **Spec Scenarios**: Scenario 7
- **Description**:
  Configure `@astrojs/sitemap`, build `SEOHead.astro` (canonical URLs, OpenGraph, Twitter Cards, and JSON-LD `WebSite`/`Person`/`Article`), create `/rss.xml`, `/llms.txt`, and `/llms-full.txt` endpoints, and migrate `public/robots.txt` pointing to `https://keolo.com/sitemap-index.xml`.
- **Acceptance Criteria**:
  - Production `dist/` contains `sitemap-index.xml`, `rss.xml`, `robots.txt`, `CNAME`, `llms.txt`, and `llms-full.txt`.
  - Automated check confirms all published pages include valid JSON-LD and OG/Twitter meta tags, and zero `draft: true` content leaks into sitemap, RSS, or `llms*.txt`.

## Task T6: Update GitHub Pages CI/CD Workflow, Documentation & End-to-End Verification
- blocked_by: [T2, T4, T5]
- blocks: []
- **Spec Scenarios**: Scenario 1, Scenario 2, Scenario 8
- **Description**:
  Rewrite `.github/workflows/deploy.yml` to build and deploy the Astro static site (`dist/`) to GitHub Pages using Node.js 22 and `pnpm` (removing Hugo, Docker, and submodule checkout), update `README.md` with the new Astro + `alv run` / `alv maintain` workflow, and perform full end-to-end verification.
- **Acceptance Criteria**:
  - `.github/workflows/deploy.yml` is valid YAML, uses Node 22 + `pnpm`, runs `astro check` and `astro build`, and uploads `./dist` to GitHub Pages.
  - `alv maintain` exits `0` cleanly on the complete repository.
  - `README.md` accurately documents prerequisites, `alv run`, `alv maintain`, content authoring, and Mermaid v13 SVG rendering.
