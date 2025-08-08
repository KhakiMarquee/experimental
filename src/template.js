function getCategoryFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('category');
}

function renderContent(category, jsonPath) {
  const container = document.getElementById('content');
  const title = document.getElementById('page-title');

  fetch(jsonPath)
    .then(response => {
      if (!response.ok) throw new Error('Failed to fetch data.');
      return response.json();
    })
    .then(data => {
      const entries = data[category];
      title.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      container.innerHTML = '';

      if (entries && entries.length) {
        entries.forEach(entry => {
          const section = document.createElement('div');
          section.classList.add('project-row');
          section.innerHTML = `
            <div class="project-image">
              <img src="${entry.image}" alt="${entry.title}">
            </div>
            <div class="project-details">
              <h2>${entry.title}</h2>
              <p class="project-theme">${entry.theme}</p>
              <p class="project-description">${entry.body}</p>
            </div>
          `;
          container.appendChild(section);
        });
      } else {
        container.innerHTML = `<p>No content found for "${category}".</p>`;
      }
    })
    .catch(error => {
      console.error('Error:', error);
      container.innerHTML = `<p>Error loading content.</p>`;
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const category = getCategoryFromURL();
  if (category) {
    const base = import.meta.env.BASE_URL || '/';
    const jsonPath = `${base}data/data.json`;
    renderContent(category, jsonPath);
  } else {
    document.getElementById('content').innerHTML = `<p>Invalid category.</p>`;
  }

  // Attach toggle listener after DOM is ready
  const toggleBtn = document.getElementById('toggle-view');
  const container = document.querySelector('.projects-container');

  if (toggleBtn && container) {
    toggleBtn.addEventListener('click', () => {
      container.classList.toggle('row-view');
      container.classList.toggle('list-view');

      // Change button text dynamically
      if (container.classList.contains('list-view')) {
        toggleBtn.textContent = 'Switch to Row View';
      } else {
        toggleBtn.textContent = 'Switch to List View';
      }
    });
  }
});