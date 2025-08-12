
export function getHomePath() {
  // Split current path into segments and remove empty ones
  const pathParts = window.location.pathname.split('/').filter(Boolean);
    
  // If hosted on GitHub Pages, the first part of the path is usually the repo name
  if (pathParts.length > 0) {
    return '/' + pathParts[0] + '/'; // Repo root
  }

  // If local or at domain root, just return "/"
  return '/';
}

export function loadHeader() {
    const headerElement = document.querySelector('header.site-header');

    if (!headerElement) {
        console.warn("No <header class='site-header'> found to load into.");
        return;
    }

    const homePath = getHomePath();
    const url = `${homePath}header.html`;
    console.log(homePath);
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load header: ${response.status}`);
            return response.text();
        })
        .then(html => {
            headerElement.innerHTML = html;

            initHeader(); // run any JS that needs header elements

            // Set home link dynamically
            const homeLink = document.querySelector('#home-link a');
            if (homeLink) {
                console.log(homeLink)
                homeLink.href = getHomePath(); // just set link target
            }
        })
        .catch(err => console.error(err));
}

function initHeader() {
    const menuToggle = document.getElementById("mobile-menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const menuList = mobileMenu.querySelector("ul");

    const currentPath = window.location.pathname.toLowerCase();
    const dynamicLinks = [
        { keyword: "projects", url: "/projects.html", text: "projects" },
        { keyword: "about", url: "/about.html", text: "about" },
        { keyword: "contact", url: "/contact.html", text: "contact" }
    ];

    dynamicLinks.forEach(link => {
        if (currentPath.includes(link.keyword) && !menuList.innerHTML.includes(link.url)) {
            menuList.innerHTML += `<li><a href="${link.url}">${link.text}</a></li>`;
        }
    });

    menuToggle.addEventListener("click", e => {
        e.preventDefault();
        mobileMenu.classList.toggle("active");
    });
}

