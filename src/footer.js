import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';


gsap.registerPlugin(ScrollTrigger);

export function loadFooter() {
  const footerElement = document.querySelector('footer');

  if (!footerElement) {
    console.warn("No <footer> element found.");
    return Promise.resolve();  // resolve immediately if no footer
  }

  const url = `/footer.html`

  return fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load footer: ${response.status}`);
      return response.text();
    })
    .then(html => {
      footerElement.innerHTML = html;

      const isIndex = window.location.pathname === '/' || window.location.pathname === '/index.html';

      if (isIndex) {
        // On index page: use scroll-triggered effect only, no delay
        initFooterScrollEffect();
      } else {
        // On other pages: add 'at-bottom' class after delay
        triggerFooter(3000);
      }
    })
    .catch(err => console.error(err));
}

export function triggerFooter(delay = 3000) {
  setTimeout(() => {
    const footerElement = document.querySelector('footer');
    if (footerElement) {
      footerElement.classList.add('at-bottom');
    }
  }, delay);
}

export function initFooterScrollEffect() {
    const footer = document.querySelector('footer');
    if (!footer) return;
    const siteBody = document.querySelector('.site-body');
    if (!siteBody) return; // Exit early if no trigger element

  ScrollTrigger.create({
    trigger: '.site-body',
    start: "bottom bottom",
    toggleClass: { targets: footer, className: "at-bottom" },
    onToggle(self) {
      console.log("Footer ScrollTrigger active:", self.isActive);
    }
  });
}