import { initThreeScene } from '/src/three_scene.js';

let threeSceneInitialized = false;
let threeSceneData = null; // Store renderer and camera references

export function initUI() {
  // --- Tap buttons for overlays ONLY ---
  const overlayTapButtons = document.querySelectorAll('.tap-button[data-overlay]');
  let activeOverlay = null;

  overlayTapButtons.forEach(button => {
    const overlayId = button.dataset.overlay;
    const overlayEl = document.getElementById(overlayId);

    if (!overlayEl) return;

    button.addEventListener('click', (e) => {
      e.stopPropagation();

      if (activeOverlay === overlayEl) {
        overlayEl.classList.remove('show');
        activeOverlay = null;
      } else {
        if (activeOverlay) {
          activeOverlay.classList.remove('show');
        }
        overlayEl.classList.add('show');
        activeOverlay = overlayEl;
      }
    });
  });

  const clickableWords = document.querySelectorAll('.clickable-word[data-overlay]');

  clickableWords.forEach(word => {
    const overlayId = word.dataset.overlay;
    const overlayEl = document.getElementById(overlayId);

    if (!overlayEl) return;

    word.addEventListener('click', (e) => {
      e.stopPropagation();

      if (activeOverlay === overlayEl) {
        overlayEl.classList.remove('show');
        activeOverlay = null;
      } else {
        if (activeOverlay) {
          activeOverlay.classList.remove('show');
        }
        overlayEl.classList.add('show');
        activeOverlay = overlayEl;
      }
    });
  });

  // Click outside overlays to close
  document.addEventListener('click', () => {
    if (activeOverlay) {
      activeOverlay.classList.remove('show');
      activeOverlay = null;
    }
  });

  // Close overlays via ✕ button
  const closeButtons = document.querySelectorAll('.close-overlay');
  closeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent closing immediately from the outer listener
      const overlay = button.closest('.overlay');
      if (overlay) {
        overlay.classList.remove('show');
        if (activeOverlay === overlay) {
          activeOverlay = null;
        }
      }
    });
  });

  document.querySelectorAll('.overlay').forEach(overlay => {
    overlay.addEventListener('click', e => e.stopPropagation());
  });

  // --- Tap button for 3D scene ONLY ---
  const transitionButton = document.querySelector('.main-text .tap-button:not([data-overlay])');
  const transitionSpace = document.querySelector('.transition-space');
  const mainText = document.querySelector('.main-text');
  const container = document.querySelector('.site-body .container');
  const closeContainer = document.querySelector('#close-three-container');

  if (transitionButton && transitionSpace && mainText && container && closeContainer) {
    transitionButton.addEventListener('click', () => {
      const isActive = transitionSpace.classList.toggle('active');
      mainText.classList.toggle('hide', isActive);
      container.classList.toggle('collapse', isActive);

      if (isActive && !threeSceneInitialized) {
        threeSceneData = initThreeScene();
        threeSceneInitialized = true;

        // Resize renderer after initialization
        setTimeout(() => {
          const threeContainer = document.getElementById('three-container');
          if (threeContainer && threeSceneData) {
            const width = threeContainer.clientWidth;
            const height = window.innerHeight;
            threeSceneData.renderer.setSize(width, height);
            threeSceneData.camera.aspect = width / height;
            threeSceneData.camera.updateProjectionMatrix();
          }
        }, 500);
      }
    });

    closeContainer.addEventListener('click', () => {
      transitionSpace.classList.remove('active');
      mainText.classList.remove('hide');
      container.classList.remove('collapse');
    });
  }

  // Chromatic text animation
  const textEl = document.getElementById('chromatic-text');
  if (textEl) {
    const textContent = textEl.textContent.toUpperCase();
    textEl.innerHTML = `
      <span class="red">${textContent}</span>
      <span class="cyan">${textContent}</span>
      <span class="main">${textContent}</span>
    `;
    const red = textEl.querySelector('.red');
    const cyan = textEl.querySelector('.cyan');

    let time = 0;
    function animateText() {
      time += 0.05;
      const x = Math.sin(time) * 10;
      const rX = Math.sin(time * 2) * 3;
      const rY = Math.cos(time * 2) * 3;
      const cX = Math.cos(time * 2) * -3;
      const cY = Math.sin(time * 2) * -3;

      textEl.style.transform = `translateX(${x}px)`;
      red.style.transform = `translate(${rX}px, ${rY}px)`;
      cyan.style.transform = `translate(${cX}px, ${cY}px)`;

      requestAnimationFrame(animateText);
    }
    animateText();
  }
}