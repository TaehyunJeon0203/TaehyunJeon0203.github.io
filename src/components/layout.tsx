import * as React from "react"
import type { ReactNode } from "react"
import Header from "./Header"
import "../style/layout.css"

interface LayoutProps {
  location: Pick<Location, "pathname">
  title?: string
  children: ReactNode
  headerControls?: ReactNode
}

const Layout = ({ location, children, headerControls }: LayoutProps) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div className={`global-wrapper ${isRootPath ? "root" : "subpage"}`}>
      <Header isRootPath={isRootPath} pageControls={headerControls} />
      <main>{children}</main>
    </div>
  )
}

export default Layout
