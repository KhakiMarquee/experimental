import { openDetail } from '/src/openDetail.js';
let allData = []; // will hold full JSON

function renderCarousel(data) {
  const carousel = document.querySelector("#carousel");
  if (!carousel) return;

  carousel.innerHTML = "";

  data.forEach(item => {
    const slide = document.createElement("div");
    slide.classList.add("slide");

    const slideInner = document.createElement("div");
    slideInner.classList.add("slide-inner");

    if (item.image) {
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.title || "";
      slideInner.appendChild(img);
    }

    const p = document.createElement("p");
    p.textContent = item.title || "";
    slideInner.appendChild(p);

    const span = document.createElement("span");
    span.classList.add("tooltip");
    span.title = "[more]";
    slide.appendChild(slideInner);
    slide.appendChild(span);
    carousel.appendChild(slide);

    slide.addEventListener("click", () => {
      openDetail(slide, item);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetch(`/data/stone.json`) 
    .then(res => res.json())
    .then(data => {
      allData = data; // save for filtering
      renderCarousel(allData);
    })
    .catch(err => console.error("Error loading stone data:", err));

  // Category buttons
  const buttons = document.querySelectorAll("#category-buttons button");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.category;

      if (category === "all") {
        renderCarousel(allData);
      } else {
        const filtered = allData.filter(item => item.category === category);
        renderCarousel(filtered);
      }
    });
  });
});