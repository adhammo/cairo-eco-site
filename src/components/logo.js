import React from "react"
import { Link } from "gatsby"

import logo from "../images/shell-logo.svg"

import "../styles/components/logo.css"

const Logo = () => (
  <Link
    className="logo"
    to="/"
    title={`Go to home page`}
    style={{
      textDecoration: "none",
      userSelect: "none",
      display: "flex",
      alignItems: "center",
    }}
  >
    <img
      src={logo}
      alt="Cairo university eco-racing team logo"
      style={{
        height: "3rem",
        margin: 0,
      }}
      draggable="false"
    />
    <h1
      className="logo-text"
      style={{
        padding: "0 0.5rem",
        color: "#5599ff",
        textTransform: "uppercase",
        fontFamily: "quicksand",
        fontWeight: "bold",
        fontSize: "1.6rem",
      }}
    >
      Cairo University
      <br />
      Eco Team
    </h1>
  </Link>
)

export default Logo
