import PropTypes from "prop-types"
import React, { Component } from "react"
import { Link } from "gatsby"

import { PageContext, PageContextConsumer } from "./contexts/page-context"

import ShellAnubis from "../images/shell-anubis.js"

import { toggleDark, switchTheme } from "../style"

import "../styles/components/sidebar.css"

class Sidebar extends Component {
  constructor() {
    super()
    this.state = {
      active: false,
      dragging: false,
      dragPercent: 0,
    }
  }

  componentWillUnmount() {
    if (this.state.active) {
      document.removeEventListener("keydown", this.listenForEscape)
      document.removeEventListener("backbutton", this.closeSidebar)
    }

    if (this.state.dragging) {
      document.removeEventListener("mouseup", this.stopDrag)
      document.removeEventListener("mousemove", this.drag)
      if (this.context.data.blockView) {
        this.context.set({
          blockView: false,
        })
      }
    }
  }

  componentDidUpdate() {
    if (this.context.data.sidebarActive) {
      if (!this.state.active) {
        document.addEventListener("keydown", this.listenForEscape)
        document.addEventListener("backbutton", this.closeSidebar)
        this.setState({
          active: true,
        })
      }
    } else {
      if (this.state.active) {
        document.removeEventListener("keydown", this.listenForEscape)
        document.removeEventListener("backbutton", this.closeSidebar)
        this.setState({
          active: false,
        })
      }
    }
  }

  closeSidebar = () => {
    if (document.activeElement) document.activeElement.blur()
    this.context.set({
      sidebarActive: false,
      blockView: false,
    })
  }

  listenForEscape = event => {
    if (event.keyCode === 27) this.closeSidebar()
  }

  startDrag = e => {
    if (!this.state.dragging) {
      if (document.activeElement) document.activeElement.blur()
      e.preventDefault()
      document.addEventListener("mouseup", this.stopDrag)
      document.addEventListener("mousemove", this.drag)
      this.mouseStart = e.screenX
      this.mousePos = e.screenX
      this.delta = 0
      this.setState({
        dragging: true,
        dragPercent: 0,
      })
    }
  }

  stopDrag = e => {
    if (this.state.dragging) {
      e.preventDefault()
      document.removeEventListener("mouseup", this.stopDrag)
      document.removeEventListener("mousemove", this.drag)
      if (this.state.dragPercent >= 0.5 || this.delta / 300 > 0.03) {
        this.context.set({
          sidebarActive: true,
          blockView: true,
        })
      } else if (this.context.data.blockView) {
        this.context.set({
          blockView: false,
        })
      }
      this.setState({
        dragging: false,
        dragPercent: 0,
      })
    }
  }

  drag = e => {
    if (this.state.dragging) {
      e.preventDefault()
      this.delta = e.screenX - this.mousePos
      this.mousePos = e.screenX
      const dragPercent = Math.max(
        0,
        Math.min((this.mousePos - this.mouseStart) / 300, 1)
      )
      if (!this.context.data.blockView && dragPercent > 0.05) {
        this.context.set({
          blockView: true,
        })
      }
      this.setState({
        dragPercent: dragPercent,
      })
    }
  }

  get activePercent() {
    if (this.context.data.sidebarActive) return 1
    return this.state.dragging ? this.state.dragPercent : 0
  }

