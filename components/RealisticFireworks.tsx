"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { realisticAudio } from "./RealisticAudio";

interface RealisticParticle {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  gravity: number;
  drag: number;
  twinkle: boolean;
  isWillow?: boolean;
}

interface RealisticRocket {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
  burstType: "peony" | "willow" | "ring" | "brocade" | "grand";
}

interface SkyFlash {
  x: number;
  y: number;
  radius: number;
  color: string;
  alpha: number;
}

export interface FireworksHandle {
  launchFinale: (count?: number) => void;
  triggerAt: (x: number, y: number, style?: "peony" | "willow" | "ring" | "grand" | "brocade") => void;
}

interface RealisticFireworksProps {
  intensity?: "low" | "medium" | "high";
  interactive?: boolean;
}

export const RealisticFireworks = React.forwardRef<FireworksHandle, RealisticFireworksProps>(
  ({ intensity = "medium", interactive = true }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rocketsRef = useRef<RealisticRocket[]>([]);
    const particlesRef = useRef<RealisticParticle[]>([]);
    const flashesRef = useRef<SkyFlash[]>([]);
    const animationFrameRef = useRef<number | null>(null);
    const autoTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Luxury Royal Color Palettes - Highly saturated luminous pyrotechnic pigments
    const palettes = [
      ["#FFD700", "#FFE685", "#FFAA00", "#FFF4B8"], // Royal Golden Willow / Kamuro
      ["#FF3366", "#FF6B00", "#FFD700", "#FF99B8"], // Vibrant Festive Ruby & Saffron
      ["#C77DFF", "#9D4EDD", "#E0AAFF", "#FFD700"], // Royal Imperial Amethyst & Violet
      ["#00F2FE", "#4FACFE", "#FFD700", "#FFFFFF"], // Celestial Cyan & Shimmering Gold
      ["#FFD700", "#FF5252", "#FF70A6", "#38F8D4"], // Grand Multi-color Festive Kaleidoscope
    ];

    const createExplosion = useCallback(
      (
        x: number,
        y: number,
        burstType: "peony" | "willow" | "ring" | "brocade" | "grand" = "peony"
      ) => {
        const palette = palettes[Math.floor(Math.random() * palettes.length)];
        const particles: RealisticParticle[] = [];
        const isGrand = burstType === "grand";
        const isWillow = burstType === "willow";
        const isBrocade = burstType === "brocade";

        // Rich, lavish particle counts that look dense and full
        const count = isGrand ? 110 : isWillow ? 95 : isBrocade ? 85 : burstType === "ring" ? 70 : 80;

        // Sound effect
        realisticAudio.playFireworkExplode();

        // Subtle Sky Light Flash
        flashesRef.current.push({
          x,
          y,
          radius: isGrand ? 240 : 180,
          color: palette[0],
          alpha: 0.18,
        });

        // Mobile vibration
        if (typeof window !== "undefined" && "navigator" in window && navigator.vibrate) {
          navigator.vibrate(isGrand ? 35 : 18);
        }

        if (burstType === "ring") {
          // Double Ring: Outer perimeter + Inner concentric ring
          for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const isInner = i % 3 === 0;
            const speed = isInner ? 2.5 : 4.4 + (Math.random() - 0.5) * 0.3;
            const color = isInner ? "#FFFFFF" : palette[i % palette.length];
            particles.push({
              x,
              y,
              prevX: x,
              prevY: y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              size: isInner ? 2.0 : 2.6,
              color,
              alpha: 1,
              decay: 0.014,
              gravity: 0.038,
              drag: 0.985,
              twinkle: Math.random() > 0.5,
            });
          }
        } else if (isWillow) {
          // Kamuro Golden Weeping Willow: Cascades down like golden rain
          for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 4.6 + 0.8;
            const color = Math.random() > 0.25 ? "#FFD700" : "#FFF4B8";
            particles.push({
              x,
              y,
              prevX: x,
              prevY: y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              size: Math.random() > 0.4 ? 2.4 : 1.8,
              color,
              alpha: 1,
              decay: 0.009, // Lingers long and trails gorgeously
              gravity: 0.055, // Weeping downward arc
              drag: 0.975,
              twinkle: Math.random() > 0.4,
              isWillow: true,
            });
          }
        } else if (isBrocade) {
          // Brocade: Fast inner flower burst surrounded by glittering palm arms
          for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const isPalmArm = i % 4 === 0;
            const speed = isPalmArm ? Math.random() * 2 + 4.5 : Math.random() * 3 + 1.2;
            const color = isPalmArm ? "#FFD700" : palette[i % palette.length];
            particles.push({
              x,
              y,
              prevX: x,
              prevY: y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              size: isPalmArm ? 2.8 : 2.0,
              color,
              alpha: 1,
              decay: isPalmArm ? 0.011 : 0.018,
              gravity: 0.042,
              drag: 0.98,
              twinkle: true,
            });
          }
        } else {
          // Peony / Grand Spherical Blast
          for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * (isGrand ? 5.8 : 4.4) + 0.5;
            const color = palette[Math.floor(Math.random() * palette.length)];
            particles.push({
              x,
              y,
              prevX: x,
              prevY: y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              size: Math.random() > 0.3 ? 2.6 : 1.8,
              color,
              alpha: 1,
              decay: 0.013 + Math.random() * 0.006,
              gravity: 0.042,
              drag: 0.982,
              twinkle: Math.random() > 0.4,
            });
          }
        }

        // Keep active particles comfortably capped around ~350 max for silky performance
        if (particlesRef.current.length > 350) {
          particlesRef.current = particlesRef.current.slice(-200);
        }
        particlesRef.current.push(...particles);
      },
      [palettes]
    );

    const launchRocket = useCallback(
      (
        startX?: number,
        targetY?: number,
        forcedType?: "peony" | "willow" | "ring" | "brocade" | "grand"
      ) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const x = startX !== undefined ? startX : Math.random() * (canvas.width * 0.78) + canvas.width * 0.11;
        const target = targetY !== undefined ? targetY : Math.random() * (canvas.height * 0.38) + 60;
        const types: ("peony" | "willow" | "ring" | "brocade" | "grand")[] = [
          "willow",
          "peony",
          "grand",
          "brocade",
          "ring",
        ];
        const burstType = forcedType || types[Math.floor(Math.random() * types.length)];
        const colors = ["#FFD700", "#FF6B00", "#FF4D4D", "#E056FD", "#38F8D4"];
        const color = colors[Math.floor(Math.random() * colors.length)];

        rocketsRef.current.push({
          x,
          y: canvas.height,
          prevX: x,
          prevY: canvas.height,
          targetY: target,
          vx: (Math.random() - 0.5) * 1.4,
          vy: -(8.5 + Math.random() * 3.2),
          color,
          burstType,
        });

        realisticAudio.playRocketLaunch();
      },
      []
    );

    // Imperative handle for parent
    React.useImperativeHandle(ref, () => ({
      launchFinale: (count = 6) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        for (let i = 0; i < count; i++) {
          setTimeout(() => {
            const rx = Math.random() * (canvas.width * 0.76) + canvas.width * 0.12;
            const ry = Math.random() * (canvas.height * 0.35) + 60;
            launchRocket(rx, ry, i % 2 === 0 ? "grand" : "willow");
          }, i * 260);
        }
      },
      triggerAt: (x: number, y: number, style = "grand") => {
        createExplosion(x, y, style);
      },
    }));

    // Auto-launch schedule: keeps the sky active and celebration alive!
    useEffect(() => {
      const delay = intensity === "high" ? 2200 : intensity === "medium" ? 3000 : 4200;

      const schedule = () => {
        launchRocket();
        autoTimerRef.current = setTimeout(schedule, delay + (Math.random() * 1000 - 500));
      };

      autoTimerRef.current = setTimeout(schedule, 600);

      return () => {
        if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
      };
    }, [intensity, launchRocket]);

    // Canvas render loop with Realistic Bloom & Long Glowing Trails (60 FPS)
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      let isRunning = true;

      const render = () => {
        if (!isRunning) return;

        // Silky trail persistence: clears with low opacity (0.12) to leave rich, lingering glowing trails!
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = "rgba(0, 0, 0, 0.13)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Additive blending for brilliant luminous pyrotechnic bloom!
        ctx.globalCompositeOperation = "lighter";

        // 1. Render Sky Detonation Flashes
        const remainingFlashes: SkyFlash[] = [];
        for (let f = 0; f < flashesRef.current.length; f++) {
          const fl = flashesRef.current[f];
          fl.alpha -= 0.025;
          if (fl.alpha > 0.01) {
            const grad = ctx.createRadialGradient(fl.x, fl.y, 0, fl.x, fl.y, fl.radius);
            grad.addColorStop(0, fl.color);
            grad.addColorStop(1, "rgba(0, 0, 0, 0)");
            ctx.globalAlpha = fl.alpha;
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(fl.x, fl.y, fl.radius, 0, Math.PI * 2);
            ctx.fill();
            remainingFlashes.push(fl);
          }
        }
        flashesRef.current = remainingFlashes;

        // 2. Render Rockets (with fiery spark exhaust)
        const remainingRockets: RealisticRocket[] = [];
        for (let i = 0; i < rocketsRef.current.length; i++) {
          const r = rocketsRef.current[i];
          r.prevX = r.x;
          r.prevY = r.y;
          r.x += r.vx;
          r.y += r.vy;

          // Rocket ascending fiery streak
          ctx.beginPath();
          ctx.strokeStyle = "#FFD700";
          ctx.lineWidth = 2.4;
          ctx.globalAlpha = 0.85;
          ctx.moveTo(r.prevX, r.prevY);
          ctx.lineTo(r.x, r.y);
          ctx.stroke();

          // Rocket core head
          ctx.beginPath();
          ctx.fillStyle = "#FFFFFF";
          ctx.globalAlpha = 1;
          ctx.arc(r.x, r.y, 2.5, 0, Math.PI * 2);
          ctx.fill();

          // Emit small exhaust sparkler sparks behind rocket
          if (Math.random() > 0.3) {
            particlesRef.current.push({
              x: r.x + (Math.random() - 0.5) * 4,
              y: r.y + 4,
              prevX: r.x,
              prevY: r.y,
              vx: (Math.random() - 0.5) * 0.8,
              vy: Math.random() * 2 + 1,
              size: 1.5,
              color: "#FFAA00",
              alpha: 0.85,
              decay: 0.08,
              gravity: 0.04,
              drag: 0.96,
              twinkle: true,
            });
          }

          if (r.y <= r.targetY) {
            createExplosion(r.x, r.y, r.burstType);
          } else {
            remainingRockets.push(r);
          }
        }
        rocketsRef.current = remainingRockets;

        // 3. Render Particles (Bloom Core + Colored Glowing Body)
        const remainingParticles: RealisticParticle[] = [];
        for (let i = 0; i < particlesRef.current.length; i++) {
          const p = particlesRef.current[i];
          p.prevX = p.x;
          p.prevY = p.y;
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= p.drag;
          p.vy *= p.drag;
          p.vy += p.gravity;
          p.alpha -= p.decay;

          if (p.alpha > 0.02) {
            // Natural twinkle flicker
            const displayAlpha = p.twinkle && Math.random() > 0.3 ? p.alpha * 0.75 : p.alpha;
            ctx.globalAlpha = displayAlpha;

            // Colored Glowing Streak
            ctx.beginPath();
            ctx.strokeStyle = p.color;
            ctx.lineWidth = p.size;
            ctx.moveTo(p.prevX, p.prevY);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();

            // Intense Luminous White Head Spark (Optical Bloom)
            ctx.beginPath();
            ctx.fillStyle = "#FFFFFF";
            ctx.arc(p.x, p.y, p.size * 0.65, 0, Math.PI * 2);
            ctx.fill();

            remainingParticles.push(p);
          }
        }
        particlesRef.current = remainingParticles;

        ctx.globalAlpha = 1;

        animationFrameRef.current = requestAnimationFrame(render);
      };

      animationFrameRef.current = requestAnimationFrame(render);

      return () => {
        isRunning = false;
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        window.removeEventListener("resize", handleResize);
      };
    }, [createExplosion]);

    // Click / touch to create firework
    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
      realisticAudio.initOnUserGesture();
      if (!interactive) return;
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const types: ("peony" | "willow" | "ring" | "brocade" | "grand")[] = [
        "grand",
        "willow",
        "brocade",
        "peony",
        "ring",
      ];
      createExplosion(x, y, types[Math.floor(Math.random() * types.length)]);
    };

    const handleCanvasTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
      realisticAudio.initOnUserGesture();
      if (!interactive || e.touches.length === 0) return;
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      for (let i = 0; i < Math.min(e.touches.length, 2); i++) {
        const touch = e.touches[i];
        createExplosion(touch.clientX - rect.left, touch.clientY - rect.top, i === 0 ? "grand" : "willow");
      }
    };

    return (
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        onTouchStart={handleCanvasTouch}
        className="fixed inset-0 w-full h-full pointer-events-auto z-10 cursor-crosshair"
      />
    );
  }
);

RealisticFireworks.displayName = "RealisticFireworks";
