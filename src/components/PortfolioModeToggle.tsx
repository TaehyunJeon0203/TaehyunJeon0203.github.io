import * as React from "react"

export type PortfolioMode = "summary" | "story"

interface PortfolioModeToggleProps {
  mode: PortfolioMode
  onChange: (mode: PortfolioMode) => void
}

const PortfolioModeToggle = ({ mode, onChange }: PortfolioModeToggleProps) => (
  <div
    className="portfolio-mode-toggle"
    role="group"
    aria-label="포트폴리오 보기 방식"
  >
    <button
      type="button"
      className={mode === "summary" ? "is-active" : undefined}
      aria-pressed={mode === "summary"}
      onClick={() => onChange("summary")}
    >
      Summary
    </button>
    <button
      type="button"
      className={mode === "story" ? "is-active" : undefined}
      aria-pressed={mode === "story"}
      onClick={() => onChange("story")}
    >
      Story
    </button>
  </div>
)

export default PortfolioModeToggle
