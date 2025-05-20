import { Dot } from "../core/Dot.js";
import { DeathParticle } from "../DeathParticle.js";

export class Canvas2DRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.scale = window.devicePixelRatio < 1.5 ? 1 : 0.75;

    this.dots = [];
    this.fadingDots = [];
    this.bursts = [];
    this.particles = [];

    this.resize();
    window.addEventListener("resize", () => this.resize());

    window.addEventListener("click", (e) => {
      const x = e.clientX;
      const y = e.clientY;

      const interactiveTags = [
        "BUTTON",
        "INPUT",
        "LABEL",
        "TEXTAREA",
        "SELECT",
        "A",
      ];
      const isUIElement =
        interactiveTags.includes(e.target.tagName) ||
        e.target.closest(".modal-content") ||
        e.target.closest("#toggleInput-container") ||
        e.target.closest(".projectImg") ||
        e.target.closest(".nav-list") ||
        e.target.closest(".storyBehindProject");

      if (!isUIElement) this.triggerBurst(x, y);
    });
  }

  resize() {
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;

    this.canvas.width = width * this.scale;
    this.canvas.height = height * this.scale;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;

    this.context.setTransform(this.scale, 0, 0, this.scale, 0, 0);
  }

  updateDots(targetCount) {
    const currentCount = this.dots.length;
    const difference = targetCount - currentCount;

    if (difference > 0) {
      for (let i = 0; i < difference; i++) {
        this.dots.push(new Dot());
      }
    } else if (difference < 0) {
      for (let i = 0; i < Math.abs(difference); i++) {
        const dot = this.dots.pop();
        if (dot) {
          dot._fadingOut = true;
          dot.fadeStartTime = performance.now();
          this.fadingDots.push(dot);
        }
      }
    }
  }

  triggerBurst(x, y) {
    const radius = 60;
    const clickedDot = this.dots.find((dot) => {
      const dx = dot.getX(this.canvas) - x;
      const dy = dot.getY(this.canvas) - y;
      return Math.sqrt(dx * dx + dy * dy) < radius;
    });

    if (clickedDot && !clickedDot._exploded) {
      this.chainExplode(clickedDot);
      this.bursts.push({
        x,
        y,
        radius: 0,
        maxRadius: radius,
        alpha: 0.6,
        affectedDots: new Set(),
      });
    }
  }

  chainExplode(dot) {
    if (dot._exploded) return;
    dot._exploded = true;
    dot.explodeTime = performance.now();

    const index = this.dots.indexOf(dot);
    if (index !== -1) this.dots.splice(index, 1);

    this.bursts.push({
      x: dot.xRatio * this.canvas.width,
      y: dot.yRatio * this.canvas.height,
      radius: 0,
      maxRadius: 60,
      alpha: 0.6,
      affectedDots: new Set(),
    });

    for (let i = 0; i < 6; i++) {
      const x = dot.getX(this.canvas);
      const y = dot.getY(this.canvas);
      const rgba = dot.hexToRgba(dot.colour, 1);
      this.particles.push(new DeathParticle(x, y, rgba));
    }
  }

  render() {
    const ctx = this.context;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const dot of this.dots) {
      dot.move(null, null, this.dots.length, this.canvas);
      dot.draw(ctx, this.canvas);
    }

    for (const fadingDot of this.fadingDots) {
      fadingDot.move(null, null, this.dots.length, this.canvas);
      fadingDot.draw(ctx, this.canvas);
    }
    this.fadingDots = this.fadingDots.filter((dot) => !dot._exploded);

    for (let i = this.bursts.length - 1; i >= 0; i--) {
      const b = this.bursts[i];
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,200,100,${b.alpha})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      b.radius += 2.5;
      b.alpha *= 0.92;

      if (b.radius < b.maxRadius) {
        for (const dot of [...this.dots]) {
          const dx = dot.getX(this.canvas) - b.x;
          const dy = dot.getY(this.canvas) - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < b.radius && !b.affectedDots.has(dot) && !dot._exploded) {
            b.affectedDots.add(dot);
            this.chainExplode(dot);
          }
        }
      }

      if (b.alpha < 0.05) {
        this.bursts.splice(i, 1);
      }
    }

    for (const p of this.particles) {
      p.update();
      p.draw(ctx);
    }
    this.particles = this.particles.filter((p) => p.isAlive());
  }
}
