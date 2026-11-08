"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { RealisticFireworks, FireworksHandle } from "@/components/RealisticFireworks";
import { FloatingPetalsAndDust } from "@/components/FloatingPetalsAndDust";
import { HangingLanterns } from "@/components/HangingLanterns";
import { SoundToggle } from "@/components/SoundToggle";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { CelebrationScreen } from "@/components/CelebrationScreen";
import { realisticAudio } from "@/components/RealisticAudio";

function DiwaliGreetingApp() {
  const searchParams = useSearchParams();
  const fireworksRef = useRef<FireworksHandle>(null);

  const [currentScreen, setCurrentScreen] = useState<"welcome" | "celebration">("welcome");
  const [userName, setUserName] = useState<string>("");
  const [isScreenGlow, setIsScreenGlow] = useState(false);

  // Check URL query parameters for pre-filled recipient name (e.g., ?name=Aarav)
  useEffect(() => {
    const paramName = searchParams?.get("name");
    if (paramName) {
      setUserName(paramName.trim());
    }
  }, [searchParams]);

  // Global unlock for Web Audio on first user interaction (tap, click, keydown, scroll)
  useEffect(() => {
    const handleFirstInteraction = () => {
      realisticAudio.initOnUserGesture();
    };

    window.addEventListener("click", handleFirstInteraction, { passive: true });
    window.addEventListener("touchstart", handleFirstInteraction, { passive: true });
    window.addEventListener("pointerdown", handleFirstInteraction, { passive: true });
    window.addEventListener("keydown", handleFirstInteraction, { passive: true });

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
    };
  }, []);

  // Occasional festive firecracker bursts in the background
  useEffect(() => {
    if (currentScreen !== "celebration") return;

    const interval = setInterval(() => {
      if (!realisticAudio.getMuted() && Math.random() > 0.4) {
        realisticAudio.playFirecrackerCrackle(Math.floor(Math.random() * 5 + 4));
      }
    }, 7500);

    return () => clearInterval(interval);
  }, [currentScreen]);

  // Transition from Welcome to Celebration
  const handleStartCelebration = (enteredName: string) => {
    realisticAudio.initOnUserGesture();
    realisticAudio.playGreetingSwell();

    setUserName(enteredName);
    setIsScreenGlow(true);

    // Launch celebratory fireworks
    if (fireworksRef.current) {
      fireworksRef.current.launchFinale(7);
    }

    // Smooth cinematic transition
    setTimeout(() => {
      setCurrentScreen("celebration");
      setIsScreenGlow(false);
    }, 700);
  };

  // Celebrate Again handler
  const handleCelebrateAgain = () => {
    realisticAudio.initOnUserGesture();
    realisticAudio.playGreetingSwell();

    setIsScreenGlow(true);
    if (fireworksRef.current) {
      fireworksRef.current.launchFinale(9);
    }
    setTimeout(() => {
      setIsScreenGlow(false);
    }, 600);
  };

  // Share handler
  const handleShare = async () => {
    realisticAudio.initOnUserGesture();
    realisticAudio.playClick();

    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}${window.location.pathname}?name=${encodeURIComponent(
            userName || "Friend"
          )}`
        : "";

    const shareData = {
      title: "Happy Diwali | Kiran Parikh & Family",
      text: `🪔 Happy Diwali, ${userName || "Friend"}! Kiran Parikh & Family have sent you a magical personalized Diwali greeting:`,
      url,
    };

    if (typeof navigator !== "undefined" && navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch {
        // User cancelled share
      }
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
      } catch {
        // Clipboard fallback
      }
    }
  };

  return (
    <main
      onClick={() => realisticAudio.initOnUserGesture()}
      className="relative min-h-screen w-full bg-[#080B1A] overflow-x-hidden"
    >
      {/* 1. CINEMATIC GOLDEN SCREEN GLOW TRANSITION */}
      {isScreenGlow && (
        <div className="fixed inset-0 bg-gradient-to-b from-[#FFD700]/30 via-[#FFB84D]/25 to-transparent z-50 pointer-events-none transition-opacity duration-700" />
      )}

      {/* 2. REALISTIC FIREWORKS CANVAS ENGINE (60 FPS, Additive Bloom, Multicolored) */}
      <RealisticFireworks
        ref={fireworksRef}
        interactive={true}
        intensity={currentScreen === "celebration" ? "high" : "medium"}
      />

      {/* 3. FLOATING MARIGOLD PETALS & GOLDEN PARTICLES */}
      <FloatingPetalsAndDust />

      {/* 4. HANGING DECORATIVE FESTIVE BRASS LANTERNS */}
      <HangingLanterns />

      {/* 5. LUXURY SOUND CONTROL TOGGLE (Ambient Indian Music & Pyro Sounds) */}
      <SoundToggle />

      {/* 6. SCREEN SWITCHING WITH FRAMER MOTION */}
      <AnimatePresence mode="wait">
        {currentScreen === "welcome" ? (
          <WelcomeScreen
            key="welcome"
            initialName={userName}
            onStart={handleStartCelebration}
          />
        ) : (
          <CelebrationScreen
            key="celebration"
            userName={userName}
            onCelebrateAgain={handleCelebrateAgain}
            onShare={handleShare}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#080B1A] flex items-center justify-center font-serif text-diwali-royalGold text-lg tracking-widest">
          ✦ LOADING DIWALI CELEBRATION ✦
        </div>
      }
    >
      <DiwaliGreetingApp />
    </Suspense>
  );
}
