import React from "react"
import { Link } from "gatsby"
import "../style/GlobalMenu.css"
import GlobalMenuHeader from "./GlobalMenuHeader"
import GlobalMenuFooter from "./GlobalMenuFooter"
import GlobalMenuItem from "./GlobalMenuItem"

const GlobalMenu = ({ isOpen, toggleMenu }) => {
  return (
    <div className={`menu-container ${isOpen ? "open" : ""}`}>
      <div className="menu">
        <GlobalMenuHeader />
        <GlobalMenuItem />
        <GlobalMenuFooter />
      </div>
    </div>
  )
}

export default GlobalMenu
