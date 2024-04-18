import React from "react"
import { Link } from "gatsby"
import "../style/GlobalMenu.css"

const GlobalMenuFooter = () => {
  return (
    <footer className="GlobalMenuFooter">
      <div>
        <img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fjeontaehyun0203.github.io&count_bg=%23023327&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=Visit&edge_flat=false" />
      </div>
      <p>© {new Date().getFullYear()}, TaehyunJeon all rights reserved.</p>
    </footer>
  )
}

export default GlobalMenuFooter
