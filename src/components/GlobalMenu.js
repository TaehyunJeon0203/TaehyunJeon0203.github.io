import React, { useState, useEffect } from "react"
import Modal from "react-modal"
import "../style/GlobalMenu.css"
import GlobalMenuHeader from "./GlobalMenuHeader"
import GlobalMenuFooter from "./GlobalMenuFooter"
import GlobalMenuItem from "./GlobalMenuItem"

const GlobalMenu = ({ isOpen, toggleMenu }) => {
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("menu-open") // 메뉴가 열릴 때 body에 menu-open 클래스 추가
    } else {
      document.body.classList.remove("menu-open") // 메뉴가 닫힐 때 body에서 menu-open 클래스 제거
    }
  }, [isOpen])

  const handleCloseModal = () => {
    setIsClosing(true) // 모달이 닫히는 중임을 설정합니다.
    setTimeout(() => {
      toggleMenu() // 모달을 닫습니다.
      setIsClosing(false) // 모달이 닫혔음을 설정합니다.
    }, 500) // setTimeout으로 모달이 완전히 닫히는 데 0.5초를 설정합니다.
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Global Menu"
      className={`menu-modal ${isOpen && !isClosing ? "slideIn" : "slideOut"}`}
      overlayClassName="menu-overlay"
    >
      <div className="menu">
        <GlobalMenuHeader />
        <GlobalMenuItem />
        <GlobalMenuFooter />
      </div>
    </Modal>
  )
}

export default GlobalMenu
