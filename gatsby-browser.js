import fetch from 'isomorphic-fetch'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  fetch,
  uri: 'http://dtott.test/api',
  headers: {
    authorization:
      'Bearer GwyFgsxqfRsvsxX4tKJvbXbuwNE2Sus_qTPvwxipQEuO8j9CnboWmTVwOmfu5PSc',
    'Content-type': 'application/json',
  },
})

export const wrapRootComponent = ({ Root }) => {
  return () => (
    <ApolloProvider client={client}>
      <Root />
    </ApolloProvider>
  )
}
