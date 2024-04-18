import React, { useState } from "react"
import { Link } from "gatsby"
import { Menu, X } from "react-feather"
import Logo from "./Logo"
import GlobalMenu from "./GlobalMenu"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [menuIcon, setMenuIcon] = useState(isOpen ? "close" : "menu")

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    setMenuIcon(menuIcon === "menu" ? "close" : "menu")
  }

  return (
    <header className="global-header">
      <Link to="/" style={{ height: "26px" }}>
        <Logo width="90" height="auto" />
      </Link>
      <div className="menu-icon" onClick={toggleMenu}>
        <Menu size={25} className={`menu-icon-menu ${isOpen ? "hide" : ""}`} />
        <X size={25} className={`menu-icon-close ${isOpen ? "" : "hide"}`} />
      </div>
      <GlobalMenu isOpen={isOpen} toggleMenu={toggleMenu} />
    </header>
  )
}

export default Header
