import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";

const skillQuestions = {
  Science: [
    {
      question: "How do you prefer to learn?",
      options: ["Hands-on experiments", "Theory and research", "Problem-solving", "Group projects"]
    },
    {
      question: "Which area excites you most?",
      options: ["Biology & Life Sciences", "Chemistry & Materials", "Physics & Engineering", "Environmental Science"]
    },
    {
      question: "What's your approach to challenges?",
      options: ["Analytical thinking", "Creative solutions", "Systematic methods", "Collaborative approach"]
    }
  ],
  Art: [
    {
      question: "How do you express creativity?",
      options: ["Visual design", "Performance", "Writing & storytelling", "Digital media"]
    },
    {
      question: "What inspires your work?",
      options: ["Human emotion", "Social issues", "Nature & beauty", "Technology & innovation"]
    },
    {
      question: "Your ideal project involves:",
      options: ["Solo creation", "Collaborative work", "Public exhibitions", "Experimental forms"]
    }
  ],
  Social: [
    {
      question: "What drives your interest?",
      options: ["Understanding people", "Solving social issues", "Policy & governance", "Cultural studies"]
    },
    {
      question: "How do you approach problems?",
      options: ["Research & analysis", "Community engagement", "Historical perspective", "Data-driven insights"]
    },
    {
      question: "Your ideal career involves:",
      options: ["Helping individuals", "Shaping policy", "Teaching & education", "Research & analysis"]
    }
  ],
  Tech: [
    {
      question: "What aspect of tech interests you?",
      options: ["Software development", "Data & AI", "Cybersecurity", "Hardware & systems"]
    },
    {
      question: "How do you solve problems?",
      options: ["Code & logic", "Design & UX", "Systems thinking", "Innovation & experimentation"]
    },
    {
      question: "Your ideal project is:",
      options: ["Building apps", "Analyzing data", "Protecting systems", "Creating algorithms"]
    }
  ],
  default: [
    {
      question: "What's your learning style?",
      options: ["Practical application", "Theoretical study", "Creative exploration", "Collaborative learning"]
    },
    {
      question: "What motivates you?",
      options: ["Problem-solving", "Helping others", "Innovation", "Understanding systems"]
    },
    {
      question: "Your ideal work environment:",
      options: ["Structured & organized", "Creative & flexible", "Team-oriented", "Independent & focused"]
    }
  ]
};

const Skills = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const navigate = useNavigate();
  const subject = localStorage.getItem("selectedSubject") || "default";
  
  const questions = skillQuestions[subject as keyof typeof skillQuestions] || skillQuestions.default;
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (answers[currentQuestion]) {
      if (isLastQuestion) {
        localStorage.setItem("skillAnswers", JSON.stringify(answers));
        navigate("/matching");
      } else {
        setCurrentQuestion(prev => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[image:var(--gradient-ocean)] p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-[hsl(var(--lavender))] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[hsl(var(--teal-bright))] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10 pt-12">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/80 text-sm font-medium">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-white/80 text-sm font-medium">
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-[hsl(var(--teal-bright))] to-[hsl(var(--coral))] transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="bg-[hsl(var(--ocean-medium))]/80 backdrop-blur-md rounded-3xl p-8 mb-8 shadow-[var(--shadow-card)] animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-2xl font-bold text-white text-center mb-2">
            {questions[currentQuestion].question}
          </h2>
          <p className="text-white/70 text-center text-sm">
            Select the option that best describes you
          </p>
        </div>

        {/* Answer options */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className={`
                p-6 rounded-2xl font-semibold text-lg transition-all duration-300
                ${answers[currentQuestion] === option
                  ? 'bg-gradient-to-br from-[hsl(var(--teal-bright))] to-[hsl(var(--accent))] text-white scale-105 shadow-[var(--shadow-glow)]'
                  : 'bg-white/10 text-white hover:bg-white/20 hover:scale-102'
                }
                backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl
                animate-in fade-in slide-in-from-bottom-4 duration-500
              `}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-4">
          {currentQuestion > 0 && (
            <Button
              onClick={handleBack}
              size="lg"
              variant="outline"
              className="flex-1 text-lg font-bold text-white border-white/30"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </Button>
          )}
          
          {answers[currentQuestion] && (
            <Button
              onClick={handleNext}
              size="lg"
              variant="coral"
              className={`flex-1 text-lg font-bold animate-in fade-in slide-in-from-bottom-4 duration-500 ${
                currentQuestion === 0 ? 'w-full' : ''
              }`}
            >
              {isLastQuestion ? 'Find My Matches' : 'Continue'}
              <ChevronRight className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Skills;
