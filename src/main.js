import { initUI } from '/src/ui.js';
import { initStrudelPlayer } from '/src/strudel_player.js';
import { initThreeScene } from '/src/three_scene.js';
import { drawCustomCursor } from '/src/mouse.js';
import p5 from 'p5';

export function initApp() {
    // Assume DOM is ready when this is called by loader.js
    // Three.js is lazy-loaded by UI interactions
    initUI();
    initStrudelPlayer();

    if (document.querySelector('.third-list')) {
      const items = document.querySelectorAll('.third-list p');
      // your code here
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
    }


  };

  //MOUSE

  const overlaySketch = (p) => {
    let overlayDiv;

      p.setup = () => {
        overlayDiv = document.getElementById('cursor');
        if (!overlayDiv) {
          console.error('#overlay div not found');
          return;
        }
        let cnv = p.createCanvas(overlayDiv.offsetWidth, overlayDiv.offsetHeight);
        cnv.parent(overlayDiv);
        p.clear();
      };

    p.draw = () => {
      p.clear();
      drawCustomCursor(p); // pass the p5 instance
    };
  };

  document.addEventListener('DOMContentLoaded', () => {
    new p5(overlaySketch);
  });





