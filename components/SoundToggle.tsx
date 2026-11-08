"use client";

import React, { useState, useEffect } from "react";
import { realisticAudio } from "./RealisticAudio";

interface SoundToggleProps {
  onToggle?: (isMuted: boolean) => void;
}

export const SoundToggle: React.FC<SoundToggleProps> = ({ onToggle }) => {
  const [isMuted, setIsMuted] = useState(false); // Default ON!

  useEffect(() => {
    setIsMuted(realisticAudio.getMuted());
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    realisticAudio.initOnUserGesture();
    const muted = realisticAudio.toggleMute();
    setIsMuted(muted);
    if (onToggle) onToggle(muted);
  };

  return (
    <button
      onClick={handleToggle}
      className={`fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-2.5 px-3.5 py-2 rounded-full transition-all duration-300 shadow-xl backdrop-blur-md border ${
        isMuted
          ? "bg-diwali-deepPurple/80 border-diwali-festiveRed/50 text-red-200 hover:border-diwali-festiveRed"
          : "bg-diwali-deepPurple/80 border-diwali-royalGold text-diwali-royalGold hover:shadow-[0_0_20px_rgba(255,215,0,0.35)]"
      }`}
      title={isMuted ? "Click to Turn Sound & Music ON" : "Click to Turn Sound & Music OFF"}
      aria-label="Sound & Music control"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isMuted ? (
          // Muted Speaker Icon
          <svg
            className="w-4 h-4 text-red-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
            />
          </svg>
        ) : (
          // Animated Audio Waves Icon
          <div className="flex items-end gap-[2px] h-3.5">
            <span className="w-1 bg-diwali-royalGold rounded-full animate-pulse h-2" />
            <span className="w-1 bg-diwali-royalGold rounded-full animate-pulse h-3.5 delay-75" />
            <span className="w-1 bg-diwali-royalGold rounded-full animate-pulse h-2.5 delay-150" />
            <span className="w-1 bg-diwali-royalGold rounded-full animate-pulse h-4 delay-300" />
          </div>
        )}
      </div>

      <span className="text-[11px] sm:text-xs uppercase tracking-wider font-bold">
        {isMuted ? "Sound: OFF" : "Sound: ON"}
      </span>
    </button>
  );
};
