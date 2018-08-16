import React from 'react'

const SimpleButton = ({ children, ...props }) => (
  <button
    style={{
      color: '#e06e47',
      fontSize: 'inherit',
      fontWeight: 'inherit',
      background: 'none',
      textDecoration: 'underline',
      padding: 0,
      margin: 0,
      border: 0,
    }}
    {...props}
  >
    {children}
  </button>
)

export default SimpleButton
