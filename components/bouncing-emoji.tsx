"use client"

import { motion } from "framer-motion"

type BouncingEmojiProps = {
  emoji: string
  className?: string
}

export function BouncingEmoji({ emoji, className = "" }: BouncingEmojiProps) {
  return (
    <motion.div
      className={`text-4xl ${className}`}
      animate={{
        y: [0, -10, 0],
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      }}
    >
      {emoji}
    </motion.div>
  )
}
