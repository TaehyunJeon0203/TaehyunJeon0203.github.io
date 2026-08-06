import React from "react"
import "../style/GlobalMenu.css"

const GlobalMenuFooter = () => {
  return (
    <footer className="GlobalMenuFooter">
      <div>
        <img
          src="https://myhits.vercel.app/api/hit/https%3A%2F%2Fjeontaehyun0203.github.io?color=gray&label=Visits&size=small"
          alt="hits"
        />
      </div>
      <p>© {new Date().getFullYear()}, TaehyunJeon all rights reserved.</p>
    </footer>
  )
}

export default GlobalMenuFooter
