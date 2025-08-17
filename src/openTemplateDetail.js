export function openTemplateDetail(section, entry) {
  section.classList.add("expanding");

  const rect = section.getBoundingClientRect();
  const startTop = rect.top + window.scrollY;
  const startLeft = rect.left + window.scrollX;
  const startWidth = rect.width;
  const startHeight = rect.height;

  section.style.transition = "none";
  section.style.position = "fixed";
  section.style.top = `${startTop}px`;
  section.style.left = `${startLeft}px`;
  section.style.width = `${startWidth}px`;
  section.style.height = `${startHeight}px`;
  section.style.margin = "0";
  section.style.transform = "none";
  section.style.zIndex = "10000";
  section.style.willChange = "top,left,width,height,transform";

  document.body.appendChild(section);
  section.getBoundingClientRect(); // force reflow

  const DURATION_MS = 600;
  section.style.transition = `top ${DURATION_MS}ms ease, left ${DURATION_MS}ms ease, width ${DURATION_MS}ms ease, height ${DURATION_MS}ms ease, transform ${DURATION_MS}ms ease`;

  section.style.top = "0px";
  section.style.left = "0px";
  section.style.width = "100vw";
  section.style.height = "100vh";
  section.classList.add("fullscreen");

  const onEnd = (e) => {
    if (e.target !== section) return;
    if (!section.classList.contains("fullscreen")) return;

    section.removeEventListener("transitionend", onEnd);
    section.style.willChange = "";
    loadTemplateDetail(entry);
  };
  section.addEventListener("transitionend", onEnd);

  setTimeout(() => {
    if (document.body.contains(section)) {
      loadTemplateDetail(entry);
    }
  }, DURATION_MS + 50);
}

function loadTemplateDetail(entry) {
  document.body.innerHTML = `
<div id="detail-app">
  <button id="close-detail" aria-label="Close" style="align-self:flex-end; font-size:1.25rem; background:none; border:none; cursor:pointer;">✕</button>
  <main style="max-width:960px; width:100%; margin:0 auto;">
    <h1 style="margin:0 0 12px 0;">${entry.title}</h1>
    <p style="margin:0 0 8px 0;"><strong>Client:</strong> ${entry.client ?? ""}</p>
    <p style="margin:0 0 8px 0;"><strong>Theme:</strong> ${entry.theme ?? ""}</p>
    <p style="margin:0 0 8px 0;"><strong>Type:</strong> ${Array.isArray(entry.type) ? entry.type.join(", ") : entry.type ?? ""}</p>
    <p style="margin:0 0 16px 0;">${entry.description ?? ""}</p>

    <!-- Prefer video embed, fallback to main image -->
    ${entry.video 
      ? `<div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; margin-bottom:16px;">
           <iframe src="${entry.video.replace("youtu.be/", "www.youtube.com/embed/").replace("watch?v=", "embed/")}" 
                   frameborder="0" 
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                   allowfullscreen 
                   style="position:absolute; top:0; left:0; width:100%; height:100%;">
           </iframe>
         </div>`
      : entry.image 
        ? `<img src="${entry.image}" alt="${entry.title}" style="max-width:100%; height:auto; display:block; margin-bottom:16px;">`
        : ""
    }

    <!-- Grid of extra images -->
    ${entry.imageStack && entry.imageStack.length 
      ? `<div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:12px; margin-top:16px;">
           ${entry.imageStack.map(img => `
             <img src="${img}" alt="${entry.title}" style="width:100%; height:auto; border-radius:8px; object-fit:cover;">
           `).join('')}
         </div>`
      : ""
    }
  </main>
</div>
  `;

  document.getElementById("close-detail").addEventListener("click", () => {
    location.reload();
  });
}

