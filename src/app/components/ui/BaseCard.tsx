"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type CardVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "glass"
  | "scientific";

type CardSize = "sm" | "md" | "lg";
type CardRounded = "none" | "sm" | "md" | "lg" | "full";
type CardShadow = "none" | "sm" | "md" | "lg";
type CardHover = "none" | "shadow" | "lift" | "glow" | "scale" | "border";

type BaseCardProps = {
  featured?: boolean;
  variant?: CardVariant;
  size?: CardSize;
  rounded?: CardRounded;
  shadow?: CardShadow;
  hover?: CardHover;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const BaseCard = forwardRef<HTMLDivElement, BaseCardProps>(
  (
    {
      featured,
      variant = "default",
      size = "md",
      rounded = "md",
      shadow = "md",
      hover = "lift",
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Base classes
    const baseClasses =
      "card group relative flex flex-col overflow-hidden transition-all duration-300";

    // Variant classes with enhanced visual effects
    const variantClasses = {
      default: "bg-white/90 border border-charcoal-200/40 backdrop-blur-sm",
      primary:
        "bg-gradient-to-br from-cardinal-700 via-cardinal-600 to-cardinal-800 text-white border border-cardinal-400/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]",
      secondary:
        "bg-gradient-to-br from-navy-700 via-navy-600 to-navy-800 text-white border border-navy-400/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]",
      accent:
        "bg-gradient-to-br from-sunflower-400 via-sunflower-500 to-sunflower-600 text-charcoal-900 border border-sunflower-300/40 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]",
      glass:
        "bg-white/60 backdrop-blur-md border border-white/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4),0_0_12px_rgba(0,0,0,0.03)]",
      scientific:
        "bg-gradient-to-b from-white to-navy-50/30 border border-charcoal-200/40 relative after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_30%_20%,rgba(206,22,40,0.08)_0%,transparent_50%),radial-gradient(circle_at_70%_60%,rgba(0,51,102,0.08)_0%,transparent_50%)] after:pointer-events-none",
    };

    // Size classes
    const sizeClasses = {
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
    };

    // Rounded classes
    const roundedClasses = {
      none: "rounded-none",
      sm: "rounded-md",
      md: "rounded-xl",
      lg: "rounded-2xl",
      full: "rounded-3xl",
    };

    // Shadow classes
    const shadowClasses = {
      none: "",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
    };

    // Hover classes with enhanced effects
    const hoverClasses = {
      none: "",
      shadow: "hover:shadow-xl hover:shadow-charcoal-900/5",
      lift: "hover:-translate-y-1 hover:shadow-lg hover:shadow-charcoal-900/5",
      glow: "hover:shadow-[0_0_20px_rgba(206,22,40,0.2)] hover:border-cardinal-300/50",
      scale: "hover:scale-[1.02] hover:shadow-lg hover:shadow-charcoal-900/5",
      border: "hover:border-cardinal-400 hover:shadow-sm",
    };

    const classes = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      roundedClasses[rounded],
      shadowClasses[shadow],
      hoverClasses[hover],
      className
    );

    return (
      <div ref={ref} className={classes} {...props}>
        {featured && (
          <div className="absolute -right-12 top-6 z-10 -rotate-45 transform">
            <div
              className={cn(
                "px-12 py-1",
                "bg-gradient-to-r from-cardinal-600 via-cardinal-500 to-cardinal-600",
                "text-white text-xs font-semibold tracking-wider uppercase",
                "shadow-sm shadow-cardinal-900/10",
                "animate-fade-in",
                "flex items-center justify-center gap-1.5",
                "border-t border-b border-white/10",
                "after:absolute after:inset-0 after:bg-gradient-to-b after:from-white/10 after:to-transparent after:pointer-events-none"
              )}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
              </span>
              Nổi bật
            </div>
          </div>
        )}
        {children}
      </div>
    );
  }
);

BaseCard.displayName = "BaseCard";

export { BaseCard };
export type {
  BaseCardProps,
  CardVariant,
  CardSize,
  CardRounded,
  CardShadow,
  CardHover,
};
