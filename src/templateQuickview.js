// templateQuickview.js
import { createMoodboard } from "/src/moodboard.js";
// CHANGED: removed the unused imports (openTemplateDetail, ImageCompressor)
// and the unused createProjectRow / processImage functions, since nothing calls them.
// Put them back if you use them elsewhere.

// Utility to shuffle an array in-place
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Render a quick preview of up to 6 items by category, theme, metadata.type or id
 * @param {string|string[]} key - Category name, theme, metadata.type, or ID
 * @param {string} jsonPath - Path to data.json
 * @param {HTMLElement} container - Container element to append items
 * @param {boolean} useId - If true, match by entry id; otherwise by category/theme/type
 */
export async function renderQuickviewContent(
  key,
  jsonPath,
  container,
  useId = false,
  fallbackPath = null
) {
  if (!container) {
    console.error('renderQuickviewContent: container missing', { key, jsonPath, container });
    return [];
  }

  container.innerHTML = '';

  const isAllKey = k => k?.toString().toLowerCase() === 'all';

  async function fetchData(path) {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Failed to fetch ${path}`);
    return response.json();
  }

  async function searchData(data, searchKey, useId) {
    const matchedItems = [];
    

    if (isAllKey(searchKey)) {
      for (const cat of Object.keys(data)) {
        if (data[cat]?.items) matchedItems.push(...data[cat].items);
      }
      return matchedItems;
    }

    if (useId) {
      for (const cat of Object.keys(data)) {
        const group = data[cat];
        if (!group?.items) continue;
        const found = group.items.filter(
          // CHANGED: e.id?.  so items without an id don't throw
          e => e.id?.toString() === searchKey.toString()
        );
        if (found.length) matchedItems.push(...found);
      }
    } else {
      const categoryGroup = data[searchKey];
      if (categoryGroup?.items) {
        matchedItems.push(...categoryGroup.items);
      } else {
        // CHANGED: String(...) guard so non-string keys don't throw
        const key = String(searchKey ?? '').toLowerCase();

        for (const cat of Object.keys(data)) {
          const group = data[cat];
          if (!group?.items) continue;

          const found = group.items.filter(
            e =>
              e.theme?.toLowerCase() === key ||
              e.metadata?.type?.toLowerCase() === key
          );
          if (found.length) matchedItems.push(...found);
        }
      }
    }

    return matchedItems;
  }

  try {
    const primaryData = await fetchData(jsonPath);

    // CHANGED: a failed fallback fetch no longer kills the primary results
    const fallbackData = fallbackPath
      ? await fetchData(fallbackPath).catch(err => {
          console.warn('Fallback failed:', err);
          return null;
        })
      : null;

    let matchedItems = [];
    const keys = Array.isArray(key) ? key : [key];

    for (const k of keys) {
      const fromPrimary = await searchData(primaryData, k, useId);
      const fromFallback = fallbackData ? await searchData(fallbackData, k, useId) : [];
      console.log('quickview search:', k, fromPrimary.length, fromFallback.length); // CHANGED: debug, remove later

      matchedItems.push(...fromPrimary, ...fromFallback);
    }

    // CHANGED: dedupe falls back to title|client when there's no id
    const seen = new Set();
    matchedItems = matchedItems.filter(item => {
      const uid = item.id ?? `${item.title}|${item.client}`;
      if (seen.has(uid)) return false;
      seen.add(uid);
      return true;
    });

    if (!matchedItems.length) {
      container.innerHTML = `<p>No items found for "${key}"</p>`;
      return [];
    }

    shuffleArray(matchedItems);
    const showAll = keys.some(isAllKey);
    const selected = showAll ? matchedItems : matchedItems.slice(0, 6);

    createMoodboard(container, selected);

    return selected;
  } catch (err) {
    console.error('quickview error:', err); // CHANGED: labelled so it's easy to find
    container.innerHTML = `<p>Error loading quickview content.</p>`;
    return [];
  }
}