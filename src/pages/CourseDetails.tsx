import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@/components/ui/icon-button";
import { X, Check, MessageCircle, Mail, ExternalLink } from "lucide-react";
import { EmailCaptureModal } from "@/components/EmailCaptureModal";
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

  const handleReject = () => {
    if (currentIndex < matchedCourses.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate("/matching");
    }
  };

  const handleAccept = () => {
    navigate("/chat");
  };

  const handleEmailClick = () => {
    setShowEmailModal(true);
  };

  if (matchedCourses.length === 0) {
    return null; // Loading or redirecting
  }

  const course = matchedCourses[currentIndex];

  return (
    <div className="min-h-screen bg-[image:var(--gradient-ocean)] p-4 sm:p-6 relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 sm:w-72 sm:h-72 bg-[hsl(var(--teal-bright))] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="max-w-md w-full relative z-10 py-6 sm:py-0">
        {/* Action buttons at top */}
        <div className="flex justify-between items-center mb-6 sm:mb-8 px-2 sm:px-4">
          <IconButton
            variant="reject"
            size="lg"
            onClick={handleReject}
            className="shadow-xl w-12 h-12 sm:w-auto sm:h-auto"
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8" />
          </IconButton>

          <IconButton
            variant="success"
            size="lg"
            onClick={handleAccept}
            className="shadow-xl w-12 h-12 sm:w-auto sm:h-auto"
          >
            <Check className="w-6 h-6 sm:w-8 sm:h-8" />
          </IconButton>
        </div>

        {/* Course Card */}
        <div className="bg-gradient-to-br from-[hsl(var(--ocean-light))]/90 to-[hsl(var(--teal-bright))]/80 backdrop-blur-md rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-8 shadow-[var(--shadow-card)] border-2 border-white/20 animate-in fade-in slide-in-from-bottom-8 duration-500">
          {/* Course Avatar/Icon */}
          <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mb-4 sm:mb-6 rounded-full border-4 border-white/30 bg-gradient-to-br from-[hsl(var(--accent))] to-[hsl(var(--teal-bright))] flex items-center justify-center shadow-2xl">
            <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3 sm:mb-4 leading-tight px-2">
            {course.name}
          </h2>

          <div className="bg-[hsl(var(--ocean-deep))]/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4">
            <p className="text-sm sm:text-base text-white/90 leading-relaxed">• {course.description}</p>

            {course.entryGrades && (
              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-semibold">
                • Entry Requirements: {course.entryGrades}
              </p>
            )}

            {course.interests && course.interests.length > 0 && (
              <div>
                <p className="text-sm sm:text-base text-white/90 font-semibold mb-2">• Key Interests:</p>
                <div className="flex flex-wrap gap-2 pl-2 sm:pl-4">
                  {course.interests.slice(0, 5).map((interest, i) => (
                    <span key={i} className="bg-white/20 backdrop-blur-md rounded-full px-2.5 sm:px-3 py-1 text-xs sm:text-sm text-white">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {course.link && (
              <a
                href={course.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm sm:text-base text-white hover:text-white/80 active:text-white/70 transition-colors mt-3 sm:mt-4"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="underline">View Full Course Details</span>
              </a>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-3 mt-4 sm:mt-6">
          {/* Email Me Info Button */}
          <button
            onClick={handleEmailClick}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 active:from-purple-800 active:to-blue-800 text-white rounded-full py-3 sm:py-4 px-6 flex items-center justify-center gap-2 sm:gap-3 font-bold text-base sm:text-lg shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
            Email Me Course Info
          </button>

          {/* Questions button */}
          <button
            onClick={() => navigate("/chat")}
            className="w-full bg-white/95 backdrop-blur-sm text-[hsl(var(--secondary))] rounded-full py-3 sm:py-4 px-6 flex items-center justify-center gap-2 sm:gap-3 font-bold text-base sm:text-lg shadow-lg hover:bg-white transition-all hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            Any Questions?
          </button>
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
