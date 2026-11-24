---
id: "proposal:2026-11-24-refine-hero-section-of-the-homepage"
title: "Refine Hero Section of the Homepage"
status: "draft"
tier: "standard"
created: "2026-11-24"
owner: "keolo"
parent: "none"
related: []
---

# Proposal: Refine Hero Section of the Homepage

## Problem Statement

The current `keolo.com` homepage (`src/pages/index.astro`) renders the hero introduction inside the standard light-mode `BaseLayout.astro` container (`bg-graphite-50`), positioned directly below a sticky top navigation header [F1]. While functional, this presentation suffers from three key UX and visual hierarchy limitations:

1. **Initial fold dilution**: The sticky header occupies prime vertical screen space at the top of the initial viewport, competing with the primary value proposition ("Tech leadership for high-stakes startups") before visitors have engaged with the author's credentials [F1, F2].
2. **Constrained hero presence**: The hero content is contained within an inline padded section (`py-10 sm:py-16 max-w-3xl`) rather than commanding the full viewport height, leaving visitors looking at an incomplete slice of the page above the fold without a strong visual focal point [F1].
3. **Monochromatic light theme lacks dramatic contrast**: The entire landing experience is rendered on a light grey background (`bg-graphite-50`), missing an opportunity to present a bold, high-contrast, modern dark-mode introduction that reflects a high-conviction executive tech leadership persona [F2, F4].

## Hypothesis & Target Outcomes

Transforming the homepage hero into an edge-to-edge, full-screen dark-mode viewport (`min-h-screen` / `min-h-[100dvh]` on `bg-graphite-950`) and relocating the primary navigation to sit directly below the hero section will:

- Provide an immersive, high-impact first impression on desktop and mobile viewports by dedicating 100% of the initial fold to executive positioning, CTAs, and delivery credentials [assumption: full-screen dark heroes elevate brand authority and increase CTA conversion for fractional CTO engagements].
- Eliminate header distraction in the initial fold while preserving sticky navigation utility as soon as the visitor scrolls down to explore Selected Projects and Latest Writing [F2, F3].
- Preserve all existing subpage navigation behaviors (e.g., `/about/`, `/projects/`, `/posts/`) so secondary routes continue rendering their top header seamlessly without layout shifts or navigation regressions [F3].
- Maintain strict WCAG AA contrast ratios across all dark-mode text, badges, buttons, and highlight cards using the Graphite design token palette [F4].

## Scope Tier & Boundaries

- **Tier**: `standard` (Full Mode — `proposal.md`, `spec.md`, `design.md`, `tasks.md`).
- **In Scope**:
  - Re-architecting `src/pages/index.astro` and `src/layouts/BaseLayout.astro` (or dedicated layout seams) to support a full-viewport dark-mode hero section above the primary navigation.
  - Full-screen responsive viewport layout (`min-h-screen` / `min-h-[100dvh]`) with vertical centering/spacing across mobile, tablet, and desktop viewports.
  - Dark-mode visual styling using Graphite tokens (`bg-graphite-950`, crisp white typography, `text-graphite-300` body copy, dark pill badges, high-contrast CTA buttons, and translucent dark highlight cards).
  - Post-hero sticky navigation bar that seamlessly anchors to the top of the viewport (`sticky top-0 z-40`) as the user scrolls into the light-mode section (`Projects` & `Latest Posts`).
  - Subtle interactive scroll cue / indicator encouraging visitors to scroll past the initial fold.
  - Regression testing ensuring subpages (`/about/`, `/projects/`, `/posts/`) maintain standard top-of-page navigation.
- **Non-Goals**:
  - Global site-wide dark mode toggle (subpages and content articles remain in their clean light-mode Graphite reading aesthetic).
  - Modifying the text content or links of the hero bio, booking CTA, or highlight metrics.
  - Redesigning the footer or subpage layouts.

## Domain Invariants & Constraints

- **Single Source of Truth for Navigation Links**: Navigation links, mobile menu handlers, and branding in `src/components/Header.astro` must not be duplicated across multiple component files [F3].
- **Graphite Design Tokens**: Color styling must strictly use the existing `@theme` palette (`--color-graphite-50` through `--color-graphite-950`) in `src/styles/global.css` [F4].
- **Accessible Contrast**: All text and interactive button states on dark surfaces must achieve WCAG AA contrast (≥ 4.5:1 for body copy, ≥ 3.0:1 for large headings and buttons) [assumption: crisp white on `graphite-950` achieves 18.5:1 contrast, well above WCAG AAA].
- **Motion & Accessibility**: Smooth scrolling and scroll cues must respect `prefers-reduced-motion` [F5].
- **SEO & Canonical URLs**: Page metadata, JSON-LD schemas (`WebSite`, `Person`), OpenGraph tags, and canonical links in `SEOHead.astro` must remain unaffected [F1].

## Evidence & Findings

- **[F1]** `src/pages/index.astro` is wrapped in `<BaseLayout>`, which places `<Header />` as the first child of `<body>` and encapsulates child content inside `<main class="mx-auto w-full max-w-5xl flex-1 px-4 pt-10 sm:px-6 lg:px-8">`. The hero is an inline `<section class="py-10 sm:py-16">`.
- **[F2]** The active feature specification requirement (`alv/changes/2026-11-24-refine-hero-section-of-the-homepage/spec.md`) specifies: (1) hero section takes up full screen, (2) navigation is placed below the hero section so it is not shown in the initial fold, and (3) hero section is styled in dark mode.
- **[F3]** `src/components/Header.astro` uses `sticky top-0 z-40 border-b border-graphite-200/80 bg-graphite-50/85 backdrop-blur-md` and provides primary desktop navigation and mobile menu toggle. Subpages rely on this header at the top of the page.
- **[F4]** `src/styles/global.css` defines the Tailwind v4 Graphite color scale (`graphite-50` through `graphite-950`). `graphite-950` (#09090b) and `graphite-900` (#18181b) provide the canonical dark surfaces.
- **[F5]** `src/styles/global.css` already configures `@media (prefers-reduced-motion: reduce)` to disable smooth scroll and animations.

## Success Metrics & Verification Plan

1. **Full-Viewport Initial Fold**: On `/`, the dark hero section measures at least 100% of viewport height (`100vh` / `100dvh`) without vertical clipping on mobile or desktop viewports.
2. **Initial Fold Isolation**: The navigation bar is not visible within the initial `100dvh` viewport fold on initial load; it scrolls into view and sticks to the top of the viewport when scrolling into the Projects section.
3. **Subpage Navigation Unchanged**: Navigating to `/about/`, `/projects/`, or `/posts/` renders `<Header />` at the top of the page with zero visual regressions or layout shift.
4. **WCAG AA Compliance**: All text elements, badges, and button states in the hero pass WCAG AA contrast standards.
5. **Clean Verification Pipeline**: `alv gate check dor` passes Definition of Ready audits, and automated tests validate layout properties.
