import { openTemplateDetail } from "/src/openTemplateDetail.js";

export function createMoodboard(container, items) {
  if (!container) {
    console.error("❌ Moodboard: container not found");
    return;
  }

  // Clear existing content
  container.innerHTML = "";

  // Create a wrapper for horizontal scrolling
  const scroller = document.createElement("div");
  scroller.classList.add("moodboard-scroller");

  // Add each image
  items.forEach(entry => {
    const img = document.createElement("img");
    img.src = entry.image;
    img.alt = entry.title || "Moodboard image";
    img.classList.add("moodboard-image");

    // ✅ Make each image clickable
    img.addEventListener("click", () => {
      openTemplateDetail(img, entry);
    });

    scroller.appendChild(img);
  });

  container.appendChild(scroller);
}