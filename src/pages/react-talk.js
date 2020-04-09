import React from 'react'
import Helmet from 'react-helmet'
// import '../styles/codetheme.css'
// import '../styles/main.css'

const NotFoundPage = () => (
  <>
    <Helmet title="Practical Hooks">
      <html lang="en" />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cloud.typography.com/7220032/609782/css/fonts.css"
        media="nope!"
        onLoad="this.media='all'"
      />
    </Helmet>
    <header role="banner">
      <h1 className="banner-name">Practical Hooks</h1>
    </header>
    <div role="main" className="home">
      <h1 className="section-title">
        <span className="">Use Hooks IRL</span>
      </h1>
      <div style={{ display: 'flex' }}>
        <div className="page-section" style={{ flex: 1 }}>
          <p>Thanks to:</p>
          <ul>
            <li>Tech Elevator</li>
            <li>Zach Schneider</li>
            <li>Cleveland Tech Slack</li>
          </ul>
        </div>
        <div className="page-section" style={{ flex: 1 }}>
          <h2 className="post-title">
            <span className="">Dan Ott</span>
          </h2>
          <div className="">
            <p>
              website: <strong>dtott.com</strong>
            </p>
            <p>
              twitter: <strong>danieltott</strong>
            </p>
            <p>
              github: <strong>danieltott</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
)

export default NotFoundPage
