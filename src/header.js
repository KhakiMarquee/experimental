export function loadHeader() {
    const headerElement = document.querySelector('header.site-header');

    if (!headerElement) {
        console.warn("No <header class='site-header'> found to load into.");
        return;
    }

    const url = `/header.html`;
    
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load header: ${response.status}`);
            return response.text();
        })
        .then(html => {
            headerElement.innerHTML = html;
            initHeader(); // run any JS that needs header elements
        })
        .catch(err => console.error(err));
}

function initHeader() {
    const menuToggle = document.getElementById("mobile-menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const menuList = mobileMenu?.querySelector("ul");

    // Early return if required elements don't exist
    if (!menuToggle || !mobileMenu || !menuList) {
        console.warn("Mobile menu elements not found");
        return;
    }
    /*DYNAMIC LINKS*/
     /* const currentPath = window.location.pathname.toLowerCase();
    const dynamicLinks = [
        { keyword: "stone", url: "/pages/audiovisuals.html", text: "about" },
        { keyword: "", url: "/stone.html", text: "pages" },
        { keyword: "index", url: "studio.goke.studio", text: "homepage" } // Fixed missing slash
    ];

    // Generate dynamic links based on current path
  dynamicLinks.forEach(link => {
        if (currentPath.includes(link.keyword)) {
            // Check if link already exists (better method than innerHTML.includes)
            const existingLinks = Array.from(menuList.querySelectorAll('a'));
            const linkExists = existingLinks.some(existingLink => 
                existingLink.href.includes(link.url)
            );

            if (!linkExists) {
                // Create elements properly instead of using innerHTML +=
                const newListItem = document.createElement('li');
                const newLink = document.createElement('a');
                newLink.href = link.url;
                newLink.textContent = link.text;
                
                newListItem.appendChild(newLink);
                menuList.appendChild(newListItem);
                
                console.log(`Added dynamic link: ${link.text} -> ${link.url}`);
            }
        }
    });*/

    // Mobile menu toggle functionality
    menuToggle.addEventListener("click", e => {
        e.preventDefault();
        mobileMenu.classList.toggle("active");
    });

    // Close when clicking away
    document.addEventListener("click", e => {
        if (
            mobileMenu.classList.contains("active") &&
            !mobileMenu.contains(e.target) &&
            !menuToggle.contains(e.target)
        ) {
            mobileMenu.classList.remove("active");
        }
    });

    // Close when scrolling
    window.addEventListener("scroll", () => {
        if (mobileMenu.classList.contains("active")) {
            mobileMenu.classList.remove("active");
        }
    });
}

