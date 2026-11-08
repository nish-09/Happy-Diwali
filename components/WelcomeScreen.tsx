"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CinematicDiya } from "./CinematicDiya";
import { GoldenRangoli } from "./GoldenRangoli";
import { realisticAudio } from "./RealisticAudio";

interface WelcomeScreenProps {
  onStart: (name: string) => void;
  initialName?: string;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStart,
  initialName = "",
}) => {
  const [name, setName] = useState(initialName);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    realisticAudio.playClick();
    realisticAudio.playGreetingSwell();

    // Trigger parent start handler
    onStart(name.trim() || "Dear Friend");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="relative min-h-screen w-full flex flex-col justify-between items-center px-4 py-8 select-none z-30"
    >
      {/* Top Ambient Glow & Welcome Sub-Header */}
      <div className="pt-8 sm:pt-12 text-center">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-diwali-royalGold/30 bg-diwali-deepPurple/50 backdrop-blur-md mb-2 shadow-[0_0_20px_rgba(255,215,0,0.15)]">
          <span className="text-diwali-royalGold text-xs">🪔</span>
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-diwali-warmGold">
            Shubh Deepavali 2026
          </span>
          <span className="text-diwali-royalGold text-xs">🪔</span>
        </div>
      </div>

      {/* Centerpiece Luxury Card */}
      <div className="w-full max-w-xl mx-auto my-auto relative z-30">
        <div className="relative glass-gold-card rounded-2xl p-7 sm:p-12 text-center overflow-hidden">
          {/* Subtle Corner Gold Ornaments */}
          <div className="absolute top-2 left-2 text-diwali-royalGold/40 text-sm">✦</div>
          <div className="absolute top-2 right-2 text-diwali-royalGold/40 text-sm">✦</div>
          <div className="absolute bottom-2 left-2 text-diwali-royalGold/40 text-sm">✦</div>
          <div className="absolute bottom-2 right-2 text-diwali-royalGold/40 text-sm">✦</div>

          {/* Golden Center Diya */}
          <div className="flex justify-center mb-4">
            <CinematicDiya size="md" />
          </div>

          {/* Main Heading: "A Little Light, A Lot of Happiness..." */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-decorative text-2xl sm:text-4xl text-diwali-lightGold tracking-wide leading-tight mb-3 gold-text-shimmer"
          >
            A Little Light, A Lot of Happiness...
          </motion.h1>

          {/* Subtitle: "This Diwali, we have a special wish for you!" */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="font-sans text-sm sm:text-base text-yellow-100/80 font-light tracking-wide mb-8"
          >
            This Diwali, we have a special wish for you!
          </motion.p>

          {/* Input Form with Glowing Golden Border */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col gap-4 max-w-md mx-auto"
          >
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                maxLength={32}
                className="luxury-input w-full px-6 py-4 rounded-xl text-center text-lg sm:text-xl placeholder:text-yellow-200/40 focus:outline-none"
              />
            </div>

            {/* CTA Button: "✨ Celebrate Diwali" */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="gold-btn w-full py-4 rounded-xl text-base sm:text-lg tracking-wider font-semibold shadow-2xl flex items-center justify-center gap-2"
            >
              <span>✨</span>
              <span>Celebrate Diwali</span>
            </button>
          </motion.form>

          {/* Bottom subtle note */}
          <p className="mt-5 text-[11px] sm:text-xs text-yellow-300/40 tracking-widest uppercase font-light">
            Tap anywhere to ignite fireworks • Sound recommended
          </p>
        </div>
      </div>

      {/* Bottom Scene: Flanking Diyas and Animated Central Rangoli */}
      <div className="relative w-full max-w-5xl flex items-end justify-between px-2 sm:px-12 pointer-events-none mt-4">
        {/* Left Glowing Diya */}
        <div className="pointer-events-auto">
          <CinematicDiya size="lg" />
        </div>

        {/* Center Animated Sacred Rangoli */}
        <div className="absolute left-1/2 -bottom-24 -translate-x-1/2 pointer-events-none -z-10">
          <GoldenRangoli size={360} />
        </div>

        {/* Right Glowing Diya */}
        <div className="pointer-events-auto">
          <CinematicDiya size="lg" />
        </div>
      </div>
    </motion.div>
  );
};

