export function getBackgroundColor(element) {
  while (element) {
    let bgColor = window.getComputedStyle(element).backgroundColor;
    if (bgColor !== "rgba(0, 0, 0, 0)" && bgColor !== "transparent") {
      return bgColor;
    }
    element = element.parentElement;
  }
  return "rgb(255, 255, 255)";
}

export function getLuminance(r, g, b) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

export function adjustNavbarLinks() {
  const links = document.querySelectorAll(".nav-list li a");
  links.forEach((link) => {
    const bg = getBackgroundColor(link.parentElement);
    const [r, g, b] = bg.match(/\d+/g).map(Number);
    const lum = getLuminance(r, g, b);

    link.style.color = lum < 128 ? "rgba(255,255,255,0.8)" : "#62438c";
    link.style.transition = "color 0.5s ease-in-out";
  });
}

export const debounce = (fn, delay = 300) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export function showToast(message, duration = 4000) {
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toastMessage");
  const closeBtn = document.getElementById("toastClose");

  if (!toast || !toastMsg || !closeBtn) return;

  toastMsg.textContent = message;
  toast.style.opacity = "1";

  clearTimeout(toast._hideTimeout);
  closeBtn.onclick = () => {
    toast.style.opacity = "0";
    clearTimeout(toast._hideTimeout);
  };

  toast._hideTimeout = setTimeout(() => {
    toast.style.opacity = "0";
  }, duration);
}

export const isMobile = /Mobi|Android/i.test(navigator.userAgent);
export const isTablet = /Tablet|iPad/i.test(navigator.userAgent);
export const cores = navigator.hardwareConcurrency || 4;
