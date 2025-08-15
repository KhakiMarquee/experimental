function openTemplateDetail(section, entry) {
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
    <div id="detail-app" style="min-height:100vh; display:flex; flex-direction:column; padding:24px; box-sizing:border-box;">
      <button id="close-detail" aria-label="Close" style="align-self:flex-end; font-size:1.25rem; background:none; border:none; cursor:pointer;">✕</button>
      <main style="max-width:960px; width:100%; margin:0 auto;">
        <h1 style="margin:0 0 12px 0;">${entry.title}</h1>
        <p style="margin:0 0 8px 0;"><strong>Client:</strong> ${entry.client ?? ""}</p>
        <p style="margin:0 0 8px 0;"><strong>Theme:</strong> ${entry.theme ?? ""}</p>
        <p style="margin:0 0 8px 0;"><strong>Type:</strong> ${entry.type ?? ""}</p>
        <p style="margin:0 0 16px 0;">${entry.description ?? ""}</p>
        ${entry.image ? `<img src="${entry.image}" alt="${entry.title}" style="max-width:100%; height:auto; display:block;">` : ""}
      </main>
    </div>
  `;

  document.getElementById("close-detail").addEventListener("click", () => {
    location.reload();
  });
}