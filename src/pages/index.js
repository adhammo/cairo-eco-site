import React from "react"
import Fade from "react-reveal/Fade"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { OutboundLink } from "gatsby-plugin-google-analytics"

import SlideShow from "../components/slideshow"
import Section from "../components/section"

import logos from "../content/logos"

import "../styles/pages/index.css"

const HomePage = ({ logoImgs, homeImgs }) => (
  <>
    <SlideShow />
    <section
      className="relations"
      style={{
        width: "100%",
        padding: "1rem 0.5rem",
        boxSizing: "border-box",
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
                className="relations__logo"
                key={index}
                style={{
                  margin: 0,
                  listStyle: "none",
                }}
              >
                {(() => {
                  const LogoComponent = () => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Img
                        title={`${logo.name.replace("_", " ")} ${
                          logo.website ? "page" : "logo"
                        }`}
                        alt={`${logo.name.replace("_", " ")} ${
                          logo.website ? "page" : "logo"
                        }`}
                        fixed={logoImgs[logo.id]}
                        style={{
                          userSelect: "none",
                        }}
                        imgStyle={{
                          margin: 0,
                        }}
                      />
                      <h3
                        title={`${logo.name.replace("_", " ")} ${
                          logo.website ? "page" : "logo"
                        }`}
                        className="relations__logo__text"
                        style={{
                          color: "#f2f2f2",
                          fontFamily: "open sans",
                          fontWeight: "bold",
                          opacity: 0.9,
                          margin: "0 0 0 1rem",
                        }}
                      >
                        {logo.name.split("_")[0]}
                        <br />
                        {logo.name.split("_")[1]}
                      </h3>
                    </div>
                  )
                  if (logo.website)
                    return (
                      <OutboundLink
                        className="relations__logo__link"
                        title={`${logo.name.replace("_", " ")} page`}
                        href={logo.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          textDecoration: "none",
                        }}
                        eventCategory="Relations"
                        eventAction="Outbound link to relations website"
                        eventLabel={logo.name.replace("_", " ")}
                      >
                        <LogoComponent />
                      </OutboundLink>
                    )
                  else return <LogoComponent />
                })()}
              </li>
            )))()}
        </Fade>
      </ul>
    </section>
    <section
      className="sections themed--back"
      style={{
        transition: "background 0.2s",
      }}
    >
      <Section
        classes="themed--color themed--border"
        image={{ description: "Our team", img: homeImgs["shellTeam"] }}
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
            opacity: 0.9,
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
        <p style={{ margin: 0, fontFamily: "open sans", opacity: 0.9 }}>
          We have been participating for 8 years, and now, for the ninth year,
          we are continuing our journey and getting more efficient with three
          vehicles; <strong>electric, gasoline, and autonomous</strong>.
        </p>
      </Section>
      <Section
        left={false}
        classes="themed--color-inv themed--back-inv themed--border-inv"
        image={{
          description: "Shell Eco-marathon",
          img: homeImgs["shellMarathon"],
        }}
      >
        <h2
          style={{
            margin: "0 0 2rem",
            fontFamily: "noto sans",
            fontWeight: "bold",
            fontSize: "2rem",
          }}
        >
          Shell Eco-Marathon
        </h2>
        <p
          style={{
            margin: "0 0 1rem",
            fontFamily: "open sans",
            opacity: 0.9,
          }}
        >
          It's a global competition that challenges high school and college
          students from several countries.
        </p>
        <p
          style={{
            margin: "0 0 1rem",
            fontFamily: "open sans",
            opacity: 0.9,
          }}
        >
          We compete to{" "}
          <strong>design, build, and test high efficient vehicles</strong> in
          order to achieve the highest possible fuel efficiency.
        </p>
        <p
          style={{
            margin: 0,
            fontFamily: "open sans",
            opacity: 0.9,
          }}
        >
          The Eco-Marathon is mainly divided into two basic categories:{" "}
          <strong>Prototype, and Urban</strong> concept.
        </p>
      </Section>
      <Section
        classes="themed--color themed--border"
        image={{
          description: "Our trophies",
          img: homeImgs["shellTrophy"],
        }}
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
            opacity: 0.9,
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
            opacity: 0.9,
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
            opacity: 0.9,
          }}
        >
          We got an honorable mention for the{" "}
          <abbr title="Aims to highlight the importance of road and behavioural safety">
            Safety Award
          </abbr>{" "}
          on the off-track virtual ceremony.
        </p>
      </Section>
    </section>
  </>
)

export default props => (
  <StaticQuery
    query={graphql`
      query {
        logoImgs: allFile(
          filter: {
            sourceInstanceName: { eq: "resources" }
            relativeDirectory: { eq: "logos" }
          }
        ) {
          nodes {
            name
            childImageSharp {
              fixed(width: 50) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
        homeImgs: allFile(
          filter: {
            sourceInstanceName: { eq: "images" }
            relativeDirectory: { eq: "home" }
          }
        ) {
          nodes {
            name
            childImageSharp {
              fluid(maxWidth: 768) {
                ...GatsbyImageSharpFluid
                ...GatsbyImageSharpFluidLimitPresentationSize
              }
            }
          }
        }
      }
    `}
    render={data => (
      <HomePage
        {...props}
        logoImgs={data.logoImgs.nodes.reduce(
          (logoImgs, node) => ({
            ...logoImgs,
            [node.name]: node.childImageSharp.fixed,
          }),
          {}
        )}
        homeImgs={data.homeImgs.nodes.reduce(
          (homeImgs, node) => ({
            ...homeImgs,
            [node.name]: node.childImageSharp.fluid,
          }),
          {}
        )}
      />
    )}
  />
)
