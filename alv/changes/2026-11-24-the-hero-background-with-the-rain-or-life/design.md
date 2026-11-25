---
id: "design:2026-11-24-the-hero-background-with-the-rain-or-life"
title: "Technical Design: Hero Background with Random Rain or Life ASCII Animation"
status: "draft"
tier: "standard"
created: "2026-11-24"
owner: "keolo"
parent: "proposal:2026-11-24-the-hero-background-with-the-rain-or-life"
related: []
---

# Technical Design: Hero Background with Random Rain or Life ASCII Animation

## Architecture Overview

The generative ASCII hero background is implemented as an Astro component (`src/components/HeroAsciiBackground.astro`) mounted in the background layer of the homepage hero fold (`src/pages/index.astro`).

```mermaid
flowchart TD
    subgraph PAGE["src/pages/index.astro"]
        HERO_SEC["Hero Section (relative, overflow-hidden, min-h-[100dvh])"]
        HERO_CONTENT["Hero Content (relative z-10)\n• Badge & Headline\n• DecipherText Bio\n• CTAs & 4 Highlight Cards"]
    end

    subgraph COMP["src/components/HeroAsciiBackground.astro"]
        CANVAS["<canvas id='hero-ascii-bg' class='absolute inset-0 z-0 pointer-events-none' />"]
        ENGINE["Client Script: AsciiEngine"]
        OBS["IntersectionObserver\n(Dormancy Controller)"]
        INPUT["Pointer & Click Event Listeners\n(Attached to Hero Section)"]
    end

    subgraph MODES["Simulation Modes (50/50 Random Selection)"]
        RAIN["Mode: RAIN\n• spawnRainDrop(col, startRow)\n• updateRain(dt)\n• Click: Rainburst (&plusmn;12 cols)"]
        LIFE["Mode: LIFE (Conway)\n• seedLifeCluster(cx, cy)\n• updateLife(dt) (~88ms step)\n• Click: Radial Seed Burst"]
    end

    subgraph PIPELINE["Dual-Canvas Render Pipeline"]
        OFFSCREEN["Offscreen baseCanvas\n(Caches dark ASCII grid & subtle shimmer)"]
        MAIN_CTX["Main Canvas 2D Context\n(Draws base + active lit cells + palette)"]
    end

    HERO_SEC --> CANVAS
    HERO_SEC --> HERO_CONTENT
    HERO_SEC -.-> INPUT

    INPUT --> ENGINE
    OBS -->|Pause/Resume| ENGINE
    ENGINE -->|Math.random() < 0.5| RAIN
    ENGINE -->|Otherwise| LIFE

    RAIN --> PIPELINE
    LIFE --> PIPELINE
    OFFSCREEN --> MAIN_CTX
    MAIN_CTX --> CANVAS
```

---

## Project Directory Structure

```text
src/
├── components/
│   ├── HeroAsciiBackground.astro  # New: Generative ASCII canvas component with Rain/Life engine
│   ├── Header.astro               # Sticky navigation header
│   ├── DecipherText.astro         # Bio decipher animation
│   └── MotionReveal.astro         # Scroll reveal wrapper
├── pages/
│   └── index.astro                # Homepage: embeds <HeroAsciiBackground /> in hero slot
└── lib/
    └── __tests__/
        └── site-build.test.ts     # Automated tests asserting canvas mounting and attributes
alv/
└── changes/
    └── 2026-11-24-the-hero-background-with-the-rain-or-life/
        ├── proposal.md            # Layer 1: Problem & Intent
        ├── spec.md                # Layer 2: Behavioral Specification
        ├── design.md              # Layer 3: Technical Design & Recovery Matrix
        ├── tasks.md               # Layer 3: Execution Tasks DAG
        └── prototype.html         # Preserved interactive proof-of-concept
```

---

## Key Component Seams & Technical Decisions

### 1. Component Architecture & Event Handling Seam
- **Component File**: `src/components/HeroAsciiBackground.astro`.
- **Canvas Placement**:
  ```astro
  <canvas
    id="hero-ascii-bg"
    class="pointer-events-none absolute inset-0 h-full w-full"
    aria-hidden="true"
  ></canvas>
  ```
