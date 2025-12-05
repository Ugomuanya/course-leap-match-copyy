import { useEffect, useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";

interface CelebrationScreenProps {
  name: string;
  matchCount: number;
  onContinue: () => void;
  autoAdvanceDelay?: number; // milliseconds, default 3000
}

export const CelebrationScreen = ({
  name,
  matchCount,
  onContinue,
  autoAdvanceDelay = 3000
}: CelebrationScreenProps) => {
  const [countdown, setCountdown] = useState(Math.floor(autoAdvanceDelay / 1000));
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Fire celebration confetti
    const colors = ['#cd1f80', '#fddb35', '#ffd700', '#ffffff'];

    const duration = 2500;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50;

      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: {
          x: randomInRange(0.1, 0.3),
          y: Math.random() - 0.2
        },
        colors: colors
      });

      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        origin: {
          x: randomInRange(0.7, 0.9),
          y: Math.random() - 0.2
        },
        colors: colors
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Show button after 1 second
    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 1000);

    // Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Auto-advance after delay
    const autoAdvanceTimer = setTimeout(() => {
      onContinue();
    }, autoAdvanceDelay);

    return () => {
      clearTimeout(buttonTimer);
      clearTimeout(autoAdvanceTimer);
      clearInterval(countdownInterval);
    };
  }, [autoAdvanceDelay, onContinue]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center py-8 sm:py-12 animate-in fade-in zoom-in duration-700">
      {/* Floating Sparkles */}
      <div className="absolute top-10 left-1/4 animate-pulse">
        <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-[#fddb35]" />
      </div>
      <div className="absolute top-20 right-1/4 animate-pulse delay-300">
        <Sparkles className="w-5 h-5 sm:w-7 sm:h-7 text-[#ffd700]" />
      </div>
      <div className="absolute bottom-32 left-1/3 animate-pulse delay-500">
        <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
      </div>

      {/* Main Content */}
      <div className="text-center space-y-6 sm:space-y-8 px-4">
        {/* Animated Heart Icon */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 mx-auto animate-in zoom-in duration-500">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#fddb35] to-[#ffd700] animate-pulse"></div>
          <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
            <Heart className="w-14 h-14 sm:w-20 sm:h-20 text-[#cd1f80] fill-[#cd1f80] animate-bounce" />
          </div>
        </div>

        {/* Celebration Text */}
        <div className="space-y-3 sm:space-y-4 animate-in slide-in-from-bottom-4 duration-700 delay-300">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
            All Done, {name}! 🎉
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/90">
            You've reviewed all courses
          </p>
        </div>

        {/* Match Count Highlight */}
        <div className="inline-block animate-in fade-in duration-700 delay-500">
          <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl px-6 sm:px-8 py-4 sm:py-5 border-2 border-white/30 shadow-2xl">
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1">
              All courses reviewed!
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-black">
              <span className="text-white">You matched with </span>
              <span className="text-[#fddb35]">{matchCount}</span>
              <span className="text-white"> {matchCount === 1 ? 'course' : 'courses'}</span>
            </p>
          </div>
        </div>

        {/* Continue Button with Countdown */}
        {showButton && (
          <div className="pt-4 sm:pt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Button
              onClick={onContinue}
              className="h-14 sm:h-16 px-8 sm:px-12 rounded-2xl font-bold text-base sm:text-lg md:text-xl bg-gradient-to-r from-[#cd1f80] to-[#a01866] hover:from-[#a01866] hover:to-[#cd1f80] text-white shadow-2xl hover:scale-105 transition-all duration-300 active:scale-95"
            >
              {countdown > 0 ? (
                <>Continue in {countdown}s</>
              ) : (
                <>Continue to Your Matches</>
              )}
            </Button>

            <p className="text-xs sm:text-sm text-white/60 mt-3">
              Or wait {countdown}s for auto-advance
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
