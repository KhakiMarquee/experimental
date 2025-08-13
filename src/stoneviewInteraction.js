import { openDetail } from '/src/openDetail.js';

//RENDER STONEVIEW

document.addEventListener("DOMContentLoaded", () => {
    console.log("Fetching:", `data/stone.json`);
  fetch(`/data/stone.json`) 
    .then(res => res.json())
    .then(data => {
      const carousel = document.querySelector("#carousel");
      if (!carousel) {
        console.error("Carousel element not found");
        return;
      }

      // Clear existing content
      carousel.innerHTML = "";

      data.forEach(item => {
        // Create .slide
        const slide = document.createElement("div");
        slide.classList.add("slide");

        // Create .slide-inner
        const slideInner = document.createElement("div");
        slideInner.classList.add("slide-inner");

        // Create image
        const img = document.createElement("img");
        img.src = item.image || "";
        img.alt = item.title || "";

        // Create title paragraph
        const p = document.createElement("p");
        p.textContent = item.title || "";

        // Build structure
        slideInner.appendChild(img);
        slideInner.appendChild(p);
        slide.appendChild(slideInner);
        carousel.appendChild(slide);

        // Click animation trigger
        slide.addEventListener("click", () => {
          openDetail(slide, item);
        });
      });
    })
    .catch(err => {
      console.error("Error loading stone data:", err);
    });
});



