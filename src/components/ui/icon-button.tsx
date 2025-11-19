import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const iconButtonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        coral: "bg-[hsl(var(--coral))] text-white shadow-lg hover:scale-110 hover:shadow-[0_0_20px_hsl(var(--coral))]",
        success: "bg-[hsl(var(--success))] text-white shadow-lg hover:scale-110 hover:shadow-[0_0_20px_hsl(var(--success))]",
        reject: "bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white shadow-lg hover:scale-110 hover:bg-white/20",
        lavender: "bg-[hsl(var(--lavender))] text-white shadow-lg hover:scale-110",
      },
      size: {
        default: "h-14 w-14",
        lg: "h-20 w-20",
        sm: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(iconButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
