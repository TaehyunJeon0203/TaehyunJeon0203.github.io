import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import "../style/PostCard.css"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <p>Sorry! No post..</p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <div className="post-cards-container">
        {posts.map(post => (
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
              <div className="post-card-date">{post.frontmatter.date}</div>
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

export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY. MM. DD")
          title
          titleImage
          description
        }
        timeToRead
      }
    }
  }
`
