import"./category-Dij8vCmn.js";import{I as f}from"./index-CFRs9pJE.js";import{r as h}from"./templateQuickview-DQlxim-A.js";function l(){const t=document.querySelectorAll(".team-member-container");t.forEach(n=>{const e=n.querySelector(".team-member"),o=n.querySelector(".team-dropdown");!e||!o||e.addEventListener("click",()=>{t.forEach(s=>{const r=s.querySelector(".team-member"),i=s.querySelector(".team-dropdown");r&&i&&s!==n&&(r.classList.remove("active"),i.style.display="none",r.classList.remove("active"))}),e.classList.contains("active")?(e.classList.remove("active"),o.style.display="none",e.classList.remove("active")):(e.classList.add("active"),o.style.display="block",e.classList.add("active"))})})}document.addEventListener("DOMContentLoaded",()=>{l()});function g(){document.querySelectorAll(".team-member").forEach(t=>{const n=t.querySelector("img.bw"),e=t.querySelector("img.colour");!n||!e||(n.classList.remove("hide"),e.classList.add("hide"),t.addEventListener("mouseenter",()=>{n.classList.add("hide"),e.classList.remove("hide")}),t.addEventListener("mouseleave",()=>{n.classList.remove("hide"),e.classList.add("hide")}))})}async function u(t="contact-container",n=null,e=null){const o=document.getElementById(t);if(!o){console.warn(`⏳ Waiting for #${t}...`),v(t,()=>u(t,n,e));return}o.innerHTML=`
    <div class="contact-container" id="contact-area">
      <!-- Left Column: Info -->
      <div class="contact-info">
        <h2>Start a Project</h2>
        <p>General: <a href="mailto:contact@goke.studio">contact@goke.studio</a></p>

        <h2>Based in London</h2>
        <p>
          <br>
          Shadwell, London<br>
        </p>
        <p><a href="https://maps.app.goo.gl/E3YvDua81eZzKaUWA" target="_blank">📍 View on maps</a></p>
      </div>

      <!-- Right Column: Form -->
      <form id="contact-form" class="contact-form" name="contact" method="POST" data-netlify="true" netlify>
        <input type="hidden" name="form-name" value="contact"/>

        <label for="name">Your Name</label>
        <input type="text" id="name" name="name" required/>

        <label for="email">Email Address</label>
        <input type="email" id="email" name="email" required/>

        <label for="company">Company</label>
        <input type="text" id="company" name="company"/>

        <label>Services</label>
        <div class="services-checkboxes">Loading...</div>

        <label for="message">Message</label>
        <textarea id="message" name="message" rows="4" required></textarea>

        <button type="submit">Start Project</button>
      </form>
    </div>
  `;try{const s=await(await fetch("/data/services.json")).json();console.log("📦 services.json data:",s);const r=o.querySelector(".services-checkboxes");r.innerHTML="",s.forEach(i=>{console.log("➡️ service object:",i);const c=i.service,d=`service-${c.toLowerCase()}`,p=n?.toLowerCase()===c.toLowerCase()?"checked":"";r.innerHTML+=`
      <label for="${d}">
        <input type="checkbox" id="${d}" name="services" value="${c}" ${p}>
        ${c.charAt(0).toUpperCase()+c.slice(1)}
      </label>
    `}),w("contact-form"),typeof e=="function"&&e(o.querySelector("#contact-form"))}catch(a){console.error("❌ Error loading services.json:",a)}}function v(t,n){const e=new MutationObserver(()=>{document.getElementById(t)&&(e.disconnect(),n())});e.observe(document.body,{childList:!0,subtree:!0})}function w(t="contact-form"){const n=document.getElementById(t);if(!n){console.warn(`Form #${t} not found yet.`);return}n.addEventListener("submit",async e=>{e.preventDefault();const o=n.querySelector("button[type='submit']");o.disabled=!0,o.textContent="Sending…";const a=new FormData(n);a.has("form-name")||a.append("form-name",n.getAttribute("name")||"contact");try{if((await fetch("/",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:Array.from(a.entries()).map(([r,i])=>`${encodeURIComponent(r)}=${encodeURIComponent(i)}`).join("&")})).ok)o.textContent="Thank You!",n.reset(),console.log("✅ Form submitted successfully"),setTimeout(()=>{window.location.href="/"},1e3);else throw new Error("Form submission failed")}catch(s){console.error("❌ Form submission error:",s),o.textContent="Try again"}finally{setTimeout(()=>{o.disabled=!1,o.textContent!=="Thank You!"&&(o.textContent="Send")},3e3)}})}async function y(t){try{const n=await fetch("/data/press.json");if(!n.ok)throw new Error(`Failed to fetch press data: ${n.status}`);const e=await n.json();t.innerHTML="",e.forEach(o=>{const a=document.createElement("div");a.classList.add("team-member-container"),a.innerHTML=`
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
      `,t.appendChild(a)}),l()}catch(n){console.error("Error loading press content:",n),t.innerHTML="<p>Failed to load press content.</p>"}}function m(t,n=""){if(!t){console.warn("No image element found for compression.");return}t.crossOrigin="anonymous",fetch(t.src,{mode:"cors"}).then(e=>e.blob()).then(e=>{const a={file:new File([e],"image.jpg",{type:e.type}),quality:.6,convertSize:1/0,redressOrientation:!0,beforeCompress(s){console.log(`BeforeCompress ${n}:`,s.size,s.type)},success(s){console.log(`Compression success ${n}:`,s.size,s.type),t.src=URL.createObjectURL(s);const r=e.size,i=s.size,c=(r-i)/r*100;console.log(`${n} original size:`,r,"bytes","| compressed size:",i,"bytes","| reduced:",c.toFixed(2)+"%")},error(s){console.error(`Compression error (${n}):`,s)}};new f(a)}).catch(e=>console.error(`Fetch error during compression (${n}):`,e))}function b(t){const n=document.getElementById("team-members");if(!n){console.error("❌ Could not find #team-member-container in DOM");return}n.innerHTML="",t.forEach(e=>{const o=document.createElement("div");o.classList.add("team-member-container"),o.innerHTML=`
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
    `,n.appendChild(o);const a=o.querySelector("img.bw"),s=o.querySelector("img.colour");m(a,`${e.firstname} bw`),m(s,`${e.firstname} colour`);const r=document.getElementById(`${e.name}-quickview`),i="/data/data_with_ids.json",c=e.projects;r&&c&&h(c,i,r,!0,"/data/stone_with_ids.json")}),l(),g()}function $(){console.log("📥 Fetching team data from /data/team.json"),fetch("/data/team.json").then(t=>{if(console.log("📡 Response status:",t.status),!t.ok)throw new Error(`Failed to fetch: ${t.status}`);return t.json()}).then(t=>{console.log("✅ JSON data fetched successfully:",t),b(t)}).catch(t=>console.error("❌ Error loading team:",t))}document.addEventListener("DOMContentLoaded",()=>{console.log("✅ DOM fully loaded, calling loadTeam()"),$();const t=document.getElementById("team-members");document.querySelectorAll(".team-button").forEach(e=>{e.addEventListener("click",()=>{const o=e.textContent.trim();if(t.innerHTML="",o==="Contact"){const a=document.createElement("div");a.id="contact-area",t.appendChild(a),u("contact-area","Audiovisuals",s=>{s.addEventListener("submit",r=>{r.preventDefault();const i=new FormData(s);console.log("✅ Form submitted:",Object.fromEntries(i))})})}else o==="Press"&&y(t)})})});
