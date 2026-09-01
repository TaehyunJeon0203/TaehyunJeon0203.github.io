import * as React from "react"
import { Link, graphql } from "gatsby"
import type { PageProps } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Profile from "../components/Profile"
import PostCard from "../components/PostCard"
import "../style/PostCard.css"

interface IndexPageData {
  site: {
    siteMetadata: {
      title: string
      profile: {
        name: string
        image: string
        links: {
          github: string
          email: string
          instagram: string
        }
      }
    }
  }
  allMarkdownRemark: {
    nodes: Array<{
      excerpt: string
      timeToRead: number
      fields: {
        slug: string
        customTimeToRead: number
      }
      frontmatter: {
        date: string
        title: string
        titleImage: string | null
        description: string | null
        category: string
        tags: string[] | null
      }
    }>
  }
}

const BlogIndex = ({ data, location }: PageProps<IndexPageData>) => {
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

  const categoryPosts = posts.filter(
    post => post.frontmatter.category === currentCategory
  )
  const availableTags = Array.from(
    new Set(categoryPosts.flatMap(post => post.frontmatter.tags ?? []))
  ).sort((a, b) => a.localeCompare(b, "ko"))
  const requestedTag =
    new URLSearchParams(location.search).get("tag")?.trim() || null
  const selectedTag =
    requestedTag && availableTags.includes(requestedTag) ? requestedTag : null
  const filteredPosts = selectedTag
    ? categoryPosts.filter(post => post.frontmatter.tags?.includes(selectedTag))
    : categoryPosts
  const categoryLabel = currentCategory === "tech" ? "기술" : "일상"

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title="TH blog"
        description="개발자 전태현의 개발, 일상, 여행 이야기를 공유합니다."
      />
      <Profile profile={profile} />
      {availableTags.length > 0 && (
        <nav className="tag-filter" aria-label={`${categoryLabel} 글 태그 필터`}>
          <span className="tag-filter-label">태그로 찾기</span>
          <ul>
            <li>
              <Link
                to={location.pathname}
                className="tag-filter-link"
                aria-current={!selectedTag ? "page" : undefined}
              >
                전체
              </Link>
            </li>
            {availableTags.map(tag => (
              <li key={tag}>
                <Link
                  to={`${location.pathname}?tag=${encodeURIComponent(tag)}`}
                  className="tag-filter-link"
                  aria-current={selectedTag === tag ? "page" : undefined}
                >
                  {tag}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
      {requestedTag && !selectedTag && (
        <p className="tag-filter-notice" role="status">
          이 카테고리에 “{requestedTag}” 태그가 없어 전체 글을 표시합니다.
        </p>
      )}
      <div className="post-cards-container">
        {filteredPosts.map(post => (
          <PostCard
            key={post.fields.slug}
            slug={post.fields.slug}
            title={post.frontmatter.title}
            titleImage={post.frontmatter.titleImage ?? undefined}
            description={post.frontmatter.description ?? post.excerpt}
            date={post.frontmatter.date}
            tags={post.frontmatter.tags ?? []}
            customTimeToRead={post.fields.customTimeToRead}
          />
        ))}
      </div>
      {filteredPosts.length === 0 && (
        <p>아직 {categoryLabel} 포스트가 없습니다.</p>
      )}
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
          tags
        }
      }
    }
  }
`
