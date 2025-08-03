import { initUI } from '/src/ui.js';
import { initStrudelPlayer } from '/src/strudel_player.js';
import { initThreeScene } from '/src/three_scene.js';
import { }

document.addEventListener('DOMContentLoaded', () => {
  initUI();
  initStrudelPlayer();
  
  // Three.js scene will be initialized when needed by UI interactions
});

