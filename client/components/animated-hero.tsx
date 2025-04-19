"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { MotionButton } from "./motionButton"
import jmiPic from "./jmi.jpg"
import Image from "next/image"


export function AnimatedHero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-navy to-navy/90 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-navy-600/20 via-navy-700/10 to-navy/5 animate-gradient-shift"></div>

        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gold/10"
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-2">
              <motion.h1
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Connect with your alumni network
              </motion.h1>
              <motion.p
                className="max-w-[600px] text-white/80 md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Catch up with your FET family, make meaningful connections, and stay in the loop with everything happening at Faculty of Engineering & Technology, Jamia Millia Islamia.
              </motion.p>
            </div>
            <motion.div
              className="flex flex-col gap-2 min-[400px]:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link href="/signup">
  <MotionButton
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    size="lg"
    className="gap-1.5 bg-gold text-navy hover:bg-gold/90 shadow-lg shadow-gold/20"
  >
    Join now
    <ArrowRight className="h-4 w-4" />
  </MotionButton>
</Link>

<Link href="/login">
  <MotionButton
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    size="lg"
    variant="outline"
    className="gap-1.5 border-white/30 text-gray bg-transparent hover:bg-white/10"
  >
    Log in
    <ArrowRight className="h-4 w-4" />
  </MotionButton>
</Link>
            </motion.div>
          </motion.div>
          <motion.div
            className="mx-auto aspect-video overflow-hidden rounded-xl sm:w-full lg:order-last"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-navy-400/20 backdrop-blur-sm border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 via-transparent to-navy-600/30"></div>
              <Image
                src={jmiPic}
                alt="FET"
                className="w-full h-full object-cover mix-blend-overlay opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
