import { setupEventListeners } from "./ui.js";
import { setupCanvas } from "./canvas.js";
import { setupModals } from "./modal.js";

window.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  setupCanvas();
});

window.onload = () => {
  setupModals();
};
