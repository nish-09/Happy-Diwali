"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CinematicDiya } from "./CinematicDiya";
import { GoldenRangoli } from "./GoldenRangoli";
import { CardModal } from "./CardModal";
import { realisticAudio } from "./RealisticAudio";

interface CelebrationScreenProps {
  userName: string;
  onCelebrateAgain: () => void;
  onShare: () => void;
}

export const CelebrationScreen: React.FC<CelebrationScreenProps> = ({
  userName,
  onCelebrateAgain,
  onShare,
}) => {
  const [copiedToast, setCopiedToast] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);

  const cleanName = (userName || "Dear Friend").trim();

  const handleCelebrateAgainClick = () => {
    realisticAudio.playClick();
    realisticAudio.playGreetingSwell();
    onCelebrateAgain();
  };

  const handleShareClick = () => {
    realisticAudio.playClick();
    onShare();
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 3000);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative min-h-screen w-full flex flex-col justify-between items-center px-4 py-4 sm:py-6 select-none z-30"
      >
        {/* Top Header Badge */}
        <div className="pt-2 sm:pt-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="inline-flex items-center gap-2 sm:gap-3 px-4 py-1 rounded-full border border-diwali-royalGold/30 bg-diwali-deepPurple/70 backdrop-blur-md shadow-[0_0_20px_rgba(255,215,0,0.2)]"
          >
            <span className="text-diwali-royalGold text-xs">✦</span>
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-diwali-warmGold">
              Festival of Lights 2026
            </span>
            <span className="text-diwali-royalGold text-xs">✦</span>
          </motion.div>
        </div>

        {/* Centerpiece Greeting Container */}
        <div className="w-full max-w-2xl mx-auto my-auto relative z-30 text-center px-2 py-2">
          {/* Subtle Golden Rangoli Watermark */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10 opacity-25">
            <GoldenRangoli size={440} />
          </div>

          {/* Diya Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex justify-center mb-1"
          >
            <CinematicDiya size="sm" />
          </motion.div>

          {/* MAIN GREETING: "🪔 Happy Diwali, [USER NAME]! 🪔" */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="my-1.5 sm:my-2"
          >
            <h1 className="font-decorative text-2xl sm:text-4xl md:text-5xl text-diwali-lightGold tracking-tight leading-tight gold-text-shimmer">
              🪔 Happy Diwali, <span className="block sm:inline">{cleanName}!</span> 🪔
            </h1>
          </motion.div>

          {/* Gold Divider */}
          <div className="flex items-center justify-center gap-3 my-2 max-w-xs mx-auto">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-diwali-royalGold/60 to-diwali-royalGold" />
            <span className="text-diwali-royalGold text-[10px]">◆ ❖ ◆</span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-diwali-royalGold/60 to-diwali-royalGold" />
          </div>

          {/* BLESSING TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="max-w-xl mx-auto px-2 mb-2 sm:mb-3"
          >
            <p className="font-serif text-base sm:text-xl text-yellow-100/90 leading-snug font-light tracking-wide italic">
              &ldquo;May your life shine brighter than a thousand diyas.<br className="hidden sm:inline" />
              May happiness, prosperity and love light up every moment.&rdquo;
            </p>
          </motion.div>

          {/* FAMILY SIGNATURE & CARD PREVIEW CARD */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="relative glass-gold-card rounded-xl p-4 sm:p-5 max-w-md mx-auto shadow-2xl border border-diwali-royalGold/40 mb-4"
          >
            <p className="font-sans text-[11px] sm:text-xs text-diwali-warmGold uppercase tracking-[0.2em] font-medium mb-1">
              With love and warm wishes,
            </p>

            <h2 className="font-decorative text-lg sm:text-2xl text-diwali-royalGold gold-text-shimmer tracking-wide uppercase font-bold">
              Kiran Parikh &amp; Family
            </h2>

            {/* Clickable Card Thumbnail Teaser */}
            <div
              onClick={() => {
                realisticAudio.playClick();
                setIsCardModalOpen(true);
              }}
              className="mt-3 pt-2.5 border-t border-diwali-royalGold/20 flex items-center justify-between cursor-pointer group hover:opacity-95"
            >
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-10 rounded border border-diwali-royalGold/60 overflow-hidden shadow-sm">
                  <Image
                    src="/diwali-card.jpg"
                    alt="Card Preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-diwali-lightGold group-hover:text-diwali-royalGold">
                    Diwali Keepsake Card
                  </div>
                  <div className="text-[10px] text-yellow-200/60">
                    Tap to view &amp; download
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-diwali-royalGold px-2.5 py-1 rounded bg-diwali-royalGold/15 border border-diwali-royalGold/40">
                VIEW →
              </span>
            </div>
          </motion.div>

          {/* PRIMARY ACTION BUTTONS: Highly visible and centered */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 z-40"
          >
            {/* 1. SAVE CARD BUTTON (SUPER PROMINENT) */}
            <button
              onClick={() => {
                realisticAudio.playClick();
                setIsCardModalOpen(true);
              }}
              className="gold-btn px-5 py-3 rounded-full text-xs sm:text-sm font-bold shadow-2xl flex items-center gap-2 ring-2 ring-yellow-300/40"
              title="Save & Download Diwali Card"
            >
              <span>📥</span>
              <span>SAVE DIWALI CARD</span>
            </button>

            {/* 2. CELEBRATE AGAIN */}
            <button
              onClick={handleCelebrateAgainClick}
              className="px-4 py-3 rounded-full text-xs sm:text-sm font-bold text-yellow-100 bg-[#2b1042]/85 hover:bg-[#381656] border border-diwali-royalGold/50 shadow-xl flex items-center gap-1.5 transition-all"
              title="Launch fireworks barrage"
            >
              <span>🎆</span>
              <span>Celebrate Again</span>
            </button>

            {/* 3. SHARE WISHES */}
            <button
              onClick={handleShareClick}
              className="px-4 py-3 rounded-full text-xs sm:text-sm font-bold text-diwali-royalGold bg-[#1a0c30]/85 hover:bg-[#281347] border border-diwali-royalGold/50 shadow-xl flex items-center gap-1.5 transition-all"
              title="Share greeting link"
            >
              <span>💌</span>
              <span>Share Wishes</span>
            </button>
          </motion.div>

          {/* Share Toast */}
          {copiedToast && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 inline-block px-4 py-1.5 rounded-full bg-diwali-deepPurple border border-diwali-royalGold text-xs text-diwali-royalGold font-medium shadow-lg"
            >
              ✓ Greeting link copied! Share with family &amp; friends!
            </motion.div>
          )}
        </div>

        {/* Bottom Symmetrical Diyas */}
        <div className="relative w-full max-w-4xl flex items-end justify-between px-4 sm:px-12 pointer-events-none pb-1">
          <div className="pointer-events-auto">
            <CinematicDiya size="md" />
          </div>

          <div className="hidden sm:flex flex-col items-center pb-1 opacity-70">
            <span className="text-[11px] text-yellow-200/50 font-serif tracking-[0.2em] uppercase">
              ✦ Tap screen to launch fireworks ✦
            </span>
          </div>

          <div className="pointer-events-auto">
            <CinematicDiya size="md" />
          </div>
        </div>
      </motion.div>

      {/* Card Modal with full-res poster and download buttons */}
      <CardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
        userName={cleanName}
      />
    </>
  );
};
