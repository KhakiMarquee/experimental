import { initTeamDropdowns } from '/src/teamDropdown.js';
import { teamHoverPreview }  from '/src/teamHover.js';
import { renderContactForm } from "./contactForm.js";
import { loadPressContent } from './press.js';


function renderTeam(team) {
  const container = document.getElementById('team-members');;
  if (!container) {
    console.error("❌ Could not find #team-member-container in DOM");
    return;
  }

  container.innerHTML = ''; // clear placeholder

  team.forEach(member => {
    const memberDiv = document.createElement('div');
    memberDiv.classList.add('team-member-container');

    memberDiv.innerHTML = `
      <div class="team-member">
        <img class='bw' src="${member.images[0] || '/public/media/IMG/default.png'}" 
            alt="${member.firstname} ${member.lastname} bandw">
        <img class='colour hide' src="${member.images[1] || '/public/media/IMG/default.png'}" 
            alt="${member.firstname} ${member.lastname} colour">
        <h2>${member.firstname} ${member.lastname}</h2>
        <p>${member.role}</p>
        <p>${member.email}</p>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="16" height="16" viewBox="0 0 256 256">
          <g transform="translate(1.4066 1.4066) scale(2.81 2.81)" fill="rgb(var(--grey-500))">
            <path d="M 45 0 C 20.147 0 0 20.147 0 45 c 0 24.853 20.147 45 45 45 s 45 -20.147 45 -45 C 90 20.147 69.853 0 45 0 z M 63.831 50.245 H 50.962 V 65 H 39.076 V 50.245 H 26.169 V 39.34 h 12.906 V 25 h 11.886 v 14.34 h 12.869 V 50.245 z"/>
          </g>
        </svg>
      </div>
      <div class="team-dropdown fade-in-d">
        <p>${member.statement || "No statement provided."}</p>
        ${member.link ? `
          <button class="right-button" onclick="window.open('${member.link}', '_blank')">
            SubStack
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="16" height="16" viewBox="0 0 256 256">
              <g transform="translate(1.4066 1.4066) scale(2.81 2.81)" fill="rgb(var(--grey-500))">
                <path d="M 45 0 C 20.147 0 0 20.147 0 45 c 0 24.853 20.147 45 45 45 s 45 -20.147 45 -45 C 90 20.147 69.853 0 45 0 z M 63.831 50.245 H 50.962 V 65 H 39.076 V 50.245 H 26.169 V 39.34 h 12.906 V 25 h 11.886 v 14.34 h 12.869 V 50.245 z"/>
              </g>
            </svg>              
          </button>
        ` : ""}
      </div>
    `;

    container.appendChild(memberDiv);
  });

  // ✅ Initialize dropdowns AFTER members are in the DOM
  initTeamDropdowns();

  //initialize hover preview teamHoverPreview();
}   

export function loadTeam() {
  console.log("📥 Fetching team data from /data/team.json");

  fetch(`/data/team.json`)
    .then(response => {
      console.log("📡 Response status:", response.status);
      if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
      return response.json();
    })
    .then(team => {
      console.log("✅ JSON data fetched successfully:", team);
      renderTeam(team);
    })
    .catch(err => console.error("❌ Error loading team:", err));
}

document.addEventListener('DOMContentLoaded', () => {
  console.log("✅ DOM fully loaded, calling loadTeam()");
  loadTeam();

  // Handle top buttons PRESS or CONTACT
  const teamMembersContainer = document.getElementById("team-members");
  const buttons = document.querySelectorAll(".team-button");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const label = button.textContent.trim();

      // Clear current content
      teamMembersContainer.innerHTML = "";

      if (label === "Contact") {
        // Load contact form
        const formWrapper = document.createElement("div");
        formWrapper.id = "contact-area";
        teamMembersContainer.appendChild(formWrapper);

        renderContactForm("contact-area", "Audiovisuals", (form) => {
          form.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            console.log("✅ Form submitted:", Object.fromEntries(formData));
          });
        });
      } else if (label === "Press") {
        // For now, do nothing or add a placeholder
        loadPressContent(teamMembersContainer); // ✅ load press content asynchronously
      }
    });
  });
});
