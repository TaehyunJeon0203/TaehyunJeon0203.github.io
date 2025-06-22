import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { Menu, X } from "react-feather"
import Logo from "./Logo"
import GlobalMenu from "./GlobalMenu"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [menuIcon, setMenuIcon] = useState(isOpen ? "close" : "menu")
  const [blogType, setBlogType] = useState(() => {
    // localStorage에서 저장된 타입을 가져옴
    if (typeof window !== "undefined") {
      return localStorage.getItem("blogType") || "tech"
    }
    return "tech"
  })

  // 컴포넌트 마운트 시 저장된 타입에 따라 body 클래스 설정
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedType = localStorage.getItem("blogType") || "tech"
      document.body.className =
        savedType === "tech" ? "tech-mode" : "daily-mode"
      setBlogType(savedType)
    }
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    setMenuIcon(menuIcon === "menu" ? "close" : "menu")
  }

  const toggleBlogType = type => {
    setBlogType(type)
    document.body.className = type === "tech" ? "tech-mode" : "daily-mode"
    // localStorage에 현재 타입 저장
    if (typeof window !== "undefined") {
      localStorage.setItem("blogType", type)
    }
  }

  return (
    <header className="global-header">
      <div className="header-content">
        <Link to="/" style={{ height: "26px" }}>
          <Logo width="90" height="auto" />
        </Link>
        <div className="header-controls">
          <nav className="theme-menu">
            <button
              className={`theme-menu-item ${
                blogType === "tech" ? "active" : ""
              }`}
              onClick={() => toggleBlogType("tech")}
            >
              Tech
            </button>
            <button
              className={`theme-menu-item ${
                blogType === "daily" ? "active" : ""
              }`}
              onClick={() => toggleBlogType("daily")}
            >
              Daily
            </button>
          </nav>
          <div className="menu-icon" onClick={toggleMenu}>
            <Menu
              size={25}
              className={`menu-icon-menu ${isOpen ? "hide" : ""}`}
            />
            <X
              size={25}
              className={`menu-icon-close ${isOpen ? "" : "hide"}`}
            />
          </div>
        </div>
      </div>
      <GlobalMenu isOpen={isOpen} toggleMenu={toggleMenu} />
    </header>
  )
}

export default Header
