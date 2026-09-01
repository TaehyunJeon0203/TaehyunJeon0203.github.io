import * as React from "react"
import { Link } from "gatsby"
import "../style/PostCard.css"

interface PostCardProps {
  titleImage?: string
  title: string
  description?: string
  date: string
  tags?: string[]
  slug: string
  customTimeToRead?: number
}

const PostCard = ({
  titleImage,
  title,
  description,
  date,
  tags = [],
  slug,
  customTimeToRead,
}: PostCardProps) => {
  return (
    <Link to={slug} className="post-card-link">
      <article className="post-card">
        <div className="post-card-image-container">
          {titleImage && (
            <img
              src={titleImage}
              alt={title}
              className="post-card-image"
              loading="lazy"
            />
          )}
        </div>
        <div className="post-card-content">
          <header>
            <h2>{title}</h2>
            <div className="post-card-meta">
              <time className="post-card-date">{date}</time>
              {customTimeToRead && (
                <span className="post-card-read-time">
                  {customTimeToRead} min read
                </span>
              )}
            </div>
          </header>
          <p className="post-card-description">{description}</p>
          {tags.length > 0 && (
            <ul className="post-card-tags">
              {tags.map(tag => (
                <li key={tag} className="post-card-tag">
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </article>
    </Link>
  )
}

export default PostCard
