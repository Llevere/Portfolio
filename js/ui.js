export function initModals() {
  const buttons = document.querySelectorAll(".storyBehindProject");
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".close");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const modalId =
        button.id.replace("storyBehind", "").toLowerCase() + "Modal";
      document.getElementById(modalId).style.display = "block";
    });
  });

  closeButtons.forEach((close) => {
    close.addEventListener("click", () => {
      modals.forEach((modal) => (modal.style.display = "none"));
    });
  });

  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      e.target.style.display = "none";
    }
  });
}

export function toggleAnimation() {
  document.documentElement.classList.toggle("reduce-motion");
  const toggleButton = document.getElementById("toggleAnimation");
  toggleButton.style.opacity = toggleButton.style.opacity <= 0.5 ? 1 : 0.5;
}
