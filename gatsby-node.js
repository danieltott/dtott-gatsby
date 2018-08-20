const path = require('path')
require('isomorphic-fetch')

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(`
      {
        craft {
          entries(section: [thoughts]) {
            ... on Craft_Thoughts {
              id
              postDate
              title
              uri
              slug
            }
          }
        }
      }
    `).then(result => {
      result.data.craft.entries.forEach(entry => {
        createPage({
          path: '/' + entry.uri,
          component: path.resolve(`./src/components/ThoughtsEntry.js`),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            id: entry.id,
          },
        })
      })
      resolve()
    })
  })
}

exports.onCreateWebpackConfig = ({ stage, actions, loaders }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /scroll-to/,
            loader: 'null-loader',
          },
        ],
      },
    })
  }
}
