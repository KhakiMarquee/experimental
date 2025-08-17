import"./ui-BtBIDYYG.js";import"./category-BVjVnrFX.js";function p(e,t){e.classList.add("expanding");const n=e.getBoundingClientRect(),l=n.top+window.scrollY,o=n.left+window.scrollX,s=n.width,a=n.height;e.style.transition="none",e.style.position="fixed",e.style.top=`${l}px`,e.style.left=`${o}px`,e.style.width=`${s}px`,e.style.height=`${a}px`,e.style.margin="0",e.style.transform="none",e.style.zIndex="10000",e.style.willChange="top,left,width,height,transform",document.body.appendChild(e),e.getBoundingClientRect();const i=600;e.style.transition=`top ${i}ms ease, left ${i}ms ease, width ${i}ms ease, height ${i}ms ease, transform ${i}ms ease`,e.style.top="0px",e.style.left="0px",e.style.width="100vw",e.style.height="100vh",e.classList.add("fullscreen");const d=c=>{c.target===e&&e.classList.contains("fullscreen")&&(e.removeEventListener("transitionend",d),e.style.willChange="",r(t))};e.addEventListener("transitionend",d),setTimeout(()=>{document.body.contains(e)&&r(t)},i+50)}function r(e){document.body.innerHTML=`
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
  `,document.getElementById("close-detail").addEventListener("click",()=>{location.reload()})}function m(){return new URLSearchParams(window.location.search).get("category")}function g(e,t){const n=document.getElementById("content"),l=document.getElementById("page-title");fetch(t).then(o=>{if(!o.ok)throw new Error("Failed to fetch data.");return o.json()}).then(o=>{const s=o[e];l.textContent=e.charAt(0).toUpperCase()+e.slice(1),n.innerHTML="",s&&s.length?s.forEach(a=>{const i=document.createElement("div");i.addEventListener("click",()=>{p(i,a)}),i.classList.add("project-row"),i.innerHTML=`
            <div class="project-image">
              <img src="${a.image}" alt="${a.title}">
            </div>
            <div class="project-details">
              <p>${a.title}</p>
              <span class="project-client">${a.client}</span>
              <div class="project-meta">
                <p class="project-theme">${a.theme}</p>
                <p class="project-description">${a.description}</p>   
                  <span class="project-type">${a.type}</span>
              </div>
            </div>
          `,n.appendChild(i)}):n.innerHTML=`<p>No content found for "${e}".</p>`}).catch(o=>{console.error("Error:",o),n.innerHTML="<p>Error loading content.</p>"})}document.addEventListener("DOMContentLoaded",()=>{const e=m();e?g(e,"/data/data.json"):document.getElementById("content").innerHTML="<p>Invalid category.</p>",document.getElementById("grid-view").addEventListener("click",()=>{const t=document.querySelector(".projects-container");t.classList.add("row-view"),t.classList.remove("list-view"),document.getElementById("grid-view").classList.add("active"),document.getElementById("list-view").classList.remove("active")}),document.getElementById("list-view").addEventListener("click",()=>{const t=document.querySelector(".projects-container");t.classList.add("list-view"),t.classList.remove("row-view"),document.getElementById("list-view").classList.add("active"),document.getElementById("grid-view").classList.remove("active")})});
