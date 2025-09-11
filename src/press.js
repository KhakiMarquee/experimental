import { initTeamDropdowns } from '/src/teamDropdown.js';
// Async function to load press content
export async function loadPressContent(container) {
  try {
    // Fetch the JSON data
    const res = await fetch("/data/press.json");
    if (!res.ok) throw new Error(`Failed to fetch press data: ${res.status}`);
    const pressItems = await res.json();

    // Clear existing content
    container.innerHTML = "";

    // Render each press item
    pressItems.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('team-member-container');

    div.innerHTML = `
      <div class="team-member">
        <img class='bw' src="${item.images[0] || '/public/media/IMG/default.png'}" 
             alt="${item.title} bandw">
        ${item.images[1] ? `<img class='colour hide' src="${item.images[1]}" alt="${item.title} colour">` : ""}
        <h2>${item.outlet}</h2>
        <p>${item.title} (${item.year})</p>
        <p>${item.type}</p>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="16" height="16" viewBox="0 0 256 256">
          <g transform="translate(1.4066 1.4066) scale(2.81 2.81)" fill="rgb(var(--grey-500))">
            <path d="M 45 0 C 20.147 0 0 20.147 0 45 c 0 24.853 20.147 45 45 45 s 45 -20.147 45 -45 C 90 20.147 69.853 0 45 0 z M 63.831 50.245 H 50.962 V 65 H 39.076 V 50.245 H 26.169 V 39.34 h 12.906 V 25 h 11.886 v 14.34 h 12.869 V 50.245 z"/>
          </g>
        </svg>
      </div>
       <div class="team-dropdown fade-in-d">
          <p>${item.statement || "No statement provided."}</p>
          ${item.link ? `
            <button class="right-button" onclick="window.open('${item.link}', '_blank')">
              Learn More
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="16" height="16" viewBox="0 0 256 256">
                <g transform="translate(1.4066 1.4066) scale(2.81 2.81)" fill="rgb(var(--grey-500))">
                  <path d="M 45 0 C 20.147 0 0 20.147 0 45 c 0 24.853 20.147 45 45 45 s 45 -20.147 45 -45 C 90 20.147 69.853 0 45 0 z M 63.831 50.245 H 50.962 V 65 H 39.076 V 50.245 H 26.169 V 39.34 h 12.906 V 25 h 11.886 v 14.34 h 12.869 V 50.245 z"/>
                </g>
              </svg>              
            </button>
          ` : ""}
        </div>
      `;

      container.appendChild(div);
    });

    // Initialize dropdowns after all items are in the DOM
    initTeamDropdowns();

  } catch (err) {
    console.error("Error loading press content:", err);
    container.innerHTML = `<p>Failed to load press content.</p>`;
  }
}