import React, { useReducer } from 'react'
import { usePostIsFull } from '../ThoughtsEntry2'
// import { DiscussionEmbed } from 'disqus-react'
import Timestamp from '../Timestamp'
import { Link } from 'gatsby'
import produce from 'immer'

const initialState = {
  status: 'initial',
  fields: {
    name: {
      value: '',
      valid: false,
      touched: false,
    },
    email: {
      value: '',
      valid: false,
      touched: false,
    },
    site: {
      value: '',
      valid: false,
      touched: false,
    },
    comment: {
      value: '',
      valid: false,
      touched: false,
    },
  },
}
const fields = ['name', 'email', 'site', 'comment']
const formIsValid = (state) =>
  fields.reduce((valid, cur) => valid && !!state.fields[cur].value, true)

const reducer = (action, state) =>
  produce(state, (newState) => {
    switch (action.type) {
      case 'fieldChange':
        newState.fields[action.field] = {
          touched: true,
          value: action.value,
          valid: !!action.value,
        }

        newState.status = formIsValid(newState) ? 'valid' : 'invalid'

        break

      default:
        throw new Error(`Invalid action type ${action.type}`)
    }
  })

const Post = ({ body, meta, tags, data }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <article className="page-section post">
      <header className="page-section-wrap">
        <h1 className="post-title">{meta.title}</h1>
        <Timestamp
          relativeDate={data.exports.meta.relativeDate}
          isoDate={data.exports.meta.isoDate}
        />
      </header>
      <div className="page-section-wrap">
        {body}
        <footer className="post-footer">
          <p>
            {'That was '}
            <a href={`/${meta.slug}`}>{meta.title}</a>, by Dan Ott. It is filed
            under{' '}
            {tags.map((tag, i, tags) => {
              const last = i === tags.length - 1
              return (
                <React.Fragment key={tag}>
                  {last && tags.length > 1 && ' and '}
                  <Link to={`/tags/${tag}`}>{tag}</Link>
                  {last ? '.' : ', '}
                </React.Fragment>
              )
            })}{' '}
            Thanks for reading.
          </p>
        </footer>
        <aside className="post-comments">
          <form data-netlify="true" name="comments" method="post">
            <label htmlFor="comment_name">Your Name</label>
            <div>
              <input
                id="comment_name"
                name="name"
                type="text"
                autoComplete="name"
                value={state.fields.name.value}
                onChange={(e) => {
                  dispatch({
                    type: 'fieldChange',
                    field: 'name',
                    value: e.target.value,
                  })
                }}
              />
            </div>
            <label htmlFor="comment_email">Your Email</label>
            <div>
              <input
                id="comment_email"
                name="email"
                type="email"
                autoComplete="email"
                value={state.fields.email.value}
                onChange={(e) => {
                  dispatch({
                    type: 'fieldChange',
                    field: 'email',
                    value: e.target.value,
                  })
                }}
              />
            </div>
            <label htmlFor="comment_site">Website</label>
            <div>
              <input
                id="comment_site"
                type="text"
                autoComplete="site"
                value={state.fields.site.value}
                onChange={(e) => {
                  dispatch({
                    type: 'fieldChange',
                    field: 'site',
                    value: e.target.value,
                  })
                }}
              />
            </div>
            <label htmlFor="comment_comment">Your Comment</label>
            <div>
              <input
                id="comment_comment"
                type="text"
                autoComplete="comment"
                value={state.fields.comment.value}
                onChange={(e) => {
                  dispatch({
                    type: 'fieldChange',
                    field: 'comment',
                    value: e.target.value,
                  })
                }}
              />
            </div>
          </form>

          {/* {process.env.NODE_ENV === 'production' && (
            <DiscussionEmbed
              shortname="danieltott"
              config={{
                url: `${process.env.GATSBY_DTOTT_URL}/${meta.slug}`,
                identifier: meta.slug,
                title: meta.title,
              }}
            />
          )} */}
        </aside>
      </div>
    </article>
  )
}

const ListItem = ({ meta, summary, data }) => {
  return (
    <article className="post">
      <h3 className="post-title">
        <Link to={`/${meta.slug}`}>{meta.title}</Link>
      </h3>
      <Timestamp
        relativeDate={data.exports.meta.relativeDate}
        isoDate={data.exports.meta.isoDate}
      />
      {summary}
    </article>
  )
}

export default ({ summary, children, meta, tags, data }) => {
  const isFull = usePostIsFull()
  return isFull ? (
    <Post body={children} meta={meta} tags={tags} data={data} />
  ) : (
    <ListItem summary={summary} meta={meta} data={data} />
  )
}
