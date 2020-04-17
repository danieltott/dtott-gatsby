import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../../components/Layout'
import { MDXRenderer } from 'gatsby-plugin-mdx'

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(sort: { fields: exports___meta___date, order: DESC }) {
        edges {
          node {
            exports {
              meta {
                title
                relativeDate: date(fromNow: true)
                isoDate: date(formatString: "YYYY-MM-DDTHH:mm:ssZ")
                date
                slug
              }
            }
            body
            id
          }
        }
      }
    }
  `)

  return (
    <Layout section="home">
      <Helmet title="Thoughts" />
      <h1 className="section-title">
        <span className="page-section-wrap">Thoughts</span>
      </h1>
      <section className="page-section thoughts">
        <div className="page-section-wrap">
          {data.allMdx.edges.map(({ node }) => {
            return (
              <MDXRenderer key={node.id} data={node}>
                {node.body}
              </MDXRenderer>
            )
          })}
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage
