import React, { useMemo, useState } from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'

const sorts = {
  alpha: 'a',
  total: 't',
  latest: 'l',
}

const IndexPage = ({ data }) => {
  const [sort, setSort] = useState(sorts.alpha)

  const tags = useMemo(() => {
    return data.allMdx.group.sort((a, b) => {
      switch (sort) {
        case sorts.alpha:
          var nameA = a.fieldValue.toUpperCase() // ignore upper and lowercase
          var nameB = b.fieldValue.toUpperCase() // ignore upper and lowercase
          if (nameA < nameB) {
            return -1
          }
          if (nameA > nameB) {
            return 1
          }

          // names must be equal
          return 0

        case sorts.total:
          return b.totalCount - a.totalCount

        case sorts.latest:
          return (
            b.edges[0].node.exports.meta.sortDate -
            a.edges[0].node.exports.meta.sortDate
          )

        default:
          return 0
      }
    })
  }, [sort, data.allMdx.group])

  return (
    <Layout section="thoughts">
      <Helmet title="Thoughts" />
      <h1 className="section-title">
        <span className="page-section-wrap">Post Tags</span>
      </h1>
      <section className="page-section thoughts">
        <div className="page-section-wrap">
          <div>
            Sort by:{' '}
            <button
              onClick={() => {
                setSort(sorts.alpha)
              }}
              style={{ fontWeight: sort === sorts.alpha ? 'bold' : 'normal' }}
            >
              alpha
            </button>
            <button
              onClick={() => {
                setSort(sorts.total)
              }}
              style={{ fontWeight: sort === sorts.total ? 'bold' : 'normal' }}
            >
              total entries
            </button>
            <button
              onClick={() => {
                setSort(sorts.latest)
              }}
              style={{ fontWeight: sort === sorts.latest ? 'bold' : 'normal' }}
            >
              latest entry
            </button>
          </div>
          <ul>
            {tags.map((tag) => {
              return (
                <React.Fragment key={tag.fieldValue}>
                  <li>
                    <strong>
                      <Link to={`/tags/${tag.fieldValue}`}>
                        {tag.fieldValue}
                      </Link>
                    </strong>
                    <div>
                      <strong>{tag.totalCount}</strong>{' '}
                      {tag.totalCount === 1 ? 'entry' : 'entries'}, most
                      recently {tag.edges[0].node.exports.meta.relativeDate}
                    </div>
                  </li>
                </React.Fragment>
              )
            })}
          </ul>
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allMdx(sort: { fields: exports___meta___date, order: DESC }) {
      group(field: exports___tags, limit: 1) {
        fieldValue
        totalCount
        edges {
          node {
            exports {
              meta {
                relativeDate: date(fromNow: true)
                sortDate: date(formatString: "x")
              }
            }
          }
        }
      }
    }
  }
`
