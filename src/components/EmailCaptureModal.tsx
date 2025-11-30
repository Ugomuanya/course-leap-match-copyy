import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Heart, Send, GraduationCap, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchedCourses: Array<{ name: string }>;
}

export const EmailCaptureModal = ({ isOpen, onClose, matchedCourses }: EmailCaptureModalProps) => {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
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

    if (!consent) {
      toast.error("Please agree to receive course information");
      return;
    }

    setIsSubmitting(true);

    // Store in localStorage (ready for backend integration later)
    const emailData = {
      email,
      consent,
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
    onClose();
  };

  const handleMaybeLater = () => {
    toast.info("No problem! You can always find course details on our website", {
      description: "Your matches are saved in Course Details"
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#cd1f80] via-[#a01866] to-[#1a0a2e] border-2 border-white/20 text-white">
        <DialogHeader className="text-center space-y-3">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#fddb35] to-[#ffd700] flex items-center justify-center shadow-2xl animate-bounce">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-[#cd1f80] fill-[#cd1f80]" />
            </div>
          </div>

          <DialogTitle className="text-xl sm:text-2xl md:text-3xl font-black text-white">
            You Found {matchedCourses.length} Perfect {matchedCourses.length === 1 ? 'Match' : 'Matches'}! 🎓
          </DialogTitle>
          <DialogDescription className="text-white/80 text-sm sm:text-base">
            Get detailed course information sent directly to your inbox
          </DialogDescription>

          {/* University Badge */}
          <div className="inline-flex items-center gap-2 bg-[#fddb35]/20 px-4 py-2 rounded-full border border-[#fddb35]/30 mx-auto">
            <GraduationCap className="w-4 h-4 text-[#fddb35]" />
            <span className="text-[#fddb35] text-xs sm:text-sm font-bold">University of Lincoln</span>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Matched Courses List */}
          <div className="bg-white/10 rounded-2xl p-4 space-y-2.5 border border-white/20">
            <p className="text-white font-bold text-sm mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#fddb35]" />
              Your Matched Courses:
            </p>
            {matchedCourses.slice(0, 3).map((course, index) => (
              <div key={index} className="flex items-start gap-2">
                <Heart className="w-4 h-4 text-[#fddb35] fill-[#fddb35] mt-0.5 flex-shrink-0" />
                <p className="text-sm sm:text-base text-white/90 leading-tight">{course.name}</p>
              </div>
            ))}
            {matchedCourses.length > 3 && (
              <p className="text-xs text-white/60 pl-6">+ {matchedCourses.length - 3} more {matchedCourses.length - 3 === 1 ? 'course' : 'courses'}</p>
            )}
          </div>

          {/* Benefits */}
          <div className="bg-[#fddb35]/10 rounded-2xl p-4 border border-[#fddb35]/30">
            <p className="text-white font-bold text-sm mb-3">We'll email you:</p>
            <div className="grid grid-cols-2 gap-2.5 text-sm text-white/90">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#fddb35] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#1a0a2e] text-xs font-bold">✓</span>
                </div>
                <span>Course details</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#fddb35] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#1a0a2e] text-xs font-bold">✓</span>
                </div>
                <span>Open days</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#fddb35] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#1a0a2e] text-xs font-bold">✓</span>
                </div>
                <span>Entry requirements</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#fddb35] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#1a0a2e] text-xs font-bold">✓</span>
                </div>
                <span>Application tips</span>
              </div>
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-white font-semibold text-sm block">
              Your Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="pl-10 h-12 text-base bg-white/90 border-2 border-white/30 focus:border-[#fddb35] focus:ring-4 focus:ring-[#fddb35]/20 rounded-xl"
                disabled={isSubmitting}
                autoFocus
              />
            </div>
          </div>

          {/* GDPR Consent */}
          <div className="flex items-start space-x-3 bg-white/10 p-3 rounded-xl border border-white/20">
            <Checkbox
              id="consent"
              checked={consent}
              onCheckedChange={(checked) => setConsent(checked as boolean)}
              disabled={isSubmitting}
              className="mt-1 border-white/40 data-[state=checked]:bg-[#fddb35] data-[state=checked]:border-[#fddb35]"
            />
            <label
              htmlFor="consent"
              className="text-xs sm:text-sm leading-relaxed cursor-pointer text-white/90"
            >
              I agree to receive course information from University of Lincoln. You can unsubscribe anytime.
            </label>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            {/* Primary CTA */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#fddb35] to-[#ffd700] rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="relative w-full h-12 sm:h-14 text-base sm:text-lg font-bold bg-gradient-to-r from-[#fddb35] to-[#ffd700] hover:from-[#ffd700] hover:to-[#fddb35] text-[#1a0a2e] shadow-2xl hover:scale-[1.02] transition-all duration-300 active:scale-95 rounded-2xl"
                aria-label="Send me course information"
              >
                {isSubmitting ? (
                  <>
                    <Send className="w-5 h-5 animate-pulse" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Me Course Info</span>
                  </>
                )}
              </Button>
            </div>

            {/* Secondary CTA */}
            <Button
              onClick={handleMaybeLater}
              variant="ghost"
              className="w-full h-10 sm:h-12 text-sm sm:text-base text-white/80 hover:text-white hover:bg-white/10 rounded-xl"
              disabled={isSubmitting}
            >
              Maybe Later
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
