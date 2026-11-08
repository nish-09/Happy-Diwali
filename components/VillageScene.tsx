"use client";

import React, { useState } from "react";
import { retroAudio } from "./RetroAudio";
import { PixelCharacter } from "./PixelCharacters";
import { PixelDiya } from "./PixelDiyas";

interface VillageSceneProps {
  onStartCelebration: (name: string) => void;
  onMoonEasterEgg: () => void;
  onDiyaEasterEgg: () => void;
}

export const VillageScene: React.FC<VillageSceneProps> = ({
  onStartCelebration,
  onMoonEasterEgg,
  onDiyaEasterEgg,
}) => {
  const [inputName, setInputName] = useState("");
  const [moonClicked, setMoonClicked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    retroAudio.playStartCelebration();
    onStartCelebration(inputName.trim() || "DEAR FRIEND");
  };

  const handleMoonClick = () => {
    setMoonClicked(true);
    retroAudio.playMoonChime();
    onMoonEasterEgg();
    setTimeout(() => setMoonClicked(false), 1200);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between select-none">
      {/* 1. SKY & CELESTIAL BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#090b17] via-[#10152B] to-[#24143D] -z-20" />

      {/* Twinkling Pixel Stars */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {[
          { top: "8%", left: "12%", size: 4, delay: "0s" },
          { top: "14%", left: "28%", size: 3, delay: "0.5s" },
          { top: "6%", left: "45%", size: 5, delay: "1.2s" },
          { top: "18%", left: "62%", size: 4, delay: "0.8s" },
          { top: "10%", left: "82%", size: 6, delay: "0.3s" },
          { top: "22%", left: "91%", size: 3, delay: "1.5s" },
          { top: "28%", left: "8%", size: 4, delay: "1.0s" },
          { top: "32%", left: "35%", size: 5, delay: "0.4s" },
          { top: "26%", left: "76%", size: 4, delay: "1.3s" },
        ].map((star, idx) => (
          <div
            key={idx}
            className="absolute bg-white animate-twinkle"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
              boxShadow: "0 0 6px rgba(255, 255, 255, 0.8)",
            }}
          />
        ))}

        {/* Floating Marigold Petals */}
        {[
          { left: "10%", delay: "0s", dur: "6s" },
          { left: "25%", delay: "2s", dur: "8s" },
          { left: "45%", delay: "1s", dur: "7s" },
          { left: "68%", delay: "3s", dur: "9s" },
          { left: "85%", delay: "1.5s", dur: "7.5s" },
        ].map((petal, i) => (
          <div
            key={`petal-${i}`}
            className="absolute top-0 w-2 h-2 bg-[#FF8C32] rounded-none animate-float-slow"
            style={{
              left: petal.left,
              animationDelay: petal.delay,
              animationDuration: petal.dur,
              boxShadow: "0 0 4px #FFD447",
            }}
          />
        ))}
      </div>

      {/* Smiling Pixel Moon (Interactive Easter Egg) */}
      <div
        onClick={handleMoonClick}
        className={`absolute top-8 right-8 sm:top-12 sm:right-16 cursor-pointer z-20 group transition-transform ${
          moonClicked ? "scale-125" : "hover:scale-110"
        }`}
        title="Touch the Diwali Full Moon!"
      >
        <div className="relative">
          {/* Moon Glow */}
          <div className="absolute -inset-4 bg-retro-gold/20 rounded-full blur-md group-hover:bg-retro-gold/40 transition-all pointer-events-none" />
          {/* Pixel Moon SVG */}
          <svg
            width="48"
            height="48"
            viewBox="0 0 16 16"
            style={{ shapeRendering: "crispEdges" }}
          >
            {/* Moon Crescent / Disc */}
            <rect x="5" y="1" width="6" height="14" fill="#FFF8DC" />
            <rect x="3" y="3" width="10" height="10" fill="#FFF8DC" />
            <rect x="1" y="5" width="14" height="6" fill="#FFF8DC" />
            <rect x="2" y="4" width="12" height="8" fill="#FFF8DC" />

            {/* Shading */}
            <rect x="8" y="2" width="4" height="1" fill="#FFE685" />
            <rect x="11" y="4" width="2" height="4" fill="#FFE685" />
            <rect x="10" y="8" width="3" height="4" fill="#FFE685" />

            {/* Pixel Face */}
            <rect x="4" y="6" width="1" height="2" fill="#8B6508" />
            <rect x="8" y="6" width="1" height="2" fill="#8B6508" />
            <rect x="5" y="10" width="3" height="1" fill="#8B6508" />
            <rect x="4" y="9" width="1" height="1" fill="#8B6508" />
            <rect x="8" y="9" width="1" height="1" fill="#8B6508" />
          </svg>

          {/* Golden sparkles around moon */}
          {moonClicked && (
            <div className="absolute -inset-3 pointer-events-none">
              <span className="absolute top-0 left-0 text-retro-gold text-xs animate-ping">
                ✨
              </span>
              <span className="absolute bottom-0 right-0 text-retro-gold text-xs animate-ping delay-100">
                ✨
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 2. DISTANT SILHOUETTED MOUNTAINS & VILLAGE HORIZON */}
      <div className="absolute bottom-36 sm:bottom-44 inset-x-0 pointer-events-none -z-10">
        <svg
          viewBox="0 0 1200 180"
          className="w-full h-auto"
          preserveAspectRatio="none"
          style={{ shapeRendering: "crispEdges" }}
        >
          {/* Mountain Ridge */}
          <polygon
            points="0,180 0,90 80,60 160,110 240,50 340,120 460,40 580,100 680,45 800,110 940,35 1060,95 1200,60 1200,180"
            fill="#170c2a"
          />
          {/* Distant Temple Shikhara Silhouettes */}
          <rect x="236" y="25" width="8" height="26" fill="#170c2a" />
          <polygon points="234,25 240,10 246,25" fill="#170c2a" />
          <rect x="240" y="6" width="1" height="5" fill="#FFD447" opacity="0.6" />

          <rect x="936" y="15" width="8" height="22" fill="#170c2a" />
          <polygon points="934,15 940,2 946,15" fill="#170c2a" />
          <rect x="940" y="0" width="1" height="4" fill="#FFD447" opacity="0.6" />
        </svg>
      </div>

      {/* 3. CENTRAL CONTENT: RETRO GAME DIALOGUE BOX */}
      <div className="relative z-30 flex-1 flex items-center justify-center px-4 py-8">
        <div className="pixel-box-gold w-full max-w-md p-6 sm:p-8 text-center animate-pixel-float">
          {/* Header Diya & Title */}
          <div className="flex justify-center mb-2">
            <PixelDiya size="md" onDiyaClick={onDiyaEasterEgg} />
          </div>

          <h1 className="font-pixel text-base sm:text-lg text-retro-gold mb-3 tracking-wider pixel-text-gold">
            🪔 WELCOME, PLAYER! 🪔
          </h1>

          <p className="font-silkscreen text-xs sm:text-sm text-retro-neonPink mb-1 font-bold">
            A little Diwali magic is waiting for you...
          </p>

          <p className="font-retro text-lg sm:text-xl text-yellow-100/90 mb-5">
            Enter your name to begin your celebration.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <input
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                placeholder="Your name..."
                maxLength={24}
                className="w-full bg-[#0a0718] border-4 border-retro-gold px-4 py-3 text-center font-pixel text-xs sm:text-sm text-retro-gold placeholder:text-yellow-500/40 focus:outline-none focus:border-retro-neonPink shadow-[inset_0_4px_8px_rgba(0,0,0,0.8)]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="pixel-btn pixel-btn-primary w-full py-3 sm:py-4 text-xs sm:text-sm tracking-wider"
            >
              ▶ START CELEBRATION
            </button>
          </form>

          {/* Retro Note */}
          <div className="mt-4 pt-3 border-t-2 border-[#381a54] text-[10px] text-yellow-300/70 font-retro tracking-widest uppercase">
            * Tap anywhere to blast fireworks *
          </div>
        </div>
      </div>

      {/* 4. VILLAGE SCENE FOREGROUND: HOUSES, DIYAS, RANGOLIS & CHARACTERS */}
      <div className="relative z-20 w-full overflow-hidden">
        {/* Festive String Lights (Fairy Lights) draped across village */}
        <div className="w-full flex justify-between px-2 sm:px-6 mb-2 pointer-events-none">
          {Array.from({ length: 18 }).map((_, i) => {
            const colors = ["#FFD447", "#FF8C32", "#FF70A6", "#38F8D4", "#64C77A", "#E84A5F"];
            const col = colors[i % colors.length];
            return (
              <div
                key={`bulb-${i}`}
                className="w-2.5 h-3 animate-pixel-blink"
                style={{
                  backgroundColor: col,
                  boxShadow: `0 0 6px ${col}`,
                  animationDelay: `${(i % 4) * 0.25}s`,
                }}
              />
            );
          })}
        </div>

        {/* Village Houses & Courtyard Row */}
        <div className="relative w-full flex items-end justify-between px-2 sm:px-8 border-b-8 border-[#0c0817] pb-1">
          {/* Left House */}
          <div className="relative hidden xs:block sm:block">
            {/* Hanging Kandil */}
            <div className="absolute -top-6 left-6 animate-pixel-bounce origin-top">
              <svg width="18" height="24" viewBox="0 0 9 12" style={{ shapeRendering: "crispEdges" }}>
                <rect x="3" y="0" width="3" height="2" fill="#FFD447" />
                <rect x="2" y="2" width="5" height="5" fill="#E84A5F" />
                <rect x="3" y="3" width="3" height="3" fill="#FFD447" />
                <rect x="2" y="7" width="5" height="1" fill="#FF8C32" />
                {/* Streamers */}
                <rect x="2" y="8" width="1" height="4" fill="#38F8D4" />
                <rect x="4" y="8" width="1" height="3" fill="#FF70A6" />
                <rect x="6" y="8" width="1" height="4" fill="#FFD447" />
              </svg>
            </div>

            {/* House Structure SVG */}
            <svg width="130" height="100" viewBox="0 0 65 50" style={{ shapeRendering: "crispEdges" }}>
              {/* Stepped Roof */}
              <rect x="5" y="6" width="55" height="3" fill="#A64024" />
              <rect x="10" y="3" width="45" height="3" fill="#C25E3B" />
              <rect x="15" y="0" width="35" height="3" fill="#852E15" />

              {/* Walls */}
              <rect x="10" y="9" width="45" height="40" fill="#2E1C45" />
              <rect x="12" y="11" width="41" height="36" fill="#3C2459" />

              {/* Glowing Window */}
              <rect x="16" y="18" width="12" height="12" fill="#FFD447" />
              <rect x="21" y="18" width="2" height="12" fill="#8B6508" />
              <rect x="16" y="23" width="12" height="2" fill="#8B6508" />

              {/* Wooden Door */}
              <rect x="34" y="24" width="14" height="25" fill="#5A2E10" />
              <rect x="34" y="23" width="14" height="2" fill="#FF8C32" />
              {/* Marigold Toran above door */}
              <rect x="34" y="22" width="14" height="2" fill="#FFD447" />
            </svg>

            {/* Diya on Left House doorstep */}
            <div className="absolute bottom-1 right-2">
              <PixelDiya size="sm" onDiyaClick={onDiyaEasterEgg} />
            </div>
          </div>

          {/* Left Character: Child with Sparkler */}
          <div className="relative mb-2">
            <PixelCharacter type="sparkler" scale={2.8} />
          </div>

          {/* Center Character: Festive Dancer */}
          <div className="relative mb-2 hidden sm:block">
            <PixelCharacter type="dancer" scale={2.8} />
          </div>

          {/* Center Diya & Rangoli patch */}
          <div className="relative flex flex-col items-center mb-1">
            <PixelDiya size="md" onDiyaClick={onDiyaEasterEgg} />
            {/* Small doorstep rangoli */}
            <div className="mt-1 w-10 h-3 bg-gradient-to-r from-retro-neonPink via-retro-gold to-retro-pixelCyan rounded-none border border-black shadow" />
          </div>

          {/* Right Character: Person lighting Diya */}
          <div className="relative mb-2">
            <PixelCharacter type="diyaLighter" scale={2.6} />
          </div>

          {/* Right House */}
          <div className="relative hidden xs:block sm:block">
            {/* Hanging Kandil */}
            <div className="absolute -top-6 right-6 animate-pixel-bounce origin-top delay-150">
              <svg width="18" height="24" viewBox="0 0 9 12" style={{ shapeRendering: "crispEdges" }}>
                <rect x="3" y="0" width="3" height="2" fill="#FFD447" />
                <rect x="2" y="2" width="5" height="5" fill="#38F8D4" />
                <rect x="3" y="3" width="3" height="3" fill="#FF70A6" />
                <rect x="2" y="7" width="5" height="1" fill="#FFD447" />
                <rect x="2" y="8" width="1" height="4" fill="#FF8C32" />
                <rect x="4" y="8" width="1" height="3" fill="#E84A5F" />
                <rect x="6" y="8" width="1" height="4" fill="#38F8D4" />
              </svg>
            </div>

            {/* House Structure SVG */}
            <svg width="130" height="100" viewBox="0 0 65 50" style={{ shapeRendering: "crispEdges" }}>
              <rect x="5" y="6" width="55" height="3" fill="#A64024" />
              <rect x="10" y="3" width="45" height="3" fill="#C25E3B" />
              <rect x="15" y="0" width="35" height="3" fill="#852E15" />

              <rect x="10" y="9" width="45" height="40" fill="#2E1C45" />
              <rect x="12" y="11" width="41" height="36" fill="#3C2459" />

              <rect x="16" y="24" width="14" height="25" fill="#5A2E10" />
              <rect x="16" y="22" width="14" height="2" fill="#FFD447" />

              <rect x="36" y="18" width="12" height="12" fill="#FFD447" />
              <rect x="41" y="18" width="2" height="12" fill="#8B6508" />
              <rect x="36" y="23" width="12" height="2" fill="#8B6508" />
            </svg>

            {/* Diya on Right House doorstep */}
            <div className="absolute bottom-1 left-2">
              <PixelDiya size="sm" onDiyaClick={onDiyaEasterEgg} />
            </div>
          </div>
        </div>

        {/* Cobblestone Village Path / Ground */}
        <div className="w-full bg-[#120a22] py-2 px-4 flex justify-around text-xs text-retro-gold/40 border-t-2 border-[#2b1747]">
          <span>◆ ◆ ◆</span>
          <span>✦ DIWALI NIGHT ✦</span>
          <span>◆ ◆ ◆</span>
        </div>
      </div>
    </div>
  );
};

