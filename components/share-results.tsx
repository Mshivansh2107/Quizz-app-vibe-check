"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, Share2, Twitter, Facebook } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

type ShareResultsProps = {
  resultId: string
  vibeType: string
}

export default function ShareResults({ resultId, vibeType }: ShareResultsProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl =
    typeof window !== "undefined" ? `${window.location.origin}/results/${resultId}` : `/results/${resultId}`

  const shareText = `I just took the Vibe Check quiz and I'm ${vibeType}! What's your vibe? Take the quiz:`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    toast({
      title: "Link copied!",
      description: "Share it with your friends!",
      duration: 3000,
    })
    setTimeout(() => setCopied(false), 3000)
  }

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      "_blank",
    )
  }

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank")
  }

  const nativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "My Vibe Check Result",
        text: shareText,
        url: shareUrl,
      })
    } else {
      copyToClipboard()
    }
  }

  return (
    <div className="grid gap-4">
      <div className="flex items-center gap-2">
        <Input value={shareUrl} readOnly className="bg-white/20 border-none text-white" />
        <Button
          onClick={copyToClipboard}
          variant="outline"
          className="bg-white/20 border-none text-white hover:bg-white/30"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Button onClick={nativeShare} className="bg-white/20 border-none text-white hover:bg-white/30">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>

        <Button onClick={shareOnTwitter} className="bg-[#1DA1F2]/80 hover:bg-[#1DA1F2] text-white">
          <Twitter className="h-4 w-4 mr-2" />
          Twitter
        </Button>

        <Button onClick={shareOnFacebook} className="bg-[#4267B2]/80 hover:bg-[#4267B2] text-white">
          <Facebook className="h-4 w-4 mr-2" />
          Facebook
        </Button>
      </div>

      <Toaster />
    </div>
  )
}
