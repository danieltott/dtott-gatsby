import React from 'react'
import moment from 'moment'

const Timestamp = ({ time }) => (
  <div className="timestamp">
    <time dateTime={moment(time * 1000).format()}>
      posted {moment(time * 1000).format('MMMM Do, YYYY')}
    </time>
  </div>
)

export default Timestamp
