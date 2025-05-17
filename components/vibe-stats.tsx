"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getVibeEmoji } from "@/lib/vibe-utils"
import { motion } from "framer-motion"

type VibeCount = {
  result: string
  count: number
}

export default function VibeStats() {
  const [vibeStats, setVibeStats] = useState<VibeCount[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Update the fetchStats function to handle the missing table error gracefully
    const fetchStats = async () => {
      const supabase = createClient()

      try {
        const { data, error } = await supabase.from("vibe_results").select("result")

        if (error) {
          console.error("Error fetching vibe stats:", error)
          // Set empty stats instead of failing
          setVibeStats([])
          setLoading(false)
          return
        }

        // Count occurrences of each vibe type
        const counts: Record<string, number> = {}
        data.forEach((item) => {
          counts[item.result] = (counts[item.result] || 0) + 1
        })

        // Convert to array and sort by count
        const statsArray = Object.entries(counts).map(([result, count]) => ({
          result,
          count,
        }))

        statsArray.sort((a, b) => b.count - a.count)

        setVibeStats(statsArray)
        setLoading(false)

        // Set up real-time subscription
        const subscription = supabase
          .channel("vibe_results_changes")
          .on(
            "postgres_changes",
            {
              event: "INSERT",
              schema: "public",
              table: "vibe_results",
            },
            (payload) => {
              setVibeStats((current) => {
                const newResult = payload.new.result
                const existingIndex = current.findIndex((item) => item.result === newResult)

                if (existingIndex >= 0) {
                  const updated = [...current]
                  updated[existingIndex] = {
                    ...updated[existingIndex],
                    count: updated[existingIndex].count + 1,
                  }
                  return updated.sort((a, b) => b.count - a.count)
                } else {
                  return [...current, { result: newResult, count: 1 }].sort((a, b) => b.count - a.count)
                }
              })
            },
          )
          .subscribe()

        return () => {
          subscription.unsubscribe()
        }
      } catch (error) {
        console.error("Unexpected error:", error)
        setVibeStats([])
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="text-center p-8">
        <div className="animate-pulse text-2xl">Loading vibe stats...</div>
      </div>
    )
  }

  if (vibeStats.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-xl">No vibe results yet. Be the first to take the quiz!</p>
      </div>
    )
  }

  const totalResults = vibeStats.reduce((sum, item) => sum + item.count, 0)

  return (
    <div className="grid gap-4">
      {vibeStats.map((vibe, index) => {
        const percentage = (vibe.count / totalResults) * 100

        return (
          <motion.div
            key={vibe.result}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white/10 border-none p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{getVibeEmoji(vibe.result)}</span>
                  <span className="font-medium">{vibe.result}</span>
                </div>
                <span>{Math.round(percentage)}%</span>
              </div>
              <Progress
                value={percentage}
                className="h-3 bg-white/20"
                indicatorClassName="bg-gradient-to-r from-pink-400 to-purple-500"
              />
              <div className="text-right text-sm mt-1 text-white/70">
                {vibe.count} {vibe.count === 1 ? "person" : "people"}
              </div>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}
