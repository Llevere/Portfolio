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
  return isMobile ? 750 : isTablet ? 1500 : cores >= 12 ? 2500 : 1000;
}

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (renderer?.setMouse) {
    renderer.setMouse(mouseX, mouseY);
  }
});

export function resetDots(isMounting = false) {
  const rangeInput = document.getElementById("rangeInput");
  if (isMounting && rangeInput) {
    setTimeout(() => {
      rangeInput.value = "150";
      console.log("Setting range input (delayed)", rangeInput.value);

      const userLimit = parseInt(rangeInput.value || "150", 10);
      const clampedLimit = Math.min(userLimit, maxFireflies());
      console.log("Clamped limit (delayed):", userLimit, clampedLimit);
      renderer?.updateDots(clampedLimit);
    }, 0);
    return;
  }
  const userLimit = parseInt(rangeInput?.value || "150", 10);
  const clampedLimit = Math.min(userLimit, maxFireflies());
  console.log(
    "Clamped limit:",
    userLimit,
    clampedLimit,
    rangeInput.value,
    isMounting
  );
  renderer?.updateDots(clampedLimit);
}

function renderLoop() {
  renderer.render();
  requestAnimationFrame(renderLoop);
}

export function initCanvas() {
  controller = new CanvasController();
  renderer = new Canvas2DRenderer(controller.canvas);

  window.addEventListener("resize", () => {
    controller.resize();
    renderer?.resize();
  });

  setTimeout(() => {
    controller.resize();
    renderer?.resize();
  }, 100);

  setupBatteryAwareness();
  resetDots(true);
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
