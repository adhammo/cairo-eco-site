import React from "react"

import { PageContextConsumer } from "./contexts/page-context"

import Logo from "../components/logo"

import "../styles/components/header.css"

const Header = () => (
  <PageContextConsumer>
    {({ set: setPageData }) => (
      <header
        className="themed--back-sec"
        style={{
          position: "relative",
          padding: "1rem 0.5rem",
          boxSizing: "border-box",
          transition: "background 0.2s",
        }}
      >
        <div
          className="header__container"
          style={{
            maxWidth: 1024,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Logo />
          <button
            className="menu__button--open themed--back-pri"
            style={{
              width: 24,
              height: 24,
              padding: 5,
              boxSizing: "content-box",
              border: "none",
              borderRadius: "50%",
              cursor: "pointer",
              userSelect: "none",
              overflow: "hidden",
              outline: "none",
              transition: "background 0.2s",
            }}
            onClick={() => {
              if (document.activeElement) document.activeElement.blur()
              setPageData({
                sidebarActive: true,
                blockView: true,
              })
            }}
          >
            <span
              className="material-icons themed--color-sec"
              style={{
                transition: "color 0.2s",
              }}
            >
              menu
            </span>
          </button>
        </div>
      </header>
    )}
  </PageContextConsumer>
)

export default Header
