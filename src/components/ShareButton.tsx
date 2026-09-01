import * as React from "react"
import { Share2 } from "react-feather"

interface ShareButtonProps {
  title: string
  url: string
}

interface ShareStatus {
  message: string
  tone: "success" | "error"
}

const copyUrl = async (url: string) => {
  if (!navigator.clipboard?.writeText) {
    throw new Error("Clipboard API is unavailable")
  }

  await navigator.clipboard.writeText(url)
}

const ShareButton = ({ title, url }: ShareButtonProps) => {
  const [status, setStatus] = React.useState<ShareStatus | null>(null)

  const handleShare = async () => {
    setStatus(null)

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title, url })
        setStatus({ message: "글을 공유했습니다.", tone: "success" })
        return
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === "AbortError") {
          setStatus({ message: "공유를 취소했습니다.", tone: "error" })
          return
        }
      }
    }

    try {
      await copyUrl(url)
      setStatus({ message: "글 링크를 복사했습니다.", tone: "success" })
    } catch {
      setStatus({
        message: "공유하지 못했습니다. 잠시 후 다시 시도해 주세요.",
        tone: "error",
      })
    }
  }

  return (
    <div className="post-share">
      <button type="button" className="post-share-button" onClick={handleShare}>
        <Share2 size={18} aria-hidden="true" focusable="false" />글 공유하기
      </button>
      <p
        className={`post-share-status${status ? ` ${status.tone}` : ""}`}
        role="status"
        aria-live="polite"
      >
        {status?.message ?? ""}
      </p>
    </div>
  )
}

export default ShareButton
