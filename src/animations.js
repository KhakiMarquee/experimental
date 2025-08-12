import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);


//HOMEPAGE ANIMATIONS
export function initAnimations() {
  // Check if elements exist before animating them

  const headline = document.querySelector('.headline');
  if (headline) {
    gsap.from('.headline', {
      duration: 1.5,
      y: 50,
      opacity: 0,
      ease: 'power3.out',
      delay: 0.3
    });
  }

  const subhead = document.querySelector('.subhead');
  if (subhead) {
    gsap.from('.subhead', {
      duration: 1.2,
      y: 30,
      opacity: 0,
      ease: 'power3.out',
      delay: 0.6
    });
  }

  const navContainerDivs = document.querySelectorAll('.site-header .container div');
  if (navContainerDivs.length) {
    gsap.from('.site-header .container div', {
      duration: 1,
      y: -20,
      opacity: 0,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }

  if (document.querySelector('.transition-space')) {
    gsap.set('.transition-space', {
      scale: 0.9,
      opacity: 0
    });
  }

  if (document.querySelector('.overlay')) {
    gsap.set('.overlay', {
      scale: 0.9,
      opacity: 0
    });
  }

  if (document.querySelector('.secondary-text li')) {
    gsap.fromTo('.secondary-text li', 
      {
        y: 30,
        opacity: 0
      },
      {
        scrollTrigger: {
          trigger: '.secondary-text',
          start: 'top 90%',
          end: 'bottom 10%',
          toggleActions: 'play none none reverse'
        },
        duration: 0.8,
        y: 0,
        opacity: 1,
        stagger: 0.2,
        ease: 'power3.out'
      }
    );
  }

  if (document.querySelector('.third-section .third-box')) {
    gsap.fromTo('.third-section .third-box',
      {
        scale: 0.8,
        rotation: 10,
        opacity: 0
      },
      {
        scrollTrigger: {
          trigger: '.third-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        duration: 1.2,
        scale: 1,
        rotation: 0,
        opacity: 1,
        ease: 'back.out(1.7)'
      }
    );
  }

  if (document.querySelector('.chromatic-text')) {
    gsap.set('.chromatic-text', {
      x: -50,
      opacity: 0
    });

    gsap.to('.chromatic-text', {
      scrollTrigger: {
        trigger: '.third-list',
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      },
      duration: 1,
      x: 0,
      opacity: 1,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }
}
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

// FIXED: Enhanced overlay animations that work with CSS classes
export function animateOverlayOpen(overlay) {
  console.log('🎬 animateOverlayOpen START', overlay.id);
  return new Promise((resolve) => {
    overlay.classList.add('show');
    console.log('✅ overlay show class added');

    gsap.set(overlay, { scale: 0.9, opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        console.log('✅ animation complete');
        resolve();
      }
    });

    tl.to(overlay, {
      duration: 0.4,
      scale: 1,
      opacity: 1,
      ease: 'back.out(1.7)'
    });

    const closeButton = overlay.querySelector('.close-overlay');
    if (closeButton) {
      gsap.set(closeButton, { rotation: 180, opacity: 0 });
      tl.to(closeButton, {
        duration: 0.3,
        rotation: 0,
        opacity: 1,
        ease: 'power3.out'
      }, 0.2);
    }
  });
}
export function animateOverlayClose(overlay) {
  return new Promise((resolve) => {
    console.log('🎬 Animating overlay close:', overlay.id);
    overlay.style.pointerEvents = 'none'; // Disable clicks during animation

    const tl = gsap.timeline({
      onComplete: () => {
        overlay.classList.remove('show');
        gsap.set(overlay, {
          scale: 0.9,
          opacity: 0,
          clearProps: 'transform'
        });
        overlay.style.pointerEvents = ''; // Re-enable clicks
        resolve();
      }
    });

    tl.to(overlay, {
      duration: 0.3,
      scale: 0.9,
      opacity: 0,
      ease: 'power3.in'
    });
  });
}
