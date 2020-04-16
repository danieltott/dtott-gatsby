import React from 'react'

const Timestamp = ({ relativeDate, isoDate }) => {
  return (
    <div className="timestamp">
      <time dateTime={isoDate}>posted {relativeDate}</time>
    </div>
  )
}

export default Timestamp
