import"./category-BDnK_ko2.js";import b from"js-image-compressor";function y(t,e){e.title.toLowerCase().replace(/[^\w\s-]/g,"").replace(/\s+/g,"-");const o=`${window.location.origin}${window.location.pathname}?id=${e.id}&title=${encodeURIComponent(e.title)}`;window.history.replaceState({entryId:e.id},e.title,o),t.classList.add("expanding");const n=t.getBoundingClientRect(),d=n.top+window.scrollY,l=n.left+window.scrollX,a=n.width,s=n.height;t.style.transition="none",t.style.position="fixed",t.style.top=`${d}px`,t.style.left=`${l}px`,t.style.width=`${a}px`,t.style.height=`${s}px`,t.style.margin="0",t.style.transform="none",t.style.zIndex="10000",t.style.willChange="top,left,width,height,transform",document.body.appendChild(t),t.getBoundingClientRect();const i=600;t.style.transition=`top ${i}ms ease, left ${i}ms ease, width ${i}ms ease, height ${i}ms ease, transform ${i}ms ease`,t.style.top="0px",t.style.left="0px",t.style.width="100vw",t.style.height="100vh",t.classList.add("fullscreen");const r=c=>{c.target===t&&t.classList.contains("fullscreen")&&(t.removeEventListener("transitionend",r),t.style.willChange="",u(e))};t.addEventListener("transitionend",r),setTimeout(()=>{document.body.contains(t)&&u(e)},i+50)}function u(t){document.body.innerHTML=`
<div id="detail-app">
  <button id="close-detail" aria-label="Close" style="align-self:flex-end; font-size:1.25rem; background:none; border:none; cursor:pointer;">✕</button>
  <main style="max-width:960px; width:100%; margin:0 auto;">
    <!-- Prefer video embed, fallback to main image -->
    ${t.video?`<div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; margin-bottom:16px;">
           <iframe src="${t.video.replace("youtu.be/","www.youtube.com/embed/").replace("watch?v=","embed/")}" 
                   frameborder="0" 
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                   allowfullscreen 
                   style="position:absolute; top:0; left:0; width:100%; height:100%;">
           </iframe>
         </div>`:t.image?`<img src="${t.image}" alt="${t.title}" style="max-width:100%; height:auto; display:block; margin-bottom:16px;">`:""}
    <h1 style="margin:0 0 12px 0;">${t.title}, ${t.metadata.year}</h1>
    ${t.links?`
    <button id="learn-more" class="right-button" onclick="window.open('${t.links}', '_blank')">Learn More
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="16" height="16" viewBox="0 0 256 256" xml:space="preserve">
        <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
          <path d="M 45 0 C 20.147 0 0 20.147 0 45 c 0 24.853 20.147 45 45 45 s 45 -20.147 45 -45 C 90 20.147 69.853 0 45 0 z M 63.831 50.245 H 50.962 V 65 H 39.076 V 50.245 H 26.169 V 39.34 h 12.906 V 25 h 11.886 v 14.34 h 12.869 V 50.245 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(var(--grey-500)); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>
        </g>
      </svg>              
    </button>`:""}
    <p style="margin:0 0 8px 0;"><strong>Client:</strong> ${t.client??""}</p>

    ${t.collaboration&&(t.collaboration.participants||t.collaboration.focus)?`
        ${t.collaboration.participants?`<p style="margin:0 0 8px 0;"><strong>Collaborator:</strong> ${t.collaboration.participants}</p>`:""}
        ${t.collaboration.focus?`<p style="margin:0 0 8px 0;"><strong>Focus:</strong> ${t.collaboration.focus}</p>`:""}
        `:""}
    
    <p style="margin:0 0 8px 0;"><strong>Theme:</strong> ${t.theme??""}</p>
    <p style="margin:0 0 8px 0;"><strong>Type:</strong> ${Array.isArray(t.type)?t.type.join(", "):t.type??""}</p>
    <p style="margin:0 0 16px 0;">${t.story??t.description??""}</p>
    




    <!-- Grid of extra images -->
    ${t.imageStack&&t.imageStack.length?`<div class="image-grid" style="display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:12px; margin-top:16px;">
          ${t.imageStack.map(e=>`
            <img class="zoomable-img" src="${e}" alt="${t.title}" style="width:100%; height:auto; border-radius:8px; object-fit:cover; cursor:zoom-in;">
          `).join("")}
        </div>
        <div id="lightbox" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.8); align-items:center; justify-content:center; z-index:10000;">
          <img id="lightbox-img" src="" style="max-width:90%; max-height:90%; border-radius:12px; box-shadow:0 8px 20px rgba(0,0,0,0.5); transform:scale(0.9); transition:transform 0.3s ease;">
        </div>`:""}
  </main>
</div>
  

`,document.addEventListener("click",e=>{if(e.target&&e.target.id==="close-detail"){const o=window.location.origin+window.location.pathname;window.history.replaceState({},document.title,o),location.reload()}if(e.target.classList.contains("zoomable-img")){const o=document.getElementById("lightbox"),n=document.getElementById("lightbox-img");n.src=e.target.src,o.style.display="flex",requestAnimationFrame(()=>{n.style.transform="scale(1)"})}if(e.target.id==="lightbox"){const o=document.getElementById("lightbox-img");o.style.transform="scale(0.9)",setTimeout(()=>{document.getElementById("lightbox").style.display="none"},300)}})}function x(){return new URLSearchParams(window.location.search).get("category")}function f(t){const e=document.createElement("div");return e.classList.add("project-row"),e.innerHTML=`
    <div class="project-image">
      <img src="${t.image}" alt="${t.title}">
    </div>
    <div class="project-details">
      <p>${t.title}</p>
      <span class="project-client">${t.client||""}</span>
      <div class="project-meta">
        <p class="project-theme">${t.theme||""}</p>
        <p class="project-description">${t.description||""}</p>
        <span class="project-type">${Array.isArray(t.type)?t.type.join(", "):t.type||""}</span>
      </div>
    </div>
  `,e.addEventListener("click",()=>y(e,t)),e}function p(t){for(let e=t.length-1;e>0;e--){const o=Math.floor(Math.random()*(e+1));[t[e],t[o]]=[t[o],t[e]]}}async function g(t,e){const o=document.getElementById("content"),n=document.getElementById("page-title"),d=document.getElementById("project-section-description");try{const l=await fetch(e);if(!l.ok)throw new Error("Failed to fetch data.");const a=await l.json();if(o.innerHTML="",t){const s=a[t];if(!s)return o.innerHTML=`<p>Category "${t}" not found.</p>`,a;n&&(n.textContent=t.toUpperCase()),d&&(d.textContent=s.description||"");const i=[...s.items||[]];p(i),i.forEach((r,c)=>{const m=f(r);o.appendChild(m),w(m,c)})}else{const s=Object.keys(a);p(s),s.forEach(i=>{const r=a[i];if(!r||!Array.isArray(r.items))return;const c=[...r.items];p(c),c.forEach((m,v)=>{const h=f(m);o.appendChild(h),w(h,v)})})}return a}catch(l){return console.error(l),o.innerHTML="<p>Error loading content.</p>",null}}document.addEventListener("DOMContentLoaded",async()=>{const t=x(),o=await g(t,"/data/data_with_ids.json"),d=new URLSearchParams(window.location.search).get("id");if(d&&o){const s=d.split("-")[0];let i=null;for(const r of Object.keys(o)){const c=o[r];if(c?.items&&(i=c.items.find(m=>m.id.toString()===s),i))break}if(i){const r=document.createElement("div");y(r,i)}}const l=document.querySelector(".projects-container");document.getElementById("grid-view").addEventListener("click",()=>{l.classList.add("row-view"),l.classList.remove("list-view"),document.getElementById("grid-view").classList.add("active"),document.getElementById("list-view").classList.remove("active")}),document.getElementById("list-view").addEventListener("click",()=>{l.classList.add("list-view"),l.classList.remove("row-view"),document.getElementById("list-view").classList.add("active"),document.getElementById("grid-view").classList.remove("active")}),document.querySelectorAll(".catNum").forEach(s=>{const i=s.innerText.trim().toLowerCase(),r=Object.keys(o).find(c=>c.toLowerCase()===i);r?s.title=o[r]?.items?.length||0:(console.warn(`No category found for "${i}" in data.json`),s.title=0),console.log(i,"->",s.title)})});function w(t,e){console.log(`Rendering entry #${e}, applying compression.`);const o=t.querySelector(".project-image img");if(!o){console.warn("No image element found in section:",t);return}o.crossOrigin="anonymous",console.log("Processing image:",o.src),fetch(o.src,{mode:"cors"}).then(n=>n.blob()).then(n=>{const l={file:new File([n],"image.jpg",{type:n.type}),quality:.6,convertSize:1/0,redressOrientation:!0,beforeCompress(a){console.log("BeforeCompress:",a.size,a.type)},success(a){console.log("Compression success:",a.size,a.type),o.src=URL.createObjectURL(a);const s=n.size,i=a.size,r=(s-i)/s*100;console.log("Original size:",s,"bytes"),console.log("Compressed size:",i,"bytes"),console.log("Compression reduced size by:",r.toFixed(2)+"%")},error(a){console.error("Compression error:",a)}};new b(l)}).catch(n=>console.error("Fetch error during compression:",n))}function $(t){const e="/data/data_with_ids.json",o=t?`/pages/stories.html?category=${encodeURIComponent(t)}`:"/pages/stories.html";window.history.pushState({category:t},"",o),g(t,e)}window.addEventListener("popstate",t=>{const e=t.state?.category||null;g(e,"/data/data_with_ids.json")});document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll('[data-category]:not([data-category="filter"])').forEach(e=>{e.addEventListener("click",o=>{o.preventDefault();const n=e.getAttribute("data-category");$(n==="all"?null:n)})})});
