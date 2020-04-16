require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

var moment = require('moment')

module.exports = {
  siteMetadata: {
    title: 'Front-End Design and Development ~  Daniel T. Ott',
    description: `Daniel T Ott - Front End Design and Developmtn. Dan Ott's portfolio, information, and thoughts on HTML, CSS, Javascript, and the web development industry in general.`,
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
      },
    },
    'gatsby-plugin-offline',
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
    // {
    //   resolve: `gatsby-plugin-feed`,
    //   options: {
    //     query: `
    //       {
    //         site {
    //           siteMetadata {
    //             title
    //             description
    //             siteUrl
    //             site_url: siteUrl
    //           }
    //         }
    //       }
    //     `,
    //     feeds: [
    //       {
    //         serialize: ({ query: { site, craft } }) => {
    //           return craft.entries.map((entry) => {
    //             return {
    //               title: entry.title,
    //               description: entry.summary,
    //               date: moment(entry.postDate * 1000).format(
    //                 'ddd, DD MMM YYYY HH:mm:ss ZZ'
    //               ),
    //               url: site.siteMetadata.siteUrl + '/' + entry.uri,
    //               guid: site.siteMetadata.siteUrl + '/' + entry.uri,
    //             }
    //           })
    //         },
    //         query: `
    //           {
    //             craft {
    //               entries(section: [thoughts]) {
    //                 ... on Craft_Thoughts {
    //                   id
    //                   postDate
    //                   title
    //                   summary
    //                   body
    //                   url
    //                   uri
    //                   tags {
    //                     id
    //                     title
    //                   }
    //                 }
    //               }
    //             }
    //           }
    //         `,
    //         output: '/thoughts/feed.rss',
    //       },
    //     ],
    //   },
    // },
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `thoughts`,
        path: `${__dirname}/src/thoughts/`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: require.resolve('./src/components/mdxLayoutPostSummary.js'),
        },
      },
    },
  ],
}
