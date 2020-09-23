import React from "react"

import { SidebarContextConsumer } from "../components/contexts/sidebar-context"

import Logo from "../components/logo"

import "../styles/components/header.css"

const Header = ({ openSidebar }) => (
  <SidebarContextConsumer>
    {({ data: sidebarData, set: setSidebarData }) => (
      <header
        style={{
          position: "relative",
          padding: "1rem 0.5rem",
          boxSizing: "border-box",
          background: "#162d50",
        }}
      >
        <div
          className="header-content"
          style={{
            maxWidth: 1024,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Logo />
          <button
            className="menu-open"
            style={{
              width: 24,
              height: 24,
              padding: 5,
              boxSizing: "content-box",
              border: "none",
              borderRadius: "50%",
              userSelect: "none",
              cursor: "pointer",
              outline: "none",
            }}
            onClick={() => {
              if (document.activeElement) document.activeElement.blur()
              setSidebarData({
                sidebarActive: true,
              })
            }}
          >
            <span
              className="material-icons"
              style={{
                color: "#162d50",
              }}
            >
              menu
            </span>
          </button>
        </div>
      </header>
    )}
  </SidebarContextConsumer>
)

export default Header
