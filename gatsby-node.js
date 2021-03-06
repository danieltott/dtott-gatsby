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
        allMdx {
          edges {
            node {
              exports {
                meta {
                  slug
                }
                tags
              }
              id
            }
          }
        }
        allThreadsJson {
          nodes {
            link
            _id
          }
        }
      }
    `).then((result) => {
      const tags = []

      result.data.allMdx.edges.forEach(({ node }) => {
        if (node.exports.tags) {
          node.exports.tags.forEach((tag) => {
            if (tags.indexOf(tag) === -1) {
              tags.push(tag)
            }
          })
        }

        const thread = result.data.allThreadsJson.nodes.find(
          (thread) => thread.link === node.exports.meta.slug
        )

        createPage({
          path: '/' + node.exports.meta.slug,
          component: node.exports.meta.component
            ? path.resolve(node.exports.meta.component)
            : path.resolve(`./src/components/ThoughtsEntry2.js`),
          context: {
            slug: node.exports.meta.slug,
            threadID: thread ? thread._id : null,
          },
        })
      })

      tags.forEach((tag) => {
        createPage({
          path: '/tags/' + tag,
          component: path.resolve('./src/components/ViewTag.js'),
          context: {
            tag,
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
