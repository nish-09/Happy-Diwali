"use client";

import React, { useEffect } from "react";
import { retroAudio } from "./RetroAudio";

export interface Achievement {
  id: string;
  title: string;
  icon: string;
}

interface AchievementToastProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export const AchievementToast: React.FC<AchievementToastProps> = ({
  achievement,
  onClose,
}) => {
  useEffect(() => {
    if (achievement) {
      retroAudio.playAchievement();
      const timer = setTimeout(() => {
        onClose();
      }, 4200);
      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  if (!achievement) return null;

  return (
    <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-bounce">
      <div className="pixel-box-gold px-4 py-2 flex items-center gap-3 bg-[#190d2e] max-w-sm sm:max-w-md shadow-2xl">
        <span className="text-2xl animate-spin" style={{ animationDuration: "3s" }}>
          {achievement.icon}
        </span>
        <div>
          <div className="text-[10px] sm:text-xs text-retro-gold font-pixel tracking-wider">
            ACHIEVEMENT UNLOCKED!
          </div>
          <div className="text-sm sm:text-base text-white font-silkscreen font-bold tracking-wide">
            {achievement.title}
          </div>
        </div>
      </div>
    </div>
  );
};

