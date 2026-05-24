"use client";

import { useEffect, useRef } from "react";

/**
 * Ambient backdrop: subtle moving particle field rendered on canvas, layered with
 * aurora gradient blobs and a faint dot grid. Fixed to the viewport so it follows
 * the user as they scroll. Designed to feel premium and quiet, not loud.
 */
export default function AmbientBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = (canvas.width = window.innerWidth * window.devicePixelRatio);
    let h = (canvas.height = window.innerHeight * window.devicePixelRatio);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    const COUNT = Math.min(90, Math.floor((window.innerWidth * window.innerHeight) / 22000));
    const particles: P[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.15 * window.devicePixelRatio,
      vy: (Math.random() - 0.5) * 0.15 * window.devicePixelRatio,
      r: (Math.random() * 1.2 + 0.3) * window.devicePixelRatio,
      a: Math.random() * 0.45 + 0.15,
    }));

    let mx = w / 2;
    let my = h / 2;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX * window.devicePixelRatio;
      my = e.clientY * window.devicePixelRatio;
    };
    window.addEventListener("mousemove", onMove);

    const onResize = () => {
      w = canvas.width = window.innerWidth * window.devicePixelRatio;
      h = canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    window.addEventListener("resize", onResize);

    const linkDist = 140 * window.devicePixelRatio;

    const tick = () => {
      ctx.clearRect(0, 0, w, h);

      // Particles
      for (const p of particles) {
        // attract slightly toward cursor
        const dx = mx - p.x;
        const dy = my - p.y;
        const d2 = dx * dx + dy * dy;
        const r2 = 220 * 220 * window.devicePixelRatio * window.devicePixelRatio;
        if (d2 < r2) {
          const f = (1 - d2 / r2) * 0.0008;
          p.vx += dx * f;
          p.vy += dy * f;
        }
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.a})`;
        ctx.fill();
      }

      // Connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            const alpha = (1 - dist / linkDist) * 0.12;
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.lineWidth = 0.6 * window.devicePixelRatio;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Aurora blobs */}
      <div
        className="aurora-1 absolute -top-40 -left-40 h-[60vw] w-[60vw] rounded-full opacity-[0.35] blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(180,200,255,0.35), transparent 60%)",
        }}
      />
      <div
        className="aurora-2 absolute -bottom-40 -right-40 h-[55vw] w-[55vw] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 70% 70%, rgba(255,255,255,0.25), transparent 60%)",
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* Canvas particles */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.65) 100%)",
        }}
      />
    </div>
  );
}
