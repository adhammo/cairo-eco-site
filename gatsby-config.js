module.exports = {
  siteMetadata: {
    title: `Cairo University Eco-Racing Team`,
    description: `Keep up with the latest news about Cairo university eco-racing team competing in Shell Eco-marathon competition.`,
    author: `@cu-eco-team`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-layout`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Cairo University Eco-Racing Team`,
        short_name: `Cairo University Eco-Team`,
        description: `Keep up with the latest news about Cairo university eco-racing team competing in Shell Eco-marathon competition.`,
        lang: `en`,
        start_url: `/`,
        background_color: `#fafafa`,
        theme_color: `#5599ff`,
        display: `standalone`,
        icon: `src/images/shell-icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          "material icons",
          "quicksand:400,500,600",
          "open sans:300,400,500,700",
          "noto sans:300,400,500,700",
        ],
        display: "swap",
      },
    },
  ],
}
