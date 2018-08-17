import fetch from 'isomorphic-fetch'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

// require('dotenv').config({
//   path: `.env.${process.env.GATSBY_NODE_ENV}`,
// })

console.log(process.env.GATSBY_DTOTT_API_URL)

const client = new ApolloClient({
  fetch,
  uri: process.env.GATSBY_DTOTT_API_URL,
  headers: {
    authorization: `bearer ${process.env.GATSBY_DTOTT_API_TOKEN}`,
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
