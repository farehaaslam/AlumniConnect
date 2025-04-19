"use client"

import { PageContainer } from "@/components/layout/page-container"
import { AnimatedHero } from "@/components/animated-hero"
import Link from "next/link"
import Image from "next/image"
import { Search, Users, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export default function LandingPage() {
  return (
    <PageContainer>
      <AnimatedHero />

      <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-soft-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-navy">Features</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Everything you need to stay connected with your alumni community.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3 md:gap-12">
            {["Alumni Directory", "Community Feed", "Advanced Search"].map((title, i) => {
              const icons = [Users, MessageSquare, Search]
              const descriptions = [
                "Search and filter through alumni profiles to find and connect with former classmates.",
                "Share updates, post job opportunities, and engage in discussions with fellow alumni.",
                "Find alumni by graduation year, major, location, industry, and more."
              ]
              const Icon = icons[i]
              return (
                <motion.div
                  key={title}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="flex flex-col items-center space-y-4 text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-navy/10 group-hover:bg-navy/20 transition-colors"
                  >
                    <Icon className="h-8 w-8 text-navy" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-navy">{title}</h3>
                  <p className="text-muted-foreground">{descriptions[i]}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Testimonials</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                See what our alumni community has to say about AlumniConnect.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
  <motion.div
    key={i}
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    className="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
  >
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Image
          src={`/placeholder.svg?height=40&width=40&text=A${i}`}
          width={40}
          height={40}
          alt={`Alumni ${i}`}
          className="rounded-full"
        />
        <div>
          <h4 className="text-sm font-semibold">
            {i === 1
              ? "Areeb Khan"
              : i === 2
              ? "Fareha Ansari"
              : "Rehan Siddiqui"}
          </h4>
          <p className="text-xs text-muted-foreground">
            {i === 1
              ? "B.Tech CSE, Class of 2020"
              : i === 2
              ? "ECE, Batch of 2019"
              : "Mechanical Engg., Class of 2018"}
          </p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        {i === 1
          ? `"I didn’t realize how much I missed connecting with my FET-Jamia batchmates until AlumniConnect made it this easy. Total game changer."`
          : i === 2
          ? `"From mentoring juniors to finding old project partners — this portal feels like home for JMI engineers. Love the clean UI too!"`
          : `"Jamia gave us the degree, but this platform gave us the network. Reconnected with so many seniors I’d lost touch with!"`}
      </p>
    </div>
  </motion.div>
))}

          </div>
        </div>
      </section>

      <section id="cta" className="w-full py-12 md:py-24 lg:py-32 bg-navy text-white">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-3"
          >
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Ready to reconnect with your alumni community?
            </h2>
            <p className="mx-auto max-w-[600px] text-white/80 md:text-xl/relaxed">
              Join thousands of alumni who are already part of our network.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mx-auto flex flex-col gap-2 min-[400px]:flex-row justify-center"
          >
            <Link href="/signup">
              <Button size="lg" className="bg-gold text-navy hover:bg-gold/90 shadow-lg shadow-gold/20">
                Sign up now
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="gap-1.5 border-white/30 text-gray bg-transparent hover:bg-white/10">
                Log in
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </PageContainer>
  )
}
