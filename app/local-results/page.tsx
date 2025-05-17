"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import VibeResultDisplay from "@/components/local-vibe-result-display"
import { BouncingEmoji } from "@/components/bouncing-emoji"

export default function LocalResultsPage() {
  const searchParams = useSearchParams()

  const result = {
    result: searchParams.get("vibe") || "Unknown",
    chaotic_score: Number.parseInt(searchParams.get("chaotic") || "0"),
    lawful_score: Number.parseInt(searchParams.get("lawful") || "0"),
    good_score: Number.parseInt(searchParams.get("good") || "0"),
    evil_score: Number.parseInt(searchParams.get("evil") || "0"),
    neutral_score: Number.parseInt(searchParams.get("neutral") || "0"),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 text-white">
      <div className="container px-4 py-12 mx-auto max-w-4xl">
        <div className="relative">
          <BouncingEmoji emoji="🎉" className="absolute -top-6 -left-6" />
          <BouncingEmoji emoji="✨" className="absolute -bottom-6 -right-6" />

          <div className="text-center mb-8">
            <h1 className="text-5xl font-extrabold mb-4">Your Vibe Results!</h1>
            <p className="text-xl mb-8">Here's what your answers reveal about your true vibe...</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-8">
          <VibeResultDisplay result={result} />
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Database Setup Required</h2>
            <p className="mb-4">
              To save and share your results, you need to set up the database table. Please run the SQL query below in
              your Supabase SQL Editor.
            </p>
            <div className="bg-black/30 p-4 rounded-lg text-left overflow-auto mb-4">
              <pre className="text-sm">
                {`CREATE TABLE vibe_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  result TEXT NOT NULL,
  chaotic_score INTEGER NOT NULL,
  lawful_score INTEGER NOT NULL,
  good_score INTEGER NOT NULL,
  evil_score INTEGER NOT NULL,
  neutral_score INTEGER NOT NULL
);

-- Enable realtime for this table
ALTER TABLE vibe_results REPLICA IDENTITY FULL;`}
              </pre>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link href="/">
            <Button className="bg-white text-purple-600 hover:bg-yellow-300 hover:text-purple-700 font-bold px-6 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
