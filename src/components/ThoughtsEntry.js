import React from 'react'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'
import { DiscussionEmbed } from 'disqus-react'
import Helmet from 'react-helmet'
import Layout from './Layout'
import Timestamp from './Timestamp'
import Highlight from 'react-highlight'
import RawHtml from './RawHtml'
import Codepen from 'react-codepen-embed'

const ThoughtsEntry = ({
  data: {
    craft: { entry },
  },
}) => {
  return (
    <Layout section="thoughts">
      <Helmet>
        <title>{entry.title}</title>
        {entry.seoDescription && (
          <meta name="description" content={entry.seoDescription} />
        )}
      </Helmet>

      <h2 className="section-title">
        <span className="page-section-wrap">Thoughts</span>
      </h2>
      <article className="page-section post">
        <header className="page-section-wrap">
          <h1 className="post-title">{entry.title}</h1>
          <Timestamp time={entry.postDate} />
        </header>
        <div className="page-section-wrap">
          {entry.bodyBlocks.length ? (
            entry.bodyBlocks.map(block => {
              switch (block.__typename) {
                case 'Craft_BodyBlocksText':
                  return <RawHtml key={block.id} html={block.text.content} />
                case 'Craft_BodyBlocksCodeSnippet':
                  return (
                    <Highlight key={block.id} className={block.language}>
                      {block.code}
                    </Highlight>
                  )
                case 'Craft_':
                  return (
                    <Codepen
                      key={block.id}
                      hash={block.hash}
                      user={block.user}
                    />
                  )
                default:
                  return null
              }
            })
          ) : (
            <Highlight innerHTML={true}>{entry.body}</Highlight>
          )}
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
          seoDescription
          summary
          body
          url
          slug
          bodyBlocks {
            ... on Craft_BodyBlocksText {
              id
              __typename
              text {
                content
              }
            }
            ... on Craft_BodyBlocksCodeSnippet {
              id
              __typename
              language
              code
            }
            ... on Craft_BodyBlocksCodepenEmbed {
              id
              __typename
              hash
              user
            }
          }
          tags {
            id
            title
          }
        }
      }
    }
  }
`
