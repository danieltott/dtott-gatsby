import React from 'react'
import Codepen from 'react-codepen-embed'

const CodepenEmbed = (props) => (
  <div style={{ marginBottom: '0.24rem' }}>
    <Codepen {...props} />
  </div>
)

export default CodepenEmbed
