import React from "react"

import { sidebarPages } from "../config"

import {
  SidebarContextProvider,
  SidebarContextConsumer,
} from "../components/contexts/sidebar-context"

import Header from "../components/header"
import Footer from "../components/footer"
import Sidebar from "../components/sidebar"

import "../styles/layouts/page.css"

const Page = ({ title, children }) => (
  <SidebarContextProvider>
    <SidebarContextConsumer>
      {({ data }) => (
        <div
          style={{
            width: "100%",
            height: "100vh",
            overflowY: data.sidebarActive ? "hidden" : "auto",
          }}
        >
          <Header />
          <main
            style={{
              pointerEvents: data.sidebarActive ? "none" : "all",
            }}
          >
            {children}
          </main>
          <Footer />
          <Sidebar
            pages={(() =>
              sidebarPages.reduce((pages, page) => {
                if (page.title !== title) pages.push(page)
                return pages
              }, []))()}
          />
        </div>
      )}
    </SidebarContextConsumer>
  </SidebarContextProvider>
)

export default Page
