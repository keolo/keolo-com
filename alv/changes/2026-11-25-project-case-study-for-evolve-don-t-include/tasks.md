---
id: "tasks:2026-11-25-project-case-study-for-evolve-don-t-include"
title: "Tasks: Project Case Study: Evolve"
status: "draft"
tier: "standard"
created: "2026-11-25"
owner: "keolo"
parent: "none"
related: []
---

# Execution Tasks: Project Case Study: Evolve

## Task T1: Author Public-Safe Case Study Content (`src/content/projects/evolve.md`)

```yaml
status: COMPLETED
blocked_by: []
blocks: [T2, T3, T4]
```

- **Spec Scenarios**: Scenario 1, Scenario 2, Scenario 3, Scenario 5
- **Description**:
  Create `src/content/projects/evolve.md` adhering to the `projects` Content Collection schema. Position Keolo as Fractional CTO and systems software advisor for Evolve. Formulate the technical narrative across Challenge, Approach, Architecture, Stack, and Outcomes without disclosing confidential team names, private links, or fundraising specifics. Include build-time Mermaid v13 Alpha diagrams for the closed-loop streaming pipeline and Fractional CTO leadership timeline.
### Acceptance Criteria
  - [x] `src/content/projects/evolve.md` exists with valid Astro Content Collection frontmatter (`title: 'Evolve'`, `weight: 15`, `draft: false`).
  - [x] Narrative highlights high-concurrency sensor streaming, Protobuf contracts, clock synchronization, operator UI buffering, and team leadership.
  - [x] Strict sanitization enforced: zero confidential employee names, private doc URLs, or specific valuation numbers.
  - [x] All Mermaid code blocks compile to static SVGs without build errors.

## Task T2: Optimize Portfolio Catalog & Responsive Grid Layouts

```yaml
status: COMPLETED
blocked_by: [T1]
blocks: [T3, T4]
```

- **Spec Scenarios**: Scenario 1, Scenario 4
- **Description**:
  Ensure the four project case studies (`JOYO`, `Evolve`, `Global Peace Yes`, `Riiu`) render cleanly in `src/pages/projects/index.astro` and `src/pages/index.astro`. Adjust grid layout classes if necessary to ensure balanced card distribution on mobile, tablet, and desktop viewports. Ensure cover image handling degrades gracefully when no external image is supplied.
### Acceptance Criteria
  - [x] `/projects/` renders all four case studies in a balanced, responsive grid.
  - [x] Homepage `/` displays Evolve alongside other featured portfolio case studies.
  - [x] Layout renders cleanly without layout shift or broken asset placeholders.

## Task T3: Validate AI Index Ingestion & Metadata Syndication

```yaml
status: COMPLETED
blocked_by: [T1, T2]
blocks: [T4]
```

- **Spec Scenarios**: Scenario 4, Scenario 5
- **Description**:
  Verify `/llms.txt` and `/llms-full.txt` dynamically incorporate Evolve's summary and full prose content. Verify OpenGraph, Twitter, and JSON-LD structured data generate correct schema attributes for `/projects/evolve/`.
### Acceptance Criteria
  - [x] `/llms.txt` includes Evolve entry with description and link.
  - [x] `/llms-full.txt` embeds the full Markdown body of the Evolve case study.
  - [x] Structured metadata includes valid title, description, and canonical URL.

## Task T4: Automated Test Coverage & Quality Gate Verification

```yaml
status: COMPLETED
blocked_by: [T1, T2, T3]
blocks: []
```

- **Spec Scenarios**: Scenario 2, Scenario 6
- **Description**:
  Add automated test assertions in `src/lib/__tests__/site-build.test.ts` verifying Evolve case study presence, Astro schema validity, and deterministic absence of sensitive client strings. Run `alv gate check dor` to confirm full Definition of Ready conformance.
### Acceptance Criteria
  - [x] Automated tests assert zero occurrences of confidential strings in project content.
  - [x] `astro check` and `astro build` complete with zero errors.
  - [x] `alv gate check dor alv/changes/2026-11-25-project-case-study-for-evolve-don-t-include` passes all local specification gates.
