async function d(e="contact-container",n=null,o=null){const t=document.getElementById(e);if(!t){console.warn(`⏳ Waiting for #${e}...`),u(e,()=>d(e,n,o));return}t.innerHTML=`
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
      <form id="contact-form" class="contact-form">
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

        <button type="submit">Send</button>
      </form>
    </div>
  `;try{const c=await(await fetch("/data/services.json")).json();console.log("📦 services.json data:",c);const s=t.querySelector(".services-checkboxes");s.innerHTML="",c.forEach(i=>{console.log("➡️ service object:",i);const a=i.service,l=`service-${a.toLowerCase()}`,m=n?.toLowerCase()===a.toLowerCase()?"checked":"";s.innerHTML+=`
      <label for="${l}">
        <input type="checkbox" id="${l}" name="services" value="${a}" ${m}>
        ${a.charAt(0).toUpperCase()+a.slice(1)}
      </label>
    `}),typeof o=="function"&&o(t.querySelector("#contact-form"))}catch(r){console.error("❌ Error loading services.json:",r)}}function u(e,n){const o=new MutationObserver(()=>{document.getElementById(e)&&(o.disconnect(),n())});o.observe(document.body,{childList:!0,subtree:!0})}export{d as r};
