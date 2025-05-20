export function initNav() {
  const menuBtn = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-nav");

  menuBtn?.addEventListener("click", () => {
    menuBtn.classList.toggle("is-active");
    mobileMenu.classList.toggle("is-active");
  });

  mobileMenu?.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      menuBtn.classList.remove("is-active");
      mobileMenu.classList.remove("is-active");
    }
  });

  const nav = document.querySelector(".primary-navigation");
  if (nav) {
    const height = nav.offsetHeight;
    document.documentElement.style.setProperty(
      "--scroll-padding",
      `${height}px`
    );
  }
}
