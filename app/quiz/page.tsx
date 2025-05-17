"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { createClient } from "@/lib/supabase/client"
import { motion, AnimatePresence } from "framer-motion"
import { calculateVibeResult, generateQuizQuestions, Question } from "@/lib/vibe-calculator"
import { QuizOption } from "@/components/quiz-option"
import { Sparkles } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import VibeStats from "@/components/vibe-stats"

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [answers, setAnswers] = useState<string[]>([])
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchQuestions = async () => {
      const quizQuestions = await generateQuizQuestions()
      setQuestions(quizQuestions)
      setLoading(false)
    }
    fetchQuestions()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-lg text-white border-none shadow-xl">
          <div className="p-6 flex flex-col items-center justify-center space-y-6">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-300"></div>
            <h2 className="text-2xl font-bold text-center">Preparing Your Vibe Check</h2>
            <p className="text-white/70 text-center">Loading questions...</p>
          </div>
        </Card>
      </div>
    )
  }

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId)
  }

  const handleNextQuestion = async () => {
    if (selectedOption === null) return

    const newAnswers = [...answers, selectedOption]
    setAnswers(newAnswers)
    setIsAnimating(true)

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedOption(null)
        setIsAnimating(false)
      }, 500)
    } else {
      // Quiz completed
      const vibeResult = calculateVibeResult(questions, newAnswers)

      try {
        // Save result to Supabase
        const supabase = createClient()
        const { data, error } = await supabase
          .from("vibe_results")
          .insert([
            {
              result: vibeResult.primaryVibe,
              chaotic_score: vibeResult.scores.chaotic,
              lawful_score: vibeResult.scores.lawful,
              good_score: vibeResult.scores.good,
              evil_score: vibeResult.scores.evil,
              neutral_score: vibeResult.scores.neutral,
            },
          ])
          .select()

        if (error) {
          console.error("Error saving result:", error)
          // If table doesn't exist, still show results but with a local ID
          router.push(
            `/local-results?vibe=${encodeURIComponent(vibeResult.primaryVibe)}&chaotic=${vibeResult.scores.chaotic}&lawful=${vibeResult.scores.lawful}&good=${vibeResult.scores.good}&evil=${vibeResult.scores.evil}&neutral=${vibeResult.scores.neutral}`,
          )
          return
        }

        // Navigate to results page
        if (data && data[0]) {
          router.push(`/results/${data[0].id}`)
        }
      } catch (error) {
        console.error("Unexpected error:", error)
        // If there's any error, still show results but with a local ID
        router.push(
          `/local-results?vibe=${encodeURIComponent(vibeResult.primaryVibe)}&chaotic=${vibeResult.scores.chaotic}&lawful=${vibeResult.scores.lawful}&good=${vibeResult.scores.good}&evil=${vibeResult.scores.evil}&neutral=${vibeResult.scores.neutral}`,
        )
      }
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-lg text-white border-none shadow-xl">
        <div className="p-6">
          <div className="mb-6">
            <Progress value={progress} className="h-2 bg-white/20" indicatorClassName="bg-yellow-300" />
            <p className="text-sm mt-2 text-white/70">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6">{questions[currentQuestion].question}</h2>

              <RadioGroup
                value={selectedOption || ""}
                onValueChange={handleOptionSelect}
                className="space-y-4 mb-8"
              >
                {questions[currentQuestion].options.map((option: { id: string; text: string }) => (
                  <div
                    key={option.id}
                    className={`relative flex items-center p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer
                      ${selectedOption === option.id 
                        ? 'border-yellow-300 bg-yellow-300/10 scale-[1.02]' 
                        : 'border-white/20 hover:border-white/40 hover:bg-white/5'
                      }`}
                    onClick={() => handleOptionSelect(option.id)}
                  >
                    <RadioGroupItem 
                      value={option.id} 
                      id={option.id}
                      className="mr-4 h-5 w-5 border-2 border-white/50 data-[state=checked]:border-yellow-300 data-[state=checked]:bg-yellow-300" 
                    />
                    <Label 
                      htmlFor={option.id}
                      className={`text-lg font-medium cursor-pointer flex-1
                        ${selectedOption === option.id ? 'text-yellow-300' : 'text-white/90'}`}
                    >
                      {option.text}
                    </Label>
                    {selectedOption === option.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -right-2 -top-2 h-6 w-6 bg-yellow-300 rounded-full flex items-center justify-center"
                      >
                        <Sparkles className="h-4 w-4 text-purple-700" />
                      </motion.div>
                    )}
                  </div>
                ))}
              </RadioGroup>
            </motion.div>
          </AnimatePresence>

          <Button
            onClick={handleNextQuestion}
            disabled={selectedOption === null || isAnimating}
            className={`w-full bg-white text-purple-600 hover:bg-yellow-300 hover:text-purple-700 font-bold text-lg py-6 rounded-xl shadow-lg transition-all duration-300 transform
              ${selectedOption === null ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
          >
            {currentQuestion < questions.length - 1 ? (
              "Next Question"
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Reveal My Vibe!
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  )
}
