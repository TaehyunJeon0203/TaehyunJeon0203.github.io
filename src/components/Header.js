import React, { useState } from "react"
import { Link } from "gatsby"
import { Menu } from "react-feather"
import Logo from "./Logo"
import GlobalMenu from "./GlobalMenu"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <header className="global-header">
      <Link to="/" style={{ height: "26px" }}>
        <Logo width="90" height="auto" />
      </Link>
      <div className="menu-icon" onClick={toggleMenu}>
        <Menu size={25} />
      </div>
      <GlobalMenu isOpen={isOpen} toggleMenu={toggleMenu} />
    </header>
  )
}

export default Header
