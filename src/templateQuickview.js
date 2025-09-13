// templateQuickview.js
import { openTemplateDetail } from '/src/openTemplateDetail.js';
import ImageCompressor from 'js-image-compressor';
import { createMoodboard } from "/src/moodboard.js";

// Utility to shuffle an array in-place
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Reuse the existing project row creation function
function createProjectRow(entry) {
  const section = document.createElement('div');
  section.classList.add('project-row');
  section.innerHTML = `
    <div class="project-image">
      <img src="${entry.image}" alt="${entry.title}">
    </div>
    <div class="project-details">
      <p>${entry.title}</p>
    </div>
  `;
  section.addEventListener("click", () => openTemplateDetail(section, entry));
  return section;
}

// Optional: image processing function
function processImage(section) {
  const imgEl = section.querySelector('.project-image img');
  if (!imgEl) return;

  imgEl.crossOrigin = 'anonymous';

  fetch(imgEl.src, { mode: 'cors' })
    .then(res => res.blob())
    .then(blob => {
      const file = new File([blob], 'image.jpg', { type: blob.type });

      const options = {
        file,
        quality: 0.6,
        convertSize: Infinity,
        redressOrientation: true,
        success(result) {
          imgEl.src = URL.createObjectURL(result);
        },
        error(err) {
          console.error('Compression error:', err);
        }
      };
      new ImageCompressor(options);
    })
    .catch(err => console.error('Fetch error during compression:', err));
}

/**
 * Render a quick preview of 3 items by category or id/theme
 * @param {string} key - Either category name, theme, or ID
 * @param {string} jsonPath - Path to data.json
 * @param {HTMLElement} container - Container element to append items
 * @param {boolean} useId - If true, match by entry id; otherwise, match by theme
 */
export async function renderQuickviewContent(key, jsonPath, container, useId = false) {
  container.innerHTML = '';

  try {
    const response = await fetch(jsonPath);
    if (!response.ok) throw new Error('Failed to fetch data.');
    const data = await response.json();

    let matchedItems = [];

    if (useId) {
      // Search all categories for entries matching ID
      for (const cat of Object.keys(data)) {
        const group = data[cat];
        if (!group?.items) continue;
        const found = group.items.filter(e => e.id.toString() === key.toString());
        if (found.length) {
          matchedItems.push(...found);
        }
      }
    } else {
      // Match by category or theme
      const categoryGroup = data[key];
      if (categoryGroup?.items) {
        matchedItems.push(...categoryGroup.items);
      } else {
        // fallback: search by theme across all categories
        for (const cat of Object.keys(data)) {
          const group = data[cat];
          if (!group?.items) continue;
          const found = group.items.filter(e => e.theme?.toLowerCase() === key.toLowerCase());
          if (found.length) matchedItems.push(...found);
        }
      }
    }

    if (!matchedItems.length) {
      container.innerHTML = `<p>No items found for "${key}"</p>`;
      return;
    }

    // Shuffle + limit items
    shuffleArray(matchedItems);
    const selected = matchedItems.slice(0, 6); // grab a few more for the moodboard

    // Instead of appending DOM rows, pass to moodboard
    createMoodboard(container, selected);

    return matchedItems.slice(0, 3);

  } catch (err) {
    console.error(err);
    container.innerHTML = `<p>Error loading quickview content.</p>`;
    return [];
  }
}
