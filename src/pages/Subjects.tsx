import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Palette,
  Music,
  Cpu,
  Atom,
  Heart,
  Users,
  Globe,
} from "lucide-react";

// Official 8 schools from University of Lincoln spreadsheet
const schools = [
  {
    name: "Business and Management",
    icon: Briefcase,
    gradient: "from-blue-500 to-blue-700"
  },
  {
    name: "Art and Design",
    icon: Palette,
    gradient: "from-pink-500 to-purple-600"
  },
  {
    name: "Performing Arts and Literature",
    icon: Music,
    gradient: "from-purple-500 to-indigo-600"
  },
  {
    name: "Engineering and Computing",
    icon: Cpu,
    gradient: "from-cyan-500 to-blue-600"
  },
  {
    name: "Physical Sciences",
    icon: Atom,
    gradient: "from-green-500 to-teal-600"
  },
  {
    name: "Life and Health Sciences",
    icon: Heart,
    gradient: "from-red-500 to-pink-600"
  },
  {
    name: "Social Sciences",
    icon: Users,
    gradient: "from-orange-500 to-red-600"
  },
  {
    name: "Humanities and Environment",
    icon: Globe,
    gradient: "from-emerald-500 to-green-700"
  },
];

const Subjects = () => {
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
  const navigate = useNavigate();
  const continueButtonRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll to Continue button when selection is made
  useEffect(() => {
    if (selectedSchool && continueButtonRef.current) {
      setTimeout(() => {
        continueButtonRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }, 300); // Delay to let animation complete
    }
  }, [selectedSchool]);

  const handleSchoolSelect = (schoolName: string) => {
    setSelectedSchool(schoolName);
  };

  const handleNext = () => {
    if (selectedSchool) {
      localStorage.setItem("selectedSubject", selectedSchool);
      navigate("/skills");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#cd1f80] via-[#a01866] to-[#1a0a2e] p-4 sm:p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 sm:w-80 sm:h-80 bg-[#fddb35] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 sm:w-80 sm:h-80 bg-[#cd1f80] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 pt-8 sm:pt-12 pb-6">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-8 h-1 bg-[#fddb35] rounded-full"></div>
          <div className="w-8 h-1 bg-white/30 rounded-full"></div>
          <div className="w-8 h-1 bg-white/30 rounded-full"></div>
        </div>

        {/* Header Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-8 sm:mb-10 border border-white/20 shadow-2xl">
          <div className="text-center space-y-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
              Which area interests you?
            </h1>
            <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto">
              Choose a school to explore undergraduate courses that match your passion
            </p>
          </div>
        </div>

        {/* School Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-8">
          {schools.map((school, index) => {
            const Icon = school.icon;
            const isSelected = selectedSchool === school.name;

            return (
              <button
                key={school.name}
                onClick={() => handleSchoolSelect(school.name)}
                className={`
                  relative group
                  rounded-2xl sm:rounded-3xl
                  p-6 sm:p-7
                  transition-all duration-300
                  animate-in fade-in slide-in-from-bottom-4
                  ${isSelected
                    ? 'bg-gradient-to-br from-[#fddb35] to-[#ffd700] scale-105 shadow-2xl ring-4 ring-white/50'
                    : 'bg-white/10 hover:bg-white/20 active:scale-95 backdrop-blur-sm'
                  }
                  border-2 ${isSelected ? 'border-white' : 'border-white/20'}
                  shadow-lg hover:shadow-xl
                `}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Selected Indicator */}
                {isSelected && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg animate-in zoom-in duration-300">
                    <div className="w-5 h-5 bg-[#cd1f80] rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Icon Circle */}
                <div className={`
                  w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4
                  rounded-full
                  flex items-center justify-center
                  transition-all duration-300
                  ${isSelected
                    ? 'bg-white shadow-xl'
                    : `bg-gradient-to-br ${school.gradient} group-hover:scale-110`
                  }
                `}>
                  <Icon className={`
                    w-8 h-8 sm:w-10 sm:h-10
                    transition-colors duration-300
                    ${isSelected ? 'text-[#cd1f80]' : 'text-white'}
                  `} />
                </div>

                {/* School Name */}
                <h3 className={`
                  text-sm sm:text-base font-bold text-center leading-tight
                  transition-colors duration-300
                  ${isSelected ? 'text-[#1a0a2e]' : 'text-white'}
                `}>
                  {school.name}
                </h3>

                {/* Hover Glow Effect */}
                {!isSelected && (
                  <div className={`
                    absolute inset-0 rounded-2xl sm:rounded-3xl
                    bg-gradient-to-br ${school.gradient}
                    opacity-0 group-hover:opacity-20
                    transition-opacity duration-300
                    pointer-events-none
                  `} />
                )}
              </button>
            );
          })}
        </div>

        {/* Continue Button */}
        {selectedSchool && (
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#fddb35] to-[#ffd700] rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <Button
              ref={continueButtonRef}
              onClick={handleNext}
              size="lg"
              className="
                relative w-full h-14 sm:h-16
                text-lg sm:text-xl font-bold
                bg-gradient-to-r from-[#cd1f80] to-[#a01866]
                hover:from-[#a01866] hover:to-[#cd1f80]
                text-white rounded-2xl
                shadow-2xl hover:scale-[1.02]
                transition-all duration-300
                animate-in fade-in slide-in-from-bottom-4 duration-500
              "
            >
              <span className="flex items-center gap-2 justify-center">
                Continue to Questions
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subjects;
