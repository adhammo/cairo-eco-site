import React, { Component } from "react"

const defaultSidebarContextValue = {
  data: {
    sidebarActive: false,
  },
  set: () => {},
}

const { Provider, Consumer } = React.createContext(defaultSidebarContextValue)

class SidebarContextProvider extends Component {
  constructor() {
    super()

    this.setData = this.setData.bind(this)
    this.state = {
      ...defaultSidebarContextValue,
      set: this.setData,
    }
  }

  setData(newData) {
    if (newData.sidebarActive) {
      document
        .querySelectorAll(
          "a:not(.no-focus), button:not(.no-focus), input:not(.no-focus)"
        )
        .forEach(input => {
          input.tabIndex = -1
        })
    } else {
      document
        .querySelectorAll(
          "a:not(.no-focus), button:not(.no-focus), input:not(.no-focus)"
        )
        .forEach(input => {
          input.tabIndex = 0
        })
    }

    this.setState(state => ({
      data: {
        ...state.data,
        ...newData,
      },
    }))
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}

export { Consumer as SidebarContextConsumer, SidebarContextProvider }
