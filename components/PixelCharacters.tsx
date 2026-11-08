"use client";

import React, { useState } from "react";
import { retroAudio } from "./RetroAudio";

interface CharacterProps {
  type: "sparkler" | "dancer" | "diyaLighter" | "greeter";
  scale?: number;
  className?: string;
  onClick?: () => void;
}

export const PixelCharacter: React.FC<CharacterProps> = ({
  type,
  scale = 3,
  className = "",
  onClick,
}) => {
  const [isBouncing, setIsBouncing] = useState(false);

  const handleClick = () => {
    setIsBouncing(true);
    retroAudio.playSparkle();
    setTimeout(() => setIsBouncing(false), 600);
    if (onClick) onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={`inline-block cursor-pointer select-none transition-transform ${
        isBouncing ? "-translate-y-3 scale-110" : "hover:-translate-y-1"
      } ${className}`}
      title="Click me!"
      style={{
        imageRendering: "pixelated",
      }}
    >
      {type === "sparkler" && <SparklerKid scale={scale} />}
      {type === "dancer" && <FestiveDancer scale={scale} />}
      {type === "diyaLighter" && <DiyaLighter scale={scale} />}
      {type === "greeter" && <NamasteGreeter scale={scale} />}
    </div>
  );
};

// 1. Child with crackling sparkler (Phuljhadi)
const SparklerKid: React.FC<{ scale: number }> = ({ scale }) => {
  return (
    <div className="relative group">
      <svg
        width={16 * scale}
        height={22 * scale}
        viewBox="0 0 16 22"
        className="overflow-visible"
        style={{ shapeRendering: "crispEdges" }}
      >
        {/* Hair - Dark indigo */}
        <rect x="5" y="1" width="6" height="3" fill="#1A1230" />
        <rect x="4" y="2" width="8" height="4" fill="#1A1230" />

        {/* Face / Skin tone */}
        <rect x="5" y="4" width="6" height="5" fill="#FAD089" />
        {/* Pixel Eyes */}
        <rect x="6" y="6" width="1" height="1" fill="#1A1230" />
        <rect x="9" y="6" width="1" height="1" fill="#1A1230" />
        {/* Bindi / Tilak */}
        <rect x="7" y="4" width="2" height="1" fill="#E84A5F" />
        {/* Smile */}
        <rect x="7" y="8" width="2" height="1" fill="#D35400" />

        {/* Festive Kurta - Bright Saffron / Diya Orange */}
        <rect x="4" y="9" width="8" height="7" fill="#FF8C32" />
        {/* Gold Kurta border */}
        <rect x="7" y="9" width="2" height="7" fill="#FFD447" />
        <rect x="4" y="15" width="8" height="1" fill="#FFD447" />

        {/* Arms */}
        {/* Left Arm raised holding sparkler stick */}
        <rect x="2" y="10" width="2" height="2" fill="#FF8C32" />
        <rect x="1" y="9" width="2" height="2" fill="#FAD089" />
        {/* Sparkler stick */}
        <rect x="1" y="5" width="1" height="5" fill="#A0A0A0" />

        {/* Right Arm */}
        <rect x="12" y="10" width="2" height="3" fill="#FF8C32" />
        <rect x="12" y="13" width="2" height="2" fill="#FAD089" />

        {/* Dhoti / Pants - Festive Red */}
        <rect x="5" y="16" width="3" height="4" fill="#E84A5F" />
        <rect x="8" y="16" width="3" height="4" fill="#E84A5F" />

        {/* Traditional Shoes / Mojaris - Pixel Gold */}
        <rect x="4" y="20" width="3" height="2" fill="#FFD447" />
        <rect x="9" y="20" width="3" height="2" fill="#FFD447" />
      </svg>

      {/* Animated Sparkler Sparks popping off the sparkler stick */}
      <div
        className="absolute animate-flame pointer-events-none"
        style={{
          top: -2 * scale,
          left: 0 * scale,
          width: 8 * scale,
          height: 8 * scale,
        }}
      >
        <svg
          width={8 * scale}
          height={8 * scale}
          viewBox="0 0 8 8"
          style={{ shapeRendering: "crispEdges" }}
        >
          <rect x="3" y="3" width="2" height="2" fill="#FFFFFF" />
          <rect x="3" y="1" width="2" height="1" fill="#FFD447" />
          <rect x="3" y="6" width="2" height="1" fill="#FFD447" />
          <rect x="1" y="3" width="1" height="2" fill="#FF8C32" />
          <rect x="6" y="3" width="1" height="2" fill="#FF8C32" />
          <rect x="1" y="1" width="1" height="1" fill="#FFFFFF" />
          <rect x="6" y="6" width="1" height="1" fill="#FFFFFF" />
          <rect x="6" y="1" width="1" height="1" fill="#FF70A6" />
        </svg>
      </div>
    </div>
  );
};

