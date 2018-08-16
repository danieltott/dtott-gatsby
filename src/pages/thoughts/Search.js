import React from 'react'
import scrollToComponent from 'react-scroll-to-component'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Layout from '../../components/layout'
import ListPost from '../../components/ListPost'
import SimpleButton from '../../components/SimpleButton'

function getParameterByName(name, url = '') {
  name = name.replace(/[[\]]/g, '\\$&')
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

class SearchPageContent extends React.Component {
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
    scrollToComponent(this.props.headerRef.current, {
      align: 'top',
      duration: 300,
    })
  }
  prevPage() {
    this.setState({ currentPage: this.state.currentPage - 1 })
    scrollToComponent(this.props.headerRef.current, {
      align: 'top',
      duration: 300,
    })
  }
  render() {
    const { loading, error, data } = this.props
    // const totalPages = Math.ceil(data.craft.entries.length / this.state.perPage)

    if (loading) {
      return <p>Loading...</p>
    }
    if (error) {
      return <p>Error :(</p>
    }
    if (data) {
      const totalPages = data.entries.length
      return (
        <>
          {data.entries
            .slice(
              this.state.currentPage * this.state.perPage,
              (this.state.currentPage + 1) * this.state.perPage
            )
            .map(entry => (
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
        </>
      )
    }
    return null
  }
}
const SearchPage = ({ location }) => {
  const searchTerm = getParameterByName('q', location.search)
  let header = React.createRef()
  return (
    <Query
      query={gql`
    query {
        entries(section: [thoughts], search:"${searchTerm}") {
          ... on Thoughts {
            id
            postDate
            title
            summary
            url
            uri
            tags {
              id
              title
            }
          }
        }

    }
    `}
    >
      {({ loading, error, data }) => (
        <Layout section="home">
          <h1 className="section-title" ref={header}>
            <span className="page-section-wrap">
              Thoughts Search: {searchTerm}
            </span>
          </h1>
          <section className="page-section thoughts">
            <div className="page-section-wrap">
              <SearchPageContent
                {...{ loading, error, data, searchTerm }}
                headerRef={header}
              />
            </div>
          </section>
        </Layout>
      )}
    </Query>
  )
}

export default SearchPage
