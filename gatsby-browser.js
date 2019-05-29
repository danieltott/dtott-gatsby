import fetch from 'isomorphic-fetch'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

// require('dotenv').config({
//   path: `.env.${process.env.GATSBY_NODE_ENV}`,
// })

const client = new ApolloClient({
  fetch,
  uri: process.env.GATSBY_DTOTT_API_URL,
  headers: {
    authorization: `bearer ${process.env.GATSBY_DTOTT_API_TOKEN}`,
    'Content-type': 'application/json',
  },
})

export const wrapRootElement = ({ element }) => {
  return <ApolloProvider client={client}>{element}</ApolloProvider>
}
