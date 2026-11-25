---
id: "proposal:2026-11-24-the-hero-background-with-the-rain-or-life"
title: "Hero Background with Random Rain or Life ASCII Animation"
status: "draft"
tier: "standard"
created: "2026-11-24"
owner: "keolo"
parent: "proposal:2026-11-24-refine-hero-section-of-the-homepage"
related: []
---

# Proposal: Hero Background with Random Rain or Life ASCII Animation

## Problem Statement

The homepage for `keolo.com` (`src/pages/index.astro`) currently features a full-screen, high-contrast dark-mode hero section (`bg-graphite-950` / `#09090b`) with a static ambient radial blur [F1]. While this layout delivers strong executive positioning and clear visual hierarchy, it remains visually static once entrance animations complete:

1. **Static landing fold lacks generative vitality**: An executive technologist specializing in AI, agentic systems, and autonomous production systems benefits from a dynamic, tactile visual signature that signals technical depth and computational craft [F1, F2].
2. **Predictable visual experience across visits**: Repeat visitors always see an identical static dark background, missing an opportunity for dynamic variety and delight [F2].
3. **Absence of tactile interaction**: Visitors browsing on desktop or mobile cannot interact with the hero canvas, leaving the background as dead space rather than a responsive, playful environment [F2, F4].

## Hypothesis & Target Outcomes

