import React from "react"
import Swing from "react-reveal/Swing"

import { socialMedia } from "../config"
import { socialLogos } from "../static"

import "../styles/components/footer.css"

const Footer = () => (
  <footer>
    <div
      style={{
        padding: "1rem 0.5rem",
        boxSizing: "border-box",
        background: "#222",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ul
        style={{
          margin: 0,
          padding: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        {(() =>
          socialMedia.map((media, index) => (
            <Swing key={index}>
              <li className="social-link">
                <a
                  href={media.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    width: 32,
                    height: 32,
                    textDecoration: "none",
                    userSelect: "none",
                  }}
                >
                  <img
                    className="social-icon"
                    title={`${media.name} page`}
                    src={socialLogos[media.logo]}
                    alt={`${media.name} page`}
                    style={{
                      display: "block",
                      width: 32,
                      height: 32,
                      margin: 0,
                    }}
                    draggable="false"
                  />
                </a>
              </li>
            </Swing>
          )))()}
      </ul>
    </div>
    <div
      style={{
        padding: "0.5rem 0.5rem",
        boxSizing: "border-box",
        background: "#111",
      }}
    >
      <div
        style={{
          maxWidth: 1024,
          margin: "0 auto",
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          className="copyright"
          style={{
            margin: 0,
            fontFamily: "open sans",
            fontSize: "0.8rem",
            color: "#fff",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            className="copyright-tag"
            style={{
              opacity: 0.7,
              userSelect: "none",
            }}
          >
            &#169; 2020 Copyright,
          </span>
          <span style={{ fontWeight: "bold" }}>
            Cairo University Eco-Racing Team
          </span>
        </p>
      </div>
    </div>
  </footer>
)

export default Footer
