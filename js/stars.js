export function initStars() {
  const stars = document.querySelectorAll(".stars span");
  stars.forEach((star) => {
    star.classList.add("animated-star");
  });
}
