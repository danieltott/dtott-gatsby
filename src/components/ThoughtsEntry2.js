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

        <MDXRenderer data={props.data.mdx} comments={props.data.comments.nodes}>
          {body}
        </MDXRenderer>
      </Layout>
    </PostContext.Provider>
  )
}
export const pageQuery = graphql`
  query BlogPostQuery($slug: String, $threadID: String) {
    mdx(exports: { meta: { slug: { eq: $slug } } }) {
      exports {
        tags
        meta {
          title
          relativeDate: date(fromNow: true)
          isoDate: date(formatString: "YYYY-MM-DDTHH:mm:ssZ")
          differenceInDays: date(difference: "days")
          date
          slug
          desc
        }
      }
      body
      excerpt
    }
    comments: allCommentsJson(
      filter: { thread: { _id: { eq: $threadID } } }
      sort: { fields: createdAt, order: ASC }
    ) {
      nodes {
        author {
          name
          username
          isAnonymous
        }
        createdAt
        relativeDate: createdAt(fromNow: true)
        message
      }
    }
  }
`
