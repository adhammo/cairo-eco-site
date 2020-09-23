import React from "react"

import Logo from "../components/logo"

import "../styles/layouts/message.css"

const Message = ({ children }) => (
  <div
    style={{
      width: "100vw",
      height: "auto",
      minHeight: "100vh",
      background: "#222",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: "600px",
        margin: "1rem",
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: "0 0 10px #0008",
      }}
    >
      <div
        style={{
          width: "100%",
          padding: "1rem",
          boxSizing: "border-box",
          background: "#162d50",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Logo />
      </div>
      <div
        style={{
          padding: "1rem",
          background: "#eee",
        }}
      >
        {children}
      </div>
    </div>
  </div>
)

export default Message
