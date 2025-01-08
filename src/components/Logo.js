import React from "react"

const Logo = ({ width, height }) => {
  // localStorage에서 블로그 타입 가져오기
  const blogType =
    typeof window !== "undefined"
      ? localStorage.getItem("blogType") || "tech"
      : "tech"

  // 블로그 타입에 따른 텍스트 설정
  const logoText = blogType === "tech" ? "TH Tech" : "TH Blog"

  // Russo One 폰트 적용
  const fontStyle = {
    fontFamily: "'Russo One', sans-serif",
    fontSize: "20px",
    fontWeight: "normal",
    letterSpacing: "0.5px",
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 90 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text x="0" y="20" fill="white" style={fontStyle}>
        {logoText}
      </text>
    </svg>
  )
}

export default Logo
