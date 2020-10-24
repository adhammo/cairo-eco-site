import PropTypes from "prop-types"
import React, { Component } from "react"
import { Swipeable } from "react-swipeable"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import slides from "../content/slides"

import "../styles/components/slideshow.css"

class SlideShow extends Component {
  constructor() {
    super()

    this.state = {
      activeIndex: 0,
      disabled: false,
    }

    this.updateTimeout = null
    this.menuButtons = []
    for (let i = 0; i < slides.length; i++) {
      this.menuButtons[i] = React.createRef()
    }
  }

  componentDidMount() {
    this.updateTimeout = setTimeout(this.timer, 10000)
  }

  componentWillUnmount() {
    if (this.state.disabled) {
      document.removeEventListener("touchend", this.enable)
      document.removeEventListener("mouseup", this.enable)
    } else {
      if (this.updateTimeout) clearTimeout(this.updateTimeout)
    }
  }

  setActive(index) {
    if (
      index >= 0 &&
      index <= slides.length - 1 &&
      this.state.activeIndex !== index
    ) {
      if (!this.state.disabled && this.updateTimeout) {
        clearTimeout(this.updateTimeout)
      }
      this.menuButtons[index].current.blur()
      this.setState({
        activeIndex: index,
      })
    }
  }

  go = index => () => {
    this.setActive(index)
  }

  goLeft = () => {
    if (this.state.activeIndex > 0) {
      this.setActive(this.state.activeIndex - 1)
    } else {
      this.setActive(slides.length - 1)
    }
  }

  goRight = () => {
    if (this.state.activeIndex < slides.length - 1) {
      this.setActive(this.state.activeIndex + 1)
    } else {
      this.setActive(0)
    }
  }

  timer = () => {
    this.goRight()
    if (this.updateTimeout) clearTimeout(this.updateTimeout)
    this.updateTimeout = setTimeout(this.timer, 10000)
  }

  enable = () => {
    if (this.state.disabled) {
      this.updateTimeout = setTimeout(this.timer, 10000)
      document.removeEventListener("touchend", this.enable)
      document.removeEventListener("mouseup", this.enable)
      this.setState({
        disabled: false,
      })
    }
  }

  disable = () => {
    if (!this.state.disabled) {
      if (this.updateTimeout) clearTimeout(this.updateTimeout)
      document.addEventListener("touchend", this.enable)
      document.addEventListener("mouseup", this.enable)
      this.setState({
        disabled: true,
      })
    }
  }

  render() {
    return (
      <section
        className="themed--back-sec"
        style={{
          minHeight: 300,
          padding: "1rem 0.5rem",
          boxSizing: "border-box",
          transition: "background 0.2s",
        }}
      >
        <div
          style={{
            maxWidth: 1024,
            margin: "0 auto",
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: `0 0 10px rgba(0, 0, 0, 0.2)`,
            outline: "none",
          }}
          role="button"
          tabIndex="-1"
          onTouchStart={this.disable}
          onMouseDown={this.disable}
        >
          <Swipeable
            onSwipedLeft={this.goRight}
            onSwipedRight={this.goLeft}
            trackMouse={true}
            preventDefaultTouchmoveEvent={true}
          >
            <div
              style={{
                width: `${100 * slides.length}%`,
                display: "flex",
                alignItems: "stretch",
                transform: `translate(-${
                  (100 / slides.length) * this.state.activeIndex
                }%, 0)`,
                transition: "transform 0.6s",
                userSelect: "none",
              }}
            >
              {slides.map((slide, index) => (
                <div
                  key={index}
                  style={{ width: "100%" }}
                  title={slide.description}
                >
                  <Img
                    alt={slide.description}
                    style={{
                      width: "100%",
                      minHeight: 300,
                    }}
                    imgStyle={{
                      margin: 0,
                      transform:
                        this.state.activeIndex === index
                          ? "scale(1, 1)"
                          : "scale(1.1, 1.1)",
                      filter:
                        this.state.activeIndex === index
                          ? "grayscale(0%)"
                          : "grayscale(100%)",
                      transition: "transform 0.3s, filter 0.3s",
                      pointerEvents: "none",
                    }}
                    fluid={this.props.slideImgs[slide.id]}
                  />
                </div>
              ))}
            </div>
          </Swipeable>
        </div>
        <div
          style={{
            margin: "1rem 0 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {slides.map((image, index) => (
            <button
              className={`image__button${
                this.state.activeIndex === index ? "--active " : " "
              }--no-focus ${
                this.state.activeIndex === index ? " themed--back-pri" : ""
              }`}
              key={index}
              ref={this.menuButtons[index]}
              style={(() => {
                let style = {
                  width: 20,
                  height: 20,
                  margin: 5,
                  borderRadius: 10,
                  border: "none",
                  padding: 0,
                  cursor:
                    this.state.activeIndex === index ? "default" : "pointer",
                  outline: "none",
                  order: index,
                }
                if (this.state.activeIndex !== index)
                  style.background = "#f2f2f2"
                return style
              })()}
              tabIndex="-1"
              onClick={this.go(index)}
            >
              <></>
            </button>
          ))}
        </div>
      </section>
    )
  }
}

SlideShow.propTypes = {
  slideImgs: PropTypes.object.isRequired,
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        slideImgs: allFile(
          filter: {
            sourceInstanceName: { eq: "resources" }
            relativeDirectory: { eq: "slides" }
          }
        ) {
          nodes {
            name
            childImageSharp {
              fluid(maxWidth: 1024) {
                ...GatsbyImageSharpFluid
                ...GatsbyImageSharpFluidLimitPresentationSize
              }
            }
          }
        }
      }
    `}
    render={data => (
      <SlideShow
        {...props}
        slideImgs={data.slideImgs.nodes.reduce(
          (slideImgs, node) => ({
            ...slideImgs,
            [node.name]: node.childImageSharp.fluid,
          }),
          {}
        )}
      />
    )}
  />
)
