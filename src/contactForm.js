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

      // Call onReady callback if provided
    if (typeof onReady === "function") {
      onReady(container.querySelector("#contact-form"));
    }

    // ✅ Initialize Netlify form handling
    setupContactForm("contact-form"); // or use formEl.id if you have a reference

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

export function setupContactForm(formId = "contact-form") {
  const form = document.getElementById(formId);
  if (!form) {
    console.warn(`Form #${formId} not found yet.`);
    return;
  }

  // Handle submit
  form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitButton = form.querySelector("button[type='submit']");
  submitButton.disabled = true;
  submitButton.textContent = "Sending…";

  const formData = new FormData(form);

  // ✅ Ensure "form-name" is included for Netlify
  if (!formData.has("form-name")) {
    formData.append("form-name", form.getAttribute("name") || "contact");
  }

  try {
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    });

    if (response.ok) {
      submitButton.textContent = "Thank You!";
      form.reset();
      console.log("✅ Form submitted successfully");

      // Redirect to index page after successful submission
      setTimeout(() => {
        window.location.href = "/"; // or '/index.html' if needed
      }, 1000); // show "Thank You!" briefly before redirect
    } else {
      throw new Error("Form submission failed");
    }
  } catch (err) {
    console.error("❌ Form submission error:", err);
    submitButton.textContent = "Try again";
  } finally {
    setTimeout(() => {
      submitButton.disabled = false;
      submitButton.textContent = "Send";
    }, 3000);
  }
});
}