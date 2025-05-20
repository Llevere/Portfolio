import { isMobile } from "../../utils.js";

export class Dot {
  constructor() {
    this.originXRatio = Math.random();
    this.originYRatio = Math.random();
    this.angle = Math.random() * Math.PI * 2;
    this.radius = Math.random() * 0.04 + 0.01;
    this.speed =
      (Math.random() < 0.5 ? 1 : -1) * (Math.random() * 0.008 + 0.004);
    this.size = Math.random() * (window.innerWidth <= 600 ? 4 : 5);
    this.opacityPhase = Math.random() * Math.PI * 2;
    this.opacitySpeed = Math.random() * 0.01 + 0.005;
    this.opacity = 1;

    this._exploded = false;
    this.explodeTime = null;
    this._fadingOut = false;
    this.fadeStartTime = null;

    this.trail = [];
    this.maxTrailLength = 10;

    const initialX = this.originXRatio + Math.cos(this.angle) * this.radius;
    const initialY = this.originYRatio + Math.sin(this.angle) * this.radius;
    this.xRatio = initialX;
    this.yRatio = initialY;

    const colours = ["#FF4433", "#ffaa33", "#fff896", "#347532"];
    this.colour = colours[Math.floor(Math.random() * colours.length)];

    this.vx = 0;
    this.vy = 0;
  }

  getX(canvas) {
    return this.xRatio * canvas.width;
  }

  getY(canvas) {
    return this.yRatio * canvas.height;
  }

  move(mouseX, mouseY, totalDots, canvas) {
    this.opacityPhase += this.opacitySpeed;
    const pulse = Math.sin(this.opacityPhase);
    this.opacity = Math.max(0.6, Math.pow((pulse + 1) / 2, 1.25) * 0.7 + 0.3);

    this.angle += this.speed;
    const orbitX = this.originXRatio + Math.cos(this.angle) * this.radius;
    const orbitY = this.originYRatio + Math.sin(this.angle) * this.radius;

    this.vx += (orbitX - this.xRatio) * 0.08;
    this.vy += (orbitY - this.yRatio) * 0.08;

    this.xRatio += this.vx;
    this.yRatio += this.vy;

    if (this.xRatio < 0 || this.xRatio > 1) {
      this.xRatio = Math.max(0, Math.min(1, this.xRatio));
      this.vx *= -0.9 + Math.random() * 0.1;
    }
    if (this.yRatio < 0 || this.yRatio > 1) {
      this.yRatio = Math.max(0, Math.min(1, this.yRatio));
      this.vy *= -0.9 + Math.random() * 0.1;
    }

    this.vx *= 0.97;
    this.vy *= 0.97;

    if (!isMobile) {
      this.trail.push({
        x: this.getX(canvas),
        y: this.getY(canvas),
        time: performance.now(),
      });
      if (this.trail.length > this.maxTrailLength) this.trail.shift();
    }
  }

  draw(context, canvas) {
    const x = this.getX(canvas);
    const y = this.getY(canvas);

    if (this._exploded) {
      const fade = this.explodeTime
        ? Math.max(0, 1 - (performance.now() - this.explodeTime) / 500)
        : 1;

      context.save();
      context.fillStyle = this.hexToRgba(this.colour, 0.7 * fade);
      context.beginPath();
      context.ellipse(
        x,
        y,
        this.size * 2.5,
        this.size * 1.2,
        0,
        0,
        Math.PI * 2
      );
      context.fill();
      context.restore();
      return;
    }

    let finalOpacity = this.opacity;
    if (this._fadingOut) {
      const fadeElapsed = performance.now() - this.fadeStartTime;
      const fadeDuration = 800;
      finalOpacity *= Math.max(0, 1 - fadeElapsed / fadeDuration);
      if (fadeElapsed > fadeDuration) {
        this._exploded = true;
      }
    }

    const currentSize = (this.size / 2) * finalOpacity;
    if (finalOpacity < 0.05 || currentSize < 0.25) return;

    context.save();

    for (let i = 0; i < this.trail.length; i++) {
      const { x: tx, y: ty } = this.trail[i];
      const alpha = ((i + 1) / this.trail.length) * 0.25 * finalOpacity;
      context.beginPath();
      context.fillStyle = this.hexToRgba(this.colour, alpha);
      context.arc(tx, ty, currentSize * 0.6, 0, Math.PI * 2);
      context.fill();
    }

    const gradient = context.createRadialGradient(
      x,
      y,
      0,
      x,
      y,
      currentSize * 2
    );
    gradient.addColorStop(0, this.hexToRgba(this.colour, finalOpacity));
    gradient.addColorStop(1, this.hexToRgba(this.colour, 0));
    context.fillStyle = gradient;

    context.beginPath();
    context.arc(x, y, currentSize * 2, 0, Math.PI * 2);
    context.fill();

    context.beginPath();
    context.arc(x, y, currentSize, 0, Math.PI * 2);
    context.fillStyle = this.hexToRgba(this.colour, finalOpacity);
    context.fill();

    context.restore();
  }

  hexToRgba(hex, alpha) {
    const bigint = parseInt(hex.replace("#", ""), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})`;
  }
}
