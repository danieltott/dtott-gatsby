import React, { createContext, useContext } from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

export const PostContext = createContext()

export const usePostIsFull = () => {
  const postIsFull = useContext(PostContext)
  return postIsFull
}

export default function PageTemplate(props) {
  const {
    data: { mdx },
  } = props
  console.log(props)
  return (
    <PostContext.Provider value={true}>
      <div>
        <h1>{mdx.exports.meta.title}</h1>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </div>
    </PostContext.Provider>
  )
}
export const pageQuery = graphql`
  query BlogPostQuery($id: String) {
    mdx(id: { eq: $id }) {
      mdxAST
      exports {
        meta {
          title
        }
      }
      body
    }
  }
`
