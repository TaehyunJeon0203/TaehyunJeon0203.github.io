import React, { useEffect } from "react"

const PostFooter = ({ siteUrl, path }) => {
  useEffect(() => {
    // 부모 요소 생성
    const parentContainer = document.createElement("div")
    parentContainer.classList.add("global-footer")

    // 새로운 hits 서비스 이미지 생성
    const postVisit = document.createElement("img")
    postVisit.src = `https://myhits.vercel.app/api/hit/${encodeURIComponent(
      siteUrl + path
    )}?color=gray&label=Visits&size=small`
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
