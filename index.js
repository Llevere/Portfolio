// document
//   .getElementById("contact-form")
//   .addEventListener("submit", async function (event) {
//     event.preventDefault(); // Prevent default form submission

//     const formData = new FormData(event.target);
//     const name = formData.get("name");
//     const email = formData.get("email");
//     const body = formData.get("message");
//     // Make POST request to backend
//     await fetch("http://localhost:5000/sendEmail", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ name, email, body }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         if (data.success) {
//           alert("Email sent successfully");
//         } else {
//           alert("Error sending email");
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         alert("Error sending email");
//       });
//   });

function submitForm() {
  const name = document.getElementById("contact-form-name").value;
  const email = document.getElementById("contact-form-email").value;
  const message = document.getElementById("contact-form-message").value;

  // Construct the mailto link with the form data
  const mailtoLink = `mailto:mattlevere@hotmail.com?subject=Portfolio%20Contact%20Form%20Submission&body=Name:%20${name}%0D%0AMessage:%20${message}`;

  // Open the default email client with the mailto link
  window.location.href = mailtoLink;
}

const navigation = document.querySelector(".primary-navigation");

const navigationHeight = navigation.offsetHeight;

document.documentElement.style.setProperty(
  "--scroll-padding",
  navigationHeight + "px"
);

const toggleButton = document.getElementById("toggleAnimation");

toggleButton.addEventListener("click", function () {
  document.documentElement.classList.toggle("reduce-motion");
});

let isScrolling;

function addScrollingClass() {
  document.body.classList.add("scrolling");
}

function removeScrollingClass() {
  document.body.classList.remove("scrolling");
}

window.addEventListener(
  "scroll",
  function () {
    window.clearTimeout(isScrolling);

    addScrollingClass();

    isScrolling = setTimeout(function () {
      removeScrollingClass();
    }, 200);
  },
  false
);
function toggleDropdown() {
  var dropdownContent = document.getElementById("dropdownContent");
  dropdownContent.classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropdown-content")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

// Get the range input element
const rangeInput = document.getElementById("rangeInput");
// Get the span element to display the value
const rangeValue = document.getElementById("rangeValue");

const rangeInputDropdown = document.getElementById("rangeInputDropdown");
const rangeValueDropdown = document.getElementById("rangeValueDropdown");
// Add an event listener to the range input
rangeInput.addEventListener("input", function () {
  rangeValue.textContent = rangeInput.value;

  rangeInputDropdown.value = rangeInput.value;
  rangeValue.textContent = rangeInput.value;
  dotCount = parseInt(rangeInput.value);
  resetDots();
});

rangeInputDropdown.addEventListener("input", function () {
  rangeValueDropdown.textContent = rangeInputDropdown.value;
  dotCount = parseInt(rangeInputDropdown.value);
  resetDots();
});

document.getElementById("resetDots").addEventListener("click", () => {
  rangeInput.value = 150;
  rangeValue.textContent = 150;
  rangeInputDropdown.value = 2000;
  rangeValueDropdown.textContent = 2000;
  dotCount = 150;
  // Clear and redraw dots based on the new dotCount
  resetDots();
});

const canvas = document.createElement("canvas");
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = -10;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

const context = canvas.getContext("2d");

// let dotCount = window.innerWidth <= 500 ? 75 : 150;
let dotCount = parseInt(rangeInput.value);
const dots = [];

function resetDots() {
  dots.length = 0; // Clear the dots array
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

function Dot() {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height;
  this.alpha = Math.random() * 360 + 1;
  this.speed = Math.random() * 100 < 50 ? 1 : -1;
  this.speed *= 0.05;
  this.size = Math.random() * 5;
  this.color = Math.floor(Math.random() * 256);
}

// Draw function for the dot
Dot.prototype.draw = function () {
  context.beginPath();
  context.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
  if (this.size < 2) {
    context.fillStyle = "#FF4433";
  } else if (this.size < 3) {
    context.fillStyle = "#ffaa33";
  } else if (this.size < 4) {
    context.fillStyle = "#fff896";
  } else {
    context.fillStyle = `rgb(${this.color}, ${this.color}, ${this.color})`;
  }
  context.fill();
};

// Move function for the dot
Dot.prototype.move = function () {
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

  // Update dot position
  this.x += Math.cos(this.alpha) * 0.35;
  this.y += Math.sin(this.alpha) * 0.35;
};

// Start the animation
render();

// // init
// var maxx = document.body.clientWidth;
// var maxy = document.body.clientHeight;
// var halfx = maxx / 2;
// var halfy = maxy / 2;
// var canvas = document.createElement("canvas");
// canvas.style.zIndex = -500;
// document.body.appendChild(canvas);
// canvas.width = maxx;
// canvas.height = maxy;
// var context = canvas.getContext("2d");
// var dotCount = 200;
// var dots = [];
// // create dots
// for (var i = 0; i < dotCount; i++) {
//   dots.push(new dot());
// }

// // dots animation
// function render() {
//   context.fillRect(0, 0, maxx, maxy);
//   for (var i = 0; i < dotCount; i++) {
//     dots[i].draw();
//     dots[i].move();
//   }
//   requestAnimationFrame(render);
// }

// // dots class
// // @constructor
// function dot() {
//   this.rad_x = 2 * Math.random() * halfx + 1;
//   this.rad_y = 1.2 * Math.random() * halfy + 1;
//   this.alpha = Math.random() * 360 + 1;
//   this.speed = Math.random() * 100 < 50 ? 1 : -1;
//   this.speed *= 0.1;
//   this.size = Math.random() * 5 + 1;
//   this.color = Math.floor(Math.random() * 256);
// }

// // drawing dot
// dot.prototype.draw = function () {
//   // calc polar coord to decart
//   var dx = halfx + this.rad_x * Math.cos((this.alpha / 180) * Math.PI);
//   var dy = halfy + this.rad_y * Math.sin((this.alpha / 180) * Math.PI);
//   // set color
//   context.fillStyle =
//     "rgb(" + this.color + "," + this.color + "," + this.color + ")";
//   // draw dot
//   context.fillRect(dx, dy, this.size, this.size);
// };

// // calc new position in polar coord
// dot.prototype.move = function () {
//   this.alpha += this.speed;
//   // change color
//   if (Math.random() * 100 < 50) {
//     this.color += 1;
//   } else {
//     this.color -= 1;
//   }
// };

// // start animation
// render();

// /*
// Background Gradients From --
// https://uigradients.com
// */
