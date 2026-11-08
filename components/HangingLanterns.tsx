"use client";

import React from "react";

export const HangingLanterns: React.FC = () => {
  return (
    <div className="absolute top-0 inset-x-0 flex justify-between px-4 sm:px-16 pointer-events-none z-20 overflow-hidden">
      {/* Left Hanging Lantern */}
      <div className="flex flex-col items-center animate-flame-flicker origin-top" style={{ animationDuration: "4.5s" }}>
        {/* Golden Chain */}
        <div className="w-[1.5px] h-14 sm:h-24 bg-gradient-to-b from-diwali-royalGold/20 via-diwali-royalGold to-diwali-warmGold" />
        
        {/* Lantern Cap */}
        <div className="w-8 h-2.5 bg-gradient-to-r from-[#D4AF37] via-[#FFF9C4] to-[#AA771C] rounded-t-sm shadow-md" />
        
        {/* Glowing Lantern Body */}
        <div className="relative w-10 h-14 bg-gradient-to-b from-diwali-royalGold/80 via-diwali-diyaOrange/70 to-diwali-festiveRed/80 rounded-b-md border border-diwali-royalGold/60 shadow-[0_0_20px_rgba(255,184,77,0.7)] flex items-center justify-center backdrop-blur-sm">
          {/* Inner Light Flame */}
          <div className="w-2.5 h-5 bg-[#FFFFFF] rounded-full animate-flame-flicker blur-[1px] shadow-[0_0_12px_#FFD700]" />
          {/* Filigree Grid */}
          <div className="absolute inset-0 border-t border-b border-diwali-royalGold/40 my-2" />
        </div>

        {/* Tassels */}
        <div className="flex gap-1.5 mt-0.5">
          <div className="w-0.5 h-6 bg-diwali-royalGold/80" />
          <div className="w-0.5 h-8 bg-diwali-diyaOrange" />
          <div className="w-0.5 h-6 bg-diwali-royalGold/80" />
        </div>
      </div>

      {/* Center Subtle Garland String on Desktops */}
      <div className="hidden lg:flex flex-1 justify-around items-start pt-2 px-12 opacity-60">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-diwali-royalGold shadow-[0_0_6px_#FFD700]" />
            <div className="w-0.5 h-3 bg-diwali-royalGold/40" />
            <div className="w-2 h-2 rounded-full bg-diwali-diyaOrange/80 shadow-[0_0_8px_#FF6B00]" />
          </div>
        ))}
      </div>

      {/* Right Hanging Lantern */}
      <div className="flex flex-col items-center animate-flame-flicker origin-top delay-700" style={{ animationDuration: "5.2s" }}>
        <div className="w-[1.5px] h-12 sm:h-20 bg-gradient-to-b from-diwali-royalGold/20 via-diwali-royalGold to-diwali-warmGold" />
        <div className="w-8 h-2.5 bg-gradient-to-r from-[#D4AF37] via-[#FFF9C4] to-[#AA771C] rounded-t-sm shadow-md" />
        <div className="relative w-10 h-14 bg-gradient-to-b from-diwali-royalGold/80 via-diwali-diyaOrange/70 to-diwali-festiveRed/80 rounded-b-md border border-diwali-royalGold/60 shadow-[0_0_20px_rgba(255,184,77,0.7)] flex items-center justify-center backdrop-blur-sm">
          <div className="w-2.5 h-5 bg-[#FFFFFF] rounded-full animate-flame-flicker blur-[1px] shadow-[0_0_12px_#FFD700]" />
          <div className="absolute inset-0 border-t border-b border-diwali-royalGold/40 my-2" />
        </div>
        <div className="flex gap-1.5 mt-0.5">
          <div className="w-0.5 h-6 bg-diwali-royalGold/80" />
          <div className="w-0.5 h-8 bg-diwali-diyaOrange" />
          <div className="w-0.5 h-6 bg-diwali-royalGold/80" />
        </div>
      </div>
    </div>
  );
};

