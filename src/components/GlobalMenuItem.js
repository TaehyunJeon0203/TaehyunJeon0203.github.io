import * as React from "react"
import { Link } from "gatsby"
import "../style/GlobalMenu.css"

const GlobalMenuItem = () => {
  return (
    <div className="menu-items">
      <div className="menu-intro">
        <p>
          안녕하세요!
          <br />
          방문을 환영합니다.
          <br />
          <br />
          이곳은 웹 개발자가 되고싶은 대학생의 기술 및 일상 블로그입니다.
          <br />
          <br />
          우측 상단 버튼을 사용하여 블로그의 테마를 변경할 수 있습니다.
        </p>
      </div>
    </div>
  )
}

export default GlobalMenuItem
