import { initUI } from '/src/ui.js';
import { initStrudelPlayer } from '/src/strudel_player.js';
import { initThreeScene } from '/src/three_scene.js';

export function initApp() {
  // Assume DOM is ready when this is called by loader.js
    initUI();
    initStrudelPlayer();
    // Three.js is lazy-loaded by UI interactions
  };




