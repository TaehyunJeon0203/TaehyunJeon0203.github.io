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
        {titleImage && (
          <div className="post-card-image-container">
            <img
              src={titleImage}
              alt={title}
              className="post-card-image"
              loading="lazy"
            />
          </div>
        )}
        <div className="post-card-content">
          <header>
            <h2>{title}</h2>
            <div className="post-card-meta">
              <time className="post-card-date">{date}</time>
              <span className="post-card-read-time">
                {customTimeToRead} min read
              </span>
            </div>
          </header>
          <p className="post-card-description">{description}</p>
          {tags.length > 0 && (
            <ul className="post-card-tags">
              {tags.map((tag, index) => (
                <li key={index} className="post-card-tag">
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
