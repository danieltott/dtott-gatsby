import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'

const NotFoundPage = () => (
  <Layout>
    <Helmet title="Page not found" />
    <h1 className="section-title">
      <span className="page-section-wrap">404 Not Found</span>
    </h1>
    <div className="page-section">
      <h2 className="post-title">
        <span className="page-section-wrap">Page not found...</span>
      </h2>
      <div className="page-section-wrap">
        <p>Sorry, wasn't able to find that one.</p>
      </div>
    </div>
  </Layout>
)

export default NotFoundPage
