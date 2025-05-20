import { showToast } from "../../utils.js";

export let batteryAwareThrottle = false;
export let batteryThrottleRate = 60;
let batteryToastShown = false;

export function setupBatteryAwareness() {
  if (!("getBattery" in navigator)) return;

  navigator.getBattery().then((battery) => {
    function checkBatteryStatus() {
      if (!battery.charging && battery.level < 0.3 && !batteryToastShown) {
        batteryAwareThrottle = true;
        batteryThrottleRate = 150;
        showToast("⚡ Battery is low. Throttling animations.");
        batteryToastShown = true;
      }
    }

    checkBatteryStatus();
    battery.addEventListener("levelchange", checkBatteryStatus);
    battery.addEventListener("chargingchange", checkBatteryStatus);
  });
}
