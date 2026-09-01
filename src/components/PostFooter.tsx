import * as React from "react"

interface PostFooterProps {
  siteUrl: string
  path: string
}

const PostFooter = ({ siteUrl, path }: PostFooterProps) => {
  const visitCounterUrl = `https://myhits.vercel.app/api/hit/${encodeURIComponent(
    siteUrl + path
  )}?color=gray&label=Visits&size=small`

  return (
    <footer className="global-footer">
      <img
        src={visitCounterUrl}
        alt="Post visits"
        loading="lazy"
        decoding="async"
      />
      <p>© {new Date().getFullYear()}, TaehyunJeon all rights reserved.</p>
    </footer>
  )
}

export default PostFooter
