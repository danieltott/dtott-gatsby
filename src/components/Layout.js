import React from 'react'
import PropTypes from 'prop-types'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useStaticQuery, graphql } from 'gatsby'
import Header from './Header'
import '../styles/codetheme.css'
import '../styles/main.css'

const Layout = ({ children, section = 'home' }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          year
        }
      }
    }
  `)
  return (
    <HelmetProvider>
      <Helmet
        title={data.site.siteMetadata.title}
        titleTemplate="%s ~ Daniel T. Ott"
        meta={[
          {
            name: 'description',
            content: `Daniel T Ott - a client-side craftsman. Dan Ott's portfolio, information, and thoughts on HTML, CSS, Javascript, and the web development industry in general.`,
          },
        ]}
      >
        <html lang="en" />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cloud.typography.com/7220032/609782/css/fonts.css"
          media="nope!"
          onLoad="this.media='all'"
        />
        <script
          defer
          data-domain="dtott.com"
          src="https://plausible.io/js/plausible.js"
        />
      </Helmet>
      <Header siteTitle={data.site.siteMetadata.title} section={section} />
      <div role="main" className={section}>
        {children}
      </div>
      <footer className="global-footer page-section">
        <form
          action="/search"
          className="site-search page-section"
          method="get"
          id="sitesearch"
        >
          <fieldset className="page-section-wrap">
            <input
              type="text"
              name="term"
              placeholder="Search site..."
              aria-label="Search site"
            />
            <button type="submit">Go</button>
          </fieldset>
        </form>
        <div role="contentinfo" className="page-section-wrap">
          <a href="/thoughts/feed.rss">RSS</a>
          {' • '}
          <a href="http://twitter.com/danieltott">Twitter</a>
          {' • '}
          <a href="http://github.com/danieltott">Github</a>
          {' • '}
          <span className="nowrap">
            Built with <a href="https://gatsbyjs.org">Gatsby</a>
          </span>
          <br />
          All code, content and images (except where noted) &copy; 2006 -{' '}
          {data.site.siteMetadata.year} Daniel T. Ott, LLC.{' '}
          <span className="nowrap">All rights reserved.</span>
        </div>
      </footer>
    </HelmetProvider>
  )
}
Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
