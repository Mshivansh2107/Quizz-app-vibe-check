import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import VibeResultDisplay from "@/components/vibe-result-display"
import ShareResults from "@/components/share-results"
import { BouncingEmoji } from "@/components/bouncing-emoji"

export default async function ResultsPage({ params }: { params: { id: string } }) {
  const supabase = createClient()

  const { data: result, error } = await supabase.from("vibe_results").select("*").eq("id", params.id).single()

  if (error || !result) {
    notFound()
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
          <h2 className="text-2xl font-bold mb-4 text-center">Share Your Vibe!</h2>
          <ShareResults resultId={params.id} vibeType={result.result} />
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
