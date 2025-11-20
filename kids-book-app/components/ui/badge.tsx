// Small badge/pill to tag templates with labels (STEM, literacy, etc.).
import * as React from "react";

import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "secondary" | "outline";
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "secondary", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        variant === "secondary" && "bg-secondary/20 text-secondary-foreground",
        variant === "outline" && "border border-border text-muted-foreground",
        className
      )}
      {...props}
    />
  )
);
Badge.displayName = "Badge";
