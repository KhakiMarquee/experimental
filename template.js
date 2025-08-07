function getCategoryFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('category');
}

function renderContent(category, jsonPath = 'data.json') {
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
    })
    .catch(error => {
      console.error('Error:', error);
      container.innerHTML = `<p>Error loading content.</p>`;
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const category = getCategoryFromURL();
  if (category) {
    renderContent(category);
  } else {
    document.getElementById('content').innerHTML = `<p>Invalid category.</p>`;
  }
});