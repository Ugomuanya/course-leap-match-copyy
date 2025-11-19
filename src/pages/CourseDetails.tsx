import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@/components/ui/icon-button";
import { X, Check, MessageCircle } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Digital Marketing & Social Media",
    summary: "Learn to create compelling campaigns and build engaging online communities.",
    areas: ["Content Strategy", "Analytics", "Brand Development"],
    skills: ["Creative Thinking", "Data Analysis", "Communication"],
  },
  {
    id: 2,
    title: "Software Engineering",
    summary: "Master the art of building scalable applications and innovative solutions.",
    areas: ["Web Development", "Mobile Apps", "Cloud Computing"],
    skills: ["Problem Solving", "Coding", "Teamwork"],
  },
  {
    id: 3,
    title: "Graphic Design",
    summary: "Develop your creative vision and bring ideas to life through visual storytelling.",
    areas: ["Branding", "UI/UX Design", "Illustration"],
    skills: ["Creativity", "Attention to Detail", "Visual Communication"],
  },
];

const CourseDetails = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleReject = () => {
    if (currentIndex < courses.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate("/matching");
    }
  };

  const handleAccept = () => {
    navigate("/chat");
  };

  const course = courses[currentIndex];

  return (
    <div className="min-h-screen bg-[image:var(--gradient-ocean)] p-6 relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[hsl(var(--teal-bright))] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Action buttons at top */}
        <div className="flex justify-between items-center mb-8 px-4">
          <IconButton
            variant="reject"
            size="lg"
            onClick={handleReject}
            className="shadow-xl"
          >
            <X className="w-8 h-8" />
          </IconButton>

          <IconButton
            variant="success"
            size="lg"
            onClick={handleAccept}
            className="shadow-xl"
          >
            <Check className="w-8 h-8" />
          </IconButton>
        </div>

        {/* Course Card */}
        <div className="bg-gradient-to-br from-[hsl(var(--ocean-light))]/90 to-[hsl(var(--teal-bright))]/80 backdrop-blur-md rounded-[3rem] p-8 shadow-[var(--shadow-card)] border-2 border-white/20 animate-in fade-in slide-in-from-bottom-8 duration-500">
          {/* Course Avatar/Icon */}
          <div className="w-48 h-48 mx-auto mb-6 rounded-full border-4 border-white/30 bg-gradient-to-br from-[hsl(var(--accent))] to-[hsl(var(--teal-bright))] flex items-center justify-center shadow-2xl">
            <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white text-center mb-4">
            {course.title}
          </h2>

          <div className="bg-[hsl(var(--ocean-deep))]/60 backdrop-blur-sm rounded-2xl p-6 space-y-4">
            <p className="text-white/90 leading-relaxed">• {course.summary}</p>
            <p className="text-white/90 leading-relaxed">• Key areas: {course.areas.join(", ")}</p>
            <p className="text-white/90 leading-relaxed">• Skills developed: {course.skills.join(", ")}</p>
          </div>
        </div>

        {/* Questions button */}
        <button
          onClick={() => navigate("/chat")}
          className="w-full mt-6 bg-white/95 backdrop-blur-sm text-[hsl(var(--secondary))] rounded-full py-4 px-6 flex items-center justify-center gap-3 font-bold text-lg shadow-lg hover:bg-white transition-all hover:scale-105"
        >
          <MessageCircle className="w-6 h-6" />
          Any Questions?
        </button>
      </div>
    </div>
  );
};

export default CourseDetails;
