import React from 'react'
import { Link } from 'gatsby'
import RawHtml from './RawHtml'
import Timestamp from './Timestamp'

const ListPost = ({ entry }) => (
  <article className="post">
    <h3 className="post-title">
      <Link to={'/' + entry.uri}>{entry.title}</Link>
    </h3>
    <Timestamp time={entry.postDate} />
    <RawHtml html={entry.summary} />
  </article>
)

export default ListPost
