import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Sparkles, GraduationCap, ArrowRight } from "lucide-react";
import universityLogo from "@/assets/university-logo.png";

const Welcome = () => {
  const [name, setName] = useState("");
  const [isAnimated, setIsAnimated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  const handleStart = () => {
    if (name.trim()) {
      localStorage.setItem("studentName", name);
      localStorage.setItem("programLevel", "undergraduate");
      navigate("/subjects");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#cd1f80] via-[#a01866] to-[#1a0a2e]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Lincoln Pink Gradient Orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#fddb35] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#cd1f80] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#fddb35] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

        {/* Floating Sparkles */}
        <Sparkles className="absolute top-20 left-20 w-6 h-6 text-[#fddb35] animate-pulse" />
        <Sparkles className="absolute top-40 right-32 w-4 h-4 text-white animate-pulse delay-300" />
        <Sparkles className="absolute bottom-32 left-1/3 w-5 h-5 text-[#fddb35] animate-pulse delay-700" />
        <Heart className="absolute top-1/3 right-20 w-8 h-8 text-[#cd1f80] opacity-20 animate-pulse delay-500" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
        <div className={`max-w-2xl w-full space-y-6 sm:space-y-8 transition-all duration-1000 ${isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

          {/* Logo Section */}
          <div className="flex justify-center mb-4 sm:mb-8">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#cd1f80] to-[#fddb35] rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 bg-white rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:scale-105 transition-all duration-300 p-4 sm:p-6">
                <img
                  src={universityLogo}
                  alt="University of Lincoln Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Hero Text */}
          <div className="text-center space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-4">
              <GraduationCap className="w-5 h-5 text-[#fddb35]" />
              <span className="text-white/90 text-sm font-medium">University of Lincoln • Undergraduate</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-[#fddb35] via-[#ffd700] to-[#fddb35] bg-clip-text text-transparent animate-pulse">
                BSc Match
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/80 max-w-xl mx-auto font-medium">
              Swipe through undergraduate courses, discover your passion, and find the perfect BSc degree for your future.
            </p>
          </div>

          {/* Input Card */}
          <div className="group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#cd1f80]/50 to-[#fddb35]/50 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300"></div>

              <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 transform group-hover:scale-[1.02] group-focus-within:scale-[1.02] transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#cd1f80] to-[#fddb35] flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <label htmlFor="name" className="block text-lg sm:text-xl font-bold text-gray-800">
                      What's your name?
                    </label>
                    <p className="text-sm text-gray-500">Let's make this personal</p>
                  </div>
                </div>

                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleStart()}
                  className="h-14 sm:h-16 text-base sm:text-lg bg-gray-50 border-2 border-gray-200 rounded-2xl placeholder:text-gray-400 focus:border-[#cd1f80] focus:ring-4 focus:ring-[#cd1f80]/20 transition-all duration-300 font-medium"
                  autoFocus
                />
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#fddb35] to-[#ffd700] rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>

            <Button
              onClick={handleStart}
              disabled={!name.trim()}
              size="lg"
              className={`
                relative w-full h-14 sm:h-16 text-base sm:text-lg font-bold rounded-2xl
                transition-all duration-300 transform
                ${name.trim()
                  ? 'bg-gradient-to-r from-[#cd1f80] to-[#a01866] hover:from-[#a01866] hover:to-[#cd1f80] text-white shadow-2xl hover:scale-[1.02] hover:shadow-[#cd1f80]/50'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              <span className="flex items-center gap-2 justify-center">
                Start Your Journey
                <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${name.trim() ? 'group-hover:translate-x-1' : ''}`} />
              </span>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-6 sm:pt-8">
            <div className="flex items-center gap-2 text-white/70 text-xs sm:text-sm">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span>110+ Courses Available</span>
            </div>
            <div className="flex items-center gap-2 text-white/70 text-xs sm:text-sm">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span>2 Minutes to Complete</span>
            </div>
            <div className="flex items-center gap-2 text-white/70 text-xs sm:text-sm">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span>100% Free</span>
            </div>
          </div>

          {/* Bottom Text */}
          <p className="text-center text-white/60 text-xs sm:text-sm max-w-md mx-auto">
            Powered by University of Lincoln • Discover courses tailored to your interests and career goals
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
