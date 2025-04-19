import type * as React from "react"
import { cn } from "@/lib/utils"

interface GlassmorphismCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export function GlassmorphismCard({ children, className, ...props }: GlassmorphismCardProps) {
  return (
    <div
      className={cn("rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-lg", className)}
      {...props}
    >
      {children}
    </div>
  )
}
