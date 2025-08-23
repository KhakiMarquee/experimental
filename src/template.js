import { openTemplateDetail } from '/src/openTemplateDetail.js';
import { ImageCompressor } from 'js-image-compressor';

function getCategoryFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('category');
}

function renderContent(category, jsonPath) {
  const container = document.getElementById('content');
  const title = document.getElementById('page-title');
  const sectionDescription = document.getElementById('project-section-description');

  fetch(jsonPath)
    .then(response => {
      if (!response.ok) throw new Error('Failed to fetch data.');
      return response.json();
    })
    .then(data => {
      const group = data[category];
      if (!group) throw new Error(`Category "${category}" not found in data.`);

      // Update section title
      title.textContent = category.charAt(0).toUpperCase() + category.slice(1);

      // Update section description
      if (sectionDescription) {
        sectionDescription.textContent = group.description || '';
      }

      // Clear and repopulate container
      container.innerHTML = '';
      const entries = group.items;

      if (entries && entries.length) {
        entries.forEach((entry, entryIdx) => {
          const section = document.createElement('div');

          // Set up section content
          section.classList.add('project-row');
          section.innerHTML = `
            <div class="project-image">
              <img src="${entry.image}" alt="${entry.title}">
            </div>
            <div class="project-details">
              <p>${entry.title}</p>
              <span class="project-client">${entry.client || ''}</span>
              <div class="project-meta">
                <p class="project-theme">${entry.theme || ''}</p>
                <p class="project-description">${entry.description || ''}</p>   
                <span class="project-type">${entry.type ? entry.type.join(', ') : ''}</span>
              </div>
            </div>
          `;

          // Append the section to container first
          container.appendChild(section);

          // Now apply compression for this image immediately
          console.log(`Rendering entry #${entryIdx}, applying compression.`);

          const imgEl = section.querySelector('.project-image img');
          imgEl.crossOrigin = 'anonymous'; // Enable CORS for this image
          if (!imgEl) {
            console.warn('No image element found in section:', section);
            return;
          }

          console.log('Processing image:', imgEl.src);

          fetch(imgEl.src, { mode: 'cors' })
            .then(res => {
              console.log('Fetched image blob');
              return res.blob();
            })
            .then(blob => {
              console.log('Blob ready, size:', blob.size);
              const file = new File([blob], 'image.jpg', { type: blob.type });

              // Compression logic using js-image-compressor
              const options = {
                file: file,
                quality: 0.6,
                convertSize: Infinity,
                redressOrientation: true,
                beforeCompress(result) {
                  console.log('BeforeCompress:', result.size, result.type);
                },
                success(result) {
                  console.log('Compression success:', result.size, result.type);
                  imgEl.src = URL.createObjectURL(result);

                      // Calculating compression ratio
                      const compressionRatio = ((originalSize - compressedSize) / originalSize) * 100;
                      console.log('Original size:', originalSize, 'bytes');
                      console.log('Compressed size:', compressedSize, 'bytes');
                      console.log('Compression reduced size by:', compressionRatio.toFixed(2) + '%');
                },
                error(err) {
                  console.error('Compression error:', err);
                }
              };
              new ImageCompressor(options);
            })
            .catch(err => console.error('Fetch error during compression:', err));
          
          // OpenDetail Capabilities
          section.addEventListener("click", () => {
            openTemplateDetail(section, entry);
          });
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
    //const basePath = '/experimental'; // or for local previews
    //const jsonPath = `${basePath}/data/data.json`;
    const jsonPath = `/data/data.json`;
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

  // Quicklinks in footer
  const quicklinks = document.querySelectorAll('#category-buttons button[data-category]');
  quicklinks.forEach(btn => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.category;
      if (!category || category === "filter") return;
      navigateToCategory(category);
    });
  });
  
  function navigateToCategory(category) {
    const targetUrl = `/pages/projects.html?category=${encodeURIComponent(category)}`;

    // If using asyncLoader:
    if (typeof window.loadPage === "function") {
      window.loadPage(targetUrl);
    } else {
      window.location.href = targetUrl;
    }
  }

});



