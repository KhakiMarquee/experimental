import"./ui-C6CZgORn.js";function p(e,n){e.classList.add("expanding");const s=e.getBoundingClientRect(),l=s.top+window.scrollY,a=s.left+window.scrollX,o=s.width,i=s.height;e.style.transition="none",e.style.position="fixed",e.style.top=`${l}px`,e.style.left=`${a}px`,e.style.width=`${o}px`,e.style.height=`${i}px`,e.style.margin="0",e.style.transform="none",e.style.zIndex="10000",e.style.willChange="top,left,width,height,transform",document.body.appendChild(e),e.getBoundingClientRect();const t=600;e.style.transition=`top ${t}ms ease, left ${t}ms ease, width ${t}ms ease, height ${t}ms ease, transform ${t}ms ease`,e.style.top="0px",e.style.left="0px",e.style.width="100vw",e.style.height="100vh",e.classList.add("fullscreen");const d=c=>{c.target===e&&e.classList.contains("fullscreen")&&(e.removeEventListener("transitionend",d),e.style.willChange="",r(n))};e.addEventListener("transitionend",d),setTimeout(()=>{document.body.contains(e)&&r(n)},t+50)}function r(e){document.body.innerHTML=`
    <div id="detail-app" style="min-height:100vh; display:flex; flex-direction:column; padding:24px; box-sizing:border-box;">
      <button id="close-detail" aria-label="Close" style="align-self:flex-end; font-size:1.25rem; background:none; border:none; cursor:pointer;">✕</button>
      <main style="max-width:960px; width:100%; margin:0 auto;">
        <h1 style="margin:0 0 12px 0;">${e.title}</h1>
        <p style="margin:0 0 8px 0;"><strong>Client:</strong> ${e.client??""}</p>
        <p style="margin:0 0 8px 0;"><strong>Theme:</strong> ${e.theme??""}</p>
        <p style="margin:0 0 8px 0;"><strong>Type:</strong> ${e.type??""}</p>
        <p style="margin:0 0 16px 0;">${e.description??""}</p>
        ${e.image?`<img src="${e.image}" alt="${e.title}" style="max-width:100%; height:auto; display:block;">`:""}
      </main>
    </div>
  `,document.getElementById("close-detail").addEventListener("click",()=>{location.reload()})}function m(){return new URLSearchParams(window.location.search).get("category")}function g(e,n){const s=document.getElementById("content"),l=document.getElementById("page-title");fetch(n).then(a=>{if(!a.ok)throw new Error("Failed to fetch data.");return a.json()}).then(a=>{const o=a[e];l.textContent=e.charAt(0).toUpperCase()+e.slice(1),s.innerHTML="",o&&o.length?o.forEach(i=>{const t=document.createElement("div");t.addEventListener("click",()=>{p(t,i)}),t.classList.add("project-row"),t.innerHTML=`
            <div class="project-image">
              <img src="${i.image}" alt="${i.title}">
            </div>
            <div class="project-details">
              <p>${i.title}</p>
              <span class="project-client">${i.client}</span>
              <div class="project-meta">
                <p class="project-theme">${i.theme}</p>
                <p class="project-description">${i.description}</p>   
                  <span class="project-type">${i.type}</span>
              </div>
            </div>
          `,s.appendChild(t)}):s.innerHTML=`<p>No content found for "${e}".</p>`}).catch(a=>{console.error("Error:",a),s.innerHTML="<p>Error loading content.</p>"})}document.addEventListener("DOMContentLoaded",()=>{const e=m();e?g(e,"/data/data.json"):document.getElementById("content").innerHTML="<p>Invalid category.</p>",document.getElementById("grid-view").addEventListener("click",()=>{const n=document.querySelector(".projects-container");n.classList.add("row-view"),n.classList.remove("list-view"),document.getElementById("grid-view").classList.add("active"),document.getElementById("list-view").classList.remove("active")}),document.getElementById("list-view").addEventListener("click",()=>{const n=document.querySelector(".projects-container");n.classList.add("list-view"),n.classList.remove("row-view"),document.getElementById("list-view").classList.add("active"),document.getElementById("grid-view").classList.remove("active")})});
