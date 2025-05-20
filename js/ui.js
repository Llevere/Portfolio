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
  const stars = document.querySelectorAll(".stars span");
  stars.forEach((star) => {
    star.classList.toggle("paused");
  });
}
