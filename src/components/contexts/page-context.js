import React, { Component } from "react"

const defaultPageContextValue = {
  data: {
    blockView: false,
    sidebarActive: false,
  },
  set: () => {},
}

const Context = React.createContext(defaultPageContextValue)
const Provider = Context.Provider
const Consumer = Context.Consumer

class PageContextProvider extends Component {
  constructor() {
    super()

    this.setData = this.setData.bind(this)
    this.state = {
      ...defaultPageContextValue,
      set: this.setData,
    }
  }

  setData(newData) {
    if (newData.blockView != null) {
      const body = document.querySelector("#body")
      const bodyContainer = body.parentElement
      if (newData.blockView) {
        const top = window.pageYOffset
        bodyContainer.style.position = "fixed"
        bodyContainer.style.top = 0
        bodyContainer.style.bottom = 0
        bodyContainer.style.overflowY = "hidden"
        body.style.position = "absolute"
        body.style.left = 0
        body.style.top = `-${top}px`
      } else {
        const top = -body.offsetTop
        bodyContainer.style.position = "relative"
        bodyContainer.style.top = null
        bodyContainer.style.bottom = null
        bodyContainer.style.overflowY = "auto"
        body.style.position = "relative"
        body.style.left = null
        body.style.top = null
        window.scrollTo(0, top)
      }
    }

    this.setState(
      state => ({
        data: {
          ...state.data,
          ...newData,
        },
      }),
      () => {
        if (this.state.data.blockView) {
          document
            .querySelectorAll(
              "a:not(.--no-focus), button:not(.--no-focus), input:not(.--no-focus), iframe:not(.--no-focus)"
            )
            .forEach(input => {
              input.tabIndex = -1
            })
        } else {
          document
            .querySelectorAll(
              "a:not(.--no-focus), button:not(.--no-focus), input:not(.--no-focus), iframe:not(.--no-focus)"
            )
            .forEach(input => {
              input.tabIndex = 0
            })
        }
      }
    )
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}

export {
  Context as PageContext,
  Consumer as PageContextConsumer,
  PageContextProvider,
}
