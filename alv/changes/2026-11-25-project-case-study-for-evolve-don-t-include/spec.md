---
id: "spec:2026-11-25-project-case-study-for-evolve-don-t-include"
title: "Project Case Study: Evolve (Public-Safe Human Performance Platform)"
status: "draft"
tier: "standard"
created: "2026-11-25"
owner: "keolo"
parent: "none"
related: []
---

# Behavioral Specification: Project Case Study: Evolve (Public-Safe Human Performance Platform)

## Overview

This specification defines the observable behaviors, content requirements, and sanitization boundaries for publishing the Evolve project case study on `keolo.com`. The case study articulates Keolo's role as Fractional CTO and systems software advisor for an advanced human performance platform that pairs multimodal biosensing headsets (EEG, PPG, eye tracking) with virtual reality (VR) to create closed-loop biofeedback training environments.

The case study is authored in `src/content/projects/evolve.md` following Astro Content Collections, adheres to the Graphite visual design system, renders static build-time Mermaid v13 Alpha architecture diagrams, and enforces a strict sanitization boundary prohibiting the leakage of proprietary client identities, internal documents, fundraising specifics, or confidential defect logs.

---

## Requirements & Scenarios

### Scenario 1: Case Study Content Rendering & Astro Schema Conformance
- **Given** the case study file `src/content/projects/evolve.md` exists with valid Astro Content Collection frontmatter (`title: 'Evolve'`, `description: '...'`, `weight: 15`, `draft: false`, `tags: [...]`)
- **When** the Astro site executes `astro build` or renders in local development
- **Then** the route `/projects/evolve/` is generated and rendered through `src/layouts/ProjectLayout.astro`,
- **And** the page presents a clear executive narrative detailing the Challenge, Architecture & Approach, Stack, and Measurable Outcomes,
- **And** the page passes `astro check` with zero schema validation errors.

### Scenario 2: Public-Safe Sanitization & Confidentiality Invariant
- **Given** the raw notes contain confidential stakeholder names, private document links, and exact fundraising totals
- **When** the published case study `src/content/projects/evolve.md` and compiled HTML assets are inspected
- **Then** zero occurrences of private internal employee names, personal email addresses, or unannounced corporate entities appear,
- **And** zero links to internal Google Docs, private JIRA boards, or proprietary diagnostic PDFs exist,
- **And** zero confidential fundraising amounts or valuation metrics are published,
- **And** all technical architecture discussions describe system patterns (Protobuf streaming contracts, clock synchronization, telemetry buffering, team leveling) in generalizable, public-safe terms.

### Scenario 3: Build-Time Closed-Loop Biosensing Architecture Diagram Compilation
- **Given** `src/content/projects/evolve.md` contains fenced ` ```mermaid ` code blocks illustrating the multimodal closed-loop streaming pipeline and Fractional CTO leadership milestones
- **When** the Astro build runs in local development or production CI/CD
- **Then** all Mermaid blocks are compiled at build time by `mermaid@v13-alpha` into accessible `<svg>` elements embedded directly in the HTML document,
- **And** zero client-side Mermaid JavaScript dependencies are sent to the client browser,
- **And** the diagrams render responsively on both mobile viewports (375px) and wide desktop displays.

### Scenario 4: Portfolio Catalog Discovery & Structured Index Syndication
- **Given** the Evolve case study is published (`draft: false`, `weight: 15`)
- **When** a visitor navigates to `/projects/` or the homepage `/`
- **Then** Evolve appears in the project showcase grid with its title, concise executive summary, and direct link to `/projects/evolve/`,
- **And** the `/llms.txt` and `/llms-full.txt` endpoints dynamically discover and include Evolve's summary and complete prose for LLM crawlers,
- **And** the page includes valid OpenGraph, Twitter card, and JSON-LD structured metadata.

### Scenario 5: Fractional CTO Value Proposition & High-Stakes Conversion CTA
- **Given** a prospective startup founder, enterprise executive, or investor reviews `/projects/evolve/`
- **When** they scroll through the case study to the bottom of the page
- **Then** the page highlights executive outcomes (sub-millisecond multimodal sensor synchronization, zero-downtime pilot readiness, scalable team topology, transition roadmap),
- **And** the terminal call-to-action banner renders with a direct scheduling link ("Book a Call") anchoring to Keolo's Google Calendar scheduler.

### Scenario 6: Quality Gates & Automated Verification
- **Given** the change files are staged in the workspace
- **When** an engineer executes `alv gate check dor alv/changes/2026-11-25-project-case-study-for-evolve-don-t-include`
- **Then** the gate verification engine evaluates all deterministic Layer 1, 2, and 3 criteria (intent proposal, behavioral scenarios, technical design, decision log, evidence coverage, graph links) and returns status `[PASS]`.

---

## Appendix A: Decision Log

| Decision Branch | Context & Problem | Selected Option & Decision | Consequences & Rationale |
| :--- | :--- | :--- | :--- |
| **Branch 1 (Scope & Positioning)** | Raw diagnostic notes contain sensitive personnel, financial, and product defect information unsuitable for public dissemination. | Anonymize team and corporate specifics; frame narrative strictly around executive Fractional CTO systems leadership, sensor architecture, and positive outcomes. | Protects client IP and contractual confidentiality while maximizing commercial credibility for founders seeking tech leadership for high-stakes deep-tech products. |
| **Branch 2 (Architecture Storytelling)** | Complex multimodal biosensing (EEG, PPG, eye tracking -> Unity VR -> Operator web app) requires intuitive visual communication without runtime overhead. | Pre-render static Mermaid v13 Alpha flowcharts and timelines at build time inside `evolve.md`. | Eliminates browser-side diagram parsing/layout shifts, ensures diagrams render for LLM scrapers, and visually communicates deep systems thinking. |
| **Branch 3 (Asset Fallback & Layout Resilience)** | Evolve is in pre-commercial pilot stages and lacks public high-res product photography; missing assets could cause broken images or empty carousel wrappers. | Configure `ProjectLayout.astro` and collection schema to gracefully omit the carousel when `gallery` is empty, using clean typography, badges, and inline SVG diagrams as primary visuals. | Prevents empty layout shifts or missing image 404 errors, maintaining pristine visual polish and WCAG AA contrast on both dark and light modes. |
| **Branch 4 (Quality & Verification)** | Automated verification is required to guarantee zero confidential data leakage and maintain high code quality across Astro and ALV gates. | Implement automated test assertions in `src/lib/__tests__/site-build.test.ts` validating sanitization rules, schema validity, and run `alv gate check dor`. | Provides automated regression protection so future site updates cannot leak confidential notes or break Content Collection validation. |
