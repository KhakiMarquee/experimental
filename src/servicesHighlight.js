export function initServiceHighlight() {
  function highlightFromHash() {
    const currentId = window.location.hash.replace("#", "").trim();
    if (!currentId) return;

    // reset all images
    document.querySelectorAll(".pitch-items img, .service-items img").forEach((img) => {
      img.classList.remove("active");
    });

    // highlight matching pitch images
    document.querySelectorAll(`#${CSS.escape(currentId)}.pitch-items img, .pitch-items #${CSS.escape(currentId)} img`)
      .forEach((img) => img.classList.add("active"));

    // Loop through service-items
    document.querySelectorAll(".service-items").forEach(service => {
      const header = service.querySelector("h1");
      if (header && header.textContent.trim().toLowerCase() === currentId) {
        const img = service.querySelector("img");
        if (img) img.classList.add("active");
      }
    });

  }

  // run immediately
  highlightFromHash();

  // update when hash changes
  window.addEventListener("hashchange", highlightFromHash);
}