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
    const jsonPath = '/data/data_with_ids.json';

    const documentaryEl   = document.getElementById('documentary-quickview');
    const commissionEl    = document.getElementById('commission-quickview');
    const architectureEl  = document.getElementById('architecture-quickview');
    const allEl           = document.getElementById('all-quickview');

    if (architectureEl) renderQuickviewContent('Architecture', jsonPath, architectureEl);
    if (documentaryEl)  renderQuickviewContent('documentary',  jsonPath, documentaryEl);
    if (commissionEl)   renderQuickviewContent('commission',   jsonPath, commissionEl);
    if (allEl)          renderQuickviewContent('all',          jsonPath, allEl);

      /* Or render 3 items by entry ID
      const entryId = '123';
      renderQuickviewContent(entryId, jsonPath, container, true); */

  };





 




