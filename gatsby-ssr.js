import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { renderToString } from 'react-dom/server'
import fetch from 'isomorphic-fetch'

// gatsby-ssr is required for build regardless if you plan to support SSR
export const replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
  const client = new ApolloClient({
    fetch,
    uri: 'http://dtott.test/api',
    headers: {
      Authorization:
        'bearer GwyFgsxqfRsvsxX4tKJvbXbuwNE2Sus_qTPvwxipQEuO8j9CnboWmTVwOmfu5PSc',
      'Content-type': 'application/json',
    },
  })

  const ConnectedBody = () => (
    <ApolloProvider client={client}>{bodyComponent}</ApolloProvider>
  )

  replaceBodyHTMLString(renderToString(<ConnectedBody />))
}
