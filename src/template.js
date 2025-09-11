import { openTemplateDetail } from '/src/openTemplateDetail.js';
import ImageCompressor from 'js-image-compressor';

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

export async function renderContent(category, jsonPath) {
  const container = document.getElementById('content');
  const titleEl = document.getElementById('page-title');
  const descEl = document.getElementById('project-section-description');

  try {
    const response = await fetch(jsonPath);
    if (!response.ok) throw new Error('Failed to fetch data.');
    const data = await response.json();

    container.innerHTML = '';

    if (category) {
      const group = data[category];
      if (!group) {
        container.innerHTML = `<p>Category "${category}" not found.</p>`;
        return data;
      }

      if (titleEl) titleEl.textContent = category.toUpperCase();
      if (descEl) descEl.textContent = group.description || '';

      (group.items || []).forEach((entry, idx) => {
        const row = createProjectRow(entry);
        container.appendChild(row);
        processImage(row, idx);
      });

    } else {
      Object.keys(data).forEach(cat => {
        const group = data[cat];
        if (!group || !Array.isArray(group.items)) return;
        group.items.forEach((entry, idx) => {
          const row = createProjectRow(entry);
          container.appendChild(row);
          processImage(row, idx);
        });
      });
    }

    return data;  // ✅ return full JSON
  } catch (err) {
    console.error(err);
    container.innerHTML = `<p>Error loading content.</p>`;
    return null;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const category = getCategoryFromURL();
  const jsonPath = '/data/data_with_ids.json';

  const allData = await renderContent(category, jsonPath);

  const params = new URLSearchParams(window.location.search);
  const idParam = params.get("id"); // e.g. "123-my-project-title"
  if (idParam && allData) {
    const entryId = idParam.split("-")[0]; // get numeric ID before slug

    // Find the entry across all categories
    let entryFound = null;
    for (const cat of Object.keys(allData)) {
      const group = allData[cat];
      if (!group?.items) continue;
      entryFound = group.items.find(e => e.id.toString() === entryId);
      if (entryFound) break;
    }

    if (entryFound) {
      const section = document.createElement("div");
      openTemplateDetail(section, entryFound);
    }
  }

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

       function processImage(section, entryIdx) {
  console.log(`Rendering entry #${entryIdx}, applying compression.`);

  const imgEl = section.querySelector('.project-image img');
  if (!imgEl) {
    console.warn('No image element found in section:', section);
    return;  // ✅ now legal
  }

  imgEl.crossOrigin = 'anonymous';

  console.log('Processing image:', imgEl.src);

  fetch(imgEl.src, { mode: 'cors' })
    .then(res => res.blob())
    .then(blob => {
      const file = new File([blob], 'image.jpg', { type: blob.type });

      const options = {
        file,
        quality: 0.6,
        convertSize: Infinity,
        redressOrientation: true,
        beforeCompress(result) {
          console.log('BeforeCompress:', result.size, result.type);
        },
        success(result) {
          console.log('Compression success:', result.size, result.type);

          imgEl.src = URL.createObjectURL(result);

          // You need to actually define originalSize & compressedSize
          const originalSize = blob.size;
          const compressedSize = result.size;
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
}

