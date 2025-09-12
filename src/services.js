
import { renderContactForm } from "./contactForm.js";
import { clearHashOnTop, attachServicePitchClick, attachServiceItemClick, handleHashOnLoad } from "./servicesInteraction.js";
import { initServiceHighlight } from "./servicesHighlight.js";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";



gsap.registerPlugin(ScrollToPlugin);



const svgNS = "http://www.w3.org/2000/svg";

function createSVG() {
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
  svg.setAttribute("version", "1.1");
  svg.setAttribute("width", "16");
  svg.setAttribute("height", "16");
  svg.setAttribute("viewBox", "0 0 256 256");
  svg.setAttribute("xml:space", "preserve");

  const g = document.createElementNS(svgNS, "g");
  g.setAttribute(
    "style",
    "stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;"
  );
  g.setAttribute(
    "transform",
    "translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
  );

  const path = document.createElementNS(svgNS, "path");
  path.setAttribute(
    "d",
    "M 45 0 C 20.147 0 0 20.147 0 45 c 0 24.853 20.147 45 45 45 s 45 -20.147 45 -45 C 90 20.147 69.853 0 45 0 z M 63.831 50.245 H 50.962 V 65 H 39.076 V 50.245 H 26.169 V 39.34 h 12.906 V 25 h 11.886 v 14.34 h 12.869 V 50.245 z"
  );
  path.setAttribute(
    "style",
    "stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(var(--grey-500)); fill-rule: nonzero; opacity: 1;"
  );
  path.setAttribute("stroke-linecap", "round");

  g.appendChild(path);
  svg.appendChild(g);

  return svg;
}

function createServiceItem(service) {
  const div = document.createElement("div");
  div.classList.add("service-items", "fade-in");

  div.innerHTML = `
    <div class='service-header'>
      <h1 class="fade-in">${service.service.toUpperCase()}</h1>
    </div>
    <div>
      <img src="${service.images[0] || '/public/media/IMG/default.png'}" alt="${service.service}">
    </div>
    <div class='service-intro'>
      <span class="audience">heritage</span>
      <span class="audience">culture</span>
      <span class="audience">architecture</span>
      <p class="fade-in">${service.intro}</p>
    </div>
    <div class="service-description">${service["short-description"]}</div>
    <div class="service-footer">
    </div>
  `;
  const button = document.createElement("button");
  button.textContent = "Learn More";
  button.appendChild(createSVG());

  button.addEventListener("click", () => {
    // Optional: update URL hash
    window.location.hash = `#${service.service}`;

    // Smooth scroll to element
    const targetElem = document.getElementById(service.service);
    if (!targetElem) return;

    gsap.to(window, {
      duration: 1,
      scrollTo: { y: targetElem }, // adjust for sticky header
      ease: "power3.out"
    });
  });

  div.querySelector(".service-footer").appendChild(button);

  return div;
}

function createPitchItem(service) {
  const div = document.createElement("div");
  div.classList.add("service-pitch");
  div.id = service.service
  .toLowerCase()           // lowercase
  .replace(/\s+/g, "-")    // spaces → hyphens
  .replace(/[^\w-]/g, ""); // remove invalid characters

  const imagesHtml = service.images.map(
    src => `<img src="${src}" alt="${service.service}">`
  ).join("");

  const packagesHtml = service.packages.map(
    pkg => `<li>${pkg.name}: ${pkg.description}</li>`
  ).join("");

  const timelineHtml = service.timeline.map(
    day => `<div class="day-card">${day}</div>`
  ).join("");

  div.innerHTML = `
    <div class="pitch-items fade-in">
      <div class="pitch-header">
        <h1>${service.service.toUpperCase()}</h1>
      </div>
      <div class="pitch-intro">
        <p>${service.intro}</p>
      </div>
      <div>${imagesHtml}</div>
      <div class="pitch-description">
        ${service.description}
        <div class="pitch-package-items"><ul>${packagesHtml}</ul></div>
      </div>
      <div class="pitch-timeline">${timelineHtml}</div>
      <div class="pitch-footer">
        <div class="pitch-price">
          ${Array.isArray(service.price) ? service.price.join(" – ") : service.price}
        </div>
      </div>
    </div>
  `;

  // Create contact button
  const button = document.createElement("button");
  button.id = "contact-button";
  button.classList.add("service-button");
  button.dataset.category = service.service;
  button.textContent = "Contact Us ";
  button.appendChild(createSVG());
  div.querySelector(".pitch-footer").appendChild(button);

  // Attach handler directly to THIS button
  button.addEventListener("click", () => {
    const category = button.dataset.category;
    const servicesContainer = document.getElementById("services-pitch-container");

    // Clear current content
    servicesContainer.innerHTML = "";

    // Load contact form
    const formWrapper = document.createElement("div");
    formWrapper.id = "service-contact-area";
    servicesContainer.appendChild(formWrapper);

    renderContactForm("service-contact-area", category, (form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        formData.append("category", category);
        console.log("✅ Service form submitted:", Object.fromEntries(formData));
      });
    });
  });

  return div;
}

export function loadServices() {
  fetch("/data/services.json")
    .then(res => {
      if (!res.ok) throw new Error(`Failed to fetch services: ${res.status}`);
      return res.json();
    })
    .then(services => {
      const serviceContainer = document.querySelector(".services-container");
      const pitchContainer = document.getElementById("pitch-container");

      serviceContainer.innerHTML = ""; // clear existing content
      pitchContainer.innerHTML = "";

      services.forEach(service => {
        // Create the service item once
        const serviceDiv = createServiceItem(service);
        serviceContainer.appendChild(serviceDiv);

        attachServiceItemClick(serviceDiv); // attach click listener

        // Create the pitch item once
        const pitchDiv = createPitchItem(service);
        pitchContainer.appendChild(pitchDiv);

        attachServicePitchClick(pitchDiv); // attach click listener
      });
    })
    .catch(err => console.error("Error loading services:", err));
}

document.addEventListener("DOMContentLoaded", () => {
  
  loadServices();

  // Call once when your page loads
  clearHashOnTop();

  //Add Serivce-Pitch highlight
  initServiceHighlight();

  //check id
  handleHashOnLoad();
  clearHashOnTop();


});






