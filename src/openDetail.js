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
  document.body.innerHTML = `
    <div id="detail-app">
      <button id="close-detail" aria-label="Close" style="align-self:flex-end; font-size:1.25rem; background:none; border:none; cursor:pointer;">✕</button>
      <main style="max-width:960px; width:100%; margin:0 auto;">
        <h1 style="margin:0 0 12px 0;">${item.title}</h1>
        <p style="margin:0 0 8px 0;"><strong>Material:</strong> ${item.material ?? ""}</p>
        <p style="margin:0 0 16px 0;">${item.description ?? ""}</p>
        <p style="margin:0 0 8px 0;"><strong>Dimensions:</strong> ${item.dimensions ?? ""}</p>
        <p style="margin:0 0 8px 0;"><strong>Tools:</strong> ${item.tools ?? ""}</p>

        <!-- Prefer video embed, fallback to main image -->
        ${item.video 
          ? `<div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; margin-bottom:16px;">
              <iframe src="${item.video.replace("youtu.be/", "www.youtube.com/embed/").replace("watch?v=", "embed/")}" 
                      frameborder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowfullscreen 
                      style="position:absolute; top:0; left:0; width:100%; height:100%;">
              </iframe>
            </div>`
          : item.image 
            ? `<img src="${item.image}" alt="${item.title}" style="max-width:100%; height:auto; display:block; margin-bottom:16px;">`
            : ""
        }

        <!-- Grid of extra images -->
        ${item.imageStack && item.imageStack.length 
          ? `<div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:12px; margin-top:16px;">
               ${item.imageStack.map(img => `
                 <img src="${img}" alt="${item.title}" style="width:100%; height:auto; border-radius:8px; object-fit:cover;">
               `).join('')}
             </div>`
          : ""
        }
      </main>
    </div>
  `;

  // Wire close to reload original app (or navigate back)
  document.getElementById("close-detail").addEventListener("click", () => {
    location.reload(); // quick way to reset original carousel
  });
}