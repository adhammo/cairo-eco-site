import React from "react"
import Fade from "react-reveal/Fade"
import Img from "gatsby-image"

import "../styles/components/section.css"

const Section = ({ backgroundColor, left = true, image, children }) => (
  <section
    className="section"
    style={{
      width: "100%",
      padding: "2rem",
      boxSizing: "border-box",
      background: backgroundColor,
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div
      style={{
        maxWidth: 1024,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="section-container"
        style={{
          width: "100%",
          display: "grid",
          alignItems: "center",
          justifyItems: "center",
          gap: "2rem",
        }}
      >
        <Fade left={left} right={!left} cascade>
          <div
            className="section-image"
            style={{
              width: "100%",
            }}
          >
            <Img
              alt={image.alt}
              style={{
                width: "100%",
                borderRadius: "4px",
                boxShadow: "0 0 10px #0003",
                userSelect: "none",
              }}
              imgStyle={{
                margin: 0,
              }}
              fluid={image.fluid}
            />
          </div>
        </Fade>
        <Fade bottom>
          <div
            className="section-text"
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {children}
          </div>
        </Fade>
      </div>
    </div>
  </section>
)

export default Section
