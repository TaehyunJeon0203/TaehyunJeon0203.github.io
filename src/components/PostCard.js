import React from "react"
import { Link } from "gatsby"
import "../style/PostCard.css"

const PostCard = ({
  titleImage,
  title,
  description,
  date,
  tags = [],
  slug,
  timeToRead,
}) => {
  return (
    <Link to={slug} className="post-card-link">
      <div className="post-card">
        {titleImage && (
          <img
            src={titleImage}
            alt={title}
            className="post-title-image"
            loading="lazy"
          />
        )}
        <div>
          <h2 className="post-title">{title}</h2>
          <p className="post-description">{description}</p>
          <div className="post-meta">
            <span className="post-date">{date}</span>
            <span className="post-read-time">{timeToRead} min read</span>
            <ul className="post-tags">
              {tags.map((tag, index) => (
                <li key={index} className="tag">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
