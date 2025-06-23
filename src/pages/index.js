import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Profile from "../components/Profile"
import "../style/PostCard.css"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const profile = data.site.siteMetadata?.profile
  const posts = data.allMarkdownRemark.nodes
  const [currentCategory, setCurrentCategory] = React.useState(() => {
    // 초기값을 localStorage에서 가져옴
    if (typeof window !== "undefined") {
      const savedType = localStorage.getItem("blogType")
      return savedType || "tech"
    }
    return "tech"
  })

  React.useEffect(() => {
    // localStorage 변경 감지
    const handleStorageChange = () => {
      if (typeof window !== "undefined") {
        const savedType = localStorage.getItem("blogType")
        setCurrentCategory(savedType || "tech")
      }
    }

    // body 클래스 변경 감지
    const observer = new MutationObserver(() => {
      if (typeof window !== "undefined") {
        const savedType = localStorage.getItem("blogType")
        setCurrentCategory(savedType || "tech")
      }
    })

    if (typeof window !== "undefined") {
      // Storage 이벤트 리스너 추가
      window.addEventListener("storage", handleStorageChange)

      // body 클래스 변경 감지
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["class"],
      })
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("storage", handleStorageChange)
        observer.disconnect()
      }
    }
  }, [])

  // 현재 카테고리에 맞는 포스트만 필터링
  const filteredPosts = posts.filter(
    post => post.frontmatter.category === currentCategory
  )

  if (filteredPosts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <p>
          아직 {currentCategory === "tech" ? "기술" : "일상"} 포스트가 없습니다.
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <Profile profile={profile} />
      <div className="post-cards-container">
        {filteredPosts.map(post => (
          <Link
            to={post.fields.slug}
            className="post-card"
            key={post.fields.slug}
          >
            <div className="post-card-image-container">
              {post.frontmatter.titleImage && (
                <img
                  src={post.frontmatter.titleImage}
                  alt={post.frontmatter.title}
                  className="post-card-image"
                />
              )}
            </div>
            <div className="post-card-content">
              <h2>{post.frontmatter.title}</h2>
              <div className="post-card-meta">
                <time className="post-card-date">{post.frontmatter.date}</time>
                <span className="post-card-read-time">
                  {post.fields.customTimeToRead} min read
                </span>
              </div>
              <p className="post-card-description">
                {post.frontmatter.description || post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        profile {
          name
          image
          links {
            github
            email
            instagram
          }
        }
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        timeToRead
        fields {
          slug
          customTimeToRead
        }
        frontmatter {
          date(formatString: "YYYY. MM. DD")
          title
          titleImage
          description
          category
        }
      }
    }
  }
`
