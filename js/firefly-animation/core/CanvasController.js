export class CanvasController {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");

    Object.assign(this.canvas.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      zIndex: -10,
      pointerEvents: "none",
      backgroundColor: "transparent",
    });

    document.body.appendChild(this.canvas);
    this.resize();

    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Set actual resolution
    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;

    // Match on-screen size
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;

    // Reset transform + scale
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.scale(dpr, dpr);

    console.log(
      "Canvas size:",
      this.canvas.width,
      width,
      this.canvas.height,
      height
    );
  }
}
