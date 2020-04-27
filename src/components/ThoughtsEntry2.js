import React, { createContext, useContext } from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Helmet from 'react-helmet'
import Layout from './Layout'

export const PostContext = createContext()

export const usePostIsFull = () => {
  const postIsFull = useContext(PostContext)
  return postIsFull
}

export default function PageTemplate(props) {
  const {
    data: {
      mdx: {
        exports: { meta },
        body,
        excerpt,
      },
    },
  } = props

  return (
    <PostContext.Provider value={true}>
      <Layout section="thoughts">
        <Helmet>
          <title>{meta.title}</title>
          <meta name="description" content={meta.desc || excerpt} />
        </Helmet>

        <h2 className="section-title">
          <span className="page-section-wrap">Thoughts</span>
        </h2>

        <MDXRenderer data={props.data.mdx}>{body}</MDXRenderer>
      </Layout>
    </PostContext.Provider>
  )
}
export const pageQuery = graphql`
  query BlogPostQuery($slug: String) {
    mdx(exports: { meta: { slug: { eq: $slug } } }) {
      mdxAST
      exports {
        tags
        meta {
          title
          relativeDate: date(fromNow: true)
          isoDate: date(formatString: "YYYY-MM-DDTHH:mm:ssZ")
          date
          slug
          desc
        }
      }
      body
      excerpt
    }
  }
`
