import React from "react"
import { Link } from "gatsby"
import { Menu } from "react-feather"
import Logo from "./Logo"

const Header = () => {
  return (
    <header className="global-header">
      <Link to="/" style={{ height: "26px" }}>
        <Logo width="90" height="" />
      </Link>
      <Menu size={25} />
    </header>
  )
}

export default Header
