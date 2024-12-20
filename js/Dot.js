export class Dot {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.alpha = Math.random() * 360 + 1;
    this.speed = Math.random() * 100 < 50 ? 1 : -1;
    this.speed *= 0.05;
    this.size = Math.random() * (window.innerWidth <= 600 ? 4 : 5);
    this.color = Math.floor(Math.random() * 256);

    this.context = canvas.getContext("2d");
  }

  draw() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
    if (this.size < 1) this.size += 1.0;
    this.context.fillStyle =
      this.size < 2
        ? "#FF4433"
        : this.size < 3
        ? "#ffaa33"
        : this.size < 4
        ? "#347532"
        : "#fff896";
    this.context.fill();
  }

  move() {
    this.alpha += this.speed;
    this.color += Math.random() * 100 < 50 ? 1 : -1;

    if (this.x < 0 || this.x > this.canvas.width) {
      this.speed *= -1;
    }
    if (this.y < 0 || this.y > this.canvas.height) {
      this.speed *= -1;
    }

    this.x += Math.cos(this.alpha) * 0.35;
    this.y += Math.sin(this.alpha) * 0.35;
  }
}
