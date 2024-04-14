import React from "react"
import { Link } from "gatsby"
import { Menu } from "react-feather"
import "../style/GlobalMenu.css"

const GlobalMenu = ({ isOpen, toggleMenu }) => {
  const handleClick = () => {
    toggleMenu() // toggleMenu 함수 호출
  }

  return (
    <div className={`menu-container ${isOpen ? "open" : ""}`}>
      <div className="menu">
        <Link to="/" className="menu-item">
          Home
        </Link>
        <Link to="/about" className="menu-item">
          About
        </Link>
        <Link to="/contact" className="menu-item">
          Contact
        </Link>
      </div>
    </div>
  )
}

export default GlobalMenu
