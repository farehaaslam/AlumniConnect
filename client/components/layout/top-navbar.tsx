"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { GraduationCap, Bell, MessageSquare, Menu, Search, Plus } from "lucide-react"
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
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface TopNavbarProps {
  onMenuClick: () => void
  className?: string
}

export function TopNavbar({ onMenuClick, className }: TopNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white",
        className,
      )}
    >
      <div className="flex h-16 items-center px-4">
        <Button variant="ghost" size="icon" className="lg:hidden mr-2" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        <Link href="/" className="flex items-center gap-2 mr-4">
          <GraduationCap className="h-6 w-6 text-gold" />
          <span className="text-xl font-bold text-navy hidden md:inline-block">AlumniConnect</span>
        </Link>

        <div className="flex-1 flex justify-center">
          <div
            className={cn(
              "relative transition-all duration-300 max-w-md w-full",
              searchOpen ? "w-full" : "w-0 md:w-full",
            )}
          >
            {(searchOpen || (!searchOpen && window.innerWidth >= 768)) && (
              <Input
                type="search"
                placeholder="Search alumni, posts, events..."
                className="w-full bg-gray-50 border-gray-200 focus:ring-navy focus:border-navy pl-10"
              />
            )}
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          {!searchOpen && window.innerWidth < 768 && (
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
              <Search className="h-5 w-5" />
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Button variant="ghost" size="icon" className="relative text-navy hover:bg-navy/5 hidden md:flex">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-gold"></span>
            <span className="sr-only">Notifications</span>
          </Button>

          <Button variant="ghost" size="icon" className="text-navy hover:bg-navy/5 hidden md:flex">
            <MessageSquare className="h-5 w-5" />
            <span className="sr-only">Messages</span>
          </Button>

          <Button variant="default" size="sm" className="bg-navy text-white hover:bg-navy/90 hidden md:flex">
            <Plus className="h-4 w-4 mr-1" />
            Create Post
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
              <DropdownMenuItem className="md:hidden">Notifications</DropdownMenuItem>
              <DropdownMenuItem className="md:hidden">Messages</DropdownMenuItem>
              <DropdownMenuItem className="md:hidden">Create Post</DropdownMenuItem>
              <DropdownMenuSeparator className="md:hidden" />
              <DropdownMenuItem className="cursor-pointer">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
