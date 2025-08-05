import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);



// Enhanced 3D scene transition
export function animateThreeSceneOpen() {
  const tl = gsap.timeline();
  
  tl.to('.transition-space', {
    duration: 0.8,
    scale: 1,
    opacity: 1,
    ease: 'power3.out'
  })
  .to('.main-text', {
    duration: 0.6,
    y: -50,
    opacity: 0,
    padding:'0',
    ease: 'power3.in'
  }, 0.2)
  .to('.site-body .container', {
    duration: 0.8,
    scale: 1,
    ease: 'power3.out'
  }, 0);

  return tl;
}

export function animateThreeSceneClose() {
  const tl = gsap.timeline();
  
  tl.to('.transition-space', {
    duration: 0.6,
    scale: 0.9,
    opacity: 0,
    ease: 'power3.in'
  })
  .to('.main-text', {
    duration: 0.8,
    y: 0,
    opacity: 1,
    padding:'20% 0 30% 0;',
    ease: 'power3.out'
  }, 0.3)
  .to('.site-body .container', {
    duration: 0.8,
    scale: 1,
    ease: 'power3.out'
  }, 0.3);

  return tl;
}

// Enhanced overlay animations
export function animateOverlayOpen(overlay) {
  gsap.set(overlay, { display: 'block' });
  
  const tl = gsap.timeline();
  tl.from(overlay, {
    duration: 0.4,
    scale: 0.9,
    opacity: 0,
    ease: 'back.out(1.7)'
  })
  .from(overlay.querySelector('.close-overlay'), {
    duration: 0.3,
    rotation: 180,
    opacity: 0,
    ease: 'power3.out'
  }, 0.2);

  return tl;
}

export function animateOverlayClose(overlay) {
  const tl = gsap.timeline();
  tl.to(overlay, {
    duration: 0.3,
    scale: 0.9,
    opacity: 0,
    ease: 'power3.in',
    onComplete: () => {
      gsap.set(overlay, { display: 'none' });
    }
  });

  return tl;
}