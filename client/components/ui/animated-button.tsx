"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  className?: string
}

export const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, variant = "default", size = "default", className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden rounded-md font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-navy text-white hover:bg-navy/90 before:absolute before:inset-0 before:bg-white/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity":
              variant === "default",
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground before:absolute before:inset-0 before:bg-accent/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity":
              variant === "outline",
            "hover:bg-accent hover:text-accent-foreground before:absolute before:inset-0 before:bg-accent/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity":
              variant === "ghost",
            "h-10 px-4 py-2": size === "default",
            "h-9 rounded-md px-3": size === "sm",
            "h-11 rounded-md px-8": size === "lg",
          },
          className,
        )}
        {...props}
      >
        {children}
      </button>
    )
  },
)

AnimatedButton.displayName = "AnimatedButton"
