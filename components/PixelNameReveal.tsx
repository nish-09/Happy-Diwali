"use client";

import React, { useState, useEffect } from "react";
import { retroAudio } from "./RetroAudio";

interface PixelNameRevealProps {
  name: string;
  onRevealed?: () => void;
}

export const PixelNameReveal: React.FC<PixelNameRevealProps> = ({
  name,
  onRevealed,
}) => {
  const [phase, setPhase] = useState<"assembling" | "glowing" | "revealed">("assembling");
  const [glitchText, setGlitchText] = useState("");

  const cleanName = (name || "FRIEND").trim().toUpperCase();

  useEffect(() => {
    // Phase 1: Particle / Glitch assembly simulation
    let iterations = 0;
    const maxIterations = 14;
    const randomChars = "10!@#$%*&▲■◆★DIWALI";

    const scrambleInterval = setInterval(() => {
      iterations++;
      if (iterations < maxIterations) {
        const scrambled = cleanName
          .split("")
          .map((char) =>
            char === " "
              ? " "
              : Math.random() > 0.4
              ? randomChars[Math.floor(Math.random() * randomChars.length)]
              : char
          )
          .join("");
        setGlitchText(scrambled);
      } else {
        clearInterval(scrambleInterval);
        setGlitchText(cleanName);
        setPhase("glowing");
        retroAudio.playSparkle();

        // Phase 2: Golden glow burst
        setTimeout(() => {
          setPhase("revealed");
          if (onRevealed) onRevealed();
        }, 500);
      }
    }, 80);

    return () => clearInterval(scrambleInterval);
  }, [cleanName, onRevealed]);

  return (
    <div className="relative inline-block my-2 sm:my-3">
      {/* Golden Glow Backdrop during reveal */}
      <div
        className={`absolute -inset-4 bg-retro-gold/30 blur-xl rounded-full transition-opacity duration-700 pointer-events-none ${
          phase === "glowing" || phase === "revealed" ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Golden pixel particles hovering around name */}
      {phase === "revealed" && (
        <div className="absolute -inset-2 pointer-events-none overflow-visible">
          <span className="absolute -top-3 -left-3 text-retro-gold text-xs animate-ping">
            ✦
          </span>
          <span className="absolute -top-3 -right-3 text-retro-gold text-xs animate-ping delay-150">
            ✦
          </span>
          <span className="absolute -bottom-3 -left-3 text-retro-gold text-xs animate-ping delay-300">
            ✦
          </span>
          <span className="absolute -bottom-3 -right-3 text-retro-gold text-xs animate-ping delay-75">
            ✦
          </span>
        </div>
      )}

      {/* Main Name Heading */}
      <div className="relative z-10">
        <span className="font-pixel text-xl sm:text-3xl md:text-4xl text-retro-gold tracking-wider pixel-text-gold inline-block uppercase">
          HEY, {glitchText || cleanName}!
        </span>
      </div>
    </div>
  );
};

