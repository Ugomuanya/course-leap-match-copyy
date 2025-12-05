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
      <div className="text-center mb-6 sm:mb-8 px-4 animate-in fade-in slide-in-from-top duration-500">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2">
          Your {matchCount} {matchCount === 1 ? 'Match' : 'Matches'} {matchCount === 1 ? 'is' : 'are'} Ready! 🎯
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-white/80">
          Let's explore your perfect course {matchCount === 1 ? 'match' : 'matches'}
        </p>
      </div>

      {/* Actions Container - Scrollable if needed */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Primary CTA - Explore Matches */}
          {selectedCourses.length > 0 ? (
            <div className="relative group animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-[#fddb35] to-[#ffd700] rounded-xl sm:rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <button
                onClick={onViewMatches}
                className="relative w-full h-14 sm:h-16 px-6 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg md:text-xl bg-gradient-to-r from-[#cd1f80] to-[#a01866] hover:from-[#a01866] hover:to-[#cd1f80] text-white shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
              >
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-white" />
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
          <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
            <button
              onClick={onChat}
              className="h-12 sm:h-14 px-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base bg-[#fddb35] hover:bg-[#ffd700] text-[#1a0a2e] shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Chat</span>
            </button>

            <button
              onClick={onRestart}
              className="h-12 sm:h-14 px-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base bg-white/15 hover:bg-white/25 active:bg-white/35 text-white border-2 border-white/40 hover:border-white/50 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg active:scale-95"
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
