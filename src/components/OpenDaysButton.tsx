import { Calendar, ExternalLink } from "lucide-react";

interface OpenDaysButtonProps {
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const OpenDaysButton = ({
  variant = "secondary",
  className = "",
  size = "md"
}: OpenDaysButtonProps) => {
  const handleOpenDaysClick = () => {
    // University of Lincoln official open days booking page
    window.open(
      "https://www.lincoln.ac.uk/studywithus/opendaysandvisits/",
      "_blank",
      "noopener,noreferrer"
    );
  };

  // Size classes
  const sizeClasses = {
    sm: "h-12 text-sm px-4",
    md: "h-14 text-base px-6",
    lg: "h-16 text-lg px-8"
  };

  // Variant classes
  const variantClasses = {
    primary: `
      bg-gradient-to-r from-[#fddb35] to-[#ffd700]
      hover:from-[#ffd700] hover:to-[#fddb35]
      text-[#1a0a2e]
      shadow-xl
      border-2 border-white/30
    `,
    secondary: `
      bg-white/10 hover:bg-white/20
      text-white
      border border-white/30 hover:border-white/40
    `,
    outline: `
      relative
      bg-transparent hover:bg-white/5
      text-white
      border-2 border-transparent
      overflow-hidden
    `
  };

  return (
    <button
      onClick={handleOpenDaysClick}
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        rounded-xl
        font-semibold
        transition-all duration-300
        flex items-center justify-center gap-2
        active:scale-95
        hover:scale-[1.02]
        ${className}
      `}
      aria-label="Book University of Lincoln Open Days"
    >
      {/* Animated Gradient Border for outline variant */}
      {variant === "outline" && (
        <>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#fddb35] via-[#cd1f80] to-[#fddb35] bg-[length:200%_100%] animate-gradient-x p-[2px]">
            <div className="w-full h-full rounded-[10px] bg-[#1a0a2e]"></div>
          </div>
          <style>{`
            @keyframes gradient-x {
              0%, 100% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
            }
            .animate-gradient-x {
              animation: gradient-x 3s ease infinite;
            }
          `}</style>
        </>
      )}

      <Calendar className={`w-5 h-5 ${variant === "outline" ? "relative z-10" : ""}`} />
      <span className={variant === "outline" ? "relative z-10" : ""}>Book Open Days</span>
      <ExternalLink className={`w-4 h-4 ${variant === "outline" ? "relative z-10" : ""}`} />
    </button>
  );
};
