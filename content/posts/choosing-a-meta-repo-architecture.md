---
title: 'Choosing a Meta-Repo Architecture'
date: 2026-08-15T05:16:53Z
draft: false
weight: 5
---
Ask ten engineers how to structure source code, and you will get eleven different answers. The debate between monorepos and multi-repos has run for over a decade. But when you are coordinating AI agent workflows, strict data compliance, and multi-tenant IP boundaries, both models show real cracks. That is why we settled on a third option: the meta-repo.

At [Aliveness Ventures](https://www.aliveness.ventures/), we build software in regulated environments where systems have to move quickly under strict compliance rules (HIPAA, GDPR, SOC 2). On top of that, our clients own their source code, infrastructure, and documentation from day one.

Here is why standard monorepos and multi-repos failed those constraints, and how a meta-repo architecture powers our work today.

---

## 1. The Monorepo: Centralized, but Porous

A monorepo puts frontend, backend, infrastructure, and documentation into a single repository. Companies like Google, Meta, and Uber built entire internal toolchains to make this scale.

**The promise:**
A single source of truth with atomic commits. When you change a backend API in Go, you can update the React web client, the native mobile app, and the Pulumi infrastructure in the same pull request. Dependency management stays centralized, and sharing code across projects is straightforward.

**The reality for us:**
A compliance breakdown. Under HIPAA, GDPR, and SOC 2, access control is non-negotiable.

Our clients require strict intellectual property isolation. They need dedicated source control where cleared personnel have access to specific repositories. In standard Git, enforcing directory-level read permissions inside a single repo is impossible. Mechanisms like GitHub's `CODEOWNERS` govern write approvals, but anyone with clone access can pull the entire history. Monorepos assume a unified corporate perimeter with high internal trust. In a multi-client consulting or venture model, repository boundaries are legal requirements.

---

## 2. The Multi-Repo: Isolated, but Fragmented

The multi-repo approach takes the opposite path: every service, frontend, and infrastructure module lives in its own Git repository.

**The promise:**
Clear isolation and clean access boundaries. Each repository has dedicated access controls, smaller clone footprints, and isolated CI pipelines.

**The reality for us:**
Pull request fragmentation. Implementing a single feature often requires four synchronized pull requests:
*   *Go backend:* Adding the API endpoint
*   *React web app:* Consuming the endpoint
*   *Pulumi IaC:* Provisioning the new database table
*   *OpenSpec docs:* Updating the behavioral specification

Keeping those pull requests synchronized without dedicated tooling is painful. Repositories drift out of alignment, documentation gets orphaned, and developers waste time tracking down cross-repo dependencies.

---

## 3. The Meta-Repo: Physical Isolation with Unified Workspaces

A meta-repo keeps the physical repository isolation of a multi-repo while restoring the local developer experience of a monorepo.

Instead of putting all code into one Git tree, a workspace manifest defines how independent repositories compose together locally. Tooling on top handles multi-repo checkouts, synchronizes pull requests, and validates dependencies, while Git continues to enforce access boundaries at the repository level.

This setup gives engineers atomic local workflows without violating client isolation or compliance mandates.

---

## The Aliveness Ventures Stack

Our day-to-day stack spans several specialized layers:

*   **Backend:** Go
*   **Frontend:** Astro (marketing site), React (web application), Swift / Kotlin / Flutter (native mobile)
*   **Infrastructure:** Pulumi for Infrastructure as Code
*   **Documentation:** Structured knowledge using [OpenSpec](https://openspec.dev/), [Diátaxis](https://diataxis.fr/), and [OKF](https://okf.md/)
*   **AI and Agents:** A dedicated `agent-skills` repository housing agent capabilities and prompt definitions
*   **Issue Tracking:** Linear as the source of truth for cross-repo work

### Workspace Tooling: The `av` CLI

A meta-repo setup requires automation to keep independent repos in sync. Because existing workspace managers did not fit our multi-client compliance structure, we built a dedicated CLI called `av`.

Here is what `av` handles across our workspaces:

1.  **Manifest-driven repo orchestration:** `av` parses workspace manifests to clone, update, and wire together the specific repositories an engineer needs based on their project assignment and clearance.
2.  **Cross-repo change detection:** If an engineer updates a Go API without adjusting dependent contracts in the React frontend or Pulumi definitions, `av` flags the missing changes before opening a pull request.
3.  **Documentation conformance checks:** It verifies that OpenSpec behavioral specs, Diátaxis guides, and OKF knowledge entries match the actual codebase state, preventing documentation drift.
4.  **Skill and eval validation:** For AI capabilities, `av` runs agent skill definitions in `agent-skills` against local evaluation suites to catch regressions before deployment.

### Managing Cross-Repo Work in Linear

Because a feature might touch three or four repositories, we anchor our `av` branches to **Linear** tickets. This links the Go backend PR, the infrastructure PR, and the documentation update under one tracking issue, giving the team a single view of feature readiness.

---

## Making the Trade-off

If you are a single product company with a unified codebase and no external compliance boundaries, a standard monorepo is often the right choice. If your services are truly decoupled and rarely share domain models, standard multi-repos work fine.

When you run polyglot stacks across strict compliance regimes (HIPAA, SOC 2, GDPR) and client IP boundaries, neither extreme works well on its own. A meta-repo with the right CLI orchestration delivers the security auditors need and the speed engineers expect.
