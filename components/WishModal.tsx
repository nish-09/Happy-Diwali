"use client";

import React, { useState, useEffect } from "react";
import { retroAudio } from "./RetroAudio";
import { PixelDiya } from "./PixelDiyas";

const FESTIVE_WISHES = [
  {
    title: "✨ BLESSING OF MAHA LAKSHMI",
    text: "May the divine grace of Goddess Lakshmi fill your home with infinite prosperity, wealth, peace, and eternal fortune!",
    tag: "PROSPERITY +999",
  },
  {
    title: "🪔 LIGHT OVER DARKNESS",
    text: "May the holy flame of every diya dissolve doubts, illuminate your path, and bring clarity and courage to all your dreams!",
    tag: "WISDOM +100",
  },
  {
    title: "💖 BLISS & GOOD HEALTH",
    text: "Wishing you vibrant health, joyful laughter, harmonious friendships, and sweet moments with your loved ones this season!",
    tag: "VITALITY +100%",
  },
  {
    title: "🎆 SUCCESS & ABUNDANCE",
    text: "May your career and creative ventures soar high like sparkling fireworks, reaching radiant new heights of success!",
    tag: "CAREER EXP +500",
  },
  {
    title: "🌟 SACRED SERENITY",
    text: "May every corner of your dwelling resound with festive chants, sweet aromas, and the boundless love of family!",
    tag: "HAPPINESS MAX",
  },
];

interface WishModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WishModal: React.FC<WishModalProps> = ({ isOpen, onClose }) => {
  const [wishIndex, setWishIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  const currentWish = FESTIVE_WISHES[wishIndex];

  // Typewriter effect
  useEffect(() => {
    if (!isOpen) return;

    setDisplayedText("");
    let charIndex = 0;
    const fullText = currentWish.text;

    const interval = setInterval(() => {
      if (charIndex < fullText.length) {
        setDisplayedText((prev) => prev + fullText[charIndex]);
        charIndex++;
      } else {
        clearInterval(interval);
      }
    }, 24);

    return () => clearInterval(interval);
  }, [isOpen, wishIndex, currentWish.text]);

  if (!isOpen) return null;

  const handleNextWish = () => {
    retroAudio.playClick();
    setWishIndex((prev) => (prev + 1) % FESTIVE_WISHES.length);
  };

  const handleClose = () => {
    retroAudio.playClick();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="pixel-box-gold max-w-lg w-full p-6 text-center animate-pixel-float relative">
        {/* Close Button top-right */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-retro-gold hover:text-white font-pixel text-xs p-1"
          title="Close"
        >
          [X]
        </button>

        {/* Diya Header */}
        <div className="flex justify-center mb-3">
          <PixelDiya size="md" withSmoke={false} />
        </div>

        {/* RPG Dialogue Title */}
        <div className="font-pixel text-xs sm:text-sm text-retro-gold mb-3 tracking-wider">
          {currentWish.title}
        </div>

        {/* RPG Dialogue Content Window */}
        <div className="bg-[#0f0a20] border-2 border-[#542d74] p-4 min-h-[96px] mb-4 text-left font-retro text-lg sm:text-xl text-yellow-100 leading-relaxed shadow-inner">
          <p>{displayedText}</p>
          {displayedText.length < currentWish.text.length && (
            <span className="inline-block w-2 h-4 bg-retro-gold animate-pixel-blink ml-1 align-middle" />
          )}
        </div>

        {/* RPG Stat Boost Badge */}
        <div className="mb-5">
          <span className="inline-block bg-retro-purple border border-retro-gold px-3 py-1 text-retro-gold font-pixel text-[10px] tracking-widest shadow">
            {currentWish.tag}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleNextWish}
            className="pixel-btn pixel-btn-primary px-4 py-2 text-xs"
          >
            ★ ANOTHER WISH
          </button>
          <button
            onClick={handleClose}
            className="pixel-btn pixel-btn-festive px-4 py-2 text-xs"
          >
            ✓ ACCEPT BLESSING
          </button>
        </div>
      </div>
    </div>
  );
};

