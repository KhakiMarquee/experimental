function g(t,e){const r=`${window.location.origin}${window.location.pathname}?id=${e.id}&title=${encodeURIComponent(e.title)}`;window.history.replaceState({itemTitle:e.title},e.title,r),t.classList.add("expanding"),window.p5Instance&&window.p5Instance.noLoop();const o=t.getBoundingClientRect(),l=o.top+window.scrollY,s=o.left+window.scrollX,p=o.width,c=o.height;t.parentElement,t.nextSibling,t.style.transition="none",t.style.position="fixed",t.style.top=`${l}px`,t.style.left=`${s}px`,t.style.width=`${p}px`,t.style.height=`${c}px`,t.style.margin="0",t.style.transform="none",t.style.zIndex="10000",t.style.willChange="top,left,width,height,transform",document.body.appendChild(t),t.getBoundingClientRect();const n=600;t.style.transition=`top ${n}ms ease, left ${n}ms ease, width ${n}ms ease, height ${n}ms ease, transform ${n}ms ease`,t.style.top="0px",t.style.left="0px",t.style.width="100vw",t.style.height="100vh",t.classList.add("fullscreen");const i=d=>{d.target===t&&t.classList.contains("fullscreen")&&(t.removeEventListener("transitionend",i),t.style.willChange="",a(e))};t.addEventListener("transitionend",i),setTimeout(()=>{document.body.contains(t)&&a(e)},n+50)}function a(t){document.body.innerHTML=`
    <div id="detail-app">
      <button id="close-detail" aria-label="Close" style="align-self:flex-end; font-size:1.25rem; background:none; border:none; cursor:pointer;">✕</button>
      <main style="max-width:960px; width:100%; margin:0 auto;">
        <h1 style="margin:0 0 12px 0;">${t.title}</h1>
        <p style="margin:0 0 8px 0;"><strong>Material:</strong> ${t.material??""}</p>
        <p style="margin:0 0 16px 0;">${t.description??""}</p>
        <p style="margin:0 0 8px 0;"><strong>Dimensions:</strong> ${t.dimensions??""}</p>
        <p style="margin:0 0 8px 0;"><strong>Tools:</strong> ${t.tools??""}</p>

        <!-- Prefer video embed, fallback to main image -->
        ${t.video?`<div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; margin-bottom:16px;">
              <iframe src="${t.video.replace("youtu.be/","www.youtube.com/embed/").replace("watch?v=","embed/")}" 
                      frameborder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowfullscreen 
                      style="position:absolute; top:0; left:0; width:100%; height:100%;">
              </iframe>
            </div>`:t.image?`<img src="${t.image}" alt="${t.title}" style="max-width:100%; height:auto; display:block; margin-bottom:16px;">`:""}

        <!-- Grid of extra images -->
        ${t.imageStack&&t.imageStack.length?`<div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:12px; margin-top:16px;">
               ${t.imageStack.map(e=>`
                 <img src="${e}" alt="${t.title}" style="width:100%; height:auto; border-radius:8px; object-fit:cover;">
               `).join("")}
             </div>`:""}
      </main>
    </div>
  `,document.getElementById("close-detail").addEventListener("click",()=>{const e=window.location.origin+window.location.pathname;window.history.replaceState({},document.title,e),location.reload()})}export{g as openDetail};
