import React from "react"
import { graphql } from "gatsby"

import authors from "../content/authors"

import Post from "../components/post"

const PostTemplate = ({ postData, authorImgs }) => (
  <section
    className="themed--back"
    style={{
      width: "100%",
      minHeight: "100%",
      padding: "2rem 1rem",
      boxSizing: "border-box",
      display: "flex",
      justifyContent: "center",
      transition: "background 0.2s",
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: 1024,
      }}
    >
      {(() => {
        const post = {
          ...postData.pinfo,
          ...postData.plong,
        }
        return (
          <Post
            post={post}
            author={authors[post.author]}
            authorImg={authorImgs[authors[post.author].avatar]}
            short={false}
          />
        )
      })()}
    </div>
  </section>
)

export const pageQuery = graphql`
  query($locator: String!) {
    news: allFile(
      filter: {
        sourceInstanceName: { eq: "resources" }
        relativeDirectory: { eq: $locator }
        extension: { eq: "mdx" }
      }
    ) {
      nodes {
        name
        relativeDirectory
        childMdx {
          frontmatter {
            author
            title
            palette
            date
            day: date(formatString: "MMMM DD, YYYY")
            since: date(fromNow: true)
          }
          body
        }
      }
    }
    authorImgs: allFile(
      filter: {
        sourceInstanceName: { eq: "resources" }
        relativeDirectory: { eq: "authors" }
      }
    ) {
      nodes {
        name
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  }
`

export default props => (
  <PostTemplate
    {...props}
    postData={props.data.news.nodes.reduce((postData, node) => {
      postData = {
        ...postData,
        [node.name]:
          node.name === "pinfo"
            ? {
                name: node.relativeDirectory.match(/news\/(.*)/)[1],
                author: node.childMdx.frontmatter.author,
                title: node.childMdx.frontmatter.title,
                palette: node.childMdx.frontmatter.palette,
                date: node.childMdx.frontmatter.date,
                day: node.childMdx.frontmatter.day,
                since: node.childMdx.frontmatter.since,
              }
            : { body: node.childMdx.body },
      }
      return postData
    }, {})}
    authorImgs={props.data.authorImgs.nodes.reduce(
      (authorImgs, node) => ({
        ...authorImgs,
        [node.name]: node.childImageSharp.fixed,
      }),
      {}
    )}
  />
)
