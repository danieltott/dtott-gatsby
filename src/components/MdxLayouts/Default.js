import React from 'react'
import { usePostIsFull } from '../ThoughtsEntry2'
// import { DiscussionEmbed } from 'disqus-react'
import Timestamp from '../Timestamp'
import { Link } from 'gatsby'
import InlineTagList from '../InlineTagList'

const Post = ({ body, meta, tags, data, comments }) => {
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
            under <InlineTagList tags={tags} /> Thanks for reading.
          </p>
        </footer>
        {comments && (
          <aside className="post-comments">
            <h3>
              {comments.length} comment
              {comments.length > 1 ? 's' : ''}:
            </h3>
            <ol>
              {comments.map((comment) => (
                <li key={comment.createdAt}>
                  <h4>
                    {comment.author.name} posted {comment.relativeDate}:
                  </h4>
                  <div dangerouslySetInnerHTML={{ __html: comment.message }} />
                </li>
              ))}
            </ol>
          </aside>
        )}
      </div>
    </article>
  )
}

const ListItem = ({ meta, summary, data, tags }) => {
  return (
    <article className="post">
      <h3 className="post-title">
        <Link to={`/${meta.slug}`}>{meta.title}</Link>
      </h3>
      <div className="post-summary-details">
        <Timestamp
          relativeDate={data.exports.meta.relativeDate}
          isoDate={data.exports.meta.isoDate}
        />
        <div className="post-summary-tags">
          filed under <InlineTagList tags={tags} />
        </div>
      </div>
      {summary}
    </article>
  )
}

export default ({ summary, children, meta, tags, data, comments }) => {
  const isFull = usePostIsFull()
  return isFull ? (
    <Post
      body={children}
      meta={meta}
      tags={tags}
      data={data}
      comments={comments}
    />
  ) : (
    <ListItem summary={summary} meta={meta} data={data} tags={tags} />
  )
}
