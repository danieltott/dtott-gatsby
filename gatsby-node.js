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
        allMdx {
          edges {
            node {
              exports {
                meta {
                  slug
                }
              }
              id
            }
          }
        }
      }
    `).then((result) => {
      result.data.allMdx.edges.forEach(({ node }) => {
        createPage({
          path: '/' + node.exports.meta.slug,
          component: path.resolve(`./src/components/ThoughtsEntry2.js`),
          context: {
            slug: node.exports.meta.slug,
          },
        })
      })

      // result.data.craft.entries.forEach((entry) => {
      //   createPage({
      //     path: '/' + entry.uri,
      //     component: path.resolve(`./src/components/ThoughtsEntry.js`),
      //     context: {
      //       // Data passed to context is available
      //       // in page queries as GraphQL variables.
      //       id: entry.id,
      //     },
      //   })
      // })
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

// const { createFilePath } = require("gatsby-source-filesystem")
// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions
//   // you only want to operate on `Mdx` nodes. If you had content from a
//   // remote CMS you could also check to see if the parent node was a
//   // `File` node here
//   if (node.internal.type === "Mdx") {
//     const value = createFilePath({ node, getNode })
//     createNodeField({
//       // Name of the field you are adding
//       name: "slug",
//       // Individual MDX node
//       node,
//       // Generated value based on filepath with "blog" prefix. you
//       // don't need a separating "/" before the value because
//       // createFilePath returns a path with the leading "/".
//       value: `/blog${value}`,
//     })
//   }
// }
