"use client";

import React from "react";
import Image from "next/image";
import { realisticAudio } from "./RealisticAudio";

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

export const CardModal: React.FC<CardModalProps> = ({
  isOpen,
  onClose,
  userName,
}) => {
  if (!isOpen) return null;

  const cleanName = (userName || "Friend").trim();

  const handleDownload = () => {
    realisticAudio.playClick();
    const link = document.createElement("a");
    link.href = "/diwali-card.jpg";
    link.download = `Happy_Diwali_${cleanName.replace(/\s+/g, "_")}_Kiran_Parikh.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleWhatsAppShare = () => {
    realisticAudio.playClick();
    const text = encodeURIComponent(
      `🪔 Happy Diwali! Kiran Parikh & Family have sent you a special Diwali celebration greeting card: ${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#130b26] border-2 border-diwali-royalGold rounded-2xl p-4 sm:p-5 shadow-[0_0_50px_rgba(255,215,0,0.35)] flex flex-col items-center max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            realisticAudio.playClick();
            onClose();
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-diwali-deepPurple border border-diwali-royalGold/50 text-diwali-royalGold hover:bg-diwali-royalGold hover:text-black flex items-center justify-center font-bold text-sm transition-all shadow-md z-10"
          title="Close"
        >
          ✕
        </button>

        {/* Modal Title */}
        <div className="text-center mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-diwali-deepPurple border border-diwali-royalGold/40 text-[11px] text-diwali-warmGold uppercase tracking-widest font-semibold mb-1">
            <span>🪔</span>
            <span>Diwali Keepsake Card</span>
            <span>🪔</span>
          </div>
          <h3 className="font-decorative text-lg sm:text-xl text-diwali-lightGold gold-text-shimmer">
            Kiran Parikh &amp; Family
          </h3>
        </div>

        {/* The Card Image (The exact card uploaded by user!) */}
        <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border-2 border-diwali-royalGold/60 shadow-2xl mb-4 bg-black">
          <Image
            src="/diwali-card.jpg"
            alt="Happy Diwali - Kiran Parikh & Family Greeting Card"
            fill
            sizes="(max-width: 768px) 100vw, 420px"
            priority
            className="object-contain"
          />
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-2.5">
          {/* Direct Download Button */}
          <button
            onClick={handleDownload}
            className="gold-btn w-full py-3.5 rounded-xl font-bold text-sm tracking-wider flex items-center justify-center gap-2 shadow-xl"
          >
            <span>📥</span>
            <span>Download Card to Photos / Device</span>
          </button>

          {/* Share on WhatsApp */}
          <button
            onClick={handleWhatsAppShare}
            className="w-full py-3 rounded-xl font-bold text-sm tracking-wider text-green-300 bg-[#075E54]/80 hover:bg-[#075E54] border border-green-400/50 flex items-center justify-center gap-2 transition-all shadow-lg"
          >
            <span>📲</span>
            <span>Share Card on WhatsApp</span>
          </button>

          {/* Close link */}
          <button
            onClick={() => {
              realisticAudio.playClick();
              onClose();
            }}
            className="text-xs text-yellow-200/60 hover:text-diwali-royalGold pt-1 font-medium transition-colors"
          >
            ← Back to Celebration
          </button>
        </div>
      </div>
    </div>
  );
};

