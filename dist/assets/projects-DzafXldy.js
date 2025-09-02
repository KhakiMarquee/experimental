import"./category-C0eszSu5.js";function m(e,i){e.classList.add("expanding");const t=e.getBoundingClientRect(),s=t.top+window.scrollY,l=t.left+window.scrollX,o=t.width,n=t.height;e.style.transition="none",e.style.position="fixed",e.style.top=`${s}px`,e.style.left=`${l}px`,e.style.width=`${o}px`,e.style.height=`${n}px`,e.style.margin="0",e.style.transform="none",e.style.zIndex="10000",e.style.willChange="top,left,width,height,transform",document.body.appendChild(e),e.getBoundingClientRect();const a=600;e.style.transition=`top ${a}ms ease, left ${a}ms ease, width ${a}ms ease, height ${a}ms ease, transform ${a}ms ease`,e.style.top="0px",e.style.left="0px",e.style.width="100vw",e.style.height="100vh",e.classList.add("fullscreen");const r=p=>{p.target===e&&e.classList.contains("fullscreen")&&(e.removeEventListener("transitionend",r),e.style.willChange="",d(i))};e.addEventListener("transitionend",r),setTimeout(()=>{document.body.contains(e)&&d(i)},a+50)}function d(e){document.body.innerHTML=`
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
           ${e.imageStack.map(i=>`
             <img src="${i}" alt="${e.title}" style="width:100%; height:auto; border-radius:8px; object-fit:cover;">
           `).join("")}
         </div>`:""}
  </main>
</div>
  `,document.getElementById("close-detail").addEventListener("click",()=>{location.reload()})}function g(){return new URLSearchParams(window.location.search).get("category")}function c(e){const i=document.createElement("div");return i.classList.add("project-row"),i.innerHTML=`
    <div class="project-image">
      <img src="${e.image}" alt="${e.title}">
    </div>
    <div class="project-details">
      <p>${e.title}</p>
      <span class="project-client">${e.client||""}</span>
      <div class="project-meta">
        <p class="project-theme">${e.theme||""}</p>
        <p class="project-description">${e.description||""}</p>
        <span class="project-type">${Array.isArray(e.type)?e.type.join(", "):e.type||""}</span>
      </div>
    </div>
  `,i.addEventListener("click",()=>m(i,e)),i}function h(e,i){const t=document.getElementById("content"),s=document.getElementById("page-title"),l=document.getElementById("project-section-description");fetch(i).then(o=>{if(!o.ok)throw new Error("Failed to fetch data.");return o.json()}).then(o=>{if(t.innerHTML="",e){const n=o[e];if(!n){t.innerHTML=`<p>Category "${e}" not found.</p>`;return}s&&(s.textContent=e.toUpperCase()),l&&(l.textContent=n.description||""),(n.items||[]).forEach(a=>{t.appendChild(c(a))})}else Object.keys(o).forEach(n=>{const a=o[n];!a||!Array.isArray(a.items)||a.items.forEach(r=>{t.appendChild(c(r))})})}).catch(o=>{console.error(o),t.innerHTML="<p>Error loading content.</p>"})}document.addEventListener("DOMContentLoaded",()=>{const e=g();h(e,"/data/data.json");const t=document.querySelector(".projects-container");document.getElementById("grid-view").addEventListener("click",()=>{t.classList.add("row-view"),t.classList.remove("list-view"),document.getElementById("grid-view").classList.add("active"),document.getElementById("list-view").classList.remove("active")}),document.getElementById("list-view").addEventListener("click",()=>{t.classList.add("list-view"),t.classList.remove("row-view"),document.getElementById("list-view").classList.add("active"),document.getElementById("grid-view").classList.remove("active")})});
