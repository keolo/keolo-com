---
id: "tasks:2026-11-27-inspect-the-existing-project-then-implement-a"
title: "Tasks: Non-Destructive Text Highlighting with Color Cycling"
status: "draft"
tier: "standard"
created: "2026-11-27"
owner: "keolo"
parent: "none"
related:
  - "proposal:2026-11-27-inspect-the-existing-project-then-implement-a"
  - "spec:2026-11-27-inspect-the-existing-project-then-implement-a"
  - "design:2026-11-27-inspect-the-existing-project-then-implement-a"
---

# Execution Tasks: Non-Destructive Text Highlighting with Color Cycling

## Task T1: Implement Pure TypeScript Text Highlighter Core & Color Cycling Controller
- status: PENDING
- blocked_by: []
- blocks: [T2, T3, T4, T5]
- **Spec Scenarios**: Scenario 2, Scenario 3, Scenario 4, Scenario 6
- **Description**:
  Create `src/lib/text-highlighter.ts` implementing the `HighlightColor` interface, `DEFAULT_HIGHLIGHT_COLORS` (5 WCAG-AA-compliant Graphite-compatible pastel colors), `isCustomHighlightSupported()`, `getValidSelectionRange()` (filtering empty, whitespace-only, out-of-root, cross-root, and editable-input selections), and `TextHighlightController` (managing color cycling on finalized distinct selections, cloning ranges into `CSS.highlights` per color without mutating the DOM, and clearing highlights).
### Acceptance Criteria
  - [x] `DEFAULT_HIGHLIGHT_COLORS` defines 5 configurable highlight colors with `id`, `label`, `background`, and `swatch`.
  - [x] `TextHighlightController` starts at index `0`, advances `(index + 1) % colors.length` on each new distinct valid selection, wraps cleanly, and ignores duplicate/invalid selections.
  - [x] `getValidSelectionRange()` rejects empty, collapsed, whitespace-only, out-of-root, and cross-boundary selections.
  - [x] `applyHighlight()` clones ranges into `CSS.highlights` without modifying DOM nodes and `clearHighlights()` removes all registered ranges.
  - [x] `isCustomHighlightSupported()` safely detects browser support without throwing in Node or unsupported browsers.

```yaml
status: COMPLETED
```
## Task T2: Add `::highlight(...)` Styles and Reduced-Motion Rules in `src/styles/global.css`
- status: PENDING
- blocked_by: [T1]
- blocks: [T3, T5]
- **Spec Scenarios**: Scenario 2, Scenario 5
- **Description**:
  Update `src/styles/global.css` to define default `::highlight(keolo-hl-*)` pseudo-element rules for all default highlight colors (ensuring `color: var(--color-graphite-950)` for WCAG AA contrast) and any minimal toolbar transition helpers that honor `@media (prefers-reduced-motion: reduce)`.
### Acceptance Criteria
  - [ ] `src/styles/global.css` defines `::highlight(keolo-hl-amber)`, `::highlight(keolo-hl-mint)`, `::highlight(keolo-hl-sky)`, `::highlight(keolo-hl-rose)`, and `::highlight(keolo-hl-violet)` rules.
  - [ ] All highlight background colors maintain WCAG AA contrast (≥ 4.5:1) against `--color-graphite-950`.
  - [ ] Toolbar styling respects `prefers-reduced-motion: reduce`.

## Task T3: Build Accessible `TextHighlighter.astro` Component
- status: PENDING
- blocked_by: [T1, T2]
- blocks: [T4, T5]
- **Spec Scenarios**: Scenario 1, Scenario 2, Scenario 3, Scenario 4, Scenario 5, Scenario 6
- **Description**:
  Create `src/components/TextHighlighter.astro` accepting an optional `colors?: HighlightColor[]` prop. Render the floating Graphite-styled `role="toolbar"` (`aria-label="Text highlight controls"`) with color swatch indicator, **Highlight** button (`pointerdown` `preventDefault()` to preserve selection), inline/floating **Clear highlights** button, and `aria-live="polite"` status announcer. Emit dynamic `::highlight(...)` rules when custom colors are passed, and wire client-side selection events (`pointerup`, `keyup`, debounced `selectionchange`, `Escape` dismissal, scroll/resize clamping) to `TextHighlightController`.
### Acceptance Criteria
  - [x] `<TextHighlighter />` accepts an optional `colors` prop and defaults to `DEFAULT_HIGHLIGHT_COLORS`.
  - [x] Floating toolbar positions near the selection, clamps within viewport bounds, flips below selection when near the sticky header, and hides on empty/out-of-root selections or `Escape`.
  - [x] Clicking **Highlight** preserves the active selection, applies the highlight via `CSS.highlights`, updates the `aria-live="polite"` region, and reveals the **Clear** control.
  - [x] Component degrades silently with zero errors when `CSS.highlights` is unavailable.

```yaml
status: COMPLETED
```
## Task T4: Integrate `TextHighlighter` and `data-highlight-root` into Content Layouts
- status: PENDING
- blocked_by: [T1, T3]
- blocks: [T5]
- **Spec Scenarios**: Scenario 1, Scenario 4
- **Description**:
  Add `data-highlight-root` to the `.prose` reading containers in `src/layouts/PostLayout.astro`, `src/layouts/ProjectLayout.astro`, and `src/pages/about.astro`, and mount `<TextHighlighter />` on those reading pages. Ensure non-content areas (`<Header />`, `<Footer />`, `<SeriesNav />`, CTA cards, and homepage hero) remain outside `data-highlight-root`.
### Acceptance Criteria
  - [x] `PostLayout.astro`, `ProjectLayout.astro`, and `about.astro` mark their `.prose` content container with `data-highlight-root` and mount `<TextHighlighter />`.
  - [x] Navigation headers, footers, hero sections, and CTA cards are outside `data-highlight-root`.
  - [x] `npm run check` (`astro check`) and `npm run lint` pass with zero errors.

```yaml
status: COMPLETED
```
## Task T5: Author Unit & Build Regression Tests and Verify Quality Gates
- status: PENDING
- blocked_by: [T1, T2, T3, T4]
- blocks: []
- **Spec Scenarios**: Scenario 1, Scenario 2, Scenario 3, Scenario 4, Scenario 5, Scenario 6
- **Description**:
  Add comprehensive unit tests in `src/lib/__tests__/text-highlighter.test.ts` covering color cycling, custom palette configuration, empty/out-of-root selection rejection, `CSS.highlights` registration/clearing without DOM mutation, and unsupported-browser fallback. Extend `src/lib/__tests__/site-build.test.ts` to assert `data-highlight-root` and `text-highlighter-toolbar` appear on built post, project, and `/about/` HTML pages. Run `npm test`, `npm run build`, `npm run check`, `npm run lint`, and `npm run format:check`.
### Acceptance Criteria
  - [ ] `src/lib/__tests__/text-highlighter.test.ts` passes all unit tests via `npm test`.
  - [ ] `src/lib/__tests__/site-build.test.ts` verifies built HTML for posts, projects, and `/about/` includes `data-highlight-root` and `text-highlighter-toolbar`.
  - [ ] `npm run build`, `npm run check`, `npm run lint`, and `npm test` all pass cleanly.
