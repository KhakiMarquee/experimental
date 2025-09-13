import"./category-CSjL62dU.js";import{r as l}from"./contactForm-UFbcZeF4.js";function c(){const t=document.querySelectorAll(".team-member-container");t.forEach(a=>{const e=a.querySelector(".team-member"),s=a.querySelector(".team-dropdown");!e||!s||e.addEventListener("click",()=>{t.forEach(n=>{const r=n.querySelector(".team-member"),i=n.querySelector(".team-dropdown");r&&i&&n!==a&&(r.classList.remove("active"),i.style.display="none",r.classList.remove("active"))}),e.classList.contains("active")?(e.classList.remove("active"),s.style.display="none",e.classList.remove("active")):(e.classList.add("active"),s.style.display="block",e.classList.add("active"))})})}document.addEventListener("DOMContentLoaded",()=>{c()});function d(){document.querySelectorAll(".team-member").forEach(t=>{const a=t.querySelector("img.bw"),e=t.querySelector("img.colour");!a||!e||(a.classList.remove("hide"),e.classList.add("hide"),t.addEventListener("mouseenter",()=>{a.classList.add("hide"),e.classList.remove("hide")}),t.addEventListener("mouseleave",()=>{a.classList.remove("hide"),e.classList.add("hide")}))})}async function m(t){try{const a=await fetch("/data/press.json");if(!a.ok)throw new Error(`Failed to fetch press data: ${a.status}`);const e=await a.json();t.innerHTML="",e.forEach(s=>{const o=document.createElement("div");o.classList.add("team-member-container"),o.innerHTML=`
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
      `,t.appendChild(o)}),c()}catch(a){console.error("Error loading press content:",a),t.innerHTML="<p>Failed to load press content.</p>"}}function v(t){const a=document.getElementById("team-members");if(!a){console.error("❌ Could not find #team-member-container in DOM");return}a.innerHTML="",t.forEach(e=>{const s=document.createElement("div");s.classList.add("team-member-container"),s.innerHTML=`
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
    `,a.appendChild(s)}),c(),d()}function h(){console.log("📥 Fetching team data from /data/team.json"),fetch("/data/team.json").then(t=>{if(console.log("📡 Response status:",t.status),!t.ok)throw new Error(`Failed to fetch: ${t.status}`);return t.json()}).then(t=>{console.log("✅ JSON data fetched successfully:",t),v(t)}).catch(t=>console.error("❌ Error loading team:",t))}document.addEventListener("DOMContentLoaded",()=>{console.log("✅ DOM fully loaded, calling loadTeam()"),h();const t=document.getElementById("team-members");document.querySelectorAll(".team-button").forEach(e=>{e.addEventListener("click",()=>{const s=e.textContent.trim();if(t.innerHTML="",s==="Contact"){const o=document.createElement("div");o.id="contact-area",t.appendChild(o),l("contact-area","Audiovisuals",n=>{n.addEventListener("submit",r=>{r.preventDefault();const i=new FormData(n);console.log("✅ Form submitted:",Object.fromEntries(i))})})}else s==="Press"&&m(t)})})});
