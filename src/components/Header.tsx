import * as React from "react"
import { useState, useEffect } from "react"
import { Link } from "gatsby"
import { Menu, X } from "react-feather"
import Logo from "./Logo"
import GlobalMenu from "./GlobalMenu"

type BlogType = "tech" | "daily"

const getSavedBlogType = (): BlogType => {
  if (typeof window === "undefined") return "tech"

  return localStorage.getItem("blogType") === "daily" ? "daily" : "tech"
}

interface HeaderProps {
  isRootPath?: boolean
  pageControls?: React.ReactNode
}

const Header = ({ isRootPath = false, pageControls }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [blogType, setBlogType] = useState<BlogType>(getSavedBlogType)

  // 컴포넌트 마운트 시 저장된 타입에 따라 body 클래스 설정
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedType = getSavedBlogType()
      document.body.classList.remove("tech-mode", "daily-mode")
      document.body.classList.add(`${savedType}-mode`)
      setBlogType(savedType)
    }
  }, [])

  const toggleMenu = () => {
    setIsOpen(open => !open)
  }

  const toggleBlogType = (type: BlogType) => {
    setBlogType(type)
    document.body.classList.remove("tech-mode", "daily-mode")
    document.body.classList.add(`${type}-mode`)
    // localStorage에 현재 타입 저장
    if (typeof window !== "undefined") {
      localStorage.setItem("blogType", type)
    }
  }

  return (
    <header className="global-header">
      <div className="header-content">
        <Link to="/" className="header-logo" aria-label="TH 블로그 홈">
          <Logo width="90" height="auto" />
        </Link>
        <div className="header-controls">
          {isRootPath && (
            <nav className="theme-menu" aria-label="블로그 카테고리">
              <button
                type="button"
                className={`theme-menu-item ${
                  blogType === "tech" ? "active" : ""
                }`}
                onClick={() => toggleBlogType("tech")}
                aria-pressed={blogType === "tech"}
              >
                Tech
              </button>
              <button
                type="button"
                className={`theme-menu-item ${
                  blogType === "daily" ? "active" : ""
                }`}
                onClick={() => toggleBlogType("daily")}
                aria-pressed={blogType === "daily"}
              >
                Daily
              </button>
            </nav>
          )}
          {!isRootPath && pageControls}
          <button
            type="button"
            className="menu-icon"
            onClick={toggleMenu}
            aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={isOpen}
            aria-controls="global-menu"
          >
            <Menu
              size={25}
              className={`menu-icon-menu ${isOpen ? "hide" : ""}`}
              aria-hidden="true"
              focusable="false"
            />
            <X
              size={25}
              className={`menu-icon-close ${isOpen ? "" : "hide"}`}
              aria-hidden="true"
              focusable="false"
            />
          </button>
        </div>
      </div>
      <GlobalMenu isOpen={isOpen} toggleMenu={toggleMenu} />
    </header>
  )
}

export default Header
