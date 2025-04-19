"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export function AnimatedCard({ children, className, ...props }: AnimatedCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-4px]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
