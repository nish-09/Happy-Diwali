"use client";

import React from "react";

interface GoldenRangoliProps {
  size?: number;
  className?: string;
}

export const GoldenRangoli: React.FC<GoldenRangoliProps> = ({
  size = 420,
  className = "",
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center pointer-events-none select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Background Radial Glow */}
      <div
        className="absolute inset-0 rounded-full bg-diwali-royalGold/10 blur-2xl animate-glow-pulse"
        style={{ transform: "scale(0.85)" }}
      />

      {/* Rotating Sacred Mandala SVG */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin-very-slow opacity-65"
      >
        <defs>
          <linearGradient id="rangoliGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="50%" stopColor="#FFB300" />
            <stop offset="100%" stopColor="#FF6F00" />
          </linearGradient>
        </defs>

        {/* Concentric Sacred Circles */}
        <circle cx="150" cy="150" r="142" stroke="url(#rangoliGold)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        <circle cx="150" cy="150" r="134" stroke="url(#rangoliGold)" strokeWidth="1.5" opacity="0.8" />
        <circle cx="150" cy="150" r="116" stroke="url(#rangoliGold)" strokeWidth="1" strokeDasharray="6 4" opacity="0.7" />
        <circle cx="150" cy="150" r="86" stroke="url(#rangoliGold)" strokeWidth="1.5" opacity="0.85" />
        <circle cx="150" cy="150" r="54" stroke="url(#rangoliGold)" strokeWidth="1.2" opacity="0.9" />
        <circle cx="150" cy="150" r="22" stroke="url(#rangoliGold)" strokeWidth="1.5" fill="rgba(255, 215, 0, 0.08)" />

        {/* 12-Fold Outer Lotus Petals */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 360) / 12;
          return (
            <g key={`petal-${i}`} transform={`rotate(${angle} 150 150)`}>
              {/* Pointed Lotus Petal */}
              <path
                d="M150 16 C140 50 132 86 150 116 C168 86 160 50 150 16 Z"
                stroke="url(#rangoliGold)"
                strokeWidth="1.2"
                fill="rgba(255, 179, 0, 0.06)"
              />
              <circle cx="150" cy="28" r="2" fill="#FFE082" />
              <path
                d="M150 38 Q150 70 150 96"
                stroke="url(#rangoliGold)"
                strokeWidth="0.8"
                strokeDasharray="2 2"
              />
            </g>
          );
        })}

        {/* 8-Fold Inner Geometric Star */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 360) / 8 + 22.5;
          return (
            <g key={`inner-${i}`} transform={`rotate(${angle} 150 150)`}>
              <path
                d="M150 64 L162 108 L150 120 L138 108 Z"
                stroke="url(#rangoliGold)"
                strokeWidth="1"
                fill="rgba(255, 215, 0, 0.12)"
              />
              <circle cx="150" cy="74" r="1.5" fill="#FFF8E1" />
            </g>
          );
        })}

        {/* Central Sunburst */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16;
          return (
            <line
              key={`ray-${i}`}
              x1="150"
              y1="134"
              x2="150"
              y2="126"
              stroke="#FFE082"
              strokeWidth="1.2"
              transform={`rotate(${angle} 150 150)`}
            />
          );
        })}
      </svg>
    </div>
  );
};

