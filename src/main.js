import { initUI } from '/src/ui.js';
import { initStrudelPlayer } from '/src/strudel_player.js';
import { initThreeScene } from '/src/three_scene.js';

export function initApp() {
  // Assume DOM is ready when this is called by loader.js
  // Three.js is lazy-loaded by UI interactions
    initUI();
    initStrudelPlayer();

    document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.chromatic-text');

    items.forEach(item => {
      item.addEventListener('click', () => {
        const category = item.getAttribute('data-category');
        // Redirect to template page with category in the query string
        window.location.href = `/template.html?category=${encodeURIComponent(category)}`;
      });
    });
  });
  };




