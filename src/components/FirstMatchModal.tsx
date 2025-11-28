import { useEffect } from "react";
import { Heart, Sparkles, ChevronRight } from "lucide-react";
import { Course } from "@/data/coursesData";

interface FirstMatchModalProps {
  course: Course;
  onContinue: () => void;
}

export const FirstMatchModal = ({ course, onContinue }: FirstMatchModalProps) => {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onContinue} />

      {/* Modal */}
      <div className="relative bg-gradient-to-br from-[#cd1f80] via-[#a01866] to-[#1a0a2e] rounded-3xl shadow-2xl border-2 border-white/20 max-w-md w-full mx-auto animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[#fddb35] rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#fddb35] rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse delay-700"></div>
        </div>

        <div className="relative p-6 sm:p-8">
          {/* Header with Icon */}
          <div className="flex flex-col items-center text-center mb-6">
            {/* Celebration Icon */}
            <div className="relative mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#fddb35] to-[#ffd700] flex items-center justify-center shadow-2xl animate-in zoom-in duration-700 delay-200">
                <Heart className="w-10 h-10 text-[#cd1f80] fill-[#cd1f80]" />
              </div>
              {/* Sparkle Effects */}
              <div className="absolute -top-1 -right-1 animate-in zoom-in duration-500 delay-500">
                <Sparkles className="w-6 h-6 text-[#fddb35] fill-[#fddb35]" />
              </div>
              <div className="absolute -bottom-1 -left-1 animate-in zoom-in duration-500 delay-700">
                <Sparkles className="w-5 h-5 text-[#fddb35] fill-[#fddb35]" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 animate-in slide-in-from-bottom-4 duration-500 delay-300">
              Great Choice! 🎓
            </h2>
            <p className="text-white/90 text-sm sm:text-base animate-in slide-in-from-bottom-4 duration-500 delay-400">
              You've matched with your first course
            </p>
          </div>

          {/* Course Info */}
          <div className="bg-white/10 rounded-2xl p-4 mb-6 border border-white/20 animate-in slide-in-from-bottom-4 duration-500 delay-500">
            <h3 className="text-white font-bold text-base sm:text-lg mb-2 leading-tight">
              {course.name}
            </h3>
            <p className="text-white/80 text-xs sm:text-sm line-clamp-2">
              {course.description}
            </p>
          </div>

          {/* Tutorial Message */}
          <div className="bg-[#fddb35]/20 rounded-xl p-4 mb-6 border border-[#fddb35]/30 animate-in slide-in-from-bottom-4 duration-500 delay-600">
            <p className="text-white text-sm sm:text-base leading-relaxed">
              <span className="font-bold">Keep swiping</span> to discover more courses that match your interests. Swipe <span className="font-bold text-[#fddb35]">right</span> to like, <span className="font-bold text-white/70">left</span> to pass.
            </p>
          </div>

          {/* Continue Button */}
          <button
            onClick={onContinue}
            className="w-full h-14 rounded-2xl font-bold text-base sm:text-lg bg-gradient-to-r from-[#fddb35] to-[#ffd700] hover:from-[#ffd700] hover:to-[#fddb35] text-[#1a0a2e] shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 animate-in slide-in-from-bottom-4 duration-500 delay-700"
            aria-label="Continue swiping"
          >
            <span>Continue Swiping</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
