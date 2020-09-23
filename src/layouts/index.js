import React from "react"

import Page from "./page"
import Message from "./message"

import SEO from "../components/seo"

import "../styles/index.css"

export default ({ children, pageContext }) => (
  <>
    <SEO title={pageContext.title} />
    {(() => {
      if (pageContext.layout === "message")
        return <Message title={pageContext.title}>{children}</Message>
      else if (pageContext.layout === "page")
        return <Page title={pageContext.title}>{children}</Page>

      return <>{children}</>
    })()}
  </>
)
