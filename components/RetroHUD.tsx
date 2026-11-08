"use client";

import React, { useState, useEffect } from "react";
import { retroAudio } from "./RetroAudio";

interface RetroHUDProps {
  onSoundToggle?: (isMuted: boolean) => void;
  onResetToVillage?: () => void;
  currentScreen: "village" | "palace";
}

export const RetroHUD: React.FC<RetroHUDProps> = ({
  onSoundToggle,
  onResetToVillage,
  currentScreen,
}) => {
  const [isMuted, setIsMuted] = useState(true);

  // Sync initial mute state
  useEffect(() => {
    setIsMuted(retroAudio.getMuted());
  }, []);

  const toggleSound = () => {
    const newMuted = retroAudio.toggleMute();
    setIsMuted(newMuted);
    if (onSoundToggle) onSoundToggle(newMuted);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-40 px-3 py-2 sm:px-6 sm:py-3 pointer-events-none select-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Top-Left: DIWALI WORLD */}
        <div className="flex items-center gap-2">
          <div
            onClick={currentScreen === "palace" ? onResetToVillage : undefined}
            className={`pixel-box-gold px-2.5 py-1.5 flex items-center gap-2 bg-[#190d2e]/90 ${
              currentScreen === "palace" ? "cursor-pointer hover:bg-[#251347]" : ""
            }`}
            title={currentScreen === "palace" ? "Click to return to village" : "Diwali World"}
          >
            <span className="text-retro-gold text-xs">🪔</span>
            <span className="font-pixel text-[10px] sm:text-xs text-retro-gold tracking-wider">
              DIWALI WORLD
            </span>
          </div>
        </div>

        {/* Top-Center: Joy Meter (visible on tablets/desktops) */}
        <div className="hidden md:flex items-center gap-2 pixel-box-gold px-3 py-1 bg-[#190d2e]/90">
          <span className="font-pixel text-[10px] text-retro-gold">JOY</span>
          <div className="w-24 h-3 bg-[#0d0718] border border-retro-gold/60 p-0.5 flex gap-0.5">
            <div className="flex-1 bg-retro-diyaOrange" />
            <div className="flex-1 bg-retro-gold" />
            <div className="flex-1 bg-retro-neonPink" />
            <div className="flex-1 bg-retro-pixelCyan" />
            <div className="flex-1 bg-retro-leafGreen" />
          </div>
          <span className="font-pixel text-[9px] text-retro-pixelCyan">MAX</span>
        </div>

        {/* Top-Right: LEVEL 2026 + SOUND TOGGLE */}
        <div className="flex items-center gap-2">
          {/* LEVEL 2026 */}
          <div className="pixel-box-gold px-2.5 py-1.5 flex items-center gap-1.5 bg-[#190d2e]/90">
            <span className="text-retro-gold text-xs">★</span>
            <span className="font-pixel text-[10px] sm:text-xs text-retro-gold tracking-wider">
              LVL 2026
            </span>
          </div>

          {/* Sound Toggle Button */}
          <button
            onClick={toggleSound}
            className={`pixel-btn ${
              isMuted ? "pixel-btn-festive" : "pixel-btn-primary"
            } px-2.5 py-1.5 text-xs flex items-center gap-1.5`}
            title={isMuted ? "Click to enable sound & retro music" : "Click to mute"}
          >
            <span>{isMuted ? "🔇" : "🔊"}</span>
            <span className="font-pixel text-[9px] hidden sm:inline">
              {isMuted ? "SOUND: OFF" : "SOUND: ON"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

