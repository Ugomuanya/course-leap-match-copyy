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
  Download,
  Mail
} from "lucide-react";
import { EmailCaptureModal } from "@/components/EmailCaptureModal";
import { ShareButton } from "@/components/ShareButton";
import type { Course } from "@/data/coursesData";

const CourseDetails = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [matchedCourses, setMatchedCourses] = useState<Course[]>([]);
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
        navigate("/matching"); // Redirect if no valid courses
      }
    } else {
      navigate("/matching"); // Redirect if no courses
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
    return null; // Loading or redirecting
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
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <button
            onClick={handleBackToMatching}
            className="mb-4 sm:mb-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
            aria-label="Back to matching"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm sm:text-base font-medium">Back to Matching</span>
          </button>

          {/* Celebration Header */}
          <div className="text-center mb-6 sm:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#fddb35] to-[#ffd700] mb-4 animate-bounce">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-[#cd1f80] fill-[#cd1f80]" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2">
              You Matched With This Course! 🎓
            </h1>
            <p className="text-white/80 text-sm sm:text-base">
              {matchedCourses.length === 1 ? (
                "Here's your perfect match"
              ) : (
                <>
                  Viewing <span className="text-[#fddb35] font-bold">{currentIndex + 1}</span> of{" "}
                  <span className="text-[#fddb35] font-bold">{matchedCourses.length}</span> matched courses
                </>
              )}
            </p>
          </div>

          {/* Navigation Dots */}
          {matchedCourses.length > 1 && (
            <div className="flex justify-center gap-2 mb-6">
              {matchedCourses.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-[#fddb35] w-8"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to course ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Course Card */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl mb-6 animate-in fade-in zoom-in duration-500">
            {/* University Badge */}
            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center gap-2 bg-[#fddb35]/20 px-4 py-2 rounded-full border border-[#fddb35]/30">
                <GraduationCap className="w-4 h-4 text-[#fddb35]" />
                <span className="text-[#fddb35] text-xs sm:text-sm font-bold">University of Lincoln</span>
              </div>
            </div>

            {/* Course Icon */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#fddb35] to-[#ffd700] flex items-center justify-center shadow-2xl">
              <GraduationCap className="w-12 h-12 sm:w-16 sm:h-16 text-[#1a0a2e]" />
            </div>

            {/* Course Name */}
            <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-6 leading-tight">
              {course.name}
            </h2>

            {/* Course Information */}
            <div className="space-y-4 sm:space-y-5">
              {/* Description */}
              <div className="bg-white/10 rounded-2xl p-4 sm:p-5 border border-white/20">
                <div className="flex items-start gap-3 mb-2">
                  <BookOpen className="w-5 h-5 text-[#fddb35] flex-shrink-0 mt-0.5" />
                  <h3 className="text-white font-bold text-base sm:text-lg">Course Overview</h3>
                </div>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed pl-8">
                  {course.description}
                </p>
              </div>

              {/* Entry Requirements */}
              {course.entryGrades && (
                <div className="bg-white/10 rounded-2xl p-4 sm:p-5 border border-white/20">
                  <div className="flex items-start gap-3 mb-2">
                    <Sparkles className="w-5 h-5 text-[#fddb35] flex-shrink-0 mt-0.5" />
                    <h3 className="text-white font-bold text-base sm:text-lg">Entry Requirements</h3>
                  </div>
                  <p className="text-white/90 text-sm sm:text-base font-semibold pl-8">
                    {course.entryGrades} UCAS points
                  </p>
                </div>
              )}

              {/* Duration & Type */}
              <div className="bg-white/10 rounded-2xl p-4 sm:p-5 border border-white/20">
                <div className="flex items-start gap-3 mb-2">
                  <Calendar className="w-5 h-5 text-[#fddb35] flex-shrink-0 mt-0.5" />
                  <h3 className="text-white font-bold text-base sm:text-lg">Course Details</h3>
                </div>
                <div className="space-y-2 pl-8">
                  <p className="text-white/90 text-sm sm:text-base">
                    <span className="font-semibold">Duration:</span> 3 years full-time
                  </p>
                  <p className="text-white/90 text-sm sm:text-base">
                    <span className="font-semibold">Level:</span> Undergraduate
                  </p>
                </div>
              </div>

              {/* Key Topics/Interests */}
              {course.interests && course.interests.length > 0 && (
                <div className="bg-white/10 rounded-2xl p-4 sm:p-5 border border-white/20">
                  <div className="flex items-start gap-3 mb-3">
                    <Heart className="w-5 h-5 text-[#fddb35] flex-shrink-0 mt-0.5" />
                    <h3 className="text-white font-bold text-base sm:text-lg">Key Topics You'll Study</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 pl-8">
                    {course.interests.map((interest, i) => (
                      <span
                        key={i}
                        className="bg-[#fddb35]/20 border border-[#fddb35]/30 rounded-full px-3 py-1.5 text-xs sm:text-sm text-white font-medium"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Primary CTAs */}
          <div className="space-y-3 mb-6">
            {/* Apply Now - Primary CTA */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#fddb35] to-[#ffd700] rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <button
                onClick={handleApplyNow}
                className="relative w-full h-14 sm:h-16 rounded-2xl font-bold text-base sm:text-lg bg-gradient-to-r from-[#fddb35] to-[#ffd700] hover:from-[#ffd700] hover:to-[#fddb35] text-[#1a0a2e] shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
                aria-label="Apply now for this course"
              >
                <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>View Full Course Details & Apply</span>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Request Information */}
            <button
              onClick={handleEmailClick}
              className="w-full h-12 sm:h-14 rounded-2xl font-bold text-sm sm:text-base bg-white/15 hover:bg-white/25 text-white border-2 border-white/30 hover:border-white/40 shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
              aria-label="Request course information via email"
            >
              <Mail className="w-5 h-5" />
              <span>Email Me Course Information</span>
            </button>
          </div>

          {/* Secondary Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {/* Chat with Advisor */}
            <button
              onClick={handleChatWithAdvisor}
              className="h-12 sm:h-14 rounded-2xl font-bold text-sm sm:text-base bg-[#cd1f80] hover:bg-[#a01866] text-white shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
              aria-label="Chat with course advisor"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat with Advisor</span>
            </button>

            {/* Download Prospectus */}
            {course.link && (
              <a
                href={course.link}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 sm:h-14 rounded-2xl font-bold text-sm sm:text-base bg-white/15 hover:bg-white/25 text-white border-2 border-white/30 hover:border-white/40 shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
                aria-label="Download course prospectus"
              >
                <Download className="w-5 h-5" />
                <span>Course Prospectus</span>
              </a>
            )}
          </div>

          {/* Share Button */}
          <div className="mb-6">
            <ShareButton
              courseName={course.name}
              courseId={course.name.toLowerCase().replace(/\s+/g, '-')}
            />
          </div>

          {/* Navigation Arrows (if multiple courses) */}
          {matchedCourses.length > 1 && (
            <div className="flex justify-between items-center gap-4">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 ${
                  currentIndex === 0
                    ? "bg-white/10 text-white/40 cursor-not-allowed"
                    : "bg-white/20 hover:bg-white/30 text-white hover:scale-105 active:scale-95"
                }`}
                aria-label="Previous course"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <div className="text-white/60 text-sm font-medium">
                {currentIndex + 1} / {matchedCourses.length}
              </div>

              <button
                onClick={handleNext}
                disabled={currentIndex === matchedCourses.length - 1}
                className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 ${
                  currentIndex === matchedCourses.length - 1
                    ? "bg-white/10 text-white/40 cursor-not-allowed"
                    : "bg-white/20 hover:bg-white/30 text-white hover:scale-105 active:scale-95"
                }`}
                aria-label="Next course"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* What's Next Section */}
          <div className="mt-8 bg-white/10 rounded-3xl p-6 sm:p-8 border-2 border-white/20">
            <h3 className="text-xl sm:text-2xl font-black text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-[#fddb35]" />
              What's Next, {studentName}?
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#fddb35] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#1a0a2e] text-xs font-bold">✓</span>
                </div>
                <p className="text-white/90 text-sm sm:text-base">
                  <span className="font-bold">Matched</span> - You've found your perfect course!
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <p className="text-white/90 text-sm sm:text-base">
                  <span className="font-bold">Explore</span> - Review full course details and requirements
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                <p className="text-white/90 text-sm sm:text-base">
                  <span className="font-bold">Apply</span> - Submit your UCAS application
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">4</span>
                </div>
                <p className="text-white/90 text-sm sm:text-base">
                  <span className="font-bold">Succeed</span> - Start your journey at University of Lincoln!
                </p>
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
