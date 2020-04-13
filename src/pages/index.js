import React from 'react'
import { graphql } from 'gatsby'
import scrollToComponent from 'react-scroll-to-component'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../components/Layout'
import RawHtml from '../components/RawHtml'
import ListPost from '../components/ListPost'
import SimpleButton from '../components/SimpleButton'

class IndexPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPage: 0,
      perPage: 5,
    }

    this.nextPage = this.nextPage.bind(this)
    this.prevPage = this.prevPage.bind(this)
  }
  nextPage() {
    this.setState({ currentPage: this.state.currentPage + 1 })
    scrollToComponent(this.ThoughtsList, { align: 'top', duration: 300 })
  }
  prevPage() {
    this.setState({ currentPage: this.state.currentPage - 1 })
    scrollToComponent(this.ThoughtsList, { align: 'top', duration: 300 })
  }
  render() {
    const { data } = this.props
    const totalPages = Math.ceil(data.craft.entries.length / this.state.perPage)
    return (
      <Layout section="home">
        <section className="page-section about">
          <h2 className="section-title">
            <span className="page-section-wrap">
              {data.craft.globals.about.heading}
            </span>
          </h2>
          <RawHtml
            className="page-section-wrap"
            html={data.craft.globals.about.summary}
          />
        </section>
        <section className="page-section work">
          <h2 className="section-title">
            <span className="page-section-wrap">
              {data.craft.globals.work.heading}
            </span>
          </h2>
          <RawHtml
            className="page-section-wrap"
            html={data.craft.globals.work.summary}
          />
        </section>
        <section
          className="page-section thoughts"
          id="thoughts"
          ref={(section) => {
            this.ThoughtsList = section
          }}
        >
          <h2 className="section-title">
            <span className="page-section-wrap">Thoughts</span>
          </h2>
          <div className="page-section-wrap">
            {data.allMdx.edges.map(({ node }) => {
              return <MDXRenderer>{node.body}</MDXRenderer>
            })}
            {/* {data.craft.entries
              .slice(
                this.state.currentPage * this.state.perPage,
                (this.state.currentPage + 1) * this.state.perPage
              )
              .map((entry) => (
                <ListPost key={entry.id} entry={entry} />
              ))}
            {this.state.currentPage > 0 && (
              <>
                <SimpleButton type="button" onClick={this.prevPage}>
                  Newer Posts
                </SimpleButton>{' '}
              </>
            )}

            {this.state.currentPage < totalPages && (
              <SimpleButton type="button" onClick={this.nextPage}>
                Older Posts
              </SimpleButton>
            )} */}
          </div>
        </section>
      </Layout>
    )
  }
}

export default IndexPage

export const query = graphql`
  query {
    allMdx {
      edges {
        node {
          exports {
            meta {
              title
              date
              slug
            }
          }
          body
          id
        }
      }
    }
    craft {
      entries(section: [thoughts]) {
        ... on Craft_Thoughts {
          id
          postDate
          title
          summary
          body
          url
          uri
          tags {
            id
            title
          }
        }
      }

      globals {
        about {
          heading
          summary
          body
        }
        work {
          heading
          summary
          body
        }
      }
    }
  }
`
