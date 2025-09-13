import"./category-B7rZq-dZ.js";import{r as m}from"./contactForm-i39MOMc9.js";import{I as g}from"./index-D4s6B3rk.js";function c(){const t=document.querySelectorAll(".team-member-container");t.forEach(s=>{const e=s.querySelector(".team-member"),o=s.querySelector(".team-dropdown");!e||!o||e.addEventListener("click",()=>{t.forEach(n=>{const a=n.querySelector(".team-member"),i=n.querySelector(".team-dropdown");a&&i&&n!==s&&(a.classList.remove("active"),i.style.display="none",a.classList.remove("active"))}),e.classList.contains("active")?(e.classList.remove("active"),o.style.display="none",e.classList.remove("active")):(e.classList.add("active"),o.style.display="block",e.classList.add("active"))})})}document.addEventListener("DOMContentLoaded",()=>{c()});function u(){document.querySelectorAll(".team-member").forEach(t=>{const s=t.querySelector("img.bw"),e=t.querySelector("img.colour");!s||!e||(s.classList.remove("hide"),e.classList.add("hide"),t.addEventListener("mouseenter",()=>{s.classList.add("hide"),e.classList.remove("hide")}),t.addEventListener("mouseleave",()=>{s.classList.remove("hide"),e.classList.add("hide")}))})}async function p(t){try{const s=await fetch("/data/press.json");if(!s.ok)throw new Error(`Failed to fetch press data: ${s.status}`);const e=await s.json();t.innerHTML="",e.forEach(o=>{const r=document.createElement("div");r.classList.add("team-member-container"),r.innerHTML=`
      <div class="team-member">
        <img class='bw' src="${o.images[0]||"/public/media/IMG/default.png"}" 
             alt="${o.title} bandw">
        ${o.images[1]?`<img class='colour hide' src="${o.images[1]}" alt="${o.title} colour">`:""}
        <h2>${o.outlet}</h2>
        <p>${o.title} (${o.year})</p>
        <p>${o.type}</p>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="16" height="16" viewBox="0 0 256 256">
          <g transform="translate(1.4066 1.4066) scale(2.81 2.81)" fill="rgb(var(--grey-500))">
            <path d="M 45 0 C 20.147 0 0 20.147 0 45 c 0 24.853 20.147 45 45 45 s 45 -20.147 45 -45 C 90 20.147 69.853 0 45 0 z M 63.831 50.245 H 50.962 V 65 H 39.076 V 50.245 H 26.169 V 39.34 h 12.906 V 25 h 11.886 v 14.34 h 12.869 V 50.245 z"/>
          </g>
        </svg>
      </div>
       <div class="team-dropdown fade-in-d">
          <p>${o.statement||"No statement provided."}</p>
          ${o.link?`
            <button class="right-button" onclick="window.open('${o.link}', '_blank')">
              Learn More
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="16" height="16" viewBox="0 0 256 256">
                <g transform="translate(1.4066 1.4066) scale(2.81 2.81)" fill="rgb(var(--grey-500))">
                  <path d="M 45 0 C 20.147 0 0 20.147 0 45 c 0 24.853 20.147 45 45 45 s 45 -20.147 45 -45 C 90 20.147 69.853 0 45 0 z M 63.831 50.245 H 50.962 V 65 H 39.076 V 50.245 H 26.169 V 39.34 h 12.906 V 25 h 11.886 v 14.34 h 12.869 V 50.245 z"/>
                </g>
              </svg>              
            </button>
          `:""}
        </div>
      `,t.appendChild(r)}),c()}catch(s){console.error("Error loading press content:",s),t.innerHTML="<p>Failed to load press content.</p>"}}function l(t,s=""){if(!t){console.warn("No image element found for compression.");return}t.crossOrigin="anonymous",fetch(t.src,{mode:"cors"}).then(e=>e.blob()).then(e=>{const r={file:new File([e],"image.jpg",{type:e.type}),quality:.6,convertSize:1/0,redressOrientation:!0,beforeCompress(n){console.log(`BeforeCompress ${s}:`,n.size,n.type)},success(n){console.log(`Compression success ${s}:`,n.size,n.type),t.src=URL.createObjectURL(n);const a=e.size,i=n.size,d=(a-i)/a*100;console.log(`${s} original size:`,a,"bytes","| compressed size:",i,"bytes","| reduced:",d.toFixed(2)+"%")},error(n){console.error(`Compression error (${s}):`,n)}};new g(r)}).catch(e=>console.error(`Fetch error during compression (${s}):`,e))}function h(t){const s=document.getElementById("team-members");if(!s){console.error("❌ Could not find #team-member-container in DOM");return}s.innerHTML="",t.forEach(e=>{const o=document.createElement("div");o.classList.add("team-member-container"),o.innerHTML=`
      <div class="team-member">
        <img class='bw' src="${e.images[0]||"/public/media/IMG/default.png"}" 
            alt="${e.firstname} ${e.lastname} bandw">
        <img class='colour hide' src="${e.images[1]||"/public/media/IMG/default.png"}" 
            alt="${e.firstname} ${e.lastname} colour">
        <h2>${e.firstname} ${e.lastname}</h2>
        <p>${e.role}</p>
        <p>${e.email}</p>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="16" height="16" viewBox="0 0 256 256">
          <g transform="translate(1.4066 1.4066) scale(2.81 2.81)" fill="rgb(var(--grey-500))">
            <path d="M 45 0 C 20.147 0 0 20.147 0 45 c 0 24.853 20.147 45 45 45 s 45 -20.147 45 -45 C 90 20.147 69.853 0 45 0 z M 63.831 50.245 H 50.962 V 65 H 39.076 V 50.245 H 26.169 V 39.34 h 12.906 V 25 h 11.886 v 14.34 h 12.869 V 50.245 z"/>
          </g>
        </svg>
      </div>
      <div class="team-dropdown fade-in-d">
        <p>${e.statement||"No statement provided."}</p>
        ${e.link?`
          <button class="right-button" onclick="window.open('${e.link}', '_blank')">
            SubStack
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="16" height="16" viewBox="0 0 256 256">
              <g transform="translate(1.4066 1.4066) scale(2.81 2.81)" fill="rgb(var(--grey-500))">
                <path d="M 45 0 C 20.147 0 0 20.147 0 45 c 0 24.853 20.147 45 45 45 s 45 -20.147 45 -45 C 90 20.147 69.853 0 45 0 z M 63.831 50.245 H 50.962 V 65 H 39.076 V 50.245 H 26.169 V 39.34 h 12.906 V 25 h 11.886 v 14.34 h 12.869 V 50.245 z"/>
              </g>
            </svg>              
          </button>
        `:""}
      </div>
    `,s.appendChild(o);const r=o.querySelector("img.bw"),n=o.querySelector("img.colour");l(r,`${e.firstname} bw`),l(n,`${e.firstname} colour`)}),c(),u()}function v(){console.log("📥 Fetching team data from /data/team.json"),fetch("/data/team.json").then(t=>{if(console.log("📡 Response status:",t.status),!t.ok)throw new Error(`Failed to fetch: ${t.status}`);return t.json()}).then(t=>{console.log("✅ JSON data fetched successfully:",t),h(t)}).catch(t=>console.error("❌ Error loading team:",t))}document.addEventListener("DOMContentLoaded",()=>{console.log("✅ DOM fully loaded, calling loadTeam()"),v();const t=document.getElementById("team-members");document.querySelectorAll(".team-button").forEach(e=>{e.addEventListener("click",()=>{const o=e.textContent.trim();if(t.innerHTML="",o==="Contact"){const r=document.createElement("div");r.id="contact-area",t.appendChild(r),m("contact-area","Audiovisuals",n=>{n.addEventListener("submit",a=>{a.preventDefault();const i=new FormData(n);console.log("✅ Form submitted:",Object.fromEntries(i))})})}else o==="Press"&&p(t)})})});
