import React, { createContext, useContext } from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { Link } from 'gatsby'
import { DiscussionEmbed } from 'disqus-react'
import Helmet from 'react-helmet'
import Layout from './Layout'
import Timestamp from './Timestamp'

export const PostContext = createContext()

export const usePostIsFull = () => {
  const postIsFull = useContext(PostContext)
  return postIsFull
}

export default function PageTemplate(props) {
  const {
    data: {
      mdx: {
        exports: { meta, tags },
        body,
      },
    },
  } = props

  return (
    <PostContext.Provider value={true}>
      <Layout section="thoughts">
        <Helmet>
          <title>{meta.title}</title>
          {meta.desc && <meta name="description" content={meta.desc} />}
        </Helmet>

        <h2 className="section-title">
          <span className="page-section-wrap">Thoughts</span>
        </h2>
        <article className="page-section post">
          <header className="page-section-wrap">
            <h1 className="post-title">{meta.title}</h1>
            <Timestamp time={meta.date} />
          </header>
          <div className="page-section-wrap">
            <MDXRenderer>{body}</MDXRenderer>
            <footer className="post-footer">
              <p>
                {'That was '}
                <a href={`/${meta.slug}`}>{meta.title}</a>, by Dan Ott. It is
                filed under{' '}
                {tags.map((tag, i, tags) => {
                  const last = i === tags.length - 1
                  return (
                    <React.Fragment key={tag}>
                      {last && tags.length > 1 && ' and '}
                      <Link to={`/thoughts/search?q=tags:${tag}`}>{tag}</Link>
                      {last ? '.' : ', '}
                    </React.Fragment>
                  )
                })}
                Thanks for reading.
              </p>
            </footer>
            <aside className="post-comments">
              <DiscussionEmbed
                shortname="danieltott"
                config={{
                  url: `${process.env.GATSBY_DTOTT_URL}/${meta.slug}`,
                  identifier: meta.slug,
                  title: meta.title,
                }}
              />
            </aside>
          </div>
        </article>
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
          date(formatString: "x")
          slug
          desc
        }
      }
      body
    }
  }
`
