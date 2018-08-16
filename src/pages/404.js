import React from 'react'
import Layout from '../components/Layout'

const NotFoundPage = () => (
  <Layout>
    <h1 className="section-title">
      <span className="page-section-wrap">404</span>
    </h1>
    <div className="page-section">
      <h1 className="post-title">
        <span className="page-section-wrap">Page not found...</span>
      </h1>
      <div className="page-section-wrap">
        <p>Sorry, wasn't able to find that one.</p>
      </div>
    </div>
  </Layout>
)

export default NotFoundPage
