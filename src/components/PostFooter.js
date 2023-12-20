import React, { useEffect } from "react"

const PostFooter = ({ siteUrl, path }) => {
  useEffect(() => {
    // 부모 요소 생성
    const parentContainer = document.createElement("div")
    parentContainer.classList.add("global-footer") // 클래스 추가

    // 페이지가 마운트되었을 때, hits 서비스에 현재 페이지의 URL을 전달
    const postVisit = document.createElement("img")
    postVisit.src = `https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=${siteUrl}${path}&count_bg=%23023327&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=Visit&edge_flat=false`
    postVisit.alt = "postVisit"

    const copyrightText = document.createElement("p")
    copyrightText.textContent = `© ${new Date().getFullYear()}, TaehyunJeon all rights reserved.`

    parentContainer.appendChild(postVisit)
    parentContainer.appendChild(copyrightText)
    document.body.appendChild(parentContainer)

    // 컴포넌트 언마운트 시에 정리
    return () => {
      document.body.removeChild(parentContainer)
    }
  }, [siteUrl, path])

  return null
}

export default PostFooter
