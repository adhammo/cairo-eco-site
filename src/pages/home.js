import React from "react"
import Fade from "react-reveal/Fade"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import SlideShow from "../components/slideshow"
import Section from "../components/section"

import "../styles/pages/home.css"

const HomePage = ({ logos, images }) => (
  <>
    <SlideShow />
    <div
      style={{
        width: "100%",
        padding: "1rem 0.5rem",
        boxSizing: "border-box",
        background: "#eee",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ul
        style={{
          margin: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fade bottom cascade>
          {(() =>
            logos.map((logo, index) => (
              <li
                className="related-logo"
                key={index}
                style={{
                  order: logo.index,
                  margin: 0,
                  listStyle: "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Img
                    title={`${logo.name} logo`}
                    alt={`${logo.name} logo`}
                    fixed={logo.fixed}
                    style={{
                      userSelect: "none",
                    }}
                    imgStyle={{
                      margin: 0,
                      filter: "grayscale(100%) contrast(100%)",
                    }}
                  />
                  <h3
                    className="related-logo-text"
                    style={{
                      color: "#444",
                      fontFamily: "open sans",
                      fontWeight: "bold",
                      margin: "0 0 0 1rem",
                    }}
                  >
                    {logo.name.split(" ")[0]}
                    <br />
                    {logo.name.split(" ")[1]}
                  </h3>
                </div>
              </li>
            )))()}
        </Fade>
      </ul>
    </div>
    <Section
      backgroundColor="#fafafa"
      image={{ alt: "Our team", fluid: images["shellTeam"].fluid }}
    >
      <h2
        style={{
          margin: "0 0 2rem",
          fontFamily: "noto sans",
          fontWeight: "bold",
          fontSize: "2rem",
        }}
      >
        Who are we?
      </h2>
      <p
        style={{
          margin: "0 0 1rem",
          fontFamily: "open sans",
          opacity: 0.7,
        }}
      >
        We are the{" "}
        <strong>
          1<sup>st</sup>
        </strong>{" "}
        team from{" "}
        <abbr title="Cairo University, Faculty of Engineering">
          Cairo university
        </abbr>{" "}
        to compete in <strong>Shell Eco-marathon</strong> competition.
      </p>
      <p style={{ margin: 0, fontFamily: "open sans", opacity: 0.7 }}>
        We have been participating for 8 years, and now, for the ninth year, we
        are continuing our journey and getting more efficient with three
        vehicles; <strong>electric, gasoline, and autonomous</strong>.
      </p>
    </Section>
    <Section
      left={false}
      backgroundColor="#eee"
      image={{ alt: "Our trophies", fluid: images["shellTrophy"].fluid }}
    >
      <h2
        style={{
          margin: "0 0 2rem",
          fontFamily: "noto sans",
          fontWeight: "bold",
          fontSize: "2rem",
        }}
      >
        Awards
      </h2>
      <p
        style={{
          margin: "0 0 1rem",
          fontFamily: "open sans",
          opacity: 0.7,
        }}
      >
        We won the{" "}
        <abbr title="Run the most impactful and successful integrated communications campaign">
          Communications Award
        </abbr>{" "}
        at the <strong>Shell Eco-marathon - Asia 2015</strong> competition.
      </p>
      <p
        style={{
          margin: "0 0 1rem",
          fontFamily: "open sans",
          opacity: 0.7,
        }}
      >
        We won the{" "}
        <abbr title="Aims to highlight the importance of road and behavioural safety">
          Safety Award
        </abbr>{" "}
        at the <strong>Shell Eco-marathon - Asia 2019</strong> competition.
      </p>
      <p
        style={{
          margin: 0,
          fontFamily: "open sans",
          opacity: 0.7,
        }}
      >
        We got an honorable mention for the{" "}
        <abbr title="Aims to highlight the importance of road and behavioural safety">
          Safety Award
        </abbr>{" "}
        on the off-track virtual ceremony.
      </p>
    </Section>
  </>
)

export default props => (
  <StaticQuery
    query={graphql`
      query {
        logos: allFile(
          filter: {
            sourceInstanceName: { eq: "images" }
            relativeDirectory: { eq: "logos" }
          }
        ) {
          edges {
            node {
              id
              name
              childImageSharp {
                fixed(width: 50) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
        images: allFile(
          filter: {
            sourceInstanceName: { eq: "images" }
            relativeDirectory: { eq: "home" }
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
      <HomePage
        {...props}
        logos={data.logos.edges.map(edge => ({
          id: edge.node.id,
          index: edge.node.name.split(". ")[0],
          name: edge.node.name.split(". ")[1],
          fixed: edge.node.childImageSharp.fixed,
        }))}
        images={data.images.edges.reduce(
          (obj, edge) =>
            Object.assign(obj, {
              [edge.node.name]: {
                id: edge.node.id,
                fluid: edge.node.childImageSharp.fluid,
              },
            }),
          {}
        )}
      />
    )}
  />
)
