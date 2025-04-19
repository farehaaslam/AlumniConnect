"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"

export function DashboardSidebar() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <Card className="border-navy/10 overflow-hidden">
          <CardHeader className="pb-3">
            <h3 className="text-lg font-medium text-navy">My Profile</h3>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-gold">
                <AvatarImage src="/placeholder.svg?height=48&width=48&text=MS" alt="User" />
                <AvatarFallback className="bg-navy text-gold">MS</AvatarFallback>
              </Avatar>
              <div>
                <Link href="/profile/me" className="font-medium text-navy hover:text-gold transition-colors">
                  Michael Scott
                </Link>
                <p className="text-xs text-navy/70">Regional Manager at Dunder Mifflin</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 text-center">
              <div className="rounded-md bg-navy/5 p-3">
                <div className="font-medium text-navy">152</div>
                <div className="text-xs text-navy/70">Connections</div>
              </div>
              <div className="rounded-md bg-navy/5 p-3">
                <div className="font-medium text-navy">24</div>
                <div className="text-xs text-navy/70">Posts</div>
              </div>
            </div>
            <div className="mt-6">
              <Button variant="outline" size="sm" className="w-full border-navy/20 text-navy hover:bg-navy/5">
                View Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="border-navy/10 overflow-hidden">
          <CardHeader className="pb-3">
            <h3 className="text-lg font-medium text-navy">Upcoming Events</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2 p-3 rounded-lg bg-navy/5 hover:bg-navy/10 transition-colors cursor-pointer">
                <div className="font-medium text-navy">Annual Alumni Reunion</div>
                <div className="text-xs text-navy/70">May 15, 2023 • 6:00 PM</div>
                <div className="text-xs text-navy/70">University Campus</div>
              </div>
              <div className="space-y-2 p-3 rounded-lg bg-navy/5 hover:bg-navy/10 transition-colors cursor-pointer">
                <div className="font-medium text-navy">Networking Mixer</div>
                <div className="text-xs text-navy/70">June 2, 2023 • 7:30 PM</div>
                <div className="text-xs text-navy/70">Downtown Conference Center</div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full text-navy hover:text-gold hover:bg-navy/5">
              View All Events
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="border-navy/10 overflow-hidden">
          <CardHeader className="pb-3">
            <h3 className="text-lg font-medium text-navy">Quick Links</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-navy hover:text-gold hover:bg-navy/5"
              >
                My Connections
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-navy hover:text-gold hover:bg-navy/5"
              >
                Job Board
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-navy hover:text-gold hover:bg-navy/5"
              >
                Alumni Events
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-navy hover:text-gold hover:bg-navy/5"
              >
                Mentorship Program
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
