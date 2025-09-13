function p(t,e){e.title.toLowerCase().replace(/[^\w\s-]/g,"").replace(/\s+/g,"-");const i=`${window.location.origin}${window.location.pathname}?id=${e.id}&title=${encodeURIComponent(e.title)}`;window.history.replaceState({entryId:e.id},e.title,i),t.classList.add("expanding");const o=t.getBoundingClientRect(),n=o.top+window.scrollY,r=o.left+window.scrollX,d=o.width,m=o.height;t.style.transition="none",t.style.position="fixed",t.style.top=`${n}px`,t.style.left=`${r}px`,t.style.width=`${d}px`,t.style.height=`${m}px`,t.style.margin="0",t.style.transform="none",t.style.zIndex="10000",t.style.willChange="top,left,width,height,transform",document.body.appendChild(t),t.getBoundingClientRect();const a=600;t.style.transition=`top ${a}ms ease, left ${a}ms ease, width ${a}ms ease, height ${a}ms ease, transform ${a}ms ease`,t.style.top="0px",t.style.left="0px",t.style.width="100vw",t.style.height="100vh",t.classList.add("fullscreen");const l=g=>{g.target===t&&t.classList.contains("fullscreen")&&(t.removeEventListener("transitionend",l),t.style.willChange="",s(e))};t.addEventListener("transitionend",l),setTimeout(()=>{document.body.contains(t)&&s(e)},a+50)}function s(t){document.body.innerHTML=`
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
  

`,document.addEventListener("click",e=>{if(e.target&&e.target.id==="close-detail"){const i=window.location.origin+window.location.pathname;window.history.replaceState({},document.title,i),location.reload()}if(e.target.classList.contains("zoomable-img")){const i=document.getElementById("lightbox"),o=document.getElementById("lightbox-img");o.src=e.target.src,i.style.display="flex",requestAnimationFrame(()=>{o.style.transform="scale(1)"})}if(e.target.id==="lightbox"){const i=document.getElementById("lightbox-img");i.style.transform="scale(0.9)",setTimeout(()=>{document.getElementById("lightbox").style.display="none"},300)}})}export{p as o};
