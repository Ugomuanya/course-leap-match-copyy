import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";

const skillQuestions = {
  "Business and Management": [
    {
      question: "Which business area excites you most?",
      options: ["Finance & numbers (banking, accounting)", "People & experiences (tourism, events)", "Strategy & leadership (management)", "Markets & innovation (marketing, entrepreneurship)"]
    },
    {
      question: "How do you prefer to work?",
      options: ["Analyzing data & financials", "Planning events & experiences", "Leading teams & projects", "Creating campaigns & strategies"]
    },
    {
      question: "Your ideal career involves:",
      options: ["Financial analysis & investment", "Travel & hospitality industry", "Sports or entertainment business", "International business operations"]
    }
  ],
  "Art and Design": [
    {
      question: "How do you express creativity?",
      options: ["Visual art & design", "Digital & interactive media", "Illustration & graphic design", "3D modeling & animation"]
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
  "Performing Arts and Literature": [
    {
      question: "What form of expression appeals to you?",
      options: ["Acting & theatre", "Music & dance", "Writing & storytelling", "Film & production"]
    },
    {
      question: "How do you engage with audiences?",
      options: ["Live performance", "Written narratives", "Visual storytelling", "Interactive experiences"]
    },
    {
      question: "Your creative process is:",
      options: ["Collaborative ensemble", "Solo artistry", "Directing others", "Experimental exploration"]
    }
  ],
  "Engineering and Computing": [
    {
      question: "What excites you most about technology?",
      options: ["Writing code & building software", "Designing & building physical systems", "Working with data & AI", "Cybersecurity & networks"]
    },
    {
      question: "Which type of problem-solving appeals to you?",
      options: ["Programming & algorithms", "Mechanical & electrical design", "Data analysis & machine learning", "System optimization & testing"]
    },
    {
      question: "Your ideal project involves:",
      options: ["Developing apps or games", "Building robots or machines", "Analyzing big data patterns", "Creating secure systems"]
    }
  ],
  "Physical Sciences": [
    {
      question: "Which science area fascinates you most?",
      options: ["Physics & the universe", "Chemistry & chemical reactions", "Pure mathematics & theory", "Pharmaceutical & medicinal chemistry"]
    },
    {
      question: "What's your preferred approach to science?",
      options: ["Laboratory experiments & research", "Mathematical proofs & theory", "Computer simulations & modeling", "Applied problem-solving"]
    },
    {
      question: "Your ideal career path:",
      options: ["Research scientist in physics", "Pharmaceutical or chemical industry", "Data analyst or mathematician", "Environmental or forensic science"]
    }
  ],
  "Life and Health Sciences": [
    {
      question: "What drives your interest in health?",
      options: ["Biological research", "Patient care", "Disease prevention", "Medical innovation"]
    },
    {
      question: "Which area appeals to you most?",
      options: ["Biochemistry & molecular biology", "Nursing & direct patient care", "Food science & nutrition", "Zoology & animal behavior"]
    },
    {
      question: "Your ideal role involves:",
      options: ["Laboratory research", "Direct patient care", "Health promotion", "Scientific discovery"]
    }
  ],
  "Social Sciences": [
    {
      question: "What drives your interest?",
      options: ["Understanding behavior", "Solving social issues", "Mental health", "Social justice"]
    },
    {
      question: "How do you approach understanding people?",
      options: ["Research & analysis", "Direct engagement", "Scientific study", "Community work"]
    },
    {
      question: "Your ideal career involves:",
      options: ["Psychological research", "Helping individuals", "Social policy", "Community support"]
    }
  ],
  "Humanities and Environment": [
    {
      question: "Which area interests you most?",
      options: ["Journalism & news reporting", "Film & TV production", "Geography & environmental science", "Documentary & media production"]
    },
    {
      question: "How do you prefer to engage with the world?",
      options: ["Investigating & reporting stories", "Creating films & visual content", "Fieldwork & environmental research", "Documentary storytelling"]
    },
    {
      question: "Your ideal career involves:",
      options: ["News journalism or broadcasting", "Film/TV industry production", "Environmental conservation work", "Media production & content creation"]
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
    <div className="min-h-screen bg-gradient-to-br from-[#cd1f80] via-[#a01866] to-[#1a0a2e] p-4 sm:p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 sm:w-80 sm:h-80 bg-[#fddb35] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 sm:w-80 sm:h-80 bg-[#cd1f80] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#fddb35] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-3xl mx-auto relative z-10 pt-6 sm:pt-10 pb-6">
        {/* Progress Indicator - Step 2 of 3 */}
        <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
          <div className="w-8 h-1 bg-[#fddb35] rounded-full"></div>
          <div className="w-8 h-1 bg-[#fddb35] rounded-full"></div>
          <div className="w-8 h-1 bg-white/30 rounded-full"></div>
        </div>

        {/* Header Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-6 mb-6 sm:mb-8 border border-white/20 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 bg-[#fddb35]/20 backdrop-blur-md px-3 py-1 rounded-full border border-[#fddb35]/30 mb-2">
              <span className="text-[#fddb35] text-xs sm:text-sm font-bold">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <div className="w-1 h-1 rounded-full bg-[#fddb35]"></div>
              <span className="text-white/90 text-xs sm:text-sm font-bold">
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight">
              {questions[currentQuestion].question}
            </h1>
            <p className="text-sm sm:text-base text-white/80">
              Choose the option that resonates with you most
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="h-2.5 sm:h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#fddb35] via-[#ffd700] to-[#fddb35] transition-all duration-700 ease-out shadow-lg relative"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              role="progressbar"
              aria-valuenow={(currentQuestion + 1) / questions.length * 100}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Question ${currentQuestion + 1} of ${questions.length}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Answer Options Grid */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {questions[currentQuestion].options.map((option, index) => {
            const isSelected = answers[currentQuestion] === option;
            const optionNumber = String.fromCharCode(65 + index); // A, B, C, D

            return (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`
                  group relative
                  min-h-[56px] sm:min-h-[64px]
                  p-4 sm:p-5
                  rounded-xl sm:rounded-2xl
                  font-semibold text-sm sm:text-base md:text-lg
                  text-left
                  transition-all duration-300
                  ${isSelected
                    ? 'bg-gradient-to-br from-[#fddb35] to-[#ffd700] scale-[1.02] shadow-2xl ring-2 ring-white/50'
                    : 'bg-white/10 hover:bg-white/20 active:scale-[0.98] backdrop-blur-sm'
                  }
                  border-2 ${isSelected ? 'border-white' : 'border-white/20 hover:border-white/40'}
                  shadow-lg hover:shadow-xl
                  animate-in fade-in slide-in-from-bottom-4 duration-500
                `}
                style={{ animationDelay: `${index * 75}ms` }}
                aria-pressed={isSelected}
                aria-label={`Option ${optionNumber}: ${option}`}
              >
                {/* Option Number Badge */}
                <div className={`
                  absolute -top-2 -left-2 sm:-top-3 sm:-left-3
                  w-7 h-7 sm:w-8 sm:h-8
                  rounded-full
                  flex items-center justify-center
                  font-black text-xs sm:text-sm
                  shadow-lg
                  transition-all duration-300
                  ${isSelected
                    ? 'bg-white text-[#cd1f80]'
                    : 'bg-[#cd1f80] text-white group-hover:bg-[#a01866]'
                  }
                `}>
                  {optionNumber}
                </div>

                {/* Selected Checkmark */}
                {isSelected && (
                  <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center shadow-lg animate-in zoom-in duration-300">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#cd1f80] rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Option Text */}
                <span className={`
                  block pl-2 sm:pl-3 leading-snug
                  transition-colors duration-300
                  ${isSelected ? 'text-[#1a0a2e]' : 'text-white'}
                `}>
                  {option}
                </span>

                {/* Hover Glow Effect */}
                {!isSelected && (
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#fddb35] to-[#ffd700] opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 sm:gap-4">
          {currentQuestion > 0 && (
            <button
              onClick={handleBack}
              className="flex-1 h-12 sm:h-14 px-6 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base md:text-lg bg-white/10 hover:bg-white/20 active:bg-white/30 text-white border-2 border-white/30 hover:border-white/50 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95"
              aria-label="Go back to previous question"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>
          )}

          {answers[currentQuestion] && (
            <div className={`relative group ${currentQuestion === 0 ? 'w-full' : 'flex-1'}`}>
              <div className="absolute inset-0 bg-gradient-to-r from-[#fddb35] to-[#ffd700] rounded-xl sm:rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <button
                onClick={handleNext}
                className={`
                  relative w-full h-12 sm:h-14 px-6
                  rounded-xl sm:rounded-2xl
                  font-bold text-sm sm:text-base md:text-lg
                  bg-gradient-to-r from-[#cd1f80] to-[#a01866]
                  hover:from-[#a01866] hover:to-[#cd1f80]
                  text-white
                  shadow-2xl hover:scale-[1.02]
                  transition-all duration-300
                  flex items-center justify-center gap-2
                  animate-in fade-in slide-in-from-bottom-4 duration-500
                  active:scale-95
                `}
                aria-label={isLastQuestion ? 'Find your course matches' : 'Continue to next question'}
              >
                <span>{isLastQuestion ? 'Find My Matches' : 'Continue'}</span>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Helper Text */}
        {!answers[currentQuestion] && (
          <p className="text-center text-white/60 text-xs sm:text-sm mt-4 animate-in fade-in duration-700">
            Select an answer to continue
          </p>
        )}
      </div>
    </div>
  );
};

export default Skills;
