"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Users,
  MessageSquare,
  Calendar,
  Briefcase,
  Settings,
  LogOut,
  X,
  ChevronLeft,
  ChevronRight,
  Home,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Check if mobile on mount and on resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setIsCollapsed(true)
      }
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  return (
    <>
      {/* Mobile filter overlay */}
      <AnimatePresence>
        {isMobile && isFilterOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFilterOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile filter button */}
      {isMobile && (
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-6 right-6 z-30 rounded-full shadow-lg bg-navy text-white border-none hover:bg-navy/90"
          onClick={toggleFilter}
        >
          <Filter className="h-5 w-5" />
        </Button>
      )}

      {/* Sidebar */}
      <motion.aside
        className={cn(
          "fixed top-0 left-0 z-30 h-screen bg-white border-r border-gray-200 shadow-sm transition-all duration-300 flex flex-col",
          isCollapsed ? "w-[70px]" : "w-[280px]",
          isMobile && isFilterOpen ? "translate-x-0" : isMobile ? "-translate-x-full" : "",
          className,
        )}
        animate={{
          width: isCollapsed ? 70 : 280,
          x: isMobile && !isFilterOpen ? -280 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Sidebar header */}
        <div className="h-16 flex items-center justify-between px-4 border-b">
          {!isCollapsed && (
            <Link href="/" className="flex items-center gap-2">
              <span className="text-lg font-semibold text-navy">AlumniConnect</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto text-navy hover:bg-navy/5"
            onClick={isMobile ? () => setIsFilterOpen(false) : toggleSidebar}
          >
            {isMobile ? (
              <X className="h-5 w-5" />
            ) : isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* User profile */}
        <div className={`p-4 ${isCollapsed ? "items-center" : ""} flex flex-col`}>
          <div className={`flex ${isCollapsed ? "justify-center" : "items-center gap-3"}`}>
            <Avatar className="h-10 w-10 border-2 border-gold">
              <AvatarImage src="/placeholder.svg?height=40&width=40&text=MS" alt="User" />
              <AvatarFallback className="bg-navy text-gold">MS</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-medium text-navy">Michael Scott</span>
                <span className="text-xs text-navy/70">Regional Manager</span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            <li>
              <Link
                href="/dashboard"
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-navy hover:bg-navy/5 ${isCollapsed ? "justify-center" : ""}`}
              >
                <Home className="h-5 w-5 text-navy/70" />
                {!isCollapsed && <span>Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/directory"
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-navy hover:bg-navy/5 ${isCollapsed ? "justify-center" : ""}`}
              >
                <Users className="h-5 w-5 text-navy/70" />
                {!isCollapsed && <span>Alumni Directory</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/feed"
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-navy hover:bg-navy/5 ${isCollapsed ? "justify-center" : ""}`}
              >
                <MessageSquare className="h-5 w-5 text-navy/70" />
                {!isCollapsed && <span>Community Feed</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/events"
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-navy hover:bg-navy/5 ${isCollapsed ? "justify-center" : ""}`}
              >
                <Calendar className="h-5 w-5 text-navy/70" />
                {!isCollapsed && <span>Events</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/jobs"
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-navy hover:bg-navy/5 ${isCollapsed ? "justify-center" : ""}`}
              >
                <Briefcase className="h-5 w-5 text-navy/70" />
                {!isCollapsed && <span>Job Board</span>}
              </Link>
            </li>
          </ul>

          {!isCollapsed && (
            <>
              <Separator className="my-4 bg-gray-200" />

        
            </>
          )}
        </nav>

        {/* Bottom actions */}
        <div className="p-4 border-t">
          <ul className="space-y-1">
            <li>
              <Link
                href="/settings"
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-navy hover:bg-navy/5 ${isCollapsed ? "justify-center" : ""}`}
              >
                <Settings className="h-5 w-5 text-navy/70" />
                {!isCollapsed && <span>Settings</span>}
              </Link>
            </li>
            <li>
              <button
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-navy hover:bg-navy/5 ${isCollapsed ? "justify-center" : ""}`}
              >
                <LogOut className="h-5 w-5 text-navy/70" />
                {!isCollapsed && <span>Logout</span>}
              </button>
            </li>
          </ul>
        </div>
      </motion.aside>
    </>
  )
}
