export function openTemplateDetail(section, entry) {
  // Update URL
  const slug = entry.title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // remove non-alphanumeric chars
    .replace(/\s+/g, "-");    // replace spaces with hyphens

 const newUrl = `${window.location.origin}${window.location.pathname}?id=${entry.id}&title=${encodeURIComponent(entry.title)}`;
  window.history.replaceState({ entryId: entry.id }, entry.title, newUrl);

  // Existing animation code...
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
    <h1 style="margin:0 0 12px 0;">${entry.title}, ${entry.metadata.year}</h1>
    ${entry.link ? `
    <button id="learn-more" class="right-button" onclick="window.open('${entry.link}', '_blank')">Learn More
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="16" height="16" viewBox="0 0 256 256" xml:space="preserve">
        <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
          <path d="M 45 0 C 20.147 0 0 20.147 0 45 c 0 24.853 20.147 45 45 45 s 45 -20.147 45 -45 C 90 20.147 69.853 0 45 0 z M 63.831 50.245 H 50.962 V 65 H 39.076 V 50.245 H 26.169 V 39.34 h 12.906 V 25 h 11.886 v 14.34 h 12.869 V 50.245 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(var(--grey-500)); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
        </g>
      </svg>              
    </button>` : ""}
    <p style="margin:0 0 8px 0;"><strong>Client:</strong> ${entry.client ?? ""}</p>

    ${entry.collaboration && (entry.collaboration.participants || entry.collaboration.focus) 
      ? `
        ${entry.collaboration.participants 
          ? `<p style="margin:0 0 8px 0;"><strong>Collaborator:</strong> ${entry.collaboration.participants}</p>` 
          : ""}
        ${entry.collaboration.focus 
          ? `<p style="margin:0 0 8px 0;"><strong>Focus:</strong> ${entry.collaboration.focus}</p>` 
          : ""}
        `
      : ""
    }
    
    <p style="margin:0 0 8px 0;"><strong>Theme:</strong> ${entry.theme ?? ""}</p>
    <p style="margin:0 0 8px 0;"><strong>Type:</strong> ${Array.isArray(entry.type) ? entry.type.join(", ") : entry.type ?? ""}</p>
    <p style="margin:0 0 16px 0;">${entry.story ?? entry.description ?? ""}</p>
    




    <!-- Grid of extra images -->
    ${entry.imageStack && entry.imageStack.length 
      ? `<div class="image-grid" style="display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:12px; margin-top:16px;">
          ${entry.imageStack.map(img => `
            <img class="zoomable-img" src="${img}" alt="${entry.title}" style="width:100%; height:auto; border-radius:8px; object-fit:cover; cursor:zoom-in;">
          `).join('')}
        </div>
        <div id="lightbox" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.8); align-items:center; justify-content:center; z-index:10000;">
          <img id="lightbox-img" src="" style="max-width:90%; max-height:90%; border-radius:12px; box-shadow:0 8px 20px rgba(0,0,0,0.5); transform:scale(0.9); transition:transform 0.3s ease;">
        </div>`
      : ""
    }
  </main>
</div>
  

`;

  

document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "close-detail") {
    // Clear the URL (remove query params)
    const newUrl = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, newUrl);

    // Reload page after URL is cleared
    location.reload();
  }

  // Zoom in/out handler
  if (e.target.classList.contains("zoomable-img")) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    lightboxImg.src = e.target.src;
    lightbox.style.display = "flex";
    requestAnimationFrame(() => {
      lightboxImg.style.transform = "scale(1)";
    });
  }

  // Close when clicking outside the image
  if (e.target.id === "lightbox") {
    const lightboxImg = document.getElementById("lightbox-img");
    lightboxImg.style.transform = "scale(0.9)";
    setTimeout(() => {
      document.getElementById("lightbox").style.display = "none";
    }, 300);
  }

});
}



