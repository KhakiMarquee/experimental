let pInstance; // will hold a p5 instance for storage


// --- THEME INITIALIZATION ---
export function initTheme(p5inst) {
  pInstance = p5inst; // save instance if passed

  let savedTheme = null;

  try {
    if (pInstance) {
      savedTheme = pInstance.getItem("theme"); // p5 storage
    } else {
      savedTheme = localStorage.getItem("theme"); // fallback
    }
  } catch (err) {
    console.warn("Could not access storage:", err);
  }

  console.log(savedTheme)
  if(savedTheme == "dark") {
    toggleTheme()
  }else {document.documentElement.setAttribute("data-theme", savedTheme || "light");}
  
}

// --- THEME TOGGLER ---
export function toggleTheme() {
  const root = document.documentElement;
  const loader = document.querySelector("#loading-screen.loaded");  
  const currentTheme = root.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  root.setAttribute("data-theme", newTheme);

  if (loader) {
    loader.style.opacity = newTheme === "dark" ? "0.9" : "0.1";
  }

  try {
    if (pInstance) {
      pInstance.storeItem("theme", newTheme); // p5 storage
    } else {
      localStorage.setItem("theme", newTheme); // fallback
    }
  } catch (err) {
    console.warn("Theme preference not saved:", err);
  }
}