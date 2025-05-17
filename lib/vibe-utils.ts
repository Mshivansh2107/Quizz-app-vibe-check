export function getVibeEmoji(vibeType: string): string {
  const vibeEmojis: Record<string, string> = {
    "Lawful Good": "😇",
    "Neutral Good": "🥰",
    "Chaotic Good": "🤪",
    "Lawful Neutral": "🧐",
    "True Neutral": "😐",
    "Chaotic Neutral": "🤔",
    "Lawful Evil": "😈",
    "Neutral Evil": "👹",
    "Chaotic Evil": "🔥",
  }

  return vibeEmojis[vibeType] || "✨"
}

export function getVibeDescription(vibeType: string): string {
  const vibeDescriptions: Record<string, string> = {
    "Lawful Good": "You follow the rules and genuinely care about others. The ultimate good citizen!",
    "Neutral Good": "You do what's best for others without being bound by rules or chaos.",
    "Chaotic Good": "You follow your heart and rebel against convention, but always to help others!",
    "Lawful Neutral": "You believe in order above all. Rules exist for a reason!",
    "True Neutral": "You're perfectly balanced between order and chaos, good and evil.",
    "Chaotic Neutral": "You're a free spirit who follows your whims without malice.",
    "Lawful Evil": "You exploit the rules and use order to get what you want.",
    "Neutral Evil": "You do whatever benefits you without particular preference for order or chaos.",
    "Chaotic Evil": "You embrace chaos and do whatever you want, regardless of who gets hurt.",
  }

  return vibeDescriptions[vibeType] || "Your vibe is unique and defies categorization!"
}
