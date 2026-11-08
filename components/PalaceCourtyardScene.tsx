"use client";

import React, { useState } from "react";
import { PixelNameReveal } from "./PixelNameReveal";
import { PixelDiya } from "./PixelDiyas";
import { PixelRangoli } from "./PixelRangoli";
import { PixelCharacter } from "./PixelCharacters";
import { retroAudio } from "./RetroAudio";

interface PalaceCourtyardSceneProps {
  userName: string;
  onCelebrateAgain: () => void;
  onOpenWishModal: () => void;
  onDiyaClick: () => void;
  onRangoliClick: () => void;
  onShare: () => void;
  onCharacterClick?: () => void;
}

export const PalaceCourtyardScene: React.FC<PalaceCourtyardSceneProps> = ({
  userName,
  onCelebrateAgain,
  onOpenWishModal,
  onDiyaClick,
  onRangoliClick,
  onShare,
  onCharacterClick,
}) => {
  const [copiedNotification, setCopiedNotification] = useState(false);

  const handleShareClick = () => {
    retroAudio.playClick();
    onShare();
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const handleCelebrate = () => {
    retroAudio.playStartCelebration();
    onCelebrateAgain();
  };

  const handleWish = () => {
    retroAudio.playClick();
    onOpenWishModal();
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between overflow-x-hidden select-none pb-20 sm:pb-16 pt-14">
      {/* 1. PALACE ARCHITECTURE BACKGROUND */}
      {/* Sky backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0c1b] via-[#1c1236] to-[#2b144a] -z-20 pointer-events-none" />

      {/* Floating Golden Dust Particles / Fireflies */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {[
          { top: "15%", left: "10%", size: 3, delay: "0s", dur: "4s" },
          { top: "25%", left: "85%", size: 4, delay: "1s", dur: "5s" },
          { top: "40%", left: "20%", size: 3, delay: "0.5s", dur: "3.5s" },
          { top: "60%", left: "75%", size: 4, delay: "1.5s", dur: "4.5s" },
          { top: "75%", left: "12%", size: 3, delay: "2s", dur: "6s" },
          { top: "35%", left: "90%", size: 2, delay: "0.8s", dur: "4s" },
        ].map((dust, i) => (
          <div
            key={`dust-${i}`}
            className="absolute bg-retro-gold animate-float-slow"
            style={{
              top: dust.top,
              left: dust.left,
              width: dust.size,
              height: dust.size,
              animationDelay: dust.delay,
              animationDuration: dust.dur,
              boxShadow: "0 0 8px #FFD447",
            }}
          />
        ))}
      </div>

      {/* Decorative Royal Palace Rooftop Chhatris (Domes) and Parapets SVG */}
      <div className="absolute top-0 inset-x-0 pointer-events-none -z-10 opacity-75">
        <svg
          viewBox="0 0 1200 120"
          className="w-full h-auto"
          preserveAspectRatio="none"
          style={{ shapeRendering: "crispEdges" }}
        >
          {/* Golden Palace Dome Center */}
          <polygon points="560,70 600,10 640,70" fill="#FFD447" />
          <rect x="596" y="2" width="8" height="12" fill="#E84A5F" />
          <rect x="599" y="0" width="2" height="4" fill="#FFFFFF" />
          <rect x="550" y="70" width="100" height="10" fill="#C79E1A" />
          {/* Pillars under dome */}
          <rect x="560" y="80" width="8" height="40" fill="#24143D" />
          <rect x="632" y="80" width="8" height="40" fill="#24143D" />

          {/* Left Chhatri */}
          <polygon points="160,80 190,30 220,80" fill="#FFD447" />
          <rect x="188" y="24" width="4" height="8" fill="#E84A5F" />
          <rect x="150" y="80" width="80" height="8" fill="#C79E1A" />
          <rect x="160" y="88" width="6" height="32" fill="#24143D" />
          <rect x="214" y="88" width="6" height="32" fill="#24143D" />

          {/* Right Chhatri */}
          <polygon points="980,80 1010,30 1040,80" fill="#FFD447" />
          <rect x="1008" y="24" width="4" height="8" fill="#E84A5F" />
          <rect x="970" y="80" width="80" height="8" fill="#C79E1A" />
          <rect x="980" y="88" width="6" height="32" fill="#24143D" />
          <rect x="1034" y="88" width="6" height="32" fill="#24143D" />

          {/* Palace crenellations / Battlement wall */}
          {Array.from({ length: 30 }).map((_, i) => (
            <rect key={i} x={i * 40} y="85" width="20" height="15" fill="#1b0e30" />
          ))}
          <rect x="0" y="100" width="1200" height="20" fill="#140924" />
        </svg>
      </div>

      {/* Marigold Toran / Garlands along top */}
      <div className="w-full flex justify-between px-3 sm:px-12 pointer-events-none mb-2">
        {Array.from({ length: 14 }).map((_, idx) => (
          <div key={`garland-${idx}`} className="flex flex-col items-center">
            {/* Flower knot */}
            <div className="w-3 h-3 bg-[#FF8C32] border border-[#FFD447] shadow-[0_0_6px_#FF8C32]" />
            <div className="w-1.5 h-4 bg-[#64C77A]" />
          </div>
        ))}
      </div>

      {/* 2. MAIN CELEBRATION CONTENT AREA */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto w-full my-auto">
        
        {/* Decorative Top Pixel Banner Diya Row */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-2">
          <PixelDiya size="sm" onDiyaClick={onDiyaClick} />
          <div className="flex items-center gap-2">
            <span className="text-retro-gold text-xs sm:text-sm font-pixel">✦</span>
            <span className="text-retro-neonPink text-xs sm:text-sm font-silkscreen font-bold tracking-widest uppercase">
              Shubh Deepavali
            </span>
            <span className="text-retro-gold text-xs sm:text-sm font-pixel">✦</span>
          </div>
          <PixelDiya size="sm" onDiyaClick={onDiyaClick} />
        </div>

        {/* Huge Pixelated Golden Typography: HAPPY DIWALI! */}
        <div className="my-1 sm:my-2 animate-pixel-float">
          <h1 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-retro-gold pixel-text-gold tracking-tight leading-tight uppercase">
            HAPPY DIWALI!
          </h1>
        </div>

        {/* USER NAME REVEAL WITH GOLDEN PIXEL ANIMATION */}
        <PixelNameReveal
          name={userName}
          onRevealed={() => {
            // Optional celebratory secondary sound or trigger
          }}
        />

        {/* BLESSING GREETING TEXT */}
        <div className="max-w-xl mx-auto my-3 sm:my-4 px-3 py-2 bg-[#120a22]/70 border-2 border-retro-gold/40">
          <p className="font-retro text-xl sm:text-2xl text-yellow-100 leading-snug tracking-wide">
            &ldquo;May your world always be filled with happiness, prosperity, good health and endless reasons to celebrate!&rdquo;
          </p>
        </div>

        {/* FAMILY SIGNATURE: VISUALLY PROMINENT RETRO RPG DIALOGUE BOX */}
        <div className="pixel-box-gold w-full max-w-lg p-5 sm:p-6 my-3 relative shadow-2xl">
          {/* Corner golden pixel ornaments */}
          <span className="absolute top-1 left-2 text-retro-gold text-xs">◆</span>
          <span className="absolute top-1 right-2 text-retro-gold text-xs">◆</span>
          <span className="absolute bottom-1 left-2 text-retro-gold text-xs">◆</span>
          <span className="absolute bottom-1 right-2 text-retro-gold text-xs">◆</span>

          <div className="font-pixel text-xs sm:text-sm text-retro-neonPink tracking-widest mb-1 uppercase font-bold">
            WITH LOVE,
          </div>

          <div className="font-pixel text-base sm:text-xl md:text-2xl text-retro-gold pixel-text-gold tracking-wider my-1 uppercase">
            KIRAN PARIKH &amp; FAMILY
          </div>

          <div className="flex items-center justify-center gap-3 mt-3 pt-2 border-t-2 border-[#432360]">
            <PixelDiya size="sm" onDiyaClick={onDiyaClick} withSmoke={false} />
            <span className="font-retro text-lg text-yellow-300 tracking-widest">
              🪔 ABUNDANCE • LIGHT • JOY 🪔
            </span>
            <PixelDiya size="sm" onDiyaClick={onDiyaClick} withSmoke={false} />
          </div>
        </div>

        {/* 3. INTERACTIVE PALACE COURTYARD ELEMENTS: RANGOLI & CHARACTERS */}
        <div className="relative w-full flex items-center justify-center my-4 py-2">
          {/* Left Character: Sparkler Kid */}
          <div className="absolute left-2 sm:left-12 -top-2 z-20">
            <PixelCharacter type="sparkler" scale={2.8} onClick={onCharacterClick} />
          </div>

          {/* Center Giant Interactive Rangoli Mandala */}
          <div className="relative z-10">
            <PixelRangoli size="md" onClick={onRangoliClick} />
          </div>

          {/* Right Character: Namaste Greeter */}
          <div className="absolute right-2 sm:right-12 -top-2 z-20">
            <PixelCharacter type="greeter" scale={2.8} onClick={onCharacterClick} />
          </div>
        </div>

        {/* 4. INTERACTION ACTION BUTTONS */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-2 mb-4 z-20">
          {/* CELEBRATE AGAIN */}
          <button
            onClick={handleCelebrate}
            className="pixel-btn pixel-btn-primary px-4 py-3 text-xs sm:text-sm flex items-center gap-2"
            title="Launch fireworks barrage"
          >
            <span>🎆</span>
            <span>CELEBRATE AGAIN</span>
          </button>

          {/* MAKE A WISH */}
          <button
            onClick={handleWish}
            className="pixel-btn pixel-btn-festive px-4 py-3 text-xs sm:text-sm flex items-center gap-2"
            title="Receive a festive blessing"
          >
            <span>🪔</span>
            <span>MAKE A WISH</span>
          </button>

          {/* SHARE THE MAGIC */}
          <button
            onClick={handleShareClick}
            className="pixel-btn pixel-btn-green px-4 py-3 text-xs sm:text-sm flex items-center gap-2"
            title="Share with loved ones"
          >
            <span>★</span>
            <span>SHARE MAGIC</span>
          </button>
        </div>

        {/* Copied Link Toast */}
        {copiedNotification && (
          <div className="bg-[#120a22] border-2 border-retro-gold px-4 py-2 font-pixel text-xs text-retro-gold animate-bounce shadow-lg">
            ✓ LINK COPIED! SPREAD THE DIWALI JOY!
          </div>
        )}
      </div>

      {/* 5. COURTYARD FLOOR & DECORATIVE BORDER */}
      <div className="relative z-10 w-full bg-[#150a27] border-t-4 border-retro-gold/70 py-2 px-4 flex items-center justify-around text-xs text-yellow-300/80 font-retro">
        <span className="hidden sm:inline">✦ CLICK ANYWHERE FOR FIREWORKS ✦</span>
        <span>🪔 SHUBH DEEPAVALI 🪔</span>
        <span className="hidden sm:inline">✦ TOUCH DIYAS FOR BLESSINGS ✦</span>
      </div>
    </div>
  );
};

