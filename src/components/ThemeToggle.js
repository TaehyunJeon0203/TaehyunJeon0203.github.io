import React from "react"
import { Code, Coffee } from "react-feather"
import "../style/ThemeToggle.css"

const ThemeToggle = ({ currentType, onToggle }) => {
  return (
    <button
      className={`theme-toggle-btn ${currentType}`}
      onClick={onToggle}
      aria-label={`Switch to ${currentType === "tech" ? "daily" : "tech"} blog`}
    >
      <span className="toggle-icon">
        {currentType === "tech" ? <Code size={16} /> : <Coffee size={16} />}
      </span>
      <span className="toggle-text">
        {currentType === "tech" ? "Tech" : "Daily"}
      </span>
    </button>
  )
}

export default ThemeToggle
