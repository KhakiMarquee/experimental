import"./category-CRuVcF4M.js";import{r as l}from"./contactForm-De6UGRCg.js";function i(){const t=document.querySelectorAll(".team-member-container");t.forEach(s=>{const e=s.querySelector(".team-member"),a=s.querySelector(".team-dropdown");!e||!a||e.addEventListener("click",()=>{t.forEach(n=>{const r=n.querySelector(".team-member"),c=n.querySelector(".team-dropdown");r&&c&&n!==s&&(r.classList.remove("active"),c.style.display="none",r.classList.remove("active"))}),e.classList.contains("active")?(e.classList.remove("active"),a.style.display="none",e.classList.remove("active")):(e.classList.add("active"),a.style.display="block",e.classList.add("active"))})})}document.addEventListener("DOMContentLoaded",()=>{i()});async function d(t){try{const s=await fetch("/data/press.json");if(!s.ok)throw new Error(`Failed to fetch press data: ${s.status}`);const e=await s.json();t.innerHTML="",e.forEach(a=>{const o=document.createElement("div");o.classList.add("team-member"),o.innerHTML=`
        <img class='bw' src="${a.images[0]||"/public/media/IMG/default.png"}" 
             alt="${a.title} bandw">
        ${a.images[1]?`<img class='colour hide' src="${a.images[1]}" alt="${a.title} colour">`:""}
        <h2>${a.outlet}</h2>
        <p>${a.title} (${a.year})</p>
        <p>${a.type}</p>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="16" height="16" viewBox="0 0 256 256">
          <g transform="translate(1.4066 1.4066) scale(2.81 2.81)" fill="rgb(var(--grey-500))">
            <path d="M 45 0 C 20.147 0 0 20.147 0 45 c 0 24.853 20.147 45 45 45 s 45 -20.147 45 -45 C 90 20.147 69.853 0 45 0 z M 63.831 50.245 H 50.962 V 65 H 39.076 V 50.245 H 26.169 V 39.34 h 12.906 V 25 h 11.886 v 14.34 h 12.869 V 50.245 z"/>
          </g>
        </svg>
      `;const n=document.createElement("div");n.classList.add("team-dropdown","fade-in-d"),n.innerHTML=a.statement||"No statement provided.",t.appendChild(o),t.appendChild(n)})}catch(s){console.error("Error loading press content:",s),t.innerHTML="<p>Failed to load press content.</p>"}}function m(t){const s=document.getElementById("team-members");if(!s){console.error("❌ Could not find #team-member-container in DOM");return}s.innerHTML="",t.forEach(e=>{const a=document.createElement("div");a.classList.add("team-member-container"),a.innerHTML=`
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
    `,s.appendChild(a)}),i()}function p(){console.log("📥 Fetching team data from /data/team.json"),fetch("/data/team.json").then(t=>{if(console.log("📡 Response status:",t.status),!t.ok)throw new Error(`Failed to fetch: ${t.status}`);return t.json()}).then(t=>{console.log("✅ JSON data fetched successfully:",t),m(t)}).catch(t=>console.error("❌ Error loading team:",t))}document.addEventListener("DOMContentLoaded",()=>{console.log("✅ DOM fully loaded, calling loadTeam()"),p();const t=document.getElementById("team-members");document.querySelectorAll(".team-button").forEach(e=>{e.addEventListener("click",()=>{const a=e.textContent.trim();if(t.innerHTML="",a==="Contact"){const o=document.createElement("div");o.id="contact-area",t.appendChild(o),l("contact-area","Audiovisuals",n=>{n.addEventListener("submit",r=>{r.preventDefault();const c=new FormData(n);console.log("✅ Form submitted:",Object.fromEntries(c))})})}else a==="Press"&&d(t)})})});
