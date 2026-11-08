"use client";

import React, { useState } from "react";
import { retroAudio } from "./RetroAudio";

interface PixelDiyaProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  onDiyaClick?: () => void;
  withSmoke?: boolean;
}

export const PixelDiya: React.FC<PixelDiyaProps> = ({
  size = "md",
  className = "",
  onDiyaClick,
  withSmoke = true,
}) => {
  const [sparking, setSparking] = useState(false);

  const scale = size === "sm" ? 2 : size === "md" ? 3 : 4.5;
  const pixelWidth = 14 * scale;
  const pixelHeight = 12 * scale;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSparking(true);
    retroAudio.playSparkle();
    if (onDiyaClick) {
      onDiyaClick();
    }
    setTimeout(() => setSparking(false), 800);
  };

  return (
    <div
      onClick={handleClick}
      className={`relative inline-block cursor-pointer select-none group ${className}`}
      title="Touch the Diya for festive blessing!"
      style={{ imageRendering: "pixelated" }}
    >
      {/* Diya Glow Aura */}
      <div
        className="absolute -inset-2 rounded-full bg-retro-gold/25 blur-[6px] group-hover:bg-retro-gold/40 transition-colors animate-diya-pulse pointer-events-none"
        style={{
          width: pixelWidth * 1.3,
          height: pixelHeight * 1.2,
          left: -pixelWidth * 0.15,
          top: -pixelHeight * 0.1,
        }}
      />

      {/* Optional Pixel Smoke */}
      {withSmoke && (
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 pointer-events-none animate-pixel-float opacity-50"
          style={{ width: 4 * scale, height: 6 * scale }}
        >
          <svg
            width={4 * scale}
            height={6 * scale}
            viewBox="0 0 4 6"
            style={{ shapeRendering: "crispEdges" }}
          >
            <rect x="1" y="4" width="2" height="1" fill="#FFFFFF" opacity="0.4" />
            <rect x="2" y="2" width="1" height="1" fill="#FFFFFF" opacity="0.3" />
            <rect x="1" y="0" width="1" height="1" fill="#FFFFFF" opacity="0.2" />
          </svg>
        </div>
      )}

      {/* SVG Pixel Diya */}
      <svg
        width={pixelWidth}
        height={pixelHeight}
        viewBox="0 0 14 12"
        className={`transition-transform ${sparking ? "scale-125" : "group-hover:scale-110"}`}
        style={{ shapeRendering: "crispEdges" }}
      >
        {/* Animated Flame */}
        <g className="animate-flame origin-bottom">
          {/* Flame Outer: Deep Orange */}
          <rect x="6" y="1" width="2" height="1" fill="#FF8C32" />
          <rect x="5" y="2" width="4" height="2" fill="#FF8C32" />
          <rect x="4" y="3" width="6" height="2" fill="#FF8C32" />

          {/* Flame Middle: Bright Pixel Gold */}
          <rect x="6" y="2" width="2" height="2" fill="#FFD447" />
          <rect x="5" y="4" width="4" height="1" fill="#FFD447" />

          {/* Flame Core: White-Hot Center */}
          <rect x="6" y="3" width="2" height="1" fill="#FFFFFF" />
        </g>

        {/* Cotton Wick (Batti) */}
        <rect x="6" y="5" width="2" height="1" fill="#2E1C0C" />

        {/* Diya Clay Bowl Lip (Golden / Terracotta) */}
        <rect x="2" y="6" width="10" height="1" fill="#FFD447" />
        <rect x="1" y="7" width="12" height="1" fill="#FF8C32" />

        {/* Diya Clay Base */}
        <rect x="2" y="8" width="10" height="2" fill="#C05C1D" />
        <rect x="4" y="10" width="6" height="1" fill="#8B3A0F" />
        <rect x="5" y="11" width="4" height="1" fill="#5A2207" />

        {/* Decorative Golden Highlights */}
        <rect x="3" y="8" width="1" height="1" fill="#FFD447" />
        <rect x="6" y="8" width="2" height="1" fill="#FFD447" />
        <rect x="10" y="8" width="1" height="1" fill="#FFD447" />
      </svg>

      {/* Spark Burst on Click */}
      {sparking && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-8 h-8 relative animate-ping">
            <span className="absolute top-0 left-0 w-1.5 h-1.5 bg-retro-gold" />
            <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-retro-diyaOrange" />
            <span className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-retro-neonPink" />
            <span className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-white" />
          </div>
        </div>
      )}
    </div>
  );
};

