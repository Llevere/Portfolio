import { Dot } from "./Dot.js";
// canvas.js
export let dotCount = window.innerWidth <= 500 ? 75 : 150;

let canvas = document.createElement("canvas");
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = -10;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

const context = canvas.getContext("2d");
const dots = [];

export function resetDots() {
  dots.length = 0;
  for (let i = 0; i < dotCount; i++) {
    dots.push(new Dot(canvas));
  }
}

export function setupCanvas() {
  resetDots();
  render();
}

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < dotCount; i++) {
    dots[i].draw();
    dots[i].move();
  }
  requestAnimationFrame(render);
}
