---
id: "tasks:2026-11-24-refine-hero-section-of-the-homepage"
title: "Tasks: Refine Hero Section of the Homepage"
status: "draft"
tier: "standard"
created: "2026-11-24"
owner: "keolo"
parent: "none"
related: []
---

# Execution Tasks: Refine Hero Section of the Homepage

## Task T1: Refactor `BaseLayout.astro` for Flexible Header Placement
- blocked_by: []
- blocks: [T2, T3, T4]
- **Spec Scenarios**: Scenario 1, Scenario 2, Scenario 4
- **Description**:
  Update `src/layouts/BaseLayout.astro` to accept an optional `headerPlacement?: 'top' | 'below-hero' | 'none'` prop (defaulting to `'top'`). When `headerPlacement === 'below-hero'`, render a dedicated `<slot name="hero" />` before `<Header />`, followed by `<main>` for normal content flow. Verify all subpages (`about.astro`, `projects/`, `posts/`, `PostLayout.astro`, `ProjectLayout.astro`) continue to render `<Header />` at the top of the page without regressions.
### Acceptance Criteria
  - [ ] `BaseLayout.astro` supports `headerPlacement="below-hero"` with `<slot name="hero" />` positioned above `<Header />`.
  - [ ] Default `headerPlacement="top"` preserves identical layout structure for all subpages.
  - [ ] Zero TypeScript or lint errors (`astro check`).

## Task T2: Implement Full-Screen Dark-Mode Hero Section on Homepage
- blocked_by: [T1]
- blocks: [T3, T4]
- **Spec Scenarios**: Scenario 1, Scenario 3, Scenario 5
- **Description**:
  Refactor the hero section in `src/pages/index.astro` to occupy the full viewport height (`w-full min-h-screen min-h-[100dvh] bg-graphite-950 text-white`) rendered in the `hero` slot. Style the role badge with dark pill styling (`bg-graphite-900/80 border-graphite-800 text-graphite-300`), heading in crisp white (`text-white`), body copy in `text-graphite-300`, primary CTA button in high-contrast solid white (`bg-white text-graphite-950 hover:bg-graphite-200`), secondary CTA in dark border (`border-graphite-800 bg-graphite-900/60 text-graphite-200`), and the 4 highlight cards in a responsive grid (`grid gap-4 sm:grid-cols-2 lg:grid-cols-4`) with translucent dark cards (`bg-graphite-900/40 border-graphite-800/80 text-graphite-300`). Add a subtle scroll cue at the bottom of the fold.
### Acceptance Criteria
  - [ ] The hero section fills 100% of viewport height (`min-h-[100dvh]`) with `bg-graphite-950`.
  - [ ] All typography, buttons, and highlight cards use dark-mode Graphite tokens satisfying WCAG AA contrast.
  - [ ] Highlight cards lay out responsively without vertical clipping on mobile (375px) or desktop (1440px).

## Task T3: Configure Sticky Navigation Below Hero and Scroll Interactions
- blocked_by: [T1, T2]
- blocks: [T4]
- **Spec Scenarios**: Scenario 1, Scenario 2, Scenario 5
- **Description**:
  Ensure the `<Header />` rendered immediately below the hero section seamlessly engages `sticky top-0 z-40` as the visitor scrolls into the light-mode section of the homepage. Ensure the scroll down cue anchors smoothly to the content section (`#content`). Verify keyboard navigation, tab order, and `prefers-reduced-motion` compliance.
### Acceptance Criteria
  - [ ] Navigation header is absent from the initial `100dvh` fold on first page load.
  - [ ] Header sticks to the top of the viewport when scrolling into the Projects and Latest Posts sections.
  - [ ] Smooth scrolling and scroll indicator respect `prefers-reduced-motion: reduce`.

## Task T4: Author Automated Regression Tests & Validate Quality Gates
- blocked_by: [T1, T2, T3]
- blocks: []
- **Spec Scenarios**: Scenario 1, Scenario 2, Scenario 3, Scenario 4, Scenario 5
- **Description**:
  Add unit and integration tests in `src/lib/__tests__/site-build.test.ts` verifying homepage hero tokens (`min-h-[100dvh]`, `bg-graphite-950`), header placement below the hero on `/`, and header placement at the top on subpages (`/about`, `/projects`, `/posts`). Run `alv gate check dor` to verify all Definition of Ready checks pass cleanly.
### Acceptance Criteria
  - [ ] Automated tests in `src/lib/__tests__/site-build.test.ts` verify hero viewport height, dark mode tokens, and header placement rules.
  - [ ] `alv gate check dor alv/changes/2026-11-24-refine-hero-section-of-the-homepage` passes all local specification gates.
