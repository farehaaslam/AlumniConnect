"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { MapPin, UserPlus, X } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface AlumniCardProps {
  alumni: {
    id: number
    name: string
    graduationYear: number
    batch: string
    major: string
    branch: string
    location: string
    company: string
    position: string
    jobTitle: string
    skills: string[]
    avatar: string
    bio?: string
    isConnected?: boolean
  }
  index?: number
  delay?: number
}

export function AlumniCard({ alumni, index = 0, delay = 0 }: AlumniCardProps) {
  const [showPopover, setShowPopover] = useState(false)
  const [isConnected, setIsConnected] = useState(alumni.isConnected || false)
  const [isHovered, setIsHovered] = useState(false)

  const handleConnect = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsConnected(true)
  }

  const handleClosePopover = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowPopover(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: delay || index * 0.05 }}
      className="h-full relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => setShowPopover(true)}
    >
      <Link href={`/profile/${alumni.id}`} className="block h-full">
        <Card className="h-full overflow-hidden border-gray-200 hover:border-navy/30 hover:shadow-md transition-all duration-300">
          <div className="p-5">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
                <AvatarImage src={alumni.avatar || "/placeholder.svg"} alt={alumni.name} />
                <AvatarFallback className="bg-navy text-gold">
                  {alumni.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-navy text-lg truncate">{alumni.name}</h3>
                <p className="text-sm text-navy/70 truncate">
                  {alumni.jobTitle} at {alumni.company}
                </p>

                <div className="flex items-center gap-2 mt-1 text-xs text-navy/60">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{alumni.location}</span>
                </div>

                <div className="flex flex-wrap gap-1 mt-3">
                  <Badge variant="outline" className="bg-navy/5 text-navy border-navy/10 text-xs">
                    {alumni.batch}
                  </Badge>
                  <Badge variant="outline" className="bg-navy/5 text-navy border-navy/10 text-xs">
                    {alumni.branch}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isHovered && !showPopover && (
              <motion.div
                className="absolute inset-0 bg-navy/5 backdrop-blur-[1px] flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  className={`${isConnected ? "bg-green-600 hover:bg-green-700" : "bg-navy hover:bg-navy/90"}`}
                  onClick={handleConnect}
                  disabled={isConnected}
                >
                  {isConnected ? (
                    "Connected"
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-1" />
                      Connect
                    </>
                  )}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </Link>

      {/* Popover */}
      <AnimatePresence>
        {showPopover && (
          <motion.div
            className="absolute z-50 top-0 left-0 right-0 bg-white rounded-lg shadow-xl border border-gray-200 p-5"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{ width: "300px", maxWidth: "calc(100vw - 40px)" }}
          >
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={handleClosePopover}>
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
                <AvatarImage src={alumni.avatar || "/placeholder.svg"} alt={alumni.name} />
                <AvatarFallback className="bg-navy text-gold">
                  {alumni.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div>
                <h3 className="font-semibold text-navy text-lg">{alumni.name}</h3>
                <p className="text-sm text-navy/70">
                  {alumni.jobTitle} at {alumni.company}
                </p>

                <div className="flex items-center gap-2 mt-1 text-xs text-navy/60">
                  <MapPin className="h-3 w-3" />
                  <span>{alumni.location}</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-navy/80">
                {alumni.bio ||
                  `${alumni.name} is a ${alumni.jobTitle} at ${alumni.company} based in ${alumni.location}.`}
              </p>
            </div>

            <div className="flex flex-wrap gap-1 mt-3">
              <Badge variant="outline" className="bg-navy/5 text-navy border-navy/10">
                {alumni.batch}
              </Badge>
              <Badge variant="outline" className="bg-navy/5 text-navy border-navy/10">
                {alumni.branch}
              </Badge>
              {alumni.skills.slice(0, 3).map((skill, i) => (
                <Badge key={i} variant="outline" className="bg-navy/5 text-navy border-navy/10">
                  {skill}
                </Badge>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <Button className="flex-1 bg-navy hover:bg-navy/90" asChild>
                <Link href={`/profile/${alumni.id}`}>View Profile</Link>
              </Button>

              <Button
                variant="outline"
                className={`flex-1 ${isConnected ? "bg-green-50 text-green-600 border-green-200" : "border-navy/20 text-navy hover:bg-navy/5"}`}
                onClick={handleConnect}
                disabled={isConnected}
              >
                {isConnected ? "Connected" : "Connect"}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
