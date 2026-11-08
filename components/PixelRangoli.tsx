"use client";

import React, { useState } from "react";
import { retroAudio } from "./RetroAudio";

interface PixelRangoliProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
}

export const PixelRangoli: React.FC<PixelRangoliProps> = ({
  size = "md",
  className = "",
  onClick,
}) => {
  const [isSparkling, setIsSparkling] = useState(false);

  const scale = size === "sm" ? 3 : size === "md" ? 5 : 7;
  const dimension = 32 * scale;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSparkling(true);
    retroAudio.playSparkle();
    if (onClick) onClick();
    setTimeout(() => setIsSparkling(false), 900);
  };

  return (
    <div
      onClick={handleClick}
      className={`relative inline-block cursor-pointer select-none transition-transform group ${
        isSparkling ? "scale-105" : "hover:scale-102"
      } ${className}`}
      title="Click the sacred Rangoli mandala for blessing!"
      style={{ imageRendering: "pixelated" }}
    >
      {/* Background Soft Glow */}
      <div
        className="absolute inset-0 rounded-full bg-retro-neonPink/20 blur-md pointer-events-none group-hover:bg-retro-gold/30 transition-all duration-300"
        style={{ transform: "scale(1.15)" }}
      />

      {/* Symmetrical 32x32 16-Bit Pixel Rangoli SVG */}
      <svg
        width={dimension}
        height={dimension}
        viewBox="0 0 32 32"
        className="relative z-10"
        style={{ shapeRendering: "crispEdges" }}
      >
        {/* Outer Ring - Festive Red border */}
        {/* Cardinal outer petals */}
        <rect x="14" y="0" width="4" height="2" fill="#E84A5F" />
        <rect x="13" y="2" width="6" height="2" fill="#FF8C32" />
        <rect x="14" y="30" width="4" height="2" fill="#E84A5F" />
        <rect x="13" y="28" width="6" height="2" fill="#FF8C32" />

        <rect x="0" y="14" width="2" height="4" fill="#E84A5F" />
        <rect x="2" y="13" width="2" height="6" fill="#FF8C32" />
        <rect x="30" y="14" width="2" height="4" fill="#E84A5F" />
        <rect x="28" y="13" width="2" height="6" fill="#FF8C32" />

        {/* Diagonal outer petals */}
        <rect x="4" y="4" width="3" height="3" fill="#FF70A6" />
        <rect x="5" y="5" width="2" height="2" fill="#FFD447" />
        <rect x="25" y="4" width="3" height="3" fill="#FF70A6" />
        <rect x="25" y="5" width="2" height="2" fill="#FFD447" />
        <rect x="4" y="25" width="3" height="3" fill="#FF70A6" />
        <rect x="5" y="25" width="2" height="2" fill="#FFD447" />
        <rect x="25" y="25" width="3" height="3" fill="#FF70A6" />
        <rect x="25" y="25" width="2" height="2" fill="#FFD447" />

        {/* Emerald Green Ring */}
        <rect x="10" y="6" width="12" height="2" fill="#64C77A" />
        <rect x="10" y="24" width="12" height="2" fill="#64C77A" />
        <rect x="6" y="10" width="2" height="12" fill="#64C77A" />
        <rect x="24" y="10" width="2" height="12" fill="#64C77A" />

        {/* Inner Octagon - Cyan & Magenta */}
        <rect x="9" y="9" width="14" height="14" fill="#24143D" />
        <rect x="8" y="12" width="16" height="8" fill="#38F8D4" />
        <rect x="12" y="8" width="8" height="16" fill="#38F8D4" />

        {/* Lotus Core - Neon Pink & Gold */}
        <rect x="11" y="11" width="10" height="10" fill="#FF70A6" />
        <rect x="12" y="12" width="8" height="8" fill="#E84A5F" />

        {/* Central Golden Sun Diya */}
        <rect x="13" y="13" width="6" height="6" fill="#FFD447" />
        <rect x="14" y="14" width="4" height="4" fill="#FFFFFF" />
        <rect x="15" y="15" width="2" height="2" fill="#FF8C32" />

        {/* Decorative corner dots */}
        <rect x="8" y="8" width="2" height="2" fill="#FFD447" />
        <rect x="22" y="8" width="2" height="2" fill="#FFD447" />
        <rect x="8" y="22" width="2" height="2" fill="#FFD447" />
        <rect x="22" y="22" width="2" height="2" fill="#FFD447" />
      </svg>

      {/* Floating Sparkles when clicked */}
      {isSparkling && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-full h-full relative">
            <span className="absolute top-2 left-4 w-2 h-2 bg-retro-gold animate-ping" />
            <span className="absolute top-4 right-2 w-2 h-2 bg-retro-neonPink animate-ping delay-75" />
            <span className="absolute bottom-2 left-6 w-2 h-2 bg-retro-pixelCyan animate-ping delay-150" />
            <span className="absolute bottom-6 right-6 w-2 h-2 bg-retro-diyaOrange animate-ping delay-200" />
            <span className="absolute top-1/2 left-2 w-2 h-2 bg-retro-leafGreen animate-ping delay-300" />
          </div>
        </div>
      )}
    </div>
  );
};

