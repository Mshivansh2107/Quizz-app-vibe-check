// Remove the import for @types/node
// import '@types/node';



type VibeScore = {
  chaotic?: number
  lawful?: number
  good?: number
  evil?: number
  neutral?: number
}

export type Question = {
  id: number
  question: string
  options: {
    id: string
    text: string
    vibe: VibeScore
  }[]
}

type VibeScores = {
  chaotic: number
  lawful: number
  good: number
  evil: number
  neutral: number
}

type VibeResult = {
  primaryVibe: string
  scores: VibeScores
}

// Predefined quiz sets
const QUIZ_SETS: Question[][] = [
  // Set 1: Personality and Decision Making
  [
    {
      id: 1,
      question: "When faced with a group decision, you:",
      options: [
        { id: "a", text: "Take charge and make the final call", vibe: { lawful: 2, neutral: 1 } },
        { id: "b", text: "Go with the flow and support others", vibe: { chaotic: 1, good: 2 } },
        { id: "c", text: "Analyze all options carefully", vibe: { lawful: 2, good: 1 } },
        { id: "d", text: "Do whatever benefits you most", vibe: { evil: 2, neutral: 1 } }
      ]
    },
    {
      id: 2,
      question: "Your ideal weekend involves:",
      options: [
        { id: "a", text: "Strictly following a planned schedule", vibe: { lawful: 2, neutral: 1 } },
        { id: "b", text: "Spontaneous adventures with friends", vibe: { chaotic: 2, good: 1 } },
        { id: "c", text: "Helping others in need", vibe: { good: 2, lawful: 1 } },
        { id: "d", text: "Whatever gets you ahead in life", vibe: { evil: 2, neutral: 1 } }
      ]
    },
    {
      id: 3,
      question: "In a conflict, you tend to:",
      options: [
        { id: "a", text: "Follow the rules and seek justice", vibe: { lawful: 2, good: 1 } },
        { id: "b", text: "Find a creative solution", vibe: { chaotic: 2, good: 1 } },
        { id: "c", text: "Stay neutral and observe", vibe: { neutral: 2, lawful: 1 } },
        { id: "d", text: "Use it to your advantage", vibe: { evil: 2, chaotic: 1 } }
      ]
    },
    {
      id: 4,
      question: "Your approach to rules is:",
      options: [
        { id: "a", text: "Rules exist for a reason", vibe: { lawful: 2, good: 1 } },
        { id: "b", text: "Rules are more like guidelines", vibe: { chaotic: 2, neutral: 1 } },
        { id: "c", text: "Rules should help everyone", vibe: { good: 2, lawful: 1 } },
        { id: "d", text: "Rules are made to be broken", vibe: { chaotic: 2, evil: 1 } }
      ]
    },
    {
      id: 5,
      question: "When someone needs help, you:",
      options: [
        { id: "a", text: "Follow proper procedures to assist", vibe: { lawful: 2, good: 1 } },
        { id: "b", text: "Jump in immediately to help", vibe: { chaotic: 1, good: 2 } },
        { id: "c", text: "Consider if it benefits you", vibe: { evil: 2, neutral: 1 } },
        { id: "d", text: "Wait to see if others step up", vibe: { neutral: 2, lawful: 1 } }
      ]
    }
  ],
  // Set 2: Social Interactions
  [
    {
      id: 1,
      question: "At a party, you're most likely to:",
      options: [
        { id: "a", text: "Organize games and activities", vibe: { lawful: 2, good: 1 } },
        { id: "b", text: "Dance on tables and make everyone laugh", vibe: { chaotic: 2, good: 1 } },
        { id: "c", text: "Stay quiet and observe others", vibe: { neutral: 2, lawful: 1 } },
        { id: "d", text: "Network and make useful connections", vibe: { evil: 2, neutral: 1 } }
      ]
    },
    {
      id: 2,
      question: "When someone shares a secret with you:",
      options: [
        { id: "a", text: "Keep it to yourself, no matter what", vibe: { lawful: 2, good: 1 } },
        { id: "b", text: "Share it with one trusted friend", vibe: { chaotic: 1, neutral: 2 } },
        { id: "c", text: "Use it to help others", vibe: { good: 2, lawful: 1 } },
        { id: "d", text: "Use it to your advantage", vibe: { evil: 2, chaotic: 1 } }
      ]
    },
    {
      id: 3,
      question: "Your friend group is known for:",
      options: [
        { id: "a", text: "Being organized and reliable", vibe: { lawful: 2, good: 1 } },
        { id: "b", text: "Having wild adventures", vibe: { chaotic: 2, good: 1 } },
        { id: "c", text: "Helping others in need", vibe: { good: 2, lawful: 1 } },
        { id: "d", text: "Getting ahead in life", vibe: { evil: 2, neutral: 1 } }
      ]
    },
    {
      id: 4,
      question: "In a group project, you prefer to:",
      options: [
        { id: "a", text: "Create a detailed plan and timeline", vibe: { lawful: 2, good: 1 } },
        { id: "b", text: "Go with the flow and adapt", vibe: { chaotic: 2, neutral: 1 } },
        { id: "c", text: "Make sure everyone's voice is heard", vibe: { good: 2, lawful: 1 } },
        { id: "d", text: "Take credit for others' work", vibe: { evil: 2, chaotic: 1 } }
      ]
    },
    {
      id: 5,
      question: "When meeting new people, you:",
      options: [
        { id: "a", text: "Follow social etiquette strictly", vibe: { lawful: 2, neutral: 1 } },
        { id: "b", text: "Break the ice with jokes", vibe: { chaotic: 2, good: 1 } },
        { id: "c", text: "Try to make them feel welcome", vibe: { good: 2, lawful: 1 } },
        { id: "d", text: "Size them up for usefulness", vibe: { evil: 2, neutral: 1 } }
      ]
    }
  ],
  // Set 3: Problem Solving
  [
    {
      id: 1,
      question: "When solving a problem, you:",
      options: [
        { id: "a", text: "Follow established methods", vibe: { lawful: 2, good: 1 } },
        { id: "b", text: "Try something completely new", vibe: { chaotic: 2, good: 1 } },
        { id: "c", text: "Consider everyone's needs", vibe: { good: 2, lawful: 1 } },
        { id: "d", text: "Find the easiest solution", vibe: { evil: 2, neutral: 1 } }
      ]
    },
    {
      id: 2,
      question: "Your approach to challenges is:",
      options: [
        { id: "a", text: "Systematic and methodical", vibe: { lawful: 2, neutral: 1 } },
        { id: "b", text: "Creative and unconventional", vibe: { chaotic: 2, good: 1 } },
        { id: "c", text: "Considerate of others", vibe: { good: 2, lawful: 1 } },
        { id: "d", text: "Whatever works best for you", vibe: { evil: 2, neutral: 1 } }
      ]
    },
    {
      id: 3,
      question: "When things go wrong, you:",
      options: [
        { id: "a", text: "Analyze what went wrong", vibe: { lawful: 2, good: 1 } },
        { id: "b", text: "Try a different approach", vibe: { chaotic: 2, good: 1 } },
        { id: "c", text: "Help others recover", vibe: { good: 2, lawful: 1 } },
        { id: "d", text: "Find someone to blame", vibe: { evil: 2, chaotic: 1 } }
      ]
    },
    {
      id: 4,
      question: "Your ideal work environment is:",
      options: [
        { id: "a", text: "Structured and organized", vibe: { lawful: 2, neutral: 1 } },
        { id: "b", text: "Flexible and creative", vibe: { chaotic: 2, good: 1 } },
        { id: "c", text: "Collaborative and supportive", vibe: { good: 2, lawful: 1 } },
        { id: "d", text: "Competitive and challenging", vibe: { evil: 2, neutral: 1 } }
      ]
    },
    {
      id: 5,
      question: "When learning something new, you:",
      options: [
        { id: "a", text: "Follow the instructions exactly", vibe: { lawful: 2, neutral: 1 } },
        { id: "b", text: "Experiment and explore", vibe: { chaotic: 2, good: 1 } },
        { id: "c", text: "Share knowledge with others", vibe: { good: 2, lawful: 1 } },
        { id: "d", text: "Focus on what's useful to you", vibe: { evil: 2, neutral: 1 } }
      ]
    }
  ]
];

