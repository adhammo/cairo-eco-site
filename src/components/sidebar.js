import React from "react"
import { Link } from "gatsby"

import { SidebarContextConsumer } from "../components/contexts/sidebar-context"

import logo from "../images/shell-anubis.svg"

import "../styles/components/sidebar.css"

const Sidebar = ({ pages }) => (
  <SidebarContextConsumer>
    {({ data: sidebarData, set: setSidebarData }) => (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          right: 0,
          top: 0,
          zIndex: 1000,
          pointerEvents: sidebarData.sidebarActive ? "all" : "none",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#000",
            opacity: sidebarData.sidebarActive ? 0.6 : 0,
            transition: "opacity 0.3s",
          }}
          tabIndex="-1"
          role="button"
          onMouseDown={() => {
            if (document.activeElement) document.activeElement.blur()
            setSidebarData({
              sidebarActive: false,
            })
          }}
        >
          <></>
        </div>
        <div
          style={{
            width: 300,
            height: "100%",
            overflowY: "hidden",
            position: "absolute",
            right: 0,
            top: 0,
            display: "grid",
            gridTemplateRows: "auto 1fr",
            gridTemplateColumns: "1fr",
            background: "#202020",
            boxShadow: "-2px 0 6px #0008",
            transform: sidebarData.sidebarActive
              ? "none"
              : "translate(calc(100% + 20px), 0)",
            transition: "transform 0.3s",
          }}
        >
          <div
            style={{
              borderTop: "4px solid #22477e",
              background: "#162d50",
              padding: "0.5rem 1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <img
              src={logo}
              alt="Cairo University Eco-Racing Team Logo"
              style={{
                height: "3rem",
                margin: 0,
                userSelect: "none",
              }}
              draggable="false"
            />
            <button
              className="menu-close no-focus"
              style={{
                width: 24,
                height: 24,
                padding: 5,
                boxSizing: "content-box",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                userSelect: "none",
                overflow: "hidden",
                outline: "none",
              }}
              tabIndex={sidebarData.sidebarActive ? "0" : "-1"}
              onClick={() => {
                if (document.activeElement) document.activeElement.blur()
                setSidebarData({
                  sidebarActive: false,
                })
              }}
            >
              <span
                className="material-icons"
                style={{
                  color: "#162d50",
                }}
              >
                close
              </span>
            </button>
          </div>
          <div
            style={{
              borderTop: "4px solid #505050",
              boxSizing: "border-box",
              overflowY: "auto",
            }}
          >
            <nav>
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                }}
              >
                {pages.map((page, index) => (
                  <li
                    className="nav-item"
                    key={index}
                    style={{
                      display: "block",
                      margin: 0,
                      listStyle: "none",
                    }}
                  >
                    <Link
                      className="nav-link no-focus"
                      to={page.path}
                      title={`Go to ${page.title.toLowerCase()} page`}
                      style={{
                        display: "block",
                        padding: "1rem",
                        boxSizing: "border-box",
                        fontFamily: "open sans",
                        fontWeight: "bold",
                        background: "#404040",
                        textDecoration: "none",
                        userSelect: "none",
                        outline: "none",
                      }}
                      tabIndex={sidebarData.sidebarActive ? "0" : "-1"}
                      onClick={() => {
                        if (document.activeElement)
                          document.activeElement.blur()
                        setSidebarData({
                          sidebarActive: false,
                        })
                      }}
                    >
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    )}
  </SidebarContextConsumer>
)

export default Sidebar
