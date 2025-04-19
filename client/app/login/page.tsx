"use client"


import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import Link from "next/link"
import { GraduationCap } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuthName } from "../../hooks/useAuthName"

interface Message {
  text: string
  type: "success" | "error" | ""
}

export default function AnimatedLoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<Message>({ text: "", type: "" })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage({ text: "", type: "" })

    try {
      await axios.post("http://localhost:3000/alumni/login", {
        email,
        password,
      })

      setMessage({ text: "Sign in successful! Redirecting...", type: "success" })

      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
    } catch (error: any) {
      setMessage({
        text: error.response?.data?.message || "Sign in failed. Please check your credentials.",
        type: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-navy-50 to-cream">
      <div className="flex h-16 items-center border-b px-4 md:px-6 bg-white/80 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-navy" />
          <span className="text-xl font-bold text-navy">AlumniConnect</span>
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center py-12">
        <motion.div
          className="mx-auto grid w-full max-w-md gap-6 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-2 text-center">
            <motion.h1
              className="text-3xl font-bold text-navy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Welcome Back
            </motion.h1>
            <motion.p
              className="text-navy/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Enter your credentials to access your account
            </motion.p>
          </div>

          {message.text && (
            <div
              className={`p-4 text-sm rounded-lg ${
                message.type === "error"
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {message.text}
            </div>
          )}

          <motion.form
            className="space-y-4"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="space-y-2">
              <Label htmlFor="email" className="text-navy">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                className="bg-white/50 backdrop-blur-sm border-navy/10 focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-navy">
                  Password
                </Label>
                <Link href="/forgot-password" className="text-sm text-navy/70 hover:text-gold transition-colors">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                className="bg-white/50 backdrop-blur-sm border-navy/10 focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={() => setRememberMe(!rememberMe)}
                className="text-gold border-navy/30 focus:ring-gold"
              />
              <Label htmlFor="remember" className="text-sm font-normal text-navy/80">
                Remember me
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-navy text-white hover:bg-navy/90 shadow-md"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging in...
                </div>
              ) : (
                "Login"
              )}
            </Button>
          </motion.form>

          <motion.div
            className="mt-4 text-center text-sm text-navy/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-navy hover:text-gold transition-colors">
              Sign up
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}