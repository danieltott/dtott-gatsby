require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

var moment = require('moment')

module.exports = {
  siteMetadata: {
    title: 'Front-End Design and Development ~  Daniel T. Ott',
    description: `Dan Ott's portfolio, information, and thoughts on HTML, CSS, Javascript, and the web development industry in general.`,
    siteUrl: `https://www.dtott.com`,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/danott.png', // This path is relative to the root of the site.
        cache_busting_mode: 'none',
      },
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        workboxConfig: {
          globPatterns: ['**/*'],
        },
      },
    },
    // {
    //   resolve: 'gatsby-source-graphql',
    //   options: {
    //     typeName: 'Craft',
    //     fieldName: 'craft',
    //     // Url to query from
    //     url: process.env.GATSBY_DTOTT_API_URL,
    //     // HTTP headers
    //     headers: {
    //       Authorization: `bearer ${process.env.GATSBY_DTOTT_API_TOKEN}`,
    //       'Content-type': 'application/json',
    //     },
    //     // Additional options to pass to node-fetch
    //     fetchOptions: {},
    //   },
    // },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-6717545-4',
        // Puts tracking script in the head instead of the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: [],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(({ node }) => {
                return {
                  title: node.exports.meta.title,
                  description: node.exports.meta.desc,
                  date: node.exports.meta.date,
                  url: site.siteMetadata.siteUrl + '/' + node.exports.meta.slug,
                  guid:
                    site.siteMetadata.siteUrl + '/' + node.exports.meta.slug,
                }
              })
            },
            query: `
              {
                allMdx(sort: { fields: exports___meta___date, order: DESC }) {
                  edges {
                    node {
                      exports {
                        meta {
                          title
                          date(formatString: "ddd, DD MMM YYYY HH:mm:ss ZZ")
                          slug
                          desc
                        }
                      }
                      id
                    }
                  }
                }
              }
            `,
            output: '/thoughts/feed.rss',
          },
        ],
      },
    },
    `gatsby-plugin-netlify`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'json',
        path: `${__dirname}/content/json`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `thoughts`,
        path: `${__dirname}/src/thoughts/`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
    },
  ],
}
