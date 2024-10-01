window.addEventListener("DOMContentLoaded", () => {
  const rangeInput = document.getElementById("rangeValue");
  rangeInput.innerHTML = window.innerWidth <= 600 ? "75" : "150";

  const toggleButton = document.querySelector(".toggleAnimation");
  toggleButton.addEventListener("click", function () {
    document.documentElement.classList.toggle("reduce-motion");
    toggleButton.style.opacity = toggleButton.style.opacity <= 0.5 ? 1 : 0.5;
  });

  const toggleDesktiopAnimationButton =
    document.getElementById("toggleAnimation");
  toggleDesktiopAnimationButton.addEventListener("click", function () {
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
});

window.onload = () => {
  const menuBtn = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-nav");
  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("is-active");
    mobileMenu.classList.toggle("is-active");
  });

  // mobileMenu.addEventListener("click", () => {
  //   menuBtn.classList.toggle("is-active");
  //   mobileMenu.classList.toggle("is-active");
  // });
  mobileMenu.addEventListener("click", (event) => {
    const clickedElement = event.target;
    if (clickedElement.tagName === "A") {
      menuBtn.classList.toggle("is-active");
      mobileMenu.classList.toggle("is-active");
    }
  });
};

function isClickedOutsideModal(event) {
  if (!modal.contains(event.target)) {
    return true;
  }
  return false;
}
function handleClickOutsideModal(event) {
  if (isClickedOutsideModal(event)) {
    document.body.classList.remove("no-scroll");
    modal.style.display = "none";
  }
}

function viewProjectDemo(pageRef) {
  window.open(pageRef, "_blank");
}

function handleNav() {
  const mobileNav = document.getElementById("mobile-list");
  const outsideIcon = document.getElementById("nav-outside-menu");
  const insideIcon = document.getElementById("nav-inside-menu");

  mobileNav.classList.toggle("hide");
  mobileNav.classList.toggle("show");
  outsideIcon.classList.toggle("hide");
}

let modalContent = document.querySelectorAll(".storyBehindProject");
modalContent.forEach((modal) => {
  modal.addEventListener("click", () => {
    document.body.classList.add("no-scroll");
  });
});

let modal;

var closeButtons = document.querySelectorAll(".close");

// Add click event listener to each close button
closeButtons.forEach(function (closeButton) {
  closeButton.addEventListener("click", function () {
    document.body.classList.remove("no-scroll");
    modal.style.display = "none";
  });
});
document
  .getElementById("storyBehindChessGame")
  .addEventListener("click", () => {
    modal = document.getElementById("chessGameModal");
    modal.style.display = "block";
  });
document
  .getElementById("storyBehindSortingAlgorithm")
  .addEventListener("click", () => {
    modal = document.getElementById("sortingAlgorithmModal");
    modal.style.display = "block";
  });
document
  .getElementById("storyBehindSocialNetworking")
  .addEventListener("click", () => {
    modal = document.getElementById("socialNetworkModal");
    modal.style.display = "block";
  });

document
  .getElementById("storyBehindMultiChess")
  .addEventListener("click", () => {
    modal = document.getElementById("mutliplayerChessModal");
    modal.style.display = "block";
  });

document.addEventListener("click", (event) => {
  const toggleInput = document.getElementById("toggleInput");
  const generateDotsButton = document.getElementById("generateDots");

  if (
    !toggleInput.contains(event.target) &&
    event.target !== generateDotsButton
  ) {
    toggleInput.style.display = "none";
  }

  if (event.target == modal) {
    document.body.classList.remove("no-scroll");
    modal.style.display = "none";
  }
});

document.getElementById("generateDots").addEventListener("click", () => {
  document.getElementById("toggleInput").style.display =
    toggleInput.style.display === "none" ? "flex" : "none";
});

const navigation = document.querySelector(".primary-navigation");

const navigationHeight = navigation.offsetHeight;

document.documentElement.style.setProperty(
  "--scroll-padding",
  navigationHeight + "px"
);

function toggleAnimation() {
  const img = document.getElementById("toggleAnimation");

  img.style.opacity = img.style.opacity < 0.5 ? 1 : 0.2;
}

let isScrolling;

const rangeInput = document.getElementById("rangeInput");

const rangeValue = document.getElementById("rangeValue");

rangeInput.addEventListener("input", function () {
  rangeValue.textContent = rangeInput.value;

  dotCount = parseInt(rangeInput.value);
  resetDots();
});

document.getElementById("resetDots").addEventListener("click", () => {
  rangeInput.value = 150;
  rangeValue.textContent = 150;
  //rangeInputDropdown.value = 2000;
  //rangeValueDropdown.textContent = 2000;
  dotCount = 150;
  // Clear and redraw dots based on the new dotCount
  resetDots();
});

let canvas = document.createElement("canvas");
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = -10;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

const context = canvas.getContext("2d");
let dotCount = window.innerWidth <= 500 ? 75 : 150;

const dots = [];

function resetDots() {
  dots.length = 0;
  for (let i = 0; i < dotCount; i++) {
    dots.push(new Dot());
  }
}

for (let i = 0; i < dotCount; i++) {
  dots.push(new Dot());
}

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < dotCount; i++) {
    dots[i].draw();
    dots[i].move();
  }
  requestAnimationFrame(render);
}

class Dot {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.alpha = Math.random() * 360 + 1;
    this.speed = Math.random() * 100 < 50 ? 1 : -1;
    this.speed *= 0.05;
    this.size = Math.random() * (window.innerWidth <= 600 ? 4 : 5);
    this.color = Math.floor(Math.random() * 256);
  }
  // Draw function for the dot
  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);

    if (this.size < 1) this.size += 1.0;
    //Different colours based on size
    else if (this.size < 2) {
      context.fillStyle = "#FF4433";
    } else if (this.size < 3) {
      context.fillStyle = "#ffaa33";
    } else if (this.size < 4) {
      context.fillStyle = "#347532";
    } else {
      context.fillStyle = "#fff896";
    }
    context.fill();
  }
  // Move function for the dot
  move() {
    this.alpha += this.speed;
    if (Math.random() * 100 < 50) {
      this.color += 1;
    } else {
      this.color -= 1;
    }

    // Ensure dots remain within canvas bounds
    if (this.x < 0 || this.x > canvas.width) {
      this.speed *= -1;
    }
    if (this.y < 0 || this.y > canvas.height) {
      this.speed *= -1;
    }

    // Move the dot in a cirlce
    this.x += Math.cos(this.alpha) * 0.35;
    this.y += Math.sin(this.alpha) * 0.35;
  }
}

//Animation for the dots (fireflies)
render();
