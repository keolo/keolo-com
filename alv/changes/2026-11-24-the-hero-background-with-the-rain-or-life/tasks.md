---
id: "tasks:2026-11-24-the-hero-background-with-the-rain-or-life"
title: "Tasks: Hero Background with Random Rain or Life ASCII Animation"
status: "draft"
tier: "standard"
created: "2026-11-24"
owner: "keolo"
parent: "proposal:2026-11-24-the-hero-background-with-the-rain-or-life"
related: []
---

# Execution Tasks: Hero Background with Random Rain or Life ASCII Animation

## Task T1: Create `HeroAsciiBackground.astro` Component Foundation & Dual-Canvas Pipeline
- status: PENDING
- blocked_by: []
- blocks: [T2, T3, T4, T5]
- **Spec Scenarios**: Scenario 1, Scenario 5, Scenario 6
- **Description**:
  Author `src/components/HeroAsciiBackground.astro` with an HTML5 `<canvas id="hero-ascii-bg">` element styled with `absolute inset-0 pointer-events-none z-0`. Set up client script infrastructure that manages canvas sizing, device pixel ratio scaling (`Math.min(window.devicePixelRatio || 1, 2)`), offscreen base grid caching (`baseCanvas`), cell coordinate calculations (9px x 10px cells), and the active cell decay engine. Verify that the canvas renders cleanly behind hero text and that pointer events pass through to underlying buttons.
### Acceptance Criteria
  - [ ] `HeroAsciiBackground.astro` created with properly styled canvas element and accessible attributes (`aria-hidden="true"`).
  - [ ] Offscreen `baseCanvas` pre-renders the ambient dark ASCII grid and blits 1:1 to the main canvas.
  - [ ] Canvas resizes responsively on window resize without layout shifts or memory leaks.

## Task T2: Implement ASCII Rain Simulation and Mouse-Triggered Cascades
- status: PENDING
- blocked_by: [T1]
- blocks: [T4, T5]
- **Spec Scenarios**: Scenario 1, Scenario 2, Scenario 6
- **Description**:
  Implement the `"rain"` simulation mode in `HeroAsciiBackground.astro`. Structure falling drops with variable velocity (18–42 cells/sec), column targeting, and head-to-trail energy decay. Implement pointer movement shedding (spawning drops at the pointer column) and click/tap rainbursts (spawning simultaneous drops across adjacent &plusmn;12 columns). Ensure energized cells render with the multi-chroma palette (`PALETTE`) and decay smoothly.
### Acceptance Criteria
  - [ ] Moving pointer across hero triggers rain drops falling from cursor position.
  - [ ] Clicking/tapping hero triggers an expansive multi-column rainburst cascade.
  - [ ] Drops fade out cleanly at the bottom and are removed from the active drops array.

## Task T3: Implement Conway's Game of Life Cellular Automata Simulation
- status: PENDING
- blocked_by: [T1]
- blocks: [T4, T5]
- **Spec Scenarios**: Scenario 1, Scenario 3, Scenario 6
- **Description**:
  Implement the `"life"` simulation mode in `HeroAsciiBackground.astro`. Allocate typed array buffers (`Uint8Array`) for grid state, next generation, and cell age. Implement Conway cellular evolution rules stepping every 88ms. Implement mouse seeding (painting live clusters as cursor moves) and click/tap explosions (seeding a dense 5-cell radius cluster). Newly born cells ignite at peak energy with multi-chroma colors, while static structures cool down gracefully.
### Acceptance Criteria
  - [ ] Conway's Game of Life steps at ~88ms intervals adhering to standard neighbor rules.
  - [ ] Cursor movement seeds live cellular clusters in real time.
  - [ ] Clicks trigger an immediate radial cellular burst.
  - [ ] Typed arrays update without memory allocations in the inner loop.

## Task T4: Implement Randomization Engine, IntersectionObserver Dormancy & Reduced Motion
- status: PENDING
- blocked_by: [T1, T2, T3]
- blocks: [T5]
- **Spec Scenarios**: Scenario 1, Scenario 4, Scenario 5
- **Description**:
  Add 50/50 pseudo-random mode selection (`Math.random() < 0.5 ? 'rain' : 'life'`) on component initialization. Implement an `IntersectionObserver` attached to the hero container to pause `requestAnimationFrame` when the hero is scrolled out of view, and resume when it re-enters view. Integrate `window.matchMedia('(prefers-reduced-motion: reduce)')` to disable continuous animation and mouse bursts for users requesting reduced motion.
### Acceptance Criteria
  - [ ] Mode randomly alternates between `rain` and `life` on page loads and refreshes.
  - [ ] Animation loop halts completely (0 FPS) when hero is scrolled past the viewport fold.
  - [ ] Animation is suppressed when `prefers-reduced-motion: reduce` is detected.

## Task T5: Mount Component in `index.astro`, Author Tests & Verify Quality Gates
- status: PENDING
- blocked_by: [T1, T2, T3, T4]
- blocks: []
- **Spec Scenarios**: Scenario 1, Scenario 2, Scenario 3, Scenario 4, Scenario 5, Scenario 6
- **Description**:
  Mount `<HeroAsciiBackground />` inside the hero section of `src/pages/index.astro`. Ensure all hero buttons ("Book a Call", "About") and highlight cards remain fully clickable and interactive. Add automated tests in `src/lib/__tests__/site-build.test.ts` asserting component mounting, canvas element attributes, and accessibility features. Run `alv gate check dor` to verify all Definition of Ready checks pass cleanly.
### Acceptance Criteria
  - [ ] `<HeroAsciiBackground />` is mounted inside `src/pages/index.astro` hero section.
  - [ ] Hero links and buttons remain clickable with zero event interception.
  - [ ] Automated tests in `site-build.test.ts` validate canvas attributes and markup.
  - [ ] `alv gate check dor alv/changes/2026-11-24-the-hero-background-with-the-rain-or-life` passes all quality gates.
