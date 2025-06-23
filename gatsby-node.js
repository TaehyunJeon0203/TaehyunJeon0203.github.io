/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

// Define the template for blog post
const blogPost = path.resolve(`./src/templates/blog-post.js`)

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Get all markdown blog posts sorted by date
  const result = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: ASC } }, limit: 1000) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }
}

/**
 * @type {import('gatsby').GatsbyNode['onCreateNode']}
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })

    // 커스텀 읽기 시간 계산
    const calculateCustomTimeToRead = content => {
      // 마크다운 문법 제거하고 순수 텍스트만 추출
      const plainText = content
        .replace(/!\[.*?\]\(.*?\)/g, "") // 이미지 링크 제거
        .replace(/\[.*?\]\(.*?\)/g, "") // 일반 링크 제거
        .replace(/`.*?`/g, "") // 인라인 코드 제거
        .replace(/```[\s\S]*?```/g, "") // 코드 블록 제거
        .replace(/#{1,6}\s+/g, "") // 헤딩 제거
        .replace(/\*\*.*?\*\*/g, "") // 볼드 텍스트 제거
        .replace(/\*.*?\*/g, "") // 이탤릭 텍스트 제거
        .replace(/~~.*?~~/g, "") // 취소선 제거
        .replace(/>\s*/g, "") // 인용문 제거
        .replace(/\n+/g, " ") // 줄바꿈을 공백으로 변경
        .replace(/\s+/g, " ") // 연속된 공백을 하나로 변경
        .trim()

      // 한글과 영어 단어 수 계산
      const koreanWords = (plainText.match(/[가-힣]+/g) || []).length
      const englishWords = plainText
        .split(/\s+/)
        .filter(word => /^[a-zA-Z]+$/.test(word)).length

      // 한글은 글자 수로 계산 (한 글자당 0.5초)
      // 영어는 단어 수로 계산 (한 단어당 0.3초)
      const koreanTime = koreanWords * 0.5
      const englishTime = englishWords * 0.3

      // 총 읽기 시간 (초 단위)
      const totalSeconds = koreanTime + englishTime

      // 분으로 변환하고 최소 1분 보장
      const minutes = Math.max(1, Math.ceil(totalSeconds / 60))

      return minutes
    }

    const customTimeToRead = calculateCustomTimeToRead(node.internal.content)

    createNodeField({
      name: `customTimeToRead`,
      node,
      value: customTimeToRead,
    })
  }
}

/**
 * @type {import('gatsby').GatsbyNode['createSchemaCustomization']}
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
      customTimeToRead: Int
    }
  `)
}
