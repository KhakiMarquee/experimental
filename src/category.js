import { openDetail } from '/src/openDetail.js';

let allData = [];     // for carousel (stone.json)
let allProjects = []; // for projects (data.json)

// Helper to get URL category
function getCategoryFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('category'); // e.g., "audiovisuals"
}

function renderCarousel(data) {
  const carousel = document.querySelector("#carousel");
  if (!carousel) return console.error("Carousel element not found");

  const isMobileEnv = typeof window.isMobile === "function"
    ? window.isMobile()
    : (('ontouchstart' in window || navigator.maxTouchPoints) && window.innerWidth <= 768);

  const openDetailSafe = (slide, item) => {
    if (typeof window.openDetail === "function") {
      window.openDetail(slide, item);
    } else {
      import("/src/openDetail.js")
        .then(({ openDetail }) => {
          window.openDetail = openDetail;
          openDetail(slide, item);
        })
        .catch(err => console.error("Failed to load openDetail:", err));
    }
  };

  const attachInteraction = (slide, item) => {
    if (!isMobileEnv) {
      slide.addEventListener("click", () => openDetailSafe(slide, item));
      return;
    }
    if (typeof window.setupSingleTap === "function") {
      window.setupSingleTap(slide, item);
      return;
    }
    let lastTap = 0;
    slide.addEventListener("touchend", () => {
      const now = Date.now();
      if (now - lastTap < 300) openDetailSafe(slide, item);
      lastTap = now;
    }, { passive: true });
  };

  carousel.innerHTML = "";

  data.forEach(item => {
    const slide = document.createElement("div");
    slide.classList.add("slide");

    const slideInner = document.createElement("div");
    slideInner.classList.add("slide-inner");

    const img = document.createElement("img");
    img.src = item.image || "";
    img.alt = item.title || "";

    const p = document.createElement("p");
    p.textContent = item.title || "";

    const span = document.createElement("span");
    span.classList.add("tooltip");
    span.title = "[TAP]";

    slideInner.appendChild(img);
    slideInner.appendChild(p);
    slide.appendChild(slideInner);
    slide.appendChild(span);
    carousel.appendChild(slide);

    attachInteraction(slide, item);
  });

  if (window.p5Instance?.refreshSlides) window.p5Instance.refreshSlides();
}

// Carousel setup
document.addEventListener("DOMContentLoaded", () => {
  fetch('/data/stone.json')
    .then(res => res.json())
    .then(data => {
      allData = data;
      renderCarousel(allData);
    })
    .catch(err => console.error("Error loading stone data:", err));

  const buttons = document.querySelectorAll('#category-buttons button:not([data-category="filter"])');
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.category;
      const dataset = category === "all"
        ? allData
        : allData.filter(item => item.type === category);

      const carousel = document.querySelector("#carousel");
      if (!carousel) return;

      if (!dataset.length) {
        carousel.innerHTML = `<p class="no-items">No items found for "${category}"</p>`;
      } else {
        renderCarousel(dataset);
      }
    });
  });

  const filterButton = document.querySelector('#category-buttons button[data-category="filter"]');
  const categoryButtons = document.querySelector('#category-buttons');
  if (filterButton && categoryButtons) {
    filterButton.addEventListener('click', () => categoryButtons.classList.toggle('show-buttons'));
  }
});

/*/ Projects setup

document.addEventListener('DOMContentLoaded', () => {
  // ✅ match your HTML
  const themeButtonsContainer = document.getElementById('category-buttons'); 
  const contentContainer = document.getElementById('carousel'); 

  const category = getCategoryFromURL();

  console.log("[projects.html] page loaded with category:", category);

  fetch('/data/data.json')
    .then(res => res.json())
    .then(data => {
      if (category && data[category]) {
        allProjects = data[category];
      } else if (category) {
        allProjects = [];
      } else {
        allProjects = Object.values(data).flat();
      }

      renderProjects(allProjects);

      // build theme filter buttons
      if (themeButtonsContainer && allProjects.length) {
        const themes = Array.from(new Set(allProjects.map(p => p.theme).filter(Boolean)));
        themes.unshift('All');

        themeButtonsContainer.innerHTML = '';
        themes.forEach(theme => {
          const btn = document.createElement('button');
          btn.textContent = theme;
          btn.dataset.theme = theme.trim().toLowerCase();
          themeButtonsContainer.appendChild(btn);

          btn.addEventListener('click', () => {
        const filtered = btn.dataset.theme === 'all'
          ? allProjects
          : allProjects.filter(p => 
              p.theme && p.theme.trim().toLowerCase() === btn.dataset.theme);
            renderProjects(filtered);

            
          });
        });
      }
    })
    .catch(err => console.error('Error loading projects JSON:', err));

  // unchanged
  function renderProjects(projects) {
    contentContainer.innerHTML = '';

    if (!projects.length) {
      contentContainer.innerHTML = `<p>No projects found${category ? ` for "${category}"` : ''}.</p>`;
      return;
    }

    projects.forEach(entry => {
      const section = document.createElement('div');
      section.classList.add('project-row');
      section.addEventListener("click", () => window.openTemplateDetail?.(section, entry));

      section.innerHTML = `
        <div class="project-image">
          <img src="${entry.image}" alt="${entry.title}">
        </div>
        <div class="project-details">
          <p>${entry.title}</p>
          <span class="project-client">${entry.client || ''}</span>
          <div class="project-meta">
            <p class="project-theme">${entry.theme || ''}</p>
            <p class="project-description">${entry.description || ''}</p>   
            <span class="project-type">${(entry.type || []).join(', ')}</span>
          </div>
        </div>
      `;
      contentContainer.appendChild(section);
    });
  }
});*/


// Close when clicking away
const categoryButtons = document.querySelector("#category-buttons");
const filterToggle = categoryButtons.querySelector('button[data-category="filter"]');

// Close when clicking away
document.addEventListener("click", e => {
  if (
    categoryButtons.classList.contains("show-buttons") &&
    !categoryButtons.contains(e.target) &&
    !filterToggle.contains(e.target)
  ) {
    categoryButtons.classList.remove("show-buttons");
  }
});

// Close when scrolling
window.addEventListener("scroll", () => {
  if (categoryButtons.classList.contains("show-buttons")) {
    categoryButtons.classList.remove("show-buttons");
  }
});
