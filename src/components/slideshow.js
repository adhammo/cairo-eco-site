import React, { Component } from "react"
import PropTypes from "prop-types"
import { Swipeable } from "react-swipeable"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import "../styles/components/slideshow.css"

class SlideShow extends Component {
  constructor(props) {
    super()

    this.setActive = this.setActive.bind(this)
    this.state = {
      activeIndex: 0,
    }

    this.updateTimeout = null
    this.menuButtons = []
    for (let i = 0; i < props.images.length; i++) {
      this.menuButtons[i] = React.createRef()
    }
  }

  componentDidMount() {
    this.updateTimeout = setTimeout(this.goRight, 10000)
  }

  componentWillUnmount() {
    if (this.updateTimeout) {
      clearTimeout(this.updateTimeout)
      this.updateTimeout = null
    }
  }

  componentDidUpdate() {
    if (this.updateTimeout) clearTimeout(this.updateTimeout)
    this.updateTimeout = setTimeout(this.goRight, 10000)
  }

  setActive(index) {
    if (
      index >= 0 &&
      index <= this.props.images.length - 1 &&
      this.state.activeIndex !== index
    ) {
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
      this.setActive(this.props.images.length - 1)
    }
  }

  goRight = () => {
    if (this.state.activeIndex < this.props.images.length - 1) {
      this.setActive(this.state.activeIndex + 1)
    } else {
      this.setActive(0)
    }
  }

  render() {
    return (
      <div
        style={{
          minHeight: 300,
          padding: "0 0.5rem 1rem",
          boxSizing: "border-box",
          background: "#162d50",
        }}
      >
        <div
          style={{
            maxWidth: 1024,
            margin: "0 auto",
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 0 10px #0003",
            outline: "none",
          }}
          role="button"
          tabIndex="-1"
          onTouchStart={() => {
            if (this.updateTimeout) {
              clearTimeout(this.updateTimeout)
              this.updateTimeout = null
            }
          }}
          onTouchEnd={() => {
            if (!this.updateTimeout)
              this.updateTimeout = setTimeout(this.goRight, 10000)
          }}
          onMouseDown={() => {
            if (this.updateTimeout) {
              clearTimeout(this.updateTimeout)
              this.updateTimeout = null
            }
          }}
          onMouseUp={() => {
            if (!this.updateTimeout)
              this.updateTimeout = setTimeout(this.goRight, 10000)
          }}
        >
          <Swipeable
            onSwipedLeft={this.goRight}
            onSwipedRight={this.goLeft}
            trackMouse={true}
            preventDefaultTouchmoveEvent={true}
          >
            <div
              style={{
                width: `${100 * this.props.images.length}%`,
                display: "flex",
                alignItems: "stretch",
                transform: `translate(-${
                  (100 / this.props.images.length) * this.state.activeIndex
                }%, 0)`,
                transition: "transform 0.6s",
                userSelect: "none",
              }}
            >
              {this.props.images.map((image, index) => (
                <div
                  key={index}
                  style={{ width: "100%", order: image.index }}
                  title={image.name}
                >
                  <Img
                    alt={image.name}
                    style={{
                      width: "100%",
                      minHeight: 300,
                    }}
                    imgStyle={{
                      margin: 0,
                      transform:
                        this.state.activeIndex === image.index - 1
                          ? "scale(1, 1)"
                          : "scale(1.1, 1.1)",
                      filter:
                        this.state.activeIndex === image.index - 1
                          ? "grayscale(0%)"
                          : "grayscale(100%)",
                      transition: "transform 0.3s, filter 0.3s",
                      pointerEvents: "none",
                    }}
                    fluid={image.fluid}
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
          {this.props.images.map((image, index) => (
            <button
              className={`images-nav-button no-focus${
                this.state.activeIndex === image.index - 1 ? " active" : ""
              }`}
              key={index}
              ref={this.menuButtons[image.index - 1]}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor:
                  this.state.activeIndex === image.index - 1
                    ? "default"
                    : "pointer",
                outline: "none",
                order: image.index,
              }}
              tabIndex="-1"
              onClick={this.go(image.index - 1)}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  margin: 5,
                  borderRadius: 10,
                }}
              ></div>
            </button>
          ))}
        </div>
      </div>
    )
  }
}

SlideShow.propTypes = {
  images: PropTypes.array.isRequired,
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allFile(
          filter: {
            sourceInstanceName: { eq: "images" }
            relativeDirectory: { eq: "slides" }
          }
        ) {
          edges {
            node {
              id
              name
              childImageSharp {
                fluid(maxWidth: 1024, quality: 100) {
                  ...GatsbyImageSharpFluid
                  ...GatsbyImageSharpFluidLimitPresentationSize
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <SlideShow
        {...props}
        images={data.allFile.edges.map(edge => ({
          id: edge.node.id,
          index: edge.node.name.split(". ")[0],
          name: edge.node.name.split(". ")[1],
          fluid: edge.node.childImageSharp.fluid,
        }))}
      />
    )}
  />
)
