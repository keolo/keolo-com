---
title: "JOYO"
description: "How we built and launched JOYO from scratch in 6 months as the first studio-launched product at Aliveness Ventures."
draft: false
weight: 10
showtoc: false
cover:
  image: "images/covers/joyo.png"
---
## AI-powered leadership coaching platform

**<a href="https://joyo.chat" target="_blank" rel="noopener noreferrer">JOYO</a>** delivers personalised leadership development through AI-powered coaching, trusted by institutions like **MIT**. As **Fractional CTO** for **<a href="https://aliveness.ventures" target="_blank" rel="noopener noreferrer">Aliveness Ventures</a>**, I helped turn a slide-deck vision into a market-ready product in six months.

<div class="carousel-container">
  <div class="carousel-wrapper">
    <div class="carousel-slide active">
      <img src="../sign-in.png" alt="Sign In">
    </div>
    <div class="carousel-slide">
      <img src="../roadmap.png" alt="Roadmap">
    </div>
    <div class="carousel-slide">
      <img src="../onboarding.png" alt="Onboarding">
    </div>
    <div class="carousel-slide">
      <img src="../capture.png" alt="Capture">
    </div>
    <div class="carousel-slide">
      <img src="../reflection.png" alt="Reflection">
    </div>
    <div class="carousel-slide">
      <img src="../conversations.png" alt="Conversations">
    </div>
    <div class="carousel-slide">
      <img src="../convos.png" alt="Convos">
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
    <span class="dot" onclick="currentSlide(6)"></span>
    <span class="dot" onclick="currentSlide(7)"></span>
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
.carousel-wrapper {
  position: relative;
  height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.carousel-slide {
  display: none;
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}
.carousel-slide.active {
  display: flex;
  align-items: center;
  justify-content: center;
}
.carousel-slide img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 4px;
}
.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 16px 20px;
  cursor: pointer;
  font-size: 18px;
  border-radius: 0 3px 3px 0;
  transition: background-color 0.3s;
  z-index: 1;
}
.carousel-btn:hover {background-color: rgba(0,0,0,0.8);}
.carousel-prev {left: 0;}
.carousel-next {right: 0; border-radius: 3px 0 0 3px;}
.carousel-dots {text-align: center; padding: 20px 0; background: white;}
.dot {height: 12px; width: 12px; margin: 0 5px; background-color: #bbb; border-radius: 50%; display: inline-block; cursor: pointer; transition: background-color 0.3s;}
.dot.active, .dot:hover {background-color: #717171;}
@media (max-width: 768px) {.carousel-wrapper {height: 400px;} .carousel-btn {padding: 12px 16px; font-size: 16px;}}
@media (max-width: 480px) {.carousel-wrapper {height: 300px;} .carousel-slide {padding: 10px;}}
</style>

<script>
/* minimal JS to keep carousel functional */
let slideIndex = 1; showSlide(slideIndex);
function changeSlide(n){showSlide(slideIndex += n);}
function currentSlide(n){showSlide(slideIndex = n);}
function showSlide(n){
  const slides = document.getElementsByClassName("carousel-slide");
  const dots = document.getElementsByClassName("dot");
  if(n>slides.length){slideIndex=1} if(n<1){slideIndex=slides.length}
  for(let i=0;i<slides.length;i++){slides[i].classList.remove("active");}
  for(let i=0;i<dots.length;i++){dots[i].classList.remove("active");}
  slides[slideIndex-1].classList.add("active");
  dots[slideIndex-1].classList.add("active");
}
</script>

---

## Challenge

Starting with zero technical resources, JOYO needed to validate an AI-powered coaching platform in a competitive market—fast.

```mermaid
graph TB
  subgraph "Starting Point"
    A[Domain Experts] --> G[Mobile-First Platform]
    B[Leadership Science] --> H[AI Coaching]
    C[Go-to-Market] --> I[Enterprise Security]
    D[❌ No Tech Team]
    E[❌ 6-Month Deadline]
    F[❌ Lean Budget]

    style D fill:#ffcdd2
    style E fill:#ffcdd2
    style F fill:#ffcdd2
    style G fill:#c5e1a5
    style H fill:#c5e1a5
    style I fill:#c5e1a5
  end
```

## Approach

I stepped in as Fractional CTO to architect, hire and ship simultaneously:

1. **Team** – recruited senior engineers in 3 weeks.
2. **Architecture** – serverless, SOC 2-ready from day one.
3. **AI** – integrated Vertex AI for contextual micro-coaching.
4. **Process** – lightweight Agile with weekly demos and automated CI/CD.

```mermaid
timeline
  title 6-Month Sprint
  M1 : Strategy & Hiring
  M2 : Backend + Mobile Foundations
  M3 : AI & Security
  M4 : Feature Complete
  M5 : Beta Launch
  M6 : Market Release 🚀
```

## Outcome

- ✅ **6 months** from idea to public release.
- ✅ **$250k** saved versus in-house CTO & team.
- ✅ **SOC 2 controls** implemented day one; enterprise pilots secured.
- ✅ **>85%** positive feedback from beta users on coaching relevance.

## Stack

```mermaid
graph LR
  A[Flutter] --> B[iOS & Android]
  C[Go • Python • GCP] --> D[Flexible Infrastructure]
  E[PostgreSQL • Firestore] --> F[Persistent Data]
  G[Vertex AI] --> H[Personalised Coaching]
  I[OpenTofu] --> J[Infrastructure as Code]
  K[CI/CD] --> L[Automated Deploys]

    style A fill:#bbdefb
    style C fill:#fff9c4
    style E fill:#d7ccc8
    style G fill:#c5e1a5
    style I fill:#e1f5fe
    style K fill:#ffccbc
```

## Ready to accelerate?

A Fractional CTO gives you enterprise-level strategy and execution without the overhead. Ship faster, build responsibly, and engage your customers.

🗺️ **<a href="https://calendar.app.google/rVk4MYXfZTu6VHdP9" target="_blank" rel="noopener noreferrer">Book a complementary 30-min call</a>** to discuss your roadmap.
