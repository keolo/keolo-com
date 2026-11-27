---
id: "spec:2026-11-27-inspect-the-existing-project-then-implement-a"
title: "Behavioral Specification: Non-Destructive Text Highlighting with Color Cycling"
status: "draft"
tier: "standard"
created: "2026-11-27"
owner: "keolo"
parent: "none"
related:
  - "proposal:2026-11-27-inspect-the-existing-project-then-implement-a"
---

# Behavioral Specification: Non-Destructive Text Highlighting with Color Cycling

## Overview

This specification defines the interactive behavior, visual presentation, accessibility guarantees, content-scoping rules, and fallback behavior for arbitrary text highlighting across long-form reading surfaces on `keolo.com` (blog posts, project case studies, and the About page).

---

## Scenarios

### Scenario 1: Selecting Text in Content Area Reveals Accessible Highlight Control
- **Given** a reader is viewing a page with a designated content area (`[data-highlight-root]`, such as a blog post, project case study, or `/about/`) in a browser supporting the CSS Custom Highlight API
- **When** the reader selects a non-empty range of text inside `[data-highlight-root]` (via pointer drag, double-click, or keyboard `Shift+Arrow`)
- **Then** a Graphite-styled floating highlight toolbar (`role="toolbar"`, `aria-label="Text highlight controls"`) becomes visible and positioned near the selection within viewport bounds,
- **And** the toolbar presents a clear, accessible **Highlight** button displaying a swatch of the active highlight color and an explicit accessible name (e.g., `"Highlight selected text in Amber"`),
- **And** pressing the **Highlight** button applies the highlight using the active color without collapsing or losing the selection before application,
- **And** an `aria-live="polite"` status region announces the applied highlight color and updated highlight count.

### Scenario 2: Non-Destructive Highlighting via CSS Custom Highlight API
- **Given** a reader selects text inside `[data-highlight-root]`—including text that spans across multiple inline or block elements (e.g., across a link, `<strong>`, or two adjacent paragraphs)
- **When** the reader activates the **Highlight** control
- **Then** a cloned `Range` for the selection is added to the corresponding color's `Highlight` instance registered in `CSS.highlights`,
- **And** the browser renders the highlight background via the matching `::highlight(<name>)` CSS pseudo-element,
- **And** the inner HTML and DOM node structure of `[data-highlight-root]` remain completely unchanged (zero `<mark>` or `<span>` wrapper elements are injected).

### Scenario 3: Automatic Color Cycling on New Text Selection
- **Given** the highlighter is initialized with a configurable ordered palette of highlight colors (defaulting to at least 4 distinct WCAG-AA-compliant colors, e.g., Amber, Mint, Sky, Rose, Violet)
- **When** the reader makes an initial valid text selection inside `[data-highlight-root]`
- **Then** the active color starts at the first configured color (`index 0`),
- **When** the reader subsequently makes a **new** distinct valid text selection inside `[data-highlight-root]`
- **Then** the active highlight color automatically advances to the next color in the configured palette (`(index + 1) % colors.length`),
- **And** the toolbar's color swatch and accessible label immediately reflect the new color,
- **And** applying the highlight paints the newly selected range with the newly cycled color while preserving previously applied highlights in their original colors,
- **And** after reaching the last color in the palette, the next new selection wraps cleanly back to `index 0`.

### Scenario 4: Handling Empty, Whitespace-Only, and Out-of-Scope Selections
- **Given** a reader is viewing a page with `[data-highlight-root]`
- **When** the reader clears their selection (collapsed range), selects only whitespace characters, or selects text outside `[data-highlight-root]` (such as in `<Header />`, `<Footer />`, `<SeriesNav />`, CTA cards, or the homepage hero)
- **Or** the reader creates a selection that starts inside `[data-highlight-root]` and ends outside it (or vice versa)
- **Then** the floating highlight toolbar remains hidden (or dismisses if previously open),
- **And** no highlight is registered in `CSS.highlights`,
- **And** the color cycle index does not advance for invalid/empty selections.

### Scenario 5: Clearing Highlights and Keyboard Accessibility
- **Given** a reader has applied one or more highlights in the current reading session
- **When** the reader activates the **Clear** highlights control (accessible via pointer or keyboard)
- **Then** all registered ranges are removed from `CSS.highlights`,
- **And** the highlight count resets to `0` and the `aria-live="polite"` region announces that highlights were cleared,
- **And** pressing `Escape` while the floating toolbar is visible dismisses the toolbar without throwing errors,
- **And** all toolbar controls display visible focus rings (`focus-visible`) and respect `prefers-reduced-motion: reduce`.

### Scenario 6: Graceful Handling When CSS Custom Highlight API Is Unsupported
- **Given** a reader visits a content page in an environment where `CSS.highlights` or `window.Highlight` is unavailable (or JavaScript is disabled)
- **When** the page loads and the reader selects text
- **Then** no runtime errors are thrown,
- **And** the document HTML is never rewritten or mutated,
- **And** the floating highlight toolbar remains hidden so users are not presented with a broken control.

---

## Appendix A: Decision Log

| Branch | Decision Area | Choice Selected | Rationale & Trade-offs |
| :--- | :--- | :--- | :--- |
| **Branch 1 (Happy Path)** | Highlight Rendering Engine | Use the native W3C CSS Custom Highlight API (`CSS.highlights` + `Highlight` + `::highlight(...)`) as the rendering mechanism, with no DOM-rewriting fallback | Guarantees zero HTML mutation, supports cross-element `Range` selections cleanly without splitting text nodes or breaking Astro prose markup, and keeps client-side code minimal. Trade-off: older browsers lacking `CSS.highlights` gracefully hide the control rather than falling back to invasive DOM `<mark>` wrapping. |
| **Branch 2 (Boundaries)** | Intended Content Area Scoping | Scope highlighting strictly to prose reading containers marked with `data-highlight-root` in `PostLayout.astro`, `ProjectLayout.astro`, and `about.astro` | Keeps the feature focused on reading surfaces (articles, case studies, bio) and prevents accidental highlighting of navigation headers, hero ASCII canvas controls, cards, CTAs, or footers. |
| **Branch 3 (Interaction)** | Color Cycling Trigger & Configuration | Advance `colorIndex` once per finalized new distinct valid selection inside `[data-highlight-root]`, using a configurable `colors` array (defaulting to 5 high-contrast pastel tokens) passed as component props | Directly satisfies "cycles those highlights through a configurable set of background colors when new text is selected" while avoiding rapid color spinning during drag-selection micro-events (`selectionchange`). |
| **Branch 4 (Accessibility & UX)** | Control Placement & Persistence | Render a floating Graphite-styled `role="toolbar"` near the active selection (clamped to viewport) plus a subtle floating "Clear highlights" pill when highlights exist, with `pointerdown` `preventDefault()` and `aria-live="polite"` announcements | Floating toolbar stays out of the way until text is selected, preserves the active selection when clicked, and provides an always-reachable way to clear highlights even after deselecting text. |
