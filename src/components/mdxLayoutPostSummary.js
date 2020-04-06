import React from 'react'
import { Link } from 'gatsby'
import Timestamp from './Timestamp'
import { usePostIsFull } from './ThoughtsEntry2'

export default ({ summary, meta, children }) => {
  const isFull = usePostIsFull()

  if (!isFull) {
    return (
      <article className="post">
        <h3 className="post-title">
          <Link to={meta.slug}>{meta.title}</Link>
        </h3>
        <Timestamp time={meta.date} />
        {summary}
      </article>
    )
  }

  return children
}
