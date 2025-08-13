// openDetail.js
export function openDetail(slide, item) {
  // Stop p5 from moving this slide
  slide.classList.add("expanding");
  if (window.p5Instance) {
    window.p5Instance.noLoop();
  }

  // First phase: flatten skew
  // ⤷ We capture the current on-screen box, lift the slide to <body>, and neutralize transforms.
  const rect = slide.getBoundingClientRect();
  const startTop = rect.top + window.scrollY;
  const startLeft = rect.left + window.scrollX;
  const startWidth = rect.width;
  const startHeight = rect.height;

  // Detach from transformed carousel so fixed positioning is relative to viewport
  const originalParent = slide.parentElement;
  const nextSibling = slide.nextSibling;

  // Clear any prior transitions to avoid accidental animations from previous states
  slide.style.transition = "none";

  // Make it visually stay where it was
  slide.style.position = "fixed";
  slide.style.top = `${startTop}px`;
  slide.style.left = `${startLeft}px`;
  slide.style.width = `${startWidth}px`;
  slide.style.height = `${startHeight}px`;
  slide.style.margin = "0";
  slide.style.transform = "none";         // neutralize inline p5 transform
  slide.style.zIndex = "10000";
  slide.style.willChange = "top,left,width,height,transform";

  // Move to body so ancestor transforms no longer affect it
  document.body.appendChild(slide);

  // Force reflow before starting the animation
  // (this guarantees the browser takes the starting values above)
  // eslint-disable-next-line no-unused-expressions
  slide.getBoundingClientRect();

  // Second phase: expand fullscreen → then load detail app
  // NOTE: we now animate real width/height/position so transitionend definitely fires
  const DURATION_MS = 600;
  slide.style.transition = `top ${DURATION_MS}ms ease, left ${DURATION_MS}ms ease, width ${DURATION_MS}ms ease, height ${DURATION_MS}ms ease, transform ${DURATION_MS}ms ease`;

  // Target = full viewport
  slide.style.top = "0px";
  slide.style.left = "0px";
  slide.style.width = "100vw";
  slide.style.height = "100vh";
  slide.classList.add("fullscreen");

  // When any of the box transitions finish, load the new app
  const onEnd = (e) => {
    if (e.target !== slide) return;
    // Guard: make sure we reached fullscreen state
    if (!slide.classList.contains("fullscreen")) return;

    slide.removeEventListener("transitionend", onEnd);
    // Optional: clean up the transient inline styles before replacing the page
    slide.style.willChange = "";
    loadNewApp(item);
  };
  slide.addEventListener("transitionend", onEnd);

  // Fallback in case transitionend is missed (edge browsers/devtools throttling)
  setTimeout(() => {
    if (document.body.contains(slide)) {
      loadNewApp(item);
    }
  }, DURATION_MS + 50);
}

function loadNewApp(item) {
  // Replace entire body with new content
  document.body.innerHTML = `
    <div id="detail-app" style="min-height:100vh; display:flex; flex-direction:column; padding:24px; box-sizing:border-box;">
      <button id="close-detail" aria-label="Close" style="align-self:flex-end; font-size:1.25rem; background:none; border:none; cursor:pointer;">✕</button>
      <main style="max-width:960px; width:100%; margin:0 auto;">
        <h1 style="margin:0 0 12px 0;">${item.title}</h1>
        <p style="margin:0 0 8px 0;"><strong>Material:</strong> ${item.material ?? ""}</p>
        <p style="margin:0 0 16px 0;">${item.description ?? ""}</p>
        ${item.image ? `<img src="${item.image}" alt="${item.title}" style="max-width:100%; height:auto; display:block;">` : ""}
      </main>
    </div>
  `;

  // Wire close to reload original app (or navigate back)
  document.getElementById("close-detail").addEventListener("click", () => {
    location.reload(); // quick way to reset original carousel
  });
}
