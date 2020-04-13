import React, { useMemo } from 'react'
import toDate from 'date-fns/toDate'
import format from 'date-fns/format'
import formatISO from 'date-fns/formatISO'

const Timestamp = ({ time }) => {
  const dates = useMemo(() => {
    const d = typeof time === 'number' ? toDate(time * 1000) : new Date(parseInt(time))
    console.log(d)
    return {
      iso: formatISO(d),
      nice: format(d, 'PPpp'),
    }
  }, [time])

  return (
    <div className="timestamp">
      <time dateTime={dates.iso}>posted {dates.nice}</time>
    </div>
  )
}

export default Timestamp
