---
id: "proposal:2026-11-27-inspect-the-existing-project-then-implement-a"
title: "Non-Destructive Text Highlighting with Color Cycling"
status: "draft"
tier: "standard"
created: "2026-11-27"
owner: "keolo"
parent: "none"
related: []
---

# Proposal: Non-Destructive Text Highlighting with Color Cycling

## Problem Statement

`keolo.com` is an Astro 7 + Tailwind CSS v4 static site publishing long-form technical articles (`src/layouts/PostLayout.astro`), multi-part tutorials, project case studies (`src/layouts/ProjectLayout.astro`), and an executive profile (`src/pages/about.astro`) styled in a restrained Graphite light-mode reading aesthetic [F1, F2]. Currently, readers studying dense architectural posts or case studies have no built-in way to mark passages as they read:

1. **No in-page reading annotation**: Visitors reading long-form prose cannot highlight key passages for visual reference during a reading session without relying on external browser extensions [F2].
2. **Risk of DOM mutation in traditional highlighters**: Naive JavaScript highlighters wrap selected text nodes in `<mark>` or `<span>` elements, which breaks when selections span multiple inline/block nodes (e.g., links, `<strong>`, headings, lists), dirties the rendered HTML, and can disrupt Astro prose styling and assistive technology trees [F3, assumption: using the CSS Custom Highlight API avoids DOM mutation while supporting multi-node Ranges natively].
3. **Lack of visual differentiation between highlights**: A single static highlight color makes it harder to visually distinguish adjacent or thematically distinct passages as a reader moves through an article [assumption: cycling through a curated, configurable palette of high-contrast pastel colors on each new text selection improves visual scanning without requiring a complex color-picker UI].

## Hypothesis & Target Outcomes

Introducing a lightweight, accessible, zero-framework text highlighter powered by the CSS Custom Highlight API inside article and case-study prose containers will:

- Enable readers to select arbitrary text inside intended reading areas (`[data-highlight-root]`) and apply a persistent session highlight using a clear, keyboard- and pointer-accessible Graphite-styled control [F1, F4].
- Automatically cycle through a configurable set of background highlight colors whenever the user makes a new valid text selection, providing effortless visual differentiation [assumption: cycling on each new selection eliminates manual color picking while keeping the control minimal].
- Preserve the exact rendered DOM HTML of all pages by registering cloned `Range` objects with `CSS.highlights` and styling them via `::highlight(...)` pseudo-elements where supported [F3].
- Safely ignore empty/collapsed selections and selections outside the intended content area (such as the sticky header, hero section, series navigation, CTAs, and footer), preventing accidental or broken highlights [F2, F4].
- Maintain WCAG AA text contrast (≥ 4.5:1) between Graphite body text (`#18181b` / `#09090b`) and all default highlight background colors, as well as full `prefers-reduced-motion` compliance [F1].

## Scope Tier & Boundaries

- **Tier**: `standard` (Full Mode — `proposal.md`, `spec.md`, `design.md`, `tasks.md`).
- **In Scope**:
  - Core pure-TypeScript highlight controller and color-cycling state machine (`src/lib/text-highlighter.ts`) supporting a configurable palette of highlight colors.
  - Reusable Astro component (`src/components/TextHighlighter.astro`) rendering a Graphite-styled, accessible floating highlight toolbar (`role="toolbar"`) with a color-preview swatch, **Highlight** action, **Clear** action, and `aria-live="polite"` status announcer.
  - CSS Custom Highlight API integration (`CSS.highlights` + `::highlight(...)` rules in `src/styles/global.css`) with non-crashing capability detection and graceful fallback behavior when unsupported.
  - Content area scoping via `data-highlight-root` on prose containers in `src/layouts/PostLayout.astro`, `src/layouts/ProjectLayout.astro`, and `src/pages/about.astro`.
  - Defensive filtering for empty/collapsed selections, whitespace-only selections, and selections starting or ending outside `[data-highlight-root]`.
  - Automated unit tests (`src/lib/__tests__/text-highlighter.test.ts`) and static build integration assertions (`src/lib/__tests__/site-build.test.ts`).
