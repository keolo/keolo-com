---
id: "spec:2026-11-24-refine-hero-section-of-the-homepage"
title: "Refine Hero Section of the Homepage"
status: "draft"
tier: "standard"
created: "2026-11-24"
owner: "keolo"
parent: "none"
related: []
---

# Behavioral Specification: Refine Hero Section of the Homepage

## Overview

This specification defines the observable behaviors for refining the hero section of the `keolo.com` homepage. The homepage hero section is re-engineered to occupy the full viewport height (`min-h-[100dvh]`) in a cinematic dark-mode presentation (`bg-graphite-950`). The primary site navigation is positioned directly below this full-screen hero section so that it is excluded from the initial fold on first visit, seamlessly sticking to the top of the viewport (`sticky top-0 z-40`) as the visitor scrolls down into the light-mode project and writing sections. All subpages retain their standard top-of-page navigation header.

---

## Requirements & Scenarios

### Scenario 1: Initial Viewport Landing & Full-Screen Dark Hero Presentation
- **Given** a visitor navigates to the homepage root URL (`/`) on any modern desktop, tablet, or mobile browser
- **When** the page loads at the initial scroll position (`scrollY === 0`)
- **Then** the hero section expands to occupy at least 100% of the viewport height (`min-h-screen` / `min-h-[100dvh]`),
- **And** the hero content (executive role badge, main headline, bio paragraph, primary "Book a Call" CTA, secondary "About" CTA, and 4 highlight cards) is fully visible within this initial fold without vertical clipping or horizontal overflow,
- **And** the primary site navigation header is not visible within the initial viewport fold.

### Scenario 2: Post-Hero Navigation Visibility and Sticky Scroll Behavior
- **Given** a visitor is viewing the initial full-screen dark hero section on the homepage
- **When** the visitor scrolls down past the hero fold
- **Then** the primary navigation header (`<Header />`) comes into view at the seam between the dark hero and the light-mode content container,
- **And** as scrolling continues past the top of the navigation header, the header adheres to the top of the viewport (`sticky top-0 z-40`) with its backdrop blur and semi-transparent graphite surface, providing full access to all navigation links ("Home", "About", "Projects", "Posts") and mobile menu controls across the rest of the homepage content.

### Scenario 3: High-Contrast Dark-Mode Hero Styling and Responsive Highlight Grid
- **Given** the hero section is rendered on the homepage
- **When** inspecting visual styles and viewport adjustments
- **Then** the hero background renders with dark graphite tokens (`bg-graphite-950`),
- **And** the primary heading renders in crisp white (`text-white`), body copy in high-legibility light graphite (`text-graphite-300`), and badges in dark graphite pills with subtle borders (`bg-graphite-900/80 border-graphite-800`),
- **And** the primary CTA button renders as a solid high-contrast button (`bg-white text-graphite-950 hover:bg-graphite-200`) and the secondary CTA renders as a dark outlined button (`border-graphite-800 bg-graphite-900/60 text-graphite-200 hover:bg-graphite-800`),
- **And** the 4 highlight cards render in a responsive grid (single column on narrow viewports, two columns on medium viewports, or four columns on large desktop viewports) with dark translucent surfaces (`bg-graphite-900/40 border-graphite-800/80 text-graphite-300`),
- **And** a subtle animated or static downward scroll cue ("Scroll to explore" or chevron) is displayed near the bottom of the fold.

### Scenario 4: Subpage Header Placement Invariance
- **Given** a visitor navigates directly to any non-homepage route (e.g., `/about/`, `/projects/`, `/projects/riiu/`, `/posts/`, or `/posts/startup-engineering-metrics-simplified/`)
- **When** the page renders
- **Then** the primary navigation header (`<Header />`) is placed at the top of the page above the main content area,
- **And** zero full-screen hero wrappers or layout displacement are introduced to subpage routes.

### Scenario 5: Accessibility, Contrast & Reduced-Motion Handling
- **Given** a visitor with accessibility needs or motion preferences visits the homepage
- **When** testing with automated contrast checkers, keyboard navigation, or `prefers-reduced-motion: reduce` enabled
- **Then** all dark-mode text and interactive elements satisfy WCAG AA contrast standards (≥ 4.5:1 for normal text, ≥ 3.0:1 for headings and controls),
- **And** all interactive buttons, links, and scroll cues receive accessible focus rings,
- **And** any subtle pulsing or bouncing animations on the scroll cue are neutralized when `prefers-reduced-motion: reduce` is active.

---

## Appendix A: Decision Log

| Branch | Decision Area | Choice Selected | Rationale & Trade-offs |
| :--- | :--- | :--- | :--- |
| **Branch 1 (Happy Path)** | Hero Height & Navigation Placement Architecture | Full-screen dark hero (`min-h-[100dvh]` on `bg-graphite-950`) followed immediately by `<Header />` configured with `sticky top-0 z-40`; `BaseLayout.astro` accepts an optional `headerPlacement?: 'top' | 'below-hero' | 'none'` prop (defaulting to `'top'`) | Guarantees the navigation is completely hidden from the initial 100dvh fold without brittle JavaScript scroll listeners; leveraging native CSS `sticky top-0` ensures zero-overhead, 60fps hardware-accelerated sticky navigation once the user scrolls past the hero. |
| **Branch 2 (Boundaries)** | Dark Mode Scope & Subpage Consistency | Limit dark mode strictly to the homepage hero fold; preserve light-mode Graphite reading experience for homepage sections (Projects, Latest Posts), subpages (`/about`, `/projects`, `/posts`), and footer | Avoids scope creep and maintaining dual-theme state across dozens of long-form articles while providing the desired dramatic, high-conviction executive impression on the landing fold. Subpages retain standard top header navigation. |
| **Branch 3 (Failure Modes)** | Mobile Dynamic Viewport Height & Overflow Handling | Use `min-h-screen min-h-[100dvh]` with flex vertical distribution (`justify-between` or `justify-center`) and defensive padding; highlight cards adjust from 1-column on mobile to 2/4-column on desktop | Prevents mobile address bar expansion/retraction from cutting off CTAs or highlight metrics; ensures content never overflows outside the fold on compact viewports (e.g. iPhone SE / 375px width). |
| **Branch 4 (Rollout)** | Automated Quality Gates & Visual Verification | Update `site-build.test.ts` to assert hero height classes, header placement on homepage vs. subpages, and contrast tokens; validate via `alv gate check dor` and `alv maintain` | Provides deterministic regression protection so future Astro or Tailwind updates cannot accidentally restore the header to the top of the homepage fold or compromise dark-mode contrast. |
