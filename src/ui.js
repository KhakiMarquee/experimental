import { initThreeScene } from '/src/three_scene.js';
import { initAnimations, animateThreeSceneOpen, animateThreeSceneClose, animateOverlayOpen, animateOverlayClose } from '/src/animations.js';

let threeSceneInitialized = false;
let threeSceneData = null;
let activeOverlay = null;

export function initUI() {
  // Initialize GSAP animations
  initAnimations();

  const overlayTapButtons = document.querySelectorAll('.tap-button[data-overlay]');
  const clickableWords = document.querySelectorAll('.clickable-word[data-overlay]');
  const mainText = document.querySelector('.main-text');
  const transitionButton = document.querySelector('.main-text .tap-button:not([data-overlay])');
  const transitionSpace = document.querySelector('.transition-space');
  const container = document.querySelector('.site-body .container');
  const closeContainer = document.querySelector('#close-three-container');

  // Tap buttons for overlays
  overlayTapButtons.forEach(button => {
    const overlayId = button.dataset.overlay;
    const overlayEl = document.getElementById(overlayId);
    if (!overlayEl) return;

    button.addEventListener('click', (e) => {
      e.stopPropagation();
      if (activeOverlay === overlayEl) {
        animateOverlayClose(overlayEl);
        activeOverlay = null;
      } else {
        if (activeOverlay) {
          animateOverlayClose(activeOverlay);
        }
        animateOverlayOpen(overlayEl);
        activeOverlay = overlayEl;
      }
    });
  });

  // Clickable words for overlays
  clickableWords.forEach(word => {
    const overlayId = word.dataset.overlay;
    const overlayEl = document.getElementById(overlayId);
    if (!overlayEl) return;

    word.addEventListener('click', (e) => {
      e.stopPropagation();
      if (activeOverlay === overlayEl) {
        overlayEl.classList.remove('show');
        mainText?.classList.remove('main-content-hidden');
        activeOverlay = null;
      } else {
        if (activeOverlay) {
          activeOverlay.classList.remove('show');
          mainText?.classList.remove('main-content-hidden')
        }
        overlayEl.classList.add('show');
        mainText?.classList.add('main-content-hidden');
        activeOverlay = overlayEl;
      }
    });
  });

  // Close overlays by clicking outside
  document.addEventListener('click', () => {
    if (activeOverlay) {
      animateOverlayClose(activeOverlay);
      mainText?.classList.remove('main-content-hidden');
      activeOverlay = null;
    }
  });

  // Close overlays via close buttons
  document.querySelectorAll('.close-overlay').forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const overlay = button.closest('.overlay');
      if (overlay) {
        animateOverlayClose(overlay);
        mainText?.classList.remove('main-content-hidden');
        if (activeOverlay === overlay) {
          activeOverlay = null;
        }
      }
    });
  });

  // Prevent click bubbling from inside overlays
  document.querySelectorAll('.overlay').forEach(overlay => {
    overlay.addEventListener('click', e => e.stopPropagation());
  });

  // Tap button for 3D scene
  if (transitionButton && transitionSpace && mainText && container && closeContainer) {
    transitionButton.addEventListener('click', () => {
      const isActive = transitionSpace.classList.contains('active');

      if (!isActive) {
        transitionSpace.classList.add('active');
        animateThreeSceneOpen();

        if (!threeSceneInitialized) {
          threeSceneData = initThreeScene();
          threeSceneInitialized = true;

          setTimeout(() => {
            const threeContainer = document.getElementById('three-container');
            if (threeContainer && threeSceneData) {
              const width = threeContainer.clientWidth;
              const height = window.innerHeight;
              threeSceneData.renderer.setSize(width, height);
              threeSceneData.camera.aspect = width / height;
              threeSceneData.camera.updateProjectionMatrix();
            }
          }, 800);
        }
      }
    });

    closeContainer.addEventListener('click', () => {
      transitionSpace.classList.remove('active');
      animateThreeSceneClose();
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
