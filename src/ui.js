import { initThreeScene } from '/src/three_scene.js';
import { initAnimations, animateThreeSceneOpen, animateThreeSceneClose, animateOverlayOpen, animateOverlayClose } from '/src/animations.js';

let threeSceneInitialized = false;
let threeSceneData = null;

// Unified overlay management system
class OverlayManager {
  constructor() {
    this.activeOverlay = null;
    this.mainText = document.querySelector('.main-text') || document.querySelector('.headline')?.parentElement;
    this.secondaryText = document.querySelector('.trigger-text-container');
    this.isAnimating = false;
  }

  async openOverlay(overlayEl) {
    if (this.isAnimating || this.activeOverlay === overlayEl) return;
    
    this.isAnimating = true;
    console.log('Opening overlay:', overlayEl.id); // Debug log

    // Close current overlay first if exists
    if (this.activeOverlay && this.activeOverlay !== overlayEl) {
      await this.closeOverlay(this.activeOverlay, false);
    }

    // Open new overlay
    try {
      if (typeof animateOverlayOpen === 'function') {
        await animateOverlayOpen(overlayEl);
      } else {
        overlayEl.classList.add('show');
        console.log('Added show class to:', overlayEl.id); // Debug log
      }

      // Hide main content
      this.mainText?.classList.add('main-content-hidden');
      this.secondaryText?.classList.add('main-content-hidden');
      
      this.activeOverlay = overlayEl;
    } catch (error) {
      console.error('Error opening overlay:', error);
    }
    
    this.isAnimating = false;
  }

  async closeOverlay(overlayEl = null, updateMainContent = true) {
    const targetOverlay = overlayEl || this.activeOverlay;
    if (!targetOverlay || this.isAnimating) return;

    this.isAnimating = true;
    console.log('Closing overlay:', targetOverlay.id); // Debug log

    try {
      // Close overlay
      if (typeof animateOverlayClose === 'function') {
        await animateOverlayClose(targetOverlay);
      } else {
        targetOverlay.classList.remove('show');
      }

      // Show main content
      if (updateMainContent) {
        this.mainText?.classList.remove('main-content-hidden');
        this.secondaryText?.classList.remove('main-content-hidden');
      }

      if (this.activeOverlay === targetOverlay) {
        this.activeOverlay = null;
      }
    } catch (error) {
      console.error('Error closing overlay:', error);
    }
    
    this.isAnimating = false;
  }

  toggleOverlay(overlayEl) {
    if (this.isAnimating) {
      console.log('⛔ Prevented toggle during animation');
      return;
    }
    
    if (this.activeOverlay === overlayEl) {
      this.closeOverlay(overlayEl);
    } else {
      this.openOverlay(overlayEl);
    }
    console.log('🌀 toggleOverlay called for:', overlayEl.id);
  }
}

// Initialize overlay manager
const overlayManager = new OverlayManager();

// Helper function to find overlay element
function findOverlayElement(trigger) {
  const overlayId = trigger.dataset.overlay;
  return overlayId ? document.getElementById(overlayId) : null;
}

// Unified event handler for all overlay triggers
function handleOverlayTrigger(e, triggerElement) {
  e.stopPropagation();
  
  const overlayEl = findOverlayElement(triggerElement);
  if (!overlayEl) {
    console.warn('Overlay element not found for trigger:', triggerElement);
    return;
  }

  console.log('Trigger clicked, overlay found:', overlayEl.id); // Debug log
  overlayManager.toggleOverlay(overlayEl);
}

// Initialize overlay system
function initOverlays() {
  console.log('Initializing overlays...');

  // Stop propagation on all triggers (assuming triggers have [data-overlay])
  document.querySelectorAll('[data-overlay]').forEach(trigger => {
    trigger.addEventListener('click', e => {
      console.log('Trigger clicked (stopPropagation):', trigger.dataset.overlay);
      e.stopPropagation();
    });
  });

  // Stop propagation inside overlays
  document.querySelectorAll('.overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      console.log('Overlay clicked (stopPropagation):', overlay.id);
      e.stopPropagation();
    });
  });

  // Document click listener — close overlay if click outside triggers or overlays
  document.addEventListener('click', (e) => {
    if (overlayManager.isAnimating) {
      console.log('🔒 Ignoring outside click during animation');
      return;
    }

    if (e.target.closest('[data-overlay]') || e.target.closest('.overlay')) {
      console.log('Click inside trigger or overlay — do not close');
      return;
    }

    if (overlayManager.activeOverlay) {
      console.log('Closing overlay via outside click');
      overlayManager.closeOverlay();
    }
  });

  // Setup overlay triggers for toggling overlays
  const allTriggers = document.querySelectorAll('[data-overlay]');
  console.log('Found overlay triggers:', allTriggers.length);

  allTriggers.forEach((trigger, index) => {
    console.log(`Setting up trigger ${index}:`, trigger.dataset.overlay);

    // Replace with clone to remove old listeners if needed
    const newTrigger = trigger.cloneNode(true);
    trigger.parentNode?.replaceChild(newTrigger, trigger);

    newTrigger.addEventListener('click', (e) => {
      console.log('Trigger clicked (toggleOverlay):', newTrigger.dataset.overlay);
      handleOverlayTrigger(e, newTrigger);
    });
  });

  // Close overlays via close buttons
  document.querySelectorAll('.close-overlay').forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const overlay = button.closest('.overlay');
      if (overlay) {
        console.log('Closing overlay via close button');
        overlayManager.closeOverlay(overlay);
      }
    });
  });

  // Escape key to close overlays
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlayManager.activeOverlay) {
      console.log('Closing overlay via Escape key');
      overlayManager.closeOverlay();
    }
  });
}

export function initUI() {
  console.log('Initializing UI...'); // Debug log
  
  // Initialize GSAP animations
  initAnimations();

  // Initialize overlays - THIS WAS MISSING!
  initOverlays();

  const mainText = document.querySelector('.main-text');
  const transitionButton = document.querySelector('.main-text .tap-button:not([data-overlay])');
  const transitionSpace = document.querySelector('.transition-space');
  const container = document.querySelector('.site-body .container');
  const closeContainer = document.querySelector('#close-three-container');

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

  console.log('UI initialization complete'); // Debug log
}

// Debug function to test overlays manually
window.debugOverlays = () => {
  console.log('Active overlay:', overlayManager.activeOverlay);
  console.log('All overlays:', document.querySelectorAll('.overlay'));
  console.log('All triggers:', document.querySelectorAll('[data-overlay]'));
};