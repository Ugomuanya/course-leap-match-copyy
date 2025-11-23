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
import { Mail, Heart, Send } from "lucide-react";
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
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl flex items-center gap-2">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 fill-red-500" />
            Amazing! You Found Your Match{matchedCourses.length > 1 ? 'es' : ''}!
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base pt-2">
            Want us to email you detailed information?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 sm:space-y-4 py-2 sm:py-4">
          {/* Matched Courses List */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 space-y-2">
            {matchedCourses.slice(0, 3).map((course, index) => (
              <div key={index} className="flex items-start gap-2">
                <Heart className="w-4 h-4 text-purple-600 fill-purple-600 mt-1 flex-shrink-0" />
                <p className="text-sm font-semibold text-gray-700">{course.name}</p>
              </div>
            ))}
            {matchedCourses.length > 3 && (
              <p className="text-xs text-gray-500 pl-6">+ {matchedCourses.length - 3} more course{matchedCourses.length - 3 > 1 ? 's' : ''}</p>
            )}
          </div>

          {/* Benefits - Compact */}
          <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-gray-700 font-medium mb-2">We'll send you:</p>
            <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <span className="text-green-500">✓</span>
                Course details
              </div>
              <div className="flex items-center gap-1">
                <span className="text-green-500">✓</span>
                Open days
              </div>
              <div className="flex items-center gap-1">
                <span className="text-green-500">✓</span>
                Entry requirements
              </div>
              <div className="flex items-center gap-1">
                <span className="text-green-500">✓</span>
                Application tips
              </div>
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-1.5">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9 sm:pl-10 h-10 sm:h-11 text-sm sm:text-base"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* GDPR Consent */}
          <div className="flex items-start space-x-2 bg-gray-50 p-2.5 sm:p-3 rounded-lg">
            <Checkbox
              id="consent"
              checked={consent}
              onCheckedChange={(checked) => setConsent(checked as boolean)}
              disabled={isSubmitting}
              className="mt-0.5"
            />
            <label
              htmlFor="consent"
              className="text-xs leading-snug cursor-pointer text-gray-600"
            >
              I agree to receive course info from University of Lincoln. Unsubscribe anytime.
            </label>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-1">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full h-10 sm:h-11 text-sm sm:text-base font-bold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isSubmitting ? (
                <>
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  Send Me Info
                </>
              )}
            </Button>

            <Button
              onClick={handleMaybeLater}
              variant="ghost"
              className="w-full h-9 text-xs sm:text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100"
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
