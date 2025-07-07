---
title: "Riiu"
description: "Low-code livestream commerce platform delivering off-price luxury goods with same-day delivery, built in two months."
draft: false
weight: 30
showtoc: false
cover:
  image: "images/covers/riiu.png"
---
## Livestream commerce, same-day delivery

**Riiu** turned pandemic-era bargain hunting into an engaging live shopping experience. Viewers joined livestreams, claimed luxury items in real-time, and received them at their door before the day ended.

<div class="carousel-container">
  <div class="carousel-wrapper">
    <div class="carousel-slide active">
      <img src="../riiu/1.jpeg" alt="Livestream Shopping">
    </div>
    <div class="carousel-slide">
      <img src="../riiu/2.jpeg" alt="Product View">
    </div>
    <div class="carousel-slide">
      <img src="../riiu/3.jpeg" alt="Checkout Flow">
    </div>
    <div class="carousel-slide">
      <img src="../riiu/4.jpeg" alt="Delivery Tracking">
    </div>
    <div class="carousel-slide">
      <img src="../riiu/5.jpeg" alt="Operations Dashboard">
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
