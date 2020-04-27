import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from './Layout'
import { MDXRenderer } from 'gatsby-plugin-mdx'

export default function PageTemplate({ data, pageContext: { tag } }) {
  return (
    <Layout section="home">
      <Helmet
        title={`Entries tagged with ${tag}`}
        description={`View all ${data.allMdx.edges.length} entries tagged with ${tag}`}
      />
      <h1 className="section-title">
        <span className="page-section-wrap">
          Entries tagged with <code>{tag}</code>
        </span>
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
export const pageQuery = graphql`
  query TagPostQuery($tag: [String]) {
    allMdx(
      sort: { fields: exports___meta___date, order: DESC }
      filter: { exports: { tags: { in: $tag } } }
    ) {
      edges {
        node {
          ...blogListing
        }
      }
    }
  }
`