- **Non-Goals**:
  - Server-side or `localStorage` persistence of highlights across page reloads or devices (highlights are ephemeral to the current page session).
  - Adding a client-side UI framework (React, Vue, Svelte, Preact) — the site remains pure Astro with lightweight TypeScript/JS [F1].
  - Highlighting text on index/listing pages, the homepage dark-mode hero, navigation header, or footer.
  - Mutating DOM HTML by injecting `<mark>` or `<span>` wrappers.

## Domain Invariants & Constraints

- **Zero HTML Mutation (CSS Custom Highlight API)**: Where `CSS.highlights` and `Highlight` are supported, applying or clearing highlights MUST NOT insert, wrap, split, or remove DOM nodes inside `[data-highlight-root]` [F3].
- **Graphite Aesthetic & Framework Fit**: All toolbar UI controls must use existing Tailwind CSS v4 utilities and Graphite tokens (`--color-graphite-50` through `--color-graphite-950`) from `src/styles/global.css`, matching existing interactive Astro components like `Header.astro` and `Carousel.astro` [F1, F4].
- **Accessible Contrast & Controls**: Every default highlight background color must maintain WCAG AA contrast (≥ 4.5:1) against dark Graphite body text (`#18181b`). Toolbar controls must be keyboard-operable, preserve selection on pointer press, include clear `aria-label`s, and announce state changes via `aria-live="polite"` [F1, assumption: pastel tints with luminance > 0.75 achieve > 10:1 contrast against `#18181b`].
- **Strict Content Scoping**: Highlights are only permitted when the active selection is non-empty (non-whitespace) and both `startContainer` and `endContainer` reside within the same `[data-highlight-root]` container [F2].
- **Graceful Degradation**: In browsers without CSS Custom Highlight API support (or with JavaScript disabled), the page must render cleanly with zero uncaught errors and no broken or non-functional floating controls [F3].

## Evidence & References

- **[F1]** `package.json` & `src/styles/global.css`: Project uses Astro 7 (`^7.4.13`), Tailwind CSS v4 (`@tailwindcss/vite`, `@tailwindcss/typography`), TypeScript, Vitest (`environment: 'node'`), Graphite color tokens, and `prefers-reduced-motion: reduce` rules.
- **[F2]** `src/layouts/PostLayout.astro`, `src/layouts/ProjectLayout.astro`, `src/pages/about.astro`: All long-form reading content is rendered inside `<div class="prose prose-zinc max-w-none ...">` within `<article>`, separate from `<Header />`, `<Footer />`, `<SeriesNav />`, `<Carousel />`, and CTA sections.
- **[F3]** W3C CSS Custom Highlight API Module Level 1 (`CSS.highlights`, `new Highlight(...ranges)`, `::highlight(<name>)`): Standard browser API for styling arbitrary `AbstractRange` / `Range` instances without altering the DOM tree.
- **[F4]** `src/components/Header.astro` & `src/components/Carousel.astro`: Existing interactive components use native Astro markup, semantic ARIA attributes (`role`, `aria-label`, `aria-expanded`), and lightweight inline/bundled scripts without third-party UI libraries.

## Success Metrics & Verification Plan

- **Zero HTML Mutation**: Automated unit tests confirm `CSS.highlights` registers cloned `Range` objects without adding, wrapping, or removing DOM nodes inside `[data-highlight-root]`.
- **Deterministic Color Cycling**: Automated unit tests verify cycling across both default (5-color) and custom palettes on finalized new selections, wrapping cleanly and ignoring duplicate/invalid selections.
- **Boundary Enforcement**: Automated unit tests verify empty, collapsed, whitespace-only, out-of-root, and cross-boundary selections are rejected without advancing the color cycle.
- **Accessibility & Contrast**: All default highlight backgrounds achieve ≥ 4.5:1 WCAG AA contrast against `--color-graphite-950`, toolbar buttons support keyboard & pointer activation with `aria-live="polite"` announcements, and `prefers-reduced-motion: reduce` is honored.
- **Build & Regression Gates**: `npm test`, `npm run check`, `npm run lint`, and `npm run build` pass cleanly, with `site-build.test.ts` verifying `data-highlight-root` and `text-highlighter-toolbar` on built post, project, and `/about/` HTML pages.