  render() {
    return (
      <PageContextConsumer>
        {({ data: pageData, set: setPageData }) => (
          <>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "#000",
                opacity: 0.6 * this.activePercent,
                transition: this.state.dragging ? "none" : "opacity 0.3s",
                pointerEvents: pageData.sidebarActive ? "all" : "none",
                outline: "none",
              }}
              tabIndex="-1"
              role="button"
              onMouseDown={e => {
                if (e.button === 0) this.closeSidebar()
              }}
            >
              <></>
            </div>
            <div
              style={{
                width: 300,
                height: "100vh",
                position: "fixed",
                left: -300,
                top: 0,
                background: "#202020",
                boxShadow: `2px 0 6px rgba(0, 0, 0, ${
                  0.5 * this.activePercent
                })`,
                transform: `translate(${this.activePercent * 100}%, 0)`,
                transition: this.state.dragging
                  ? "none"
                  : "transform 0.3s, box-shadow 0.3s",
                display: "grid",
                gridTemplateRows: "auto 1fr",
                overflowY: "hidden",
              }}
            >
              <div
                className="sidebar__header themed--back-sec"
                style={{
                  borderTopWidth: 4,
                  borderTopStyle: "solid",
                  padding: "0.5rem 1rem",
                  boxSizing: "border-box",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  transition: "background 0.2s, border-top-color 0.2s",
                }}
              >
                <ShellAnubis
                  style={{
                    color: "white",
                    height: "3rem",
                    width: "auto",
                    margin: 0,
                    userSelect: "none",
                  }}
                />
                <button
                  className="menu__button--close --no-focus themed--back-pri"
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
                    transition: "background 0.2s",
                  }}
                  tabIndex={pageData.sidebarActive ? "0" : "-1"}
                  onClick={this.closeSidebar}
                >
                  <span
                    className="material-icons themed--color-sec"
                    style={{
                      transition: "color 0.2s",
                    }}
                  >
                    close
                  </span>
                </button>
              </div>
              <div
                style={{
                  borderTop: "4px solid #505050",
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
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
                    {this.props.pages.map((page, index) => (
                      <li
                        key={index}
                        style={{
                          display: "block",
                          margin: 0,
                          listStyle: "none",
                        }}
                      >
                        <Link
                          className="nav__link --no-focus themed--color-pri"
                          to={page.path}
                          title={`Go to ${page.title.toLowerCase()} page`}
                          style={{
                            display: "block",
                            padding: "1rem",
                            boxSizing: "border-box",
                            fontFamily: "open sans",
                            fontWeight: "bold",
                            borderBottom: "2px solid #202020",
                            background: "#404040",
                            textDecoration: "none",
                            userSelect: "none",
                            outline: "none",
                          }}
                          tabIndex={pageData.sidebarActive ? "0" : "-1"}
                          onClick={this.closeSidebar}
                        >
                          <span
                            style={{
                              color: "#f2f2f2",
                            }}
                          >
                            {page.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <ul
                  style={{
                    margin: 0,
                    padding: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                  }}
                >
                  <li
                    style={{
                      display: "block",
                      margin: 0,
                      listStyle: "none",
                    }}
                  >
                    <button
                      className="theme__button --no-focus"
                      title="Change theme"
                      style={{
                        position: "relative",
                        display: "block",
                        width: "100%",
                        padding: "1rem",
                        boxSizing: "border-box",
                        fontFamily: "open sans",
                        fontWeight: "bold",
                        background: "#404040",
                        userSelect: "none",
                        outline: "none",
                        border: "none",
                        borderTop: "2px solid #202020",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                      tabIndex={pageData.sidebarActive ? "0" : "-1"}
                      onClick={switchTheme}
                    >
                      <span
                        style={{
                          color: "#f2f2f2",
                        }}
                      >
                        Theme
                      </span>
                      <div
                        className="button__focus"
                        style={{
                          position: "absolute",
                          right: "calc(1rem - 4px)",
                          top: "50%",
                          transform: "translate(0, -50%)",
                          padding: 4,
                          borderRadius: 4,
                        }}
                      >
                        <div
                          className="theme__button__box themed--back-pri"
                          style={{
                            width: 70,
                            height: 35,
                            padding: "5px 17.5px",
                            boxSizing: "border-box",
                            borderRadius: 17.5,
                            transition: "background 0.2s",
                          }}
                        ></div>
                      </div>
                    </button>
                  </li>
                  <li
                    style={{
                      display: "block",
                      margin: 0,
                      listStyle: "none",
                    }}
                  >
                    <button
                      className="dark__button --no-focus"
                      title="Toggle dark mode"
                      style={{
                        position: "relative",
                        display: "block",
                        width: "100%",
                        padding: "1rem",
                        boxSizing: "border-box",
                        fontFamily: "open sans",
                        fontWeight: "bold",
                        background: "#404040",
                        userSelect: "none",
                        outline: "none",
                        border: "none",
                        borderTop: "2px solid #202020",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                      tabIndex={pageData.sidebarActive ? "0" : "-1"}
                      onClick={toggleDark}
                    >
                      <span
                        style={{
                          color: "#f2f2f2",
                        }}
                      >
                        Dark Mode
                      </span>
                      <div
                        className="button__focus"
                        style={{
                          position: "absolute",
                          right: "calc(1rem - 4px)",
                          top: "50%",
                          transform: "translate(0, -50%)",
                          padding: 4,
                          borderRadius: 4,
                        }}
                      >
                        <div
                          className="dark__button__box"
                          style={{
                            width: 70,
                            height: 35,
                            padding: "5px 17.5px",
                            boxSizing: "border-box",
                            borderRadius: 17.5,
                            transition: "background 0.2s",
                          }}
                        >
                          <div
                            style={{
                              position: "relative",
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <span
                              className="material-icons dark__button__moon"
                              style={{
                                marginLeft: -12,
                                transform: "rotateZ(40deg)",
                                transition: "opacity 0.2s",
                              }}
                            >
                              brightness_2
                            </span>
                            <span
                              className="material-icons dark__button__sun"
                              style={{
                                marginRight: -12,
                                transition: "opacity 0.2s",
                              }}
                            >
                              wb_sunny
                            </span>
                            <div
                              className="dark__button__ball"
                              style={{
                                position: "absolute",
                                top: "50%",
                                transform: "translate(-50%, -50%)",
                                width: 25,
                                height: 25,
                                borderRadius: "50%",
                                transition: "left 0.2s",
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: 30,
                height: "100%",
                pointerEvents: pageData.blockView ? "none" : "all",
                outline: "none",
              }}
              tabIndex="-1"
              role="button"
              onMouseDown={this.startDrag}
            >
              <></>
            </div>
          </>
        )}
      </PageContextConsumer>
    )
  }
}

Sidebar.contextType = PageContext

Sidebar.propTypes = {
  pages: PropTypes.array.isRequired,
}

export default Sidebar
