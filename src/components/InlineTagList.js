import React from 'react'
import { Link } from 'gatsby'

const InlineTagList = ({ tags }) =>
  tags.map((tag, i, tags) => {
    const last = i === tags.length - 1
    return (
      <React.Fragment key={tag}>
        {last && tags.length > 1 && ' and '}
        <Link to={`/tags/${tag}`}>{tag}</Link>
        {last ? '.' : ', '}
      </React.Fragment>
    )
  })

export default InlineTagList
