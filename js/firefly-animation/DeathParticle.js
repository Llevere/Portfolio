export class DeathParticle {
  constructor(x, y, colour) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 1.5;
    this.vy = (Math.random() - 0.5) * 1.5;
    this.alpha = 1;
    this.size = Math.random() * 2 + 1;
    this.colour = colour;
    this.life = 400 + Math.random() * 300;
    this.birth = performance.now();
  }

  update(dt) {
    this.x += this.vx;
    this.y += this.vy;
    const age = performance.now() - this.birth;
    this.alpha = Math.max(0, 1 - age / this.life);
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.colour.replace("1.00)", `${this.alpha.toFixed(2)})`);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  isAlive() {
    return this.alpha > 0;
  }
}
