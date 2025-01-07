import React from "react"
import { Link } from "gatsby"
import { Menu } from "react-feather"
import GlobalMenu from "./GlobalMenu"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="global-header">
      <Link to="/" className="header-title-link">
        <h1>TH Blog</h1>
      </Link>
      <Menu className="menu-icon" onClick={toggleMenu} />
      <GlobalMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </header>
  )
}

export default Header
