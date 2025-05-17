import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import VibeStats from "@/components/vibe-stats"
import { Sparkles } from "lucide-react"
import { BouncingEmoji } from "@/components/bouncing-emoji"

export default async function Home() {
  const supabase = createClient()

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 text-white">
      <div className="container px-4 py-12 mx-auto max-w-4xl">
        <div className="relative">
          <BouncingEmoji emoji="✨" className="absolute -top-6 -left-6" />
          <BouncingEmoji emoji="🔥" className="absolute -bottom-6 -right-6" />
          <div className="relative z-10 text-center mb-8">
            <h1 className="text-6xl font-extrabold mb-4 tracking-tight">
              <span className="text-yellow-300">Vibe</span> Check
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Discover your true vibe in this quick 5-question quiz! Are you chaotic good or lawful evil? Find out and
              share with your friends!
            </p>
            <Link href="/quiz">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-yellow-300 hover:text-purple-700 font-bold text-lg px-8 py-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Start Your Vibe Check!
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-16 p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold mb-6 text-center">Current Vibe Leaderboard</h2>
          <VibeStats />
        </div>
      </div>
    </main>
  )
}
