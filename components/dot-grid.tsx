"use client";

import { useEffect, useRef } from "react";

// Animated dot grid: gentle wave + pointer-proximity ripple.
// Canvas 2D, not WebGL — ~2KB of code vs ~150KB for three.js.
// Honours prefers-reduced-motion (static grid), pauses offscreen,
// re-reads theme tokens when the .dark class flips.
export default function DotGrid() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SPACING = 26;
    const pointer = { x: -9999, y: -9999 };
    let raf = 0;
    let w = 0;
    let h = 0;
    let visible = true;

    function readColors() {
      const s = getComputedStyle(document.documentElement);
      return {
        dot: s.getPropertyValue("--ink-faint").trim() || "#7a7a8c",
        hot: s.getPropertyValue("--accent").trim() || "#c8f560",
      };
    }
    let colors = readColors();

    function draw(t: number) {
      ctx!.clearRect(0, 0, w, h);
      for (let x = SPACING / 2; x < w; x += SPACING) {
        for (let y = SPACING / 2; y < h; y += SPACING) {
          const wave = reduce ? 0 : Math.sin(x * 0.02 + y * 0.015 + t * 0.0012);
          const dist = Math.hypot(x - pointer.x, y - pointer.y);
          const boost = Math.max(0, 1 - dist / 140);
          ctx!.beginPath();
          ctx!.arc(x, y, Math.max(0.4, 1 + wave * 0.5 + boost * 1.8), 0, Math.PI * 2);
          ctx!.fillStyle = boost > 0.05 ? colors.hot : colors.dot;
          ctx!.globalAlpha = 0.2 + (wave + 1) * 0.12 + boost * 0.55;
          ctx!.fill();
        }
      }
      ctx!.globalAlpha = 1;
    }

    function loop(t: number) {
      draw(t);
      raf = visible ? requestAnimationFrame(loop) : 0;
    }

    function start() {
      if (!reduce && visible && raf === 0) raf = requestAnimationFrame(loop);
    }

    function stop() {
      cancelAnimationFrame(raf);
      raf = 0;
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) draw(0);
    }

    const themeObserver = new MutationObserver(() => {
      colors = readColors();
      if (reduce) draw(0);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const parent = canvas.parentElement;
    parent?.addEventListener("pointermove", onMove);
    parent?.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", resize);

    resize();
    start();

    return () => {
      stop();
      themeObserver.disconnect();
      io.disconnect();
      window.removeEventListener("resize", resize);
      parent?.removeEventListener("pointermove", onMove);
      parent?.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{
        // Fade the grid out where the hero text sits (left side) so the
        // animation never competes with reading. GPU-composited, zero JS.
        maskImage:
          "linear-gradient(100deg, transparent 42%, black 78%)",
        WebkitMaskImage:
          "linear-gradient(100deg, transparent 42%, black 78%)",
      }}
    />
  );
}
