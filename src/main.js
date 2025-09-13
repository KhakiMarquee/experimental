import { initUI } from '/src/ui.js';
import { initStrudelPlayer } from '/src/strudel_player.js';
import { initThreeScene } from '/src/three_scene.js';
import { loadHeader } from '/src/header.js';
import { loadFooter } from '/src/footer.js';
import { initTheme, toggleTheme } from '/src/theme.js';
import { renderQuickviewContent } from '/src/templateQuickview.js';


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
    loadFooter().then(() => {
    // Footer is now in the DOM

      //load Theme
      initTheme();
      const toggleButton = document.getElementById("theme-toggle");
      if (toggleButton) {
        console.log("Theme toggle button found ✅");
        toggleButton.addEventListener("click", toggleTheme);
      } else {
        console.warn("⚠️ No #theme-toggle button found in DOM");
      }
    });

    // Render quickview
      const container = [document.getElementById('culture-quickview'),document.getElementById('heritage-quickview'),document.getElementById('architecture-quickview')];
      const categoryOrTheme = 'architecture'; // could be a theme
      const jsonPath = '/data/data_with_ids.json';

      // Render 3 items by theme
      renderQuickviewContent('architecture', jsonPath, container[2]);
      renderQuickviewContent('heritage', jsonPath, container[1]);
      renderQuickviewContent('culture', jsonPath, container[0]);

      /* Or render 3 items by entry ID
      const entryId = '123';
      renderQuickviewContent(entryId, jsonPath, container, true); */


  };





 




