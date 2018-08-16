import React from 'react'

const RawHtml = ({ html, ...props }) => (
  <div {...props} dangerouslySetInnerHTML={{ __html: html }} />
)

export default RawHtml
