import React from "react"
import { Link } from "gatsby"

import ShellLogo from "../images/shell-logo.js"

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
    <ShellLogo
      style={{
        height: "3rem",
        width: "auto",
        margin: 0,
      }}
    />
    <h1
      className="logo__text themed--color-pri"
      style={{
        textTransform: "uppercase",
        fontFamily: "quicksand",
        fontWeight: "bold",
        fontSize: "1.6rem",
        transition: "color 0.2s",
      }}
    >
      Cairo University
      <br />
      Eco-Racing Team
    </h1>
  </Link>
)

export default Logo
