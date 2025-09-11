// team.js
export function initTeamDropdowns() {
  const containers = document.querySelectorAll(".team-member-container");

  containers.forEach((container) => {
    const member = container.querySelector(".team-member");
    const dropdown = container.querySelector(".team-dropdown");

    if (!member || !dropdown) return;

    member.addEventListener("click", () => {
      // Close all other open dropdowns
      containers.forEach((c) => {
        const m = c.querySelector(".team-member");
        const d = c.querySelector(".team-dropdown");
        if (m && d && c !== container) {
          m.classList.remove("active");
          d.style.display = "none";
          m.classList.remove("active");
        }
      });

      // Toggle current one
      const isActive = member.classList.contains("active");
      if (isActive) {
        member.classList.remove("active");
        dropdown.style.display = "none";
        member.classList.remove("active");
      } else {
        member.classList.add("active");
        dropdown.style.display = "block";
        member.classList.add("active");
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initTeamDropdowns();
});
