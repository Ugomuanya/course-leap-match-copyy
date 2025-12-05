import { Heart, MessageCircle, RotateCcw } from "lucide-react";
import { InlineEmailCapture } from "@/components/InlineEmailCapture";
import { ShareButton } from "@/components/ShareButton";
import type { Course } from "@/data/coursesData";

interface ActionsScreenProps {
  matchCount: number;
  selectedCourses: Course[];
  onViewMatches: () => void;
  onChat: () => void;
  onRestart: () => void;
}

export const ActionsScreen = ({
  matchCount,
  selectedCourses,
  onViewMatches,
  onChat,
  onRestart
}: ActionsScreenProps) => {
  return (
    <div className="relative w-full h-full flex flex-col animate-in fade-in slide-in-from-right duration-700">
      {/* Header Summary */}
      <div className="flex-shrink-0 text-center mb-4 sm:mb-6 px-4 animate-in fade-in slide-in-from-top duration-500">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-1 sm:mb-2">
          Your {matchCount} {matchCount === 1 ? 'Match' : 'Matches'} {matchCount === 1 ? 'is' : 'are'} Ready! 🎯
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-white/80">
          Let's explore your perfect course {matchCount === 1 ? 'match' : 'matches'}
        </p>
      </div>

      {/* Actions Container - Takes remaining space */}
      <div className="flex-1 flex flex-col justify-center px-4 pb-4 min-h-0">
        <div className="max-w-2xl mx-auto w-full space-y-4">
          {/* Primary CTA - Explore Matches - HIGH CONTRAST */}
          {selectedCourses.length > 0 ? (
            <div className="relative group animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Glowing yellow background for visibility */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#fddb35] to-[#ffd700] rounded-2xl sm:rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              <button
                onClick={onViewMatches}
                className="relative w-full h-14 sm:h-16 md:h-20 px-4 sm:px-6 md:px-8 rounded-2xl sm:rounded-3xl font-black text-base sm:text-lg md:text-xl bg-gradient-to-r from-[#fddb35] to-[#ffd700] hover:from-[#ffd700] hover:to-[#fddb35] text-[#1a0a2e] shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 active:scale-95 border-4 border-white/30"
              >
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 fill-[#cd1f80]" />
                <span>Explore My {matchCount} {matchCount === 1 ? 'Match' : 'Matches'}</span>
              </button>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 animate-in fade-in duration-500">
              <p className="text-white/90 text-center">
                No courses selected. Try swiping right to match!
              </p>
            </div>
          )}

          {/* Inline Email Capture - Non-intrusive */}
          {selectedCourses.length > 0 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              <InlineEmailCapture
                matchedCourses={selectedCourses}
                onEmailSubmitted={() => {
                  // Email captured successfully
                }}
              />
            </div>
          )}

          {/* Share Button */}
          {selectedCourses.length > 0 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              <ShareButton
                courseName={selectedCourses[0]?.name || "My Course Match"}
                courseId={selectedCourses[0]?.name.toLowerCase().replace(/\s+/g, '-')}
              />
            </div>
          )}

          {/* Secondary Actions Grid */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
            <button
              onClick={onChat}
              className="h-11 sm:h-12 md:h-14 px-3 sm:px-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm md:text-base bg-[#fddb35] hover:bg-[#ffd700] text-[#1a0a2e] shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Chat</span>
            </button>

            <button
              onClick={onRestart}
              className="h-11 sm:h-12 md:h-14 px-3 sm:px-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm md:text-base bg-white/15 hover:bg-white/25 active:bg-white/35 text-white border-2 border-white/40 hover:border-white/50 transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg active:scale-95"
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Start Fresh</span>
              <span className="sm:hidden">Restart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
