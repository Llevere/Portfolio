const navigation = document.querySelector(".primary-navigation");

const navigationHeight = navigation.offsetHeight;

document.documentElement.style.setProperty(
  "--scroll-padding",
  navigationHeight + "px"
);

// Create the canvas element
const canvas = document.createElement("canvas");
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = -10; // Set z-index to make it a background element
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

// Set up the canvas context
const context = canvas.getContext("2d");

// Adjust dotCount based on your preference
const dotCount = window.innerWidth <= 500 ? 75 : 150;
const dots = [];

// Create dots and push them to the dots array
for (let i = 0; i < dotCount; i++) {
  dots.push(new Dot());
}

// Function to draw and animate the dots
function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < dotCount; i++) {
    dots[i].draw();
    dots[i].move();
  }
  requestAnimationFrame(render);
}

// Dot class constructor
function Dot() {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height;
  this.alpha = Math.random() * 360 + 1;
  this.speed = Math.random() * 100 < 50 ? 1 : -1;
  this.speed *= 0.05;
  this.size = Math.random() * 5 + 1;
  this.color = Math.floor(Math.random() * 256);
}

// Draw function for the dot
Dot.prototype.draw = function () {
  context.fillStyle = `rgb(${this.color}, ${this.color}, ${this.color}`;
  context.fillRect(this.x, this.y, this.size, this.size);
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
