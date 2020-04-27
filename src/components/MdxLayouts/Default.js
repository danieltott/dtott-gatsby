import React from 'react'
import { usePostIsFull } from '../ThoughtsEntry2'
import { DiscussionEmbed } from 'disqus-react'
import Timestamp from '../Timestamp'
import { Link } from 'gatsby'

const Post = ({ body, meta, tags, data }) => {
  return (
    <article className="page-section post">
      <header className="page-section-wrap">
        <h1 className="post-title">{meta.title}</h1>
        <Timestamp
          relativeDate={data.exports.meta.relativeDate}
          isoDate={data.exports.meta.isoDate}
        />
      </header>
      <div className="page-section-wrap">
        {body}
        <footer className="post-footer">
          <p>
            {'That was '}
            <a href={`/${meta.slug}`}>{meta.title}</a>, by Dan Ott. It is filed
            under{' '}
            {tags.map((tag, i, tags) => {
              const last = i === tags.length - 1
              return (
                <React.Fragment key={tag}>
                  {last && tags.length > 1 && ' and '}
                  <Link to={`/tags/${tag}`}>{tag}</Link>
                  {last ? '.' : ', '}
                </React.Fragment>
              )
            })}{' '}
            Thanks for reading.
          </p>
        </footer>
        <aside className="post-comments">
          {process.env.NODE_ENV === 'production' && (
            <DiscussionEmbed
              shortname="danieltott"
              config={{
                url: `${process.env.GATSBY_DTOTT_URL}/${meta.slug}`,
                identifier: meta.slug,
                title: meta.title,
              }}
            />
          )}
        </aside>
      </div>
    </article>
  )
}

const ListItem = ({ meta, summary, data }) => {
  return (
    <article className="post">
      <h3 className="post-title">
        <Link to={`/${meta.slug}`}>{meta.title}</Link>
      </h3>
      <Timestamp
        relativeDate={data.exports.meta.relativeDate}
        isoDate={data.exports.meta.isoDate}
      />
      {summary}
    </article>
  )
}

export default ({ summary, children, meta, tags, data }) => {
  const isFull = usePostIsFull()
  return isFull ? (
    <Post body={children} meta={meta} tags={tags} data={data} />
  ) : (
    <ListItem summary={summary} meta={meta} data={data} />
  )
}
