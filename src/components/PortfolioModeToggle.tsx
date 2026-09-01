import * as React from "react"

export type PortfolioMode = "summary" | "story"

interface PortfolioModeToggleProps {
  mode: PortfolioMode
  onChange: (mode: PortfolioMode) => void
}

const PortfolioModeToggle = ({ mode, onChange }: PortfolioModeToggleProps) => (
  <nav className="theme-menu" aria-label="포트폴리오 보기 방식">
    <button
      type="button"
      className={`theme-menu-item ${mode === "summary" ? "active" : ""}`}
      aria-pressed={mode === "summary"}
      onClick={() => onChange("summary")}
    >
      Summary
    </button>
    <button
      type="button"
      className={`theme-menu-item ${mode === "story" ? "active" : ""}`}
      aria-pressed={mode === "story"}
      onClick={() => onChange("story")}
    >
      Story
    </button>
  </nav>
)

export default PortfolioModeToggle
