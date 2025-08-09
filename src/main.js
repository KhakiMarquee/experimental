import { initUI } from '/src/ui.js';
import { initStrudelPlayer } from '/src/strudel_player.js';
import { initThreeScene } from '/src/three_scene.js';
import { drawCustomCursor } from '/src/mouse.js'

export function initApp() {
    // Assume DOM is ready when this is called by loader.js
    // Three.js is lazy-loaded by UI interactions
    initUI();
    initStrudelPlayer();

    console.log('Main file loaded successfully');

    const items = document.querySelectorAll('.third-list p');
    console.log('DOMContentLoaded loaded');
    console.log(document.querySelectorAll('.third-list p'));

    // Determine base URL dynamically
    const currentPath = window.location.pathname;
    const basePath = currentPath.substring(0, currentPath.lastIndexOf('/'));

    items.forEach(item => {
      item.addEventListener('click', () => {
        const category = item.getAttribute('data-category');
        // Redirect to template page with category in the query string
        window.location.href = `${basePath}/pages/projects.html?category=${encodeURIComponent(category)}`;
        console.log(category);
      });
    });
  };

    // p5.js needs setup() and draw() as global functions:
    window.setup = function() {
      createCanvas(windowWidth, windowHeight);
    };

    window.draw = function() {
      background(255);
      drawCustomCursor();
    };






