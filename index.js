import { initModals, toggleAnimation } from "./js/ui.js";
import {
  initCanvas,
  resetDots,
  maxFireflies,
} from "./js/firefly-animation/canvas.js";
import { initStars } from "./js/stars.js";
import { initNav } from "./js/nav.js";
import { adjustNavbarLinks, debounce } from "./js/utils.js";

document.addEventListener("DOMContentLoaded", () => {
  initModals();
  initCanvas();
  initStars();
  initNav();

  window.toggleAnimation = toggleAnimation;
  window.resetDots = resetDots;

  // 🌟 FIX: Move the DOM setup for dot controls here
  const generateBtn = document.getElementById("generateDots");
  const toggleInput = document.getElementById("toggleInput");
  const rangeInput = document.getElementById("rangeInput");
  const rangeValue = document.getElementById("rangeValue");
  const resetBtn = document.getElementById("resetDots");

  rangeInput.max = maxFireflies();
  document.querySelector(
    "label[for='rangeInput']"
  ).innerHTML = `Generate Dots 75–${maxFireflies()}`;

  generateBtn?.addEventListener("click", () => {
    toggleInput.style.display =
      toggleInput.style.display === "none" ? "flex" : "none";
  });

  rangeInput?.addEventListener(
    "input",
    debounce(() => {
      rangeValue.textContent = rangeInput.value;
      resetDots();
    }, 150)
  );

  resetBtn?.addEventListener("click", () => {
    rangeInput.value = 150;
    rangeValue.textContent = 150;
    resetDots();
  });

  document.addEventListener("click", (event) => {
    if (!toggleInput.contains(event.target) && event.target !== generateBtn) {
      toggleInput.style.display = "none";
    }
  });

  adjustNavbarLinks();
  window.addEventListener("scroll", debounce(adjustNavbarLinks, 100));
});
