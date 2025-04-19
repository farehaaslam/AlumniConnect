"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { GraduationCap, Bell, MessageSquare, Menu, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-navy/95 backdrop-blur-md shadow-md" : "bg-navy"
      }`}
    >
      <div className="container flex h-16 md:h-20 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 z-50">
          <GraduationCap className="h-6 w-6 text-gold" />
          <span className="text-xl font-bold text-white">AlumniConnect</span>
        </Link>

        {/* Mobile menu button */}
        <button className="md:hidden z-50 ml-auto text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile menu */}
        <div
          className={`fixed inset-0 bg-navy/95 backdrop-blur-md flex flex-col items-center justify-center space-y-8 transition-all duration-300 md:hidden ${
            isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <Link
            href="/dashboard"
            className="text-lg font-medium text-white hover:text-gold transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            href="/directory"
            className="text-lg font-medium text-white hover:text-gold transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Directory
          </Link>
          <Link
            href="/feed"
            className="text-lg font-medium text-white hover:text-gold transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Community Feed
          </Link>
          <Link
            href="/events"
            className="text-lg font-medium text-white hover:text-gold transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Events
          </Link>
          <Link
            href="/jobs"
            className="text-lg font-medium text-white hover:text-gold transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Job Board
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex gap-8 ml-10 flex-1">
          <Link href="/login" className="text-sm font-medium text-white hover:text-gold transition-colors">
            Dashboard
          </Link>
          <Link href="/login" className="text-sm font-medium text-white hover:text-gold transition-colors">
            Directory
          </Link>
          <Link href="/login" className="text-sm font-medium text-white hover:text-gold transition-colors">
            Community Feed
          </Link>
          <Link href="/login" className="text-sm font-medium text-white hover:text-gold transition-colors">
            Events
          </Link>
          <Link href="/login" className="text-sm font-medium text-white hover:text-gold transition-colors">
            Job Board
          </Link>
        </nav>

        
      </div>
    </header>
  )
}
