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
