// ui.js
export function setupEventListeners() {
  const rangeInput = document.getElementById("rangeValue");
  rangeInput.innerHTML = window.innerWidth <= 600 ? "75" : "150";

  const toggleButton = document.querySelector(".toggleAnimation");
  toggleButton.addEventListener("click", function () {
    document.documentElement.classList.toggle("reduce-motion");
    toggleButton.style.opacity = toggleButton.style.opacity <= 0.5 ? 1 : 0.5;
  });

  window.addEventListener("resize", () => {
    if (canvas) {
      resetDots();
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  });

  const generateDotsButton = document.getElementById("generateDots");
  generateDotsButton.addEventListener("click", () => {
    const toggleInput = document.getElementById("toggleInput");
    toggleInput.style.display =
      toggleInput.style.display === "none" ? "flex" : "none";
  });

  const rangeInputEl = document.getElementById("rangeInput");
  const rangeValue = document.getElementById("rangeValue");

  rangeInputEl.addEventListener("input", function () {
    rangeValue.textContent = rangeInputEl.value;
    dotCount = parseInt(rangeInputEl.value);
    resetDots();
  });

  document.getElementById("resetDots").addEventListener("click", () => {
    rangeInputEl.value = 150;
    rangeValue.textContent = 150;
    dotCount = 150;
    resetDots();
  });
}
