"use client"

import { useState, useRef } from "react"
import { ImageIcon, Smile, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"

interface PostComposerProps {
  onSubmit: (content: string) => void
  isSubmitting: boolean
}

export function PostComposer({ onSubmit, isSubmitting }: PostComposerProps) {
  const [content, setContent] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    if (!content.trim()) return
    onSubmit(content)
  }

  const handleImageUpload = () => {
    fileInputRef.current?.click()
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="border-navy/10 overflow-hidden glass-card">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <Avatar className="h-10 w-10 border-2 border-gold">
              <AvatarImage src="/placeholder.svg?height=40&width=40&text=MS" alt="User" />
              <AvatarFallback className="bg-navy text-gold">MS</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
              <Textarea
                placeholder="Share something with your alumni network..."
                className="min-h-[100px] resize-none bg-white/50 backdrop-blur-sm border-navy/10 focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-200"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-navy hover:text-gold hover:bg-navy/5"
                    onClick={handleImageUpload}
                  >
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Photo
                  </Button>
                  <Button variant="ghost" size="sm" className="text-navy hover:text-gold hover:bg-navy/5">
                    <Smile className="mr-2 h-4 w-4" />
                    Feeling
                  </Button>
                </div>
                <Button
                  size="sm"
                  className="bg-navy text-white hover:bg-navy/90 btn-glow"
                  onClick={handleSubmit}
                  disabled={isSubmitting || !content.trim()}
                >
                  {isSubmitting ? (
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
                      Posting...
                    </div>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Post
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
