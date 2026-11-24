---
id: "spec:2026-11-24-convert-from-hugo-to-astro"
title: "Convert keolo.com from Hugo to Astro"
status: "draft"
tier: "standard"
created: "2026-11-24"
owner: "keolo"
parent: "none"
related: []
---

# Behavioral Specification: Convert keolo.com from Hugo to Astro

## Overview

This specification defines the observable behaviors for migrating `keolo.com` from Hugo/PaperMod to Astro + Tailwind CSS with a Graphite-inspired design system, build-time Mermaid v13 Alpha SVG rendering, SEO/LLM-friendly outputs, and `alv run` / `alv maintain` developer workflows.

---

## Requirements & Scenarios

### Scenario 1: Local Development Server via `alv run`
- **Given** a developer has Node.js 22+ and `pnpm` installed in the repository workspace
- **When** they execute `alv run` (which invokes `make run`)
- **Then** dependencies are verified/installed if needed, the Astro development server starts without requiring Docker, serves the Graphite-styled site locally, renders Mermaid diagrams as SVGs on the fly, and includes posts marked `draft: true` for local preview.

### Scenario 2: Automated Maintenance Checks via `alv maintain`
- **Given** the Astro codebase and migrated content exist in the repository
- **When** a developer or CI agent executes `alv maintain` (which invokes `make maintain`)
- **Then** the command runs `astro check` (TypeScript & Content Collection schema validation), code linting, formatting checks, dependency security audit, and a full production `astro build`, exiting with status code `0` only when all checks pass and reporting actionable errors on any failure.

### Scenario 3: Build-Time Mermaid v13 Alpha SVG Rendering (All Supported Diagram Types)
- **Given** Markdown/MDX content contains fenced ` ```mermaid ` blocks across supported v13 diagram types (including all 17 `flowchart`/`graph` diagrams and 2 `timeline` diagrams in `about.md`, `posts/`, and `projects/`)
- **When** Astro renders the page in local development or executes `astro build` in CI/CD
- **Then** each Mermaid code block is compiled DOM-free via `mermaid@v13-alpha` into a clean, accessible `<svg>` embedded in the rendered HTML output, with zero client-side Mermaid JavaScript shipped to the browser.

### Scenario 4: Unsupported Mermaid Diagram Build Failure
- **Given** a content file contains a ` ```mermaid ` block with an unsupported diagram type (e.g., `zenuml`, which yields `UNSUPPORTED_DIAGRAM` in v13 Alpha) or invalid Mermaid syntax
- **When** `astro build` or `alv maintain` executes
- **Then** the build fails fast with a non-zero exit code and prints the source file path and Mermaid error message so broken diagrams never deploy silently to production.

### Scenario 5: Complete Content Migration & Draft Exclusion
- **Given** the existing Hugo content (Home, About, 7 standalone posts, the 8-part `how-to-build-an-ehr` series, and 3 project case studies with image carousels) has been migrated to Astro Content Collections
- **When** `astro build` runs in production mode
- **Then** all published pages (`draft: false`) render with their full prose, images, interactive Astro image carousels, internal series navigation links (with zero raw Hugo `{{< ref >}}` shortcodes), and the Google Calendar "Book a Call" CTA, while `draft: true` files (`ui-ux-design.md` and `how-to-hire-and-nurture-a-high-performing-team.md`) are excluded from built HTML routes, sitemap, RSS, and LLM indexes.

### Scenario 6: Graphite-Inspired Visual Design & Responsive Interactions
- **Given** a visitor navigates to `/`, `/about`, `/projects`, `/projects/<slug>`, `/posts`, or `/posts/<slug>` on desktop or mobile viewports
- **Then** the site presents the recreated AeroLaunch Graphite aesthetic (layout structure, typography hierarchy, color tokens, smooth scroll/reveal animations, interactive navigation, and responsive image carousels) using Astro and Tailwind CSS, with zero residual Hugo/PaperMod assets or broken links.

### Scenario 7: SEO & LLM-Friendly Output Artifacts
- **Given** a production `astro build` completes cleanly
- **When** inspecting the generated `dist/` output directory
- **Then** the build contains:
  - Valid `sitemap-index.xml` and `rss.xml` covering all published routes,
  - `robots.txt` allowing major search and AI crawlers while referencing `https://keolo.com/sitemap-index.xml`,
  - `CNAME` containing `keolo.com`,
  - `/llms.txt` (concise structured site index with titles, descriptions, and canonical URLs) and `/llms-full.txt` (full plain-text/Markdown aggregation of all published pages, posts, and project case studies),
  - Per-page canonical URLs, OpenGraph/Twitter Card meta tags, and JSON-LD structured data (`WebSite`/`Person` on Home/About, `Article` on posts and project case studies).

### Scenario 8: GitHub Pages CI/CD Deployment
- **Given** a commit is pushed to `main` (or `workflow_dispatch` is triggered)
- **When** `.github/workflows/deploy.yml` runs on GitHub Actions
- **Then** the workflow installs Node.js 22+ and `pnpm`, installs dependencies from the lockfile, runs maintenance/build validation (`astro build` with build-time Mermaid v13 SVG rendering), and deploys the `dist/` artifact to GitHub Pages with zero Hugo or Docker steps.

---

## Appendix A: Decision Log

| Branch | Decision Area | Choice Selected | Rationale & Trade-offs |
| :--- | :--- | :--- | :--- |
| **Branch 1 (Happy Path)** | Core Stack, Template & Mermaid Pipeline | Latest Astro + Tailwind CSS + `pnpm` (Node 22+); native Astro recreation of AeroLaunch Graphite (`https://aerolaunch.app/demo/graphite/`); build-time DOM-free SVG rendering via `mermaid@v13-alpha` | Mermaid v13 Alpha supports 33 diagram types (including `flowchart` and `timeline`, covering 100% of the 19 existing diagrams) without a headless browser. Recreating Graphite natively in Astro gives full control over animations, interactions, and SEO without template lock-in. |
| **Branch 2 (Boundaries)** | Content Scope, Drafts & Backwards Compatibility | Keep all existing content; no Hugo URL/theme backwards compatibility required; exclude `draft: true` posts from production builds (visible in `alv run` dev mode) | Eliminates legacy PaperMod hacks, raw inline carousel HTML, and Hugo `{{< ref >}}` shortcodes while preserving all authored writing, EHR series structure, media, and Google Calendar booking CTA. |
| **Branch 3 (Failure Modes)** | Maintenance Checks & Mermaid Error Handling | `alv maintain` (`make maintain`) runs `astro check`, lint, format check, `pnpm audit`, and `astro build`; unsupported/invalid Mermaid diagrams fail the build fast | Prevents broken diagrams (`UNSUPPORTED_DIAGRAM` e.g. ZenUML or syntax errors), broken frontmatter schemas, or lint regressions from reaching production. |
| **Branch 4 (Rollout)** | SEO/LLM Artifacts & Deployment | Keep GitHub Pages (`keolo.com` via `CNAME`) in `.github/workflows/deploy.yml`; generate full SEO + LLM stack (`sitemap-index.xml`, `rss.xml`, JSON-LD, OG/Twitter, `robots.txt`, `/llms.txt`, `/llms-full.txt`) | Zero DNS or hosting migration risk; clean cutover on merge to `main` with immediate SEO and AI-crawler citation benefits. |
