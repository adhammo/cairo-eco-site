import React from "react"

const NotFoundPage = () => (
  <>
    <h3
      style={{
        color: "#ff2a2a",
        opacity: 0.6,
        fontWeight: "normal",
        margin: 0,
      }}
    >
      404
    </h3>
    <h2
      style={{
        color: "#ff2a2a",
        margin: "0 0 1rem",
      }}
    >
      Not Found
    </h2>
    <p
      style={{
        margin: 0,
        fontFamily: "open sans",
        opacity: 0.8,
      }}
    >
      Oops! No resource was found on this page.
    </p>
  </>
)

export default NotFoundPage
