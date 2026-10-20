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
export async function renderQuickviewContent(
  key,
  jsonPath,
  container,
  useId = false,
  fallbackPath = null
) {
  container.innerHTML = '';

  const isAllKey = k => k?.toString().toLowerCase() === 'all';

  async function fetchData(path) {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Failed to fetch ${path}`);
    return response.json();
  }

  async function searchData(data, searchKey, useId) {
    const matchedItems = [];

    // "all" works whether or not useId is set
    if (isAllKey(searchKey)) {
      for (const cat of Object.keys(data)) {
        if (data[cat]?.items) matchedItems.push(...data[cat].items);
      }
      return matchedItems;
    }

    if (useId) {
      // Search by ID
      for (const cat of Object.keys(data)) {
        const group = data[cat];
        if (!group?.items) continue;
        const found = group.items.filter(
          e => e.id.toString() === searchKey.toString()
        );
        if (found.length) matchedItems.push(...found);
      }
    } else {
      // Search by category or theme
      const categoryGroup = data[searchKey];
      if (categoryGroup?.items) {
        matchedItems.push(...categoryGroup.items);
      } else {
        for (const cat of Object.keys(data)) {
          const group = data[cat];
          if (!group?.items) continue;
          const found = group.items.filter(
            e => e.theme?.toLowerCase() === searchKey.toLowerCase()
          );
          if (found.length) matchedItems.push(...found);
        }
      }
    }

    return matchedItems;
  }

  try {
    const primaryData = await fetchData(jsonPath);
    const fallbackData = fallbackPath ? await fetchData(fallbackPath) : null;

    let matchedItems = [];
    const keys = Array.isArray(key) ? key : [key];

    for (const k of keys) {
      const fromPrimary = await searchData(primaryData, k, useId);
      const fromFallback = fallbackData ? await searchData(fallbackData, k, useId) : [];
      matchedItems.push(...fromPrimary, ...fromFallback);
    }

    // Deduplicate by ID
    const seen = new Set();
    matchedItems = matchedItems.filter(item => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });

    if (!matchedItems.length) {
      container.innerHTML = `<p>No items found for "${key}"</p>`;
      return [];
    }

    // Shuffle, then limit to 6 unless "all" was requested
    shuffleArray(matchedItems);
    const showAll = keys.some(isAllKey);
    const selected = showAll ? matchedItems : matchedItems.slice(0, 6);

    createMoodboard(container, selected);

    return selected;
  } catch (err) {
    console.error(err);
    container.innerHTML = `<p>Error loading quickview content.</p>`;
    return [];
  }
}

