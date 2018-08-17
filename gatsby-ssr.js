import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { renderToString } from 'react-dom/server'
import fetch from 'isomorphic-fetch'

// require('dotenv').config({
//   path: `.env.${process.env.GATSBY_NODE_ENV}`,
// })

// gatsby-ssr is required for build regardless if you plan to support SSR
export const replaceRenderer = ({ bodyComponent, replaceBodyHTMLString }) => {
  const client = new ApolloClient({
    fetch,
    uri: process.env.GATSBY_DTOTT_API_URL,
    headers: {
      authorization: `bearer ${process.env.GATSBY_DTOTT_API_TOKEN}`,
      'Content-type': 'application/json',
    },
  })

  const ConnectedBody = () => (
    <ApolloProvider client={client}>{bodyComponent}</ApolloProvider>
  )

  replaceBodyHTMLString(renderToString(<ConnectedBody />))
}
