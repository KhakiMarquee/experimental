import"./category-b9Vj-sZl.js";import{r as m}from"./contactForm-i39MOMc9.js";import{I as u}from"./index-B0oIV-ya.js";import{r as g}from"./templateQuickview-Bb9Du4q7.js";function d(){const t=document.querySelectorAll(".team-member-container");t.forEach(o=>{const e=o.querySelector(".team-member"),s=o.querySelector(".team-dropdown");!e||!s||e.addEventListener("click",()=>{t.forEach(n=>{const r=n.querySelector(".team-member"),i=n.querySelector(".team-dropdown");r&&i&&n!==o&&(r.classList.remove("active"),i.style.display="none",r.classList.remove("active"))}),e.classList.contains("active")?(e.classList.remove("active"),s.style.display="none",e.classList.remove("active")):(e.classList.add("active"),s.style.display="block",e.classList.add("active"))})})}document.addEventListener("DOMContentLoaded",()=>{d()});function p(){document.querySelectorAll(".team-member").forEach(t=>{const o=t.querySelector("img.bw"),e=t.querySelector("img.colour");!o||!e||(o.classList.remove("hide"),e.classList.add("hide"),t.addEventListener("mouseenter",()=>{o.classList.add("hide"),e.classList.remove("hide")}),t.addEventListener("mouseleave",()=>{o.classList.remove("hide"),e.classList.add("hide")}))})}async function h(t){try{const o=await fetch("/data/press.json");if(!o.ok)throw new Error(`Failed to fetch press data: ${o.status}`);const e=await o.json();t.innerHTML="",e.forEach(s=>{const a=document.createElement("div");a.classList.add("team-member-container"),a.innerHTML=`
      <div class="team-member">
        <img class='bw' src="${s.images[0]||"/public/media/IMG/default.png"}" 
             alt="${s.title} bandw">
        ${s.images[1]?`<img class='colour hide' src="${s.images[1]}" alt="${s.title} colour">`:""}
        <h2>${s.outlet}</h2>
        <p>${s.title} (${s.year})</p>
        <p>${s.type}</p>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="16" height="16" viewBox="0 0 256 256">
          <g transform="translate(1.4066 1.4066) scale(2.81 2.81)" fill="rgb(var(--grey-500))">
            <path d="M 45 0 C 20.147 0 0 20.147 0 45 c 0 24.853 20.147 45 45 45 s 45 -20.147 45 -45 C 90 20.147 69.853 0 45 0 z M 63.831 50.245 H 50.962 V 65 H 39.076 V 50.245 H 26.169 V 39.34 h 12.906 V 25 h 11.886 v 14.34 h 12.869 V 50.245 z"/>
          </g>
        </svg>
      </div>
       <div class="team-dropdown fade-in-d">
          <p>${s.statement||"No statement provided."}</p>
          ${s.link?`
            <button class="right-button" onclick="window.open('${s.link}', '_blank')">
              Learn More
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="16" height="16" viewBox="0 0 256 256">
                <g transform="translate(1.4066 1.4066) scale(2.81 2.81)" fill="rgb(var(--grey-500))">
                  <path d="M 45 0 C 20.147 0 0 20.147 0 45 c 0 24.853 20.147 45 45 45 s 45 -20.147 45 -45 C 90 20.147 69.853 0 45 0 z M 63.831 50.245 H 50.962 V 65 H 39.076 V 50.245 H 26.169 V 39.34 h 12.906 V 25 h 11.886 v 14.34 h 12.869 V 50.245 z"/>
                </g>
              </svg>              
            </button>
          `:""}
        </div>
      `,t.appendChild(a)}),d()}catch(o){console.error("Error loading press content:",o),t.innerHTML="<p>Failed to load press content.</p>"}}function l(t,o=""){if(!t){console.warn("No image element found for compression.");return}t.crossOrigin="anonymous",fetch(t.src,{mode:"cors"}).then(e=>e.blob()).then(e=>{const a={file:new File([e],"image.jpg",{type:e.type}),quality:.6,convertSize:1/0,redressOrientation:!0,beforeCompress(n){console.log(`BeforeCompress ${o}:`,n.size,n.type)},success(n){console.log(`Compression success ${o}:`,n.size,n.type),t.src=URL.createObjectURL(n);const r=e.size,i=n.size,c=(r-i)/r*100;console.log(`${o} original size:`,r,"bytes","| compressed size:",i,"bytes","| reduced:",c.toFixed(2)+"%")},error(n){console.error(`Compression error (${o}):`,n)}};new u(a)}).catch(e=>console.error(`Fetch error during compression (${o}):`,e))}function v(t){const o=document.getElementById("team-members");if(!o){console.error("❌ Could not find #team-member-container in DOM");return}o.innerHTML="",t.forEach(e=>{const s=document.createElement("div");s.classList.add("team-member-container"),s.innerHTML=`
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
        <h5 id="quick-title">Related Stories</h5>
        <div id="${e.name}-quickview" style="  display: grid;grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));align-items: start; /* prevents stretching */"></div>
    `,o.appendChild(s);const a=s.querySelector("img.bw"),n=s.querySelector("img.colour");l(a,`${e.firstname} bw`),l(n,`${e.firstname} colour`);const r=document.getElementById(`${e.name}-quickview`),i="/data/data_with_ids.json",c=e.projects;r&&c&&g(c,i,r,!0,"/data/stone_with_ids.json")}),d(),p()}function f(){console.log("📥 Fetching team data from /data/team.json"),fetch("/data/team.json").then(t=>{if(console.log("📡 Response status:",t.status),!t.ok)throw new Error(`Failed to fetch: ${t.status}`);return t.json()}).then(t=>{console.log("✅ JSON data fetched successfully:",t),v(t)}).catch(t=>console.error("❌ Error loading team:",t))}document.addEventListener("DOMContentLoaded",()=>{console.log("✅ DOM fully loaded, calling loadTeam()"),f();const t=document.getElementById("team-members");document.querySelectorAll(".team-button").forEach(e=>{e.addEventListener("click",()=>{const s=e.textContent.trim();if(t.innerHTML="",s==="Contact"){const a=document.createElement("div");a.id="contact-area",t.appendChild(a),m("contact-area","Audiovisuals",n=>{n.addEventListener("submit",r=>{r.preventDefault();const i=new FormData(n);console.log("✅ Form submitted:",Object.fromEntries(i))})})}else s==="Press"&&h(t)})})});
