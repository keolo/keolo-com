---
title: "Planned vs. Unplanned Work in Agentic Development"
draft: false
weight: 1
description: "AI agents make writing code nearly instant, moving the bottleneck to intent and verification. Here is how to structure planned capabilities, fit-and-finish polish, and escalation boundaries in an AI-native SDLC."
tags: ["AI", "Software Engineering", "Product Engineering System", "AI SDLC", "Engineering Leadership"]
---

For decades, writing syntax was the slowest part of software engineering. Every ritual—sprint planning, estimation, architectural reviews, and QA cycles—was calibrated around the weeks it took humans to type and wire up code.

AI coding agents changed that almost overnight. What once took three days of typing can now be generated, refactored, and passed through unit tests in fifteen minutes.

It feels like pure leverage. But as Eliyahu Goldratt noted in *The Goal*: **if you 100x the throughput of one stage in a pipeline without restructuring the rest, you don't speed up the system. You just pile up inventory in front of the next bottleneck.**

Today, that inventory is unreviewed code. Agents generate pull requests far faster than teams can decide what they want, and far faster than humans can safely review, verify, and release them.

```mermaid
flowchart LR
    UP["<b>Upstream Constraint</b><br/>Deciding What to Build<br/><i>Intent & Behavioral Specs</i>"] --> BUILD["<b>Compressed Build</b><br/>Agentic Generation<br/><i>Minutes instead of Days</i>"]
    BUILD --> DOWN["<b>Downstream Constraint</b><br/>Verification & Release<br/><i>Tests, Evals & Gates</i>"]
    
    style BUILD fill:#e1f5fe,stroke:#0288d1,stroke-width:2px
    style UP fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style DOWN fill:#ffebee,stroke:#d32f2f,stroke-width:2px
```

To deliver reliably with agents, engineering teams must draw a clean, enforceable line between **Planned Work** and **Unplanned Work**.

| Dimension | Planned Work | Unplanned Work (Fit & Finish) |
| :--- | :--- | :--- |
| **Purpose** | Deliberate capability expansion | Localized bug fixes, edge cases & UX polish |
| **Trigger** | Roadmap intent, customer problem | Testing the live branch post-build |
| **Permitted Tiers** | Standard Tier & Major Tier | Micro Tier only (`tier: micro`) |
| **Artifacts** | `proposal.md`, `spec.md`, `design.md`, `tasks.md` | Failing test (logic) or bounded diff (UI) |
| **Quality Gate** | Formal DoR before code; DoD before merge | Targeted regression test / PR diff review |

---

## Planned Work: From Intent to Verified Software

Planned work is the systematic transformation of product intent into verified software. When agents write the code, planning is where engineering leverage actually lives.

```mermaid
flowchart TD
    Intent["1. Capture Intent & Boundaries<br/><code>proposal.md</code>"] --> Specs["2. Behavioral Spec & Architecture<br/><code>spec.md</code> + <code>design.md</code>"]
    Specs --> DoR{"Definition of Ready (DoR)<br/>Gate Pass"}
    DoR --> Tasks["3. Vertical Task DAG<br/><code>tasks.md</code>"]
    Tasks --> Build["4. Sandboxed TDD Execution<br/>Isolated Worktrees / Flags"]
    Build --> DoD{"Definition of Done (DoD)<br/>Gate Pass"}
    DoD --> Learn["5. Telemetry & Invariants<br/>Open Knowledge Format (OKF)"]
```

### 1. No Spec Means No Code
If you hand an agent a vague ticket, it won't ask clarifying questions. It hallucinates plausible assumptions and writes hundreds of lines of working code that solves the wrong problem.

