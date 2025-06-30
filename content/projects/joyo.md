---
title: "JOYO"
description: "How we built and launched JOYO from scratch in 6 months as the first studio-launched product at Aliveness Ventures."
draft: false
weight: 10
---

## Case Study

**JOYO** is an AI-powered leadership platform that delivers personalized coaching through curated programs and daily practices. Built in partnership with executive coaches and trusted by institutions like **MIT**, it empowers social self-discovery with measurable outcomes.

As **Fractional CTO** for this **<a href="https://aliveness.ventures" target="_blank" rel="noopener noreferrer">Aliveness Ventures</a>** studio launch, I designed and helped build the entire technology platform from zero to market-ready MVP in 6 months; delivering enterprise-grade architecture while keeping costs lean and speed high.

<div class="carousel-container">
  <div class="carousel-wrapper">
    <div class="carousel-slide active">
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
  </div>
  
  <button class="carousel-btn carousel-prev" onclick="changeSlide(-1)">&#10094;</button>
  <button class="carousel-btn carousel-next" onclick="changeSlide(1)">&#10095;</button>
  
  <div class="carousel-dots">
    <span class="dot active" onclick="currentSlide(1)"></span>
    <span class="dot" onclick="currentSlide(2)"></span>
    <span class="dot" onclick="currentSlide(3)"></span>
    <span class="dot" onclick="currentSlide(4)"></span>
  </div>
</div>

<style>
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
  height: 500px;
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

.carousel-btn:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.carousel-prev {
  left: 0;
}

.carousel-next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

.carousel-dots {
  text-align: center;
  padding: 20px 0;
  background: white;
}

.dot {
  height: 12px;
  width: 12px;
  margin: 0 5px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  cursor: pointer;
  transition: background-color 0.3s;
}

.dot.active, .dot:hover {
  background-color: #717171;
}

/* Responsive design */
@media (max-width: 768px) {
  .carousel-wrapper {
    height: 400px;
  }
  
  .carousel-btn {
    padding: 12px 16px;
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .carousel-wrapper {
    height: 300px;
  }
  
  .carousel-slide {
    padding: 10px;
  }
}
</style>

<script>
let slideIndex = 1;

function changeSlide(n) {
  showSlide(slideIndex += n);
}

function currentSlide(n) {
  showSlide(slideIndex = n);
}

function showSlide(n) {
  let slides = document.getElementsByClassName("carousel-slide");
  let dots = document.getElementsByClassName("dot");
  
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }
  
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }
  
  slides[slideIndex - 1].classList.add("active");
  dots[slideIndex - 1].classList.add("active");
}
</script>

## At-a-Glance

|                                      | **Result** |
|--------------------------------------|--------|
| **Time-to-MVP**                       | 6 months (idea to MVP validation) |
| **Runway saved vs hiring full-time CTO + team** | ~$450k |
| **Team**    | Engineering & Product Leadership, UX/UI Design, DevOps, Engineering, AI |
| **Compliance**                        | SOC 2 controls implemented from day 1 |
| **AI features**                       | AI powered micro-coaching, sentiment analysis, personalized nudges |

## Challenges JOYO Faced

1. **Zero internal engineering capacity.** The founding and advisory team consisted of domain experts in leadership science and go-to-market, but no technical team.
2. **Aggressive market validation milestones.** Goal to have a functional mobile product and validate market fit within six months.
3. **AI as table-stakes.** The market required modern, AI-powered coaching interactions without compromising user trust or data privacy.
4. **Budget constraints typical to early-stage startups.** Every dollar spent had to contribute directly to learning or growth.

## What I Delivered as Fractional CTO

### Product & Technical Strategy

- Translated the leadership-science vision into a phased technical roadmap aligning business milestones with engineering deliverables.
- Defined clear OKRs for **activation**, **retention**, and **coaching quality** metrics, enabling data-driven iteration for MVP validation.

### Architecture & Tech Stack

- Chose **Flutter** for cross-platform mobile development, reducing development costs significantly.
- Built with **Go** on **Google Cloud Platform**, enabling cost savings and automatic scaling.
- Implemented serverless event-driven architecture for AI inference workloads, minimizing operational costs.
- Adopted **PostgreSQL** with automated backups and high availability configurations.

### AI & Data

- Integrated **Vertex AI** for contextual micro-coaching prompts while maintaining strict data privacy standards.
- Built a feature store for sentiment and engagement signals feeding the personalization engine.
- Developed prompt-engineering and evaluation frameworks enabling content optimization without code changes.

### DevSecOps & Quality

- Set up Infrastructure as Code and **GitLab** CI/CD pipeline, enabling rapid builds and zero-downtime deployments.
- Instituted static analysis, unit and integration testing with high coverage standards.
- Implemented SOC 2 aligned logging, alerting, and vulnerability scanning from day one.

### Team Building & Leadership

- Recruited and managed a distributed team of senior engineers across frontend, backend, DevOps, and AI specializations.
- Established lightweight Agile process optimized for distributed team collaboration.
- Instituted practices for psychological safety and continuous improvement within the team environment.

### Stakeholder Support

- Provided technical leadership and strategic guidance to support business development efforts.
- Delivered executive-level reporting dashboards tracking development velocity and technical metrics.

## Outcome & Impact

- **Successfully built and deployed MVP** for market validation with positive user feedback from beta testing.
- Established technical foundation enabling enterprise pilot discussions through SOC 2 controls and flexible API integrations.
- Positioned JOYO with a defensible AI roadmap and scalable cloud architecture while maintaining lean operational costs.

> "In just half a year, we went from a slide-deck to a validated MVP with engaged users. Having a Fractional CTO who could both lead strategic thinking and technical execution was a game-changer."  

## Why This Matters To You as a Founder

A great Fractional CTO combines **strategic insight, hands-on delivery, and team orchestration** without the full-time price tag or equity dilution. If you need to:

1. Ship a market-ready MVP **fast**,
2. De-risk your tech choices while keeping future optionality,
3. Integrate AI features responsibly, and
4. Build (or level-up) an engineering team,

let's talk. I treat every engagement like my own startup: lean, data-driven, and laser-focused on product-market-fit.  

➡️ **<a href="https://calendar.app.google/rVk4MYXfZTu6VHdP9" target="_blank" rel="noopener noreferrer">Book a 30-minute call</a>** to explore whether Fractional CTO support is the growth lever your startup needs.