// 2. Festive Dancer (Garba / Celebration steps)
const FestiveDancer: React.FC<{ scale: number }> = ({ scale }) => {
  return (
    <div className="relative animate-pixel-bounce">
      <svg
        width={18 * scale}
        height={22 * scale}
        viewBox="0 0 18 22"
        style={{ shapeRendering: "crispEdges" }}
      >
        {/* Traditional Pagdi / Dupatta hair ornament */}
        <rect x="5" y="1" width="8" height="3" fill="#E84A5F" />
        <rect x="8" y="0" width="2" height="2" fill="#FFD447" />

        {/* Face */}
        <rect x="6" y="4" width="6" height="5" fill="#FAD089" />
        <rect x="7" y="6" width="1" height="1" fill="#1A1230" />
        <rect x="10" y="6" width="1" height="1" fill="#1A1230" />
        <rect x="8" y="8" width="2" height="1" fill="#E84A5F" />

        {/* Choli / Top - Emerald Green with Gold accents */}
        <rect x="5" y="9" width="8" height="4" fill="#64C77A" />
        <rect x="7" y="9" width="4" height="4" fill="#FFD447" />

        {/* Arms raised in dancing pose */}
        <rect x="2" y="7" width="3" height="2" fill="#FAD089" />
        <rect x="1" y="5" width="2" height="3" fill="#64C77A" />
        <rect x="13" y="7" width="3" height="2" fill="#FAD089" />
        <rect x="15" y="5" width="2" height="3" fill="#64C77A" />

        {/* Ghagra / Flared Skirt - Festive Magenta / Pink & Gold borders */}
        <rect x="4" y="13" width="10" height="2" fill="#FF70A6" />
        <rect x="3" y="15" width="12" height="3" fill="#FF70A6" />
        <rect x="2" y="18" width="14" height="2" fill="#FFD447" />
        <rect x="1" y="20" width="16" height="1" fill="#E84A5F" />

        {/* Feet / Ghunghroo */}
        <rect x="5" y="21" width="2" height="1" fill="#FAD089" />
        <rect x="11" y="21" width="2" height="1" fill="#FAD089" />
      </svg>
    </div>
  );
};

// 3. Person kneeling lighting a Diya
const DiyaLighter: React.FC<{ scale: number }> = ({ scale }) => {
  return (
    <div className="relative">
      <svg
        width={20 * scale}
        height={18 * scale}
        viewBox="0 0 20 18"
        style={{ shapeRendering: "crispEdges" }}
      >
        {/* Hair */}
        <rect x="9" y="1" width="5" height="3" fill="#1A1230" />
        {/* Face */}
        <rect x="10" y="4" width="4" height="4" fill="#FAD089" />
        <rect x="11" y="5" width="1" height="1" fill="#1A1230" />

        {/* Kurta - Royal Purple */}
        <rect x="8" y="8" width="7" height="6" fill="#7C4DFF" />
        <rect x="10" y="8" width="2" height="6" fill="#FFD447" />

        {/* Arm reaching forward towards diya */}
        <rect x="5" y="10" width="4" height="2" fill="#7C4DFF" />
        <rect x="4" y="11" width="2" height="2" fill="#FAD089" />

        {/* Match / incense stick tip */}
        <rect x="3" y="12" width="2" height="1" fill="#FFD447" />

        {/* Kneeling Legs / Pants */}
        <rect x="8" y="14" width="8" height="3" fill="#FFD447" />

        {/* Diya on ground right in front */}
        <rect x="1" y="14" width="4" height="2" fill="#C06C84" />
        <rect x="0" y="15" width="6" height="2" fill="#8B4513" />
        {/* Diya Flame */}
        <rect x="2" y="12" width="2" height="2" fill="#FF8C32" />
        <rect x="2" y="11" width="2" height="1" fill="#FFD447" />
      </svg>
    </div>
  );
};

// 4. Namaste Greeter (Welcoming with folded hands)
const NamasteGreeter: React.FC<{ scale: number }> = ({ scale }) => {
  return (
    <div className="relative">
      <svg
        width={16 * scale}
        height={22 * scale}
        viewBox="0 0 16 22"
        style={{ shapeRendering: "crispEdges" }}
      >
        {/* Festive Turban / Pagdi - Royal Gold & Red */}
        <rect x="4" y="0" width="8" height="4" fill="#FFD447" />
        <rect x="6" y="1" width="4" height="2" fill="#E84A5F" />
        <rect x="7" y="0" width="2" height="1" fill="#38F8D4" />

        {/* Face */}
        <rect x="5" y="4" width="6" height="5" fill="#FAD089" />
        <rect x="6" y="6" width="1" height="1" fill="#1A1230" />
        <rect x="9" y="6" width="1" height="1" fill="#1A1230" />
        <rect x="7" y="4" width="2" height="1" fill="#E84A5F" />
        <rect x="7" y="7" width="2" height="1" fill="#9E2335" />

        {/* Kurta - Royal Crimson */}
        <rect x="4" y="9" width="8" height="8" fill="#E84A5F" />
        <rect x="7" y="9" width="2" height="8" fill="#FFD447" />

        {/* Folded Hands in Namaste 🙏 */}
        <rect x="7" y="11" width="2" height="4" fill="#FAD089" />
        <rect x="6" y="11" width="1" height="3" fill="#E84A5F" />
        <rect x="9" y="11" width="1" height="3" fill="#E84A5F" />

        {/* Pajama / Pants - Off-white / Cream */}
        <rect x="5" y="17" width="3" height="4" fill="#FFF8DC" />
        <rect x="8" y="17" width="3" height="4" fill="#FFF8DC" />

        {/* Gold Juttis */}
        <rect x="4" y="21" width="3" height="1" fill="#FFD447" />
        <rect x="9" y="21" width="3" height="1" fill="#FFD447" />
      </svg>
    </div>
  );
};

