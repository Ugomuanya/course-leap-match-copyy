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
import { Share2, Instagram, MessageCircle, Facebook, Twitter, Download } from "lucide-react";
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

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, 1920);
      gradient.addColorStop(0, '#667eea');
      gradient.addColorStop(1, '#764ba2');
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
          size="lg"
          className="w-full h-14 text-lg font-bold gap-3 bg-white text-[hsl(var(--ocean-deep))] hover:bg-white/90 shadow-lg"
        >
          <Share2 className="w-5 h-5" />
          Share My Match
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Share Your Course Match! 🎉</DialogTitle>
          <DialogDescription className="text-base">
            Let your friends know you found your perfect course at Lincoln
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Native Share (Mobile) */}
          <Button
            onClick={handleNativeShare}
            className="w-full h-16 text-lg gap-3 bg-gradient-to-r from-[hsl(var(--teal-bright))] to-[hsl(var(--accent))] hover:opacity-90"
            variant="default"
          >
            <Share2 className="w-6 h-6" />
            Share Now
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or share to
              </span>
            </div>
          </div>

          {/* Social Media Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={generateStoryCard}
              variant="outline"
              className="h-16 gap-2 flex-col border-2 hover:border-pink-500 hover:bg-pink-50"
              disabled={isGenerating}
            >
              <Instagram className="w-6 h-6 text-pink-600" />
              <span className="text-sm font-semibold">
                {isGenerating ? "Creating..." : "Instagram"}
              </span>
            </Button>

            <Button
              onClick={() => handleSocialShare("whatsapp")}
              variant="outline"
              className="h-16 gap-2 flex-col border-2 hover:border-green-500 hover:bg-green-50"
            >
              <MessageCircle className="w-6 h-6 text-green-600" />
              <span className="text-sm font-semibold">WhatsApp</span>
            </Button>

            <Button
              onClick={() => handleSocialShare("facebook")}
              variant="outline"
              className="h-16 gap-2 flex-col border-2 hover:border-blue-500 hover:bg-blue-50"
            >
              <Facebook className="w-6 h-6 text-blue-600" />
              <span className="text-sm font-semibold">Facebook</span>
            </Button>

            <Button
              onClick={() => handleSocialShare("twitter")}
              variant="outline"
              className="h-16 gap-2 flex-col border-2 hover:border-sky-500 hover:bg-sky-50"
            >
              <Twitter className="w-6 h-6 text-sky-600" />
              <span className="text-sm font-semibold">Twitter</span>
            </Button>
          </div>

          <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <p className="text-sm text-center font-medium text-gray-700">
              💙 Sharing helps other students discover Lincoln!
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
