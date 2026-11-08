"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { retroAudio } from "./RetroAudio";

interface PixelParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  flickerRate: number;
  life: number;
  maxLife: number;
  gravity: number;
}

interface PixelRocket {
  x: number;
  y: number;
  targetY: number;
  vy: number;
  color: string;
  burstType: "circle" | "star" | "ring" | "sparkler" | "grand";
}

interface PixelCanvasFireworksProps {
  interactive?: boolean;
  intensity?: "low" | "medium" | "high";
  sparklerTrail?: boolean;
}

export interface FireworksHandle {
  launchBarrage: (count?: number) => void;
  triggerAt: (
    x: number,
    y: number,
    style?: "circle" | "star" | "ring" | "grand" | "sparkler"
  ) => void;
  triggerAnaar: (x: number, y: number) => void;
  triggerChakri: (x: number, y: number) => void;
}

export const PixelCanvasFireworks = React.forwardRef<FireworksHandle, PixelCanvasFireworksProps>(
  ({ interactive = true, intensity = "medium", sparklerTrail = true }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rocketsRef = useRef<PixelRocket[]>([]);
    const particlesRef = useRef<PixelParticle[]>([]);
    const animationFrameRef = useRef<number | null>(null);
    const autoLaunchTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Color palettes matching creative direction
    const colorThemes = [
      ["#FFD447", "#FFE685", "#FFAA40", "#FFFFFF"], // Pixel Gold
      ["#E84A5F", "#FF8C32", "#FF5252", "#FFE082"], // Festive Red & Diya Orange
      ["#FF70A6", "#E040FB", "#7C4DFF", "#FFFFFF"], // Neon Pink & Deep Purple
      ["#38F8D4", "#64C77A", "#00E676", "#E0F7FA"], // Emerald & Pixel Cyan
      ["#FFD447", "#E84A5F", "#FF70A6", "#38F8D4"], // Multi-color Festival
    ];

    // Helper: vibrate device if supported
    const triggerHaptic = (ms: number = 25) => {
      try {
        if (typeof window !== "undefined" && "navigator" in window && navigator.vibrate) {
          navigator.vibrate(ms);
        }
      } catch {
        // Safe catch
      }
    };

    // Helper: create pixel burst particles
    const createExplosion = useCallback(
      (
        x: number,
        y: number,
        burstType: "circle" | "star" | "ring" | "sparkler" | "grand" = "circle",
        themeColors?: string[]
      ) => {
        const colors = themeColors || colorThemes[Math.floor(Math.random() * colorThemes.length)];
        const particles: PixelParticle[] = [];
        const isGrand = burstType === "grand";
        const count = isGrand ? 95 : burstType === "star" ? 65 : 45;

        // Play synthetic explosion sound
        retroAudio.playFireworkExplode();
        triggerHaptic(isGrand ? 40 : 25);

        if (burstType === "star") {
          // 5-pointed star pattern
          const points = 5;
          for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const starMod = 0.5 + 0.5 * Math.cos(points * angle);
            const speed = (2.2 + Math.random() * 2.8) * (0.6 + starMod * 0.8);
            const color = colors[Math.floor(Math.random() * colors.length)];
            const maxLife = 50 + Math.random() * 25;

            particles.push({
              x,
              y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              size: Math.random() > 0.4 ? 4 : 3,
              color,
              alpha: 1,
              decay: 1 / maxLife,
              flickerRate: 0.15 + Math.random() * 0.3,
              life: maxLife,
              maxLife,
              gravity: 0.045,
            });
          }
        } else if (burstType === "ring") {
          // Circular ring with uniform perimeter
          for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const speed = 3.2 + (Math.random() - 0.5) * 0.4;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const maxLife = 45 + Math.random() * 20;

            particles.push({
              x,
              y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              size: 4,
              color,
              alpha: 1,
              decay: 1 / maxLife,
              flickerRate: 0.2,
              life: maxLife,
              maxLife,
              gravity: 0.04,
            });
          }
        } else if (burstType === "sparkler") {
          // Small twinkling sparkling burst
          for (let i = 0; i < 28; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 2.4 + 0.4;
            const color = ["#FFD447", "#FFE685", "#FFAA40", "#FFFFFF"][i % 4];
            const maxLife = 30 + Math.random() * 20;

            particles.push({
              x,
              y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              size: 3,
              color,
              alpha: 1,
              decay: 1 / maxLife,
              flickerRate: 0.4,
              life: maxLife,
              maxLife,
              gravity: 0.03,
            });
          }
        } else {
          // Regular or Grand circular blast
          for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const maxSpeed = isGrand ? 5.5 : 3.8;
            const speed = Math.random() * maxSpeed + 0.5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const maxLife = 40 + Math.random() * 30;

            particles.push({
              x,
              y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              size: isGrand ? (Math.random() > 0.5 ? 5 : 4) : Math.random() > 0.6 ? 4 : 3,
              color,
              alpha: 1,
              decay: 1 / maxLife,
              flickerRate: 0.1 + Math.random() * 0.25,
              life: maxLife,
              maxLife,
              gravity: 0.05,
            });
          }
        }

        particlesRef.current.push(...particles);
      },
      [colorThemes]
    );

    // Anaar (Flowerpot Spark Fountain)
    const triggerAnaar = useCallback((x: number, y: number) => {
      retroAudio.playSparkle();
      triggerHaptic(50);
      const particles: PixelParticle[] = [];
      const count = 75;

      for (let i = 0; i < count; i++) {
        const spread = (Math.random() - 0.5) * 1.8;
        const speedY = -(Math.random() * 5.5 + 3.5);
        const colors = ["#FFD447", "#FFE685", "#FFAA40", "#FFFFFF", "#FF70A6"];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const maxLife = 45 + Math.random() * 25;

        particles.push({
          x: x + (Math.random() - 0.5) * 8,
          y,
          vx: spread,
          vy: speedY,
          size: Math.random() > 0.5 ? 4 : 3,
          color,
          alpha: 1,
          decay: 1 / maxLife,
          flickerRate: 0.35,
          life: maxLife,
          maxLife,
          gravity: 0.12,
        });
      }
      particlesRef.current.push(...particles);
    }, []);

    // Chakri (Spinning Ground Wheel)
    const triggerChakri = useCallback((x: number, y: number) => {
      retroAudio.playSparkle();
      triggerHaptic(60);
      const particles: PixelParticle[] = [];
      const count = 65;

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 4;
        const speed = Math.random() * 3.8 + 1.2;
        const colors = ["#38F8D4", "#FFD447", "#FF70A6", "#E84A5F"];
        const color = colors[i % colors.length];
        const maxLife = 35 + Math.random() * 20;

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed * 0.5,
          size: 3,
          color,
          alpha: 1,
          decay: 1 / maxLife,
          flickerRate: 0.4,
          life: maxLife,
          maxLife,
          gravity: 0.02,
        });
      }
      particlesRef.current.push(...particles);
    }, []);

    // Launch a rocket that rises then explodes
    const launchRocket = useCallback(
      (
        startX?: number,
        targetY?: number,
        forcedType?: "circle" | "star" | "ring" | "sparkler" | "grand"
      ) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const x = startX !== undefined ? startX : Math.random() * (canvas.width - 120) + 60;
        const target = targetY !== undefined ? targetY : Math.random() * (canvas.height * 0.45) + 60;
        const types: ("circle" | "star" | "ring" | "sparkler" | "grand")[] = [
          "circle",
          "star",
          "ring",
          "grand",
        ];
        const burstType = forcedType || types[Math.floor(Math.random() * types.length)];
        const colors = ["#FFD447", "#FF8C32", "#FF70A6", "#38F8D4"];
        const color = colors[Math.floor(Math.random() * colors.length)];

        rocketsRef.current.push({
          x,
          y: canvas.height,
          targetY: target,
          vy: -(6 + Math.random() * 3),
          color,
          burstType,
        });

        // Launch sound
        retroAudio.playFireworkLaunch();
      },
      []
    );

    // Imperative handle for parent components
    React.useImperativeHandle(ref, () => ({
      launchBarrage: (count = 6) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        for (let i = 0; i < count; i++) {
          setTimeout(() => {
            const randX = Math.random() * (canvas.width * 0.8) + canvas.width * 0.1;
            const randY = Math.random() * (canvas.height * 0.4) + 60;
            launchRocket(randX, randY, i % 2 === 0 ? "grand" : "star");
          }, i * 220);
        }
      },
      triggerAt: (x: number, y: number, style = "star") => {
        createExplosion(x, y, style);
      },
      triggerAnaar,
      triggerChakri,
    }));

    // Auto-launch fireworks periodically
    useEffect(() => {
      const intervalDelay = intensity === "high" ? 1400 : intensity === "medium" ? 2200 : 3500;

      const scheduleLaunch = () => {
        launchRocket();
        autoLaunchTimerRef.current = setTimeout(
          scheduleLaunch,
          intervalDelay + (Math.random() * 800 - 400)
        );
      };

      autoLaunchTimerRef.current = setTimeout(scheduleLaunch, 600);

      return () => {
        if (autoLaunchTimerRef.current) {
          clearTimeout(autoLaunchTimerRef.current);
        }
      };
    }, [intensity, launchRocket]);

    // Canvas render loop
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

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = false;

        // Update & Render Rockets
        const remainingRockets: PixelRocket[] = [];
        for (let i = 0; i < rocketsRef.current.length; i++) {
          const r = rocketsRef.current[i];
          r.y += r.vy;

          ctx.fillStyle = r.color;
          ctx.fillRect(Math.floor(r.x / 2) * 2, Math.floor(r.y / 2) * 2, 4, 6);

          // Rocket spark trail
          if (Math.random() > 0.3) {
            particlesRef.current.push({
              x: r.x + (Math.random() - 0.5) * 4,
              y: r.y + 4,
              vx: (Math.random() - 0.5) * 0.8,
              vy: Math.random() * 1.5 + 1,
              size: 2,
              color: "#FFAA40",
              alpha: 0.8,
              decay: 0.08,
              flickerRate: 0.4,
              life: 14,
              maxLife: 14,
              gravity: 0.05,
            });
          }

          if (r.y <= r.targetY) {
            createExplosion(r.x, r.y, r.burstType);
          } else {
            remainingRockets.push(r);
          }
        }
        rocketsRef.current = remainingRockets;

        // Update & Render Particles
        const remainingParticles: PixelParticle[] = [];
        for (let i = 0; i < particlesRef.current.length; i++) {
          const p = particlesRef.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += p.gravity;
          p.vx *= 0.98;
          p.vy *= 0.98;
          p.life -= 1;
          p.alpha = Math.max(0, p.life / p.maxLife);

          const isFlickering = Math.random() < p.flickerRate;
          const displayAlpha = isFlickering ? p.alpha * 0.5 : p.alpha;

          if (p.life > 0 && displayAlpha > 0.05) {
            ctx.save();
            ctx.globalAlpha = displayAlpha;
            ctx.fillStyle = p.color;

            const px = Math.floor(p.x);
            const py = Math.floor(p.y);
            const s = p.size;

            ctx.fillRect(px, py, s, s);

            if (s >= 4 && p.alpha > 0.6) {
              ctx.fillStyle = "#FFFFFF";
              ctx.fillRect(px + 1, py + 1, 1, 1);
            }

            ctx.restore();
            remainingParticles.push(p);
          }
        }
        particlesRef.current = remainingParticles;

        animationFrameRef.current = requestAnimationFrame(render);
      };

      animationFrameRef.current = requestAnimationFrame(render);

      return () => {
        isRunning = false;
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        window.removeEventListener("resize", handleResize);
      };
    }, [createExplosion]);

    // Sparkler cursor trail: emit tiny sparkles on pointer move
    const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (!sparklerTrail) return;
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Small chance to emit a delicate sparkler particle
      if (Math.random() > 0.45) {
        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * 1.2,
          vy: Math.random() * 1.5 + 0.3,
          size: Math.random() > 0.6 ? 3 : 2,
          color: Math.random() > 0.5 ? "#FFD447" : "#FF8C32",
          alpha: 0.9,
          decay: 0.06,
          flickerRate: 0.5,
          life: 18,
          maxLife: 18,
          gravity: 0.04,
        });
      }
    };

    // Handle clicks to generate fireworks
    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!interactive) return;
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const burstTypes: ("circle" | "star" | "ring" | "grand")[] = [
        "star",
        "grand",
        "ring",
        "circle",
      ];
      const selected = burstTypes[Math.floor(Math.random() * burstTypes.length)];
      createExplosion(x, y, selected);
    };

    const handleCanvasTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
      if (!interactive || e.touches.length === 0) return;
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;

      // Multi-touch support: burst at each touch location!
      for (let i = 0; i < e.touches.length; i++) {
        const touch = e.touches[i];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        createExplosion(x, y, i === 0 ? "star" : "grand");
      }
    };

    return (
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        onTouchStart={handleCanvasTouch}
        onPointerMove={handlePointerMove}
        className="fixed inset-0 w-full h-full pointer-events-auto z-10 cursor-crosshair"
        style={{
          imageRendering: "pixelated",
        }}
      />
    );
  }
);

PixelCanvasFireworks.displayName = "PixelCanvasFireworks";
