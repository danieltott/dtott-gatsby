import React from 'react'

const Timestamp = ({ relativeDate, isoDate, differenceInDays }) => {
  const displayDate = parseInt(differenceInDays) > 1 ? relativeDate : 'today!'
  return (
    <div className="timestamp">
      <time dateTime={isoDate}>posted {displayDate}</time>
    </div>
  )
}

export default Timestamp
