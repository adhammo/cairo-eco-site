const style = require("./src/style")

exports.onClientEntry = () => {
  style.init()
}

exports.shouldUpdateScroll = () => {
  document.querySelector("#body").scrollIntoView()
  return false
}
