import { Canvas2DRenderer } from "./renderers/Canvas2DRenderer.js";
import { CanvasController } from "./core/CanvasController.js";
import { setupBatteryAwareness } from "./managers/battery.js";
import { startFPSMonitor } from "./debugPerformance.js";
import { isMobile, isTablet, cores } from "../utils.js";
let controller;
let renderer;
let mouseX = 0;
let mouseY = 0;

let lastDropTime = 0;

export function maxFireflies() {
  return isMobile ? 300 : isTablet ? 600 : cores >= 12 ? 2500 : 1000;
}

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (renderer?.setMouse) {
    renderer.setMouse(mouseX, mouseY);
  }
});

export function resetDots() {
  const rangeInput = document.getElementById("rangeInput");
  const userLimit = parseInt(rangeInput?.value || "150", 10);
  const clampedLimit = Math.min(userLimit, maxFireflies());
  renderer?.updateDots(clampedLimit);
}

function renderLoop() {
  renderer.render();
  requestAnimationFrame(renderLoop);
}

export function initCanvas() {
  controller = new CanvasController();
  renderer = new Canvas2DRenderer(controller.canvas);

  setTimeout(() => controller.resize(), 0);

  setupBatteryAwareness();
  resetDots();
  renderLoop();

  startFPSMonitor(
    () => ({
      dots: renderer.dots,
      userLimit: parseInt(
        document.getElementById("rangeInput")?.value || "150",
        10
      ),
      maxFireflies: () => maxFireflies(),
      adaptPerformance: (fps) => fps < 30,
    }),
    (() => {
      let lastDropTime = 0;
      return (fps, dotCount, isReducing) => {
        const overlay = document.getElementById("debugOverlay");
        if (overlay) {
          overlay.innerText =
            `FPS: ${fps} | Dots: ${renderer.dots.length}` +
            (isReducing ? "\nReducing dots until FPS ≥ 30..." : "");
        }

        const now = performance.now();
        if (
          isReducing &&
          now - lastDropTime > 250 &&
          renderer.dots.length > 10
        ) {
          lastDropTime = now;
          renderer.updateDots(renderer.dots.length - 25);
        }
      };
    })()
  );
}
