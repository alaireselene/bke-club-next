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

    // Variant classes
    const variantClasses = {
      default: "bg-white border border-slate-200/60",
      primary:
        "bg-gradient-to-r from-cardinal-800 via-cardinal-700 to-cardinal-600 text-white",
      secondary:
        "bg-gradient-to-r from-navy-800 via-navy-700 to-navy-600 text-white",
      accent:
        "bg-gradient-to-r from-sunflower-500 to-tangerine-500 text-charcoal-800",
      glass: "bg-white/70 backdrop-blur-md border border-white/20",
      scientific:
        "bg-white border border-slate-200/60 relative after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_30%_20%,rgba(206,22,40,0.05)_0%,transparent_50%)] after:pointer-events-none",
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

    // Hover classes
    const hoverClasses = {
      none: "",
      shadow: "hover:shadow-xl",
      lift: "hover:translate-y-[-4px]",
      glow: "hover:shadow-[0_0_15px_rgba(206,22,40,0.3)]",
      scale: "hover:scale-[1.03]",
      border: "hover:border-cardinal-300",
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
          <div
            className={cn(
              "absolute top-3 right-3 z-10",
              "px-3 py-1",
              "bg-gradient-to-r from-cardinal-600 to-cardinal-500",
              "text-white text-xs font-medium tracking-wide",
              "rounded-full shadow-sm",
              "animate-fade-in",
              "flex items-center gap-1"
            )}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span>
            Nổi bật
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
