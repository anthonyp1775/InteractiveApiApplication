import { useEffect, useRef } from "react";

export default function Rain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    let drops = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const density = Math.floor((canvas.width * canvas.height) / 9000);
      drops = Array.from({ length: density }, createDrop);
    }

    function createDrop() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: 14 + Math.random() * 18,
        speed: 6 + Math.random() * 7,
        drift: 0.6 + Math.random() * 0.4,
        opacity: 0.18 + Math.random() * 0.32,
      };
    }

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(30, 58, 138, 1)";
      ctx.lineCap = "round";

      for (const drop of drops) {
        ctx.globalAlpha = drop.opacity;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - drop.drift * 6, drop.y + drop.length);
        ctx.stroke();

        drop.x -= drop.drift;
        drop.y += drop.speed;

        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
        if (drop.x < 0) {
          drop.x = canvas.width;
        }
      }

      animationId = requestAnimationFrame(tick);
    }

    resize();
    tick();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="rain-canvas" aria-hidden="true" />;
}
