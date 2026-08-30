/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import type { ReactNode } from "react"
import { useStaticQuery, graphql } from "gatsby"

interface SeoProps {
  description?: string
  title?: string
  url?: string
  image?: string | null
  type?: "website" | "article"
  publishedTime?: string | null
  children?: ReactNode
}

interface SeoQueryData {
  site: {
    siteMetadata: {
      title: string
      description: string
      siteUrl: string
      social?: {
        twitter?: string | null
      } | null
    }
  }
}

const Seo = ({
  description,
  title,
  url,
  image,
  type = "website",
  publishedTime,
  children,
}: SeoProps) => {
  const { site } = useStaticQuery<SeoQueryData>(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title
  const siteUrl = site.siteMetadata?.siteUrl
  const metaTitle = title ? `${title} | ${defaultTitle}` : defaultTitle
  const canonicalUrl = new URL(url || siteUrl, siteUrl).toString()
  const imageUrl = image ? new URL(image, siteUrl).toString() : null

  return (
    <>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />

      {/* Google Search Console Verification */}
      <meta
        name="google-site-verification"
        content="OkRBNykCrS_DHs7gaT-rC15Z2kYSTHIaNJJmbqHQmVg"
      />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:site_name" content={defaultTitle} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}

      {/* Twitter */}
      <meta
        name="twitter:card"
        content={imageUrl ? "summary_large_image" : "summary"}
      />
      <meta
        name="twitter:creator"
        content={site.siteMetadata?.social?.twitter || ``}
      />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}

      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {children}
    </>
  )
}

export default Seo
