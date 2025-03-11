"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type BaseCardProps = {
  featured?: boolean;
  padding?: string;
  hover?: boolean;
  background?: string;
  border?: string;
  rounded?: string;
  shadow?: string;
  hoverShadow?: string;
  hoverScale?: boolean;
  transition?: string;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const BaseCard = forwardRef<HTMLDivElement, BaseCardProps>(
  (
    {
      featured,
      padding = "p-4",
      hover = false,
      background = "bg-base-100",
      border = "border border-base-200",
      rounded = "rounded-lg",
      shadow = "shadow-sm",
      hoverShadow = "hover:shadow-md",
      hoverScale = false,
      transition = "transition-all",
      className,
      children,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      "card group relative flex flex-col overflow-hidden",
      padding,
      background,
      border,
      rounded,
      shadow,
      hover ? hoverShadow : "",
      hoverScale ? "hover:scale-105" : "",
      transition,
      className
    );

    return (
      <div ref={ref} className={classes} {...props}>
        {featured && (
          <div
            className={cn(
              "badge badge-accent absolute top-2 right-2 z-10",
              "px-2 py-0.5",
              "text-xs font-medium"
            )}
          >
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
export type { BaseCardProps };
