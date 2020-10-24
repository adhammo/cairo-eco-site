import React from "react"

import Logo from "../components/logo"

const Message = ({ children }) => (
  <div
    id="body"
    style={{
      width: "100%",
      height: "auto",
      minHeight: "100vh",
      background: "#202020",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: 600,
        margin: "1rem",
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: `0 0 10px rgba(0, 0, 0, 0.5)`,
      }}
    >
      <div
        className="themed--back-sec"
        style={{
          width: "100%",
          padding: "1rem",
          boxSizing: "border-box",
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
          background: "#eeeeee",
        }}
      >
        {children}
      </div>
    </div>
  </div>
)

export default Message
