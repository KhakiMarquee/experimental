// loader.js

const showLoading = () => {
  const screen = document.getElementById('loading-screen');
  if (screen) {
    screen.style.display = 'flex';
    screen.innerText = 'Loading...'; // Customize if needed
  }
};

const hideLoading = () => {
  const screen = document.getElementById('loading-screen');
  if (screen) screen.style.display = 'none';
};

const moveSiteBodyToApp = () => {
  const app = document.getElementById('app');
  const siteBody = document.querySelector('.site-body');

  if (app && siteBody) {
    app.appendChild(siteBody); // Move the full <main class="site-body"> into #app
    app.style.display = 'block';
  }
};

const bootstrap = async () => {
  showLoading();

  // Simulate async load — replace with actual async logic as needed
  await new Promise(resolve => setTimeout(resolve, 1500));

  moveSiteBodyToApp(); // Move content into #app
  hideLoading();       // Hide the loader
};

bootstrap();
