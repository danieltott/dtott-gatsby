import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../components/Layout'

export const query = graphql`
  fragment blogListing on Mdx {
    exports {
      meta {
        title
        relativeDate: date(fromNow: true)
        isoDate: date(formatString: "YYYY-MM-DDTHH:mm:ssZ")
        differenceInDays: date(difference: "days")
        date
        slug
      }
    }
    body
    id
  }
`

const IndexPage = (props) => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(limit: 5, sort: { fields: exports___meta___date, order: DESC }) {
        edges {
          node {
            ...blogListing
          }
        }
      }
    }
  `)

  return (
    <Layout section="home">
      <section className="page-section about">
        <h2 className="section-title">
          <span className="page-section-wrap">About</span>
        </h2>
        <div className="page-section-wrap">
          <h3>My name is Dan Ott</h3>
          <p>
            I am a freelance web developer. I've worked professionally in the
            web development field since 1999, and full-time since 2007. I count
            myself as one of those lucky few people who actually enjoy what they
            do.
          </p>
          <h3>Elsewhere on the internet</h3>
          <p>
            You can find me on <a href="http://github.com/danieltott">GitHub</a>
            , on <a href="http://twitter.com/danieltott">Twitter</a>, on{' '}
            <a href="https://pinboard.in/u:danieltott">Pinboard</a>,{' '}
            <a href="http://codepen.io/danieltott">CodePen</a> or, occasionally,
            on <a href="http://www.flickr.com/photos/dtott/">Flickr</a>.
          </p>
          <p>
            I also co-founded the{' '}
            <a href="https://clereact.dev/">Cleveland React Meetup Group</a> in
            2019.
          </p>
        </div>
      </section>
      <section className="page-section work">
        <h2 className="section-title">
          <span className="page-section-wrap">Work</span>
        </h2>
        <div className="page-section-wrap">
          <h3>Professional</h3>
          <p>
            I've been an freelance developer for over ten years, specializing in
            front-end architecture and development. I have experience building
            sites using standards-compliant HTML and CSS, React (both SPA and
            integrated into existing legacy sites), and have built over 25
            client sites using Craft CMS. Since 2007, I've worked almost
            exclusively with <a href="http://sprokets.net">Sprokets</a>, a
            collection of independent creative professionals.
          </p>

          <h3>Contact</h3>
          <p>
            I'm not currently accepting new contract work, but I'm always
            interested in what's going on. Hit me up any time at dan at this
            domain.
          </p>
        </div>
      </section>
      <section className="page-section thoughts" id="thoughts">
        <h2 className="section-title">
          <span className="page-section-wrap">Some Recent Thoughts:</span>
        </h2>
        <div className="page-section-wrap">
          {data.allMdx.edges.map(({ node }) => {
            return (
              <MDXRenderer key={node.id} data={node}>
                {node.body}
              </MDXRenderer>
            )
          })}
          <div>
            <Link to="/thoughts">
              View Archive <span aria-hidden="true">📚</span>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage
