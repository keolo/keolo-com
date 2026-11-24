---
id: "proposal:2026-11-24-convert-from-hugo-to-astro"
title: "Convert keolo.com from Hugo to Astro"
status: "draft"
tier: "standard"
created: "2026-11-24"
owner: "keolo"
parent: "none"
related: []
---

# Proposal: Convert keolo.com from Hugo to Astro

## Problem Statement

`keolo.com` is currently built with Hugo (`v0.140.2`) and the PaperMod theme submodule, running locally through Docker (`hugomods/hugo:exts`) and rendering 19 Mermaid diagrams client-side via a CDN-loaded Mermaid v10 script [F1]. This architecture creates several points of friction:

1. **Client-side diagram overhead and layout shift**: Every page with Mermaid diagrams downloads `mermaid@10` from jsDelivr and parses/renders SVGs in the browser DOM at runtime, hurting Core Web Vitals (CLS/LCP) and leaving diagrams unrendered for non-JS crawlers and LLM scrapers [F1].
2. **Rigid theme customization**: Customizing PaperMod requires copying Go template partials into `layouts/` and injecting raw HTML/JS blocks into Markdown files (such as inline carousel HTML in project case studies) [F2].
3. **Heavyweight local workflow & missing maintenance automation**: Local development requires Docker Desktop (`make run`), and there is no `make maintain` target for `alv maintain` to run type-checking, linting, formatting, security audits, or build verification [F3].
4. **Incomplete LLM/AI discoverability**: While `static/robots.txt` permits AI crawlers, the site lacks machine-readable LLM indexes (`/llms.txt`, `/llms-full.txt`) and unified structured metadata across posts, multi-part series, and project case studies [F4].

## Hypothesis & Target Outcomes

Migrating `keolo.com` to the latest **Astro** + **Tailwind CSS** stack (with **Node.js 22+** and **pnpm**), adopting a **Graphite-inspired** (`https://aerolaunch.app/demo/graphite/`) visual design system, and compiling all Mermaid diagrams to static SVGs at build time via **Mermaid v13 Alpha** will:

- Eliminate runtime Mermaid JS payloads and layout shift by pre-rendering all 19 diagrams (17 flowcharts/graphs and 2 timelines) to DOM-free SVGs during local dev and CI/CD builds [F5].
- Modernize the visual design, typography, animations, and scroll interactions without carrying backwards-compatibility debt from Hugo/PaperMod [assumption: clean URL structure and fresh UX outweigh legacy PaperMod URL preservation].
- Provide fast, Docker-free local workflows via `alv run` (`make run`) and automated quality checks via `alv maintain` (`make maintain`) [F3].
- Maximize SEO and LLM citation readiness via sitemaps, RSS, JSON-LD (`Person`, `Article`, `WebSite`), OpenGraph/Twitter tags, `robots.txt`, `/llms.txt`, and `/llms-full.txt` [assumption: providing `/llms.txt` and `/llms-full.txt` alongside semantic HTML and pre-rendered SVGs improves AI assistant citation accuracy].

## Scope Tier & Boundaries

- **Tier**: `standard` (Full Mode — `proposal.md`, `spec.md`, `design.md`, `tasks.md`).
- **In Scope**:
  - Full Astro + Tailwind CSS site scaffold using latest stable Astro/Tailwind/TypeScript versions and `pnpm`.
  - Native Astro recreation of the AeroLaunch Graphite (`https://aerolaunch.app/demo/graphite/`) aesthetic, layout structure, animations, interactions, and scrolling.
  - Build-time DOM-free Mermaid v13 Alpha (`mermaid@v13-alpha`) SVG rendering pipeline for both local dev (`alv run`) and CI/CD builds.
  - Migration of all existing content from `content/` (Home, About, 7 standalone posts, 8-part EHR tutorial series, 3 project case studies, images, and static assets like `CNAME`, favicons, and `robots.txt`), converting Hugo `{{< ref >}}` shortcodes and inline HTML carousels to native Astro components.
  - Preservation of the Google Calendar "Book a Call" scheduling CTA.
  - Complete SEO & LLM-friendly artifact generation (`sitemap-index.xml`, RSS feed, JSON-LD, OG/Twitter tags, `robots.txt`, `/llms.txt`, `/llms-full.txt`).
  - `Makefile` targets `run` (for `alv run`) and `maintain` (for `alv maintain`), plus updated GitHub Pages deployment in `.github/workflows/deploy.yml`.
  - Removal of Hugo, PaperMod git submodule, Docker-based Hugo Makefile targets, and obsolete Hugo layout overrides.
