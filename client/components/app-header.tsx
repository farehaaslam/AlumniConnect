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

export function AppHeader() {
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
          <Link href="/dashboard" className="text-sm font-medium text-white hover:text-gold transition-colors">
            Dashboard
          </Link>
          <Link href="/directory" className="text-sm font-medium text-white hover:text-gold transition-colors">
            Directory
          </Link>
          <Link href="/feed" className="text-sm font-medium text-white hover:text-gold transition-colors">
            Community Feed
          </Link>
          <Link href="/events" className="text-sm font-medium text-white hover:text-gold transition-colors">
            Events
          </Link>
          <Link href="/jobs" className="text-sm font-medium text-white hover:text-gold transition-colors">
            Job Board
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4 ml-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
            <input
              type="search"
              placeholder="Search..."
              className="h-9 w-[180px] rounded-full bg-white/10 border-0 pl-9 pr-4 text-sm text-white placeholder:text-white/50 focus:ring-1 focus:ring-gold focus:bg-white/20 transition-all duration-200"
            />
          </div>

          <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-gold"></span>
            <span className="sr-only">Notifications</span>
          </Button>

          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <MessageSquare className="h-5 w-5" />
            <span className="sr-only">Messages</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8 border-2 border-gold">
                  <AvatarImage src="/placeholder.svg?height=32&width=32&text=MS" alt="User" />
                  <AvatarFallback className="bg-gold text-navy">MS</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile/me" className="cursor-pointer">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
