import p5 from 'p5';

export default function stoneViewSketch(p) {

  let carousel;
  let slides = [];
  let scrollOffset = 0;
  let speed = 0;
  const baseSpacing = 900;
  let isDragging = false;

  // Speed control
  const maxSpeed = 100; // Maximum allowed speed

  // For tracking pointer positions (mouse or touch)
  let lastPointerX = 0;

  p.setup = function setup() {
    p.noCanvas();
    carousel = document.getElementById("carousel");
    slides = Array.from(document.querySelectorAll(".slide"));
    
    const container = document.getElementById("carousel-container");
    container.style.perspective = "2000px";
    carousel.style.transformStyle = "preserve-3d";

    // Setup interaction handlers based on device type
    if (isMobile()) {
      setupTouchConstraints();
    } else {
      setupMouseConstraints();
    }

    p.loop();  // start p5.js draw loop
  };

  p.draw = function draw() {
    const tiltX = -15;
    const tiltY = -30;
    carousel.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

    const totalLength = slides.length * baseSpacing;

    // Smooth scroll offset to prevent jumps
    scrollOffset += speed;

    // Keep scrollOffset within bounds for true infinite loop
    scrollOffset = scrollOffset % totalLength;
    if (scrollOffset < 0) scrollOffset += totalLength;

    // --- Progress tracking ---
    const progress = scrollOffset / totalLength; // 0 → 1
    const dot = document.querySelector('.progress-dot');
    if (dot) {
      const highlightThreshold = 0.8; // 80% of the way through
      if (progress >= highlightThreshold) {
        dot.style.backgroundColor = 'var(--grey-800)'; // reddish highlight
      } else {
        dot.style.backgroundColor = 'rgba(var(--grey-100), 0.4)';
      }
    }

    // True infinite positioning for each slide
    slides.forEach((slide, i) => {
      let pos1 = (i * baseSpacing - scrollOffset) % totalLength;
      if (pos1 < -baseSpacing * 2) pos1 += totalLength;
      let pos2 = pos1 - totalLength;
      let pos3 = pos1 + totalLength;

      let bestPos = pos1;
      const screenCenter = window.innerWidth / 2;

      if (Math.abs(pos2 - screenCenter) < Math.abs(bestPos - screenCenter)) bestPos = pos2;
      if (Math.abs(pos3 - screenCenter) < Math.abs(bestPos - screenCenter)) bestPos = pos3;

      const posX = bestPos;
      const posY = bestPos * -0.5;
      const posZ = -Math.abs(bestPos) * 0.2;

      const roundedX = Math.round(posX * 100) / 100;
      const roundedY = Math.round(posY * 100) / 100;
      const roundedZ = Math.round(posZ * 100) / 100;

      // ⬇ Skip transforms if this slide is expanding/fullscreen
      if (slide.classList.contains("expanding") || slide.classList.contains("fullscreen")) {
        return;
      }

      // The key transform
      slide.style.transform = `
        translateX(${roundedX}px)
        translateY(${roundedY}px)
        translateZ(${roundedZ}px)
      `;
    });

    const absSpeed = Math.abs(speed);
    let friction;

    if (absSpeed > 25) friction = 0.88;
    else if (absSpeed > 10) {
      const t = (absSpeed - 10) / 15;
      const easedT = t * t * (3 - 2 * t);
      friction = 0.92 + (0.88 - 0.92) * easedT;
    } else if (absSpeed > 2) friction = 0.92;
    else if (absSpeed > 0.5) {
      const t = (absSpeed - 0.5) / 1.5;
      friction = 0.94 + (0.92 - 0.94) * t;
    } else friction = 0.94;

    speed *= friction;

    if (Math.abs(speed) < 0.005) speed = 0;
  };

  // --- Detect if device is mobile touchscreen ---
  function isMobile() {
    return ('ontouchstart' in window || navigator.maxTouchPoints) && window.innerWidth <= 768;
  }

  // --- Setup mouse event handlers for desktop ---
  function setupMouseConstraints() {
    const footerElement = document.querySelector('footer, .footer');
    const header = document.querySelector('header, .header, .site-header');
    const carouselContainer = document.getElementById("carousel-container");

    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', () => {
        isDragging = false;
      });

      carouselContainer.addEventListener('mouseleave', () => {
        isDragging = false;
        speed *= 0.7;
      });

      carouselContainer.addEventListener('wheel', handleCarouselWheel, { passive: false });
      carouselContainer.addEventListener('mousedown', handleCarouselMouseDown);
      carouselContainer.addEventListener('mouseup', handleCarouselMouseUp);
      carouselContainer.addEventListener('mousemove', handleCarouselMouseMove);
    }

    [footerElement, header].forEach(element => {
      if (element) {
        element.addEventListener('wheel', (e) => {
          e.stopPropagation();
          e.preventDefault();
        }, { passive: false });

        element.addEventListener('mousedown', (e) => {
          e.stopPropagation();
        });

        element.addEventListener('mousemove', (e) => {
          e.stopPropagation();
        });
      }
    });
  }

  let touchActive = false;
  let dragDistance = 0;
  const TAP_MOVE_TOL = 8; // px movement allowed to still count as a tap
  let startX = 0, startY = 0;
  let moved = false;
  let justTouched = false; // prevent double-triggering with click

  function handleTouchStart(event) {
    // Ignore touches on header/footer
    if (event.target.closest('header, .header, .site-header, footer, .footer')) return;

    const carouselContainer = document.getElementById("carousel-container");
    if (!event.target.closest('#carousel-container')) return; // ignore outside carousel

    isDragging = true;
    touchActive = true;
    dragDistance = 0;
    lastPointerX = event.touches[0].clientX;
    speed = 0;
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
    moved = false;

    justTouched = true;
    setTimeout(() => justTouched = false, 400);
  }


  function handleTouchMove(event) {
    if (!touchActive || event.touches.length !== 1) return;

    const currentX = event.touches[0].clientX;
    const deltaX = currentX - lastPointerX;
    dragDistance += Math.abs(deltaX);

    // Track if we've moved more than TAP_MOVE_TOL
    if (Math.hypot(event.touches[0].clientX - startX, event.touches[0].clientY - startY) > TAP_MOVE_TOL) {
      moved = true;
    }

    // Block scrolling only if it's a swipe
    if (dragDistance > 5) {
      event.preventDefault();
    }

    let dragSpeed = deltaX * -1.5;
    const maxDragSpeed = 50;
    dragSpeed = Math.max(-maxDragSpeed, Math.min(maxDragSpeed, dragSpeed));
    speed += (dragSpeed - speed) * 0.7;

    lastPointerX = currentX;
  }

  function handleTouchEnd(event) {
    if (touchActive) {
      // ✅ Single-tap detection (only if minimal movement)
      if (!moved) {
        setTimeout(() => {
          const slide = event.target.closest(".slide");
          if (slide) {
            if (slide.classList.contains("fullscreen")) {
              slide.classList.remove("fullscreen");
            } else {
              const index = [...slides].indexOf(slide);
              const item = window.stoneData?.[index];
              if (item) {
                import("/src/openDetail.js").then(({ openDetail }) => {
                  openDetail(slide, item);
                });
              }
            }
          }
        }, 20); // Slight delay for scroll settling
      }

      isDragging = false;
      touchActive = false;
    }
  }

  function setupTouchConstraints() {
    const carouselContainer = document.getElementById("carousel-container");

    if (carouselContainer) {
      carouselContainer.addEventListener("touchstart", handleTouchStart, { passive: false });
      carouselContainer.addEventListener("touchmove", handleTouchMove, { passive: false });
      carouselContainer.addEventListener("touchend", handleTouchEnd, { passive: true });
    }

    // 📌 Tap-away-to-close handler (mobile + desktop)
    const outsideCloseHandler = (e) => {
      const openSlide = document.querySelector(".slide.fullscreen");
      if (openSlide && !e.target.closest(".slide.fullscreen")) {
        openSlide.classList.remove("fullscreen");
      }
    };
    document.addEventListener("touchstart", outsideCloseHandler, { passive: true });
    document.addEventListener("click", (e) => {
      if (justTouched) return;
      outsideCloseHandler(e);
    }, { passive: true });
  }

  // --- Existing mouse handlers ---
  let lastMouseX = 0;

  function handleCarouselWheel(event) {
    event.preventDefault();
    event.stopPropagation();

    let wheelInput = -event.deltaY / 8;
    const maxWheelInput = 8;
    wheelInput = Math.max(-maxWheelInput, Math.min(maxWheelInput, wheelInput));

    const targetSpeed = speed + wheelInput;
    speed = speed + (targetSpeed - speed) * 0.6;

    speed = Math.max(-maxSpeed * 0.8, Math.min(maxSpeed * 0.8, speed));
  }

  function handleCarouselMouseDown(event) {
    event.preventDefault();
    event.stopPropagation();
    isDragging = true;
    lastMouseX = event.clientX;
  }

  function handleCarouselMouseUp(event) {
    event.preventDefault();
    event.stopPropagation();
    isDragging = false;
  }

  function handleCarouselMouseMove(event) {
    if (isDragging) {
      event.preventDefault();
      event.stopPropagation();

      const deltaX = event.clientX - lastMouseX;
      let dragSpeed = deltaX * -1.2;

      const maxDragSpeed = 15;
      dragSpeed = Math.max(-maxDragSpeed, Math.min(maxDragSpeed, dragSpeed));

      const targetSpeed = dragSpeed;
      speed = speed + (targetSpeed - speed) * 0.7;

      speed = Math.max(-maxSpeed * 0.8, Math.min(maxSpeed * 0.8, speed));

      lastMouseX = event.clientX;
    }
  }

  // Disable p5.js mouse events to prevent conflicts
  p.mouseWheel = function(event) {
    return false;
  }

  p.mousePressed = function() {
    return false;
  }

  p.mouseReleased = function() {
    return false;
  }

  p.mouseDragged = function() {
    return false;
  }
}

function waitForSlides() {
  const slides = document.querySelectorAll('#carousel .slide');
  if (slides.length > 0) {
    // Start p5 only after slides exist
    window.p5Instance = new p5(stoneViewSketch);
  } else {
    // Check again in a short while
    setTimeout(waitForSlides, 50);
  }
}

document.addEventListener('DOMContentLoaded', waitForSlides);
