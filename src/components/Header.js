import React from "react"
import { Link } from "gatsby"

const Header = ({ title, isRootPath }) => (
  <header className="global-header">
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        {title}
      </Link>
      {/* 여기에 추가적인 메뉴나 로고 등을 넣어주세요 */}
    </nav>
  </header>
)

export default Header
