import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Share2, Instagram, MessageCircle, Facebook, Twitter, Sparkles, X, GraduationCap } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonProps {
  courseName: string;
  courseId?: string;
}

export const ShareButton = ({ courseName, courseId }: ShareButtonProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const shareUrl = `${window.location.origin}/course/${courseId || "match"}`;
  const shareText = `I matched with ${courseName} at University of Lincoln! 🎓 Find your perfect course match! #MyLincolnMatch #UniLincoln`;
  const hashtags = "MyLincolnMatch,UniLincoln,CourseMatch";

  // Generate shareable Instagram Story card using Canvas API
  const generateStoryCard = async () => {
    setIsGenerating(true);
    try {
      // Create canvas
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Could not get canvas context');
      }

      // Background gradient - Lincoln branding
      const gradient = ctx.createLinearGradient(0, 0, 0, 1920);
      gradient.addColorStop(0, '#cd1f80'); // Lincoln Pink
      gradient.addColorStop(0.5, '#a01866'); // Lincoln Pink Dark
      gradient.addColorStop(1, '#1a0a2e'); // Dark Purple
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1080, 1920);

      // White text
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';

      // Emoji
      ctx.font = 'bold 180px Arial';
      ctx.fillText('🎓', 540, 400);

      // Title
      ctx.font = 'bold 100px Arial';
      ctx.fillText('I Found My Match!', 540, 600);

      // Course name box
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.fillRect(90, 700, 900, 400);

      ctx.fillStyle = 'white';
      ctx.font = 'bold 70px Arial';

      // Word wrap for course name
      const words = courseName.split(' ');
      let line = '';
      let y = 850;
      const maxWidth = 800;
      const lineHeight = 90;

      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const metrics = ctx.measureText(testLine);

        if (metrics.width > maxWidth && i > 0) {
          ctx.fillText(line, 540, y);
          line = words[i] + ' ';
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 540, y);

      // University text
      ctx.font = '60px Arial';
      ctx.fillText('at University of Lincoln', 540, 1250);

      // Hashtag
      ctx.font = 'bold 80px Arial';
      ctx.fillText('#MyLincolnMatch', 540, 1400);

      // CTA
      ctx.font = '50px Arial';
      ctx.fillText('Find your perfect course →', 540, 1550);

      // Convert canvas to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = `lincoln-match-${Date.now()}.png`;
          link.href = url;
          link.click();
          URL.revokeObjectURL(url);

          toast.success("Story card downloaded! 📸 Upload it to your Instagram Story");
        }
      }, 'image/png');

      setIsGenerating(false);
    } catch (error) {
      console.error("Error generating card:", error);
      toast.error("Failed to generate story card. Please try again.");
      setIsGenerating(false);
    }
  };

  // Native Web Share API (works on mobile)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Lincoln Course Match",
          text: shareText,
          url: shareUrl,
        });
        toast.success("Thanks for sharing! 🎉");
      } catch (error: any) {
        // User cancelled
        if (error.name !== 'AbortError') {
          console.log("Share failed:", error);
        }
      }
    } else {
      // Fallback to copying link
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      toast.success("Link copied to clipboard! 📋");
    }
  };

  // Social media share URLs
  const handleSocialShare = (platform: string) => {
    const urls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${hashtags}`,
    };

    if (urls[platform]) {
      window.open(urls[platform], "_blank", "width=600,height=400");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full h-12 sm:h-14 rounded-2xl font-bold text-sm sm:text-base bg-white/15 hover:bg-white/25 text-white border-2 border-white/30 hover:border-white/40 shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
        >
          <Share2 className="w-5 h-5" />
          Share My Match
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#cd1f80] via-[#a01866] to-[#1a0a2e] border-2 border-white/20 text-white">
        <DialogHeader className="text-center space-y-3">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#fddb35] to-[#ffd700] flex items-center justify-center shadow-2xl">
              <Share2 className="w-8 h-8 sm:w-10 sm:h-10 text-[#cd1f80]" />
            </div>
          </div>

          <DialogTitle className="text-xl sm:text-2xl md:text-3xl font-black text-white">
            Share Your Match! 🎉
          </DialogTitle>
          <DialogDescription className="text-white/80 text-sm sm:text-base">
            Let your friends know you found your perfect course at Lincoln
          </DialogDescription>

          {/* University Badge */}
          <div className="inline-flex items-center gap-2 bg-[#fddb35]/20 px-4 py-2 rounded-full border border-[#fddb35]/30 mx-auto">
            <GraduationCap className="w-4 h-4 text-[#fddb35]" />
            <span className="text-[#fddb35] text-xs sm:text-sm font-bold">University of Lincoln</span>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Native Share (Mobile) - Primary CTA */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#fddb35] to-[#ffd700] rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <Button
              onClick={handleNativeShare}
              className="relative w-full h-14 sm:h-16 text-base sm:text-lg font-bold bg-gradient-to-r from-[#fddb35] to-[#ffd700] hover:from-[#ffd700] hover:to-[#fddb35] text-[#1a0a2e] shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 rounded-2xl"
            >
              <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Share Now</span>
            </Button>
          </div>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/30" />
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm uppercase">
              <span className="bg-transparent px-3 text-white/60 font-semibold">
                Or share to
              </span>
            </div>
          </div>

          {/* Social Media Buttons */}
          <div className="grid grid-cols-2 gap-3">
            {/* Instagram */}
            <button
              onClick={generateStoryCard}
              disabled={isGenerating}
              className="h-20 sm:h-24 rounded-2xl bg-white/10 hover:bg-white/20 border-2 border-white/20 hover:border-pink-500/50 transition-all duration-300 flex flex-col items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Instagram className="w-7 h-7 sm:w-8 sm:h-8 text-pink-400" />
              <span className="text-xs sm:text-sm font-bold text-white">
                {isGenerating ? "Creating..." : "Instagram"}
              </span>
            </button>

            {/* WhatsApp */}
            <button
              onClick={() => handleSocialShare("whatsapp")}
              className="h-20 sm:h-24 rounded-2xl bg-white/10 hover:bg-white/20 border-2 border-white/20 hover:border-green-500/50 transition-all duration-300 flex flex-col items-center justify-center gap-2 active:scale-95"
            >
              <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-green-400" />
              <span className="text-xs sm:text-sm font-bold text-white">WhatsApp</span>
            </button>

            {/* Facebook */}
            <button
              onClick={() => handleSocialShare("facebook")}
              className="h-20 sm:h-24 rounded-2xl bg-white/10 hover:bg-white/20 border-2 border-white/20 hover:border-blue-500/50 transition-all duration-300 flex flex-col items-center justify-center gap-2 active:scale-95"
            >
              <Facebook className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400" />
              <span className="text-xs sm:text-sm font-bold text-white">Facebook</span>
            </button>

            {/* Twitter */}
            <button
              onClick={() => handleSocialShare("twitter")}
              className="h-20 sm:h-24 rounded-2xl bg-white/10 hover:bg-white/20 border-2 border-white/20 hover:border-sky-500/50 transition-all duration-300 flex flex-col items-center justify-center gap-2 active:scale-95"
            >
              <Twitter className="w-7 h-7 sm:w-8 sm:h-8 text-sky-400" />
              <span className="text-xs sm:text-sm font-bold text-white">Twitter</span>
            </button>
          </div>

          {/* Info Box */}
          <div className="mt-4 p-4 bg-[#fddb35]/10 rounded-2xl border border-[#fddb35]/30">
            <p className="text-sm sm:text-base text-center font-medium text-white/90 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-[#fddb35]" />
              Sharing helps other students discover Lincoln!
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
