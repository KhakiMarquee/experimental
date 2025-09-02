import { openTemplateDetail } from '/src/openTemplateDetail.js';

function getCategoryFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('category'); // null if missing
}

function createProjectRow(entry) {
  const section = document.createElement('div');
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
        <span class="project-type">${Array.isArray(entry.type) ? entry.type.join(', ') : (entry.type || '')}</span>
      </div>
    </div>
  `;
  section.addEventListener("click", () => openTemplateDetail(section, entry));
  return section;
}

function renderContent(category, jsonPath) {
  const container = document.getElementById('content');
  const titleEl = document.getElementById('page-title');
  const descEl = document.getElementById('project-section-description');

  fetch(jsonPath)
    .then(r => {
      if (!r.ok) throw new Error('Failed to fetch data.');
      return r.json();
    })
    .then(data => {
      container.innerHTML = '';

      if (category) {
        // SINGLE CATEGORY MODE: update title/description + render only that category
        const group = data[category];
        if (!group) {
          container.innerHTML = `<p>Category "${category}" not found.</p>`;
          return;
        }

        if (titleEl) titleEl.textContent = category.toUpperCase();
        if (descEl) descEl.textContent = group.description || '';

        (group.items || []).forEach(entry => {
          container.appendChild(createProjectRow(entry));
        });

      } else {
        // DEFAULT MODE (no query): render ALL items flat, do NOT touch title/description
        Object.keys(data).forEach(cat => {
          const group = data[cat];
          if (!group || !Array.isArray(group.items)) return;
          group.items.forEach(entry => {
            container.appendChild(createProjectRow(entry));
          });
        });
      }
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = `<p>Error loading content.</p>`;
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const category = getCategoryFromURL();
  const jsonPath = '/data/data.json';

  renderContent(category, jsonPath);

  // View toggles (assumes .projects-container wraps #content)
  const containerEl = document.querySelector('.projects-container');
  document.getElementById('grid-view').addEventListener('click', () => {
    containerEl.classList.add('row-view');
    containerEl.classList.remove('list-view');
    document.getElementById('grid-view').classList.add('active');
    document.getElementById('list-view').classList.remove('active');
  });

  document.getElementById('list-view').addEventListener('click', () => {
    containerEl.classList.add('list-view');
    containerEl.classList.remove('row-view');
    document.getElementById('list-view').classList.add('active');
    document.getElementById('grid-view').classList.remove('active');
  });
});

          /*/ Now apply compression for this image immediately
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

              / Compression logic using js-image-compressor
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
            .catch(err => console.error('Fetch error during compression:', err));*/
          

