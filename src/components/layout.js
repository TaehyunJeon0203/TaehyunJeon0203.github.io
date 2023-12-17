// Layout.js
import React from "react"
import Header from "./Header"
import "../style/layout.css"
import Logo from './Logo';

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div className={`global-wrapper ${isRootPath ? "root" : "subpage"}`}>
      <Header />
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, TaehyunJeon all rights reserved.
      </footer>
    </div>
  )
}

export default Layout
