import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const interests = [
  "Advertising", "Architecture", "Social Media", "Technology",
  "Research", "Creative Writing", "Data Analysis", "Teaching",
  "Innovation", "Leadership"
];

const Interests = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleNext = () => {
    if (selectedInterests.length > 0) {
      localStorage.setItem("selectedInterests", JSON.stringify(selectedInterests));
      navigate("/matching");
    }
  };

  return (
    <div className="min-h-screen bg-[image:var(--gradient-ocean)] p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-[hsl(var(--accent))] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10 pt-12">
        <div className="bg-[hsl(var(--ocean-medium))]/80 backdrop-blur-md rounded-3xl p-6 mb-8 shadow-[var(--shadow-card)]">
          <h2 className="text-2xl font-bold text-white text-center">
            Where are your interests?
          </h2>
          <p className="text-white/80 text-center mt-2">Select all that apply</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {interests.map((interest, index) => (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              className={`
                h-32 rounded-3xl font-bold text-lg transition-all duration-300
                ${selectedInterests.includes(interest)
                  ? 'bg-gradient-to-br from-[hsl(var(--teal-bright))] to-[hsl(var(--accent))] text-white scale-105 shadow-[var(--shadow-glow)]'
                  : index < 4
                    ? 'bg-[hsl(var(--secondary))]/90 text-white hover:bg-[hsl(var(--secondary))]'
                    : 'bg-gradient-to-br from-[hsl(var(--ocean-light))]/60 to-[hsl(var(--teal-bright))]/60 text-white hover:scale-105'
                }
                backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl
              `}
            >
              {interest}
            </button>
          ))}
        </div>

        {selectedInterests.length > 0 && (
          <Button
            onClick={handleNext}
            size="lg"
            variant="coral"
            className="w-full text-lg font-bold animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            Find My Match
          </Button>
        )}
      </div>
    </div>
  );
};

export default Interests;
