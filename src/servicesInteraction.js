/**
 * Attaches a click listener to a service pitch container that triggers its contact button.
 * @param {HTMLElement} pitchDiv - The .service-pitch container
 * @param {HTMLElement} serviceDiv - The .service-items container
 */


export function clearHashOnTop() {
  window.addEventListener("scroll", () => {
    if (window.scrollY === 0 && window.location.hash) {
      history.replaceState(null, null, " "); // removes the hash without reload
    }
  });
}


export function attachServiceItemClick(serviceDiv) {
  const learnMoreButton = serviceDiv.querySelector("button"); // assumes only one button inside service-footer

  if (!learnMoreButton) return; // safety check

  serviceDiv.addEventListener("click", (e) => {
    // Avoid triggering when clicking the button itself
    if (e.target.closest("button")) return;

    // Optionally, update the hash to the service ID
    const serviceHeader = serviceDiv.querySelector("h1");
    if (serviceHeader) {
      window.location.hash = `#${serviceHeader.textContent.trim()}`;
    }

    // Trigger the button click programmatically
    learnMoreButton.click();
  });
}

export function attachServicePitchClick(pitchDiv) {
  const contactButton = pitchDiv.querySelector(".service-button"); // assumes you already created this

  if (!contactButton) return; // safety check

  pitchDiv.addEventListener("click", (e) => {
    // Avoid triggering when clicking the contact button itself
    if (e.target.closest(".service-button")) return;

    // Optionally, update the hash
    const serviceId = contactButton.dataset.category;
    if (serviceId) {
      window.location.hash = `#${serviceId}`;
    }

    // Trigger the contact button click programmatically
    contactButton.click();
  });
}

