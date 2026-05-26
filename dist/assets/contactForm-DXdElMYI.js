async function d(o="contact-container",t=null,n=null){const e=document.getElementById(o);if(!e){console.warn(`⏳ Waiting for #${o}...`),u(o,()=>d(o,t,n));return}e.innerHTML=`
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
  `;try{const r=await(await fetch("/data/services.json")).json();console.log("📦 services.json data:",r);const c=e.querySelector(".services-checkboxes");c.innerHTML="",r.forEach(i=>{console.log("➡️ service object:",i);const s=i.service,l=`service-${s.toLowerCase()}`,m=t?.toLowerCase()===s.toLowerCase()?"checked":"";c.innerHTML+=`
      <label for="${l}">
        <input type="checkbox" id="${l}" name="services" value="${s}" ${m}>
        ${s.charAt(0).toUpperCase()+s.slice(1)}
      </label>
    `}),f("contact-form"),typeof n=="function"&&n(e.querySelector("#contact-form"))}catch(a){console.error("❌ Error loading services.json:",a)}}function u(o,t){const n=new MutationObserver(()=>{document.getElementById(o)&&(n.disconnect(),t())});n.observe(document.body,{childList:!0,subtree:!0})}function f(o="contact-form"){const t=document.getElementById(o);if(!t){console.warn(`Form #${o} not found yet.`);return}t.addEventListener("submit",async n=>{n.preventDefault();const e=t.querySelector("button[type='submit']");e.disabled=!0,e.textContent="Sending…";const a=new FormData(t);a.has("form-name")||a.append("form-name",t.getAttribute("name")||"contact");try{if((await fetch("/",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:Array.from(a.entries()).map(([c,i])=>`${encodeURIComponent(c)}=${encodeURIComponent(i)}`).join("&")})).ok)e.textContent="Thank You!",t.reset(),console.log("✅ Form submitted successfully"),setTimeout(()=>{window.location.href="/"},1e3);else throw new Error("Form submission failed")}catch(r){console.error("❌ Form submission error:",r),e.textContent="Try again"}finally{setTimeout(()=>{e.disabled=!1,e.textContent!=="Thank You!"&&(e.textContent="Send")},3e3)}})}export{d as r};
