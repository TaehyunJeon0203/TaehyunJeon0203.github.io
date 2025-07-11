// Layout.js
import React from "react"
import Header from "./Header"
import "../style/layout.css"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div className={`global-wrapper ${isRootPath ? "root" : "subpage"}`}>
      <Header />
      <main>{children}</main>
    </div>
  )
}

export default Layout
