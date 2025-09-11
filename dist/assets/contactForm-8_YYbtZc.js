async function u(n="contact-container",t=null,o=null){const e=document.getElementById(n);if(!e){console.warn(`⏳ Waiting for #${n}...`),d(n,()=>u(n,t,o));return}e.innerHTML=`
    <div class="contact-container" id="contact-area">
      <!-- Left Column: Info -->
      <div class="contact-info">
        <h2>Start a project</h2>
        <p><a href="mailto:goke.studio@gmail.com">goke.studio@gmail.com</a></p>

        <h2>We are based in London</h2>
        <p>
          <br>
          Shadwell, London<br>
        </p>
        <p><a href="https://maps.google.com" target="_blank">📍 View on maps</a></p>
      </div>

      <!-- Right Column: Form -->
      <form id="contact-form" class="contact-form" name="contact" netlify method="POST" data-netlify="true">
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

        <button type="submit">Work with us</button>
      </form>
    </div>
  `;try{const r=await(await fetch("/data/services.json")).json();console.log("📦 services.json data:",r);const c=e.querySelector(".services-checkboxes");c.innerHTML="",r.forEach(i=>{console.log("➡️ service object:",i);const a=i.service,l=`service-${a.toLowerCase()}`,m=t?.toLowerCase()===a.toLowerCase()?"checked":"";c.innerHTML+=`
      <label for="${l}">
        <input type="checkbox" id="${l}" name="services" value="${a}" ${m}>
        ${a.charAt(0).toUpperCase()+a.slice(1)}
      </label>
    `}),typeof o=="function"&&o(e.querySelector("#contact-form")),f("contact-form"),typeof o=="function"&&o(e.querySelector("#contact-form"))}catch(s){console.error("❌ Error loading services.json:",s)}}function d(n,t){const o=new MutationObserver(()=>{document.getElementById(n)&&(o.disconnect(),t())});o.observe(document.body,{childList:!0,subtree:!0})}function f(n="contact-form"){const t=document.getElementById(n);if(!t){console.warn(`Form #${n} not found yet.`);return}t.addEventListener("submit",async o=>{o.preventDefault();const e=t.querySelector("button[type='submit']");e.disabled=!0,e.textContent="Sending…";const s=new FormData(t);try{if((await fetch("/",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams(s).toString()})).ok)e.textContent="Thank You!",t.reset(),console.log("✅ Form submitted successfully"),setTimeout(()=>{window.location.href="/"},1e3);else throw new Error("Form submission failed")}catch(r){console.error("❌ Form submission error:",r),e.textContent="Try again"}finally{setTimeout(()=>{e.disabled=!1,e.textContent="Send"},3e3)}})}export{u as r};
