import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PostCard from "../components/PostCard"

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
      {posts.map(post => (
        <PostCard
          key={post.fields.slug}
          titleImage={post.frontmatter.titleImage}
          title={post.frontmatter.title}
          description={post.frontmatter.description}
          date={post.frontmatter.date}
          slug={post.fields.slug}
          timeToRead={post.timeToRead}
        />
      ))}
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
