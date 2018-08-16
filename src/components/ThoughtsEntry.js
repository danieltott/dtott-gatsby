import React from 'react'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'
import { DiscussionEmbed } from 'disqus-react'
import Helmet from 'react-helmet'
import Layout from './Layout'
import Timestamp from './Timestamp'
import Highlight from 'react-highlight'

const ThoughtsEntry = ({
  data: {
    craft: { entry },
  },
}) => {
  return (
    <Layout section="thoughts">
      <Helmet title={entry.title} />

      <h2 className="section-title">
        <span className="page-section-wrap">Thoughts</span>
      </h2>
      <article className="page-section post">
        <header className="page-section-wrap">
          <h1 className="post-title">{entry.title}</h1>
          <Timestamp time={entry.postDate} />
        </header>
        <div className="page-section-wrap">
          <Highlight innerHTML={true}>{entry.body}</Highlight>
          <footer className="post-footer">
            <p>
              {'That was '}
              <a href={entry.url}>{entry.title}</a>, by Dan Ott. It is filed
              under{' '}
              {entry.tags.map((tag, i, tags) => {
                const last = i === tags.length - 1
                return (
                  <React.Fragment key={`entryTag${tag.id}`}>
                    {last && tags.length > 1 && ' and '}
                    <Link to={`/thoughts/search?q=tags:${tag.title}`}>
                      {tag.title}
                    </Link>
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
                url: entry.url,
                identifier: entry.slug,
                title: entry.title,
              }}
            />
          </aside>
        </div>
      </article>
    </Layout>
  )
}

export default ThoughtsEntry

export const query = graphql`
  query($id: [Int]) {
    craft {
      entry(id: $id) {
        ... on Craft_Thoughts {
          id
          postDate
          title
          summary
          body
          url
          slug
          tags {
            id
            title
          }
        }
      }
    }
  }
`
