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
