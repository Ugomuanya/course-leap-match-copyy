import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import universityLogo from "@/assets/university-logo.png";

const Welcome = () => {
  const [name, setName] = useState("");
  const [programLevel, setProgramLevel] = useState<"undergraduate" | "postgraduate">("undergraduate");
  const navigate = useNavigate();

  const handleStart = () => {
    if (name.trim()) {
      localStorage.setItem("studentName", name);
      localStorage.setItem("programLevel", programLevel);
      navigate("/subjects");
    }
  };

  return (
    <div className="min-h-screen bg-[image:var(--gradient-ocean)] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[hsl(var(--teal-bright))] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[hsl(var(--accent))] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* University Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-48 h-48 bg-white/95 backdrop-blur-md rounded-3xl flex items-center justify-center border-2 border-white/30 shadow-[var(--shadow-card)] p-6">
            <img 
              src={universityLogo} 
              alt="University of Lincoln Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center text-white mb-4">
          Are you ready to meet your match?
        </h1>

        <div className="space-y-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-[var(--shadow-card)]">
            <label htmlFor="name" className="block text-lg font-semibold text-[hsl(var(--secondary))] mb-3">
              What should we call you?
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleStart()}
              className="h-14 text-base bg-[hsl(var(--input))] border-0 rounded-2xl placeholder:text-muted-foreground"
            />
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-[var(--shadow-card)]">
            <label className="block text-lg font-semibold text-[hsl(var(--secondary))] mb-3">
              What program level are you interested in?
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setProgramLevel("undergraduate")}
                className={`
                  h-20 rounded-2xl font-bold text-lg transition-all duration-300
                  ${programLevel === "undergraduate"
                    ? 'bg-gradient-to-br from-[hsl(var(--teal-bright))] to-[hsl(var(--accent))] text-white scale-105 shadow-lg'
                    : 'bg-[hsl(var(--input))] text-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))]/10'
                  }
                `}
              >
                BSc / BEng
                <div className="text-xs font-normal mt-1">Undergraduate</div>
              </button>
              <button
                onClick={() => setProgramLevel("postgraduate")}
                className={`
                  h-20 rounded-2xl font-bold text-lg transition-all duration-300
                  ${programLevel === "postgraduate"
                    ? 'bg-gradient-to-br from-[hsl(var(--teal-bright))] to-[hsl(var(--accent))] text-white scale-105 shadow-lg'
                    : 'bg-[hsl(var(--input))] text-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary))]/10'
                  }
                `}
              >
                MSc / MEng
                <div className="text-xs font-normal mt-1">Postgraduate</div>
              </button>
            </div>
          </div>

          <Button 
            onClick={handleStart}
            disabled={!name.trim()}
            size="lg"
            variant="coral"
            className="w-full text-lg font-bold"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
