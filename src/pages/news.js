import React from "react"
import { StaticQuery, graphql } from "gatsby"

import Post from "../components/post"

import authors from "../content/authors"
import { pinned } from "../content/news"

import "../styles/pages/news.css"

const PostSection = ({ title, posts, authorImgs, style }) => (
  <section style={style}>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "2rem",
      }}
    >
      <h1
        className="themed--color"
        style={{
          fontFamily: "noto sans",
          opacity: 0.9,
          margin: 0,
          transition: "color 0.2s",
        }}
      >
        {title}
      </h1>
    </div>
    <div>
      {Object.entries(posts)
        .map(([, postData]) => ({
          ...postData.pinfo,
          ...postData.pshort,
        }))
        .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
        .map((post, index) => (
          <Post
            key={index}
            post={post}
            author={authors[post.author]}
            authorImg={authorImgs[authors[post.author].avatar]}
            more={post.more}
          />
        ))}
    </div>
  </section>
)

const NewsPage = ({ posts, authorImgs }) => (
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
      {pinned.length > 0 && (
        <PostSection
          style={{ marginBottom: "4rem" }}
          title="Pinned"
          posts={Object.entries(posts)
            .filter(([post]) => pinned.includes(post))
            .map(([post]) => posts[post])}
          authorImgs={authorImgs}
        />
      )}
      <PostSection title="News" posts={posts} authorImgs={authorImgs} />
    </div>
  </section>
)

export default props => (
  <StaticQuery
    query={graphql`
      query {
        news: allFile(
          filter: {
            sourceInstanceName: { eq: "resources" }
            relativeDirectory: { glob: "news/*" }
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
                more
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
    `}
    render={data => (
      <NewsPage
        {...props}
        posts={data.news.nodes.reduce((posts, node) => {
          const post = node.relativeDirectory.match(/news\/(.*)/)[1]
          if (!posts[post]) posts[post] = {}
          posts[post] = {
            ...posts[post],
            [node.name]:
              node.name === "pinfo"
                ? {
                    name: post,
                    author: node.childMdx.frontmatter.author,
                    title: node.childMdx.frontmatter.title,
                    palette: node.childMdx.frontmatter.palette,
                    date: node.childMdx.frontmatter.date,
                    day: node.childMdx.frontmatter.day,
                    since: node.childMdx.frontmatter.since,
                    more: node.childMdx.frontmatter.more,
                  }
                : { body: node.childMdx.body },
          }
          return posts
        }, {})}
        authorImgs={data.authorImgs.nodes.reduce(
          (authorImgs, node) => ({
            ...authorImgs,
            [node.name]: node.childImageSharp.fixed,
          }),
          {}
        )}
      />
    )}
  />
)
