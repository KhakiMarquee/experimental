import { renderContent } from '/src/template.js';

function navigateToCategory(category) {
  const jsonPath = '/data/data.json';

  // Build the target URL
  const targetUrl = category
    ? `/pages/stories.html?category=${encodeURIComponent(category)}`
    : `/pages/stories.html`;

  // Push new state into history
  window.history.pushState({ category }, '', targetUrl);

  // Render immediately so content updates
  renderContent(category, jsonPath);
}

// Handle back/forward navigation
window.addEventListener('popstate', (event) => {
  const category = event.state?.category || null;
  const jsonPath = '/data/data.json';
  renderContent(category, jsonPath);
});

// Attach listeners once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // ⛔ exclude filter button
  const filterButtons = document.querySelectorAll('[data-category]:not([data-category="filter"])');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault(); // prevent default link navigation
      const category = btn.getAttribute('data-category');

      // Use null for "all"
      navigateToCategory(category === 'all' ? null : category);
    });
  });
});