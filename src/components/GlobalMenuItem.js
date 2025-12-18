import * as React from "react"
import { Link } from "gatsby"
import "../style/GlobalMenu.css"

const GlobalMenuItem = () => {
  return (
    <div className="menu-items">
      <div className="menu-intro">
        <p>
          안녕하세요! 환영합니다
          <br />
          <br />
          개발자 전태현의 개발, 여행, 일상을 공유합니다.
          <br />
          <br />
          우측 상단 버튼을 사용하여 블로그의 테마를 변경할 수 있습니다.
          <br />
          <br />
          <a href="https://lifestats-sepia.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: '#0070f3', textDecoration: 'underline' }}>
            LifeStats
          </a>
        </p>
      </div>
    </div>
  )
}

export default GlobalMenuItem
