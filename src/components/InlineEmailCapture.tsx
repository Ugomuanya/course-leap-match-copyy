import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Sparkles, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface InlineEmailCaptureProps {
  matchedCourses: Array<{ name: string }>;
  onEmailSubmitted?: () => void;
}

export const InlineEmailCapture = ({ matchedCourses, onEmailSubmitted }: InlineEmailCaptureProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Check if user already provided email
  const hasEmail = localStorage.getItem("userEmail");
  if (hasEmail || isSubmitted) {
    return null; // Don't show if already captured
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    // Store in localStorage (ready for backend integration later)
    const emailData = {
      email,
      consent: true, // Implied consent by submitting
      matchedCourses: matchedCourses.map(c => c.name),
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem("userEmail", email);
    localStorage.setItem("emailConsent", JSON.stringify(emailData));

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    toast.success("Perfect! We'll send you course details soon! 📧", {
      description: "Check your inbox for personalized course information"
    });

    setIsSubmitting(false);
    setIsSubmitted(true);

    if (onEmailSubmitted) {
      onEmailSubmitted();
    }
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-gradient-to-br from-[#fddb35]/20 via-[#ffd700]/15 to-[#fddb35]/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-6 border-2 border-[#fddb35]/30 shadow-xl">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#fddb35] to-[#ffd700] flex items-center justify-center flex-shrink-0 shadow-lg">
            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-[#1a0a2e]" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-1 flex items-center gap-2">
              Get Your Match Details
              <Sparkles className="w-4 h-4 text-[#fddb35] animate-pulse" />
            </h3>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              We'll email you course information, entry requirements, open days, and application tips
            </p>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-white/90">
            <CheckCircle2 className="w-4 h-4 text-[#fddb35] flex-shrink-0" />
            <span>Course details</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-white/90">
            <CheckCircle2 className="w-4 h-4 text-[#fddb35] flex-shrink-0" />
            <span>Open days</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-white/90">
            <CheckCircle2 className="w-4 h-4 text-[#fddb35] flex-shrink-0" />
            <span>Entry requirements</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-white/90">
            <CheckCircle2 className="w-4 h-4 text-[#fddb35] flex-shrink-0" />
            <span>Application tips</span>
          </div>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <Input
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className="h-12 sm:h-14 text-sm sm:text-base pl-4 pr-4 bg-white/95 border-2 border-white/40 focus:border-[#fddb35] focus:ring-4 focus:ring-[#fddb35]/20 rounded-xl sm:rounded-2xl text-gray-900 placeholder:text-gray-500"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Button
              type="submit"
              disabled={isSubmitting || !email.trim()}
              className="flex-1 h-12 sm:h-14 text-sm sm:text-base font-bold bg-gradient-to-r from-[#cd1f80] to-[#a01866] hover:from-[#a01866] hover:to-[#cd1f80] text-white shadow-lg hover:scale-[1.02] transition-all duration-300 active:scale-95 rounded-xl sm:rounded-2xl"
            >
              {isSubmitting ? (
                <>
                  <span className="animate-pulse">Sending...</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Send Me Course Info
                </>
              )}
            </Button>
          </div>

          <p className="text-xs text-white/60 text-center">
            ✓ Unsubscribe anytime • We respect your privacy
          </p>
        </form>
      </div>
    </div>
  );
};
