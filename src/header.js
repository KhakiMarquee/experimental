import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';


gsap.registerPlugin(ScrollTrigger);

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
  const mobileNav = document.getElementById("mobile-menu");
  const navItems = mobileNav?.querySelectorAll("li");

  if (!menuToggle || !mobileNav || !navItems.length) {
    console.warn("Mobile menu elements not found");
    return;
  }

  // Set initial state hidden
  gsap.set(navItems, { x: -100, opacity: 0, display: "none" });

  menuToggle.addEventListener("click", e => {
    e.preventDefault();

    if (mobileNav.classList.contains("nav-open")) {
      // Closing → animate out
      gsap.to(navItems, {
        duration: 0.4,
        x: -100,
        opacity: 0,
        stagger: 0.05,
        onComplete: () => gsap.set(navItems, { display: "none" })
      });
      mobileNav.classList.remove("nav-open");
    } else {
      // Opening → animate in
      gsap.set(navItems, { display: "block" });
      gsap.to(navItems, {
        duration: 0.6,
        x: 0,
        opacity: 1,
        ease: "power3.out",
        stagger: 0.1,
      });
      mobileNav.classList.add("nav-open");
    }
  });
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

      
      if (window.innerWidth <= 768) {    
        // Mobile menu toggle functionality
        menuToggle.addEventListener("click", e => {
            e.preventDefault();
            mobileNav.classList.toggle("active");
        });
    }

    // Close when clicking away
    document.addEventListener("click", e => {
        if (
            mobileNav.classList.contains("active") &&
            !mobileNav.contains(e.target) &&
            !menuToggle.contains(e.target)
        ) {
            mobileNav.classList.remove("active");
        }
    });

    // Close when scrolling
    window.addEventListener("scroll", () => {
        if (mobileNav.classList.contains("active")) {
            mobileNav.classList.remove("active");
        }
    });
    
}