---
id: "proposal:2026-11-25-project-case-study-for-evolve-don-t-include"
title: "Project Case Study: Evolve (Public-Safe Human Performance Platform)"
status: "draft"
tier: "standard"
created: "2026-11-25"
owner: "keolo"
parent: "none"
related: []
---

# Proposal: Project Case Study: Evolve (Public-Safe Human Performance Platform)

## Problem Statement

`keolo.com` currently features three project case studies (`global-peace-yes.md`, `joyo.md`, and `riiu.md`) showcasing Fractional CTO engagements across civic tech voting platforms, mobile AI micro-coaching, and livestream commerce [F1]. While these case studies illustrate early-stage venture studio execution, they leave a notable capability gap in demonstrating deep technical leadership across hardware/software convergence, real-time biosensing, and spatial computing [F2, F4]:

1. **Missing hardware/software convergence portfolio anchor**: Prospective founders of frontier AI, neurotechnology, and connected hardware startups require proof of leadership in complex low-level systems, high-frequency telemetry, and hardware validation [F2, F4].
2. **Confidentiality and IP protection constraints**: The raw engagement notes and diagnostic files for Evolve contain sensitive proprietary details—including names of individual founders and engineers, specific venture capital fundraising targets, internal Google Docs, JIRA backlog audits, and proprietary sensor defect logs—that must never be published to a public website [F3].
3. **Need for clear executive positioning**: Prospective clients hiring Keolo look for strategic technical leadership: platform architecture, sensor synchronization, Protobuf streaming contracts, build-versus-buy trade-offs, team leveling, and investor readiness, rather than routine hands-on coding [F2, F4].

## Hypothesis & Target Outcomes

Authoring and publishing an executive-grade, public-safe case study (`src/content/projects/evolve.md`) that articulates the technical architecture, leadership challenges, and positive outcomes of the Evolve closed-loop human performance platform—while strictly sanitizing all proprietary names, links, figures, and internal artifacts—will:

- Establish high-conviction executive authority in hardware/software systems architecture, real-time spatial computing (VR), and multimodal biosensing (EEG, PPG, eye tracking) [assumption: founders of frontier hardware/software startups prioritize demonstrated leadership in low-latency data pipelines and sensor synchronization when selecting a Fractional CTO].
- Enforce an airtight sanitization boundary that protects client confidentiality while clearly highlighting technical contributions, architecture diagrams, and leadership milestones [F3].
- Conform to the Astro Content Collection schema (`src/content.config.ts`), rendering static build-time Mermaid v13 Alpha SVG architecture diagrams with zero client-side JavaScript overhead [F1, F5].
- Automatically syndicate across the project catalog (`/projects/`), homepage project showcases (`/`), plain-text AI indexes (`/llms.txt`, `/llms-full.txt`), and structured metadata [F1].
- Provide a direct high-intent conversion funnel via the standard Fractional CTO consultation CTA ("Building something ambitious? Book a Call") [F1].

## Scope Tier & Boundaries

- **Tier**: `standard` (Full Mode — `proposal.md`, `spec.md`, `design.md`, `tasks.md`).
- **In Scope**:
  - Authoring `src/content/projects/evolve.md` following Astro Content Collection schema requirements.
  - Positioning the project around closed-loop neurotechnology and physiological training (multimodal biosensing headset with EEG, PPG, eye-tracking, and real-time VR adaptation).
  - Pre-rendering static Mermaid v13 Alpha diagrams for the closed-loop system architecture and Fractional CTO 30/60/90-day technical leadership roadmap.
  - Ensuring responsive presentation across desktop and mobile viewports within `ProjectLayout.astro` and portfolio listings.
  - Updating portfolio index pages (`src/pages/projects/index.astro`, `src/pages/index.astro`) to cleanly present the four-project catalog grid.
  - Verifying automated inclusion in `/llms.txt`, `/llms-full.txt`, and production build pipelines.
  - Automated test coverage in `src/lib/__tests__/site-build.test.ts`.
- **Non-Goals / Sanitization Boundary**:
  - Publishing personal names of internal staff, advisors, or candidates.
  - Disclosing specific fundraising amounts, balance sheet metrics, or investor valuation figures.
  - Linking to private Google Docs, internal JIRA tickets, Slack transcripts, or diagnostic PDFs.
  - Disclosing proprietary sensor firmware source code, unannounced pilot partner identities, or confidential defense/government procurement discussions.

## Domain Invariants & Constraints

- **Confidentiality / Sanitization Invariant**: All published prose and diagrams must describe technical architecture, methodology, and outcomes in public-safe, anonymized terms. No proprietary corporate artifacts or internal links may appear in the production bundle [F3].
- **Astro Content Schema Invariant**: `src/content/projects/evolve.md` must pass `astro check` and adhere strictly to `projects` collection schema (`title`, `description`, `draft`, `weight`, `tags`, optional `cover`, `gallery`) [F1].
- **Build-Time Mermaid v13 SVG Compilation**: All Mermaid diagrams must be valid v13 Alpha syntax and pre-render into static SVGs during build with zero browser-side JavaScript [F5].
- **WCAG AA Contrast & Typography**: Text, badges, and diagrams must adhere to Graphite design tokens and satisfy WCAG AA contrast ratios (≥ 4.5:1 for body copy, ≥ 3:1 for large headers) [F1].

## Evidence & Findings

- **[F1]** `src/content.config.ts` defines the `projects` collection with `glob({ pattern: '**/*.md', base: './src/content/projects' })`. Existing projects are `global-peace-yes.md` (weight 20), `joyo.md` (weight 10), and `riiu.md` (weight 30).
- **[F2]** The problem statement in `alv/changes/2026-11-25-project-case-study-for-evolve-don-t-include/spec.md` specifies: "Add project case study for Evolve. Don't include specifics since this go on a public website. Include positive outcomes. The target audience is for someone looking to hire or purchase services provided by Keolo."
- **[F3]** Raw engagement notes describe Evolve as a human performance platform using a multimodal biosensing headset (EEG, PPG, eye-tracking) and virtual reality to create closed-loop biofeedback. Notes contain internal team names, investor references, and Google Docs links that must be strictly quarantined from the public site.
- **[F4]** Core technical themes from the Fractional CTO engagement include: Protobuf contracts over WebSockets/Socket.IO, sensor concurrency resolution, UNIX epoch vs. LSL clock synchronization, operator web app frontend stability via downsampled telemetry, system observability, and engineering leadership transition roadmaps.
- **[F5]** `src/lib/mermaid.ts` and the Astro build pipeline compile all ` ```mermaid ` code blocks to DOM-free SVGs at build time using `mermaid@v13-alpha`.

## Success Metrics & Verification Plan

1. **Astro Schema & Build Health**: `astro check` and `astro build` pass with zero errors and zero warnings.
2. **Deterministic Sanitization Audit**: Automated grep / test assertions confirm zero occurrences of confidential names, external private doc links, or internal diagnostic references in `src/content/projects/evolve.md` and compiled site output.
3. **Diagram Build-Time Pre-rendering**: The closed-loop architecture diagram renders as an inline SVG without client-side Mermaid script dependencies.
4. **Discoverability & LLM Index Ingestion**: `/projects/evolve/` resolves with status 200, renders within the portfolio index grid, and is indexed in `/llms.txt` and `/llms-full.txt`.
5. **Quality Gates**: `alv gate check dor` passes all local criteria cleanly.
