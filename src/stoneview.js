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

  // [NOTE:] Added variable to prevent multiple footer triggers
  let footerTriggered = false;

  p.setup = function setup() {
    p.noCanvas();
    carousel = document.getElementById("carousel");
    slides = Array.from(document.querySelectorAll(".slide"));
    
    const container = document.getElementById("carousel-container");
    container.style.perspective = "2000px";
    carousel.style.transformStyle = "preserve-3d";
    
    // Prevent default mouse events on non-carousel elements
    setupMouseConstraints();
    
    p.loop();  // start p5.js draw loop
  }

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
  
  // true infinite positioning for each slide
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
    
    slide.style.transform = `
      translateX(${roundedX}px)
      translateY(${roundedY}px)
      translateZ(${roundedZ}px)
    `;
    
    const existingVirtual = carousel.querySelectorAll(`[data-original-index="${i}"]`);
    existingVirtual.forEach(virtual => virtual.remove());
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


  function cleanupVirtualSlides() {
    // This function is no longer needed since we eliminated virtual slides
    // Keeping it empty in case it's called elsewhere
  }

  function setupMouseConstraints() {
    // Get footer and header elements to exclude from mouse interactions
    const footerElement = document.querySelector('footer, .footer');
    const header = document.querySelector('header, .header, .site-header');
    const carouselContainer = document.getElementById("carousel-container");
    
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', () => {
        isDragging = false;
      });
      
      carouselContainer.addEventListener('mouseleave', () => {
        isDragging = false;
        speed *= 0.7; // gentler speed reduction when leaving carousel area
      });
      
      // Add dedicated event handlers to prevent conflicts
      carouselContainer.addEventListener('wheel', handleCarouselWheel, { passive: false });
      carouselContainer.addEventListener('mousedown', handleCarouselMouseDown);
      carouselContainer.addEventListener('mouseup', handleCarouselMouseUp);
      carouselContainer.addEventListener('mousemove', handleCarouselMouseMove);
    }
    
    // Block events on sticky elements
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

  // Dedicated event handlers for smoother interaction
  let lastMouseX = 0;

  function handleCarouselWheel(event) {
    event.preventDefault();
    event.stopPropagation();
    
    // Much gentler wheel input
    let wheelInput = -event.deltaY / 8; // Increased divisor for smoother input
    const maxWheelInput = 8; // Further reduced max input
    wheelInput = Math.max(-maxWheelInput, Math.min(maxWheelInput, wheelInput));
    
    // Smoother speed accumulation with easing
    const targetSpeed = speed + wheelInput;
    speed = speed + (targetSpeed - speed) * 0.6; // Ease towards target speed
    
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
      let dragSpeed = deltaX * -1.2; // Further reduced drag sensitivity
      
      const maxDragSpeed = 15; // Further reduced max drag speed
      dragSpeed = Math.max(-maxDragSpeed, Math.min(maxDragSpeed, dragSpeed));
      
      // Smoother drag speed application with easing
      const targetSpeed = dragSpeed;
      speed = speed + (targetSpeed - speed) * 0.7; // Ease towards drag speed
      
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

// [NOTE:] p5 instance mode export
new p5(stoneViewSketch);