import React from 'react'
import { graphql } from 'gatsby'
import scrollToComponent from 'react-scroll-to-component'
import Helmet from 'react-helmet'
import Layout from '../../components/Layout'
import ListPost from '../../components/ListPost'
import SimpleButton from '../../components/SimpleButton'

class IndexPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPage: 0,
      perPage: 10,
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
      <Layout section="thoughts">
        <Helmet title="Thoughts" />
        <h1
          className="section-title"
          ref={(section) => {
            this.ThoughtsList = section
          }}
        >
          <span className="page-section-wrap">Thoughts</span>
        </h1>
        <section className="page-section thoughts">
          <div className="page-section-wrap">
            {data.craft.entries
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
            )}
          </div>
        </section>
      </Layout>
    )
  }
}

export default IndexPage

export const query = graphql`
  query {
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
