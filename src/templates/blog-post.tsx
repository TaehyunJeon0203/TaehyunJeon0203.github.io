import * as React from "react"
import { Link, graphql } from "gatsby"
import type { HeadProps, PageProps } from "gatsby"

import Seo from "../components/seo"
import Header from "../components/Header"
import PostFooter from "../components/PostFooter"

interface BlogPostData {
  site: {
    siteMetadata: {
      title: string
      siteUrl: string
    }
  }
  markdownRemark: {
    id: string
    excerpt: string
    html: string
    fields: {
      customTimeToRead: number | null
    } | null
    frontmatter: {
      title: string
      date: string
      datePublished: string
      description: string | null
      titleImage: string | null
    }
  }
  previous: {
    fields: { slug: string }
    frontmatter: { title: string }
  } | null
  next: {
    fields: { slug: string }
    frontmatter: { title: string }
  } | null
}

const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post },
  location,
}: PageProps<BlogPostData>) => {
  const siteUrl = site.siteMetadata.siteUrl
  const timeToRead = post.fields?.customTimeToRead ?? 1

  return (
    <div className="global-wrapper">
      <Header isRootPath={false} />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header className="post-header">
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <div className="post-meta" aria-label="Post metadata">
            <time
              dateTime={post.frontmatter.datePublished}
              itemProp="datePublished"
            >
              {post.frontmatter.date}
            </time>
            <span aria-hidden="true">·</span>
            <span>{timeToRead} min read</span>
          </div>
          {post.frontmatter.description && (
            <p className="post-description" itemProp="description">
              {post.frontmatter.description}
            </p>
          )}
          {post.frontmatter.titleImage && (
            <img
              className="post-hero"
              src={post.frontmatter.titleImage}
              alt=""
              itemProp="image"
            />
          )}
        </header>
        <section
          className="post-body"
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
      </article>
      {(previous || next) && (
        <nav className="blog-post-nav" aria-label="Post navigation">
          <ul>
            {previous && (
              <li>
                <Link
                  className="post-nav-link post-nav-previous"
                  to={previous.fields.slug}
                  rel="prev"
                >
                  <span className="post-nav-label">← Previous post</span>
                  <span className="post-nav-title">
                    {previous.frontmatter.title}
                  </span>
                </Link>
              </li>
            )}
            {next && (
              <li className="post-nav-next-item">
                <Link
                  className="post-nav-link post-nav-next"
                  to={next.fields.slug}
                  rel="next"
                >
                  <span className="post-nav-label">Next post →</span>
                  <span className="post-nav-title">
                    {next.frontmatter.title}
                  </span>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
      <PostFooter siteUrl={siteUrl} path={location.pathname} />
    </div>
  )
}

export const Head = ({
  data: { markdownRemark: post },
}: HeadProps<BlogPostData>) => {
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
    />
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        customTimeToRead
      }
      frontmatter {
        title
        date(formatString: "YYYY. MM. DD")
        datePublished: date(formatString: "YYYY-MM-DD")
        description
        titleImage
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
