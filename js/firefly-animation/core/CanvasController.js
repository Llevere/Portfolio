export class CanvasController {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");

    Object.assign(this.canvas.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100vw",
      height: "100vh",
      zIndex: -10,
      pointerEvents: "none",
      backgroundColor: "transparent",
    });

    document.body.appendChild(this.canvas);
    this.resize();
    new ResizeObserver(() => this.resize()).observe(document.documentElement);

    window.addEventListener("orientationchange", () =>
      setTimeout(() => this.resize(), 250)
    );
  }

  resize() {
    document.body.offsetHeight;
    const dpr = window.devicePixelRatio || 1;
    this.scale = dpr;

    const width = window.innerWidth;
    const height = window.innerHeight;

    this.canvas.width = Math.floor(width * dpr);
    this.canvas.height = Math.floor(height * dpr);
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;

    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.scale(dpr, dpr);
  }
}
