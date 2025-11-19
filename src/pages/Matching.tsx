import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, RotateCcw, ExternalLink, X } from "lucide-react";
import { getCoursesBySubject, searchCoursesByInterests, type Course } from "@/data/coursesData";
import TinderCard from "react-tinder-card";

const Matching = () => {
  const [showResult, setShowResult] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null);
  const navigate = useNavigate();
  const subject = localStorage.getItem("selectedSubject") || "Science";
  const name = localStorage.getItem("studentName") || "Student";
  const programLevel = localStorage.getItem("programLevel") || "undergraduate";
  const skillAnswers = JSON.parse(localStorage.getItem("skillAnswers") || "[]");
  
  // Filter courses based on program level
  const filterCoursesByLevel = (courses: Course[]) => {
    if (programLevel === "undergraduate") {
      // Undergraduate: BSc, BEng, BA
      return courses.filter(course => 
        course.name.startsWith("BSc") || 
        course.name.startsWith("BEng") || 
        course.name.startsWith("BA")
      );
    } else {
      // Postgraduate: MBio, MComp, MChem, MEng, MSci, MGeog, MSc
      return courses.filter(course => 
        course.name.startsWith("M") && 
        !course.name.startsWith("MA") // Exclude if there are MA courses
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

  const currentCourse = suggestedCourses[currentIndex];
  const childRefs = useRef<any[]>(suggestedCourses.map(() => React.createRef()));

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResult(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const onSwipe = (direction: string, course: Course) => {
    setSwipeDirection(direction);
    if (direction === 'right') {
      setSelectedCourses(prev => [...prev, course]);
    }
    setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
      setSwipeDirection(null);
    }, 300);
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
    navigate("/");
  };

  if (!showResult) {
    return (
      <div className="min-h-screen bg-[image:var(--gradient-ocean)] flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-8 relative">
            <div className="absolute inset-0 rounded-full bg-[hsl(var(--coral))] opacity-50 animate-ping"></div>
            <div className="absolute inset-0 rounded-full bg-[hsl(var(--teal-bright))] opacity-50 animate-ping delay-300"></div>
            <Heart className="w-32 h-32 text-white animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold text-white">Finding your perfect match...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[image:var(--gradient-ocean)] p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-[hsl(var(--lavender))] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[hsl(var(--teal-bright))] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10 pt-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">
            Congrats {name}! 🎉
          </h1>
          <p className="text-xl text-white/90">
            We found you {suggestedCourses.length} perfect {suggestedCourses.length === 1 ? 'match' : 'matches'}!
          </p>
          <p className="text-sm text-white/70 mt-2">
            {currentIndex < suggestedCourses.length 
              ? `${currentIndex + 1} of ${suggestedCourses.length}`
              : 'All done!'}
          </p>
        </div>

        {/* Swipeable course cards */}
        <div className="relative w-full max-w-sm mx-auto mb-8" style={{ height: '600px' }}>
          {currentIndex >= suggestedCourses.length ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4">
                <div className="w-24 h-24 mx-auto rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                  <Heart className="w-12 h-12 text-white fill-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">All courses reviewed!</h3>
                <p className="text-white/80">
                  You selected {selectedCourses.length} {selectedCourses.length === 1 ? 'course' : 'courses'}
                </p>
              </div>
            </div>
          ) : (
            <>
              {suggestedCourses.map((course, index) => (
                index === currentIndex && (
                  <TinderCard
                    ref={childRefs.current[index]}
                    key={course.name}
                    onSwipe={(dir) => onSwipe(dir, course)}
                    preventSwipe={['up', 'down']}
                    className="absolute w-full"
                  >
                    <div className="w-full aspect-[3/4] rounded-[2.5rem] relative overflow-hidden shadow-2xl">
                      {/* Card background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--ocean-medium))] to-[hsl(var(--ocean-deep))]" />
                      
                      {/* Overlay pattern */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]" />
                      
                      {/* Swipe indicators */}
                      {swipeDirection === 'right' && (
                        <div className="absolute top-12 right-12 z-10 animate-in zoom-in">
                          <div className="w-24 h-24 rounded-full bg-[hsl(var(--teal-bright))] flex items-center justify-center rotate-12 border-4 border-white">
                            <Heart className="w-12 h-12 text-white fill-white" />
                          </div>
                        </div>
                      )}
                      {swipeDirection === 'left' && (
                        <div className="absolute top-12 left-12 z-10 animate-in zoom-in">
                          <div className="w-24 h-24 rounded-full bg-[hsl(var(--coral))] flex items-center justify-center -rotate-12 border-4 border-white">
                            <X className="w-12 h-12 text-white stroke-[3]" />
                          </div>
                        </div>
                      )}
                      
                      {/* Content */}
                      <div className="relative h-full flex flex-col justify-between p-8 text-white">
                        <div className="text-center space-y-3">
                          <h3 className="text-3xl font-bold drop-shadow-lg leading-tight">{course.name}</h3>
                        </div>
                        
                        <div className="text-center space-y-3">
                          <p className="text-sm text-white/90 line-clamp-4 px-2 leading-relaxed">{course.description}</p>
                          <div className="flex flex-wrap gap-2 justify-center">
                            {course.interests.slice(0, 3).map((interest, i) => (
                              <div key={i} className="inline-block bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5">
                                <p className="text-xs font-semibold">{interest}</p>
                              </div>
                            ))}
                          </div>
                          {course.entryGrades && (
                            <div className="inline-block bg-white/30 backdrop-blur-md rounded-full px-4 py-1.5">
                              <p className="text-sm font-bold">Entry: {course.entryGrades}</p>
                            </div>
                          )}
                          {course.link && (
                            <a
                              href={course.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full px-5 py-2 transition-all duration-300 mt-2"
                            >
                              <span className="text-sm font-semibold">View Details</span>
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </TinderCard>
                )
              ))}
            </>
          )}
        </div>

        {/* Swipe action buttons */}
        {currentIndex < suggestedCourses.length && (
          <div className="flex justify-center gap-6 mb-8">
            <button
              onClick={() => swipe('left')}
              className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
            >
              <X className="w-8 h-8 text-white stroke-[3]" />
            </button>
            <button
              onClick={() => swipe('right')}
              className="w-16 h-16 rounded-full bg-[hsl(var(--teal-bright))] hover:bg-[hsl(var(--teal-bright))]/90 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-[var(--shadow-glow)]"
            >
              <Heart className="w-8 h-8 text-white fill-white" />
            </button>
          </div>
        )}

        {/* Info card */}
        <div className="bg-[hsl(var(--ocean-medium))]/80 backdrop-blur-md rounded-3xl p-6 mb-6 shadow-[var(--shadow-card)]">
          <p className="text-white/90 leading-relaxed mb-2">
            {currentIndex < suggestedCourses.length 
              ? "Swipe right to match, swipe left to pass. The best way to fall in love is in person - check out our open days!"
              : "Explore your matches! The best way to fall in love is in person - check out our open days!"
            }
          </p>
          <p className="text-white font-semibold">
            Or find out more via a chat with our advisor.
          </p>
        </div>

        {/* Action buttons */}
        <div className="space-y-4">
          {currentIndex < suggestedCourses.length && (
            <Button
              onClick={handleSkipAll}
              size="lg"
              variant="outline"
              className="w-full text-lg font-bold text-white border-white/30"
            >
              Skip All
            </Button>
          )}

          {selectedCourses.length > 0 && currentIndex >= suggestedCourses.length && (
            <Button
              onClick={handleViewCourses}
              size="lg"
              variant="coral"
              className="w-full text-lg font-bold animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <Heart className="w-5 h-5" />
              Explore {selectedCourses.length} {selectedCourses.length === 1 ? 'Course' : 'Courses'}
            </Button>
          )}

          <Button
            onClick={handleChat}
            size="lg"
            variant="default"
            className="w-full text-lg font-bold"
          >
            <MessageCircle className="w-5 h-5" />
            Chat with Advisor
          </Button>

          <Button
            onClick={handleRestart}
            size="lg"
            variant="outline"
            className="w-full text-lg font-bold text-white border-white/30"
          >
            <RotateCcw className="w-5 h-5" />
            Start Over
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Matching;
