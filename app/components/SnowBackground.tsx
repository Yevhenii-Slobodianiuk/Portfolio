"use client";
import { useEffect, useRef } from "react";

type Flake = {
  x: number;
  y: number;
  radius: number;
  speed: number;
  drift: number;
  opacity: number;
  targetOpacity: number;
  fadeInSpeed: number;
  life: number;
};

export default function SnowBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const layers = useRef<Flake[][]>([[], [], []]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const createFlake = (depth: number, anywhere = true): Flake => {
      const baseSpeed = [0.1, 0.2, 0.4][depth];
      const baseSize = [1, 2, 3][depth];
      const baseOpacity = [0.3, 0.6, 1][depth];

      const x = Math.random() * canvas.width;
      const y = anywhere ? Math.random() * canvas.height : Math.random() * -20;

      const radius = Math.random() * baseSize + 0.5;
      const speed = Math.random() * baseSpeed + 0.2;
      const drift = Math.random() * 0;
      const targetOpacity = Math.random() * baseOpacity + 0.2;
      const opacity = 0; // починає з нуля
      const fadeInSpeed = Math.random() * 0.01 + 0.005; // плавна поява
      const life = Math.random() * 400 + 200;

      return {
        x,
        y,
        radius,
        speed,
        drift,
        opacity,
        targetOpacity,
        fadeInSpeed,
        life,
      };
    };

    const drawFlake = (flake: Flake, blur: number) => {
      ctx.beginPath();
      ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
      ctx.shadowBlur = blur;
      ctx.shadowColor = "rgba(255,255,255,0.8)";
      ctx.fill();
    };

    for (let depth = 0; depth < 3; depth++) {
      for (let i = 0; i < 50; i++) {
        layers.current[depth].push(createFlake(depth, true));
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let depth = 0; depth < 3; depth++) {
        const blur = [3, 1.5, 0][depth];
        const flakeArray = layers.current[depth];

        if (Math.random() < 0.1 && flakeArray.length < 40) {
          flakeArray.push(createFlake(depth));
        }

        flakeArray.forEach((flake) => {
          if (flake.opacity < flake.targetOpacity) {
            flake.opacity += flake.fadeInSpeed;
          }

          flake.y += flake.speed;
          flake.x += flake.drift * (depth + 1) * 0.5;
          flake.life--;
          flake.opacity -= 0.001 * (depth + 1); // поступове зникання
          drawFlake(flake, blur);
        });

        layers.current[depth] = flakeArray.filter(
          (f) => f.y < canvas.height + 10 && f.opacity > 0 && f.life > 0
        );
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="z-0 fixed inset-0 pointer-events-none"
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}
