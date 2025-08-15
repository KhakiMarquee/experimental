import p5 from 'p5';

export default function stoneViewSketch(p) {
  let carousel;
  let slides = [];
  let scrollOffset = 0;
  let speed = 0;
  const baseSpacing = 900;
  let isDragging = false;

  const maxSpeed = 100; // Maximum allowed speed

  let lastPointerX = 0;
  let lastMouseX = 0;

  let touchActive = false;
  let dragDistance = 0;
  const TAP_MOVE_TOL = 8;
  let startX = 0, startY = 0;
  let moved = false;
  let justTouched = false;

  p.setup = function () {
    p.noCanvas();
    carousel = document.getElementById("carousel");
    slides = Array.from(document.querySelectorAll(".slide"));

    const container = document.getElementById("carousel-container");
    container.style.perspective = "2000px";
    carousel.style.transformStyle = "preserve-3d";

    if (isMobile()) {
      setupTouchConstraints();
    } else {
      setupMouseConstraints();
    }

    p.loop();
  };

  p.draw = function () {
    const tiltX = -15;
    const tiltY = -30;
    carousel.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

    const totalLength = slides.length * baseSpacing;
    scrollOffset = (scrollOffset + speed) % totalLength;
    if (scrollOffset < 0) scrollOffset += totalLength;

    // Progress dot
    const progress = scrollOffset / totalLength;
    const dot = document.querySelector('.progress-dot');
    if (dot) {
      dot.style.backgroundColor = progress >= 0.8 ? 'var(--grey-800)' : 'rgba(var(--grey-100), 0.4)';
    }

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

      if (!slide.classList.contains("expanding") && !slide.classList.contains("fullscreen")) {
        slide.style.transform = `
          translateX(${Math.round(posX * 100) / 100}px)
          translateY(${Math.round(posY * 100) / 100}px)
          translateZ(${Math.round(posZ * 100) / 100}px)
        `;
      }
    });

    // Friction
    const absSpeed = Math.abs(speed);
    let friction;
    if (absSpeed > 25) friction = 0.88;
    else if (absSpeed > 10) {
      const t = (absSpeed - 10) / 15;
      friction = 0.92 + (0.88 - 0.92) * t * t * (3 - 2 * t);
    } else if (absSpeed > 2) friction = 0.92;
    else if (absSpeed > 0.5) {
      const t = (absSpeed - 0.5) / 1.5;
      friction = 0.94 + (0.92 - 0.94) * t;
    } else friction = 0.94;

    speed *= friction;
    if (Math.abs(speed) < 0.005) speed = 0;
  };

  function isMobile() {
    return ('ontouchstart' in window || navigator.maxTouchPoints) && window.innerWidth <= 768;
  }

  function setupMouseConstraints() {
    const carouselContainer = document.getElementById("carousel-container");
    if (!carouselContainer) return;

    carouselContainer.addEventListener('wheel', handleCarouselWheel, { passive: false });
    carouselContainer.addEventListener('mousedown', handleCarouselMouseDown);
    carouselContainer.addEventListener('mouseup', handleCarouselMouseUp);
    carouselContainer.addEventListener('mousemove', handleCarouselMouseMove);

    const footerElement = document.querySelector('footer, .footer');
    const header = document.querySelector('header, .header, .site-header');
    [footerElement, header].forEach(el => {
      if (!el) return;
      el.addEventListener('wheel', e => { e.stopPropagation(); e.preventDefault(); }, { passive: false });
      el.addEventListener('mousedown', e => e.stopPropagation());
      el.addEventListener('mousemove', e => e.stopPropagation());
    });

    p.mouseWheel = () => false;
    p.mousePressed = () => false;
    p.mouseReleased = () => false;
    p.mouseDragged = () => false;
  }

  function handleCarouselWheel(event) {
    event.preventDefault();
    let wheelInput = -event.deltaY / 8;
    wheelInput = Math.max(-8, Math.min(8, wheelInput));
    const targetSpeed = speed + wheelInput;
    speed += (targetSpeed - speed) * 0.6;
    speed = Math.max(-maxSpeed * 0.8, Math.min(maxSpeed * 0.8, speed));
  }

  function handleCarouselMouseDown(event) {
    event.preventDefault();
    isDragging = true;
    lastMouseX = event.clientX;
  }

  function handleCarouselMouseUp(event) {
    event.preventDefault();
    isDragging = false;
  }

  function handleCarouselMouseMove(event) {
    if (!isDragging) return;
    event.preventDefault();

    let deltaX = event.clientX - lastMouseX;
    let dragSpeed = Math.max(-15, Math.min(15, deltaX * -1.2));
    speed += (dragSpeed - speed) * 0.7;
    speed = Math.max(-maxSpeed * 0.8, Math.min(maxSpeed * 0.8, speed));

    lastMouseX = event.clientX;
  }

  function setupTouchConstraints() {
    const carouselContainer = document.getElementById("carousel-container");
    if (!carouselContainer) return;

    carouselContainer.addEventListener("touchstart", handleTouchStart, { passive: false });
    carouselContainer.addEventListener("touchmove", handleTouchMove, { passive: false });
    carouselContainer.addEventListener("touchend", handleTouchEnd, { passive: false });
  }

  function handleTouchStart(event) {
    if (event.target.closest('header, .header, .site-header, footer, .footer')) return;
    isDragging = true;
    touchActive = true;
    dragDistance = 0;
    moved = false;

    lastPointerX = startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
    speed = 0;

    justTouched = true;
    setTimeout(() => justTouched = false, 400);
    event.preventDefault();
  }

  function handleTouchMove(event) {
    if (!touchActive || event.touches.length !== 1) return;
    const currentX = event.touches[0].clientX;
    const deltaX = currentX - lastPointerX;
    dragDistance += Math.abs(deltaX);
    if (Math.hypot(currentX - startX, event.touches[0].clientY - startY) > TAP_MOVE_TOL) moved = true;

    let dragSpeed = Math.max(-50, Math.min(50, -deltaX * 1.5));
    speed += (dragSpeed - speed) * 0.7;

    lastPointerX = currentX;
    event.preventDefault();
  }

  function handleTouchEnd(event) {
    if (!touchActive) return;
    if (!moved) {
      const slide = event.target.closest(".slide");
      if (slide) {
        if (slide.classList.contains("fullscreen")) slide.classList.remove("fullscreen");
        else {
          const index = [...slides].indexOf(slide);
          const item = window.stoneData?.[index];
          if (item) import("/src/openDetail.js").then(({ openDetail }) => openDetail(slide, item));
        }
      }
    }
    isDragging = false;
    touchActive = false;
  }

  // Outside tap closes fullscreen slides
  const outsideCloseHandler = (e) => {
    if (e.target.closest('header, .header, .site-header, footer, .footer')) return;
    const openSlide = document.querySelector(".slide.fullscreen");
    if (openSlide && !e.target.closest(".slide.fullscreen")) openSlide.classList.remove("fullscreen");
  };
  document.addEventListener("touchstart", outsideCloseHandler, { passive: true });
  document.addEventListener("click", (e) => { if (!justTouched) outsideCloseHandler(e); }, { passive: true });
}

// Wait for slides to exist before starting p5
function waitForSlides() {
  const slides = document.querySelectorAll('#carousel .slide');
  if (slides.length > 0) window.p5Instance = new p5(stoneViewSketch);
  else setTimeout(waitForSlides, 50);
}

document.addEventListener('DOMContentLoaded', waitForSlides);
