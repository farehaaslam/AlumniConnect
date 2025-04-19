"use client"

import { useState } from "react"
import { PostCard } from "@/components/feed/post-card"
import { AnimatePresence } from "framer-motion"

interface FeedListProps {
  posts: Array<{
    id: number
    author: {
      name: string
      avatar: string
      role: string
      id: number
    }
    content: string
    timestamp: string
    likes: number
    comments: number
    shares: number
    isLiked: boolean
  }>
}

export function FeedList({ posts }: FeedListProps) {
  const [expandedComments, setExpandedComments] = useState<number[]>([])
  const [likedPosts, setLikedPosts] = useState<number[]>([])

  const handleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((id) => id !== postId))
    } else {
      setLikedPosts([...likedPosts, postId])
    }
  }

  const toggleComments = (postId: number) => {
    if (expandedComments.includes(postId)) {
      setExpandedComments(expandedComments.filter((id) => id !== postId))
    } else {
      setExpandedComments([...expandedComments, postId])
    }
  }

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {posts.map((post, index) => (
          <PostCard
            key={post.id}
            post={{
              ...post,
              isLiked: likedPosts.includes(post.id),
            }}
            index={index}
            onLike={handleLike}
            onToggleComments={toggleComments}
            expandedComments={expandedComments}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
