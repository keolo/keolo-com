---
id: "design:2026-11-27-inspect-the-existing-project-then-implement-a"
title: "Technical Design: Non-Destructive Text Highlighting with Color Cycling"
status: "draft"
tier: "standard"
created: "2026-11-27"
owner: "keolo"
parent: "none"
related:
  - "proposal:2026-11-27-inspect-the-existing-project-then-implement-a"
  - "spec:2026-11-27-inspect-the-existing-project-then-implement-a"
---

# Technical Design: Non-Destructive Text Highlighting with Color Cycling

## Architecture Overview

The text highlighting feature is decomposed into three clean, decoupled layers that align with `keolo.com`'s zero-framework Astro + Tailwind CSS v4 architecture:

1. **Pure TypeScript Core (`src/lib/text-highlighter.ts`)**: Encapsulates the configurable color palette type (`HighlightColor`), default Graphite-compatible WCAG-AA palette (`DEFAULT_HIGHLIGHT_COLORS`), color-cycling state machine (`TextHighlightController`), selection validation (`isValidSelectionInRoot`), and CSS Custom Highlight API adapter (`applyHighlightRange`, `clearAllHighlights`, `isCustomHighlightSupported`). Designed with injectable browser primitives so all state transitions, cycling, and boundary checks are 100% unit-testable in Vitest's Node environment.
2. **Accessible Astro UI Component (`src/components/TextHighlighter.astro`)**: Accepts an optional `colors?: HighlightColor[]` prop (defaulting to `DEFAULT_HIGHLIGHT_COLORS`), renders the semantic floating toolbar (`role="toolbar"`), a subtle session Clear pill (visible only when `highlightCount > 0`), and a visually hidden `aria-live="polite"` status announcer. Injects dynamic `::highlight(...)` stylesheet rules for any custom palette passed via props, and binds a lightweight client `<script>` that wires DOM selection events to `TextHighlightController`.
3. **Layout & Styling Integration (`src/styles/global.css`, `PostLayout.astro`, `ProjectLayout.astro`, `about.astro`)**: Adds `data-highlight-root` to prose reading containers, mounts `<TextHighlighter />` on reading layouts, and defines base `::highlight(...)` styling rules and reduced-motion safeguards in `src/styles/global.css`.

---

## Project Directory Structure

```text
src/
├── lib/
│   ├── text-highlighter.ts                  # Pure TS controller, color palette config, validation & CSS.highlights adapter
│   └── __tests__/
│       ├── text-highlighter.test.ts         # Unit tests for cycling, validation, CSS.highlights adapter & fallback
│       └── site-build.test.ts               # Build output assertions for data-highlight-root & TextHighlighter markup
├── components/
│   └── TextHighlighter.astro                # Floating accessible toolbar + clear pill + client bootstrap
├── layouts/
│   ├── PostLayout.astro                     # Adds data-highlight-root on prose container + mounts <TextHighlighter />
│   └── ProjectLayout.astro                  # Adds data-highlight-root on prose container + mounts <TextHighlighter />
├── pages/
│   └── about.astro                          # Adds data-highlight-root on prose container + mounts <TextHighlighter />
└── styles/
    └── global.css                           # Default ::highlight(keolo-hl-*) rules & toolbar reduced-motion styles
```

---

## Key Component Seams & Technical Decisions

### 1. Configurable Color Palette & Cycling State Machine (`src/lib/text-highlighter.ts`)

```ts
export interface HighlightColor {
  id: string;        // CSS-safe slug, e.g. 'amber' -> ::highlight(keolo-hl-amber)
  label: string;     // Human-readable name for aria-label & announcements, e.g. 'Amber'
  background: string;// CSS color value, e.g. 'rgba(254, 240, 138, 0.78)'
  swatch: string;    // Solid hex color for toolbar indicator dot, e.g. '#fde047'
}
```

- **Default Palette (`DEFAULT_HIGHLIGHT_COLORS`)**:
  1. `amber` — `Amber` (`rgba(254, 240, 138, 0.78)`, swatch `#facc15`)
  2. `mint` — `Mint` (`rgba(187, 247, 208, 0.78)`, swatch `#4ade80`)
  3. `sky` — `Sky` (`rgba(186, 230, 253, 0.80)`, swatch `#38bdf8`)
  4. `rose` — `Rose` (`rgba(254, 205, 211, 0.80)`, swatch `#fb7185`)
  5. `violet` — `Violet` (`rgba(221, 214, 254, 0.80)`, swatch `#a78bfa`)
