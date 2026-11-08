"use client";

import React, { useState } from "react";
import { realisticAudio } from "./RealisticAudio";

interface SaveCardButtonProps {
  userName: string;
}

export const SaveCardButton: React.FC<SaveCardButtonProps> = ({ userName }) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const cleanName = (userName || "Dear Friend").trim();

  const handleDownload = () => {
    setIsGenerating(true);
    realisticAudio.playClick();

    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setIsGenerating(false);
      return;
    }

    // 1. Deep Midnight Navy Background with Radial Glow
    const bgGrad = ctx.createRadialGradient(540, 480, 50, 540, 540, 720);
    bgGrad.addColorStop(0, "#1c0d38");
    bgGrad.addColorStop(0.5, "#100824");
    bgGrad.addColorStop(1, "#060814");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1080, 1080);

    // 2. Star dust & golden bokeh dots
    ctx.fillStyle = "#FFD700";
    for (let i = 0; i < 90; i++) {
      const rx = Math.random() * 1080;
      const ry = Math.random() * 1080;
      const r = Math.random() * 2 + 0.8;
      ctx.globalAlpha = Math.random() * 0.7 + 0.2;
      ctx.beginPath();
      ctx.arc(rx, ry, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // 3. Ornate Double Gold Border
    ctx.strokeStyle = "#FFD700";
    ctx.lineWidth = 3;
    ctx.strokeRect(50, 50, 980, 980);

    ctx.strokeStyle = "#FFB84D";
    ctx.lineWidth = 1;
    ctx.strokeRect(62, 62, 956, 956);

    // Corner Accents
    const drawCorner = (x: number, y: number) => {
      ctx.fillStyle = "#FFD700";
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
    };
    drawCorner(50, 50);
    drawCorner(1030, 50);
    drawCorner(50, 1030);
    drawCorner(1030, 1030);

    // 4. Central Diya Illustration on Canvas
    const cx = 540;
    const cy = 240;

    // Diya Ambient Halo
    const halo = ctx.createRadialGradient(cx, cy - 20, 10, cx, cy - 20, 110);
    halo.addColorStop(0, "rgba(255, 140, 0, 0.65)");
    halo.addColorStop(0.5, "rgba(255, 215, 0, 0.25)");
    halo.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(cx, cy - 20, 110, 0, Math.PI * 2);
    ctx.fill();

    // Diya Flame Outer
    ctx.fillStyle = "#FF6B00";
    ctx.beginPath();
    ctx.moveTo(cx, cy - 80);
    ctx.bezierCurveTo(cx - 24, cy - 40, cx - 30, cy - 10, cx, cy - 10);
    ctx.bezierCurveTo(cx + 30, cy - 10, cx + 24, cy - 40, cx, cy - 80);
    ctx.fill();

    // Diya Flame Inner Core
    ctx.fillStyle = "#FFF9C4";
    ctx.beginPath();
    ctx.moveTo(cx, cy - 65);
    ctx.bezierCurveTo(cx - 14, cy - 35, cx - 18, cy - 12, cx, cy - 12);
    ctx.bezierCurveTo(cx + 18, cy - 12, cx + 14, cy - 35, cx, cy - 65);
    ctx.fill();

    // Diya Bowl
    const bowlGrad = ctx.createLinearGradient(cx - 70, cy, cx + 70, cy + 50);
    bowlGrad.addColorStop(0, "#FFD700");
    bowlGrad.addColorStop(0.5, "#FF8F00");
    bowlGrad.addColorStop(1, "#8A4A00");
    ctx.fillStyle = bowlGrad;
    ctx.beginPath();
    ctx.moveTo(cx - 65, cy);
    ctx.quadraticCurveTo(cx, cy + 60, cx + 65, cy);
    ctx.quadraticCurveTo(cx, cy + 12, cx - 65, cy);
    ctx.fill();

    // Diya Rim
    ctx.strokeStyle = "#FFE082";
    ctx.lineWidth = 3;
    ctx.stroke();

    // 5. Typography
    ctx.textAlign = "center";

    // "SHUBH DEEPAVALI"
    ctx.fillStyle = "#FFB84D";
    ctx.font = "600 24px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("✦  SHUBH DEEPAVALI 2026  ✦", 540, 360);

    // "Happy Diwali, [USER NAME]!"
    ctx.fillStyle = "#FFE685";
    ctx.font = "bold 52px 'Cinzel Decorative', 'Playfair Display', serif";
    ctx.fillText(`Happy Diwali, ${cleanName}!`, 540, 440);

    // Gold Divider line
    ctx.strokeStyle = "#FFD700";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(340, 480);
    ctx.lineTo(740, 480);
    ctx.stroke();

    // Festive Blessing
    ctx.fillStyle = "#FFF8E1";
    ctx.font = "italic 300 28px 'Playfair Display', serif";
    ctx.fillText('"May your life shine brighter than a thousand diyas.', 540, 545);
    ctx.fillText('May happiness, prosperity and love light up every moment."', 540, 590);

    // Sanskrit Shloka
    ctx.fillStyle = "#FFB84D";
    ctx.font = "400 20px 'Playfair Display', serif";
    ctx.fillText("ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय ।", 540, 675);

    // Signature Card Box
    ctx.fillStyle = "rgba(22, 11, 45, 0.85)";
    ctx.strokeStyle = "rgba(255, 215, 0, 0.5)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(220, 740, 640, 180, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#FFB84D";
    ctx.font = "500 20px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("WITH LOVE AND WARM WISHES,", 540, 800);

    ctx.fillStyle = "#FFD700";
    ctx.font = "bold 38px 'Cinzel Decorative', 'Playfair Display', serif";
    ctx.fillText("KIRAN PARIKH & FAMILY", 540, 855);

    ctx.fillStyle = "#FFE082";
    ctx.font = "300 16px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("PEACE • PROSPERITY • JOY • HEALTH", 540, 895);

    // 6. Convert to image and trigger download
    try {
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `Happy_Diwali_${cleanName.replace(/\s+/g, "_")}_Kiran_Parikh.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      // Safe catch
    }

    setIsGenerating(false);
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isGenerating}
      className="px-6 py-3.5 rounded-full text-xs sm:text-sm tracking-wider font-bold text-yellow-100 border border-diwali-royalGold/40 hover:border-diwali-royalGold bg-diwali-deepPurple/50 hover:bg-diwali-deepPurple/80 transition-all duration-300 shadow-xl flex items-center gap-2"
      title="Download personalized Diwali greeting card image"
    >
      <span>🖼️</span>
      <span>{isGenerating ? "Creating Card..." : "Save Card"}</span>
    </button>
  );
};

