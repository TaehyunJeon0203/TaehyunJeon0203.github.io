import * as React from "react"
import { Link } from "gatsby"
import "../style/GlobalMenu.css"

const GlobalMenuHeader = () => {
  return (
    <div className="menu-header">
      <div className="menu-header-content">
        <Link to="/" className="menu-header-title">
          Jeon Taehyun
        </Link>
        <div className="menu-header-social">
          <a
            href="https://github.com/TaehyunJeon0203"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            GitHub
          </a>
          <a
            href="https://www.instagram.com/jeonxogus/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            Instagram
          </a>
        </div>
      </div>
    </div>
  )
}

export default GlobalMenuHeader