- **Color Cycling Rules**:
  - `TextHighlightController` tracks `activeColorIndex` (initialized to `0`), `hasSeenFirstSelection` (`false`), and `lastSelectionSignature` (`string | null`, built from selected text + start/end offsets or container identity).
  - When `onSelectionFinalized(validSelection)` is called with a **valid** selection inside `[data-highlight-root]`:
    - If `!hasSeenFirstSelection`, keep `activeColorIndex = 0`, set `hasSeenFirstSelection = true`, and record `lastSelectionSignature`.
    - Otherwise, if `signature !== lastSelectionSignature`, advance `activeColorIndex = (activeColorIndex + 1) % colors.length` and update `lastSelectionSignature`.
    - If `signature === lastSelectionSignature` (e.g., redundant `selectionchange` / `pointerup` on the same selection), do **not** advance.
  - When an invalid, empty, or out-of-root selection occurs, do **not** advance `activeColorIndex`; simply hide the toolbar.
  - Consumers can override colors by passing `colors={[...]}` to `<TextHighlighter colors={customColors} />`. If an empty array is passed, the controller safely falls back to `DEFAULT_HIGHLIGHT_COLORS`.

### 2. Selection Validation & Content Scoping

A helper `getValidSelectionRange(selection, roots)` enforces strict boundaries:
1. Returns `null` if `!selection || selection.rangeCount === 0 || selection.isCollapsed`.
2. Returns `null` if `selection.toString().trim().length === 0` (whitespace-only selection).
3. Obtains `range = selection.getRangeAt(0)`.
4. Resolves the closest `[data-highlight-root]` ancestor for both `range.startContainer` and `range.endContainer` (handling `Text` nodes via `node.parentElement`).
5. Returns `null` if either container has no `[data-highlight-root]` ancestor, or if they belong to different roots, or if either endpoint is inside an editable control (`input`, `textarea`, `[contenteditable="true"]`).
6. Returns `range` when all checks pass.

### 3. CSS Custom Highlight API Registration & Styling

- Capability check:
  ```ts
  export function isCustomHighlightSupported(globalObj = globalThis): boolean {
    return (
      typeof globalObj.CSS !== 'undefined' &&
      'highlights' in globalObj.CSS &&
      typeof (globalObj as unknown as { Highlight?: unknown }).Highlight === 'function'
    );
  }
  ```
- Each configured color maps to highlight registry key `` `keolo-hl-${color.id}` ``.
- When applying a highlight:
  - Clone the active range (`const cloned = range.cloneRange()`) so subsequent user selections or `selection.removeAllRanges()` do not mutate or collapse the stored highlight.
  - Retrieve or create the `Highlight` instance for the active color key, call `highlight.add(cloned)`, and register via `CSS.highlights.set(key, highlight)`.
  - Increment `highlightCount` and clear the browser's temporary selection (`selection.removeAllRanges()`) so the user immediately sees the applied `::highlight(...)` background cleanly.
- Styling:
  - `src/styles/global.css` defines default `::highlight(keolo-hl-amber)`, `::highlight(keolo-hl-mint)`, `::highlight(keolo-hl-sky)`, `::highlight(keolo-hl-rose)`, and `::highlight(keolo-hl-violet)` rules with `color: var(--color-graphite-950);`.
  - If `<TextHighlighter>` receives custom `colors` via props, it emits a scoped `<style>` block generating `::highlight(keolo-hl-${c.id}) { background-color: ${c.background}; color: var(--color-graphite-950); }` so custom palettes work out-of-the-box without editing `global.css`.

### 4. Accessible Floating Toolbar & Viewport Positioning (`src/components/TextHighlighter.astro`)

