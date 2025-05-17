"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getVibeEmoji, getVibeDescription } from "@/lib/vibe-utils"

type VibeResultProps = {
  result: {
    result: string
    chaotic_score: number
    lawful_score: number
    good_score: number
    evil_score: number
    neutral_score: number
  }
}

export default function VibeResultDisplay({ result }: VibeResultProps) {
  const [showScores, setShowScores] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScores(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const vibeEmoji = getVibeEmoji(result.result)
  const vibeDescription = getVibeDescription(result.result)

  const totalScore =
    result.chaotic_score + result.lawful_score + result.good_score + result.evil_score + result.neutral_score

  const getPercentage = (score: number) => (score / totalScore) * 100

  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="text-8xl mb-4">{vibeEmoji}</div>
        <h2 className="text-4xl font-extrabold mb-2">
          You are <span className="text-yellow-300">{result.result}</span>!
        </h2>
        <p className="text-xl">{vibeDescription}</p>
      </motion.div>

      {showScores && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-4"
        >
          <Card className="bg-white/10 border-none p-4">
            <div className="flex justify-between mb-2">
              <span>Chaotic</span>
              <span>{Math.round(getPercentage(result.chaotic_score))}%</span>
            </div>
            <Progress
              value={getPercentage(result.chaotic_score)}
              className="h-3 bg-white/20"
              indicatorClassName="bg-pink-400"
            />
          </Card>

          <Card className="bg-white/10 border-none p-4">
            <div className="flex justify-between mb-2">
              <span>Lawful</span>
              <span>{Math.round(getPercentage(result.lawful_score))}%</span>
            </div>
            <Progress
              value={getPercentage(result.lawful_score)}
              className="h-3 bg-white/20"
              indicatorClassName="bg-blue-400"
            />
          </Card>

          <Card className="bg-white/10 border-none p-4">
            <div className="flex justify-between mb-2">
              <span>Good</span>
              <span>{Math.round(getPercentage(result.good_score))}%</span>
            </div>
            <Progress
              value={getPercentage(result.good_score)}
              className="h-3 bg-white/20"
              indicatorClassName="bg-green-400"
            />
          </Card>

          <Card className="bg-white/10 border-none p-4">
            <div className="flex justify-between mb-2">
              <span>Evil</span>
              <span>{Math.round(getPercentage(result.evil_score))}%</span>
            </div>
            <Progress
              value={getPercentage(result.evil_score)}
              className="h-3 bg-white/20"
              indicatorClassName="bg-red-400"
            />
          </Card>

          <Card className="bg-white/10 border-none p-4">
            <div className="flex justify-between mb-2">
              <span>Neutral</span>
              <span>{Math.round(getPercentage(result.neutral_score))}%</span>
            </div>
            <Progress
              value={getPercentage(result.neutral_score)}
              className="h-3 bg-white/20"
              indicatorClassName="bg-gray-400"
            />
          </Card>
        </motion.div>
      )}
    </div>
  )
}