export function calculateVibeResult(questions: Question[], answers: string[]): VibeResult {
  // Initialize scores
  const scores: VibeScores = {
    chaotic: 0,
    lawful: 0,
    good: 0,
    evil: 0,
    neutral: 0,
  }

  // Calculate scores based on answers
  questions.forEach((question, index) => {
    const answerId = answers[index]
    const selectedOption = question.options.find((option) => option.id === answerId)

    if (selectedOption) {
      // Add vibe scores from the selected option
      if (selectedOption.vibe.chaotic) scores.chaotic += selectedOption.vibe.chaotic
      if (selectedOption.vibe.lawful) scores.lawful += selectedOption.vibe.lawful
      if (selectedOption.vibe.good) scores.good += selectedOption.vibe.good
      if (selectedOption.vibe.evil) scores.evil += selectedOption.vibe.evil
      if (selectedOption.vibe.neutral) scores.neutral += selectedOption.vibe.neutral
    }
  })

  // Determine alignment on the chaotic-lawful axis
  let alignmentAxis = "Neutral"
  if (scores.chaotic > scores.lawful) {
    alignmentAxis = "Chaotic"
  } else if (scores.lawful > scores.chaotic) {
    alignmentAxis = "Lawful"
  }

  // Determine morality on the good-evil axis
  let moralityAxis = "Neutral"
  if (scores.good > scores.evil) {
    moralityAxis = "Good"
  } else if (scores.evil > scores.good) {
    moralityAxis = "Evil"
  }

  // Special case: if both axes are neutral, just return "True Neutral"
  if (alignmentAxis === "Neutral" && moralityAxis === "Neutral") {
    return {
      primaryVibe: "True Neutral",
      scores,
    }
  }

  // Otherwise, combine the two axes
  const primaryVibe = `${alignmentAxis} ${moralityAxis}`

  return {
    primaryVibe,
    scores,
  }
}

export async function generateQuizQuestions(): Promise<Question[]> {
  // Randomly select one of the quiz sets
  const randomIndex = Math.floor(Math.random() * QUIZ_SETS.length);
  return QUIZ_SETS[randomIndex];
}

