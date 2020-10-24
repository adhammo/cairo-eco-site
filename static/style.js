const colors = {
  light: "#f2f2f2",
  lightFade: "#f2f2f280",
  dark: "#181818",
  darkFade: "#18181880",
}

const themes = {
  blue: {
    primary: "#2d88ff",
    darkPrimary: "#246dcc",
    secondary: "#162d50",
    lightSecondary: "#214378",
  },
  red: {
    primary: "#ff2e3c",
    darkPrimary: "#cd242f",
    secondary: "#4f1519",
    lightSecondary: "#772025",
  },
  green: {
    primary: "#4AE58D",
    darkPrimary: "#3ab971",
    secondary: "#154F39",
    lightSecondary: "#207756",
  },
}

let dark = false
let theme = "blue"

const createStyle = () => `
  .themed--color {
    color: ${dark ? colors.light : colors.dark};
  }
  .themed--color-inv {
    color: ${dark ? colors.dark : colors.light};
  }
  .themed--color-pri {
    color: ${themes[theme].primary};
  }
  .themed--color-sec {
    color: ${themes[theme].secondary};
  }
  .themed--back {
    background: ${dark ? colors.dark : colors.light};
  }
  .themed--back-var {
    background: ${dark ? "#242424" : "#fff"};
  }
  .themed--back-inv {
    background: ${dark ? colors.light : colors.dark};
  }
  .themed--back-pri {
    background: ${themes[theme].primary};
  }
  .themed--back-sec {
    background: ${themes[theme].secondary};
  }
  .themed--border abbr {
    border-color: ${dark ? colors.lightFade : colors.darkFade};
  }
  .themed--border-inv abbr {
    border-color: ${dark ? colors.darkFade : colors.lightFade};
  }
  .themed--fill-pri {
    fill: ${themes[theme].primary};
  }
  .themed--fill-sec {
    fill: ${themes[theme].secondary};
  }
  
  .sidebar__header {
    border-color: ${themes[theme].lightSecondary};
  }
  .post__main {
    
  }
  .post__see-more {
    border-bottom-color:${dark ? colors.lightFade : colors.darkFade};
  }
  .dark__button__box {
    background: ${dark ? themes[theme].darkPrimary : "#7a7a7a"};
  }
  .dark__button__moon {
    opacity: ${dark ? 0.8 : 0};
  }
  .dark__button__sun {
    opacity: ${dark ? 0 : 0.8};
  }
  .dark__button__ball {
    left: ${dark ? "100%" : "0%"};
  }
`

const savedDark = localStorage.getItem("dark")
if (savedDark != null) dark = true

const savedTheme = localStorage.getItem("theme")
if (savedTheme != null && themes[savedTheme] != null) theme = savedTheme

let style = document.head.appendChild(document.createElement("style"))
style.id = "style"
style.classList.add(`dr:${dark ? "t" : "f"}`)
style.classList.add(`th:${theme}`)
style.appendChild(document.createTextNode(createStyle()))
