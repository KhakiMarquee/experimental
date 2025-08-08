import"./modulepreload-polyfill-B5Qt9EMX.js";function r(){return new URLSearchParams(window.location.search).get("category")}function l(e,o){const t=document.getElementById("content"),a=document.getElementById("page-title");fetch(o).then(n=>{if(!n.ok)throw new Error("Failed to fetch data.");return n.json()}).then(n=>{const i=n[e];a.textContent=e.charAt(0).toUpperCase()+e.slice(1),t.innerHTML="",i&&i.length?i.forEach(c=>{const s=document.createElement("div");s.classList.add("project-row"),s.innerHTML=`
            <div class="project-image">
              <img src="${c.image}" alt="${c.title}">
            </div>
            <div class="project-details">
              <h2>${c.title}</h2>
              <p class="project-theme">${c.theme}</p>
              <p class="project-description">${c.body}</p>
            </div>
          `,t.appendChild(s)}):t.innerHTML=`<p>No content found for "${e}".</p>`}).catch(n=>{console.error("Error:",n),t.innerHTML="<p>Error loading content.</p>"})}document.addEventListener("DOMContentLoaded",()=>{const e=r();e?l(e,"/experimental/data/data.json"):document.getElementById("content").innerHTML="<p>Invalid category.</p>";const o=document.getElementById("toggle-view"),t=document.querySelector(".projects-container");o&&t&&o.addEventListener("click",()=>{t.classList.toggle("row-view"),t.classList.toggle("list-view"),t.classList.contains("list-view")?o.textContent="Switch to Row View":o.textContent="Switch to List View"})});
