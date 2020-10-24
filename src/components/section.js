import React from "react"
import Fade from "react-reveal/Fade"
import Img from "gatsby-image"

import "../styles/components/section.css"

const Section = ({ classes, left = true, image, children }) => (
  <article
    className={`section ${classes}`}
    style={{
      width: "100%",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "color 0.2s, border-color 0.2s, background 0.2s",
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
        className="section__container"
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
            className="section__image"
            style={{
              width: "100%",
            }}
          >
            <Img
              title={image.description}
              alt={image.description}
              style={{
                width: "100%",
                borderRadius: 4,
                boxShadow: `0 0 10px rgba(0, 0, 0, 0.2)`,
                userSelect: "none",
              }}
              imgStyle={{
                margin: 0,
              }}
              fluid={image.img}
            />
          </div>
        </Fade>
        <Fade bottom>
          <main
            className="section__text"
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {children}
          </main>
        </Fade>
      </div>
    </div>
  </article>
)

export default Section
