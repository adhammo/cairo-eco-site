import React from "react"
import { Helmet } from "react-helmet"
import { withPrefix } from "gatsby"

import { PageContextProvider } from "../components/contexts/page-context"

import SEO from "../components/seo"

import Page from "./page"
import Message from "./message"

import "../styles/layouts/index.css"

export default ({ children, pageContext }) => (
  <>
    <Helmet>
      <script src={withPrefix("style.js")} type="text/javascript" />
    </Helmet>
    <SEO title={pageContext.title} />
    <PageContextProvider>
      {(() => {
        if (pageContext.layout === "message")
          return <Message title={pageContext.title}>{children}</Message>
        else if (pageContext.layout === "page")
          return <Page title={pageContext.title}>{children}</Page>
        return <>{children}</>
      })()}
    </PageContextProvider>
  </>
)
