import { useEffect, useRef } from "react";

interface WaveGeneratorConfig {
  phase?: number;
  offset?: number;
  frequency?: number;
  amplitude?: number;
}

class WaveGenerator {
  private phase: number;
  private offset: number;
  private frequency: number;
  private amplitude: number;
  private lastValue: number;

  constructor(config: WaveGeneratorConfig = {}) {
    this.phase = config.phase || 0;
    this.offset = config.offset || 0;
    this.frequency = config.frequency || 0.001;
    this.amplitude = config.amplitude || 1;
    this.lastValue = 0;
  }

  update(): number {
    this.phase += this.frequency;
    this.lastValue = this.offset + Math.sin(this.phase) * this.amplitude;
    return this.lastValue;
  }

  value(): number {
    return this.lastValue;
  }
}

interface NodeType {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface LineConfig {
  spring?: number;
}

interface CanvasConfig {
  debug?: boolean;
  friction: number;
  trails: number;
  size: number;
  dampening: number;
  tension: number;
}

class Line {
  private spring: number;
  private friction: number;
  nodes: NodeType[];

  constructor(
    config: LineConfig = {},
    E: CanvasConfig,
    pos: { x: number; y: number }
  ) {
    this.spring = (config.spring || 0) + 0.1 * Math.random() - 0.02;
    this.friction = E.friction + 0.01 * Math.random() - 0.002;
    this.nodes = [];

    for (let n = 0; n < E.size; n++) {
      const node: NodeType = {
        x: pos.x,
        y: pos.y,
        vx: 0,
        vy: 0,
      };
      this.nodes.push(node);
    }
  }

  update(pos: { x: number; y: number }, E: CanvasConfig): void {
    let e = this.spring;
    const t = this.nodes[0];
    t.vx += (pos.x - t.x) * e;
    t.vy += (pos.y - t.y) * e;

    for (let i = 0; i < this.nodes.length; i++) {
      const t = this.nodes[i];
      if (i > 0) {
        const n = this.nodes[i - 1];
        t.vx += (n.x - t.x) * e;
        t.vy += (n.y - t.y) * e;
        t.vx += n.vx * E.dampening;
        t.vy += n.vy * E.dampening;
      }

      t.vx *= this.friction;
      t.vy *= this.friction;
      t.x += t.vx;
      t.y += t.vy;
      e *= E.tension;
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const firstNode = this.nodes[0];
    let n = firstNode.x;
    let i = firstNode.y;

    ctx.beginPath();
    ctx.moveTo(n, i);

    for (let a = 1; a < this.nodes.length - 2; a++) {
      const e = this.nodes[a];
      const t = this.nodes[a + 1];
      n = 0.5 * (e.x + t.x);
      i = 0.5 * (e.y + t.y);
      ctx.quadraticCurveTo(e.x, e.y, n, i);
    }

    const e = this.nodes[this.nodes.length - 2];
    const t = this.nodes[this.nodes.length - 1];
    ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
    ctx.stroke();
    ctx.closePath();
  }
}

const useCanvasCursor = (): void => {
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const linesRef = useRef<Line[]>([]);

  const E: CanvasConfig = {
    debug: true,
    friction: 0.5,
    trails: 20,
    size: 50,
    dampening: 0.25,
    tension: 0.98,
  };

  const pos: { x: number; y: number } = { x: 0, y: 0 };

  const onMousemove = (e: MouseEvent | TouchEvent): void => {
    const handleMouseMove = (event: MouseEvent | TouchEvent): void => {
      if ("touches" in event) {
        pos.x = event.touches[0].pageX;
        pos.y = event.touches[0].pageY;
      } else {
        pos.x = (event as MouseEvent).clientX;
        pos.y = (event as MouseEvent).clientY;
      }
      event.preventDefault();
    };

    const handleTouchStart = (event: TouchEvent): void => {
      if (event.touches.length === 1) {
        pos.x = event.touches[0].pageX;
        pos.y = event.touches[0].pageY;
      }
    };

    const resetLines = (): void => {
      linesRef.current = [];
      for (let e = 0; e < E.trails; e++) {
        linesRef.current.push(
          new Line({ spring: 0.4 + (e / E.trails) * 0.025 }, E, pos)
        );
      }
    };

    document.removeEventListener("mousemove", onMousemove);
    document.removeEventListener("touchstart", onMousemove);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleMouseMove);
    document.addEventListener("touchstart", handleTouchStart);

    handleMouseMove(e);
    resetLines();
    render();
  };

  const f = new WaveGenerator({
    phase: Math.random() * 2 * Math.PI,
    amplitude: 85,
    frequency: 0.0015,
    offset: 285,
  });

  const render = (): void => {
    const ctx = ctxRef.current;
    if (!ctx || !ctx.canvas) return;

    if (ctx.running) {
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = `hsla(${Math.round(f.update())},50%,50%,0.2)`;
      ctx.lineWidth = 1;

      for (let t = 0; t < E.trails; t++) {
        const e = linesRef.current[t];
        e.update(pos, E);
        e.draw(ctx);
      }

      ctx.frame++;
      window.requestAnimationFrame(render);
    }
  };

  const resizeCanvas = (): void => {
    const ctx = ctxRef.current;
    if (!ctx || !ctx.canvas) return;

    ctx.canvas.width = window.innerWidth - 20;
    ctx.canvas.height = window.innerHeight;
  };

  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    ctxRef.current = canvas.getContext("2d") as CanvasRenderingContext2D;
    const ctx = ctxRef.current;

    ctx.running = true;
    ctx.frame = 1;

    document.addEventListener("mousemove", onMousemove);
    document.addEventListener("touchstart", onMousemove);
    document.body.addEventListener("orientationchange", resizeCanvas);
    window.addEventListener("resize", resizeCanvas);

    const handleFocus = (): void => {
      if (!ctx.running) {
        ctx.running = true;
        render();
      }
    };

    const handleBlur = (): void => {
      ctx.running = false;
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    resizeCanvas();

    return () => {
      ctx.running = false;
      document.removeEventListener("mousemove", onMousemove);
      document.removeEventListener("touchstart", onMousemove);
      document.body.removeEventListener("orientationchange", resizeCanvas);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);
};

export default useCanvasCursor;

// Extend CanvasRenderingContext2D type to include custom properties
declare global {
  interface CanvasRenderingContext2D {
    running: boolean;
    frame: number;
  }
}
