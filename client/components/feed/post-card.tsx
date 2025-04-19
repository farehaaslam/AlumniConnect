"use client"

import { useState } from "react"
import Link from "next/link"
import { MessageSquare, ThumbsUp, Share2, MoreHorizontal, ChevronDown, ChevronUp, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"

interface PostCardProps {
  post: {
    id: number
    author: {
      name: string
      avatar: string
      role: string
      id: number
    }
    title: string
    content: string
    timestamp: string
    likes: number
    comments: number
    shares: number
    isLiked: boolean
    tags: string[]
  }
  index: number
  onLike: (postId: number) => void
  onToggleComments: (postId: number) => void
  expandedComments: number[]
}

export function PostCard({ post, index, onLike, onToggleComments, expandedComments }: PostCardProps) {
  const [commentText, setCommentText] = useState("")

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return
    // In a real app, you would send this to the backend
    setCommentText("")
  }

  const isExpanded = expandedComments.includes(post.id)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="feed-card"
    >
      <Card className="border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300">
        <CardHeader className="pb-3 pt-5 px-5">
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                <AvatarFallback className="bg-navy text-gold">
                  {post.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <Link
                  href={`/profile/${post.author.id}`}
                  className="font-medium text-navy hover:text-gold transition-colors"
                >
                  {post.author.name}
                </Link>
                <p className="text-xs text-navy/70">{post.author.role}</p>
                <p className="text-xs text-navy/60">{post.timestamp}</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-navy hover:text-gold hover:bg-navy/5">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuItem>Save post</DropdownMenuItem>
                <DropdownMenuItem>Hide post</DropdownMenuItem>
                <DropdownMenuItem>Report post</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="px-5 pb-3">
          <h3 className="text-lg font-semibold text-navy mb-2">{post.title}</h3>
          <p className="whitespace-pre-wrap text-navy/90 text-sm">{post.content}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag, i) => (
              <Badge key={i} className="bg-navy/10 hover:bg-navy/20 text-navy border-0">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="px-5 py-3 border-t border-gray-100 flex flex-col gap-4">
          <div className="flex justify-between w-full">
            <Button
              variant="ghost"
              size="sm"
              className={`gap-1 ${post.isLiked ? "text-gold" : "text-navy"} hover:text-gold hover:bg-navy/5`}
              onClick={() => onLike(post.id)}
            >
              <ThumbsUp className="h-4 w-4" />
              <span>{post.likes}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 text-navy hover:text-gold hover:bg-navy/5"
              onClick={() => onToggleComments(post.id)}
            >
              <MessageSquare className="h-4 w-4" />
              <span>{post.comments}</span>
              {isExpanded ? <ChevronUp className="h-3 w-3 ml-1" /> : <ChevronDown className="h-3 w-3 ml-1" />}
            </Button>
            <Button variant="ghost" size="sm" className="gap-1 text-navy hover:text-gold hover:bg-navy/5">
              <Share2 className="h-4 w-4" />
              <span>{post.shares}</span>
            </Button>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="w-full space-y-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Separator className="bg-gray-200" />

                {/* Comment list */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage src="/placeholder.svg?height=32&width=32&text=JH" alt="Jim Halpert" />
                      <AvatarFallback className="bg-navy text-gold">JH</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-medium text-navy text-sm">Jim Halpert</span>
                          <span className="text-navy/60 text-xs ml-2">1 hour ago</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-navy/60 hover:text-navy">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-sm text-navy/80 mt-1">
                        Great insights! Looking forward to hearing more about this.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage src="/placeholder.svg?height=32&width=32&text=PB" alt="Pam Beesly" />
                      <AvatarFallback className="bg-navy text-gold">PB</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-medium text-navy text-sm">Pam Beesly</span>
                          <span className="text-navy/60 text-xs ml-2">45 minutes ago</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-navy/60 hover:text-navy">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-sm text-navy/80 mt-1">I'd love to collaborate on this. Let's connect!</p>
                    </div>
                  </div>
                </div>

                {/* Add comment input */}
                <div className="flex items-center gap-2 w-full">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage src="/placeholder.svg?height=32&width=32&text=MS" alt="User" />
                    <AvatarFallback className="bg-navy text-gold">MS</AvatarFallback>
                  </Avatar>
                  <div className="relative flex-1">
                    <Input
                      placeholder="Write a comment..."
                      className="pr-10 bg-gray-50 border-gray-200 focus:ring-navy focus:border-navy"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute right-0 top-0 h-full aspect-square text-navy hover:text-navy/80"
                      onClick={handleCommentSubmit}
                    >
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send comment</span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
