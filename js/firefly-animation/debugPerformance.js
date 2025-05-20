import {
  batteryAwareThrottle,
  batteryThrottleRate,
} from "./managers/battery.js";

export function startFPSMonitor(getFPSData, onUpdate) {
  let lastCheck = performance.now();
  let frames = 0;

  function tick() {
    const now = performance.now();
    frames++;

    if (now - lastCheck >= 1000) {
      const fps = frames;
      frames = 0;
      lastCheck = now;
      const { dots, userLimit, maxFireflies, adaptPerformance } = getFPSData();
      const isReducing = adaptPerformance(
        fps,
        dots.length,
        userLimit,
        maxFireflies
      );
      onUpdate(fps, dots.length, isReducing);
    }

    setTimeout(
      () => requestAnimationFrame(tick),
      batteryAwareThrottle ? batteryThrottleRate : 0
    );
  }

  requestAnimationFrame(tick);
}
