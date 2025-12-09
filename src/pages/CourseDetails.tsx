import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ExternalLink,
  GraduationCap,
  Heart,
  Sparkles,
  Calendar,
  BookOpen,
  ArrowRight,
  Mail,
  Briefcase,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Play,
  Users
} from "lucide-react";
import { EmailCaptureModal } from "@/components/EmailCaptureModal";
import { ShareButton } from "@/components/ShareButton";
import type { Course } from "@/data/coursesData";

const CourseDetails = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [matchedCourses, setMatchedCourses] = useState<Course[]>([]);
  const [showCourseStructure, setShowCourseStructure] = useState(false);
  const navigate = useNavigate();

  // Load matched courses from localStorage
  useEffect(() => {
    const storedCourses = localStorage.getItem("matchedCourses");
    if (storedCourses) {
      try {
        const courses = JSON.parse(storedCourses);
        setMatchedCourses(courses);
      } catch (error) {
        console.error("Error loading matched courses:", error);
        navigate("/matching");
      }
    } else {
      navigate("/matching");
    }
  }, [navigate]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < matchedCourses.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleApplyNow = () => {
    const course = matchedCourses[currentIndex];
    if (course.link) {
      window.open(course.link, "_blank", "noopener,noreferrer");
    }
  };

  const handleEmailClick = () => {
    setShowEmailModal(true);
  };

  const handleChatWithAdvisor = () => {
    navigate("/chat");
  };

  const handleBackToMatching = () => {
    navigate("/matching");
  };

  if (matchedCourses.length === 0) {
    return null;
  }

  const course = matchedCourses[currentIndex];
  const studentName = localStorage.getItem("studentName") || "Student";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#cd1f80] via-[#a01866] to-[#1a0a2e] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 sm:w-80 sm:h-80 bg-[#fddb35] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 sm:w-80 sm:h-80 bg-[#cd1f80] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 min-h-screen p-4 sm:p-6 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={handleBackToMatching}
            className="mb-4 sm:mb-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
            aria-label="Back to matching"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm sm:text-base font-medium">Back</span>
          </button>

          {/* Celebration Header */}
          <div className="text-center mb-8 sm:mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#fddb35] to-[#ffd700] mb-4 shadow-2xl">
              <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-[#cd1f80] fill-[#cd1f80]" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3">
              Your Perfect Match! 🎓
            </h1>
            {matchedCourses.length > 1 && (
              <p className="text-white/70 text-sm sm:text-base">
                Course {currentIndex + 1} of {matchedCourses.length}
              </p>
            )}
          </div>

          {/* Navigation Dots */}
          {matchedCourses.length > 1 && (
            <div className="flex justify-center gap-2 mb-8">
              {matchedCourses.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-[#fddb35] w-8"
                      : "bg-white/30 w-2 hover:bg-white/50"
                  }`}
                  aria-label={`Go to course ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Main Content Card */}
          <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl mb-8 overflow-hidden">
            {/* Course Header */}
            <div className="bg-gradient-to-br from-white/10 to-transparent p-6 sm:p-8 border-b border-white/10">
              {/* University Badge */}
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center gap-2 bg-[#fddb35]/20 px-4 py-2 rounded-full border border-[#fddb35]/40">
                  <GraduationCap className="w-4 h-4 text-[#fddb35]" />
                  <span className="text-[#fddb35] text-xs sm:text-sm font-bold">
                    University of Lincoln
                  </span>
                </div>
              </div>

              {/* Course Name */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white text-center mb-4 leading-tight">
                {course.name}
              </h2>

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <Calendar className="w-4 h-4 text-[#fddb35]" />
                  <span>3 years</span>
                </div>
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <BookOpen className="w-4 h-4 text-[#fddb35]" />
                  <span>Undergraduate</span>
                </div>
                {course.entryGrades && (
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <Sparkles className="w-4 h-4 text-[#fddb35]" />
                    <span>{course.entryGrades} UCAS points</span>
                  </div>
                )}
              </div>
            </div>

            {/* Course Content */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-white font-bold text-lg sm:text-xl mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#fddb35]" />
                  Overview
                </h3>
                <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                  {course.description}
                </p>
              </div>

              {/* Key Topics */}
              {course.interests && course.interests.length > 0 && (
                <div>
                  <h3 className="text-white font-bold text-lg sm:text-xl mb-3 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-[#fddb35]" />
                    What You'll Study
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {course.interests.map((interest, i) => (
                      <span
                        key={i}
                        className="bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white hover:bg-white/15 transition-colors"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Career Outcomes */}
              <div className="bg-gradient-to-br from-[#fddb35]/10 to-transparent rounded-2xl p-5 border border-[#fddb35]/20">
                <h3 className="text-white font-bold text-lg sm:text-xl mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#fddb35]" />
                  Career Prospects
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-[#fddb35] flex-shrink-0 mt-0.5" />
                    <p className="text-white/90 text-sm sm:text-base">
                      <span className="font-semibold text-[#fddb35]">95%</span>{" "}
                      of graduates employed within 6 months
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-[#fddb35] flex-shrink-0 mt-0.5" />
                    <p className="text-white/90 text-sm sm:text-base">
                      Average starting salary:{" "}
                      <span className="font-semibold text-[#fddb35]">
                        £28,000
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Video Preview */}
              <div>
                <h3 className="text-white font-bold text-lg sm:text-xl mb-3 flex items-center gap-2">
                  <Play className="w-5 h-5 text-[#fddb35]" />
                  Campus Life
                </h3>
                <div className="relative aspect-video bg-black/20 rounded-xl overflow-hidden">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/4aset4B1CE8?si=tqr2W0sLsBkRTulY"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>

              {/* Student Testimonial */}
              <div className="bg-white/5 rounded-2xl p-5 border border-white/20">
                <h3 className="text-white font-bold text-lg sm:text-xl mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#fddb35]" />
                  Student Voice
                </h3>
                <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4 italic">
                  "The hands-on approach and industry connections at Lincoln
                  gave me the skills to land my dream job before graduation!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#fddb35] to-[#ffd700] flex items-center justify-center">
                    <span className="text-[#1a0a2e] font-bold text-lg">SM</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      Sarah Mitchell
                    </p>
                    <p className="text-white/60 text-xs">
                      Class of 2023 • Software Engineer at Google
                    </p>
                  </div>
                </div>
              </div>

              {/* Course Structure Accordion */}
              <div className="bg-white/5 rounded-2xl border border-white/20 overflow-hidden">
                <button
                  onClick={() => setShowCourseStructure(!showCourseStructure)}
                  className="w-full p-5 flex items-center justify-between hover:bg-white/10 transition-colors"
                >
                  <h3 className="text-white font-bold text-lg sm:text-xl flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#fddb35]" />
                    Course Structure
                  </h3>
                  {showCourseStructure ? (
                    <ChevronUp className="w-5 h-5 text-white/70" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-white/70" />
                  )}
                </button>

                {showCourseStructure && (
                  <div className="px-5 pb-5 space-y-3 animate-in slide-in-from-top-2 duration-300">
                    <div className="bg-white/5 rounded-xl p-4">
                      <h4 className="text-white font-semibold text-sm sm:text-base mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#fddb35] flex items-center justify-center text-[#1a0a2e] text-xs font-bold">
                          1
                        </span>
                        Year 1: Foundation
                      </h4>
                      <p className="text-white/70 text-xs sm:text-sm">
                        Build core knowledge with introductory modules and
                        develop fundamental skills.
                      </p>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4">
                      <h4 className="text-white font-semibold text-sm sm:text-base mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#fddb35] flex items-center justify-center text-[#1a0a2e] text-xs font-bold">
                          2
                        </span>
                        Year 2: Development
                      </h4>
                      <p className="text-white/70 text-xs sm:text-sm">
                        Apply knowledge through practical projects and industry
                        placements.
                      </p>
                    </div>

                    <div className="bg-white/5 rounded-xl p-4">
                      <h4 className="text-white font-semibold text-sm sm:text-base mb-2 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#fddb35] flex items-center justify-center text-[#1a0a2e] text-xs font-bold">
                          3
                        </span>
                        Year 3: Mastery
                      </h4>
                      <p className="text-white/70 text-xs sm:text-sm">
                        Complete your dissertation and prepare for your
                        professional career.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 mb-8">
            {/* Primary CTA */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#fddb35] to-[#ffd700] rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <button
                onClick={handleApplyNow}
                className="relative w-full h-16 sm:h-18 rounded-2xl font-bold text-lg sm:text-xl bg-gradient-to-r from-[#fddb35] to-[#ffd700] hover:from-[#ffd700] hover:to-[#fddb35] text-[#1a0a2e] shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 active:scale-95"
              >
                <ExternalLink className="w-6 h-6" />
                <span>Apply Now</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>

            {/* Secondary Actions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={handleEmailClick}
                className="h-14 rounded-xl font-semibold text-sm sm:text-base bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white/40 transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
              >
                <Mail className="w-5 h-5" />
                <span>Get Info</span>
              </button>

              <button
                onClick={handleChatWithAdvisor}
                className="h-14 rounded-xl font-semibold text-sm sm:text-base bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white/40 transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat</span>
              </button>

              <div className="sm:col-span-1">
                <ShareButton
                  courseName={course.name}
                  courseId={course.name.toLowerCase().replace(/\s+/g, "-")}
                />
              </div>
            </div>
          </div>

          {/* Course Navigation (if multiple) */}
          {matchedCourses.length > 1 && (
            <div className="flex justify-between items-center gap-4 mb-8">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  currentIndex === 0
                    ? "bg-white/5 text-white/30 cursor-not-allowed"
                    : "bg-white/10 hover:bg-white/20 text-white active:scale-95"
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex === matchedCourses.length - 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  currentIndex === matchedCourses.length - 1
                    ? "bg-white/5 text-white/30 cursor-not-allowed"
                    : "bg-white/10 hover:bg-white/20 text-white active:scale-95"
                }`}
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* What's Next */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-[#fddb35]" />
              Next Steps
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#fddb35] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#1a0a2e] font-bold">✓</span>
                </div>
                <div>
                  <p className="text-white font-semibold">You've matched!</p>
                  <p className="text-white/70 text-sm">
                    Found your perfect course at Lincoln
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Explore details</p>
                  <p className="text-white/70 text-sm">
                    Review requirements and structure
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Apply via UCAS</p>
                  <p className="text-white/70 text-sm">
                    Submit your application
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">4</span>
                </div>
                <div>
                  <p className="text-white font-semibold">Start your journey</p>
                  <p className="text-white/70 text-sm">
                    Begin at University of Lincoln
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Capture Modal */}
      <EmailCaptureModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        matchedCourses={[course]}
      />
    </div>
  );
};

export default CourseDetails;
