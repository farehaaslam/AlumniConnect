import type { ReactNode } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

interface PageContainerProps {
  children: ReactNode
  showFooter?: boolean
  className?: string
}

export function PageContainer({ children, showFooter = true, className = "" }: PageContainerProps) {
  return (
    <div className={`flex min-h-screen flex-col bg-cream ${className}`}>
      <Navbar />
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  )
}
