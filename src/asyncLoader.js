// asyncLoader.js
export function initAsyncLoader() {
  const app = document.querySelector("#app");
  if (!app) {
    console.error("No #app container found!");
    return;
  }

  async function loadPage(url, push = true) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch ${url}`);
      const text = await res.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");

      const newContent = doc.querySelector(".site-body");
      if (!newContent) throw new Error(`.site-body not found in ${url}`);

      app.innerHTML = "";
      app.appendChild(newContent);

      if (push) {
        history.pushState({ url }, "", url);
      }

      // rebind category and filter links/buttons
      bindCategoryLinks();

      console.log("Page loaded:", url);
    } catch (err) {
      console.error("AsyncLoader error:", err);
    }
  }

  function bindCategoryLinks() {
    // For .third-list links
    document.querySelectorAll('.third-list [data-category] a').forEach(el => {
      el.addEventListener("click", e => {
        const category = el.parentElement.getAttribute("data-category");
        if (!category) return;
        e.preventDefault();
        const url = `/pages/projects.html?category=${encodeURIComponent(category)}`;
        loadPage(url);
      });
    });

    // For #filter buttons
    document.querySelectorAll('#category-buttons [data-category]').forEach(el => {
      el.addEventListener("click", e => {
        const category = el.getAttribute("data-category");
        if (!category || category === "filter") return;
        e.preventDefault();
        const url = `/pages/projects.html?category=${encodeURIComponent(category)}`;
        loadPage(url);
      });
    });
  }

  // Intercept normal nav <a> clicks
  document.body.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href) return;

    // external or hash links → ignore
    if (href.startsWith("http") || href.startsWith("#")) return;

    if (window.location.pathname === href) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    loadPage(href);
  });

  // Initial binding
  bindCategoryLinks();

  // Browser back/forward
  window.addEventListener("popstate", (e) => {
    const url = e.state?.url || window.location.pathname;
    loadPage(url, false);
  });
}

document.addEventListener("DOMContentLoaded", initAsyncLoader);
