"use client"

import Link from "next/link"
import { MapPin, Briefcase } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"

interface ProfileCardProps {
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
  }
  index?: number
  delay?: number
}

export function ProfileCard({ alumni, index = 0, delay = 0 }: ProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: delay || index * 0.05 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Link href={`/profile/${alumni.id}`} className="block h-full">
        <Card className="h-full overflow-hidden profile-card border-navy/10 hover:border-gold/30">
          <div className="p-6">
            <div className="flex flex-col items-center text-center profile-content">
              <div className="relative mb-4">
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-gold to-navy/50 opacity-0 group-hover:opacity-70 blur transition-opacity duration-300"></div>
                <Avatar className="h-24 w-24 relative border-2 border-white group-hover:border-gold transition-all duration-300">
                  <AvatarImage src={alumni.avatar || "/placeholder.svg"} alt={alumni.name} />
                  <AvatarFallback className="bg-navy text-gold">
                    {alumni.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-navy text-lg">{alumni.name}</h3>
                <p className="text-sm text-navy/70">Class of {alumni.graduationYear}</p>
                <p className="text-sm text-navy/80">{alumni.major}</p>
                <p className="text-sm text-navy/70">{alumni.branch}</p>
              </div>
            </div>
          </div>
          <div className="bg-navy/5 px-6 py-4 border-t border-navy/10">
            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center text-sm text-navy/70">
                <MapPin className="mr-1 h-3 w-3" />
                {alumni.location}
              </div>
              <div className="flex items-center text-sm text-navy/70">
                <Briefcase className="mr-1 h-3 w-3" />
                {alumni.jobTitle} at {alumni.company}
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}
