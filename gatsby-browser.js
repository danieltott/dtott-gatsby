import fetch from 'isomorphic-fetch'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

// require('dotenv').config({
//   path: `.env.${process.env.NODE_ENV}`,
// })

const client = new ApolloClient({
  fetch,
  uri: process.env.DTOTT_API_URL,
  headers: {
    authorization: `bearer ${process.env.DTOTT_API_TOKEN}`,
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
