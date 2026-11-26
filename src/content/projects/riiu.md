---
title: 'Riiu'
description: 'Low-code livestream commerce platform delivering off-price luxury goods with same-day delivery, built in two months.'
draft: false
weight: 30
showtoc: false
cover:
  image: 'images/covers/riiu.png'
gallery:
  - src: '/images/projects/riiu/1.jpeg'
    alt: 'Livestream Shopping'
  - src: '/images/projects/riiu/2.jpeg'
    alt: 'Product View'
  - src: '/images/projects/riiu/3.jpeg'
    alt: 'Checkout Flow'
  - src: '/images/projects/riiu/4.jpeg'
    alt: 'Delivery Tracking'
  - src: '/images/projects/riiu/5.jpeg'
    alt: 'Operations Dashboard'
---

## Livestream commerce, same-day delivery

**Riiu** turned pandemic-era bargain hunting into an engaging live shopping experience. Viewers joined livestreams, claimed luxury items in real-time, and received them at their door before the day ended.

---

## Challenge

Stitch an end-to-end commerce stack without writing a monolith. Marketing, SMS alerts, live sales, payments, and courier dispatch all working in harmony.

```mermaid
graph TB
  A[Instagram Stories] --> B[Website Real-time Claims]
  B --> C[Payments]
  C --> D[Same-Day Delivery]
  subgraph Constraints
    E[2-Month MVP]
    F[No Full-time Engineers]
    G[Zero Downtime]
  end
  style E fill:#ffcdd2
  style F fill:#ffcdd2
  style G fill:#ffcdd2
```

## Approach

1. **Low-code spine** – glued together best-of-breed SaaS via webhooks and serverless functions.
2. **Livescale** powered live video and inventory countdown on stream.
3. **Shopify** managed catalog & payments; **Shipstation** auto-printed labels.
4. **Twilio + Customer.io** pushed claim confirmations and delivery ETAs via SMS.
5. **Front** gave support agents instant context on every order.

```mermaid
timeline
  title 8-Week Build
  W1 : Workflow Mapping
  W2 : API Integrations
  W3 : Live Demo
  W4 : Payment & Logistics
  W5 : Internal Ops Tools
  W6 : Beta Stream
  W7 : Feedback Iteration
  W8 : Public Launch 🚀
```

## Outcome

- 🚀 **Speed to market** – concept to revenue in **60 days**.
- 💸 **Revenue-positive** from first week of broadcasts.
- 🙌 **98% positive feedback** on checkout speed and delivery reliability.

## Stack

```mermaid
graph LR
  IG[Instagram Stories] --> LS[Website Livestream]
  LS --> SH[Shopify]
  SH --> SS[Shipstation]
  SH --> T[Twilio SMS]
  T --> CIO[Customer.io]
  SH --> F[Front Support]
  SH --> WF[Webflow Landing]
  style IG fill:#e1f5fe
  style LS fill:#c5e1a5
  style SH fill:#fff9c4
  style SS fill:#bbdefb
  style T fill:#ffcdd2
  style CIO fill:#c5cae9
  style F fill:#d7ccc8
  style WF fill:#ffccbc
```

## Want similar impact?

Fractional CTO engagement lets you ship faster without the full-time overhead.

📅 **[Book a free 30-min call](https://calendar.app.google/rVk4MYXfZTu6VHdP9)** to explore your roadmap.
