const proxy = require('http-proxy-middleware')

module.exports = {
  siteMetadata: {
    title: `Office Binge`,
    description: ``,
    author: `@gatsbyjs`,
  },
  // for avoiding CORS while developing Netlify Functions locally
  // read more: https://www.gatsbyjs.org/docs/api-proxy/#advanced-proxying
  developMiddleware: app => {
    app.use(
      '/.netlify/functions/',
      proxy({
        target: 'http://localhost:34567',
        pathRewrite: {
          '/.netlify/functions/': '',
        },
      })
    )
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-material-ui',
      options: {},
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`
      },
    },
    `gatsby-source-local-git`,
    'gatsby-plugin-netlify-identity-widget'
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
