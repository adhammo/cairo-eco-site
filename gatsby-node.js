const config = require("./src/config")

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions

  const metadata = config.pagesMetadata[page.path]
  if (metadata) {
    page.context.title = metadata.title
    page.context.layout = metadata.layout
    createPage(page)
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const postTemplate = require.resolve(`./src/templates/post.js`)
  const result = await graphql(`
    {
      news: allFile(
        filter: {
          sourceInstanceName: { eq: "resources" }
          relativeDirectory: { glob: "news/*" }
          extension: { eq: "mdx" }
          name: { eq: "pinfo" }
        }
      ) {
        nodes {
          name
          relativeDirectory
          childMdx {
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  
  result.data.news.nodes.forEach(node => {
    const post = node.relativeDirectory.match(/news\/(.*)/)[1]
    createPage({
      path: `/news/${post}`,
      component: postTemplate,
      context: {
        locator: `news/${post}`,
        title: node.childMdx.frontmatter.title,
        layout: "page",
      },
    })
  })
}
