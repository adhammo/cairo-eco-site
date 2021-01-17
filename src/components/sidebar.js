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
    }

    this.sidebar = React.createRef(null)
    this.sidebarBack = React.createRef(null)
  }

  componentWillUnmount() {
    if (this.state.dragging) {
      document.removeEventListener("mouseup", this.stopDrag)
      document.removeEventListener("mousemove", this.drag)
      document.removeEventListener("touchend", this.stopDragTouch)
      document.removeEventListener("touchmove", this.dragTouch)
      if (this.context.data.blockView) {
        this.context.set({
          blockView: false,
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

  applyDrag = () => {
    this.sidebarBack.current.style.opacity = 0.6 * this.dragPercent
    this.sidebar.current.style.boxShadow = `-2px 0 6px rgba(0, 0, 0, ${
      0.5 * this.dragPercent
    })`
    this.sidebar.current.style.transform = `translate(-${
      100 * this.dragPercent
    }%, 0%)`
  }

  startDrag = x => {
    this.dragStart = x
    this.dragPos = x
    this.dragPercent = 0
    this.dragDelta = 0
    this.setState({
      dragging: true,
    }, this.applyDrag)
  }

  stopDrag = () => {
    this.setState({
      dragging: false,
    })
    if (this.dragPercent >= 0.5 || this.dragDelta >= 10) {
      this.context.set({
        sidebarActive: true,
        blockView: true,
      })
    }
  }

  drag = x => {
    this.dragDelta = this.dragPos - x
    this.dragPos = x
    this.dragPercent = Math.min(
      Math.max((this.dragStart - this.dragPos) / 300, 0),
      1
    )
    this.applyDrag()
  }

  startMouse = e => {
    if (this.state.dragging) return

    if (document.activeElement) document.activeElement.blur()
    e.preventDefault()
    document.addEventListener("mouseup", this.stopMouse)
    document.addEventListener("mousemove", this.mouseDrag)
    this.startDrag(e.screenX)
  }

  stopMouse = e => {
    if (!this.state.dragging) return

    e.preventDefault()
    document.removeEventListener("mouseup", this.stopMouse)
    document.removeEventListener("mousemove", this.mouseDrag)
    this.stopDrag()
  }

  mouseDrag = e => {
    if (!this.state.dragging) return

    e.preventDefault()
    this.drag(e.screenX)
  }

  startTouch = e => {
    if (this.state.dragging) return

    if (document.activeElement) document.activeElement.blur()
    document.addEventListener("touchend", this.stopTouch)
    document.addEventListener("touchmove", this.touchDrag)
    this.startDrag(e.touches[0].screenX)
  }

  stopTouch = e => {
    if (!this.state.dragging || e.touches.length !== 0) return

    document.removeEventListener("touchend", this.stopDragTouch)
    document.removeEventListener("touchmove", this.dragTouch)
    this.stopDrag()
  }

  touchDrag = e => {
    if (!this.state.dragging) return

    this.drag(e.touches[0].screenX)
  }

  render() {
    return (
      <PageContextConsumer>
        {({ data: pageData }) => (
          <>
            <div
              ref={this.sidebarBack}
              style={(() => {
                let style = {
                  position: "fixed",
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "#000",
                  transition: this.state.dragging ? "none" : "opacity 0.3s",
                  pointerEvents: pageData.sidebarActive ? "all" : "none",
                  outline: "none",
                }
                if (!this.state.dragging)
                  style.opacity = pageData.sidebarActive ? 0.6 : 0
                return style
              })()}
              tabIndex="-1"
              role="button"
              onClick={this.closeSidebar}
              onKeyDown={() => {}}
            >
              <></>
            </div>
            <div
              ref={this.sidebar}
              style={(() => {
                let style = {
                  width: 300,
                  position: "fixed",
                  top: 0,
                  bottom: 0,
                  right: -300,
                  background: "#202020",
                  transition: this.state.dragging
                    ? "none"
                    : "transform 0.3s, box-shadow 0.3s",
                  display: "grid",
                  gridTemplateRows: "auto 1fr",
                  overflowY: "hidden",
                }
                if (!this.state.dragging) {
                  style.boxShadow = `-2px 0 6px rgba(0, 0, 0, ${
                    pageData.sidebarActive ? 0.5 : 0
                  })`
                  style.transform = `translate(-${
                    pageData.sidebarActive ? 100 : 0
                  }%, 0%)`
                }
                return style
              })()}
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
                position: "fixed",
                top: 0,
                bottom: 0,
                right: 0,
                width: 15,
                pointerEvents: pageData.blockView ? "none" : "all",
                outline: "none",
              }}
              tabIndex="-1"
              role="button"
              onMouseDown={this.startMouse}
              onTouchStart={this.startTouch}
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
