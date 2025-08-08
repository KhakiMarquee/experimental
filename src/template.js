import '/css/style.css';
import '/css/projects.css'

function getCategoryFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('category');
}

function renderContent(category, jsonPath) {
  const container = document.getElementById('content');
  const title = document.getElementById('page-title');

  console.log('Fetching JSON from:', jsonPath);

  fetch(jsonPath)
    .then(response => {
      if (!response.ok) throw new Error('Failed to fetch data.');
      return response.text();  // get as text first to debug
    })
    .then(text => {
      try {
        const data = JSON.parse(text);
        const entries = data[category];
        title.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        container.innerHTML = '';

        if (entries && entries.length) {
          entries.forEach(entry => {
            const section = document.createElement('section');
            section.innerHTML = `
              <h2>${entry.title}</h2>
              <p>${entry.body}</p>
            `;
            container.appendChild(section);
          });
        } else {
          container.innerHTML = `<p>No content found for "${category}".</p>`;
        }
      } catch (e) {
        console.error('Failed to parse JSON response:', text);
        container.innerHTML = `<p>Error parsing JSON data.</p>`;
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
});
