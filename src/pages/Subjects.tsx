import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const subjects = [
  "Science", "Art", "Social", "Tech", 
  "Business", "Health", "Engineering", "Design",
  "Mathematics", "Languages"
];

const Subjects = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (selectedSubject) {
      localStorage.setItem("selectedSubject", selectedSubject);
      navigate("/skills");
    }
  };

  return (
    <div className="min-h-screen bg-[image:var(--gradient-ocean)] p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-80 h-80 bg-[hsl(var(--teal-bright))] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10 pt-12">
        <div className="bg-[hsl(var(--ocean-medium))]/80 backdrop-blur-md rounded-3xl p-6 mb-8 shadow-[var(--shadow-card)]">
          <h2 className="text-2xl font-bold text-white text-center">
            What subject do you want to study?
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {subjects.map((subject, index) => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              className={`
                h-32 rounded-3xl font-bold text-xl transition-all duration-300
                ${selectedSubject === subject 
                  ? 'bg-gradient-to-br from-[hsl(var(--teal-bright))] to-[hsl(var(--accent))] text-white scale-105 shadow-[var(--shadow-glow)]' 
                  : index < 4 
                    ? 'bg-[hsl(var(--secondary))]/90 text-white hover:bg-[hsl(var(--secondary))]' 
                    : 'bg-gradient-to-br from-[hsl(var(--ocean-light))]/60 to-[hsl(var(--teal-bright))]/60 text-white hover:scale-105'
                }
                backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl
              `}
            >
              {subject}
            </button>
          ))}
        </div>

        {selectedSubject && (
          <Button
            onClick={handleNext}
            size="lg"
            variant="coral"
            className="w-full text-lg font-bold animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            Continue
          </Button>
        )}
      </div>
    </div>
  );
};

export default Subjects;
