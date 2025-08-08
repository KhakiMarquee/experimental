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
              <span class="project-client">${entry.client}</span>
              <div class="project-meta">
                <p class="project-theme">${entry.theme}</p>
                <p class="project-description">${entry.description}</p>   
                  <span class="project-type">${entry.type}</span>
              </div>
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
    const jsonPath = './data/data.json';
    renderContent(category, jsonPath);
  } else {
    document.getElementById('content').innerHTML = `<p>Invalid category.</p>`;
  }

  document.getElementById('grid-view').addEventListener('click', () => {
    const container = document.querySelector('.projects-container');
    container.classList.add('row-view');
    container.classList.remove('list-view');
    document.getElementById('grid-view').classList.add('active');
    document.getElementById('list-view').classList.remove('active');

  });

  document.getElementById('list-view').addEventListener('click', () => {
    const container = document.querySelector('.projects-container');
    container.classList.add('list-view');
    container.classList.remove('row-view');
    document.getElementById('list-view').classList.add('active');
    document.getElementById('grid-view').classList.remove('active');
    
  });

});



