export function loadHeader() {
    const headerElement = document.querySelector('header.site-header');

    if (!headerElement) {
        console.warn("No <header class='site-header'> found to load into.");
        return;
    }

    fetch(`${import.meta.env.BASE_URL}header.html`)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load header: ${response.status}`);
            return response.text();
        })
        .then(html => {
            headerElement.innerHTML = html;
            initHeader(); // Now that the HTML exists, we can init
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
