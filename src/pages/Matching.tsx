import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, RotateCcw, ExternalLink, X, Sparkles, GraduationCap } from "lucide-react";
import { getCoursesBySubject, searchCoursesByInterests, type Course } from "@/data/coursesData";
import TinderCard from "react-tinder-card";
import { ShareButton } from "@/components/ShareButton";
import { EmailCaptureModal } from "@/components/EmailCaptureModal";
import { MatchToast } from "@/components/MatchToast";
import { FirstMatchModal } from "@/components/FirstMatchModal";
import confetti from "canvas-confetti";

const Matching = () => {
  // Check if loading has been shown BEFORE initial render to prevent flash
  const hasSeenLoading = sessionStorage.getItem("matchingLoadingShown");

  const [showResult, setShowResult] = useState(hasSeenLoading === "true");
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastDirection, setLastDirection] = useState<string | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastCourse, setToastCourse] = useState<Course | null>(null);
  const [showFirstMatchModal, setShowFirstMatchModal] = useState(false);
  const [firstMatchCourse, setFirstMatchCourse] = useState<Course | null>(null);
  const navigate = useNavigate();
  const subject = localStorage.getItem("selectedSubject") || "Business and Management";
  const name = localStorage.getItem("studentName") || "Student";
  const programLevel = localStorage.getItem("programLevel") || "undergraduate";
  const skillAnswers = JSON.parse(localStorage.getItem("skillAnswers") || "[]");

  // Filter courses based on program level
  const filterCoursesByLevel = (courses: Course[]) => {
    if (programLevel === "undergraduate") {
      return courses.filter(course =>
        course.name.startsWith("BSc") ||
        course.name.startsWith("BEng") ||
        course.name.startsWith("BA")
      );
    } else {
      return courses.filter(course =>
        course.name.startsWith("M") &&
        !course.name.startsWith("MA")
      );
    }
  };

  // Get course matches based on subject and skills
  const allCourses = filterCoursesByLevel(getCoursesBySubject(subject));
  const matchedByInterests = filterCoursesByLevel(searchCoursesByInterests(subject, skillAnswers));

  // Prioritize courses matched by interests, then fill with general subject courses
  const suggestedCourses = matchedByInterests.length > 0
    ? matchedByInterests.slice(0, 3)
    : allCourses.slice(0, 3);

  const childRefs = useRef<any[]>(suggestedCourses.map(() => React.createRef()));

  // Animated loading with progress - only show on first visit
  useEffect(() => {
    // If already seen loading (checked in initial state), do nothing
    if (hasSeenLoading) {
      return;
    }

    // First time visiting matching page - show loading animation
    sessionStorage.setItem("matchingLoadingShown", "true");

    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    const timer = setTimeout(() => {
      setShowResult(true);
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [hasSeenLoading]);

  // Show email modal when matching is complete and user has selected courses
  useEffect(() => {
    if (currentIndex >= suggestedCourses.length && selectedCourses.length > 0) {
      const hasEmail = localStorage.getItem("userEmail");
      if (!hasEmail) {
        const timer = setTimeout(() => {
          setShowEmailModal(true);
        }, 2500);
        return () => clearTimeout(timer);
      }
    }
  }, [currentIndex, selectedCourses.length, suggestedCourses.length]);

  const onSwipe = (direction: string, course: Course) => {
    setLastDirection(direction);

    if (direction === 'right') {
      // Add course to selected
      setSelectedCourses(prev => [...prev, course]);

      // Haptic feedback for mobile devices
      if ('vibrate' in navigator) {
        navigator.vibrate(50); // 50ms gentle vibration
      }

      // Check if this is the first match
      const isFirstMatch = selectedCourses.length === 0;

      if (isFirstMatch) {
        // First match - show full celebration modal
        setFirstMatchCourse(course);
        setShowFirstMatchModal(true);
        // Fire confetti
        fireConfetti();
      } else {
        // Subsequent matches - show toast + confetti
        setToastCourse(course);
        setShowToast(true);
        // Fire smaller confetti burst
        fireConfetti(false);
      }
    }

    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setLastDirection(null);
    }, 600);
  };

  // Confetti animation function
  const fireConfetti = (large: boolean = true) => {
    const colors = ['#cd1f80', '#fddb35', '#ffd700', '#ffffff'];

    if (large) {
      // Large celebration for first match
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
    } else {
      // Quick burst for subsequent matches
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors
      });
    }
  };

  const swipe = async (dir: string) => {
    if (currentIndex < suggestedCourses.length && childRefs.current[currentIndex]) {
      await childRefs.current[currentIndex].current.swipe(dir);
    }
  };

  const handleViewCourses = () => {
    if (selectedCourses.length > 0) {
      localStorage.setItem("matchedCourses", JSON.stringify(selectedCourses));
      navigate("/course-details");
    }
  };

  const handleSkipAll = () => {
    setCurrentIndex(suggestedCourses.length);
  };

  const handleChat = () => {
    navigate("/chat");
  };

  const handleRestart = () => {
    localStorage.clear();
    sessionStorage.clear(); // Clear session storage to show loading animation on restart
    navigate("/");
  };

  // Loading State with Modern Animation
  if (!showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#cd1f80] via-[#a01866] to-[#1a0a2e] flex items-center justify-center p-6 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-[#fddb35] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#cd1f80] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>
        </div>

        <div className="text-center relative z-10 max-w-md w-full">
          {/* Animated Icon Stack */}
          <div className="relative w-40 h-40 mx-auto mb-8">
            {/* Rotating Background Circle */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#fddb35] to-[#ffd700] opacity-20 animate-spin" style={{ animationDuration: '3s' }}></div>

            {/* Pulsing Rings */}
            <div className="absolute inset-0 rounded-full border-4 border-[#fddb35] opacity-40 animate-ping"></div>
            <div className="absolute inset-4 rounded-full border-4 border-white opacity-30 animate-ping" style={{ animationDelay: '0.5s' }}></div>

            {/* Center Icons */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <GraduationCap className="w-20 h-20 text-[#fddb35] animate-bounce" />
                <Sparkles className="w-8 h-8 text-white absolute -top-2 -right-2 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Loading Text */}
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 animate-pulse">
            Finding your perfect match...
          </h2>
          <p className="text-base sm:text-lg text-white/80 mb-6">
            Analyzing your preferences & matching courses
          </p>

          {/* Progress Bar */}
          <div className="w-full max-w-xs mx-auto">
            <div className="h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-[#fddb35] via-[#ffd700] to-[#fddb35] transition-all duration-300 ease-out relative"
                style={{ width: `${loadingProgress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
              </div>
            </div>
            <p className="text-white/60 text-sm mt-2">{loadingProgress}%</p>
          </div>

          {/* Fun Facts */}
          <div className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
            <p className="text-white/90 text-sm italic">
              "University of Lincoln has over 150+ undergraduate courses across 8 schools!"
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#cd1f80] via-[#a01866] to-[#1a0a2e] p-4 sm:p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 sm:w-80 sm:h-80 bg-[#fddb35] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 sm:w-80 sm:h-80 bg-[#cd1f80] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10 pt-6 sm:pt-10 pb-6">
        {/* Progress Indicator - Step 3 of 3 */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-1 bg-[#fddb35] rounded-full"></div>
          <div className="w-8 h-1 bg-[#fddb35] rounded-full"></div>
          <div className="w-8 h-1 bg-[#fddb35] rounded-full"></div>
        </div>

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 leading-tight">
            {currentIndex < suggestedCourses.length ? (
              <>Your Perfect Matches!</>
            ) : (
              <>All Done, {name}! 🎉</>
            )}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/90">
            {currentIndex < suggestedCourses.length ? (
              <>Swipe right to match, left to pass</>
            ) : (
              <>You've reviewed all courses</>
            )}
          </p>
          {currentIndex < suggestedCourses.length && (
            <div className="inline-flex items-center gap-2 bg-[#fddb35]/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#fddb35]/30 mt-3">
              <span className="text-[#fddb35] text-sm font-bold">
                {currentIndex + 1} of {suggestedCourses.length}
              </span>
            </div>
          )}
        </div>

        {/* Card Stack Container */}
        <div className="relative w-full max-w-md mx-auto mb-6 sm:mb-8" style={{ height: 'clamp(550px, 75vh, 650px)' }}>
          {currentIndex >= suggestedCourses.length ? (
            // Completion State
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-6 animate-in fade-in zoom-in duration-700">
                <div className="relative w-32 h-32 mx-auto">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#fddb35] to-[#ffd700] animate-pulse"></div>
                  <div className="absolute inset-2 rounded-full bg-white flex items-center justify-center">
                    <Heart className="w-16 h-16 text-[#cd1f80] fill-[#cd1f80] animate-bounce" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                    All courses reviewed!
                  </h3>
                  <p className="text-white/90 text-base sm:text-lg">
                    You matched with <span className="text-[#fddb35] font-bold">{selectedCourses.length}</span> {selectedCourses.length === 1 ? 'course' : 'courses'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // Swipeable Card Stack
            <div className="relative w-full h-full">
              {/* Background Stack Effect - Show next cards underneath */}
              {suggestedCourses.map((_, index) => {
                if (index < currentIndex) return null;
                if (index > currentIndex + 2) return null;

                const offset = index - currentIndex;
                const scale = 1 - (offset * 0.05);
                const yOffset = offset * 10;
                const opacity = 1 - (offset * 0.3);

                return (
                  <div
                    key={`bg-${index}`}
                    className="absolute inset-0 transition-all duration-300 ease-out pointer-events-none"
                    style={{
                      transform: `translateY(${yOffset}px) scale(${scale})`,
                      opacity: opacity,
                      zIndex: 10 - offset,
                    }}
                  >
                    <div className="w-full h-full rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20 shadow-2xl"></div>
                  </div>
                );
              })}

              {/* Active Swipeable Card */}
              {suggestedCourses.map((course, index) => {
                if (index !== currentIndex) return null;

                return (
                  <TinderCard
                    ref={childRefs.current[index]}
                    key={course.name}
                    onSwipe={(dir) => onSwipe(dir, course)}
                    preventSwipe={['up', 'down']}
                    className="absolute inset-0"
                    swipeRequirementType="position"
                    swipeThreshold={100}
                    flickOnSwipe={true}
                  >
                    <div className="w-full h-full rounded-[2rem] sm:rounded-[2.5rem] relative overflow-hidden shadow-2xl group cursor-grab active:cursor-grabbing">
                      {/* Card Gradient Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a2e] via-[#2d1b3d] to-[#1a0a2e]"></div>

                      {/* Overlay Pattern */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(253,219,53,0.1),transparent)]"></div>

                      {/* Like/Nope Overlays */}
                      <div className="absolute inset-0 flex items-start justify-between p-8 sm:p-12 pointer-events-none z-20">
                        {/* NOPE - Left */}
                        <div className="transform -rotate-12 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                          <div className="px-6 py-3 border-4 border-red-500 rounded-2xl">
                            <span className="text-red-500 font-black text-3xl sm:text-4xl">NOPE</span>
                          </div>
                        </div>

                        {/* LIKE - Right */}
                        <div className="transform rotate-12 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                          <div className="px-6 py-3 border-4 border-[#00ff00] rounded-2xl">
                            <span className="text-[#00ff00] font-black text-3xl sm:text-4xl">LIKE</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="relative h-full flex flex-col justify-between p-6 sm:p-8 text-white z-10">
                        {/* Top Section - Course Title */}
                        <div className="space-y-3">
                          <div className="inline-flex items-center gap-2 bg-[#fddb35]/30 px-3 py-1 rounded-full border border-[#fddb35]/50">
                            <GraduationCap className="w-4 h-4 text-[#fddb35]" />
                            <span className="text-[#fddb35] text-xs sm:text-sm font-bold">University of Lincoln</span>
                          </div>
                          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white drop-shadow-lg leading-tight">
                            {course.name}
                          </h3>
                        </div>

                        {/* Bottom Section - Course Details */}
                        <div className="space-y-4">
                          <p className="text-sm sm:text-base text-white/90 leading-relaxed line-clamp-3">
                            {course.description}
                          </p>

                          {/* Interest Tags */}
                          <div className="flex flex-wrap gap-2">
                            {course.interests.slice(0, 4).map((interest, i) => (
                              <div key={i} className="bg-white/25 rounded-full px-3 py-1 border border-white/40">
                                <p className="text-xs sm:text-sm font-semibold">{interest}</p>
                              </div>
                            ))}
                          </div>

                          {/* Entry Requirements */}
                          {course.entryGrades && (
                            <div className="inline-flex items-center gap-2 bg-[#cd1f80]/40 rounded-full px-4 py-2 border border-[#cd1f80]/60">
                              <Sparkles className="w-4 h-4 text-[#fddb35]" />
                              <p className="text-sm sm:text-base font-bold">Entry: {course.entryGrades} UCAS points</p>
                            </div>
                          )}

                          {/* View Details Link */}
                          {course.link && (
                            <a
                              href={course.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 active:bg-white/35 rounded-full px-4 py-2 border border-white/40 transition-all duration-300 group"
                            >
                              <span className="text-sm sm:text-base font-semibold">View Full Details</span>
                              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </TinderCard>
                );
              })}
            </div>
          )}
        </div>

        {/* Swipe Action Buttons */}
        {currentIndex < suggestedCourses.length && (
          <div className="flex justify-center items-center gap-4 sm:gap-6 mb-6 sm:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Pass Button */}
            <button
              onClick={() => swipe('left')}
              className="group relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/15 hover:bg-red-500/20 active:scale-90 border-2 border-white/40 hover:border-red-500 flex items-center justify-center transition-all duration-300 shadow-xl"
              aria-label="Pass on this course"
            >
              <X className="w-8 h-8 sm:w-10 sm:h-10 text-white group-hover:text-red-500 transition-colors stroke-[3]" />
            </button>

            {/* Info Button */}
            <button
              onClick={handleChat}
              className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/15 hover:bg-white/25 active:scale-90 border-2 border-white/40 flex items-center justify-center transition-all duration-300"
              aria-label="Chat with advisor"
            >
              <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white transition-colors" />
            </button>

            {/* Like Button */}
            <button
              onClick={() => swipe('right')}
              className="group relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#fddb35] to-[#ffd700] hover:from-[#ffd700] hover:to-[#fddb35] active:scale-90 flex items-center justify-center transition-all duration-300 shadow-2xl hover:shadow-[0_0_30px_rgba(253,219,53,0.5)]"
              aria-label="Like this course"
            >
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-[#cd1f80] fill-[#cd1f80] group-hover:scale-110 transition-transform" />
            </button>
          </div>
        )}

        {/* Helper Text for Active Swiping */}
        {currentIndex < suggestedCourses.length && (
          <div className="bg-white/15 rounded-2xl sm:rounded-3xl p-4 sm:p-5 mb-4 border border-white/30 shadow-lg animate-in fade-in duration-700">
            <p className="text-sm sm:text-base text-white/90 text-center leading-relaxed">
              <span className="font-bold text-[#fddb35]">Pro tip:</span> Drag the card or use the buttons below!
            </p>
          </div>
        )}

        {/* Action Buttons - WHILE SWIPING */}
        {currentIndex < suggestedCourses.length && (
          <div className="space-y-3">
            <button
              onClick={handleSkipAll}
              className="w-full h-12 sm:h-14 px-6 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base bg-white/15 hover:bg-white/25 active:bg-white/35 text-white border-2 border-white/40 hover:border-white/50 transition-all duration-300 shadow-lg active:scale-95"
            >
              Skip All Courses
            </button>
          </div>
        )}

        {/* Action Buttons - AFTER MATCHING */}
        {currentIndex >= suggestedCourses.length && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {/* Primary CTA */}
            {selectedCourses.length > 0 ? (
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#fddb35] to-[#ffd700] rounded-xl sm:rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <button
                  onClick={handleViewCourses}
                  className="relative w-full h-14 sm:h-16 px-6 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg md:text-xl bg-gradient-to-r from-[#cd1f80] to-[#a01866] hover:from-[#a01866] hover:to-[#cd1f80] text-white shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
                >
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 fill-white" />
                  <span>Explore My {selectedCourses.length} {selectedCourses.length === 1 ? 'Match' : 'Matches'}</span>
                </button>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <p className="text-white/90 text-center">
                  No courses selected. Try swiping right to match!
                </p>
              </div>
            )}

            {/* Share Button */}
            {selectedCourses.length > 0 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <ShareButton
                  courseName={selectedCourses[0]?.name || "My Course Match"}
                  courseId={selectedCourses[0]?.name.toLowerCase().replace(/\s+/g, '-')}
                />
              </div>
            )}

            {/* Secondary Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleChat}
                className="h-12 sm:h-14 px-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base bg-[#fddb35] hover:bg-[#ffd700] text-[#1a0a2e] shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Chat</span>
              </button>

              <button
                onClick={handleRestart}
                className="h-12 sm:h-14 px-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base bg-white/15 hover:bg-white/25 active:bg-white/35 text-white border-2 border-white/40 hover:border-white/50 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg active:scale-95"
              >
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Restart</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Email Capture Modal */}
      <EmailCaptureModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        matchedCourses={selectedCourses}
      />

      {/* Toast Notification for Subsequent Matches */}
      {showToast && toastCourse && (
        <MatchToast
          message="Course Added!"
          courseName={toastCourse.name}
          onClose={() => setShowToast(false)}
          duration={2000}
        />
      )}

      {/* First Match Celebration Modal */}
      {showFirstMatchModal && firstMatchCourse && (
        <FirstMatchModal
          course={firstMatchCourse}
          onContinue={() => setShowFirstMatchModal(false)}
        />
      )}
    </div>
  );
};

export default Matching;