- **Pointer Event Forwarding**: Because `<canvas>` has `pointer-events: none`, it does not block clicks to the primary CTA buttons or highlight cards. The client script attaches `pointermove`, `pointerdown`, and `touchmove` listeners directly to the parent hero section (`#hero-section` or container).
- When a user moves their pointer over the hero section or clicks anywhere outside interactive buttons (`e.target.closest('a, button') === null`), the event coordinates are translated into canvas grid cell coordinates (`col = Math.floor(x / cellW)`, `row = Math.floor(y / cellH)`).

### 2. Random Selection Engine (50/50 Rain vs. Life)
Upon client script execution:
```javascript
const mode = Math.random() < 0.5 ? "rain" : "life";
```
- **If `rain`**:
  - Initializes `drops = []`.
  - On pointer move: calls `spawnRainDrop(col, row)` at the current cursor column, dropping ASCII characters downward.
  - On click / tap: spawns a wide rainburst across `col - 12` to `col + 12`.
- **If `life`**:
  - Allocates two `Uint8Array` buffers (`cols * rows`) for double-buffered Conway simulation.
  - On pointer move: calls `seedLifeCluster(col, row, radius=2, density=0.52)`.
  - On click / tap: calls `seedLifeCluster(col, row, radius=5, density=0.5)`.
  - Accumulates delta time and steps Conway simulation every `88ms` (`0.088s`), igniting newly born cells in bright multi-chroma colors.

### 3. Dual-Canvas Buffering for 60 FPS Performance
Rendering hundreds of ASCII characters every frame at high resolution can saturate CPU text measurement and rasterization. We employ a dual-canvas strategy:
1. **Offscreen Canvas (`baseCanvas`)**: Pre-renders the static background grid of dark ASCII characters (`CHARS_BG`) in `#09090b` / subtle dark shades (`rgb(21, 21, 23)`).
2. **Main Frame Render**:
   - Each frame copies `baseCanvas` onto `canvas` in a single fast blit (`drawImage(baseCanvas, 0, 0)`).
   - Only active, energized cells (`activeCells` map) and drop heads are rasterized dynamically.
   - Active cells decay exponentially (`cell.energy -= cell.decay * dt`) and are deleted from the map when energy drops below `0.02`.

### 4. Zero-CPU Dormancy via `IntersectionObserver`
To ensure the canvas does not waste CPU/GPU cycles or drain mobile battery when the visitor scrolls down to read blog posts or case studies:
```javascript
const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      if (!animating) {
        animating = true;
        lastTime = performance.now();
        requestAnimationFrame(animate);
      }
    } else {
      animating = false;
    }
  }
}, { threshold: 0.05 });

observer.observe(heroContainer);
```

### 5. Accessibility & `prefers-reduced-motion`
Before starting the animation loop:
```javascript
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (prefersReduced) {
  // Render a single static subtle base frame, then return without scheduling requestAnimationFrame
  rebuildBaseGrid();
  ctx.drawImage(baseCanvas, 0, 0);
  return;
}
```

---

## Failure Modes & Recovery Matrix

| Failure Mode | Detection Point | Handling / Recovery |
| :--- | :--- | :--- |
| Canvas context not supported (`getContext('2d') === null`) | Initialization check | Gracefully exit early. The parent hero section's CSS background (`bg-graphite-950`) continues to display seamlessly. |
| Viewport resized or device rotated | `window.addEventListener('resize')` | Debounced resize recalculates `cols` and `rows`, reallocates Life buffers, resizes canvases with clamped `dpr = Math.min(window.devicePixelRatio || 1, 2)`, and rebuilds the offscreen base grid. |
| User clicks on CTA button while clicking hero | `e.target.closest('a, button')` | Event listener checks if target is within an interactive element. If true, canvas skips trigger so links and buttons function unimpeded. |
| Mobile device thermal throttle / slow frame rate | Large delta time in `animate(now)` | Delta time `dt` is clamped to `Math.min((now - lastTime) / 1000, 0.05)` (max 50ms) to prevent simulation explosions during background tab throttling. |
| Hero scrolled out of view | `IntersectionObserver` callback | Animation frame loop is completely halted (`cancelAnimationFrame`), reducing idle CPU usage to 0%. |
| Visitor prefers reduced motion | `matchMedia('(prefers-reduced-motion: reduce)')` | Disables dynamic updates and frame scheduling, rendering a single quiet background frame. |