- **Markup**:
  - Floating toolbar container: `id="text-highlighter-toolbar"`, `role="toolbar"`, `aria-label="Text highlight controls"`, `hidden`, `fixed z-50` styled with `rounded-xl border border-graphite-200 bg-white/95 px-2 py-1.5 text-sm text-graphite-900 shadow-lg backdrop-blur-md`.
  - **Highlight button**: `data-highlight-apply`, `type="button"`, contains a color swatch `<span data-highlight-swatch class="h-3 w-3 rounded-full border border-graphite-900/15" aria-hidden="true"></span>` and label `Highlight`. Uses `pointerdown` / `mousedown` `event.preventDefault()` so clicking the button never clears the user's text selection before the click handler runs.
  - **Session Clear button**: rendered both inline in the toolbar (when highlights exist) and as a subtle bottom-right floating pill (`data-highlight-clear-pill`, `hidden` when count is `0`) showing `Clear highlights (N)` so readers can clear highlights even after deselecting text.
  - **Live region**: `<div class="sr-only" aria-live="polite" aria-atomic="true" data-highlight-status></div>`.
- **Positioning**:
  - Computes `range.getBoundingClientRect()`, positions the toolbar centered above the selection (with an 8px gap), flipping below the selection if within 64px of the top viewport edge (e.g., beneath the sticky 64px `<Header />`), and clamping horizontally within `12px` of viewport edges.
  - Repositions or hides cleanly on scroll/resize and dismisses on `Escape`.
- **Event Handling**:
  - Evaluates finalized selections on `pointerup`, `keyup` (for keyboard selection), and debounced `selectionchange` (120ms) so dragging across text does not rapidly cycle colors before the user finishes selecting.

### 5. Automated Verification & Testing Strategy

- **Unit Tests (`src/lib/__tests__/text-highlighter.test.ts`)**:
  - Color cycling across default and custom palettes, including wrap-around and deduplication for identical selection signatures.
  - Selection validation: empty, collapsed, whitespace-only, outside `[data-highlight-root]`, cross-boundary selections, and valid multi-node ranges inside `[data-highlight-root]`.
  - `CSS.highlights` adapter behavior with mocked `CSS.highlights` / `Highlight` registry (add, multiple colors, clear all) verifying zero DOM mutation.
  - Capability detection returning `false` cleanly when `CSS.highlights` or `Highlight` is absent.
- **Build Integration Tests (`src/lib/__tests__/site-build.test.ts`)**:
  - Verify rendered HTML for blog posts, project case studies, and `/about/` contains `data-highlight-root` and `text-highlighter-toolbar`.
  - Verify non-prose pages (e.g., `/`, `/posts/`, `/projects/`) do not unexpectedly expose `data-highlight-root` on headers or hero sections.

---

## Failure Modes & Recovery Matrix

| Failure Mode | Detection / Signal | Mitigation & Recovery |
| :--- | :--- | :--- |
| Browser lacks CSS Custom Highlight API (`CSS.highlights` or `Highlight` undefined) | `isCustomHighlightSupported()` returns `false` on init | Exit initialization cleanly without attaching listeners or showing toolbar; zero console errors and zero DOM mutation. |
| Clicking **Highlight** collapses `window.getSelection()` before click fires | Selection becomes empty in `click` handler | Call `event.preventDefault()` on `pointerdown` / `mousedown` on toolbar buttons, and also cache the validated cloned `Range` when the toolbar opens as a fallback. |
| Rapid `selectionchange` events while dragging spin through multiple colors | Color advances multiple times during a single drag gesture | Only advance color on finalized selection events (`pointerup`, `keyup`, or debounced `selectionchange`) and only when the selection signature differs from `lastSelectionSignature`. |
| Floating toolbar clips off-screen on narrow mobile viewports or under sticky `<Header />` | Toolbar `top < 72px` or `left < 12px` / `right > innerWidth - 12px` | Clamp horizontal position to `[12, innerWidth - toolbarWidth - 12]` and flip toolbar below selection when `rect.top < 72`. |
| Selection spans from inside `[data-highlight-root]` into `<Header />` or `<Footer />` | `startRoot !== endRoot` or either is `null` | Reject selection in `getValidSelectionRange()`, keep toolbar hidden, and do not advance `activeColorIndex`. |
| Custom `colors` prop is empty or contains invalid entries | `colors.length === 0` | Sanitize and fall back to `DEFAULT_HIGHLIGHT_COLORS` so color cycling never divides by zero (`% 0`). |
| Reduced-motion user sees animated toolbar entrance | `prefers-reduced-motion: reduce` media query | Inherit global `global.css` reduced-motion overrides and avoid CSS transform animations on the toolbar when reduced motion is preferred. |
