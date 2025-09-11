export async function renderContactForm(containerId = "contact-container", preselected = null, onReady = null) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.warn(`⏳ Waiting for #${containerId}...`);
    waitForContainer(containerId, () => renderContactForm(containerId, preselected, onReady));
    return;
  }

  container.innerHTML = `
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
  `;

  try {
  const res = await fetch("/data/services.json");
  const services = await res.json();

  console.log("📦 services.json data:", services); // 👈 log full data

  const servicesContainer = container.querySelector(".services-checkboxes");
  servicesContainer.innerHTML = "";

  services.forEach(serviceObj => {
    console.log("➡️ service object:", serviceObj); // 👈 log each entry
    const serviceName = serviceObj.service;
    const id = `service-${serviceName.toLowerCase()}`;
    const checked = preselected?.toLowerCase() === serviceName.toLowerCase() ? "checked" : "";

    servicesContainer.innerHTML += `
      <label for="${id}">
        <input type="checkbox" id="${id}" name="services" value="${serviceName}" ${checked}>
        ${serviceName.charAt(0).toUpperCase() + serviceName.slice(1)}
      </label>
    `;
  });

    if (typeof onReady === "function") {
      onReady(container.querySelector("#contact-form"));
    }
  } catch (err) {
    console.error("❌ Error loading services.json:", err);
  }
}

// --- Utility: wait for container ---
function waitForContainer(id, callback) {
  const observer = new MutationObserver(() => {
    const el = document.getElementById(id);
    if (el) {
      observer.disconnect();
      callback();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}
