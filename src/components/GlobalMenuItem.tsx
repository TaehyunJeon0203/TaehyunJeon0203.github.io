import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import "../style/GlobalMenu.css"

interface MenuPost {
  fields: { slug: string } | null
  frontmatter: {
    title: string
    date: string | null
    displayDate: string | null
    category: string | null
    tags: string[] | null
  }
}

interface GlobalMenuItemProps {
  blogType: "tech" | "daily"
  onNavigate: () => void
}

const GlobalMenuItem = ({ blogType, onNavigate }: GlobalMenuItemProps) => {
  const data = useStaticQuery<{ allMarkdownRemark: { nodes: MenuPost[] } }>(graphql`
    query GlobalMenuPosts {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
        nodes {
          fields { slug }
          frontmatter {
            title
            date
            displayDate: date(formatString: "YYYY.MM.DD")
            category
            tags
          }
        }
      }
    }
  `)
  const posts = data.allMarkdownRemark.nodes.filter(
    post => post.fields?.slug && post.frontmatter.category === blogType
  )
  const tags = Array.from(new Set(posts.flatMap(post => post.frontmatter.tags ?? [])))
    .sort((a, b) => a.localeCompare(b, "ko"))

  return (
    <nav className="menu-items" aria-label={`${blogType === "tech" ? "기술" : "일상"} 글 탐색`}>
      <section className="menu-section">
        <h2>최근 {blogType === "tech" ? "기술" : "일상"} 글</h2>
        {posts.length ? (
          <ul className="menu-recent-posts">
            {posts.slice(0, 3).map(post => (
              <li key={post.fields!.slug}>
                <Link to={post.fields!.slug} onClick={onNavigate}>
                  <span>{post.frontmatter.title}</span>
                  {post.frontmatter.date && (
                    <time dateTime={post.frontmatter.date}>{post.frontmatter.displayDate}</time>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        ) : <p className="menu-empty">아직 등록된 글이 없습니다.</p>}
      </section>
      {tags.length > 0 && (
        <section className="menu-section">
          <h2>태그로 찾기</h2>
          <ul className="menu-tags">
            {tags.map(tag => (
              <li key={tag}>
                <Link to={`/?tag=${encodeURIComponent(tag)}`} onClick={onNavigate}>{tag}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      <Link className="menu-all-posts" to="/" onClick={onNavigate}>전체 글 보기 →</Link>
    </nav>
  )
}

export default GlobalMenuItem
