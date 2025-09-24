async function u(n="contact-container",t=null,o=null){const e=document.getElementById(n);if(!e){console.warn(`⏳ Waiting for #${n}...`),d(n,()=>u(n,t,o));return}e.innerHTML=`
    <div class="contact-container" id="contact-area">
      <!-- Left Column: Info -->
      <div class="contact-info">
        <h2>Start a Project</h2>
        <p>General: <a href="mailto:goke.studio@proton.me">goke.studio@proton.me</a></p>

        <h2>Based in London</h2>
        <p>
          <br>
          Shadwell, London<br>
        </p>
        <p><a href="https://maps.app.goo.gl/E3YvDua81eZzKaUWA" target="_blank">📍 View on maps</a></p>
      </div>

      <!-- Right Column: Form -->
      <form id="contact-form" class="contact-form" name="contact" method="POST" data-netlify="true" netlify>
        <input type="hidden" name="form-name" value="contact">

        <label for="name">Your Name</label>
        <input type="text" id="name" name="name" required>

        <label for="email">Email Address</label>
        <input type="email" id="email" name="email" required>

        <label for="company">Company</label>
        <input type="text" id="company" name="company">

        <label>Services</label>
        <div class="services-checkboxes">Loading...</div>

        <label for="message">Message</label>
        <textarea id="message" name="message" rows="4" required></textarea>

        <button type="submit">Start Project</button>
      </form>
    </div>
  `;try{const a=await(await fetch("/data/services.json")).json();console.log("📦 services.json data:",a);const c=e.querySelector(".services-checkboxes");c.innerHTML="",a.forEach(i=>{console.log("➡️ service object:",i);const s=i.service,l=`service-${s.toLowerCase()}`,m=t?.toLowerCase()===s.toLowerCase()?"checked":"";c.innerHTML+=`
      <label for="${l}">
        <input type="checkbox" id="${l}" name="services" value="${s}" ${m}>
        ${s.charAt(0).toUpperCase()+s.slice(1)}
      </label>
    `}),typeof o=="function"&&o(e.querySelector("#contact-form")),f("contact-form"),typeof o=="function"&&o(e.querySelector("#contact-form"))}catch(r){console.error("❌ Error loading services.json:",r)}}function d(n,t){const o=new MutationObserver(()=>{document.getElementById(n)&&(o.disconnect(),t())});o.observe(document.body,{childList:!0,subtree:!0})}function f(n="contact-form"){const t=document.getElementById(n);if(!t){console.warn(`Form #${n} not found yet.`);return}t.addEventListener("submit",async o=>{o.preventDefault();const e=t.querySelector("button[type='submit']");e.disabled=!0,e.textContent="Sending…";const r=new FormData(t);r.has("form-name")||r.append("form-name",t.getAttribute("name")||"contact");try{if((await fetch("/",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams(r).toString()})).ok)e.textContent="Thank You!",t.reset(),console.log("✅ Form submitted successfully"),setTimeout(()=>{window.location.href="/"},1e3);else throw new Error("Form submission failed")}catch(a){console.error("❌ Form submission error:",a),e.textContent="Try again"}finally{setTimeout(()=>{e.disabled=!1,e.textContent="Send"},3e3)}})}export{u as r};
