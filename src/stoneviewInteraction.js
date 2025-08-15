import { openDetail } from '/src/openDetail.js';

const isMobile = () =>
  (('ontouchstart' in window) || navigator.maxTouchPoints > 0) &&
  window.innerWidth <= 768;

//RENDER STONEVIEW

document.addEventListener("DOMContentLoaded", () => {
    console.log("Fetching:", `data/stone.json`);
  fetch(`/data/stone.json`) 
    .then(res => res.json())
    .then(data => {

     // ✅ store globally so you can inspect it in DevTools
      window.stoneData = data;
      console.log("[stoneData] loaded", Array.isArray(window.stoneData), window.stoneData?.length);

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

        //Create tooltip
        const span = document.createElement("span");
        span.classList.add("tooltip");
        span.title = "[TAP]";

        // Build structure
        slideInner.appendChild(img);
        slideInner.appendChild(p);
        slide.appendChild(slideInner);
        slide.appendChild(span);
        carousel.appendChild(slide);

        // Click animation trigger
        // 🔒 Desktop keeps click-to-open exactly as before
        if (!isMobile()) {
          slide.addEventListener("click", () => openDetail(slide, item));
        } else {
          // 📱 Mobile uses double-tap to open (single tap does nothing)
          setupSingleTap(slide, item);
        }
      });
    })
    .catch(err => {
      console.error("Error loading stone data:", err);
    });
});


// Small helper just for mobile
function setupSingleTap(slide, item) {
  const TAP_MOVE_TOL = 8; // px movement allowed to still count as a tap
  let startX = 0, startY = 0;
  let moved = false;

  slide.addEventListener("touchstart", (e) => {
    const t = e.changedTouches[0];
    startX = t.clientX;
    startY = t.clientY;
    moved = false;
  }, { passive: true });

  slide.addEventListener("touchmove", (e) => {
    const t = e.touches[0];
    if (!t) return;
    if (Math.hypot(t.clientX - startX, t.clientY - startY) > TAP_MOVE_TOL) {
      moved = true;
    }
    // passive: true so scrolling isn't blocked unless your carousel stops it
  }, { passive: true });

  slide.addEventListener("touchend", () => {
    if (!moved) {
      openDetail(slide, item);
    }
  });
}