import { useEffect } from "react";
import { X, Heart } from "lucide-react";

interface MatchToastProps {
  message: string;
  courseName: string;
  onClose: () => void;
  duration?: number;
}

export const MatchToast = ({ message, courseName, onClose, duration = 2000 }: MatchToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-5 fade-in duration-300">
      <div className="bg-gradient-to-r from-[#cd1f80] to-[#a01866] rounded-2xl shadow-2xl border-2 border-white/30 px-5 py-4 min-w-[280px] max-w-[90vw] sm:max-w-md">
        <div className="flex items-center gap-3">
          {/* Heart Icon */}
          <div className="w-10 h-10 rounded-full bg-[#fddb35] flex items-center justify-center flex-shrink-0 shadow-lg">
            <Heart className="w-5 h-5 text-[#cd1f80] fill-[#cd1f80]" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-sm sm:text-base leading-tight">
              {message}
            </p>
            <p className="text-white/80 text-xs sm:text-sm mt-0.5 truncate">
              {courseName}
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 active:bg-white/40 flex items-center justify-center transition-all duration-200 flex-shrink-0"
            aria-label="Close notification"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#fddb35] rounded-full"
            style={{
              animation: `shrink ${duration}ms linear`,
              width: '100%'
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};
