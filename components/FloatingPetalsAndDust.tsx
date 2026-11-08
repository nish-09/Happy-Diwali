"use client";

import React from "react";

export const FloatingPetalsAndDust: React.FC = () => {
  // Pre-calculated scattered positions for performance & consistency
  const petals = [
    { left: "6%", delay: "0s", dur: "9s", size: 14, rot: "25deg" },
    { left: "18%", delay: "3.2s", dur: "11s", size: 16, rot: "-35deg" },
    { left: "32%", delay: "1.4s", dur: "8.5s", size: 12, rot: "45deg" },
    { left: "48%", delay: "5s", dur: "10.5s", size: 15, rot: "15deg" },
    { left: "64%", delay: "2.1s", dur: "9.2s", size: 13, rot: "-20deg" },
    { left: "78%", delay: "4.3s", dur: "11.8s", size: 17, rot: "50deg" },
    { left: "91%", delay: "0.8s", dur: "8.8s", size: 14, rot: "-40deg" },
    { left: "24%", delay: "6.5s", dur: "12s", size: 15, rot: "30deg" },
    { left: "84%", delay: "7.2s", dur: "10s", size: 13, rot: "-15deg" },
  ];

  const goldenDust = [
    { top: "18%", left: "14%", size: 3, dur: "5s", delay: "0s" },
    { top: "28%", left: "82%", size: 4, dur: "6s", delay: "1.5s" },
    { top: "45%", left: "22%", size: 2.5, dur: "4.5s", delay: "0.8s" },
    { top: "62%", left: "75%", size: 3.5, dur: "5.5s", delay: "2.2s" },
    { top: "72%", left: "12%", size: 2, dur: "7s", delay: "3s" },
    { top: "38%", left: "88%", size: 3, dur: "4.8s", delay: "1.1s" },
    { top: "82%", left: "48%", size: 2.5, dur: "6.2s", delay: "2.8s" },
    { top: "12%", left: "55%", size: 4, dur: "5.2s", delay: "0.3s" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {/* 1. GENTLY FALLING MARIGOLD PETALS */}
      {petals.map((petal, idx) => (
        <div
          key={`petal-${idx}`}
          className="absolute -top-8 animate-petal opacity-85"
          style={{
            left: petal.left,
            animationDuration: petal.dur,
            animationDelay: petal.delay,
          }}
        >
          {/* Detailed Golden/Orange Marigold Petal SVG */}
          <svg
            width={petal.size}
            height={petal.size * 1.3}
            viewBox="0 0 20 26"
            fill="none"
            style={{ transform: `rotate(${petal.rot})` }}
          >
            <path
              d="M10 0 C16 4 20 12 18 19 C16 24 12 26 10 26 C8 26 4 24 2 19 C0 12 4 4 10 0 Z"
              fill="url(#marigoldGrad)"
              filter="drop-shadow(0 2px 4px rgba(255, 107, 0, 0.4))"
            />
            <path
              d="M10 4 Q11 14 10 24"
              stroke="#FFE082"
              strokeWidth="0.8"
              opacity="0.6"
            />
            <defs>
              <linearGradient id="marigoldGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFC107" />
                <stop offset="45%" stopColor="#FF9800" />
                <stop offset="100%" stopColor="#E65100" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}

      {/* 2. FLOATING GOLDEN AMBIENT DUST / FIREFLIES */}
      {goldenDust.map((dust, idx) => (
        <div
          key={`dust-${idx}`}
          className="absolute rounded-full animate-float-slow"
          style={{
            top: dust.top,
            left: dust.left,
            width: dust.size,
            height: dust.size,
            backgroundColor: "#FFD700",
            animationDuration: dust.dur,
            animationDelay: dust.delay,
            boxShadow: `0 0 ${dust.size * 3}px rgba(255, 215, 0, 0.95), 0 0 ${dust.size * 6}px rgba(255, 184, 77, 0.6)`,
          }}
        />
      ))}
    </div>
  );
};

