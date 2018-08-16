import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql, navigate } from 'gatsby'
import moment from 'moment'
import Header from './Header'
import '../styles/codetheme.css'
import '../styles/main.css'

const Layout = ({ children, section = 'home' }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => {
      const searchTextInput = React.createRef()
      return (
        <>
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
          </Helmet>
          <Header siteTitle={data.site.siteMetadata.title} />
          <div role="main" className={section}>
            {children}
          </div>
          <footer className="global-footer page-section">
            <form
              action="/thoughts/search"
              className="site-search page-section"
              method="get"
              onSubmit={e => {
                e.preventDefault()
                navigate(`/thoughts/search?q=${searchTextInput.current.value}`)
              }}
            >
              <fieldset className="page-section-wrap">
                <input
                  type="text"
                  name="q"
                  ref={searchTextInput}
                  placeholder="Search posts..."
                />
                <button type="submit">Go</button>
              </fieldset>
            </form>
            <div role="contentinfo" className="page-section-wrap">
              <a href="/thoughts/feed">RSS</a>
              &bull;
              <a href="http://twitter.com/danieltott">Twitter</a> &bull;
              <a href="http://github.com/danieltott">Github</a> &bull;{' '}
              <span className="nowrap">
                Built with <a href="http://buildwithcraft.com">Craft</a>
              </span>{' '}
              <br />
              All code, content and images (except where noted) &copy; 2006 -{' '}
              {moment().format('Y')} Daniel T. Ott, LLC.{' '}
              <span className="nowrap">All rights reserved.</span>
            </div>
          </footer>
        </>
      )
    }}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
