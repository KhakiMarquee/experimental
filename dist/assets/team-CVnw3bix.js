import"./category-BDnK_ko2.js";import{r as c}from"./contactForm-CDDnyrIG.js";function l(){const a=document.querySelectorAll(".team-member-container");a.forEach(s=>{const t=s.querySelector(".team-member"),e=s.querySelector(".team-dropdown");!t||!e||t.addEventListener("click",()=>{a.forEach(o=>{const r=o.querySelector(".team-member"),i=o.querySelector(".team-dropdown");r&&i&&o!==s&&(r.classList.remove("active"),i.style.display="none",r.classList.remove("active"))}),t.classList.contains("active")?(t.classList.remove("active"),e.style.display="none",t.classList.remove("active")):(t.classList.add("active"),e.style.display="block",t.classList.add("active"))})})}document.addEventListener("DOMContentLoaded",()=>{l()});async function d(a){try{const s=await fetch("/data/press.json");if(!s.ok)throw new Error(`Failed to fetch press data: ${s.status}`);const t=await s.json();a.innerHTML="",t.forEach(e=>{const n=document.createElement("div");n.classList.add("team-member-container"),n.innerHTML=`
      <div class="team-member">
        <img class='bw' src="${e.images[0]||"/public/media/IMG/default.png"}" 
             alt="${e.title} bandw">
        ${e.images[1]?`<img class='colour hide' src="${e.images[1]}" alt="${e.title} colour">`:""}
        <h2>${e.outlet}</h2>
        <p>${e.title} (${e.year})</p>
        <p>${e.type}</p>
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
              Learn More
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="16" height="16" viewBox="0 0 256 256">
                <g transform="translate(1.4066 1.4066) scale(2.81 2.81)" fill="rgb(var(--grey-500))">
                  <path d="M 45 0 C 20.147 0 0 20.147 0 45 c 0 24.853 20.147 45 45 45 s 45 -20.147 45 -45 C 90 20.147 69.853 0 45 0 z M 63.831 50.245 H 50.962 V 65 H 39.076 V 50.245 H 26.169 V 39.34 h 12.906 V 25 h 11.886 v 14.34 h 12.869 V 50.245 z"/>
                </g>
              </svg>              
            </button>
          `:""}
        </div>
      `,a.appendChild(n)}),l()}catch(s){console.error("Error loading press content:",s),a.innerHTML="<p>Failed to load press content.</p>"}}function m(a){const s=document.getElementById("team-members");if(!s){console.error("❌ Could not find #team-member-container in DOM");return}s.innerHTML="",a.forEach(t=>{const e=document.createElement("div");e.classList.add("team-member-container"),e.innerHTML=`
      <div class="team-member">
        <img class='bw' src="${t.images[0]||"/public/media/IMG/default.png"}" 
            alt="${t.firstname} ${t.lastname} bandw">
        <img class='colour hide' src="${t.images[1]||"/public/media/IMG/default.png"}" 
            alt="${t.firstname} ${t.lastname} colour">
        <h2>${t.firstname} ${t.lastname}</h2>
        <p>${t.role}</p>
        <p>${t.email}</p>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="16" height="16" viewBox="0 0 256 256">
          <g transform="translate(1.4066 1.4066) scale(2.81 2.81)" fill="rgb(var(--grey-500))">
            <path d="M 45 0 C 20.147 0 0 20.147 0 45 c 0 24.853 20.147 45 45 45 s 45 -20.147 45 -45 C 90 20.147 69.853 0 45 0 z M 63.831 50.245 H 50.962 V 65 H 39.076 V 50.245 H 26.169 V 39.34 h 12.906 V 25 h 11.886 v 14.34 h 12.869 V 50.245 z"/>
          </g>
        </svg>
      </div>
      <div class="team-dropdown fade-in-d">
        <p>${t.statement||"No statement provided."}</p>
        ${t.link?`
          <button class="right-button" onclick="window.open('${t.link}', '_blank')">
            SubStack
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="16" height="16" viewBox="0 0 256 256">
              <g transform="translate(1.4066 1.4066) scale(2.81 2.81)" fill="rgb(var(--grey-500))">
                <path d="M 45 0 C 20.147 0 0 20.147 0 45 c 0 24.853 20.147 45 45 45 s 45 -20.147 45 -45 C 90 20.147 69.853 0 45 0 z M 63.831 50.245 H 50.962 V 65 H 39.076 V 50.245 H 26.169 V 39.34 h 12.906 V 25 h 11.886 v 14.34 h 12.869 V 50.245 z"/>
              </g>
            </svg>              
          </button>
        `:""}
      </div>
    `,s.appendChild(e)}),l()}function v(){console.log("📥 Fetching team data from /data/team.json"),fetch("/data/team.json").then(a=>{if(console.log("📡 Response status:",a.status),!a.ok)throw new Error(`Failed to fetch: ${a.status}`);return a.json()}).then(a=>{console.log("✅ JSON data fetched successfully:",a),m(a)}).catch(a=>console.error("❌ Error loading team:",a))}document.addEventListener("DOMContentLoaded",()=>{console.log("✅ DOM fully loaded, calling loadTeam()"),v();const a=document.getElementById("team-members");document.querySelectorAll(".team-button").forEach(t=>{t.addEventListener("click",()=>{const e=t.textContent.trim();if(a.innerHTML="",e==="Contact"){const n=document.createElement("div");n.id="contact-area",a.appendChild(n),c("contact-area","Audiovisuals",o=>{o.addEventListener("submit",r=>{r.preventDefault();const i=new FormData(o);console.log("✅ Form submitted:",Object.fromEntries(i))})})}else e==="Press"&&d(a)})})});
