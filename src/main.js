import { initUI } from '/src/ui.js';
import { initStrudelPlayer } from '/src/strudel_player.js';
import { initThreeScene } from '/src/three_scene.js';
import p5 from 'p5';
import { initSketch } from '/src/sketch.js';


export function initApp() {
    // Assume DOM is ready when this is called by loader.js
    // Three.js is lazy-loaded by UI interactions
    initUI();
    initStrudelPlayer();

    //Initilise mold 
    const targetDiv = document.getElementById('canvas-container');
    new p5(initSketch, targetDiv);

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




