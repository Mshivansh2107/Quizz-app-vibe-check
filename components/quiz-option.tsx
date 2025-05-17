"use client"

import { motion } from "framer-motion"

type VibeScore = {
  chaotic?: number
  lawful?: number
  good?: number
  evil?: number
  neutral?: number
}

type QuizOptionProps = {
  option: {
    id: string
    text: string
    vibe: VibeScore
  }
  isSelected: boolean
  onSelect: (id: string) => void
}

export function QuizOption({ option, isSelected, onSelect }: QuizOptionProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(option.id)}
      className={`p-4 rounded-xl cursor-pointer transition-colors duration-300 ${
        isSelected
          ? "bg-white/30 border-2 border-yellow-300"
          : "bg-white/10 border-2 border-transparent hover:bg-white/20"
      }`}
    >
      <div className="flex items-center">
        <div
          className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
            isSelected ? "bg-yellow-300" : "bg-white/20"
          }`}
        >
          {isSelected && <div className="w-3 h-3 rounded-full bg-purple-600"></div>}
        </div>
        <span className="text-lg">{option.text}</span>
      </div>
    </motion.div>
  )
}
