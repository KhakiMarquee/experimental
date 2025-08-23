import"./category-RGb1YuWU.js";function m(e,t){e.classList.add("expanding");const o=e.getBoundingClientRect(),d=o.top+window.scrollY,r=o.left+window.scrollX,a=o.width,s=o.height;e.style.transition="none",e.style.position="fixed",e.style.top=`${d}px`,e.style.left=`${r}px`,e.style.width=`${a}px`,e.style.height=`${s}px`,e.style.margin="0",e.style.transform="none",e.style.zIndex="10000",e.style.willChange="top,left,width,height,transform",document.body.appendChild(e),e.getBoundingClientRect();const n=600;e.style.transition=`top ${n}ms ease, left ${n}ms ease, width ${n}ms ease, height ${n}ms ease, transform ${n}ms ease`,e.style.top="0px",e.style.left="0px",e.style.width="100vw",e.style.height="100vh",e.classList.add("fullscreen");const i=c=>{c.target===e&&e.classList.contains("fullscreen")&&(e.removeEventListener("transitionend",i),e.style.willChange="",p(t))};e.addEventListener("transitionend",i),setTimeout(()=>{document.body.contains(e)&&p(t)},n+50)}function p(e){document.body.innerHTML=`
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
           ${e.imageStack.map(t=>`
             <img src="${t}" alt="${e.title}" style="width:100%; height:auto; border-radius:8px; object-fit:cover;">
           `).join("")}
         </div>`:""}
  </main>
</div>
  `,document.getElementById("close-detail").addEventListener("click",()=>{location.reload()})}function g(){return new URLSearchParams(window.location.search).get("category")}function h(e,t){const o=document.getElementById("content"),d=document.getElementById("page-title"),r=document.getElementById("project-section-description");fetch(t).then(a=>{if(!a.ok)throw new Error("Failed to fetch data.");return a.json()}).then(a=>{const s=a[e];if(!s)throw new Error(`Category "${e}" not found in data.`);d.textContent=e.charAt(0).toUpperCase()+e.slice(1),r&&(r.textContent=s.description||""),o.innerHTML="";const n=s.items;n&&n.length?n.forEach((i,c)=>{const l=document.createElement("div");l.classList.add("project-row"),l.innerHTML=`
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
          `,o.appendChild(l),l.addEventListener("click",()=>{m(l,i)})}):o.innerHTML=`<p>No content found for "${e}".</p>`}).catch(a=>{console.error("Error:",a),o.innerHTML="<p>Error loading content.</p>"})}document.addEventListener("DOMContentLoaded",()=>{const e=g();e?h(e,"/data/data.json"):document.getElementById("content").innerHTML="<p>Invalid category.</p>",document.getElementById("grid-view").addEventListener("click",()=>{const t=document.querySelector(".projects-container");t.classList.add("row-view"),t.classList.remove("list-view"),document.getElementById("grid-view").classList.add("active"),document.getElementById("list-view").classList.remove("active")}),document.getElementById("list-view").addEventListener("click",()=>{const t=document.querySelector(".projects-container");t.classList.add("list-view"),t.classList.remove("row-view"),document.getElementById("list-view").classList.add("active"),document.getElementById("grid-view").classList.remove("active")})});
