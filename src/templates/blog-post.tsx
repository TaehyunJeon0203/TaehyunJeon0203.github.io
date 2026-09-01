import * as React from "react"
import { Link, graphql } from "gatsby"
import type { HeadProps, PageProps } from "gatsby"

import Seo from "../components/seo"
import Header from "../components/Header"
import PostFooter from "../components/PostFooter"
import ShareButton from "../components/ShareButton"

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
      datePublished: string | null
      description: string | null
      titleImage: string | null
      tags: string[] | null
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

const addImageLoadingAttributes = (html: string) =>
  html
    .replace(/<img\b(?![^>]*\bloading=)/gi, '<img loading="lazy"')
    .replace(/<img\b(?![^>]*\bdecoding=)/gi, '<img decoding="async"')

const BlogPostTemplate = ({
  data: { previous, next, site, markdownRemark: post },
  location,
}: PageProps<BlogPostData>) => {
  const siteUrl = site.siteMetadata.siteUrl
  const timeToRead = post.fields?.customTimeToRead ?? 1
  const postUrl = new URL(location.pathname, siteUrl).toString()
  const postHtml = addImageLoadingAttributes(post.html)

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
              dateTime={post.frontmatter.datePublished || undefined}
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
          {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
            <ul className="post-tags" aria-label="태그">
              {post.frontmatter.tags.map(tag => (
                <li key={tag}>
                  <Link to={`/?tag=${encodeURIComponent(tag)}`}>{tag}</Link>
                </li>
              ))}
            </ul>
          )}
          {post.frontmatter.titleImage && (
            <img
              className="post-hero"
              src={post.frontmatter.titleImage}
              alt=""
              itemProp="image"
              loading="eager"
              decoding="async"
            />
          )}
        </header>
        <section
          className="post-body"
          dangerouslySetInnerHTML={{ __html: postHtml }}
          itemProp="articleBody"
        />
        <footer className="post-actions">
          <ShareButton title={post.frontmatter.title} url={postUrl} />
        </footer>
      </article>
      {(previous || next) && (
        <nav className="blog-post-nav" aria-label="같은 카테고리의 글 탐색">
          <ul>
            {previous && (
              <li>
                <Link
                  className="post-nav-link post-nav-previous"
                  to={previous.fields.slug}
                  rel="prev"
                >
                  <span className="post-nav-label">← 이전 글</span>
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
                  <span className="post-nav-label">다음 글 →</span>
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
  data: { site, markdownRemark: post },
  location,
}: HeadProps<BlogPostData>) => {
  const postUrl = new URL(
    location.pathname,
    site.siteMetadata.siteUrl
  ).toString()

  return (
    <>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        url={postUrl}
        type="article"
        image={post.frontmatter.titleImage}
        publishedTime={post.frontmatter.datePublished}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.frontmatter.title,
            description: post.frontmatter.description || post.excerpt,
            url: postUrl,
            image: post.frontmatter.titleImage
              ? new URL(
                  post.frontmatter.titleImage,
                  site.siteMetadata.siteUrl
                ).toString()
              : undefined,
            datePublished: post.frontmatter.datePublished || undefined,
            publisher: {
              "@type": "Person",
              name: "TaehyunJeon",
            },
          }),
        }}
      />
    </>
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
        tags
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
