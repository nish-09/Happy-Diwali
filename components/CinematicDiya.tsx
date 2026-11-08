"use client";

import React, { useState } from "react";
import { realisticAudio } from "./RealisticAudio";

interface CinematicDiyaProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

export const CinematicDiya: React.FC<CinematicDiyaProps> = ({
  size = "md",
  className = "",
  onClick,
}) => {
  const [isSparking, setIsSparking] = useState(false);

  const scale = size === "sm" ? 0.75 : size === "md" ? 1 : 1.35;
  const width = 110 * scale;
  const height = 95 * scale;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSparking(true);
    realisticAudio.playClick();
    if (onClick) onClick();
    setTimeout(() => setIsSparking(false), 800);
  };

  return (
    <div
      onClick={handleClick}
      className={`relative inline-flex flex-col items-center justify-center cursor-pointer select-none group transition-transform duration-300 ${
        isSparking ? "scale-110" : "hover:scale-105"
      } ${className}`}
      title="Touch the Diya to ignite blessings"
    >
      {/* Radiant Golden Diya Halo / Ambient Light */}
      <div
        className="absolute -top-10 w-36 h-36 rounded-full diya-halo pointer-events-none group-hover:opacity-100 transition-opacity duration-500"
        style={{
          width: 140 * scale,
          height: 140 * scale,
        }}
      />

      <svg
        width={width}
        height={height}
        viewBox="0 0 110 95"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 overflow-visible drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]"
      >
        <defs>
          {/* Flame Gradient */}
          <radialGradient
            id={`flameCore-${size}`}
            cx="50%"
            cy="60%"
            r="50%"
            fx="50%"
            fy="60%"
          >
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#FFF2A1" />
            <stop offset="70%" stopColor="#FF9F1C" />
            <stop offset="100%" stopColor="#FF4000" stopOpacity="0.85" />
          </radialGradient>

          {/* Brass Diya Body Gradient */}
          <linearGradient
            id={`brassBody-${size}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="25%" stopColor="#FFB300" />
            <stop offset="50%" stopColor="#FF8F00" />
            <stop offset="75%" stopColor="#D46000" />
            <stop offset="100%" stopColor="#7E2D00" />
          </linearGradient>

          {/* Diya Rim Gold Highlight */}
          <linearGradient
            id={`goldRim-${size}`}
            x1="0%"
            y1="50%"
            x2="100%"
            y2="50%"
          >
            <stop offset="0%" stopColor="#8A4A00" />
            <stop offset="20%" stopColor="#FFD54F" />
            <stop offset="50%" stopColor="#FFF9C4" />
            <stop offset="80%" stopColor="#FFD54F" />
            <stop offset="100%" stopColor="#8A4A00" />
          </linearGradient>
        </defs>

        {/* 1. FLAME WITH SMOOTH FLICKERING DANCE */}
        <g className="animate-flame-flicker origin-bottom" style={{ transformOrigin: "55px 44px" }}>
          {/* Outer Heat Aura */}
          <ellipse cx="55" cy="30" rx="14" ry="24" fill="rgba(255, 107, 0, 0.28)" filter="blur(4px)" />

          {/* Teardrop Main Flame */}
          <path
            d="M55 8 C51 20 40 28 40 37 C40 45 46.7 49 55 49 C63.3 49 70 45 70 37 C70 28 59 20 55 8 Z"
            fill={`url(#flameCore-${size})`}
            filter="drop-shadow(0 0 10px rgba(255, 184, 77, 0.95))"
          />

          {/* White-Hot Luminous Inner Core */}
          <path
            d="M55 22 C53 28 47 34 47 39 C47 44 50.5 46 55 46 C59.5 46 63 44 63 39 C63 34 57 28 55 22 Z"
            fill="#FFFFFF"
            opacity="0.9"
            filter="drop-shadow(0 0 6px rgba(255, 255, 255, 0.9))"
          />
        </g>

        {/* 2. COTTON WICK (BATTI) */}
        <path
          d="M55 42 Q53 45 54 48"
          stroke="#261205"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* 3. LUXURY BRASS DIYA BOWL */}
        {/* Diya Base Shadow */}
        <ellipse cx="55" cy="85" rx="34" ry="7" fill="rgba(0, 0, 0, 0.65)" filter="blur(3px)" />

        {/* Diya Pedestal / Foot */}
        <path
          d="M44 76 Q55 79 66 76 L68 84 Q55 87 42 84 Z"
          fill="#8A4A00"
        />

        {/* Diya Body Curved Chalice */}
        <path
          d="M12 50 Q55 58 98 50 C96 68 80 80 55 80 C30 80 14 68 12 50 Z"
          fill={`url(#brassBody-${size})`}
        />

        {/* Diya Golden Polished Rim */}
        <ellipse
          cx="55"
          cy="50"
          rx="44"
          ry="8"
          fill={`url(#goldRim-${size})`}
        />

        {/* Inner Oil Basin with Golden Sheen */}
        <ellipse
          cx="55"
          cy="51"
          rx="38"
          ry="6"
          fill="#632B00"
        />
        <ellipse
          cx="55"
          cy="51"
          rx="34"
          ry="4.5"
          fill="rgba(255, 193, 7, 0.45)"
        />

        {/* Engraved Traditional Indian Floral Filigree on Diya Body */}
        <path
          d="M32 64 Q55 72 78 64"
          stroke="#FFE082"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.75"
        />
        <circle cx="55" cy="69" r="1.8" fill="#FFF9C4" />
        <circle cx="45" cy="67" r="1.4" fill="#FFD54F" />
        <circle cx="65" cy="67" r="1.4" fill="#FFD54F" />
      </svg>
    </div>
  );
};

