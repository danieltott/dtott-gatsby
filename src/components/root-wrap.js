import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import Codepen from './CodepenEmbed'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/vsDark'
import styled from 'styled-components'

const Pre = styled.pre`
  text-align: left;
  margin: 0 0 0.24rem;
  padding: 0.5em;
  overflow-x: auto;
  border-radius: 3px;
  font-family: Consolas, 'Andale Mono WT', 'Andale Mono', 'Lucida Console',
    'Lucida Sans Typewriter', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono',
    'Liberation Mono', 'Nimbus Mono L', Monaco, 'Courier New', Courier,
    monospace;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 0.75em;
`

const LineNo = styled.div`
  user-select: none;
  opacity: 0.3;
  text-align: right;
`

const shortcodes = {
  Codepen,
  pre: (props) => {
    const className = props.children.props.className || ''

    const matches = className.match(/language-(?<lang>.*)/)
    return (
      <Highlight
        {...defaultProps}
        code={props.children.props.children.trim()}
        theme={theme}
        language={
          matches && matches.groups && matches.groups.lang
            ? matches.groups.lang
            : ''
        }
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Pre className={className} style={style}>
            {tokens.map((line, i) => (
              <React.Fragment key={`num_${i}`}>
                <LineNo>{i + 1}</LineNo>
                <div key={`c_${i}`}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              </React.Fragment>
            ))}
          </Pre>
        )}
      </Highlight>
    )
  },
}

// require('dotenv').config({
//   path: `.env.${process.env.GATSBY_NODE_ENV}`,
// })

export const wrapRootElement = ({ element }) => {
  return <MDXProvider components={shortcodes}>{element}</MDXProvider>
}
