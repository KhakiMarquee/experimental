import { initUI } from '/src/ui.js';
import { initStrudelPlayer } from '/src/strudel_player.js';
import { initThreeScene } from '/src/three_scene.js';
import { loadHeader } from '/src/header.js';
import { loadFooter } from '/src/footer.js';


//Init Main Application
export function initApp() {
    // Assume DOM is ready when this is called by loader.js
    // Three.js is lazy-loaded by UI interactions
    initUI();

    // Load Strudel
    initStrudelPlayer();

    //Load Header
    loadHeader();
    
    //Load Footer
    loadFooter();

    //Load dynamic buttons for page
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
}



 




