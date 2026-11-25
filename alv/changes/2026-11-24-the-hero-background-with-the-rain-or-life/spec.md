---
id: "spec:2026-11-24-the-hero-background-with-the-rain-or-life"
title: "Hero Background with Random Rain or Life ASCII Animation"
status: "draft"
tier: "standard"
created: "2026-11-24"
owner: "keolo"
parent: "proposal:2026-11-24-the-hero-background-with-the-rain-or-life"
related: []
---

# Behavioral Specification: Hero Background with Random Rain or Life ASCII Animation

## Overview

This specification defines the observable behaviors for the generative ASCII background animation on the `keolo.com` homepage hero section. When a visitor navigates to or refreshes the homepage, the hero background randomly selects between two generative ASCII modes: **Rain** (vertical ASCII stream cascades) and **Life** (Conway's Game of Life cellular automata). The animation responds directly to user pointer movements and clicks/taps over the hero section, operates with dual-canvas caching for 60 FPS performance, automatically enters a zero-CPU dormant state when scrolled out of view via `IntersectionObserver`, and respects user reduced-motion preferences.

---

## Requirements & Scenarios

### Scenario 1: Random Mode Selection on Homepage Refresh (Rain or Life)
- **Given** a visitor loads or refreshes the homepage (`/`)
- **When** the hero background component initializes on the client
- **Then** the system randomly selects between mode `"rain"` and mode `"life"` with equal 50% probability (`Math.random() < 0.5 ? 'rain' : 'life'`),
- **And** the chosen mode initializes its respective state buffers without displaying any manual mode selection buttons or UI controls,
- **And** the canvas renders against a solid dark base (`#09090b` / `bg-graphite-950`) with an ambient low-contrast ASCII background grid.

### Scenario 2: Rain Animation Behavior and Interactive Rainburst
- **Given** the hero background has initialized in `"rain"` mode
- **When** the visitor moves a pointer (mouse or touch) across the hero section
- **Then** ASCII rain drops spawn at the cursor's column position and fall downward across the grid at randomized speeds (18–42 cells/sec),
- **And** falling drop heads illuminate cells with high energy (white/colored highlight), leaving a decaying colored ASCII trail that fades out over several rows,
- **When** the visitor clicks or taps within the hero area
- **Then** a multi-column "rainburst" cascade is triggered across adjacent columns (spanning approximately &plusmn;12 columns), shedding simultaneous rain streams downward across the viewport.

### Scenario 3: Life (Conway's Game of Life) Animation Behavior and Interactive Seeding
- **Given** the hero background has initialized in `"life"` mode
- **When** the visitor moves a pointer (mouse or touch) across the hero section
- **Then** live cellular seeds are painted into the Conway grid within a radius of the cursor position, igniting corresponding ASCII cells with bright energy,
- **And** the cellular simulation advances at regular intervals (~88ms per generation), evolving live cells according to standard Conway rules (survival with 2–3 neighbors, birth with 3 neighbors, death otherwise),
- **And** newly born cells ignite brightly with colors from the palette while static structures age and cool,
- **When** the visitor clicks or taps within the hero area
- **Then** a dense cellular cluster explosion (radius &ge; 5 cells) is seeded at the clicked coordinates, initiating an expansive generative frontier wave.

### Scenario 4: Viewport Scrolling & CPU Dormancy via IntersectionObserver
- **Given** an active animation loop is running on the homepage hero canvas
- **When** the visitor scrolls down past the hero fold into the Projects or Posts sections
- **Then** an `IntersectionObserver` observing the hero element detects that the hero is no longer intersecting the viewport,
- **And** the component halts the `requestAnimationFrame` loop, dropping CPU and GPU consumption for the canvas to 0%,
- **When** the visitor scrolls back up to the top of the homepage
- **Then** the `IntersectionObserver` detects the hero re-entering the viewport and seamlessly resumes the animation loop.

### Scenario 5: Accessibility, Contrast & Reduced-Motion Handling
- **Given** a visitor has enabled `prefers-reduced-motion: reduce` in their operating system or browser settings
- **When** the homepage hero renders
- **Then** continuous animation loops and mouse-triggered bursts are suppressed,
- **And** the canvas renders either a static subtle ASCII texture or remains hidden, ensuring zero motion sickness triggers,
- **And** all text content (headline, bio, credentials), buttons, and highlight cards maintain WCAG AA contrast against the dark background.

### Scenario 6: Layering & Unobstructed Clickability of Hero CTAs
- **Given** the hero section contains interactive elements including the "Book a Call" primary CTA, "About" secondary CTA, and 4 highlight metric cards
- **When** the visitor clicks, taps, or tabs to any of these interactive elements
- **Then** click events and focus states are captured directly by the underlying button or link without being swallowed by the canvas element,
- **And** pointer movement over non-interactive areas continues to trigger canvas interactions.

---

## Appendix A: Decision Log

| Branch | Decision Area | Choice Selected | Rationale & Trade-offs |
| :--- | :--- | :--- | :--- |
| **Branch 1 (Happy Path)** | Animation Mode Distribution & Trigger Mechanism | 50/50 pseudo-random selection between `rain` and `life` on page load/refresh; completely remove UI mode switcher buttons in production | Fulfills the explicit user intent ("Update the hero background with the rain or life animation randomly loaded when the page is refreshed"). Eliminates UI clutter and keeps the hero pristine and executive-focused while delivering generative novelty on each refresh. |
| **Branch 2 (Boundaries)** | Component Encapsulation & Placement Seam | Implement as a dedicated Astro component `src/components/HeroAsciiBackground.astro` mounted inside the hero `<section>` in `src/pages/index.astro` behind hero text | Decouples canvas rendering logic, grid mathematics, and event handlers from the page layout; ensures zero impact on subpages (`/about`, `/projects`, `/posts`) and simplifies unit testing. |
| **Branch 3 (Failure Modes)** | Performance, Battery Life & Mobile Viewport Handling | Offscreen base grid caching, DPR clamping to max 2, and `IntersectionObserver` dormancy to kill `requestAnimationFrame` when scrolled past fold | Prevents mobile device overheating and battery drain. Benchmarks demonstrate that uncapped canvas loops consume 15–25% CPU continuously; pausing via `IntersectionObserver` reduces off-screen CPU consumption to absolute 0%. |
| **Branch 4 (Rollout)** | Automated Quality Gates & Visual Verification | Add automated component and integration tests in `src/lib/__tests__/site-build.test.ts`, run `alv gate check dor` | Guarantees deterministic regression protection ensuring canvas element presence, reduced-motion defenses, and link clickability are continually validated in CI. |