If a feature cannot be specified with verifiable scenarios, it is not ready for an agent. Upstream work must first define:
- Problem statements, target users, and explicit non-goals (`proposal.md`).
- Behavioral contracts with verifiable Given/When/Then scenarios using standards like [OpenSpec](https://openspec.dev/).

### 2. Executable Acceptance Contracts
Acceptance criteria are not informal bullet points. They are executable contracts that direct the agent's test harness:

```markdown
### Requirement: Idempotent Payment Settlement
The billing engine SHALL settle authorization holds idempotently within 72 hours.

#### Scenario: Duplicate webhook receipt
- GIVEN an authorized transaction hold with ID `tx_123`
- WHEN the settlement webhook is received multiple times with identical payload
- THEN the system SHALL execute the ledger entry exactly once
- AND return HTTP 200 with the original settlement timestamp
```

The agent converts these scenarios directly into red-green test suites during build, preventing speculative refactors.

### 3. Progressive Rigor for Planned Changes
Not every planned feature needs the same artifact overhead. Scale ceremony to blast radius:

- **Standard Tier (`tier: standard`)**: New endpoints, database migrations, state machine changes. Requires `proposal.md`, `spec.md`, `design.md`, `tasks.md`, and bifurcated review (spec approved before code is written).
- **Major Tier (`tier: major`)**: Multi-system overhauls, billing redesigns, cross-repo contracts. Full PRD, research evidence, domain modeling, Decision Records, and architecture review.

### 4. Enforcement Gates: DoR and DoD
- **Definition of Ready (DoR)**: Protects the build step. Code generation is blocked until proposal, specs, design, and task slices clear peer critique.
- **Definition of Done (DoD)**: Protects trunk. Code does not merge until all scenario tests pass, linters run clean, dark feature flags isolate incomplete features, and decisions are recorded.

---

## Unplanned Work: Fit and Finish

In traditional agile setups, unplanned work was often a catch-all bucket for fire drills and scope creep. In an agentic SDLC, unplanned work has a specific, legitimate role:

> **Unplanned work consists exclusively of localized bug fixes, edge-case remediation, and post-build fit-and-finish polish on an already specified work item.**

### The Reality of Fit and Finish
You spec a feature, an agent builds it in a clean worktree, all tests pass, and DoR/DoD are satisfied. Then you pull the branch, run it locally, and start clicking around.

Empirical reality surfaces friction that no design document could foresee:
- An empty state shows blank space instead of an onboarding prompt.
- An error toast says `Error: 422` instead of identifying the invalid field.
- A button tooltip clips off-screen on smaller viewports.
- A currency input fails when pasting values containing whitespace or symbols.

This is not a failure of planning. Software is empirical. Experiencing the tangible product reveals ergonomic gaps and boundary conditions. This last-mile polish—the **fit and finish**—is the true domain of unplanned work.

```mermaid
flowchart TD
    Build["Planned Vertical Slice Implemented"] --> Inspect{"Human & Telemetry Inspection<br/><b>Fit-and-Finish Polish</b>"}
    
    Inspect -->|Micro Tier: Cosmetic / Edge Case| Polish["Deterministic Verification<br/>(Failing test or bounded diff)"]
    Polish --> Merge["Atomic Micro-PR into Trunk"]

    Inspect -->|Standard+ Tier: Schema / State / API| Breaker["🚨 Escalation Circuit Breaker"]
    Breaker --> Escalate["Eject to Planned Work Backlog<br/>(proposal.md + spec.md + DoR)"]

    style Breaker fill:#ffebee,stroke:#d32f2f,stroke-width:2px
    style Polish fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
```

### Does Unplanned Work Need Specs?
Teams often fall into two traps with post-build polish:
1. **The Bureaucracy Trap**: Requiring a full `proposal.md`, `spec.md`, and task DAG to fix 8px of padding or handle a null value. Developers will simply bypass the process.
2. **The Prompt-and-Pray Trap**: Giving an agent loose prompts like *"make this look cleaner."* Without constraints, models hallucinate new dependencies, rewrite shared styles, and trigger regressions.

**Unplanned work does not need a spec document; it needs a deterministic verification anchor:**

- **For Logic & Edge-Case Bugs: The Test is the Spec.** Point the agent to the failing condition, have it write a minimal red-green test reproducing the bug, make it pass with the smallest possible diff, and append the scenario to the parent spec.
- **For Visual & Ergonomic Polish: Bounded Context & Diff Review.** Restrict the agent's context strictly to the single component, provide an explicit declarative prompt (e.g., *"In `PaymentSheet.tsx`, replace the blank container with `<EmptyState>` and center the button"*), and inspect the git diff directly. If the diff touches outside files, reject it.

### The Iron Rule: Unplanned Work is Exclusively Micro-Tier
**If work is Standard Tier or above, it cannot be unplanned.**

- **Micro Tier (`tier: micro`)**: Localized fixes, cosmetic tweaks, edge-case tests. The **only** tier permitted as unplanned work.
- **Standard Tier (`tier: standard`)**: Schema migrations, new endpoints, state transitions, security changes.
- **Major Tier (`tier: major`)**: Cross-boundary architecture, core system rewrites.

The moment an unplanned discovery touches a database schema, alters a public API, or changes a state machine, **it is no longer fit-and-finish polish. It is an architectural change.**

### The Escalation Circuit Breaker
When investigating a minor edge case reveals that the underlying data model or auth flow is flawed, **never let an agent patch structural flaws through ad-hoc chat prompts.**

```
[Unplanned Fit & Finish]
           │
           ▼
Touches database schemas, API contracts,
state transitions, or security rules?
           │
   ┌───────┴───────┐
  YES              NO
   │               │
   ▼               ▼
[🚨 Circuit Breaker]   [TDD Micro-Fix]
Eject to Planned Work   Merge to Trunk
```

When the circuit breaker trips:
1. **Stop Implementation**: Halt ad-hoc prompting in the active worktree.
2. **Eject to the Backlog**: File a new **Standard Tier** item in the planned backlog.
3. **Plan Before Coding**: Author the proposal and spec, resolve technical design, and clear the DoR gate before writing code.

---

## Operating Principles for Agentic Delivery

1. **Verification is the Scarce Resource**: Code generation is cheap; confidence is expensive. Test harnesses, contract checkers, and evaluation suites are your primary engineering assets.
2. **Bifurcate the Review Seam**: Review specifications before reviewing code. Decoupling spec sign-off from diff inspection stops engineers from debating product requirements inside a 600-line pull request.
3. **Protect Trunk with Dark Feature Flags**: Agents ship small vertical slices. Merge frequently to trunk behind dark flags (`flag:checkout_v2: false`) to avoid merge debt while keeping deployment decoupled from release.
4. **Humans Own Outcomes**: Agents propose specs, write tests, generate code, and diagnose failures. Humans verify gates, approve releases, and remain accountable for production.

---

## The Cultural Shift

Adopting an agentic SDLC is a workflow transformation, not a tooling upgrade.

Traditional engineering culture celebrated the developer who typed thousands of lines of un-specced code. In an agentic organization, that developer creates review bottlenecks and technical debt.

The high-leverage engineer is the one who clarifies intent, crafts unambiguous behavioral specifications, establishes strict verification guardrails, and knows exactly when to polish the fit-and-finish—and when to hit the circuit breaker.
