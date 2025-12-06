import { useState, useEffect, useRef } from "react";
import { Heart, MessageCircle, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const currentCourse = selectedCourses[currentCourseIndex];
  const hasMultipleCourses = selectedCourses.length > 1;

  // Show swipe hint for 3 seconds when multiple courses
  useEffect(() => {
    if (hasMultipleCourses) {
      setShowSwipeHint(true);
      const timer = setTimeout(() => setShowSwipeHint(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [hasMultipleCourses]);

  // Touch handlers for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentCourseIndex < selectedCourses.length - 1) {
      setCurrentCourseIndex(prev => prev + 1);
    }
    if (isRightSwipe && currentCourseIndex > 0) {
      setCurrentCourseIndex(prev => prev - 1);
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const handlePrevCourse = () => {
    if (currentCourseIndex > 0) {
      setCurrentCourseIndex(prev => prev - 1);
    }
  };

  const handleNextCourse = () => {
    if (currentCourseIndex < selectedCourses.length - 1) {
      setCurrentCourseIndex(prev => prev + 1);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col animate-in fade-in slide-in-from-right duration-700">
      {/* Header Summary with Course Navigation */}
      <div className="flex-shrink-0 text-center mb-3 sm:mb-4 px-4 animate-in fade-in slide-in-from-top duration-500">
        <h2 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-1">
          Your {matchCount} {matchCount === 1 ? 'Match' : 'Matches'} {matchCount === 1 ? 'is' : 'are'} Ready! 🎯
        </h2>

        {/* Course Counter & Navigation for Multiple Matches */}
        {hasMultipleCourses && (
          <div className="flex items-center justify-center gap-3 mt-2">
            <button
              onClick={handlePrevCourse}
              disabled={currentCourseIndex === 0}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                currentCourseIndex === 0
                  ? 'bg-white/10 text-white/30 cursor-not-allowed'
                  : 'bg-white/20 hover:bg-white/30 text-white active:scale-95'
              }`}
              aria-label="Previous course"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
              <span className="text-xs sm:text-sm font-bold text-white">
                {currentCourseIndex + 1} of {selectedCourses.length}
              </span>
            </div>

            <button
              onClick={handleNextCourse}
              disabled={currentCourseIndex === selectedCourses.length - 1}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                currentCourseIndex === selectedCourses.length - 1
                  ? 'bg-white/10 text-white/30 cursor-not-allowed'
                  : 'bg-white/20 hover:bg-white/30 text-white active:scale-95'
              }`}
              aria-label="Next course"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Swipe Hint - Animated */}
        {hasMultipleCourses && showSwipeHint && (
          <div className="mt-2 animate-in fade-in slide-in-from-top duration-500">
            <p className="text-xs text-white/70 flex items-center justify-center gap-2">
              <ChevronLeft className="w-3 h-3 animate-pulse" />
              <span>Swipe to browse your matches</span>
              <ChevronRight className="w-3 h-3 animate-pulse" />
            </p>
          </div>
        )}
      </div>

      {/* Actions Container - Takes remaining space */}
      <div className="flex-1 flex flex-col justify-center px-4 pb-4 min-h-0">
        <div className="max-w-2xl mx-auto w-full space-y-3">
          {/* Course Preview Card - Swipeable for Multiple Matches */}
          {selectedCourses.length > 0 && (
            <div
              ref={carouselRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="relative overflow-hidden rounded-2xl"
            >
              <div
                className="flex transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${currentCourseIndex * 100}%)` }}
              >
                {selectedCourses.map((course, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/20"
                  >
                    <h3 className="text-sm sm:text-base font-bold text-white mb-1 line-clamp-2">
                      {course.name}
                    </h3>
                    <p className="text-xs text-white/70 line-clamp-2 mb-2">
                      {course.description}
                    </p>
                    {course.entryGrades && (
                      <div className="inline-flex items-center gap-1 bg-[#fddb35]/20 px-2 py-1 rounded-full">
                        <span className="text-xs font-semibold text-[#fddb35]">
                          {course.entryGrades}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Primary CTA - Explore Current Match - HIGH CONTRAST */}
          {selectedCourses.length > 0 ? (
            <div className="relative group">
              {/* Glowing yellow background for visibility */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#fddb35] to-[#ffd700] rounded-2xl sm:rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              <button
                onClick={onViewMatches}
                className="relative w-full h-12 sm:h-14 md:h-16 px-4 sm:px-6 rounded-2xl sm:rounded-3xl font-black text-sm sm:text-base md:text-lg bg-gradient-to-r from-[#fddb35] to-[#ffd700] hover:from-[#ffd700] hover:to-[#fddb35] text-[#1a0a2e] shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 border-4 border-white/30"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-[#cd1f80]" />
                <span className="truncate">
                  {hasMultipleCourses ? `View ${currentCourse.name.split(' ')[0]}` : `Explore My Match`}
                </span>
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

          {/* Share Button - Updates based on current course */}
          {selectedCourses.length > 0 && (
            <div key={currentCourseIndex}>
              <ShareButton
                courseName={currentCourse?.name || "My Course Match"}
                courseId={currentCourse?.name.toLowerCase().replace(/\s+/g, '-')}
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
