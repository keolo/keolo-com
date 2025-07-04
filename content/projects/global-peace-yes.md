---
title: "Global Peace Yes"
description: "Building the technical infrastructure for a modern peace movement aiming to mobilize one billion voices for global peace."
draft: false
weight: 20
showtoc: false
cover:
  image: "images/covers/global-peace-yes.png"
---
## Digital Platform for a Planetary Peace Movement

<a href="https://globalpeaceyes.org" target="_blank" rel="noopener noreferrer">Global Peace Yes</a> is a U.S-based NGO (Special Consultative Status at the U.N.) rallying one billion voices to "live with love over fear." As **Fractional CTO** I turned a bold vision into an operational, fraud-resistant voting platform.

<div class="carousel-container">
  <div class="carousel-wrapper">
    <div class="carousel-slide active">
      <img src="../gpy/home.png" alt="Global Peace Yes Homepage">
    </div>
    <div class="carousel-slide">
      <img src="../gpy/journey.png" alt="Journey">
    </div>
    <div class="carousel-slide">
      <img src="../gpy/prompt.png" alt="Prompt">
    </div>
    <div class="carousel-slide">
      <img src="../gpy/vote-submitted.png" alt="Vote Submitted">
    </div>
    <div class="carousel-slide">
      <img src="../gpy/web.png" alt="Web">
    </div>
  </div>
  
  <button class="carousel-btn carousel-prev" onclick="changeSlide(-1)">&#10094;</button>
  <button class="carousel-btn carousel-next" onclick="changeSlide(1)">&#10095;</button>
  
  <div class="carousel-dots">
    <span class="dot active" onclick="currentSlide(1)"></span>
    <span class="dot" onclick="currentSlide(2)"></span>
    <span class="dot" onclick="currentSlide(3)"></span>
    <span class="dot" onclick="currentSlide(4)"></span>
    <span class="dot" onclick="currentSlide(5)"></span>
  </div>
</div>

<style>
/* carousel styling unchanged */
.carousel-container {
  position: relative;
  max-width: 800px;
  margin: 2rem auto;
  background: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.carousel-wrapper {position: relative;height: 700px;display: flex;align-items: center;justify-content: center;}
.carousel-slide {display: none;width: 100%;height: 100%;padding: 20px;box-sizing: border-box;}
.carousel-slide.active {display: flex;align-items: center;justify-content: center;}
.carousel-slide img {max-width: 100%;max-height: 100%;object-fit: contain;border-radius: 4px;}
.carousel-btn {position: absolute;top: 50%;transform: translateY(-50%);background-color: rgba(0, 0, 0, 0.5);color: white;border: none;padding: 16px 20px;cursor: pointer;font-size: 18px;border-radius: 0 3px 3px 0;transition: background-color 0.3s;z-index: 1;}
.carousel-btn:hover {background-color: rgba(0,0,0,0.8);}
.carousel-prev {left: 0;}
.carousel-next {right: 0;border-radius: 3px 0 0 3px;}
.carousel-dots {text-align: center;padding: 20px 0;background: white;}
.dot {height: 12px;width: 12px;margin: 0 5px;background-color: #bbb;border-radius: 50%;display: inline-block;cursor: pointer;transition: background-color 0.3s;}
.dot.active, .dot:hover {background-color: #717171;}
@media (max-width: 768px) {.carousel-wrapper {height: 400px;} .carousel-btn {padding: 12px 16px;font-size: 16px;}}
@media (max-width: 480px) {.carousel-wrapper {height: 300px;} .carousel-slide {padding: 10px;}}
</style>

<script>
/* minimal JS to keep carousel functional */
let slideIndex = 1; showSlide(slideIndex);
function changeSlide(n){showSlide(slideIndex += n);}function currentSlide(n){showSlide(slideIndex = n);}function showSlide(n){const slides=document.getElementsByClassName("carousel-slide");const dots=document.getElementsByClassName("dot");if(n>slides.length){slideIndex=1}if(n<1){slideIndex=slides.length}for(let i=0;i<slides.length;i++){slides[i].classList.remove("active");}for(let i=0;i<dots.length;i++){dots[i].classList.remove("active");}slides[slideIndex-1].classList.add("active");dots[slideIndex-1].classList.add("active");}
</script>

---

## Challenge

Mobilise **one billion verified votes** for peace while protecting privacy, blocking fraud and earning public trust, on a nonprofit budget and an aggressive deadline.

```mermaid
graph TB
  subgraph "Mission"
    A1[1B Peace Votes]
    A2[Global Reach]
  end
  subgraph "Constraints"
    B1[Non-profit Budget]
    B2[12-Week Deadline]
    B3[Zero Fraud]
    B4[Privacy First]
  end
  style B1 fill:#ffcdd2
  style B2 fill:#ffcdd2
  style B3 fill:#ffcdd2
  style B4 fill:#ffcdd2
  style A1 fill:#c5e1a5
  style A2 fill:#c5e1a5
```

## Approach

```mermaid
graph LR
  T[Team Formation] --> A[Senior Engineers]
  T --> B[Designer]
  T --> C[DevOps]
  A & B & C --> D[Agile Sprints]
  D --> E[Security-First Arch]
  E --> F[Token Email Verify]
  E --> G[Duplicate Prevention]
  E --> H[SOC-2 Controls]
  D --> I[Serverless GCP]
  I --> J[Autoscale]
  I --> K[Cost Optimised]
  D --> L[Growth Loops]
  L --> M[Native Share API]
  L --> N[Live Counter]
  L --> O[Multi-lang UI]
  L --> P[Analytics]
  style T fill:#bbdefb
  style E fill:#ffcdd2
  style I fill:#c5e1a5
  style L fill:#fff9c4
```

I contributed as Fractional CTO:

1. **Lean team** – collaborated with engineers, designers and DevOps.
2. **Security-first architecture** – tokenised email verification, duplicate prevention and SOC-2-aligned infra.
3. **Serverless & open-source** – Firebase + GCP reduce cost, autoscale to any spike, and cut opex to zero.
4. **Growth loops built-in** – AI summarization, native share API, live counter, multi-language UI and analytics for rapid optimisation.

## Outcomes

- ✅ **MVP** live with 99.9% uptime.
- ✅ **Higher quality** and **100% mission-aligned** compared to dev agencies.
- ✅ **AI-powered**; summarization and community sentiment analysis.

## Stack

```mermaid
graph LR
  A[Flutter] --> B[Cross-Platform App]
  C[Go] --> D[High-Perf APIs]
  E[Firebase Auth/Firestore] --> F[Verification & Persistence]
  G[GCP Cloud Run] --> H[Flexible Backend]
  I[PostHog] --> J[Product Analytics]
  K[OpenTofu] --> L[IaC]
  style A fill:#bbdefb
  style C fill:#fff9c4
  style E fill:#d7ccc8
  style G fill:#c5e1a5
  style I fill:#e1f5fe
  style K fill:#ffccbc
```

## Ready to spark your movement?

A Fractional CTO delivers enterprise-grade execution without the payroll burden or equity dilution.

🗓️ **<a href="https://calendar.app.google/rVk4MYXfZTu6VHdP9" target="_blank" rel="noopener noreferrer">Book a free 30-min strategy call</a>** and turn purpose into product, fast.
