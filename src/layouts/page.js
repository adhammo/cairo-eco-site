import React from "react"

import { PageContextConsumer } from "../components/contexts/page-context"

import Header from "../components/header"
import Footer from "../components/footer"
import Sidebar from "../components/sidebar"

import { sidebarPages } from "../config"

const Page = ({ title, children }) => (
  <PageContextConsumer>
    {({ data: pageData }) => (
      <div
        style={{
          width: "100%",
          height: "100vh",
          overflowY: pageData.blockView ? "hidden" : "auto",
        }}
      >
        <div
          id="body"
          style={{
            position: "relative",
            minHeight: "100%",
            display: "grid",
            gridTemplateRows: "auto 1fr auto",
          }}
        >
          <Header />
          <main
            style={{
              height: "100%",
              pointerEvents: pageData.blockView ? "none" : "all",
            }}
          >
            {children}
          </main>
          <Footer />
          <Sidebar
            pages={sidebarPages.reduce((pages, page) => {
              if (page.title !== title) pages.push(page)
              return pages
            }, [])}
          />
        </div>
      </div>
    )}
  </PageContextConsumer>
)

export default Page
