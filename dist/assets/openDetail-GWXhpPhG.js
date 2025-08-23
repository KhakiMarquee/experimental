function g(t,o){t.classList.add("expanding"),window.p5Instance&&window.p5Instance.noLoop();const e=t.getBoundingClientRect(),i=e.top+window.scrollY,r=e.left+window.scrollX,l=e.width,c=e.height;t.parentElement,t.nextSibling,t.style.transition="none",t.style.position="fixed",t.style.top=`${i}px`,t.style.left=`${r}px`,t.style.width=`${l}px`,t.style.height=`${c}px`,t.style.margin="0",t.style.transform="none",t.style.zIndex="10000",t.style.willChange="top,left,width,height,transform",document.body.appendChild(t),t.getBoundingClientRect();const n=600;t.style.transition=`top ${n}ms ease, left ${n}ms ease, width ${n}ms ease, height ${n}ms ease, transform ${n}ms ease`,t.style.top="0px",t.style.left="0px",t.style.width="100vw",t.style.height="100vh",t.classList.add("fullscreen");const a=p=>{p.target===t&&t.classList.contains("fullscreen")&&(t.removeEventListener("transitionend",a),t.style.willChange="",s(o))};t.addEventListener("transitionend",a),setTimeout(()=>{document.body.contains(t)&&s(o)},n+50)}function s(t){document.body.innerHTML=`
    <div id="detail-app">
      <button id="close-detail" aria-label="Close" style="align-self:flex-end; font-size:1.25rem; background:none; border:none; cursor:pointer;">✕</button>
      <main style="max-width:960px; width:100%; margin:0 auto;">
        <h1 style="margin:0 0 12px 0;">${t.title}</h1>
        <p style="margin:0 0 8px 0;"><strong>Material:</strong> ${t.material??""}</p>
        <p style="margin:0 0 16px 0;">${t.description??""}</p>
        ${t.image?`<img src="${t.image}" alt="${t.title}" style="max-width:100%; height:auto; display:block;">`:""}
      </main>
    </div>
  `,document.getElementById("close-detail").addEventListener("click",()=>{location.reload()})}export{g as openDetail};
