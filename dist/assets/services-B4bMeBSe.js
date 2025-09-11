import"./category-CRuVcF4M.js";import{r as m}from"./contactForm-i3nncXh1.js";function v(){window.addEventListener("scroll",()=>{window.scrollY===0&&window.location.hash&&history.replaceState(null,null," ")})}function f(t){const e=t.querySelector("button");e&&t.addEventListener("click",i=>{if(i.target.closest("button"))return;const n=t.querySelector("h1");n&&(window.location.hash=`#${n.textContent.trim()}`),e.click()})}function g(t){const e=t.querySelector(".service-button");e&&t.addEventListener("click",i=>{if(i.target.closest(".service-button"))return;const n=e.dataset.category;n&&(window.location.hash=`#${n}`),e.click()})}function w(){function t(){const e=window.location.hash.replace("#","").trim();e&&(document.querySelectorAll(".pitch-items img, .service-items img").forEach(i=>{i.classList.remove("active")}),document.querySelectorAll(`#${CSS.escape(e)}.pitch-items img, .pitch-items #${CSS.escape(e)} img`).forEach(i=>i.classList.add("active")),document.querySelectorAll(".service-items").forEach(i=>{const n=i.querySelector("h1");if(n&&n.textContent.trim().toLowerCase()===e){const o=i.querySelector("img");o&&o.classList.add("active")}}))}t(),window.addEventListener("hashchange",t)}const s="http://www.w3.org/2000/svg";function p(){const t=document.createElementNS(s,"svg");t.setAttribute("xmlns","http://www.w3.org/2000/svg"),t.setAttribute("xmlns:xlink","http://www.w3.org/1999/xlink"),t.setAttribute("version","1.1"),t.setAttribute("width","16"),t.setAttribute("height","16"),t.setAttribute("viewBox","0 0 256 256"),t.setAttribute("xml:space","preserve");const e=document.createElementNS(s,"g");e.setAttribute("style","stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"),e.setAttribute("transform","translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)");const i=document.createElementNS(s,"path");return i.setAttribute("d","M 45 0 C 20.147 0 0 20.147 0 45 c 0 24.853 20.147 45 45 45 s 45 -20.147 45 -45 C 90 20.147 69.853 0 45 0 z M 63.831 50.245 H 50.962 V 65 H 39.076 V 50.245 H 26.169 V 39.34 h 12.906 V 25 h 11.886 v 14.34 h 12.869 V 50.245 z"),i.setAttribute("style","stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(var(--grey-500)); fill-rule: nonzero; opacity: 1;"),i.setAttribute("stroke-linecap","round"),e.appendChild(i),t.appendChild(e),t}function b(t){const e=document.createElement("div");e.classList.add("service-items","fade-in"),e.innerHTML=`
    <div class='service-header'>
      <h1 class="fade-in">${t.service.toUpperCase()}</h1>
    </div>
    <div>
      <img src="${t.images[0]||"/public/media/IMG/default.png"}" alt="${t.service}">
    </div>
    <div class='service-intro'>
      <span class="audience">heritage</span>
      <span class="audience">culture</span>
      <span class="audience">architecture</span>
      <p class="fade-in">${t.intro}</p>
    </div>
    <div class="service-description">${t["short-description"]}</div>
    <div class="service-footer">
    </div>
  `;const i=document.createElement("button");return i.addEventListener("click",()=>{window.location.hash=`#${t.service}`}),i.textContent="Learn More",i.appendChild(p()),e.querySelector(".service-footer").appendChild(i),e}function y(t){const e=document.createElement("div");e.classList.add("service-pitch");const i=t.images.map(c=>`<img src="${c}" alt="${t.service}">`).join(""),n=t.packages.map(c=>`<li>${c.name}: ${c.description}</li>`).join(""),o=t.timeline.map(c=>`<div class="day-card">${c}</div>`).join("");e.innerHTML=`
    <div class="pitch-items fade-in" id="${t.service}">
      <div class="pitch-header">
        <h1>${t.service.toUpperCase()}</h1>
      </div>
      <div class="pitch-intro">
        <p>${t.intro}</p>
      </div>
      <div>${i}</div>
      <div class="pitch-description">
        ${t.description}
        <div class="pitch-package-items"><ul>${n}</ul></div>
      </div>
      <div class="pitch-timeline">${o}</div>
      <div class="pitch-footer">
        <div class="pitch-price">
          ${Array.isArray(t.price)?t.price.join(" – "):t.price}
        </div>
      </div>
    </div>
  `;const r=document.createElement("button");return r.id="contact-button",r.classList.add("service-button"),r.dataset.category=t.service,r.textContent="Contact Us ",r.appendChild(p()),e.querySelector(".pitch-footer").appendChild(r),r.addEventListener("click",()=>{const c=r.dataset.category,a=document.getElementById("services-pitch-container");a.innerHTML="";const d=document.createElement("div");d.id="service-contact-area",a.appendChild(d),m("service-contact-area",c,l=>{l.addEventListener("submit",h=>{h.preventDefault();const u=new FormData(l);u.append("category",c),console.log("✅ Service form submitted:",Object.fromEntries(u))})})}),e}function C(){fetch("/data/services.json").then(t=>{if(!t.ok)throw new Error(`Failed to fetch services: ${t.status}`);return t.json()}).then(t=>{const e=document.querySelector(".services-container"),i=document.getElementById("pitch-container");e.innerHTML="",i.innerHTML="",t.forEach(n=>{const o=b(n);e.appendChild(o),f(o);const r=y(n);i.appendChild(r),g(r)})}).catch(t=>console.error("Error loading services:",t))}document.addEventListener("DOMContentLoaded",()=>{C(),v(),w()});