- **Non-Goals**:
  - Backwards compatibility with Hugo URLs, Hugo themes, PaperMod CSS/templates, or Docker-based Hugo builds.
  - Publishing currently drafted posts (`ui-ux-design.md`, `how-to-hire-and-nurture-a-high-performing-team.md`) to production — they remain `draft: true` and excluded from production builds.
  - Changing hosting providers (remains on GitHub Pages with custom domain `keolo.com`).

## Domain Invariants & Constraints

- **No existing `docs/concepts/*.md` or `docs/decisions/*.md`**: Repository currently has no Layer 4 knowledge files (`alv docs check .` passes cleanly).
- **Content Integrity**: All published articles, multi-part EHR series chapters, project case studies, and media assets in `content/` and `static/` must be preserved with zero content loss.
- **ALV CLI Contract**: `alv run` invokes `make run`, and `alv maintain` invokes `make maintain` in the repository root [F3].
- **Mermaid v13 Alpha Capabilities**: Mermaid v13 Alpha supports 33 diagram types natively without a browser DOM (including `flowchart`/`graph` and `timeline`, covering 100% of the 19 existing diagrams; only `ZenUML` is unsupported and returns `UNSUPPORTED_DIAGRAM`) [F5].
- **Custom Domain**: `public/CNAME` must contain `keolo.com` for GitHub Pages deployment [F4].

## Evidence & Findings

- **[F1]** `layouts/partials/extend_head.html` loads `https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js` at runtime; repository audit found 19 Mermaid code blocks across 8 Markdown files (`content/about.md`, 3 posts, 3 projects).
- **[F2]** `content/projects/joyo.md`, `riiu.md`, and `global-peace-yes.md` embed raw `<div class="carousel-container">` HTML and inline `onclick` handlers; `content/posts/how-to-build-an-ehr/discovery-and-planning.md` uses Hugo `{{< ref "system-design" >}}` shortcodes.
- **[F3]** `alv run --help` and `alv maintain --help` confirm both commands delegate directly to the `run` and `maintain` targets in the root `Makefile`. Current `Makefile` only defines Hugo Docker targets (`run`, `build`, `clean`, `new-post`) and has no `maintain` target.
- **[F4]** `static/CNAME` sets `keolo.com`, `static/robots.txt` explicitly allows LLM crawlers (`User-agent: *`), and `.github/workflows/deploy.yml` deploys static build output to GitHub Pages.
- **[F5]** Mermaid v13 Alpha (`mermaid@v13-alpha`, Node 20+ ESM) renders 33 diagram types (including `flowchart`, `graph`, and `timeline`) directly to deterministic SVGs without a headless browser or DOM.

## Success Metrics & Verification Plan

1. **Zero Client-Side Mermaid JS**: Built HTML pages contain inline/static `<svg>` elements for all 19 diagrams and zero `<script>` references to `mermaid`.
2. **Build & Maintenance Health**: `alv maintain` exits `0` (passing `astro check`, ESLint/linting, Prettier/format check, `pnpm audit`, and `astro build`).
3. **Local Dev Experience**: `alv run` starts the Astro dev server cleanly with hot-reloading and draft content visible.
4. **SEO & LLM Completeness**: Production build emits `sitemap-index.xml`, `rss.xml`, `robots.txt`, `llms.txt`, `llms-full.txt`, `CNAME`, and valid JSON-LD + OpenGraph meta tags on all public pages.
5. **CI/CD Deployment**: `.github/workflows/deploy.yml` builds and packages the Astro static output (`dist/`) for GitHub Pages without Hugo or Docker dependencies.