Integrating a lightweight, hardware-accelerated ASCII canvas animation component (`HeroAsciiBackground.astro`) into the dark hero section that randomly initializes as either **Rain** (falling ASCII stream cascades) or **Life** (mouse-seeded Conway's Game of Life) on each page load/refresh will:

- Deliver an immediate, memorable generative experience that elevates the brand authority of Aliveness Ventures without distracting from the primary copy, CTAs, or credentials [assumption: retro-futuristic ASCII animations reinforce executive credibility in engineering craft and agentic architectures].
- Provide visual variety by pseudo-randomly selecting between `rain` and `life` (50% probability each) on page load and refresh [F2].
- Provide intuitive, low-latency pointer interactions: moving the cursor sheds falling rain or paints live cellular automata; clicking/tapping triggers a rainburst or cellular burst [F2, F4].
- Maintain strict performance and battery efficiency by pausing animation frames when the hero section scrolls out of the viewport via `IntersectionObserver`, consuming 0% CPU/GPU while users read articles or projects [F5].
- Fully respect accessibility preferences by disabling continuous animations when `prefers-reduced-motion: reduce` is detected [F5].
- Ensure zero interference with hero CTAs ("Book a Call", "About", and highlight cards) by maintaining correct z-indexing and pointer event layering [F1].

## Scope Tier & Boundaries

- **Tier**: `standard` (Full Mode — `proposal.md`, `spec.md`, `design.md`, `tasks.md`).
- **In Scope**:
  - Encapsulating the ASCII canvas rendering engine inside a standalone Astro component: `src/components/HeroAsciiBackground.astro`.
  - 50/50 pseudo-random selection between `rain` (falling ASCII block streams) and `life` (Conway's Game of Life cellular automata) on page load and refresh.
  - Dual-canvas optimization: an offscreen base grid canvas caching subtle background ASCII characters and a primary canvas rendering active ignited cells.
  - Interactive pointer events: cursor tracking across the hero area sheds rain streams or seeds cellular clusters; mouse down / tap triggers rainburst cascades or cellular explosions.
  - Automatic performance hibernation: an `IntersectionObserver` observing the hero element pauses `requestAnimationFrame` when the hero is off-screen and resumes when visible.
  - Responsive canvas scaling handling high-DPI screens (`window.devicePixelRatio`, clamped to 2) and window resize events.
  - Accessibility compliance honoring `prefers-reduced-motion: reduce` by disabling frame loops and presenting a subtle static background.
  - Full regression testing in `src/lib/__tests__/site-build.test.ts`.
- **Non-Goals**:
  - Retaining the interactive mode switcher bar or hero preview toggle from the prototype (`prototype.html` was created as an exploratory proof-of-concept; in production, selection is fully automated and randomized without UI clutter).
  - Implementing the other experimental modes from the prototype (`contours`, `orchestrator`, `agents`, `lattice`).
  - Deploying the ASCII background to subpages (`/about/`, `/projects/`, `/posts/`).
  - Storing user mode preference across sessions (random selection on every page load/refresh is the explicit requirement).

## Domain Invariants & Constraints

- **Canvas Background Harmony**: The canvas background color must strictly match the hero background color token `bg-graphite-950` (`#09090b`) to avoid visible seams or flashing [F1, F4].
- **Zero Interception of Interactive Controls**: Primary buttons ("Book a Call", "About") and highlight cards must retain normal clickability, hover states, and text selection [F1].
- **Frame Budget & Dormancy**: The animation must sustain 60 FPS during interaction and immediately drop to 0 FPS / 0% CPU when scrolled past the hero fold [F5].
- **WCAG Contrast & Readability**: Canvas ASCII characters must use decaying energy opacity so text rendered above the canvas (`text-white`, `text-graphite-300`) retains WCAG AA contrast (≥ 4.5:1) [F1, F4].
- **Reduced Motion Compliance**: When `prefers-reduced-motion: reduce` is active, animations must halt or render a static snapshot without continuous movement [F5].

## Evidence & Findings

- **[F1]** `src/pages/index.astro` renders the full-screen dark hero using `w-full min-h-screen min-h-[100dvh] bg-graphite-950 text-white`. The hero is positioned in the `hero` slot of `BaseLayout.astro`.
- **[F2]** The active specification in `alv/changes/2026-11-24-the-hero-background-with-the-rain-or-life/spec.md` states: "Update the hero background with the rain or life animation randomly loaded when the page is refreshed" and supplies a working HTML prototype (`prototype.html`).
- **[F3]** The prototype defines two specific animation modes:
  - `rain`: Falling ASCII block drops (`drops` array) that fall at variable speeds down grid columns, lighting up cells with decaying energy and multi-chroma palette colors (`PALETTE`), with rainbursts on click.
  - `life`: Conway's Game of Life on an ASCII grid (`Uint8Array` state buffers), where cursor movement seeds live cells, click triggers a cellular explosion, and living cells evolve at 88ms step intervals.
- **[F4]** The prototype uses cell dimensions of 9px x 10px with JetBrains Mono / SF Mono monospace fonts, offscreen canvas buffering (`baseCanvas`), and a 11-color palette ranging from coral to violet.
- **[F5]** `src/styles/global.css` establishes strict `prefers-reduced-motion` compliance. Uncontrolled background canvas loops can cause high battery drain and CPU usage on mobile devices unless paused via `IntersectionObserver`.

## Success Metrics & Verification Plan

1. **Random Mode Distribution**: Across 100 simulated page loads, `rain` and `life` modes each load between 35% and 65% of the time (consistent with 50/50 binomial distribution).
2. **Interactive Fidelity**:
   - In `rain` mode: pointer movement spawns falling drops in nearby columns; clicks spawn multi-column rain cascades.
   - In `life` mode: pointer movement seeds live Conway cells; clicks trigger a radial cluster explosion; cells step forward at ~11 Hz.
3. **Zero CPU When Scrolled**: When scrolling past the `100dvh` fold, the `IntersectionObserver` disconnects the animation loop; zero `requestAnimationFrame` calls fire while viewing Projects or Posts.
4. **Hero CTA Functionality**: All hero links, CTAs, and cards remain fully clickable and keyboard-accessible without pointer obstruction.
5. **Reduced Motion Safety**: When `prefers-reduced-motion: reduce` is set, the animation loop is not started.
6. **Passing ALV Quality Gates**: `alv gate check dor alv/changes/2026-11-24-the-hero-background-with-the-rain-or-life` passes all criteria.
