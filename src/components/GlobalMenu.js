import React from "react"
import { Link } from "gatsby"
import "../style/GlobalMenu.css"
import GlobalMenuHeader from "./GlobalMenuHeader"
import GlobalMenuFooter from "./GlobalMenuFooter"
import GlobalMenuItem from "./GlobalMenuItem"

const GlobalMenu = ({ isOpen, toggleMenu }) => {
  const handleOutsideClick = e => {
    if (isOpen && !e.target.closest(".menu")) {
      toggleMenu() // 메뉴 닫기
    }
  }

  return (
    <div
      className={`menu-container ${isOpen ? "open" : ""}`}
      onClick={handleOutsideClick}
    >
      <div className="menu">
        <GlobalMenuHeader />
        <GlobalMenuItem />
        <GlobalMenuFooter />
      </div>
    </div>
  )
}

export default GlobalMenu
