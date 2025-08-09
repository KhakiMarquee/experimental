import"./loader-CeV1iIi8.js";function r(){return new URLSearchParams(window.location.search).get("category")}function d(e,t){const o=document.getElementById("content"),a=document.getElementById("page-title");fetch(t).then(c=>{if(!c.ok)throw new Error("Failed to fetch data.");return c.json()}).then(c=>{const i=c[e];a.textContent=e.charAt(0).toUpperCase()+e.slice(1),o.innerHTML="",i&&i.length?i.forEach(n=>{const s=document.createElement("div");s.classList.add("project-row"),s.innerHTML=`
            <div class="project-image">
              <img src="${n.image}" alt="${n.title}">
            </div>
            <div class="project-details">
              <h2>${n.title}</h2>
              <span class="project-client">${n.client}</span>
              <div class="project-meta">
                <p class="project-theme">${n.theme}</p>
                <p class="project-description">${n.description}</p>   
                  <span class="project-type">${n.type}</span>
              </div>
            </div>
          `,o.appendChild(s)}):o.innerHTML=`<p>No content found for "${e}".</p>`}).catch(c=>{console.error("Error:",c),o.innerHTML="<p>Error loading content.</p>"})}document.addEventListener("DOMContentLoaded",()=>{const e=r();e?d(e,"/data/data.json"):document.getElementById("content").innerHTML="<p>Invalid category.</p>",document.getElementById("grid-view").addEventListener("click",()=>{const t=document.querySelector(".projects-container");t.classList.add("row-view"),t.classList.remove("list-view"),document.getElementById("grid-view").classList.add("active"),document.getElementById("list-view").classList.remove("active")}),document.getElementById("list-view").addEventListener("click",()=>{const t=document.querySelector(".projects-container");t.classList.add("list-view"),t.classList.remove("row-view"),document.getElementById("list-view").classList.add("active"),document.getElementById("grid-view").classList.remove("active")})});
