import"./ui-DKK5VDY1.js";import"./category-9HHsUEdj.js";function m(e,l){e.classList.add("expanding");const o=e.getBoundingClientRect(),t=o.top+window.scrollY,n=o.left+window.scrollX,s=o.width,r=o.height;e.style.transition="none",e.style.position="fixed",e.style.top=`${t}px`,e.style.left=`${n}px`,e.style.width=`${s}px`,e.style.height=`${r}px`,e.style.margin="0",e.style.transform="none",e.style.zIndex="10000",e.style.willChange="top,left,width,height,transform",document.body.appendChild(e),e.getBoundingClientRect();const a=600;e.style.transition=`top ${a}ms ease, left ${a}ms ease, width ${a}ms ease, height ${a}ms ease, transform ${a}ms ease`,e.style.top="0px",e.style.left="0px",e.style.width="100vw",e.style.height="100vh",e.classList.add("fullscreen");const i=c=>{c.target===e&&e.classList.contains("fullscreen")&&(e.removeEventListener("transitionend",i),e.style.willChange="",p(l))};e.addEventListener("transitionend",i),setTimeout(()=>{document.body.contains(e)&&p(l)},a+50)}function p(e){document.body.innerHTML=`
<div id="detail-app">
  <button id="close-detail" aria-label="Close" style="align-self:flex-end; font-size:1.25rem; background:none; border:none; cursor:pointer;">✕</button>
  <main style="max-width:960px; width:100%; margin:0 auto;">
    <h1 style="margin:0 0 12px 0;">${e.title}</h1>
    <p style="margin:0 0 8px 0;"><strong>Client:</strong> ${e.client??""}</p>
    <p style="margin:0 0 8px 0;"><strong>Theme:</strong> ${e.theme??""}</p>
    <p style="margin:0 0 8px 0;"><strong>Type:</strong> ${Array.isArray(e.type)?e.type.join(", "):e.type??""}</p>
    <p style="margin:0 0 16px 0;">${e.description??""}</p>

    <!-- Prefer video embed, fallback to main image -->
    ${e.video?`<div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; margin-bottom:16px;">
           <iframe src="${e.video.replace("youtu.be/","www.youtube.com/embed/").replace("watch?v=","embed/")}" 
                   frameborder="0" 
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                   allowfullscreen 
                   style="position:absolute; top:0; left:0; width:100%; height:100%;">
           </iframe>
         </div>`:e.image?`<img src="${e.image}" alt="${e.title}" style="max-width:100%; height:auto; display:block; margin-bottom:16px;">`:""}

    <!-- Grid of extra images -->
    ${e.imageStack&&e.imageStack.length?`<div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:12px; margin-top:16px;">
           ${e.imageStack.map(l=>`
             <img src="${l}" alt="${e.title}" style="width:100%; height:auto; border-radius:8px; object-fit:cover;">
           `).join("")}
         </div>`:""}
  </main>
</div>
  `,document.getElementById("close-detail").addEventListener("click",()=>{location.reload()})}function g(){return new URLSearchParams(window.location.search).get("category")}function u(e,l){const o=document.getElementById("content"),t=document.getElementById("page-title"),n=document.getElementById("project-section-description");fetch(l).then(s=>{if(!s.ok)throw new Error("Failed to fetch data.");return s.json()}).then(s=>{const r=s[e];if(!r)throw new Error(`Category "${e}" not found in data.`);t.textContent=e.charAt(0).toUpperCase()+e.slice(1),n&&(n.textContent=r.description||""),o.innerHTML="";const a=r.items;a&&a.length?a.forEach((i,c)=>{const d=document.createElement("div");d.classList.add("project-row"),d.innerHTML=`
            <div class="project-image">
              <img src="${i.image}" alt="${i.title}">
            </div>
            <div class="project-details">
              <p>${i.title}</p>
              <span class="project-client">${i.client||""}</span>
              <div class="project-meta">
                <p class="project-theme">${i.theme||""}</p>
                <p class="project-description">${i.description||""}</p>   
                <span class="project-type">${i.type?i.type.join(", "):""}</span>
              </div>
            </div>
          `,o.appendChild(d),d.addEventListener("click",()=>{m(d,i)})}):o.innerHTML=`<p>No content found for "${e}".</p>`}).catch(s=>{console.error("Error:",s),o.innerHTML="<p>Error loading content.</p>"})}document.addEventListener("DOMContentLoaded",()=>{const e=g();e?u(e,"/data/data.json"):document.getElementById("content").innerHTML="<p>Invalid category.</p>",document.getElementById("grid-view").addEventListener("click",()=>{const t=document.querySelector(".projects-container");t.classList.add("row-view"),t.classList.remove("list-view"),document.getElementById("grid-view").classList.add("active"),document.getElementById("list-view").classList.remove("active")}),document.getElementById("list-view").addEventListener("click",()=>{const t=document.querySelector(".projects-container");t.classList.add("list-view"),t.classList.remove("row-view"),document.getElementById("list-view").classList.add("active"),document.getElementById("grid-view").classList.remove("active")}),document.querySelectorAll("#category-buttons button[data-category]").forEach(t=>{t.addEventListener("click",()=>{const n=t.dataset.category;!n||n==="filter"||o(n)})});function o(t){const n=`/pages/projects.html?category=${encodeURIComponent(t)}`;typeof window.loadPage=="function"?window.loadPage(n):window.location.href=n}});
