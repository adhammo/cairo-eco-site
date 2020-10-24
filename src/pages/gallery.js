import PropTypes from "prop-types"
import React, { Component } from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import { PageContext } from "../components/contexts/page-context"

import { images, categories } from "../content/gallery"

import "../styles/pages/gallery.css"

const HoverImage = ({ image, openPreview }) => (
  <button
    className={`hover ${
      images[image.category][image.id].column +
        images[image.category][image.id].width ===
      4
        ? "hover--vert "
        : ""
    }--no-focus`}
    style={{
      gridRow: `${images[image.category][image.id].row} / span ${
        images[image.category][image.id].height
      }`,
      gridColumn: `${images[image.category][image.id].column} / span ${
        images[image.category][image.id].width
      }`,
      justifyItems: "stretch",
      gridTemplateRows: "1fr auto",
      borderRadius: "4px",
      overflow: "hidden",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
      cursor: "pointer",
      padding: 0,
      border: "none",
      outline: "none",
      background: "transparent",
    }}
    tabIndex="-1"
    onClick={() => openPreview(image)}
  >
    <Img
      title={images[image.category][image.id].description}
      alt={images[image.category][image.id].description}
      fluid={image.fluid}
      style={{
        width: "100%",
        height: "100%",
        userSelect: "none",
      }}
      imgStyle={{
        margin: 0,
        objectFit: "cover",
      }}
    />
    <p
      className="themed--color themed--back-var"
      style={{
        fontFamily: "open sans",
        fontSize: "0.75rem",
        lineHeight: "1rem",
        padding: "0.5rem",
        margin: 0,
        transition: "background 0.2s, color 0.2s",
      }}
    >
      {images[image.category][image.id].description}
    </p>
  </button>
)

const CategorySection = ({ category, categoryImgs, openPreview }) => (
  <section>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "2rem",
      }}
    >
      <h2
        className="themed--color"
        style={{
          fontFamily: "noto sans",
          opacity: 0.9,
          transition: "color 0.2s",
        }}
      >
        {categories[category].name}
      </h2>
      <p
        className="themed--color"
        style={{
          fontFamily: "open sans",
          opacity: 0.9,
          margin: 0,
          textAlign: "center",
          transition: "color 0.2s",
        }}
      >
        {categories[category].description}
      </p>
    </div>
    <div
      className="category__container"
      style={{
        display: "grid",
        gridAutoRows: "250px",
        gridAutoFlow: "row dense",
        gap: "1rem",
      }}
    >
      {categoryImgs.map((image, index) => (
        <HoverImage key={index} image={image} openPreview={openPreview} />
      ))}
    </div>
  </section>
)

class GalleryPage extends Component {
  constructor() {
    super()

    this.state = {
      previewImage: null,
    }
  }

  openPreview = image => {
    if (this.state.previewImage == null) {
      document.addEventListener("keydown", this.listenForEscape)
      document.addEventListener("backbutton", this.closePreview)
      if (document.activeElement) document.activeElement.blur()
      this.setState({
        previewImage: image,
      })
      this.context.set({
        blockView: true,
      })
    }
  }

  closePreview = () => {
    if (this.state.previewImage != null) {
      document.removeEventListener("keydown", this.listenForEscape)
      document.removeEventListener("backbutton", this.closePreview)
      if (document.activeElement) document.activeElement.blur()
      this.setState({
        previewImage: null,
      })
      this.context.set({
        blockView: false,
      })
    }
  }

  listenForEscape = event => {
    if (event.keyCode === 27) this.closePreview()
  }

  componentWillUnmount() {
    if (this.state.previewImage != null) {
      document.removeEventListener("keydown", this.listenForEscape)
      document.removeEventListener("backbutton", this.closePreview)
    }
  }

  render() {
    return (
      <>
        <div
          style={{
            width: "100vw",
            height: "100vh",
            position: "fixed",
            right: 0,
            top: 0,
            zIndex: 1000,
            background: "rgba(0, 0, 0, 0.8)",
            pointerEvents: this.state.previewImage ? "all" : "none",
            opacity: this.state.previewImage ? 1 : 0,
            transition: "opacity 0.2s",
            outline: "none",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              padding: "1rem",
              boxSizing: "border-box",
            }}
          >
            {this.state.previewImage && (
              <Img
                alt={
                  images[this.state.previewImage.category][
                    this.state.previewImage.id
                  ].description
                }
                fluid={this.state.previewImage.fluid}
                style={{
                  width: "100%",
                  height: "100%",
                  userSelect: "none",
                }}
                imgStyle={{
                  margin: 0,
                  objectFit: "contain",
                }}
              />
            )}
          </div>
          <button
            className="preview__button--close --no-focus"
            style={{
              position: "absolute",
              right: "0.5rem",
              top: "0.5rem",
              width: 24,
              height: 24,
              padding: 5,
              boxSizing: "content-box",
              borderRadius: "50%",
              background: "#f2f2f2",
              border: "none",
              cursor: "pointer",
              userSelect: "none",
              overflow: "hidden",
              outline: "none",
            }}
            tabIndex={this.state.previewImage ? "0" : "-1"}
            onClick={this.closePreview}
          >
            <span className="material-icons">close</span>
          </button>
        </div>
        <section
          className="themed--back"
          style={{
            width: "100%",
            minHeight: "100%",
            padding: "2rem 1rem",
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "center",
            transition: "background 0.2s",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 1024,
            }}
          >
            {Object.entries(this.props.categories).map(
              ([category, categoryImgs], index) => (
                <div className="category__section" key={index}>
                  <CategorySection
                    category={category}
                    categoryImgs={categoryImgs}
                    openPreview={this.openPreview}
                  />
                </div>
              )
            )}
          </div>
        </section>
      </>
    )
  }
}

GalleryPage.contextType = PageContext

GalleryPage.propTypes = {
  categories: PropTypes.object.isRequired,
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        galleryImgs: allFile(
          filter: {
            sourceInstanceName: { eq: "resources" }
            relativeDirectory: { glob: "gallery/*" }
          }
        ) {
          nodes {
            name
            relativeDirectory
            childImageSharp {
              fluid(maxWidth: 1024) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    `}
    render={data => (
      <GalleryPage
        {...props}
        categories={data.galleryImgs.nodes.reduce((categories, node) => {
          const category = node.relativeDirectory.match(/gallery\/(.*)/)[1]
          if (!categories[category]) categories[category] = []
          categories[category].push({
            id: node.name,
            category: category,
            fixed: node.childImageSharp.fixed,
            fluid: node.childImageSharp.fluid,
          })
          return categories
        }, {})}
      />
    )}
  />
)